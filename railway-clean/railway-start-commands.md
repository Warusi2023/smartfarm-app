# 🚀 **RAILWAY START COMMANDS**

## **Option A: Use your app's start command (Recommended)**

In Railway → Service → Settings → Start Command, set:

```bash
npm start
```

This will automatically run:
1. `npm run prestart` (which runs migrations + seeds)
2. `npm start` (which starts the server)

## **Option B: Direct bash command**

In Railway → Service → Settings → Start Command, set:

```bash
./scripts/migrate.sh && npm start
```

## **Option C: Separate migrator service (Enterprise)**

Create a separate Railway service with:
- **Start Command**: `./scripts/migrate.sh`
- **Deploy Order**: Set to deploy BEFORE your main API service
- **Environment**: Same `DATABASE_URL` as main service

Then your main API service can start normally with just `npm start`.

---

## **Current Configuration**

Your `package.json` is configured with:

```json
{
  "scripts": {
    "migrate": "node scripts/migrate.mjs",
    "seed": "node scripts/seed.mjs",
    "prestart": "node scripts/migrate.mjs && node scripts/seed.mjs",
    "start": "NODE_ENV=production node server.js"
  }
}
```

**Recommended Railway Start Command**: `npm start`

This will automatically run migrations and seeds before starting your server!
