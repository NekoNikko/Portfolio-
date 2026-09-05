import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import { getCaseStudies } from "@/lib/content";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "In-depth engineering walkthroughs: problem, context, approach, architecture, implementation, testing, results, and lessons learned.",
};

export default function CaseStudiesPage() {
  const caseStudies = getCaseStudies();

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
      <SectionHeading
        kicker="Engineering in depth"
        title="Case Studies"
        description="Full walkthroughs of real problems — the thinking behind the code, not just the code."
      />

      {caseStudies.length === 0 ? (
        <p className="text-muted">No published case studies yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {caseStudies.map((c) => (
            <Link
              key={c.slug}
              href={`/case-studies/${c.slug}`}
              className="group p-6 rounded-xl border border-line bg-surface hover:border-accent/50 transition-colors flex flex-col"
            >
              <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] mb-4">
                {c.category && (
                  <span className="px-2 py-0.5 rounded border border-accent/30 text-accent">
                    {c.category}
                  </span>
                )}
                {c.date && <span className="text-faint">{formatDate(c.date)}</span>}
              </div>
              <h2 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors">
                {c.title}
              </h2>
              <p className="mt-2 text-sm text-muted leading-relaxed flex-1">
                {c.summary}
              </p>
              <p className="mt-4 font-mono text-xs text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                Read the case study →
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}