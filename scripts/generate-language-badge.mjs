import { mkdir, writeFile } from "node:fs/promises";

const repository = process.env.GITHUB_REPOSITORY;
const headers = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
};

if (!repository) {
  throw new Error("GITHUB_REPOSITORY is required");
}

if (process.env.GITHUB_TOKEN) {
  headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
}

const response = await fetch(
  `https://api.github.com/repos/${repository}/languages`,
  { headers },
);

if (!response.ok) {
  throw new Error(`GitHub languages request failed: ${response.status}`);
}

const languages = await response.json();
const totalBytes = Object.values(languages).reduce(
  (total, bytes) => total + bytes,
  0,
);
const javascriptPercentage = totalBytes
  ? ((languages.JavaScript || 0) / totalBytes) * 100
  : 0;
const badge = {
  schemaVersion: 1,
  label: "JavaScript",
  message: `${javascriptPercentage.toFixed(1)}%`,
  color: "#f1e05a",
};

await mkdir("public", { recursive: true });
await writeFile(
  "public/language-badge.json",
  `${JSON.stringify(badge, null, 2)}\n`,
);
