# Post-deploy verification (real `server.js` API)

Set your base URL (no trailing slash):

```bash
export API_BASE="https://your-service.up.railway.app"
```

## 1) Health matches `server.js` (not `server-simple.cjs`)

**Expect:** JSON includes `database`, `env`, `version`, and related fields — not only `{ "ok", "service", "ts" }`.

```bash
curl -sS "${API_BASE}/api/health" | jq .
```

**Fail if:** Body is only three keys and no `database` object (indicates `server-simple.cjs`).

---

## 2) Register does NOT return `mock-jwt-token`

```bash
EMAIL="verify-$(date +%s)@example.com"
curl -sS -w "\nHTTP:%{http_code}\n" -X POST "${API_BASE}/api/auth/register" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\",\"password\":\"TestPass1!\",\"firstName\":\"T\",\"lastName\":\"U\",\"phone\":\"+12345678901\"}"
```

**Pass:** `201`, `"success":true`, **no** string `mock-jwt-token` in the body.

---

## 3) Duplicate register → 409

```bash
curl -sS -w "\nHTTP:%{http_code}\n" -X POST "${API_BASE}/api/auth/register" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\",\"password\":\"TestPass1!\",\"firstName\":\"T\",\"lastName\":\"U\",\"phone\":\"+12345678901\"}"
```

**Pass:** `409`, `"code":"USER_EXISTS"` (or equivalent error).

---

## 4) Wrong password → 401

```bash
curl -sS -w "\nHTTP:%{http_code}\n" -X POST "${API_BASE}/api/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\",\"password\":\"WrongPass1!\"}"
```

**Pass:** `401`, `"code":"INVALID_CREDENTIALS"` (or invalid credentials message).

---

## 5) Unverified login → 403

After registering a **new** email (not yet verified):

```bash
EMAIL2="unverified-$(date +%s)@example.com"
curl -sS -X POST "${API_BASE}/api/auth/register" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL2\",\"password\":\"TestPass1!\",\"firstName\":\"T\",\"lastName\":\"U\",\"phone\":\"+12345678901\"}"

curl -sS -w "\nHTTP:%{http_code}\n" -X POST "${API_BASE}/api/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL2\",\"password\":\"TestPass1!\"}"
```

**Pass:** `403`, `"code":"EMAIL_NOT_VERIFIED"`.

---

## Windows (PowerShell)

Set `$API_BASE` and use `Invoke-RestMethod` / `Invoke-WebRequest` with the same JSON bodies, or run the script from Git Bash/WSL.
