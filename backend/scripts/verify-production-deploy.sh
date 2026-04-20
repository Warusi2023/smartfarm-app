#!/usr/bin/env bash
# Post-deploy smoke checks for real server.js API (not server-simple.cjs).
# Usage: API_BASE=https://your-app.up.railway.app ./scripts/verify-production-deploy.sh
set -euo pipefail

API_BASE="${API_BASE:-}"
if [[ -z "$API_BASE" ]]; then
  echo "Set API_BASE to your Railway URL, e.g.:" >&2
  echo "  export API_BASE=https://xxx.up.railway.app" >&2
  exit 1
fi

API_BASE="${API_BASE%/}"
HEALTH_URL="${API_BASE}/api/health"

echo "== GET ${HEALTH_URL} =="
HEALTH_JSON=$(curl -sS "$HEALTH_URL")
echo "$HEALTH_JSON" | head -c 800
echo ""

if echo "$HEALTH_JSON" | grep -q '"database"'; then
  echo "PASS: health includes database (server.js-style)"
else
  echo "FAIL: health missing database object — likely server-simple.cjs or wrong deploy"
  exit 1
fi

if echo "$HEALTH_JSON" | grep -q 'mock-jwt'; then
  echo "FAIL: unexpected mock-jwt in health body"
  exit 1
fi

EMAIL="verify-$(date +%s)@example.com"
REG_BODY=$(printf '%s' "{\"email\":\"${EMAIL}\",\"password\":\"TestPass1!\",\"firstName\":\"T\",\"lastName\":\"U\",\"phone\":\"+12345678901\"}")

echo ""
echo "== POST register (expect 201, no mock-jwt) =="
REG_OUT=$(curl -sS -w "\n%{http_code}" -X POST "${API_BASE}/api/auth/register" \
  -H "Content-Type: application/json" \
  -d "$REG_BODY")
REG_HTTP=$(echo "$REG_OUT" | tail -n1)
REG_BODY_OUT=$(echo "$REG_OUT" | sed '$d')
echo "$REG_BODY_OUT"
if [[ "$REG_HTTP" != "201" ]]; then
  echo "FAIL: register HTTP $REG_HTTP (expected 201)"
  exit 1
fi
if echo "$REG_BODY_OUT" | grep -q 'mock-jwt-token'; then
  echo "FAIL: register returned mock-jwt-token (wrong server entrypoint)"
  exit 1
fi
echo "PASS: register without mock-jwt"

echo ""
echo "== POST register duplicate (expect 409) =="
DUP_OUT=$(curl -sS -w "\n%{http_code}" -X POST "${API_BASE}/api/auth/register" \
  -H "Content-Type: application/json" \
  -d "$REG_BODY")
DUP_HTTP=$(echo "$DUP_OUT" | tail -n1)
DUP_BODY=$(echo "$DUP_OUT" | sed '$d')
echo "$DUP_BODY"
if [[ "$DUP_HTTP" != "409" ]]; then
  echo "FAIL: duplicate register HTTP $DUP_HTTP (expected 409)"
  exit 1
fi
echo "PASS: duplicate register 409"

echo ""
echo "== POST login wrong password (expect 401) =="
WRONG_OUT=$(curl -sS -w "\n%{http_code}" -X POST "${API_BASE}/api/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"${EMAIL}\",\"password\":\"WrongPass1!\"}")
WRONG_HTTP=$(echo "$WRONG_OUT" | tail -n1)
WRONG_BODY=$(echo "$WRONG_OUT" | sed '$d')
echo "$WRONG_BODY"
if [[ "$WRONG_HTTP" != "401" ]]; then
  echo "FAIL: wrong-password login HTTP $WRONG_HTTP (expected 401)"
  exit 1
fi
echo "PASS: wrong password 401"

echo ""
echo "== POST login unverified (expect 403) =="
EMAIL2="unverified-$(date +%s)@example.com"
REG2=$(printf '%s' "{\"email\":\"${EMAIL2}\",\"password\":\"TestPass1!\",\"firstName\":\"T\",\"lastName\":\"U\",\"phone\":\"+12345678901\"}")
curl -sS -o /dev/null -X POST "${API_BASE}/api/auth/register" \
  -H "Content-Type: application/json" \
  -d "$REG2"

UV_OUT=$(curl -sS -w "\n%{http_code}" -X POST "${API_BASE}/api/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"${EMAIL2}\",\"password\":\"TestPass1!\"}")
UV_HTTP=$(echo "$UV_OUT" | tail -n1)
UV_BODY=$(echo "$UV_OUT" | sed '$d')
echo "$UV_BODY"
if [[ "$UV_HTTP" != "403" ]]; then
  echo "FAIL: unverified login HTTP $UV_HTTP (expected 403 EMAIL_NOT_VERIFIED)"
  exit 1
fi
echo "PASS: unverified login 403"

echo ""
echo "All checks passed."
