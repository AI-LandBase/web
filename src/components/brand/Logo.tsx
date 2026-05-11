import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  variant?: "default" | "inverted";
  size?: "sm" | "md" | "lg";
  href?: string;
  ariaLabel?: string;
};

const HEIGHT = { sm: 24, md: 32, lg: 40 };

// v1: inverted SVG 未作成のため全 variant で logo.png を使用。
// logo-inverted.svg が用意されたら SRC_MAP に追加し CSS filter を使わずアセットで切り替える。
const SRC = "/logo/logo.png";

export function Logo({
  variant = "default",
  size = "md",
  href,
  ariaLabel = "AI.LandBase",
}: LogoProps) {
  const h = HEIGHT[size];

  const img = (
    <Image
      src={SRC}
      alt={ariaLabel}
      height={h}
      width={Math.round(h * 4.4)}
      priority
      style={{ height: `${h}px`, width: "auto" }}
      data-variant={variant}
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
