# Environment Variables Guide

Canonical environment variable reference for the current SmartFarm codebase.

## Frontend public vars (`web-project`)

Required:

```env
VITE_API_URL=https://your-backend.railway.app
```

Optional:

```env
VITE_APP_NAME=SmartFarm
VITE_APP_VERSION=1.0.0
VITE_SENTRY_DSN=https://examplePublicKey@o0.ingest.sentry.io/0
VITE_SENTRY_ENVIRONMENT=production
VITE_SENTRY_RELEASE=smartfarm-web@1.0.0
```

Notes:
- Frontend code primarily reads `VITE_API_URL`.
- `VITE_API_BASE_URL` appears in legacy docs/scripts and should not be treated as the canonical name.

## Backend server vars (`backend`)

Required:

```env
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://user:password@host:5432/database
JWT_SECRET=replace_with_strong_secret_minimum_32_characters
ALLOWED_ORIGINS=https://your-site.netlify.app,https://www.your-site.netlify.app
```

Recommended:

```env
JWT_EXPIRES_IN=7d
BCRYPT_ROUNDS=12
FRONTEND_URL=https://your-site.netlify.app
LOG_LEVEL=info
```

Optional:

```env
SENTRY_DSN=https://examplePublicKey@o0.ingest.sentry.io/0
SENTRY_ENVIRONMENT=production
SENTRY_RELEASE=smartfarm-backend@1.0.0
WEATHER_API_KEY=your_openweathermap_api_key
ENABLE_SWAGGER=true
REDIS_URL=redis://localhost:6379
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-app-password
EMAIL_FROM=SmartFarm <noreply@smartfarm.com>
API_KEY=set_only_if_x_api_key_middleware_is_used
```

Compatibility aliases (legacy):

```env
CORS_ORIGINS=https://your-site.netlify.app
OPENWEATHER_API_KEY=your_openweathermap_api_key
```

## Third-party integrations

- OpenWeatherMap: `WEATHER_API_KEY` (legacy alias: `OPENWEATHER_API_KEY`)
- Sentry backend: `SENTRY_DSN`, optional `SENTRY_ENVIRONMENT`, `SENTRY_RELEASE`
- Sentry frontend: `VITE_SENTRY_DSN`, optional `VITE_SENTRY_ENVIRONMENT`, `VITE_SENTRY_RELEASE`
- Email provider: `EMAIL_SERVICE`, `EMAIL_USER`, `EMAIL_PASS`, `EMAIL_FROM`

## Monitoring vars

- Backend monitoring: `SENTRY_DSN`, `SENTRY_ENVIRONMENT`, `SENTRY_RELEASE`
- Frontend monitoring: `VITE_SENTRY_DSN`, `VITE_SENTRY_ENVIRONMENT`, `VITE_SENTRY_RELEASE`

## Manual verification steps

1. Backend shell:
   - `cd backend`
   - `node ../scripts/verify-env-vars.js`
2. CORS check:
   - Ensure Railway has `ALLOWED_ORIGINS` (or legacy `CORS_ORIGINS`) including the deployed frontend URL.
   - Run `node scripts/test-cors.js` from repo root.
3. API key check:
   - `cd backend`
   - `node ../scripts/verify-api-keys.js`
4. Confirm no plaintext secrets are committed:
   - Keep `.env` and `*.env` out of git (`.gitignore` already covers these).

