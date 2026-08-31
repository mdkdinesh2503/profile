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

  build: {
    target: "es2020",
    cssCodeSplit: true,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // Manually split large vendor libs into separately cacheable chunks.
        // Users only re-download app code on updates, not framework code.
        manualChunks(id) {
          // React core — almost never changes, long-lived cache
          if (id.includes("node_modules/react/") || id.includes("node_modules/react-dom/")) {
            return "vendor-react";
          }
          // React Router
          if (id.includes("node_modules/react-router")) {
            return "vendor-router";
          }
          // Framer Motion — heavy, but also stable across deploys
          if (id.includes("node_modules/framer-motion")) {
            return "vendor-motion";
          }
          // Lucide icons — tree-shaken but still sizeable
          if (id.includes("node_modules/lucide-react")) {
            return "vendor-icons";
          }
          // react-helmet-async
          if (id.includes("node_modules/react-helmet-async")) {
            return "vendor-helmet";
          }
        },
      },
    },
  },
});