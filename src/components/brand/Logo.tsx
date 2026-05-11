import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  variant?: "default" | "inverted";
  size?: "sm" | "md" | "lg";
  href?: string;
  ariaLabel?: string;
};

const HEIGHT = { sm: 24, md: 32, lg: 40 };

export function Logo({
  variant = "default",
  size = "md",
  href,
  ariaLabel = "AI.LandBase",
}: LogoProps) {
  const h = HEIGHT[size];
  const src =
    variant === "inverted" ? "/logo/logo.png" : "/logo/logo.png";

  const img = (
    <Image
      src={src}
      alt={ariaLabel}
      height={h}
      width={Math.round(h * 4.4)}
      priority
      className={variant === "inverted" ? "brightness-0 invert" : ""}
      style={{ height: `${h}px`, width: "auto" }}
    />
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex items-center">
        {img}
      </Link>
    );
  }

  return img;
}
