# Claude Design Handoff プロンプト — Phase 3

> ChatGPT image2 で作成したモックアップ PNG を Claude Design にアップロードする際に、
> このプロンプトをベースに指示を出してください。
> 画像を「そのままコピー」ではなく「再利用可能な設計規則への変換」を行います。

---

## 基本 Handoff プロンプト

以下をそのまま Claude Design に投入してください（messaging-brief.md も同時にアップロード）。

```
Use the uploaded image as a visual direction reference,
not as a literal final specification.

Your job is to infer a reusable visual system from the image
and turn it into a coherent, production-friendly design package.

Normalize it into:
- design principles
- design tokens (colors, typography, spacing, radii, shadows)
- layout contract
- component rules
- page structure (section order and content)
- acceptance criteria
- implementation notes for Next.js 15 + Tailwind CSS v4

Make the layout contract explicit:
- target viewport assumptions (375px / 768px / 1440px)
- page wrapper width (max-width)
- content width / reading measure
- gutter
- full-bleed sections vs constrained inner content
- responsive column behavior
- horizontal scroll rules (must be: none)

Output the handoff bundle as structured markdown files:
- 10-design-principles.md
- 20-design-tokens.yaml
- 25-layout-contract.yaml
- 30-component-spec.md
- 40-page-structure.md
- 50-acceptance-criteria.md
- 60-implementation-notes.md
```

---

## 作業手順

### Step 3-1: ビジュアルシステムの正規化

1. モックアップ PNG + messaging-brief.md を同時にアップロード
2. 上記プロンプトで設計規則セットを生成
3. 出力をレビューし差分修正（例: 「コンポーネントルールにボタンの hover state を追加して」）

### Step 3-2: プロトタイプの反復

Claude Design の反復は利用枠を消費するため、以下の順で効率的に進める：

1. デザインシステムの確認（tokens, colors, typography）
2. ページ構造の生成（hero → features → social proof → pricing → FAQ → CTA）
3. コンポーネント調整（ボタン・カード・ナビ）
4. レスポンシブ確認
5. コピーの最終調整

### Step 3-3: Export

| 用途 | 出力形式 |
|------|---------|
| 既存リポジトリへの実装 | **Claude Code handoff bundle**（推奨） |
| 即日公開（プリローンチ） | Standalone HTML |
| チーム共有・承認取得 | Canva or PPTX |
| デザイン文書化 | PDF |

---

## Handoff Bundle の配置先

```
design/
  handoff/
    00-brief.md              ← BRIEF.md のコピー
    10-design-principles.md
    20-design-tokens.yaml
    25-layout-contract.yaml
    30-component-spec.md
    40-page-structure.md
    50-acceptance-criteria.md
    60-implementation-notes.md
  DESIGN.md                  ← 見た目契約の要約（ツール非依存）
```
