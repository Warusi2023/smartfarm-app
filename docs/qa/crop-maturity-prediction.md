# Crop maturity prediction — manual QA (`crop-management.html`)

**Page:** `crop-management.html` → **Add New Crop** modal.  
**General:** Log in, open modal, set **Field** and **Area** as needed. After each change, check harvest date + AI card. Watch the browser console for errors.

---

## 1. Cassava + Kuli Piqi

| Field | Value |
|-------|--------|
| Crop | `Cassava` (or matches normalized `cassava`) |
| Variety | `Kuli Piqi` |
| Planting date | e.g. `2026-01-15` |

| Expected | |
|----------|--|
| **Maturity source** | `variety-override` |
| **AI card** | Line: **Variety-adjusted growth window: 280 days**; optimal maturity date reflects base **280** days + existing season/field/area multipliers. |
| **Failure** | Catalog-only line instead of variety line; wrong day count (not 280 before multipliers); console errors; harvest date unchanged when planting date changes. |

---

## 2. Cassava + empty / other variety

| Field | Value |
|-------|--------|
| Crop | `Cassava` |
| Variety | Empty **or** a name not in the lookup (e.g. `Local landrace`) |
| Planting date | e.g. `2026-03-01` |

| Expected | |
|----------|--|
| **Maturity source** | `variety-override` (uses crop **default**: 300 days) |
| **AI card** | **Variety-adjusted growth window: 300 days** |
| **Failure** | Shows **280** without **Kuli Piqi**; no variety line; wrong source. |

---

## 3. Tomato + Cherry

| Field | Value |
|-------|--------|
| Crop | `Tomato` or `Tomatoes` |
| Variety | `Cherry` |
| Planting date | e.g. `2026-02-01` |

| Expected | |
|----------|--|
| **Maturity source** | `variety-override` |
| **AI card** | **Variety-adjusted growth window: 70 days** |
| **Failure** | **85** or catalog **150** shown as the primary window line for this row; maturity date inconsistent with **70**-day base. |

---

## 4. Tomato + no matching variety

| Field | Value |
|-------|--------|
| Crop | `Tomato` |
| Variety | Anything not listed under tomato lookup (e.g. `Roma`, `Beefsteak`) **or** leave empty |
| Planting date | e.g. `2026-04-10` |

| Expected | |
|----------|--|
| **Maturity source** | `variety-override` (crop **default**: **85** days) |
| **AI card** | **Variety-adjusted growth window: 85 days** |
| **Failure** | **70** without **Cherry**; catalog line replaces variety line incorrectly. |

---

## 5. Unknown crop (no lookup entry)

| Field | Value |
|-------|--------|
| Crop | A name **not** in `maturityDaysByCropVariety` (e.g. `Zyztestcrop`) |
| Variety | Any or empty |
| Planting date | e.g. `2026-05-01` |

| Expected | |
|----------|--|
| **Maturity source** | **`catalog`** if the plant exists in catalog API/static JSON with `growthDurationDays`; else **`heuristic`** if `cropDatabase` matches; else **`fallback`** (**60** days base). |
| **AI card** | **Catalog:** “Catalog growth window: … days” when source is catalog. **Fallback:** “Using generic estimate — enrich catalog data…”. Heuristic: main prediction only (no catalog/variety extra line). |
| **Failure** | Variety-adjusted line for an unknown crop; **60**-day fallback not applied when there is no catalog/heuristic match; silent error in console. |

---

## Quick regression

- Change **Variety** after **Crop** and **Planting date** are set → AI card and harvest date update (listener on `#cropVariety`).
