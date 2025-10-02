# Cursor Playbook – Inspect & Fix Non‑Working Buttons (SmartFarm)

Paste this into **Cursor** as `PLAYBOOK-buttons.md`. It's a step‑by‑step narrative that uses Cursor's AI to locate broken buttons, debug handlers/styles, and ship a fix to GitHub (frontend on Netlify, backend on Railway).

---

## 0) Quick context

* Symptom: One or more UI **buttons don't respond** (no click, wrong route, no API call, disabled in prod only, etc.).
* Goal: Reproduce, isolate the cause (handler, routing, CSS overlay, network), implement a fix, and add a guardrail test.

---

## 1) Reproduce locally in Cursor

```bash
# from repo root
cp .env.example .env   # set any needed keys for local

# run frontend
cd web-project && python -m http.server 8080
# run backend (if used for the button action)
cd ../backend-api && npm i && npm start
```

Open the app at the shown URL. Note **which buttons fail**, on which pages, and any console errors.

**Record** (in this file): page, selector/text, expected vs actual.

---

## 2) Find the button code fast

In Cursor search (⌘/Ctrl+K → Search in files) or terminal:

```bash
# try by visible text
rg -n "<Button|button|onClick|aria-label=|data-testid=|\b<.*>.*(Save|Submit|Add|Delete|Login|Start Tracking).*" web-project/public
```

Open candidates. If the button is rendered by a **shared component** (e.g., `PrimaryButton.tsx`), inspect there too.

> Tip: In React, check both **where the button is rendered** and **where its handler is defined/passed**.

---

## 3) Quick checklist of common root causes

Use this as a fast triage before deep‑diving.

### A) Handler wiring

* [ ] `onClick` missing or not passed down through props.
* [ ] Handler is `async` and throws → see console/network tab.
* [ ] `stopPropagation/preventDefault` misused (e.g., inside a `<form>` without `type="button"`).
* [ ] For links, using `<a>` without `href` or with blocked navigation.

### B) Disabled state

* [ ] `<button disabled>` due to validation flags not updating.
* [ ] Feature flag/env check false in prod builds (`VITE_*`, `process.env.*`).

### C) CSS / overlay

* [ ] An element overlays the button: check **Layout** in DevTools; look for `position:absolute`, high `z-index`.
* [ ] `pointer-events: none` applied to the button or parent.
* [ ] Invisible full‑page element (e.g., modal backdrop) still mounted.

### D) Routing

* [ ] React Router `Link` points to the wrong path or base.
* [ ] Netlify SPA rewrites missing → clicking 404s on refresh.

### E) Network / backend

* [ ] CORS blocked (prod only). Ensure correct `Access-Control-Allow-Origin`.
* [ ] Wrong API URL from env (`VITE_API_URL` different in prod).
* [ ] 401/403 due to missing auth token.

---

## 4) Use Cursor's AI to inspect and instrument

With the button file open, ask Cursor:

> **Prompt:** "Explain how this button's click is handled end‑to‑end. Identify state changes, validations, API calls, and anything that could block clicks."

If unclear, ask:

> **Prompt:** "Add minimal logging around this button's onClick and the API call it triggers. Use `console.debug` with a `BTN:` prefix and include relevant state."

Accept changes, re‑run, and re‑test.

---

## 5) Targeted fixes (copy/paste patterns)

### 5.1 Ensure a button inside forms doesn't submit by default

```html
<button type="button" onclick="handleClick()">Save</button>
```

### 5.2 Prop‑drilled handler that got lost

```html
<!-- Parent -->
<button onclick="handleSave()" class="btn btn-primary">Save</button>

<!-- Ensure handler is defined -->
<script>
function handleSave() {
    console.debug('BTN: Save clicked');
    // implementation
}
</script>
```

### 5.3 Disable overlay catching clicks

```css
/* suspicious overlay */
.backdrop { pointer-events: none; }
```

Or unmount the overlay when closed.

### 5.4 Fix env‑based no‑op (prod only)

```javascript
const enabled = window.location.hostname !== 'localhost' ? true : false;
if (!enabled) console.warn("BTN: Save disabled by feature flag");
```

Set environment variables in Netlify/Railway.

### 5.5 Stable API call with error toast

```javascript
async function handleClick() {
  console.debug("BTN: save clicked");
  try {
    const res = await fetch(`${window.SmartFarmConfig?.getApiUrl('/api/save')}`, { 
        method: "POST", 
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('smartfarm_token')}`
        }
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    console.debug("BTN: save ok");
    showAlert('Saved successfully!', 'success');
  } catch (e) {
    console.error("BTN: save failed", e);
    showAlert("Save failed. Please try again.", 'error');
  }
}
```

### 5.6 CORS on backend (Express / Railway)

```javascript
const cors = require('cors');
app.use(cors({ 
    origin: [
        process.env.CORS_ORIGIN || "http://localhost:8080", 
        "https://your-netlify-domain.netlify.app"
    ], 
    credentials: true 
}));
```

---

## 6) Verify with DevTools

1. **Elements** → hover the button and check if some node overlays it (blue overlay should match button size).
2. **Styles** → confirm there's no `pointer-events: none` and `z-index` is sane.
3. **Console** → check `BTN:` logs appear on click.
4. **Network** → expected request fired? Status code? CORS?

---

## 7) Add a guardrail test (Playwright minimal)

**`/tests/buttons.spec.ts`**

```typescript
import { test, expect } from "@playwright/test";

test("Save button triggers request", async ({ page }) => {
  await page.goto("http://localhost:8080");
  await page.getByRole("button", { name: /save/i }).click();
  // assert visible toast or state change; minimal example:
  await expect(page.getByText(/saved/i)).toBeVisible();
});

test("Dashboard buttons are clickable", async ({ page }) => {
  await page.goto("http://localhost:8080/dashboard.html");
  
  // Test financial details button
  await page.getByRole("button", { name: /view details/i }).click();
  await expect(page.getByText(/financial details/i)).toBeVisible();
  
  // Test QR code generation
  await page.getByRole("button", { name: /generate qr code/i }).click();
  await expect(page.getByText(/qr code/i)).toBeVisible();
});

test("Form submission works", async ({ page }) => {
  await page.goto("http://localhost:8080/crop-management.html");
  
  // Fill form
  await page.fill('#cropName', 'Test Crop');
  await page.fill('#cropVariety', 'Test Variety');
  
  // Submit form
  await page.getByRole("button", { name: /add crop/i }).click();
  await expect(page.getByText(/crop added/i)).toBeVisible();
});
```

Run: `npx playwright test`.

---

## 8) Commit & push via Cursor

```bash
git checkout -b fix/buttons-not-responding
# code changes + this playbook
git add .
git commit -m "fix(ui): wire button handlers, remove overlay, add logs & test"
git push -u origin fix/buttons-not-responding
```

Open PR → merge.

---

## 9) Deploy & prod sanity checks

* **Netlify (frontend):** confirm env vars, run Deploy Preview, test buttons.
* **Railway (backend):** verify logs for button actions and CORS.
* Lighthouse check to ensure no major CLS from ad components affecting click targets.

---

## 10) If still broken only in prod

* Compare environment values (log them once) between dev and prod.
* Netlify SPA rewrites: ensure `_redirects` or `netlify.toml` has `/*  /index.html  200` if using client‑side routing.
* Clear service worker / disable PWA caches.

---

## 11) SmartFarm-Specific Button Issues

### Common SmartFarm Button Problems:

#### A) Dashboard Buttons
- **Financial Details** - Check if `showFinancialDetails()` is defined
- **Generate QR Code** - Verify QR system is loaded
- **Add New Product** - Ensure modal functions exist
- **QR Options** - Check if `showQRCodeOptions()` is implemented

#### B) Form Submission Buttons
- **Add Crop** - Check form validation and API calls
- **Add Livestock** - Verify breed autocomplete and form data
- **Save Farm Data** - Ensure data persistence

#### C) Navigation Buttons
- **Sidebar Links** - Check if pages exist and load correctly
- **Modal Buttons** - Verify Bootstrap modal initialization
- **Tab Navigation** - Ensure tab switching works

#### D) Action Buttons
- **Execute Task** - Check admin permissions and task completion
- **Apply AI Recommendations** - Verify AI advisory system
- **Export Data** - Ensure export functions are implemented

### SmartFarm Button Debugging Commands:

```bash
# Find all onclick handlers
rg -n "onclick=" web-project/public

# Find all button elements
rg -n "<button" web-project/public

# Find all form submissions
rg -n "addEventListener.*submit" web-project/public

# Find all API calls
rg -n "fetch.*api" web-project/public

# Find all alert/notification calls
rg -n "showAlert\|alert\|toast" web-project/public
```

### SmartFarm-Specific Fixes:

#### Fix Missing Handler Functions:
```javascript
// Add to global scope or appropriate file
window.showFinancialDetails = function() {
    console.debug('BTN: Financial details clicked');
    if (typeof buttonHandlers !== 'undefined') {
        buttonHandlers.handleOpenFinancialDetails();
    } else {
        alert('Financial details system not loaded');
    }
};
```

#### Fix Form Validation:
```javascript
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) {
        console.error('BTN: Form not found:', formId);
        return false;
    }
    
    const requiredFields = form.querySelectorAll('[required]');
    for (let field of requiredFields) {
        if (!field.value.trim()) {
            showAlert(`${field.name} is required`, 'error');
            field.focus();
            return false;
        }
    }
    return true;
}
```

#### Fix API Calls:
```javascript
async function makeApiCall(endpoint, data) {
    console.debug('BTN: API call to', endpoint);
    try {
        const response = await fetch(window.SmartFarmConfig.getApiUrl(endpoint), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('smartfarm_token')}`
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const result = await response.json();
        console.debug('BTN: API call successful', result);
        return result;
    } catch (error) {
        console.error('BTN: API call failed', error);
        showAlert('Operation failed. Please try again.', 'error');
        throw error;
    }
}
```

---

### Ready‑made Cursor prompts

* "Scan the repo for buttons that render but have no onClick or are always disabled. List files and lines."
* "Search for any CSS applying `pointer-events: none` or suspicious `z-index` that could block clicks; suggest fixes."
* "Add a Playwright test that clicks the 'Start Tracking' button and asserts the map begins tracking."
* "Refactor `PrimaryButton` to forward onClick and support `type=button` by default."
* "Find all SmartFarm dashboard buttons and verify their click handlers are properly defined."
* "Check if all form submission buttons have proper validation and error handling."
* "Verify all API calls in button handlers have proper error handling and user feedback."

---

**Outcome:** You can reliably trace and fix non‑working buttons, prevent regressions with a test, and deploy safely to Netlify/Railway.
