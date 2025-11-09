/**
 * SmartFarm Simple Production Server
 * Minimal server for Railway deployment
 */

const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, '../public');
const CATALOG_PATH = path.join(PUBLIC_DIR, 'data/catalog.json');
const FARM_PROFILE_PATH = path.join(PUBLIC_DIR, 'data/farm-profile.json');
let cachedCatalog = null;
let cachedCatalogMtime = 0;
let cachedFarmProfile = null;
let cachedFarmProfileMtime = 0;

/** Allow only known web origins */
const ALLOWED_ORIGINS = new Set([
    'https://www.smartfarm-app.com',                      // your Netlify/custom domain (PRIMARY)
    'https://smartfarm-app.com',                          // your Netlify/custom domain (no www)
    'https://smartfarm-app.netlify.app',                  // Netlify preview
    'https://smartfarm-app-production.up.railway.app',    // default Railway domain (if used)
    'https://smartfarm-backend.railway.app',              // if you use this domain for API
    'https://railway.com',                                // Railway's own domain (required)
    'https://www.railway.com',                            // Railway's www domain
    'https://railway.app',                                // Railway app domain
    'http://localhost:3000',                              // local dev
    'http://localhost:8080',                              // local dev
    'http://localhost:4173',                              // local dev (vite preview)
]);

// Add custom origins from environment
if (process.env.CORS_ORIGINS) {
    const customOrigins = process.env.CORS_ORIGINS.split(',').map(s => s.trim());
    customOrigins.forEach(origin => ALLOWED_ORIGINS.add(origin));
}

// BULLETPROOF CORS - Set headers on EVERY response
app.use((req, res, next) => {
    const origin = req.headers.origin;
    
    // Determine allowed origin
    let allowedOrigin;
    if (origin && ALLOWED_ORIGINS.has(origin)) {
        // If origin is in our allowed list, use it
        allowedOrigin = origin;
    } else if (origin && origin.includes('smartfarm-app')) {
        // If origin contains smartfarm-app, allow it (for various domains)
        allowedOrigin = origin;
    } else {
        // Default fallback to primary domain - but check if it's a smartfarm domain
        if (origin && origin.includes('smartfarm')) {
            allowedOrigin = origin; // Allow any smartfarm domain
        } else {
            allowedOrigin = 'https://www.smartfarm-app.com';
        }
    }
    
    // Set CORS headers IMMEDIATELY (before any processing)
    res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin, X-Auth-Token, X-API-Key');
    res.setHeader('Access-Control-Expose-Headers', 'Content-Length, Content-Type, X-Total-Count');
    res.setHeader('Access-Control-Max-Age', '86400'); // 24 hours
    res.setHeader('Vary', 'Origin');
    
    // Log CORS info for debugging (only in development)
    if (process.env.NODE_ENV !== 'production' || process.env.DEBUG_CORS === 'true') {
        console.log(`[CORS] ${req.method} ${req.path} - Origin: ${origin || 'none'} - Allowed: ${allowedOrigin}`);
    }
    
    // Handle preflight OPTIONS requests immediately
    if (req.method === 'OPTIONS') {
        console.log('[CORS] Preflight request handled successfully');
        return res.status(204).end();
    }
    
    next();
});

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.static(PUBLIC_DIR));

function readCatalog() {
    try {
        const stats = fs.statSync(CATALOG_PATH);
        if (!cachedCatalog || stats.mtimeMs !== cachedCatalogMtime) {
            cachedCatalog = JSON.parse(fs.readFileSync(CATALOG_PATH, 'utf8'));
            cachedCatalogMtime = stats.mtimeMs;
        }
        return cachedCatalog;
    } catch (error) {
        console.error('Failed to read catalog.json:', error);
        return null;
    }
}

function readFarmProfile() {
    try {
        const stats = fs.statSync(FARM_PROFILE_PATH);
        if (!cachedFarmProfile || stats.mtimeMs !== cachedFarmProfileMtime) {
            cachedFarmProfile = JSON.parse(fs.readFileSync(FARM_PROFILE_PATH, 'utf8'));
            cachedFarmProfileMtime = stats.mtimeMs;
        }
        return cachedFarmProfile;
    } catch (_err) {
        return {};
    }
}

// --- Catalog API (reads static JSON) ---
app.get('/api/catalog', (req, res) => {
    const catalog = readCatalog();
    if (!catalog) {
        return res.status(500).json({ error: 'CATALOG_READ_FAILED' });
    }

    const { group, q, category, limit = 50, offset = 0 } = req.query;
    let items = catalog.items || [];

    if (group) {
        const groupValue = String(group).toLowerCase();
        items = items.filter(item => (item.group || '').toLowerCase() === groupValue);
    }

    if (category) {
        const categoryNeedle = String(category).toLowerCase();
        items = items.filter(item => (item.category || '').toLowerCase().includes(categoryNeedle));
    }

    if (q) {
        const needle = String(q).toLowerCase();
        items = items.filter(item => {
            const nameMatch = (item.name || '').toLowerCase().includes(needle);
            const sciMatch = (item.scientificName || '').toLowerCase().includes(needle);
            const tagMatch = (item.tags || []).some(tag => tag.toLowerCase().includes(needle));
            return nameMatch || sciMatch || tagMatch;
        });
    }

    const start = Number(offset) || 0;
    const end = start + (Number(limit) || 50);
    const paged = items.slice(start, end);

    res.json({
        count: items.length,
        items: paged,
    });
});

function toArray(value) {
    if (!value) return [];
    if (Array.isArray(value)) return value;
    return String(value)
        .split(/[,/|;]/)
        .map(s => s.trim())
        .filter(Boolean);
}

function normalize(str) {
    return String(str || '').trim().toLowerCase();
}

function scoreItem(item, context) {
    let score = 0;
    const reasons = [];

    const itemClimates = toArray(item.climate).map(normalize);
    const itemSoils = toArray(item.soil).map(normalize);
    const itemEnv = normalize(item.environment);

    // Climate match
    if (context.climate && itemClimates.length) {
        if (itemClimates.includes(context.climate)) {
            score += 3;
            reasons.push('Climate fit');
        }
    }

    // Soil match
    if (context.soil && itemSoils.length) {
        if (itemSoils.includes(context.soil)) {
            score += 2;
            reasons.push('Soil fit');
        }
    }

    // Water compatibility (for aquaculture / livestock)
    if (context.water) {
        if (context.water === 'river' && itemEnv === 'freshwater') {
            score += 2;
            reasons.push('Freshwater compatible');
        } else if (context.water === 'coastal' && itemEnv === 'marine') {
            score += 2;
            reasons.push('Marine compatible');
        } else if (context.water === 'pond' && (itemEnv === 'freshwater' || itemEnv === 'brackish')) {
            score += 1.5;
            reasons.push('Suitable for pond systems');
        }
    }

    const duration = Number(item.growthDurationDays || 0);
    const yieldPerAcre = Number(item.yieldKgPerAcre || 0);
    const pricePerKg = Number(item.marketPriceFJDPerKg || 0);

    if (context.goals.includes('quick-harvest') && duration > 0 && duration <= 100) {
        score += 2;
        reasons.push('Quick harvest');
    }

    if (context.goals.includes('high-yield') && yieldPerAcre) {
        score += Math.min(yieldPerAcre / 1500, 3); // cap contribution
        reasons.push('High yield potential');
    }

    if (context.goals.includes('high-value') && pricePerKg) {
        score += Math.min(pricePerKg / 2, 3);
        reasons.push('High market value');
    }

    if (context.goals.includes('low-cost') && item.nitrogenFixer) {
        score += 1.5;
        reasons.push('Nitrogen fixer (lower input)');
    }

    if (!context.goals.length && (yieldPerAcre || pricePerKg)) {
        score += 1;
    }

    return { score, reasons, duration, yieldPerAcre, pricePerKg };
}

app.get('/api/recommend', (req, res) => {
    try {
        const catalog = readCatalog();
        if (!catalog) {
            return res.status(500).json({ error: 'CATALOG_UNAVAILABLE' });
        }

        const profile = readFarmProfile();

        const climate = normalize(req.query.climate || profile.climate);
        const soil = normalize(req.query.soil || profile.soil);
        const water = normalize(req.query.water || profile.waterAccess);
        const landSizeAcres = Number(req.query.landSizeAcres || profile.landSizeAcres || 1);

        const goalsRaw =
            req.query.goal ||
            req.query.goals ||
            (Array.isArray(profile.goals) ? profile.goals.join(',') : '');
        const goals = toArray(goalsRaw).map(normalize);

        const groupFilter = normalize(req.query.group);

        const context = { climate, soil, water, landSizeAcres, goals };

        const items = (catalog.items || []).filter(item => {
            if (!groupFilter) return true;
            return normalize(item.group) === groupFilter;
        });

        const scored = items
            .map(item => {
                const { score, reasons, duration, yieldPerAcre, pricePerKg } = scoreItem(item, context);
                if (score <= 0) return null;

                const estimatedYieldKg = yieldPerAcre ? Math.round(yieldPerAcre * landSizeAcres) : null;
                const estimatedValueFJD =
                    estimatedYieldKg && pricePerKg ? Number((estimatedYieldKg * pricePerKg).toFixed(2)) : null;

                const plan = {
                    timelineDays: duration || null,
                    inputs: {
                        fertilizerOrFeed: item.feedRequirements || item.fertilizerRequirements || null,
                        waterQuality: item.waterQuality || null,
                        soil: item.soil || null,
                    },
                    estimatedYieldKg,
                    estimatedValueFJD,
                    warnings: item.commonDiseases || [],
                    preventiveActions: item.preventiveActions || [],
                };

                const summary = {
                    name: item.name,
                    group: item.group,
                    category: item.category,
                    subCategory: item.subCategory || null,
                    scientificName: item.scientificName || null,
                    tags: item.tags || [],
                };

                return {
                    item: summary,
                    score: Number(score.toFixed(3)),
                    reasons,
                    plan,
                };
            })
            .filter(Boolean)
            .sort((a, b) => b.score - a.score)
            .slice(0, 20);

        res.json({
            query: {
                climate: climate || null,
                soil: soil || null,
                water: water || null,
                goals,
                landSizeAcres,
                group: groupFilter || null,
            },
            results: scored,
        });
    } catch (error) {
        console.error('Failed to generate recommendations:', error);
        res.status(500).json({ error: 'RECOMMEND_FAILED' });
    }
});

/** Fast health for Railway */
app.get('/api/health', (_req, res) => {
    res.json({ ok: true, service: 'SmartFarm', ts: Date.now() });
});

// Basic API endpoints
app.get('/api', (req, res) => {
    res.json({
        message: 'SmartFarm API is running!',
        version: process.env.API_VERSION || 'v1',
        environment: process.env.NODE_ENV || 'production'
    });
});

// Authentication endpoints (basic implementation)
app.post('/api/auth/register', (req, res) => {
    const { email, password, firstName, lastName } = req.body;
    
    if (!email || !password || !firstName || !lastName) {
        return res.status(400).json({
            success: false,
            error: 'Missing required fields',
            code: 'MISSING_FIELDS'
        });
    }
    
    // Mock successful registration
    res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: {
            user: {
                id: 'user_' + Date.now(),
                email: email,
                firstName: firstName,
                lastName: lastName,
                role: 'farmer'
            },
            token: 'mock-jwt-token-' + Date.now()
        }
    });
});

app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            error: 'Email and password are required',
            code: 'MISSING_CREDENTIALS'
        });
    }
    
    // Mock successful login
    res.json({
        success: true,
        message: 'Login successful',
        data: {
            user: {
                id: 'user_123',
                email: email,
                firstName: 'Test',
                lastName: 'User',
                role: 'farmer'
            },
            token: 'mock-jwt-token-' + Date.now()
        }
    });
});

// Social login verification endpoints
app.post('/api/auth/verify-google', (req, res) => {
    const { credential } = req.body;
    
    if (!credential) {
        return res.status(400).json({
            success: false,
            error: 'Google credential is required',
            code: 'MISSING_CREDENTIAL'
        });
    }
    
    try {
        // In a real app, you'd verify the JWT token with Google's servers
        // For demo purposes, we'll decode it and return user info
        const payload = JSON.parse(Buffer.from(credential.split('.')[1], 'base64').toString());
        
        const user = {
            email: payload.email,
            firstName: payload.given_name,
            lastName: payload.family_name,
            picture: payload.picture,
            provider: 'google',
            googleId: payload.sub
        };
        
        const token = 'google-jwt-' + Date.now();
        
        res.status(200).json({
            success: true,
            message: 'Google login successful',
            data: {
                user,
                token
            }
        });
    } catch (error) {
        console.error('Google token verification error:', error);
        res.status(400).json({
            success: false,
            error: 'Invalid Google credential',
            code: 'INVALID_CREDENTIAL'
        });
    }
});

app.post('/api/auth/verify-facebook', (req, res) => {
    const { accessToken } = req.body;
    
    if (!accessToken) {
        return res.status(400).json({
            success: false,
            error: 'Facebook access token is required',
            code: 'MISSING_TOKEN'
        });
    }
    
    try {
        // In a real app, you'd verify the access token with Facebook's Graph API
        // For demo purposes, we'll simulate a successful verification
        const user = {
            email: 'demo@facebook.com',
            firstName: 'Demo',
            lastName: 'User',
            picture: 'https://via.placeholder.com/100x100/1877f2/ffffff?text=F',
            provider: 'facebook',
            facebookId: 'demo-facebook-id'
        };
        
        const token = 'facebook-jwt-' + Date.now();
        
        res.status(200).json({
            success: true,
            message: 'Facebook login successful',
            data: {
                user,
                token
            }
        });
    } catch (error) {
        console.error('Facebook token verification error:', error);
        res.status(400).json({
            success: false,
            error: 'Invalid Facebook access token',
            code: 'INVALID_TOKEN'
        });
    }
});

// Protected routes (basic implementation)
app.get('/api/farms', (req, res) => {
    res.json({
        success: true,
        message: 'Farms endpoint - authentication required',
        data: []
    });
});

app.get('/api/crops', (req, res) => {
    res.json({
        success: true,
        message: 'Crops endpoint - authentication required',
        data: []
    });
});

app.get('/api/livestock', (req, res) => {
    res.json({
        success: true,
        message: 'Livestock endpoint - authentication required',
        data: []
    });
});

// 404 handler
app.use('/api/*', (req, res) => {
    res.status(404).json({
        success: false,
        error: 'API endpoint not found',
        code: 'NOT_FOUND',
        path: req.path
    });
});

// Global error handler (ensure CORS headers even on errors)
app.use((err, req, res, next) => {
    console.error('Error:', err);
    
    // Ensure CORS headers are set even on error responses
    const origin = req.headers.origin;
    let allowedOrigin;
    if (origin && ALLOWED_ORIGINS.has(origin)) {
        allowedOrigin = origin;
    } else if (origin && origin.includes('smartfarm-app')) {
        allowedOrigin = origin;
    } else {
        allowedOrigin = 'https://www.smartfarm-app.com';
    }
    
    res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin, X-Auth-Token, X-API-Key');
    res.setHeader('Vary', 'Origin');
    
    res.status(err.status || 500).json({
        success: false,
        error: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message,
        code: 'INTERNAL_ERROR'
    });
});

// Start server
const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 SmartFarm API server running on port ${PORT}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV || 'production'}`);
    console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
    console.log(`🌐 CORS Origins: ${Array.from(ALLOWED_ORIGINS).join(', ')}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    server.close(() => {
        console.log('Process terminated');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down gracefully');
    server.close(() => {
        console.log('Process terminated');
        process.exit(0);
    });
});

module.exports = { app, server };
