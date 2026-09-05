import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import { getJournal } from "@/lib/content";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Engineering Journal",
  description:
    "A selected, human-approved log of development work: what I worked on, what I learned, challenges, outcomes, and next steps.",
};

const CATEGORY_LABELS: Record<string, string> = {
  architecture: "Architecture",
  security: "Security",
  analysis: "Analysis",
  testing: "Testing",
  infrastructure: "Infrastructure",
  ai: "AI",
  automation: "Automation",
};

export default function JournalPage() {
  const journal = getJournal();

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-16">
      <SectionHeading
        kicker="Engineering journal"
        title="How the work happens"
        description="Selected daily and weekly entries showing the actual process — planning, building, learning, verifying. Each entry passes a sanitization and human-approval step before it appears here."
      />

      {journal.length === 0 ? (
        <p className="text-muted">
          No journal entries published yet. Check back soon.
        </p>
      ) : (
        <ol className="space-y-8">
          {journal.map((entry) => (
            <li
              key={entry.id}
              className="p-6 rounded-xl border border-line bg-surface"
            >
              <div className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
                <span className="text-faint uppercase tracking-wider">
                  {formatDate(entry.date)}
                </span>
                {entry.project && (
                  <span className="px-2 py-0.5 rounded border border-line text-muted">
                    {entry.project}
                  </span>
                )}
                {entry.category && (
                  <span className="px-2 py-0.5 rounded border border-accent/30 text-accent">
                    {CATEGORY_LABELS[entry.category] ?? entry.category}
                  </span>
                )}
              </div>

              <Link
                href={`/journal/${entry.slug}`}
                className="mt-3 block group"
              >
                <h2 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                  {entry.title}
                </h2>
                {entry.summary && (
                  <p className="mt-2 text-sm text-muted leading-relaxed">
                    {entry.summary}
                  </p>
                )}
              </Link>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}