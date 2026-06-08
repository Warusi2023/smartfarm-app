# M1 Mobile Dashboard — Layout Audit

**Date:** 2025-06-08  
**Scope:** Responsive web dashboard (`dashboard.html` + W6-02 command center)  
**Breakpoints audited:** 375px (phone), 768px (tablet)

## Approach

Single responsive dashboard — **no separate mobile route**. Reuses `/api/farm-summary/command-center` and `farm-command-center.js`.

## Pre-change audit (375px / 768px)

| Area | Issue | Severity |
|------|--------|----------|
| **Sidebar** | Fixed off-canvas existed but no backdrop, no body scroll lock, no close on nav tap | High |
| **Command center strip** | 2-column chip grid OK; header period toggle could overflow | Medium |
| **Weekly lane** | 7-column grid tight at 375px; labels risk clipping | Medium |
| **Priorities / reset** | Action buttons side-by-side below readable width | Medium |
| **Focus pills** | `fcc-focus-progress` nowrap could crowd priority head on narrow screens | Low |
| **Weather row** | Partial mobile rules existed; action button needed full-width stack | Medium |
| **Page shell** | `container-fluid` / wide tables could cause horizontal scroll | High |
| **Touch targets** | Many `.btn-sm` below 44px minimum | Medium |
| **Release banner** | Readable but close button small on phone | Low |

## Implementation (M1 slice 1)

### Web files changed

| File | Change |
|------|--------|
| `web-project/public/css/dashboard-mobile.css` | **New** — page shell, sidebar backdrop, touch targets, overflow guard |
| `web-project/public/css/farm-command-center.css` | Mobile blocks `@768px` / `@375px` for all W6 sections |
| `web-project/public/css/release-announcement.css` | Banner stack on small screens |
| `web-project/public/dashboard.html` | Link mobile CSS, backdrop element, improved sidebar JS |

### W6 sections covered

- Daily checklist — full-width actions, 44px buttons  
- Weekly strip — tighter lane grid, single-column summary chips on tablet  
- Priorities — stacked heads and full-width actions  
- Reset flow — stacked entry panel and step actions  
- Focus pills — wrap-friendly priority rows  
- Weather row — column stack + full-width action  

## Verification checklist

1. Hard refresh on phone or DevTools device mode (375px, 768px).  
2. No horizontal page scroll on dashboard.  
3. Hamburger opens sidebar with dimmed backdrop; tap outside or Escape closes.  
4. Command center sections stack in single column.  
5. Weekly lane visible without page-level overflow.  
6. Focus section shows 2 pills without clipping.  
7. Release banner readable; dismiss target easy to tap.  
8. Re-run 8-step W6 smoke on mobile browser.

## Android native follow-up

See `M1-responsive-spec.css` in this folder for breakpoint parity reference when implementing Compose layouts for the same API blocks.

## Decision rule

Stay on responsive `dashboard.html` unless audit finds unavoidable DOM/JS blockers. M1 slice 1 does **not** require a dedicated mobile route.
