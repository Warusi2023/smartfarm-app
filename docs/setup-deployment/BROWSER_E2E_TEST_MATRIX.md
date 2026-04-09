# Browser & E2E Test Matrix

Use this matrix for final pre-release validation when automated coverage is incomplete.

## Browser coverage targets

- Chrome (latest)
- Edge (latest)
- Safari (latest stable)
- Mobile Safari (iOS)
- Chrome Mobile (Android)

## Critical user journeys (priority order)

1. Auth login/register flow
2. Dashboard load and no blocking console errors
3. Weather/API data fetch on dashboard
4. Graph/history widgets render
5. One create/update flow (farm, crop, or livestock)

## Manual matrix

| Journey | Chrome | Edge | Safari | iOS Safari | Android Chrome | Notes |
|---|---|---|---|---|---|---|
| Login/register | [ ] | [ ] | [ ] | [ ] | [ ] | Verify validation + error messages |
| Dashboard load | [ ] | [ ] | [ ] | [ ] | [ ] | No crash, no blank state |
| Weather/data fetch | [ ] | [ ] | [ ] | [ ] | [ ] | Confirm data + fallback behavior |
| Graph/history render | [ ] | [ ] | [ ] | [ ] | [ ] | Check layout/labels/ticks |
| Create/update action | [ ] | [ ] | [ ] | [ ] | [ ] | Confirm persistence after refresh |

## Existing automation in repo

- Playwright config: `web-project/playwright.config.js`
- E2E tests: `web-project/tests/e2e/`
- Updated health check assertion: `web-project/tests/e2e/server-connection.spec.js`

## Known blockers / gaps

- Frontend contains mixed static-page and Vite pathways; E2E execution environment must match deployed route set.
- Some test assumptions rely on static host paths and may not map 1:1 to production URLs.
- BrowserStack/Sauce coverage is not wired; mobile checks currently require manual devices or local emulation.

## Pass criteria

- No P0/P1 failures in critical journeys.
- No persistent CORS/auth console errors during main flows.
- API health and data fetch paths complete within acceptable latency windows (see `PERFORMANCE_GATE.md`).
