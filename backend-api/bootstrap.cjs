// bootstrap.cjs
process.on('uncaughtException', (err) => {
  console.error('[bootstrap] Uncaught Exception:', err);
  process.exit(1);
});
process.on('unhandledRejection', (reason) => {
  console.error('[bootstrap] Unhandled Rejection:', reason);
  process.exit(1);
});

const REQUIRED = [
  // add only what the server truly needs to start
  // 'DATABASE_URL',
  // 'JWT_SECRET',
];

const missing = REQUIRED.filter(k => !process.env[k] || String(process.env[k]).trim()==='');
if (missing.length) {
  console.error('[bootstrap] Missing env vars:', missing.join(', '));
  process.exit(1);
}

console.log('[bootstrap] NODE_ENV=', process.env.NODE_ENV);
console.log('[bootstrap] PORT (from Railway)=', process.env.PORT);
console.log('[bootstrap] CORS_ORIGIN=', process.env.CORS_ORIGIN);

require('./server.cjs'); // <-- this file must exist (next step)
