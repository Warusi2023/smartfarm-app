// web-project/scripts/fix-svg-viewbox.mjs
import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const targets = [
  path.join(ROOT, 'dist'),
  path.join(ROOT, 'build'),
  path.join(ROOT, 'public'), // in case templates leak
];

const re = /viewBox\s*=\s*["']\s*([-\d.]+)\s+([-\d.]+)\s+([-\d.%px]+)\s+([-\d.%px]+)\s*["']/gi;

function normalize(n) {
  // strip % or px -> parseFloat
  if (typeof n !== 'string') return n;
  const v = parseFloat(n.replace(/%|px/g, ''));
  return Number.isFinite(v) ? String(v) : n;
}

function fixFile(file) {
  let txt = fs.readFileSync(file, 'utf8');
  let changed = false;

  txt = txt.replace(re, (_, a, b, c, d) => {
    const fixed = `viewBox="${a} ${b} ${normalize(c)} ${normalize(d)}"`;
    changed = true;
    return fixed;
  });

  if (changed) {
    fs.writeFileSync(file, txt);
    console.log('fixed viewBox:', file);
  }
}

function walk(dir) {
  if (!fs.existsSync(dir)) return;
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const stat = fs.statSync(p);
    if (stat.isDirectory()) walk(p);
    else if (/\.(html|svg|js|mjs|jsx|tsx|css|map)$/i.test(name)) fixFile(p);
  }
}

targets.forEach(walk);
console.log('SVG viewBox normalization complete.');
