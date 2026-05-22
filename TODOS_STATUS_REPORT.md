# SmartFarm TODOs status report

## Status as of 2026-05-13

- **Railway API health:** `GET https://web-production-86d39.up.railway.app/api/health` returns **HTTP 200**. The API is considered **operationally up** unless monitoring or Railway shows a new failure.
- **Web release checklist:** **[`WEB_RELEASE_CHECKLIST.md`](./WEB_RELEASE_CHECKLIST.md)** is the **source of truth** for what to verify before a **web-only** release (build output, env vars, smoke tests, CI vs Netlify).

---

## Historical context

This file used to state that **Railway returned 502** and that the project was “waiting for Railway to deploy.” That reflected a **past** incident window, not the current baseline.

**As of 2026-05-13**, the health endpoint above returns **200**. Any new outage should be debugged with **current** Railway logs and **`WEB_RELEASE_CHECKLIST.md`**, not the old “502-only blocker” narrative below.

---

## Historical snapshot: completed work (still accurate)

### Analysis and frontend stability

- Project structure and configs reviewed; backend verified locally; frontend service worker / null-handling / API URL wiring improved.
- Frontend API base aligned with Railway host **`https://web-production-86d39.up.railway.app`** (origin — see **`WEB_RELEASE_CHECKLIST.md`** for `/api` vs `/api/api`).

### Historical snapshot: what was “in progress” (now outdated wording)

Previously documented as in progress:

- **“Fix Railway 502 / deployment”** — superseded by current health checks; use **`WEB_RELEASE_CHECKLIST.md`** for go/no-go.
- **“E2E verification blocked on Railway”** — run manual smoke tests from the checklist once production URL and env are confirmed.

---

## Historical verification commands (optional)

```powershell
# Health (expect 200)
Invoke-WebRequest https://web-production-86d39.up.railway.app/api/health

# CORS sample (origin must match your live site)
$headers = @{ "Origin" = "https://www.smartfarm-app.com" }
Invoke-WebRequest https://web-production-86d39.up.railway.app/api/health -Headers $headers
```

---

## Historical: supporting docs and scripts

Older investigation write-ups (e.g. `COMPLETE_FIX_PLAN.md`, `RAILWAY_ERROR_FIX.md`, `fix-railway-now.ps1`, `test-cors.ps1`) may still be useful for **incident** debugging; they do **not** override **`WEB_RELEASE_CHECKLIST.md`** for release readiness.

---

## Bottom line (current)

- Prefer **`WEB_RELEASE_CHECKLIST.md`** for **web** release decisions.
- Railway **502** is **historical context** in this file, not the default current state as of **2026-05-13**.
