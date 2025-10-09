// server.cjs — SmartFarm API Server
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = Number(process.env.PORT || 3000);
const API_NAME = process.env.API_NAME || 'SmartFarm';
const API_VERSION = process.env.API_VERSION || 'v1';

// ==== CORS allowlist ====
const DEFAULT_ORIGINS = [
  'https://www.smartfarm-app.com',          // production (your custom domain)
  'https://smartfarm-app.netlify.app',      // netlify site (if used)
];
const EXTRA_ORIGINS = (process.env.CORS_ORIGINS || process.env.CORS_ORIGIN || '')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);
const ALLOWED_ORIGINS = [...new Set([...DEFAULT_ORIGINS, ...EXTRA_ORIGINS])];

// Add localhost for development only
if (process.env.NODE_ENV !== 'production') {
  ALLOWED_ORIGINS.push('http://localhost:5173', 'http://127.0.0.1:5173', 'http://localhost:3000');
}

console.log('[server] CORS allowed origins:', ALLOWED_ORIGINS);

const corsOptions = {
  origin(origin, cb) {
    if (!origin) return cb(null, true);                   // server-to-server
    if (ALLOWED_ORIGINS.includes(origin)) return cb(null, true);
    return cb(new Error(`CORS blocked: ${origin}`));
  },
  credentials: true,
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization','X-Requested-With','Accept'],
  exposedHeaders: ['Content-Length','Content-Type'],
  maxAge: 86400,
};

// Ensure caches/proxies vary by Origin and WE set the headers (not the proxy)
app.use((req, res, next) => { res.setHeader('Vary','Origin'); next(); });
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // preflight
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
  console.log(`SmartFarm API listening on ${PORT}`);
  console.log(`Health endpoint: GET /api/health`);
  console.log(`CORS origins: ${ALLOWED_ORIGINS.join(', ')}`);
});