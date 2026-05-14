import Link from "next/link";
import { cn } from "@/lib/cn";

type PriceDisplay = {
  prefix?: string;
  main: string;
  suffix?: string;
  mainClass?: string;
};

type PlanCardProps = {
  variant: "standard" | "professional" | "server";
  name: string;
  priceLabel: string;
  priceNote?: string;
  priceDisplay?: PriceDisplay;
  description: string;
  href: string;
};

const ACCENT_BORDER = {
  standard: "border-l-plan-standard",
  professional: "border-l-plan-professional",
  server: "border-l-plan-server",
} as const;

const ACCENT_TEXT = {
  standard: "text-plan-standard",
  professional: "text-plan-professional",
  server: "text-plan-server",
} as const;

export function PlanCard({
  variant,
  name,
  priceLabel,
  priceNote,
  priceDisplay,
  description,
  href,
}: PlanCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-xl border border-ink-200 bg-paper-pure p-6",
        "border-l-4 shadow-sm transition-shadow hover:shadow-md",
        ACCENT_BORDER[variant],
      )}
    >
      <p className={cn("text-center text-base font-bold", ACCENT_TEXT[variant])}>
        {name}
      </p>
      <div className="mt-2 flex min-h-[5rem] flex-col items-center justify-center">
        <p className={cn("flex items-baseline justify-center font-bold", ACCENT_TEXT[variant])}>
          {priceDisplay ? (
            <>
              {priceDisplay.prefix && (
                <span className="text-base">{priceDisplay.prefix}</span>
              )}
              <span className={priceDisplay.mainClass ?? "text-2xl"}>
                {priceDisplay.main}
              </span>
              {priceDisplay.suffix && (
                <span className="text-base">{priceDisplay.suffix}</span>
              )}
            </>
          ) : (
            <span className="text-2xl">{priceLabel}</span>
          )}
        </p>
        {priceNote && (
          <p className="text-center text-sm text-ink-600">{priceNote}</p>
        )}
      </div>
      <p className="mt-3 flex-1 text-center text-sm leading-relaxed text-ink-600">
        {description}
      </p>
      <Link
        href={href}
        className="mt-4 text-center text-sm font-medium text-ink-800 hover:text-ink-900 hover:underline"
      >
        サービスの詳細を見る →
      </Link>
    </div>
  );
}
