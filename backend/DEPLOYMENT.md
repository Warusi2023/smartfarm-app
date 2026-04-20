# Backend deployment (Railway)

## Canonical entrypoint

- **Start:** `node server.js` (from the `backend/` root).
- **Source of truth:** `package.json` → `"start": "node server.js"`.
- **`nixpacks.toml`** and **`railway.json`** align with that.

## Not for production API

- **`server-simple.cjs`** — demo/static handler with **mock** auth (`mock-jwt-token`). Do **not** point Railway’s start command at it.
- **`package-production.json` / `package-full.json`** — alternate manifests; `"start"` now uses `server.js`. Prefer the main **`package.json`** for installs.

## Railway (manual)

See **Post-deploy verification** below and `scripts/verify-production-deploy.sh`.

## Legacy repo docs

Older markdown files may still mention `server-simple.cjs` or `bootstrap.cjs`. **This file and `package.json` override those** for current intent.
