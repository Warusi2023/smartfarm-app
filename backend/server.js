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

// Health check (required by Railway) - includes database status
app.get('/api/health', async (req, res) => {
  const health = {
    ok: true,
    service: 'SmartFarm',
    ts: Date.now(),
    env: process.env.NODE_ENV || 'development',
    version: '1.0.0',
    endpoints: {
      aiAdvisory: '/api/ai-advisory/crop-nutrition/:cropId'
    },
    database: {
      connected: false,
      poolSize: 0,
      hasEnvVar: !!process.env.DATABASE_URL
    }
  };

  // Check database connection if pool exists
  if (dbPool) {
    try {
      const result = await dbPool.query('SELECT NOW(), version()');
      health.database.connected = true;
      health.database.poolSize = dbPool.totalCount || 0;
      health.database.timestamp = result.rows[0].now;
      health.database.version = result.rows[0].version.split(' ')[0] + ' ' + result.rows[0].version.split(' ')[1];
    } catch (error) {
      health.database.error = error.message;
      health.ok = false; // Mark as unhealthy if DB fails
    }
  } else {
    health.database.error = 'Database pool not initialized';
  }

  const statusCode = health.ok ? 200 : 503;
  res.status(statusCode).json(health);
});

// Test endpoint to verify AI advisory is available
app.get('/api/ai-advisory/test', (req, res) => {
  res.json({
    success: true,
    message: 'AI Advisory endpoint is working!',
    timestamp: new Date().toISOString(),
    endpoints: {
      cropNutrition: '/api/ai-advisory/crop-nutrition/:cropId',
      livestockHealth: '/api/ai-advisory/livestock-health/:animalId'
    }
  });
});

// Add Livestock Health Advice endpoint directly (always available)
app.get('/api/ai-advisory/livestock-health/:animalId', (req, res) => {
  console.log(`[AI Advisory] Livestock health request: ${req.method} ${req.path}`);
  console.log(`[AI Advisory] Params:`, req.params);
  console.log(`[AI Advisory] Query:`, req.query);
  
  try {
    const { animalId } = req.params;
    const animalType = req.query.type || 'Cattle';
    const breed = req.query.breed || 'Mixed';
    const age = parseInt(req.query.age) || 12;
    const healthStatus = req.query.healthStatus || 'healthy';
    
    // Generate AI health recommendations
    const recommendations = {
      healthStatus: healthStatus,
      nutrition: {
        feedType: 'Balanced feed mix',
        dailyAmount: '2-3% of body weight',
        frequency: '2-3 times daily',
        supplements: ['Mineral salt', 'Calcium supplement'],
        notes: 'Ensure access to clean water at all times'
      },
      vaccinations: {
        nextVaccination: 'In 3 months',
        recommended: ['Annual health check', 'Deworming every 6 months'],
        critical: 'Keep vaccination records up to date'
      },
      healthChecks: {
        frequency: 'Monthly',
        checks: ['Body condition score', 'Hoof health', 'Coat condition', 'Appetite'],
        signs: 'Watch for changes in behavior, appetite, or appearance'
      },
      warnings: [],
      tips: [
        'Provide adequate shelter from extreme weather',
        'Ensure proper ventilation in housing',
        'Monitor feed quality and storage',
        'Keep detailed health records',
        'Quarantine new animals before introducing to herd'
      ]
    };
    
    // Add warnings based on health status
    if (healthStatus !== 'healthy') {
      recommendations.warnings.push({
        type: 'critical',
        message: 'Animal requires immediate veterinary attention',
        impact: 'Delayed treatment can worsen condition'
      });
    }
    
    recommendations.warnings.push({
      type: 'info',
      message: 'Maintain clean living environment',
      impact: 'Prevents disease spread'
    });
    
    // Adjust recommendations based on animal type and age
    if (animalType.toLowerCase().includes('cattle') || animalType.toLowerCase().includes('cow')) {
      recommendations.nutrition.feedType = 'Cattle feed mix with hay';
      recommendations.nutrition.supplements.push('Salt lick', 'Mineral block');
    } else if (animalType.toLowerCase().includes('pig') || animalType.toLowerCase().includes('swine')) {
      recommendations.nutrition.feedType = 'Swine feed mix';
      recommendations.nutrition.supplements.push('Vitamin D supplement');
    } else if (animalType.toLowerCase().includes('chicken') || animalType.toLowerCase().includes('poultry')) {
      recommendations.nutrition.feedType = 'Poultry feed';
      recommendations.nutrition.dailyAmount = '100-150g per bird';
      recommendations.healthChecks.frequency = 'Weekly';
    }
    
    // Age-specific recommendations
    if (age < 6) {
      recommendations.nutrition.notes = 'Young animal - requires higher protein feed';
      recommendations.vaccinations.recommended.push('Age-appropriate vaccinations');
    } else if (age > 60) {
      recommendations.nutrition.notes = 'Senior animal - may require specialized diet';
      recommendations.healthChecks.frequency = 'Bi-weekly';
      recommendations.healthChecks.checks.push('Joint health', 'Dental check');
    }
    
    res.json({
      success: true,
      message: 'AI health advice generated successfully',
      data: recommendations
    });
  } catch (error) {
    console.error('Error in livestock health endpoint:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate health advice',
      code: 'AI_ADVICE_ERROR'
    });
  }
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

// Add AI Advisory endpoint directly (always available, even if routes fail)
app.get('/api/ai-advisory/crop-nutrition/:cropId', (req, res) => {
  console.log(`[AI Advisory] Request received: ${req.method} ${req.path}`);
  console.log(`[AI Advisory] Params:`, req.params);
  console.log(`[AI Advisory] Query:`, req.query);
  
  try {
    const { cropId } = req.params;
    const cropName = req.query.name || 'Crop';
    const growthStage = req.query.growthStage || req.query.status || 'vegetative';
    
    // Generate basic AI recommendations
    const recommendations = {
      growthStage: growthStage,
      nutrients: {
        nitrogen: { value: 50, unit: 'kg/ha', priority: 'high' },
        phosphorus: { value: 30, unit: 'kg/ha', priority: 'medium' },
        potassium: { value: 40, unit: 'kg/ha', priority: 'high' },
        calcium: { value: 20, unit: 'kg/ha', priority: 'low' },
        magnesium: { value: 15, unit: 'kg/ha', priority: 'low' }
      },
      fertilizer: [{
        name: 'Balanced Fertilizer (NPK 15-15-15)',
        amount: '100-150 kg/ha',
        application: 'Apply every 2-3 weeks',
        reason: 'Supports healthy vegetative growth'
      }],
      watering: {
        frequency: 'Every 1-2 days',
        amount: '2-3 cm',
        timing: 'Early morning',
        method: 'Drip irrigation recommended'
      },
      timing: {
        nextFertilization: 'In 2 weeks',
        nextWatering: 'Today',
        criticalPeriod: 'Current stage'
      },
      tips: [
        'Test soil before applying fertilizers to avoid over-fertilization',
        'Use organic compost to improve soil structure and nutrient retention',
        'Apply fertilizers in split doses rather than all at once',
        'Water deeply but less frequently to encourage deep root growth'
      ],
      warnings: [{
        type: 'info',
        message: 'Monitor soil pH regularly (optimal: 6.0-7.0)',
        impact: 'Affects nutrient availability'
      }]
    };
    
    // Adjust based on growth stage
    if (growthStage === 'seedling' || growthStage === 'early') {
      recommendations.nutrients.phosphorus.value = 40;
      recommendations.fertilizer[0].name = 'Starter Fertilizer (NPK 10-20-10)';
      recommendations.fertilizer[0].amount = '50-75 kg/ha';
      recommendations.fertilizer[0].application = 'Apply at planting or 1 week after';
    } else if (growthStage === 'flowering' || growthStage === 'bloom') {
      recommendations.nutrients.phosphorus.value = 50;
      recommendations.nutrients.potassium.value = 60;
      recommendations.fertilizer[0].name = 'High Phosphorus Fertilizer (NPK 10-30-20)';
      recommendations.fertilizer[0].amount = '75-100 kg/ha';
    } else if (growthStage === 'fruiting' || growthStage === 'fruit') {
      recommendations.nutrients.potassium.value = 70;
      recommendations.fertilizer[0].name = 'High Potassium Fertilizer (NPK 5-15-30)';
      recommendations.fertilizer[0].amount = '50-75 kg/ha';
    }
    
    res.json({
      success: true,
      message: 'AI nutrition advice generated successfully',
      data: recommendations
    });
  } catch (error) {
    console.error('Error in AI advisory endpoint:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate AI advice',
      code: 'AI_ADVICE_ERROR'
    });
  }
});

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
  
  // Load Subscription routes
  const SubscriptionRoutes = require('./routes/subscriptions');
  const subscriptionRoutes = new SubscriptionRoutes(dbPool);
  app.use('/api/subscriptions', subscriptionRoutes.router);
  console.log('✅ Subscription routes loaded');
  
  // Load AI Advisory routes
  AIAdvisoryRoutes = require('./routes/ai-advisory');
  const aiAdvisoryRoutes = new AIAdvisoryRoutes();
  app.use('/api/ai-advisory', aiAdvisoryRoutes.getRouter());
  console.log('✅ AI Advisory routes loaded');
  
  // Load Daily Tips routes
  const DailyTipsRoutes = require('./routes/daily-tips');
  app.use('/api/daily-tips', DailyTipsRoutes);
  console.log('✅ Daily Tips routes loaded');
  
  // Load Weather Alerts routes (independent of other routes)
  console.log('🔍 Initializing Weather Alerts routes...');
  try {
    console.log('  → Requiring routes/weather-alerts module...');
    const { router: weatherAlertsRouter, initWeatherAlertsRoutes } = require('./routes/weather-alerts');
    console.log('  → Routes module loaded successfully');
    
    console.log('  → Requiring services/weatherAlertService module...');
    const WeatherAlertService = require('./services/weatherAlertService');
    console.log('  → WeatherAlertService module loaded successfully');
    
    console.log('  → Creating WeatherAlertService instance...');
    const weatherAlertService = new WeatherAlertService(dbPool, process.env.WEATHER_API_KEY);
    console.log('  → WeatherAlertService instance created');
    
    console.log('  → Initializing routes with dependencies...');
    initWeatherAlertsRoutes(dbPool, weatherAlertService);
    console.log('  → Routes initialized');
    
    console.log('  → Mounting router to /api/weather-alerts...');
    app.use('/api/weather-alerts', weatherAlertsRouter);
    console.log('✅ Weather Alerts routes loaded (after app.use)');
  } catch (weatherError) {
    console.error('❌ Error loading Weather Alerts routes:', weatherError.message);
    console.error('❌ Weather Alerts error stack:', weatherError.stack);
    // Don't re-throw - let other routes continue loading
    console.warn('⚠️ Weather Alerts routes will be skipped, but other routes will continue');
  }
  
  // Note: Weather alerts cron job is configured via Railway Cron (not node-cron)
  // See CRON_JOB_CONFIGURATION.md for setup instructions
  
} catch (error) {
  console.warn('⚠️ Could not load auth routes, using fallback endpoints:', error.message);
  console.error('Full error:', error);
  console.error('Error stack:', error.stack);
  
  // Try to load AI Advisory routes separately (might work even if auth fails)
  try {
    AIAdvisoryRoutes = require('./routes/ai-advisory');
    const aiAdvisoryRoutes = new AIAdvisoryRoutes();
    app.use('/api/ai-advisory', aiAdvisoryRoutes.getRouter());
    console.log('✅ AI Advisory routes loaded (standalone)');
    
    // Load Daily Tips routes (standalone)
    const DailyTipsRoutes = require('./routes/daily-tips');
    app.use('/api/daily-tips', DailyTipsRoutes);
    console.log('✅ Daily Tips routes loaded (standalone)');
    
    // Try to load Weather Alerts routes (standalone fallback)
    try {
      console.log('🔍 Attempting to load Weather Alerts routes (standalone fallback)...');
      const { router: weatherAlertsRouter, initWeatherAlertsRoutes } = require('./routes/weather-alerts');
      const WeatherAlertService = require('./services/weatherAlertService');
      const weatherAlertService = new WeatherAlertService(dbPool, process.env.WEATHER_API_KEY);
      initWeatherAlertsRoutes(dbPool, weatherAlertService);
      app.use('/api/weather-alerts', weatherAlertsRouter);
      console.log('✅ Weather Alerts routes loaded (standalone fallback)');
    } catch (weatherError) {
      console.error('❌ Failed to load Weather Alerts routes (standalone fallback):', weatherError.message);
      console.error('Weather Alerts error stack:', weatherError.stack);
      // Add a basic fallback route so the endpoint exists
      app.get('/api/weather-alerts', (req, res) => {
        res.status(503).json({
          success: false,
          error: 'Weather alerts service is temporarily unavailable',
          message: 'Please check server logs for details'
        });
      });
      console.log('⚠️ Weather Alerts fallback route added (503 response)');
    }
  } catch (aiError) {
    console.warn('⚠️ Could not load AI Advisory routes:', aiError.message);
    // Add fallback AI advisory endpoint
    app.get('/api/ai-advisory/crop-nutrition/:cropId', (req, res) => {
      const { cropId } = req.params;
      res.json({
        success: true,
        message: 'AI nutrition advice (fallback mode)',
        data: {
          growthStage: req.query.growthStage || 'vegetative',
          nutrients: {
            nitrogen: { value: 50, unit: 'kg/ha', priority: 'high' },
            phosphorus: { value: 30, unit: 'kg/ha', priority: 'medium' },
            potassium: { value: 40, unit: 'kg/ha', priority: 'high' }
          },
          fertilizer: [{
            name: 'Balanced Fertilizer (NPK 15-15-15)',
            amount: '100-150 kg/ha',
            application: 'Apply every 2-3 weeks',
            reason: 'Supports healthy growth'
          }],
          watering: {
            frequency: 'Every 1-2 days',
            amount: '2-3 cm',
            timing: 'Early morning',
            method: 'Drip irrigation recommended'
          },
          tips: [
            'Test soil before applying fertilizers',
            'Use organic compost to improve soil structure',
            'Apply fertilizers in split doses'
          ],
          warnings: [{
            type: 'info',
            message: 'Monitor soil pH regularly (optimal: 6.0-7.0)',
            impact: 'Affects nutrient availability'
          }]
        }
      });
    });
  }
  
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

// 404 handler (but check for AI advisory first)
app.use((req, res) => {
  // Log 404s for debugging
  console.log(`[404] ${req.method} ${req.path} - Not found`);
  res.status(404).json({
    success: false,
    error: 'API endpoint not found',
    code: 'NOT_FOUND',
    path: req.path,
    message: `The endpoint ${req.path} does not exist. Available endpoints: /api/health, /api/ai-advisory/crop-nutrition/:cropId`
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
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n❌ Port ${PORT} is already in use!`);
    console.error('\n📋 Solutions:');
    console.error(`1. Stop the other process using port ${PORT}`);
    console.error(`2. Use a different port: PORT=3001 npm run dev`);
    console.error(`3. Find and kill the process:`);
    console.error(`   Windows: netstat -ano | findstr :${PORT}`);
    console.error(`   Then: taskkill /PID <PID> /F`);
    console.error(`   Mac/Linux: lsof -ti:${PORT} | xargs kill -9\n`);
    process.exit(1);
  } else {
    console.error('❌ Server error:', err);
    process.exit(1);
  }
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

