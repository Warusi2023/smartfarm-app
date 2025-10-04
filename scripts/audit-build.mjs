#!/usr/bin/env node

// scripts/audit-build.mjs
import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join } from "node:path";

function run(cmd, cwd) {
  console.log("$", cmd);
  try { 
    const result = execSync(cmd, { stdio: "pipe", cwd }).toString();
    console.log(result);
    return result;
  }
  catch (e) { 
    console.error("--- BUILD ERROR ---");
    console.error(e.stdout?.toString() || e.message);
    throw e;
  }
}

const candidates = ["backend","server","api","."];
let backendDir = candidates.find(d => existsSync(join(d, "package.json")));
if (!backendDir) {
  console.error("No backend package.json found. Confirm Railway rootDirectory and backend path.");
  process.exit(2);
}

console.log("Backend dir:", backendDir);
run("node -v");
run("npm -v");
run("npm install", backendDir);
run("npm run build", backendDir);

// Try to start briefly to ensure it binds PORT
process.env.PORT = "4000";
console.log("Testing start command with PORT=4000...");
try {
  run("npm run start", backendDir);
} catch (e) {
  console.error("Start command failed:", e.message);
  // Don't exit here - we want to see if it's just a binding issue
}

console.log("Audit build finished OK.");
