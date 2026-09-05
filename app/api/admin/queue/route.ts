import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin-session";
import { isValidOrigin } from "@/lib/admin-auth";
import { listQueue, createCandidate } from "@/lib/publication";
import type { ContentType } from "@/lib/publication";

export async function GET() {
  const denied = await requireAdminApi();
  if (denied) return denied;
  return NextResponse.json({ data: listQueue() });
}

export async function POST(req: Request) {
  const denied = await requireAdminApi();
  if (denied) return denied;
  if (!isValidOrigin(req)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  let body: { type?: string; title?: string; markdown?: string };
  try {
    body = (await req.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const validTypes: ContentType[] = ["project", "journal", "case-study"];
  const type = validTypes.includes(body.type as ContentType)
    ? (body.type as ContentType)
    : "journal";

  const result = createCandidate({
    type,
    title: body.title ?? "",
    markdown: body.markdown ?? "",
    source: "manual",
  });
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
  return NextResponse.json(
    { ok: true, item: result.item, redacted: result.redacted },
    { status: 201 }
  );
}