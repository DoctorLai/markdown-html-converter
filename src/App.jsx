import "./App.css";
import { useState, useEffect } from "react";
import { convertMarkdownToHtml } from "./functions";

export default function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved === "true";
  });

  const [markdownInput, setMarkdownInput] = useState(
    '# Welcome\n\n- Type markdown here\n- Then click "Convert"',
  );
  const [htmlOutput, setHtmlOutput] = useState(
    convertMarkdownToHtml(markdownInput),
  );

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const convertToHtml = () => {
    try {
      setHtmlOutput(convertMarkdownToHtml(markdownInput));
    } catch (err) {
      alert("Markdown parse error: " + err.message);
    }
  };

  const clearInputs = () => {
    setMarkdownInput("");
    setHtmlOutput("");
  };

  const handleTab = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const textarea = e.target;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newText =
        textarea.value.slice(0, start) + "  " + textarea.value.slice(end);
      setMarkdownInput(newText);
      requestAnimationFrame(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      });
    }
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <button onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
      </button>
      <div>
        <h1>Markdown → HTML Converter</h1>
        <div className="textarea-container">
          <textarea
            value={markdownInput}
            onChange={(e) => setMarkdownInput(e.target.value)}
            placeholder={`# Welcome\n\n- Type markdown here\n- Then click "Convert"`}
            onKeyDown={handleTab}
            rows="30"
          />
          <textarea
            value={htmlOutput}
            readOnly
            placeholder="HTML output will appear here"
            onFocus={(e) => e.target.select()}
            rows="30"
          />
        </div>
        <div>
          <button onClick={convertToHtml}>Convert to HTML →</button>
          <button onClick={clearInputs}>❌ Clear</button>
        </div>
      </div>
      <footer>
        <p>
          Made with ❤️ by{" "}
          <a
            href="https://github.com/doctorlai"
            target="_blank"
            rel="noopener noreferrer"
          >
            @justyy
          </a>
        </p>
        <p>
          If you found this useful, consider buying me a{" "}
          <a
            href="https://justyy.com/out/bmc"
            target="_blank"
            rel="noopener noreferrer"
          >
            coffee
          </a>{" "}
          ☕
        </p>
        <p>
          Open Source on{" "}
          <a
            href="https://github.com/DoctorLai/markdown-html-converter"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </p>
        <p>
          Another Similar Project:{" "}
          <a
            title="Online Markdown/HTML Previewer with API"
            target="_blank"
            href="https://helloacm.com/markdown/"
          >
            Online Markdown/HTML Previewer with API
          </a>
        </p>
      </footer>
    </div>
  );
}
