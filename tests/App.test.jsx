import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import App from "../src/App";

const STORAGE_KEYS = {
  darkMode: "markdown-html-converter:dark-mode",
  markdown: "markdown-html-converter:markdown",
  html: "markdown-html-converter:html",
};
const expectedVersion = import.meta.env.VITE_BUILD_DATE
  ? `Version: ${import.meta.env.VITE_BUILD_DATE}${
      import.meta.env.VITE_COMMIT_HASH
        ? ` (${import.meta.env.VITE_COMMIT_HASH})`
        : ""
    }`
  : "Version: development";

describe("App", () => {
  beforeEach(() => {
    localStorage.clear();
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
    });
  });

  test("renders accessible editors, generated HTML, and local version", () => {
    render(<App />);

    const markdownInput = screen.getByRole("textbox", {
      name: "Markdown source",
    });
    const htmlOutput = screen.getByRole("textbox", { name: "HTML output" });
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Markdown → HTML Converter",
      }),
    ).toBeInTheDocument();
    expect(markdownInput.value).toContain("# Welcome");
    expect(htmlOutput.value).toContain("<h1>Welcome</h1>");
    expect(screen.getByText(expectedVersion)).toBeInTheDocument();
  });

  test("persists the namespaced dark-mode preference", () => {
    localStorage.setItem(STORAGE_KEYS.darkMode, "true");
    const { container } = render(<App />);

    const themeButton = screen.getByRole("button", { name: /light mode/i });
    expect(container.firstChild).toHaveClass("dark");
    expect(themeButton).toHaveAttribute("aria-pressed", "true");

    fireEvent.click(themeButton);
    expect(container.firstChild).not.toHaveClass("dark");
    expect(localStorage.getItem(STORAGE_KEYS.darkMode)).toBe("false");
  });

  test("restores persisted source and output drafts", () => {
    localStorage.setItem(STORAGE_KEYS.markdown, "# Saved draft");
    localStorage.setItem(STORAGE_KEYS.html, "<h1>Saved output</h1>");

    render(<App />);

    expect(
      screen.getByRole("textbox", { name: "Markdown source" }),
    ).toHaveValue("# Saved draft");
    expect(screen.getByRole("textbox", { name: "HTML output" })).toHaveValue(
      "<h1>Saved output</h1>",
    );
  });

  test("converts edited Markdown and clears both fields", () => {
    render(<App />);
    const markdownInput = screen.getByRole("textbox", {
      name: "Markdown source",
    });
    const htmlOutput = screen.getByRole("textbox", { name: "HTML output" });

    fireEvent.change(markdownInput, { target: { value: "**Ready**" } });
    fireEvent.click(screen.getByRole("button", { name: /convert to html/i }));
    expect(htmlOutput).toHaveValue("<p><strong>Ready</strong></p>\n");
    expect(screen.getByText("Ready")).toBeInTheDocument();
    expect(localStorage.getItem(STORAGE_KEYS.markdown)).toBe("**Ready**");
    expect(localStorage.getItem(STORAGE_KEYS.html)).toBe(
      "<p><strong>Ready</strong></p>\n",
    );

    fireEvent.click(screen.getByRole("button", { name: /clear/i }));
    expect(markdownInput).toHaveValue("");
    expect(htmlOutput).toHaveValue("");
    expect(localStorage.getItem(STORAGE_KEYS.markdown)).toBe("");
    expect(localStorage.getItem(STORAGE_KEYS.html)).toBe("");
  });

  test("copies source and output text to the clipboard", async () => {
    render(<App />);
    const markdownInput = screen.getByRole("textbox", {
      name: "Markdown source",
    });
    const htmlOutput = screen.getByRole("textbox", { name: "HTML output" });

    fireEvent.click(screen.getByRole("button", { name: "Copy source" }));
    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
        markdownInput.value,
      );
    });
    expect(screen.getByRole("button", { name: "Copied" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Copy output" }));
    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenLastCalledWith(
        htmlOutput.value,
      );
    });
    expect(screen.getAllByRole("button", { name: "Copied" })).toHaveLength(1);
  });

  test("reports clipboard failures", async () => {
    const alert = vi.spyOn(globalThis, "alert").mockImplementation(() => {});
    navigator.clipboard.writeText.mockRejectedValueOnce(
      new Error("Clipboard unavailable"),
    );
    render(<App />);

    fireEvent.click(screen.getByRole("button", { name: "Copy source" }));

    await waitFor(() => {
      expect(alert).toHaveBeenCalledWith(
        "Unable to copy source to the clipboard.",
      );
    });
    alert.mockRestore();
  });

  test("inserts two spaces when Tab is pressed in the Markdown editor", () => {
    vi.stubGlobal("requestAnimationFrame", (callback) => callback());
    render(<App />);
    const [markdownInput] = screen.getAllByRole("textbox");

    fireEvent.change(markdownInput, { target: { value: "ab" } });
    fireEvent.keyDown(markdownInput, { key: "Tab" });

    expect(markdownInput).toHaveValue("ab  ");
    expect(markdownInput.selectionStart).toBe(4);
    vi.unstubAllGlobals();
  });

  test("selects generated HTML when the output receives focus", () => {
    const select = vi
      .spyOn(HTMLTextAreaElement.prototype, "select")
      .mockImplementation(() => {});
    render(<App />);
    const [, htmlOutput] = screen.getAllByRole("textbox");

    fireEvent.focus(htmlOutput);
    expect(select).toHaveBeenCalledOnce();
    select.mockRestore();
  });
});
