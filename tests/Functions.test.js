import { describe, it, expect } from "vitest";
import { convertMarkdownToHtml } from "../src/functions";

describe("convertMarkdownToHtml", () => {
  it("converts a simple markdown heading", () => {
    const md = "# Hello";
    const html = convertMarkdownToHtml(md);
    expect(html.trim()).toBe("<h1>Hello</h1>");
  });

  it("converts markdown list", () => {
    const md = "- Item 1\n- Item 2";
    const html = convertMarkdownToHtml(md);
    expect(html.trim()).toBe("<ul>\n<li>Item 1</li>\n<li>Item 2</li>\n</ul>");
  });

  it("converts markdown bold and italic text", () => {
    const md = "**bold** and *italic*";
    const html = convertMarkdownToHtml(md);
    expect(html).toContain("<strong>bold</strong>");
    expect(html).toContain("<em>italic</em>");
  });

  it("handles empty string input", () => {
    const md = "";
    const html = convertMarkdownToHtml(md);
    expect(html.trim()).toBe("");
  });

  it("throws a meaningful error on invalid input (non-string)", () => {
    expect(() => convertMarkdownToHtml(null)).toThrow("Markdown parse error");
    expect(() => convertMarkdownToHtml(undefined)).toThrow(
      "Markdown parse error",
    );
    expect(() => convertMarkdownToHtml(123)).toThrow("Markdown parse error");
  });

  it("removes unsafe HTML from the rendered preview", () => {
    const html = convertMarkdownToHtml(
      '<img src="x" onerror="alert(1)"><script>alert(1)</script>',
    );

    expect(html).toContain('<img src="x">');
    expect(html).not.toContain("onerror");
    expect(html).not.toContain("<script");
  });

  it("converts complex markdown with multiple elements", () => {
    const md = `
# Title

This is a paragraph with **bold** text and a [link](https://example.com).

- List item 1
- List item 2

> A blockquote
`;
    const html = convertMarkdownToHtml(md);
    expect(html).toContain("<h1>Title</h1>");
    expect(html).toContain(
      '<p>This is a paragraph with <strong>bold</strong> text and a <a href="https://example.com">link</a>.</p>',
    );
    expect(html).toContain(
      "<ul>\n<li>List item 1</li>\n<li>List item 2</li>\n</ul>",
    );
    expect(html).toContain("<blockquote>\n<p>A blockquote</p>\n</blockquote>");
  });
});
