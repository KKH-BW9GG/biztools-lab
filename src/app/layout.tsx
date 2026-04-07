import type { Metadata } from "next";
import { Bricolage_Grotesque, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto",
  display: "swap",
});
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const BASE = "https://biztools-lab.vercel.app";

export const metadata: Metadata = {
  title: {
    default: "BizTools Lab | 使って良かったビジネスツールだけ紹介",
    template: "%s | BizTools Lab",
  },
  description:
    "元コンサルのビジネスマンが実際に買って使ったデスクグッズ・ガジェット・ビジネス書を正直にレビュー。本当に良かったものだけ紹介します。",
  metadataBase: new URL(BASE),
  verification: { google: "S3vGER-nUToyH5njXOBp-aJw3x23rIG9U_U0E1AkA7k" },
  openGraph: {
    siteName: "BizTools Lab",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const SITE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "BizTools Lab",
  url: "https://biztools-lab.vercel.app",
  description:
    "元コンサルのビジネスマンが実際に買って使ったデスクグッズ・ガジェット・ビジネス書を正直にレビュー。",
  inLanguage: "ja",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://biztools-lab.vercel.app/?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(SITE_JSONLD) }}
        />
      </head>
      <body
        className={`${bricolage.variable} ${notoSansJP.variable} min-h-screen flex flex-col bg-ink text-parchment`}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
