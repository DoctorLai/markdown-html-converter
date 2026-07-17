# Markdown to HTML Converter

[![CI](https://github.com/DoctorLai/markdown-html-converter/actions/workflows/ci.yaml/badge.svg)](https://github.com/DoctorLai/markdown-html-converter/actions/workflows/ci.yaml)
[![Coverage](https://github.com/DoctorLai/markdown-html-converter/actions/workflows/coverage.yaml/badge.svg)](https://github.com/DoctorLai/markdown-html-converter/actions/workflows/coverage.yaml)
[![Last commit](https://img.shields.io/github/last-commit/DoctorLai/markdown-html-converter)](https://github.com/DoctorLai/markdown-html-converter/commits/main)
[![License](https://img.shields.io/github/license/DoctorLai/markdown-html-converter)](LICENSE)
[![Stars](https://img.shields.io/github/stars/DoctorLai/markdown-html-converter)](https://github.com/DoctorLai/markdown-html-converter/stargazers)
[![Watchers](https://img.shields.io/github/watchers/DoctorLai/markdown-html-converter)](https://github.com/DoctorLai/markdown-html-converter/watchers)
[![Forks](https://img.shields.io/github/forks/DoctorLai/markdown-html-converter)](https://github.com/DoctorLai/markdown-html-converter/forks)
[![Open issues](https://img.shields.io/github/issues/DoctorLai/markdown-html-converter)](https://github.com/DoctorLai/markdown-html-converter/issues)
[![Open pull requests](https://img.shields.io/github/issues-pr/DoctorLai/markdown-html-converter)](https://github.com/DoctorLai/markdown-html-converter/pulls)
[![Commit activity](https://img.shields.io/github/commit-activity/m/DoctorLai/markdown-html-converter)](https://github.com/DoctorLai/markdown-html-converter/graphs/commit-activity)
[![Repository size](https://img.shields.io/github/repo-size/DoctorLai/markdown-html-converter)](https://github.com/DoctorLai/markdown-html-converter)
[![Top language](https://img.shields.io/github/languages/top/DoctorLai/markdown-html-converter)](https://github.com/DoctorLai/markdown-html-converter)
[![JavaScript percentage](https://img.shields.io/endpoint?url=https%3A%2F%2Fdoctorlai.github.io%2Fmarkdown-html-converter%2Flanguage-badge.json)](https://github.com/DoctorLai/markdown-html-converter)
[![Node.js 20+](https://img.shields.io/badge/Node.js-20%2B-339933?logo=nodedotjs&logoColor=white)](.nvmrc)
[![Code style: Prettier](https://img.shields.io/badge/code_style-Prettier-f7b93e?logo=prettier&logoColor=black)](https://prettier.io/)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/DoctorLai/markdown-html-converter)

A browser-based React application that converts Markdown to HTML and displays the generated markup alongside a rendered preview. Conversion stays in the browser.

![image](https://github.com/user-attachments/assets/c0afac08-cae8-48a1-b040-b2c5b6374b0f)

## Features

- Convert Markdown to HTML with `marked` and sanitize previews with DOMPurify.
- Inspect generated HTML and a rendered preview together.
- Keep Markdown and generated HTML drafts in browser local storage.
- Copy either the Markdown source or HTML output with one button.
- Use Tab indentation inside the Markdown editor.
- Persist a namespaced light or dark theme preference.
- Use the responsive interface on desktop and mobile browsers.

## Live Demo

Use the [live GitHub Pages application](https://doctorlai.github.io/markdown-html-converter/).

For an alternative with a Markdown API, see this [online Markdown/HTML previewer](https://helloacm.com/markdown/).

## Local Development

Requires Node.js 20 or newer.

```bash
git clone https://github.com/doctorlai/markdown-html-converter.git
cd markdown-html-converter
npm ci
npm run dev
```

Open the URL printed by Vite. The configured base path is `/markdown-html-converter/`.

## Usage

1. Enter Markdown in the left editor.
2. Select **Convert to HTML**.
3. Read or copy the generated HTML from the right editor and inspect the preview below.

The application restores both editors when you return in the same browser. Use **Clear** to empty the editors and their saved drafts.

The preview sanitizes generated HTML before rendering it. Continue to treat unknown Markdown carefully when copying its generated output elsewhere.

## Quality Commands

| Command              | Purpose                                       |
| -------------------- | --------------------------------------------- |
| `npm run format`     | Check formatting with Prettier                |
| `npm run format:fix` | Apply Prettier formatting                     |
| `npm run lint`       | Run ESLint                                    |
| `npm run test`       | Run the Vitest suite once                     |
| `npm run test:watch` | Run Vitest in watch mode                      |
| `npm run coverage`   | Test and enforce 80% coverage thresholds      |
| `npm run build`      | Create the production build                   |
| `npm run check`      | Run formatting, lint, coverage, and the build |

GitHub Actions runs `npm run check` for pushes and pull requests targeting `main`. A separate, least-privilege coverage workflow posts a Vitest coverage report on pull requests. Pushes to `main` pass the same checks before deploying to GitHub Pages and include the build date and short commit hash in the footer.

## Project Policies

- [Contributing Guide](CONTRIBUTING.md)
- [Security Policy](SECURITY.md)
- [Support](SUPPORT.md)
- [Privacy Notice](PRIVACY.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Changelog](CHANGELOG.md)

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- Built by [@justyy](https://github.com/doctorlai).
- If you found this tool useful, consider buying me a [coffee](https://www.buymeacoffee.com/y0BtG5R).
