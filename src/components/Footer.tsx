import Link from "next/link";

const LINKS = [
  {
    name: "ビジネスSaaS",
    href: "/category/%E3%83%93%E3%82%B8%E3%83%8D%E3%82%B9SaaS%E3%83%BB%E3%83%84%E3%83%BC%E3%83%AB/",
  },
  {
    name: "デスク・PC",
    href: "/category/%E3%83%87%E3%82%B9%E3%82%AF%E3%83%BBPC%E3%82%A2%E3%82%AF%E3%82%BB%E3%82%B5%E3%83%AA/",
  },
  {
    name: "手帳・ノート",
    href: "/category/%E6%89%8B%E5%B8%B3%E3%83%BB%E3%83%8E%E3%83%BC%E3%83%88/",
  },
  {
    name: "ビジネス書",
    href: "/category/%E3%83%93%E3%82%B8%E3%83%8D%E3%82%B9%E6%9B%B8/",
  },
];

export default function Footer() {
  return (
    <footer className="bg-ink-raised border-t border-ink-border mt-0">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-lime flex-shrink-0" />
              <p className="font-bold text-parchment text-sm">BizTools Lab</p>
            </div>
            <p className="text-xs text-parchment-sub leading-relaxed">
              使って良かったものだけ。正直レビュー。
            </p>
          </div>

          <div>
            <p className="text-[11px] font-semibold text-parchment-sub uppercase tracking-widest mb-4">
              Categories
            </p>
            <ul className="space-y-2.5">
              {LINKS.map((l) => (
                <li key={l.name}>
                  <Link
                    href={l.href}
                    className="text-xs text-parchment-sub hover:text-parchment transition-colors"
                  >
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-semibold text-parchment-sub uppercase tracking-widest mb-4">
              About
            </p>
            <p className="text-xs text-parchment-sub leading-relaxed">
              当サイトはAmazon.co.jpを宣伝しリンクすることによってサイトが紹介料を獲得できる手段を提供することを目的に設定された
              Amazonアソシエイト・プログラムの参加者です。
            </p>
          </div>
        </div>

        <div className="border-t border-ink-border mt-10 pt-6">
          <p className="text-[11px] text-parchment-sub text-center">
            &copy; {new Date().getFullYear()} BizTools Lab
          </p>
        </div>
      </div>
    </footer>
  );
}
