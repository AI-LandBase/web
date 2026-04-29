# AI-LandBase

> LP制作標準ワークフロー + Next.js 15 / Tailwind v4 / Docker 環境

Claude Code / ChatGPT image2 / Claude Design の3ツール連携によるLP制作ワークフローを整備したリポジトリです。

**LP案件の始め方**: `./workflow/scripts/new-lp.sh <project-name>` → [workflow/README.md](workflow/README.md)
**貢献したい方は**: [CONTRIBUTING.md](CONTRIBUTING.md) を参照してください

---

## 目次

- [プロジェクト概要](#プロジェクト概要)
- [技術スタック](#技術スタック)
- [クイックスタート](#クイックスタート)
- [開発環境セットアップ](#開発環境セットアップ)
- [アーキテクチャ](#アーキテクチャ)
- [よく使うコマンド](#よく使うコマンド)
- [本番環境デプロイ](#本番環境デプロイ)
- [プロジェクト構造](#プロジェクト構造)
- [トラブルシューティング](#トラブルシューティング)

---

## プロジェクト概要

このプロジェクトは、Dockerを使用したNext.js開発環境を提供するboilerplateです。

### 特徴

- Docker Compose による開発環境の一貫性
- 環境ごとの設定ファイル管理（`.env.development` / `.env.production`）
- Makefileによる簡単なコマンド実行
- 定番パッケージのプリインストール（Prisma、NextAuth、Vitest等）
- 本番環境デプロイ対応

---

## 技術スタック

| 技術 | バージョン | 用途 |
|-----|----------|------|
| Next.js | 15 (App Router) | Webフレームワーク |
| TypeScript | 5.x | プログラミング言語 |
| PostgreSQL | 17-bookworm | データベース |
| Prisma | latest | ORM |
| NextAuth.js | v5 (Auth.js) | 認証 |
| Tailwind CSS | 4.x | CSSフレームワーク |
| Docker | 20.10+ | コンテナ実行環境 |
| Docker Compose | 2.0+ | 複数コンテナ管理 |
| Node.js | 22 | JavaScript ランタイム |

バージョンは `.env.development` / `.env.production` で変更可能です。

---

## クイックスタート

```bash
# リポジトリをクローン
git clone https://github.com/zomians/nextjs_boilerplate.git
cd nextjs_boilerplate

# Next.js アプリケーションを作成（初回のみ）
make init

# コンテナを起動
make up
```

アプリケーション: http://localhost:3000

---

## 開発環境セットアップ

### 必要なツール

| ツール | 必須/任意 | 推奨バージョン | 用途 |
|--------|----------|--------------|------|
| Docker | 必須 | 20.10+ | コンテナ実行環境 |
| Docker Compose | 必須 | 2.0+ | 複数コンテナの管理 |
| Git | 必須 | 2.30+ | バージョン管理 |
| Make | 任意 | - | コマンド簡略化 |

### セットアップ手順

```bash
# リポジトリをクローン
git clone https://github.com/zomians/nextjs_boilerplate.git
cd nextjs_boilerplate

# 環境変数の確認・調整
# .env.development を編集して Node.js/Postgres バージョンやDB設定を変更できます

# 初回のみ: 定番パッケージを含むNext.jsアプリケーションを作成
make init

# コンテナ起動
make up
```

**`make init` で追加される定番パッケージ:**
- `prisma` / `@prisma/client`: ORM（PostgreSQL対応）
- `next-auth`: 認証（要手動セットアップ）
- `square`: Square決済
- `vitest`, `@testing-library/react`, `@testing-library/jest-dom`: テスト関連
- `prettier`, `eslint-config-prettier`: コードフォーマッター
- Next.js にはデフォルトで `eslint` が含まれます

**自動生成される設定ファイル:**
- `prisma/schema.prisma`: Prisma スキーマ（User モデル付き）
- `src/lib/square.ts`: Square API ユーティリティ
- `vitest.config.ts`: Vitest テスト設定
- `.prettierrc`: Prettier 設定
- `next.config.ts`: Next.js 設定（standalone モード）

**NextAuth の手動セットアップ:**

NextAuth パッケージはインストール済みですが、使用する場合は以下のセットアップが必要です：

1. `src/app/api/auth/[...nextauth]/route.ts` を作成
2. 認証プロバイダーを設定（Google, GitHub, Credentials 等）
3. Prisma Adapter を使用する場合は `@auth/prisma-adapter` を追加インストール

詳細は [NextAuth.js ドキュメント](https://next-auth.js.org/) を参照してください。

---

## アーキテクチャ

### Docker構成

このプロジェクトは**マルチコンテナDocker構成**を採用しています。

#### 開発環境サービス構成

```
┌─────────────────────────────────────┐
│  nextjsapp (Next.js アプリケーション)  │
│  - ポート: 3000                      │
│  - ボリューム: カレントディレクトリ    │
│  - 依存: postgresdb サービス         │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│  postgresdb (PostgreSQL)            │
│  - ポート: 5432                      │
│  - ボリューム: postgres_data         │
│  - ヘルスチェック有効                │
└─────────────────────────────────────┘
```

#### 本番環境サービス構成

リバースプロキシはアプリケーションから独立した構成です。外部ネットワーク `web-proxy-net` を介して接続します。

```
Internet
    ↓
┌─────────────────────────────────────┐
│  caddy (reverse-proxy/)             │  ← 独立管理
│  - ポート: 80/443                    │
│  - SSL自動（Let's Encrypt）          │
│  - HTTP→HTTPSリダイレクト自動        │
│  - ネットワーク: web-proxy-net       │
└─────────────────────────────────────┘
              ↓ web-proxy-net（外部ネットワーク）
┌─────────────────────────────────────┐
│  nextjsapp (Next.js アプリケーション)  │
│  - ポート: 3000（内部のみ）          │
│  - ネットワーク: internal,           │
│                  web-proxy-net       │
│  - 依存: postgresdb サービス         │
└─────────────────────────────────────┘
              ↓ internal
┌─────────────────────────────────────┐
│  postgresdb (PostgreSQL)            │
│  - ポート: 5432（内部のみ）          │
│  - ネットワーク: internal            │
│  - ボリューム: postgres_data         │
│  - ヘルスチェック有効                │
└─────────────────────────────────────┘
```

**構成ファイル:**
- `reverse-proxy/compose.yaml` + `reverse-proxy/Caddyfile`: リバースプロキシ（独立管理）
- `compose.development.yaml` + `.env.development`: 開発環境（nextjsapp + postgresdb）
- `compose.production.yaml` + `.env.production`: 本番環境（nextjsapp + postgresdb）

#### 1. nextjsapp サービス（`Dockerfile.nextjs`）

- Next.js 開発環境
- カレントディレクトリを `/app` にマウント
- `node_modules` ボリュームで依存関係を永続化
- デフォルトで `npm run dev` を実行（Next.js 開発サーバー起動）
- アクセス: http://localhost:3000

#### 2. postgresdb サービス

- PostgreSQLデータベース
- データは `postgres_data` ボリュームに永続化
- アクセス: localhost:5432
- ヘルスチェックでアプリ起動前にDB準備完了を確認

### 環境変数管理

#### ファイル構成

- `.env.development`: 開発環境用の設定（リポジトリにコミット、サンプル値含む）
- `.env.production`: 本番環境用の設定（リポジトリにコミット、サンプル値含む）

#### 設計方針

- `--env-file` オプションで環境ファイルを明示的に指定
- 開発環境: `docker compose -f compose.development.yaml --env-file .env.development`
- 本番環境: `docker compose -f compose.production.yaml --env-file .env.production`

#### メリット

- 環境ファイルのコピー不要
- 使用する環境が明示的
- `.gitignore` の設定不要
- セキュリティ向上（間違って機密情報をコミットするリスク低減）

#### 環境変数一覧

**開発環境（.env.development）:**
- `NODE_VERSION`: Node.js version (default: 22)
- `POSTGRES_VERSION`: PostgreSQL version (default: 17-bookworm)
- `POSTGRES_HOST`, `POSTGRES_PORT`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`: Database credentials
- `DATABASE_URL`: PostgreSQL connection URL (Prisma が使用)
- `NEXTAUTH_URL`: NextAuth のベースURL
- `NEXTAUTH_SECRET`: NextAuth のシークレットキー

**本番環境用追加環境変数（.env.production）:**
- `NEXTAUTH_SECRET`: NextAuth シークレットキー（**必ず変更**）
- `POSTGRES_PASSWORD`: データベースパスワード（**必ず変更**）
- `NODE_ENV=production`
- `NEXTAUTH_URL`: 本番ドメイン

---

## よく使うコマンド

### 開発環境

```bash
# コンテナ起動
make up

# コンテナ停止
make down

# nextjsapp コンテナに入る
make bash

# サービス状態確認
docker compose -f compose.development.yaml --env-file .env.development ps

# ログ表示
docker compose -f compose.development.yaml --env-file .env.development logs nextjsapp
docker compose -f compose.development.yaml --env-file .env.development logs postgresdb

# 利用可能なコマンド一覧を表示
make help
```

### コンテナ内での作業

コンテナに入った後（`make bash`）、以下のコマンドが使用できます。

```bash
# Prisma Studio（データベースGUI）
npx prisma studio

# マイグレーション作成
npx prisma migrate dev --name <migration_name>

# マイグレーション実行
npx prisma migrate dev

# Prisma クライアント生成
npx prisma generate

# テスト実行
npx vitest run

# テスト（ウォッチモード）
npx vitest

# Lint
npm run lint

# フォーマット
npx prettier --write .
```

### Docker関連

```bash
# コンテナを再ビルド（Dockerfileや依存関係変更後）
docker compose -f compose.development.yaml --env-file .env.development build --no-cache

# このプロジェクトのDocker関連をクリーン（公式イメージは保持）
make clean
```

### リバースプロキシ

`reverse-proxy/` ディレクトリは自己完結しています。ディレクトリに移動して操作してください。

```bash
cd reverse-proxy/

# リバースプロキシを起動（web-proxy-netも自動作成）
make up

# リバースプロキシを停止
make down

# リバースプロキシのログを表示
make logs

# Caddyfile変更後に設定を再読み込み
make reload

# コマンド一覧
make help
```

### 本番環境

```bash
# 本番環境をデプロイ（ビルド→再作成→マイグレーション）
make prod-deploy

# 本番環境のログを表示
make prod-logs

# 本番環境のnextjsappコンテナに入る
make prod-bash

# 本番環境のコンテナ状態を表示
make prod-ps

# その他の本番環境コマンド
make help  # 全コマンド確認
```

---

## 本番環境デプロイ

このプロジェクトは Docker Compose を使用した本番環境デプロイをサポートしています。

### 構成ファイル

| ファイル | 用途 |
|---------|------|
| `reverse-proxy/compose.yaml` | リバースプロキシ用 Docker Compose 設定 |
| `reverse-proxy/Caddyfile` | Caddy リバースプロキシ設定（SSL自動化） |
| `compose.production.yaml` | 本番環境用 Docker Compose 設定（app + postgresdb） |
| `.env.production` | 本番環境用環境変数（NEXTAUTH_SECRET等を要変更） |
| `Dockerfile.nextjs` | 本番ステージを含むマルチステージビルド |

### SSL/TLS（HTTPS）

本番環境では [Caddy](https://caddyserver.com/) をリバースプロキシとして使用し、Let's Encrypt による SSL/TLS 証明書の取得・更新を自動化しています。

- 証明書の取得・更新は完全自動（手動操作不要）
- HTTP→HTTPS リダイレクトも自動
- HTTP/3（QUIC）対応

### VPSへのデプロイ手順

#### 前提条件

- VPSにDockerとDocker Composeがインストール済み（[VPS初期セットアップ](docs/vps-setup.md) 参照）
- ドメインのDNS AレコードがVPSのIPアドレスに設定済み
- ポート80/443がファイアウォールで開放済み

#### 1. VPS上での初回セットアップ

```bash
# VPSにSSH接続
ssh devuser@your-vps-ip

# リポジトリをclone
git clone https://github.com/zomians/nextjs_boilerplate.git
cd nextjs_boilerplate

# .env.productionを編集
vi .env.production
```

**必須設定項目:**
- `NEXTAUTH_SECRET`: `make prod-secret` で生成
- `NEXTAUTH_URL`: 本番ドメイン（`https://yourdomain.com`）
- `POSTGRES_PASSWORD`: ランダムな強力なパスワードに変更

#### 2. リバースプロキシの設定・起動

リバースプロキシ（Caddy）はプロジェクトとは独立して `/srv/reverse-proxy/` で運用します（[VPS初期セットアップ](docs/vps-setup.md) 参照）。

```bash
# reverse-proxy/ を /srv/reverse-proxy/ にコピー
cp -r reverse-proxy/ /srv/reverse-proxy/

# Caddyfileにドメイン名を設定
vi /srv/reverse-proxy/Caddyfile

# リバースプロキシを起動（web-proxy-netネットワークも自動作成）
cd /srv/reverse-proxy/
make up
```

#### 3. アプリケーションのデプロイ

```bash
make prod-deploy
```

このコマンドで以下が一括実行されます:
1. イメージをビルド（`--no-cache`）
2. 既存コンテナを停止
3. コンテナを起動
4. データベースマイグレーション（`prisma migrate deploy`）

#### 4. 確認

アプリケーション: `https://yourdomain.com`

Caddy が自動的に Let's Encrypt から SSL 証明書を取得します。初回アクセス時に数秒かかる場合があります。

### 更新デプロイ

コードを更新した場合の手順:

```bash
# VPS上で
git pull origin main

# アプリケーションのみ再デプロイ（リバースプロキシは停止しない）
make prod-deploy
```

---

## プロジェクト構造

```
.
├── .env.development          # 開発環境用環境変数（コミット済み）
├── .env.production           # 本番環境用環境変数テンプレート（コミット済み）
├── reverse-proxy/            # リバースプロキシ（独立管理、ディレクトリごとコピーで運用可能）
│   ├── compose.yaml          # Caddy用 Docker Compose 設定
│   ├── Caddyfile             # Caddy リバースプロキシ設定
│   └── Makefile              # リバースプロキシ操作コマンド
├── compose.development.yaml  # 開発環境用 Docker Compose 設定
├── compose.production.yaml   # 本番環境用 Docker Compose 設定（app + postgresdb）
├── Dockerfile.nextjs         # Next.jsコンテナ定義（マルチステージビルド）
├── Makefile                  # 開発ショートカット
├── CONTRIBUTING.md           # 開発ガイドライン・ワークフロー
├── CLAUDE.md                 # Claude Code向けガイド
└── README.md                 # このファイル
```

**注意**: `make init` 実行後、カレントディレクトリに完全なNext.jsアプリケーション構造が作成されます。

---

## トラブルシューティング

### コンテナ起動に失敗する

```bash
# クリーンアップ後に再起動
docker compose -f compose.development.yaml --env-file .env.development down -v
docker compose -f compose.development.yaml --env-file .env.development up -d
```

### 依存関係のインストールに失敗する

```bash
# ボリューム削除後に再ビルド
docker compose -f compose.development.yaml --env-file .env.development down -v
docker compose -f compose.development.yaml --env-file .env.development build --no-cache
docker compose -f compose.development.yaml --env-file .env.development up -d
```

### データベース関連の問題

```bash
# コンテナに入る
make bash

# コンテナ内で実行
npx prisma migrate reset
npx prisma migrate dev
```

### ファイル権限の問題

Dockerで作成されたファイルの権限問題が発生した場合:

```bash
# ホスト上で実行
sudo chown -R $(id -u):$(id -g) .
```

### 本番環境のトラブルシューティング

#### コンテナが起動しない

```bash
# ログを確認
make prod-logs

# コンテナ状態を確認
make prod-ps

# クリーンアップして再デプロイ
make prod-deploy
```

#### データベース接続エラー

```bash
# データベースコンテナの状態を確認
make prod-ps

# データベースをリセット（注意: 全データ削除）
make prod-db-reset
```

### よくある質問

**Q: ポート3000が既に使用されている**
```bash
# 使用中のプロセスを確認
lsof -i :3000

# プロセスを停止するか、compose.development.yamlでポートを変更
```

**Q: make コマンドが使えない**
```bash
# makeがインストールされていない場合、直接docker composeコマンドを使用
docker compose -f compose.development.yaml --env-file .env.development up -d
docker compose -f compose.development.yaml --env-file .env.development exec nextjsapp bash
```

**Q: Prisma のマイグレーションエラー**
```bash
# コンテナに入る
make bash

# マイグレーション状態を確認
npx prisma migrate status

# 問題がある場合はリセット
npx prisma migrate reset
```

---

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。
