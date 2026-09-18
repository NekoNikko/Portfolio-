import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

function read(relativePath: string) {
  return fs.readFileSync(path.join(process.cwd(), relativePath), "utf8");
}

describe("Phase 15A corporate portfolio shell", () => {
  const css = read("app/globals.css");
  const layout = read("app/layout.tsx");
  const nav = read("components/Nav.tsx");

  it("uses the approved corporate amber design tokens", () => {
    expect(css).toContain("#0E1620");
    expect(css).toContain("#141E29");
    expect(css).toContain("#26333F");
    expect(css).toContain("#1B2733");
    expect(css).toContain("#E9EEF2");
    expect(css).toContain("#93A3B0");
    expect(css).toContain("#5D6B78");
    expect(css).toContain("#E8A33D");
    expect(css).toContain("#7A5A2A");
    expect(css).toContain("#6FCF97");

    expect(css).not.toContain("#38bdf8");
  });

  it("uses Space Grotesk, IBM Plex Sans and IBM Plex Mono", () => {
    expect(layout).toContain("Space_Grotesk");
    expect(layout).toContain("IBM_Plex_Sans");
    expect(layout).toContain("IBM_Plex_Mono");

    expect(layout).not.toContain("Geist");
    expect(layout).not.toContain("Geist_Mono");
  });

  it("uses the corporate navigation labels", () => {
    for (const label of [
      "Work",
      "Method",
      "AI use",
      "Skills",
      "Journal",
      "Contact",
    ]) {
      expect(nav).toContain(`label: "${label}"`);
    }

    expect(nav).toContain("MA·Argente");
    expect(nav).toContain("Open to work");
  });

  it("uses a fixed header instead of the previous sticky header", () => {
    expect(nav).toContain("fixed inset-x-0 top-0");
    expect(nav).not.toContain("sticky top-0");
  });

  it("installs the responsive scroll progress navigation", () => {
    expect(layout).toContain('import ScrollRail from "@/components/ScrollRail"');
    expect(layout).toContain("<ScrollRail");
    expect(
      fs.existsSync(path.join(process.cwd(), "components", "ScrollRail.tsx"))
    ).toBe(true);
  });

  it("preserves reduced-motion support", () => {
    expect(css).toContain("prefers-reduced-motion: reduce");
  });
});
