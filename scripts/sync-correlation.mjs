import { writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

const BACKEND_DIR  = existsSync("backend") ? "backend" : (existsSync("backend-api") ? "backend-api" : null);
const WEB_DIR      = existsSync("web-project") ? "web-project" : (existsSync("web") ? "web" : null);

if (!BACKEND_DIR || !WEB_DIR) {
  console.error("❌ Could not find backend or web folder. Looked for: backend, backend-api, web-project, web");
  process.exit(2);
}

const BACKEND_URL = process.env.BACKEND_URL || "https://smartfarm-app-production.up.railway.app";
const WEB_URL     = process.env.WEB_URL     || "https://web-production-86d39.up.railway.app";
const NETLIFY_URL = process.env.NETLIFY_URL || "https://<YOUR-NETLIFY-DOMAIN>";

const API_URL = `${BACKEND_URL.replace(/\/$/,'')}/api`;
const CORS = [WEB_URL, NETLIFY_URL].filter(Boolean).join(",");

// Backend .env.production
const backendEnv = `NODE_ENV=production
PORT=3000
CORS_ORIGIN=${CORS}
`;
writeFileSync(join(BACKEND_DIR, ".env.production"), backendEnv);

// Web .env.production (support Vite/CRA/Next)
const webEnv = `NODE_ENV=production
VITE_API_URL=${API_URL}
REACT_APP_API_URL=${API_URL}
NEXT_PUBLIC_API_URL=${API_URL}
APP_BUILD_TAG=${Date.now()}
`;
writeFileSync(join(WEB_DIR, ".env.production"), webEnv);

// Railway deployment helpers (optional, refer to them in UI)
const backendRailway = {
  build: { builder: "NIXPACKS", installCommand: "npm ci", buildCommand: "npm run build" },
  deploy: { startCommand: "npm run start", healthcheckPath: "/api/health", healthcheckTimeout: 120 },
  rootDirectory: BACKEND_DIR
};
const webRailway = {
  build: { builder: "NIXPACKS", installCommand: "npm ci", buildCommand: "npm run build" },
  deploy: { startCommand: "npm run start", healthcheckPath: "/", healthcheckTimeout: 120 },
  rootDirectory: WEB_DIR
};

writeFileSync("railway.backend.json", JSON.stringify(backendRailway, null, 2));
writeFileSync("railway.web.json", JSON.stringify(webRailway, null, 2));

console.log("✅ Correlation sync complete.");
console.log("Backend env:\n", backendEnv);
console.log("Web env:\n", webEnv);
console.log("Set Netlify env (VITE_API_URL / NEXT_PUBLIC_API_URL / REACT_APP_API_URL) to:", API_URL);
