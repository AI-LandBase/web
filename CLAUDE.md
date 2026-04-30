# CLAUDE.md

> **対象読者**: Claude Code（AI開発アシスタント）
> **目的**: Claude Codeが作業する際に参照する情報のクイックリファレンス

---

## 重要: ドキュメントの役割分担

作業を開始する前に、必ず以下のドキュメントを確認してください：

1. **[README.md](README.md)**: プロジェクト固有の技術情報
   - プロジェクト概要、技術スタック
   - 開発環境セットアップ（Docker、make コマンド）
   - アーキテクチャ（Docker構成、環境変数管理）
   - よく使うコマンド（詳細）
   - 本番環境デプロイ手順
   - プロジェクト構造
   - トラブルシューティング

2. **[CONTRIBUTING.md](CONTRIBUTING.md)**: 開発規約（**最重要**）
   - Issue作成ガイドライン
   - Gitワークフロー（ブランチ戦略）
   - コミット規約（Conventional Commits）
   - PR作成フロー
   - コーディング規約
   - テスト方針
   - コードレビュー基準（セキュリティチェック含む）

---

## プロジェクト概要

このプロジェクトは、**Next.jsプロジェクトを素早く立ち上げるためのDocker化されたboilerplate**です。

### 主要技術

- **Next.js**: 15 (App Router)
- **TypeScript**: 5.x
- **PostgreSQL**: 17-bookworm
- **Prisma**: ORM
- **NextAuth.js**: 認証
- **Docker & Docker Compose**
- **Tailwind CSS**

### 特徴

- Docker Composeによる開発環境
- 環境変数ファイルの明示的な管理（`.env.development` / `.env.production`）
- 本番環境デプロイ対応

詳細は [README.md](README.md) を参照してください。

---

## よく使うコマンド

### 初回セットアップ

```bash
# Next.js アプリ作成 + 定番パッケージ追加
make init

# コンテナ起動
make up
```

### 開発作業

```bash
# コンテナ起動
make up

# コンテナ停止
make down

# コンテナに入る
make bash

# 全コマンド確認
make help
```

### コンテナ内での作業

```bash
# Prisma Studio（データベースGUI）
npx prisma studio

# マイグレーション作成
npx prisma migrate dev --name <migration_name>

# テスト
npx vitest run

# Lint
npm run lint
```

詳細は [README.md](README.md) の「よく使うコマンド」セクションを参照してください。

---

## CONTRIBUTING.mdの活用方法

作業を開始する際は、**必ず [CONTRIBUTING.md](CONTRIBUTING.md) の手順を守ってください**：

### 必須手順

1. **Issue作成** → [Issue作成ガイドライン](CONTRIBUTING.md#issue-作成ガイドライン)
   - Issue番号を控える（例: #33）

2. **ブランチ作成** → [Gitワークフロー](CONTRIBUTING.md#git-ワークフロー)
   ```bash
   git checkout main
   git pull origin main
   git checkout -b <type>/<issue番号>-<機能名>
   # 例: git checkout -b feature/33-user-authentication
   ```

3. **実装作業**
   - コーディング規約に従う → [コーディング規約](CONTRIBUTING.md#コーディング規約)
   - セキュリティチェック必須 → [セキュリティチェック](CONTRIBUTING.md#セキュリティチェック)

4. **コミット** → [コミット規約](CONTRIBUTING.md#コミット規約)
   ```bash
   git add .
   git commit -m "<type>(<scope>): <subject> (issue#<番号>)"
   # 例: git commit -m "feat(auth): ログイン機能を追加 (issue#33)"
   ```

5. **プッシュとPR作成** → [PR作成フロー](CONTRIBUTING.md#pr-作成フロー)
   ```bash
   git push origin <branch-name>
   # GitHub でPRを作成
   ```

### 重要な禁止事項

❌ **mainブランチへの直接コミット・プッシュ**
- 必ずブランチを作成してから作業する

❌ **AI生成メッセージの追加**
- コミットメッセージやPRに「Generated with Claude Code」や「Co-Authored-By: Claude」を追加しない
- 詳細: [禁止事項：AI生成メッセージの追加](CONTRIBUTING.md#-禁止事項ai生成メッセージの追加)

### セキュリティチェック項目

実装時に以下を必ず確認：

- [ ] Server Actions のバリデーション（zod等でバリデーション）
- [ ] XSS対策（dangerouslySetInnerHTML 禁止）
- [ ] 認可チェック実装（getServerSession で権限確認）
- [ ] 環境変数の保護（NEXT_PUBLIC_ で機密情報を公開しない）
- [ ] SQLインジェクション対策（Prisma クエリビルダー使用、$queryRawUnsafe 禁止）
- [ ] 型安全性（any 禁止、適切な型定義）

詳細: [セキュリティチェック](CONTRIBUTING.md#セキュリティチェック)

---

## アーキテクチャ概要

### Docker構成

**開発環境:**
```
nextjsapp (Next.js, :3000) → postgresdb (PostgreSQL, :5432)
```

**本番環境（リバースプロキシ独立構成）:**
```
caddy (reverse-proxy/, :80/:443) →[web-proxy-net]→ nextjsapp (:3000) →[internal]→ postgresdb (:5432)
```

- **caddy**: `reverse-proxy/` で独立管理、Let's EncryptでSSL自動化
- **nextjsapp**: ポート3000（internal + web-proxy-net）
- **postgresdb**: ポート5432（internalのみ）、postgres_dataボリュームで永続化

### 環境変数管理

- テンプレート: `.env.development.example` / `.env.production.example`（コミット済み）
- 実体ファイル: `.env.development` / `.env.production`（`.gitignore` で除外、`cp .env.*.example .env.*` で作成）
- `-f` + `--env-file` で明示的に指定する設計

詳細は [README.md のアーキテクチャセクション](README.md#アーキテクチャ) を参照してください。

---

## トラブルシューティング

一般的な問題の解決方法は [README.md のトラブルシューティングセクション](README.md#トラブルシューティング) を参照してください。

### よくある問題

**コンテナ起動失敗:**
```bash
docker compose -f compose.development.yaml --env-file .env.development down -v
docker compose -f compose.development.yaml --env-file .env.development up -d
```

**依存関係の問題:**
```bash
docker compose -f compose.development.yaml --env-file .env.development build --no-cache
```

**データベースの問題:**
```bash
make bash
npx prisma migrate reset
```

---

## Claude Code向けのワークフローガイド

### 開発タスクを受けたときの手順

1. **ドキュメント確認**
   - README.mdで技術仕様を確認
   - CONTRIBUTING.mdで開発規約を確認

2. **Issue確認**
   - 既存Issueがあれば内容を確認
   - なければIssue作成を提案

3. **ブランチ作成**
   - 必ずmainから分岐
   - 命名規則: `<type>/<issue番号>-<機能名>`

4. **実装**
   - セキュリティチェックを意識
   - テストを追加
   - コーディング規約に従う

5. **コミット**
   - Conventional Commits形式
   - issue番号を含める
   - AI生成メッセージは追加しない

6. **PR作成**
   - PRテンプレートに従う
   - 変更内容を明確に説明
   - AI生成メッセージは追加しない

### 効果的なプロンプト例

**良い例:**
```
Implement issue #12 following CONTRIBUTING.md.
Create a feature branch, implement the User profile page with Prisma,
write Vitest tests, commit, and create a PR.
```

**悪い例:**
```
Add a user page
```

常に以下を意識：
- Issue番号を明示
- CONTRIBUTING.mdへの言及
- 具体的な要件

---

## 自動実行ポリシー

Claude Code が操作を実行する際の基準を定義します。

### 確認なしで実行可能

以下の**読み取り専用操作**は、確認なしで自動実行できます：

- **ファイル読み取り**: Read, Grep, Glob
- **状態確認コマンド**:
  - `git status`, `git log`, `git diff`
  - `docker ps`, `docker compose ps`
  - `ls`, `cat`, `grep`, `find`
- **ログ確認**:
  - `docker compose logs`
  - `make logs`
- **テスト実行**:
  - `npx vitest run`

### 必ず確認が必要

以下の**書き込み・変更操作**は、ユーザーの明示的な承認が必要です：

- **データベース操作**:
  - `npx prisma migrate dev`
  - `npx prisma migrate reset`
  - `npx prisma db push`
  - SQL の INSERT/UPDATE/DELETE
- **Git 操作**:
  - `git commit`, `git push`
  - `git branch` 作成・削除
  - `git merge`, `git rebase`
- **ファイル削除・上書き**:
  - Write, Edit（既存ファイルの上書き）
  - `rm`, `mv`（ファイル削除・移動）
  - `docker compose down -v`（ボリューム削除）
- **本番環境への操作**:
  - デプロイコマンド
  - 環境変数の変更
  - 本番データベースへのアクセス

**原則**: データの永続的な変更や、元に戻せない操作は必ず確認する。

---

## 参考リンク

- [README.md](README.md) - プロジェクト固有の技術情報
- [CONTRIBUTING.md](CONTRIBUTING.md) - 開発規約（最重要）
- [Conventional Commits](https://www.conventionalcommits.org/) - コミット規約の詳細
- [Next.js ドキュメント](https://nextjs.org/docs) - Next.js 公式ドキュメント
- [Prisma ドキュメント](https://www.prisma.io/docs) - Prisma 公式ドキュメント
- [NextAuth.js ドキュメント](https://next-auth.js.org/) - NextAuth 公式ドキュメント

---

## LP制作ワークフロー

このリポジトリは LP 制作の標準ワークフローツールを内蔵しています。

### ワークフロー概要

| Phase | ツール | 内容 | 成果物の場所 |
|-------|--------|------|-------------|
| 0 | - | ブリーフ作成 | `projects/{name}/BRIEF.md` |
| 1 | Claude Code | 調査・ペルソナ設計 | `projects/{name}/research/` |
| 2 | ChatGPT image2 | モックアップ生成 | `projects/{name}/mockups/` |
| 3 | Claude Design | 設計システム正規化 | `projects/{name}/design/handoff/` |
| 4 | Claude Code | LP実装 | Next.js App Router (`src/`) |
| 5 | - | QA・ABテスト | `projects/{name}/qa/` |

### 新規LP案件の開始

```bash
./workflow/scripts/new-lp.sh <project-name>
```

### LP実装時のルール（Phase 4）

- 案件ごとの `projects/{name}/CLAUDE.md` を必ず参照
- Design tokens は `design/handoff/20-design-tokens.yaml` から取得
- 定義されていない CSS 変数を新規導入しない
- Hero は 1440px / 375px の両方で above the fold に収める
- すべてのビューポートで横スクロール禁止
- セクション実装順序: hero → features → social proof → pricing → FAQ → CTA

### 参照ドキュメント

- ワークフロー詳細: [workflow/README.md](workflow/README.md)
- テンプレート一覧: [workflow/templates/](workflow/templates/)
- Claude Design handoff 手順: [workflow/templates/claude-design-handoff.md](workflow/templates/claude-design-handoff.md)

---

## まとめ

このファイル（CLAUDE.md）はクイックリファレンスです。詳細情報は必ず以下を参照してください：

- **技術的な質問** → [README.md](README.md)
- **開発フローの質問** → [CONTRIBUTING.md](CONTRIBUTING.md)
- **LP制作ワークフロー** → [workflow/README.md](workflow/README.md)

作業開始前に必ず両ファイルを確認し、規約に従って進めてください。
