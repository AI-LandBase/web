# ChatGPT image2 モックアップ生成プロンプト — Phase 4

> Phase 3 コピー原稿 + Phase 2 IA 設計 + Phase 1 ペルソナ + BRIEF をもとに構成。
> image2 は「完成絵」ではなく「ビジュアル方向性のリファレンス」として使用する。
> 探索段階では Quality: low で方向性を確認し、採用候補を medium〜high で仕上げる。
>
> 生成結果の命名規則: `{ページ名}-{viewport}.png`（例: `top-desktop.png`）

---

## 共通ブリーフ（全プロンプト共通の前提）

以下の情報を全プロンプトの前提として ChatGPT に渡してください。

```
## Brand Brief — AI.LandBase Corporate Website

Company: 株式会社 AI.LandBase (AI.LandBase, Inc.)
Industry: AI-powered management support for tourism businesses in northern Okinawa, Japan
Logo: Provided separately (1024x1024 RGBA PNG, place in header top-left)

### Brand Tone
- Sincere, transparent, trustworthy
- Advanced technology + data-driven, but approachable
- Locally rooted (Okinawa, community-oriented, sustainable)

### Must Avoid
- Aggressive sales language, urgency tactics ("Act now!", "Limited!")
- Silicon Valley startup aesthetic (neon gradients, dark mode hero, etc.)
- Stereotypical tropical tourism imagery (sunset beaches, hibiscus, shisa overuse)
- Heavy IT jargon overload

### Visual Direction
- Clean, professional, generous whitespace
- Okinawa identity reimagined: NOT the old "Island Breeze" style (warm tones + ocean blue + organic blobs). Instead, find a fresh, modern expression of Okinawa — think natural light, muted earth/sea tones, calm sophistication
- Reference tone: ELYZA (tech credibility + sincerity) × Kakehashi (regional social impact + warmth)
- Typography: Clear, readable Japanese-first. Sans-serif. Hierarchy through weight and size, not decoration

### Color Palette Guidance (direction, not final)
- Primary: A deep, trustworthy tone (navy, deep teal, or similar — NOT bright blue)
- Secondary: Warm neutral (sand, warm gray, or subtle earth tone — Okinawa connection)
- Accent: A single accent for CTA buttons (approachable but not aggressive)
- Background: Off-white or very light warm gray (not pure white)

### Target Audience
- Persona A: Small hotel/inn owner, 50s male, low digital literacy, needs price transparency and local trust
- Persona B: Restaurant owner, 30s female, moderate digital literacy, needs monthly affordable plan
- Persona C: Municipal government officer, 40s male, high literacy, needs formal company info for official reports

### Layout Contract
- Page wrapper: max-width 1200px, centered
- Content width: 800px reading measure for body text
- Gutter: 24px minimum
- Full-bleed: Hero background only; all other sections constrained
- Responsive: Desktop 1440px / Mobile 375px
- Horizontal scroll: Strictly prohibited
- Header: Sticky, logo left, nav center-right, CTA button far-right
```

---

## プロンプト 1: トップページ（デスクトップ 1440px）

### 1. Deliverable

コーポレートサイト トップページのフルページモックアップ（デスクトップ 1440px 幅）

### 2. Audience

- ペルソナ A（宿泊事業者 52歳男性）: LP から遷移、「この会社どんな会社？」を確認したい
- ペルソナ B（飲食店経営者 38歳女性）: 指名検索で到達、月額プランに興味
- ペルソナ C（自治体担当者 45歳男性）: 会社情報の確認が主目的

### 3. Message

Phase 3 コピーから引用（`copy/top.md`）:
- ヒーロー: 「沖縄の観光業に、AI という伴走者を。」
- 課題提起: 「こんな課題を抱えていませんか？」（人手不足 / データが活かせない / 季節による売上の波）
- サービス概要: 「あなたの経営に合うプランがあります」（3プランカード）
- 強み: 「AI.LandBase が選ばれる理由」（価格公開 / 地元拠点 / 総合支援）
- 実証: 「私たちが最初のユーザーです」
- CTA: 「まずは、ご相談からはじめませんか」

### 4. Visual concept

クリーンで信頼感のあるコーポレートサイト。深いティールまたはネイビーをプライマリカラーに、砂色やウォームグレーをセカンダリに使用。沖縄の自然光を感じる柔らかい色調。装飾は最小限、余白を活かした構成。

### 5. Composition

```
[Sticky Header: Logo | サービス  会社案内 | [お問い合わせ] ]

[Hero - Full bleed background]
  Left: Catchcopy + Subcopy + CTA button
  Right: Abstract illustration or photo placeholder (Okinawa nature/hospitality)

[Section 2: 課題提起 - 3 columns]
  Icon + Heading + Short text × 3

[Section 3: サービス概要 - 3 cards]
  Card: Plan name + Price (bold, largest) + Description + Link
  スタンダード ¥50,000/月 | プロフェッショナル 個別見積 | AI Suite Server ¥1,965,000

[Section 4: 強み・差別化 - 3 columns]
  Icon + Heading + Description × 3

[Section 5: 実証紹介]
  Left: Text block | Right: Photo placeholder (Ikigai Stay)

[Section 6: CTA - Full width block]
  Heading + Subtitle + 3 mailto buttons (件名テンプレート)

[Footer: Logo + Sitemap columns + Copyright]
```

### 6. Layout contract

```
page wrapper:      max-width 1200px, centered
content width:     800px reading measure for body text
gutter:            24px
full-bleed:        hero background, CTA section background
responsive:        this is the 1440px desktop view
horizontal scroll: none
```

### 7. Exact in-image text

```
Header: "AI.LandBase" (logo), "サービス", "会社案内", "お問い合わせ" (button)

Hero:
  "沖縄の観光業に、AI という伴走者を。"
  "人手不足、データ活用、収益の安定化——
   日々の課題に向き合う事業者のそばで、AI テクノロジーが経営を支えます。
   地元・沖縄北部に拠点を置く AI.LandBase が、現場に寄り添いながらお手伝いします。"
  Button: "メールで相談する"
  Sub: "どんなご相談でもお待ちしています"

Section 2:
  "こんな課題を抱えていませんか？"
  Card 1: "人手不足" + short text
  Card 2: "データが活かせない" + short text
  Card 3: "季節による売上の波" + short text

Section 3:
  "あなたの経営に合うプランがあります"
  Card 1: "スタンダードプラン" / "月額 5 万円" / short description
  Card 2: "プロフェッショナルプラン" / "個別見積" / short description
  Card 3: "AI Suite Server プラン" / "¥1,965,000（税別・一式）" / short description
  Link: "サービスの詳細を見る →"

Section 4:
  "AI.LandBase が選ばれる理由"
  Column 1: "価格をすべて公開しています"
  Column 2: "沖縄県北部に拠点を置いています"
  Column 3: "システム導入だけで終わりません"

Section 5:
  "私たちが最初のユーザーです"
  Body text about Ikigai Stay
  Link: "会社案内を見る →"

Section 6:
  "まずは、ご相談からはじめませんか"
  3 buttons: "サービスについて相談したい" / "宿泊税対応について聞きたい" / "その他のお問い合わせ"

Footer:
  "© 2025 株式会社 AI.LandBase"
```

### 8. Constraints

- 人物の顔写真は使用しない（代表者写真は Phase 4 時点で未素材のためプレースホルダ）
- 赤色・オレンジ色をプライマリに使わない
- グラデーションは控えめに（使う場合は微妙なもののみ）
- イラストを使う場合はフラットかセミフラットスタイル（3D・アイソメトリック不可）
- テキストは日本語表記

### 9. Quality

medium（方向性確認 + 調整ベース）

### 10. Final prompt（英語）

```
Create a full-page corporate website mockup for AI.LandBase (desktop, 1440px wide).

This is a Japanese AI company based in northern Okinawa that provides AI-powered management support for tourism businesses (hotels, restaurants, tour companies).

Page structure (top to bottom):
1. STICKY HEADER: Logo "AI.LandBase" left, nav links "サービス" "会社案内" center-right, CTA button "お問い合わせ" far right
2. HERO (full-bleed background): Left-aligned headline "沖縄の観光業に、AI という伴走者を。" with 3-line subcopy below, blue CTA button "メールで相談する", subtle text "どんなご相談でもお待ちしています". Right side: abstract visual placeholder suggesting Okinawa nature/hospitality
3. PAIN POINTS section: Heading "こんな課題を抱えていませんか？" with 3 columns, each with icon + title ("人手不足" / "データが活かせない" / "季節による売上の波") + 2-line description
4. SERVICE OVERVIEW: Heading "あなたの経営に合うプランがあります" with 3 cards showing plan name + PRICE IN BOLD LARGEST ("月額 5 万円" / "個別見積" / "¥1,965,000") + description + link "サービスの詳細を見る →"
5. DIFFERENTIATORS: Heading "AI.LandBase が選ばれる理由" with 3 columns, icon + title + description ("価格をすべて公開しています" / "沖縄県北部に拠点を置いています" / "システム導入だけで終わりません")
6. PROOF section: Heading "私たちが最初のユーザーです" with text left, photo placeholder right (labeled "Ikigai Stay"), link "会社案内を見る →"
7. CTA section (full-width background): Heading "まずは、ご相談からはじめませんか" with 3 mailto buttons
8. FOOTER: Logo, 4-column sitemap, copyright "© 2025 株式会社 AI.LandBase"

Visual style: Clean, professional, generous whitespace. Primary color: deep teal or navy. Secondary: warm sand/earth tone. Accent: single color for CTA buttons. Background: off-white. Sans-serif Japanese typography. No tropical clichés, no aggressive gradients, no dark mode. Modern Okinawa identity — natural light, calm sophistication.

Layout: max-width 1200px content wrapper, 24px gutters, full-bleed only on hero and CTA backgrounds. All text in Japanese.

Quality: medium.
```

---

## プロンプト 2: トップページ（モバイル 375px）

### 1. Deliverable

トップページのモバイルビュー（375px 幅）フルページモックアップ

### 2–4. (共通ブリーフ + プロンプト 1 と同一)

### 5. Composition

```
[Sticky Header: Logo | Hamburger ☰ ]

[Hero - Full bleed, single column]
  Catchcopy (large)
  Subcopy
  CTA button (full-width)
  Sub text

[課題提起 - Single column stack]
  Icon + Heading + Text × 3 (vertical stack)

[サービス概要 - Single column card stack]
  Card × 3 (vertical stack, price prominent)
  Link

[強み・差別化 - Single column stack]
  Icon + Heading + Text × 3 (vertical stack)

[実証紹介 - Single column]
  Photo placeholder (full width)
  Text block
  Link

[CTA - Single column]
  Heading + Text
  3 buttons (full-width, vertical stack)

[Footer - Single column]
  Logo + Links + Copyright
```

### 6. Layout contract

```
viewport:          375px
page wrapper:      full width, 16px horizontal padding
gutter:            16px
full-bleed:        hero background, CTA section background
columns:           single column throughout
horizontal scroll: none
hero:              must fit above the fold (first viewport height)
CTA buttons:       min 44px tap target height
```

### 7. Exact in-image text

（プロンプト 1 と同一）

### 8. Constraints

（プロンプト 1 と同一 + 以下追加）
- ハンバーガーメニューはアイコンのみ表示（展開状態は不要）
- CTA ボタンは全幅、十分なタップ領域（44px 以上）
- ヒーローは最初のビューポート（約 667px 高）に収める

### 9. Quality

medium

### 10. Final prompt（英語）

```
Create a full-page MOBILE mockup (375px wide) of the AI.LandBase corporate website top page.

This is the responsive mobile version of the desktop mockup. Same content, adapted for single-column mobile layout.

Page structure (top to bottom):
1. STICKY HEADER: Logo "AI.LandBase" left, hamburger menu icon right (closed state only)
2. HERO (full-bleed, MUST FIT ABOVE THE FOLD ~667px height): Large headline "沖縄の観光業に、AI という伴走者を。", subcopy below, full-width CTA button "メールで相談する", sub text "どんなご相談でもお待ちしています"
3. PAIN POINTS: Heading "こんな課題を抱えていませんか？", 3 items stacked vertically (icon + title + description each)
4. SERVICE OVERVIEW: Heading "あなたの経営に合うプランがあります", 3 cards stacked vertically (plan name + PRICE BOLD LARGE + description), link "サービスの詳細を見る →"
5. DIFFERENTIATORS: Heading "AI.LandBase が選ばれる理由", 3 items stacked vertically
6. PROOF: Heading "私たちが最初のユーザーです", photo placeholder full-width, text, link
7. CTA (full-width background): Heading "まずは、ご相談からはじめませんか", 3 full-width buttons stacked vertically
8. FOOTER: Logo, links stacked, copyright

Visual style: Same as desktop — deep teal/navy primary, warm earth secondary, off-white background, clean sans-serif Japanese typography. Generous vertical spacing between sections.

Layout: 375px viewport, 16px horizontal padding, single column, no horizontal scroll. All CTA buttons minimum 44px height for touch targets. All text in Japanese.

Quality: medium.
```

---

## プロンプト 3: サービスページ（デスクトップ 1440px）

### 1. Deliverable

サービスページ（`/services`）フルページモックアップ（デスクトップ 1440px 幅）

### 2. Audience

（共通ブリーフ参照。特にペルソナ A・B がプランを比較検討する場面）

### 3. Message

Phase 3 コピーから引用（`copy/services.md`）:
- ページヒーロー: 「サービス」+リード文
- プラン比較表: 3プランの価格・特徴・対象を一覧比較
- 各プラン詳細: スタンダード / プロフェッショナル / AI Suite Server
- スポット発注: 料金表
- AI Suite 10ツール一覧: 業種タグ付き
- CTA: 「プランについて、ご相談ください」

### 4. Visual concept

プラン比較表の価格を最も目立たせる。AI Suite 10ツールはカード形式で業種タグ（宿泊/飲食/共通）を視覚的に区別。全体的にトップページと同じトーンを維持。

### 5. Composition

```
[Sticky Header: same as top page]

[Page Hero - Subtle background]
  "サービス"
  Lead text

[Plan Comparison - 3 column table/cards]
  Header row: スタンダード | プロフェッショナル | AI Suite Server
  Price row (LARGEST, BOLDEST): 月額 5 万円 | 個別見積 | ¥1,965,000
  Features rows: 形態, こんな方に, AI Suite, 面談・サポート, 主な対象業種
  CTA button below

[Standard Plan Detail]
  Heading + Description + Service list + Target industries

[Professional Plan Detail]
  Heading + Description + Service list

[AI Suite Server Plan Detail]
  Heading + Description + Included items + Use cases + Subsidy note + LP link
  CTA button

[Spot Services]
  Heading + Description + Price table (4 rows)

[AI Suite 10 Tools - Card grid (2×5 or responsive)]
  Section heading: "LandBase AI Suite — 10 のツールで経営を支える"
  Lead text
  Each card: Tool name + Subtitle + Industry tag badge + 1-2 line description
  Tag badges: 宿泊 (blue-ish), 飲食 (green-ish), 共通 (gray/neutral)

[CTA section]
  "プランについて、ご相談ください"
  Subtitle + 3 mailto buttons

[Footer: same as top page]
```

### 6. Layout contract

```
page wrapper:      max-width 1200px, centered
content width:     800px for body text
gutter:            24px
full-bleed:        page hero background, CTA section background
columns:           comparison table 3col, tool cards 2col or 3col
horizontal scroll: none
```

### 7. Exact in-image text

```
Header: (same as top page)

Page Hero:
  "サービス"
  "AI.LandBase は、沖縄の観光業に特化した AI ツールと経営支援を提供しています。
   事業の規模やご要望に合わせて、3 つのプランからお選びいただけます。"

Comparison Table:
  Headers: "スタンダード" / "プロフェッショナル" / "AI Suite Server"
  Prices: "月額 5 万円" / "個別見積" / "¥1,965,000（税別・一式）"
  Row labels: "形態", "こんな方に", "AI Suite", "面談・サポート", "主な対象業種"
  Button: "メールで相談する"

Standard Detail:
  "スタンダードプラン — 月額 5 万円"
  Service list (4 items)
  "対象業種: 宿泊施設 / 飲食店 / ツアー・アクティビティ会社"

Professional Detail:
  "プロフェッショナルプラン — 個別見積"
  Service list (6 items)

AI Suite Server Detail:
  "AI Suite Server プラン — ¥1,965,000（税別・一式）"
  Included items (5 items)
  Use cases: "宿泊税対応" / "客室管理・収益最適化" / "経理自動化"
  Subsidy note: "沖縄県の補助金制度を活用できる場合があります..."
  Link: "宿泊税対応の詳細はこちら →"
  Button: "メールで相談する"

Spot Services:
  "スポット発注（施設管理代行）"
  Table: 清掃代行 4,500円/時間, リネン管理 625円/ベッド, 緊急顧客対応 5,000円/回, カスタムAI開発 別途見積

AI Suite 10 Tools:
  "LandBase AI Suite — 10 のツールで経営を支える"
  10 cards with names, subtitles, and tags:
    AnalyticsAI [共通], OptimaPriceAI [宿泊], ConciergeAI [共通],
    PersonalizeAI [共通], ReputationAI [共通], MarketingAI [共通],
    OperationAI [共通], AccountingAI [飲食][共通], InventoryAI [飲食][共通],
    StaffEduAI [共通]

CTA:
  "プランについて、ご相談ください"
  3 buttons

Footer: (same as top page)
```

### 8. Constraints

（プロンプト 1 と同一 + 以下追加）
- プラン比較表で**価格が最も大きく目立つ**要素にする
- AI Suite ツールの業種タグは色で視覚的に区別する（宿泊 / 飲食 / 共通）
- 補助金注記は控えめに（「実質0円」とは書かない）

### 9. Quality

medium

### 10. Final prompt（英語）

```
Create a full-page SERVICES PAGE mockup for AI.LandBase corporate website (desktop, 1440px wide).

This is the /services page showing all plans, pricing, and the AI Suite tool catalog.

Page structure (top to bottom):
1. STICKY HEADER: Same as top page (Logo, nav, CTA button)
2. PAGE HERO (subtle background): Title "サービス" + 2-line lead text about AI tools and plans
3. PLAN COMPARISON TABLE (3 columns): Headers "スタンダード" / "プロフェッショナル" / "AI Suite Server". PRICES MUST BE THE LARGEST, BOLDEST ELEMENT: "月額 5 万円" / "個別見積" / "¥1,965,000（税別・一式）". Rows for 形態, こんな方に, AI Suite, 面談・サポート, 主な対象業種. CTA button below.
4. STANDARD PLAN DETAIL: "スタンダードプラン — 月額 5 万円", description, 4-item service list, target industries
5. PROFESSIONAL PLAN DETAIL: "プロフェッショナルプラン — 個別見積", description, 6-item service list
6. AI SUITE SERVER PLAN DETAIL: "AI Suite Server プラン — ¥1,965,000（税別・一式）", description, 5 included items, 3 use cases (宿泊税対応/客室管理/経理自動化), subsidy note (subtle, not "free"), LP link "宿泊税対応の詳細はこちら →", CTA button
7. SPOT SERVICES: "スポット発注（施設管理代行）", description, 4-row price table
8. AI SUITE 10 TOOLS (card grid, 2 or 3 columns): Section heading "LandBase AI Suite — 10 のツールで経営を支える", lead text, 10 cards each with tool name + subtitle + industry tag badge + description. Tags use distinct colors: 宿泊 (teal/blue badge), 飲食 (green badge), 共通 (neutral/gray badge)
9. CTA SECTION (full-width background): "プランについて、ご相談ください" + 3 mailto buttons
10. FOOTER: Same as top page

Visual style: Same brand system as top page — deep teal/navy primary, warm earth secondary, off-white background. Price numbers are the visual hero of this page. Clean table/card design. Industry tag badges should be small, colored pills/badges.

Layout: max-width 1200px wrapper, 24px gutters. All text in Japanese.

Quality: medium.
```

---

## 使い方

### Step 1: 共通ブリーフを渡す

ChatGPT の新しい会話で、まず「共通ブリーフ」セクションのテキストブロックを貼り付けてください。ロゴ画像（`public/logo/logo.png`）も同時にアップロードしてください。

### Step 2: プロンプトを順番に投入

1. **プロンプト 1**（トップ・デスクトップ）の「10. Final prompt」を投入
2. 結果を確認し、方向性が良ければ → `top-desktop.png` として保存
3. **プロンプト 2**（トップ・モバイル）を投入 → `top-mobile.png`
4. **プロンプト 3**（サービス・デスクトップ）を投入 → `services-desktop.png`

### Step 3: 調整

方向性の修正が必要な場合は、以下のような追加指示で調整:

- 「色をもう少し暖かくして」
- 「ヒーローの余白を増やして」
- 「プラン比較表の価格をもっと大きくして」
- 「AI Suite ツールカードを3列グリッドに変えて」

### Step 4: 確定 → 格納

確定した PNG を `projects/ai-landbase-corp/mockups/` に以下の命名で保存:

| ファイル名 | 内容 |
|-----------|------|
| `top-desktop.png` | トップページ デスクトップ 1440px |
| `top-mobile.png` | トップページ モバイル 375px |
| `services-desktop.png` | サービスページ デスクトップ 1440px |
| `about-desktop.png` | （Should Have）会社案内ページ デスクトップ |
| `contact-desktop.png` | （Nice to Have）お問い合わせページ デスクトップ |
