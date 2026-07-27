import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["./src/index.ts"],
  bundle: true,
  splitting: false,
  clean: true,
  outDir: "./dist",
  format: ["cjs"],
  target: "node20",
  sourcemap: false,
  minify: true,
  loader: {
    ".json": "copy",
  },
  noExternal: [
    "@repo/logger",
    "@repo/trpc",
    "@repo/database",
  ],
});