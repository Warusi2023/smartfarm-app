# IPM reference schema — pests, beneficials, chemical options

**Migration:** `backend/database/migrations/013_ipm_reference_data.sql`  
**Current API (Phase 0):** `backend/data/cropPestProtection.js` → `GET /api/biological-farming/pests-protection/:cropName`  
**Related pattern:** Soil intelligence uses `crop_key` reference tables (`crop_ph_targets`), not FK to farm planting rows.

---

## Why not `crop_id → crops.id`?

SmartFarm’s `crops` table stores **farm-specific planting records** (field, dates, yield, status). IPM content is **species-level reference data** shared across all farms.

| Layer | Table | Example |
|-------|--------|---------|
| Planting instance | `crops` | “Tomato — Block A, planted 2026-03-01” |
| IPM reference | `ipm_crop_catalog` + linked tables | “Tomato — aphids, Tuta absoluta, lacewings, spinosad examples” |

At query time, a planting’s `crops.name` resolves to `crop_key` (same slug logic as `soilIntelligence/cropKeyResolver.js`). Unknown names fall back to `vegetable_default`.

---

## Tables (maps to recommended extension)

### 1. `ipm_crop_catalog`

Species / template registry. One row per crop key (tomato, maize, `vegetable_default`).

| Column | Purpose |
|--------|---------|
| `crop_key` | Stable slug (PK for joins) |
| `display_name` | UI label |
| `crop_group` | cereal, vegetable, root, legume, fruit |
| `is_default_template` | `true` for generic vegetable fallback |
| `population_status` | `planned` → `partial` → `complete` |

### 2. `crop_pests`

| Recommended field | SmartFarm column |
|-------------------|------------------|
| crop_pest_id | `id` (UUID) |
| crop_id | **`crop_key`** → `ipm_crop_catalog` |
| pest_name_common | `pest_name_common` |
| pest_type | `pest_type` (insect, fungus, bacterium, nematode, weed, virus, mite, other) |
| scientific_name | `scientific_name` |
| stage_targeted | `stage_targeted` (TEXT[]) |
| region | `region_codes` (TEXT[], `['*']` = global) |
| notes (symptoms, threshold, yield loss) | `damage_description` + `notes` |

### 3. `crop_beneficials`

| Recommended field | SmartFarm column |
|-------------------|------------------|
| crop_beneficial_id | `id` |
| crop_id | **`crop_key`** |
| beneficial_name_common | `beneficial_name_common` |
| beneficial_type | `beneficial_type` (predator, parasitoid, pollinator, microbial_antagonist, biological_product) |
| scientific_name | `scientific_name` |
| targets | `targets` |
| deployment_method | `deployment_method` |
| notes | `description` + `notes` |

### 4. `crop_chemical_options`

| Recommended field | SmartFarm column |
|-------------------|------------------|
| crop_chemical_id | `id` |
| crop_id | **`crop_key`** |
| active_ingredient | `active_ingredient` |
| product_class | `product_class` |
| target_pests | `crop_chemical_targets` junction → `crop_pests.id` or free text |
| region / country | `region_codes` + **`crop_chemical_regulatory_status`** |
| application_rate | `application_rate_min/max`, `rate_unit` |
| timing | `timing` |
| PHI_days | `phi_days` |
| reentry_interval_hours | `reentry_interval_hours` |
| hazard_notes | `hazard_notes` |
| — | `is_example_only` (default `true`) — generic examples vs registered products |
| — | `main_pest_groups`, `safety_note` — panel summary block |

### 5. `crop_ipm_field_signs` (UI section 0)

Symptom-first cues currently in `damageToLookFor[]`. Separate table so authors can add region-specific signs without duplicating pest rows.

### 6. `crop_chemical_regulatory_status` (safety layer)

Constrains what SmartFarm **shows** per country/region:

- `allowed`, `restricted`, `banned`, `requires_license`, `unknown`
- Sourced from government registers or local agronomist feed
- API must filter chemical options: **never show banned actives**; show restricted with warnings only when explicitly configured

---

## Progressive population plan

### Phase A — already shipped (JS file)

- tomato, capsicum, lettuce + `vegetable_default` template
- Served from `cropPestProtection.js` until DB repository is wired

### Phase B — top 10 priority crops (catalog seeded, rows empty)

| crop_key | Example priority pests/diseases |
|----------|----------------------------------|
| maize | Fall armyworm, northern leaf blight, rusts, stalk/ear rots |
| rice | Stem borers, blast, sheath blight |
| wheat | Rusts, septoria, aphids |
| soybean | Soybean rust, aphids, pod feeders |
| potato | Late blight, Colorado potato beetle, aphids |
| cassava | Cassava mosaic, green mites, mealybugs |
| sweet_potato | Weevils, sweet potato virus |
| sorghum | Stem smut, stem borers, aphids |
| yam | Yam mosaic, nematodes, scale insects |
| plantain | Black Sigatoka, weevils |

**Target per crop:** 10–20 key pests/diseases from open extension summaries and global loss studies.

**Beneficials:** 5–10 per crop group (generalist predators for aphids/whiteflies in cereals and vegetables).

**Chemicals:** By country/region only — government label data; `is_example_only = true` until registration verified.

### Phase C — API reads DB with JS fallback

1. `ipmRepository.getPanel(cropKey, regionCode)` assembles panel shape
2. If `population_status !== 'complete'`, fall back to `cropPestProtection.js`
3. Filter chemicals through `crop_chemical_regulatory_status` for user’s farm region

---

## UX ordering (IPM-first)

Panel sections should reinforce integrated pest management:

1. **What to look for** — field signs (`crop_ipm_field_signs`)
2. **Key pests & diseases** — cultural + monitoring context in `notes`
3. **Beneficials** — protect/conservation before chemicals
4. **Chemical options** — last resort; filtered by crop, pest, country, PHI, hazard notes

Banner when `is_default_template = true` or `population_status = 'planned'`.

---

## Safety & compliance

- Store **generic actives** and IPM logic centrally; **display** is constrained locally.
- Default `is_example_only = true` on all chemical rows until tied to a verified label source.
- Always surface disclaimer (same text as `CHEMICAL_SAFETY_NOTE` in JS).
- Multi-site fungicides (chlorothalonil, mancozeb) and strobilurins (azoxystrobin): capture `hazard_notes` (aquatic toxicity, persistence, non-target harm).
- Never auto-recommend rates without `region_codes` match and regulatory `allowed` status.

---

## Example: maize pest row

```sql
INSERT INTO crop_pests (
    crop_key, pest_name_common, pest_type, scientific_name,
    stage_targeted, region_codes, damage_description, notes, sort_order
) VALUES (
    'maize',
    'Fall armyworm',
    'insect',
    'Spodoptera frugiperda',
    ARRAY['vegetative', 'flowering', 'grain-filling'],
    ARRAY['*'],
    'Windowing and ragged holes in leaves; larvae in whorl; ear damage in late instars.',
    'Global studies rank among top maize yield threats. Scout whorl weekly; threshold varies by region.',
    1
);
```

---

## Next implementation steps

1. Run migration `013_ipm_reference_data.sql` on staging/production.
2. Import shipped crops: `node backend/scripts/import-ipm-reference-data.js`
3. **Done:** `backend/services/ipmIntelligence/` — repository, region filter, crop key resolver.
4. **Done:** pests-protection routes read DB first with JS fallback; optional `?region=FJ` for chemical filtering.
5. **Illustrative Fiji seed:** `node backend/scripts/import-ipm-regulatory-data.js` — tags rows with `smartfarm:ipm_illustrative_seed_v1` so `?region=FJ` shows example actives from `crop_chemical_options`. Re-run safe; does not delete agronomist rows with other `source_ref` values. Replace with MAAF-register-backed rows when available.
6. Admin or CSV import path for agronomists to add pests without deploys.

See also: [CROP_PEST_PROTECTION.md](./CROP_PEST_PROTECTION.md) for current panel API and UI.
