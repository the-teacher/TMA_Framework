import { defineConfig } from "vite";
import { builtinModules } from "module";

export default defineConfig({
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
