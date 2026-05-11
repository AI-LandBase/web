# 50. Acceptance Criteria — AI.LandBase Corporate Site

> Every item below is testable. A PR/release that fails any item in the **Must Pass** section cannot ship. **Should Pass** items are tracked as defects but do not block.

---

## A. Must pass (release blockers)

### A.1 Layout & responsiveness

- [ ] **No horizontal scroll** at any viewport between 320px and 1920px on `/`, `/services`, `/about`. Test by inspecting `document.documentElement.scrollWidth === document.documentElement.clientWidth` at 320, 360, 375, 414, 768, 1024, 1280, 1440, 1920.
- [ ] **No layout shift** caused by web font loading. CLS ≤ 0.1.
- [ ] **Sticky header** stays at `top: 0` on all pages, all viewports. Content below has correct offset (no occluded H1).
- [ ] **Mobile hamburger menu** opens, traps focus, closes via `×` button, Esc key, and backdrop tap. Restores focus to hamburger button on close.
- [ ] **Plan comparison table** on `/services` collapses to **stacked plan cards** below `md` breakpoint. There is no horizontally-scrolling table on mobile.
- [ ] All images use `max-width: 100%` and don't overflow their containers.

### A.2 Mailto CTA functionality

- [ ] **Every primary CTA button** on the site composes a `mailto:` link with the correct subject prefix (`[AI.LandBase] ...`).
- [ ] On a fresh page load with JS enabled, all CTAs are clickable and open the user's mail client.
- [ ] With JS disabled, no `mailto:info@ai-landbase.jp` string appears in the HTML source of any page (P8 progressive enhancement / spam protection).
- [ ] The footer contains `info@ai-landbase.jp` rendered as visible text (JS-composed) so users on JS-disabled browsers can still copy the address.
- [ ] All three buttons in the bottom CTA section produce three distinct, correct subject lines.

### A.3 Accessibility — Lighthouse / axe

- [ ] **Lighthouse Accessibility ≥ 90** on `/`, `/services`, `/about`.
- [ ] **No axe-core violations of "serious" or "critical" severity** on the same three pages.
- [ ] Every interactive element is keyboard-reachable in a logical order. Test by tabbing through the entire page.
- [ ] Every interactive element has a **visible focus indicator** with ≥ 3:1 contrast against the adjacent surface.
- [ ] Color contrast:
  - Body text vs background: ≥ 4.5:1 (AA). Verified for `text.primary` on `bg.surface`, `paper.pure` on `bg.footer`, `paper.pure` on hero overlay.
  - Large text / UI: ≥ 3:1.
  - The plan accent colors (when used for the price text) meet 4.5:1 on white. Verified:
    - plan.standard.base `#267A62` on white — **5.19:1 ✓ AA**
    - plan.professional.base `#2E5C9E` on white — **6.69:1 ✓ AA**
    - plan.server.base `#A96522` on white — **4.59:1 ✓ AA** (sits closest to the floor; re-verify if ever placed on off-white surfaces)
- [ ] Plan accent colors are paired with a textual plan name; no information is conveyed by color alone.
- [ ] All non-decorative images have meaningful `alt` text; decorative images have `alt=""` or `aria-hidden="true"`.
- [ ] Page language is set: `<html lang="ja">`.
- [ ] Skip-to-content link at the top of every page, reachable on first Tab.

### A.4 SEO & metadata

- [ ] Every page has a unique `<title>` matching the pattern `〇〇 | 株式会社 AI.LandBase`.
- [ ] Every page has a unique meta `description` of 120–160 characters (JP).
- [ ] OGP image is set per page. Default OGP image is 1200×630, includes the wordmark, and is under 200KB.
- [ ] `<link rel="canonical">` is set on every page.
- [ ] `robots.txt` allows all and points to sitemap.
- [ ] `sitemap.xml` exists and lists every published page.
- [ ] Schema.org `Organization` JSON-LD on `/about` with name `株式会社 AI.LandBase`, address, founding date.
- [ ] No `noindex` directive on production pages.

### A.5 Performance

- [ ] **Lighthouse Performance ≥ 90** on mobile (Moto G class) for `/`.
- [ ] **LCP** ≤ 2.5s on the top page (the hero photo is the LCP candidate — must be optimized).
- [ ] Hero photo served as AVIF + WebP fallback, with explicit `width`/`height` attributes.
- [ ] All images use `next/image` with appropriate `sizes`.
- [ ] Total JS shipped to the top page ≤ 150KB compressed (excluding analytics).
- [ ] No render-blocking third-party scripts above the fold.

### A.6 Content & legal

- [ ] Company name appears as `株式会社 AI.LandBase` everywhere (no `AILandBase 株式会社` variant).
- [ ] All prices displayed match the BRIEF: `月額 5 万円`, `¥1,965,000 (税別・一式)`, `4,500 円/時間`, `625 円/ベッド`, `5,000 円/回`.
- [ ] **Phone number does not appear anywhere on the site** (BRIEF §3).
- [ ] AI Suite Server plan detail card links to `https://lodging-tax.ai-landbase.jp/lp/okinawa-lodging-tax/`.
- [ ] Footer copyright year is dynamic (`new Date().getFullYear()`).
- [ ] Privacy policy page exists and is linked from the footer.

### A.7 Brand consistency

- [ ] Logo on light backgrounds uses the standard variant; on dark backgrounds (footer, CTA section) uses the inverted variant per `public/logo/README.md`.
- [ ] Plan accent colors are used **only** as: (a) 2px card top border, (b) price text color, (c) "詳細を見る" link color, (d) comparison-table column accent. Nowhere else.
- [ ] No emoji in body content. (Icons via lucide-react only.)
- [ ] No "島ブリーズ" warm palette artifacts (sunset orange, beach turquoise, organic blob shapes).

---

## B. Should pass (tracked, not blocking)

- [ ] Lighthouse Best Practices ≥ 90.
- [ ] Lighthouse SEO ≥ 95.
- [ ] FID / INP ≤ 100ms on mid-range mobile.
- [ ] Hero photo includes art direction (different crop) for mobile vs desktop via `picture` element or `next/image` artDirected pattern.
- [ ] Animated transitions respect `prefers-reduced-motion`.
- [ ] Dark mode is **not** implemented in v1 (out of scope).
- [ ] The 10 AI Suite tool tiles each have a uniquely identifying lucide icon (no duplicates).

---

## C. Won't have (v1 — explicit non-goals)

To prevent scope creep:

- ❌ Multi-language toggle (JP only in v1).
- ❌ Live chat widget.
- ❌ Newsletter signup.
- ❌ Blog/news article reading experience (sitemap entry exists but routes to placeholder).
- ❌ Customer login / member area.
- ❌ Online estimate generator.
- ❌ A/B testing framework.
- ❌ Carousel / slider components.
- ❌ Dark mode.
- ❌ Hover-only critical content (e.g. tooltips that hide pricing details).

---

## D. Manual QA checklist (pre-release)

Run on a fresh device/browser, not on dev machine.

### D.1 Devices/browsers
- [ ] iPhone SE (375×667) — Safari latest
- [ ] iPhone 14 Pro (393×852) — Safari latest
- [ ] Pixel 6 (412×915) — Chrome latest
- [ ] iPad (768×1024) — Safari latest
- [ ] MacBook 1440×900 — Chrome, Safari, Firefox
- [ ] Windows 1920×1080 — Edge, Chrome

### D.2 Functional walkthrough
- [ ] Visit `/`. Confirm hero photo loads, headline visible, CTA button works.
- [ ] Tap header CTA → mail client opens with subject `[AI.LandBase] サービスに関するお問い合わせ`.
- [ ] Scroll to bottom CTA → all three buttons open with distinct subjects.
- [ ] Visit `/services`. Confirm comparison table is readable, prices visible.
- [ ] Resize browser slowly from 320px to 1920px on `/services`. Confirm no horizontal scroll appears at any width.
- [ ] Tap a plan card "詳細を見る" link. Confirm correct anchor or detail page reached.
- [ ] Visit `/about`. Confirm address and email visible.
- [ ] Visit `/contact`. Confirm: three categorized mailto buttons clickable with distinct subjects; email rendered as visible text; address block present.
- [ ] Click footer "お問い合わせ" link → arrives at `/contact`.
- [ ] Disable JS. Reload `/`. Confirm: content visible, header visible, footer email text visible. Mailto links may or may not work (acceptable — but the address itself must be visible to copy).

### D.3 Print check (low priority)
- [ ] `window.print()` on `/services` produces a reasonable greyscale layout (no dark backgrounds blowing through ink).

---

## E. Analytics & post-launch

(Phase 7 detail.)

- [ ] GA4 tag installed, page_view fires on navigation.
- [ ] Custom event `cta_click` fires with `cta_id` parameter on every mailto CTA click.
- [ ] Custom event `outbound_click` for the lodging-tax LP link.

---

## How to file a defect

If a check fails:
1. Open a GitHub issue against the web repo, label `bug/site`, link the failing acceptance criterion ID (e.g. "fails A.1.1 horizontal scroll").
2. Attach a screenshot/video and the viewport size.
3. Reference parent issue #18 in the body.
