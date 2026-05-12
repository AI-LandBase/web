import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: "center" | "left";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-10 md:mb-14",
        align === "center" && "text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.08em] text-ink-600">
          {eyebrow}
        </p>
      )}
      <h2 className="text-[1.875rem] font-bold leading-[1.3] md:text-[2.25rem]">
        {title}
      </h2>
      <div
        className={cn(
          "mx-auto mt-2 h-0.5 w-8 bg-ink-300",
          align === "left" && "mx-0",
        )}
        aria-hidden="true"
      />
      {lead && (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed text-ink-700 md:text-lg",
            align === "center" && "mx-auto max-w-[36rem]",
          )}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
