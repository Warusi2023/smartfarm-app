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

**Status:** Run 1 partial (2026-06-28) — routing and assets pass; invite/accept scenarios need owner JWT + farm ID.

**Probe:** `node backend/scripts/farm-team-production-probe.js`

### Run 1 — automated (2026-06-28)

| Check | Expected | Actual |
|-------|----------|--------|
| `GET /api/farms/{id}/invitations` (no auth, Netlify) | 401 JSON | ✅ 401 `application/json` `MISSING_TOKEN` |
| Same (Railway direct) | 401 JSON | ✅ 401 JSON |
| `dashboard.html` includes `farm-team-management.js` | present | ✅ |
| Authenticated list invitations/members | 200 | ⏸️ Needs `SMARTFARM_SMOKE_EMAIL`, `SMARTFARM_SMOKE_FARM_ID` |
| Invite / resend / accept / 409 scenarios | manual | ⏸️ Pending |

### Run 2 — API probe (2026-06-28, owner=`androsat.kv@gmail.com`)

| Check | Result |
|-------|--------|
| Auth login | ✅ `ok: true` |
| `GET /api/farms/Natavea1/invitations` | ❌ **400** — `Natavea1` is a **farm name**, not a UUID |
| `GET /api/farms/Natavea1/members` | ❌ **400** — same validation failure |
| Public `/api/farms/{uuid}/invitations` (no token) | ✅ 401 JSON `MISSING_TOKEN` (Netlify + Railway) |
| `dashboard.html` team + command center JS | ✅ 200, scripts present |

**Root cause of 400:** `farmTeam.listInvitations` / `listMembers` require `params.farmId` as UUID (`backend/validators/schemas.js`). Passing a farm **name** (e.g. `Natavea1`) fails Zod validation with **400** before authorization or DB lookup — not an auth or business-rule failure.

**Fix for probe / manual tests:**

```powershell
# Option A — resolve UUID from farm name (probe auto-resolves as of 73ba440+)
$env:SMARTFARM_SMOKE_FARM_NAME="Natavea1"

# Option B — set UUID explicitly after GET /api/farms
$env:SMARTFARM_SMOKE_FARM_ID="<uuid-from-/api/farms>"
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

- **Probe used farm name instead of UUID** — re-run with `SMARTFARM_SMOKE_FARM_NAME=Natavea1` or correct UUID; expect **200** on list invitations/members for farm owner.
- Manual invite/resend/accept/409 scenarios still pending after UUID fix.


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

Record here:

- Date / tester
- Email provider used (or UI-only copy link)
- Invite / resend / accept / revoke scenario results
- Any 409/403 cases observed
