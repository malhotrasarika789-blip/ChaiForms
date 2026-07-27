import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  bundle: true,
  splitting: false,
  sourcemap: false,
  clean: true,
  outDir: "dist",
  noExternal: [
    "@repo/logger",
    "@repo/trpc",
    "@repo/database"
  ],
});