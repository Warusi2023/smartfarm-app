// bootstrap.cjs — minimal, safe startup + crash visibility
process.on('uncaughtException', (e) => { console.error('[uncaughtException]', e); process.exit(1); });
process.on('unhandledRejection', (r) => { console.error('[unhandledRejection]', r); process.exit(1); });

const REQUIRED = []; // add ONLY the ones truly needed just to boot
const missing = REQUIRED.filter(k => !process.env[k] || !String(process.env[k]).trim());
if (missing.length) {
  console.error('[env] Missing:', missing.join(', '));
  process.exit(1);
}

console.log('[boot] NODE_ENV =', process.env.NODE_ENV);
console.log('[boot] PORT     =', process.env.PORT);
console.log('[boot] CORS_ORIGIN =', process.env.CORS_ORIGIN);

require('./server.cjs'); // must exist
