import { cn } from "@/lib/cn";
import { PLANS } from "./_data";
import type { PlanVariant } from "./_data";

const HEADER_COLOR: Record<PlanVariant, string> = {
  standard: "bg-plan-standard-soft text-plan-standard",
  professional: "bg-plan-professional-soft text-plan-professional",
  server: "bg-plan-server-soft text-plan-server",
};

const PRICE_COLOR: Record<PlanVariant, string> = {
  standard: "text-plan-standard",
  professional: "text-plan-professional",
  server: "text-plan-server",
};

const ROWS = PLANS.map((p) => ({
  variant: p.variant,
  shortName: p.shortName,
  priceLabel: p.priceLabel,
  priceNote: p.priceNote,
  priceDisplay: p.comparison.priceDisplay,
  cells: {
    形態: p.comparison.format,
    こんな方に: p.comparison.audience,
    "AI Suite": p.comparison.aiSuite,
    "面談・サポート": p.comparison.support,
    主な対象業種: p.targetIndustry
      .replace(/施設|店|会社/g, "")
      .replace(/ \/ /g, "・")
      .replace(/ツアー・アクティビティ/, "ツアー"),
  },
}));

const ROW_LABELS = Object.keys(ROWS[0].cells) as (keyof (typeof ROWS)[0]["cells"])[];

export function ComparisonTable() {
  return (
    <>
      {/* Desktop table */}
      <div className="hidden md:block">
        <table className="w-full border-collapse text-sm">
          <caption className="sr-only">プラン比較表</caption>
          <thead>
            <tr>
              <th scope="col" className="w-1/5 border border-ink-200 bg-paper-soft p-3" />
              {ROWS.map((row) => (
                <th
                  key={row.variant}
                  scope="col"
                  className={cn(
                    "w-[26.67%] border border-ink-200 p-3 text-center font-bold",
                    HEADER_COLOR[row.variant],
                  )}
                >
                  {row.shortName}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Price row */}
            <tr>
              <th scope="row" className="border border-ink-200 bg-paper-soft p-3 text-left font-bold text-ink-800">
                料金
              </th>
              {ROWS.map((row) => (
                <td
                  key={row.variant}
                  className="border border-ink-200 p-4 text-center"
                >
                  {row.priceDisplay.prefix && (
                    <span className={cn("text-base font-bold", PRICE_COLOR[row.variant])}>
                      {row.priceDisplay.prefix}
                    </span>
                  )}
                  <span className={cn("font-bold", PRICE_COLOR[row.variant], row.priceDisplay.mainClass ?? "text-3xl")}>
                    {row.priceDisplay.main}
                  </span>
                  {row.priceDisplay.suffix && (
                    <span className={cn("text-base font-bold", PRICE_COLOR[row.variant])}>
                      {row.priceDisplay.suffix}
                    </span>
                  )}
                  {row.priceNote && (
                    <span className="mt-0.5 block text-xs text-ink-600">
                      {row.priceNote}
                    </span>
                  )}
                </td>
              ))}
            </tr>

            {/* Regular rows */}
            {ROW_LABELS.map((label) => (
              <tr key={label}>
                <th scope="row" className="border border-ink-200 bg-paper-soft p-3 text-left font-bold text-ink-800">
                  {label}
                </th>
                {ROWS.map((row) => (
                  <td
                    key={row.variant}
                    className="border border-ink-200 p-3 text-center text-ink-900"
                  >
                    {row.cells[label]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="space-y-6 md:hidden">
        {ROWS.map((row) => (
          <div
            key={row.variant}
            className="overflow-hidden rounded-lg border border-ink-200 bg-paper-pure"
          >
            <div
              className={cn(
                "p-3 text-center font-bold",
                HEADER_COLOR[row.variant],
              )}
            >
              {row.shortName}
            </div>
            <dl className="divide-y divide-ink-100 px-4">
              <div className="flex items-baseline justify-between gap-2 py-3">
                <dt className="text-sm font-bold text-ink-800">料金</dt>
                <dd className="text-right">
                  <span className={cn("text-lg font-bold", PRICE_COLOR[row.variant])}>
                    {row.priceLabel}
                  </span>
                  {row.priceNote && (
                    <span className="ml-1 text-xs text-ink-600">
                      {row.priceNote}
                    </span>
                  )}
                </dd>
              </div>
              {ROW_LABELS.map((label) => (
                <div
                  key={label}
                  className="flex justify-between gap-2 py-3 text-sm"
                >
                  <dt className="font-bold text-ink-800">{label}</dt>
                  <dd className="text-right text-ink-900">
                    {row.cells[label]}
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
