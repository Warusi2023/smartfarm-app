import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const CANDIDATES = ["backend","server","api","."];
let dir = CANDIDATES.find(d => existsSync(join(d,"package.json")));
if (!dir) {
  console.error("❌ No backend package.json found in", CANDIDATES.join(", "));
  process.exit(2);
}
const pkg = JSON.parse(readFileSync(join(dir,"package.json"),"utf8"));
const scripts = pkg.scripts || {};
const startOK = !!scripts.start;
const hasServerFile = ["server.js","dist/index.js","src/index.ts","src/index.js"]
  .some(f => existsSync(join(dir,f)));

if (!startOK) console.error(`❌ Missing "start" script in ${dir}/package.json`);
if (!hasServerFile) console.error(`❌ No server entry found in ${dir} (looked for server.js/dist/index.js/src/index.ts/src/index.js)`);

if (!startOK || !hasServerFile) process.exit(3);

console.log("✅ Backend dir:", dir);
console.log("✅ start script:", scripts.start);
