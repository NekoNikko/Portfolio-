// Server-side markdown rendering with sanitization.
//
// Content lives in `public-content/` and is owner-authored, but it must still
// be treated as untrusted-by-default input when rendered: this module converts
// Markdown to HTML and then sanitizes the result (spec: output encoding, no
// script execution, no dangerous URLs). Rendering happens only on the server;
// the browser receives escaped HTML.

import { marked } from "marked";
import sanitizeHtml from "sanitize-html";

const ALLOWED_TAGS = [
  "p", "h1", "h2", "h3", "h4", "h5", "h6",
  "ul", "ol", "li", "blockquote", "pre", "code",
  "strong", "em", "a", "br", "hr", "table", "thead",
  "tbody", "tr", "th", "td",
];

const ALLOWED_ATTRIBUTES = {
  a: ["href", "title", "target", "rel"],
};

export function renderMarkdown(markdown: string): string {
  const rawHtml = marked.parse(markdown, {
    async: false,
    breaks: false,
    gfm: true,
  }) as string;

  return sanitizeHtml(rawHtml, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: ALLOWED_ATTRIBUTES,
    allowedSchemes: ["http", "https", "mailto"],
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", { rel: "nofollow noopener noreferrer" }),
    },
  });
}

/** Strip all HTML tags — used for plain-text contexts (meta descriptions, feeds). */
export function markdownToPlainText(markdown: string, maxLength = 300): string {
  const stripped = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]*)`/g, "$1")
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_\-\[\]()]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (stripped.length <= maxLength) return stripped;
  return `${stripped.slice(0, maxLength).trimEnd()}…`;
}