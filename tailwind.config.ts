import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Editorial paper system
        paper: "#F4F0E8",
        "paper-deep": "#EAE5D8",
        "paper-rule": "#D8D2C2",
        ink: "#0E1116",
        "ink-soft": "#3F4148",
        "ink-muted": "#6E7079",
        "ink-faint": "#9C9DA3",
        navy: "#1A3654",
        "navy-deep": "#0F2540",
        // Legacy aliases
        brand: "#0E1116",
        "brand-sub": "#6E7079",
        accent: "#1A3654",
        "accent-hover": "#0F2540",
        surface: "#EAE5D8",
        "surface-alt": "#EFE9DD",
      },
      fontFamily: {
        sans: [
          "var(--font-noto-sans)",
          "-apple-system",
          "BlinkMacSystemFont",
          "sans-serif",
        ],
        serif: [
          "var(--font-fraunces)",
          "var(--font-noto-serif)",
          "Georgia",
          "serif",
        ],
        display: [
          "var(--font-fraunces)",
          "var(--font-noto-serif)",
          "Georgia",
          "serif",
        ],
      },
      fontSize: {
        "display-xl": [
          "clamp(3rem, 8vw, 6.5rem)",
          { lineHeight: "0.95", letterSpacing: "-0.025em" },
        ],
        "display-lg": [
          "clamp(2.5rem, 6vw, 5rem)",
          { lineHeight: "1", letterSpacing: "-0.02em" },
        ],
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        fadeUp: "fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fadeUp-d1": "fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.08s both",
        "fadeUp-d2": "fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.16s both",
        "fadeUp-d3": "fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.24s both",
        fadeIn: "fadeIn 0.5s ease-out forwards",
      },
    },
  },
  plugins: [typography],
};

export default config;
