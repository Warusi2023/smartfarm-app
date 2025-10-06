
SMARTFARM ENV SYNC SUMMARY
==========================
Backend dir   : backend-api
Frontend dir  : web-project

Backend .env.production
-----------------------
NODE_ENV=production
PORT=3000
CORS_ORIGIN=https://smartfarm-web-production.up.railway.app


Frontend .env.production
------------------------
VITE_API_URL=https://smartfarm-app-production.up.railway.app/api
NEXT_PUBLIC_API_URL=https://smartfarm-app-production.up.railway.app/api
REACT_APP_API_URL=https://smartfarm-app-production.up.railway.app/api
NODE_ENV=production


Railway files created at repo root:
- railway.backend.json (use this for the backend service)
- railway.frontend.json (use this for the web service)

ACTION REQUIRED in Railway Dashboard:
------------------------------------
For the Backend service (smartfarm-app):
  • Set Environment Variables:
      NODE_ENV=production
      PORT=3000
      CORS_ORIGIN=https://smartfarm-web-production.up.railway.app
  • Healthcheck: /api/health
  • Root Directory: backend-api
  • Start Command: npm run start
  • Install Command: npm ci
  • Build Command: npm run build

For the Frontend service (web):
  • Set Environment Variables (depending on your framework, at least one is used):
      VITE_API_URL=https://smartfarm-app-production.up.railway.app/api
      NEXT_PUBLIC_API_URL=https://smartfarm-app-production.up.railway.app/api
      REACT_APP_API_URL=https://smartfarm-app-production.up.railway.app/api
      NODE_ENV=production
  • Root Directory: web-project
  • Build Command: npm run build
  • Start Command: npm run start (or the correct framework dev server/adapter)
  • If using Netlify instead of Railway web, copy the same env vars into Netlify.

IMPORTANT:
- If your actual Railway backend hostname is different, re-run with:
    BACKEND_PUBLIC_URL="https://<YOUR-BACKEND-HOST>" node scripts/sync-env.mjs
- Frontend must call the API via https://smartfarm-app-production.up.railway.app/api
- Backend must allow CORS from https://smartfarm-web-production.up.railway.app

Next:
  1) Commit .env.production files (if your policy allows; otherwise keep local and set the same values in Railway/Netlify dashboards).
  2) In GitHub → Secrets, set:
       RAILWAY_TOKEN
       RAILWAY_SERVICE_ID_BACKEND
       RAILWAY_SERVICE_ID_FRONTEND (if deploying web via Railway)
