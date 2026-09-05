// Server-only helper wiring the pure session logic (lib/admin-auth.ts) to
// Next.js cookies. Kept separate so the pure module stays testable in node.

import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  adminConfigured,
  verifySessionToken,
} from "@/lib/admin-auth";

export async function isAdminSession(): Promise<boolean> {
  const store = await cookies();
  return verifySessionToken(store.get(ADMIN_COOKIE_NAME)?.value);
}

/** Guard for admin API routes. Returns an error response, or null when allowed. */
export async function requireAdminApi(): Promise<NextResponse | null> {
  if (!adminConfigured()) {
    return NextResponse.json(
      { error: "Admin area is not configured (ADMIN_PASSWORD missing)." },
      { status: 503 }
    );
  }
  if (!(await isAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}