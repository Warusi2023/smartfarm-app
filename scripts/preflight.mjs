import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const CANDIDATES = ["backend","server","api","."];
const found = CANDIDATES.find(d => existsSync(join(d,"package.json")));
if (!found) {
  console.error("❌ No backend package.json found in:", CANDIDATES.join(", "));
  process.exit(2);
}

const pkgPath = join(found,"package.json");
const pkg = JSON.parse(readFileSync(pkgPath,"utf8"));
const scripts = pkg.scripts || {};
const startOK = !!scripts.start;

const entries = ["server.cjs","server.js","dist/index.js","src/index.ts","src/index.js"];
const hasEntry = entries.some(f => existsSync(join(found,f)));

if (!startOK) console.error(`❌ Missing "start" script in ${pkgPath}`);
if (!hasEntry) console.error(`❌ No server entry found in ${found} (looked for: ${entries.join(", ")})`);

if (!startOK || !hasEntry) process.exit(3);

console.log("✅ Backend dir:", found);
console.log("✅ Start script:", scripts.start);