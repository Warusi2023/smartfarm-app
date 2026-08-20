# SmartFarm — Monitoring and Alerts Readiness

## Release context

| Item | Value |
|---|---|
| Candidate branch | `fix/playwright-dashboard-readiness-overlay` |
| Candidate commit | `41ce81f` — *Stabilize mobile browser regression coverage* |
| Local regression (Pass 2 sequential matrix) | **375 passed, 0 failed** |
| GitHub Playwright checks (commit `41ce81f`) | Mobile Safari, Chromium, Firefox, WebKit, Mobile Chrome — **success** |
| Public API health | `GET https://web-production-86d39.up.railway.app/api/health` → `ok: true`, `service: SmartFarm`, `env: production`, `database.connected: true`, `database.version: PostgreSQL 17.10` |
| Production Railway backend/API | Healthy and online (per verified health response) |
| Candidate frontend on production | **Not confirmed** — manual `railway up` attempts failed at `railpack prepare exited with an error`; active frontend deployment was not replaced |
| GitHub `Smoke — Railway API` (commit `41ce81f`) | **Skipped** (job runs only on `push` to `main`) |
| GitHub `Deploy to Production` (commit `41ce81f`) | **Skipped** (job runs only on `push` to `main`) |

This document is a **read-only assessment** of monitoring and alerting evidence in the repository and verified release context. It does **not** sign off the release. Production API health is verified; candidate frontend deployment is **not** confirmed. Do not treat this record as release-complete or as authorization to ship.

**End-of-day target for 20-Aug:** Logs, alerts, and failure visibility are documented and gated — not assumed live until open gates below are closed or explicitly deferred by the release owner.

---

## Monitoring inventory

| Area | Existing evidence | Visibility status | Alert status | Owner / system | Notes |
|---|---|---|---|---|---|
| Frontend availability and client-side failures | Playwright `console-errors.spec.js`; `web-project/public/js/error-tracking.js` (Sentry-capable); `@sentry/react` in `web-project/package.json` | Partially verified | Not evidenced | `[Frontend owner]` / Railway or Netlify + browser tests | `error-tracking.js` is **not referenced** in `web-project/public/*.html` — runtime capture may be inactive. Console-error coverage uses mock API, not production. |
| Backend/API availability | `GET /api/health`; Railway `healthcheckPath: /api/health` in `backend/railway.json`; verified public health response | Verified | Not evidenced | `[Backend owner]` / Railway | Railway platform health checks are inferred from config; no independent external uptime monitor evidenced in repo. |
| Database connectivity | `/api/health` DB probe; startup `verifyStartupDependencies()` in `backend/server.js`; `HealthCheckService.checkDatabase()` | Verified | Not evidenced | `[Database owner]` / Railway Postgres | Health sets `ok: false` and returns **503** when DB query fails. |
| API server errors | Winston logger (`backend/utils/logger.js`); global `errorHandler` (`backend/middleware/error-handler.js`); optional Sentry handlers in `backend/server.js` | Partially verified | Not evidenced | `[Backend owner]` / Railway logs (+ Sentry if `SENTRY_DSN` set) | Logs go to stdout/stderr (viewable in Railway). Sentry activates only when `SENTRY_DSN` is set — env presence not verified here. |
| Authentication failures | `backend/middleware/error-handler.js` logs operational errors at `warn`; `backend/routes/auth.js` logs login/register/refresh errors; auth middleware returns 401 without dedicated audit log | Partially verified | Not evidenced | `[Backend owner]` | No rate-spike or brute-force alert configuration evidenced. |
| Stripe/webhook failures | `backend/routes/stripe-webhooks.js` logs signature verification failures and handler errors; `StripeBillingService.logStartupStatus()` at server start | Partially verified | Not evidenced | `[Backend owner]` / Stripe Dashboard | Unit tests in `backend/tests/unit/stripeBillingService.test.js`. Manual production probes exist (`backend/scripts/stripe-billing-production-probe.js`) — not automated alerts. |
| Deployment/build failures | GitHub Actions workflows; Railway deploy workflow; manual `railpack prepare` failure noted in release drafts | Partially verified | Not evidenced | `[Operations owner]` / GitHub Actions + Railway | Playwright matrix artifacts upload on failure. Slack notify job in `frontend-ci-cd.yml` runs only after deploy jobs (skipped on candidate branch). |
| GitHub Actions quality gates | `.github/workflows/web-quality-gates.yml`, `frontend-ci-cd.yml`, `backend-ci.yml`, `railway-deploy.yml` | Partially verified | Not evidenced | `[Operations owner]` / GitHub | Playwright succeeded for `41ce81f`. `Smoke — Railway API` and `Deploy to Production` **skipped** on candidate branch. |
| Browser regression suite | Playwright five-browser matrix (375 local pass); CI Playwright jobs | Verified | Not evidenced | `[Frontend owner]` / GitHub Actions | Regression detects failures in CI; does not page on-call. |
| Background work / scheduled jobs | `backend/scripts/generate-weather-alerts.js` documents optional cron usage only | Not evidenced | Not applicable | `[Backend owner]` | No in-repo evidence of a production cron, queue worker, or Railway scheduled job for weather alerts or offline sync. |

---

## Health checks and availability

### Endpoint paths (source-backed)

| Path | Behavior | Source |
|---|---|---|
| `GET /api/health` | Returns JSON with `ok`, `service`, `ts`, `env`, `database.connected`, DB version on success; **503** when DB unhealthy | `backend/server.js` |
| `GET /api/health/detailed` | Aggregates DB, cache, memory checks; **503** when degraded | `backend/server.js`, `backend/utils/health-check.js` |
| `GET /api/health/ready` | Readiness probe; **503** when DB not healthy in production | `backend/server.js`, `backend/utils/health-check.js` |
| `GET /api/health/live` | Liveness probe; always alive if process running | `backend/server.js`, `backend/utils/health-check.js` |
| `GET /api/metrics` | Request/error/latency metrics; `?format=prometheus` supported | `backend/server.js`, `backend/utils/metrics.js` |
| `GET /` (frontend) | Railway frontend `healthcheckPath = "/"` in `web-project/railway.toml` | `web-project/railway.toml` |

### Verified public API health (20-Aug context)

Observed response from `https://web-production-86d39.up.railway.app/api/health`:

- `ok: true`
- `service: SmartFarm`
- `env: production`
- `database.connected: true`
- `database.version: PostgreSQL 17.10`

### Railway platform health checks

- **Backend:** `backend/railway.json` sets `healthcheckPath: /api/health`, `healthcheckTimeout: 120`, `restartPolicyType: ON_FAILURE`.
- **Frontend (Railway):** `web-project/railway.toml` sets `healthcheckPath: "/"`, `healthcheckTimeout: 60`.

These configure Railway’s deploy-time and runtime checks; they are **not** the same as operator-facing alert delivery.

### Independent external uptime monitoring

Repository contains **setup guides only** (`UPTIMEROBOT_MONITORING_SETUP.md`, `MONITORING_SETUP_COMPLETE.md`, references in `PRE_RELEASE_CHECKLIST.md`). No configuration file, webhook URL, or dashboard export proves UptimeRobot (or equivalent) is active.

**Open gate:** Confirm independent uptime monitoring or explicitly defer with release-owner approval.

### Automated smoke tests (not production monitors)

| Test | Scope | When it runs |
|---|---|---|
| `web-project/tests/e2e/railway-smoke.spec.js` | Live Railway `/api/health` + unauthenticated `/api/farms` (expects 401/403) | `web-quality-gates.yml` job `Smoke — Railway API` on **push to `main` only**; requires `RAILWAY_API_BASE` repo variable |
| `backend/tests/smoke/api-health.integration.test.js` | Live `/api/health` JSON shape | Backend Jest smoke (manual/CI when invoked) |
| `backend-ci.yml` health check | Local server boot + `curl` `/api/health` | Backend path changes on `main` |

For commit `41ce81f` on the candidate branch, GitHub **`Smoke — Railway API` was skipped**.

---

## Log visibility

### API request and error logging

| Mechanism | What is logged | Where visible | Alerts? |
|---|---|---|---|
| Winston logger (`backend/utils/logger.js`) | Structured JSON in production; levels `error`/`warn`/`info`/`debug` | Railway backend log stream (stdout/stderr); optional `LOG_FILE` | **No** — logs only |
| `metricsMiddleware` | Per-request completion at **debug**; slow requests (>2s) at **warn** | Railway logs | **No** |
| `errorHandler` | Operational errors → `warn`; unexpected errors → `errorWithContext` with stack | Railway logs; Sentry if initialized | **No** (Sentry is error aggregation, not paging unless configured in Sentry UI — not evidenced here) |
| Sentry (`backend/server.js`) | Request/tracing handlers + error handler when `SENTRY_DSN` set | Sentry project (if DSN configured) | **Not evidenced** — DSN presence in production not verified |

### Startup and database-connectivity logs

- `verifyStartupDependencies()` logs and **exits** in production if `DATABASE_URL`, `JWT_SECRET`, `API_SECRET`, or DB pool init fails (`backend/server.js`).
- Successful startup logs: `Startup DB dependency check passed`, server port, health URL, Stripe billing startup status via `StripeBillingService.logStartupStatus()`.
- Health endpoint logs DB query failures via `logger.errorWithContext('Health check database query failed', ...)`.

### Authentication and authorization failures

- Auth route handlers log registration, login, refresh, password, and profile errors via `logger.errorWithContext` / `logger.warn` (`backend/routes/auth.js`).
- JWT middleware (`backend/middleware/auth.js`) returns 401/403 JSON responses **without** dedicated security-audit logging.
- Global error handler classifies JWT errors as `AUTHENTICATION_ERROR` when they bubble to the handler.

### Webhook and payment failures

- Stripe webhook signature failure → `logger.warn('Stripe webhook signature verification failed', ...)`.
- Webhook handler exception → `logger.errorWithContext('Stripe webhook handler error', { type, error })`.
- Stripe billing startup status logged at boot (configuration/mode — not per-transaction alerting).

### Frontend error capture

- `web-project/public/js/error-tracking.js` defines global error handlers, unhandled rejection capture, API error monitoring, and optional Sentry — **but no HTML page in `web-project/public/` includes this script** (grep finds no references).
- Playwright `console-errors.spec.js` and `server-connection.spec.js` capture console errors during E2E against the **local mock API**, providing regression visibility, not production runtime monitoring.

### Railway deployment logs

- Build and deploy output is available in the Railway dashboard for frontend and backend services (platform capability).
- Manual frontend `railway up` failures at **`railpack prepare exited with an error`** are documented in release drafts; active deployments were **not** replaced by those attempts.
- No repository file exports Railway log drains, Logtail, Papertrail, or Datadog integrations (`docs/followups.md` lists log aggregation as optional/future).

**Distinction:** Railway and GitHub provide **log and build visibility**. Repository evidence does **not** prove alert routing (email, Slack, PagerDuty, etc.) is configured for log conditions.

---

## Alert coverage

No repository artifact proves alert **delivery** (notification channel, on-call rotation, or paging rule) is active in production. The table below maps required categories to evidence, intended triggers, and release-gate status.

| Category | Alert delivery evidence | Trigger (intended) | Responder | Severity | Release gate? |
|---|---|---|---|---|---|
| API unavailable / repeated health-check failure | **Not evidenced** — Railway health check config only; UptimeRobot guides not proof of setup | 2+ consecutive failures of `GET /api/health` returning non-200 or `ok: false` (**Proposed, not configured**) | `[Backend owner]` | P0 | **Yes** |
| Persistent database connectivity failure | **Not evidenced** — health returns 503 and logs errors | `/api/health` reports `database.connected: false` for >5 min (**Proposed, not configured**) | `[Database owner]` / `[Backend owner]` | P0 | **Yes** |
| Elevated 5xx / API error rate | **Not evidenced** — in-memory metrics at `/api/metrics`; no scraper/alert evidenced | 5xx rate >5% over 5 min or >10 errors/min on critical routes (**Proposed, not configured**) | `[Backend owner]` | P1 | **Yes** |
| Authentication failure spike | **Not evidenced** — auth errors logged but not aggregated | >50 failed logins/hour or 401 rate 3× baseline (**Proposed, not configured**) | `[Backend owner]` | P1 | No (recommended) |
| Failed payment / webhook processing | **Not evidenced** — webhook errors logged; Stripe Dashboard is manual | Stripe webhook 5xx or `stripe webhook handler error` log spike (**Proposed, not configured**) | `[Backend owner]` / `[Operations owner]` | P1 | **Yes** (if billing in release scope) |
| Failed production deployment | **Not evidenced** — GitHub/Slack notify only after Netlify deploy job; skipped on candidate branch | GitHub Actions deploy job failure or Railway build failure | `[Operations owner]` | P1 | **Yes** |
| Frontend / client JavaScript error spike | **Not evidenced** — Sentry frontend optional; `error-tracking.js` not wired in HTML | Sentry issue volume threshold or new fatal error on dashboard (**Proposed, not configured**) | `[Frontend owner]` | P1 | **Yes** |
| Failed scheduled / sync jobs | **Not applicable** — no production cron/queue evidenced | N/A unless weather-alert cron or offline sync job is deployed | `[Backend owner]` | P2 | No |

### Optional integrations (code or docs only — alert status not proven)

| Integration | Repository evidence | Alert status |
|---|---|---|
| Sentry (backend) | `@sentry/node` in `backend/package.json`; init guarded by `SENTRY_DSN` in `backend/server.js` | Not evidenced |
| Sentry (frontend) | `@sentry/react` in `web-project/package.json`; `error-tracking.js` | Not evidenced (script not included in HTML) |
| UptimeRobot | Setup guides only | Not evidenced |
| Slack (`#smartfarm-deployments`) | `frontend-ci-cd.yml` `notify` job uses `secrets.SLACK_WEBHOOK` after deploy | Not evidenced for candidate branch (deploy skipped) |
| Prometheus/Grafana | `/api/metrics?format=prometheus` endpoint | Not evidenced (no scraper/alert rules in repo) |
| Logtail / Datadog / Better Stack | Mentioned in follow-up docs only | Not evidenced |

---

## Deployment visibility

### GitHub Actions — commit `41ce81f`

| Job / check | Result | Notes |
|---|---|---|
| Playwright (Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari) | **Success** | `.github/workflows/web-quality-gates.yml` and/or `frontend-ci-cd.yml` |
| Web Vite build + dist check | **Success** (when workflow ran for web-project changes) | Artifact: `web-project/dist/` |
| `Smoke — Railway API` | **Skipped** | `if: github.event_name == 'push' && github.ref == 'refs/heads/main'` |
| `Deploy to Production` | **Skipped** | `if: github.ref == 'refs/heads/main'` — Netlify production deploy + post-deploy `curl` health |
| `Deploy SmartFarm Backend to Railway` | **Not run for candidate branch** | `railway-deploy.yml` triggers on `push` to `main` only |

CI artifacts on failure: Playwright traces, test reports, E2E server logs (uploaded per matrix shard).

### Manual frontend Railway deployment failure

- Release drafts record manual `railway up` attempts failing before deployment with **`railpack prepare exited with an error`**.
- Active frontend and backend Railway services **remained online**; failed builds did **not** replace the active frontend deployment.
- Candidate commit `41ce81f` frontend presence on production is **unconfirmed**.

### Pre-release deployment verification requirements

Before treating a release as deployed, operators must confirm:

1. **Which frontend service** is production (Railway vs Netlify vs custom domain).
2. **Root directory** and **build command** match `web-project/railway.toml` (`builder = NIXPACKS`, `npm install --include=dev && npm run build`, `npm start`) or the Netlify publish path (`web-project/dist` per `frontend-ci-cd.yml`).
3. **Deployment source** (GitHub Actions vs CLI vs Railway dashboard) and **commit SHA** served to users.
4. **Backend** deploy path: `backend/railway.json` → `node server.js`, `preDeployCommand: npm run predeploy`.

---

## Critical journey observability

| Journey | Existing test/monitor evidence | Production visibility | Gap / next action |
|---|---|---|---|
| Login / authentication | Integrity runner scenarios F (login/refresh/expired token); Playwright session seed via `seedDashboardSession`; auth error logging in `auth.js` | API auth endpoints reachable; no production login success/failure dashboard evidenced | Run read-only production probe (`backend/scripts/command-center-production-probe.js`) with smoke credentials; confirm 401/200 patterns — **not run in this assessment** |
| Dashboard load and navigation | Playwright `navigation.spec.js`, `console-errors.spec.js`, `dashboard.spec.js`; 375/375 local matrix | Frontend commit `41ce81f` **not confirmed** on production | After frontend deploy verified: manual mobile browser smoke on public URL |
| Livestock / inventory data loading | `server-connection.spec.js` GET livestock/farms/crops; mock API seed | Production API health verified; data-load UX on live frontend unconfirmed | Post-deploy: authenticated GET `/api/livestock` + dashboard section load check |
| Create / read / update workflow | Integrity runner CRUD scenarios; `server-connection.spec.js` `should create livestock via API`; livestock modal E2E specs | Production write path not monitored automatically | Manual or probe script post-deploy; no continuous CRUD monitor evidenced |
| Sync / refresh | Android sync explicitly deferred (Regression Pass 2); `offlineWriteQueue.contract.test.js` unit contract only | **Not evidenced** in production | Defer sync monitoring unless offline queue ships; document in release gates |
| Stripe / billing | `stripeBillingService.test.js`; webhook logging; manual probes (`stripe-billing-production-probe.js`, `stripe-billing-live-cutover-probe.js`) | Stripe Dashboard + Railway logs (manual); no webhook failure alert evidenced | Confirm webhook endpoint reachability and log review procedure for release day |
| API / database health | Verified public `/api/health`; Railway backend healthcheck; Jest smoke test | **Verified** for API + DB connectivity | Add external uptime check or accept manual health polling as interim |
| Deployment and rollback | GitHub deploy workflows; `docs/DEPLOYMENT_GUIDE.md` documents `railway rollback` / Netlify rollback | Rollback **rehearsal not recorded** (scheduled 21-Aug in release drafts) | Complete rollback rehearsal and record commands, IDs, and timing |

---

## Gaps and release gates

### Required open gates

- [ ] **Confirm production frontend deployment for candidate commit `41ce81f`**
  - *Why:* Monitoring client-side failures is moot if production does not serve the candidate.
  - *Proof closes gate:* Railway/Netlify deployment log showing successful build for `41ce81f`, plus public asset or response header confirming SHA/build identity.

- [ ] **Review frontend Railway build configuration/root directory after Railpack prepare failures**
  - *Why:* Repeated `railpack prepare exited with an error` blocks CLI deploys and may indicate wrong root directory or builder settings.
  - *Proof closes gate:* Successful dry-run build log from correct root (`web-project`) or documented fix with green deploy.

- [ ] **Confirm owner and notification channel for API availability incidents**
  - *Why:* Health checks and logs exist but no evidenced paging path.
  - *Proof closes gate:* Named primary/backup owner and channel (email, Slack, etc.) recorded in runbook — not necessarily configured in this repo.

- [ ] **Confirm independent uptime monitoring or explicitly defer it with release-owner approval**
  - *Why:* Railway health checks do not replace external perspective or operator notifications.
  - *Proof closes gate:* UptimeRobot (or equivalent) monitor ID/screenshot **or** written deferral signed by `[Release owner]`.

- [ ] **Confirm production deployment smoke-check behavior; current GitHub jobs are skipped**
  - *Why:* `Smoke — Railway API` and `Deploy to Production` did not run for `41ce81f` (non-`main` branch).
  - *Proof closes gate:* Manual execution of `railway-smoke` Playwright project against production **or** merge to `main` with green smoke + deploy jobs **or** documented manual smoke checklist completed on release day.

- [ ] **Verify rollback rehearsal evidence on 21-Aug**
  - *Why:* Release drafts require documented rollback before approval; no timing/commands recorded yet.
  - *Proof closes gate:* Dated rollback rehearsal note with service, command, duration, and verification step (`docs/DEPLOYMENT_GUIDE.md` references `railway rollback` / Netlify rollback).

### Additional evidence-based gaps

- [ ] **Wire or confirm frontend error tracking** — `error-tracking.js` exists but is not included in public HTML pages.
- [ ] **Confirm `SENTRY_DSN` / `VITE_SENTRY_DSN` in production** — code supports Sentry; configuration presence not verified (no secrets inspected).
- [ ] **Define metrics export path** — `/api/metrics` is in-process only; no Prometheus/Grafana scraper evidenced.
- [ ] **Auth failure visibility** — 401 responses from middleware are not audit-logged; consider structured security logs for release hardening (future work).
- [ ] **Slack deploy notifications** — `frontend-ci-cd.yml` notify job depends on deploy jobs completing on `main`; not exercised for candidate branch.

---

## Day-of-release monitoring plan

Read-only checks and observation only. Steps below are **proposed** unless marked as already verified in Release context.

### Pre-deploy

- [ ] Record current production backend health: `GET /api/health` → expect `ok: true`, `database.connected: true` *(API baseline already verified for current production)*.
- [ ] Record active frontend URL and note last known good deployment source (Railway/Netlify/dashboard).
- [ ] Confirm GitHub required checks green on the release SHA (Playwright matrix).
- [ ] Identify Railway/GitHub log tab URLs for backend and frontend (bookmarks — no credentials in runbook).
- [ ] Assign on-call roles from Ownership table below.

### During deployment

- [ ] Watch Railway backend deploy logs for migration/predeploy errors and `Startup DB dependency check passed`.
- [ ] Watch frontend build logs; abort observation if `railpack prepare` or equivalent build failure appears.
- [ ] After backend deploy completes, poll `GET /api/health` until stable 200 with `ok: true`.
- [ ] After frontend deploy completes, load public homepage and dashboard (hard refresh / incognito).

### First 15 minutes

- [ ] `GET /api/health` — confirm `ok: true`, DB connected.
- [ ] `GET /api/farms` without auth — expect **401/403** (connectivity smoke, per `railway-smoke.spec.js`).
- [ ] Login with smoke account (manual); confirm dashboard loads without critical console errors.
- [ ] Tail Railway backend logs for new `errorWithContext` or Stripe webhook errors.
- [ ] Run focused Playwright smoke locally against production URL when directed by `[Release owner]` (read-only GET checks only).

### First hour

- [ ] Re-check `/api/health` every 15 minutes.
- [ ] Spot-check livestock and inventory sections on mobile viewport (Mobile Chrome/Safari or device).
- [ ] Review Sentry dashboard if DSN is confirmed configured (error count baseline).
- [ ] Review Stripe Dashboard → Developers → Webhooks for delivery failures (if billing in scope).
- [ ] Confirm no elevated 5xx in Railway logs (manual scan).

### End-of-day review

- [ ] Document health-check results, any log anomalies, and deploy SHAs in release notes.
- [ ] Update open gates checklist with pass/fail/deferred.
- [ ] Capture Playwright/CI artifact links for the release SHA.
- [ ] Schedule 21-Aug rollback rehearsal if not completed.
- [ ] `[Release owner]` sign-off on whether monitoring gaps are acceptable or block release.

---

## Ownership and escalation

| Event | Severity | Primary owner | Backup owner | Evidence location | Escalation action |
|---|---|---|---|---|---|
| API `/api/health` failing or `ok: false` | P0 | `[Backend owner]` | `[Operations owner]` | Railway backend logs; public health URL | Page backup; check DB connectivity; consider Railway rollback per rehearsal |
| Database connectivity failure | P0 | `[Database owner]` | `[Backend owner]` | `/api/health` JSON; Railway Postgres metrics | Inspect Railway Postgres service; coordinate with backend on pool/connection string |
| Sustained 5xx / unhandled server errors | P1 | `[Backend owner]` | `[Operations owner]` | Railway logs; Sentry (if configured) | Identify route from log context; hotfix or rollback |
| Authentication outage (login/refresh down) | P1 | `[Backend owner]` | `[Frontend owner]` | Railway logs (`auth.js` errors); manual login test | Check JWT/DB/auth routes; communicate user impact |
| Stripe webhook processing failures | P1 | `[Backend owner]` | `[Operations owner]` | Railway logs; Stripe Dashboard webhook log | Replay failed events in Stripe; fix signature/secret mismatch |
| Frontend unavailable or JS error spike | P1 | `[Frontend owner]` | `[Operations owner]` | Railway/Netlify deploy logs; browser console; Sentry (if configured) | Roll back frontend deploy; verify `web-project` build output |
| Failed GitHub deploy / CI gate | P1 | `[Operations owner]` | `[Release owner]` | GitHub Actions run for release SHA | Block release; fix workflow or manual deploy per runbook |
| Playwright regression failure on release SHA | P1 | `[Frontend owner]` | `[Release owner]` | GitHub Actions artifacts/traces | Do not promote; triage failing spec |
| Independent uptime monitor alert | P0 | `[Operations owner]` | `[Backend owner]` | UptimeRobot (or equivalent) dashboard | Execute API health triage; escalate to backend if platform healthy externally but app unhealthy |

---

*Assessment date: 20 Aug 2026. Read-only repository inspection — no configuration, deployment, or code changes were made.*
