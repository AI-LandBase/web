#!/bin/bash
set -e

# node_modules 内に保存することで、ボリューム削除時にハッシュも消え再インストールが走る
HASH_FILE="/app/node_modules/.package-lock-hash"
CURRENT_HASH=$(md5sum /app/package-lock.json | cut -d' ' -f1)

if [ -f "$HASH_FILE" ] && [ "$(cat "$HASH_FILE")" = "$CURRENT_HASH" ]; then
  echo "📦 依存関係に変更なし、npm install をスキップ"
else
  echo "📦 依存関係が変更されています、npm install を実行..."
  npm install
  echo "$CURRENT_HASH" > "$HASH_FILE"
fi

npx prisma generate
exec npm run dev
