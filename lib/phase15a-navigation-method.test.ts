import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

function read(relativePath: string) {
  return fs.readFileSync(
    path.join(process.cwd(), relativePath),
    "utf8"
  );
}

describe("Phase 15A homepage navigation and methodology", () => {
  const page = read("app/page.tsx");
  const methodology = read("components/HowIWorkScroll.tsx");
  const rail = read("components/ScrollRail.tsx");

  it("provides real homepage anchor targets", () => {
    expect(page).toMatch(/<section[^>]*id="work"/);
    expect(page).toMatch(/<section[^>]*id="journal"/);
    expect(page).toMatch(/<section[^>]*id="skills"/);
    expect(page).toMatch(/<section[^>]*id="ai-use"/);
    expect(page).toMatch(/<section[^>]*id="contact"/);

    expect(methodology).toContain('id="method"');
  });

  it("uses reference-style rail labels", () => {
    for (const label of [
      "Hero",
      "Selected work",
      "Methodology",
      "AI use",
      "Capabilities",
      "Recent activity",
      "Contact",
    ]) {
      expect(rail).toContain(`label: "${label}"`);
    }
  });

  it("shows the section rail only on the homepage", () => {
    expect(rail).toContain("usePathname");
    expect(rail).toContain('pathname !== "/"');
  });

  it("removes the old scroll-depth methodology effects", () => {
    expect(methodology).not.toContain("useScrollDepth");
    expect(methodology).not.toContain("useElementScroll");
    expect(methodology).not.toContain("MethodologyProgressBar");
    expect(methodology).not.toContain("#0ea5e9");
    expect(methodology).not.toContain("#22d3ee");
    expect(methodology).not.toContain("rotateX");
    expect(methodology).not.toContain("translateZ");
  });

  it("keeps the eight-step engineering loop", () => {
    for (const step of [
      "Understand",
      "Research",
      "Plan",
      "Build",
      "Test",
      "Verify",
      "Document",
      "Improve",
    ]) {
      expect(methodology).toContain(step);
    }
  });
});

describe("document-mapped rail", () => {
  const rail = read("components/ScrollRail.tsx");

  it("matches the current homepage document order", () => {
    expect(rail.indexOf('id: "journal"')).toBeLessThan(
      rail.indexOf('id: "method"')
    );

    expect(rail.indexOf('id: "method"')).toBeLessThan(
      rail.indexOf('id: "skills"')
    );

    expect(rail.indexOf('id: "skills"')).toBeLessThan(
      rail.indexOf('id: "ai-use"')
    );
  });

  it("maps rail nodes to real document positions", () => {
    expect(rail).toContain("sectionPositions");
    expect(rail).toContain("measureSections");
    expect(rail).toContain("scroll-rail-item");
    expect(rail).toContain("targetScroll");
  });

  it("provides explicit clickable section navigation", () => {
    expect(rail).toContain("handleSectionClick");
    expect(rail).toContain("scrollIntoView");
    expect(rail).toContain("window.history.replaceState");
    expect(rail).toContain("onClick");
  });
});