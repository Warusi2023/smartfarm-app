# SmartFarm — Web-only release checklist

Concise audit of **web frontend + hosted API** readiness (Android out of scope).

---

## Current status

| Area | Status |
|------|--------|
| **Live API health** | `GET https://web-production-86d39.up.railway.app/api/health` returns **HTTP 200** (verified from this environment on **2026-05-13**). Historical “Railway 502” notes in repo docs are **out of date** relative to this check. |
| **Production API URL in repo** | `web-project/.env.production` and `web-project/netlify.toml` use **origin only** (no `/api` suffix), aligned with comments in `.env.production`. |
| **Netlify config** | `web-project/netlify.toml` sets `VITE_API_URL` / `VITE_API_BASE_URL` to the same Railway origin and defines `/api/*` → Railway proxy redirects. |
| **Root README** | Still contains **placeholders** (`<repository-url>`, `your-username` in GitHub links). |

---

## Stale repo notes (follow-up)

| File | Issue |
|------|--------|
| `TODOS_STATUS_REPORT.md` | **Updated 2026-05-13** — historical 502 narrative separated; points here. |
| `TODO_COMPLETION_STATUS.md` | **Updated 2026-05-13** — same. |
| `PRODUCTION_TRANSFORMATION_PLAN.md` | **Updated 2026-05-13** — roadmap preserved under “Historical”; current web cut defers to this file. |
| `.github/workflows/README.md` | **Still empty** — consider a short pointer to `frontend-ci-cd.yml` and `WEB_RELEASE_CHECKLIST.md`. |

---

## Must verify before release

1. **Production host actually serves the Vite build**  
   Confirm the live site is built from `web-project` with `publish` = **`dist`** (per `web-project/netlify.toml`). **`.github/workflows/frontend-ci-cd.yml`** now uploads **`web-project/dist/`** and sets Netlify **`publish-dir`** to **`./web-project/dist`** (with a `test -f web-project/dist/index.html` guard). If production uses **Netlify UI** instead of this workflow, confirm it still uses base `web-project` and **`dist`**. Root **`.github/workflows/netlify-deploy.yml`** may still target `./public` at repo root — treat as legacy unless verified.

2. **Environment parity**  
   Netlify (or your host) **`VITE_API_URL` / `VITE_API_BASE_URL`** match `web-project/.env.production` and use **origin only** (see `/api/api` below).

3. **Railway secrets**  
   `DATABASE_URL`, `JWT_SECRET`, `CORS_ORIGINS`, mail keys, etc. set in Railway — not only in local `backend/.env`. Set **`PUBLIC_FRONTEND_URL`** to one canonical origin for email links (never copy `CORS_ORIGINS` into it). See `backend/EMAIL_LINKS_PRODUCTION.md`. Reconcile with `docs/setup-deployment/ENVIRONMENT_VARIABLES.md` if you use it.

4. **CORS for every public web origin**  
   Run `scripts/check-deployment-status.ps1` or `scripts/complete-todo-verification.ps1` (both assume `https://www.smartfarm-app.com`). Add any extra origins (e.g. Netlify preview URLs) to backend `CORS_ORIGINS` if needed.

5. **Smoke auth + API**  
   Register/login, token persistence, and at least one authenticated `GET` (e.g. farms) against production.

6. **Live browser verification**  
   On the **deployed** production URL, run **[`WEB_PRODUCTION_VERIFICATION.md`](./WEB_PRODUCTION_VERIFICATION.md)** (Network, CORS, auth headers, built JS) to confirm a single `/api` prefix and no client-side CORS failures.

---

## Should fix soon

| Item | Detail |
|------|--------|
| **`.github/workflows/release.yml`** | On tag `v*`, installs `railway-minimal` (**directory not present** in repo), builds Android, uses deprecated `actions/create-release@v1`. Not a reliable **web** release path as-is. |
| **`scripts/check-deployment-status.ps1` / `complete-todo-verification.ps1`** | Hard-coded Railway host + `https://www.smartfarm-app.com`. Parameterize or document overrides so checks stay accurate when URLs change. |

**Recently addressed (2026-05-13):** `web-project/.env.example` (origin-only + comments); `web-project/public/js/api-origin.js` + script tags before `api-config.js` / `config.js`; `environment.js`, `config.js`, `api-config.js`, `weather-alerts-service.js` (join/normalize); `.github/workflows/ci.yml` test API origin; `.github/workflows/frontend-ci-cd.yml` artifact + publish = **`web-project/dist/`**; `web-project/package.json` adds **`npm run test`** for Playwright.

---

## Nice to clean up

- **Canonical URL duplication**: Railway hostname appears in many files (`web-project/public/js/api-client.js`, `environment.js`, `api-config.js`, scripts). Consider a single config source to avoid drift.
- **Disabled workflows**: `deploy.yml.disabled`, `ci.yml.disabled`, `backend-ci-cd.yml.disabled` — remove or document why they exist.
- **`deploy-backend.yml`**: Explicit placeholder no-op; fine, but easy to mistake for real deploy.
- **Root `README.md`**: Replace placeholder clone/issue URLs; optional **web-only** quick path without Android steps.

---

## Top 5 manual smoke tests (production)

1. Open the **live site** home/dashboard — no blocking console errors; assets load over HTTPS.  
2. **`/api/health` via browser or curl** — **200** and sensible JSON from Railway.  
3. **Login** (or register → login) — session/token works; refresh still authenticated.  
4. **One CRUD path** — e.g. list farms or crops; create or edit if your role allows.  
5. **Cross-origin behavior** — from the real production origin, Network tab: API calls hit `https://web-production-86d39.up.railway.app/...` (or Netlify `/api` proxy if used), **no CORS failures** on core flows.

---

## Go / no-go recommendation

**Conditional go** for a **web** cut if and only if:

- Production frontend is confirmed to be the **`dist`** build with correct env injection (not an accidental **`public`-only** deploy from CI), and  
- Smoke tests above pass on the **actual** URL users will use.

**No-go** until resolved if: the live site is served from CI artifacts pointing at **`web-project/public`** without the Vite build, or auth/API smoke tests fail on production.

---

## Release decision crib sheet

### “Must verify before release” — manual vs automation

| # | Item | Typical owner | Manual / live | Automatable in CI/CD |
|---|------|---------------|---------------|-------------------------|
| 1 | Production host serves **`web-project/dist`** (not raw `public/`) | Netlify/host settings + deploy path | **Manual** (dashboard + spot-check deployed HTML/asset URLs). **`WEB_PRODUCTION_VERIFICATION.md`** | **Partial:** Vite build + `test -f web-project/dist/index.html` in CI proves the **artifact**; CI cannot prove what the **host UI** publishes if builds are done outside GitHub Actions. |
| 2 | **Env parity** (`VITE_API_URL` / `VITE_API_BASE_URL` origin-only, matches intent) | Netlify env | **Manual** (site env UI vs `web-project/.env.production`) | **Partial:** lint/check scripts against committed examples; **secrets** stay manual. |
| 3 | **Railway secrets** (`DATABASE_URL`, `JWT_SECRET`, `CORS_ORIGINS`, mail, etc.) | Railway dashboard | **Manual** | **No** (avoid exfiltrating secrets; use Railway’s own checks). |
| 4 | **CORS** for every browser origin you ship | Backend `CORS_ORIGINS` + browser | **Manual:** **`WEB_PRODUCTION_VERIFICATION.md`** or `scripts/check-deployment-status.ps1` | **Partial:** add a CI `curl` with `-H Origin: …` if you want; **`web-quality-gates.yml`** only **GETs** `/api/health` (no CORS guarantee). |
| 5 | **Smoke auth + API** (login, token, authenticated GET, one write) | Tester | **Manual** on production (credentials) | **Partial:** Playwright in CI against **mock/staging**; production auth remains manual unless you add a dedicated non-prod test user + stable env. |
| 6 | **Live browser verification** (single `/api`, no CORS noise) | Tester | **Manual:** **`WEB_PRODUCTION_VERIFICATION.md`** | **No** full substitute (needs real browser + prod URL). |

**Minimal CI/CD gates (web):** see **`.github/workflows/web-quality-gates.yml`** — fails the workflow if **Vite build** fails, **`web-project/dist/index.html`** is missing after build, or **Playwright** fails; optional **production GET `/api/health`** on `main` pushes. *(Playwright still serves `public/` per `web-project/playwright.config.js`; the **dist** check is the Vite build step.)*

### GO if… (live environment)

- Netlify (or host) **publish directory** is **`dist`** from `web-project`, not unbuilt `public/` only.
- **Site env** matches intended **origin-only** API base (aligned with `web-project/.env.production` / `netlify.toml`).
- **Railway** has required **secrets** and **`CORS_ORIGINS`** includes the **exact** production browser origins you use.
- **`WEB_PRODUCTION_VERIFICATION.md`** passes on the **real production URL** (Network: single `/api`, 2xx on core flows, no CORS/CORB issues, auth headers/storage OK).
- **`/api/health`** on `https://web-production-86d39.up.railway.app` returns **200** when you cut the release (spot-check).

### NO-GO if… (do not ship, even if CI is green)

- Live site serves **stale** or **non-Vite** assets (e.g. wrong publish folder, or old deploy).
- Requests show **`/api/api/`** or **wrong API host** in the browser Network tab.
- **Console** shows **CORS** / **opaque** / repeated **Failed to fetch** on login, dashboard, or writes.
- **Login works** but **subsequent API calls** are **401** without **Authorization** (or missing session) — client or env mismatch.
- **Railway health** is not **200** at release time, or **CORS** preflight **OPTIONS** fails for your production origin.

### Today’s release run (2026-05-13)

- [ ] **CI:** `.github/workflows/web-quality-gates.yml` **green on `main`** for this commit (Vite build, `web-project/dist/index.html` exists, Playwright tests pass).
- [ ] **CI:** Any other web-related workflows on `main` (e.g. `frontend-ci-cd.yml`) **green** for this commit.
- [ ] **Railway:** `https://web-production-86d39.up.railway.app/api/health` returns **200** at least twice (before and after browser checks), no recent 5xx spikes in logs for this environment.
- [ ] **Env parity:** Netlify (or hosting) env vars for the web frontend match `web-project/.env.production` / `.env.example` for API origin, and no outdated API hosts remain.
- [ ] **Secrets:** Railway env has correct **DB URL**, **JWT secret**, and any mail/third-party keys set (no “TODO” values; no need to rotate today unless compromised).
- [ ] **Live browser:** Run all steps in [`WEB_PRODUCTION_VERIFICATION.md`](./WEB_PRODUCTION_VERIFICATION.md) against the **current production URL** and confirm:
  - All API calls hit the intended host with a **single** `/api` segment.
  - No CORS/CORB/“Failed to fetch” errors in the console for core flows.
  - Auth (headers/cookies) behaves correctly across refresh.
- [ ] **Core flows:** On the live site, complete at least one full happy path end-to-end (login → dashboard → create/update an entity → see updated data) with no unexpected errors.
- [ ] **Visual sanity:** Spot-check at least 2–3 key pages (login, dashboard, a main feature page) on desktop + mobile for obviously broken UI, navigation, or missing assets.
- [ ] **Final Railway check:** After browser testing, re-check health and recent logs to ensure no new errors appeared during the smoke tests.
- [ ] **Documentation:** Confirm `WEB_RELEASE_CHECKLIST.md` and `WEB_PRODUCTION_VERIFICATION.md` still accurately describe what you just did (update wording only if reality diverged).

**GO / NO-GO decision:** ________________

**Decision notes:** ________________

---

*Sources include: `WEB_RELEASE_CHECKLIST.md` (this file), `TODO_COMPLETION_STATUS.md`, `TODOS_STATUS_REPORT.md`, `PRODUCTION_TRANSFORMATION_PLAN.md`, `web-project/.env.production`, `web-project/netlify.toml`, `web-project/public/js/api-origin.js`, `environment.js`, `config.js`, `api-config.js`, `.github/workflows/frontend-ci-cd.yml`, `ci.yml`, `scripts/check-deployment-status.ps1`, `scripts/complete-todo-verification.ps1`.*
