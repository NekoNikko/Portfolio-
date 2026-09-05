import { NextResponse } from "next/server";
import { getProject, toPublicProject } from "@/lib/content";
import { renderMarkdown, markdownToPlainText } from "@/lib/markdown";

export const dynamic = "force-dynamic";

interface RouteProps {
  params: Promise<{ slug: string }>;
}

export async function GET(_req: Request, { params }: RouteProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(
    {
      ...toPublicProject(project),
      // Body served as sanitized HTML + plain text — never raw filesystem data.
      bodyHtml: renderMarkdown(project.contentMarkdown),
      bodyText: markdownToPlainText(project.contentMarkdown, 500),
    },
    {
      headers: {
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
      },
    }
  );
}