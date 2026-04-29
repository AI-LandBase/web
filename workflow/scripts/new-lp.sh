#!/bin/bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
WORKFLOW_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
REPO_ROOT="$(cd "$WORKFLOW_ROOT/.." && pwd)"
TEMPLATE_DIR="$WORKFLOW_ROOT/templates"
PROJECTS_DIR="$REPO_ROOT/projects"

usage() {
  cat <<'USAGE'
Usage: ./workflow/scripts/new-lp.sh <project-name>

新規LP案件のディレクトリ構造をスキャフォールドします。

例:
  ./workflow/scripts/new-lp.sh my-saas-lp
  ./workflow/scripts/new-lp.sh client-corp-2026

生成されるディレクトリ構造:
  projects/<project-name>/
    ├── BRIEF.md                  ← Phase 0: 穴埋め式ブリーフ
    ├── CLAUDE.md                 ← 案件固有の Claude Code 指示
    ├── research/                 ← Phase 1: 調査成果物
    │   ├── 01-product-analysis.md
    │   ├── 02-competitor-lp-report.md
    │   ├── 03-persona.md
    │   └── 04-messaging-brief.md
    ├── mockups/                  ← Phase 2: image2 モックアップ
    │   └── .gitkeep
    ├── design/                   ← Phase 3: Claude Design 成果物
    │   ├── handoff/
    │   │   ├── 00-brief.md
    │   │   ├── 10-design-principles.md
    │   │   ├── 20-design-tokens.yaml
    │   │   ├── 25-layout-contract.yaml
    │   │   ├── 30-component-spec.md
    │   │   ├── 40-page-structure.md
    │   │   ├── 50-acceptance-criteria.md
    │   │   └── 60-implementation-notes.md
    │   └── DESIGN.md
    ├── qa/                       ← Phase 5: QA
    │   └── checklist.md
    └── image2-prompts/           ← Phase 2: プロンプト記録
        └── .gitkeep
USAGE
  exit 1
}

if [ $# -lt 1 ]; then
  usage
fi

PROJECT_NAME="$1"

if [[ ! "$PROJECT_NAME" =~ ^[a-zA-Z0-9_-]+$ ]]; then
  echo "エラー: プロジェクト名は英数字・ハイフン・アンダースコアのみ使用可能です。"
  exit 1
fi
PROJECT_DIR="$PROJECTS_DIR/$PROJECT_NAME"

if [ -d "$PROJECT_DIR" ]; then
  echo "エラー: $PROJECT_DIR は既に存在します。"
  exit 1
fi

echo "=== LP案件をスキャフォールド: $PROJECT_NAME ==="

mkdir -p "$PROJECT_DIR"/{research,mockups,design/handoff,qa,image2-prompts}

cp "$TEMPLATE_DIR/BRIEF.md" "$PROJECT_DIR/BRIEF.md"
cp "$TEMPLATE_DIR/persona.md" "$PROJECT_DIR/research/03-persona.md"
cp "$TEMPLATE_DIR/messaging-brief.md" "$PROJECT_DIR/research/04-messaging-brief.md"
cp "$TEMPLATE_DIR/image2-prompt.md" "$PROJECT_DIR/image2-prompts/hero-prompt.md"
cp "$TEMPLATE_DIR/qa-checklist.md" "$PROJECT_DIR/qa/checklist.md"

touch "$PROJECT_DIR/research/01-product-analysis.md"
touch "$PROJECT_DIR/research/02-competitor-lp-report.md"
touch "$PROJECT_DIR/mockups/.gitkeep"
touch "$PROJECT_DIR/image2-prompts/.gitkeep"

for f in 00-brief.md 10-design-principles.md 20-design-tokens.yaml 25-layout-contract.yaml 30-component-spec.md 40-page-structure.md 50-acceptance-criteria.md 60-implementation-notes.md; do
  touch "$PROJECT_DIR/design/handoff/$f"
done

cat > "$PROJECT_DIR/design/DESIGN.md" <<'DESIGN'
# DESIGN.md — 見た目契約の要約

> Claude Design からの handoff bundle を要約したツール非依存のデザイン文書。
> handoff/ 配下の個別ファイルの正本が更新されたら、ここも同期してください。

## Design Tokens

<!-- 20-design-tokens.yaml の要約 -->

## Layout Contract

<!-- 25-layout-contract.yaml の要約 -->

## Component Rules

<!-- 30-component-spec.md の要約 -->

## Page Structure

<!-- 40-page-structure.md の要約 -->
DESIGN

cat > "$PROJECT_DIR/CLAUDE.md" <<CLAUDE
# LP Implementation Context — $PROJECT_NAME

## Stack

- Framework: Next.js 15 (App Router)
- CSS: Tailwind CSS v4
- Components: src/components/

## Design References

- Design tokens: design/handoff/20-design-tokens.yaml
- Layout contract: design/handoff/25-layout-contract.yaml
- Component spec: design/handoff/30-component-spec.md
- Acceptance criteria: design/handoff/50-acceptance-criteria.md

## Rules

- Use design tokens from design/handoff/20-design-tokens.yaml
- Do not introduce new CSS variables not defined in tokens
- Hero must render above the fold on 1440px and 375px
- No horizontal scroll at any viewport width
- Follow page structure defined in design/handoff/40-page-structure.md
- Implement sections in order: hero → features → social proof → pricing → FAQ → CTA

## Implementation Entry Point

\`\`\`
> design/handoff/ 以下の仕様を読んで、
> このファイルのスタック設定に沿って LP を実装してください。
> まず 50-acceptance-criteria.md を確認し、
> 各セクションを順番に実装してください。
\`\`\`
CLAUDE

echo ""
echo "✓ スキャフォールド完了: $PROJECT_DIR"
echo ""
echo "次のステップ:"
echo "  1. $PROJECT_DIR/BRIEF.md を埋める（Phase 0）"
echo "  2. Claude Code で調査を開始する（Phase 1）"
echo "     cd $PROJECT_DIR && claude"
echo '     > "BRIEF.md を読んで、research/ 配下に調査結果をまとめてください"'
