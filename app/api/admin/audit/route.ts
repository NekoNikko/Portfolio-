import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin-session";
import { getAuditLog } from "@/lib/publication";

export async function GET() {
  const denied = await requireAdminApi();
  if (denied) return denied;
  return NextResponse.json({ data: getAuditLog() });
}