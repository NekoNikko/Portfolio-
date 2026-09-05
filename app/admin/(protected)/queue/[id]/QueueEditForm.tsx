"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function QueueEditForm({
  id,
  title: initialTitle,
  markdown: initialMarkdown,
}: {
  id: string;
  title: string;
  markdown: string;
}) {
  const router = useRouter();
  const [title, setTitle] = useState(initialTitle);
  const [markdown, setMarkdown] = useState(initialMarkdown);
  const [message, setMessage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setMessage(null);
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/queue/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, markdown }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMessage(data.error ?? "Save failed");
        return;
      }
      setMessage("Saved. The sensitive-content scan has been refreshed.");
      router.refresh();
    } catch {
      setMessage("Network error");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mt-4 space-y-3">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        aria-label="Title"
        className="w-full px-3 py-2.5 rounded-lg bg-background-soft border border-line text-foreground text-sm"
      />
      <textarea
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
        rows={12}
        aria-label="Markdown content"
        className="w-full px-3 py-2.5 rounded-lg bg-background-soft border border-line text-foreground text-sm font-mono leading-relaxed resize-y"
      />
      {message && <p className="text-sm text-muted">{message}</p>}
      <button
        type="button"
        onClick={() => void handleSave()}
        disabled={saving}
        className="px-5 py-2.5 rounded-lg bg-surface border border-line text-foreground font-semibold text-sm hover:border-accent/60 hover:text-accent transition-colors disabled:opacity-50"
      >
        {saving ? "Saving…" : "Save changes"}
      </button>
    </div>
  );
}