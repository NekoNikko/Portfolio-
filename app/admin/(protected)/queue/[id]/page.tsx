import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getQueueItem, scanCandidate } from "@/lib/publication";
import { renderMarkdown } from "@/lib/markdown";
import QueueActions from "./QueueActions";
import QueueEditForm from "./QueueEditForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Queue Item",
  robots: { index: false, follow: false },
};

export default async function QueueItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = getQueueItem(id);
  if (!item) notFound();
  const scan = scanCandidate(id);

  return (
    <div className="max-w-4xl">
      <Link
        href="/admin/queue"
        className="font-mono text-xs text-muted hover:text-accent transition-colors"
      >
        ← Publication queue
      </Link>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-mono text-xs text-faint">
            {item.id} · {item.type} · {item.source} · {item.createdAt}
          </p>
          <h1 className="mt-1 text-2xl font-bold text-foreground">{item.title}</h1>
        </div>
        <span
          className={`px-2.5 py-0.5 rounded-full border text-xs font-medium ${
            item.status === "ready-for-review"
              ? "border-sky-500/30 text-sky-400 bg-sky-500/10"
              : item.status === "rejected"
                ? "border-red-500/30 text-red-400 bg-red-500/10"
                : "border-slate-500/30 text-slate-400 bg-slate-500/10"
          }`}
        >
          {item.status}
        </span>
      </div>

      {/* Sanitization report (spec §30) */}
      <div className="mt-6 p-5 rounded-xl border border-line bg-surface">
        <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          Sensitive-content scan
        </h2>
        {!scan ? (
          <p className="mt-2 text-sm text-muted">No scan available.</p>
        ) : scan.clean ? (
          <div className="mt-3 space-y-1.5 text-sm">
            <p className="text-success">Private information detected: NO</p>
            <p className="text-muted">Potential sensitive information: 0</p>
          </div>
        ) : (
          <div className="mt-3 space-y-2">
            <p className="text-danger font-semibold">
              Potential sensitive information: {scan.count}
            </p>
            <ul className="space-y-1.5">
              {scan.violations.map((v) => (
                <li key={v.category} className="text-sm">
                  <span className="text-warning font-mono">{v.category}</span>
                  {v.matches.slice(0, 3).map((m) => (
                    <code
                      key={m}
                      className="ml-2 px-1.5 py-0.5 rounded bg-background-soft border border-line font-mono text-xs text-danger"
                    >
                      {m.length > 60 ? `${m.slice(0, 60)}…` : m}
                    </code>
                  ))}
                  {v.matches.length > 3 && (
                    <span className="ml-1 text-xs text-faint">
                      +{v.matches.length - 3} more
                    </span>
                  )}
                </li>
              ))}
            </ul>
            <p className="pt-1 text-xs text-muted">
              This candidate cannot be approved until the content above is
              removed. Edit below, or reject it.
            </p>
          </div>
        )}
      </div>

      {/* Approve / reject */}
      {item.status !== "rejected" && (
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <QueueActions id={item.id} approved={scan?.clean ?? false} />
        </div>
      )}

      {/* Edit */}
      <div className="mt-8">
        <h2 className="text-lg font-bold text-foreground">Edit candidate</h2>
        <QueueEditForm id={item.id} title={item.title} markdown={item.markdown} />
      </div>

      {/* Preview */}
      <div className="mt-10">
        <h2 className="text-lg font-bold text-foreground">Preview</h2>
        <div
          className="mt-4 p-6 rounded-xl border border-line bg-surface markdown-body"
          // Sanitized server-side exactly as the public site renders it.
          dangerouslySetInnerHTML={{
            __html: renderMarkdown(item.markdown),
          }}
        />
      </div>
    </div>
  );
}