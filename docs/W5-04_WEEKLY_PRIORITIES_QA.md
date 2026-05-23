# W5-04 — This week's priorities (manual QA)

_Extends [W5-03_WEATHER_RISK_QA.md](./W5-03_WEATHER_RISK_QA.md)._

## What shipped

**This week's priorities** sits below **Weekly review** in the command center. It turns weekly patterns, weather, and inbox signals into up to **5** focus areas with actions and optional **Mark done for this week** (sessionStorage, keyed by `weekKey`).

**API:** `GET /api/farm-summary/command-center` includes `weeklyPriorities`:

```json
{
  "weekKey": "2026-05-17",
  "weekLabel": "Last 7 days",
  "items": [
    {
      "id": "weather-plan",
      "type": "weather",
      "title": "Plan around weather risk",
      "reason": "...",
      "tag": "new",
      "state": "open",
      "suggestedActions": [{ "label": "...", "target": "soil-test" }]
    }
  ]
}
```

## Priority rules (deterministic, max 5)

| ID | When | Tag `ongoing` if |
|----|------|------------------|
| `weather-plan` | `weatherRisk.state` is `risk` or `opportunity` | — (always `new`) |
| `offline-backlog` | Client: pending offline writes > 0 | `ongoing` |
| `soil-health` | No soil in 7d, stale (>30d), or soil attention | Soil attention group |
| `financial-review` | Week net &lt; 0 and last week net &lt; 0, or costs &gt; revenue, or financial attention | Financial attention |
| `activity-logging` | Activity on &lt; 4 of 7 days | Activity-gap attention |
| `feed-tracking` | Feed applicable, no feed costs this week | — |

If no rules match → calm message: no extra priorities this week.

## Client state

- Key: `smartfarm_fcc_priority_done:<weekKey>` in `sessionStorage`
- **Mark done for this week** fades the row; does not hide it
- New ISO week (`weekKey` from API) resets done markers naturally

## Desktop

- [ ] Section order: Weather → Weekly review → **This week's priorities** → Today's checklist
- [ ] Each row: **New** or **Ongoing** badge, title, reason, 1–2 action buttons
- [ ] Weather priority links to soil/tasks/weather scroll as appropriate
- [ ] **Mark done** softens row; survives refresh in same session/week
- [ ] Queue pending writes → **Reduce offline backlog** appears (client merge)
- [ ] Calm state when farm data is healthy

## Mobile

- [ ] Single-column stack; buttons full-width on narrow screens
- [ ] Badges and reasons readable without zoom

## Signed out

- [ ] Sign-in hint in priorities block
- [ ] Offline backlog priority still possible if queue has items

## API smoke

```http
GET /api/farm-summary/command-center?window=today
Authorization: Bearer <token>
```

Expect `weeklyPriorities.items` array (0–5 items).

## Unit tests

```bash
cd backend && npm test -- --testPathPattern=farmWeeklyPriorities
```

## Before → after

| Step | Before (W5-03) | After (W5-04) |
|------|----------------|---------------|
| Interpret the week | Scan strip + weather + inbox separately | One prioritized list |
| Know what to focus on | Self-assemble mental plan | 3–5 titled priorities with reasons |
| Track follow-through | No weekly closure | Mark done for this week (session) |
| Time to weekly plan | Several minutes | Under a minute scan |

## Regression

- [ ] Weekly strip, weather row, checklist, inbox unchanged
- [ ] Period toggle does not break priorities (`weekKey` from rolling 7d window)
- [ ] `smartfarm:queue-changed` refreshes offline priority
