"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

type EmailTextProps = {
  className?: string;
  as?: "p" | "span";
};

export function EmailText({ className, as: Tag = "p" }: EmailTextProps) {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    setEmail(`${"info"}@${"ai-landbase.jp"}`);
  }, []);

  if (!email) return <Tag className={cn("mt-2 text-sm text-ink-200", className)}>&nbsp;</Tag>;

  return <Tag className={cn("mt-2 text-sm text-ink-200", className)}>{email}</Tag>;
}
