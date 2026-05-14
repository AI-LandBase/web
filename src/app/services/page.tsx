import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/primitives/Section";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { CTASection } from "@/components/cta/CTASection";
import { ComparisonTable } from "./ComparisonTable";
import { DetailedPlanCard } from "./DetailedPlanCard";
import { SpotServiceTable } from "./SpotServiceTable";
import { AISuiteToolTile } from "./AISuiteToolTile";
import { PLANS, AI_SUITE_TOOLS } from "./_data";

export const metadata: Metadata = {
  title: "サービス",
  description:
    "AI.LandBase のサービス一覧。スタンダード・プロフェッショナル・AI Suite Server の 3 プランと、LandBase AI Suite 10 ツールの詳細をご紹介します。",
};

export default function ServicesPage() {
  return (
    <>
      {/* 1. Hero */}
      <Hero
        variant="dark"
        headline="サービス"
        lead="AI.LandBase は、沖縄の観光業に特化した AI ツールと経営支援を提供しています。事業の規模やご要望に合わせて、3 つのプランからお選びいただけます。"
      />

      {/* 2. Comparison */}
      <Section>
        <SectionHeading title="プラン比較表" />
        <ComparisonTable />
      </Section>

      {/* 3. Plan details */}
      <Section variant="alt">
        <SectionHeading title="プラン詳細" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {PLANS.map((plan) => (
            <DetailedPlanCard key={plan.id} {...plan} />
          ))}
        </div>
      </Section>

      {/* 4. Spot services + AI Suite tools (side by side on desktop) */}
      <Section>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_3fr]">
          <div>
            <h2 className="text-xl font-bold text-ink-900">
              スポット発注（施設管理代行）
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-600">
              必要なときに、必要な分だけご利用いただけるスポットサービスです。
            </p>
            <div className="mt-6">
              <SpotServiceTable />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-ink-900">
              LandBase AI Suite — 10 のツールで経営を支える
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-600">
              データ分析から業務効率化、顧客体験向上まで、観光業のあらゆる課題を支援する 10 の AI ツールをご用意しています。
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-5">
              {AI_SUITE_TOOLS.map((tool) => (
                <AISuiteToolTile key={tool.number} {...tool} compact />
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* 6. CTA */}
      <CTASection
        heading="プランについて、ご相談ください"
        subheading="お客様の事業に合ったプランを一緒に考えます。お気軽にお問い合わせください。"
        buttons={[
          { label: "メールで相談する", subject: "[AI.LandBase] サービスに関するお問い合わせ" },
        ]}
      />
    </>
  );
}
