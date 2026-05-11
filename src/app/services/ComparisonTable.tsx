import { cn } from "@/lib/cn";

type PlanColumn = {
  name: string;
  variant: "standard" | "professional" | "server";
};

const PLANS: PlanColumn[] = [
  { name: "スタンダード", variant: "standard" },
  { name: "プロフェッショナル", variant: "professional" },
  { name: "AI Suite Server", variant: "server" },
];

const HEADER_COLOR = {
  standard: "bg-plan-standard-soft text-plan-standard",
  professional: "bg-plan-professional-soft text-plan-professional",
  server: "bg-plan-server-soft text-plan-server",
} as const;

const ROWS = [
  {
    label: "料金",
    values: ["月額 5 万円", "個別見積", "¥1,965,000（税別・一式）"],
  },
  {
    label: "形態",
    values: [
      "月額制（サブスクリプション）",
      "個別見積（法人・団体向け）",
      "買い切り（オンプレミス）",
    ],
  },
  {
    label: "こんな方に",
    values: [
      "AI ツールを試してみたい方",
      "経営全体の改善に取り組みたい方",
      "自社設備で AI を完結運用したい方",
    ],
  },
  {
    label: "AI Suite",
    values: [
      "ソフト利用",
      "ソフト利用 + カスタム開発",
      "ソフト + 導入機器一式",
    ],
  },
  {
    label: "面談・サポート",
    values: [
      "月次オンライン面談",
      "現地指導 + オンライン",
      "導入サポート",
    ],
  },
  {
    label: "主な対象業種",
    values: [
      "宿泊・飲食・ツアー",
      "宿泊・飲食・ツアー",
      "宿泊",
    ],
  },
] as const;

export function ComparisonTable() {
  return (
    <>
      {/* Desktop table */}
      <div className="hidden md:block">
        <table className="w-full border-collapse text-sm">
          <caption className="sr-only">プラン比較表</caption>
          <thead>
            <tr>
              <th scope="col" className="w-1/5 p-3" />
              {PLANS.map((plan) => (
                <th
                  key={plan.variant}
                  scope="col"
                  className={cn(
                    "w-[26.67%] rounded-t-lg p-3 text-center font-bold",
                    HEADER_COLOR[plan.variant],
                  )}
                >
                  {plan.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row, i) => (
              <tr
                key={row.label}
                className={i % 2 === 0 ? "bg-paper-pure" : "bg-paper-soft"}
              >
                <th scope="row" className="p-3 text-left font-bold text-ink-700">
                  {row.label}
                </th>
                {row.values.map((val, j) => (
                  <td
                    key={PLANS[j].variant}
                    className="p-3 text-center text-ink-900"
                  >
                    {val}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="space-y-6 md:hidden">
        {PLANS.map((plan, planIdx) => (
          <div
            key={plan.variant}
            className="rounded-lg border border-ink-200 bg-paper-pure overflow-hidden"
          >
            <div
              className={cn(
                "p-3 text-center font-bold",
                HEADER_COLOR[plan.variant],
              )}
            >
              {plan.name}
            </div>
            <dl className="divide-y divide-ink-100 px-4">
              {ROWS.map((row) => (
                <div
                  key={row.label}
                  className="flex justify-between gap-2 py-3 text-sm"
                >
                  <dt className="font-bold text-ink-700">{row.label}</dt>
                  <dd className="text-right text-ink-900">
                    {row.values[planIdx]}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </>
  );
}
