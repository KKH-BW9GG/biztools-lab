import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#0f2240',
        'brand-mid': '#1a365d',
        accent: '#e94560',
        'accent-light': '#ff6b81',
        surface: '#f8f9fc',
      },
      fontFamily: {
        sans: ['Hiragino Sans', 'Noto Sans JP', 'sans-serif'],
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fadeUp: 'fadeUp 0.7s ease-out forwards',
        'fadeUp-d1': 'fadeUp 0.7s ease-out 0.15s both',
        'fadeUp-d2': 'fadeUp 0.7s ease-out 0.3s both',
      },
    },
  },
  plugins: [typography],
}

export default config
