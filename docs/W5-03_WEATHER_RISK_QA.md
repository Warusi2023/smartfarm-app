# W5-03 — Weather-aware risk row (manual QA)

_Extends [W5-02_WEEKLY_REVIEW_QA.md](./W5-02_WEEKLY_REVIEW_QA.md)._

## What shipped

**Weather & risk** row in the command center (below offline panel, above weekly review):

- Concise weather summary + one recommendation
- Optional primary action (soil test, feed costs, tasks)
- States: `risk`, `opportunity`, `calm`, `unavailable`

**API:** `GET /api/farm-summary/command-center` includes `weatherRisk`.

## Data source

| Condition | Behavior |
|-----------|----------|
| `WEATHER_API_KEY` + farm with lat/lng | Live OpenWeather current + 48h forecast |
| No API key | `unavailable` — service not configured |
| No farm coordinates | `unavailable` — prompt to add location |
| API error | `unavailable` — temporary, no spam |

Farm location: first active `farms` row for user with non-null `latitude` / `longitude`.

## Deterministic rules (priority order)

| Priority | Rule ID | Trigger | State | Summary (example) | Action |
|----------|---------|---------|-------|-------------------|--------|
| 1 | `wind_storm` | Thunderstorm or wind ≥50 km/h today/tomorrow | risk | Storms / high winds | Review tasks |
| 2 | `frost` | Min temp ≤2°C today/tomorrow | risk | Frost risk | Log crop action |
| 3 | `heat` | Max temp ≥35°C today/tomorrow | risk | High heat | Review feed costs |
| 4 | `rain_tomorrow` | ≥8mm rain tomorrow (or rain + ≥3mm) | opportunity | Rain tomorrow | Add soil test |
| 5 | `dry_stretch` | 6+ forecast days with &lt;5mm rain | opportunity | Dry stretch ahead | Review tasks |
| 6 | `calm` | None of the above | calm | Weather looks fine | — |
| — | `unavailable` | No data / config | unavailable | Weather unavailable | — |

## weatherRisk fields

```json
{
  "state": "opportunity",
  "summary": "Rain tomorrow",
  "recommendation": "Good window for soil tests...",
  "ruleId": "rain_tomorrow",
  "action": { "label": "Add soil test", "target": "soil-test" },
  "source": "live",
  "conditions": "Now 22°C · Tomorrow up to 26°C · 12mm rain"
}
```

`action` is `null` for calm/unavailable. `target` uses existing command-center `NAV` keys.

## Desktop

- [ ] **Weather & risk** section visible when signed in.
- [ ] Risk row: orange accent, warning-style icon.
- [ ] Opportunity row: blue accent.
- [ ] Calm row: green accent, no action button.
- [ ] Unavailable: muted, single line, no repeated alerts on refresh.
- [ ] Action buttons navigate (soil test, feed cost, today-on-farm).

## Mobile

- [ ] Row stacks; action button full-width under text on narrow screens.
- [ ] Summary + recommendation readable without horizontal scroll.

## Signed out

- [ ] Short sign-in hint in weather section (no API call).

## API / config testing

### With OpenWeather + farm location

```http
GET /api/farm-summary/command-center?window=today
Authorization: Bearer <token>
```

Expect `weatherRisk.state` in `risk` | `opportunity` | `calm`.

### Without API key

Expect `state: unavailable`, `source: none`.

### Unit tests

```bash
cd backend && npm test -- --testPathPattern=farmWeatherRisk
```

## Before → after

| Question | Before (W5-02) | After (W5-03) |
|----------|----------------|---------------|
| Should I change plans for weather? | Check separate weather pages | One row in command center |
| Rain tomorrow? | Manual forecast lookup | “Rain tomorrow” + soil test suggestion |
| Heat/livestock? | Not tied to dashboard | Heat rule → feed/water reminder |
| No weather config? | Broken or demo-only UI | Clear unavailable message |

## Regression

- [ ] Checklist, weekly strip, inbox unchanged.
- [ ] Command center refresh still loads all sections.
