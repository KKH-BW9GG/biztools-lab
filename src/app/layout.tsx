import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: {
    default: 'ビジネスツール研究所',
    template: '%s | ビジネスツール研究所',
  },
  description: 'AIが厳選する、本当に使えるビジネスアイテム。ビジネス書・手帳・デスクグッズ・SaaSツールを正直に比較します。',
  openGraph: {
    siteName: 'ビジネスツール研究所',
    locale: 'ja_JP',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
