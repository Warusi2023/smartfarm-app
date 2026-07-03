# Crop Pests & Protection — IPM panel template

**API:** `GET /api/biological-farming/pests-protection/:cropName`  
Optional query: `?region=KE` (or `regionCode`) — filters DB chemical actives through `crop_chemical_regulatory_status`. Without region, pests/beneficials load from DB when imported; chemicals keep JS fallback until region is supplied.

**UI module:** `web-project/public/js/crop-pest-protection.js`  
**Data:** `backend/data/cropPestProtection.js` (Phase 0 — migrating to DB; see [IPM_REFERENCE_SCHEMA.md](./IPM_REFERENCE_SCHEMA.md))

The frontend passes `?region=` from the signed-in user's country (ISO code) when available, enabling regulatory chemical filtering once DB + regulatory rows are deployed.

---

## Purpose

Every crop uses the **same panel structure** (extension-guide IPM style):

0. **What to look for in the field** — symptom-first cues (optional but recommended)  
1. **Key insect pests** — name + short field damage description  
2. **Beneficial insects — protect these** — predators, parasitoids, biological products  
3. **Example chemical actives** — generic active-ingredient families + local label disclaimer  

Unknown crops receive the **general vegetable template** (`isDefaultTemplate: true`) with a visible **Default vegetable guidance** banner in the UI.

---

## Template (content authors)

```
Pests & protection for {Crop name}

1. Key insect pests
   {Pest 1}: {damage description}
   {Pest 2}: {damage description}

2. Beneficial insects – protect these
   {Beneficial 1}: {role}
   {Biological products}: Bt, neem, oils/soaps…

3. Example chemical actives used in many regions
   Growers often use actives such as {A}, {B}, {C} against {pest groups}.
   Always follow local label, PHI, and agronomist advice.
   Avoid broad-spectrum products when beneficials are active.
```

---

## Crops with specific content

| Crop key | Aliases | Notes |
|----------|---------|--------|
| `tomato` | tomato, tomatoes | Includes Tuta absoluta, fruit borers |
| `capsicum` | pepper, bell pepper, capsicum | Thrips, fruit borers emphasis |
| `lettuce` | lettuce, leafy greens, spinach, kale | Leafminers, flea beetles |
| `wheat` | wheat | Temperate/continental cereals |
| `rice` | rice, paddy | Paddy stem borers, hoppers, blast |
| `maize` | maize, corn | Fall armyworm, stem borers |
| `barley` | barley | Net blotch, rust, aphids |
| `sorghum` | sorghum | Midge, shoot fly, armyworm |
| `millet` | millet, pearl millet | Stem borers, head bugs |
| `oats` | oats | Crown rust, aphid viruses |
| `rye` | rye | Low-input cover/forage IPM |
| `triticale` | triticale | Wheat-complex pests |
| `buckwheat` | buckwheat | Pollinator-safe focus |
| `fonio` | fonio, small millets | Marginal-environment millets |

Add a row in `CROP_IPM` in `backend/data/cropPestProtection.js` (vegetables) or `backend/data/cerealPestProtection.js` (cereals) and optional aliases in `CROP_ALIASES`.

---

## Default vegetable fallback

When no specific record exists, the API returns `isDefaultTemplate: true` with broad pest groups:

- Sap suckers (aphids, whiteflies, thrips, leafhoppers)  
- Leafminers and borers  
- Caterpillars and beetles  
- Mites  

Plus generic beneficials and chemical families (soaps, oils, neem, spinosad, Bt; pyrethroids flagged as last resort).

---

## UI usage

```html
<div id="pest-panel"></div>
<script src="js/crop-pest-protection.js"></script>
<script>
  SmartFarmPestProtection.loadAndRender('pest-panel', 'Tomato');
</script>
```

Or render from cached API data:

```javascript
SmartFarmPestProtection.renderPestsProtectionPanel('pest-panel', data);
```

**Live pages:**

- `biological-farming.html` — crop selector  
- `crop-management.html` — **Pests & Protection** on each crop card (uses planting record `crop.name`)

```javascript
SmartFarmPestProtection.loadAndRender('cropPestProtectionPanel', crop.name);
```

---

## Release wording (paste-ready)

SmartFarm now includes a reusable **Pests & Protection** panel inside **Crop Management** and the **biological farming guide**. Farmers can see common pests, what damage to look for in the field, beneficial insects to protect, and example chemical actives for each crop — starting with tomato, capsicum, and lettuce, with default vegetable guidance for other crops.

---

## Verification (manual smoke test)

Automated: `npm test -- tests/unit/cropPestProtection.test.js` (6 tests).

### Production vs local

| Environment | Before testing |
|---------------|----------------|
| **Local / dev** | Hard refresh is enough — `web-project/public/crop-management.html` includes the green **Pests & Protection** button. |
| **Production** (`www.smartfarm-app.com`) | **Deploy to Netlify first**, then hard refresh — otherwise you may reload an older build without the button. |

**Best order (production):**

1. Push the changes (commit if needed).
2. Wait for the Netlify deploy to finish.
3. Open **Crop Management**.
4. Hard refresh the page (Ctrl+Shift+R / Cmd+Shift+R).
5. Confirm each crop card shows the green **Pests & Protection** button **above** the soil-test section.

**Browser checks:**

| Step | Expected |
|------|----------|
| Open `crop-management.html` → click **Pests & Protection** on **Tomatoes** | Crop-specific content; no default banner |
| Selected card highlighted; panel **inline below grid** | Card has `crop-card-selected`; panel visible without navigation |
| Click **Pests & Protection** on a custom/unsupported crop name | **Default vegetable guidance** banner; generic IPM template |
| Trigger `loadCrops()` refresh (filter/search) while panel open | Selection + panel persist if crop still listed |
| Section order | What to look for → pests → beneficials → example actives + disclaimer |

Also verify on `biological-farming.html` crop selector for the same API payload.

### Outcome — Run 1 (browser)

| Field | Value |
|-------|--------|
| **Date / tester** | |
| **Tomatoes — crop-specific** | PASS / FAIL |
| **Custom crop — default banner** | PASS / FAIL |
| **Inline panel + card highlight** | PASS / FAIL |
| **Pests & Protection button visible on card** (full-width green, above soil test — not icon-only) | PASS / FAIL |
| **Selection after list refresh** | PASS / FAIL |
| **Verdict** | Ready for farmers / needs fix |

When **Verdict** is “Ready for farmers,” include in the next launch-phase deploy notes.

---

## Future: database

For per-region or farmer-editable content, migrate `CROP_IPM` to a table:

```sql
-- sketch only
crop_pest_protection (
  crop_key VARCHAR(64) PRIMARY KEY,
  crop_name VARCHAR(128),
  pests JSONB,
  beneficials JSONB,
  chemical_actives JSONB
);
```

The UI and API response shape stay identical.
