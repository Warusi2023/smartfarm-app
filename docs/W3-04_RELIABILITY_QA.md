# W3-04 — Week 3 reliability QA

_Automated guardrails + manual checklist for offline queue and idempotent replay._

## Automated guardrails

Run from `backend/`:

```bash
npm test -- --testPathPattern="writeIdempotency|offlineWriteQueue"
```

| Test file | Covers |
|-----------|--------|
| `tests/unit/writeIdempotency.test.js` | First write, replay (no second execute), payload conflict (409), user scoping, hash stability |
| `tests/unit/offlineWriteQueue.contract.test.js` | All four queue types registered; `clientRequestId` on body + persisted entry when network fails; permanent validation errors not swallowed |

## Manual QA checklist (production / staging)

Use a **logged-in JWT** session and DevTools → Network (or Offline).

### Crop action (W3-01 / W3-02)

- [ ] Online: log action without cost → `201`, reminder updates
- [ ] Online: log action with cost → `201`, financial costs increase
- [ ] Offline: log action → queued toast + bottom bar
- [ ] Online again: replay → bar clears, one action row, costs correct
- [ ] Replay same queued entry (Retry now) → `200` + `idempotentReplay`, no duplicate rows

### Soil test (W3-01 / W3-02)

- [ ] Online: save soil test → crop card summary updates
- [ ] Offline: save → queued message, optimistic card summary
- [ ] Replay → one `soiltests` row (UUID user), card shows DB values

### Feed mix cost (W3-03)

- [ ] Save feed mix online → `POST /farm-costs/feed-mix` `201`
- [ ] Dashboard financial costs increase for current month
- [ ] Offline save → cost queued (console or queue bar on livestock page)
- [ ] Replay → single `farmcosts` row (`type=feed-mix`)

### Manual revenue (W3-03)

- [ ] Submit revenue online → `POST /farm-summary/revenue` `201`, net updates
- [ ] Offline submit → warning on form, queue bar visible
- [ ] Replay → revenue row once, financial card refreshes

### Conflict / validation

- [ ] Same `clientRequestId` + different amount (API replay tool) → `409`
- [ ] Negative revenue amount online → `400`, **not** queued

### Auth

- [ ] Without JWT: financial writes fail with auth message; crop file paths may still work as `default-user` (no DB cost/revenue)

## Deploy order

1. Railway (idempotency routes live)
2. Netlify (queue JS)

## Known limits (unchanged)

- File idempotency cache is on Railway disk (may reset on ephemeral redeploy); DB `links.clientRequestId` still protects Postgres rows for soil/revenue/feed-mix when cache is cold.
- Soil test **history** UI may omit DB-only tests until history read is extended.

---

## W3-05 — Deployed reliability smoke (2026-05-23)

**Operator:** automated API smoke + partial manual verification  
**Date/time (UTC):** 2026-05-23 (~15:52 UTC session)

### Environments

| Layer | URL / artifact | Notes |
|-------|----------------|-------|
| Backend | `https://web-production-86d39.up.railway.app` | `GET /api/health` → `ok: true`, PostgreSQL connected |
| Frontend | `https://www.smartfarm-app.com` | `offline-write-queue.js` returns 200; includes `feed-mix-cost`, `farm-revenue`, `clientRequestId` |
| Auth | Real JWT user | **Not available in CI/agent session** — Postgres financial flows require operator JWT |

### Pre-check (local)

```bash
cd backend && npm run test:w3
```

**Result:** PASS — 13/13 (writeIdempotency + offlineWriteQueue contract)

### Automated API smoke (deployed)

```bash
cd backend
npm run test:w3:deployed
# Full Postgres coverage (either):
# SMARTFARM_SMOKE_JWT=<full smartfarm_token from browser localStorage>
# SMARTFARM_SMOKE_EMAIL=you@example.com SMARTFARM_SMOKE_PASSWORD=...
```

| Check | Result | Detail |
|-------|--------|--------|
| Health | **PASS** | DB connected |
| Feed-mix / revenue without JWT | **PASS** | `401` `MISSING_TOKEN` |
| Crop action idempotency | **PASS** | first `201`, replay `200` + `idempotentReplay: true`, mismatch `409` |
| Soil test idempotency | **PASS** | same pattern (`default-user` / file path without JWT) |
| Feed-mix idempotency (Postgres) | **SKIP** | needs `SMARTFARM_SMOKE_JWT` |
| Manual revenue idempotency (Postgres) | **SKIP** | needs `SMARTFARM_SMOKE_JWT` |
| Financials summary | **SKIP** | needs `SMARTFARM_SMOKE_JWT` |

### Per-flow pass/fail (W3-05 goal)

| Flow | Online write | Offline queue + replay | Idempotency (same key / 409) | Summary vs DB |
|------|--------------|------------------------|--------------------------------|---------------|
| Crop actions | **PASS** (API) | **PENDING** — browser/DevTools offline | **PASS** (API) | **PENDING** — manual |
| Soil tests | **PASS** (API) | **PENDING** | **PASS** (API) | **PENDING** — manual (UUID user → Postgres) |
| Feed-mix cost | **PENDING** — needs JWT session | **PENDING** | **PENDING** — run smoke script with JWT | **PENDING** |
| Manual revenue | **PENDING** — needs JWT session | **PENDING** | **PENDING** — run smoke script with JWT | **PENDING** |

### Manual browser steps (operator — ~1 session)

Use checklist sections above with a **verified email/password login** (real JWT in `smartfarm_token`). For offline: DevTools → Network → Offline (or airplane mode), then restore online and confirm queue bar clears.

After JWT smoke script passes, spot-check dashboard financial card vs:

```sql
-- replace :user_id with JWT sub (UUID)
SELECT COUNT(*) FROM farmcosts WHERE user_id = :user_id AND type = 'feed-mix';
SELECT COUNT(*) FROM farmrevenue WHERE user_id = :user_id;
SELECT COUNT(*) FROM soiltests WHERE user_id = :user_id;
```

### Anomalies / notes

- **Crop/soil POST without JWT** still succeeds as `default-user` (file store). Financial writes correctly require JWT. Unchanged beta behavior; not a W3-05 regression.
- **File idempotency cache** on Railway may cold-start after redeploy; replay still safe for Postgres rows when `clientRequestId` is in `links` / soil `nutrients`.
- No **W3-05A/B** bugs opened — API idempotency behaved as designed for exercised paths.

### To complete W3-05 sign-off

1. Sign in on Netlify → confirm dashboard loads (crop/soil summaries, financials card).
2. Run offline queue steps for all four flows (checklist above).
3. `SMARTFARM_SMOKE_JWT=<token> npm run test:w3:deployed` → expect 8/8 PASS, 0 SKIP.
4. Update the per-flow table in this section to **PASS** or file narrow bugs (e.g. W3-05A).
