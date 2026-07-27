import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["index.ts"],
  format: ["cjs"],
  outDir: "dist",
  clean: true,
  bundle: true,
  sourcemap: false,
});