import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const SITE_URL = env.VITE_SITE_URL || "https://mdkdinesh2503.netlify.app";
  const verification = env.VITE_GOOGLE_SITE_VERIFICATION || "";

  return {
    plugins: [
      react(),
      {
        name: "html-seo-transform",
        transformIndexHtml(html) {
          let transformed = html.replace(/https:\/\/mdkdinesh2503\.netlify\.app/g, SITE_URL);
          if (!verification.trim()) {
            transformed = transformed.replace(/\s*<meta name="google-site-verification" content="%VITE_GOOGLE_SITE_VERIFICATION%" \/>/g, "");
          }
          return transformed;
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
          manualChunks(id) {
            if (id.includes("node_modules/react/") || id.includes("node_modules/react-dom/")) {
              return "vendor-react";
            }
            if (id.includes("node_modules/react-router")) {
              return "vendor-router";
            }
            if (id.includes("node_modules/framer-motion")) {
              return "vendor-motion";
            }
            if (id.includes("node_modules/lucide-react")) {
              return "vendor-icons";
            }
            if (id.includes("node_modules/react-helmet-async")) {
              return "vendor-helmet";
            }
          },
        },
      },
    },
  }
});