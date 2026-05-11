import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/primitives/Section";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { CTASection } from "@/components/cta/CTASection";
import { CompanyTable } from "./CompanyTable";
import { MissionBlock } from "./MissionBlock";
import { LeaderProfile } from "./LeaderProfile";
import { LocationSection } from "./LocationSection";

export const metadata: Metadata = {
  title: "会社案内",
  description:
    "株式会社 AI.LandBase の会社概要・ミッション・ビジョン・拠点情報。沖縄県北部を拠点に、AI テクノロジーで観光業の経営を支援しています。",
};

const MISSIONS = [
  {
    eyebrow: "Purpose — 存在意義",
    title: "AI と共に Payless なエコシステムを作る",
    body: "AI の力で、誰もが無理なく使える仕組みを築いていきます。",
  },
  {
    eyebrow: "Mission — 使命",
    title: "沖縄北部の観光業に AI を届ける",
    body: "沖縄県北部の観光業事業者（ホテル、飲食店、ツアー会社など）に AI テクノロジーの力を届け、データドリブンな経営への転換を支援することで、持続可能な観光産業の発展に貢献する。",
  },
  {
    eyebrow: "Vision — 目指す姿",
    title: "データと人間の知恵が融合する観光モデル地域へ",
    body: "2030 年までに、沖縄県北部の全観光業事業者が AI を活用した戦略的経営を実践し、データと人間の知恵が融合した新しい観光エコシステムのモデル地域となる。",
  },
] as const;

export default function AboutPage() {
  return (
    <>
      {/* 1. Hero */}
      <Hero
        variant="soft"
        headline="会社案内"
        lead="AI.LandBase は、沖縄県北部を拠点に、AI テクノロジーで観光業の経営を支援する会社です。"
      />

      {/* 2. 会社概要 */}
      <Section>
        <SectionHeading title="会社概要" />
        <CompanyTable />
      </Section>

      {/* 3. Mission / Vision / Purpose */}
      <Section variant="alt" id="mission">
        <SectionHeading title="ミッション・ビジョン" />
        <div className="space-y-12">
          {MISSIONS.map((item) => (
            <MissionBlock key={item.eyebrow} {...item} />
          ))}
        </div>
      </Section>

      {/* 4. 拠点紹介 */}
      <LocationSection />

      {/* 5. 代表者紹介 */}
      <Section>
        <SectionHeading title="代表者紹介" />
        <LeaderProfile />
      </Section>

      {/* 6. CTA */}
      <CTASection />
    </>
  );
}
