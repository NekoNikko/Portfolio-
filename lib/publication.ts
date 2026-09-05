// Publication workflow (spec §12, §30–32, §74).
//
// PRIVATE BY DEFAULT · PUBLIC BY APPROVAL.
//
// Candidates live in data/queue/ (gitignored — may contain pre-sanitization
// content). Approval is the ONLY path into public-content/ (tracked, public):
//   - createCandidate()  stores + auto-sanitizes (records SANITIZED)
//   - approveCandidate() re-scans; blocks on violations; only then moves the
//     file into public-content/<type>/ with status: published + public: true
//   - rejectCandidate()  keeps the file in the queue, status: rejected
//   - unpublish()        flips a public item to unpublished (loaders ignore it)
// Every transition is appended to data/audit.jsonl.

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { scanSensitive, redactSensitive } from "@/lib/sanitize";
import type { SensitiveScanResult } from "@/lib/sanitize";
import { getProjects, getJournal, getCaseStudies, getSkills, getUpdates } from "@/lib/content";

const DATA_DIR = path.join(process.cwd(), "data");
const QUEUE_DIR = path.join(DATA_DIR, "queue");
const AUDIT_FILE = path.join(DATA_DIR, "audit.jsonl");
const CONTENT_DIR = path.join(process.cwd(), "public-content");

export type ContentType = "project" | "journal" | "case-study";
export type QueueStatus = "draft" | "ready-for-review" | "rejected";

const TYPE_DIR: Record<ContentType, string> = {
  project: "projects",
  journal: "journal",
  "case-study": "case-studies",
};

export interface QueueItem {
  id: string;
  type: ContentType;
  title: string;
  status: QueueStatus;
  createdAt: string;
  source: string;
  markdown: string;
}

export interface AuditEntry {
  timestamp: string;
  contentId: string;
  action: string;
  user: string;
  reason?: string;
}

function ensureDirs(): void {
  fs.mkdirSync(QUEUE_DIR, { recursive: true });
}

function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function slugify(title: string): string {
  return (
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "untitled"
  );
}

function uniqueSlug(base: string, dir: string): string {
  let slug = base;
  let n = 2;
  while (fs.existsSync(path.join(CONTENT_DIR, dir, `${slug}.md`))) {
    slug = `${base}-${n}`;
    n++;
  }
  return slug;
}

// ---------------------------------------------------------------------------
// Audit log
// ---------------------------------------------------------------------------

export function appendAudit(entry: Omit<AuditEntry, "timestamp">): void {
  ensureDirs();
  const line: AuditEntry = { ...entry, timestamp: new Date().toISOString() };
  fs.appendFileSync(AUDIT_FILE, `${JSON.stringify(line)}\n`, "utf8");
}

export function getAuditLog(): AuditEntry[] {
  if (!fs.existsSync(AUDIT_FILE)) return [];
  const lines = fs
    .readFileSync(AUDIT_FILE, "utf8")
    .split("\n")
    .filter((l) => l.trim().length > 0);
  return lines
    .map((l) => {
      try {
        return JSON.parse(l) as AuditEntry;
      } catch {
        return null;
      }
    })
    .filter((e): e is AuditEntry => e !== null)
    .reverse();
}

// ---------------------------------------------------------------------------
// Queue
// ---------------------------------------------------------------------------

export function listQueue(): QueueItem[] {
  if (!fs.existsSync(QUEUE_DIR)) return [];
  return fs
    .readdirSync(QUEUE_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => readQueueFile(f.replace(/\.md$/, "")))
    .filter((item): item is QueueItem => item !== null)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function getQueueItem(id: string): QueueItem | null {
  return readQueueFile(id.replace(/[^a-zA-Z0-9-_]/g, ""));
}

function readQueueFile(id: string): QueueItem | null {
  const full = path.join(QUEUE_DIR, `${id}.md`);
  if (!fs.existsSync(full)) return null;
  try {
    const parsed = matter(fs.readFileSync(full, "utf8"));
    const data = parsed.data as Record<string, unknown>;
    return {
      id,
      type: (data.type as ContentType) ?? "project",
      title: (data.title as string) ?? id,
      status: (data.status as QueueStatus) ?? "draft",
      createdAt: (data.createdAt as string) ?? today(),
      source: (data.source as string) ?? "manual",
      markdown: parsed.content,
    };
  } catch {
    return null;
  }
}

export function createCandidate(input: {
  type: ContentType;
  title: string;
  markdown: string;
  source?: string;
}): { ok: boolean; item?: QueueItem; redacted?: number; error?: string } {
  if (!input.title.trim() || !input.markdown.trim()) {
    return { ok: false, error: "Title and content are required." };
  }
  ensureDirs();
  const id = `candidate-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
  const { text, redacted } = redactSensitive(input.markdown);
  const frontmatter = {
    id,
    type: input.type,
    title: input.title.trim(),
    status: "ready-for-review",
    createdAt: today(),
    source: input.source ?? "manual",
  };
  fs.writeFileSync(
    path.join(QUEUE_DIR, `${id}.md`),
    matter.stringify(text, frontmatter),
    "utf8"
  );
  appendAudit({ contentId: id, action: "CREATED", user: "admin" });
  if (redacted > 0) {
    appendAudit({
      contentId: id,
      action: "SANITIZED",
      user: "admin",
      reason: `${redacted} sensitive value(s) replaced with [REDACTED]`,
    });
  }
  const item = getQueueItem(id);
  return { ok: true, item: item ?? undefined, redacted };
}

export function updateCandidate(
  id: string,
  input: { title: string; markdown: string }
): { ok: boolean; error?: string; item?: QueueItem } {
  const item = getQueueItem(id);
  if (!item) return { ok: false, error: "Candidate not found." };
  if (!input.title.trim() || !input.markdown.trim()) {
    return { ok: false, error: "Title and content are required." };
  }
  const parsed = matter(fs.readFileSync(path.join(QUEUE_DIR, `${item.id}.md`), "utf8"));
  const frontmatter = {
    ...(parsed.data as Record<string, unknown>),
    title: input.title.trim(),
    status: "ready-for-review",
  };
  fs.writeFileSync(
    path.join(QUEUE_DIR, `${item.id}.md`),
    matter.stringify(input.markdown, frontmatter),
    "utf8"
  );
  appendAudit({ contentId: item.id, action: "EDITED", user: "admin" });
  return { ok: true, item: getQueueItem(item.id) ?? undefined };
}

export function scanCandidate(id: string): SensitiveScanResult | null {
  const item = getQueueItem(id);
  if (!item) return null;
  return scanSensitive(item.markdown);
}

export function approveCandidate(
  id: string,
  reason?: string
): { ok: boolean; error?: string; slug?: string; scan?: SensitiveScanResult } {
  const item = getQueueItem(id);
  if (!item) return { ok: false, error: "Candidate not found." };

  // Hard gate: no sensitive material may be approved.
  const scan = scanSensitive(item.markdown);
  if (!scan.clean) {
    return { ok: false, error: "Sensitive content detected — not published.", scan };
  }

  const dir = TYPE_DIR[item.type];
  const slug = uniqueSlug(slugify(item.title), dir);
  const publishedFrontmatter = {
    id: slug,
    title: item.title,
    status: "published",
    public: true,
    date: today(),
    lastUpdated: today(),
    category: "engineering",
  };
  fs.writeFileSync(
    path.join(CONTENT_DIR, dir, `${slug}.md`),
    matter.stringify(item.markdown, publishedFrontmatter),
    "utf8"
  );
  fs.rmSync(path.join(QUEUE_DIR, `${item.id}.md`));
  appendAudit({ contentId: id, action: "APPROVED", user: "admin", reason });
  appendAudit({
    contentId: slug,
    action: "PUBLISHED",
    user: "admin",
    reason: `published as ${item.type} "${slug}"`,
  });
  return { ok: true, slug, scan };
}

export function rejectCandidate(id: string, reason?: string): { ok: boolean; error?: string } {
  const item = getQueueItem(id);
  if (!item) return { ok: false, error: "Candidate not found." };
  const parsed = matter(fs.readFileSync(path.join(QUEUE_DIR, `${item.id}.md`), "utf8"));
  const frontmatter = {
    ...(parsed.data as Record<string, unknown>),
    status: "rejected",
  };
  fs.writeFileSync(
    path.join(QUEUE_DIR, `${item.id}.md`),
    matter.stringify(parsed.content, frontmatter),
    "utf8"
  );
  appendAudit({ contentId: item.id, action: "REJECTED", user: "admin", reason });
  return { ok: true };
}

// ---------------------------------------------------------------------------
// Published content management (admin)
// ---------------------------------------------------------------------------

export interface ManagedItem {
  slug: string;
  title: string;
  status: string;
  public: boolean;
  lastUpdated?: string;
  markdown: string;
}

function readManagedFile(dir: string, filename: string): ManagedItem | null {
  const slug = filename.replace(/\.md$/, "");
  try {
    const parsed = matter(fs.readFileSync(path.join(dir, filename), "utf8"));
    const data = parsed.data as Record<string, unknown>;
    const item: ManagedItem = {
      slug,
      title: (data.title as string) ?? slug,
      status: (data.status as string) ?? "unknown",
      public: data.public === true,
      lastUpdated: data.lastUpdated as string | undefined,
      markdown: parsed.content,
    };
    return item;
  } catch {
    return null;
  }
}

export function listManagedContent(type: ContentType): ManagedItem[] {
  const dir = path.join(CONTENT_DIR, TYPE_DIR[type]);
  if (!fs.existsSync(dir)) return [];
  const items = fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => readManagedFile(dir, f))
    .filter((m): m is ManagedItem => m !== null);
  return items.sort((a, b) =>
    String(b.lastUpdated ?? "").localeCompare(String(a.lastUpdated ?? ""))
  );
}

export function setPublicationStatus(
  type: ContentType,
  slug: string,
  status: "published" | "unpublished",
  reason?: string
): { ok: boolean; error?: string } {
  const safeSlug = slug.replace(/[^a-zA-Z0-9-_]/g, "");
  const full = path.join(CONTENT_DIR, TYPE_DIR[type], `${safeSlug}.md`);
  if (!fs.existsSync(full)) return { ok: false, error: "Content not found." };
  const parsed = matter(fs.readFileSync(full, "utf8"));
  const frontmatter = {
    ...(parsed.data as Record<string, unknown>),
    status,
    public: status === "published",
    lastUpdated: today(),
  };
  fs.writeFileSync(full, matter.stringify(parsed.content, frontmatter), "utf8");
  appendAudit({
    contentId: safeSlug,
    action: status === "published" ? "PUBLISHED" : "UNPUBLISHED",
    user: "admin",
    reason,
  });
  return { ok: true };
}

// ---------------------------------------------------------------------------
// Export (spec §74) — only PUBLISHED public data leaves as JSON.
// ---------------------------------------------------------------------------

export function exportPublic(type: "all" | ContentType): Record<string, unknown> {
  const bundle: Record<string, unknown> = {
    exportedAt: new Date().toISOString(),
  };
  if (type === "all" || type === "project") {
    bundle.projects = getProjects();
  }
  if (type === "all" || type === "journal") {
    bundle.journal = getJournal();
  }
  if (type === "all" || type === "case-study") {
    bundle["case-studies"] = getCaseStudies();
  }
  if (type === "all") {
    bundle.skills = getSkills();
    bundle.updates = getUpdates();
  }
  return bundle;
}