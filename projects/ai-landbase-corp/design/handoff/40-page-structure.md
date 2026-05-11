# 40. Page Structure — AI.LandBase Corporate Site

> Section order is the sales conversation (P4). Don't reorder without justification. Each section below: purpose, contents, components used, copy outline.

---

## Site map (v1)

```
/                       Top page
/services               Services overview (the comparison table page)
/services/standard      Standard plan detail            ┐
/services/professional  Professional plan detail        │  Phase 6 — may consolidate
/services/server        AI Suite Server plan detail     ┘  into /services with anchors
/about                  会社案内 (overview + 代表挨拶 + アクセス)
/contact                お問い合わせ (mailto集約 + 所在地)
/cases                  導入事例 (Ikigai Stay primary)   ← Phase 7
/news                   お知らせ                         ← Phase 7
/faq                    よくあるご質問                   ← Phase 7
/privacy                プライバシーポリシー
/terms                  利用規約 (if applicable)
```

**v1 launch scope**: `/`, `/services`, `/about`, `/contact`, `/privacy`. The rest are wired in the footer sitemap with a "準備中" indicator or as 404 placeholders, and are built out in Phase 7.

**Note on `/contact` and the mailto-only policy** — `/contact` is not a form page. It exists as a stable URL for: (a) the footer sitemap's "お問い合わせ" link, (b) Schema.org `ContactPage` for SEO, (c) users who want to see contact options aggregated before clicking, and (d) being the canonical destination if a future external link points to "the contact page". The header's常駐 CTA still triggers `mailto:` directly per the brief — `/contact` is reached primarily via the footer sitemap and from anchor links inside `/about`.

---

## P1. Top Page (`/`)

Reference: `top-desktop.png`, `top-mobile.png`.

### Section order

| # | Section ID | Pattern | Purpose |
|---|---|---|---|
| 1 | `hero` | fullBleedMedia | Establish: who we are, who we serve, one sentence promise. |
| 2 | `problems` | constrained | "これ、心当たりありませんか?" — empathize with operator pains. |
| 3 | `plans` | constrained | Show 3 plans at a glance. No comparison table here; quick triage. |
| 4 | `reasons` | constrained | Why us (3 points). |
| 5 | `proof` | asymmetric | Ikigai Stay — proof we run a real hotel and dogfood our own product. |
| 6 | `cta` | fullBleedColor | Final ask. Three intents (service / 宿泊税 / その他). |
| 7 | `footer` | fullBleedColor | Sitemap, legal. |

### 1. `hero` — `<Hero variant="media">`

- **Background**: Okinawa north coast photograph (full-bleed, 24% darken overlay).
- **Eyebrow** (optional): _none_ on top page — keep the hero spare.
- **Headline** (H1, hero scale, white): `沖縄の観光業に、AI という伴走者を。`
- **Lead** (3 lines, body-lg, paper.pure):
  > 人手不足、データ活用、収益の安定化——日々の課題に向き合う事業者のそばで、AI テクノロジーが経営を支えます。地元・沖縄北部に拠点を置く AI.LandBase が、現場に寄り添いながらお手伝いします。
- **CTA**: `<MailtoButton variant="primary" size="lg">メールで相談する</MailtoButton>` with subject preset for general inquiry.
- **Caption under CTA** (small, muted): `どんなご相談でもお待ちしています`

### 2. `problems` — Constrained section

- **Section heading**: `こんな課題を抱えていませんか？` (H2, centered, with optional accent line)
- **Body**: Three `<ProblemCard>` instances in a 3-up grid (tablet+) / horizontal-listitem stack (mobile).

  | # | Icon (lucide) | Title | Body |
  |---|---|---|---|
  | 1 | `users` | 人手不足 | 採用が難しく、現場の負担が増大。限られた人員で日々の業務を回すのが大変。 |
  | 2 | `bar-chart-3` | データが活かせない | 予約・売上・顧客データが点在していて、意思決定に十分活用できていない。 |
  | 3 | `waves` | 季節による売上の波 | 繁忙期と閑散期の差が大きく、収益が不安定で、先の見通しを立てづらい。 |

### 3. `plans` — Constrained section

- **Section heading**: `あなたの経営に合うプランがあります` (H2, centered)
- **Body**: Three `<PlanCard size="compact">` cards in a 3-up grid.
  - Standard — `月額 5 万円`, lead: `必要な機能を厳選したはじめやすい基本プラン。小規模事業者の方におすすめです。`
  - Professional — `個別見積`, lead: `お客様の課題や規模に合わせて最適なシステムとサポートをご提案します。`
  - AI Suite Server — `¥1,965,000 (税別・一式)`, lead: `自社環境での本格的な運用に。オンプレミス型で高いセキュリティと柔軟なカスタマイズが可能です。`
- Each card links to its respective detail (`/services#standard`, etc., or anchor on `/services`).

### 4. `reasons` — Constrained section

- **Section heading**: `AI.LandBase が選ばれる理由` (H2, centered)
- **Body**: Three `<ReasonCard>` cards.

  | # | Icon | Title | Body |
  |---|---|---|---|
  | 1 | `tag` | 価格をすべて公開しています | わかりやすい料金体系で、安心してご検討いただけます。追加費用の心配もありません。 |
  | 2 | `map-pin` | 沖縄県北部に拠点を置いています | 地域の特性を理解し、迅速に対応。顔が見える距離で、継続的にサポートします。 |
  | 3 | `handshake` | システム導入だけで終わりません | 運用支援・改善提案まで伴走し、成果につながる仕組みづくりを一緒に進めます。 |

### 5. `proof` — Asymmetric section

- **Layout**: Text left (40%) + Ikigai Stay image right (full-bleed right edge on desktop).
- **Heading** (H3): `私たちが最初のユーザーです`
- **Body** (2 paragraphs):
  > AI.LandBase は、当社が運営するホテル「Ikigai Stay」を実証フィールドとして、AI を活用した業務改善とデータ活用に取り組んできました。
  > 現場のリアルな課題に向き合い、自ら検証・改善を重ねてきた経験が、すべてのお客様への提供価値につながっています。
- **Link**: `会社案内を見る →` → `/about`
- **Image**: Ikigai Stay exterior photo. Wordmark overlay is part of the image asset.

### 6. `cta` — Full-bleed dark section, `<CTASection>`

- **Heading** (H2, white): `まずは、ご相談からはじめませんか`
- **Subhead** (paper.pure, lighter): `どんなご相談でもお気軽にご連絡ください。`
- **Three buttons** (`<MailtoButton variant="onDark">`):
  1. `サービスについて相談したい` → subject: `[AI.LandBase] サービスに関するお問い合わせ`
  2. `宿泊税対応について聞きたい` → subject: `[AI.LandBase] 宿泊税対応についてのお問い合わせ`
  3. `その他のお問い合わせ` → subject: `[AI.LandBase] その他のお問い合わせ`

### 7. `footer` — `<Footer>`

See component spec C10.

---

## P2. Services Page (`/services`)

Reference: `services-desktop.png`.

### Section order

| # | Section ID | Pattern | Purpose |
|---|---|---|---|
| 1 | `hero` | fullBleedColor (soft) | Page title + 1-paragraph intro. |
| 2 | `comparison` | constrained | The 3-plan comparison table — info-dense decision aid. |
| 3 | `plan-cards` | constrained | Per-plan detailed cards (features checklist, plan-specific CTA). |
| 4 | `spot` | constrained | スポット発注 price table. |
| 5 | `suite` | constrained | LandBase AI Suite 10-tool grid. |
| 6 | `cta` | fullBleedColor | Same as top-page CTA. |
| 7 | `footer` | fullBleedColor | |

### 1. `hero` — `<Hero variant="soft">`

- **Background**: `bg.hero` linear gradient (soft mist → sky). Decorative leaf SVG on right (hidden on mobile).
- **Eyebrow** (optional): _none_
- **Headline** (H1): `サービス`
- **Lead** (body-lg, max-width 36rem):
  > AI.LandBase は、沖縄の観光業に特化した AI ツールと経営支援を提供しています。事業の規模やご要望に合わせて、3 つのプランからお選びいただけます。

### 2. `comparison` — `<ComparisonTable>`

- **Section heading**: `プラン比較表` (H2, centered)
- **Table rows** (in order):
  1. 料金 — `月額 5 万円` / `個別見積` / `¥1,965,000 (税別・一式)`
  2. 形態 — `月額制 (サブスクリプション)` / `個別見積 (法人・団体向け)` / `買い切り (オンプレミス)`
  3. こんな方に — `小規模事業者・個人事業主 まずは AI を試したい方` / `独自の業務フローに合わせて柔軟に導入したい方` / `セキュリティ要件が厳しい大型施設・行政・団体`
  4. AI Suite — `10 ツールすべて利用可能` / `10 ツールすべて利用可能` / `10 ツールすべて利用可能 (自社サーバーで運用)`
  5. 面談・サポート — `月 1 回のオンライン面談 / チャットサポート` / `要件に応じた面談 / 個別サポートプラン` / `導入支援・運用サポート / カスタマイズ対応`
  6. 主な対象業種 — `宿泊施設 / 飲食店 / ツアー・アクティビティ会社` / `宿泊施設 / 飲食店 / ツアー・アクティビティ会社 など` / `宿泊施設 / 飲食店 / 行政 / DMO・観光協会 など`
- **CTA below table**: `<MailtoButton variant="primary">メールで相談する</MailtoButton>`

### 3. `plan-cards` — 3 detailed `<PlanCard size="detailed">` cards

Each card shows:
- Plan name with accent-color title + price line
- Description (2 sentences)
- `サービス内容` checklist (4–5 items per plan)
- For AI Suite Server only: `活用シーン` chip row (宿泊税対応 / 客室管理・収益最適化 / 経理自動化) + note paragraph linking to lodging-tax LP
- `対象業種` line
- Per-card mailto CTA: `<MailtoButton variant="ghost">メールで相談する</MailtoButton>` with plan-specific subject

**Plan card content**

**Standard** — features list:
- AI Suite 10 ツールの利用
- 月 1 回のオンライン面談
- チャットによるサポート
- 基本的な分析レポートの提供

**Professional** — features list:
- 要件定義・業務設計
- AI Suite のカスタマイズ設定
- 既存システムとの連携支援
- データ移行・導入支援
- 運用トレーニングの実施
- 継続的な運用サポート

**AI Suite Server** — features list:
- AI Suite 10 ツール (オンプレミス版)
- 自社サーバーへの導入・設定
- ユーザー管理・権限設定
- 運用マニュアルの提供
- 導入後の技術サポート
- 活用シーン chips: 宿泊税対応 / 客室管理・収益最適化 / 経理自動化
- Note paragraph: `沖縄県の補助金制度を活用できる場合があります。詳細はお気軽にご相談ください。`
- Link: `宿泊税対応の詳細はこちら →` → `https://lodging-tax.ai-landbase.jp/lp/okinawa-lodging-tax/`

### 4. `spot` — `<SpotServiceTable>`

- **Section heading**: `スポット発注 (施設管理代行)` (H3 — sub-section, not main)
- **Lead**: `必要なときに、必要な分だけご利用いただけるスポットサービスです。`
- **Table rows**:
  | サービス内容 | 料金 |
  |---|---|
  | 清掃代行 | 4,500 円 / 時間 |
  | リネン管理 | 625 円 / ベッド |
  | 緊急顧客対応 | 5,000 円 / 回 |
  | カスタム AI 開発 | 別途見積 |
- **Footnote** (caption): `※宿泊業向け料金体系。飲食・ツアー向けスポット料金はお問い合わせください。`

### 5. `suite` — AI Suite 10-tool grid

- **Section heading** (H2): `LandBase AI Suite — 10 のツールで経営を支える`
- **Lead**: `データ分析から業務効率化、顧客体験向上まで、観光業のあらゆる課題を支援する 10 の AI ツールをご用意しています。`
- **Body**: Ten `<AISuiteToolTile>` tiles in a responsive grid (2 cols mobile / 3 cols tablet / 5 cols desktop).
- Tile content per BRIEF.md §1 (LandBase AI Suite table).

### 6. `cta` — Same `<CTASection>` as top page.

### 7. `footer` — `<Footer>`.

---

## P3. About Page (`/about`)

Lower priority for visual richness; content-heavy.

### Section order

1. **Hero** — `<Hero variant="soft">` — H1 `会社案内`, lead 1 paragraph.
2. **会社概要** — definition list table (formal info: 社名 / 代表 / 所在地 / 資本金 / 設立 / 事業内容).
3. **Mission / Vision / Purpose** — 3 stacked content blocks, each with eyebrow + heading + body.
4. **コアバリュー** — 8-item list, two columns on desktop. Each value: number, title, 1-sentence elaboration.
5. **代表挨拶** — portrait (if available) + 2–3 paragraph message.
6. **拠点・アクセス** — embedded map (Google Maps iframe) + address.
7. **CTA** — Same `<CTASection>`.
8. **Footer**.

---

## P4. Contact Page (`/contact`)

A stable URL aggregating contact options. Not a form page — consistent with BRIEF §3 (mailto: only, no form). The site has many mailto CTAs scattered through marketing surfaces; this page is the canonical "everything about contacting us" destination.

### Inbound routes
- Footer sitemap "お問い合わせ" → `/contact`
- "アクセス" section of `/about` may anchor-link to `/contact#location` for consistency, OR `/contact` may borrow the address block from `/about` — single source of truth lives in `src/content/contact.ts`.
- Header CTA does **not** route here in v1 — per BRIEF §3 it triggers `mailto:` directly. (Header CTA wording: "お問い合わせ"; on click → mail client.)

### Section order

| # | Section ID | Pattern | Purpose |
|---|---|---|---|
| 1 | `hero` | fullBleedColor (soft) | Page title + 1-paragraph intro framing the email-first approach. |
| 2 | `intents` | constrained | The same 3-up categorized mailto buttons as the bottom CTA section. Visitors choose their intent. |
| 3 | `details` | constrained | Email rendered as text (JS-composed), address, business location summary. |
| 4 | `approach` | constrained | Short note on how we handle inquiries (response time, business hours window — *not* a guarantee). |
| 5 | `footer` | fullBleedColor | |

> **Note**: This page intentionally omits the standard `<CTASection>` since the whole page IS the CTA. Adding it would be redundant.

### 1. `hero` — `<Hero variant="soft">`

- **Headline** (H1): `お問い合わせ`
- **Lead** (body-lg):
  > AI.LandBase へのご連絡は、メールにて承っています。ご相談内容に近いボタンをお選びください。お気軽にどうぞ。

### 2. `intents` — Constrained section

- **Section heading**: _none_ — the buttons are the content. Optional eyebrow `ご相談内容をお選びください`.
- **Body**: Three `<MailtoButton variant="primary" size="lg">` buttons in a 3-up grid (1-up on mobile):
  1. `サービスについて相談したい` — subject: `[AI.LandBase] サービスに関するお問い合わせ`
  2. `宿泊税対応について聞きたい` — subject: `[AI.LandBase] 宿泊税対応についてのお問い合わせ`
  3. `その他のお問い合わせ` — subject: `[AI.LandBase] その他のお問い合わせ`
- **Below the buttons** (caption): `件名はあらかじめ入力されます。本文に状況をご記入のうえご送信ください。`

### 3. `details` — Constrained section

- **Section heading** (H2): `連絡先`
- **Body**: A two-column layout (1-column on mobile) — left: email + how it works; right: address + location.

**Left column — email**
- Label: `メールアドレス`
- Value: `info@ai-landbase.jp` rendered as text via the same JS-composition pattern used by `<MailtoButton>` (no raw mailto: in HTML source). When JS fails, the address still shows visibly so users can copy it manually.
- Hint: `件名で内容を判別して、担当が確認します。`

**Right column — location**
- Label: `所在地`
- Value:
  > 〒905-0412
  > 沖縄県国頭郡今帰仁村湧川 852-2
- Note: `沖縄北部・Ikigai Stay（ブルーゾーン）が拠点です。`

### 4. `approach` — Constrained section, optional in v1

- **Section heading** (H3): `お問い合わせから返信まで`
- **Body** (1–2 paragraphs):
  > 通常 2〜3 営業日以内に担当者よりご返信いたします。内容によってはお時間をいただく場合があります。
  > ご相談はすべて秘密厳守で対応いたします。検討段階のふわっとしたご相談も歓迎です。

> **Scope note**: This section is optional in v1 if the team prefers not to commit to a response window. If omitted, sections 2–3 alone are sufficient.

### Accessibility / metadata

- Schema.org `ContactPage` JSON-LD with email and address fields.
- `<title>`: `お問い合わせ | 株式会社 AI.LandBase`
- `<meta name="description">`: `株式会社 AI.LandBase へのお問い合わせ窓口。サービス・宿泊税対応・その他のご相談を、メールにて承っています。`

---

## Cross-page elements (every page)

- `<Header>` sticky at top.
- `<Footer>` always present.
- `<CTASection>` present on every public marketing page except `/contact`, `/privacy`, `/terms`. (`/contact` omits it because the entire page is the CTA.)
- Page title via `metadata.title`: `〇〇 | 株式会社 AI.LandBase`.
- Page description and OGP image set on every page.

---

## Copy guidelines (cross-cutting)

- **Voice**: 第三者目線で誠実。"〜です/ます" 調. No "ぼく/わたしたち" first-person beyond the proof section.
- **Numbers**: half-width digits with full-width spacing for readability (`月額 5 万円`, `¥1,965,000`).
- **Symbols**: en dash for ranges, em dash for asides. Avoid `~`/`〜` mixing.
- **Buttons**: action verbs in plain form (`メールで相談する`, not `相談はこちら`).
- **CTAs**: Never use "今すぐ", "限定", "急いで". P1 (no urgency theater).
