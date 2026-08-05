# SmartFarm release runway — August 2026

**Target ship date:** 2026-08-31  
**Hub docs:** [`LAUNCH_READINESS.md`](LAUNCH_READINESS.md) · [`LAUNCH_PHASE_PRODUCT.md`](LAUNCH_PHASE_PRODUCT.md)  
**Smoke account:** `sfarm663@gmail.com` (Nabainimua)

**Rule:** Every day ends with measurable progress (feature done, bug closed, flow verified, test added, or risk documented). Completion requires a verification step — code alone is not done.

**Priority order (always):**  
1. Unblockers → 2. Core user flows → 3. Data integrity → 4. Polish

---

## 0. Launch definition of done

Ship only when every core flow answers **yes** to: works · tested · stable · rollback known.

| Core flow | Works | Tested | Stable | Rollback |
|-----------|-------|--------|--------|----------|
| Login / session refresh / logout | ☐ | ☐ | ☐ | ☐ |
| Forgot + reset password (email) | ☐ | ☐ | ☐ | ☐ |
| Farms CRUD (web + Android) | ☐ | ☐ | ☐ | ☐ |
| Crops create / list / refresh sync | ☐ | ☐ | ☐ | ☐ |
| Livestock create / photo / card actions / sync | ☐ | ☐ | ☐ | ☐ |
| Tasks (API team tasks) create / complete | ☐ | ☐ | ☐ | ☐ |
| Command center today/week accuracy | ☐ | ☐ | ☐ | ☐ |
| Offline write → reconnect replay (revenue) | ☐ | ☐ | ☐ | ☐ |
| Farm team invite accept | ☐ | ☐ | ☐ | ☐ |
| Billing status + Portal (test, then live) | ☐ | ☐ | ☐ | ☐ |
| Web mobile 375px primary pages | ☐ | ☐ | ☐ | ☐ |
| Android Play build installs & hits prod API | ☐ | ☐ | ☐ | ☐ |

---

## 1. Gap inventory → concrete tasks

Owners are **roles** — assign a name when picking up the task.  
**DoD** = definition of done (evidence required).

### P0 — Unblockers (must clear before hardening week)

| ID | Gap | Owner | Actionable steps | DoD |
|----|-----|-------|------------------|-----|
| **U1** | Dirty tree: billing/soil/IPM/Android WIP mixed with launch code | Lead | Inventory uncommitted files → split ship vs defer → commit ship-only PRs → leave defer on branches | `main` only contains launch-scoped changes; deferred work listed in §5 |
| **U2** | Migrations `011`/`012` untracked; runner non-strict by default | Backend | Decide launch scope for `011`/`012` → commit if in-scope → add to `MIGRATION_ORDER` or defer → verify Railway pre-deploy logs | Pre-deploy shows applied/skipped + `Schema verification passed`; livestock `species`/`photo` present |
| **U3** | Auth email / refresh not signed off in prod | Backend + Web | Confirm Railway `EMAIL_*` → send forgot-password → complete reset → Remember-me refresh after token delete | Written pass in `POST_DEPLOY_NOTES.md` with date |
| **U4** | Live Stripe cutover incomplete | Ops | Follow [`BILLING_LIVE_CUTOVER_CHECKLIST.md`](BILLING_LIVE_CUTOVER_CHECKLIST.md) → one real payment → record Run 3 | `billing-status` shows `live`; Run 3 filled in `stripe-billing-flow.md` |
| **U5** | Livestock card buttons / Android form — shipped code, prod not fully re-verified | Web + Android | Hard-refresh web after Netlify deploy → retest Edit/Health/AI/Timeline → install AAB 1.0.10 → create animal with new fields | Both clients show same animal after refresh |

### P1 — Core user flows

| ID | Gap | Owner | Actionable steps | DoD |
|----|-----|-------|------------------|-----|
| **C1** | Dashboard Farm Tasks still localStorage-first | Web | Reproduce → map to API farm-team tasks or label “device-only” → if launch needs sync: wire create/list to API → regression test | Either API-backed with refresh persistence **or** explicit beta limit in UI + `BETA_LIMITATIONS.md` |
| **C2** | Dual task models confuse users | Web | Audit dashboard vs Team page → one primary path for launch → hide or relabel legacy | One documented task entry point for launch |
| **C3** | Command center offline revenue failed | Web | Reproduce offline revenue → fix queue enqueue → reconnect replay → idempotency check | Offline → online: revenue appears once; probe + manual note in `command-center-verification.md` |
| **C4** | Offline nav from command center broken | Web | List broken links → fix same-origin offline cache **or** disable with “needs network” message | No silent dead taps; behavior documented |
| **C5** | Farm team invite Run 2 incomplete | Web + Ops | Invite on `sfarm663` → accept on second account → upgrade gate if needed | Run 2 recorded in `farm-team-invitations.md` |
| **C6** | Crops/livestock web↔Android sync matrix | Web + Android | Matrix: create web→see Android; create Android→see web; photo round-trip; hard refresh | Matrix table checked green for crops + livestock |

### P2 — Data integrity

| ID | Gap | Owner | Actionable steps | DoD |
|----|-----|-------|------------------|-----|
| **D1** | Demo/localStorage masking API failures | Web | Sweep dashboard legacy `farmData`/`cropsData` helpers → API-first + offline-only cache (match crops/livestock pattern) | Hard refresh never resurrects deleted demo data when API succeeds |
| **D2** | Offline queue scope unclear | Web | Document which writes queue; which require network | Table in `BETA_LIMITATIONS.md` or command-center notes |
| **D3** | Schema drift can ship green (`MIGRATIONS_STRICT` off) | Backend | Decide: strict on production **or** post-deploy schema probe in smoke | Smoke fails loudly if `livestock.species` missing |
| **D4** | Soil intelligence optional | Backend | **Defer** unless already committed for launch; else leave out of August gate | Listed in §5 Deferred |

### P3 — Polish (after P0–P2 green)

| ID | Gap | Owner | Actionable steps | DoD |
|----|-----|-------|------------------|-----|
| **Pol1** | Billing copy / support links | Web | “How billing works” + support contact on subscription page | Screenshot on 375px + desktop |
| **Pol2** | Mobile web 375px sweep | Web | Dashboard, command center, subscription, livestock, crops | Checklist in §3 week 4 |
| **Pol3** | Error toasts / empty states | Web | Slow API + 401/500 paths on primary pages | No blank screens |
| **Pol4** | Missing `qrcode.min.js` noise | Web | Ship asset or remove call | Console clean on dashboard load |
| **Pol5** | Android Play listing / release notes | Android | Upload AAB 1.0.10 → release notes → internal track smoke | Install from Play internal; hits Railway API |

---

## 2. Daily release runway

Assume **~25 calendar days** from 2026-08-06 → 2026-08-31.  
Weekends: optional verification only, no new scope.

### Daily ritual (15 min, every day)

1. **Risk review:** What could still break the release? What wasn’t tested yesterday? What changed since last green smoke?  
2. Pick **≤3** high-value tasks from today’s list.  
3. End of day: update this doc’s day row with ✅ / ⚠️ / blocked + evidence link.  
4. Any new risk → add to **tomorrow** immediately.

---

### Week 1 — Unblockers & truth (Aug 6–12)

**Theme:** Make `main` and production tell the truth.

| Day | Focus | Tasks (smallest steps) | Verify before EOD |
|-----|-------|------------------------|-------------------|
| **Wed 6** | Inventory | U1 file triage; list ship vs defer | Written inventory in PR/issue |
| **Thu 7** | Deploy truth | U2 migration decision; confirm Railway deploy of livestock reconcile; U5 web hard-refresh button retest | `/api/health` 200; livestock 401 unauth; Edit opens modal |
| **Fri 8** | Auth | U3 EMAIL_* + forgot/reset; refresh token path | Reset email received; refresh returns 200 |
| **Mon 10** | Sync matrix start | C6 crops web↔Android | Both clients show same crop after refresh |
| **Tue 11** | Sync matrix finish | C6 livestock + photo; install AAB 1.0.10 | Photo round-trip both ways |
| **Wed 12** | Commit hygiene | Land ship-only commits; branch deferred WIP | Clean launch PR(s) merged; §5 updated |

### Week 2 — Core flows (Aug 13–19)

**Theme:** Login → farm work → save → see everywhere.

| Day | Focus | Tasks | Verify before EOD |
|-----|-------|-------|-------------------|
| **Thu 13** | Tasks model | C1 reproduce + decide API vs device-only | Decision recorded + UI label if deferred |
| **Fri 14** | Tasks path | C2 single entry point | One path demoed on smoke account |
| **Mon 17** | Offline revenue | C3 reproduce → enqueue fix | Offline revenue appears after reconnect once |
| **Tue 18** | Offline UX | C4 nav fix or “needs network” | No silent dead taps from command center |
| **Wed 19** | Team invites | C5 Run 2 invite walkthrough | Run 2 logged in farm-team notes |

### Week 3 — Integrity + billing ops (Aug 20–26)

**Theme:** Data trust + money path.

| Day | Focus | Tasks | Verify before EOD |
|-----|-------|-------|-------------------|
| **Thu 20** | Cache hygiene | D1 dashboard API-first sweep (farms/crops helpers) | Hard refresh = API data |
| **Fri 21** | Queue docs + smoke | D2 + D3 schema probe in post-deploy smoke | Probe fails if columns missing |
| **Mon 24** | Billing prep | Portal live settings; failed-payment emails; statement descriptor | Stripe live checklist half-checked |
| **Tue 25** | Live cutover | U4 one real payment | Run 3 PASS in stripe-billing-flow |
| **Wed 26** | Billing UX polish | Pol1 copy + support links | Screenshoted |

### Week 4 — Harden & ship (Aug 27–31)

**Theme:** No new features. Bugs, verification, docs, deploy only.

| Day | Focus | Tasks | Verify before EOD |
|-----|-------|-------|-------------------|
| **Thu 27** | Regression day | Full journey §3 checklist (desktop) | All P0/P1 DoD green or accepted risk |
| **Fri 28** | Mobile web | Pol2 375px sweep + Pol3 empty states | Pass on phone or Chrome device mode |
| **Sat 29** | Optional buffer | Fix only P0/P1 regressions found Fri | Smoke re-run |
| **Sun 30** | Ops freeze | Env vars review; webhook; Netlify + Railway versions pinned | Rollback notes written |
| **Mon 31** | **SHIP** | Deploy order: Backend → Web → Play promote; monitor 2h | Launch checklist §4 all ✅ |

---

## 3. Full-journey regression checklist (use from Aug 27)

Run on **production** with smoke account + one secondary account.

1. Login → dashboard command center loads real today/week data  
2. Forgot password (or confirm previously passed this week)  
3. Create farm (if needed) → appears after hard refresh  
4. Create crop (web) → visible on Android after pull-to-refresh  
5. Create livestock with photo (Android) → visible on web with photo; Edit/Health/Timeline/AI work  
6. Create API farm-team task → complete → persists after refresh  
7. Go offline → attempt revenue (expect queue or clear message) → reconnect → one write  
8. Invite team member → accept → shared farm visible  
9. Subscription page: plan, renewal, Portal opens  
10. 375px: dashboard + livestock + subscription usable  

---

## 4. Ship-day checklist (Aug 31)

### Pre-deploy
- [ ] No open P0 bugs  
- [ ] `main` green CI (Android CI + any backend tests)  
- [ ] Env: `DATABASE_URL`, `JWT_SECRET`, `EMAIL_*`, Stripe live keys, webhook secret  
- [ ] Rollback plan written (git SHA + Railway previous deploy + Netlify previous)

### Deploy order
1. Backend (Railway) — watch pre-deploy migrations  
2. Web (Netlify / Railway web) — cache-bust if needed  
3. Android — promote internal/closed track AAB `1.0.10` (or next code)

### Post-deploy (2 hours)
- [ ] `GET /api/health`  
- [ ] Livestock/crops unauth → 401; auth list → 200  
- [ ] `stripe-billing-production-probe.js`  
- [ ] Manual §3 journey smoke (30 min)  
- [ ] Watch Railway + Netlify logs for 5xx spikes  

### If something breaks
1. Revert web first (fastest user-facing)  
2. Rollback Railway deploy if API broken  
3. Pause Play rollout  
4. File incident note in `POST_DEPLOY_NOTES.md`

---

## 5. Explicitly deferred (not August launch blockers)

| Item | Why deferred | Revisit |
|------|--------------|---------|
| Full Android billing / command center / team UI | Launch is web-first for those surfaces | Sept |
| Soil test intelligence (`011`) unless already in ship PR | Optional gate in LAUNCH_READINESS | Post-launch |
| In-app cancel API (Portal is enough) | Stripe Portal covers v1 | Later |
| Weeding tasks server sync | Documented beta limit | Later |
| Capacitor / PWA shell | Mobile web pass first | Later |
| Broad IPM / specialty pest packs polish | Not core farm CRUD | Later |

---

## 6. Daily risk review template (copy each day)

```text
Date:
Yesterday’s green checks:
What changed since then:
New risks (add to tomorrow):
Blocked on:
Owner for today’s top P0:
```

---

## 7. How to use this with Cursor / tickets

- One ticket = **one row** from §1 (or one day cell from §2).  
- Ticket title format: `[Aug launch][U3] Prod auth email + refresh sign-off`  
- Link DoD evidence (probe output, screenshot, post-deploy note section).  
- Do not open tickets for §5 deferred items during August unless a P0 depends on them.

**Related runbooks**

| Area | Doc |
|------|-----|
| Command center | [`post-deploy-notes/command-center-verification.md`](post-deploy-notes/command-center-verification.md) |
| Farm team | [`post-deploy-notes/farm-team-invitations.md`](post-deploy-notes/farm-team-invitations.md) |
| Billing live | [`BILLING_LIVE_CUTOVER_CHECKLIST.md`](BILLING_LIVE_CUTOVER_CHECKLIST.md) |
| Migrations | [`post-deploy-notes/railway-predeploy-migrations.md`](post-deploy-notes/railway-predeploy-migrations.md) |
| Product phase narrative | [`LAUNCH_PHASE_PRODUCT.md`](LAUNCH_PHASE_PRODUCT.md) |
