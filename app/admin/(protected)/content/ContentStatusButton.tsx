"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ContentType } from "@/lib/publication";

export default function ContentStatusButton({
  type,
  slug,
  isPublished,
}: {
  type: ContentType;
  slug: string;
  isPublished: boolean;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const toggle = async () => {
    const target = isPublished ? "unpublished" : "published";
    const reason = !isPublished
      ? undefined
      : window.prompt(
          "Reason for unpublishing (recorded in the audit log):"
        ) ?? undefined;
    if (!isPublished && reason === null) return;

    setBusy(true);
    try {
      const res = await fetch(`/api/admin/content/${type}/${slug}/status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: target, reason }),
      });
      if (res.ok) router.refresh();
      else window.alert("Failed to update status.");
    } catch {
      window.alert("Network error.");
    } finally {
      setBusy(false);
    }
  };

  if (isPublished) {
    return (
      <button
        type="button"
        onClick={() => void toggle()}
        disabled={busy}
        className="px-3 py-1.5 rounded-lg bg-danger/15 border border-danger/30 text-danger text-xs font-semibold hover:bg-danger/25 transition-colors disabled:opacity-40"
      >
        {busy ? "Working…" : "Unpublish"}
      </button>
    );
  }
  return (
    <button
      type="button"
      onClick={() => void toggle()}
      disabled={busy}
      className="px-3 py-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold hover:bg-emerald-500/25 transition-colors disabled:opacity-40"
    >
      {busy ? "Working…" : "Publish"}
    </button>
  );
}