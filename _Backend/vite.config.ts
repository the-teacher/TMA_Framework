import { defineConfig } from "vite";
import { builtinModules } from "module";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@framework-core": path.resolve(__dirname, "src/framework/_core"),
    },
  },
  build: {
    target: "node22",
    outDir: "dist",
    rollupOptions: {
      input: "./src/index.ts",
      output: {
        format: "cjs",
      },
      external: [...builtinModules],
    },
  },
});
