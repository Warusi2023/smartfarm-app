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
