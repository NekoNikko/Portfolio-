import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import StatusBadge from "@/components/StatusBadge";
import { getProjects, toPublicProject } from "@/lib/content";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Real engineering projects: problems, goals, architecture, decisions, verification, and lessons learned.",
};

export default function ProjectsPage() {
  const projects = getProjects().map(toPublicProject);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16">
      <SectionHeading
        kicker="Portfolio"
        title="Projects"
        description="Every project documents the full loop: problem → goal → technology → architecture → what I built → what I learned → verification."
      />

      {projects.length === 0 ? (
        <p className="text-muted">No published projects yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((p) => (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
              className="group p-6 rounded-xl border border-line bg-surface hover:border-accent/50 transition-colors flex flex-col"
            >
              <div className="flex items-center justify-between gap-2 mb-4">
                <StatusBadge status={p.status} />
                <span className="font-mono text-xs text-faint">
                  {p.lastUpdated ? `Updated ${formatDate(p.lastUpdated)}` : ""}
                </span>
              </div>
              <h2 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors">
                {p.title}
              </h2>
              <p className="mt-2 text-sm text-muted leading-relaxed flex-1">
                {p.summary}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {(p.technologies ?? []).slice(0, 6).map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded border border-line bg-background-soft font-mono text-[11px] text-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <p className="mt-4 font-mono text-xs text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                View project details →
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}