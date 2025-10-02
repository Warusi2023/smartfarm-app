# Cursor Playbook — Systemic Fixes With Compounding Impact (SmartFarm)

## Master Superprompt for Cursor

> **Objective:** Replace scattered, per‑page fixes with **system‑level refactors** that eliminate categories of errors and harden the SmartFarm app end‑to‑end (frontend on Netlify, backend on Railway).
>
> **Deliverables:**
>
> 1. New shared modules (API client, env, logging, error boundary, async helpers).
> 2. Repo‑wide codemods to adopt the modules and remove anti‑patterns (direct `fetch`, `console.log`, missing keys, orphaned overlays, etc.).
> 3. Lint rules + tests that prevent regressions.
> 4. `docs/systemic-fixes-report.md` summarizing what changed and which error classes were eliminated.
>
> **Constraints:** Don't change UI/UX except to remove error toasts/warnings. Minimize breaking changes. Group work into small commits.

---

## Phase 1 — Map Errors → Group by Class

1. Run the app (`npm run dev`) and navigate all routes. Capture **console errors/warnings** and **Network** failures.
2. Group each finding by **error class** (e.g., React list keys, controlled inputs, effect deps, CORS, wrong API base, overlay/z‑index, hydration, missing env, mixed content).
3. Create `docs/systemic-fixes-report.md` with a table: *Error class* → *Root cause* → *System‑level fix to apply*. This will drive the refactor plan below.

---

## Phase 2 — Introduce Core Foundations (once, globally)

### 2.1 Environment access (single source of truth)

**Add** `/frontend/src/lib/env.ts`

```ts
export const API_URL = import.meta.env.VITE_API_URL as string | undefined;
export const IS_DEMO = import.meta.env.VITE_DEMO_ENABLED === "true";
export const IS_PROD = import.meta.env.PROD;

let warned = false;
export function assertProdEnv() {
  if (IS_PROD && !API_URL && !warned) {
    warned = true;
    // Fail fast once in prod builds if API_URL is missing
    // Visible in console & error reporting
    console.error("[SmartFarm] Missing VITE_API_URL in production build");
  }
}
```

Call `assertProdEnv()` in app bootstrap (e.g., `main.tsx`).

### 2.2 Central API client (removes direct fetch scattered errors)

**Add** `/frontend/src/lib/api.ts`

```ts
import { API_URL } from "./env";

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

async function request<T>(path: string, init: RequestInit & { method?: HttpMethod } = {}) {
  const base = API_URL ?? "/api"; // fallback proxy in dev if configured
  const url = path.startsWith("http") ? path : `${base}${path}`;
  const controller = new AbortController();
  const res = await fetch(url, {
    credentials: "include",
    headers: { "Content-Type": "application/json", ...(init.headers || {}) },
    signal: controller.signal,
    ...init,
  });
  const ct = res.headers.get("content-type") || "";
  const body = ct.includes("application/json") ? await res.json().catch(() => ({})) : await res.text();
  if (!res.ok) {
    const message = typeof body === "string" ? body : body?.message || `HTTP ${res.status}`;
    throw new Error(message);
  }
  return body as T;
}

export const api = {
  get:  <T>(p: string) => request<T>(p, { method: "GET" }),
  post: <T>(p: string, data?: unknown) => request<T>(p, { method: "POST", body: JSON.stringify(data ?? {}) }),
  put:  <T>(p: string, data?: unknown) => request<T>(p, { method: "PUT", body: JSON.stringify(data ?? {}) }),
  patch:<T>(p: string, data?: unknown) => request<T>(p, { method: "PATCH", body: JSON.stringify(data ?? {}) }),
  del:  <T>(p: string) => request<T>(p, { method: "DELETE" }),
};
```

### 2.3 Logging facade (ban raw console noise)

**Add** `/frontend/src/lib/log.ts`

```ts
export const logError = (...a: any[]) => console.error("[SmartFarm]", ...a);
export const logWarn  = (...a: any[]) => console.warn("[SmartFarm]", ...a);
export const logInfo  = (...a: any[]) => console.info("[SmartFarm]", ...a);
```

Then enforce with ESLint (Phase 4).

### 2.4 Global Error Boundary + Toasts

**Add** `/frontend/src/components/AppErrorBoundary.tsx`

```tsx
import { Component, ReactNode } from "react";
import { logError } from "../lib/log";

export class AppErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }>{
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error: any, info: any) { logError(error, info); }
  render(){ return this.state.hasError ? <div>Something went wrong.</div> : this.props.children; }
}
```

Wrap your root in `main.tsx`:

```tsx
<AppErrorBoundary>
  <App />
</AppErrorBoundary>
```

### 2.5 Abort‑safe async helper (stops setState on unmounted)

**Add** `/frontend/src/hooks/useAsyncEffect.ts`

```ts
import { useEffect } from "react";
export function useAsyncEffect(fn: (aborted: () => boolean) => Promise<void> | void, deps: any[]) {
  let done = false;
  useEffect(() => {
    done = false;
    const isAborted = () => done;
    Promise.resolve(fn(isAborted)).catch(() => {/* handled in caller */});
    return () => { done = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
```

Refactor noisy effects to this helper when appropriate.

### 2.6 CSS overlay hardening (one line, many pages)

Add a utility class and audit overlays:

**`/frontend/src/styles/utilities.css`**

```css
/* Prevent invisible overlays blocking clicks */
[data-overlay="true"][aria-hidden="true"] { pointer-events: none !important; }
```

Adopt this attribute on all backdrops/overlays when hidden.

---

## Phase 3 — Repo‑wide Codemods (automated, high leverage)

Use Cursor to apply the following across the codebase:

1. **Replace direct fetch with API client**

> Find all `fetch(` usages in the frontend and replace them with `api.get/post/put/patch/del` from `lib/api`. Keep request shapes and types. Add minimal error handling (`try/catch` with user feedback or boundary).

2. **Unify env + fail‑fast**

> Import from `lib/env` wherever `import.meta.env` is used directly. Remove duplicate env parsing. Call `assertProdEnv()` in the app bootstrap.

3. **Ban raw console**

> Replace `console.error|warn|info|log` with `logError|logWarn|logInfo` from `lib/log`. Then add an ESLint rule that errors on raw `console.*` except within `lib/log.ts`.

4. **Fix list keys and invalid DOM props**

> Scan JSX lists and ensure stable `key={entity.id}`. Remove invalid DOM props (React warnings) or prefix them (`data-`).

5. **Effect dependency correctness**

> Auto‑fix React Hooks lint warnings; where deps intentionally omitted, add a comment `// deps intentionally empty: reason`.

6. **Buttons inside forms**

> Ensure buttons that are not meant to submit forms use `type="button"`.

7. **Remove dead overlays**

> Ensure closed modals/backdrops get `aria-hidden="true"` and `data-overlay="true"` so the CSS utility disables pointer events. Unmount where possible.

8. **Routing hardening**

> Verify a single `BrowserRouter` wrapper and normalized route constants in `/src/routes.ts`. Replace string literals with imports.

9. **API base correctness**

> Ensure every API call uses a **relative path** (`/x`) into `api.ts` which prepends `API_URL`. Remove hard‑coded localhost in production paths.

---

## Phase 4 — Quality Gates (prevent regressions)

### 4.1 ESLint setup

**`.eslintrc.cjs` additions**

```js
module.exports = {
  rules: {
    'no-console': ['error', { allow: ['warn', 'error', 'info'] }],
    'react/jsx-key': 'error',
    'react-hooks/exhaustive-deps': 'warn'
  }
};
```

### 4.2 TypeScript strict mode

Enable in `tsconfig.json`:

```json
{
  "compilerOptions": { "strict": true, "noUncheckedIndexedAccess": true }
}
```

### 4.3 Playwright console gate

**`/frontend/tests/console-gate.spec.ts`**

```ts
import { test, expect } from "@playwright/test";
const routes = ["/", "/fields", "/inventory", "/settings"]; // update to actual
for (const r of routes) {
  test(`no console errors on ${r}`, async ({ page }) => {
    const problems: string[] = [];
    page.on("console", m => { if (["error","warning"].includes(m.type())) problems.push(m.text()); });
    await page.goto(`http://localhost:5173${r}`);
    await expect(problems.join("\n")).toEqual("");
  });
}
```

### 4.4 Husky pre‑commit (optional)

Run lint & typecheck before commit:

```bash
npx husky-init && npm i
# in .husky/pre-commit
npm run lint && npm run typecheck
```

---

## Phase 5 — Backend Hardening (single place, many fixes)

1. **CORS (cookie sessions)**

```ts
import cors from 'cors';
app.use(cors({ origin: [ 'http://localhost:5173', 'https://<your-netlify>.netlify.app', 'https://www.smartfarm-app.com' ], credentials: true }));
```

2. **Unified error handler**

```ts
app.use((err, _req, res, _next) => {
  const code = (err.status as number) || 500;
  res.status(code).json({ message: err.message || 'Server error' });
});
```

3. **Consistent response envelope**
   Adopt `{ data, message }` pattern in controllers and mirror in frontend types.

---

## Phase 6 — Documentation & PR

Create `docs/systemic-fixes-report.md` summarizing:

* Which **error classes** were eliminated.
* Files changed (high‑level), and examples before/after.
* How the new foundations should be used going forward.

Open PR: `feat(core): systemic fixes (api client, env, logging, overlays, tests)`.

---

## Ready‑made Cursor Commands

* "Create `lib/env.ts`, `lib/api.ts`, `lib/log.ts`, `hooks/useAsyncEffect.ts`, and `components/AppErrorBoundary.tsx` exactly as specified; wire `assertProdEnv()` in `main.tsx`."
* "Codemod: replace all `fetch(` calls with the `api` wrapper; adjust imports; keep types."
* "Replace all raw `console.*` with `log*` utilities; add ESLint rule to ban raw console."
* "Scan for JSX lists without stable keys; fix using entity ids."
* "Audit all overlays/modals; when hidden, set `aria-hidden=true` and `data-overlay=true`; import `utilities.css`."
* "Create Playwright `console-gate.spec.ts` and add routes [list your routes]; ensure it fails on any console error/warning."
* "Update docs: generate `docs/systemic-fixes-report.md` with mapped error classes and fixes applied."

---

**Outcome:** Instead of whack‑a‑mole page fixes, you'll have a **foundation layer** (env, API, logging, error handling, CSS overlay safety) that removes whole categories of errors across the app and stops them from returning.
