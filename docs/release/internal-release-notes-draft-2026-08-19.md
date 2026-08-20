# SmartFarm — Internal Release Notes Draft

Mobile dashboard reliability detail: [Mobile dashboard reliability (internal draft)](mobile-dashboard-reliability-internal-draft-2026-08-19.md).

Documentation-only draft for engineering, QA, release owners, and operations. This record does not approve, ship, or sign off the release.
## Release identification

| Item | Value |
|---|---|
| Repository | SmartFarm |
| Candidate branch | `fix/playwright-dashboard-readiness-overlay` |
| Candidate commit | `41ce81f` |
| Commit message | Stabilize mobile browser regression coverage |
| Document date | 19 Aug 2026 (draft) |

## Scope included

The candidate improves automated browser-test reliability and mobile/WebKit dashboard readiness:

- The dashboard analytics view paints before Chart.js initialization/update work is scheduled.
- Analytics chart initialization failures remain visible using `console.error`; no errors are hidden or suppressed.
- The localhost authentication debug panel is disabled during explicit E2E sessions because it can cover a substantial mobile viewport.
- Dashboard E2E readiness marks the page with `window.__SMARTFARM_E2E__ = true` before dashboard scripts run.
- E2E cleanup defensively removes an existing dashboard debug panel.
- Console-navigation coverage targets explicit SPA `onclick` handlers, avoiding incorrect matches when visible sidebar labels are duplicated.
- The normal mocked livestock API response stays seed-sized for interactive dashboard/mobile rendering.
- The large livestock response remains explicitly tested through `/api/livestock?e2eBulk=1`.

## Validation evidence

| Area | Command or check | Result | Status |
|---|---|---|---|
| Local sequential browser matrix | Regression Pass 2 sequential Playwright matrix (five projects) | **375 passed, 0 failed** (local sequential result) | Verified |
| Focused console errors (Chromium) | `playwright.cmd test tests/e2e/console-errors.spec.js --project=chromium` | **9 passed, 0 failed**, exit 0 | Verified |
| Focused console errors (Mobile Safari) | `playwright.cmd test tests/e2e/console-errors.spec.js --project="Mobile Safari"` | **9 passed, 0 failed**, exit 0 | Verified |
| Focused large API response (Mobile Safari) | `playwright.cmd test tests/e2e/server-connection.spec.js --project="Mobile Safari" -g "large API responses efficiently"` | **1 passed, 0 failed**, exit 0 | Verified |
| Focused active navigation (Mobile Safari) | `playwright.cmd test tests/e2e/navigation.spec.js --project="Mobile Safari" -g "navigate between\|maintain only one active"` | **1 passed, 0 failed**, exit 0 | Verified |
| GitHub Playwright (Mobile Safari) | GitHub check run for commit `41ce81f` | success | Verified |
| GitHub Playwright (Chromium) | GitHub check run for commit `41ce81f` | success | Verified |
| GitHub Playwright (Firefox) | GitHub check run for commit `41ce81f` | success | Verified |
| GitHub Playwright (WebKit) | GitHub check run for commit `41ce81f` | success | Verified |
| GitHub Playwright (Mobile Chrome) | GitHub check run for commit `41ce81f` | success | Verified |
| Public Railway API health | `GET https://web-production-86d39.up.railway.app/api/health` | `ok: true`, `service: SmartFarm`, `env: production`, `database.connected: true`, `database.version: PostgreSQL 17.10` | Verified |
| GitHub Smoke - Railway API | GitHub check run for commit `41ce81f` | skipped | Verified (not run) |
| GitHub Deploy to Production | GitHub check run for commit `41ce81f` | skipped | Verified (not run) |

The **375 passed / 0 failed** result is a **local sequential regression result**, not a remote CI matrix total.

## Production and deployment status

**Backend / API (verified):**

- Public Railway API health endpoint checked: `https://web-production-86d39.up.railway.app/api/health`
- Response: `ok: true`, `service: SmartFarm`, `env: production`, `database.connected: true`, `database.version: PostgreSQL 17.10`
- The production Railway backend/API is healthy.
- Active frontend and backend Railway services remained online during this check.

**Frontend (not confirmed for this candidate):**

- The frontend deployment for commit `41ce81f` is **not confirmed**.
- Two manual CLI frontend deployment attempts using `railway up` failed during Railpack preparation/build-image setup, before deployment started.
- Visible build message: `railpack prepare exited with an error`.
- Those failed attempts did **not** replace the active frontend release.
- GitHub CI jobs labelled `Smoke - Railway API` and `Deploy to Production` were **skipped** for commit `41ce81f`.

**Open release gate:** frontend production-deployment verification for `41ce81f`.

## Known risks and open items

- **Frontend deployment unverified.** Do not treat commit `41ce81f` as live in the production frontend until deployment and public smoke testing are completed.
- **Manual Railway CLI build failure.** `railway up` frontend attempts failed at `railpack prepare` before deployment; root directory / build configuration review is still required.
- **Skipped CI deploy/smoke jobs.** `Smoke - Railway API` and `Deploy to Production` did not run for this commit; they are not evidence of a successful frontend rollout.
- **Rollback rehearsal pending.** A production rollback procedure must be rehearsed and documented on **21-Aug** before release approval. Do not assume rollback timing or commands until that rehearsal is recorded.

### Rollback

- The currently active Railway frontend/backend deployment remained available during the failed CLI build attempts.
- A production rollback procedure must be rehearsed and documented on **21-Aug** before release approval.
- No rollback command, deployment ID, or rollback duration is recorded in this draft.

## Release decision

This release is **not approved**, **not shipped**, **not production-ready**, and **not fully signed off**.

### Approval record

- [ ] Frontend deployment for 41ce81f verified
- [ ] Public frontend smoke test completed
- [ ] Railway build configuration/root directory reviewed
- [ ] Release owner approval
- [ ] QA approval
- [ ] Operations/deployment approval
