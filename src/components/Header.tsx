import Link from 'next/link'
import { getAllCategories } from '@/lib/articles'

export default function Header() {
  const categories = getAllCategories()

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center justify-between h-14">
          {/* ロゴ */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="w-6 h-6 bg-brand rounded-md flex items-center justify-center">
              <span className="w-2.5 h-2.5 bg-accent rounded-sm" />
            </span>
            <span className="font-black text-base text-brand tracking-tight">
              BizTools<span className="text-accent">Lab</span>
            </span>
          </Link>

          {/* ナビ */}
          <nav className="hidden md:flex items-center gap-6">
            {categories.map(cat => (
              <Link
                key={cat}
                href={`/category/${encodeURIComponent(cat)}/`}
                className="text-xs font-medium text-gray-500 hover:text-accent transition-colors"
              >
                {cat}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}
