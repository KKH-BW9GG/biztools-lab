import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#1a365d',
        accent: '#e94560',
      },
      fontFamily: {
        sans: ['Hiragino Sans', 'Noto Sans JP', 'sans-serif'],
      },
    },
  },
  plugins: [typography],
}

export default config
