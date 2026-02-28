import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "Noto Sans",
          "Apple Color Emoji",
          "Segoe UI Emoji",
        ],
      },
      colors: {
        /* All from tokens: primary, white, secondary, ink, ink-light, bg */
        bg: "var(--color-bg)",
        primary: "var(--color-primary)",
        "primary-hover": "var(--color-primary-hover)",
        white: "var(--color-white)",
        secondary: "var(--color-secondary)",
        "secondary-hover": "var(--color-secondary-hover)",
        ink: "var(--color-ink)",
        "ink-light": "var(--color-ink-light)",
        /* Aliases so existing classes keep working */
        canvas: "var(--color-bg)",
        surface: "var(--color-bg)",
        "surface-2": "var(--color-bg)",
        "ink-2": "var(--color-ink-light)",
        muted: "var(--color-ink-light)",
        "muted-1": "var(--color-ink-light)",
        "muted-2": "var(--color-ink-light)",
        line: "color-mix(in srgb, var(--color-ink-light) 25%, transparent)",
        "line-strong": "color-mix(in srgb, var(--color-ink-light) 40%, transparent)",
        "on-primary": "var(--color-white)",
        paper: "var(--color-white)",
        brand: {
          50: "var(--color-primary)",
          100: "var(--color-primary)",
          200: "var(--color-primary)",
          300: "var(--color-primary)",
          400: "var(--color-primary)",
          500: "var(--color-primary)",
          600: "var(--color-secondary)",
          700: "var(--color-secondary)",
          800: "var(--color-secondary)",
          900: "var(--color-secondary)",
        },
      },
      boxShadow: {
        "lift-1": "var(--color-shadow)",
        "lift-2": "var(--color-shadow)",
        "glow": "0 0 20px var(--color-glow)",
        "glass-inset": "inset 0 1px 0 color-mix(in srgb, var(--color-white) 10%, transparent)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.25rem",
      },
      keyframes: {
        "soft-shimmer": {
          "0%": { transform: "translateX(-30%)" },
          "100%": { transform: "translateX(30%)" },
        },
      },
      animation: {
        "soft-shimmer": "soft-shimmer 8s ease-in-out infinite alternate",
      },
    },
  },
  plugins: [typography],
} satisfies Config;