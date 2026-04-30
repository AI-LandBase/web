# LP制作 標準ワークフロー

Claude Code → ChatGPT image2 → Claude Design → Claude Code の3ツール連携によるLP制作手順。

---

## 前提条件

- [Claude Code CLI](https://docs.anthropic.com/en/docs/claude-code) がインストール済みであること

## クイックスタート

```bash
# 1. 新規LP案件をスキャフォールド
./workflow/scripts/new-lp.sh my-project

# 2. ブリーフを埋める
vim projects/my-project/BRIEF.md

# 3. Claude Code で調査開始
cd projects/my-project && claude
```

---

## Phase 0: インプット整理

**成果物**: `projects/{name}/BRIEF.md`

LP制作を始める前に、BRIEF.md の全項目を埋める。このドキュメントが後続すべてのフェーズの基準になる。

- プロダクト概要
- ターゲット仮説
- 訴求ゴール（CTA / KPI）
- ブランドカラー・禁止事項
- 参照競合（3社程度）
- 公開先・技術スタック

---

## Phase 1: 調査・ペルソナ設計（Claude Code）

**成果物**: `projects/{name}/research/`

### Step 1-1: 自社プロダクト分析

```
プロンプト例:
"BRIEF.md を読んで、このプロダクトが解決する課題を3つ挙げてください。
想定ユーザーが直面しているペインポイントを列挙してください。
結果を research/01-product-analysis.md に保存してください。"
```

### Step 1-2: 競合LP調査

```
プロンプト例:
"BRIEF.md の参照競合URLのLPを解析してください。
メッセージング、CTA設計、ビジュアルスタイル、ターゲット層シグナル、
差別化できる余白の観点でまとめてください。
結果を research/02-competitor-lp-report.md に保存してください。"
```

### Step 1-3: ペルソナ生成

```
プロンプト例:
"01-product-analysis.md と 02-competitor-lp-report.md を統合して、
research/03-persona.md のテンプレートに沿ってペルソナを1〜3パターン生成してください。"
```

### Step 1-4: メッセージングブリーフ

```
プロンプト例:
"ペルソナと競合分析をもとに、
research/04-messaging-brief.md のテンプレートに沿って
セクション別のコピー方針を策定してください。"
```

---

## Phase 2: モックアップ生成（ChatGPT image2）

**成果物**: `projects/{name}/mockups/`

### 基本方針

- image2 は「完成絵」ではなく**視覚ブリーフ**として使う
- `image2-prompts/` にプロンプトテンプレートあり（10項目構造）
- `persona.md` と `messaging-brief.md` から直接引用して埋める

### 反復手順

1. Quality: low で基礎形を出し、方向性を確認
2. 気に入った要素を特定し「Xだけ変えて他はそのまま」と差分編集
3. 最終候補を medium〜high で出力
4. 採用版を `mockups/` に保存（ファイル名にバージョン付与）

### Layout contract を忘れない

ブリーフの項目6「Layout contract」を明示しないと、Phase 3 で実装ルールが不明確になる。wrapper幅・gutter・レスポンシブカラム数まで指定すること。

---

## Phase 3: 設計システムへの正規化（Claude Design）

**成果物**: `projects/{name}/design/handoff/`

### 手順

1. モックアップ PNG + messaging-brief.md を Claude Design にアップロード
2. `workflow/templates/claude-design-handoff.md` のプロンプトで設計規則セットを生成
3. 出力をレビューし差分修正
4. handoff bundle を `design/handoff/` に配置

### Export 形式

| 用途 | 出力形式 |
|------|---------|
| 既存リポジトリへの実装 | **Claude Code handoff bundle**（推奨） |
| 即日公開 | Standalone HTML |
| チーム共有 | Canva or PPTX |
| デザイン文書化 | PDF |

### 注意

- 探索的な試行は Phase 2（image2）側で終わらせてから入ること
- 画像の「コピー」ではなく「再利用可能な設計規則への変換」を指示する

---

## Phase 4: コード実装（Claude Code）

**成果物**: Next.js App Router でのLP実装

### 前提

- `design/handoff/` に handoff bundle が配置済み
- `projects/{name}/CLAUDE.md` に案件固有の実装コンテキストが記載済み

### 実装開始

```
プロンプト例:
"design/handoff/ 以下の仕様を読んで、
CLAUDE.md のスタック設定に沿って LP を実装してください。
まず 50-acceptance-criteria.md を確認し、
各セクションを順番に実装してください。"
```

### 実装順序

1. Design tokens を Tailwind 設定に反映
2. Layout contract をベースレイアウトに実装
3. セクション順に実装: hero → features → social proof → pricing → FAQ → CTA
4. レスポンシブ対応（375px / 768px / 1440px）
5. CTA トラッキング設置

---

## Phase 5: 検証・最適化

**成果物**: `projects/{name}/qa/checklist.md`

### QAチェックリスト

`qa/checklist.md` の全項目を確認する。主要項目：

- レスポンシブ表示（375px / 768px / 1440px）
- 横スクロールなし
- Core Web Vitals（LCP < 2.5s）
- アクセシビリティ（alt、コントラスト比）
- CTA トラッキング発火
- ペルソナ整合性

### ABテスト

ペルソナが複数ある場合は、訴求コピーとヒーロービジュアルのABテストを設計する。

---

## ディレクトリ構成

```
web/
├── workflow/
│   ├── README.md              ← この手順書
│   ├── templates/             ← 各フェーズのテンプレート
│   │   ├── BRIEF.md           ← Phase 0
│   │   ├── persona.md         ← Phase 1
│   │   ├── messaging-brief.md ← Phase 1
│   │   ├── image2-prompt.md   ← Phase 2
│   │   ├── claude-design-handoff.md ← Phase 3
│   │   └── qa-checklist.md    ← Phase 5
│   └── scripts/
│       └── new-lp.sh          ← スキャフォールドスクリプト
├── projects/                  ← LP案件ごとのディレクトリ
│   └── {project-name}/
├── CLAUDE.md                  ← リポジトリ全体の Claude Code 指示
├── Dockerfile.nextjs
├── compose.development.yaml
└── Makefile
```

---

## よくある失敗パターン

| 失敗 | 対策 |
|------|------|
| Claude Design で枠を使い切る | 探索は image2 側で完結させてから入る |
| 実装後にデザインが崩れる | image2 ブリーフで wrapper 幅・gutter まで明示する |
| ペルソナとコピーがズレる | messaging-brief.md を image2 プロンプトに直接引用する |
| コードが既存スタックと競合 | 案件 CLAUDE.md にスタック・禁止事項を明記する |
