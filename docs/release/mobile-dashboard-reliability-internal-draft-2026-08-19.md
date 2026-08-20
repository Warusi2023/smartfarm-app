# SmartFarm — Mobile Dashboard Reliability (Internal Release Notes Draft)

Internal draft for engineering, QA, release owners, and operations. Scope is **web dashboard reliability on mobile browser profiles** (Playwright Mobile Chrome / Mobile Safari). This is **not** a native Android app (`app-release.aab`) release record.

Related drafts: [General internal release notes](internal-release-notes-draft-2026-08-19.md), [Regression Pass 2](regression-pass-2-2026-08-18.md).

## Release identification

| Item | Value |
|---|---|
| Repository | SmartFarm |
| Candidate branch | `fix/playwright-dashboard-readiness-overlay` |
| Candidate commit | `41ce81f` |
| Commit message | Stabilize mobile browser regression coverage |
| Document date | 19 Aug 2026 (draft) |
| Platform scope | Web dashboard on mobile browsers (not native Android AAB) |

## Mobile dashboard reliability scope

Planned user-visible outcomes when the frontend is deployed:

- More responsive dashboard section transitions on mobile viewports.
- Analytics view paints before Chart.js initialization/update is scheduled.
- Livestock and inventory sections remain interactive under normal list sizes.

Technical changes included in the candidate (web + test support only):

- `showAnalytics()` shows the analytics view first; Chart.js work runs inside `requestAnimationFrame`. Chart failures still log via `console.error` (not suppressed).
- Explicit E2E sessions set `window.__SMARTFARM_E2E__ = true` before dashboard scripts run; localhost Auth Debug panel creation is skipped during E2E.
- E2E cleanup defensively removes `#dashboardDebugPanel` if present.
- Console-navigation coverage uses SPA `onclick` handlers (`clickSidebarNavByOnclick`) instead of ambiguous visible sidebar text matching.
- Mock `GET /api/livestock` returns seed-sized data by default; bulk payload is opt-in via `?e2eBulk=1` for the large-response API test only.

**Out of scope for this mobile dashboard record:**

- Native Android app code, versioning, or `app-release.aab` rebuild (Android sources unchanged; existing AAB remains version **1.0.12** / versionCode **12**, dated 2026-08-07).
- Android/AAB on-device synchronization (explicit deferral from Regression Pass 2).

## Mobile-focused validation evidence

| Area | Command or check | Result | Status |
|---|---|---|---|
| Full local matrix — Mobile Chrome | Sequential Playwright `--project="Mobile Chrome"` | **75 passed, 0 failed** (within local 375/375 sequential matrix) | Verified |
| Full local matrix — Mobile Safari | Sequential Playwright `--project="Mobile Safari"` | **75 passed, 0 failed** (within local 375/375 sequential matrix) | Verified |
| Console / navigation (Mobile Safari) | `playwright.cmd test tests/e2e/console-errors.spec.js --project="Mobile Safari"` | **9 passed, 0 failed**, exit 0 | Verified |
| Large API response (Mobile Safari) | `server-connection.spec.js` Mobile Safari, `-g "large API responses efficiently"` | **1 passed, 0 failed**, exit 0 | Verified |
| Active navigation (Mobile Safari) | `navigation.spec.js` Mobile Safari, `-g "maintain only one active"` | **1 passed, 0 failed**, exit 0 | Verified |
| GitHub Playwright (Mobile Chrome) | Check run for commit `41ce81f` | success | Verified |
| GitHub Playwright (Mobile Safari) | Check run for commit `41ce81f` | success | Verified |

Local **375 passed / 0 failed** is a **local sequential regression result** across five browser projects, including both mobile profiles.

## Production and deployment status

- **Backend/API:** Public health check returned `ok: true`, `database.connected: true` (PostgreSQL 17.10).
- **Web frontend (mobile dashboard):** Deployment of commit `41ce81f` is **not confirmed**. Manual `railway up` frontend attempts failed at `railpack prepare` before deployment; active frontend was not replaced.
- **Native Android AAB:** Not updated for this candidate; no Android source changes in `41ce81f`.

**Open release gate:** production frontend deployment verification for `41ce81f` before mobile dashboard reliability can be claimed live.

## Known risks and deferrals

| Item | Risk | Mitigation / follow-up |
|---|---|---|
| Frontend not deployed | Mobile fixes exist only in the candidate until frontend rollout is verified | Complete frontend deployment + public mobile browser smoke test |
| Native Android sync | Room/Retrofit vs REST contract not tested on device/emulator | Explicit deferral; device pass against non-production API |
| Livestock API duplicate POST | API-level idempotency not wired | UI submit disabled; accepted deferral |
| Livestock false-success UI | Failed create can show local save success | Accepted deferral |

## Release decision

Mobile dashboard reliability improvements are **validated in test** for the candidate but are **not approved for production** until frontend deployment is verified. This record does **not** approve, ship, or sign off the release.

### Mobile dashboard approval record

- [ ] Frontend deployment for `41ce81f` verified
- [ ] Public mobile browser smoke test (Mobile Chrome / Mobile Safari or equivalent) completed
- [ ] Release owner approval
- [ ] QA approval
