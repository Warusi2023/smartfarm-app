import express from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(",") ?? "*",
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"]
}));

app.get("/api/health", (_req, res) =>
  res.json({ ok: true, service: "SmartFarm", ts: Date.now() })
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`[SmartFarm] Listening on ${PORT}`));