# SmartFarm subscription billing (web)

## Plans (shipped)

| Plan | Price | Farms | Self-serve |
|------|-------|-------|------------|
| **30-day trial** | $0 | 1 | Register + verify email |
| **Farm Pro** | $29/month per account | Up to 3 | Stripe Checkout |
| **Enterprise** | Contact-only | Custom | Contact sales |

Per-farm pricing, seat licensing, and self-serve Enterprise are **out of scope** for this phase.

## Billing path

1. User registers → `trial_end` set to 30 days, `trial_started` event logged.
2. Trial user clicks **Upgrade to Farm Pro** → `POST /api/subscriptions/create-checkout-session` → `upgrade_started` logged.
3. User pays on Stripe-hosted Checkout.
4. Stripe webhook `POST /api/webhooks/stripe` (raw body, before `express.json`) activates `professional` in `subscriptions`.
5. User returns to `subscription-management.html?checkout=success` → `upgrade_completed` logged on webhook.

### Webhook events handled

- `checkout.session.completed` — activate Farm Pro
- `customer.subscription.updated` — sync status (active / past_due)
- `customer.subscription.deleted` — mark cancelled
- `invoice.payment_failed` — log only (v1)

## Environment variables

```env
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_PRICE_ID_FARM_PRO=price_...
FRONTEND_URL=https://www.smartfarm-app.com
```

Stripe Dashboard: one product **Farm Pro**, one recurring price **$29/month**.

## API endpoints

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/api/subscriptions/plans` | Public plan catalog |
| GET | `/api/subscriptions/billing-config` | Publishable key + billing enabled flag |
| GET | `/api/subscriptions/current` | Auth — current plan / trial days |
| POST | `/api/subscriptions/create-checkout-session` | Auth — Stripe Checkout URL |
| POST | `/api/subscriptions/events` | Auth — client analytics events |
| POST | `/api/webhooks/stripe` | Stripe webhooks (raw body) |
| POST | `/api/farms` | Auth — create farm with plan limit |

Legacy `POST /subscribe` and `POST /cancel` return `USE_STRIPE_CHECKOUT` until Customer Portal is added.

## Farm limits

Enforced in `subscriptionMiddleware.enforceFarmLimit()` on `POST /api/farms`:

- Trial: **1** farm
- Farm Pro: **3** farms
- Enterprise: unlimited

## Frontend pages

- `pricing.html` — trial + Farm Pro; Enterprise contact footer
- `checkout.html` — redirects to Stripe Checkout
- `subscription-management.html` — plan status, upgrade CTA
- `dashboard.html` — trial ≤7 days upgrade banner; expired trial → subscription management
- `js/subscription-billing.js` — shared billing helpers

## Analytics events (`subscription_events` table)

| Event | When |
|-------|------|
| `trial_started` | Registration |
| `upgrade_started` | Checkout session created |
| `upgrade_completed` | Webhook after payment |
| `trial_expired` | Login or dashboard redirect |
| `command_center_load` | Command center loaded |
| `dashboard_load` | Dashboard subscription check |

### Metrics derived from events + DB

- **MRR** = count of active `professional` subscriptions × $29
- **Paying accounts** = active `professional` rows
- **Churn** = `subscription_cancelled` / deleted Stripe subs
- **Trial-to-paid** = `upgrade_completed` / `trial_started`
- **Activation** = `command_center_load` within 7 days of `trial_started`
- **Weekly engagement** = `dashboard_load` or `command_center_load` per ISO week

## Database migration

Run `backend/database/migrations/008_stripe_billing.sql` (included in `npm run migrate`):

- `users.stripe_customer_id`
- `subscription_events` table

## Production checklist

1. Create Farm Pro product + $29/month price in Stripe (live mode).
2. Set live env vars on Railway.
3. Register live webhook endpoint: `https://web-production-86d39.up.railway.app/api/webhooks/stripe`
4. Test: trial user → checkout → webhook → `professional` active.
5. Confirm expired trial users land on `subscription-management.html`, not `contact.html`.
