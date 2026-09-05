import type { Metadata } from "next";
import { getAuditLog } from "@/lib/publication";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Audit Log",
  robots: { index: false, follow: false },
};

const ACTION_STYLES: Record<string, string> = {
  CREATED: "text-sky-400 border-sky-500/30",
  EDITED: "text-violet-400 border-violet-500/30",
  SANITIZED: "text-warning border-warning/30",
  APPROVED: "text-emerald-400 border-emerald-500/30",
  PUBLISHED: "text-emerald-400 border-emerald-500/30",
  UNPUBLISHED: "text-danger border-danger/30",
  REJECTED: "text-danger border-danger/30",
};

export default function AuditPage() {
  const audit = getAuditLog();

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Audit Log</h1>
      <p className="mt-1 text-sm text-muted">
        Append-only record of every publication action. Stored in{" "}
        <code className="font-mono">data/audit.jsonl</code>.
      </p>

      {audit.length === 0 ? (
        <p className="mt-6 text-sm text-muted">No actions recorded yet.</p>
      ) : (
        <ul className="mt-6 space-y-2">
          {audit.map((entry, i) => (
            <li
              key={`${entry.timestamp}-${i}`}
              className="flex flex-wrap items-baseline gap-x-3 gap-y-1 p-3 rounded-lg border border-line bg-surface text-sm"
            >
              <span className="font-mono text-xs text-faint shrink-0">
                {new Date(entry.timestamp).toLocaleString()}
              </span>
              <span
                className={`px-2 py-0.5 rounded border text-xs font-medium ${ACTION_STYLES[entry.action] ?? "text-muted border-line"}`}
              >
                {entry.action}
              </span>
              <span className="font-mono text-xs text-foreground">{entry.contentId}</span>
              <span className="text-xs text-faint">{entry.user}</span>
              {entry.reason && (
                <span className="text-xs text-muted w-full sm:w-auto">
                  {entry.reason}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}