# W4-04 — Command center entity focus (manual QA)

_Extends [W4-03_COMMAND_CENTER_FILTERS_QA.md](./W4-03_COMMAND_CENTER_FILTERS_QA.md)._

## Deep-link model

Clicking a **recent feed card** or **financial breakdown row** stores focus in `sessionStorage` and navigates with:

`?fccFocus=<entityType>:<entityId>&cropId=<optional>`

| entityType | Target page | Focus behavior |
|------------|-------------|----------------|
| `manual-revenue` | `dashboard.html` | Scroll to revenue form; prefill amount/date/description; highlight form; info banner |
| `feed-mix-cost` | `livestock-management.html` | Scroll to feed cost anchor; banner with cost summary; highlight |
| `crop-action` | `crop-management.html` | Scroll to crop card; open history modal; highlight action row |
| `soil-test` | `crop-management.html` | Scroll to crop card; highlight soil summary block |

**API fields (feed items):** `id`, `kind`, `navTarget`, `cropId`, `focusType`, `focusId` (same as `id` for record key).

If focus cannot be applied → banner: **“This entry is not in the current view.”**

## Desktop

### Revenue (dashboard)

- [ ] Click a revenue card in command center feed.
- [ ] Stays on dashboard; revenue form highlighted and prefilled when data exists.
- [ ] Banner explains which entry is focused; dismiss clears URL param.

### Feed-mix cost (livestock)

- [ ] Click feed-mix cost card → `livestock-management.html`.
- [ ] Page scrolls to feed cost anchor; banner shows title/amount.
- [ ] Highlight fades after ~4s.

### Crop action (crop management)

- [ ] Click crop action card with known `cropId`.
- [ ] Crop card highlights; history modal opens.
- [ ] Matching action row highlighted in table.
- [ ] Missing action ID → warning in modal body.

### Soil test (crop management)

- [ ] Click soil test card.
- [ ] Crop card / soil summary block highlighted.

### Breakdown panel

- [ ] Open financial breakdown; click a cost or revenue row.
- [ ] Same focus behavior as feed card for that type.

### Fallback

- [ ] Remove `fccFocus` from URL manually with invalid id → “not in view” message after retries.

## Mobile

- [ ] Feed card tap navigates and smooth-scrolls to target.
- [ ] Highlight visible on small screen.
- [ ] History modal usable on crop action focus.

## Keyboard

- [ ] Focused element receives `tabindex="-1"` briefly; not trapped in command center.

## Before → after

| Task | Before (W4-03) | After (W4-04) |
|------|----------------|---------------|
| Find a specific revenue entry | Open form → guess which sale | 1 click → form prefilled + highlighted |
| Review feed-mix cost | Open livestock → hunt calculator | 1 click → anchored + banner |
| Verify crop action | Crops page → find crop → history → scan rows | 1 click → card + row highlighted |
