import { NextResponse } from "next/server";
import { getSkills } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function GET() {
  const groups = getSkills();
  return NextResponse.json(
    { data: groups },
    {
      headers: {
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      },
    }
  );
}