# W5-02 — Weekly review strip (manual QA)

_Extends [W5-01_DAILY_CHECKLIST_QA.md](./W5-01_DAILY_CHECKLIST_QA.md)._

## What shipped

**Weekly review** strip on the dashboard command center (above **Today’s checklist**):

- 7-day lane with per-day routine dots (activity, soil, feed if applicable, revenue)
- This week vs last week **net** with up / flat / down cue
- Read-only summary: `X/7 days with farm activity` · soil week status
- Day `title` tooltips with counts (actions, costs, revenue, etc.)

**API:** `GET /api/farm-summary/command-center` includes `weeklySummary` (always last 7 UTC days, independent of period toggle).

## weeklySummary shape (compact)

| Field | Purpose |
|-------|---------|
| `days[]` | `{ date, weekday, isToday, routines{activity,soil,feed,revenue}, tooltip }` |
| `net.thisWeek` / `net.lastWeek` | `{ revenue, costs, net }` |
| `net.direction` | `up` \| `down` \| `flat` (≥$1 net change) |
| `summary.activityLine` | e.g. `4/7 days with farm activity` |
| `summary.soilLine` | Soil logged / not logged this week |
| `feedApplicable` | Show feed dot row when feed-mix in last 60d |

## Desktop

### Placement

- [ ] **Weekly review** appears below offline panel, above **Today’s checklist**.
- [ ] Strip fits command center card width; no horizontal page scroll.

### 7-day lane

- [ ] Seven columns, oldest → newest (today rightmost).
- [ ] Today column label **Today** (green emphasis).
- [ ] Filled dots = routine logged that day; hollow = not logged.
- [ ] Legend matches dot colors (activity, soil, feed, revenue).
- [ ] Feed row hidden when `feedApplicable` is false.

### Net block

- [ ] **This week net** matches 7-day financial totals.
- [ ] Last week net shown with directional label (↑ better / ↓ below / → flat).
- [ ] Direction matches sign of net change (within $1 = flat).

### Summary & tooltips

- [ ] Activity line count matches filled activity days.
- [ ] Soil line reflects any soil test in the 7-day window.
- [ ] Hover/focus day column shows tooltip with date + counts.

### Integration

- [ ] Period toggle (Today / 7d / 30d) does **not** change weekly strip (still last 7 days).
- [ ] Checklist and inbox unchanged below strip.

## Mobile

- [ ] 7-day grid scales on narrow screens; labels remain readable.
- [ ] Net block stacks cleanly; no clipped text.
- [ ] Tooltips work on long-press / focus where supported.

## Signed out

- [ ] Weekly strip shows sign-in message (no API data).

## API smoke

```http
GET /api/farm-summary/command-center?window=today
Authorization: Bearer <token>
```

Expect `weeklySummary.days` length `7` and `weeklySummary.net.direction`.

## Before → after

| Question | Before (W5-01) | After (W5-02) |
|----------|----------------|---------------|
| How did routines go this week? | Infer from checklist + feed | 7-day dot lane at a glance |
| Is margin improving? | Period financials only | This vs last week net + direction |
| Soil coverage this week? | Today checklist only | Week summary line + per-day soil dots |
| Days with activity? | Streak count only | `X/7 days` + daily markers |

## Regression

- [ ] W5-01 checklist, W4 inbox, offline sync still work.
- [ ] Command center refresh updates weekly strip.
