# Post-deploy notes (commit 225a784+)

## Fixed in code (this pass)

| Area | Change |
|------|--------|
| **GET /api/auth/me & /api/auth/profile** | Shared `formatUserProfile()` in `backend/utils/authProfile.js`; both routes use the same handler and payload shape. |
| **Token refresh** | `refreshTokenSafely()` clears stale refresh tokens on **401**; parses `data.data.token` / `data.data.refreshToken`. |
| **Forgot / reset password pages** | Already wired to `POST /api/auth/forgot-password` and `POST /api/auth/reset-password` with expected JSON bodies. |
| **Traceability** | `traceability.html` accepts `?product=` (dashboard QR) and `?id=` (competitive-features). |
| **Pricing → Features** | Nav link uses `/#features` (works on production root + `index.html#features` anchor). |
| **Dashboard cache bust** | `api-service.js?v=linksfix2` after refresh hardening. |

## Automated tests added

- `backend/tests/unit/authProfile.test.js` — profile payload shape
- `web-project/tests/unit/auth-refresh.test.js` — refresh parsing + 401 cleanup
- `web-project/tests/unit/post-deploy-auth-pages.test.js` — static HTML endpoint/anchor checks

## Manual production verification still required

No production JWT, browser session, or test email inbox in CI/agent environment.

1. **Authenticated profile** — Login → `GET /api/auth/profile` and `/api/auth/me` with Bearer token; expect **200** and identical `data`.
2. **Forgot-password** — Submit registered email; expect **200** + email (or **500** `EMAIL_ERROR` if Railway email env missing).
3. **Reset-password** — Open email link → set password → login with new password.
4. **Token refresh** — Login with Remember me → delete `smartfarm_token` → open Team → expect `POST /api/auth/refresh` **200** then protected API **200**.
5. **Pricing scroll** — Click Features → URL `/#features` and scroll to features section.

## Deploy order

Backend first (profile helper + `/profile` alias already on 225a784), then **smartfarm-app** (HTML + `linksfix2`).
