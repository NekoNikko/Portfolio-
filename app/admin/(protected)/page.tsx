import type { Metadata } from "next";
import Link from "next/link";
import { listQueue, getAuditLog } from "@/lib/publication";
import { getProjects, getJournal, getCaseStudies } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  robots: { index: false, follow: false },
};

export default function AdminDashboardPage() {
  const queue = listQueue();
  const audit = getAuditLog();
  const ready = queue.filter((q) => q.status === "ready-for-review").length;
  const published = {
    projects: getProjects().length,
    journal: getJournal().length,
    "case-studies": getCaseStudies().length,
  };

  const stats = [
    { label: "Ready for review", value: String(ready), href: "/admin/queue" },
    { label: "In queue", value: String(queue.length), href: "/admin/queue" },
    { label: "Published projects", value: String(published.projects), href: "/admin/content?type=project" },
    { label: "Journal entries", value: String(published.journal), href: "/admin/content?type=journal" },
    { label: "Case studies", value: String(published["case-studies"]), href: "/admin/content?type=case-study" },
    { label: "Audit entries", value: String(audit.length), href: "/admin/audit" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Publication Dashboard</h1>
      <p className="mt-1 text-sm text-muted">
        PRIVATE BY DEFAULT · PUBLIC BY APPROVAL. Only approved candidates leave
        the queue.
      </p>

      <dl className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="p-5 rounded-xl border border-line bg-surface hover:border-accent/50 transition-colors"
          >
            <dd className="text-3xl font-bold text-accent font-mono">{s.value}</dd>
            <dt className="mt-1 text-xs text-faint font-mono uppercase tracking-wider">
              {s.label}
            </dt>
          </Link>
        ))}
      </dl>

      <section className="mt-12">
        <h2 className="text-lg font-bold text-foreground">Publication pipeline</h2>
        <ol className="mt-4 flex flex-wrap items-center gap-2 text-xs font-mono">
          {[
            "WORK",
            "AGENTIC OS",
            "DAILY LOG",
            "CANDIDATE (queue)",
            "SANITIZE",
            "HUMAN REVIEW",
            "APPROVE",
            "PUBLIC CONTENT",
            "PORTFOLIO",
          ].map((step, i, arr) => (
            <li key={step} className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded border border-line bg-surface text-muted">
                {step}
              </span>
              {i < arr.length - 1 && (
                <span aria-hidden="true" className="text-faint">→</span>
              )}
            </li>
          ))}
        </ol>
      </section>

      {audit.length > 0 && (
        <section className="mt-12">
          <h2 className="text-lg font-bold text-foreground">Recent activity</h2>
          <ul className="mt-4 space-y-2">
            {audit.slice(0, 8).map((entry, i) => (
              <li
                key={`${entry.timestamp}-${i}`}
                className="flex flex-wrap items-baseline gap-x-3 gap-y-1 p-3 rounded-lg border border-line bg-surface text-sm"
              >
                <span className="font-mono text-xs text-faint">
                  {new Date(entry.timestamp).toLocaleString()}
                </span>
                <span className="font-mono text-xs text-accent">{entry.action}</span>
                <span className="text-foreground">{entry.contentId}</span>
                {entry.reason && <span className="text-muted text-xs">— {entry.reason}</span>}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}