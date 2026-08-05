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

### August release sign-off log

#### 2026-08-06 (pre billing merge)

| Check | Result | Evidence |
|-------|--------|----------|
| `GET /api/health` | ✅ 200 | Live Railway |
| `GET /api/livestock` (no token) | ✅ 401 | Persistent store / auth gate live |
| `GET /api/subscriptions/current` (no token) | ✅ 401 | Subscription router mounted |
| `POST /api/billing/portal` (no token) | ❌ 404 | Missing `billing.js` until merge |
| `POST /api/auth/forgot-password` (unknown email) | ✅ 200 generic success body | Endpoint live; not proof of inbox delivery |
| Forgot/reset + Remember-me refresh (real mailbox) | ⛔ Blocked | Needs smoke-account credentials + mailbox |
| Livestock web Edit/Health/AI/Timeline | ⛔ Blocked | Needs logged-in browser on live web host |
| AAB 1.0.10 sync matrix | ⛔ Blocked | Local AAB exists; needs device install + JWT |

#### 2026-08-07 (post merge)

| Check | Result | Evidence |
|-------|--------|----------|
| Merge billing to `main` | ✅ | Merge `4b91334` → tip `f168f13` pushed to `origin/main` |
| Merge launch docs to `main` | ✅ | Merge `f168f13`; `LAUNCH_READINESS.md` → `RELEASE_RUNWAY_AUG2026.md` |
| `GET /api/health` | ✅ 200 | Live Railway after deploy |
| `GET /api/livestock` (no token) | ✅ 401 | Unchanged / still gated |
| `POST /api/billing/portal` (no token) | ✅ 401 | Was 404 pre-merge; route live (auth required) |
| Schema path `012` + `018` | ⚠️ Assumed via deploy | Confirm in Railway pre-deploy logs: `012_subscription_billing_state.sql`, `018_livestock_legacy_column_reconcile.sql` |
| Forgot/reset + Remember-me refresh | ⛔ Blocked | Operator: `sfarm663@gmail.com` mailbox + session |
| Livestock web button retest | ⛔ Blocked | Operator: hard-refresh live web, logged in |
| AAB 1.0.10 sync matrix | ⛔ Blocked | Operator: install local AAB, web↔Android photo matrix |

**Merged:** `fix/august-billing-ship`, `docs/august-launch-runway`  
**Next August PR branch:** `fix/august-farm-team-android-hygiene` (farm-team API-first JS, versionCode 10, Android CI SDK 35, keystore removal from repo)  
**Frozen off August:** `wip/september-defer` (local)  


## Deploy order

Backend first (profile helper + `/profile` alias already on 225a784), then **smartfarm-app** (HTML + `linksfix2`).

## API base URL (important)

- **Backend API** lives on Railway: `https://web-production-86d39.up.railway.app`
- Routes such as `GET /api/auth/profile` and `GET /api/auth/me` exist on the **backend** (commit `a959ad2+`).
- The dashboard's `api-service.js` / `api-client.js` call the Railway origin directly.
- **Public domain (`www.smartfarm-app.com`):** Netlify proxies same-origin `/api/*` via `dist/_redirects` (commits `758392e`, `b5b6a2d`). See [`docs/post-deploy-notes/netlify-proxy-fix.md`](docs/post-deploy-notes/netlify-proxy-fix.md).
- **Railway web service only:** `scripts/serve-dist-with-api-proxy.js` (commit `76548e3`) applies if traffic hits the Railway web deploy — not the Netlify custom domain.

### Manual profile verification (Netlify production — verified)

```javascript
const token = localStorage.getItem('smartfarm_token');

fetch('/api/auth/profile', { headers: { Authorization: `Bearer ${token}` } })
  .then(r => r.json()).then(console.log);

fetch('/api/auth/me', { headers: { Authorization: `Bearer ${token}` } })
  .then(r => r.json()).then(console.log);
```

Expect **200** JSON with `{ success: true, data: { email, ... } }` for both `/profile` and `/me`.

Direct backend (sanity check):

```javascript
fetch('https://web-production-86d39.up.railway.app/api/auth/profile', {
  headers: { Authorization: `Bearer ${token}` }
}).then(r => r.json()).then(console.log);
```

## Launch roadmap (web-first)

SmartFarm is **web-first** on `www.smartfarm-app.com`. **Billing is production-shaped**; the project is in the **product readiness phase** — command center, account/team UX, mobile web.

**Current phase doc:** [`docs/LAUNCH_PHASE_PRODUCT.md`](docs/LAUNCH_PHASE_PRODUCT.md)  
**Team brief:** [`docs/LAUNCH_PHASE_TEAM_BRIEF.md`](docs/LAUNCH_PHASE_TEAM_BRIEF.md)  
**Checklists:** [`docs/LAUNCH_READINESS.md`](docs/LAUNCH_READINESS.md)

### Recommended order (parallel where noted)

| # | Track | Status | Doc |
|---|--------|--------|-----|
| 1 | **Command center + offline** | In progress | [`LAUNCH_PHASE_PRODUCT.md`](docs/LAUNCH_PHASE_PRODUCT.md) §1 · [`command-center-verification.md`](docs/post-deploy-notes/command-center-verification.md) |
| 2 | **Account, billing copy, farm team** | In progress (parallel) | [`LAUNCH_PHASE_PRODUCT.md`](docs/LAUNCH_PHASE_PRODUCT.md) §2 · [`farm-team-invitations.md`](docs/post-deploy-notes/farm-team-invitations.md) |
| 3 | **Mobile-friendly sweep** | Next | [`LAUNCH_PHASE_PRODUCT.md`](docs/LAUNCH_PHASE_PRODUCT.md) §3 |
| 4 | **Live billing cutover** | Operator when ready | [`BILLING_LIVE_CUTOVER_CHECKLIST.md`](docs/BILLING_LIVE_CUTOVER_CHECKLIST.md) |

**Mobile path:** focused responsive pass on existing dashboard — no native app on day one.

> SmartFarm has crossed the hardest engineering gate: billing is production-shaped and Stripe is the source of truth. What remains is dependable daily use on unreliable connectivity and small screens — command center offline/reconnect verification, plain account and billing copy, farm-team Run 2, and a 375px layout pass. Full narrative: [`docs/LAUNCH_PHASE_PRODUCT.md`](docs/LAUNCH_PHASE_PRODUCT.md).

## Related verification docs

| Area | Doc |
|------|-----|
| Netlify `/api/*` proxy | [`docs/post-deploy-notes/netlify-proxy-fix.md`](docs/post-deploy-notes/netlify-proxy-fix.md) |
| Command center | [`docs/post-deploy-notes/command-center-verification.md`](docs/post-deploy-notes/command-center-verification.md) |
| Farm team invites | [`docs/post-deploy-notes/farm-team-invitations.md`](docs/post-deploy-notes/farm-team-invitations.md) |
| Stripe billing | [`docs/post-deploy-notes/stripe-billing-flow.md`](docs/post-deploy-notes/stripe-billing-flow.md) |
| **Billing ship note** | [`docs/BILLING_SHIP_NOTE.md`](docs/BILLING_SHIP_NOTE.md) |
| Live cutover | [`docs/BILLING_LIVE_CUTOVER_CHECKLIST.md`](docs/BILLING_LIVE_CUTOVER_CHECKLIST.md) |
| **Product launch phase** | [`docs/LAUNCH_PHASE_PRODUCT.md`](docs/LAUNCH_PHASE_PRODUCT.md) |
| **Launch phase team brief** | [`docs/LAUNCH_PHASE_TEAM_BRIEF.md`](docs/LAUNCH_PHASE_TEAM_BRIEF.md) |
| Launch readiness | [`docs/LAUNCH_READINESS.md`](docs/LAUNCH_READINESS.md) |
