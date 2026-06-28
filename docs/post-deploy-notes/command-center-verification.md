# Command center — post-deploy verification

**Related QA docs:**

- [`docs/W4-01_COMMAND_CENTER_QA.md`](../W4-01_COMMAND_CENTER_QA.md) — core command center
- [`docs/W4-02_COMMAND_CENTER_ACTIONS_QA.md`](../W4-02_COMMAND_CENTER_ACTIONS_QA.md) — attention actions
- [`docs/W4-03_COMMAND_CENTER_FILTERS_QA.md`](../W4-03_COMMAND_CENTER_FILTERS_QA.md) — period/feed filters
- [`docs/W4-04_COMMAND_CENTER_FOCUS_QA.md`](../W4-04_COMMAND_CENTER_FOCUS_QA.md) — weekly focus / priorities

## Problem / goal

Verify the operator command center on `dashboard.html` loads real farm data, surfaces attention items, supports weekly priorities, and replays offline writes correctly in **production** (not just unit tests).

## Deploy order

1. **Railway** — `GET /api/farm-summary/command-center` and related farm-summary routes
2. **Netlify** — `dashboard.html`, `farm-command-center.js`, `farm-command-center.css`, `api-service.js`, offline queue JS

Same-origin `/api/*` on `www.smartfarm-app.com` proxies to Railway (see [`netlify-proxy-fix.md`](./netlify-proxy-fix.md)).

## Primary API

| Method | Path | Auth | Purpose |
|--------|------|------|---------|
| GET | `/api/farm-summary/command-center?window=today\|week` | Yes | Decision strip, recent activity, financials, attention |
| GET | `/api/farm-summary/financials?period=month` | Yes | Financial card (related) |
| POST | `/api/farm-summary/revenue` | Yes | Log revenue → command center refresh |
| POST | `/api/farm-costs/feed-mix` | Yes | Feed mix cost → may queue offline |

**Offline queue:** `offline-write-queue.js` — replays pending writes with `clientRequestId` for idempotency.

## UI surfaces

| Feature | Primary JS |
|---------|------------|
| Command center panel | `farm-command-center.js` |
| Weekly priorities / focus | `command-center-focus.js`, `farm-action-center-panel.js` |
| Daily checklist / operator inbox | `farm-action-center.js` |
| Dashboard integration | `dashboard.html` |

## Verification (production)

**Status:** Run 1 partial (2026-06-28) — API proxy and dashboard assets pass; farm data scenarios need JWT.

**Probe:** `node backend/scripts/command-center-production-probe.js`

### Run 1 — automated (2026-06-28)

| Check | Expected | Actual |
|-------|----------|--------|
| `GET /api/farm-summary/command-center` (no auth, Netlify) | 401 JSON | ✅ 401 `application/json` |
| Same (Railway direct) | 401 JSON | ✅ 401 JSON |
| `/js/farm-command-center.js` | 200 | ✅ |
| `/js/farm-action-center.js` | 200 | ✅ |
| `/js/offline-write-queue.js` | 200 | ✅ |
| Authenticated `window=today\|week` payload | 200 + shape | ⏸️ Needs `SMARTFARM_SMOKE_EMAIL/PASSWORD` |
| Offline queue replay in browser | manual | ⏸️ Pending |

### Run 2 — API probe (2026-06-28, owner=`androsat.kv@gmail.com`)

| Check | Result |
|-------|--------|
| Auth login | ✅ `ok: true` |
| `GET /api/farm-summary/command-center?window=today` | ✅ 200, `success: true`, `periodStats`, `recentActivity`, `financials`, `attention` |
| `GET /api/farm-summary/command-center?window=week` | ✅ 200, `success: true`, same payload shape |
| Public command-center (no token, Netlify + Railway) | ✅ 401 JSON `MISSING_TOKEN` |
| Netlify assets: `farm-command-center.js`, `farm-action-center.js`, `offline-write-queue.js` | ✅ 200 |

**Verdict:** Command center API **passes Run 2** for owner account. Remaining: browser UI confirmation and offline queue replay.

### UI verification (pending)

- [ ] Log in as owner → open `dashboard.html` command center
- [ ] **Today** / **This week** match API categories (stats, recent activity, financials, attention)
- [ ] Log revenue or feed-mix — network tab shows 200/201; panel refreshes
- [ ] Record: `- UI (2026-06-28): command center loads stats/activity/financials/attention for Natavea1; actions tested: ___`

### Daily checklist / command center load

- [ ] Sign in on `https://www.smartfarm-app.com/dashboard.html`
- [ ] **Farm command center** visible below page title
- [ ] **Today** strip shows counts (actions, soil tests, costs, revenue, net)
- [ ] Switch to **This week** — counts update
- [ ] **What changed recently** lists mixed items (newest first)
- [ ] **Financial insight** shows month revenue, costs, net, % vs last month
- [ ] **Attention needed** shows warnings or “All clear”
- [ ] Refresh button reloads panel without full page reload
- [ ] `GET /api/farm-summary/command-center?window=today` → 200 JSON (not HTML)

### Weekly priorities / focus

- [ ] Weekly summary and priorities visible (W4-04 scope)
- [ ] “This week’s focus” progress reflects completed vs open items
- [ ] Weekly reset/carry-forward behaves as documented in release notes

### Offline queue replay (production)

- [ ] DevTools → Network → Offline (or throttle offline)
- [ ] Queue a revenue or feed-mix write from dashboard
- [ ] Attention shows “N writes waiting to sync”
- [ ] Go online → replay completes → attention clears after refresh
- [ ] No duplicate rows (same `clientRequestId` / idempotent replay)
- [ ] Failed replay surfaces error in attention strip, not silent loss

### Signed out / demo

- [ ] Command center shows sign-in prompt (no API error spam)
- [ ] Pending offline writes still show sync warning where applicable

### Low-data farm

- [ ] Empty states: “No recent activity yet”, helper text on financials
- [ ] Attention may suggest first soil test or activity

### Browser console (logged in)

```javascript
fetch("/api/farm-summary/command-center?window=today", {
  headers: { Authorization: `Bearer ${localStorage.getItem("smartfarm_token")}` }
}).then(async r => ({
  status: r.status,
  contentType: r.headers.get("content-type"),
  body: r.headers.get("content-type")?.includes("application/json")
    ? await r.json()
    : await r.text()
})).then(console.log);
```

**Pass:** `status: 200`, JSON with `success: true`, `data.periodStats`, `data.recentActivity`, `data.financials`, `data.attention`.

### Farm scenarios to run through

Record which farm profile you used:

| Scenario | Farm profile | Pass? |
|----------|--------------|-------|
| Active mixed farm (crops + revenue logged) | | |
| New farm, minimal data | | |
| Farm with pending offline queue item | | |
| Farm with soil test + cost entries this week | | |

## Mobile (≤768px)

- [ ] Decision strip stacks; no horizontal scroll
- [ ] Recent feed scrolls inside panel
- [ ] Period toggle and refresh tappable

## Outcome (when checklist complete)

Record here:

- Date / tester / farm ID(s) used
- Screenshots: filled command center, empty state, offline queue attention
- Any API or UI regressions found
