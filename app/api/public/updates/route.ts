import { NextResponse } from "next/server";
import { getUpdates } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function GET() {
  const updates = getUpdates();
  return NextResponse.json(
    { data: updates, count: updates.length },
    {
      headers: {
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      },
    }
  );
}