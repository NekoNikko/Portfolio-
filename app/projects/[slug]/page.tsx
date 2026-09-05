import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import MarkdownContent from "@/components/MarkdownContent";
import StatusBadge from "@/components/StatusBadge";
import { getProjects, getProject } from "@/lib/content";
import { markdownToPlainText } from "@/lib/markdown";
import { formatDate } from "@/lib/format";

export const dynamic = "force-dynamic";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };

  const description =
    project.summary ??
    markdownToPlainText(project.contentMarkdown, 160) ??
    project.title;

  return {
    title: project.title,
    description,
    openGraph: {
      type: "article",
      title: project.title,
      description,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-16">
      <Link
        href="/projects"
        className="font-mono text-xs text-muted hover:text-accent transition-colors"
      >
        ← All projects
      </Link>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
          {project.title}
        </h1>
        {project.projectStatus && <StatusBadge status={project.projectStatus} />}
      </div>

      <dl className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
        <div>
          <dt className="text-faint font-mono text-xs uppercase tracking-wider">
            Last updated
          </dt>
          <dd className="mt-1 text-foreground">
            {project.lastUpdated ? formatDate(project.lastUpdated) : "Not available"}
          </dd>
        </div>
        <div>
          <dt className="text-faint font-mono text-xs uppercase tracking-wider">
            Status
          </dt>
          <dd className="mt-1 text-foreground">
            {project.projectStatus ?? project.status}
          </dd>
        </div>
        <div>
          <dt className="text-faint font-mono text-xs uppercase tracking-wider">
            Technology
          </dt>
          <dd className="mt-1 flex flex-wrap gap-1.5">
            {(project.technologies ?? []).map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 rounded border border-line bg-background-soft font-mono text-xs text-accent"
              >
                {t}
              </span>
            ))}
          </dd>
        </div>
      </dl>

      <div className="mt-10">
        <MarkdownContent markdown={project.contentMarkdown} />
      </div>
    </div>
  );
}