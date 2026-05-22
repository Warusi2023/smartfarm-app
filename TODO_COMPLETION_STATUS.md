# SmartFarm TODO completion status

## Status as of 2026-05-13

- **Railway API health:** `GET https://web-production-86d39.up.railway.app/api/health` returns **HTTP 200**. The hosted backend is treated as **stable** unless the Railway dashboard or this endpoint shows current errors.
- **Web release checklist:** Use **[`WEB_RELEASE_CHECKLIST.md`](./WEB_RELEASE_CHECKLIST.md)** at the repo root as the **canonical, current** web-only release checklist (verify Netlify/Railway env, smoke tests, CI/deploy paths).

---

## Historical context (older working notes)

The sections below describe work that was done earlier (CORS, accessibility, frontend fixes) and **past** deployment friction. They are **not** the live blocker list.

Previously, some runs saw **502** from Railway and open items around “deploy then verify CORS.” As of **2026-05-13**, the health URL above responds **200**; remaining work is **ongoing verification** and **hosting config** as listed in **`WEB_RELEASE_CHECKLIST.md`**, not “waiting for Railway to start.”

---

## Completed (historical summary)

1. **CORS / backend integration (code)** — Backend allowlists and frontend API wiring were implemented and committed; see older debug docs in the repo if needed.
2. **Accessibility** — Duplicate field IDs (`cropSearchFilter` → `cropSearchFilterModal`, etc.) and missing labels were addressed.

---

## Ongoing verification (see checklist, not “TODO 3–5 pending deploy”)

Use these **only as optional helpers**; the authoritative steps are in **`WEB_RELEASE_CHECKLIST.md`**:

- `scripts/check-deployment-status.ps1` — quick health + CORS probe (hard-coded URLs inside the script).
- `scripts/complete-todo-verification.ps1` — broader checks.
- `COMPLETE_DEPLOYMENT_VERIFICATION.md` — extra detail if present.

**Success criteria** (aligned with the checklist): production **`dist`** build, correct **`VITE_*` origins**, Railway secrets set, no CORS failures on real smoke tests, auth and at least one data flow work end-to-end.

---

## Support pointers

- Railway logs: [railway.app/dashboard](https://railway.app/dashboard)
- Backend entry and env: `backend/` + `docs/setup-deployment/ENVIRONMENT_VARIABLES.md`
- If health is not 200: treat as **current** incident (check Railway logs, env vars), not the historical “502 narrative” in old notes.
