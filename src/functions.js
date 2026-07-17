import DOMPurify from "dompurify";
import { marked } from "marked";

export function convertMarkdownToHtml(markdown) {
  try {
    return DOMPurify.sanitize(marked(markdown));
  } catch (err) {
    throw new Error("Markdown parse error: " + err.message, { cause: err });
  }
}
