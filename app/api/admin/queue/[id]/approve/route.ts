import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin-session";
import { isValidOrigin } from "@/lib/admin-auth";
import { approveCandidate } from "@/lib/publication";

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
    // optional reason — proceed without one
  }

  const result = approveCandidate(id, reason);
  if (!result.ok) {
    return NextResponse.json(
      { error: result.error, scan: result.scan },
      { status: result.error === "Sensitive content detected — not published." ? 422 : 404 }
    );
  }
  return NextResponse.json({ ok: true, slug: result.slug });
}