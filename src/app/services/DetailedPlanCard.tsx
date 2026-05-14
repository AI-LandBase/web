import { Check } from "lucide-react";
import { cn } from "@/lib/cn";
import type { PlanData } from "./_data";

type DetailedPlanCardProps = Omit<PlanData, "shortName" | "comparison">;

const ACCENT_TEXT = {
  standard: "text-plan-standard",
  professional: "text-plan-professional",
  server: "text-plan-server",
} as const;

const ACCENT_BORDER = {
  standard: "border-l-plan-standard",
  professional: "border-l-plan-professional",
  server: "border-l-plan-server",
} as const;

export function DetailedPlanCard({
  id,
  variant,
  name,
  priceLabel,
  priceNote,
  description,
  features,
  targetIndustry,
  subject,
  useCases,
  note,
  externalLink,
}: DetailedPlanCardProps) {
  return (
    <div
      id={id}
      className={cn(
        "flex flex-col scroll-mt-20 rounded-xl border border-ink-200 bg-paper-pure p-6",
        "border-l-4",
        ACCENT_BORDER[variant],
      )}
    >
      <h3 className={cn("text-base font-bold", ACCENT_TEXT[variant])}>{name}</h3>
      <p className="mt-1 text-2xl font-bold text-ink-900">
        {priceLabel}
        {priceNote && (
          <span className="ml-1 text-sm font-normal text-ink-600">
            {priceNote}
          </span>
        )}
      </p>

      <p className="mt-2 text-sm leading-relaxed text-ink-600">{description}</p>

      <h4 className="mt-5 text-sm font-bold text-ink-800">サービス内容</h4>
      <ul className="mt-2 space-y-1.5">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm text-ink-700">
            <Check
              size={14}
              strokeWidth={2}
              className={cn("mt-0.5 shrink-0", ACCENT_TEXT[variant])}
              aria-hidden="true"
            />
            {f}
          </li>
        ))}
      </ul>

      {useCases && useCases.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-bold text-ink-800">活用シーン</h4>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {useCases.map((uc) => (
              <span
                key={uc}
                className="rounded-full bg-ink-100 px-2.5 py-0.5 text-xs font-medium text-ink-700"
              >
                {uc}
              </span>
            ))}
          </div>
        </div>
      )}

      {note && (
        <p className="mt-3 text-xs leading-relaxed text-ink-600">{note}</p>
      )}

      {externalLink && (
        <a
          href={externalLink.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block text-sm font-medium text-ink-800 hover:text-ink-900 hover:underline"
        >
          {externalLink.label}
        </a>
      )}

      <div className="mt-auto pt-5">
        <p className="text-xs text-ink-600">
          対象業種: {targetIndustry}
        </p>
      </div>
    </div>
  );
}
