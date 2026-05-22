# SmartFarm — web production verification (live browser)

**[`WEB_RELEASE_CHECKLIST.md`](./WEB_RELEASE_CHECKLIST.md)** — release readiness (build paths, env parity, secrets, CI).  
**This file** — **runtime / browser** checks on the **real deployed** site (Chrome or Brave).

**Scope:** Web only. No Android.

---

## Purpose

Confirm on **production** that:

- API calls use the correct **Railway** origin with **exactly one** `/api` path segment (no `/api/api/...`).
- Main flows return **2xx** where expected and show **no** CORS/CORB/opaque-response failures.
- **Built** assets reflect the intended API **origin** (normalized base).
- **Auth** (headers / storage) looks correct over **HTTPS**.

---

## Assumptions

| Item | Value |
|------|--------|
| Frontend | Vite build from `web-project` → publish **`web-project/dist`** (e.g. Netlify or Netlify-like static host) |
| Backend origin | `https://web-production-86d39.up.railway.app` |
| Production site | Your **live public URL** (custom domain or `*.netlify.app`) — not `localhost` |
| Browser | **Chrome** or **Brave** |

Replace “your production URL” below with the exact URL users hit (e.g. `https://www.smartfarm-app.com`).

---

## Pre-checks

- [ ] Open the **production** URL in a **normal** window (use the same cookie policy your users use).
- [ ] **Hard refresh** once: **Ctrl+Shift+R** (Windows/Linux) or **Cmd+Shift+R** (macOS).
- [ ] Optional: open `https://web-production-86d39.up.railway.app/api/health` in a tab — expect **200** and JSON (sanity only).

---

## Network verification

1. Open **DevTools** → **Network**.
2. Turn **Preserve log** **ON**.
3. Set filter to **Fetch/XHR** (or type `api` in the filter box).
4. Exercise the app in order:
   - [ ] **Login** (or register → login)
   - [ ] **Dashboard** (or main data view)
   - [ ] **At least one write** (create/update farm, crop, livestock, or equivalent)
5. For **each** important request, click the row and verify in **Headers**:
   - [ ] **Request URL** is either:
     - `https://web-production-86d39.up.railway.app/api/...` with **one** `/api`, **or**
     - `https://<your-production-host>/api/...` (Netlify **proxy**) with **one** `/api` and **2xx** when the action succeeds
   - [ ] **Status** is **2xx** for happy paths (allow **401/403** only when intentionally unauthenticated)
6. For one login and one authenticated call, open **Payload** (request) and **Response** (response) tabs — confirm sensible JSON/errors, not empty/opaque failures.

---

## CORS / auth verification

### Console

- [ ] **DevTools** → **Console**: no repeated **CORS blocked**, **Failed to fetch**, or **CORB** / opaque-response errors tied to the Railway host or your `/api` proxy during login → dashboard → write.

### Request headers (authenticated call)

Pick a **Fetch/XHR** after login (e.g. `GET .../api/farms` or `.../api/auth/me`):

- [ ] **Scheme** is **https** for the page and for `https://web-production-86d39.up.railway.app/...` when calling Railway directly.
- [ ] If the app uses JWT: **Request headers** include **`Authorization: Bearer <token>`** on API calls (when logged in).

### Application → Cookies

- [ ] **DevTools** → **Application** → **Cookies** → select your **production** origin.
- [ ] If the app uses cookies for session: values look expected; on HTTPS, **Secure** flags are appropriate where used.
- [ ] If the app uses **localStorage** only: **Application** → **Local Storage** — token/session keys present after login as your app defines.

### CORS response headers (optional)

On a cross-origin request to Railway, **Headers** → **Response headers**: note `Access-Control-Allow-Origin` / related headers match your deployment model (credentialed vs simple). No need to paste values — only confirm requests **complete** without CORS console errors.

---

## Built asset verification

Built output is **`web-project/dist/`** on the host; the browser loads hashed files under `/assets/` (and copies from `public/`).

1. **Network** tab → filter **`js`** **or** **DevTools** → **Sources** → open a loaded **`/assets/*.js`** (or main bundle).
2. **Ctrl+F** / **Cmd+F** search:
   - [ ] `web-production-86d39.up.railway.app` — present as **origin** where expected (not systematically `...railway.app/api` as the only “base” for every path).
   - [ ] No unexpected **old** Railway hostnames unless you still deploy them.
3. **View page source** (**Ctrl+U** / **Cmd+Option+U**) on the live homepage:
   - [ ] Any inline `VITE_API_URL` / `window.VITE_*` injection matches **origin-only** convention (no mandatory trailing `/api` as the env base).

---

## Red flags

Stop and fix **deploy / env / backend CORS** (not “retry the click”) if you see:

1. Request URLs containing **`/api/api/`** (Railway or proxied path).
2. **OPTIONS** preflight **failing** (4xx/5xx) so the real **GET/POST** never runs.
3. **Console** flooded with **CORS**, **opaque response**, or **Failed to fetch** on core flows.
4. **404** on known-good endpoints, especially with **wrong host** or **doubled** `/api`.
5. **Login 2xx** but follow-up API calls **401** with **missing** `Authorization` (or missing session cookie if that’s your model).

---

## Go / no-go rule

**GO (client/runtime)** — If all checked flows show **correct request URLs** (single `/api`), **2xx** on the main paths you tested, **no** CORS/CORB/opaque failures in the console, and **built JS / page config** align with the **intended Railway origin**, the **web deployment passes** this browser verification.

**Note:** Railway logs, DB integrity, and server-side errors are **out of scope** for this doc; use **`WEB_RELEASE_CHECKLIST.md`** and host dashboards for those.

---

*Operator checklist — copy for each release and tick boxes on the live site.*
