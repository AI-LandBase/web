import Link from "next/link";
import { cn } from "@/lib/cn";

type PlanCardProps = {
  variant: "standard" | "professional" | "server";
  name: string;
  priceLabel: string;
  priceNote?: string;
  description: string;
  href: string;
};

const ACCENT_BORDER = {
  standard: "border-t-plan-standard",
  professional: "border-t-plan-professional",
  server: "border-t-plan-server",
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
  description,
  href,
}: PlanCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col rounded-lg border border-ink-200 bg-paper-pure p-6",
        "border-t-4 shadow-sm transition-shadow hover:shadow-md",
        ACCENT_BORDER[variant],
      )}
    >
      <p className={cn("text-sm font-bold", ACCENT_TEXT[variant])}>
        {name}
      </p>
      <p className="mt-2 text-2xl font-bold text-ink-900">
        {priceLabel}
        {priceNote && (
          <span className="ml-1 text-sm font-normal text-ink-500">
            {priceNote}
          </span>
        )}
      </p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-600">
        {description}
      </p>
      <Link
        href={href}
        className="mt-4 text-sm font-medium text-ink-800 hover:text-ink-900 hover:underline"
      >
        サービスの詳細を見る →
      </Link>
    </div>
  );
}
