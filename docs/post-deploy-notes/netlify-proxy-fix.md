# Netlify API proxy fix (commits `758392e`, `b5b6a2d`)

## Summary

Fixed production routing for the Netlify-hosted frontend so same-origin `/api/*` requests proxy to Railway and are not intercepted by SPA fallback.

## Problem

Browser calls to `/api/...` on `www.smartfarm-app.com` returned **HTML** instead of **JSON**, breaking auth and health checks.

- The public domain is hosted on **Netlify**, not Railway.
- SPA fallback (`/* → /index.html`) took precedence over the API proxy, so `/api/*` was treated like a frontend route.
- Redirect rules were inconsistent after merge: published `dist/_redirects` lacked `/api/*`, while `[[redirects]]` in `netlify.toml` conflicted when merged.

## Fix

1. Moved API proxy + SPA fallback into `web-project/public/_redirects` → published as `dist/_redirects`.
2. Forced `/api/*` proxy with `200!` to `https://web-production-86d39.up.railway.app`.
3. Removed `[[redirects]]` from both `netlify.toml` files (repo root and `web-project/`).
4. Added `web-project/scripts/write-netlify-redirects.mjs` so post-build always writes canonical `_redirects` into `dist/`.

Published redirect rules (order matters):

```
/api/*  https://web-production-86d39.up.railway.app/api/:splat  200!
/*      /index.html  200
```

## Note on commit `76548e3`

Commit `76548e3` (Railway web-service proxy via `serve-dist-with-api-proxy.js`) fixes same-origin API routing on the **Railway web service**. It does **not** affect the public domain — `www.smartfarm-app.com` is hosted on Netlify. This Netlify-side fix is what restored production API behavior on the public domain.

## Deploy

- **Requires:** Netlify redeploy (clear cache recommended).
- **No backend changes** required for this fix.

Netlify build (repo root config):

```toml
[build]
  command = "cd web-project && npm install --include=dev && npm run build"
  publish = "web-project/dist"
```

## Verification (production)

**Status:** Broken-link and route verification completed; all checked links and `/api/*` endpoints respond as expected on `www.smartfarm-app.com` (commits `758392e`, `b5b6a2d`, docs `35c06ac`).

### API routes — public domain (`www.smartfarm-app.com`)

Same-origin `/api/*` returns **JSON**, not HTML. SPA fallback does **not** swallow API routes.

| URL | Method | Expected | Actual |
|-----|--------|----------|--------|
| `/api/health` | GET | 200 JSON | ✅ 200 `application/json` |
| `/api/auth/profile` | GET (no token) | JSON error | ✅ 401 `application/json` |
| `/api/auth/me` | GET (no token) | JSON error | ✅ 401 `application/json` |
| `/api/auth/profile` | GET (valid token) | 200 JSON | ✅ 200 `application/json` (browser, logged in) |
| `/api/auth/me` | GET (valid token) | 200 JSON | ✅ 200 `application/json` (browser, logged in) |
| `/api/auth/forgot-password` | POST | JSON | ✅ 200 `application/json` |

**SPA vs API separation:** `GET /nonexistent-page-xyz` → 200 HTML (SPA fallback, expected). `GET /api/health` → 200 JSON (proxy to Railway, expected).

### Railway direct backend (sanity check)

| URL | Expected | Actual |
|-----|----------|--------|
| `GET https://web-production-86d39.up.railway.app/api/health` | 200 JSON | ✅ 200 `application/json` |

Public-domain behavior is fixed on **Netlify**; Railway direct path was already healthy and remains unchanged.

### Public web UI — sampled routes

All returned **200** with expected content type (`text/html` unless noted):

| Route | Status |
|-------|--------|
| `/`, `/index.html`, `/dashboard.html` | ✅ 200 |
| `/login.html`, `/register.html`, `/forgot-password.html`, `/reset-password.html` | ✅ 200 |
| `/pricing.html`, `/help.html`, `/traceability.html` | ✅ 200 |
| `/about.html`, `/contact.html`, `/settings.html` | ✅ 200 |
| `/privacy-policy.html`, `/terms-of-service.html`, `/data-security.html`, `/cookie-policy.html` | ✅ 200 |
| `/subscription-management.html`, `/verify-email.html`, `/insights.html`, `/release-notes.html` | ✅ 200 |
| `/docs/BETA_LIMITATIONS.md` | ✅ 200 `text/markdown` |
| `/robots.txt` | ✅ 200 `text/plain` |

**Navigation anchors:** `pricing.html` → `/#features` present; `index.html` has `#features`, `#pricing`, `#faq` targets.

**Dashboard sidebar sample:** `/crop-management.html`, `/watering-management.html`, `/user-management.html`, `/weather-alerts.html`, `/ai-advisory.html`, `/farm-to-table.html` → all ✅ 200.

### In-repo documentation links

| Source | Link | Status |
|--------|------|--------|
| `CHANGELOG.md` | `docs/post-deploy-notes/netlify-proxy-fix.md` | ✅ file exists |
| `POST_DEPLOY_NOTES.md` | `docs/post-deploy-notes/netlify-proxy-fix.md` | ✅ file exists |
| `CHANGELOG.md` | `docs/BETA_LIMITATIONS.md`, `docs/WEEK1_WEB_RELEASE.md` | ✅ files exist |
| GitHub `main` (reviewers) | raw `docs/post-deploy-notes/netlify-proxy-fix.md` | ✅ HTTP 200 |

### Out of scope (pre-existing, non-blocking)

Local static audit reports **`features.html`** missing from `web-project/public/`. Production `GET /features.html` returns **200 HTML** (SPA fallback to homepage), not 404. Hash links (`index.html#features`, `/#features`) resolve correctly. **Not related to the Netlify proxy fix.**

### Browser console checks

```javascript
fetch("/api/health")
  .then(async r => ({
    status: r.status,
    contentType: r.headers.get("content-type"),
    body: r.headers.get("content-type")?.includes("application/json")
      ? await r.json()
      : await r.text()
  }))
  .then(console.log);

const token = localStorage.getItem("smartfarm_token");
fetch("/api/auth/profile", {
  headers: { Authorization: `Bearer ${token}` }
}).then(r => r.json()).then(console.log);
```

If the browser still returns HTML after deploy, unregister the service worker (DevTools → Application → Service Workers) and hard refresh — `sw.js` can cache stale `/api/auth/profile` responses.

## Outcome

- Same-origin `/api/...` browser requests reach Railway correctly.
- SPA fallback no longer intercepts API traffic.
- Redirect configuration is stable across builds and Netlify config merges.
