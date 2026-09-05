import { NextResponse } from "next/server";
import { getCaseStudies, toPublicCaseStudy } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function GET() {
  const caseStudies = getCaseStudies().map(toPublicCaseStudy);
  return NextResponse.json(
    { data: caseStudies, count: caseStudies.length },
    {
      headers: {
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      },
    }
  );
}