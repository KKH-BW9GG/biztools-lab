export default function Footer() {
  return (
    <footer className="bg-brand text-gray-400 text-xs py-8 mt-16">
      <div className="max-w-5xl mx-auto px-4 text-center space-y-2">
        <p className="font-bold text-white">ビジネスツール研究所</p>
        <p>AIが厳選する、本当に使えるビジネスアイテム</p>
        <p className="mt-4 leading-relaxed">
          当サイトはAmazon.co.jpを宣伝しリンクすることによってサイトが紹介料を獲得できる手段を提供することを目的に設定されたアフィリエイトプログラムである、
          Amazonアソシエイト・プログラムの参加者です。
        </p>
        <p className="mt-2">© {new Date().getFullYear()} ビジネスツール研究所</p>
      </div>
    </footer>
  )
}
