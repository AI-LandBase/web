import { Section } from "@/components/primitives/Section";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { CTASection } from "@/components/cta/CTASection";

export default function Home() {
  return (
    <>
      <Section>
        <SectionHeading
          title="沖縄の観光業に、AI という伴走者を。"
          lead="Phase 6-2 でトップページの各セクションを実装します。"
        />
      </Section>
      <CTASection />
    </>
  );
}
