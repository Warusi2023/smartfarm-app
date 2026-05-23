# Week 1 web release notes (beta)

Functional scope delivered on the static web app + existing Railway API (no new backend persistence for crop log).

| Issue | Summary |
|-------|---------|
| **W1-01** | `FarmActionCenter` — merges crop reminders, weather alerts, optional local weeding into one model |
| **W1-02** | Dashboard **Today on farm** panel (`#today-on-farm`) — overdue / today / upcoming buckets |
| **W1-03** | Deep links from panel rows to crop, weather, and weeding pages with light highlight-on-arrival |
| **W1-04** | Local weeding tasks (`unifiedWeedingTasks`) in the panel with Done / Later actions |

## Beta persistence & deploy behavior

**Operators and testers must read:** [`docs/BETA_LIMITATIONS.md`](./BETA_LIMITATIONS.md)

- File-backed crop recommendation log and **`default-user`** semantics  
- What the unified panel stores on the server vs in the browser  
- Railway vs Netlify redeploy impact  
- Recommended login and usage for beta  

**On the live Netlify site** (same content, shipped under `public/docs/`): `/docs/BETA_LIMITATIONS.md`

## Smoke pointers

- Dashboard anchor: `dashboard.html#today-on-farm`  
- Release checklist: [`WEB_RELEASE_CHECKLIST.md`](../WEB_RELEASE_CHECKLIST.md)  
- Production browser checks: [`WEB_PRODUCTION_VERIFICATION.md`](../WEB_PRODUCTION_VERIFICATION.md)
