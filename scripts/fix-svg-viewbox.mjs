import fs from "fs";
import path from "path";

const ROOT = process.cwd();
const WEB_DIR = fs.existsSync("web-project") ? "web-project" : ".";
const SRC = path.join(ROOT, WEB_DIR);

const FILE_PATTERNS = [
  "**/*.svg",
  "**/*.html",
  "**/*.tsx",
  "**/*.ts",
  "**/*.jsx",
  "**/*.js"
];

// very small globber (no external deps)
function walk(dir, acc=[]) {
  for (const e of fs.readdirSync(dir, { withFileTypes:true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      // ignore node_modules and dist
      if (/node_modules|dist|build|.git/.test(p)) continue;
      walk(p, acc);
    } else {
      acc.push(p);
    }
  }
  return acc;
}

const files = walk(SRC).filter(p =>
  FILE_PATTERNS.some(gl => {
    const rx = new RegExp(gl.replace(/\*\*\/?/g, "(.*/)?").replace(/\./g,"\\.").replace(/\*/g,"[^/]*")+"$");
    return rx.test(p.replace(/\\/g,"/"));
  })
);

let changed = 0;
const re = /viewBox\s*=\s*["']\s*0\s+0\s+([^"'\s]+)\s+([^"'\s]+)\s*["']/gi;

function sanitize(w, h) {
  // Replace % or px with numeric fallbacks
  const bad = /(%|px)$/i;
  const toNum = v => bad.test(v) ? null : Number(v);
  let W = toNum(w);
  let H = toNum(h);

  // sensible defaults if invalid
  if (!W || !isFinite(W)) W = 100;
  if (!H || !isFinite(H)) H = 100;

  // clamp tiny/huge
  if (W <= 0) W = 100;
  if (H <= 0) H = 100;

  return `viewBox="0 0 ${W} ${H}"`;
}

for (const f of files) {
  const raw = fs.readFileSync(f, "utf8");
  if (!re.test(raw)) continue;

  const next = raw.replace(re, (_, w, h) => sanitize(w, h));
  if (next !== raw) {
    fs.writeFileSync(f, next, "utf8");
    changed++;
    console.log("fixed viewBox ->", f);
  }
}

console.log(`✅ SVG viewBox scan complete. Files changed: ${changed}`);
