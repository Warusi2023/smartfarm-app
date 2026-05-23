# W4-03 — Command center filters & drill-down (manual QA)

_Extends [W4-02_COMMAND_CENTER_ACTIONS_QA.md](./W4-02_COMMAND_CENTER_ACTIONS_QA.md)._

## API

`GET /api/farm-summary/command-center?window=today|7d|30d`

| `window` | Period |
|----------|--------|
| `today` | Current UTC day |
| `7d` (alias: `week`) | Last 7 days incl. today |
| `30d` | Last 30 days incl. today |

**Response additions (W4-03):**

- `windowLabel` — e.g. "Last 7 days"
- `financials` — sums for selected period (not calendar month)
- `monthFinancials` — calendar month (dashboard legacy cards)
- `financialBreakdown` — `{ costs[], revenue[], totals }` for selected period
- `attention[].scope` — `period` | `global`

## What responds to the period selector

| Section | Period-based? |
|---------|----------------|
| Activity strip (counts + net movement) | Yes |
| What changed recently (source list) | Yes |
| Financial insight totals & trends vs prior period | Yes |
| Financial breakdown lists | Yes |
| Attention: "No activity in …" | Yes (`scope: period`) |
| Attention: soil stale, month revenue, net slipping | No (`scope: global`) |
| Offline queue panel | No (always current) |

## Drill-down: financial breakdown

- **Invoke:** "View breakdown" under Financial insight.
- **Shows:** Period totals line + two columns (costs list, revenue list) with type/title, amount, date.
- **Hide:** "Hide breakdown" collapses panel (no page navigation).

## Feed filters (client-side)

| Filter | Shows |
|--------|--------|
| All | Every item in period |
| Costs | feed-mix + farm costs |
| Revenue | manual revenue only |
| Crops & soil | crop actions + soil tests |

Card tap navigation unchanged (W4-02).

## Desktop

- [ ] Period: **Today** — strip and financials match today only.
- [ ] Period: **7 days** — more items in feed; totals increase vs today.
- [ ] Period: **30 days** — widest window; no noticeable hang.
- [ ] Switch period → data refreshes; breakdown closes.
- [ ] **View breakdown** opens panel with matching totals.
- [ ] Feed filters work without API re-fetch.
- [ ] Farm-wide vs This period badges on attention rows.

## Mobile

- [ ] Period buttons wrap; tappable.
- [ ] Feed filter chips scroll/wrap.
- [ ] Breakdown columns stack vertically.

## Offline

- [ ] Queue panel + global offline attention unchanged when changing period.
- [ ] After sync, period data refreshes on replay event.

## W4-04 entity focus

See **[W4-04_COMMAND_CENTER_FOCUS_QA.md](./W4-04_COMMAND_CENTER_FOCUS_QA.md)** for deep-link focus from feed/breakdown rows.

## Before → after

| Question | W4-02 | W4-03 |
|----------|-------|-------|
| What happened last week? | Leave dashboard | Select **7 days** on dashboard |
| Why are costs high this period? | Guess from one line | **View breakdown** + cost list |
| Show only revenue events | Scan mixed feed | **Revenue** filter |
| Is this alert about my filter? | Unclear | **Farm-wide** vs **This period** badge |
