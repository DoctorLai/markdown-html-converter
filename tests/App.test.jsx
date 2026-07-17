import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import App from "../src/App";

const STORAGE_KEY = "markdown-html-converter:dark-mode";
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
  });

  test("renders accessible editors, generated HTML, and local version", () => {
    render(<App />);

    const markdownInput = screen.getByRole("textbox", {
      name: "Markdown input",
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
    localStorage.setItem(STORAGE_KEY, "true");
    const { container } = render(<App />);

    const themeButton = screen.getByRole("button", { name: /light mode/i });
    expect(container.firstChild).toHaveClass("dark");
    expect(themeButton).toHaveAttribute("aria-pressed", "true");

    fireEvent.click(themeButton);
    expect(container.firstChild).not.toHaveClass("dark");
    expect(localStorage.getItem(STORAGE_KEY)).toBe("false");
  });

  test("converts edited Markdown and clears both fields", () => {
    render(<App />);
    const [markdownInput, htmlOutput] = screen.getAllByRole("textbox");

    fireEvent.change(markdownInput, { target: { value: "**Ready**" } });
    fireEvent.click(screen.getByRole("button", { name: /convert to html/i }));
    expect(htmlOutput).toHaveValue("<p><strong>Ready</strong></p>\n");
    expect(screen.getByText("Ready")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /clear/i }));
    expect(markdownInput).toHaveValue("");
    expect(htmlOutput).toHaveValue("");
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
