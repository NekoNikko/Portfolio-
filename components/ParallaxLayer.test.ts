import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

function read(relativePath: string) {
  return fs.readFileSync(
    path.join(process.cwd(), relativePath),
    "utf8"
  );
}

describe("parallax runtime stability", () => {
  const parallax = read("components/ParallaxLayer.tsx");
  const hero = read("components/Hero3D.tsx");
  const building = read(
    "components/CurrentlyBuildingStack.tsx"
  );
  const howIWork = read(
    "components/HowIWorkScroll.tsx"
  );

  it("uses stable module-level arrays for parallax defaults and observer thresholds", () => {
    expect(parallax).toMatch(
      /const PARALLAX_THRESHOLDS:\s*number\[\]/
    );
    expect(parallax).toMatch(
      /const DEFAULT_SCALE_RANGE:/
    );
    expect(parallax).toMatch(
      /const DEFAULT_OPACITY_RANGE:/
    );
  });

  it("still supports normal-flow layers for remaining consumers", () => {
    expect(parallax).toContain(
      'layout?: "absolute" | "flow"'
    );
    expect(parallax).toContain(
      'layout === "flow" ? "relative" : "absolute"'
    );
  });

  it("uses the new corporate topology hero instead of ParallaxLayer", () => {
    expect(hero).not.toContain("ParallaxLayer");
    expect(hero).toContain("topologyRef");
    expect(hero).toContain("initTopology");
  });

  it("keeps observer thresholds stable in remaining scroll consumers", () => {
    expect(building).toMatch(
      /const SCROLL_THRESHOLDS:\s*number\[\]\s*=\s*\[0,\s*0\.1,\s*0\.25,\s*0\.5,\s*0\.75,\s*0\.9,\s*1\]/
    );

    expect(building).toContain(
      "threshold: SCROLL_THRESHOLDS"
    );

    expect(howIWork).not.toContain(
      "useElementScroll"
    );

    expect(howIWork).not.toContain(
      "useScrollDepth"
    );
  });
});