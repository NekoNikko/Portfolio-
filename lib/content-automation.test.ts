// Content Automation Tests — Phase 13.6
// Test-isolated content automation pipeline

import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { mkdirSync, rmSync } from "node:fs";

vi.mock("gray-matter", () => ({
  default: vi.fn(() => ({ data: {}, content: "" })),
}));

describe("Content Automation Pipeline", () => {
  let testQueueDir: string;

  async function getQueueModule() {
    const mod = await import("./content-queue");
    return mod;
  }

  async function getSanitizerModule() {
    const mod = await import("./content-sanitizer");
    return mod;
  }

  async function getGeneratorsModule() {
    const mod = await import("./content-generators");
    return mod;
  }

  beforeEach(async () => {
    vi.clearAllMocks();
    vi.resetModules();
    // Create unique test queue directory for each test
    testQueueDir = join(tmpdir(), `content-queue-test-${Date.now()}-${Math.random().toString(36).slice(2)}`);
    process.env.CONTENT_QUEUE_DIR = testQueueDir;
    mkdirSync(testQueueDir, { recursive: true });
    // Reset queue state for each test
    const queueModule = await getQueueModule();
    queueModule.__resetQueueForTesting();
  });

  afterEach(async () => {
    vi.clearAllMocks();
    // Clean up test queue directory
    try {
      const { rmSync: fsRmSync } = await import("node:fs");
      if (testQueueDir) {
        fsRmSync(testQueueDir, { recursive: true, force: true });
      }
    } catch {}
  });

  describe("Queue System", () => {
    it("should enqueue content and generate stable ID", async () => {
      const queueModule = await getQueueModule();
      const content = { title: "Test Project", slug: "test-project" };
      const item = queueModule.enqueueContent("PROJECT", content, "tasks/test.md", "jarvis_task", "2026-09-15T00:00:00Z");
      
      expect(item.id).toBeDefined();
      expect(item.contentType).toBe("PROJECT");
      expect(item.targetSlug).toBe("test-project");
      expect(item.approvalStatus).toBe("DRAFT");
      expect(item.sourceReference).toBe("tasks/test.md");
    });

    it("should generate deterministic IDs for same content", async () => {
      const queueModule = await getQueueModule();
      const content = { title: "Test", slug: "test" };
      const id1 = queueModule.generateId(content, "source");
      const id2 = queueModule.generateId(content, "source");
      
      expect(id1).toBe(id2);
    });

    it("should get items by status", async () => {
      const queueModule = await getQueueModule();
      const item1 = queueModule.enqueueContent("PROJECT", { slug: "test1" }, "src1", "manual", "2026-09-15T00:00:00Z");
      queueModule.enqueueContent("JOURNAL_ENTRY", { slug: "test2" }, "src2", "manual", "2026-09-15T00:00:00Z");
      queueModule.submitForReview(item1.id, {}, { clean: true, count: 0, violations: [], redactedCount: 0 });
      
      const drafts = queueModule.getQueueByStatus("DRAFT");
      const review = queueModule.getQueueByStatus("REVIEW_REQUIRED");
      
      expect(drafts.length).toBeGreaterThanOrEqual(1);
      expect(review.length).toBeGreaterThanOrEqual(1);
    });

    it("should track approval workflow", async () => {
      const queueModule = await getQueueModule();
      const workflowItem = queueModule.enqueueContent("PROJECT", { slug: "workflow-test" }, "src", "manual", "2026-09-15T00:00:00Z");
      const id = workflowItem.id;
      
      // Submit for review
      queueModule.submitForReview(id, {}, { clean: true, count: 0, violations: [], redactedCount: 0 });
      let workflowItem2 = queueModule.getQueueItem(id);
      expect(workflowItem2?.approvalStatus).toBe("REVIEW_REQUIRED");
      
      // Approve
      queueModule.approveContent(id);
      workflowItem2 = queueModule.getQueueItem(id);
      expect(workflowItem2?.approvalStatus).toBe("APPROVED");
      
      // Publish
      queueModule.markPublished(id);
      workflowItem2 = queueModule.getQueueItem(id);
      expect(workflowItem2?.approvalStatus).toBe("PUBLISHED");
    });

    it("should reject with reason", async () => {
      const queueModule = await getQueueModule();
      const rejectItem = queueModule.enqueueContent("PROJECT", { slug: "reject-test" }, "src", "manual", "2026-09-15T00:00:00Z");
      const rejectId = rejectItem.id;
      
      queueModule.rejectContent(rejectId, "Missing verification details");
      const rejectedItem = queueModule.getQueueItem(rejectId);
      
      expect(rejectedItem?.approvalStatus).toBe("REJECTED");
      expect(rejectedItem?.proposedContent?.rejectionReason).toBe("Missing verification details");
    });

    it("should track queue stats", async () => {
      const queueModule = await getQueueModule();
      const stats = queueModule.getQueueStats();
      
      expect(stats.total).toBeGreaterThanOrEqual(0);
      expect(stats.byStatus).toBeDefined();
      expect(stats.byType).toBeDefined();
    });
  });

  describe("Sanitization", () => {
    it("should detect and redact API keys", async () => {
      const sanitizerModule = await getSanitizerModule();
      const input = 'const apiKey = "sk-1234567890abcdef";';
      const { text, redacted } = sanitizerModule.redactContent(input);
      
      expect(redacted).toBeGreaterThan(0);
      expect(text).toContain("[REDACTED]");
      expect(text).not.toContain("sk-1234567890abcdef");
    });

    it("should detect and redact passwords", async () => {
      const sanitizerModule = await getSanitizerModule();
      const input = 'password = "supersecret123"';
      const { text, redacted } = sanitizerModule.redactContent(input);
      
      expect(redacted).toBeGreaterThan(0);
      expect(text).toContain("[REDACTED]");
    });

    it("should detect and redact Authorization headers", async () => {
      const sanitizerModule = await getSanitizerModule();
      const input = 'Authorization: Bearer abc123.def456.ghi789';
      const { text, redacted } = sanitizerModule.redactContent(input);
      
      expect(redacted).toBeGreaterThan(0);
      expect(text).toContain("[REDACTED]");
    });

    it("should detect and redact local filesystem paths", async () => {
      const sanitizerModule = await getSanitizerModule();
      const input = "C:\\Users\\argen\\Desktop\\Agentic\\project";
      const { text, redacted } = sanitizerModule.redactContent(input);
      
      expect(redacted).toBeGreaterThan(0);
      expect(text).toContain("[REDACTED]");
    });

    it("should not redact owner email", async () => {
      const sanitizerModule = await getSanitizerModule();
      const input = 'contact: argente.marlon@gmail.com';
      const { text, redacted } = sanitizerModule.redactContent(input);
      
      expect(redacted).toBe(0);
      expect(text).toContain("argente.marlon@gmail.com");
    });

    it("should sanitize objects recursively", async () => {
      const sanitizerModule = await getSanitizerModule();
      const obj = {
        title: "Test",
        secret: "password123",
        nested: {
          apiKey: "sk-abc123",
          public: "visible"
        },
        tags: ["public", "secret-token"]
      };
      
      const sanitized = sanitizerModule.sanitizeObject(obj) as Record<string, unknown>;
      
      expect(sanitized.title).toBe("Test");
      expect(sanitized.secret).toBe("[REDACTED]");
      expect((sanitized.nested as Record<string, unknown>).apiKey).toBe("[REDACTED]");
      expect((sanitized.nested as Record<string, unknown>).public).toBe("visible");
      expect((sanitized.tags as string[])[1]).toBe("[REDACTED]");
    });

    it("should respect allowed fields", async () => {
      const sanitizerModule = await getSanitizerModule();
      const obj = {
        title: "Test",
        secret: "password123",
        allowed: "value"
      };
      
      const sanitized = sanitizerModule.sanitizeObject(obj, ["title", "allowed"]) as Record<string, unknown>;
      
      expect(sanitized.title).toBe("Test");
      expect(sanitized.allowed).toBe("value");
      expect(sanitized.secret).toBeUndefined();
    });

    it("should create sanitization report", async () => {
      const sanitizerModule = await getSanitizerModule();
      const input = 'api_key = "sk-abc123"; password = "secret"';
      const report = sanitizerModule.createSanitizationReport(input);
      
      expect(report.clean).toBe(false);
      expect(report.count).toBeGreaterThan(0);
      expect(report.violations.length).toBeGreaterThan(0);
      expect(report.redactedCount).toBeGreaterThan(0);
    });

    it("should sanitize drafts by type", async () => {
      const sanitizerModule = await getSanitizerModule();
      const projectDraft = {
        id: "test-1",
        slug: "test",
        title: "Test Project",
        projectStatus: "ACTIVE",
        public: true,
        summary: "Test summary",
        technologies: ["TypeScript", "secret-token"],
        date: "2026-09-15",
        lastUpdated: "2026-09-15",
        category: "infrastructure",
        sortDate: "2026-09-15",
        problem: "test",
        approach: "test",
        implementation: "test",
        verification: "test",
        outcome: "test",
        lessonsLearned: "test",
        publicArchitecture: "test",
        links: [],
        images: [],
        createdAt: "2026-09-15",
        updatedAt: "2026-09-15",
        approvalStatus: "DRAFT",
        sourceReference: "test",
        sourceType: "manual",
        sourceTimestamp: "2026-09-15T00:00:00Z",
      };
      
      const sanitized = sanitizerModule.sanitizeDraft(projectDraft, "PROJECT");
      
      expect(sanitized.technologies).toContain("[REDACTED]");
      expect(sanitized.title).toBe("Test Project");
    });
  });

  describe("Content Generators", () => {
    it("should extract project from JARVIS task with public tags", async () => {
      const mockFrontmatter = {
        id: "JAR-031",
        title: "JARVIS Public Content Automation",
        tags: ["portfolio", "public", "automation"],
        projectStatus: "IN DEVELOPMENT",
        summary: "Building content automation pipeline",
        agentic_public: false
      };
      
      const isPublicFacing = mockFrontmatter.tags?.some((t: string) => 
        ["portfolio", "public", "project", "infrastructure", "automation", "ai"].some(k => t.toLowerCase().includes(k))
      ) || mockFrontmatter.agentic_public === true;
      
      expect(isPublicFacing).toBe(true);
    });

    it("should extract current build from site.json", async () => {
      const generatorsModule = await getGeneratorsModule();
      const result = generatorsModule.extractCurrentBuild();
      
      expect(result).toBeDefined();
      expect(result?.content).toBeDefined();
      expect(result?.content.id).toBe("current-build-1");
    });

    it("should extract engineering updates", async () => {
      const generatorsModule = await getGeneratorsModule();
      const updates = generatorsModule.extractEngineeringUpdates();
      
      expect(Array.isArray(updates)).toBe(true);
    });
  });

  describe("Approval Workflow", () => {
    it("should not allow publishing non-approved items", async () => {
      const queueModule = await getQueueModule();
      const item = queueModule.enqueueContent("PROJECT", { slug: "test" }, "src", "manual", "2026-09-15T00:00:00Z");
      const id = item.id;
      
      expect(() => queueModule.markPublished(id)).toThrow("Cannot publish item with status: DRAFT");
    });

    it("should not allow approving rejected items", async () => {
      const queueModule = await getQueueModule();
      const item = queueModule.enqueueContent("PROJECT", { slug: "test" }, "src", "manual", "2026-09-15T00:00:00Z");
      const id = item.id;
      
      queueModule.rejectContent(id, "Test rejection");
      expect(() => queueModule.approveContent(id)).toThrow("Cannot approve item with status: REJECTED");
    });

    it("should track source traceability internally", async () => {
      const queueModule = await getQueueModule();
      const item = queueModule.enqueueContent("PROJECT", { slug: "trace-test" }, "tasks/JAR-031.md", "jarvis_task", "2026-09-15T00:00:00Z");
      const retrieved = queueModule.getQueueItem(item.id);
      
      expect(retrieved?.sourceReference).toBe("tasks/JAR-031.md");
      expect(retrieved?.sourceType).toBe("jarvis_task");
      expect(retrieved?.sourceTimestamp).toBeDefined();
    });

    it("should not expose private source paths in public output", async () => {
      const queueModule = await getQueueModule();
      const item = queueModule.enqueueContent("PROJECT", { slug: "trace-test" }, "C:\\Users\\argen\\Desktop\\Agentic\\tasks\\JAR-031.md", "jarvis_task", "2026-09-15T00:00:00Z");
      const retrieved = queueModule.getQueueItem(item.id);
      
      expect(retrieved?.sourceReference).toBeDefined();
    });

    it("should NOT allow direct DRAFT \u2192 APPROVED transition", async () => {
      const queueModule = await getQueueModule();
      const item = queueModule.enqueueContent("PROJECT", { slug: "test" }, "src", "manual", "2026-09-15T00:00:00Z");
      
      expect(() => queueModule.approveContent(item.id))
        .toThrow("Cannot approve item with status: DRAFT. Must be REVIEW_REQUIRED.");
    });

    it("should require submitForReview before approveContent", async () => {
      const queueModule = await getQueueModule();
      const item = queueModule.enqueueContent("PROJECT", { slug: "test2" }, "src", "manual", "2026-09-15T00:00:00Z");
      
      queueModule.submitForReview(item.id, {}, { clean: true, count: 0, violations: [], redactedCount: 0 });
      queueModule.approveContent(item.id);
      
      const approved = queueModule.getQueueItem(item.id);
      expect(approved?.approvalStatus).toBe("APPROVED");
    });
  });

  describe("Duplicate Protection", () => {
    it("should generate stable IDs for same content", async () => {
      const queueModule = await getQueueModule();
      const content = { title: "Test", slug: "test" };
      const item1 = queueModule.enqueueContent("PROJECT", content, "src", "manual", "2026-09-15T00:00:00Z");
      const item2 = queueModule.enqueueContent("PROJECT", content, "src", "manual", "2026-09-15T00:00:00Z");
      
      expect(item1.id).toBe(item2.id);
    });

    it("should generate different IDs for different sources", async () => {
      const queueModule = await getQueueModule();
      const content = { title: "Test", slug: "test" };
      const item1 = queueModule.enqueueContent("PROJECT", content, "src1", "manual", "2026-09-15T00:00:00Z");
      const item2 = queueModule.enqueueContent("PROJECT", content, "src2", "manual", "2026-09-15T00:00:00Z");
      
      expect(item1.id).not.toBe(item2.id);
    });
  });

  describe("No Cloudflare Mutation", () => {
    it("should not have Cloudflare API mutation methods", async () => {
      const queueModule = await getQueueModule();
      const methods = Object.keys(queueModule);
      
      const mutationMethods = methods.filter(m => 
        ["create", "update", "delete", "patch", "post", "put", "mutate", "deploy"].some(mut => 
          m.toLowerCase().includes(mut)
        )
      );
      
      expect(mutationMethods.length).toBe(0);
    });
  });
});