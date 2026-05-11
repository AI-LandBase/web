"use client";

import { useEffect, useState } from "react";
import { Mail } from "lucide-react";
import { cn } from "@/lib/cn";

type MailtoButtonProps = {
  subject?: string;
  body?: string;
  variant?: "primary" | "ghost" | "onDark";
  size?: "md" | "lg";
  fullWidth?: boolean;
  icon?: boolean;
  children: React.ReactNode;
};

const USER = "info";
const DOMAIN = "ai-landbase.jp";

export function MailtoButton({
  subject = "[AI.LandBase] お問い合わせ",
  body,
  variant = "primary",
  size = "md",
  fullWidth = false,
  icon = true,
  children,
}: MailtoButtonProps) {
  const [href, setHref] = useState<string | undefined>(undefined);

  useEffect(() => {
    const params = new URLSearchParams();
    if (subject) params.set("subject", subject);
    if (body) params.set("body", body);
    const qs = params.toString();
    setHref(`mailto:${USER}@${DOMAIN}${qs ? `?${qs}` : ""}`);
  }, [subject, body]);

  const sizeClass =
    size === "lg" ? "h-13 px-7 text-base" : "h-11 px-5 text-base";

  const variantClass = {
    primary:
      "bg-ink-900 text-paper-pure hover:bg-ink-800 focus-visible:ring-ink-700",
    ghost:
      "bg-transparent text-ink-900 border border-ink-200 hover:bg-ink-100 focus-visible:ring-ink-700",
    onDark:
      "bg-paper-pure text-ink-900 hover:bg-ink-100 focus-visible:ring-paper-pure",
  }[variant];

  const Element = href ? "a" : "button";

  return (
    <Element
      {...(href ? { href } : { type: "button" as const })}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md font-medium",
        "transition-colors duration-150",
        "focus:outline-none focus-visible:ring focus-visible:ring-offset-2",
        sizeClass,
        variantClass,
        fullWidth && "w-full",
      )}
    >
      {icon && <Mail aria-hidden="true" size={20} strokeWidth={1.5} />}
      <span>{children}</span>
    </Element>
  );
}
