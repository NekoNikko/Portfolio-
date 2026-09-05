import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import MarkdownContent from "@/components/MarkdownContent";
import { getCaseStudies, getCaseStudy } from "@/lib/content";
import { markdownToPlainText } from "@/lib/markdown";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getCaseStudies().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return { title: "Case study not found" };

  const description =
    study.summary ?? markdownToPlainText(study.contentMarkdown, 160) ?? study.title;

  return {
    title: study.title,
    description,
    openGraph: {
      type: "article",
      title: study.title,
      description,
      publishedTime: study.date,
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-16">
      <Link
        href="/case-studies"
        className="font-mono text-xs text-muted hover:text-accent transition-colors"
      >
        ← All case studies
      </Link>

      <div className="mt-6 flex flex-wrap items-center gap-2 font-mono text-[11px]">
        {study.category && (
          <span className="px-2 py-0.5 rounded border border-accent/30 text-accent">
            {study.category}
          </span>
        )}
        {study.date && (
          <span className="text-faint">{formatDate(study.date)}</span>
        )}
      </div>

      <h1 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight text-foreground">
        {study.title}
      </h1>

      <div className="mt-10">
        <MarkdownContent markdown={study.contentMarkdown} />
      </div>
    </div>
  );
}