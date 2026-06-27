/**
 * Write canonical Netlify _redirects into public/ and dist/ after build.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { NETLIFY_REDIRECTS } from './netlify-redirects-content.mjs';

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(ROOT, '..');

const targets = [
    path.join(projectRoot, 'public', '_redirects'),
    path.join(projectRoot, 'dist', '_redirects')
];

for (const target of targets) {
    const dir = path.dirname(target);
    if (!fs.existsSync(dir)) {
        continue;
    }
    fs.writeFileSync(target, NETLIFY_REDIRECTS, 'utf8');
    console.log(`write-netlify-redirects: wrote ${path.relative(projectRoot, target)}`);
}
