import { readdirSync, readFileSync } from "fs";
import { join } from "path";

const roots = ["./frontend/src", "./src"].filter(Boolean);
const bad = [];

function walk(dir) {
  for (const f of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, f.name);
    if (f.isDirectory()) walk(p);
    else if (f.name.endsWith(".svg") || f.name.endsWith(".tsx") || f.name.endsWith(".jsx") || f.name.endsWith(".html")) {
      const txt = readFileSync(p, "utf8");
      if (/viewBox\s*=\s*["'][^"']*(%|px)[^"']*["']/.test(txt)) bad.push(p);
    }
  }
}
for (const r of roots) try { walk(r); } catch {}
if (bad.length) {
  console.error("Invalid SVG viewBox in:", bad);
  process.exit(1);
}
