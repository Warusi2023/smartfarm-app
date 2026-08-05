# Billing production activation — SmartFarm (Stripe test mode)

**Goal:** Enable Farm Pro ($29/month) Stripe Checkout on Railway in **test mode** first, verify end-to-end, then switch to live keys when ready.

**Related:**

- Implementation reference: [`TRIAL_SUBSCRIPTION_IMPLEMENTATION.md`](../TRIAL_SUBSCRIPTION_IMPLEMENTATION.md)
- Post-deploy verification log: [`docs/post-deploy-notes/stripe-billing-flow.md`](post-deploy-notes/stripe-billing-flow.md)
- Probe: `backend/scripts/stripe-billing-production-probe.js`

---

## 1. Why billing is disabled today

There is **no** separate `BILLING_ENABLED` safety flag. Billing turns on only when required Stripe environment variables are present and valid.

| Symptom (production) | Cause |
|----------------------|--------|
| `GET /api/subscriptions/billing-config` → `billingEnabled: false` | Missing or incomplete `STRIPE_*` vars on Railway Backend |
| `publishableKey: ""` | `STRIPE_PUBLISHABLE_KEY` not set |
| `POST /api/subscriptions/create-checkout-session` → **503** `BILLING_NOT_CONFIGURED` | Same — backend `StripeBillingService.isConfigured()` is false |
| Payment succeeds in Stripe but plan never updates | `STRIPE_WEBHOOK_SECRET` missing/wrong, or webhook not registered in Stripe Dashboard |

**Current production state:** Test-mode Stripe is configured on Railway; Checkout and webhook activation verified. **Live keys not yet cut over** — see [`LAUNCH_READINESS.md`](LAUNCH_READINESS.md) §1.

### How `billingEnabled` is computed

`backend/services/stripeBillingService.js`:

```javascript
isConfigured() {
  return !!(this.stripe && this.priceId && this.getPublishableKey());
}
```

All of the following must be true:

1. `stripe` npm package loads
2. `STRIPE_SECRET_KEY` set (creates Stripe client)
3. `STRIPE_PRICE_ID_FARM_PRO` non-empty
4. `STRIPE_PUBLISHABLE_KEY` non-empty

**Checkout** does not require `STRIPE_WEBHOOK_SECRET`, but **subscription activation after payment does**. Treat webhook secret as required for any E2E test.

---

## 2. Required Railway environment variables

Set on **Railway → Backend service → Variables** (not Netlify).

| Variable | Example (test mode) | Purpose |
|----------|---------------------|---------|
| `STRIPE_SECRET_KEY` | `sk_test_...` | Server-side Checkout + webhook verification |
| `STRIPE_PUBLISHABLE_KEY` | `pk_test_...` | Exposed via `/billing-config` (future Stripe.js; ops sanity check) |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` | Verify `POST /api/webhooks/stripe` signatures |
| `STRIPE_PRICE_ID_FARM_PRO` | `price_...` | Farm Pro $29/month price (test-mode price ID) |
| `FRONTEND_URL` | `https://www.smartfarm-app.com` | Checkout success/cancel redirects |

Optional:

| Variable | Purpose |
|----------|---------|
| `STRIPE_WEBHOOK_URL` | Override expected webhook URL in `/billing-status` (default: Railway production URL) |
| `PUBLIC_FRONTEND_URL` | Fallback if `FRONTEND_URL` unset |

**Do not** set live keys (`sk_live_`, `pk_live_`) until test-mode E2E passes.

Copy template from `backend/env.example`.

---

## 3. Config wiring (code paths)

| Endpoint | Auth | Returns |
|----------|------|---------|
| `GET /api/subscriptions/billing-config` | Public | `billingEnabled`, `publishableKey`, price metadata |
| `GET /api/subscriptions/billing-status` | Public | Full readiness: mode (test/live), config flags, webhook readiness; add `?checkStripe=true` to query Stripe for registered webhook endpoints |
| `POST /api/subscriptions/create-checkout-session` | JWT | Stripe Checkout `url` |
| `POST /api/webhooks/stripe` | Stripe signature | Activates subscription on `checkout.session.completed` |

Webhook route is mounted **before** `express.json()` in `server.js` (raw body required).

**Startup log:** On deploy, Railway logs one of:

- `Stripe billing ready` (mode, checkout/webhook flags)
- `Stripe billing partially configured — checkout disabled` (lists which vars are missing)
- `Stripe billing disabled (STRIPE_* env not configured)`

---

## 4. Test-mode activation steps (operator)

### 4.1 Stripe Dashboard (test mode)

1. Toggle **Test mode** (top-right in Stripe Dashboard).
2. **Products** → create **Farm Pro** product if needed.
3. Add **$29/month** recurring price → copy **Price ID** (`price_...`) → `STRIPE_PRICE_ID_FARM_PRO`.
4. **Developers → API keys** → copy `sk_test_...` and `pk_test_...`.
5. **Developers → Webhooks → Add endpoint**
   - URL: `https://web-production-86d39.up.railway.app/api/webhooks/stripe`
   - Events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_failed`
   - Copy signing secret → `STRIPE_WEBHOOK_SECRET`.

### 4.2 Railway

1. Add all five required vars (section 2).
2. Redeploy Backend.
3. Verify:

```bash
curl -s https://web-production-86d39.up.railway.app/api/subscriptions/billing-config | jq .
curl -s "https://web-production-86d39.up.railway.app/api/subscriptions/billing-status?checkStripe=true" | jq .
```

Expected:

- `billingEnabled: true`
- `publishableKey` starts with `pk_test_`
- `billing-status.mode.active: "test"`
- `billing-status.webhook.registeredInStripe: true` (when `checkStripe=true`)

### 4.3 Automated probe

```powershell
node backend/scripts/stripe-billing-production-probe.js
```

With smoke credentials:

```powershell
$env:SMARTFARM_SMOKE_EMAIL="verified-trial@example.com"
$env:SMARTFARM_SMOKE_PASSWORD="..."
node backend/scripts/stripe-billing-production-probe.js
```

Exit **0** + message `BILLING READY (test mode)` when config is complete.

---

## 5. Test-mode E2E runbook

### Prerequisites

- Verified trial user (email verified, `trialing` subscription).
- Railway Stripe test vars + webhook registered (section 4).

### Stripe test card

| Card | Result |
|------|--------|
| `4242 4242 4242 4242` | Success |
| `4000 0000 0000 0002` | Declined |

Any future expiry, any CVC, any billing ZIP.

### Steps

1. **Before state** — log in at `https://www.smartfarm-app.com`, browser console:

```javascript
fetch("/api/subscriptions/current", {
  headers: { Authorization: `Bearer ${localStorage.getItem("smartfarm_token")}` }
}).then(r => r.json()).then(console.log);
```

Expect: `trialing`, days remaining > 0.

2. **Start Checkout** — `subscription-management.html` → **Upgrade to Farm Pro**, or open `checkout.html`.

3. **Confirm session** — Network tab: `POST /api/subscriptions/create-checkout-session` → **200**, body includes `url` and `sessionId` (`cs_test_...`).

4. **Pay** — Complete Stripe Checkout with `4242...` → redirect to `subscription-management.html?checkout=success`.

5. **Webhook** — Stripe Dashboard → Webhooks → latest event → **200** response from Railway URL, event type `checkout.session.completed`.

6. **After state** — repeat step 1; expect:

   - `plan_name: "Farm Pro"`
   - `status: "active"`
   - `plan_type: "professional"`

7. **Database** (optional, via Railway Postgres):

```sql
SELECT plan_name, plan_type, status, stripe_subscription_id
FROM subscriptions WHERE user_id = '<user-uuid>';

SELECT event_type, created_at FROM subscription_events
WHERE user_id = '<user-uuid>' ORDER BY created_at DESC LIMIT 5;
```

Expect: `upgrade_started`, then `upgrade_completed`; `stripe_subscription_id` populated.

8. **Farm limit** — Farm Pro allows 3 farms; 4th `POST /api/farms` should fail with limit error.

### Record results

Fill **Run 2** in [`stripe-billing-flow.md`](post-deploy-notes/stripe-billing-flow.md).

---

## 6. Post-deploy verification checklist

Run after every Backend deploy that touches billing or env:

- [ ] `node backend/scripts/stripe-billing-production-probe.js` → exit 0
- [ ] `GET /api/subscriptions/billing-status?checkStripe=true` → `billingEnabled: true`, `mode.active: test`, `webhook.registeredInStripe: true`
- [ ] Railway startup log contains `Stripe billing ready`
- [ ] (Periodic) Repeat manual Checkout with smoke trial account

---

## 7. Rollback / re-disable billing

If something looks wrong, **remove or unset** Stripe vars on Railway (fastest kill switch):

1. Railway → Backend → Variables → delete or blank:
   - `STRIPE_SECRET_KEY` (required — removing this disables billing immediately)
   - Optionally remove other `STRIPE_*` vars to avoid confusion
2. Redeploy Backend.
3. Confirm `billingEnabled: false` via `/billing-config`.
4. In Stripe Dashboard (test mode): disable or delete the webhook endpoint if needed.
5. Cancel any test subscriptions in Stripe Dashboard → Customers.

**Partial misconfiguration:** If only publishable key is wrong, `billingEnabled` stays false (by design). Fix vars and redeploy — no code change needed.

**Live mode mistake:** If live keys were set by accident, rotate keys in Stripe Dashboard, revert to test keys, and audit `subscriptions` / Stripe customers before re-enabling.

---

## 9. Live mode cutover (after test-mode PASS)

See full checklist: [`BILLING_LIVE_CUTOVER_CHECKLIST.md`](BILLING_LIVE_CUTOVER_CHECKLIST.md) and run `node backend/scripts/stripe-billing-live-cutover-probe.js`.

1. Stripe Dashboard → switch to **Live** → create/confirm Farm Pro **$29/month** live price.
2. Railway → replace all four `STRIPE_*` vars with **live** values (new webhook signing secret from live endpoint).
3. Stripe → Settings → verify **statement descriptor** and **customer receipt emails**.
4. Redeploy; probe should report `BILLING READY (live mode)`.
5. One controlled real payment → webhook 200 → Farm Pro active in app.
6. Record Run 3 in [`stripe-billing-flow.md`](post-deploy-notes/stripe-billing-flow.md).

Do **not** mix test secret with live publishable key (or vice versa) — `billing-status` reports `mode.mismatch` if keys disagree.

---

## 8. Implementation summary (this change set)

| File | Change |
|------|--------|
| `backend/services/stripeBillingService.js` | `getBillingStatus()`, startup log, `isConfigured()` requires publishable key |
| `backend/controllers/subscriptionController.js` | `GET /billing-status` handler |
| `backend/routes/subscriptions.js` | Route registration |
| `backend/server.js` | Log billing status on startup |
| `backend/scripts/stripe-billing-production-probe.js` | Hits `/billing-status`, clear ready/disabled message |
| `backend/env.example` | Document optional `STRIPE_WEBHOOK_URL` |

**Railway action (human):** Set test-mode Stripe vars per section 2, redeploy, register webhook, run probe + manual E2E.
