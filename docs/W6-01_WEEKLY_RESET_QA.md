# W6-01 — Weekly reset & carry-forward — QA checklist

## Feature summary

Lightweight end-of-week ritual on the Farm command center:

1. **Review last week** — prior 7-day net, routine consistency, open priorities.
2. **Carry forward** — keep or drop unfinished priorities that still matter (weather items only when risk/opportunity persists).
3. **Start this week** — pick up to 3 focus priorities; state saved in `sessionStorage` (`smartfarm_weekly_reset_v1`).

API: `GET /api/farm-summary/command-center` includes `weeklyReset` (backend: `farmWeeklyReset.js`).

## Preconditions

- Signed-in user with command center on dashboard (`#farm-command-center`).
- Some prior-week activity or priorities helps exercise carry-forward (optional).

## Entry point

| # | Step | Expected |
|---|------|----------|
| 1 | Open dashboard, command center | Between **Weekly review** and **This week's priorities**, a **Weekly reset** card appears when reset is not done for `currentWeekKey` or week rolled with carry candidates. |
| 2 | After completing reset | Entry card hides; **This week is set** banner above priorities with optional **Review reset**. |

## Step A — Review last week

| # | Step | Expected |
|---|------|----------|
| 3 | Click **Start weekly reset** | Panel opens; indicator **Step 1 of 3**. |
| 4 | Scan step 1 | Shows last week net, activity X/7 days, bullet summary (soil/feed/revenue lines), unfinished priorities from last period. |
| 5 | **Continue** | Advances to step 2. |

## Step B — Carry forward

| # | Step | Expected |
|---|------|----------|
| 6 | Step 2 | Lists only **relevant** carry candidates from API (weather-plan only if weather still risk/opportunity). |
| 7 | Uncheck an item | Item not included in carry-forward on complete. |
| 8 | No candidates | Short message; can continue to step 3. |
| 9 | **Back** / **Continue** | Navigation works; choices preserved. |

## Step C — Focus priorities

| # | Step | Expected |
|---|------|----------|
| 10 | Step 3 | Up to **3** focus checkboxes from `suggestedFocusOptions` plus carried items. |
| 11 | Select 4th item | 4th checkbox does not stay checked (max 3). |
| 12 | **Complete reset** | Panel closes; **This week is set**; priorities show **Focus** / **Carried forward** badges where applicable. |

## State & week rollover

| # | Step | Expected |
|---|------|----------|
| 13 | Reload page after reset | Reset not prompted again for same `currentWeekKey` (sessionStorage). |
| 14 | Clear `smartfarm_weekly_reset_v1` in devtools | Entry reappears if `suggestReset` or unfinished carry rules apply. |
| 15 | Mark last-week priority done (`smartfarm_fcc_priority_done:<lastWeekKey>`) | That item excluded from unfinished list in step 1. |

## Backend (optional API check)

```bash
# With valid JWT
curl -s -H "Authorization: Bearer $TOKEN" "$API/api/farm-summary/command-center" | jq '.weeklyReset | {currentWeekKey, suggestReset, carry: (.carryForwardCandidates|length), focus: (.suggestedFocusOptions|length)}'
```

Expect `weeklyReset.currentWeekKey`, `lastWeekSnapshot`, `carryForwardCandidates`, `suggestedFocusOptions`, `maxFocusCount: 3`.

## Unit tests

```bash
cd backend && npm test -- --testPathPattern="farmWeeklyReset"
```

## Regression

- Weekly review strip (W5-02), weather row (W5-03), priorities (W5-04), checklist (W5-01) unchanged when reset not used.
- Signed-out dashboard: no reset section content; no JS errors.

## Before / after (operator)

**Before:** Operators saw today’s checklist, 7-day review, weather, and priorities but had no explicit moment to close the week or carry unfinished work forward.

**After:** A short **Weekly reset** (≈2–3 minutes) reviews last week, carries only still-relevant priorities, sets up to three focus items, and shows **This week is set** so the new week starts intentionally without a full planner.
