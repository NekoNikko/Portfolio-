import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const source = fs.readFileSync(
  path.join(process.cwd(), "components/ScrollRail.tsx"),
  "utf8"
);

describe("Phase 15A homepage scroll restoration", () => {
  it("uses manual browser scroll restoration", () => {
    expect(source).toContain(
      'window.history.scrollRestoration = "manual"'
    );
  });

  it("detects browser reloads", () => {
    expect(source).toContain(
      'performance.getEntriesByType('
    );
    expect(source).toContain(
      'navigation?.type === "reload"'
    );
  });

  it("clears section hashes and returns reloads to hero", () => {
    expect(source).toContain(
      "window.history.replaceState("
    );
    expect(source).toContain(
      "window.location.pathname + window.location.search"
    );
    expect(source).toContain("window.scrollTo({");
  });

  it("still supports section hashes during normal navigation", () => {
    expect(source).toContain(
      "document.getElementById(hash)"
    );
    expect(source).toContain(
      "target?.scrollIntoView({"
    );
  });

  it("restores Hero as the active rail section at the top of the page", () => {
    expect(source).toContain("window.scrollY <= 8");
    expect(source).toContain('setActiveId("hero")');
  });});
