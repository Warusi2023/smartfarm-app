const express = require("express");
const cors = require("cors");
const { logApiKeyStatus, getGoogleApiKey } = require("./config/api-keys");

process.on("uncaughtException", (err) => {
  console.error("[SmartFarm] Uncaught Exception:", err && err.stack || err);
});
process.on("unhandledRejection", (reason) => {
  console.error("[SmartFarm] Unhandled Rejection:", reason);
});

const app = express();
app.use(express.json());
app.use(cors({
  origin: (process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(",") : "*"),
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"]
}));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "SmartFarm", ts: Date.now(), env: { NODE_ENV: process.env.NODE_ENV || "unset" } });
});

app.get("/api/ready", (_req, res) => {
  res.json({ ready: true, ts: Date.now() });
});

// User Management API Routes
app.use('/api/user-management', require('./routes/user-management'));
app.use('/api/auth', require('./routes/auth'));

// Log API key status on startup
logApiKeyStatus();

const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0"; // ensure we bind to all interfaces
app.listen(PORT, HOST, () => {
  console.log(`[SmartFarm] Listening on http://${HOST}:${PORT}`);
  console.log(`[SmartFarm] Health: GET /api/health | Ready: GET /api/ready`);
  
  // Log API key status
  try {
    const googleKey = getGoogleApiKey();
    console.log(`[SmartFarm] Google API Key: ${googleKey.substring(0, 10)}...`);
  } catch (error) {
    console.warn(`[SmartFarm] Google API Key: Not configured`);
  }
});