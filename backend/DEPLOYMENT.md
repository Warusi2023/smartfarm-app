# Backend deployment (Railway)

## Railway Deployment (Canonical Path)

- **Services:** One Node backend service (`backend/`) plus one PostgreSQL service (Railway Postgres) or external Neon Postgres.
- **Required backend env vars (minimum):**
  - `DATABASE_URL`
  - `JWT_SECRET`
  - `API_SECRET`
  - `NODE_ENV=production`
- **Feature env vars:** Email, weather, Sentry, Redis, and other optional integrations as needed by enabled features.
- **DATABASE_URL wiring:**
  - Railway Postgres reference (example): `${{Postgres.DATABASE_URL}}`
  - or set directly to Neon connection URL.
- **Migrations:** Run `npm run migrate:prod` against the production database before or at deployment rollout.
- **Start command:** `npm start` (resolves to `node server.js`).
- **Railway healthcheck path:** `/api/health/ready`.
- **Not used for current production:** `server-production.cjs`, `server-simple.cjs`, and scripts in `legacy-scripts/`.

## Canonical entrypoint

- **Start:** `node server.js` (from the `backend/` root).
- **Source of truth:** `package.json` → `"start": "node server.js"`.
- **`nixpacks.toml`** and **`railway.json`** align with that.
- **Environment loading:** `server.js` loads `.env` for local parity; production should inject env vars at the platform level.

## Not for production API

- **`server-simple.cjs`** — demo/static handler with **mock** auth (`mock-jwt-token`). Do **not** point Railway’s start command at it.
- **`server-production.cjs`** — legacy alternate server. Do **not** use as release runtime while `package.json` start points to `server.js`.
- **`package-production.json` / `package-full.json`** — alternate manifests; `"start"` now uses `server.js`. Prefer the main **`package.json`** for installs.

## Railway (manual)

See **Post-deploy verification** below and `scripts/verify-production-deploy.sh`.

## Legacy repo docs

Older markdown files may still mention `server-simple.cjs` or `bootstrap.cjs`. **This file and `package.json` override those** for current intent.
