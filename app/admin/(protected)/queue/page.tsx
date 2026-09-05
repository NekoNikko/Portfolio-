import type { Metadata } from "next";
import Link from "next/link";
import { listQueue } from "@/lib/publication";
import QueueCreateForm from "./QueueCreateForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Publication Queue",
  robots: { index: false, follow: false },
};

const STATUS_STYLES: Record<string, string> = {
  "ready-for-review": "border-sky-500/30 text-sky-400 bg-sky-500/10",
  draft: "border-slate-500/30 text-slate-400 bg-slate-500/10",
  rejected: "border-red-500/30 text-red-400 bg-red-500/10",
};

export default function QueuePage() {
  const queue = listQueue();

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Publication Queue</h1>
      <p className="mt-1 text-sm text-muted">
        Candidates wait here for human review. Nothing in the queue is visible
        on the public site.
      </p>

      <section className="mt-8">
        <h2 className="text-lg font-bold text-foreground">Create a candidate</h2>
        <QueueCreateForm />
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-bold text-foreground">
          Candidates ({queue.length})
        </h2>
        {queue.length === 0 ? (
          <p className="mt-4 text-sm text-muted">
            The queue is empty. Add a candidate above, or wire the Agentic OS
            export to drop files into <code className="font-mono">data/queue/</code>.
          </p>
        ) : (
          <ul className="mt-4 space-y-3">
            {queue.map((item) => (
              <li key={item.id}>
                <Link
                  href={`/admin/queue/${item.id}`}
                  className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl border border-line bg-surface hover:border-accent/50 transition-colors"
                >
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground truncate">
                      {item.title}
                    </p>
                    <p className="mt-0.5 font-mono text-xs text-faint">
                      {item.id} · {item.type} · {item.source}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-mono text-xs text-faint">
                      {item.createdAt}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full border text-xs font-medium ${STATUS_STYLES[item.status] ?? STATUS_STYLES.draft}`}
                    >
                      {item.status}
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}