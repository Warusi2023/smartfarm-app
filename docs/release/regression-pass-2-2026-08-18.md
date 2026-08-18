# Regression Pass 2 — 18 Aug

Local regression-validation record. No production/Railway writes, Stripe charges, production webhooks, or real user data were used. Nothing was staged, committed, or pushed.

## Environment

- Branch and commit: `fix/playwright-dashboard-readiness-overlay` at `77d2ca18306ba02d506dd622d556d26f8c76d0a4` (“Add data integrity review and fix livestock migration”). Uncommitted local fixes from this pass are listed under Files changed.
- Node/npm versions: Node v22.23.2, npm 10.9.8
- Backend environment: local only. Integrity runner used throwaway JWT + spawned `backend/server.js`. Playwright matrix used the deterministic mock API on `http://127.0.0.1:3099` (not Railway).
- Database: integrity used embedded PostgreSQL (throwaway). Browser matrix does not use Postgres.
- Web test API: Playwright `webServer` mock API on port 3099 + static `serve public` on port 8080. `railway-smoke` is a separate project and was not run.
- Test data approach: mock API seed + `__e2e__/reset` in Playwright global setup; integrity uses prefix-scoped `E2E-INTEGRITY-*` users cleaned in `finally`.
- Remote CI status: **not green** on SHA `77d2ca1`. See Remote CI below. Workflows were not rerun.

## Baseline changes covered

Compared to Aug 11–12 baseline end `f15032c` (shard Playwright CI):

| Commit | Summary |
|---|---|
| `daa0aa7` | Pin local `@playwright/test` 1.59.1; install in CI with `--include=dev` |
| `dd12590` | Run Playwright matrix against deterministic local mock API |
| `b0788fa` | Vendor dashboard QR/Chart assets; stabilize cross-browser E2E |
| `77d2ca1` | Data integrity review runner; migration 017 `species` column correction |

Relevant areas in that range: backend migration 017, integrity runner, dashboard.html, vendor QR/Chart scripts and assets, Playwright config/helpers/mock API, modal accessibility specs, CI workflow sharding, authentication session helpers.

## Results

| Area | Command/test | Result | Evidence |
|---|---|---|---|
| Migration / integrity | `$env:RUN_INTEGRATION_TESTS='true'; npm run test:integrity` (backend) | 35 passed, 3 deferred, 0 unexpected failures, exit 0 | Recommendation: Passed with explicit deferrals. Fresh embedded Postgres chain includes the 017 species-column correction. |
| Authentication | Integrity scenarios F (login/refresh/expired token) + Playwright session helpers | Pass | Register/login/refresh rotation and 401 on expired/invalid token in integrity; browser matrix seeds `smartfarm_token` and keeps session across navigation. |
| CRUD persistence | Integrity A/B + Jest unit stores + Playwright livestock create/list | Pass | Farm/livestock/crop/task create→GET and livestock/crop/task edit→refresh on local Postgres. Playwright `should create livestock via API` passed on all five projects after the mock bulk opt-in. |
| Error recovery | Playwright dashboard error notifications, unauthenticated farms, API errors, network failures | Pass | Chromium focused specs and full matrix: `should display error notifications`, `should reject unauthenticated farms requests`, `should handle API errors gracefully`, `should handle network failures gracefully`. |
| Vendor assets | `npm run vendor`; `npm run build`; `Test-Path` vendor files | Pass | `web-project/public/vendor/qrcode.js` and `chart.umd.js` exist. `git grep` in `web-project` found no `cdnjs`/`unpkg`/`jsdelivr` QR references in app runtime. Docs outside the app may still mention CDNs. |
| QR/Chart console | `console-errors.spec.js` + dashboard analytics charts | Pass | No critical QR/Chart console errors in the five-browser matrix. Analytics canvases visible after `showAnalytics` paints the view before Chart.js work. |
| Dashboard navigation | `dashboard.spec.js`, `navigation.spec.js`, console menu-tabs | Pass | Repeated section navigation and URL updates passed on all five projects after Mobile Safari fixes. |
| Modal accessibility | `modal-accessibility.spec.js`, `modal-accessibility-comprehensive.spec.js` | Pass | Focus, Escape, restore-focus, and automated checks passed without forcing hidden UI visible. |
| Full browser matrix | Sequential `playwright.cmd test --project=<name>` after the Mobile Safari fix | 375 passed, 0 failed | See Browser matrix. One project at a time; ports 8080/3099 not shared. |
| Remote CI | GitHub Actions on `77d2ca1` | Failed (Mobile Safari jobs) | See Remote CI. Not rerun. Local Mobile Safari is green after uncommitted fixes. |

## Explicit deferrals

These were not modified in this pass.

1. **Livestock API duplicate-create idempotency**
   - Risk: two identical `POST /api/livestock` requests persist two rows.
   - Current mitigation: UI submit buttons are disabled before the request. `writeIdempotency` is not wired to CRUD.
   - Release-owner acceptance: UI disable is sufficient for this release only if product owns the API follow-up.
   - Planned follow-up: optional `Idempotency-Key` / `writeIdempotency` on livestock (and other CRUD) POST.

2. **Livestock false-success behavior**
   - Risk: a server create failure can fall back to localStorage and show “Saved locally.” A later refresh against the live API can drop that local-only record.
   - Current mitigation: farm/crop paths show errors; livestock modal still uses the local-save success path.
   - Release-owner acceptance: livestock modal gap is accepted for this release only with an owned follow-up.
   - Planned follow-up: show error (or warning, not success) when `createLivestock` returns `success: false`.

3. **Android/AAB device synchronization**
   - Risk: Room/Retrofit mapping drift vs the REST contract is untested on a real device/emulator.
   - Current mitigation: the same REST contract was exercised at API level in the integrity review. Android STAGING currently points at Railway production; production writes are forbidden.
   - Release-owner acceptance: ship without device sync evidence only if product owns a staging/device pass.
   - Planned follow-up: point a debug build at a non-production API and repeat create/update both directions.

## New defects

| Severity | Description | Reproduction | Root cause | Decision |
|---|---|---|---|---|
| Medium (test + WebKit) | Mobile Safari timed out navigating dashboard tabs. First failure: `console-errors.spec.js` “should navigate through all menu tabs without errors” at Inventory (`page.evaluate` in `dismissAllBootstrapModals`, 60s). Snapshot showed 40 livestock cards including `BULK-*`. | `playwright.cmd test --project="Mobile Safari"` on this machine, ports 8080/3099 exclusive. Screenshot/video: `web-project/test-results/console-errors-Console-Err-dc382-ll-menu-tabs-without-errors-Mobile-Safari/`. | Mock `GET /api/livestock` always concatenated 150 bulk rows into every dashboard list. WebKit main thread stalled while rendering the list, so helper `page.evaluate` never returned. | **Fixed.** Default GET returns seed livestock only. Bulk payload is opt-in via `?e2eBulk=1` for the large-response API test (`page.request`, not UI). |
| Low (localhost debug chrome) | After the bulk fix, Mobile Safari still exhausted the 60s menu-tab budget. Screenshots showed the localhost “Auth Debug” panel (`#dashboardDebugPanel`, `z-index: 9999`, ~250px) covering most of the iPhone 12 viewport. | Same Mobile Safari focused rerun. Screenshot: Auth Debug + Critical/Urgent banner over Inventory/Analytics. | `createDashboardDebugPanel()` runs on `localhost`/`127.0.0.1`, which is the Playwright origin. | **Fixed.** Session seed sets `window.__SMARTFARM_E2E__`; dashboard skips the panel during E2E. Helper also removes `#dashboardDebugPanel` if present. Production hostnames were already excluded. |
| Low (WebKit click handler) | Menu-tab navigation then stalled on Analytics: `clickSidebarNavByOnclick` fell through to a full `gotoDashboardReady` retry because `#analyticsView` did not become visible before the 60s test timeout closed the page. | Focused Mobile Safari after debug-panel skip. | `showAnalytics()` initialized Chart.js synchronously inside the click handler. | **Fixed.** View is shown first; Chart.js init/update runs on `requestAnimationFrame`. Analytics chart test still waits up to 10s for a canvas. |
| Info (test locator) | Text-label sidebar clicks (`Livestock`, `Farm Tasks`) can match duplicate sidebar links, including full-page `livestock-management.html`. | Console menu-tab test on Mobile Safari. | Ambiguous `.nav-link` text vs SPA `onclick` handlers. | **Fixed.** Menu-tab test uses `clickSidebarNavByOnclick` (same path as dashboard navigation). No timeout increase. |
| Info (remote CI) | GitHub Actions Mobile Safari jobs fail on SHA `77d2ca1` with “Process completed with exit code 1.” Exact failing test name is not in public annotations. | [Web quality gates](https://github.com/Warusi2023/smartfarm-app/actions/runs/32002343652) job Playwright (mobile-safari); [SmartFarm Frontend CI/CD](https://github.com/Warusi2023/smartfarm-app/actions/runs/32002343711) job Test Frontend (mobile-safari). | Likely the same mock-bulk / WebKit interaction; logs need auth. Local Mobile Safari is 75/75 after the fixes above, which are **not** on `77d2ca1`. | Do not rerun workflows from this pass. CI will stay red until the local fixes are committed and a new SHA is pushed. |

## Commands run

```text
git status
git log --oneline --decorate -20
git log --oneline f15032c..HEAD
git diff --stat f15032c..HEAD
node -v   → v22.23.2
npm -v    → 10.9.8
Get-NetTCPConnection -LocalPort 8080,3099
Get-Process node

cd backend
npm ci
  → exit 0; lock SHA unchanged D64D41DB…

npm install --no-save embedded-postgres
  → exit 0; lock SHA unchanged

$env:RUN_INTEGRATION_TESTS='true'; npm run test:integrity
  → exit 0; passCount 35; deferredCount 3; unexpectedFailureCount 0

npx cross-env NODE_ENV=test jest --testPathPattern=tests/unit
  → exit 0; 211 passed (livestockStore, cropsStore, writeIdempotency, migrations, auth)

cd web-project
npm ci --include=dev
  → exit 0; lock SHA unchanged 18D7498C…
npm run vendor
  → exit 0
npm run build
  → exit 0
Test-Path .\public\vendor\qrcode.js  → True
Test-Path .\public\vendor\chart.umd.js → True

.\node_modules\.bin\playwright.cmd test --project=chromium tests/e2e/dashboard.spec.js tests/e2e/server-connection.spec.js tests/e2e/navigation.spec.js tests/e2e/modal-accessibility.spec.js tests/e2e/modal-accessibility-comprehensive.spec.js tests/e2e/console-errors.spec.js
  → exit 0; 75 passed (5.9m)  [also used as Chromium matrix row before the Mobile Safari fix]

.\node_modules\.bin\playwright.cmd test --project=firefox
  → exit 0; 75 passed (6.3m)  [pre-fix]

.\node_modules\.bin\playwright.cmd test --project=webkit
  → exit 0; 75 passed (5.7m)  [pre-fix]

.\node_modules\.bin\playwright.cmd test --project="Mobile Chrome"
  → exit 0; 75 passed (11.9m)  [pre-fix]

.\node_modules\.bin\playwright.cmd test --project="Mobile Safari"
  → first run stopped after failures (menu tabs 60s; navigate between sections 45s); ports 8080/3099 owned only by that run

Focused Mobile Safari reruns after fixes
  → final focused: 4 passed, exit 0 (menu tabs, navigate between sections, analytics charts, large API)

Post-fix sequential matrix (authoritative for this record):
.\node_modules\.bin\playwright.cmd test --project="Mobile Safari"  → 75 passed (18.3m), exit 0
.\node_modules\.bin\playwright.cmd test --project=chromium         → 75 passed (6.4m), exit 0
.\node_modules\.bin\playwright.cmd test --project=firefox          → 75 passed (8.6m), exit 0
.\node_modules\.bin\playwright.cmd test --project=webkit           → 75 passed (6.5m), exit 0
.\node_modules\.bin\playwright.cmd test --project="Mobile Chrome"  → 75 passed (11.9m), exit 0
```

Not run (would touch real external services or production): `npm run test:w3:deployed`, `test:email`, `test:db` against production, Stripe, Railway writes, `railway-smoke`.

## Release recommendation

**Regression pass 2 passed with explicit deferrals.**

Local integrity is 35/3/0. Local Playwright is 375/375 against the mock API after the Mobile Safari fixes. The three known product deferrals remain unfixed. Remote CI on the pushed SHA is still red on Mobile Safari and was not rerun; the local fixes are uncommitted.
