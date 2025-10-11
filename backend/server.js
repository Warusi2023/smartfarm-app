/**
 * SmartFarm Production Backend API
 * Bulletproof CORS + Health Check + Proper Port Binding
 */

const express = require('express');
const cors = require('cors');
const app = express();

// --- CORS SETUP (bulletproof origin handling) ---
const rawOrigins = process.env.ALLOWED_ORIGINS || '';
const ALLOWED = rawOrigins
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

// Dev fallback for local development
const DEV_FALLBACK = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:8080',
  'http://localhost:4173',
];

const corsOptions = {
  origin(origin, cb) {
    // Allow non-browser tools (curl, server-to-server) with no Origin header
    if (!origin) return cb(null, true);

    // Check if origin matches allowed list (with wildcard support)
    const allow = ALLOWED.some(a => {
      if (a.includes('*')) {
        const re = new RegExp('^' + a.replace(/\./g, '\\.').replace(/\*/g, '.*') + '$');
        return re.test(origin);
      }
      return a === origin;
    }) || DEV_FALLBACK.some(a => {
      if (a.includes('*')) {
        const re = new RegExp('^' + a.replace(/\./g, '\\.').replace(/\*/g, '.*') + '$');
        return re.test(origin);
      }
      return a === origin;
    });

    if (allow) {
      console.log(`[CORS] ✓ Allowed origin: ${origin}`);
      return cb(null, true);
    } else {
      console.log(`[CORS] ✗ Blocked origin: ${origin}`);
      return cb(new Error(`CORS blocked: ${origin}`));
    }
  },
  credentials: false,         // set to true only if using cookies/auth
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  exposedHeaders: ['Content-Length', 'Content-Type'],
  maxAge: 86400, // 24 hours
};

// Apply CORS middleware
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // proper preflight handling

// --- JSON body, other middleware ---
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// --- Health & root endpoints ---

// Health check (required by Railway)
app.get('/api/health', (req, res) => {
  res.status(200).json({
    ok: true,
    service: 'SmartFarm',
    ts: Date.now(),
    env: process.env.NODE_ENV || 'development'
  });
});

// Root endpoint for quick probes
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'SmartFarm API online',
    version: '1.0.0',
    health: '/api/health'
  });
});

// --- API Endpoints (minimal implementation) ---

// Auth endpoints
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: 'Email and password required'
    });
  }
  
  // TODO: Implement real authentication
  res.status(200).json({
    success: true,
    data: {
      token: 'demo-token-' + Date.now(),
      user: {
        email,
        name: email.split('@')[0],
        id: 'demo-user-1'
      }
    }
  });
});

app.post('/api/auth/register', (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  
  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({
      success: false,
      error: 'All fields required'
    });
  }
  
  // TODO: Implement real registration
  res.status(201).json({
    success: true,
    data: {
      user: {
        email,
        firstName,
        lastName,
        id: 'demo-user-' + Date.now()
      }
    }
  });
});

app.post('/api/auth/logout', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Logged out successfully'
  });
});

// Farms endpoints
app.get('/api/farms', (req, res) => {
  res.status(200).json({
    success: true,
    data: []
  });
});

app.get('/api/farms/stats/overview', (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      totalFarms: 0,
      totalArea: 0,
      activeProjects: 0
    }
  });
});

// Crops endpoints
app.get('/api/crops', (req, res) => {
  res.status(200).json({
    success: true,
    data: []
  });
});

app.get('/api/crops/stats/overview', (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      totalCrops: 0,
      healthyCrops: 0,
      harvestReady: 0
    }
  });
});

// Livestock endpoints
app.get('/api/livestock', (req, res) => {
  res.status(200).json({
    success: true,
    data: []
  });
});

app.get('/api/livestock/stats/overview', (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      totalAnimals: 0,
      healthyAnimals: 0,
      totalValue: 0
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    path: req.path
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('[ERROR]', err);
  res.status(err.status || 500).json({
    success: false,
    error: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message
  });
});

// --- Robust server start (bind 0.0.0.0 and PORT) ---
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log('========================================');
  console.log(`[SmartFarm] 🚀 API Server Started`);
  console.log('========================================');
  console.log(`[SmartFarm] 📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`[SmartFarm] 🌐 Listening on: 0.0.0.0:${PORT}`);
  console.log(`[SmartFarm] 🔗 Health check: http://localhost:${PORT}/api/health`);
  console.log(`[SmartFarm] 🛡️  Allowed origins:`, ALLOWED.length > 0 ? ALLOWED : DEV_FALLBACK);
  console.log('========================================');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('[SmartFarm] SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('[SmartFarm] Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('[SmartFarm] SIGINT received, shutting down gracefully');
  server.close(() => {
    console.log('[SmartFarm] Server closed');
    process.exit(0);
  });
});

module.exports = app;

