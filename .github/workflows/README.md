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

### Netlify publish directory

`.github/workflows/netlify-deploy.yml` publishes **`web-project/public`** (not repo-root `public/`, which does not exist).

Site ID / auth token secrets (existing): `NETLIFY_AUTH_TOKEN`, `NETLIFY_SITE_ID`.
