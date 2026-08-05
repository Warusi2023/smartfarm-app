# Billing ship note — Stripe-aligned account management

**Date:** 2026-07  
**Scope:** Farm Pro ($29/month) — subscription state sync, Customer Portal, failed-payment UX  
**Related:** [`BILLING_PRODUCTION_ACTIVATION.md`](BILLING_PRODUCTION_ACTIVATION.md) · [`BILLING_LIVE_CUTOVER_CHECKLIST.md`](BILLING_LIVE_CUTOVER_CHECKLIST.md) · [`LAUNCH_READINESS.md`](LAUNCH_READINESS.md)

---

## Release narrative

SmartFarm billing is now aligned with **Stripe as the source of truth**. Subscription status, cancellation intent, renewal timing, and failed-payment state flow from Stripe into the backend and dashboard so farmers see accurate billing information instead of generic upgrade messaging.

The product is no longer only able to sell Farm Pro in test mode; it has the **account-management foundations** for production-style billing: Customer Portal access, cancel-at-period-end handling, and visible failed-payment state.

> **Billing is now production-shaped, not just connected.** SmartFarm mirrors Stripe subscription state into the database and dashboard, gives users a real self-serve billing path through Stripe Customer Portal, and surfaces failed-payment and cancellation status clearly. What remains before launch is **operator cutover to live Stripe**, plus final command-center reliability and mobile dashboard polish.

---

## What shipped

### Backend

| Change | Why it matters |
|--------|----------------|
| Migration `012_subscription_billing_state.sql` — `cancel_at_period_end`, `canceled_at`, `next_payment_attempt` | DB mirrors Stripe lifecycle fields |
| `syncFromStripeSubscription()` preserves `active`, `trialing`, `past_due`, `canceled`, etc. | Accurate access rules and UI (no more flattening to `active`) |
| `invoice.payment_failed` → `past_due` + `next_payment_attempt` + `payment_failed` event | Dashboard can warn before access is lost |
| `customer.subscription.updated` → `cancel_at_period_end` + `subscription_cancel_scheduled` event | “Will cancel on …” messaging |
| `customer.subscription.deleted` → free/canceled downgrade | Access ends when Stripe ends subscription |
| `POST /api/billing/portal` | Stripe Customer Portal (payment method, invoices, cancel) |
| `GET /api/subscriptions/current` enriched | `statusBadge`, `renewalLabel`, `billingAlert`, `canManageBilling`, `stripeStatus` |
| `POST /api/subscriptions/cancel` → `USE_BILLING_PORTAL` | No dead-end cancel button |

**Key files:** `backend/services/stripeBillingService.js`, `backend/utils/subscriptionBillingPresentation.js`, `backend/routes/billing.js`, `backend/database/migrations/012_subscription_billing_state.sql`

### Frontend

| Change | Why it matters |
|--------|----------------|
| Status badges (Active, Trialing, Past due, Canceled, Incomplete) | Mirrors Stripe on Billing & plans page |
| `renewalLabel` — “Renews on …” / “Access until …” / “Trial ends …” | Plain-language billing dates |
| Failed-payment and cancel-scheduled banners on dashboard + billing page | Farmers see problems before lockout |
| **Manage billing in Stripe** button | Safe self-serve cancel and card updates |

**Key files:** `web-project/public/js/subscription-billing.js`, `web-project/public/subscription-management.html`

### Tests

- `backend/tests/unit/subscriptionBillingPresentation.test.js` — badges, renewal copy, past-due alerts, trial vs paid
- `backend/tests/unit/stripeBillingService.test.js` — config readiness
- Trial-label bug fixed: trial end is checked before requiring paid `current_period_end`

---

## Deploy checklist (paste-ready)

### 1. Database

```bash
cd backend && npm run migrate
```

Confirms migration `012_subscription_billing_state.sql` applied.

### 2. Deploy services

1. **Railway** — Backend (API + webhooks)
2. **Netlify** — Frontend (`subscription-billing.js`, `subscription-management.html`)

### 3. Stripe Dashboard (test or live mode)

- [ ] **Customer Portal** — Settings → Billing → Customer portal  
  - Enable **Customers can cancel subscriptions**  
  - Enable **Customers can update payment methods**
- [ ] **Failed-payment emails** — Settings → Billing → Subscriptions and emails  
  - Enable customer emails for failed payments / expiring cards  
  - Configure **Smart Retries**; on final failure prefer **cancel at period end**
- [ ] **Webhook** — `https://web-production-86d39.up.railway.app/api/webhooks/stripe`  
  - Events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_failed`

### 4. Automated verify (after deploy)

```powershell
node backend/scripts/stripe-billing-production-probe.js
```

With smoke JWT (optional portal + checkout):

```powershell
$env:SMARTFARM_SMOKE_EMAIL="your@example.com"
$env:SMARTFARM_SMOKE_PASSWORD="..."
node backend/scripts/stripe-billing-production-probe.js
```

### 5. Manual verify

| Step | Expected |
|------|----------|
| `GET /api/subscriptions/current` (authenticated) | `statusBadge`, `renewalLabel`, `stripeStatus` present |
| `subscription-management.html` | Badge + renewal line + **Manage billing in Stripe** for paid users |
| `POST /api/billing/portal` | **200** + `{ url }` → Stripe Portal opens |
| Checkout `4242 4242 4242 4242` | Farm Pro active after webhook |
| Fail card `4000 0000 0000 0341` (attach to customer) | Dashboard **payment-failure** banner; DB `past_due` |
| Cancel via Portal | `cancel_at_period_end` in DB; “Access until …” in UI |

Record results in [`post-deploy-notes/stripe-billing-flow.md`](post-deploy-notes/stripe-billing-flow.md) (Run 2 test / Run 3 live).

---

## Operator-only (not code)

These remain **Stripe Dashboard / Railway** tasks:

| Item | Where |
|------|--------|
| Live key cutover (`sk_live_`, `pk_live_`, live price ID) | Railway Backend vars |
| Live webhook signing secret | Railway + Stripe live webhook endpoint |
| Statement descriptor | Stripe → Settings → Public business information |
| Receipt / customer email settings | Stripe → Settings → Customer emails |
| One controlled real payment | Live Checkout → webhook 200 → Farm Pro in app |

**Live cutover:** use [`BILLING_LIVE_CUTOVER_CHECKLIST.md`](BILLING_LIVE_CUTOVER_CHECKLIST.md) and:

```powershell
node backend/scripts/stripe-billing-live-cutover-probe.js
```

---

## Rollback

1. Railway — revert to test Stripe vars (or remove `STRIPE_SECRET_KEY`) → redeploy  
2. Confirm `billingEnabled: false` or test mode via `/api/subscriptions/billing-status`  
3. Stripe — disable live webhook if needed  

See [`BILLING_PRODUCTION_ACTIVATION.md` §7](BILLING_PRODUCTION_ACTIVATION.md).

---

## What’s next (product, not billing plumbing)

1. **Live-mode cutover** — operator checklist above  
2. **Command center** — offline replay, mobile layout ([`command-center-verification.md`](post-deploy-notes/command-center-verification.md))  
3. **Mobile-friendly dashboard** — responsive pass before native app  
