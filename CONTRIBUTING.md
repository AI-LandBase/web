# 開発ガイド

> **対象読者**: 人間の開発者（コントリビューター）
> **目的**: プロジェクトへの貢献手順と開発規約
>
> プロジェクト固有の情報（セットアップ、アーキテクチャ、デプロイ等）は [README.md](README.md) を参照してください。

AI.LandBase コーポレートサイトへの貢献ありがとうございます。このガイドでは、Issue 作成から PR までの開発フローと基準をまとめます。

---

## ドキュメントの役割分担

このプロジェクトでは、3つのドキュメントファイルで情報を整理しています。更新時はこの役割分担を維持してください。

| コンテンツ | README.md | CONTRIBUTING.md | CLAUDE.md |
|-----------|----------|----------------|-----------|
| プロジェクト概要 | ◎ 詳細 | - | ○ 簡潔 |
| 技術スタック | ◎ | - | ○ |
| セットアップ | ◎ | - | ○ 参照 |
| アーキテクチャ | ◎ | - | ○ 参照 |
| 本番デプロイ | ◎ | - | - |
| Issue作成 | - | ◎ | ○ 参照 |
| Gitワークフロー | - | ◎ | ○ 参照 |
| コミット規約 | - | ◎ | ○ 参照 |
| PR作成 | - | ◎ | ○ 参照 |
| コーディング規約 | - | ◎ | ○ 参照 |
| テスト方針 | - | ◎ | ○ 参照 |
| レビュー基準 | - | ◎ | ○ 参照 |
| トラブルシューティング | ◎ | - | ○ 参照 |

**凡例:**
- ◎ 詳細に記載
- ○ 簡潔に記載または参照
- \- 含まない

---

## 目次

- [Issue 作成ガイドライン](#issue-作成ガイドライン)
- [Git ワークフロー](#git-ワークフロー)
- [コミット規約](#コミット規約)
- [PR 作成フロー](#pr-作成フロー)
- [コーディング規約](#コーディング規約)
- [テスト方針](#テスト方針)
- [コードレビュー基準](#コードレビュー基準)

---

## Issue 作成ガイドライン

新機能開発やバグ修正の前に、必ず GitHub Issue を作成してください。Issue は設計書であり、レビューの基準です。

### Issue テンプレート

```markdown
## 📋 概要

[1-2文で変更内容を簡潔に説明]

関連issue: [関連するIssue番号があれば記載]

---

## 🎯 背景・課題

### 現状の問題
- [現在どのような問題があるか]
- [なぜこの変更が必要なのか]

### 課題
- [具体的な課題1]
- [具体的な課題2]
- [具体的な課題3]

---

## 🎯 目的・ゴール

### 主目的
[この変更で達成したいこと]

### 副次的目標
- [追加で達成したいこと1]
- [追加で達成したいこと2]

---

## 📖 要件定義

### 機能要件

#### FR-1: [機能名1]
- [詳細な要件説明]
- [実装内容]

#### FR-2: [機能名2]
- [詳細な要件説明]
- [実装内容]

### 非機能要件

#### NFR-1: パフォーマンス
- [パフォーマンス要件]

#### NFR-2: セキュリティ
- [セキュリティ要件]

#### NFR-3: 保守性
- [保守性要件]

---

## 🛠️ 技術仕様

### アーキテクチャ

[システム構成図、フロー図など]

### 実装詳細

[具体的な実装方法、コード例など]

---

## ✅ 受け入れ基準

### Must Have
- [ ] [必須要件1]
- [ ] [必須要件2]

### Should Have
- [ ] [推奨要件1]
- [ ] [推奨要件2]

### Nice to Have
- [ ] [オプション要件1]
- [ ] [オプション要件2]

---

## ⏱️ 工数見積

### タスク分解

| タスク | 内容 | 見積工数 |
|--------|------|----------|
| 設計 | [設計内容] | X.Xh |
| 実装 | [実装内容] | X.Xh |
| テスト | [テスト内容] | X.Xh |
| ドキュメント更新 | [ドキュメント更新内容] | X.Xh |

合計見積: X時間（X営業日）

---

## 🧪 テスト計画

### テストケース

#### TC-1: [テストケース名1]
- 手順:
  1. [手順1]
  2. [手順2]
- 期待結果: [期待される結果]

#### TC-2: [テストケース名2]
- 手順:
  1. [手順1]
  2. [手順2]
- 期待結果: [期待される結果]

---

## 📈 次のステップ

[この機能完了後の展開、将来の拡張など]

---

## 📚 関連資料

- [関連ドキュメント、外部リンクなど]

---

## ✅ Definition of Done

- [ ] [完了条件1]
- [ ] [完了条件2]
- [ ] すべてのテストケース合格
- [ ] ドキュメント更新完了
- [ ] コードレビュー承認
- [ ] 本番環境デプロイ・検証完了

---

工数見積: X時間（X営業日）
優先度: High/Medium/Low
難易度: High/Medium/Low
依存関係: [依存するIssueや前提条件]
```

### 工数見積ガイドライン

#### タスク分解の基本

| タスク | 内容 | 一般的な割合 |
|--------|------|------------|
| **設計** | 技術仕様の詳細化、デザイン検討 | 15-20% |
| **実装** | コーディング、デバッグ | 40-50% |
| **テスト** | ブラウザ確認、レスポンシブ検証 | 20-25% |
| **ドキュメント更新** | README、CONTRIBUTING等の更新 | 10-15% |

#### 見積単位

- **時間単位**: 0.5時間刻み
- **営業日換算**: 1営業日 = 8時間
- **最小単位**: 0.5時間
- **最大単位**: 16時間（2営業日）

推奨: 16時間を超える場合は、タスクを分割してください。

#### 確実性レベル

| レベル | 説明 | バッファ | 例 |
|--------|------|---------|-----|
| **高確実性** | 過去に類似実装あり、よく知っている技術 | +10% | テキスト修正、既存スタイルの微調整 |
| **中確実性** | 一般的な実装パターン、ある程度経験あり | +25% | 新しいセクション追加、レスポンシブ対応 |
| **低確実性** | 初めての技術、複雑な仕様 | +50% | 新しいJS機能、外部API連携 |

#### 見積例

##### 難易度: Low（簡単な修正・追加）
- 例: テキスト変更、スタイル微調整、軽微なバグ修正
- 見積: 2-4時間（0.25-0.5営業日）
- 内訳:
  - 設計: 0.5h
  - 実装: 1.5h
  - テスト: 0.5h
  - ドキュメント: 0.5h

##### 難易度: Medium（通常の機能開発）
- 例: 新しいセクション追加、フォーム実装、アニメーション追加
- 見積: 8-16時間（1-2営業日）
- 内訳:
  - 設計: 2h
  - 実装: 6h
  - テスト: 3h
  - ドキュメント: 1h

##### 難易度: High（複雑な機能・新技術導入）
- 例: 外部API連携、複雑なインタラクション、大規模リデザイン
- 見積: 24-40時間（3-5営業日）
- 内訳:
  - 設計: 6h
  - 実装: 18h
  - テスト: 10h
  - ドキュメント: 2h

#### バッファの考え方

**基本ルール**: 見積工数に確実性レベルに応じたバッファを追加

例: 実装8時間、確実性レベル「中」の場合
```
基本見積: 8h
バッファ: 8h × 25% = 2h
最終見積: 10h
```

推奨: 全体に+25%のバッファを追加することで、予期せぬ問題に対応できます。

#### 優先度と難易度の定義

| 優先度 | 説明 | 対応期限の目安 |
|--------|------|---------------|
| **High** | ビジネスクリティカル、ブロッカー | 即座に着手 |
| **Medium** | 重要だが緊急ではない | 1-2週間以内 |
| **Low** | あると便利、改善項目 | 時間があるとき |

| 難易度 | 説明 | 見積工数目安 |
|--------|------|-------------|
| **Low** | 簡単な修正、既知の実装パターン | 2-4時間 |
| **Medium** | 通常の機能開発、一般的な複雑さ | 8-16時間 |
| **High** | 複雑な実装、新技術、大規模変更 | 24時間以上 |

---

## Git ワークフロー

このプロジェクトは GitHub Flow を採用します。

### 🚨 重要な原則：ブランチを作ってから作業する

**作業を開始する前に、必ず以下の手順を守ってください：**

#### ❌ BAD: main ブランチで直接作業

```bash
# これは絶対にやってはいけません！
git checkout main
# main ブランチで直接ファイルを編集...
git add .
git commit -m "fix: 修正"
git push origin main  # ❌ main へ直接プッシュ
```

#### ✅ GOOD: 正しい手順

```bash
# 1. Issue を作成（例: Issue #42 を作成）

# 2. main ブランチを最新化
git checkout main
git pull origin main

# 3. 作業用ブランチを作成
git checkout -b feature/42-new-feature

# 4. 実装作業
# ファイルを編集...

# 5. コミット
git add .
git commit -m "feat: 新機能を追加 (issue#42)"

# 6. プッシュ
git push origin feature/42-new-feature

# 7. GitHub で PR を作成
```

#### ⚠️ 間違いに気づいた場合

**main ブランチで作業してしまった場合：**

```bash
# 方法1: 変更をまだコミットしていない場合
git stash                              # 変更を一時保存
git checkout -b feature/XX-fix         # 正しいブランチを作成
git stash pop                          # 変更を適用

# 方法2: すでにコミットしてしまった場合（プッシュ前）
git branch feature/XX-fix              # 現在の状態で新ブランチ作成
git reset --hard origin/main           # main を元に戻す
git checkout feature/XX-fix            # 新ブランチに切り替え
```

**main ブランチにプッシュしてしまった場合：**

すぐにチームに報告してください。revert が必要になる場合があります。

#### なぜこれが重要か？

1. **main ブランチの保護**
   - main は常に安定した状態を保つ必要があります
   - 自動デプロイされる可能性があります

2. **変更の追跡**
   - PR を通じてコードレビューが可能になります
   - 変更履歴が明確になります

3. **ロールバック**
   - 問題があった場合、簡単に元に戻せます
   - main ブランチは影響を受けません

4. **並行作業**
   - 複数の機能を同時に開発できます
   - 他のメンバーの作業と競合しません

### ブランチ命名規則

**フォーマット:**
```
<type>/<issue番号>-<機能名>
```

**Type 一覧:**

| Type | 用途 | 例 |
|------|------|-----|
| `feature/` | 新機能の追加 | `feature/57-contact-form` |
| `bugfix/` | バグ修正 | `bugfix/58-fix-mobile-menu` |
| `hotfix/` | 緊急修正（本番環境の問題） | `hotfix/59-critical-layout-fix` |
| `refactor/` | リファクタリング | `refactor/60-optimize-css` |
| `docs/` | ドキュメント更新 | `docs/61-update-readme` |

**良い例:**
```bash
feature/42-add-faq-section
bugfix/43-fix-pricing-toggle
docs/44-update-contributing
```

**悪い例:**
```bash
fix-bug              # ❌ Issue番号がない
feature-new          # ❌ 具体的な機能名がない
update               # ❌ typeとIssue番号がない
```

---

## コミット規約

[Conventional Commits](https://www.conventionalcommits.org/) に準拠します。

**フォーマット:**

```
<type>(<scope>): <subject> (issue#<番号>)

<body>（任意）
<footer>（任意）
```

**Type 一覧:**

| Type | 用途 | 例 |
|------|------|-----|
| `feat` | 新機能の追加 | `feat(hero): CTAセクションを追加` |
| `fix` | バグ修正 | `fix(nav): モバイルメニューの表示を修正` |
| `docs` | ドキュメントのみの変更 | `docs: READMEを更新` |
| `refactor` | リファクタリング（機能変更なし） | `refactor(css): カスタムプロパティを整理` |
| `style` | コードスタイルの変更（機能に影響なし） | `style: インデント修正` |
| `chore` | ビルド・ツール・依存関係の変更 | `chore: デプロイ設定を更新` |
| `perf` | パフォーマンス改善 | `perf: 画像の遅延読み込みを追加` |

**Scope（任意）:**

| Scope | 説明 |
|-------|------|
| `hero` | ヒーローセクション |
| `nav` | ナビゲーション |
| `pricing` | 料金セクション |
| `css` | スタイル全般 |
| `js` | JavaScript全般 |

**良い例:**

```bash
feat(pricing): スポット料金の表示切替を追加 (issue#12)
fix(nav): スクロール時のヘッダー表示を修正 (issue#34)
docs: CONTRIBUTING.mdを追加 (issue#1)
refactor(css): メディアクエリを整理 (issue#45)
```

**悪い例:**

```bash
update code          # ❌ typeがない、issue番号がない
fix bug              # ❌ 具体的な内容がない、issue番号がない
feat: 機能追加       # ❌ 具体的な内容がない、issue番号がない
```

### ❌ 禁止事項：AI生成メッセージの追加

**コミットメッセージには、AI（Claude Code、GitHub Copilot、Cursorなど）が生成したことを示すメッセージを追加しないでください。**

**禁止例:**

```bash
# ❌ これらのメッセージを追加してはいけません
feat(hero): 新セクションを追加 (issue#12)

🤖 Generated with Claude Code
Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
```

**理由:**
- コミット履歴はコードの変更内容を追跡するものであり、使用したツールを記録する場所ではありません
- AIツールはあくまで開発支援ツールであり、成果物の品質は開発者の責任です

---

## PR 作成フロー

### 1. 実装とコミット

```bash
git add .
git commit -m "feat(hero): 〇〇を実装 (issue#12)"
git push origin feature/12-xxx
```

### 2. PR テンプレート

```markdown
## 概要

[変更の概要を1-2文で説明]

## 変更内容

- [主要な変更点1]
- [主要な変更点2]

## テスト方法

- [ ] Chrome で表示確認
- [ ] Safari で表示確認
- [ ] モバイル（375px）で表示確認
- [ ] タブレット（768px）で表示確認

## チェックリスト

- [ ] レスポンシブ対応済み
- [ ] アクセシビリティ確認済み
- [ ] ドキュメント更新

Closes #XX
```

### ❌ 禁止事項：AI生成メッセージの追加

**PRの説明文には、AI（Claude Code、GitHub Copilot、Cursorなど）が生成したことを示すメッセージを追加しないでください。**

### 3. マージ戦略：Squash and Merge 推奨

このプロジェクトでは **Squash and Merge** を推奨します。

#### メリット

1. **綺麗な履歴**
   - main ブランチに `1 PR = 1 コミット` として記録
   - WIPコミットや修正コミットが残らない

2. **Conventional Commits との相性**
   - PR タイトルがそのままコミットメッセージになる

3. **Revert が簡単**
   - 機能単位で1コミットなので、revert が容易

#### マージ戦略の比較

| 戦略 | メリット | デメリット | 推奨度 |
|------|---------|-----------|-------|
| **Squash and Merge** | 綺麗な履歴、1PR=1コミット | 個別コミットの履歴が消える | ⭐⭐⭐ 推奨 |
| Merge commit | 完全な履歴保持 | マージコミットで履歴が複雑 | ⭐ 特殊なケースのみ |
| Rebase and merge | リニアな履歴 | コンフリクト解決が複雑 | ⭐⭐ 小規模変更 |

---

## コーディング規約

### HTML

#### 1. セマンティックHTML

適切なHTML要素を使用する：

```html
<!-- ✅ GOOD -->
<nav>...</nav>
<main>...</main>
<section>...</section>
<article>...</article>
<footer>...</footer>

<!-- ❌ BAD -->
<div class="nav">...</div>
<div class="main">...</div>
<div class="section">...</div>
```

#### 2. アクセシビリティ

ARIA属性とalt属性を適切に設定：

```html
<!-- ✅ GOOD -->
<button aria-label="メニューを開く" aria-expanded="false">
    <i class="fas fa-bars" aria-hidden="true"></i>
</button>
<img src="logo.png" alt="AI.LandBase企業ロゴ">

<!-- ❌ BAD -->
<div onclick="toggleMenu()">☰</div>
<img src="logo.png">
```

#### 3. インデント

4スペースインデントを使用：

```html
<section class="hero">
    <div class="hero-content">
        <h1>タイトル</h1>
    </div>
</section>
```

### CSS

#### 1. CSSカスタムプロパティの活用

色やサイズは `:root` で定義済みの変数を使用：

```css
/* ✅ GOOD */
.card {
    color: var(--dark-gray);
    padding: var(--spacing-lg);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-sm);
}

/* ❌ BAD */
.card {
    color: #343a40;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
```

#### 2. レスポンシブデザイン（モバイルファースト）

モバイル向けのスタイルをベースに、メディアクエリで拡張：

```css
/* ✅ GOOD: モバイルファースト */
.grid {
    grid-template-columns: 1fr;
}

@media (min-width: 768px) {
    .grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (min-width: 1024px) {
    .grid {
        grid-template-columns: repeat(4, 1fr);
    }
}

/* ❌ BAD: デスクトップファースト */
.grid {
    grid-template-columns: repeat(4, 1fr);
}

@media (max-width: 1024px) {
    .grid {
        grid-template-columns: repeat(2, 1fr);
    }
}
```

#### 3. ブレークポイント

プロジェクト標準のブレークポイントを使用：

| ブレークポイント | 用途 |
|----------------|------|
| `768px` | タブレット |
| `1024px` | デスクトップ |

#### 4. BEM風の命名

```css
/* ブロック */
.service-card { }

/* ブロック内の要素 */
.service-header { }
.service-content { }
.service-icon { }

/* 状態・バリエーション */
.service-card.featured { }
.pricing-content.active { }
```

### JavaScript

#### 1. 早期リターン

条件分岐はネストを避け、早期リターンを使用：

```javascript
// ✅ GOOD
function handlePricingToggle(button) {
    const planType = button.getAttribute('data-plan');
    if (!planType || planType === state.currentPricingPlan) return;

    state.currentPricingPlan = planType;
    showPricingPlan(planType);
}

// ❌ BAD
function handlePricingToggle(button) {
    const planType = button.getAttribute('data-plan');
    if (planType) {
        if (planType !== state.currentPricingPlan) {
            state.currentPricingPlan = planType;
            showPricingPlan(planType);
        }
    }
}
```

#### 2. DOM操作

要素の取得は `querySelector` / `querySelectorAll` を使用：

```javascript
// ✅ GOOD
const header = document.querySelector('.header');
const cards = document.querySelectorAll('.service-card');

// ❌ BAD
const header = document.getElementById('header');
const cards = document.getElementsByClassName('service-card');
```

#### 3. イベントリスナー

`addEventListener` を使用し、インラインハンドラは避ける：

```javascript
// ✅ GOOD
button.addEventListener('click', handleClick);

// ❌ BAD（HTML内）
// <button onclick="handleClick()">
```

#### 4. パフォーマンス

スクロール等の高頻度イベントには `throttle` / `debounce` を使用：

```javascript
// ✅ GOOD
window.addEventListener('scroll', throttle(handleScroll, 16));
window.addEventListener('resize', debounce(handleResize, 250));

// ❌ BAD
window.addEventListener('scroll', handleScroll);
```

---

## テスト方針

### ブラウザテスト

すべての変更は以下のブラウザ・画面サイズで動作確認してください。

#### 対象ブラウザ

| ブラウザ | バージョン |
|---------|-----------|
| Chrome | 最新版 |
| Safari | 最新版 |
| Firefox | 最新版 |
| Edge | 最新版 |

#### レスポンシブ確認

| 画面幅 | デバイス |
|--------|---------|
| 375px | スマートフォン |
| 768px | タブレット |
| 1024px | デスクトップ（小） |
| 1440px | デスクトップ（大） |

### チェック項目

- [ ] レイアウト崩れがないか
- [ ] テキストの折り返しが適切か
- [ ] ボタン・リンクがタップ/クリック可能か
- [ ] アニメーションが正常に動作するか
- [ ] モバイルメニューが正しく動作するか
- [ ] 料金プランの切り替えが正常か
- [ ] スムーズスクロールが正常か
- [ ] 「トップへ戻る」ボタンが正常か

---

## コードレビュー基準

### 基本チェック項目

- [ ] Issue の要件を満たしているか
- [ ] レスポンシブ対応されているか
- [ ] アクセシビリティが考慮されているか
- [ ] 命名が適切か
- [ ] パフォーマンス上の問題がないか
- [ ] セキュリティ上の懸念がないか

### セキュリティチェック

#### 1. XSS（クロスサイトスクリプティング）対策

**✅ DO: テキストコンテンツは `textContent` を使う**
```javascript
element.textContent = userInput;
```

**❌ DON'T: `innerHTML` にユーザー入力を直接挿入しない**
```javascript
element.innerHTML = userInput;  // ❌ XSSの危険
```

#### 2. 外部リソースの安全な読み込み

**✅ DO: 信頼できるCDNから読み込む**
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css">
```

**❌ DON'T: 不明なソースからスクリプトを読み込まない**
```html
<script src="https://unknown-source.com/script.js"></script>  <!-- ❌ -->
```

#### 3. 機密情報の保護

**✅ DO: APIキー等は環境変数やサーバーサイドで管理**

**❌ DON'T: HTMLやJSにハードコードしない**
```javascript
const apiKey = "sk_live_abc123xyz";  // ❌
```

### パフォーマンスチェック

#### 1. 画像の最適化

- 適切なフォーマット（WebP推奨）を使用
- `loading="lazy"` で遅延読み込み
- 適切なサイズの画像を使用

#### 2. CSSとJSの最適化

- 使用していないCSSルールを削除
- レンダリングブロックを最小限に
- イベントリスナーの適切な管理

#### 3. Web Vitals

- **LCP（Largest Contentful Paint）**: 2.5秒以内
- **CLS（Cumulative Layout Shift）**: 0.1以下
- **INP（Interaction to Next Paint）**: 200ms以内

---

## 質問・サポート

- Issue を作成して相談してください。
