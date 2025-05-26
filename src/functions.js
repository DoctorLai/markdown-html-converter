import { marked } from "marked";

export function convertMarkdownToHtml(markdown) {
  try {
    return marked(markdown);
  } catch (err) {
    throw new Error("Markdown parse error: " + err.message);
  }
}
