# 60. Implementation Notes — Next.js 15 + Tailwind CSS v4

> The "how" for engineers. Pairs with the design system in files 10–50. Assumes Next.js 15 App Router, TypeScript, and Tailwind CSS v4 (which is CSS-first and lives in `globals.css`, not in `tailwind.config.js`).

---

## 1. Project layout

Per BRIEF.md §6: implementation code lives directly under `src/`, **not** inside `projects/{name}/`.

```
src/
  app/
    layout.tsx                  ← root layout with <html lang="ja">, <Header/>, <Footer/>
    page.tsx                    ← top page (/)
    services/
      page.tsx                  ← services page (/services)
    about/
      page.tsx                  ← /about
    contact/
      page.tsx                  ← /contact (mailto aggregation page)
    privacy/
      page.tsx                  ← /privacy
    sitemap.ts
    robots.ts
    globals.css                 ← Tailwind v4 @theme + base styles
  components/
    layout/
      Header.tsx
      Footer.tsx
      MobileNavSheet.tsx
    primitives/
      Container.tsx             ← wraps content in max-width container
      Section.tsx               ← wraps a section with padding-y and bg variants
      SectionHeading.tsx
    cta/
      MailtoButton.tsx          ← client component (uses useEffect)
      CTASection.tsx
    hero/
      HeroMedia.tsx
      HeroSoft.tsx
    plan/
      PlanCard.tsx
      ComparisonTable.tsx
    cards/
      ProblemCard.tsx
      ReasonCard.tsx
      AISuiteToolTile.tsx
    sections/
      ProblemsSection.tsx       ← composes the top-page "課題" block
      PlansSection.tsx
      ReasonsSection.tsx
      ProofSection.tsx          ← Ikigai Stay asymmetric block
      AISuiteGrid.tsx
      SpotServiceTable.tsx
  lib/
    mailto.ts                   ← composeMailto() helper (used by MailtoButton)
    plans.ts                    ← plan data + accent config (single source of truth)
    aiSuite.ts                  ← 10-tool catalog data
  content/                      ← copy as data (easier to maintain than JSX strings)
    top.ts
    services.ts
    about.ts
public/
  logo/
    logo.png                    ← per BRIEF
    logo.svg                    ← Phase 5 will produce
    logo-inverted.svg           ← for dark backgrounds
  hero/
    okinawa-coast-2400.avif
    okinawa-coast-1600.avif
    okinawa-coast-mobile.avif
  ikigai-stay/
    facade-1600.avif
```

**Do not** add Prisma, NextAuth, or any DB code paths to these files. The repo as a whole has those, but this site does not use them.

---

## 2. Tailwind CSS v4 — `globals.css`

Tailwind v4 is CSS-first. The entire theme lives in `globals.css`:

```css
/* src/app/globals.css */
@import "tailwindcss";

@theme {
  /* ---------- Colors (semantic) ---------- */
  --color-ink-950:        #0E1B2C;
  --color-ink-900:        #142840;
  --color-ink-800:        #1E3A5F;
  --color-ink-700:        #2C4F7C;
  --color-ink-600:        #3D6594;
  --color-ink-500:        #5F7FA3;
  --color-ink-400:        #8FA3BD;
  --color-ink-300:        #B8C5D6;
  --color-ink-200:        #D8E0EB;
  --color-ink-100:        #EEF2F7;
  --color-ink-50:         #F7F9FC;

  --color-paper-pure:     #FFFFFF;
  --color-paper-soft:     #FAFBFC;
  --color-paper-mist:     #F0F5FA;
  --color-paper-sky:      #E3EEF7;

  --color-plan-standard:        #267A62;  /* AA 5.19:1 on white */
  --color-plan-standard-soft:   #E6F2EE;
  --color-plan-professional:    #2E5C9E;  /* AA 6.69:1 on white */
  --color-plan-professional-soft: #E4ECF7;
  --color-plan-server:          #A96522;  /* AA 4.59:1 on white */
  --color-plan-server-soft:     #FAEFE0;

  --color-accent:        #1F7A8C;
  --color-accent-hover:  #155F70;

  /* ---------- Typography ---------- */
  --font-sans: "Noto Sans JP", "Hiragino Sans", "Hiragino Kaku Gothic ProN",
               "Yu Gothic Medium", "Meiryo", system-ui, sans-serif;
  --font-display: "Inter", "Noto Sans JP", system-ui, sans-serif;

  /* ---------- Radii ---------- */
  --radius-xs:  0.125rem;
  --radius-sm:  0.25rem;
  --radius-md:  0.5rem;
  --radius-lg:  0.75rem;
  --radius-xl:  1rem;

  /* ---------- Shadows ---------- */
  --shadow-xs:   0 1px 2px 0 rgba(14, 27, 44, 0.04);
  --shadow-sm:   0 1px 3px 0 rgba(14, 27, 44, 0.06), 0 1px 2px -1px rgba(14, 27, 44, 0.04);
  --shadow-md:   0 4px 12px -2px rgba(14, 27, 44, 0.08), 0 2px 4px -2px rgba(14, 27, 44, 0.04);
  --shadow-lg:   0 12px 24px -8px rgba(14, 27, 44, 0.12), 0 4px 8px -4px rgba(14, 27, 44, 0.06);

  /* ---------- Breakpoints (already covered by Tailwind defaults; declared for reference) ---------- */
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;

  /* ---------- Container max-widths ---------- */
  --container-default: 1200px;
  --container-narrow:  720px;
}

/* Base typography — Japanese tuning */
@layer base {
  html {
    font-family: var(--font-sans);
    font-feature-settings: "palt" 1;
    letter-spacing: 0.02em;
    line-break: strict;
    word-break: keep-all;
    overflow-wrap: anywhere;
    color: var(--color-ink-900);
    background-color: var(--color-paper-soft);
  }

  /* Tabular numerals for prices */
  .num {
    font-variant-numeric: tabular-nums;
    font-feature-settings: "tnum" 1;
  }

  /* Skip link — A.3 */
  .skip-link {
    position: absolute;
    left: -9999px;
    top: 0;
    background: var(--color-ink-900);
    color: var(--color-paper-pure);
    padding: 0.75rem 1rem;
    z-index: 100;
  }
  .skip-link:focus {
    left: 0;
  }
}

/* Horizontal scroll safety net (P7 / layout-contract A.1) */
html, body {
  overflow-x: hidden;
  max-width: 100vw;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 1ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 1ms !important;
  }
}
```

**Usage in components**: Tailwind classes map directly to these variables. Examples:
- `bg-paper-pure`, `bg-ink-900`, `text-ink-900`, `text-paper-pure`
- `text-plan-standard`, `border-plan-server`, `bg-plan-professional-soft`
- `rounded-lg`, `shadow-md`, `font-sans`

---

## 3. Fonts (Next.js `next/font`)

```ts
// src/app/layout.tsx
import { Noto_Sans_JP, Inter } from "next/font/google";

const notoSansJp = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-noto-sans-jp",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-inter",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${notoSansJp.variable} ${inter.variable}`}>
      <body>
        <a href="#main" className="skip-link">本文へ移動</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

`display: "swap"` matters for A.1 (no layout shift after fonts load). Verify CLS in Lighthouse.

---

## 4. `<Container>` primitive

```tsx
// src/components/primitives/Container.tsx
import { cn } from "@/lib/cn";

type Props = {
  variant?: "default" | "narrow";
  className?: string;
  children: React.ReactNode;
};

export function Container({ variant = "default", className, children }: Props) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        variant === "default" && "max-w-[1200px]",
        variant === "narrow" && "max-w-[720px]",
        className
      )}
    >
      {children}
    </div>
  );
}
```

Every constrained section uses `<Container>`. Full-bleed sections nest a `<Container>` inside their colored background div.

---

## 5. `<Section>` primitive

```tsx
// src/components/primitives/Section.tsx
import { cn } from "@/lib/cn";
import { Container } from "./Container";

type Props = {
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
}: Props) {
  const inner = (
    <Container variant={containerVariant}>{children}</Container>
  );
  return (
    <Tag
      id={id}
      className={cn(
        "py-12 md:py-16 lg:py-20",
        variant === "default" && "bg-paper-soft text-ink-900",
        variant === "alt" && "bg-ink-100 text-ink-900",
        variant === "dark" && "bg-ink-900 text-paper-pure",
        className
      )}
    >
      {fullBleed ? children : inner}
    </Tag>
  );
}
```

---

## 6. `<MailtoButton>` — anti-scraper composition

```tsx
// src/components/cta/MailtoButton.tsx
"use client";

import { useEffect, useState } from "react";
import { Mail } from "lucide-react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost" | "onDark";
type Size = "md" | "lg";

type Props = {
  subject?: string;
  body?: string;
  variant?: Variant;
  size?: Size;
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
}: Props) {
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
      // @ts-expect-error — duck-typed element switching
      href={href}
      type={href ? undefined : "button"}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md font-medium",
        "transition-colors duration-150",
        "focus:outline-none focus-visible:ring focus-visible:ring-offset-2",
        sizeClass,
        variantClass,
        fullWidth && "w-full"
      )}
      aria-label={typeof children === "string" ? children : undefined}
    >
      {icon && <Mail aria-hidden="true" size={20} strokeWidth={1.5} />}
      <span>{children}</span>
    </Element>
  );
}
```

Why this satisfies A.2:
- On the **server-rendered HTML**, the `href` is `undefined` and the element renders as a `<button>` (no `mailto:` string in source).
- On client mount, the `href` is composed and the element becomes an `<a>` with the proper `mailto:`.
- The button label "メールで相談する" is always present; on JS-failure the user still sees it (though the click won't fire — they fall back to copying the address from the footer's JS-rendered text node, which uses the same technique).

---

## 7. Image strategy

```tsx
import Image from "next/image";

// Hero — top page
<div className="relative h-[540px] md:h-[640px]">
  <Image
    src="/hero/okinawa-coast-1600.avif"
    alt=""
    fill
    priority
    sizes="100vw"
    style={{ objectFit: "cover", objectPosition: "center 60%" }}
  />
  <div className="absolute inset-0 bg-ink-950/45" aria-hidden="true" />
  <Container className="relative h-full flex items-center">
    {/* headline content */}
  </Container>
</div>
```

**LCP optimization**: Hero image is `priority`. Provide AVIF with WebP fallback. Generate three crops (mobile/tablet/desktop) and pick via the `sizes` attribute or art direction.

---

## 8. Sticky header z-index discipline

```tsx
// src/components/layout/Header.tsx
<header className="sticky top-0 z-20 bg-paper-pure border-b border-ink-200">
  {/* ... */}
</header>
```

The hero photo `<div>` inside the page body has no z-index, so the header naturally floats above. Don't add `z-10` to the hero just because.

---

## 9. Plan accent — single source of truth

```ts
// src/lib/plans.ts
export type PlanId = "standard" | "professional" | "server";

export const PLAN_CONFIG: Record<PlanId, {
  name: string;
  accentColorClass: string;     // text- color for price
  accentBorderClass: string;    // border- color for top stripe
  accentBgSoftClass: string;    // bg- color for soft tint
}> = {
  standard: {
    name: "スタンダードプラン",
    accentColorClass: "text-plan-standard",
    accentBorderClass: "border-plan-standard",
    accentBgSoftClass: "bg-plan-standard-soft",
  },
  professional: {
    name: "プロフェッショナルプラン",
    accentColorClass: "text-plan-professional",
    accentBorderClass: "border-plan-professional",
    accentBgSoftClass: "bg-plan-professional-soft",
  },
  server: {
    name: "AI Suite Server プラン",
    accentColorClass: "text-plan-server",
    accentBorderClass: "border-plan-server",
    accentBgSoftClass: "bg-plan-server-soft",
  },
};
```

PlanCard, ComparisonTable, and any future plan-related component reads from here. Never hardcode the colors in markup.

---

## 10. Metadata & SEO

```ts
// src/app/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "株式会社 AI.LandBase | 沖縄の観光業に、AI という伴走者を",
  description:
    "沖縄県北部の観光業事業者向けに AI ツールと経営支援を提供しています。" +
    "宿泊・飲食・ツアー事業者の皆さまに、データドリブンな経営への転換をお手伝いします。",
  openGraph: {
    title: "株式会社 AI.LandBase",
    description: "沖縄の観光業に、AI という伴走者を。",
    url: "https://ai-landbase.jp/",
    siteName: "株式会社 AI.LandBase",
    images: [{ url: "/og/top.png", width: 1200, height: 630 }],
    locale: "ja_JP",
    type: "website",
  },
  alternates: { canonical: "https://ai-landbase.jp/" },
};
```

Top-level `app/layout.tsx` can supply defaults that page-level metadata overrides.

JSON-LD on `/about`:
```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "株式会社 AI.LandBase",
    url: "https://ai-landbase.jp/",
    email: "info@ai-landbase.jp",  // OK here — bot deterrence on CTAs is the goal, not pure obscurity
    foundingDate: "2025-06-26",
    address: {
      "@type": "PostalAddress",
      streetAddress: "湧川 852-2",
      addressLocality: "今帰仁村",
      addressRegion: "国頭郡",
      postalCode: "905-0412",
      addressCountry: "JP",
    },
  })}}
/>
```

---

## 11. Analytics

GA4 integration is implemented in `src/components/analytics/GoogleAnalytics.tsx` as a self-contained Client Component. We do not depend on `@next/third-parties/google` — verified empirically that its `<GoogleAnalytics>` does **not** fire `page_view` on App Router SPA navigation (only injects `gtag.js`), so SPA tracking has to be hand-rolled either way. Keeping it in one file avoids the extra dependency.

The component loads `gtag.js` with `next/script` (`strategy="afterInteractive"`, do not inject before page becomes interactive — LCP risk) and inlines the standard init snippet (`window.dataLayer`, `gtag('js', new Date())`, `gtag('config', gaId)`). A nested `PageViewTracker` watches `usePathname()` + `useSearchParams()` and fires `gtag('event', 'page_view', { page_path, page_location, page_title })` on every client-side route change. The first mount is skipped via a `useRef` sentinel because `gtag('config', ...)` already sends the initial `page_view`. `useSearchParams` requires a `<Suspense>` boundary, so the tracker is wrapped.

```tsx
// src/app/layout.tsx
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";

const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
// ...
{gaMeasurementId && <GoogleAnalytics gaId={gaMeasurementId} />}
```

Guard with `process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID` so the tag is omitted when the variable is unset (dev/preview environments).

CTA-click tracking lives in the `MailtoButton` component — `onClick` calls `window.gtag?.('event', 'cta_click', { cta_id })`. Each call site passes a `ctaId` identifying the location (`header`, `footer`, `hero`, `mobile-nav`, `cta-section-{index}`, `contact-intent-{index}`). The `window.gtag` and `window.dataLayer` types are declared globally in `src/types/gtag.d.ts`.

---

## 12. Testing & lint

```json
// package.json scripts
{
  "lint": "next lint && tsc --noEmit",
  "a11y": "playwright test tests/a11y",
  "lighthouse": "lhci autorun",
  "build": "next build"
}
```

- `@axe-core/playwright` for automated a11y tests against `/`, `/services`, `/about`.
- `lhci` CI for Lighthouse budgets (Performance ≥ 90, Accessibility ≥ 90).
- Visual regression: optional (Phase 7) — Percy or Playwright snapshots.

---

## 13. Deployment

Per BRIEF §6:
- Same Caddy reverse proxy as `lodging-tax.ai-landbase.jp`.
- Apex `ai-landbase.jp` — confirm DNS A record and Caddy site block before launch (separate issue).
- HTTPS via Let's Encrypt automation already in place.
- Build target: Node.js Next.js standalone output (`output: "standalone"` in `next.config.ts`) for slimmer container.

---

## 14. What NOT to install

To keep bundle size at A.5 target:

- ❌ A UI kit (Material UI, Chakra, etc.). Tailwind primitives only.
- ❌ A form library (react-hook-form, formik). No forms in v1.
- ❌ A state library (Redux, Zustand). Page state is local.
- ❌ Framer Motion *unless* a specific animation requires it. P2 (quiet) implies minimal motion; CSS transitions cover most cases.
- ❌ A date library. No date-heavy UI.

Allowed dependencies, beyond Next/React/Tailwind:
- `lucide-react` — icons.
- `clsx` or `tailwind-merge` — className composition (via `lib/cn.ts`).
- `@axe-core/playwright`, `@lhci/cli` — testing only.

---

## 15. Phase mapping

Per BRIEF §7, the items in this file map to:

| Brief phase | Files most relevant |
|---|---|
| Phase 1 (competitive / persona) | 10-design-principles.md |
| Phase 2 (IA) | 40-page-structure.md |
| Phase 3 (copy) | 40-page-structure.md (copy outlines) |
| Phase 4 (mockup) | 30-component-spec.md + reference images |
| Phase 5 (design system finalization) | 20-design-tokens.yaml (will be tightened here) |
| Phase 6 (implementation) | This file + 30-component-spec.md |
| Phase 6-5 (mailto + spam) | This file §6 |
| Phase 7 (SEO + analytics + launch) | 50-acceptance-criteria.md + this file §10–11 |
