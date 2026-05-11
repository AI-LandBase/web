import { cn } from "@/lib/cn";
import { Container } from "./Container";

type SectionProps = {
  variant?: "default" | "alt" | "dark";
  fullBleed?: boolean;
  containerVariant?: "default" | "narrow";
  className?: string;
  id?: string;
  children: React.ReactNode;
  as?: "section" | "div";
};

export function Section({
  variant = "default",
  fullBleed = false,
  containerVariant = "default",
  className,
  id,
  children,
  as: Tag = "section",
}: SectionProps) {
  return (
    <Tag
      id={id}
      className={cn(
        "py-12 md:py-16 lg:py-20",
        variant === "default" && "bg-paper-soft text-ink-900",
        variant === "alt" && "bg-ink-100 text-ink-900",
        variant === "dark" && "bg-ink-900 text-paper-pure",
        className,
      )}
    >
      {fullBleed ? children : (
        <Container variant={containerVariant}>{children}</Container>
      )}
    </Tag>
  );
}
