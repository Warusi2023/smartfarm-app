# Farm Team Access + Shared Tasks — QA (PR 1)

## Manual verification

### Owner flow
- [ ] Create farm → owner membership row exists (`farm_memberships`, role `owner`)
- [ ] `GET /api/farms` returns farm with `membershipRole: owner`
- [ ] Invite manager/worker/viewer by email → `201` with `acceptUrl`
- [ ] List members shows owner + invited active members after accept

### Invitation flow
- [ ] Invitee logs in with matching email → `POST /api/farm-invitations/:token/accept` → active membership
- [ ] Wrong email → accept rejected
- [ ] Expired token → accept rejected
- [ ] Decline → invitation `revoked`
- [ ] Duplicate active membership prevented

### Task flow
- [ ] Owner/manager creates task and assigns member
- [ ] Assignee sees task in `GET /api/farms/:farmId/tasks/my`
- [ ] Both see same task via `GET /api/farms/:farmId/tasks/:taskId`
- [ ] Complete updates shared `status=done` + completion update row
- [ ] Comment via `POST .../updates` appears in task history
- [ ] Worker cannot create tasks; viewer cannot comment

### Access control
- [ ] User without membership gets `403` on farm-scoped routes
- [ ] Revoked member loses access immediately
- [ ] Tasks filtered by `farm_id` only

### UI (dashboard)
- [ ] **Farm Tasks** — list, create, assign, complete, note
- [ ] **My tasks** tab shows assignee view
- [ ] **Team** — members list + invite (owner/manager nav visible)
- [ ] `?farmInvite=TOKEN` accept prompt on login

## Automated tests

```bash
cd backend && npm run test:unit -- --testPathPattern=farmAuthorization
```

## Env / ops

- Run migration: `cd backend && npm run migrate` (includes `010_farm_team_tasks.sql`)
- No new env vars required
- Invitation emails: **stub** — share `acceptUrl` from API response (TODO: email send)

## Known limitations (PR 1)

- No email/push notifications
- No file attachments on task updates
- No command-center task surfacing
- Farm list uses first farm in UI (same as aquaculture)
- Role change UI minimal (API supports PATCH; UI remove only)
