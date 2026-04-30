import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import fs from "fs";

const REPO_NAME = "Engineering-Technology-Innovations-Show";

export default defineConfig({
  base: `/${REPO_NAME}/`,
  plugins: [
    react(),
    tailwindcss(),
    {
      name: "copy-index-to-404",
      closeBundle() {
        const outDir = path.resolve(import.meta.dirname, "dist/gh-pages");
        fs.copyFileSync(`${outDir}/index.html`, `${outDir}/404.html`);
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      "@assets": path.resolve(import.meta.dirname, "public"),
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/gh-pages"),
    emptyOutDir: true,
  },
  define: {
    "import.meta.env.BASE_URL": JSON.stringify(`/${REPO_NAME}/`),
  },
});
