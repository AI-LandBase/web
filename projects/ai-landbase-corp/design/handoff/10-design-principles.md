# 10. Design Principles — AI.LandBase Corporate Site

> Read this before opening any other file. Every later decision (tokens, components, copy) must be justifiable against one of these principles. When two principles conflict, the order below decides.

---

## P1. 誠実 before 派手 — Honesty over flash

Trust is the conversion driver, not novelty. The site must look like a company that does what it says.

**Do**
- Show all prices that can be shown (¥1,965,000 税別・一式, 月額 5 万円, 4,500 円/時間). Hide nothing that the brief discloses.
- Use real photography (Ikigai Stay, the actual Okinawa north coastline).
- Plain Japanese — short sentences, no jargon stacking.
- When something is "個別見積", say so plainly. Don't dress it up.

**Avoid**
- "革新的 AI ソリューション" / "DX で変革" boilerplate.
- Hero copy that is a vague aspiration. The hero is a promise about *the visitor's* business.
- Hover-only critical information. If a value matters, it's visible.

---

## P2. 静かな先進性 — Quiet sophistication

The brief explicitly warns against "シリコンバレー的な軽さ" and "過度な煽り". Tech feel comes from typographic precision and disciplined whitespace, not from gradients-on-gradients or neon accents.

**Do**
- One restrained accent system: deep navy as the institutional voice, three plan accent colors used *only* on plan surfaces.
- Generous vertical rhythm. A section feels finished before the next begins.
- Sans-serif Japanese type at a comfortable reading size (16–17px body), tight numerals for prices.

**Avoid**
- Animated gradients, parallax, particle backgrounds.
- More than one "wow" element per page. If everything is loud, nothing is.
- Emoji in body text. Icons only where they aid scanning.

---

## P3. 沖縄を引用する、観光広告にしない — Cite Okinawa, don't impersonate a travel ad

The brief is clear: 旧 "Island Breeze" (warm + ocean + organic blobs) is out. But sense of place still matters — visitors should feel this company is *from* somewhere, not a generic Tokyo SaaS.

**Do**
- One full-bleed photograph of the actual North-Okinawa coastline as hero. One — not a gallery.
- Botanical detail (subtropical leaf line-art, low opacity) as section-level decoration on the Services page hero only.
- A muted, slightly cool blue palette referencing reef water and sky, not vacation-brochure turquoise.

**Avoid**
- Hibiscus, シーサー, 三線, beach umbrellas, tropical drinks, anything that reads as resort marketing.
- Saturated turquoise. Stay on the cool side of blue.
- "南国" / "リゾート" / "癒し" copy. The visitor is a working operator, not a vacationer.

---

## P4. 読み順 = 営業順 — Reading order is the sales conversation

A first-time visitor cannot be told everything. The vertical order of the page IS the pitch: problem → fit → proof → ask.

**Do**
- Top page: 課題 → プラン → 選ばれる理由 → 自社実証(Ikigai Stay) → CTA.
- Plan cards always in price-ascending visual weight (Standard → Professional → AI Suite Server), regardless of which is most profitable.
- One primary CTA wording everywhere: 「メールで相談する」. Buttons that look like CTAs but lead elsewhere are forbidden.

**Avoid**
- Burying the prices below the fold on the Services page.
- Multiple competing CTAs in one section (e.g. "資料DL" next to "問い合わせ" next to "LINE登録"). The brief is clear: mailto, full stop.

---

## P5. 一貫した色の意味 — Color carries meaning, consistently

Plan accent colors are part of the information architecture, not decoration. A visitor who learns "オレンジ = AI Suite Server" on the top page must find that same association on the services page, the comparison table, and the plan detail card.

**Plan accent map (locked)**
- スタンダード → green (`--color-plan-standard`)
- プロフェッショナル → blue (`--color-plan-professional`)
- AI Suite Server → orange/amber (`--color-plan-server`)

Use the accent for: top border of card, price text color, "詳細を見る" link color, comparison-table column header. Use it for nothing else.

---

## P6. モバイル等価 — Mobile parity, not mobile-lite

The brief targets owners/managers of small tourism businesses. Many will read the site on a phone between operational tasks. Mobile is not a degraded fallback.

**Do**
- Every section that exists on desktop exists on mobile with equivalent information density (re-laid out, not stripped).
- Tap targets ≥ 44×44px. CTAs are full-width on mobile.
- The comparison table is the one exception: on mobile, it becomes three stacked plan summary cards with the same data, not a horizontally scrolling table.

**Avoid**
- Hiding the AI Suite 10-tool grid on mobile because it's "too long".
- Mini-hero (a cramped 200px tall photo) on mobile. The hero is still the hero.

---

## P7. 横スクロールはバグ — Horizontal scroll is a bug

There is no design intent that produces a horizontal scrollbar on any breakpoint between 320px and 1920px. Anything that does (a wide table, a long unbroken price string, a fixed-width svg) is a defect, not a tradeoff.

See `25-layout-contract.yaml` for enforcement.

---

## P8. アクセシビリティは後工程ではない — Accessibility is not a Phase 7 task

The Lighthouse 90+ Accessibility target in the brief means decisions made in tokens and components, not patches applied later.

**Do**
- All text/background pairs in tokens are AA-contrast verified (see `20-design-tokens.yaml` notes).
- Plan accent colors are *never* the sole information channel — they are paired with the plan name in text.
- Focus rings are visible and have ≥ 3:1 contrast against their adjacent surface.
- The mailto CTA, when JS fails, still falls back to a visible `info@ai-landbase.jp` text (last-resort progressive enhancement).

**Avoid**
- Light gray placeholder text used as instructional content.
- Icons without accessible labels (the AI Suite tool tiles need names *as text*, not just icons).
- Color-only state indication (e.g. "active plan" shown only by background tint).

---

## Tradeoff cheat sheet

| If you have to choose… | Choose |
|---|---|
| Visual delight vs. trust | Trust |
| Density vs. whitespace on a marketing surface | Whitespace |
| Mobile feature parity vs. mobile speed | Parity (then optimize) |
| Match the reference image exactly vs. match the principle | Principle |
| One more CTA variant vs. one consistent CTA everywhere | One consistent CTA |
