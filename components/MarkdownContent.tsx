import { renderMarkdown } from "@/lib/markdown";

/**
 * Renders owner-authored markdown from public-content as sanitized HTML.
 * Server-only: the browser receives escaped HTML, never raw markdown or paths.
 */
export default function MarkdownContent({ markdown }: { markdown: string }) {
  const html = renderMarkdown(markdown);
  return (
    <div
      className="markdown-body"
      // Content is sanitized server-side (lib/markdown.ts); trusted source.
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}