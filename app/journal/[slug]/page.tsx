import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import MarkdownContent from "@/components/MarkdownContent";
import { getJournal, getJournalEntry } from "@/lib/content";
import { markdownToPlainText } from "@/lib/markdown";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

interface JournalEntryPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getJournal().map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: JournalEntryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getJournalEntry(slug);
  if (!entry) return { title: "Journal entry not found" };

  const description =
    entry.summary ?? markdownToPlainText(entry.contentMarkdown, 160) ?? entry.title;

  return {
    title: entry.title,
    description,
    openGraph: {
      type: "article",
      title: entry.title,
      description,
      publishedTime: entry.date,
    },
  };
}

export default async function JournalEntryPage({
  params,
}: JournalEntryPageProps) {
  const { slug } = await params;
  const entry = getJournalEntry(slug);
  if (!entry) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-16">
      <Link
        href="/journal"
        className="font-mono text-xs text-muted hover:text-accent transition-colors"
      >
        ← Engineering journal
      </Link>

      <div className="mt-6 flex flex-wrap items-center gap-2 font-mono text-[11px]">
        <span className="text-faint uppercase tracking-wider">
          {formatDate(entry.date)}
        </span>
        {entry.project && (
          <span className="px-2 py-0.5 rounded border border-line text-muted">
            {entry.project}
          </span>
        )}
        {entry.category && (
          <span className="px-2 py-0.5 rounded border border-accent/30 text-accent">
            {entry.category}
          </span>
        )}
      </div>

      <h1 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight text-foreground">
        {entry.title}
      </h1>

      <div className="mt-10">
        <MarkdownContent markdown={entry.contentMarkdown} />
      </div>
    </div>
  );
}