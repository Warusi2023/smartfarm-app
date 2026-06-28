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

**Status:** Pending manual run — requires owner account, second email/inbox, and optional email env on Railway.

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

Record here:

- Date / tester
- Email provider used (or UI-only copy link)
- Invite / resend / accept / revoke scenario results
- Any 409/403 cases observed
