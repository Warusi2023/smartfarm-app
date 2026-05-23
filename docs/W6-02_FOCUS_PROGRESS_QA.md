# W6-02 — Focus priority progress (manual QA)

_Extends [W6-01_WEEKLY_RESET_QA.md](./W6-01_WEEKLY_RESET_QA.md)._

## What shipped

Mid-week **progress pills** for up to 3 **focus priorities** (from weekly reset), with focus items visually separated from other priorities.

**API:** `GET /api/farm-summary/command-center` includes:

```json
{
  "focusProgress": {
    "weekKey": "2026-05-17",
    "items": [
      {
        "id": "activity-logging",
        "title": "Improve daily activity logging",
        "progressState": "needs-attention",
        "label": "Needs attention",
        "metrics": { "activityDays": 1, "targetDays": 4 },
        "hint": "Only 1/4 target days so far."
      }
    ]
  },
  "weeklyReset": {
    "lastWeekFocusProgress": { "items": [] }
  }
}
```

## Progress states

| State | Meaning |
|-------|---------|
| `not-started` | Little or no signal yet this week |
| `in-progress` | Some activity, not yet on pace |
| `on-track` | Pacing toward the implicit target |
| `needs-attention` | Lagging vs mid-week pace |
| `completed` | Target met or marked done for the week |

## Rules by priority id (deterministic)

| ID | Completed when | Needs attention when |
|----|----------------|----------------------|
| `activity-logging` | ≥4 days with activity in 7d window | Pace behind target and ≥5 days elapsed |
| `soil-health` | Soil logged this week (or today checklist done) | No soil by day 5+ |
| `financial-review` | Costs + revenue logged; net ≥ 0 | Neither logged by day 4+ |
| `weather-plan` | Weather calm | Risk/opportunity + no related activity by day 3+ |
| `feed-tracking` | Feed cost days > 0 | No feed costs by day 5+ |
| `offline-backlog` | Queue empty (client) | >3 pending writes (client) |

**Client overrides:** Mark done for week → always **Completed**. Offline backlog uses `OfflineWriteQueue` pending count.

## Desktop

- [ ] Complete weekly reset; pick 1–3 focus priorities
- [ ] **This week's focus** section appears above **Also on your radar**
- [ ] Each focus row shows a muted progress pill (not a % bar)
- [ ] **Needs attention** uses warm accent on the row
- [ ] Non-focus priorities remain below without progress pills
- [ ] Mark focus item done → pill shows **Completed**

## Mobile

- [ ] Focus section stacks; pills wrap without breaking layout
- [ ] Hint available via pill `title` on hover/long-press where supported

## Weekly reset (W6-01 integration)

- [ ] New week reset step 1: **Last week's focus priorities** lists prior focus ids (from session state for prior `weekKey`) with progress from `lastWeekFocusProgress`
- [ ] Completed vs lagging focus visible before carry-forward

## Signed out

- [ ] No focus progress errors; priorities sign-in message unchanged

## API smoke

```http
GET /api/farm-summary/command-center?window=today
Authorization: Bearer <token>
```

Expect `focusProgress.items` array (0–3 entries per known priority ids in `weeklyPriorities`).

## Unit tests

```bash
cd backend && npm test -- --testPathPattern=farmFocusProgress
```

## Before / after

**Before:** Focus choices were static labels; operators had to mentally link checklist + weekly strip to see if focus areas were on track.

**After:** Focus priorities show derived progress at a glance, with light **Needs attention** cues mid-week and a short retrospective when starting the next weekly reset.
