# Farm Hazard & Early Warning — QA checklist (v1)

_Extends [W5-03_WEATHER_RISK_QA.md](./W5-03_WEATHER_RISK_QA.md). Command-center block: `hazardAssessment`._

## What shipped

**Farm hazard & early warning** panel below **Weather & risk** in the command center:

- Overall severity badge (`All clear`, `Watch`, `Warning`, `Severe`)
- Top 1–3 hazards with short reasons
- **Do now** actions (scannable first)
- Expandable per-hazard details: triggers, affected areas, do now / next 24–72h / recovery

**API:** `GET /api/farm-summary/command-center` includes `hazardAssessment`.

## Data source

| Condition | Behavior |
|-----------|----------|
| `WEATHER_API_KEY` + farm lat/lng | Live OpenWeather snapshot → multi-hazard rules |
| No API key | `unavailableReason` — weather not configured |
| No farm coordinates | `unavailableReason` — add coordinates |
| API error | `unavailableReason` — temporary unavailable |

Farm context: `farm_type`, livestock activity signal, optional `crops` row check, active `aquaculture_units` count (v1.1).

## Manual QA cases

### Calm state
- [ ] Signed-in user with mild forecast sees **All clear** badge
- [ ] 1–2 routine reminders shown (no hazard details expanded by default)
- [ ] W5-03 weather row still shows calm/opportunity as before

### Heat warning
- [ ] Demo or live forecast with max ≥35°C shows heat hazard **Warning** or **Severe**
- [ ] Top actions mention water, shade, or hottest hours
- [ ] Expandable detail lists do now / next 24h / recovery

### Flood warning
- [ ] Forecast with ≥25mm rain shows flood hazard
- [ ] Actions mention drains, moving feed, livestock from low areas

### Drought watch
- [ ] `dryWeek` + warm temps shows drought hazard
- [ ] Actions mention water storage, irrigation, grazing pressure

### Wind / storm severe
- [ ] Thunderstorm or wind ≥65 km/h shows wind **Severe**
- [ ] Actions mention securing equipment and sheltering livestock

### Missing coordinates
- [ ] User with no lat/lng: hazard panel shows unavailable message (not empty crash)
- [ ] Message names missing coordinates explicitly

### Missing weather config
- [ ] Server without `WEATHER_API_KEY`: unavailable message names configuration

### Mixed crop/livestock farm
- [ ] Actions include both crop and livestock guidance
- [ ] Affects line shows crops + livestock

### Crop-only farm (`farm_type: crops`)
- [ ] Livestock-specific actions filtered out where possible
- [ ] Crop irrigation / harvest actions remain

### Livestock-only farm
- [ ] Crop transplant / harvest actions filtered where possible
- [ ] Water and shelter actions remain

## hazardAssessment fields

```json
{
  "generatedAt": "2026-06-15T...",
  "weatherState": "risk",
  "overallSeverity": "warning",
  "hazards": [
    {
      "type": "heat",
      "severity": "warning",
      "title": "Heat stress warning",
      "reason": "...",
      "triggers": ["Max temp ≥ 35°C"],
      "affects": { "crops": true, "livestock": true, "infrastructure": false, "water": true },
      "actions": {
        "doNow": ["..."],
        "next24h": ["..."],
        "recovery": ["..."]
      }
    }
  ],
  "topActions": ["..."],
  "farmContext": {
    "farmType": "mixed",
    "hasCrops": true,
    "hasLivestock": true,
    "hasAquaculture": true,
    "aquacultureUnitCount": 2,
    "operationMode": "mixed-with-aquaculture"
  }
}
```

Extended hazard `affects` when aquaculture is present: `aquaculture`, `pondsTanks`, `waterQuality`, `aerationPower`, `stockEscapeOverflow`.

## v1.1 — Aquaculture-aware hazard guidance

### Operation modes

| Mode | When |
|------|------|
| `crop-only` | Crops, no livestock or aquaculture |
| `livestock-only` | Livestock signal, no crops or aquaculture |
| `mixed` | Crops + livestock, no aquaculture |
| `aquaculture-only` | Aquaculture units only (or `farm_type: aquaculture`) |
| `mixed-with-aquaculture` | Aquaculture plus crops and/or livestock |

### Aquaculture action categories

| Category | Examples |
|----------|----------|
| **water_quality** | Monitor DO, temperature, pH/turbidity after storms |
| **aeration_power** | Inspect aerators, backup power, generator readiness |
| **pond_tank** | Check levels, shade tanks, reduce feeding in stress |
| **overflow_escape** | Secure edges, overflow paths, cage moorings |
| **equipment** | Protect pumps, electrical gear, inlet screens |

Copy lives in `backend/lib/aquacultureMitigationActions.js`; blending in `backend/lib/aquacultureHazardAdaptation.js`.

### Manual QA — aquaculture (v1.1)

#### Aquaculture-only farm
- [ ] Heat hazard shows aerator/DO actions, not livestock/crop copy
- [ ] Affects include ponds/tanks, water quality, aeration/power
- [ ] Calm state shows aerator + logging reminders

#### Mixed crop + aquaculture
- [ ] topActions blend pond and field actions (not duplicated)
- [ ] Expandable details show both crop and aquaculture affects where relevant

#### Mixed livestock + aquaculture
- [ ] Flood/wind hazards include stock escape + livestock shelter actions

#### Storm risk on fish/shrimp units
- [ ] Wind/severe shows secure aerators, nets, backup power
- [ ] `stockEscapeOverflow` in affects

#### Heat stress on pond/tank system
- [ ] Reason mentions pond/tank oxygen
- [ ] Reduce feeding during oxygen stress appears in doNow

#### Unavailable weather with aquaculture present
- [ ] unavailableReason mentions manual pond/tank checks
- [ ] Suggested checks list DO/temperature logging

## Known limitations (v1)

- Rules use simplified thresholds, not full meteorological models
- No SMS/email/push notifications
- No historical disaster replay
- No ML / opaque scoring
- Drainage quality and microclimate not modeled
- 48h forecast window only (same as W5-03 OpenWeather fetch)

## Known limitations (v1.1)

- Species-specific thresholds (tilapia vs shrimp) not in hazard rules — use aquaculture daily log alerts for unit-level DO/temp
- No live DO/temp feed into hazard panel yet (forecast-only)
- Action blending uses simple interleave caps, not priority scoring

## Automated tests

```bash
cd backend && npm run test:unit -- --testPathPattern="farmHazardAssessment|aquacultureHazard"
```
