import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/primitives/Section";
import { SectionHeading } from "@/components/primitives/SectionHeading";
import { EmailText } from "@/components/layout/EmailText";

export const metadata: Metadata = {
  title: "特定商取引法に基づく表記",
  description:
    "株式会社 AI.LandBase の特定商取引法に基づく表記。販売事業者情報、販売価格、支払方法、返品・キャンセルについてご確認いただけます。",
};

const DISCLOSURE_ITEMS: { label: string; value: string | null }[] = [
  { label: "販売事業者", value: "株式会社 AI.LandBase" },
  { label: "代表者", value: "末永壽蔵" },
  { label: "所在地", value: "〒905-0412 沖縄県国頭郡今帰仁村湧川 852-2" },
  { label: "メールアドレス", value: null },
  {
    label: "電話番号",
    value: "ご請求いただいた方に遅滞なく開示いたします",
  },
  {
    label: "販売価格",
    value: "各サービスページに表示された価格に準じます",
  },
  {
    label: "販売価格以外の必要料金",
    value: "消費税（税別表示の場合）",
  },
  {
    label: "支払方法",
    value: "銀行振込 / クレジットカード決済（Square）",
  },
  {
    label: "支払時期",
    value:
      "サービスにより異なります。詳細はご契約時にご案内いたします",
  },
  {
    label: "役務の提供時期",
    value: "お申し込み後、双方合意のうえ決定いたします",
  },
  {
    label: "返品・キャンセルについて",
    value:
      "サービスの性質上、提供開始後の返品・返金はお受けしておりません。詳細はご契約前にご説明いたします",
  },
  {
    label: "動作環境",
    value:
      "AI Suite Server プラン: macOS / iPadOS / インターネット接続環境が必要です",
  },
] as const;

const PRICE_TABLE = [
  { service: "スタンダードプラン", price: "月額 50,000 円" },
  { service: "プロフェッショナルプラン", price: "個別見積" },
  { service: "AI Suite Server プラン", price: "1,965,000 円（一式）" },
] as const;

export default function TokushohoPage() {
  return (
    <>
      <Hero
        variant="soft"
        headline="特定商取引法に基づく表記"
        lead="特定商取引法第11条（通信販売についての広告）に基づく表示事項です。"
      />

      {/* 表示事項 */}
      <Section>
        <div className="mx-auto max-w-[720px]">
          <h2 className="sr-only">表示事項</h2>
          <table className="w-full text-left text-sm">
            <caption className="sr-only">
              特定商取引法に基づく表示事項
            </caption>
            <tbody>
              {DISCLOSURE_ITEMS.map((item) => (
                <tr key={item.label} className="border-b border-ink-200">
                  <th
                    scope="row"
                    className="w-[140px] py-3 pr-4 align-top font-medium text-ink-900 md:w-[200px]"
                  >
                    {item.label}
                  </th>
                  <td className="py-3 text-ink-700">
                    {item.value ?? (
                      <EmailText as="span" className="mt-0 text-sm text-ink-700" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {/* 補足 */}
      <Section variant="alt">
        <SectionHeading title="主なサービスと価格" />
        <div className="mx-auto max-w-[720px]">
          <table className="w-full text-left text-sm">
            <caption className="sr-only">主なサービスと価格一覧</caption>
            <thead>
              <tr className="border-b border-ink-300">
                <th scope="col" className="py-3 pr-4 font-medium text-ink-900">
                  サービス
                </th>
                <th scope="col" className="py-3 font-medium text-ink-900">
                  価格（税別）
                </th>
              </tr>
            </thead>
            <tbody>
              {PRICE_TABLE.map((row) => (
                <tr key={row.service} className="border-b border-ink-200">
                  <th
                    scope="row"
                    className="py-3 pr-4 font-normal text-ink-700"
                  >
                    {row.service}
                  </th>
                  <td className="py-3 text-ink-700">{row.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-4 text-xs text-ink-500">
            ※
            上記は本表記作成時点の価格です。最新の価格は
            <Link
              href="/services"
              className="text-sea-600 underline hover:text-sea-700"
            >
              サービスページ
            </Link>
            をご確認ください。
          </p>
        </div>
      </Section>

      {/* 補助金について */}
      <Section>
        <SectionHeading title="補助金について" />
        <div className="mx-auto max-w-[720px] text-sm leading-relaxed text-ink-700">
          <p>
            AI Suite Server
            プランは、沖縄県の補助金制度を活用できる場合があります。補助金活用時の費用については個別にご案内いたします。
          </p>
        </div>
      </Section>
    </>
  );
}
