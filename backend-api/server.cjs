const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());

const allowed = (process.env.CORS_ORIGIN || "").split(",").map(s => s.trim()).filter(Boolean);
app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);         // allow same-origin / curl
    if (allowed.includes(origin)) return cb(null, true);
    return cb(new Error("CORS blocked: " + origin));
  },
  credentials: true
}));

// health & version
const pkg = (() => { try { return require("./package.json"); } catch { return { version:"0.0.0" }; }})();
app.get("/api/health", (_req, res) => res.json({ ok:true, service:"SmartFarm", ts:Date.now() }));
app.get("/api/version", (_req, res) => res.json({
  service: "SmartFarm",
  version: pkg.version || "0.0.0",
  buildTag: process.env.APP_BUILD_TAG || "dev",
  node: process.version
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`[SmartFarm] Listening on ${PORT}`);
  console.log(`[SmartFarm] Allowed CORS:`, allowed.length ? allowed : "(none)");
});