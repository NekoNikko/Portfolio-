import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const hero3dPath = path.join(process.cwd(), "components", "Hero3D.tsx");
const source = fs.readFileSync(hero3dPath, "utf8");

describe("Hero3D SSR-safe mobile detection", () => {
  it("uses useSyncExternalStore instead of useEffect setState", () => {
    expect(source).toMatch(/useSyncExternalStore/);
    expect(source).not.toMatch(/setIsMobile\(window\.innerWidth/);
  });

  it("subscribes to matchMedia changes and returns an unsubscribe function", () => {
    expect(source).toContain("function subscribeToMobileQuery");
    expect(source).toContain('addEventListener("change", callback)');
    expect(source).toContain('removeEventListener("change", callback)');
  });

  it("uses separate client and deterministic server snapshots", () => {
    expect(source).toContain("function getMobileSnapshot");
    expect(source).toContain("function getServerMobileSnapshot");
    expect(source).toMatch(/getServerMobileSnapshot[\s\S]*?return false;/);

    expect(source).toMatch(
      /useSyncExternalStore\(\s*subscribeToMobileQuery,\s*getMobileSnapshot,\s*getServerMobileSnapshot\s*\)/
    );
  });
});
