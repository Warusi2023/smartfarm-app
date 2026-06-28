# Stripe billing flow — post-deploy verification

**Related:** [`TRIAL_SUBSCRIPTION_IMPLEMENTATION.md`](../../TRIAL_SUBSCRIPTION_IMPLEMENTATION.md) (implementation reference)

**Probe script:** `backend/scripts/stripe-billing-production-probe.js`

## Problem / goal

Verify the web-first billing path from **30-day trial → Farm Pro ($29/mo)** via Stripe Checkout, including webhook activation on Railway and UI on `www.smartfarm-app.com`.

**Out of scope this phase:** Customer Portal, self-serve Enterprise, per-farm/seat pricing.

## Plans (shipped)

| Plan | Price | Farms | Self-serve |
|------|-------|-------|------------|
| **30-day trial** | $0 | 1 | Register + verify email |
| **Farm Pro** | $29/month per account | Up to 3 | Stripe Checkout |
| **Enterprise** | Contact-only | Custom | Contact sales |

## Routes and pages

### Backend (Railway: `https://web-production-86d39.up.railway.app`)

| Method | Path | Auth | Purpose |
|--------|------|------|---------|
| GET | `/api/subscriptions/plans` | No | Public plan catalog |
| GET | `/api/subscriptions/billing-config` | No | Publishable key + billing enabled flag |
| GET | `/api/subscriptions/current` | Yes | Current plan / trial days remaining |
| POST | `/api/subscriptions/create-checkout-session` | Yes | Returns Stripe Checkout URL |
| POST | `/api/subscriptions/events` | Yes | Client analytics (`trial_started`, `upgrade_started`, etc.) |
| POST | `/api/webhooks/stripe` | Stripe signature | Raw body — **must** be registered on Railway, not Netlify |
| POST | `/api/farms` | Yes | Farm limit enforced by plan |

**Webhook events handled:** `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_failed` (log only v1).

On `checkout.session.completed`, backend calls `activateProfessional()` and logs `upgrade_completed` to `subscription_events`.

Legacy `POST /subscribe` and `POST /cancel` return `USE_STRIPE_CHECKOUT`.

### Frontend (Netlify: `www.smartfarm-app.com`)

| Page | Role |
|------|------|
| `pricing.html` | Trial + Farm Pro; Enterprise contact |
| `checkout.html` | Redirects to Stripe Checkout |
| `subscription-management.html` | Plan status, upgrade CTA, `?checkout=success` return |
| `dashboard.html` | Trial banner (≤7 days); expired trial → subscription management |
| `js/subscription-billing.js` | Shared billing helpers |

### Billing flow

1. User registers → trial subscription (`trialing`, 30 days).
2. User clicks **Upgrade to Farm Pro** → `POST /api/subscriptions/create-checkout-session` → `upgrade_started` logged.
3. User pays on Stripe-hosted Checkout.
4. Stripe → `POST /api/webhooks/stripe` on Railway → `professional` / `active` in `subscriptions`.
5. User returns to `subscription-management.html?checkout=success`.

## Environment (Railway backend)

```env
STRIPE_SECRET_KEY=sk_test_...   # or sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_ID_FARM_PRO=price_...
FRONTEND_URL=https://www.smartfarm-app.com
```

**Webhook URL (production):** `https://web-production-86d39.up.railway.app/api/webhooks/stripe`

## Verification (production / test mode)

### Status: **BLOCKED** — Stripe not configured on Railway (2026-06-28)

Public UI and API proxy paths respond correctly, but **end-to-end Checkout cannot run** until Railway Backend has Stripe env vars.

### Automated probe evidence (2026-06-28)

Run:

```bash
node backend/scripts/stripe-billing-production-probe.js
```

Observed:

| Check | Result |
|-------|--------|
| `GET /api/subscriptions/plans` (Railway) | ✅ 200 JSON |
| `GET /api/subscriptions/billing-config` (Railway) | ✅ 200 — **`billingEnabled: false`**, `publishableKey` empty |
| `GET /api/subscriptions/billing-config` (Netlify proxy) | ✅ 200 — same payload |
| `/pricing.html`, `/subscription-management.html`, `/checkout.html` | ✅ 200 HTML |
| `POST /api/subscriptions/create-checkout-session` | ⏸️ Not run — requires JWT; expected **503 `BILLING_NOT_CONFIGURED`** until env set |
| Full Checkout `4242...` | ⏸️ **Blocked** — no Checkout URL without Stripe config |
| Webhook `checkout.session.completed` | ⏸️ **Blocked** |
| `upgrade_completed` in DB | ⏸️ **Blocked** |
| Before/after `/api/subscriptions/current` | ⏸️ **Blocked** — set `SMARTFARM_SMOKE_EMAIL` / `SMARTFARM_SMOKE_PASSWORD` after Stripe config |

**Blocker:** Railway Backend service missing `STRIPE_SECRET_KEY`, `STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PRICE_ID_FARM_PRO`.

### Prerequisite — configure Railway (operator)

1. Stripe Dashboard → create **Farm Pro** product + **$29/month** price (test mode first).
2. Railway → **Backend** service → Variables → add four `STRIPE_*` vars + confirm `FRONTEND_URL=https://www.smartfarm-app.com`.
3. Redeploy Backend.
4. Confirm: `GET /api/subscriptions/billing-config` → `billingEnabled: true`, `publishableKey` starts with `pk_test_` or `pk_live_`.
5. Stripe Dashboard → Webhooks → add endpoint `https://web-production-86d39.up.railway.app/api/webhooks/stripe` → events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_failed` → copy signing secret to `STRIPE_WEBHOOK_SECRET`.

### Manual test-mode checklist (complete after prerequisite)

Use a **verified trial account**.

**Stripe test cards (test mode only):**

| Card | Expected result |
|------|-----------------|
| `4242 4242 4242 4242` | Payment succeeds |
| `4000 0000 0000 0002` | Card declined |
| Any future expiry, any CVC, any ZIP | |

**Steps:**

- [ ] Log in → capture **before** `GET /api/subscriptions/current` (`trialing`, days remaining > 0)
- [ ] `subscription-management.html` → **Upgrade to Farm Pro** visible
- [ ] `POST /api/subscriptions/create-checkout-session` → 200, `sessionId` + Checkout `url`
- [ ] Complete Checkout with `4242...` → redirect to `subscription-management.html?checkout=success`
- [ ] Stripe Dashboard → webhook `checkout.session.completed` → **200** to Railway URL
- [ ] Capture **after** `GET /api/subscriptions/current` → `plan_name: "Farm Pro"`, `status: "active"`, `plan_type: "professional"`
- [ ] DB: `subscription_events` rows `upgrade_started` + `upgrade_completed` for user
- [ ] DB: `subscriptions.stripe_subscription_id` populated
- [ ] `POST /api/farms` — up to **3** farms allowed (4th → limit error)

**Authenticated probe (after env + credentials):**

```powershell
$env:SMARTFARM_SMOKE_EMAIL="your-verified-trial@example.com"
$env:SMARTFARM_SMOKE_PASSWORD="your-password"
node backend/scripts/stripe-billing-production-probe.js
```

**Browser console — before Checkout:**

```javascript
fetch("/api/subscriptions/current", {
  headers: { Authorization: `Bearer ${localStorage.getItem("smartfarm_token")}` }
}).then(r => r.json()).then(console.log);
```

**After Checkout + webhook — record in Outcome below.**

### Security notes

- Webhook secret must match Stripe Dashboard; reject unsigned payloads.
- Never expose `STRIPE_SECRET_KEY` or `STRIPE_WEBHOOK_SECRET` in frontend or Netlify env.
- Checkout session creation requires valid JWT.

## Farm limits (enforced on `POST /api/farms`)

| Plan | Max farms |
|------|-----------|
| Trial | 1 |
| Farm Pro | 3 |
| Enterprise | Unlimited |

## Outcome

### Run 1 — 2026-06-28 (probe only, E2E blocked)

| Field | Value |
|-------|--------|
| **Tester** | Automated probe (`stripe-billing-production-probe.js`) |
| **Stripe mode** | Not configured on Railway (`billingEnabled: false`) |
| **Test account** | N/A — no JWT credentials in probe env |
| **Before `/api/subscriptions/current`** | Not captured |
| **Checkout session ID** | Not created |
| **Webhook event ID** | Not delivered |
| **After `/api/subscriptions/current`** | Not captured |
| **DB `upgrade_completed`** | Not verified |
| **Verdict** | **BLOCKED** — configure Railway `STRIPE_*` env vars, redeploy, re-run checklist |

### Run 2 — (fill after Stripe configured + manual Checkout)

| Field | Value |
|-------|--------|
| **Date / tester** | |
| **Stripe mode** | test / live |
| **Test account email** | |
| **Before `/api/subscriptions/current`** | paste JSON |
| **Checkout session ID** | `cs_test_...` |
| **Webhook event ID** | `evt_...` (Stripe Dashboard → 200 response) |
| **After `/api/subscriptions/current`** | paste JSON |
| **DB `subscription_events`** | `upgrade_started`, `upgrade_completed` timestamps |
| **Verdict** | PASS / FAIL |
