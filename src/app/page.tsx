import { Users, BarChart3, Waves, Tag, MapPin, Handshake } from "lucide-react";
import { Section } from "@/components/primitives/Section";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { CTASection } from "@/components/cta/CTASection";
import { Hero } from "@/components/sections/Hero";
import { IconCard } from "@/components/sections/IconCard";
import { PlanCard } from "@/components/sections/PlanCard";
import { AsymmetricMediaSection } from "@/components/sections/AsymmetricMediaSection";
import { SITE_URL, SITE_NAME } from "@/lib/constants";

const PROBLEMS = [
  {
    icon: Users,
    title: "人手不足",
    body: "シフトが回らない、事務作業に追われて接客に集中できない。人を増やしたくても、採用も定着も難しい状況が続いています。",
  },
  {
    icon: BarChart3,
    title: "データが活かせない",
    body: "予約台帳、売上管理、口コミ対応——情報はあるのに、バラバラのまま。経験と勘に頼る判断から、なかなか抜け出せないと感じていませんか。",
  },
  {
    icon: Waves,
    title: "季節による売上の波",
    body: "繁忙期は忙しく、閑散期は不安になる。安定した経営のために何をすべきか、見通しが立てにくい毎日です。",
  },
] as const;

const PLANS = [
  {
    variant: "standard" as const,
    name: "スタンダードプラン",
    priceLabel: "月額 5 万円",
    priceDisplay: { prefix: "月額", main: "5", suffix: "万円", mainClass: "text-5xl" },
    description:
      "AI ツールの活用と毎月のオンライン面談で、データに基づく経営改善を始められます。",
    href: "/services#standard",
  },
  {
    variant: "professional" as const,
    name: "プロフェッショナルプラン",
    priceLabel: "個別見積",
    priceDisplay: { main: "個別見積", mainClass: "text-3xl" },
    description:
      "現地での指導やカスタム AI 開発を含む、包括的な経営改善パッケージです。",
    href: "/services#professional",
  },
  {
    variant: "server" as const,
    name: "AI Suite Server プラン",
    priceLabel: "¥1,965,000",
    priceNote: "（税別・一式）",
    priceDisplay: { main: "¥1,965,000", mainClass: "text-3xl" },
    description:
      "自社環境での本格的な運用に。オンプレミス型で高いセキュリティと柔軟なカスタマイズが可能です。",
    href: "/services#server",
  },
] as const;

const REASONS = [
  {
    icon: Tag,
    title: "価格をすべて公開しています",
    body: "すべてのプランで料金体系を明示しています。「問い合わせないと金額がわからない」ということはありません。ご予算に合わせて、最適なプランをお選びいただけます。",
  },
  {
    icon: MapPin,
    title: "沖縄県北部に拠点を置いています",
    body: "今帰仁村に自社の宿泊施設「Ikigai Stay」を構え、日々 AI ツールを運用しています。困ったときに相談できる場所が近くにある。それが、私たちが大切にしている距離感です。",
  },
  {
    icon: Handshake,
    title: "システム導入だけで終わりません",
    body: "単なる予約管理システムの提供ではありません。10 の AI ツールを統合した経営支援に加え、毎月の面談で数字を一緒に振り返り、現場のオペレーション改善まで伴走します。「導入したけど使いこなせない」という不安に、一緒に向き合います。",
  },
] as const;

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo/logo.png`,
    email: "info@ai-landbase.jp",
    address: {
      "@type": "PostalAddress",
      postalCode: "905-0412",
      addressRegion: "沖縄県",
      addressLocality: "国頭郡今帰仁村",
      streetAddress: "湧川 852-2",
      addressCountry: "JP",
    },
    description:
      "沖縄県北部の観光業事業者向けに AI ツールと経営支援を提供しています。",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* 1. Hero */}
      <Hero
        variant="media"
        headline="沖縄の観光業に、AI という伴走者を。"
        lead="人手不足、データ活用、収益の安定化——日々の課題に向き合う事業者のそばで、AI テクノロジーが経営を支えます。地元・沖縄北部に拠点を置く AI.LandBase が、現場に寄り添いながらお手伝いします。"
        imageSrc="/images/ikigai-stay.jpg"
        cta={{
          label: "メールで相談する",
          subject: "[AI.LandBase] サービスに関するお問い合わせ",
          caption: "どんなご相談でもお待ちしています",
        }}
      />

      {/* 2. Problems */}
      <Section>
        <SectionHeading title="こんな課題を抱えていませんか？" />
        <ul
          role="list"
          className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10"
        >
          {PROBLEMS.map((item) => (
            <IconCard key={item.title} {...item} />
          ))}
        </ul>
      </Section>

      {/* 3. Plans */}
      <Section variant="alt">
        <SectionHeading title="あなたの経営に合うプランがあります" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {PLANS.map((plan) => (
            <PlanCard key={plan.variant} {...plan} />
          ))}
        </div>
      </Section>

      {/* 4. Reasons */}
      <Section>
        <SectionHeading title="AI.LandBase が選ばれる理由" />
        <ul
          role="list"
          className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10"
        >
          {REASONS.map((item) => (
            <IconCard key={item.title} {...item} />
          ))}
        </ul>
      </Section>

      {/* 5. Proof */}
      <AsymmetricMediaSection
        heading="私たちが最初のユーザーです"
        body={[
          "AI.LandBase は、沖縄県今帰仁村にある自社宿泊施設「Ikigai Stay」で AI Suite の全 10 ツールを日々運用しています。お客様にご提案するサービスはすべて、自分たちが現場で使い、検証を重ねたものです。",
          "「売り手が自分で使っている」こと。それが、私たちの信頼の出発点です。",
        ]}
        linkLabel="会社案内を見る →"
        linkHref="/about"
        imageSrc="/images/ikigai-stay.jpg"
        imageAlt="Ikigai Stay — 沖縄県今帰仁村の自社宿泊施設"
      />

      {/* 6. CTA */}
      <CTASection />
    </>
  );
}
