import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

describe("corporate portfolio navigation", () => {
  const source = fs.readFileSync(
    path.join(process.cwd(), "components", "Nav.tsx"),
    "utf8"
  );

  it("uses the approved corporate navigation", () => {
    for (const label of [
      "Work",
      "Method",
      "AI use",
      "Skills",
      "Journal",
      "Contact",
    ]) {
      expect(source).toContain(`label: "${label}"`);
    }

    expect(source).toContain("MA·Argente");
  });

  it("shows availability status and uses a fixed header", () => {
    expect(source).toContain("Open to work");
    expect(source).toContain("fixed inset-x-0 top-0");
    expect(source).toContain("bg-success");
  });

  it("keeps the mobile menu in the right grid column", () => {
    expect(source).toContain('className="col-start-3 justify-self-end"');
  });});