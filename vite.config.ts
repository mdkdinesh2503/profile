import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const SITE_URL = process.env.VITE_SITE_URL || "https://mdkdinesh2503.netlify.app";

export default defineConfig({
  plugins: [
    react(),
    {
      name: "html-site-url",
      transformIndexHtml(html) {
        return html.replace(/https:\/\/mdkdinesh2503\.netlify\.app/g, SITE_URL);
      },
    },
  ],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});