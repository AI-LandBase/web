import { EmailText } from "@/components/layout/EmailText";

type Row = {
  label: string;
  value: string;
  isLink?: boolean;
};

const ROWS: Row[] = [
  { label: "正式名称", value: "株式会社 AI.LandBase（アイランドベース）" },
  { label: "代表者", value: "末永壽蔵" },
  { label: "所在地", value: "〒905-0412 沖縄県国頭郡今帰仁村湧川 852-2" },
  { label: "設立", value: "2025 年 6 月 26 日" },
  { label: "資本金", value: "300 万円" },
  {
    label: "事業内容",
    value:
      "観光業向け AI ソリューションの開発・提供、経営支援コンサルティング、施設管理代行",
  },
  { label: "Web", value: "https://ai-landbase.jp/", isLink: true },
];

export function CompanyTable() {
  return (
    <dl className="mx-auto max-w-[720px] divide-y divide-ink-200">
      {ROWS.map((row) => (
        <div
          key={row.label}
          className="flex flex-col gap-1 py-4 sm:flex-row sm:gap-4"
        >
          <dt className="w-32 shrink-0 text-sm font-bold text-ink-700">
            {row.label}
          </dt>
          <dd className="text-sm text-ink-900">
            {row.isLink ? (
              <a
                href={row.value}
                className="text-ink-800 underline hover:text-ink-900"
                target="_blank"
                rel="noopener noreferrer"
              >
                {row.value}
              </a>
            ) : (
              row.value
            )}
          </dd>
        </div>
      ))}
      <div className="flex flex-col gap-1 py-4 sm:flex-row sm:gap-4">
        <dt className="w-32 shrink-0 text-sm font-bold text-ink-700">
          メール
        </dt>
        <dd className="text-sm text-ink-900">
          <EmailText as="span" className="mt-0 text-ink-900" />
        </dd>
      </div>
    </dl>
  );
}
