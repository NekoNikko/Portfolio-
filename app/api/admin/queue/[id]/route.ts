import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin-session";
import { isValidOrigin } from "@/lib/admin-auth";
import { getQueueItem, updateCandidate, scanCandidate } from "@/lib/publication";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdminApi();
  if (denied) return denied;
  const { id } = await params;
  const item = getQueueItem(id);
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ item, scan: scanCandidate(id) });
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdminApi();
  if (denied) return denied;
  if (!isValidOrigin(req)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const { id } = await params;
  let body: { title?: string; markdown?: string };
  try {
    body = (await req.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const result = updateCandidate(id, {
    title: body.title ?? "",
    markdown: body.markdown ?? "",
  });
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
  return NextResponse.json({ ok: true, item: result.item, scan: scanCandidate(id) });
}