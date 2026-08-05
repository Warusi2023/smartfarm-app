# SmartFarm launch phase — team brief

**Single source of truth for this phase:** [`LAUNCH_PHASE_PRODUCT.md`](LAUNCH_PHASE_PRODUCT.md)  
**Definition of done:** [`LAUNCH_PHASE_PRODUCT.md` §4](LAUNCH_PHASE_PRODUCT.md#4-definition-of-done-first-public-release)

---

## Email / Slack (paste-ready)

**Subject:** SmartFarm launch phase: what we’re focusing on next

SmartFarm is through the hardest part of launch: billing is now production-shaped and Stripe is the source of truth for subscriptions. Farmers can upgrade to Farm Pro, manage billing through Stripe Customer Portal, and see clear status, renewal, and failed-payment messaging in the dashboard.

The next couple of weeks are about **product readiness, not plumbing**. The plan is laid out in [`docs/LAUNCH_PHASE_PRODUCT.md`](LAUNCH_PHASE_PRODUCT.md) — that’s the single source of truth for this phase. In short, we’re running **three tracks in parallel**:

1. **Command center** — Prove offline capture, replay, and reconnect on a real farm account (`sfarm663@gmail.com`), so “today” and “this week” are always accurate.

2. **Account, team, and billing UX** — Sharpen plan/renewal/failure copy, add “How billing works” and support links, and run a farm-team walkthrough so invites and upgrades match real usage.

3. **Mobile web** — Do a focused 375px pass on the main dashboard and subscription pages so SmartFarm feels intentional on phones (no redesign or fork).

**Definition of done** for first public release and the detailed checklists for each track are also in [`LAUNCH_PHASE_PRODUCT.md`](LAUNCH_PHASE_PRODUCT.md). Please skim that doc before picking up work for this phase, and **link tickets back to the specific checklist item or verify-row they complete**.

---

## Ticket hygiene

When opening or closing work for this phase:

| Do | Example |
|----|---------|
| Link to the doc section | `LAUNCH_PHASE_PRODUCT.md` §1 — offline revenue replay |
| Reference the verify row | “Completes command center verify table: Log revenue offline → reconnect” |
| Name the track | `launch-phase / command-center` or `launch-phase / mobile-web` |
| Use smoke account where noted | `sfarm663@gmail.com` for command center + farm team |

**Related runbooks (not the phase hub):**

- Command center: [`post-deploy-notes/command-center-verification.md`](post-deploy-notes/command-center-verification.md)
- Farm team: [`post-deploy-notes/farm-team-invitations.md`](post-deploy-notes/farm-team-invitations.md)
- Billing ship note: [`BILLING_SHIP_NOTE.md`](BILLING_SHIP_NOTE.md)
- Live cutover (operator, when ready): [`BILLING_LIVE_CUTOVER_CHECKLIST.md`](BILLING_LIVE_CUTOVER_CHECKLIST.md)
