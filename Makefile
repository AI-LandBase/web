.PHONY: help
help: ## ヘルプを表示
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

# ==============================================
# 初期セットアップ用（初回のみ実行）
# ==============================================

.PHONY: init
init: ## 定番パッケージを含むNext.jsアプリケーションを作成（初回のみ実行）
	@echo "📦 Next.jsアプリケーションを作成します..."
	@[ -f README.md ] && cp README.md README.md.bak || true
	@[ -f .env.development ] && cp .env.development .env.development.bak || true
	docker compose -f compose.development.yaml --env-file .env.development run --rm --workdir /app nextjsapp \
	npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm --yes
	@[ -f README.md.bak ] && mv README.md.bak README.md || true
	@[ -f .env.development.bak ] && mv .env.development.bak .env.development || true
	@echo "✅ Next.js アプリケーションを作成しました"
	@echo "📦 定番パッケージを追加します..."
	docker compose -f compose.development.yaml --env-file .env.development run --rm --workdir /app nextjsapp \
	bash -c "npm install prisma @prisma/client next-auth square && \
	npm install -D vitest @testing-library/react @testing-library/jest-dom @vitejs/plugin-react jsdom prettier eslint-config-prettier"
	@echo "✅ 定番パッケージを追加しました"
	@echo "📦 Prismaを初期化します..."
	docker compose -f compose.development.yaml --env-file .env.development run --rm --workdir /app nextjsapp \
	npx prisma init --datasource-provider postgresql
	@echo "✅ Prismaを初期化しました"
	@echo "📄 Prismaスキーマを更新します..."
	@printf '%s\n' \
		'generator client {' \
		'  provider = "prisma-client-js"' \
		'}' \
		'' \
		'datasource db {' \
		'  provider = "postgresql"' \
		'  url      = env("DATABASE_URL")' \
		'}' \
		'' \
		'model User {' \
		'  id            String    @id @default(cuid())' \
		'  name          String?' \
		'  email         String?   @unique' \
		'  emailVerified DateTime?' \
		'  image         String?' \
		'  createdAt     DateTime  @default(now())' \
		'  updatedAt     DateTime  @updatedAt' \
		'}' \
		> prisma/schema.prisma
	@echo "✅ Prismaスキーマを更新しました"
	@echo "📄 Square ユーティリティを作成します..."
	@mkdir -p src/lib
	@printf '%s\n' \
		'import { Client, Environment } from "square";' \
		'' \
		'export const squareClient =' \
		'  process.env.SQUARE_ACCESS_TOKEN' \
		'    ? new Client({' \
		'        token: process.env.SQUARE_ACCESS_TOKEN,' \
		'        environment:' \
		'          process.env.SQUARE_ENVIRONMENT === "production"' \
		'            ? Environment.Production' \
		'            : Environment.Sandbox,' \
		'      })' \
		'    : null;' \
		'' \
		'export const SQUARE_LOCATION_ID = process.env.SQUARE_LOCATION_ID;' \
		> src/lib/square.ts
	@echo "✅ Square ユーティリティを作成しました"
	@echo "📄 Vitest設定を作成します..."
	@printf '%s\n' \
		'import { defineConfig } from "vitest/config";' \
		'import react from "@vitejs/plugin-react";' \
		'import path from "path";' \
		'' \
		'export default defineConfig({' \
		'  plugins: [react()],' \
		'  test: {' \
		'    environment: "jsdom",' \
		'    globals: true,' \
		'    setupFiles: ["./src/test/setup.ts"],' \
		'  },' \
		'  resolve: {' \
		'    alias: {' \
		'      "@": path.resolve(__dirname, "./src"),' \
		'    },' \
		'  },' \
		'});' \
		> vitest.config.ts
	@mkdir -p src/test
	@printf '%s\n' \
		'import "@testing-library/jest-dom/vitest";' \
		> src/test/setup.ts
	@echo "✅ Vitest設定を作成しました"
	@echo "📄 Prettier設定を作成します..."
	@printf '%s\n' \
		'{' \
		'  "semi": true,' \
		'  "trailingComma": "all",' \
		'  "singleQuote": false,' \
		'  "printWidth": 80,' \
		'  "tabWidth": 2' \
		'}' \
		> .prettierrc
	@echo "✅ Prettier設定を作成しました"
	@echo "📄 next.config.ts に standalone 設定を追加します..."
	@printf '%s\n' \
		'import type { NextConfig } from "next";' \
		'' \
		'const nextConfig: NextConfig = {' \
		'  output: "standalone",' \
		'};' \
		'' \
		'export default nextConfig;' \
		> next.config.ts
	@echo "✅ next.config.ts を更新しました"
	@echo "🎉 セットアップ完了！ 次のコマンド: make up"

# ==============================================
# 開発用コマンド
# ==============================================

.PHONY: up
up: ## コンテナを起動
	docker compose -f compose.development.yaml --env-file .env.development up -d
	@echo "アプリケーションが起動しました: http://localhost:3000"

.PHONY: down
down: ## コンテナを停止
	docker compose -f compose.development.yaml --env-file .env.development down --remove-orphans
	@echo "✅ コンテナを停止しました"

.PHONY: bash
bash: ## nextjsapp コンテナに入る
	docker compose -f compose.development.yaml --env-file .env.development exec nextjsapp bash

.PHONY: test
test: ## Vitestテストを実行
	docker compose -f compose.development.yaml --env-file .env.development exec nextjsapp npx vitest run

.PHONY: clean
clean: ## このプロジェクトのDocker関連をクリーン（公式イメージは保持）
	docker compose -f compose.development.yaml --env-file .env.development down -v --rmi local

# ==============================================
# 本番環境用コマンド
# ==============================================

.PHONY: prod-deploy
prod-deploy: ## 本番環境をデプロイ（ビルド→再作成→マイグレーション）
	docker compose -f compose.production.yaml --env-file .env.production build --no-cache
	docker compose -f compose.production.yaml --env-file .env.production down
	docker compose -f compose.production.yaml --env-file .env.production up -d
	docker compose -f compose.production.yaml --env-file .env.production exec nextjsapp npx prisma migrate deploy
	@echo "✅ デプロイが完了しました"

.PHONY: prod-logs
prod-logs: ## 本番環境のログを表示
	docker compose -f compose.production.yaml --env-file .env.production logs -f

.PHONY: prod-bash
prod-bash: ## 本番環境のnextjsappコンテナに入る
	docker compose -f compose.production.yaml --env-file .env.production exec nextjsapp bash

.PHONY: prod-db-reset
prod-db-reset: ## 本番環境のデータベースをリセット（注意：全データ削除）
	@echo "⚠️  警告: 全てのデータが削除されます。続行しますか? [y/N]" && read ans && [ $${ans:-N} = y ]
	docker compose -f compose.production.yaml --env-file .env.production exec nextjsapp npx prisma migrate reset --force
	@echo "✅ データベースをリセットしました"

.PHONY: prod-secret
prod-secret: ## NEXTAUTH_SECRETを生成して表示
	docker compose -f compose.production.yaml --env-file .env.production run --rm nextjsapp node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

.PHONY: prod-ps
prod-ps: ## 本番環境のコンテナ状態を表示
	docker compose -f compose.production.yaml --env-file .env.production ps
