# SmartFarm Monitoring Runbook

Production monitoring setup for SmartFarm.

## 1) Sentry

### Backend

- Variable: `SENTRY_DSN` (required to enable)
- Optional: `SENTRY_RELEASE`, `SENTRY_ENVIRONMENT`
- Code location: `backend/server.js`

What is configured:
- Sentry initialization only when DSN is present
- Environment and release support
- Request header scrubbing (`authorization`, `cookie`, `x-api-key`)
- Global request and error handlers wired in Express

Manual actions:
1. Create Sentry project (Node.js).
2. Add `SENTRY_DSN` in Railway service variables.
3. Set `SENTRY_RELEASE` to your deploy tag/commit (recommended).
4. Redeploy backend and verify one captured test error.

### Frontend

- Variables: `VITE_SENTRY_DSN`, optional `VITE_SENTRY_ENVIRONMENT`, `VITE_SENTRY_RELEASE`
- Code location: `web-project/public/js/error-tracking.js`

Manual actions:
1. Create Sentry Browser/JavaScript project (or reuse project).
2. Ensure your page injects `window.VITE_SENTRY_DSN` (or `window.SENTRY_DSN`) at runtime.
3. Deploy and verify one captured browser error.

> Note: Do not commit DSNs or secrets in source files.

## 2) UptimeRobot

Set up these monitors in UptimeRobot:

1. `SmartFarm Frontend` (HTTP(s))
   - URL: your production frontend URL
   - Interval: 5 minutes
2. `SmartFarm API Health` (HTTP(s))
   - URL: `https://<your-backend-domain>/api/health`
   - Interval: 5 minutes
3. `SmartFarm Frontend Keyword` (Keyword monitor)
   - URL: your production frontend URL
   - Keyword: `SmartFarm`

Recommended alerting:
- Email alerts enabled for all monitors
- Escalation to secondary contact after repeated failures

## 3) Health endpoint

Existing endpoint:
- `GET /api/health` in `backend/server.js`

It returns:
- service status, environment, version
- database connection status

No additional endpoint is required right now.
