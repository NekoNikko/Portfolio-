import { describe, expect, it } from "vitest";
import { renderMarkdown, markdownToPlainText } from "@/lib/markdown";

describe("renderMarkdown (sanitizer)", () => {
  it("renders basic markdown to HTML", () => {
    const html = renderMarkdown("# Title\n\nSome **bold** text.");
    expect(html).toContain("<h1>Title</h1>");
    expect(html).toContain("<strong>bold</strong>");
  });

  it("strips script tags entirely", () => {
    const html = renderMarkdown("Hello <script>alert('xss')</script> world");
    expect(html).not.toContain("<script");
    expect(html).not.toContain("alert");
  });

  it("strips inline event handlers", () => {
    const html = renderMarkdown(
      '<a href="https://example.com" onclick="steal()">link</a>'
    );
    expect(html).not.toContain("onclick");
  });

  it("blocks javascript: URLs", () => {
    const html = renderMarkdown("[click me](javascript:alert(1))");
    expect(html).not.toContain("javascript:");
    expect(html).not.toContain("alert(1)");
  });

  it("adds nofollow to links", () => {
    const html = renderMarkdown("[link](https://example.com)");
    expect(html).toContain('rel="nofollow noopener noreferrer"');
  });

  it("allows mailto links", () => {
    const html = renderMarkdown("[email](mailto:me@example.com)");
    expect(html).toContain("mailto:me@example.com");
  });
});

describe("markdownToPlainText", () => {
  it("strips formatting and links", () => {
    const text = markdownToPlainText("**Bold** and [a link](https://x.com) here");
    expect(text).not.toContain("**");
    expect(text).not.toContain("[");
    expect(text).toContain("Bold");
    expect(text).toContain("a link");
  });

  it("truncates long text with an ellipsis", () => {
    const long = "#".repeat(0) + "word ".repeat(100);
    const text = markdownToPlainText(long, 50);
    expect(text.length).toBeLessThanOrEqual(51);
    expect(text.endsWith("…")).toBe(true);
  });
});