# Email verification links — production (Railway)

## Required variables

| Variable | Format | Purpose |
|----------|--------|---------|
| `PUBLIC_FRONTEND_URL` | **Single** `https://` origin (no commas) | Canonical base URL for verify/reset/dashboard links in email |
| `FRONTEND_URL` | Optional **single** URL | Fallback if `PUBLIC_FRONTEND_URL` is unset |
| `CORS_ORIGINS` or `ALLOWED_ORIGINS` | Comma-separated list | Browser CORS only — **never** copy into email vars |
| `EMAIL_SERVICE`, `EMAIL_USER`, `EMAIL_PASS`, `EMAIL_FROM` | As configured | Outbound mail |

**Precedence for link generation:** `PUBLIC_FRONTEND_URL` → `FRONTEND_URL` → `CLIENT_URL` → `APP_URL` (see `utils/frontendUrl.js`).

## Common mistake (fixed in code)

Do **not** set:

```env
FRONTEND_URL=https://www.smartfarm-app.com,https://smartfarm-app.com,https://smartfarm-app.netlify.app
```

That pattern belongs only in `CORS_ORIGINS`. Email links must use one origin, e.g.:

```env
PUBLIC_FRONTEND_URL=https://www.smartfarm-app.com
```

## Example verification URL

```
https://www.smartfarm-app.com/verify-email.html?token=<hex-token>
```

## After changing variables

1. Railway → backend service → **Variables** → save.
2. **Redeploy** or **Restart** the service (env is read at process start).
3. Check logs for: `Email links will use frontend origin: https://www.smartfarm-app.com` (no commas).
4. Send a test registration and confirm the email link is a single valid URL.

## Logging

Production logs the chosen **origin** only. Full tokenized links are not written to server logs.
