import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const page = fs.readFileSync(
  path.join(process.cwd(), "app/page.tsx"),
  "utf8"
);

describe("Phase 15A recent activity journal links", () => {
  it("uses published journal entries instead of inventing slugs", () => {
    expect(page).toContain("getJournal");
    expect(page).toContain("journalEntries.find");
    expect(page).toContain("entry.date === update.date");
    expect(page).toContain("entry.project === update.project");
    expect(page).toContain("entry.category");
  });

  it("adds the matched journal slug to activity items", () => {
    expect(page).toContain("journalSlug:");
    expect(page).toContain("journalEntry?.slug ?? null");
  });

  it("links matching recent activity titles to journal detail pages", () => {
    expect(page).toContain(
      'href={`/journal/${u.journalSlug}`}'
    );
    expect(page).toContain(
      "Read journal entry:"
    );
  });

  it("keeps activities without a matching journal entry non-clickable", () => {
    expect(page).toContain(
      "u.journalSlug ? ("
    );
    expect(page).toContain(
      '<p className="mt-1.5 text-sm font-semibold text-foreground">'
    );
  });
});
