import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Section } from "@/components/primitives/Section";
import { EmailText } from "@/components/layout/EmailText";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description:
    "株式会社 AI.LandBase のプライバシーポリシー。個人情報の取り扱いについてご説明します。",
};

export default function PrivacyPage() {
  return (
    <>
      <Hero
        variant="soft"
        headline="プライバシーポリシー"
        lead="株式会社 AI.LandBase（以下「当社」）は、お客様の個人情報の保護を重要な責務と認識し、以下のとおりプライバシーポリシーを定めます。"
      />

      <Section>
        <div className="mx-auto max-w-[720px] space-y-10 text-sm leading-relaxed text-ink-700">
          <article>
            <h2 className="mb-4 text-lg font-bold text-ink-900">
              第1条（個人情報の定義）
            </h2>
            <p>
              本ポリシーにおいて「個人情報」とは、個人情報の保護に関する法律（以下「個人情報保護法」）に定める個人情報を指し、氏名、メールアドレスその他の記述等により特定の個人を識別できる情報をいいます。
            </p>
          </article>

          <article>
            <h2 className="mb-4 text-lg font-bold text-ink-900">
              第2条（個人情報の収集方法）
            </h2>
            <p>当社は、以下の方法により個人情報を取得することがあります。</p>
            <ul className="mt-3 list-disc space-y-1 pl-6">
              <li>
                メールでのお問い合わせ時に、お客様が提供する氏名・メールアドレス・ご相談内容
              </li>
              <li>
                当社サービスのご契約時に、お客様が提供する会社名・氏名・住所・電話番号・メールアドレス等
              </li>
            </ul>
          </article>

          <article>
            <h2 className="mb-4 text-lg font-bold text-ink-900">
              第3条（個人情報の利用目的）
            </h2>
            <p>当社は、取得した個人情報を以下の目的で利用します。</p>
            <ul className="mt-3 list-disc space-y-1 pl-6">
              <li>お問い合わせへの回答およびご連絡</li>
              <li>サービスの提供・運営・改善</li>
              <li>契約に関する事務手続き</li>
              <li>新サービスや重要なお知らせのご案内</li>
              <li>法令に基づく対応</li>
            </ul>
          </article>

          <article>
            <h2 className="mb-4 text-lg font-bold text-ink-900">
              第4条（個人情報の第三者提供）
            </h2>
            <p>
              当社は、以下の場合を除き、お客様の同意なく個人情報を第三者に提供しません。
            </p>
            <ul className="mt-3 list-disc space-y-1 pl-6">
              <li>法令に基づく場合</li>
              <li>
                人の生命・身体または財産の保護のために必要であり、本人の同意を得ることが困難な場合
              </li>
              <li>
                公衆衛生の向上または児童の健全な育成の推進のために必要であり、本人の同意を得ることが困難な場合
              </li>
              <li>
                国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合
              </li>
            </ul>
          </article>

          <article>
            <h2 className="mb-4 text-lg font-bold text-ink-900">
              第5条（個人情報の安全管理）
            </h2>
            <p>
              当社は、個人情報の漏えい・滅失・毀損の防止その他の安全管理のために、必要かつ適切な措置を講じます。
            </p>
          </article>

          <article>
            <h2 className="mb-4 text-lg font-bold text-ink-900">
              第6条（個人情報の開示・訂正・削除）
            </h2>
            <p>
              お客様は、当社が保有するご自身の個人情報について、開示・訂正・削除を請求することができます。ご請求の際は、下記のお問い合わせ先までご連絡ください。本人確認のうえ、合理的な期間内に対応いたします。
            </p>
          </article>

          <article>
            <h2 className="mb-4 text-lg font-bold text-ink-900">
              第7条（Cookie の使用について）
            </h2>
            <p>
              当社ウェブサイトでは、利用状況の把握やサービス改善を目的として、Cookie
              およびこれに類する技術を使用する場合があります。Cookie
              はお客様のブラウザ設定により無効にすることができますが、一部の機能が制限される場合があります。
            </p>
          </article>

          <article>
            <h2 className="mb-4 text-lg font-bold text-ink-900">
              第8条（アクセス解析ツール）
            </h2>
            <p>
              当社ウェブサイトでは、Google LLC が提供する Google Analytics
              を使用しています。Google Analytics は Cookie
              を使用してお客様の利用状況を収集しますが、個人を特定する情報は含まれません。収集されたデータは
              Google のプライバシーポリシーに基づき管理されます。
            </p>
          </article>

          <article>
            <h2 className="mb-4 text-lg font-bold text-ink-900">
              第9条（本ポリシーの変更）
            </h2>
            <p>
              当社は、必要に応じて本ポリシーの内容を変更することがあります。変更後のポリシーは、当社ウェブサイトに掲載した時点から効力を生じるものとします。
            </p>
          </article>

          <article>
            <h2 className="mb-4 text-lg font-bold text-ink-900">
              第10条（お問い合わせ先）
            </h2>
            <p>
              本ポリシーに関するお問い合わせは、下記までご連絡ください。
            </p>
            <table className="mt-4 w-full text-left">
              <caption className="sr-only">お問い合わせ先</caption>
              <tbody>
                <tr className="border-b border-ink-200">
                  <th scope="row" className="py-2 pr-4 font-medium text-ink-900">
                    事業者名
                  </th>
                  <td className="py-2">株式会社 AI.LandBase</td>
                </tr>
                <tr className="border-b border-ink-200">
                  <th scope="row" className="py-2 pr-4 font-medium text-ink-900">
                    代表者
                  </th>
                  <td className="py-2">末永壽蔵</td>
                </tr>
                <tr className="border-b border-ink-200">
                  <th scope="row" className="py-2 pr-4 font-medium text-ink-900">
                    所在地
                  </th>
                  <td className="py-2">
                    〒905-0412 沖縄県国頭郡今帰仁村湧川 852-2
                  </td>
                </tr>
                <tr className="border-b border-ink-200">
                  <th scope="row" className="py-2 pr-4 font-medium text-ink-900">
                    メール
                  </th>
                  <td className="py-2">
                    <EmailText as="span" className="mt-0 text-sm text-ink-700" />
                  </td>
                </tr>
              </tbody>
            </table>
          </article>

          <p className="pt-4 text-ink-500">制定日: 2025年6月26日</p>
        </div>
      </Section>
    </>
  );
}
