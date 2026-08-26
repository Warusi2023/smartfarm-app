/**
 * Copy chart.js UMD build into public/vendor for the non-bundled static dashboard.
 * Minify so WebKit dashboard load stays within the 45s test budget.
 */
const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');

const root = path.join(__dirname, '..');
const pkgJsonPath = path.join(root, 'node_modules', 'chart.js', 'package.json');
const src = path.join(root, 'node_modules', 'chart.js', 'dist', 'chart.umd.js');
const dest = path.join(root, 'public', 'vendor', 'chart.umd.js');

async function main() {
  if (!fs.existsSync(pkgJsonPath)) {
    console.error('[vendor-chart] Missing node_modules/chart.js — run npm ci first');
    process.exit(1);
  }

  const version = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8')).version;
  if (version !== '4.4.1') {
    console.error(`[vendor-chart] Expected chart.js@4.4.1, found ${version}`);
    process.exit(1);
  }

  if (!fs.existsSync(src)) {
    console.error('[vendor-chart] Missing', src);
    process.exit(1);
  }

  fs.mkdirSync(path.dirname(dest), { recursive: true });
  const source = fs.readFileSync(src, 'utf8');
  const result = await esbuild.transform(source, {
    minify: true,
    legalComments: 'none',
    loader: 'js'
  });
  fs.writeFileSync(dest, result.code, 'utf8');

  const stat = fs.statSync(dest);
  console.log(`[vendor-chart] copied chart.js@${version} -> ${dest} (${stat.size} bytes)`);
}

main().catch((err) => {
  console.error('[vendor-chart]', err);
  process.exit(1);
});
