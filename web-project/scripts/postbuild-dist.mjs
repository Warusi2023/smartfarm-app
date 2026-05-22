/**
 * Post-build: use full marketing homepage in dist (Vite entry index is minimal).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(ROOT, '..');
const marketingIndex = path.join(projectRoot, 'public', 'index.html');
const distIndex = path.join(projectRoot, 'dist', 'index.html');

if (!fs.existsSync(marketingIndex)) {
  console.warn('postbuild-dist: public/index.html not found, skipping');
  process.exit(0);
}
if (!fs.existsSync(path.join(projectRoot, 'dist'))) {
  console.warn('postbuild-dist: dist/ not found, skipping');
  process.exit(0);
}

fs.copyFileSync(marketingIndex, distIndex);
console.log('postbuild-dist: copied public/index.html -> dist/index.html');
