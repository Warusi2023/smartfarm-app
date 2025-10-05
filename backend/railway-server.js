const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ 
    ok: true, 
    service: "SmartFarm Backend", 
    timestamp: new Date().toISOString(),
    version: "1.0.0"
  });
});

// API endpoints for SmartFarm
app.get("/api", (req, res) => {
  res.json({ 
    message: "SmartFarm API is running",
    endpoints: [
      "GET /api/health",
      "POST /api/auth/register",
      "POST /api/auth/login",
      "GET /api/farms",
      "POST /api/farms",
      "GET /api/crops",
      "POST /api/crops",
      "GET /api/livestock",
      "POST /api/livestock",
      "GET /api/inventory",
      "GET /api/weather",
      "GET /api/analytics"
    ]
  });
});

// Auth endpoints
app.post("/api/auth/register", (req, res) => {
  const { email, password, name, farmName } = req.body;
  
  if (!email || !password || !name) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  
  // Mock registration - in production, you'd save to database
  res.json({ 
    success: true, 
    message: "User registered successfully",
    user: { email, name, farmName }
  });
});

app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }
  
  // Mock login - in production, you'd verify credentials
  res.json({ 
    success: true, 
    message: "Login successful",
    token: "mock-jwt-token-" + Date.now(),
    user: { email, name: "Farmer" }
  });
});

// Farm management endpoints
app.get("/api/farms", (req, res) => {
  res.json([
    {
      id: 1,
      name: "Green Valley Farm",
      location: "Suva, Fiji",
      area: 25.5,
      type: "mixed"
    }
  ]);
});

app.post("/api/farms", (req, res) => {
  const { name, location, area, type } = req.body;
  
  res.json({
    success: true,
    farm: { id: Date.now(), name, location, area, type }
  });
});

// Crop management endpoints
app.get("/api/crops", (req, res) => {
  res.json([
    {
      id: 1,
      name: "Tomatoes",
      field: "Field A",
      plantedDate: "2025-01-15",
      status: "growing",
      variety: "Cherry",
      yield: 0
    },
    {
      id: 2,
      name: "Capsicum",
      field: "Field B", 
      plantedDate: "2025-01-10",
      status: "growing",
      variety: "Bell Pepper",
      yield: 0
    }
  ]);
});

app.post("/api/crops", (req, res) => {
  const { name, field, plantedDate, variety } = req.body;
  
  res.json({
    success: true,
    crop: { 
      id: Date.now(), 
      name, 
      field, 
      plantedDate, 
      variety,
      status: "growing",
      yield: 0
    }
  });
});

// Livestock endpoints
app.get("/api/livestock", (req, res) => {
  res.json([
    {
      id: 1,
      species: "Cattle",
      breed: "Holstein",
      count: 25,
      location: "Pasture 1",
      healthStatus: "healthy"
    },
    {
      id: 2,
      species: "Pigs",
      breed: "Large White",
      count: 15,
      location: "Pen 2", 
      healthStatus: "healthy"
    }
  ]);
});

app.post("/api/livestock", (req, res) => {
  const { species, breed, count, location } = req.body;
  
  res.json({
    success: true,
    livestock: {
      id: Date.now(),
      species,
      breed,
      count,
      location,
      healthStatus: "healthy"
    }
  });
});

// Inventory endpoints
app.get("/api/inventory", (req, res) => {
  res.json([
    {
      id: 1,
      item: "Fertilizer NPK",
      category: "Chemicals",
      quantity: 50,
      unit: "kg",
      lastUpdated: "2025-01-10"
    },
    {
      id: 2,
      item: "Seeds - Tomato",
      category: "Seeds",
      quantity: 100,
      unit: "packets",
      lastUpdated: "2025-01-08"
    }
  ]);
});

// Weather endpoint
app.get("/api/weather", (req, res) => {
  res.json({
    location: "Suva, Fiji",
    temperature: 28,
    humidity: 75,
    condition: "Partly Cloudy",
    forecast: "Good weather for farming"
  });
});

// Analytics endpoint
app.get("/api/analytics", (req, res) => {
  res.json({
    totalCrops: 12,
    totalLivestock: 45,
    totalFields: 8,
    monthlyYield: 2.5,
    revenue: 15000,
    costs: 8000,
    profit: 7000
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`[SmartFarm Backend] Server running on port ${PORT}`);
  console.log(`[SmartFarm Backend] Health check: http://localhost:${PORT}/api/health`);
});
