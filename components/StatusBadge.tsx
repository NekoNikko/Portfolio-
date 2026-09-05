const STATUS_STYLES: Record<string, string> = {
  ACTIVE: "bg-emerald-500/10 text-emerald-400 border-emerald-500/25",
  "IN DEVELOPMENT": "bg-sky-500/10 text-sky-400 border-sky-500/25",
  TESTING: "bg-amber-500/10 text-amber-400 border-amber-500/25",
  COMPLETED: "bg-emerald-500/10 text-emerald-400 border-emerald-500/25",
  MAINTENANCE: "bg-indigo-500/10 text-indigo-400 border-indigo-500/25",
  ARCHIVED: "bg-slate-500/10 text-slate-400 border-slate-500/25",
  PLANNING: "bg-violet-500/10 text-violet-400 border-violet-500/25",
  RESEARCH: "bg-cyan-500/10 text-cyan-400 border-cyan-500/25",
  IDEA: "bg-slate-500/10 text-slate-400 border-slate-500/25",
};

const FALLBACK = "bg-slate-500/10 text-slate-400 border-slate-500/25";

export default function StatusBadge({ status }: { status: string }) {
  const style = STATUS_STYLES[status] ?? FALLBACK;
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-xs font-medium ${style}`}
    >
      <span
        aria-hidden="true"
        className="h-1.5 w-1.5 rounded-full bg-current opacity-80"
      />
      {status}
    </span>
  );
}