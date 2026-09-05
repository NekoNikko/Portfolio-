import { NextResponse } from "next/server";
import { getJournal, toPublicJournal } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function GET() {
  const journal = getJournal().map(toPublicJournal);
  return NextResponse.json(
    { data: journal, count: journal.length },
    {
      headers: {
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      },
    }
  );
}