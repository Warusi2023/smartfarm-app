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

**Status:**

- **Manual UI rendering:** done (2026-06-30, `sfarm663@gmail.com`)
- **Offline queue replay:** not confirmed
- **Offline navigation to linked pages:** not available for tested route(s) — Crop Management unreachable via “Add soil test” while offline
- **Mobile:** not yet verified (≤768px resize check pending)

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

**Verdict:** Command center API **passes Run 2**. Manual UI rendering recorded for `sfarm663@gmail.com`. Offline support **unconfirmed** — revenue did not save offline, and navigation to linked pages (e.g. Crop Management) fails when disconnected. Likely a broader gap across queued writes and offline routing, not a single-form issue.

### Manual UI verification (2026-06-30, owner=`sfarm663@gmail.com`)

- Dashboard loads successfully for the smoke account and shows the Farm command center.
- Command-center UI includes period switching (Today / 7 days / 30 days), weekly review, this week's priorities, today's checklist, recommended next step, attention needed, and financial insight.
- Supporting dashboard sections also render, including sustainability metrics, product traceability, market intelligence, AI predictions, recent activity, upcoming tasks, and analytics widgets.
- **Observation:** the Today content appears underneath the week view rather than as an immediately prominent top-level section; content is present, but hierarchy could be clearer.
- **Non-blocking note:** the dashboard shows a QR Code Library warning banner about missing `qrcode.min.js`.
- **Offline queue:** attempted to save revenue while offline, but the action could not be saved in offline mode; replay-on-reconnect was not observed for this flow.
- **Offline navigation:** when offline, clicking “Add soil test” could not reach the Crop Management page. The target route is not available offline, so this flow could not be used to verify queued writes.

### Offline queue observation (2026-06-30, owner=`sfarm663@gmail.com`)

- Attempted to save revenue while offline from the command center.
- The revenue action could not be saved in offline mode.
- No replay-on-reconnect was observed for the revenue flow.
- Offline queue behavior remains unconfirmed and needs an additional test on another write path.

### Additional offline observation (2026-06-30, owner=`sfarm663@gmail.com`)

- While offline, the “Add soil test” action could not reach the Crop Management page.
- The linked route was not available offline, so this path could not be used to verify queued writes.
- Combined with revenue failing to save offline, offline support remains unconfirmed and may have a broader gap across both queued writes and offline navigation.

**Best next micro step:** try one action that **stays on the current dashboard page** (route changes are unreliable offline) — e.g. mark a Today checklist item done, use an inline edit button, or any action that does not navigate away. Then: stay on `dashboard.html` → go offline → perform the inline action → go online → confirm it syncs **once** without duplicates. If even same-page actions fail offline, that is strong evidence of a broader production offline-queue problem, not just missing offline navigation or a service-worker/cached shell for linked routes.

### Manual UI verification (2026-06-28, owner=`androsat.kv@gmail.com`) — API baseline only

**API baseline (probe — no browser required):**

- `GET /api/farm-summary/command-center?window=today` → ✅ 200, `periodStats`, `recentActivity`, `financials`, `attention`
- `GET /api/farm-summary/command-center?window=week` → ✅ 200, same payload shape
- Netlify `/api/*` proxy + command-center JS assets → ✅ 200 (re-probed 2026-06-30)

**Browser checklist (fill in when run):**

- **Today / This week:** command center shows stats, recent activity, financials, attention; values match API probe for Natavea1 (or note discrepancies).
- **Offline queue:** go offline → trigger a queue-backed write (e.g. log revenue via dashboard, or `POST /api/farm-summary/revenue` through UI) → confirm attention shows pending sync → go online → replay completes; **no duplicate rows** (same `clientRequestId`).
- **Mobile:** command center usable at ≤768px; period toggle and refresh reachable without horizontal scroll.

**Suggested offline test (browser console, logged in on `dashboard.html`):**

```javascript
// 1. DevTools → Network → Offline
// 2. Queue a revenue write (uses offline-write-queue.js)
await SmartFarmAPI.createFarmRevenue({
  amount: 1,
  description: "offline-queue smoke",
  date: new Date().toISOString().slice(0, 10),
  clientRequestId: crypto.randomUUID()
});
// 3. Confirm command center attention mentions pending sync / offline queue
// 4. Network → Online; wait for replay or click Sync
// 5. Re-fetch command center — one new activity row, not two
```

**Outcome paragraph (append when offline queue + mobile complete):**

> Manual UI verification (2026-06-30, owner=sfarm663@gmail.com): command center and dashboard sections render as documented above. Offline queue: [describe action] queued while offline; replayed on reconnect; no duplicates observed. Mobile: command center usable at narrow width; key actions reachable.

### UI verification checklist

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

**Phase note:** mobile layout verification is part of closing command center checks. Broader mobile work follows core product polish (see [`LAUNCH_READINESS.md`](../LAUNCH_READINESS.md) and [`POST_DEPLOY_NOTES.md`](../../POST_DEPLOY_NOTES.md)). Billing no longer blocks the upgrade path.

- [ ] Decision strip stacks; no horizontal scroll
- [ ] Recent feed scrolls inside panel
- [ ] Period toggle and refresh tappable

## Outcome (when checklist complete)

**2026-06-30 (`sfarm663@gmail.com`):** Manual UI rendering pass. Offline: revenue did not save while disconnected; “Add soil test” could not reach Crop Management offline. **Still open:** same-page inline action for queue replay; mobile layout check.

**2026-06-28 (`androsat.kv@gmail.com`):** Run 2 API + public assets pass.

Record when complete:

- Date / tester / farm ID(s) used
- Screenshots: filled command center, empty state, offline queue attention
- Any API or UI regressions found
