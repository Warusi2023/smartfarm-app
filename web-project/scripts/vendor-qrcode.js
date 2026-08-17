/**
 * Copy qrcode@1.5.1 precompiled browser bundle into public/vendor/qrcode.js.
 * Use 1.5.1 specifically — later 1.5.x releases do not ship build/qrcode.js.
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const pkgJsonPath = path.join(root, 'node_modules', 'qrcode', 'package.json');
const src = path.join(root, 'node_modules', 'qrcode', 'build', 'qrcode.js');
const dest = path.join(root, 'public', 'vendor', 'qrcode.js');

if (!fs.existsSync(pkgJsonPath)) {
  console.error('[vendor-qrcode] Missing node_modules/qrcode — run npm ci first');
  process.exit(1);
}

const version = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8')).version;
if (version !== '1.5.1') {
  console.error(`[vendor-qrcode] Expected qrcode@1.5.1, found ${version}`);
  process.exit(1);
}

if (!fs.existsSync(src)) {
  console.error('[vendor-qrcode] Missing', src);
  process.exit(1);
}

fs.mkdirSync(path.dirname(dest), { recursive: true });
fs.copyFileSync(src, dest);

const leftoverMin = path.join(root, 'public', 'vendor', 'qrcode.min.js');
if (fs.existsSync(leftoverMin)) {
  fs.unlinkSync(leftoverMin);
}

const stat = fs.statSync(dest);
console.log(`[vendor-qrcode] copied qrcode@${version} -> ${dest} (${stat.size} bytes)`);
