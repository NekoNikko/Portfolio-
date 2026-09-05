import { describe, expect, it } from "vitest";
import {
  getProjects,
  getProject,
  getJournal,
  getJournalEntry,
  getCaseStudies,
  getCaseStudy,
  getSkills,
  getUpdates,
  toPublicProject,
} from "@/lib/content";

describe("content loaders (publication gating)", () => {
  it("exposes only published + public projects", () => {
    const projects = getProjects();
    expect(projects.length).toBeGreaterThanOrEqual(3);
    for (const p of projects) {
      expect(p.public).toBe(true);
      expect(p.status).toBe("published");
      expect(p.title).toBeTruthy();
      expect(p.slug).toBeTruthy();
    }
  });

  it("getProject returns null for unpublished or missing slugs", () => {
    expect(getProject("definitely-not-a-real-project")).toBeNull();
  });

  it("getProject resolves a known project", () => {
    const project = getProject("jarvis-agentic-os");
    expect(project).not.toBeNull();
    expect(project!.title).toBe("JARVIS Agentic OS");
  });

  it("journal contains only published entries with dates", () => {
    const journal = getJournal();
    expect(journal.length).toBeGreaterThanOrEqual(2);
    for (const entry of journal) {
      expect(entry.public).toBe(true);
      expect(entry.status).toBe("published");
      expect(entry.date).toMatch(/^\d{4}-\d{2}-\d{2}/);
      expect(entry.title).toBeTruthy();
    }
  });

  it("journal entries resolve individually", () => {
    const journal = getJournal();
    const first = getJournalEntry(journal[0].slug);
    expect(first).not.toBeNull();
    expect(first!.id).toBe(journal[0].id);
  });

  it("case studies are published and resolvable", () => {
    const caseStudies = getCaseStudies();
    expect(caseStudies.length).toBeGreaterThanOrEqual(1);
    const detail = getCaseStudy(caseStudies[0].slug);
    expect(detail).not.toBeNull();
  });

  it("skills contain grouped, named skills", () => {
    const groups = getSkills();
    expect(groups.length).toBeGreaterThan(0);
    for (const group of groups) {
      expect(group.name).toBeTruthy();
      expect(group.skills.length).toBeGreaterThan(0);
    }
  });

  it("updates are public only", () => {
    const updates = getUpdates();
    expect(updates.length).toBeGreaterThan(0);
    for (const u of updates) {
      expect(u.public).not.toBe(false);
      expect(u.date).toMatch(/^\d{4}-\d{2}-\d{2}/);
    }
  });
});

describe("public API payloads (no internal fields leak)", () => {
  it("toPublicProject exposes only approved fields", () => {
    const [project] = getProjects();
    const payload = toPublicProject(project);
    expect(payload).not.toHaveProperty("contentMarkdown");
    expect(payload).not.toHaveProperty("status_pipeline");
    expect(Object.keys(payload).sort()).toEqual(
      [
        "id", "slug", "title", "status", "summary",
        "technologies", "category", "lastUpdated",
      ].sort()
    );
  });
});