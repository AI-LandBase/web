import { Logo } from "@/components/brand/Logo";
import { MailtoButton } from "@/components/cta/MailtoButton";
import { Container } from "@/components/primitives/Container";
import { EmailText } from "./EmailText";

type SitemapLink = {
  label: string;
  href: string;
  placeholder?: boolean;
};

type SitemapSection = {
  heading: string;
  links: SitemapLink[];
};

const SITEMAP: SitemapSection[] = [
  {
    heading: "サービス",
    links: [
      { label: "スタンダードプラン", href: "/services#standard" },
      { label: "プロフェッショナルプラン", href: "/services#professional" },
      { label: "AI Suite Server プラン", href: "/services#server" },
    ],
  },
  {
    heading: "会社案内",
    links: [
      { label: "会社概要", href: "/about" },
      { label: "ミッション・ビジョン", href: "/about#mission" },
    ],
  },
  {
    heading: "お役立ち情報",
    links: [
      { label: "お知らせ", href: "/news", placeholder: true },
      { label: "導入事例", href: "/cases", placeholder: true },
      { label: "よくあるご質問", href: "/faq", placeholder: true },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink-900 py-12 md:py-16">
      <Container>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-6">
          <div className="col-span-2 mb-4 md:col-span-4 lg:col-span-1 lg:mb-0">
            <Logo variant="inverted" size="lg" />
            <p className="mt-3 text-sm text-ink-200">
              沖縄の観光業に、AI という伴走者を。
            </p>
          </div>

          {SITEMAP.map((section) => (
            <div key={section.heading}>
              <h3 className="mb-3 text-sm font-bold text-paper-pure">
                {section.heading}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    {link.placeholder ? (
                      <span className="text-sm text-ink-400">
                        {link.label}
                        <span className="ml-1 text-xs">（準備中）</span>
                      </span>
                    ) : (
                      <a
                        href={link.href}
                        className="text-sm text-ink-200 transition-colors hover:text-paper-pure hover:underline"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="mb-3 text-sm font-bold text-paper-pure">
              お問い合わせ
            </h3>
            <MailtoButton
              variant="onDark"
              size="md"
              subject="[AI.LandBase] サービスに関するお問い合わせ"
            >
              メールで相談する
            </MailtoButton>
            <EmailText />
          </div>
        </div>

        <div className="mt-12 border-t border-ink-800 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-ink-200">
              © {year} 株式会社 AI.LandBase
            </p>
            <div className="flex gap-6">
              <a
                href="/privacy"
                className="text-sm text-ink-200 transition-colors hover:text-paper-pure hover:underline"
              >
                プライバシーポリシー
              </a>
              <a
                href="/tokushoho"
                className="text-sm text-ink-200 transition-colors hover:text-paper-pure hover:underline"
              >
                特定商取引法に基づく表記
              </a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
