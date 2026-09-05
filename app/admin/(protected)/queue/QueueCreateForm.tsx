"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const TYPES = [
  { value: "journal", label: "Journal entry" },
  { value: "project", label: "Project" },
  { value: "case-study", label: "Case study" },
];

export default function QueueCreateForm() {
  const router = useRouter();
  const [type, setType] = useState("journal");
  const [title, setTitle] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [message, setMessage] = useState<{ kind: "ok" | "error"; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);
    try {
      const res = await fetch("/api/admin/queue", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, title, markdown }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMessage({ kind: "error", text: data.error ?? "Failed to create candidate" });
        return;
      }
      setMessage({
        kind: "ok",
        text:
          data.redacted > 0
            ? `Candidate created. ${data.redacted} sensitive value(s) were replaced with [REDACTED] during import.`
            : "Candidate created and queued for review.",
      });
      setTitle("");
      setMarkdown("");
      router.refresh();
    } catch {
      setMessage({ kind: "error", text: "Network error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 p-5 rounded-xl border border-line bg-surface space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="candidate-type" className="block text-xs font-mono uppercase tracking-wider text-faint mb-1.5">
            Type
          </label>
          <select
            id="candidate-type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full px-3 py-2.5 rounded-lg bg-background-soft border border-line text-foreground text-sm"
          >
            {TYPES.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="candidate-title" className="block text-xs font-mono uppercase tracking-wider text-faint mb-1.5">
            Title
          </label>
          <input
            id="candidate-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full px-3 py-2.5 rounded-lg bg-background-soft border border-line text-foreground text-sm"
          />
        </div>
      </div>
      <div>
        <label htmlFor="candidate-markdown" className="block text-xs font-mono uppercase tracking-wider text-faint mb-1.5">
          Content (Markdown)
        </label>
        <textarea
          id="candidate-markdown"
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          required
          rows={8}
          className="w-full px-3 py-2.5 rounded-lg bg-background-soft border border-line text-foreground text-sm font-mono leading-relaxed resize-y"
          placeholder={"## What I worked on\n\nDescribe the work…\n\n## What I learned\n\n…"}
        />
      </div>
      {message && (
        <p
          role="status"
          className={`text-sm ${message.kind === "ok" ? "text-success" : "text-danger"}`}
        >
          {message.text}
        </p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="px-5 py-2.5 rounded-lg bg-accent text-background font-semibold text-sm hover:bg-sky-400 transition-colors disabled:opacity-50"
      >
        {loading ? "Creating…" : "Add to publication queue"}
      </button>
    </form>
  );
}