# 30. Component Spec — AI.LandBase Corporate Site

> Every component below ships as a reusable React component. State, props, and accessibility requirements are explicit. Visual values reference tokens — never hard-code colors or spacing.

---

## C0. `<Logo />`

**Purpose** — The brand mark. Foundational; consumed by `<Header />` and `<Footer />` and reusable in any future surface (OGP image, favicon, error pages, print headers).

**Source assets** (per BRIEF §4 + `public/logo/README.md`)
- Primary: `public/logo/logo.png` — 1024×1024 RGBA. Used as-is for v1.
- Phase 5 will produce: `logo.svg` (vector), `logo-inverted.svg` (white wordmark for dark surfaces), `logo-mark.svg` (icon-only).
- Favicon: rendered from the icon-only variant at 32×32, 16×16, and an SVG favicon.

**Props**
```ts
type LogoProps = {
  variant?: "default" | "inverted" | "mark";   // default = on light, inverted = on dark, mark = icon only
  size?: "sm" | "md" | "lg";                    // see size table below
  href?: string;                                // wraps in <Link>; omit if used as non-link
  ariaLabel?: string;                           // default: "AI.LandBase"
};
```

### Display sizes (header / footer / general)

| Size | Pixel height | Use |
|---|---|---|
| `sm` | 24 px | Mobile footer credit row, inline references |
| `md` | 28 px (mobile) / 32 px (desktop) | **Header default** |
| `lg` | 40 px+ | Footer brand block, OGP image rendering |

Width is intrinsic (preserve aspect ratio). For the wordmark+icon combination at 32px height, expect ~140px width.

### Minimum size rules (hard floors)

> Below these sizes, the wordmark becomes illegible. Use the `mark` (icon-only) variant instead, or scale up.

| Variant | Minimum digital size | Minimum print size |
|---|---|---|
| `default` / `inverted` (icon + wordmark) | **24 px height** | 20 mm width |
| `mark` (icon only) | **16 px height** | 8 mm width |

Implementation guard: if a developer passes a size class that would render below the floor, default styles fall back to `size="sm"` rather than rendering tiny. (Not strictly enforced in v1 — guideline only — but worth flagging in a `console.warn` during dev builds.)

### Clear space (余白) — non-negotiable

> The clear-space rule prevents the logo from being crowded by adjacent UI or copy. Treat the clear-space rectangle as forbidden space for any non-logo element (text, buttons, icons, edges of dense imagery).

- Define **1 unit** = the height of the logomark icon (NOT the full logo with wordmark). At `size="md"` (32px combined height), the icon itself is ~28px tall → **1 unit ≈ 28px** at that size.
- **Clear space on all four sides** = 0.5 × 1 unit = **0.5 × icon height**.
- In practice, at the header's 32px logo height, that's a **~14px** invisible buffer around the logo on all sides. The header bar's vertical padding (using `--spacing-step-4` = 16px) satisfies this naturally; horizontal placement of adjacent nav links/CTA must leave at least 14px to the logo's right edge.

**Visual schematic**

```
  ┌──── clear-space rectangle ────┐
  │                                │
  │   ╭───╮                        │
  │   │ ◐ │  AI.LandBase           │
  │   ╰───╯                        │
  │                                │
  └────────────────────────────────┘
  ← 0.5u →                ← 0.5u →
   ↑ 0.5u                  ↓ 0.5u
```

### Color rules

| Surface | Variant | Reason |
|---|---|---|
| `bg.surface` (white) — Header | `default` | Standard. |
| `bg.footer` (ink.900) — Footer | `inverted` | Wordmark and icon must read on dark. |
| Photographic hero (with 24% overlay) | `inverted` | Inverted reads against the darkened photo. **Do not** place the default logo on raw photography without an overlay. |
| Plan-accent tinted surfaces | `default` | Soft tints are still light enough. |

**Forbidden treatments**
- Do NOT recolor the logo to a plan-accent (orange / green / blue) — accents are reserved for plan semantics (P5).
- Do NOT add drop shadows, glows, outlines, or strokes.
- Do NOT rotate, skew, or distort.
- Do NOT crop the icon from the wordmark in compositions where they appear together (use the `mark` variant explicitly instead).
- Do NOT place over busy photographs without a darkening overlay layer.
- Do NOT animate the logo on page load. (P2 quiet.)

### Implementation

```tsx
// src/components/brand/Logo.tsx
import Image from "next/image";
import Link from "next/link";

const SRC = {
  default:  "/logo/logo.png",          // v1 — replace with logo.svg in Phase 5
  inverted: "/logo/logo-inverted.svg", // Phase 5 asset; until then fall back to default + CSS filter is NOT acceptable
  mark:     "/logo/logo-mark.svg",     // Phase 5 asset
};

const HEIGHT = { sm: 24, md: 32, lg: 40 };
const HEIGHT_MOBILE = { sm: 24, md: 28, lg: 36 };

export function Logo({ variant = "default", size = "md", href, ariaLabel = "AI.LandBase" }: LogoProps) {
  const h = HEIGHT[size];
  const img = (
    <Image
      src={SRC[variant]}
      alt={ariaLabel}
      height={h}
      width={h * 4.4}        /* approximate aspect ratio for icon+wordmark */
      priority
      style={{ height: `${h}px`, width: "auto" }}
    />
  );
  return href ? <Link href={href} className="inline-flex items-center">{img}</Link> : img;
}
```

### Accessibility

- The logo's `alt` attribute is `"AI.LandBase"` — the company name as a screen-reader-friendly equivalent. (Not "AI.LandBase logo" — the word "logo" is redundant to AT users.)
- When the logo is wrapped in a link (e.g. in the header), the link itself doesn't need a separate aria-label; the alt text becomes the accessible name.
- Decorative-only uses (e.g. tiny mark in a footer credit row alongside the wordmark as text) can use `alt=""`.

### Phase 5 follow-ups

These items will be re-confirmed when Phase 5 (デザインシステム正規化) finalizes brand:

- [ ] Inverted variant produced and verified for white wordmark legibility on `bg.footer`.
- [ ] Vector logo (`.svg`) replaces the PNG for all sizes (eliminates raster artifacts at 2× and 3× displays).
- [ ] Print/PDF logo rules (CMYK, monochrome single-color variant).
- [ ] Animated brand reveal — explicitly out of scope until/unless Phase 5 approves.

---

## C1. `<Header />`

**Purpose** — Site-wide navigation. Sticky at top across all pages.

**Anatomy** (desktop)
```
┌────────────────────────────────────────────────────────────────────┐
│  [Logo + 社名]      [サービス]  [会社案内]      [お問い合わせ ▶]  │
└────────────────────────────────────────────────────────────────────┘
```

**Anatomy** (mobile)
```
┌────────────────────────────┐
│  [Logo + 社名]        [☰]  │
└────────────────────────────┘
```

**Behavior**
- `position: sticky; top: 0` on all viewports. No scroll-shrink, no transparent-on-hero state.
- Background is always solid `bg.surface` (white) with a 1px bottom border. P2 (quiet) — no backdrop blur, no shadow that grows on scroll.
- Mobile menu (hamburger) opens a full-screen overlay sheet (not a dropdown). Sheet contains the same items as desktop nav, plus the CTA. Close via `×` button top-right or Esc key.
- Logo links to `/`.

**Variants**
- `variant="default"` — white bg as above.
- `variant="onDark"` (reserved, not used in v1) — for future overlay-on-hero pages.

**Accessibility**
- `<header role="banner">` wraps the bar.
- Mobile sheet uses `<dialog>` or a focus-trapped overlay; `aria-modal="true"`, `aria-label="メニュー"`.
- The hamburger button has `aria-expanded` and `aria-controls`.
- Focus order: logo → nav links → CTA (desktop), logo → hamburger (mobile, then trapped in sheet when open).
- Logo image has `alt="AI.LandBase"` (the wordmark is also rendered as text next to the icon — icon's alt can be empty if wordmark text is present).

---

## C2. `<MailtoButton />`

**Purpose** — The one primary CTA on the site. Renders `info@ai-landbase.jp` as a `mailto:` link, generated client-side to deter trivial scrapers.

**Props**
```ts
type MailtoButtonProps = {
  subject?: string;          // optional Japanese subject prefix; default "[AI.LandBase] お問い合わせ"
  body?: string;             // optional body template
  variant?: "primary" | "ghost" | "onDark";
  size?: "md" | "lg";
  fullWidth?: boolean;       // true on mobile by default via parent layout
  children: React.ReactNode; // typically "メールで相談する"
  icon?: boolean;            // show envelope icon (default true)
};
```

**Visual states**
| Variant | Bg | Text | Hover bg | Border | Use |
|---|---|---|---|---|---|
| `primary` | `action.primary` (ink.900) | `paper.pure` | `action.primaryHover` (ink.800) | none | Header, hero, bottom CTA |
| `ghost` | transparent | `action.ghostText` (ink.900) | `action.ghostHover` (ink.100) | `border.subtle` | Tertiary placements |
| `onDark` | `paper.pure` | `ink.900` | `ink.100` | none | Inside dark CTA section / footer |

**Sizes**
- `md` — height 44px, padding 12px 20px, body font (16px). Default.
- `lg` — height 52px, padding 14px 28px, body-lg font. Hero/bottom-CTA contexts.

**Implementation rule (P8 progressive enhancement)**
- The component renders on first paint as a plain `<button>` (or non-functional anchor) that reads "メールで相談する".
- On client mount, `useEffect` composes the `mailto:` href from broken parts:
  ```ts
  const user = "info";
  const domain = "ai-landbase.jp";
  const href = `mailto:${user}@${domain}?subject=${encodeURIComponent(subject)}`;
  ```
- If JS fails entirely, the user still sees the button label, can read the address from the footer JS-fallback text, and is not blocked.

**Subject templates** (used across the site)
| Placement | Subject |
|---|---|
| Header CTA, hero | `[AI.LandBase] サービスに関するお問い合わせ` |
| Plan card details | `[AI.LandBase] {プラン名} に関するお問い合わせ` |
| Bottom CTA — "サービスについて相談したい" | `[AI.LandBase] サービスに関するお問い合わせ` |
| Bottom CTA — "宿泊税対応について聞きたい" | `[AI.LandBase] 宿泊税対応についてのお問い合わせ` |
| Bottom CTA — "その他のお問い合わせ" | `[AI.LandBase] その他のお問い合わせ` |

**Accessibility**
- Focus ring uses `shadows.focus`.
- Icon is decorative (`aria-hidden="true"`); button label carries meaning.
- Hover and focus styles are visually distinct (focus uses outline ring, hover uses bg shift).
- `min-height: 44px` ALWAYS (P8 tap target).

---

## C3. `<Hero />`

**Purpose** — First viewport. Establishes site tone in one screen.

**Variants**
- `variant="media"` (top page) — full-bleed photograph with overlay; text constrained inside container, vertically centered.
- `variant="soft"` (services page, future pages) — light blue gradient (`bg.hero`) with optional decorative leaf illustration on the right; no photograph.

**Anatomy (media)**
```
┌────────────────────────────────────────────────┐
│  [photo full-bleed]                            │
│                                                │
│  ╔═════════════════════════════╗              │
│  ║ Eyebrow (optional)           ║              │
│  ║ Headline (2 lines, hero)     ║              │
│  ║ Lead paragraph (3–4 lines)   ║              │
│  ║ [MailtoButton primary lg]    ║              │
│  ║ small caption under button   ║              │
│  ╚═════════════════════════════╝              │
└────────────────────────────────────────────────┘
```

**Behavior**
- `media` variant uses a 24% black overlay (`semantic.bg.overlay`) on top of the photo to guarantee 4.5:1 contrast on white text. On the reference top page, the photo is bright and the overlay is essential.
- Text container has `max-width: ~28rem` (mobile) → `~36rem` (desktop) so the headline doesn't stretch awkwardly on wide screens.
- Vertical centering: `min-height: 540px` (mobile) / `640px` (desktop). Below that, content is `padding-y: heroPaddingY` (see layout contract).
- The "soft" variant uses the leaf SVG decoration in the top-right, opacity 0.6, hidden below `md` breakpoint.

**Accessibility**
- The hero photo (`media` variant) is decorative when it doesn't carry informational meaning beyond "this is Okinawa": `alt=""` and `role="presentation"`. If the photo is later replaced with one that conveys specific content, update the alt.
- Headline uses `<h1>`.
- Sub-caption under the button ("どんなご相談でもお待ちしています") is `<p class="text-caption text-muted">`, not part of the button label.

---

## C4. `<PlanCard />`

**Purpose** — Plan summary. Used on top page (3-up) and services page (per-plan detail).

**Props**
```ts
type PlanCardProps = {
  variant: "standard" | "professional" | "server";   // drives accent color (P5)
  name: string;                                      // "スタンダードプラン"
  priceLabel: string;                                // "月額 5 万円" | "個別見積" | "¥1,965,000"
  priceNote?: string;                                // "(税別・一式)"
  description: string;                               // 2–3 sentences
  features?: string[];                               // checklist of bullets (services page only)
  href?: string;                                     // link to detail
  size: "compact" | "detailed";                      // top page = compact, services page = detailed
};
```

**Anatomy (compact)**
```
┌──────────────────────────┐
│ ━━━ accent bar (2px) ━━━ │
│                          │
│ [Plan name]              │
│                          │
│ [Price — large, accent]  │
│ [Price note — caption]   │
│                          │
│ [Description, 2 lines]   │
│                          │
│ サービスの詳細を見る →    │
└──────────────────────────┘
```

**Anatomy (detailed)** — adds the features checklist with check-icons in the plan accent color, and a per-plan `<MailtoButton variant="ghost" />` at the bottom.

**Visual rules**
- Border: `1px solid border.subtle`. The accent appears ONLY as the 2px top stripe and as the price/feature-check color (P5).
- Padding: `cardPaddingLg` (32px) on desktop, `cardPadding` (24px) on mobile.
- Radius: `radii.lg` (12px).
- Hover: lift 2px + `shadows.md`. No color change of card body.
- Equal-height in a 3-up grid (use `display: grid; align-items: stretch` on parent).

**Mobile layout rule**
- On mobile (1-column grid), the compact card may use a horizontal listitem layout (small icon left, name+price+desc right) — see reference image 3. This is allowed but only on the top page, and the accent bar moves to the LEFT edge in that layout.

**Accessibility**
- "サービスの詳細を見る →" is an `<a>` with `aria-label="{plan name} の詳細を見る"` to be unambiguous when extracted by screen readers.
- The accent bar is purely decorative.

---

## C5. `<ComparisonTable />`

**Purpose** — Services page hero. The three plans side-by-side across rows of common attributes (料金 / 形態 / こんな方に / AI Suite / 面談・サポート / 主な対象業種).

**Desktop layout**
- 4 columns: row label + 3 plan columns. Top row of plan columns is the plan name on top of an accent bar (4px) in the plan accent color.
- First-column row labels: `text.muted`, right-aligned (or left, depending on language flow — recommend left).
- Plan cells: centered, comfortable padding (24px y).
- Horizontal rules between rows: `border.subtle`.
- The price row is the visual anchor: large `priceLg` numerals in the plan accent color.

**Tablet/mobile layout**
- Below `md`, the comparison table becomes three stacked `<PlanCard variant="detailed" />` cards. THIS IS A REQUIREMENT (layout-contract horizontal-scroll rule). Do not implement an overflow-scroll variant.
- The row labels move INTO each card as in-card field labels (e.g. "料金", "形態") followed by the value.

**Accessibility**
- Use `<table>` with proper `<thead>`, `<th scope="col">`, `<th scope="row">`. (When the mobile layout is stacked cards, render a real `<table>` only at `md+` via CSS or render duplicate semantic markup wisely — see implementation notes.)
- Plan accent colors are paired with the plan name in text. Don't rely on color alone.

---

## C6. `<ProblemCard />` / `<ReasonCard />`

**Purpose** — Icon-led talking-point card. Used for:
- 「こんな課題を抱えていませんか？」(top page) — 3 problem cards
- 「AI.LandBase が選ばれる理由」(top page) — 3 reason cards

**Anatomy (tablet+ — vertical)**
```
┌─────────────────────┐
│      ╭───╮          │
│      │ ⊕ │  64px    │
│      ╰───╯          │
│   Title (h6)        │
│   Body (caption)    │
└─────────────────────┘
```

**Anatomy (mobile — horizontal listitem)**
```
┌──────────────────────────────────┐
│ ╭───╮  Title                     │
│ │ ⊕ │  Body                      │
│ ╰───╯                            │
└──────────────────────────────────┘
```

**Visual rules**
- Icon background: 64px circle, `ink.100` bg, `ink.800` icon (`icons.bgCircle` tokens).
- Title: `h6` weight 700.
- Body: `caption` size, `text.secondary`.
- No border by default. If the section uses a tinted background, no card surface is needed — these are content blocks, not floating cards.

**Accessibility**
- Icons are decorative; title carries meaning.
- Three cards inside a `<ul role="list">` on the same row, each `<li>` for screen-reader grouping.

---

## C7. `<AISuiteToolTile />`

**Purpose** — One of ten tiles representing an AI Suite tool (AnalyticsAI, OptimaPriceAI, …).

**Anatomy**
```
┌─────────────────────┐
│       [icon]        │
│       Name          │
│       [tag pill]    │
│       Description   │
└─────────────────────┘
```

**Props**
```ts
type ToolTileProps = {
  name: string;                       // "AnalyticsAI"
  category: "分析" | "価格最適化" | "接客" | "CRM" | "口コミ"
          | "マーケ" | "業務自動化" | "経理" | "在庫" | "教育";
  description: string;                // 1 short sentence
  iconName: string;                   // lucide icon key
  applicableTo: ("宿泊" | "飲食" | "ツアー" | "共通")[];
};
```

**Visual rules**
- Background: `paper.pure`, border `1px solid border.subtle`, radius `lg`.
- Icon: 32×32, `ink.700`.
- Category pill: small rounded-full chip, `ink.100` bg, `ink.700` text, eyebrow-style label.
- Hover: subtle lift (`shadows.sm` → `shadows.md`), no color change.
- Tap target: full tile is keyboard-focusable if it links anywhere; otherwise it's a non-interactive content block.

**v1 scope decision** — Tool tiles are non-interactive in v1 (no detail page per tool). They're informational. Don't make them buttons.

---

## C8. `<SectionHeading />`

**Purpose** — Consistent section title block. Centered above content.

**Anatomy**
```
        [eyebrow (optional, uppercase)]
        Title (h2)
        ─── (optional small accent line, 32px wide)
        [Lead paragraph (optional)]
```

**Rules**
- Always centered for marketing sections; left-aligned for content-heavy pages (legal, FAQ).
- Optional accent line is `2px` × `32px`, `ink.300`, with `4px` of vertical space above and below.
- Lead paragraph max-width: 36rem.

---

## C9. `<CTASection />`

**Purpose** — The full-bleed dark navy band that closes the top page and services page.

**Anatomy**
```
┌──────────────────────────────────────────────┐
│                                              │
│      H2 white                                │
│      subtitle muted-white                    │
│                                              │
│   [☐ 1] [☐ 2] [☐ 3]  ← 3-up mailto buttons   │
│                                              │
└──────────────────────────────────────────────┘
```

**Rules**
- Background `bg.footer` (ink.900). Text white / `text.onDarkMuted`.
- Three `<MailtoButton variant="onDark">` buttons side by side on tablet+, stacked full-width on mobile.
- No image / no decoration. The contrast itself is the visual moment.

---

## C10. `<Footer />`

**Purpose** — Site map + legal.

**Anatomy** (desktop, 4 columns)
```
┌─────────────────────────────────────────────────────────────────────┐
│ [logo+wordmark]   サービス     会社案内     お役立ち情報   お問い合わせ│
│ tagline           - link       - link       - link          - email │
│                   - link       - link       - link                  │
│                                                                     │
│ ─────────────────────────────────────────────────────────────────── │
│                                                © 2025 株式会社 ...  │
└─────────────────────────────────────────────────────────────────────┘
```

**Rules**
- Background `bg.footer` (ink.900). Text `paper.pure` for headings, `ink.200` for links.
- Link hover: underline + brighten to `paper.pure`.
- Logo + wordmark on dark uses the white/inverted logo variant (per `public/logo/README.md`).
- The "お問い合わせ" column contains "メールで相談する" which is itself a `<MailtoButton variant="onDark" size="md">`, AND a static-text fallback rendering of `info@ai-landbase.jp` (JS-obfuscated but always visible). This is the last-resort progressive-enhancement path.
- Mobile: 2 columns of category lists. Logo + tagline span full width above.

---

## C11. `<SpotServiceTable />`

**Purpose** — Display スポット発注 prices on services page (清掃 ¥4,500/h etc.).

**Rules**
- Simple 2-column table on tablet+.
- On mobile, stacked definition list: each row is `<dt>` (service name) + `<dd>` (price).
- Tabular numerals for prices.
- Right-align prices on desktop; on mobile, prices are below the label.

---

## C12. `<AsymmetricMediaSection />` — Ikigai Stay block

**Purpose** — Two-column "media + text" pattern used for "私たちが最初のユーザーです".

**Rules**
- Desktop: text left (40% width, inside container), image right (extends to right viewport edge — full-bleed on the right side only).
- Tablet: same as desktop but image right-edge respects container padding.
- Mobile: image on top (full-width inside container), text below.
- Image has rounded corners (`radii.xl`) on desktop, `radii.lg` on mobile.
- The image overlays a small Ikigai Stay wordmark/logo at bottom-left (this is content, not decoration — provided as part of the image).

---

## Component → Token usage matrix (quick reference)

| Component | Primary tokens |
|---|---|
| Logo | (no token color; uses asset files. Surface decides variant: light→default, dark→inverted) |
| Header | bg.surface, border.subtle, text.primary, zIndex.sticky |
| MailtoButton primary | action.primary, action.primaryHover, paper.pure, shadows.focus, radii.md |
| Hero (media) | bg.overlay, paper.pure (text), heroPaddingY |
| Hero (soft) | bg.hero (gradient), text.primary |
| PlanCard | bg.surface, border.subtle, plan.{variant}.base, radii.lg, shadows.md (hover) |
| ComparisonTable | border.subtle, plan.{variant}.base, text.muted (labels) |
| ProblemCard / ReasonCard | ink.100 (icon bg), ink.800 (icon color), text.secondary (body) |
| AISuiteToolTile | bg.surface, border.subtle, ink.100 (pill bg), radii.lg |
| CTASection | bg.footer (ink.900), paper.pure, ink.200 |
| Footer | bg.footer, ink.200 (links), paper.pure (headings) |
