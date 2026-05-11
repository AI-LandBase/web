import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/primitives/Section";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { CTASection } from "@/components/cta/CTASection";
import { MailtoButton } from "@/components/cta/MailtoButton";
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
        variant="soft"
        headline="サービス"
        lead="AI.LandBase は、沖縄の観光業に特化した AI ツールと経営支援を提供しています。事業の規模やご要望に合わせて、3 つのプランからお選びいただけます。"
      />

      {/* 2. Comparison */}
      <Section>
        <SectionHeading title="プラン一覧" />
        <ComparisonTable />
        <div className="mt-8 text-center">
          <MailtoButton
            variant="primary"
            subject="[AI.LandBase] サービスに関するお問い合わせ"
          >
            メールで相談する
          </MailtoButton>
        </div>
      </Section>

      {/* 3. Plan details */}
      <Section variant="alt">
        <SectionHeading title="プラン詳細" />
        <div className="space-y-8">
          {PLANS.map((plan) => (
            <DetailedPlanCard key={plan.id} {...plan} />
          ))}
        </div>
      </Section>

      {/* 4. Spot services */}
      <Section>
        <SectionHeading
          title="スポット発注（施設管理代行）"
          lead="月額契約とは別に、必要な業務だけをスポットでご依頼いただけます。繁忙期の人手不足や急な対応が必要な場面でご活用ください。"
        />
        <div className="mx-auto max-w-[720px]">
          <SpotServiceTable />
        </div>
      </Section>

      {/* 5. AI Suite tools */}
      <Section variant="alt">
        <SectionHeading
          title="LandBase AI Suite — 10 のツールで経営を支える"
          lead="予約管理から経理、スタッフ教育まで。AI Suite は、観光業の日常業務を幅広くカバーする 10 のツールで構成されています。"
        />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {AI_SUITE_TOOLS.map((tool) => (
            <AISuiteToolTile key={tool.number} {...tool} />
          ))}
        </div>
      </Section>

      {/* 6. CTA */}
      <CTASection />
    </>
  );
}
