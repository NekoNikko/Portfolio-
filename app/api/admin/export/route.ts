import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/admin-session";
import { exportPublic } from "@/lib/publication";

export async function GET(req: Request) {
  const denied = await requireAdminApi();
  if (denied) return denied;

  const url = new URL(req.url);
  const typeParam = url.searchParams.get("type") ?? "all";
  const type = ["all", "project", "journal", "case-study"].includes(typeParam)
    ? (typeParam as "all" | "project" | "journal" | "case-study")
    : "all";

  const data = exportPublic(type);
  return NextResponse.json(data, {
    headers: {
      "Content-Disposition": `attachment; filename="portfolio-export-${type}-${new Date()
        .toISOString()
        .slice(0, 10)}.json"`,
      "Cache-Control": "no-store",
    },
  });
}