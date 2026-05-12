import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/primitives/Section";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { MailtoButton } from "@/components/cta/MailtoButton";
import { ContactDetails } from "./ContactDetails";

export const metadata: Metadata = {
  title: "お問い合わせ",
  description:
    "AI.LandBase へのお問い合わせ。サービスのご相談、宿泊税対応、自治体・行政からのご連絡など、お気軽にメールでご連絡ください。",
};

const INTENTS = [
  {
    label: "サービスについて相談したい",
    subject: "[AI.LandBase] サービスに関するお問い合わせ",
  },
  {
    label: "宿泊税対応について聞きたい",
    subject: "[AI.LandBase] 宿泊税対応に関するお問い合わせ",
  },
  {
    label: "自治体・行政からの連絡",
    subject: "[AI.LandBase] 自治体・行政からのお問い合わせ",
  },
  {
    label: "パートナー連携の相談",
    subject: "[AI.LandBase] パートナー連携に関するお問い合わせ",
  },
  {
    label: "取材・メディアのご依頼",
    subject: "[AI.LandBase] 取材・メディアに関するお問い合わせ",
  },
  {
    label: "採用について",
    subject: "[AI.LandBase] 採用に関するお問い合わせ",
  },
  {
    label: "その他のお問い合わせ",
    subject: "[AI.LandBase] お問い合わせ",
  },
] as const;

export default function ContactPage() {
  return (
    <>
      {/* 1. Hero */}
      <Hero
        variant="soft"
        headline="お問い合わせ"
        lead="AI.LandBase へのご連絡は、メールにて承っています。ご相談内容に近いボタンをお選びください。お気軽にどうぞ。"
      />

      {/* 2. Intent buttons */}
      <Section>
        <h2 className="sr-only">ご相談内容の選択</h2>
        <p className="mb-10 text-center text-sm font-medium text-ink-500 md:mb-14">
          ご相談内容をお選びください
        </p>
        <div className="mx-auto grid max-w-[720px] gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {INTENTS.map((intent) => (
            <MailtoButton
              key={intent.label}
              variant="ghost"
              subject={intent.subject}
              fullWidth
            >
              {intent.label}
            </MailtoButton>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-ink-400">
          件名はあらかじめ入力されます。本文に状況をご記入のうえご送信ください。
        </p>
      </Section>

      {/* 3. Contact details */}
      <Section variant="alt">
        <SectionHeading title="連絡先" />
        <ContactDetails />
      </Section>

      {/* 4. Approach */}
      <Section>
        <SectionHeading title="お問い合わせから返信まで" />
        <div className="mx-auto max-w-[720px] space-y-3 text-sm leading-relaxed text-ink-600">
          <p>
            通常 2〜3 営業日以内に担当者よりご返信いたします。内容によってはお時間をいただく場合があります。
          </p>
          <p>
            ご相談はすべて秘密厳守で対応いたします。検討段階のふわっとしたご相談も歓迎です。
          </p>
        </div>
      </Section>
    </>
  );
}
