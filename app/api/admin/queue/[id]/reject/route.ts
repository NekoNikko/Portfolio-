import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin-session";
import { isValidOrigin } from "@/lib/admin-auth";
import { rejectCandidate } from "@/lib/publication";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = await requireAdminApi();
  if (denied) return denied;
  if (!isValidOrigin(req)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const { id } = await params;
  let reason: string | undefined;
  try {
    const body = (await req.json()) as { reason?: unknown };
    reason = typeof body.reason === "string" ? body.reason : undefined;
  } catch {
    // optional
  }
  const result = rejectCandidate(id, reason);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}