import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',   // 静的HTML生成 → Vercelに最適
  trailingSlash: true,
  images: { unoptimized: true },
}

export default nextConfig
