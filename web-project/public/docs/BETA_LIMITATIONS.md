# SmartFarm Beta Limitations

_Last updated: 2026-05-23_

This document captures the current limits and caveats of the SmartFarm beta so we don't over-promise or misinterpret data in production.

## 1. Data durability and storage

### 1.1 Crop recommendations and history

- Crop recommendations and action logs are still backed primarily by a **file-based JSON store** (`crop_recommendation_data.json`) in production.
- This means crop recommendation history is **not designed as permanent storage** and could be reset on certain redeploys or migrations.

**Implications**

- Crop timelines and AI recommendation history are best-effort, not a guaranteed permanent record.
- Users should not treat SmartFarm as their only long-term archive for crop notes during beta.

### 1.2 Soil tests

- As of **W2-02 / W2-03**, soil tests are written **DB-first** to the `soiltests` table for authenticated UUID users, with a **file fallback** when the DB is unavailable or the user is `default-user`.
- The crop-card "latest soil test" summary uses a **combined read path** (DB + file + cache) and shows the newest test by date.

**Known limitation**

- The existing **history** endpoint / UI still reads from the file-backed soilTests list only.
- DB-only soil tests will appear correctly on crop cards and in refine flows, but **may not appear in the older history view** until we add a DB-backed history read.

### 1.3 Farm costs

- As of **Week 2**, feed mix saves and optional crop action costs write into the `farmcosts` table.
- Other cost sources may still be file-backed or not captured.

**Implications**

- Financial dashboards now reflect:
  - feed mix costs
  - optional crop action costs
  - any other sources explicitly writing to `farmcosts`
- Beta users should expect **partial** cost coverage for now; not every cost they incur on the farm is automatically captured.

### 1.4 Revenue and net margin

- Manual revenue entries from the dashboard write into a dedicated `farmrevenue` table.
- The financial summary endpoint computes:
  - `revenue` = sum of `farmrevenue.amount` in the current period
  - `costs` = sum of `farmcosts.amount` in the current period
  - `net` = `revenue - costs` (no forecasting or simulation)

**Known limitation**

- Only **manual** revenue lines and instrumented cost paths are included.
- External sales, input costs, and other financials must still be entered manually if users want net margin to reflect them.

---

## 2. Authentication and multi-tenant behavior

### 2.1 JWT requirement

- All protected API routes (financials, soil DB operations, cost writes, etc.) require a **valid JWT** from `/api/auth/login`.
- Frontend "demo" or legacy social login tokens (`email-token-*`, `social-token-*`, `demo-token-*`) are **not** accepted by the backend.

**Implications**

- If the dashboard shows "$0" plus a helper like "Could not load financial summary…", it usually means:
  - no valid JWT is present, or
  - the token has expired / is invalid.
- Users must log in via **email + password** for production financial and soil features.

### 2.2 Default user

- Some flows still support a `default-user` / unauthenticated path for:
  - basic AI advisory
  - local-only experimentation

**Limitations for default-user**

- No DB-backed soil tests or costs.
- No access to financial dashboards or JWT-scoped data.
- Any data stored is ephemeral and **not** guaranteed between deploys.

---

## 3. Dashboard and advisory behavior

### 3.1 Unified "Today on farm" panel

- The unified panel merges:
  - crop reminders
  - weather alerts
  - local weeding tasks
  - (optional) future livestock reminders

**Limitations**

- Local weeding tasks are stored in **browser localStorage** and are device-specific.
- Clearing browser data or switching devices will clear local weeding tasks.

### 3.2 Soil advisory and refine

- The **AI Advisory soil tab** and **Crop Management soil flows** now share a single refine path and disclaimer.
- All soil-based recommendations are **heuristic estimates**, not lab-grade agronomy.

**Implications**

- Users should verify any fertilizer rates with a soil lab or local extension before applying.
- The app does not replace professional agronomy; it is a decision-support tool.

---

## 4. Deployment and environment behavior

### 4.1 Railway and Netlify

- Backend (API and DB access) is deployed on **Railway**.
- Frontend is deployed on **Netlify** (`www.smartfarm-app.com`).

**Required deploy order**

1. **Railway first**: apply DB migrations and deploy backend commits.
2. **Netlify second**: deploy the frontend build that depends on those APIs.

Deploying Netlify first for features that depend on new backend routes can expose broken flows (UI calling endpoints that don't exist yet).

### 4.2 File fallback and redeploys

- Several flows use **"DB first, file fallback"** for resilience.
- In failure modes (DB down, invalid JWT, etc.), the system favors:
  - preserving the action (e.g., saving a test or action log) via file store
  - returning a partial but honest response, rather than failing completely

**Implications for beta**

- In rare DB outage scenarios, certain saves will go to file only.
- Data written via file fallback may not automatically migrate into DB later.
- Beta users should treat this as a pre-production environment and avoid depending on it as a single source of truth.

---

## 5. Known UX/data gaps to address

- Soil test **history** page does not yet read from `soiltests` table (DB-only tests may be absent there).
- Financial dashboard only includes instrumented costs and manual revenue, not a full ledger.
- Some localStorage-based behaviors (weeding tasks) are device-specific and not synced across sessions.

These are intentional limitations for the beta period and will be revisited before any "production-ready" positioning.
