const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/api/health", (req, res) => {
  res.json({ ok: true, service: "SmartFarm", ts: Date.now() });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`[SmartFarm] running on port ${PORT}`);
});