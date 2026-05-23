# W4-01 — Farm command center (manual QA)

_Operator-first dashboard upgrade: decision strip, recent activity, financial insight, attention alerts._

## Deploy order

1. Railway — `GET /api/farm-summary/command-center`
2. Netlify — `dashboard.html`, `farm-command-center.js`, `farm-command-center.css`, `api-service.js`

## Desktop

### Signed in (farm with data)

- [ ] Open `dashboard.html` — **Farm command center** appears below the page title, above stat cards.
- [ ] **Today** strip shows counts for actions, soil tests, costs, revenue, and net movement.
- [ ] Switch to **This week** — counts update (may be ≥ today).
- [ ] **What changed recently** lists mixed items (newest first) with icons and amounts where relevant.
- [ ] **Financial insight** shows month revenue, costs, net, % vs last month, largest cost driver, latest sale.
- [ ] Net banner is green when ahead, red when behind.
- [ ] **Financial Overview** card below still matches command center totals.
- [ ] **Attention needed** shows relevant warnings (or “All clear”).
- [ ] **Log revenue** form still works; command center refreshes after save.
- [ ] Refresh button reloads command center without full page reload.

### Signed out / demo token

- [ ] Command center shows sign-in prompt (no API error spam).
- [ ] If offline queue has pending writes, attention still shows sync warning.

### Low-data farm

- [ ] Empty states: “No recent activity yet” and helper text on financials.
- [ ] Attention may suggest logging soil test or first activity.

### Offline queue

- [ ] DevTools → Offline → queue a revenue or feed-mix write.
- [ ] Attention shows “N writes waiting to sync”.
- [ ] Go online → replay → attention clears after refresh.

## Mobile (≤768px)

- [ ] Decision strip stacks 2 columns; readable without horizontal scroll.
- [ ] Recent feed scrolls inside panel (max-height).
- [ ] Period toggle and refresh remain tappable.

## API (optional curl)

```http
GET /api/farm-summary/command-center?window=today
Authorization: Bearer <JWT>
```

Expect `200`, `success: true`, `data.periodStats`, `data.recentActivity`, `data.financials`, `data.attention`.

## W4-02 / W4-03

- **[W4-02_COMMAND_CENTER_ACTIONS_QA.md](./W4-02_COMMAND_CENTER_ACTIONS_QA.md)** — clickable attention, feed navigation, quick actions.
- **[W4-03_COMMAND_CENTER_FILTERS_QA.md](./W4-03_COMMAND_CENTER_FILTERS_QA.md)** — period filter, feed filters, financial breakdown drill-down.

## Screenshots to capture

1. Active farm — command center filled (today + recent feed).
2. Low-data — empty feed + attention hints.
3. Pending offline writes — critical attention line.
