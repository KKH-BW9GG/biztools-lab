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
    <footer className="border-t border-ink bg-paper">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <Link href="/" className="flex items-baseline gap-1.5 mb-3">
              <span className="font-display text-[22px] font-semibold text-ink tracking-tight leading-none">
                BizTools
              </span>
              <span className="font-display italic text-[22px] font-medium text-navy tracking-tight leading-none">
                Lab
              </span>
            </Link>
            <p className="font-jp-serif text-[14px] text-ink-soft leading-[1.85] max-w-sm">
              本当に使えた道具だけを、短い手記にして残しています。
              <br />
              書くのもひとり、買うのもひとり。
            </p>
          </div>

          <div className="md:col-span-3 md:col-start-7">
            <p className="label-meta mb-5">Sections</p>
            <ul className="space-y-2.5">
              {LINKS.map((l) => (
                <li key={l.name}>
                  <Link
                    href={l.href}
                    className="font-jp-serif text-[14px] text-ink-soft hover:text-navy transition-colors"
                  >
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <p className="label-meta mb-5">Disclosure</p>
            <p className="text-[12px] text-ink-soft leading-[1.8]">
              当サイトはAmazon.co.jpを宣伝しリンクすることによってサイトが紹介料を獲得できる手段を提供することを目的に設定されたAmazonアソシエイト・プログラムの参加者です。
            </p>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-paper-rule flex items-baseline justify-between">
          <p className="font-display text-[11px] text-ink-muted tabular-nums tracking-wider">
            &copy; {new Date().getFullYear()} BizTools Lab. All rights reserved.
          </p>
          <p className="font-display italic text-[11px] text-ink-muted">
            Made with care · Tokyo
          </p>
        </div>
      </div>
    </footer>
  );
}
