// server.cjs — do NOT block boot; keep healthcheck fast
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = Number(process.env.PORT || 3000);
const API_NAME = process.env.API_NAME || 'SmartFarm';
const API_VERSION = process.env.API_VERSION || 'v1';

// ---- CORS allowlist (env-driven) ----
const DEFAULT_ORIGINS = [
  'https://www.smartfarm-app.com',         // production
  'https://smartfarm-app.netlify.app',     // Netlify subdomain fallback
  'https://web-production-86d39.up.railway.app', // Railway web app
];
const EXTRA_ORIGINS = (process.env.CORS_ORIGIN || process.env.CORS_ORIGINS || '')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);
const ALLOWED_ORIGINS = [...new Set([...DEFAULT_ORIGINS, ...EXTRA_ORIGINS])];

console.log('[server] CORS allowed origins:', ALLOWED_ORIGINS);

const corsOptions = {
  origin(origin, cb) {
    // Allow server-to-server / curl (no origin)
    if (!origin) return cb(null, true);
    if (ALLOWED_ORIGINS.includes(origin)) return cb(null, true);
    console.log(`[server] CORS blocked: ${origin}`);
    return cb(new Error(`CORS blocked: ${origin}`));
  },
  credentials: true,
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: [
    'Content-Type','Authorization','X-Requested-With','Accept'
  ],
  exposedHeaders: ['Content-Length','Content-Type'],
  maxAge: 86400,
};

// Use our CORS first so no proxy overwrites it
app.use((req, res, next) => {
  res.setHeader('Vary', 'Origin'); // important for caches/proxies
  next();
});
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // handle preflight explicitly
app.use(express.json());

// Health: MUST be instant (no DB/external calls)
app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: API_NAME, version: API_VERSION, ts: Date.now() });
});

// Simple roots
app.get('/', (_req, res) => res.send(`${API_NAME} API is running`));
app.get('/api', (_req, res) => res.json({ ok: true, msg: 'API root' }));

// NOTE: If you have DB connections, initialize AFTER listen
app.listen(PORT, () => {
  console.log(`[server] ${API_NAME} listening on :${PORT}`);
  console.log(`[server] Health: GET /api/health`);
});