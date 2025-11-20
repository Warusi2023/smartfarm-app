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

// Production origins that should ALWAYS be allowed
const PRODUCTION_ORIGINS = [
  'https://www.smartfarm-app.com',
  'https://smartfarm-app.com',
  'https://smartfarm-app.netlify.app',
  'https://dulcet-sawine-92d6a8.netlify.app'
];

// Dev fallback for local development
const DEV_FALLBACK = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:8080',
  'http://localhost:4173',
];

// Combine all allowed origins
const ALL_ALLOWED_ORIGINS = [...new Set([...ALLOWED, ...PRODUCTION_ORIGINS, ...DEV_FALLBACK])];

const corsOptions = {
  origin(origin, cb) {
    // Allow non-browser tools (curl, server-to-server) with no Origin header
    if (!origin) {
      console.log(`[CORS] ✓ Allowed: No origin header (non-browser request)`);
      return cb(null, true);
    }

    // Check if origin matches allowed list (with wildcard support)
    const allow = ALL_ALLOWED_ORIGINS.some(a => {
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
      console.log(`[CORS] ℹ Allowed origins:`, ALL_ALLOWED_ORIGINS);
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

// --- API Endpoints ---

// Import auth routes with email verification
let AuthRoutes;
let AIAdvisoryRoutes;
let dbPool = null;

try {
  // Try to use production auth routes with email verification
  const { Pool } = require('pg');
  
  // Initialize database connection if DATABASE_URL is available
  if (process.env.DATABASE_URL) {
    dbPool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
      max: 20,
      min: 2,
    });
    
    dbPool.on('error', (err) => {
      console.error('Database connection error:', err);
    });
  }
  
  AuthRoutes = require('./routes/auth');
  const authRoutes = new AuthRoutes(dbPool);
  app.use('/api/auth', authRoutes.getRouter());
  console.log('✅ Auth routes with email verification loaded');
  
  // Load AI Advisory routes
  AIAdvisoryRoutes = require('./routes/ai-advisory');
  const aiAdvisoryRoutes = new AIAdvisoryRoutes();
  app.use('/api/ai-advisory', aiAdvisoryRoutes.getRouter());
  console.log('✅ AI Advisory routes loaded');
} catch (error) {
  console.warn('⚠️ Could not load auth routes, using fallback endpoints:', error.message);
  
  // Fallback auth endpoints (minimal implementation)
  app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Email and password required'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Login successful',
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
    
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
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
}

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

// In-memory storage (replace with database in production)
let livestockStorage = [];
let feedMixesStorage = [];

// Livestock endpoints
app.get('/api/livestock', (req, res) => {
  console.log(`[${new Date().toISOString()}] GET /api/livestock - Origin: ${req.headers.origin}`);
  res.status(200).json({
    success: true,
    data: livestockStorage
  });
});

app.post('/api/livestock', (req, res) => {
  console.log(`[${new Date().toISOString()}] POST /api/livestock - Origin: ${req.headers.origin}`);
  console.log('Request body:', JSON.stringify(req.body, null, 2));
  
  const livestockData = req.body;
  
  // Validate required fields
  if (!livestockData.type || !livestockData.name) {
    console.log('❌ Validation failed: Missing required fields');
    return res.status(400).json({
      success: false,
      error: 'Type and name are required'
    });
  }
  
  // Create new livestock entry
  const newLivestock = {
    id: Date.now(),
    ...livestockData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  livestockStorage.push(newLivestock);
  console.log('✅ Livestock added successfully:', newLivestock.id);
  
  res.status(201).json({
    success: true,
    data: newLivestock
  });
});

app.get('/api/livestock/:id', (req, res) => {
  console.log(`[${new Date().toISOString()}] GET /api/livestock/${req.params.id} - Origin: ${req.headers.origin}`);
  const livestock = livestockStorage.find(l => l.id === parseInt(req.params.id));
  
  if (!livestock) {
    return res.status(404).json({
      success: false,
      error: 'Livestock not found'
    });
  }
  
  res.status(200).json({
    success: true,
    data: livestock
  });
});

app.put('/api/livestock/:id', (req, res) => {
  console.log(`[${new Date().toISOString()}] PUT /api/livestock/${req.params.id} - Origin: ${req.headers.origin}`);
  const index = livestockStorage.findIndex(l => l.id === parseInt(req.params.id));
  
  if (index === -1) {
    return res.status(404).json({
      success: false,
      error: 'Livestock not found'
    });
  }
  
  livestockStorage[index] = {
    ...livestockStorage[index],
    ...req.body,
    updatedAt: new Date().toISOString()
  };
  
  console.log('✅ Livestock updated successfully');
  
  res.status(200).json({
    success: true,
    data: livestockStorage[index]
  });
});

app.delete('/api/livestock/:id', (req, res) => {
  console.log(`[${new Date().toISOString()}] DELETE /api/livestock/${req.params.id} - Origin: ${req.headers.origin}`);
  const index = livestockStorage.findIndex(l => l.id === parseInt(req.params.id));
  
  if (index === -1) {
    return res.status(404).json({
      success: false,
      error: 'Livestock not found'
    });
  }
  
  livestockStorage.splice(index, 1);
  console.log('✅ Livestock deleted successfully');
  
  res.status(200).json({
    success: true,
    message: 'Livestock deleted successfully'
  });
});

app.get('/api/livestock/stats/overview', (req, res) => {
  console.log(`[${new Date().toISOString()}] GET /api/livestock/stats/overview - Origin: ${req.headers.origin}`);
  res.status(200).json({
    success: true,
    data: {
      totalAnimals: livestockStorage.length,
      healthyAnimals: livestockStorage.filter(l => l.healthStatus === 'healthy').length,
      totalValue: livestockStorage.reduce((sum, l) => sum + (l.value || 0), 0)
    }
  });
});

// Feed Mix endpoints
app.get('/api/feed-mixes', (req, res) => {
  console.log(`[${new Date().toISOString()}] GET /api/feed-mixes - Origin: ${req.headers.origin}`);
  res.status(200).json({
    success: true,
    data: feedMixesStorage
  });
});

app.post('/api/feed-mixes', (req, res) => {
  console.log(`[${new Date().toISOString()}] POST /api/feed-mixes - Origin: ${req.headers.origin}`);
  console.log('Request body:', JSON.stringify(req.body, null, 2));
  
  const feedMixData = req.body;
  
  // Validate required fields
  if (!feedMixData.livestockType || !feedMixData.growthStage) {
    console.log('❌ Validation failed: Missing required fields');
    return res.status(400).json({
      success: false,
      error: 'Livestock type and growth stage are required'
    });
  }
  
  // Create new feed mix entry
  const newFeedMix = {
    id: Date.now(),
    ...feedMixData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  feedMixesStorage.push(newFeedMix);
  console.log('✅ Feed mix added successfully:', newFeedMix.id);
  
  res.status(201).json({
    success: true,
    data: newFeedMix
  });
});

app.get('/api/feed-mixes/:id', (req, res) => {
  console.log(`[${new Date().toISOString()}] GET /api/feed-mixes/${req.params.id} - Origin: ${req.headers.origin}`);
  const feedMix = feedMixesStorage.find(f => f.id === parseInt(req.params.id));
  
  if (!feedMix) {
    return res.status(404).json({
      success: false,
      error: 'Feed mix not found'
    });
  }
  
  res.status(200).json({
    success: true,
    data: feedMix
  });
});

app.put('/api/feed-mixes/:id', (req, res) => {
  console.log(`[${new Date().toISOString()}] PUT /api/feed-mixes/${req.params.id} - Origin: ${req.headers.origin}`);
  const index = feedMixesStorage.findIndex(f => f.id === parseInt(req.params.id));
  
  if (index === -1) {
    return res.status(404).json({
      success: false,
      error: 'Feed mix not found'
    });
  }
  
  feedMixesStorage[index] = {
    ...feedMixesStorage[index],
    ...req.body,
    updatedAt: new Date().toISOString()
  };
  
  console.log('✅ Feed mix updated successfully');
  
  res.status(200).json({
    success: true,
    data: feedMixesStorage[index]
  });
});

app.delete('/api/feed-mixes/:id', (req, res) => {
  console.log(`[${new Date().toISOString()}] DELETE /api/feed-mixes/${req.params.id} - Origin: ${req.headers.origin}`);
  const index = feedMixesStorage.findIndex(f => f.id === parseInt(req.params.id));
  
  if (index === -1) {
    return res.status(404).json({
      success: false,
      error: 'Feed mix not found'
    });
  }
  
  feedMixesStorage.splice(index, 1);
  console.log('✅ Feed mix deleted successfully');
  
  res.status(200).json({
    success: true,
    message: 'Feed mix deleted successfully'
  });
});

app.get('/api/livestock/:livestockId/feed-mixes', (req, res) => {
  console.log(`[${new Date().toISOString()}] GET /api/livestock/${req.params.livestockId}/feed-mixes - Origin: ${req.headers.origin}`);
  const livestockFeedMixes = feedMixesStorage.filter(f => f.livestockId === parseInt(req.params.livestockId));
  
  res.status(200).json({
    success: true,
    data: livestockFeedMixes
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
  console.log(`[SmartFarm] 🛡️  Allowed origins (${ALL_ALLOWED_ORIGINS.length}):`, ALL_ALLOWED_ORIGINS);
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

