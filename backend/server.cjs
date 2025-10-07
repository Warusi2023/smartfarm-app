// server.cjs — do NOT block boot; keep healthcheck fast
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = Number(process.env.PORT || 3000);
const API_NAME = process.env.API_NAME || 'SmartFarm';
const API_VERSION = process.env.API_VERSION || 'v1';
const CORS_ORIGIN = (process.env.CORS_ORIGIN || '*')
  .split(',').map(s => s.trim()).filter(Boolean);

app.use(cors({ origin: CORS_ORIGIN, credentials: true }));
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