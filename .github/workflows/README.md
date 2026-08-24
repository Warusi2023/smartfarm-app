# GitHub Actions workflows

## Required repository secrets

### `CI_JWT_SECRET` (Backend CI health check)

The backend refuses to start without `JWT_SECRET` (`JWT_SECRET is required. Refusing to start with an insecure default secret.`).

1. Open the GitHub repo → **Settings** → **Secrets and variables** → **Actions**
2. Add secret name: `CI_JWT_SECRET`
3. Value: a randomly generated **non-production** secret (32+ characters)
4. **Do not** reuse the Railway production `JWT_SECRET`

Used by: `.github/workflows/backend-ci.yml` (Health check job) via:

```yaml
env:
  JWT_SECRET: ${{ secrets.CI_JWT_SECRET }}
```

Generate a disposable CI secret locally (example):

```bash
openssl rand -hex 32
```

### Netlify production artifact

**Sole production publish path:** `web-project/dist` (Vite build from `web-project/netlify.toml`).

- **Automatic production deploy:** `.github/workflows/frontend-ci-cd.yml` → job `Deploy to Production` publishes `./web-project/dist` on push to `main` (after Playwright / accessibility / performance / build).
- **Do not publish raw `web-project/public` to production.** That folder is the pre-build source; postbuild writes `_redirects` and related artifacts into `dist/`.
- **Legacy:** `.github/workflows/netlify-deploy.yml` is **manual-only** (`workflow_dispatch`). It no longer runs on push/PR to `main`. If invoked manually, it builds Vite and publishes `web-project/dist` only.

Site ID / auth token secrets (existing): `NETLIFY_AUTH_TOKEN`, `NETLIFY_SITE_ID`. Optional health/Lighthouse: `NETLIFY_PRODUCTION_URL`.

## Required repository variables

### `VITE_API_URL` (Frontend CI API connectivity)

`.github/workflows/frontend-ci.yml` step **Test API connectivity** requires the public API origin. It historically grepped `VITE_API_URL` from `web-project/netlify.toml`; that file no longer embeds the URL, so CI reads the same name from a **repository variable**.

1. Open the GitHub repo → **Settings** → **Secrets and variables** → **Actions** → **Variables**
2. Add variable name: `VITE_API_URL` (exact name — do not rename)
3. Value (production SmartFarm backend origin, no trailing slash):

   `https://web-production-86d39.up.railway.app`

4. Use a **variable**, not a secret — this is a public HTTPS origin, not a credential.

Used by:

```yaml
env:
  VITE_API_URL: ${{ vars.VITE_API_URL }}
```

The step then `GET ${VITE_API_URL}/api/health` and expects HTTP **200**. Without the variable, the job fails with `API URL not configured`.
