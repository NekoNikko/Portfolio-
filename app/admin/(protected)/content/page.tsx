import type { Metadata } from "next";
import Link from "next/link";
import { listManagedContent } from "@/lib/publication";
import type { ContentType } from "@/lib/publication";
import ContentStatusButton from "./ContentStatusButton";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Content Manager",
  robots: { index: false, follow: false },
};

const TYPES: { value: ContentType; label: string; hint: string }[] = [
  { value: "project", label: "Projects", hint: "public-content/projects" },
  { value: "journal", label: "Journal", hint: "public-content/journal" },
  { value: "case-study", label: "Case studies", hint: "public-content/case-studies" },
];

export default async function ContentPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;
  const activeType: ContentType = ["project", "journal", "case-study"].includes(type ?? "")
    ? (type as ContentType)
    : "project";
  const items = listManagedContent(activeType);

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Content Manager</h1>
      <p className="mt-1 text-sm text-muted">
        Publish, unpublish, and inspect every item in public-content/. Only{" "}
        <code className="font-mono">published</code> +{" "}
        <code className="font-mono">public: true</code> items appear on the site.
      </p>

      <div className="mt-6 flex gap-1 border-b border-line overflow-x-auto">
        {TYPES.map((t) => (
          <Link
            key={t.value}
            href={`/admin/content?type=${t.value}`}
            className={`px-4 py-2.5 text-sm whitespace-nowrap border-b-2 -mb-px transition-colors ${
              activeType === t.value
                ? "border-accent text-accent"
                : "border-transparent text-muted hover:text-foreground"
            }`}
          >
            {t.label}
          </Link>
        ))}
      </div>

      <ul className="mt-6 space-y-3">
        {items.map((item) => (
          <li
            key={item.slug}
            className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl border border-line bg-surface"
          >
            <div className="min-w-0">
              <p className="font-semibold text-foreground truncate">
                {item.title}
              </p>
              <p className="mt-0.5 font-mono text-xs text-faint">
                {item.slug}
                {item.lastUpdated ? ` · updated ${item.lastUpdated}` : ""}
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span
                className={`px-2.5 py-0.5 rounded-full border text-xs font-medium ${
                  item.status === "published" && item.public
                    ? "border-emerald-500/30 text-emerald-400 bg-emerald-500/10"
                    : "border-slate-500/30 text-slate-400 bg-slate-500/10"
                }`}
              >
                {item.status}
              </span>
              <Link
                href={
                  activeType === "case-study"
                    ? `/case-studies/${item.slug}`
                    : `/${activeType === "journal" ? "journal" : "projects"}/${item.slug}`
                }
                target="_blank"
                className="text-xs text-accent hover:text-sky-300"
              >
                View ↗
              </Link>
              <ContentStatusButton
                type={activeType}
                slug={item.slug}
                isPublished={item.status === "published" && item.public}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}