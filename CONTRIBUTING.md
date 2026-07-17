# Contributing

Contributions are welcome through GitHub issues and pull requests. For substantial changes, open an issue first so the behavior and scope can be agreed upon.

## Development

Prerequisites:

- Node.js 20 or newer. Run `nvm use` when using nvm.
- npm, using the committed lockfile.

```bash
npm ci
npm run dev
```

Before opening a pull request, run the same aggregate check used by CI:

```bash
npm run check
```

Use `npm run format:fix` to apply formatting. Add focused tests for behavior changes, keep coverage above the configured 80% thresholds, and update documentation for user-visible changes.

## Pull Requests

Keep each pull request focused, explain the motivation, and include screenshots for visual changes. By participating, you agree to follow the [Code of Conduct](CODE_OF_CONDUCT.md).
