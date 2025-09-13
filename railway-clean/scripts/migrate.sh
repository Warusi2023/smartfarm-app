#!/usr/bin/env bash
set -euo pipefail

if [[ -z "${DATABASE_URL:-}" ]]; then
  echo "DATABASE_URL is not set. Please set it in Railway variables."
  exit 1
fi

echo "Running SQL migrations against: $DATABASE_URL"
for f in $(ls -1 database/migrations/*.sql | sort); do
  echo "==> Applying $f"
  psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f "$f"
done

echo "All migrations applied ✅"
