# W4-02 — Command center actions (manual QA)

_Extends [W4-01_COMMAND_CENTER_QA.md](./W4-01_COMMAND_CENTER_QA.md)._

## Action wiring map

| Source | Action | Destination |
|--------|--------|-------------|
| Attention: no soil / stale soil | **Add soil test** | `crop-management.html` |
| Attention: costs, no revenue | **Add revenue** | Dashboard → `#revenueEntryForm` (focus amount) |
| Attention: net slipping | **Review finances** | Financial modal + scroll to overview card |
| Attention: no activity | **Review tasks** | `#today-on-farm` |
| Attention: offline queue | **Sync now** | `OfflineWriteQueue.flush()` |
| Attention / queue | **View queue** | `#fcc-offline-panel` or bottom queue bar |
| Feed: crop action | Tap card | `crop-management.html` |
| Feed: soil test | Tap card | `crop-management.html` |
| Feed: feed-mix cost | Tap card | `livestock-management.html` |
| Feed: revenue | Tap card | `#revenueEntryForm` |
| Financial quick actions | **Add revenue** | `#revenueEntryForm` |
| Financial quick actions | **Add feed cost** | `showDashboardFeedMixCalculator()` |
| Financial quick actions | **View details** | `showFinancialDetails()` |

## API payload (optional fields, W4-02)

`GET /api/farm-summary/command-center` — recent activity items may include:

- `typeLabel`, `navTarget`, `entityId` (for feed cards)
- `attention[].action`: `{ label, target }` or `{ label, action: 'sync' }`

## Desktop — signed in

- [ ] Each attention row has a primary button (not only “View” text).
- [ ] **Add soil test** opens crop management.
- [ ] **Add revenue** scrolls to revenue form and focuses amount field.
- [ ] **Review finances** opens financial details.
- [ ] **Review tasks** scrolls to Today on farm.
- [ ] Feed items render as tappable cards with type label, time, amount when present.
- [ ] Tapping a revenue feed card scrolls to revenue form.
- [ ] Financial block shows three quick actions; each works.
- [ ] Empty feed shows quick links to log action / soil test.

## Offline / queue

- [ ] Queue 1+ writes offline → pending panel appears in command center with count.
- [ ] Attention shows critical offline message with **Sync now** + **View queue**.
- [ ] **Sync now** runs replay; attention + panel update without full page reload.
- [ ] **View queue bar** shows fixed bottom bar.
- [ ] After successful replay, pending count goes to 0.

## Mobile

- [ ] Attention action buttons stack; min ~44px tap height.
- [ ] Feed cards full width; chevron visible.
- [ ] Quick actions wrap cleanly.

## Before → after (typical flows)

| Scenario | W4-01 | W4-02 |
|----------|-------|-------|
| Stale soil alert | Read message → find Crops page manually | **Add soil test** → 1 click |
| Costs, no revenue | Read → scroll to find form | **Add revenue** → 1 click |
| Pending offline write | Notice bottom bar only | **Sync now** in attention + panel |
| Review latest sale | Scan feed, no click target | Tap revenue card → form |
