import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

function read(relativePath: string) {
  return fs.readFileSync(path.join(process.cwd(), relativePath), "utf8");
}

describe("Phase 15A wide portfolio hero", () => {
  const page = read("app/page.tsx");
  const hero = read("components/Hero3D.tsx");
  const site = read("public-content/site.json");
  const nav = read("components/Nav.tsx");

  it("uses the short three-line engineering headline", () => {
    expect(site).toContain(
      '"headline": "IT infrastructure.\\nAutomation.\\nAI-assisted engineering."'
    );

    expect(site).not.toContain(
      "15+ years keeping enterprises running"
    );
  });

  it("keeps only two primary hero actions", () => {
    expect(site).toContain(
      '"primaryCta": { "label": "View selected work", "href": "/projects" }'
    );

    expect(site).toContain(
      '"secondaryCta": { "label": "Contact me", "href": "/contact" }'
    );
  });

  it("moves Currently Building into the Hero3D composition", () => {
    expect(page).toContain("currentlyBuilding={building}");
    expect(page).not.toContain("<CurrentlyBuildingStack");
    expect(page).not.toContain(
      'import { CurrentlyBuildingStack } from "@/components/CurrentlyBuildingStack";'
    );

    expect(hero).toContain("currentlyBuilding?:");
    expect(hero).toContain("currentlyBuilding &&");
  });

  it("uses a wide two-column desktop hero", () => {
    expect(hero).toMatch(/lg:grid-cols-/);
    expect(hero).toContain("max-w-[1520px]");
  });

  it("uses wider homepage and navigation containers", () => {
    expect(page).toContain("max-w-[1520px]");
    expect(nav).toContain("max-w-[1520px]");
  });

  it("preserves the SSR-safe mobile implementation", () => {
    expect(hero).toContain("useSyncExternalStore");
    expect(hero).toContain("subscribeToMobileQuery");
    expect(hero).toContain("getServerMobileSnapshot");
  });
});
