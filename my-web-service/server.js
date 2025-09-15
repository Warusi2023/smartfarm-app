const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for JSON requests
app.use(express.json());

// Example GET endpoint
app.get("/", (req, res) => {
  res.send("Hello, this is my Node.js web service!");
});

// Example POST endpoint
app.post("/data", (req, res) => {
  const body = req.body;
  res.json({ message: "Data received", data: body });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
