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

Confirmed on `https://www.smartfarm-app.com`:

| Endpoint | Expected | Result |
|----------|----------|--------|
| `GET /api/health` | 200 JSON | Pass |
| `GET /api/auth/profile` | 200 JSON (with token) | Pass |
| `GET /api/auth/me` | 200 JSON (with token) | Pass |

Browser console checks:

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
