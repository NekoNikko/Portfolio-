import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin-session";
import { isValidOrigin } from "@/lib/admin-auth";
import { setPublicationStatus } from "@/lib/publication";
import type { ContentType } from "@/lib/publication";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ type: string; slug: string }> }
) {
  const denied = await requireAdminApi();
  if (denied) return denied;
  if (!isValidOrigin(req)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  const { type, slug } = await params;
  const validTypes: ContentType[] = ["project", "journal", "case-study"];
  if (!validTypes.includes(type as ContentType)) {
    return NextResponse.json({ error: "Invalid content type" }, { status: 400 });
  }

  let status: "published" | "unpublished" = "unpublished";
  let reason: string | undefined;
  try {
    const body = (await req.json()) as { status?: string; reason?: unknown };
    if (body.status === "published") status = "published";
    reason = typeof body.reason === "string" ? body.reason : undefined;
  } catch {
    // default: unpublish
  }

  const result = setPublicationStatus(type as ContentType, slug, status, reason);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 404 });
  }
  return NextResponse.json({ ok: true, status });
}