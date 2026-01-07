/**
 * SmartFarm Production Backend API
 * Bulletproof CORS + Health Check + Proper Port Binding
 */

const express = require('express');
const cors = require('cors');
const logger = require('./utils/logger');
const { validate } = require('./middleware/validator');
const { cacheMiddleware, invalidateCache } = require('./middleware/cache-middleware');
const { CACHE_TTL } = require('./config/cache-config');
const metricsMiddleware = require('./middleware/metrics-middleware');
const metricsService = require('./utils/metrics');
const HealthCheckService = require('./utils/health-check');
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
      logger.debug('CORS: Allowed - No origin header (non-browser request)');
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
      logger.debug('CORS: Allowed origin', { origin });
      return cb(null, true);
    } else {
      logger.warn('CORS: Blocked origin', { origin, allowedOrigins: ALL_ALLOWED_ORIGINS });
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

// Metrics middleware - track all requests
const metricsMiddleware = require('./middleware/metrics-middleware');
const metricsService = require('./utils/metrics');
const HealthCheckService = require('./utils/health-check');
app.use(metricsMiddleware);

// --- Health & root endpoints ---

// Health check (required by Railway) - includes database status
/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Health check endpoint
 *     description: Returns the health status of the API server
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Service is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                   example: 2024-01-01T00:00:00.000Z
 *                 environment:
 *                   type: string
 *                   example: production
 */
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
app.get('/api/ai-advisory/livestock-health/:animalId', validate('aiAdvisory.livestockHealth'), (req, res) => {
  logger.debug('AI Advisory: Livestock health request', { method: req.method, path: req.path, params: req.params, query: req.query });
  
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
    logger.errorWithContext('Error in livestock health endpoint', { error, path: req.path, params: req.params });
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
app.get('/api/ai-advisory/crop-nutrition/:cropId', validate('aiAdvisory.cropNutrition'), (req, res) => {
  logger.debug('AI Advisory: Request received', { method: req.method, path: req.path, params: req.params, query: req.query });
  
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
    logger.errorWithContext('Error in AI advisory endpoint', { error, path: req.path, params: req.params });
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
  const { getPostgresSSLConfig } = require('./utils/ssl-config');
  
  // Initialize database connection if DATABASE_URL is available
  if (process.env.DATABASE_URL) {
    dbPool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: getPostgresSSLConfig(process.env.DATABASE_URL),
      max: 20,
      min: 2,
    });
    
    dbPool.on('error', (err) => {
      logger.errorWithContext('Database connection error', { error: err });
    });
  }
  
  AuthRoutes = require('./routes/auth');
  const authRoutes = new AuthRoutes(dbPool);
  app.use('/api/auth', authRoutes.getRouter());
  logger.info('Auth routes with email verification loaded');
  
  // Load Subscription routes
  const SubscriptionRoutes = require('./routes/subscriptions');
  const subscriptionRoutes = new SubscriptionRoutes(dbPool);
  app.use('/api/subscriptions', subscriptionRoutes.getRouter());
  logger.info('Subscription routes loaded');
  
  // Load AI Advisory routes
  AIAdvisoryRoutes = require('./routes/ai-advisory');
  const aiAdvisoryRoutes = new AIAdvisoryRoutes();
  app.use('/api/ai-advisory', aiAdvisoryRoutes.getRouter());
  logger.info('AI Advisory routes loaded');
  
  // Load Daily Tips routes
  const DailyTipsRoutes = require('./routes/daily-tips');
  app.use('/api/daily-tips', DailyTipsRoutes);
  
  // Biological Farming routes
  const biologicalFarmingRoutes = require('./routes/biological-farming');
  app.use('/api/biological-farming', biologicalFarmingRoutes);
  logger.info('Daily Tips routes loaded');
  
  // Load Weather Alerts routes (independent of other routes)
  logger.debug('Initializing Weather Alerts routes');
  let weatherAlertsRouter = null;
  try {
    logger.debug('Requiring routes/weather-alerts module');
    const weatherAlertsModule = require('./routes/weather-alerts');
    weatherAlertsRouter = weatherAlertsModule.router;
    const initWeatherAlertsRoutes = weatherAlertsModule.initWeatherAlertsRoutes;
    logger.debug('Routes module loaded successfully');
    
    logger.debug('Requiring services/weatherAlertService module');
    const WeatherAlertService = require('./services/weatherAlertService');
    logger.debug('WeatherAlertService module loaded successfully');
    
    logger.debug('Creating WeatherAlertService instance');
    const weatherAlertService = new WeatherAlertService(dbPool, process.env.WEATHER_API_KEY);
    logger.debug('WeatherAlertService instance created');
    
    logger.debug('Initializing routes with dependencies');
    initWeatherAlertsRoutes(dbPool, weatherAlertService);
    logger.debug('Routes initialized');
    
    logger.debug('Mounting router to /api/weather-alerts');
    app.use('/api/weather-alerts', weatherAlertsRouter);
    logger.info('Weather Alerts routes loaded');
  } catch (weatherError) {
    logger.errorWithContext('Error loading Weather Alerts routes', { error: weatherError });
    // Always mount routes, even if initialization fails
    // Routes will handle database/service unavailability gracefully
    if (weatherAlertsRouter) {
      logger.debug('Mounting weather alerts router despite initialization error');
      app.use('/api/weather-alerts', weatherAlertsRouter);
      logger.info('Weather Alerts routes mounted (with potential service limitations)');
    } else {
      // If router couldn't be loaded, add fallback route
      logger.warn('Weather Alerts router not available, adding fallback route');
      app.use('/api/weather-alerts', (req, res) => {
        res.status(503).json({
          success: false,
          error: 'Weather alerts service is temporarily unavailable',
          message: 'Service initialization failed. Please check server logs.',
          data: []
        });
      });
      logger.info('Weather Alerts fallback route added (503 response)');
    }
  }
  
  // Note: Weather alerts cron job is configured via Railway Cron (not node-cron)
  // See CRON_JOB_CONFIGURATION.md for setup instructions
  
} catch (error) {
  logger.warnWithContext('Could not load auth routes, using fallback endpoints', { error });
  
  // Try to load AI Advisory routes separately (might work even if auth fails)
  try {
    AIAdvisoryRoutes = require('./routes/ai-advisory');
    const aiAdvisoryRoutes = new AIAdvisoryRoutes();
    app.use('/api/ai-advisory', aiAdvisoryRoutes.getRouter());
    logger.info('AI Advisory routes loaded (standalone)');
    
    // Load Daily Tips routes (standalone)
    const DailyTipsRoutes = require('./routes/daily-tips');
    app.use('/api/daily-tips', DailyTipsRoutes);
    
    // Biological Farming routes
    const biologicalFarmingRoutes = require('./routes/biological-farming');
    app.use('/api/biological-farming', biologicalFarmingRoutes);
    logger.info('Daily Tips routes loaded (standalone)');
    
    // Try to load Weather Alerts routes (standalone fallback)
    try {
      logger.debug('Attempting to load Weather Alerts routes (standalone fallback)');
      const { router: weatherAlertsRouter, initWeatherAlertsRoutes } = require('./routes/weather-alerts');
      const WeatherAlertService = require('./services/weatherAlertService');
      const weatherAlertService = new WeatherAlertService(dbPool, process.env.WEATHER_API_KEY);
      initWeatherAlertsRoutes(dbPool, weatherAlertService);
      app.use('/api/weather-alerts', weatherAlertsRouter);
      logger.info('Weather Alerts routes loaded (standalone fallback)');
    } catch (weatherError) {
      logger.errorWithContext('Failed to load Weather Alerts routes (standalone fallback)', { error: weatherError });
      // Add a basic fallback route so the endpoint exists
      app.get('/api/weather-alerts', (req, res) => {
        res.status(503).json({
          success: false,
          error: 'Weather alerts service is temporarily unavailable',
          message: 'Please check server logs for details'
        });
      });
      logger.warn('Weather Alerts fallback route added (503 response)');
    }
  } catch (aiError) {
    logger.warnWithContext('Could not load AI Advisory routes', { error: aiError });
    // Add fallback AI advisory endpoint
    app.get('/api/ai-advisory/crop-nutrition/:cropId', validate('aiAdvisory.cropNutrition'), (req, res) => {
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
  app.post('/api/auth/login', validate('auth.login'), (req, res) => {
    const { email, password } = req.body;
    
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

  app.post('/api/auth/register', validate('auth.register'), (req, res) => {
    const { email, password, firstName, lastName } = req.body;
    
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

  app.post('/api/auth/logout', validate('auth.logout'), (req, res) => {
    res.status(200).json({
      success: true,
      message: 'Logged out successfully'
    });
  });
}

// Farms endpoints
app.get('/api/farms', 
  cacheMiddleware('farms', CACHE_TTL.FARM_LIST, (req) => 
    `farms:user:${req.user?.id || 'anonymous'}`
  ),
  validate('farms.list'), 
  (req, res) => {
  res.status(200).json({
    success: true,
    data: []
  });
});

app.get('/api/farms/stats/overview', validate('farms.stats'), (req, res) => {
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
app.get('/api/crops', 
  cacheMiddleware('crops', CACHE_TTL.CROP_LIST, (req) => 
    `crops:user:${req.user?.id || 'anonymous'}`
  ),
  validate('crops.list'), 
  (req, res) => {
  res.status(200).json({
    success: true,
    data: []
  });
});

app.get('/api/crops/stats/overview', validate('crops.stats'), (req, res) => {
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
app.get('/api/livestock', 
  cacheMiddleware('livestock', CACHE_TTL.LIVESTOCK_LIST, (req) => 
    `livestock:user:${req.user?.id || 'anonymous'}`
  ),
  validate('livestock.list'), 
  (req, res) => {
  logger.debug('GET /api/livestock', { origin: req.headers.origin });
  res.status(200).json({
    success: true,
    data: livestockStorage
  });
});

app.post('/api/livestock', 
  invalidateCache('livestock:create'),
  validate('livestock.create'), 
  (req, res) => {
  logger.debug('POST /api/livestock', { origin: req.headers.origin, body: req.body });
  
  const livestockData = req.body;
  
  // Create new livestock entry
  const newLivestock = {
    id: Date.now(),
    ...livestockData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  livestockStorage.push(newLivestock);
  logger.info('Livestock added successfully', { id: newLivestock.id });
  
  res.status(201).json({
    success: true,
    data: newLivestock
  });
});

app.get('/api/livestock/:id', validate('livestock.getById'), (req, res) => {
  logger.debug('GET /api/livestock/:id', { id: req.params.id, origin: req.headers.origin });
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

app.put('/api/livestock/:id', 
  invalidateCache('livestock:update'),
  validate('livestock.update'), 
  (req, res) => {
  logger.debug('PUT /api/livestock/:id', { id: req.params.id, origin: req.headers.origin });
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
  
  logger.info('Livestock updated successfully', { id: req.params.id });
  
  res.status(200).json({
    success: true,
    data: livestockStorage[index]
  });
});

app.delete('/api/livestock/:id', 
  invalidateCache('livestock:delete'),
  validate('livestock.getById'), 
  (req, res) => {
  logger.debug('DELETE /api/livestock/:id', { id: req.params.id, origin: req.headers.origin });
  const index = livestockStorage.findIndex(l => l.id === parseInt(req.params.id));
  
  if (index === -1) {
    return res.status(404).json({
      success: false,
      error: 'Livestock not found'
    });
  }
  
  livestockStorage.splice(index, 1);
  logger.info('Livestock deleted successfully', { id: req.params.id });
  
  res.status(200).json({
    success: true,
    message: 'Livestock deleted successfully'
  });
});

app.get('/api/livestock/stats/overview', (req, res) => {
  logger.debug('GET /api/livestock/stats/overview', { origin: req.headers.origin });
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
  logger.debug('GET /api/feed-mixes', { origin: req.headers.origin });
  res.status(200).json({
    success: true,
    data: feedMixesStorage
  });
});

app.post('/api/feed-mixes', (req, res) => {
  logger.debug('POST /api/feed-mixes', { origin: req.headers.origin, body: req.body });
  
  const feedMixData = req.body;
  
  // Validate required fields
  if (!feedMixData.livestockType || !feedMixData.growthStage) {
    logger.warn('Validation failed: Missing required fields', { body: req.body });
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
  logger.info('Feed mix added successfully', { id: newFeedMix.id });
  
  res.status(201).json({
    success: true,
    data: newFeedMix
  });
});

app.get('/api/feed-mixes/:id', (req, res) => {
  logger.debug('GET /api/feed-mixes/:id', { id: req.params.id, origin: req.headers.origin });
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
  logger.debug('PUT /api/feed-mixes/:id', { id: req.params.id, origin: req.headers.origin });
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
  
  logger.info('Feed mix updated successfully', { id: req.params.id });
  
  res.status(200).json({
    success: true,
    data: feedMixesStorage[index]
  });
});

app.delete('/api/feed-mixes/:id', (req, res) => {
  logger.debug('DELETE /api/feed-mixes/:id', { id: req.params.id, origin: req.headers.origin });
  const index = feedMixesStorage.findIndex(f => f.id === parseInt(req.params.id));
  
  if (index === -1) {
    return res.status(404).json({
      success: false,
      error: 'Feed mix not found'
    });
  }
  
  feedMixesStorage.splice(index, 1);
  logger.info('Feed mix deleted successfully', { id: req.params.id });
  
  res.status(200).json({
    success: true,
    message: 'Feed mix deleted successfully'
  });
});

app.get('/api/livestock/:livestockId/feed-mixes', (req, res) => {
  logger.debug('GET /api/livestock/:livestockId/feed-mixes', { livestockId: req.params.livestockId, origin: req.headers.origin });
  const livestockFeedMixes = feedMixesStorage.filter(f => f.livestockId === parseInt(req.params.livestockId));
  
  res.status(200).json({
    success: true,
    data: livestockFeedMixes
  });
});

// 404 handler (but check for AI advisory first)
app.use((req, res) => {
  // Log 404s for debugging
  logger.warn('404 Not Found', { method: req.method, path: req.path });
  res.status(404).json({
    success: false,
    error: 'API endpoint not found',
    code: 'NOT_FOUND',
    path: req.path,
    message: `The endpoint ${req.path} does not exist. Available endpoints: /api/health, /api/ai-advisory/crop-nutrition/:cropId`
  });
});

// Metrics endpoint
/**
 * @swagger
 * /api/metrics:
 *   get:
 *     summary: Get application metrics
 *     description: Returns request metrics, error rates, and latency statistics. Supports JSON and Prometheus formats.
 *     tags: [Health]
 *     parameters:
 *       - in: query
 *         name: format
 *         schema:
 *           type: string
 *           enum: [json, prometheus]
 *           default: json
 *         description: Output format
 *     responses:
 *       200:
 *         description: Metrics data
 */
app.get('/api/metrics', (req, res) => {
    const format = req.query.format || 'json';
    
    if (format === 'prometheus') {
        res.set('Content-Type', 'text/plain');
        res.send(metricsService.getPrometheusMetrics());
    } else {
        res.json({
            overall: metricsService.getOverallMetrics(),
            endpoints: metricsService.getRequestMetrics(),
            timestamp: new Date().toISOString()
        });
    }
});

// Additional health check endpoints
let healthCheckService = null;

app.get('/api/health/detailed', async (req, res) => {
    if (!healthCheckService) {
        healthCheckService = new HealthCheckService(dbPool);
    }
    
    const health = await healthCheckService.getDetailedHealth();
    const statusCode = health.status === 'healthy' ? 200 : 503;
    res.status(statusCode).json(health);
});

app.get('/api/health/ready', async (req, res) => {
    if (!healthCheckService) {
        healthCheckService = new HealthCheckService(dbPool);
    }
    
    const readiness = await healthCheckService.getReadiness();
    const statusCode = readiness.ready ? 200 : 503;
    res.status(statusCode).json(readiness);
});

app.get('/api/health/live', (req, res) => {
    if (!healthCheckService) {
        healthCheckService = new HealthCheckService(dbPool);
    }
    
    const liveness = healthCheckService.getLiveness();
    res.json(liveness);
});

// Swagger/OpenAPI Documentation
if (process.env.NODE_ENV !== 'production' || process.env.ENABLE_SWAGGER === 'true') {
    const swaggerUi = require('swagger-ui-express');
    const { swaggerSpec } = require('./config/swagger');
    
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
        customCss: '.swagger-ui .topbar { display: none }',
        customSiteTitle: 'SmartFarm API Documentation'
    }));
    
    logger.info('Swagger documentation available at /api-docs');
}

// 404 Not Found handler (must be before error handler)
const { notFoundHandler, errorHandler } = require('./middleware/error-handler');
app.use(notFoundHandler);

// Global error handler (must be last)
app.use(errorHandler);

// --- Robust server start (bind 0.0.0.0 and PORT) ---
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, '0.0.0.0', () => {
  logger.info('SmartFarm API Server Started', {
    environment: process.env.NODE_ENV || 'development',
    port: PORT,
    healthCheck: `http://localhost:${PORT}/api/health`,
    allowedOriginsCount: ALL_ALLOWED_ORIGINS.length,
    allowedOrigins: ALL_ALLOWED_ORIGINS
  });
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    logger.error('Port already in use', { port: PORT, error: err });
    logger.error('Solutions:', {
      solution1: `Stop the other process using port ${PORT}`,
      solution2: `Use a different port: PORT=3001 npm run dev`,
      solution3: `Find and kill the process: Windows: netstat -ano | findstr :${PORT}, Mac/Linux: lsof -ti:${PORT} | xargs kill -9`
    });
    process.exit(1);
  } else {
    logger.errorWithContext('Server error', { error: err });
    process.exit(1);
  }
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  server.close(() => {
    logger.info('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully');
  server.close(() => {
    logger.info('Server closed');
    process.exit(0);
  });
});

module.exports = app;

