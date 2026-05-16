import Link from "next/link";

const LINKS = [
  {
    name: "ビジネスSaaS・ツール",
    href: "/category/%E3%83%93%E3%82%B8%E3%83%8D%E3%82%B9SaaS%E3%83%BB%E3%83%84%E3%83%BC%E3%83%AB/",
  },
  {
    name: "デスク・PCアクセサリ",
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
    <footer className="bg-ink text-paper">
      <div className="max-w-5xl mx-auto px-6 py-14">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-6">
            <Link
              href="/"
              className="flex items-baseline gap-[3px] leading-none"
            >
              <span className="text-[20px] font-bold tracking-tight">
                BizTools
              </span>
              <span className="text-[20px] font-bold tracking-tight text-accent">
                Lab
              </span>
            </Link>
            <p className="mt-4 text-[13px] text-paper/55 leading-[1.9] max-w-sm">
              実際に使って良かった仕事道具を中心に、気になる定番アイテムをレビューしています。
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-paper/45 mb-4">
              Sections
            </p>
            <ul className="space-y-2.5">
              {LINKS.map((l) => (
                <li key={l.name}>
                  <Link
                    href={l.href}
                    className="text-[13px] text-paper/70 hover:text-paper transition-colors"
                  >
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-paper/45 mb-4">
              Disclosure
            </p>
            <p className="text-[12px] text-paper/55 leading-[1.9]">
              当サイトはAmazonアソシエイト・プログラムの参加者です。適格販売により収入を得る場合があります。
            </p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-paper/12">
          <p className="font-display text-[11px] text-paper/45 tabular-nums tracking-wide">
            &copy; {new Date().getFullYear()} BizTools Lab
          </p>
        </div>
      </div>
    </footer>
  );
}
