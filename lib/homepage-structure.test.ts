import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

describe("portfolio homepage structure", () => {
  const pagePath = path.join(process.cwd(), "app", "page.tsx");
  const source = fs.readFileSync(pagePath, "utf8");

  it("integrates Currently Building into Hero3D without a duplicate standalone section", () => {
    expect(source).toContain("currentlyBuilding={building}");
    expect(source).not.toContain("<CurrentlyBuildingStack");
    expect(source).not.toContain(
      'import { CurrentlyBuildingStack } from "@/components/CurrentlyBuildingStack";'
    );
  });

  it("keeps the approved post-hero homepage section order", () => {
    const markers = [
      "FEATURED PROJECTS",
      "FEATURED CASE STUDY",
      "RECENT ENGINEERING ACTIVITY",
      "HOW I WORK",
      "TECHNICAL SKILLS (preview)",
      "HOW I USE AI",
      "CONTACT",
    ];

    const positions = markers.map((marker) => source.indexOf(marker));

    for (const position of positions) {
      expect(position).toBeGreaterThan(-1);
    }

    for (let i = 1; i < positions.length; i++) {
      expect(positions[i]).toBeGreaterThan(positions[i - 1]);
    }
  });
});
