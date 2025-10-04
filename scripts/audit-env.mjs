#!/usr/bin/env node

// scripts/audit-env.mjs
import { execSync } from "node:child_process";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

function run(cmd, cwd=".") {
  try { return execSync(cmd, { stdio: "pipe", cwd }).toString().trim(); }
  catch (e) { return `ERR(${cmd}): ` + (e.stdout?.toString() || e.message); }
}

function safeRead(p) {
  try { return readFileSync(p, "utf8"); } catch { return ""; }
}

const guessBackendDirs = ["backend", "server", "api", "."];
const findings = [];

console.log("=== RUNTIME ===");
console.log("node -v:", run("node -v"));
console.log("npm -v:", run("npm -v"));

console.log("\n=== TOP-LEVEL FILES ===");
console.log(run("ls -la"));

console.log("\n=== PACKAGE.JSON LOCATIONS (top-level + common subfolders) ===");
let candidates = [];
for (const dir of ["backend","server","api","."]) {
  if (existsSync(join(dir, "package.json"))) candidates.push(dir);
}
console.log(candidates.length ? candidates : "none");

console.log("\n=== RAILWAY CONFIG (railway.json) ===");
console.log(safeRead("railway.json") || "no railway.json");

console.log("\n=== GITHUB WORKFLOWS ===");
try {
  console.log(run("ls -la .github/workflows || true"));
  const workflowDir = ".github/workflows";
  if (existsSync(workflowDir)) {
    const files = readdirSync(workflowDir, { withFileTypes: true })
      .filter(x => x.isFile() && (x.name.endsWith(".yml") || x.name.endsWith(".yaml")))
      .map(x => x.name);
    
    for (const f of files) {
      console.log(`\n--- .github/workflows/${f} ---\n` + safeRead(join(workflowDir, f)));
    }
  }
} catch (e) {
  console.log("No .github/workflows directory or error reading workflows");
}

console.log("\n=== NETLIFY HEADERS (CSP) ===");
console.log(safeRead("_headers") || safeRead("frontend/_headers") || "no _headers");

console.log("\n=== BACKEND PACKAGE.JSON SCRIPTS & ENGINES (best guess) ===");
let backendDir = "";
for (const d of guessBackendDirs) {
  if (existsSync(join(d, "package.json"))) { backendDir = d; break; }
}
if (backendDir) {
  const pkg = JSON.parse(safeRead(join(backendDir, "package.json")));
  console.log("backendDir:", backendDir);
  console.log("engines:", pkg.engines || {});
  console.log("scripts:", pkg.scripts || {});
  console.log("\n> Check entry files existence:");
  for (const p of ["server.js","src/index.ts","src/index.js","dist/index.js"]) {
    console.log(p, existsSync(join(backendDir, p)) ? "OK" : "missing");
  }
} else {
  findings.push("No backend package.json found (Railway rootDirectory may be wrong).");
}

console.log("\n=== HEALTHCHECK ENDPOINT CHECK (source only) ===");
console.log("Search for `/api/health` in backend files");
console.log(run(`grep -R "api/health" -n ${backendDir || "."} || true`));

console.log("\n=== CORS MIDDLEWARE CHECK (source only) ===");
console.log(run(`grep -R "cors(" -n ${backendDir || "."} || true`));

console.log("\n=== LOCKFILES ===");
console.log("root package-lock.json:", existsSync("package-lock.json") ? "present" : "missing");
if (backendDir && backendDir !== ".") {
  console.log(`${backendDir}/package-lock.json:`, existsSync(join(backendDir, "package-lock.json")) ? "present" : "missing");
}

console.log("\n=== SUMMARY NOTES ===");
if (findings.length) console.log(findings.join("\n")); else console.log("No immediate structural red flags printed above.");
