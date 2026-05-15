"use client";

import { useCallback, useEffect, useRef } from "react";
import { X } from "lucide-react";
import Link from "next/link";
import { MailtoButton } from "@/components/cta/MailtoButton";
import { NAV_ITEMS } from "@/lib/navigation";

type MobileNavSheetProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileNavSheet({ open, onClose }: MobileNavSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const trapFocus = useCallback((e: KeyboardEvent) => {
    if (e.key !== "Tab") return;
    const sheet = sheetRef.current;
    if (!sheet) return;

    const focusable = sheet.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }, []);

  useEffect(() => {
    if (!open) return;

    closeRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      trapFocus(e);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose, trapFocus]);

  if (!open) return null;

  return (
    <div
      ref={sheetRef}
      id="mobile-nav"
      className="fixed inset-0 z-50 bg-paper-pure"
      role="dialog"
      aria-modal="true"
      aria-label="メニュー"
    >
      <div className="flex h-14 items-center justify-end px-4">
        <button
          ref={closeRef}
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-md hover:bg-ink-100"
          aria-label="メニューを閉じる"
        >
          <X size={24} strokeWidth={1.5} />
        </button>
      </div>
      <nav className="flex flex-col gap-2 px-6 pt-4">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className="rounded-md px-4 py-3 text-lg font-medium text-ink-900 hover:bg-ink-100"
          >
            {item.label}
          </Link>
        ))}
        <div className="mt-4">
          <MailtoButton
            variant="primary"
            size="lg"
            fullWidth
            subject="[AI.LandBase] サービスに関するお問い合わせ"
            ctaId="mobile-nav"
          >
            お問い合わせ
          </MailtoButton>
        </div>
      </nav>
    </div>
  );
}
