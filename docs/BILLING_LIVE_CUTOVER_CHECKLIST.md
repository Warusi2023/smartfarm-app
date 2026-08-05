# Live Stripe cutover checklist — SmartFarm

**Use when:** switching Railway from test keys to **live** Stripe keys for public launch.  
**Prerequisite:** Test-mode E2E passed ([`BILLING_SHIP_NOTE.md`](BILLING_SHIP_NOTE.md)).  
**Automated helper:** `node backend/scripts/stripe-billing-live-cutover-probe.js`

---

## Pre-cutover (do not skip)

- [ ] Test-mode Run 2 recorded **PASS** in [`stripe-billing-flow.md`](post-deploy-notes/stripe-billing-flow.md)
- [ ] Migration `012` applied on production DB
- [ ] Customer Portal enabled in Stripe **test** mode and verified
- [ ] Failed-payment emails + retry policy configured in Stripe **test** mode
- [ ] Backend + frontend with billing UI deployed

---

## Cutover sequence

### A. Stripe Dashboard (Live mode)

Toggle **Live** in Stripe Dashboard (top-right).

- [ ] **Product** — Farm Pro exists in live mode
- [ ] **Price** — $29/month recurring live price ID copied (`price_...`)
- [ ] **API keys** — copy `sk_live_...` and `pk_live_...`
- [ ] **Webhook** — add endpoint (same URL as test):
  ```
  https://web-production-86d39.up.railway.app/api/webhooks/stripe
  ```
  Events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.payment_failed`
- [ ] Copy **live** signing secret (`whsec_...`)
- [ ] **Customer Portal** — confirm settings copied/enabled in **live** mode
- [ ] **Statement descriptor** — Settings → Public business information (e.g. `SMARTFARM`)
- [ ] **Customer emails** — successful payments, failed payments, expiring cards enabled
- [ ] **Smart Retries** — final failure → **cancel at period end** (recommended)

### B. Railway Backend variables

Replace test values with live (all four required):

```env
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...        # from LIVE webhook endpoint
STRIPE_PRICE_ID_FARM_PRO=price_...     # LIVE Farm Pro monthly price
FRONTEND_URL=https://www.smartfarm-app.com
```

- [ ] No test/live key mix (secret test + publishable live = `mode.mismatch`)
- [ ] Redeploy Backend
- [ ] Railway startup log: `Stripe billing ready` with `mode: live`

### C. Automated post-cutover probe

```powershell
node backend/scripts/stripe-billing-live-cutover-probe.js
```

Expect exit **0** and `LIVE BILLING READY`.

Optional with smoke account:

```powershell
$env:SMARTFARM_SMOKE_EMAIL="controlled-account@example.com"
$env:SMARTFARM_SMOKE_PASSWORD="..."
node backend/scripts/stripe-billing-live-cutover-probe.js
```

---

## Live verification (manual)

Use a **dedicated control account** (not a farmer production account unless intentional).

| # | Check | Pass criteria |
|---|--------|----------------|
| 1 | `GET /api/subscriptions/billing-status?checkStripe=true` | `mode.active: "live"`, `billingEnabled: true`, `webhook.registeredInStripe: true` |
| 2 | `GET /api/subscriptions/billing-config` | `publishableKey` starts with `pk_live_` |
| 3 | Login → `subscription-management.html` | Page loads; upgrade path visible if trial |
| 4 | Real Checkout (small account) | Payment succeeds; redirect `?checkout=success` |
| 5 | Stripe webhook log | `checkout.session.completed` → **200** to Railway |
| 6 | `GET /api/subscriptions/current` | `plan_name: Farm Pro`, `stripeStatus: active`, `renewalLabel` set |
| 7 | Customer receipt email | Received by payer |
| 8 | Card statement | Descriptor matches Stripe settings |
| 9 | `POST /api/billing/portal` | Opens live Portal; update payment method works |
| 10 | (Optional) Portal cancel at period end | UI shows “Access until …”; webhook `subscription.updated` |

**Record Run 3** in [`stripe-billing-flow.md`](post-deploy-notes/stripe-billing-flow.md):

| Field | Value |
|-------|--------|
| Date / tester | |
| Live checkout session | `cs_live_...` |
| Webhook event | `evt_...` |
| Statement descriptor | |
| Receipt received | yes/no |
| Verdict | PASS / FAIL |

---

## Rollback (live → test or off)

1. Railway — restore **test** `STRIPE_*` vars (or remove `STRIPE_SECRET_KEY`) → redeploy
2. Stripe live — disable/delete live webhook endpoint if misconfigured
3. Audit live customers/subscriptions created during failed cutover
4. Confirm probe: `BILLING DISABLED` or test mode

---

## Sign-off

| Role | Name | Date | Live billing OK |
|------|------|------|-----------------|
| Operator | | | ☐ |
| Product | | | ☐ |

After sign-off, update [`LAUNCH_READINESS.md`](LAUNCH_READINESS.md) §1 and [`POST_DEPLOY_NOTES.md`](../POST_DEPLOY_NOTES.md) launch roadmap.
