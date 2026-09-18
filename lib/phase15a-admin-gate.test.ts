import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const source = fs.readFileSync(
  path.join(process.cwd(), "app/admin/layout.tsx"),
  "utf8"
);

describe("Phase 15A temporary admin gate", () => {
  it("defaults the admin interface to disabled", () => {
    expect(source).toContain(
      'process.env.ADMIN_UI_ENABLED !== "true"'
    );
  });

  it("redirects disabled admin routes to the homepage", () => {
    expect(source).toContain(
      'import { redirect } from "next/navigation"'
    );

    expect(source).toContain(
      'redirect("/")'
    );
  });

  it("preserves child admin routes when re-enabled", () => {
    expect(source).toContain("return children;");
  });
});
