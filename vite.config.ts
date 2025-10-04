import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const prerender = require("vite-plugin-prerender");

export default defineConfig({
  plugins: [
    react(),
    prerender({
      staticDir: resolve(__dirname, "dist"),
      routes: ["/"],
      rendererOptions: {
        renderAfterDocumentEvent: "render-event",
      },
    }),
  ],
  build: {
    outDir: "dist",
  },
});
