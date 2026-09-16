// Content Queue — Phase 13.5
// File-based draft queue with approval states

import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { join, isAbsolute } from "node:path";
import { createHash } from "node:crypto";
import { QueueItem, ApprovalStatus } from "./content-automation-types.ts";
import type { ContentType } from "./content-automation-types.ts";

// Queue directory configurable via environment for test isolation
const CONTENT_DIR = join(process.cwd(), "public-content");
const QUEUE_DIR = process.env.CONTENT_QUEUE_DIR
  ? join(process.env.CONTENT_QUEUE_DIR, "queue")
  : join(process.cwd(), "public-content", "queue");
const QUEUE_INDEX = join(QUEUE_DIR, "index.json");

interface QueueIndex {
  version: number;
  items: QueueIndexItem[];
  updatedAt: string;
}

interface QueueIndexItem {
  id: string;
  contentType: string;
  targetSlug: string;
  approvalStatus: string;
  generatedAt: string;
  sanitizedAt: string | null;
  file: string;
}

// Ensure queue directory exists
function ensureQueueDir() {
  if (!existsSync(QUEUE_DIR)) {
    mkdirSync(QUEUE_DIR, { recursive: true });
  }
  if (!existsSync(QUEUE_INDEX)) {
    writeFileSync(QUEUE_INDEX, JSON.stringify({ version: 1, items: [], updatedAt: new Date().toISOString() }, null, 2));
  }
}

function readIndex(): QueueIndex {
  ensureQueueDir();
  try {
    return JSON.parse(readFileSync(QUEUE_INDEX, "utf8"));
  } catch {
    return { version: 1, items: [], updatedAt: new Date().toISOString() };
  }
}

export function readIndexPublic(): QueueIndex {
  return readIndex();
}

export function writeIndex(index: QueueIndex) {
  ensureQueueDir();
  index.updatedAt = new Date().toISOString();
  writeFileSync(QUEUE_INDEX, JSON.stringify(index, null, 2));
}

export function generateId(content: Record<string, unknown>, sourceRef: string): string {
  const hash = createHash("sha256")
    .update(JSON.stringify(content) + sourceRef)
    .digest("hex")
    .slice(0, 12);
  return `q-${hash}`;
}

/**
 * Add a new item to the queue
 */
export function enqueueContent(
  contentType: "PROJECT" | "JOURNAL_ENTRY" | "CASE_STUDY" | "CURRENT_BUILD" | "ENGINEERING_UPDATE",
  content: Record<string, unknown>,
  sourceReference: string,
  sourceType: "jarvis_task" | "jarvis_journal" | "jarvis_verification" | "jarvis_report" | "manual",
  sourceTimestamp: string
): QueueItem {
  ensureQueueDir();
  
  const id = generateId(content, sourceReference);
  const now = new Date().toISOString();
  const fileName = `${content.id || content.slug || "item"}-${Date.now()}.json`;
  const filePath = join(QUEUE_DIR, fileName);

  const item: QueueItem = {
    id,
    contentType: content["contentType"] as any || contentType,
    targetSlug: content.slug as string || content.id as string || `item-${Date.now()}`,
    sourceReference,
    sourceType,
    sourceTimestamp,
    generatedAt: new Date().toISOString(),
    sanitizedAt: null,
    approvalStatus: "DRAFT",
    proposedContent: content,
    sanitizationReport: null,
  };

  // Write item file
  writeFileSync(join(QUEUE_DIR, fileName), JSON.stringify(item, null, 2));

  // Update index
  const index = readIndex();
  index.items.push({
    id,
    contentType,
    targetSlug: item.targetSlug,
    approvalStatus: "DRAFT",
    generatedAt: now,
    sanitizedAt: null,
    file: fileName,
  });
  writeIndex(index);

  return item;
}

/**
 * Get all queue items
 */
export function getQueueItems(): QueueItem[] {
  ensureQueueDir();
  const index = readIndex();
  const items: QueueItem[] = [];
  
  for (const entry of index.items) {
    try {
      const filePath = join(QUEUE_DIR, entry.file);
      if (existsSync(filePath)) {
        const item = JSON.parse(readFileSync(filePath, "utf8"));
        items.push(item);
      }
    } catch {
      // Skip corrupted files
    }
  }
  
  return items;
}

/**
 * Get items by approval status
 */
export function getQueueByStatus(status: "DRAFT" | "REVIEW_REQUIRED" | "APPROVED" | "REJECTED" | "PUBLISHED"): QueueItem[] {
  return getQueueItems().filter((item) => item.approvalStatus === status);
}

/**
 * Get a single queue item by ID
 */
export function getQueueItem(id: string): QueueItem | null {
  const index = readIndex();
  const entry = index.items.find((e) => e.id === id);
  if (!entry) return null;
  
  try {
    const filePath = join(QUEUE_DIR, entry.file);
    if (existsSync(filePath)) {
      return JSON.parse(readFileSync(filePath, "utf8"));
    }
  } catch {
    return null;
  }
  return null;
}

/**
 * Sanitize and mark as review required
 */
export function submitForReview(id: string, sanitizedContent: Record<string, unknown>, sanitizationReport: any): QueueItem | null {
  const item = getQueueItem(id);
  if (!item) return null;

  item.proposedContent = sanitizedContent;
  item.sanitizationReport = sanitizationReport;
  item.approvalStatus = "REVIEW_REQUIRED";
  item.sanitizedAt = new Date().toISOString();

  // Update file
  const index = readIndex();
  const entry = index.items.find((e) => e.id === id);
  if (entry) {
    writeFileSync(join(QUEUE_DIR, entry.file), JSON.stringify(item, null, 2));
    entry.approvalStatus = "REVIEW_REQUIRED";
    entry.sanitizedAt = item.sanitizedAt;
    writeIndex(index);
  }

  return item;
}

/**
 * Approve an item (move to APPROVED)
 */
export function approveContent(id: string): QueueItem | null {
  const item = getQueueItem(id);
  if (!item) return null;

  if (item.approvalStatus !== "REVIEW_REQUIRED") {
    throw new Error(`Cannot approve item with status: ${item.approvalStatus}. Must be REVIEW_REQUIRED.`);
  }

  item.approvalStatus = "APPROVED";
  item.sanitizedAt = new Date().toISOString();

  // Update file
  const index = readIndex();
  const entry = index.items.find((e) => e.id === id);
  if (entry) {
    writeFileSync(join(QUEUE_DIR, entry.file), JSON.stringify(item, null, 2));
    entry.approvalStatus = "APPROVED";
    entry.sanitizedAt = item.sanitizedAt;
    writeIndex(index);
  }

  return item;
}

/**
 * Reject an item
 */
export function rejectContent(id: string, reason?: string): QueueItem | null {
  const item = getQueueItem(id);
  if (!item) return null;

  item.approvalStatus = "REJECTED";
  if (reason) {
    item.proposedContent = { ...item.proposedContent, rejectionReason: reason };
  }

  // Update file
  const index = readIndex();
  const entry = index.items.find((e) => e.id === id);
  if (entry) {
    writeFileSync(join(QUEUE_DIR, entry.file), JSON.stringify(item, null, 2));
    entry.approvalStatus = "REJECTED";
    writeIndex(index);
  }

  return item;
}

/**
 * Mark as published (after rendering to public-content/)
 */
export function markPublished(id: string): QueueItem | null {
  const item = getQueueItem(id);
  if (!item) return null;

  if (item.approvalStatus !== "APPROVED") {
    throw new Error(`Cannot publish item with status: ${item.approvalStatus}`);
  }

  item.approvalStatus = "PUBLISHED";

  // Update file
  const index = readIndex();
  const entry = index.items.find((e) => e.id === id);
  if (entry) {
    writeFileSync(join(QUEUE_DIR, entry.file), JSON.stringify(item, null, 2));
    entry.approvalStatus = "PUBLISHED";
    writeIndex(index);
  }

  return item;
}

/**
 * Get queue statistics
 */
export function getQueueStats(): {
  total: number;
  byStatus: Record<string, number>;
  byType: Record<string, number>;
} {
  const items = getQueueItems();
  const stats = {
    total: items.length,
    byStatus: {} as Record<string, number>,
    byType: {} as Record<string, number>,
  };

  for (const item of items) {
    stats.byStatus[item.approvalStatus] = (stats.byStatus[item.approvalStatus] || 0) + 1;
    stats.byType[item.contentType] = (stats.byType[item.contentType] || 0) + 1;
  }

  return stats;
}

/**
 * Clean up published items older than N days
 */
export function cleanupPublished(olderThanDays: number = 30): number {
  const index = readIndex();
  const cutoff = Date.now() - olderThanDays * 24 * 60 * 60 * 1000;
  let cleaned = 0;

  const newItems = index.items.filter((entry) => {
    if (entry.approvalStatus === "PUBLISHED") {
      const generatedAt = new Date(entry.generatedAt).getTime();
      if (generatedAt < cutoff) {
        // Delete file
        try {
          const filePath = join(QUEUE_DIR, entry.file);
          if (existsSync(filePath)) {
            // Keep the file but could remove it
            // For now, just remove from index
          }
        } catch {}
        cleaned++;
        return false;
      }
    }
    return true;
  });

  index.items = newItems;
  writeIndex(index);
  return cleaned;
}

export type { QueueItem, ApprovalStatus };

// Test utilities - only available when CONTENT_QUEUE_DIR is set
export function __resetQueueForTesting(): void {
  if (process.env.CONTENT_QUEUE_DIR) {
    const testQueueDir = join(process.cwd(), process.env.CONTENT_QUEUE_DIR);
    const testIndexPath = join(testQueueDir, "index.json");
    if (existsSync(testQueueDir)) {
      rmSync(testQueueDir, { recursive: true, force: true });
    }
    if (existsSync(testIndexPath)) {
      // already cleaned by rmSync
    }
  }
}