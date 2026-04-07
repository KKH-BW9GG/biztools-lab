import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Dark theme system
        ink: "#0B0B0C",
        "ink-raised": "#111114",
        "ink-border": "#1E1E22",
        "ink-divider": "#2A2A2F",
        parchment: "#EEECEA",
        "parchment-sub": "#888884",
        lime: "#CEFF47",
        "lime-hover": "#DBFF6A",
        // Legacy token aliases (mapped to dark values for backward compat)
        brand: "#EEECEA",
        "brand-sub": "#888884",
        accent: "#CEFF47",
        "accent-hover": "#DBFF6A",
        surface: "#111114",
        "surface-alt": "#141418",
      },
      fontFamily: {
        sans: [
          "var(--font-bricolage)",
          "var(--font-noto)",
          "-apple-system",
          "sans-serif",
        ],
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fadeUp-d1": "fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both",
        "fadeUp-d2": "fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both",
        "fadeUp-d3": "fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both",
        fadeIn: "fadeIn 0.5s ease-out forwards",
      },
    },
  },
  plugins: [typography],
};

export default config;
