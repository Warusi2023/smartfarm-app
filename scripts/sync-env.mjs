import { existsSync, mkdirSync, writeFileSync, readFileSync } from "fs";
import { join } from "path";

const BACKEND_CANDIDATES = ["backend-api", "backend", "server", "api"];
const FRONTEND_CANDIDATES = ["web-project", "frontend", "web", "app"];

function findDir(cands) {
  for (const d of cands) {
    try {
      if (existsSync(join(d))) return d;
    } catch {}
  }
  return null;
}

const backendDir = findDir(BACKEND_CANDIDATES);
const frontendDir = findDir(FRONTEND_CANDIDATES);

if (!backendDir) {
  console.error("❌ Backend folder not found (tried:", BACKEND_CANDIDATES.join(", "), ")");
  process.exit(2);
}
if (!frontendDir) {
  console.error("❌ Frontend folder not found (tried:", FRONTEND_CANDIDATES.join(", "), ")");
  process.exit(3);
}

function ensureDir(d) { try { mkdirSync(d, { recursive: true }); } catch {} }

function setDefault(v, fallback) {
  return (v && String(v).trim().length) ? String(v).trim() : fallback;
}

/**
 * You can override these from CI/Actions by setting env:
 *   BACKEND_PUBLIC_URL, FRONTEND_PUBLIC_URL, CORS_ORIGIN, FRONTEND_ORIGIN
 */
const BACKEND_PUBLIC_URL = setDefault(
  process.env.BACKEND_PUBLIC_URL,
  "https://smartfarm-app-production.up.railway.app"
); // change if your actual host differs
const FRONTEND_PUBLIC_URL = setDefault(
  process.env.FRONTEND_PUBLIC_URL,
  "https://smartfarm-web-production.up.railway.app"
);
const API_URL = `${BACKEND_PUBLIC_URL.replace(/\/$/, "")}/api`;
const CORS_ORIGIN = setDefault(process.env.CORS_ORIGIN, FRONTEND_PUBLIC_URL);

const BACKEND_ENV = [
  "NODE_ENV=production",
  "PORT=3000",
  `CORS_ORIGIN=${CORS_ORIGIN}`
].join("\n") + "\n";

const FRONTEND_KEYS = [
  // Most frameworks:
  `VITE_API_URL=${API_URL}`,
  `NEXT_PUBLIC_API_URL=${API_URL}`,
  `REACT_APP_API_URL=${API_URL}`,
  "NODE_ENV=production"
];
const FRONTEND_ENV = FRONTEND_KEYS.join("\n") + "\n";

// Write .env.production for backend & frontend
const backendEnvPath = join(backendDir, ".env.production");
const frontendEnvPath = join(frontendDir, ".env.production");
writeFileSync(backendEnvPath, BACKEND_ENV);
writeFileSync(frontendEnvPath, FRONTEND_ENV);

// Write/patch railway.json for both services
const backendRailway = {
  build: { builder: "NIXPACKS", installCommand: "npm ci", buildCommand: "npm run build" },
  deploy: { startCommand: "npm run start", healthcheckPath: "/api/health", healthcheckTimeout: 120 },
  rootDirectory: backendDir
};
const frontendRailway = {
  build: { builder: "NIXPACKS", installCommand: "npm ci", buildCommand: "npm run build" },
  deploy: { startCommand: "npm run start", healthcheckPath: "/", healthcheckTimeout: 120 },
  rootDirectory: frontendDir
};
writeFileSync("railway.backend.json", JSON.stringify(backendRailway, null, 2) + "\n");
writeFileSync("railway.frontend.json", JSON.stringify(frontendRailway, null, 2) + "\n");

// Optional Procfile for backend clarity
const procfilePath = join(backendDir, "Procfile");
writeFileSync(procfilePath, "web: npm run start\n");

// Final report
const report = `
SMARTFARM ENV SYNC SUMMARY
==========================
Backend dir   : ${backendDir}
Frontend dir  : ${frontendDir}

Backend .env.production
-----------------------
${BACKEND_ENV}

Frontend .env.production
------------------------
${FRONTEND_ENV}

Railway files created at repo root:
- railway.backend.json (use this for the backend service)
- railway.frontend.json (use this for the web service)

ACTION REQUIRED in Railway Dashboard:
------------------------------------
For the Backend service (smartfarm-app):
  • Set Environment Variables:
      NODE_ENV=production
      PORT=3000
      CORS_ORIGIN=${CORS_ORIGIN}
  • Healthcheck: /api/health
  • Root Directory: ${backendDir}
  • Start Command: npm run start
  • Install Command: npm ci
  • Build Command: npm run build

For the Frontend service (web):
  • Set Environment Variables (depending on your framework, at least one is used):
      VITE_API_URL=${API_URL}
      NEXT_PUBLIC_API_URL=${API_URL}
      REACT_APP_API_URL=${API_URL}
      NODE_ENV=production
  • Root Directory: ${frontendDir}
  • Build Command: npm run build
  • Start Command: npm run start (or the correct framework dev server/adapter)
  • If using Netlify instead of Railway web, copy the same env vars into Netlify.

IMPORTANT:
- If your actual Railway backend hostname is different, re-run with:
    BACKEND_PUBLIC_URL="https://<YOUR-BACKEND-HOST>" node scripts/sync-env.mjs
- Frontend must call the API via ${API_URL}
- Backend must allow CORS from ${CORS_ORIGIN}

Next:
  1) Commit .env.production files (if your policy allows; otherwise keep local and set the same values in Railway/Netlify dashboards).
  2) In GitHub → Secrets, set:
       RAILWAY_TOKEN
       RAILWAY_SERVICE_ID_BACKEND
       RAILWAY_SERVICE_ID_FRONTEND (if deploying web via Railway)
`;

writeFileSync("scripts/env-audit-report.md", report);
console.log(report);
console.log("✅ Environment variables synchronized. Edit hostnames if needed and re-run.");