import { NextResponse } from "next/server";
import { getProjects, toPublicProject } from "@/lib/content";

export const dynamic = "force-dynamic";

/**
 * Public read-only API — exposes ONLY published/public content from
 * public-content/. Never touches the private Agentic OS vault.
 * No authentication required: everything served here is already approved.
 */
export async function GET() {
  const projects = getProjects().map(toPublicProject);
  return NextResponse.json(
    { data: projects, count: projects.length },
    {
      headers: {
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      },
    }
  );
}