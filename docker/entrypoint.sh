#!/bin/bash
# 開発環境（compose.development.yaml）専用。本番は Dockerfile のビルドステージで処理する。
set -e

# node_modules 内に保存することで、ボリューム削除時にハッシュも消え再インストールが走る
HASH_FILE="/app/node_modules/.package-lock-hash"
PRISMA_HASH_FILE="/app/node_modules/.prisma-schema-hash"
CURRENT_HASH=$(md5sum /app/package-lock.json | cut -d' ' -f1)

if [ -f "$HASH_FILE" ] && [ "$(cat "$HASH_FILE")" = "$CURRENT_HASH" ]; then
  echo "📦 依存関係に変更なし、npm install をスキップ"
else
  echo "📦 依存関係が変更されています、npm install を実行..."
  npm install
  echo "$CURRENT_HASH" > "$HASH_FILE"
  rm -f "$PRISMA_HASH_FILE"  # Prisma バージョン変更時に generate を強制
fi

PRISMA_CURRENT_HASH=$(md5sum /app/prisma/schema.prisma | cut -d' ' -f1)

if [ -f "$PRISMA_HASH_FILE" ] && [ "$(cat "$PRISMA_HASH_FILE")" = "$PRISMA_CURRENT_HASH" ]; then
  echo "📦 Prisma スキーマに変更なし、prisma generate をスキップ"
else
  echo "📦 Prisma スキーマが変更されています、prisma generate を実行..."
  npx prisma generate
  echo "$PRISMA_CURRENT_HASH" > "$PRISMA_HASH_FILE"
fi

exec npm run dev
