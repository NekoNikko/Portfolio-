"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function QueueActions({
  id,
  approved,
}: {
  id: string;
  approved: boolean;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState<null | "approve" | "reject">(null);
  const [message, setMessage] = useState<{ kind: "ok" | "error"; text: string } | null>(null);

  const run = async (action: "approve" | "reject") => {
    setBusy(action);
    setMessage(null);
    const reason = action === "reject"
      ? window.prompt("Reason for rejection (recorded in the audit log):") ?? undefined
      : undefined;
    if (action === "reject" && reason === null) {
      setBusy(null);
      return;
    }
    try {
      const res = await fetch(`/api/admin/queue/${id}/${action}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMessage({ kind: "error", text: data.error ?? `${action} failed` });
        setBusy(null);
        return;
      }
      if (action === "approve") {
        router.push("/admin/content");
        router.refresh();
      } else {
        router.refresh();
      }
    } catch {
      setMessage({ kind: "error", text: "Network error" });
      setBusy(null);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => void run("approve")}
          disabled={busy !== null || !approved}
          title={approved ? "Approve and publish to public-content" : "Blocked: sensitive content detected"}
          className="px-5 py-2.5 rounded-lg bg-success/90 text-background font-semibold text-sm hover:bg-success transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {busy === "approve" ? "Publishing…" : "✓ Approve & publish"}
        </button>
        <button
          type="button"
          onClick={() => void run("reject")}
          disabled={busy !== null}
          className="px-5 py-2.5 rounded-lg bg-danger/15 border border-danger/30 text-danger font-semibold text-sm hover:bg-danger/25 transition-colors disabled:opacity-40"
        >
          {busy === "reject" ? "Rejecting…" : "Reject"}
        </button>
      </div>
      {message && (
        <p role="status" className={`text-sm ${message.kind === "ok" ? "text-success" : "text-danger"}`}>
          {message.text}
        </p>
      )}
    </div>
  );
}