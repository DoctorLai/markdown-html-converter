// vitest.config.js
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/setup.js",
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "json", "json-summary"],
      thresholds: {
        lines: 77,
        statements: 77,
        functions: 22,
        branches: 62,
      },      
    },
  },
});
