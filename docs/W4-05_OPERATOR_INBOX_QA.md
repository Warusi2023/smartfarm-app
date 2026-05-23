# W4-05 — Command center operator inbox (manual QA)

_Extends [W4-04_COMMAND_CENTER_FOCUS_QA.md](./W4-04_COMMAND_CENTER_FOCUS_QA.md)._

## What changed

The command center now behaves like an **operator inbox**:

1. **Recommended next step** — one prominent suggested action with reason and buttons.
2. **Attention needed** — severity-sorted, grouped/deduped alerts.
3. **Seen this session** — softer emphasis after click or “Not now” (sessionStorage only).
4. **Recent feed** — light clustering (`+N similar`) for same-type items within 6 hours.

## Severity rules (deterministic)

| Signal | Severity | Notes |
|--------|----------|--------|
| Offline queue ≥ 3 writes | **High** | Pending sync group |
| Offline queue 1–2 writes | **Medium** | Same group, one list item |
| No soil test 30+ days / never | **Medium** | Grouped as **Soil data needs attention** |
| Costs without revenue / net slipping | **Medium** | Grouped as **Costs need review** |
| No activity in selected period | **Low** | Activity gap |

Sort order: severity (high → medium → low), then internal `sortOrder` (higher = more urgent within tier).

## Recommendation rules (first match wins)

1. Pending offline writes → **Sync pending writes** (dismiss id: `sync`)
2. Else soil-health group → **Add a soil test** (`soil-test`)
3. Else financial-pressure group → **Log revenue or review costs** (`financial`)
4. Else activity gap → **Log today's farm activity** (`activity`)
5. Else → caught-up message (no primary CTA)

**Dismiss for now** stores id in `sessionStorage` key `smartfarm_fcc_rec_dismissed` for the browser tab session only.

## Grouping rules

| Group key | Merges |
|-----------|--------|
| `pending-sync` | Offline queue notices (always one item with count) |
| `soil-health` | `stale-soil` + `no-soil-ever` |
| `financial-pressure` | `costs-no-revenue` + `net-slipping` |
| `activity-gap` | `no-activity-period` |

Grouped items show a headline plus a **detail** line with merged messages.

## Seen state

- Storage key: `smartfarm_fcc_seen` (array of keys in `sessionStorage`).
- Attention key: `att:<groupKey>` (e.g. `att:soil-health`).
- Feed key: `feed:<feedItemId>`.
- Triggers: primary/secondary attention action, **Not now**, feed card tap.
- **High** severity items stay visible when seen (slightly faded, opacity ~0.88).
- Clearing site data or a new tab resets seen/dismissed state.

## Desktop

### Recommended next step

- [ ] With 3+ queued offline writes, block shows **Sync pending writes** above Attention.
- [ ] Primary **Sync now** runs queue flush; secondary **View queue** scrolls to offline panel.
- [ ] **Dismiss for now** hides that recommendation until session ends; next priority appears if any.
- [ ] When no rules match, caught-up copy shows (no loud empty box).

### Attention list

- [ ] High/medium/low badges visible; list sorted high first.
- [ ] Two financial alerts collapse to one **Costs need review** with detail text.
- [ ] Soil stale + no-soil never show as two separate rows (one soil group).
- [ ] **Not now** softens item (seen) without removing it.

### Recent feed

- [ ] Three feed-mix costs within 6 hours → one card with **+2 similar** on type line.
- [ ] Tap lead card still opens focus/nav for that entry (not a bundle expander).
- [ ] After opening a card, it appears slightly faded (seen).

### Order of right column

- [ ] Recommended next step → Attention needed → Financial insight.

## Mobile

- [ ] Recommended block readable without horizontal scroll; buttons stack cleanly.
- [ ] Severity badges and **+N similar** do not overflow card width.
- [ ] Seen/faded state still obvious on small screens.

## Examples (seen vs unseen)

| State | Attention row | Feed card |
|-------|---------------|-----------|
| Unseen | Full opacity, severity badge vivid | Full opacity |
| Seen (clicked Not now or action) | ~72% opacity (high ~88%) | ~72% opacity |
| High + seen | Still visible, not hidden | — |

## Before → after

| Operator task | Before (W4-04) | After (W4-05) |
|---------------|----------------|---------------|
| Decide what to do first | Scan several equal-weight alerts | One **Recommended next step** |
| Repeated financial/soil alerts | Multiple similar lines | One grouped item + detail |
| Triage offline sync | Buried in list order | High severity + top recommendation |
| Re-read same alerts in one session | Same visual weight | Seen items de-emphasized |
| Scan noisy feed | Every entry separate | Same-type clusters with **+N similar** |

## Regression

- [ ] Period toggle (Today / 7d / 30d) still reloads data.
- [ ] Feed filters and financial breakdown drill-down (W4-03 / W4-04) still work.
- [ ] Offline panel and sync still update Attention + recommendation on `smartfarm:queue-changed`.
