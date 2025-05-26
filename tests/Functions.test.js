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
});
