// Public content layer.
//
// The ONLY content source is the app's own `public-content/` directory —
// never the Agentic OS vault, never arbitrary filesystem paths. Every item is
// gated by frontmatter: it renders only when `status` is `published` AND
// `public` is true. This is the enforcement point of "PRIVATE BY DEFAULT,
// PUBLIC BY APPROVAL".
//
// All reads happen server-side (Next.js server components / route handlers).
// The browser never receives a filesystem path.

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { GrayMatterFile } from "gray-matter";

const CONTENT_DIR = path.join(process.cwd(), "public-content");

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type ProjectStatus =
  | "IDEA"
  | "RESEARCH"
  | "PLANNING"
  | "IN DEVELOPMENT"
  | "TESTING"
  | "ACTIVE"
  | "COMPLETED"
  | "MAINTENANCE"
  | "ARCHIVED";

export interface ProjectFrontmatter {
  id: string;
  title: string;
  status: string; // publication status: published | draft | …
  projectStatus?: string; // lifecycle status: ACTIVE, IN DEVELOPMENT, …
  public?: boolean;
  summary?: string;
  technologies?: string[];
  date?: string;
  lastUpdated?: string;
  category?: string;
  sortDate?: string;
  relatedUpdates?: string[];
}

export interface Project extends ProjectFrontmatter {
  slug: string;
  contentMarkdown: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  project?: string;
  category?: string;
  title: string;
  summary?: string;
  technologies?: string[];
  status?: string;
  public?: boolean;
  slug: string;
  contentMarkdown: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  summary?: string;
  project?: string;
  category?: string;
  date?: string;
  technologies?: string[];
  status?: string;
  public?: boolean;
  slug: string;
  contentMarkdown: string;
}

export interface Skill {
  name: string;
  level: string;
}

export interface SkillGroup {
  name: string;
  skills: Skill[];
}

export interface UpdateItem {
  id: string;
  date: string;
  project: string;
  category: string;
  summary: string;
  detail?: string;
  public?: boolean;
}

export interface ExperiencePosition {
  role: string;
  company: string;
  period: string;
  description: string;
  highlights: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  category?: string;
  verificationUrl?: string;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function isPublished(data: Record<string, unknown>): boolean {
  return data.status === "published" && data.public === true;
}

/**
 * js-yaml (used by gray-matter) parses unquoted dates like `2026-09-05` into
 * Date objects. Normalize every date field to an ISO date string so sorting
 * and rendering never receive a Date.
 */
function normalizeFrontmatter(
  data: Record<string, unknown>
): Record<string, unknown> {
  for (const key of ["date", "lastUpdated", "sortDate"]) {
    const value = data[key];
    if (value instanceof Date) data[key] = value.toISOString().slice(0, 10);
    else if (value !== undefined && value !== null) data[key] = String(value);
  }
  return data;
}

/** Read + parse one markdown file; returns null when missing or unpublished. */
function readMarkdownFile(
  dir: string,
  slug: string
): { slug: string; data: Record<string, unknown>; content: string } | null {
  const safeSlug = slug.replace(/[^a-zA-Z0-9-_]/g, "");
  const fullPath = path.join(CONTENT_DIR, dir, `${safeSlug}.md`);
  try {
    const raw = fs.readFileSync(fullPath, "utf8");
    const parsed = matter(raw) as GrayMatterFile<string> & {
      data: Record<string, unknown>;
    };
    return {
      slug: safeSlug,
      data: normalizeFrontmatter(parsed.data),
      content: parsed.content,
    };
  } catch {
    return null;
  }
}

function readMarkdownDir(
  dir: string
): Array<{ slug: string; data: Record<string, unknown>; content: string }> {
  const fullDir = path.join(CONTENT_DIR, dir);
  if (!fs.existsSync(fullDir)) return [];
  return fs
    .readdirSync(fullDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const parsed = readMarkdownFile(dir, f.replace(/\.md$/, ""));
      return parsed ?? { slug: "", data: {}, content: "" };
    })
    .filter((f) => f.slug !== "");
}

function sortByDateDesc<T extends { date?: string; sortDate?: string }>(items: T[]): T[] {
  return [...items].sort((a, b) => {
    const da = a.sortDate ?? a.date ?? "";
    const db = b.sortDate ?? b.date ?? "";
    return db.localeCompare(da);
  });
}

// ---------------------------------------------------------------------------
// Loaders (published/public only)
// ---------------------------------------------------------------------------

export function getProjects(): Project[] {
  return sortByDateDesc(
    readMarkdownDir("projects")
      .filter((f) => isPublished(f.data))
      .map((f) => ({
        slug: f.slug,
        ...(f.data as unknown as ProjectFrontmatter),
        contentMarkdown: f.content,
      }))
  );
}

export function getProject(slug: string): Project | null {
  const file = readMarkdownFile("projects", slug);
  if (!file || !isPublished(file.data)) return null;
  return {
    slug: file.slug,
    ...(file.data as unknown as ProjectFrontmatter),
    contentMarkdown: file.content,
  };
}

export function getJournal(): JournalEntry[] {
  return sortByDateDesc(
    readMarkdownDir("journal")
      .filter((f) => isPublished(f.data))
      .map((f) => ({
        slug: f.slug,
        ...(f.data as unknown as Omit<JournalEntry, "slug" | "contentMarkdown">),
        contentMarkdown: f.content,
      }))
  );
}

export function getJournalEntry(slug: string): JournalEntry | null {
  const file = readMarkdownFile("journal", slug);
  if (!file || !isPublished(file.data)) return null;
  return {
    slug: file.slug,
    ...(file.data as unknown as Omit<JournalEntry, "slug" | "contentMarkdown">),
    contentMarkdown: file.content,
  };
}

export function getCaseStudies(): CaseStudy[] {
  return sortByDateDesc(
    readMarkdownDir("case-studies")
      .filter((f) => isPublished(f.data))
      .map((f) => ({
        slug: f.slug,
        ...(f.data as unknown as Omit<CaseStudy, "slug" | "contentMarkdown">),
        contentMarkdown: f.content,
      }))
  );
}

export function getCaseStudy(slug: string): CaseStudy | null {
  const file = readMarkdownFile("case-studies", slug);
  if (!file || !isPublished(file.data)) return null;
  return {
    slug: file.slug,
    ...(file.data as unknown as Omit<CaseStudy, "slug" | "contentMarkdown">),
    contentMarkdown: file.content,
  };
}

export function getSkills(): SkillGroup[] {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, "skills.json"), "utf8");
  const parsed = JSON.parse(raw) as { groups: SkillGroup[] };
  return parsed.groups ?? [];
}

export function getTechStack(): { name: string; level: string }[] {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, "skills.json"), "utf8");
  const parsed = JSON.parse(raw) as { techStack?: { name: string; level: string }[] };
  return parsed.techStack ?? [];
}

export function getExperience(): ExperiencePosition[] {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, "experience.json"), "utf8");
  const parsed = JSON.parse(raw) as { positions: ExperiencePosition[] };
  return parsed.positions ?? [];
}

export function getCertifications(): Certification[] {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, "certifications.json"), "utf8");
  const parsed = JSON.parse(raw) as { certifications: Certification[] };
  return parsed.certifications ?? [];
}

export function getTestimonials(): Testimonial[] {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, "testimonials.json"), "utf8");
  const parsed = JSON.parse(raw) as { testimonials: Testimonial[] };
  return parsed.testimonials ?? [];
}

export function getUpdates(): UpdateItem[] {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, "updates.json"), "utf8");
  const parsed = JSON.parse(raw) as { updates: UpdateItem[] };
  return (parsed.updates ?? []).filter((u) => u.public !== false);
}

export function getSiteConfig(): Record<string, unknown> {
  const raw = fs.readFileSync(path.join(CONTENT_DIR, "site.json"), "utf8");
  return JSON.parse(raw) as Record<string, unknown>;
}

// ---------------------------------------------------------------------------
// Public API payloads (never leak internal fields)
// ---------------------------------------------------------------------------

export function toPublicProject(p: Project) {
  return {
    id: p.id ?? p.slug,
    slug: p.slug,
    title: p.title,
    status: p.projectStatus ?? p.status,
    summary: p.summary ?? "",
    technologies: p.technologies ?? [],
    category: p.category ?? null,
    lastUpdated: p.lastUpdated ?? p.date ?? null,
  };
}

export function toPublicJournal(j: JournalEntry) {
  return {
    id: j.id,
    slug: j.slug,
    date: j.date,
    project: j.project ?? null,
    category: j.category ?? null,
    title: j.title,
    summary: j.summary ?? "",
    technologies: j.technologies ?? [],
  };
}

export function toPublicCaseStudy(c: CaseStudy) {
  return {
    id: c.id,
    slug: c.slug,
    title: c.title,
    project: c.project ?? null,
    category: c.category ?? null,
    date: c.date ?? null,
    summary: c.summary ?? "",
    technologies: c.technologies ?? [],
  };
}