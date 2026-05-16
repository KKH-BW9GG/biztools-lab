import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Minimal: white / ink / single blue accent
        paper: "#FFFFFF",
        "paper-deep": "#F5F6F7",
        "paper-rule": "#E6E7EA",
        ink: "#14161A",
        "ink-soft": "#3C3F45",
        "ink-muted": "#787B82",
        "ink-faint": "#ABADB3",
        accent: "#1D4ED8",
        "accent-hover": "#1E40AF",
        // Legacy aliases (kept so stray refs still resolve to the new system)
        navy: "#1D4ED8",
        "navy-deep": "#1E40AF",
        brand: "#14161A",
        "brand-sub": "#787B82",
        surface: "#F5F6F7",
        "surface-alt": "#F5F6F7",
      },
      fontFamily: {
        sans: [
          "var(--font-noto-sans)",
          "-apple-system",
          "BlinkMacSystemFont",
          "sans-serif",
        ],
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        serif: ["var(--font-noto-sans)", "-apple-system", "sans-serif"],
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fadeUp-d1": "fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.07s both",
        "fadeUp-d2": "fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.14s both",
        "fadeUp-d3": "fadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.21s both",
        fadeIn: "fadeIn 0.5s ease-out forwards",
      },
    },
  },
  plugins: [typography],
};

export default config;
