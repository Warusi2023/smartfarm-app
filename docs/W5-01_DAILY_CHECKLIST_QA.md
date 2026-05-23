# W5-01 — Daily operating checklist (manual QA)

_Extends [W4-05_OPERATOR_INBOX_QA.md](./W4-05_OPERATOR_INBOX_QA.md)._

## What shipped

**Today’s checklist** on the dashboard command center:

- 5 deterministic rows (4 from API + offline sync on client)
- States: `done`, `due`, `attention`, `optional`
- Progress ring/text (e.g. `3 of 4 done` — optional rows excluded from applicable count)
- Routine freshness: last activity, soil, revenue + activity streak
- Action buttons reuse W4 navigation (crop action, soil test, revenue, feed cost, sync)

**API:** `GET /api/farm-summary/command-center` includes `dailyChecklist` (always based on **today**, independent of period toggle).

## Checklist rules

| Item | Done | Due / attention | Optional |
|------|------|-----------------|----------|
| Log farm activity | Any activity today (actions, soil, costs, revenue) | No activity today | — |
| Review soil status | Soil test today, or last test ≤30 days | Last test >30 days | — |
| Review soil status | — | — | Never tested → **attention** |
| Review feed costs | Feed-mix cost today | Livestock signal (feed-mix in last 60d), no cost today | No feed-mix in last 60d |
| Log revenue | Revenue today | Costs today, no revenue | No costs/revenue today |
| Clear pending sync | Queue empty | Pending writes in offline queue | — (client only) |

## Desktop

### Placement & layout

- [ ] Checklist appears below offline panel, above period stat strip.
- [ ] Title: **Today’s checklist**.
- [ ] Progress ring and `N of M done` visible.
- [ ] Freshness line shows activity / soil / revenue dates when signed in.

### States & actions

- [ ] With no activity today → **Log farm activity** = due, **Log crop action** opens crop management.
- [ ] Log a crop action → refresh → activity row = done.
- [ ] Stale/no soil → soil row due or attention; **Add soil test** navigates correctly.
- [ ] Recent feed-mix history → feed row due until cost logged today.
- [ ] Log cost today without revenue → revenue row = attention.
- [ ] Queue offline write → **Clear pending sync** = attention; **Sync now** works.

### Progress

- [ ] Optional feed row (no livestock signal) does not inflate “applicable” denominator unfairly.
- [ ] Completing items updates ring after refresh / queue change.

### Streak

- [ ] Log activity on consecutive days → streak pill shows (e.g. `2-day activity streak`).
- [ ] Miss a day → streak resets on next load.

### Integration

- [ ] Period toggle (7d / 30d) does not change checklist (still today-based).
- [ ] Command center inbox, feed, and checklist coexist without layout break.

## Mobile

- [ ] Checklist readable full-width; action buttons stack under row text on narrow screens.
- [ ] Progress ring and freshness wrap without horizontal scroll.

## Signed out

- [ ] Only sync checklist row (if queue has items) or empty/sign-in message.
- [ ] No API errors when checklist section renders.

## API smoke

```http
GET /api/farm-summary/command-center?window=today
Authorization: Bearer <token>
```

Expect `dailyChecklist`: `{ progress, routines, items, date }`.

## Before → after

| Daily routine | Before (W4-05) | After (W5-01) |
|---------------|----------------|---------------|
| Know what’s left today | Infer from inbox + stats | Explicit checklist with states |
| See completion | Manual mental tally | `N of M done` + ring |
| Last routine dates | Hunt in feed | Freshness line on checklist |
| Start a task | Recommended next step only | Per-row actions + inbox |

## Regression

- [ ] W4 recommended next step, attention grouping, feed filters still work.
- [ ] Offline panel + checklist sync row update on `smartfarm:queue-changed`.
