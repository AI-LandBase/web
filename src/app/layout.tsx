import type { Metadata } from "next";
import { Noto_Sans_JP, Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SITE_URL, SITE_NAME } from "@/lib/constants";
import "./globals.css";

const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-noto-sans-jp",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-inter",
});

const description =
  "沖縄県北部の観光業事業者向けに AI ツールと経営支援を提供しています。宿泊・飲食・ツアー事業者の皆さまに、データドリブンな経営への転換をお手伝いします。";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | 沖縄の観光業に、AI という伴走者を`,
    template: `%s | ${SITE_NAME}`,
  },
  description,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "ja_JP",
    description,
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja"
      className={`${notoSansJp.variable} ${inter.variable} antialiased`}
    >
      <body className="flex min-h-dvh flex-col">
        <a href="#main" className="skip-link">
          本文へ移動
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
