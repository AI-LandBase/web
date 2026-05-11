"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { MailtoButton } from "@/components/cta/MailtoButton";
import { MobileNavSheet } from "./MobileNavSheet";
import { NAV_ITEMS } from "@/lib/navigation";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      role="banner"
      className="sticky top-0 z-20 border-b border-ink-200 bg-paper-pure"
    >
      <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between px-4 sm:px-6 md:h-[72px] lg:px-8">
        <Logo href="/" size="md" />

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink-800 transition-colors hover:text-ink-900"
            >
              {item.label}
            </Link>
          ))}
          <MailtoButton
            variant="primary"
            size="md"
            subject="[AI.LandBase] サービスに関するお問い合わせ"
          >
            お問い合わせ
          </MailtoButton>
        </nav>

        <button
          onClick={() => setMenuOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-md hover:bg-ink-100 md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          aria-label="メニューを開く"
        >
          <Menu size={24} strokeWidth={1.5} />
        </button>
      </div>

      <MobileNavSheet open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
