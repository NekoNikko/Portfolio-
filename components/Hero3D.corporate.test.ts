import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const source = fs.readFileSync(
  path.join(process.cwd(), "components", "Hero3D.tsx"),
  "utf8"
);

describe("Phase 15A corporate topology hero", () => {
  it("loads pinned Three.js r128 from cdnjs", () => {
    expect(source).toContain(
      "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"
    );
  });

  it("uses a dedicated topology canvas/container instead of the old parallax layers", () => {
    expect(source).toContain("topologyRef");
    expect(source).toContain("initTopology");
    expect(source).not.toContain("ParallaxLayer");
  });

  it("uses approximately 45 topology nodes", () => {
    expect(source).toMatch(/NODE_COUNT\s*=\s*45/);
  });

  it("preserves reduced-motion behavior", () => {
    expect(source).toContain("prefers-reduced-motion");
    expect(source).toContain("reducedMotion");
  });

  it("uses the approved corporate hero content", () => {
    expect(source).toContain("IT infrastructure.");
    expect(source).toContain("Automation.");
    expect(source).toContain("AI-assisted engineering.");
    expect(source).toContain("View selected work");
    expect(source).toContain("Contact me");
  });

  it("renders the live JARVIS status panel", () => {
    expect(source).toContain("Currently building");
    expect(source).toContain("Live");
    expect(source).toContain("JARVIS Agentic OS");
    expect(source).toContain("Active development");
    expect(source).toContain("Current phase");
    expect(source).toContain("Last public update");
    expect(source).toMatch(
      /A controlled public view of current\s+work/
    );
  });

  it("includes the explicit real-media placeholder", () => {
    expect(source).toContain("Photo or demo clip goes here.");
    expect(source).toContain("media-placeholder");
  });

  it("uses sharp corporate styling rather than decorative glow cards", () => {
    expect(source).toContain("rounded-[4px]");
    expect(source).not.toContain("shadow-2xl");
    expect(source).not.toContain("glow-accent");
  });
});
