import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  variant?: "default" | "inverted";
  size?: "sm" | "md" | "lg";
  href?: string;
  ariaLabel?: string;
};

const HEIGHT = { sm: 32, md: 44, lg: 52 };
const TEXT_SIZE = { sm: "text-base", md: "text-lg", lg: "text-xl" };

const SRC = "/logo/logo.png";

export function Logo({
  variant = "default",
  size = "md",
  href,
  ariaLabel = "AI.LandBase",
}: LogoProps) {
  const h = HEIGHT[size];

  const content = (
    <span className="inline-flex items-center gap-2">
      <Image
        src={SRC}
        alt=""
        height={h}
        width={h}
        priority
        style={{ height: `${h}px`, width: `${h}px` }}
        data-variant={variant}
      />
      <span
        className={`${TEXT_SIZE[size]} font-bold ${variant === "inverted" ? "text-paper-pure" : "text-ink-900"}`}
      >
        AI.LandBase
      </span>
    </span>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex items-center" aria-label={ariaLabel}>
        {content}
      </Link>
    );
  }

  return content;
}
