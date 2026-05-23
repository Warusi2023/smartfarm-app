# SmartFarm Web Release Checklist (Beta)

Operational checklist for deploying SmartFarm changes to production (**Railway** backend + **Netlify** frontend). Android is out of scope.

**Before any beta cut:** operators and testers should read **[`docs/BETA_LIMITATIONS.md`](./docs/BETA_LIMITATIONS.md)** (repo) or **`/docs/BETA_LIMITATIONS.md`** on the live site (`web-project/public/docs/` → `dist/docs/` after build).

**Related:** [`WEB_PRODUCTION_VERIFICATION.md`](./WEB_PRODUCTION_VERIFICATION.md) (browser Network/CORS/auth), [`docs/WEEK1_WEB_RELEASE.md`](./docs/WEEK1_WEB_RELEASE.md) (Week 1 scope).

---

## 0. Scope and impact

- [ ] List issues / PRs included in this release (e.g., W2-02, W2-03, W2-05).
- [ ] Confirm whether release changes:
  - [ ] DB schema or migrations
  - [ ] Auth behavior
  - [ ] Any file-fallback logic
  - [ ] Any dashboard financial or soil flows

---

## 1. Pre-deploy checks

- [ ] `main` is green; all required commits are merged.
- [ ] Review [`docs/BETA_LIMITATIONS.md`](./docs/BETA_LIMITATIONS.md) and update if the release changes any assumptions.
- [ ] For DB migrations:
  - [ ] Verify migration scripts against staging or a local snapshot.
  - [ ] Confirm rollback SQL is documented in the PR.

---

## 2. Railway (backend) deploy

### 2.1 Apply migrations (if any)

- [ ] Run DB migrations on Railway (e.g., `soiltests`, `farmcosts`, `farmrevenue` updates).
- [ ] Confirm:
  - [ ] `SELECT to_regclass('public.soiltests');`
  - [ ] `SELECT to_regclass('public.farmcosts');`
  - [ ] `SELECT to_regclass('public.farmrevenue');`

### 2.2 Deploy backend code

- [ ] Deploy latest `main` to Railway.
- [ ] Check `/api/health`:
  - [ ] `200` and `database.connected: true`.
- [ ] Tail logs for:
  - [ ] migration errors
  - [ ] route initialization errors (farm-summary, crop-recommendations, farm-costs).

### 2.3 Backend smoke tests

With a valid JWT:

- [ ] `GET /api/farm-summary/financials?period=month` → `200`, correct shape.
- [ ] `POST /api/farm-costs/feed-mix` → `201`, cost row saves.
- [ ] `POST /api/farm-summary/revenue` → `201`, revenue row saves.
- [ ] `POST /api/crop-recommendations/soil-tests` → `201`, `soiltests` row saves (authenticated UUID user).
- [ ] `GET /api/crop-recommendations/soil-tests/latest/:cropId` → `200` for a crop with a test.
- [ ] `POST /api/crop-recommendations/actions` with optional `costAmount` → `201`, `farmcosts` row when cost provided.

---

## 3. Netlify (frontend) deploy

### 3.1 Build and deploy

- [ ] Trigger Netlify deploy from latest `main`.
- [ ] Confirm build succeeded (no JS bundle errors).
- [ ] Confirm publish directory is **`web-project/dist`** (Vite build), not raw `public/` only.

### 3.2 Frontend smoke tests

In a fresh browser session (or private window):

- [ ] Login with email/password:
  - [ ] `smartfarm_token` is a JWT (three segments with dots).
- [ ] Dashboard:
  - [ ] “Today on farm” panel loads (no JS errors).
  - [ ] Financial card:
    - [ ] `GET /api/farm-summary/financials?period=month` is `200` in Network tab with Bearer JWT.
  - [ ] Log revenue:
    - [ ] `POST /api/farm-summary/revenue` → `201`.
    - [ ] Net margin updates.
- [ ] Crop management:
  - [ ] Save soil test.
  - [ ] Crop card shows latest soil test summary (date, pH, N/P/K).
  - [ ] Soil modal refine still works.
  - [ ] Log crop action with and without cost:
    - [ ] no cost → action saves.
    - [ ] with cost → dashboard costs increase.
- [ ] AI advisory:
  - [ ] Soil tab refine matches crop soil modal for same inputs.
  - [ ] Shared disclaimer visible.

---

## 4. Post-deploy monitoring

- [ ] Watch logs/errors for:
  - [ ] new auth failures (`MISSING_TOKEN`, `INVALID_TOKEN`).
  - [ ] DB errors on `soiltests` / `farmcosts` / `farmrevenue`.
- [ ] Confirm no spike in 4xx/5xx for:
  - [ ] `/api/farm-summary/financials`
  - [ ] `/api/crop-recommendations/*`
  - [ ] `/api/farm-costs/*`

---

## 5. Communication

- [ ] Note any **beta limitations** that changed in this release (link to [`docs/BETA_LIMITATIONS.md`](./docs/BETA_LIMITATIONS.md)).
- [ ] If relevant, notify internal testers which features need focused validation (e.g., new cost capture, soil summaries, financials).

**GO / NO-GO decision:** ________________

**Decision notes:** ________________

---

## Reference — environment and CI

| Item | Detail |
|------|--------|
| **Production API** | `https://web-production-86d39.up.railway.app` — origin only in `web-project/.env.production` / `netlify.toml` (no `/api` suffix on env vars). |
| **Netlify** | `web-project/netlify.toml` — `npm run build` → publish **`dist/`**; `/api/*` proxies to Railway. |
| **Deploy order** | **Railway first** (migrations + API), **Netlify second** (frontend that calls new routes). |
| **CI** | `.github/workflows/web-quality-gates.yml` — Vite build + `dist/index.html` + Playwright. |

### GO if…

- Live site serves **`web-project/dist`** with correct env injection.
- **`/api/health`** returns **200** with `database.connected: true`.
- [`WEB_PRODUCTION_VERIFICATION.md`](./WEB_PRODUCTION_VERIFICATION.md) passes on the production URL (single `/api` prefix, no CORS failures on core flows).
- Beta smoke sections **2.3** and **3.2** above pass for this release’s features.

### NO-GO if…

- Live site serves stale or non-Vite assets (wrong publish folder).
- Network tab shows **`/api/api/`** or wrong API host.
- Login works but authenticated calls are **401** without Bearer JWT.
- Railway health is not **200** at release time, or CORS **OPTIONS** fails for your production origin.

### Stale repo notes (follow-up)

| File | Issue |
|------|--------|
| `.github/workflows/release.yml` | References missing `railway-minimal`; not a reliable web release path. |
| Root `README.md` | May still contain placeholder clone URLs. |

---

*Last structural update: 2026-05-23 (Week 2 beta deploy flow).*
