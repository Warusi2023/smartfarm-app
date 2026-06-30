# Farm team invitations — post-deploy verification

**Related:** migration `010_farm_team.sql`, `web-project/public/js/farm-team-management.js`, dashboard Team panel.

## Problem / goal

Verify farm owner can invite collaborators, resend pending invites, revoke invites, and accept invites — with email delivery where configured and correct membership state in PostgreSQL.

## Routes (mounted under `/api/farms`)

All team routes require JWT auth. Invitation management requires **farm owner** role.

| Method | Path | Role | Purpose |
|--------|------|------|---------|
| GET | `/:farmId/members` | Member | List active memberships |
| PATCH | `/:farmId/members/:membershipId` | Owner | Update member role |
| DELETE | `/:farmId/members/:membershipId` | Owner | Remove member |
| GET | `/:farmId/invitations` | Owner | List pending invitations |
| POST | `/:farmId/invitations` | Owner | Create or refresh pending invite |
| DELETE | `/:farmId/invitations/:invitationId` | Owner | Revoke pending invite |
| GET | `/:farmId/tasks`, `/:farmId/tasks/my` | Member | Shared tasks |
| POST | `/:farmId/tasks` | Member (with task permissions) | Create task |

**Resend behavior:** There is no separate `POST .../resend` route. Resend reuses `POST /:farmId/invitations` with the same email — service rotates token and sets `resent: true` if a pending invite already exists.

**Accept flow:** Invite link format: `/dashboard.html?farmInvite=<token>`. Accept/decline handled by invitation service + dashboard JS.

## Conflict and error cases

| Scenario | Expected HTTP | Message / behavior |
|----------|---------------|-------------------|
| Invite email already an **active member** | 409 | `User is already a member of this farm` |
| Invite email has **pending invite** | 200 | Updates token/expiry; `resent: true`; fresh accept URL |
| Non-owner calls invite endpoints | 403 | Role denied |
| **Invalid `farmId` (not UUID)** | **400** | Zod validation — `Invalid UUID format` (before membership check) |
| Revoke unknown invitation | 404 | Not found |
| Accept expired/invalid token | 4xx JSON | Clear error in UI |

## Email delivery

When `EmailService` is configured on Railway (`EMAIL_*` env vars), invitation emails are sent via `FarmInvitationService` + `EmailService` (see commit `1f7d496`).

If email env is missing, owner still receives **accept URL in UI** (copy link flow in Team panel).

## Frontend

| Surface | File |
|---------|------|
| Team panel | `farm-team-management.js` |
| API client | `api-service.js` — `inviteFarmMember`, `revokeFarmInvitation`, etc. |
| Dashboard hook | Team section on `dashboard.html` |

## Verification (production)

**Status:** Run 2 API pass (2026-06-30, owner `sfarm663@gmail.com` / Nabainimua). Manual invite scenarios pending on that account. Earlier owner `androsat.kv@gmail.com` blocked by expired trial for **new** invites.

**Preferred smoke account:** `sfarm663@gmail.com` — farm Nabainimua (`98f624b3-e05b-4afc-b5fa-01d13baf0217`), 1 member, 0 pending invites; cleaner for full invite-flow testing than the expired-trial account.

**Probe** (set credentials in your **local PowerShell session only** — do not commit passwords to the repo or tracked `.env` files):

```powershell
$env:SMARTFARM_SMOKE_EMAIL="sfarm663@gmail.com"
$env:SMARTFARM_SMOKE_PASSWORD="yourpassword"   # real value — shell only, never commit
$env:SMARTFARM_SMOKE_FARM_NAME="Nabainimua"
node backend/scripts/farm-team-production-probe.js
```

Optional for accept-flow (invitee must be a verified account matching the invited email):

```powershell
$env:SMARTFARM_INVITEE_EMAIL="..."
$env:SMARTFARM_INVITEE_PASSWORD="..."          # shell only
```

**Credential handling:** use session env vars (above) or an untracked gitignored file (e.g. `.env.local`). Rotate or delete when verification is done. Share the real password only privately with whoever runs the browser pass.

**Handoff — run Nabainimua invite-browser pass:** set the three `SMARTFARM_SMOKE_*` vars locally → run the [Manual invite testing](#manual-invite-testing-sfarm663gmailcom--nabainimua) checklist → fill the `sfarm663` manual verification block below → commit **results only** (no secrets).

### Run 1 — automated (2026-06-28)

| Check | Expected | Actual |
|-------|----------|--------|
| `GET /api/farms/{id}/invitations` (no auth, Netlify) | 401 JSON | ✅ 401 `application/json` `MISSING_TOKEN` |
| Same (Railway direct) | 401 JSON | ✅ 401 JSON |
| `dashboard.html` includes `farm-team-management.js` | present | ✅ |
| Authenticated list invitations/members | 200 | ⏸️ Needs `SMARTFARM_SMOKE_EMAIL`, `SMARTFARM_SMOKE_FARM_ID` |
| Invite / resend / accept / 409 scenarios | manual | ⏸️ Pending |

### Run 2 — API probe (2026-06-28, owner=`androsat.kv@gmail.com`) — superseded for invite testing

| Check | Result |
|-------|--------|
| Auth login | ✅ `ok: true` |
| `GET /api/farms/Natavea1/invitations` | ❌ **400** — `Natavea1` is a **farm name**, not a UUID |
| `GET /api/farms/Natavea1/members` | ❌ **400** — same validation failure |
| Public `/api/farms/{uuid}/invitations` (no token) | ✅ 401 JSON `MISSING_TOKEN` (Netlify + Railway) |
| `dashboard.html` team + command center JS | ✅ 200, scripts present |

**Root cause of 400:** `farmTeam.listInvitations` / `listMembers` require `params.farmId` as UUID (`backend/validators/schemas.js`). Passing a farm **name** (e.g. `Natavea1`) fails Zod validation with **400** before authorization or DB lookup — not an auth or business-rule failure.

### Run 2 — API probe (2026-06-30, owner=`sfarm663@gmail.com`)

- **Farm resolution:**
  - `farmId`: `98f624b3-e05b-4afc-b5fa-01d13baf0217`
  - `matchedFarm.name`: Nabainimua
  - `source`: `SMARTFARM_SMOKE_FARM_NAME`
- `GET /api/farms/:farmId/invitations` → **200**, `success=true`, `count=0`
- `GET /api/farms/:farmId/members` → **200**, `success=true`, `count=1`
- Unauthenticated `/api/farms/...` → **401** JSON `MISSING_TOKEN` (expected)
- Dashboard loads team JS and command center JS → **200**

**Fix for probe / manual tests (any owner):**

```powershell
# Option A — resolve UUID from farm name (probe auto-resolves as of 73ba440+)
$env:SMARTFARM_SMOKE_FARM_NAME="Nabainimua"

# Option B — set UUID explicitly
$env:SMARTFARM_SMOKE_FARM_ID="98f624b3-e05b-4afc-b5fa-01d13baf0217"
node backend/scripts/farm-team-production-probe.js
```

**Browser — list farms and use UUID:**

```javascript
const token = localStorage.getItem("smartfarm_token");
fetch("/api/farms", { headers: { Authorization: `Bearer ${token}` } })
  .then(r => r.json())
  .then(d => console.log(d.data?.map(f => ({ id: f.id, name: f.name }))));
```

### Current blockers

- **Manual invite scenarios** — run on `sfarm663@gmail.com` / Nabainimua (see below). API list endpoints pass; browser checklist not yet recorded.
- **`androsat.kv@gmail.com`** — trial expired; new invites blocked by subscription guardrail in UI. Use only for accept/revoke on **existing** pending invites, if any.
- **New invites depend on billing** when trial is expired — `sfarm663@gmail.com` may avoid that limitation; confirm in browser before assuming full flow is unblocked.

### Manual invite testing (`sfarm663@gmail.com` / Nabainimua)

Use this account for the full invite checklist — it has a real farm, one member, and zero pending invites (clean slate).

1. Log in at [https://www.smartfarm-app.com](https://www.smartfarm-app.com).
2. Open dashboard → **Team** for farm **Nabainimua**.
3. Run scenarios:
   - **New invite** to a fresh email (not already a member).
   - **Resend** if a pending invite appears after creation.
   - **Existing member 409** — invite the email of the already-present member.
   - **Accept invite** — open accept link in another browser or incognito (invitee registers/logs in).
   - **Revoke invite** — delete pending invite from Team panel if still pending.
   - **Email delivery** — note whether SMTP sent mail or UI copy-link only.

### Manual invite verification (2026-06-30, owner=`sfarm663@gmail.com`)

- **New invite:** [result]
- **Resend pending invite:** [result]
- **Existing member 409:** [result]
- **Accept invite link:** [result]
- **Revoke invite:** [result]
- **Email delivery:** [result]

### Manual invite verification (2026-06-30, owner=`androsat.kv@gmail.com`) — alternate / blocked for new invites

- **Account state:** trial expired, not on Farm Pro.
- **New invite:** blocked by subscription guardrail — UI does not allow creating new invitations while trial is ended.
- **Resend:** verify only if pending invites already exist from before trial expiry; otherwise note blocked (resend reuses `POST /:farmId/invitations` and is subject to the same subscription gate as new invites).
- **Existing member 409:** run if possible — confirm an email that is already an active member cannot be re-invited (`409 User is already a member of this farm`).
- **Accept / revoke:** run on **existing** pending invitations only (revoke via Team panel; accept via `dashboard.html?farmInvite=<token>`).

**Constraint (androsat only):** new invites depend on an active subscription path. Billing is currently **configured off** on Railway (`billingEnabled: false` — see [`stripe-billing-flow.md`](./stripe-billing-flow.md)).

**Implication:** prefer **`sfarm663@gmail.com`** for invite-flow verification going forward — real farm, no stale pending invites, and likely not subject to the expired-trial gate that blocked `androsat.kv@gmail.com`.

### Scenarios

**1. New invite**

- [ ] Owner opens dashboard → Team → invite `worker@example.com`
- [ ] `POST /api/farms/{farmId}/invitations` → 200, `success: true`, `acceptUrl` present
- [ ] Pending row appears in invitations list
- [ ] Email received (if SMTP configured) OR link copied from UI

**2. Resend pending invite**

- [ ] Owner clicks **Resend** on pending row (calls `POST /:farmId/invitations` with same email)
- [ ] Response includes fresh link; `resent: true` in API payload
- [ ] Old token invalidated; new `farmInvite` token works

**3. Existing member (409)**

- [ ] Invite email that is already an active member → 409 JSON, UI shows error

**4. Accept invitation**

- [ ] Invitee registers/logs in, opens accept URL
- [ ] Membership created; invitation status → accepted
- [ ] Invitee sees farm in dashboard / team context

**5. Revoke invitation**

- [ ] Owner deletes pending invite → `DELETE /:farmId/invitations/:id` → 200
- [ ] Accept URL no longer works

### Browser console (owner, replace `{farmId}`)

```javascript
const token = localStorage.getItem("smartfarm_token");
const farmId = "YOUR_FARM_UUID";

fetch(`/api/farms/${farmId}/invitations`, {
  headers: { Authorization: `Bearer ${token}` }
}).then(r => r.json()).then(console.log);
```

### Database checks (optional)

```sql
SELECT id, email, role, status, expires_at FROM farm_invitations WHERE farm_id = '<farmId>' ORDER BY created_at DESC;
SELECT m.id, u.email, m.role, m.status FROM farm_memberships m JOIN users u ON u.id = m.user_id WHERE m.farm_id = '<farmId>';
```

## Outcome (when checklist complete)

**2026-06-30 (`androsat.kv@gmail.com`, partial):** Trial expired; new invite blocked by subscription guardrail in UI.

**2026-06-30 (`sfarm663@gmail.com`):** Run 2 API pass (invitations `count=0`, members `count=1`). Manual browser scenarios pending — fill in **Manual invite verification** block above.

Record when complete:

- Date / tester
- Email provider used (or UI-only copy link)
- Invite / resend / accept / revoke scenario results
- Any 409/403 cases observed
