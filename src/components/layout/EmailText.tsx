"use client";

import { useEffect, useState } from "react";

export function EmailText() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    setEmail(`${"info"}@${"ai-landbase.jp"}`);
  }, []);

  if (!email) return null;

  return <p className="mt-2 text-sm text-ink-200">{email}</p>;
}
