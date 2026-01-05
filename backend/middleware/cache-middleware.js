/**
 * Cache Middleware for Express Routes
 * Provides caching for read-heavy endpoints with automatic invalidation
 */

const cacheService = require('../utils/cache');
const { CACHE_TTL, CACHE_PATTERNS, generateCacheKey, INVALIDATION_RULES } = require('../config/cache-config');
const logger = require('../utils/logger');

/**
 * Cache middleware for GET requests
 * @param {string} prefix - Cache key prefix
 * @param {number} ttl - Time to live in seconds (optional, uses default if not provided)
 * @param {function} keyGenerator - Optional custom key generator function
 * @returns {function} Express middleware
 */
function cacheMiddleware(prefix, ttl = null, keyGenerator = null) {
    return async (req, res, next) => {
        // Only cache GET requests
        if (req.method !== 'GET') {
            return next();
        }

        // Skip caching for authentication endpoints
        if (req.path.startsWith('/auth') || req.path.includes('login') || req.path.includes('register')) {
            return next();
        }

        // Generate cache key
        const cacheKey = keyGenerator 
            ? keyGenerator(req)
            : generateCacheKey(prefix, req);

        // Try to get from cache
        try {
            const cached = await cacheService.get(cacheKey);
            if (cached) {
                logger.debug('Cache hit', { key: cacheKey, path: req.path });
                return res.json(cached);
            }
        } catch (error) {
            logger.debug('Cache get error', { error: error.message, key: cacheKey });
        }

        // Store original json method
        const originalJson = res.json.bind(res);

        // Override json method to cache response
        res.json = (data) => {
            // Only cache successful responses
            if (res.statusCode === 200 && data && data.success !== false) {
                const cacheTTL = ttl || CACHE_TTL.DEFAULT;
                cacheService.set(cacheKey, data, cacheTTL).catch(err => {
                    logger.debug('Failed to cache response', { error: err.message, key: cacheKey });
                });
            }
            return originalJson(data);
        };

        next();
    };
}

/**
 * Cache invalidation middleware
 * Invalidates cache patterns after POST/PUT/DELETE operations
 * @param {string} operation - Operation name (e.g., 'farms:create')
 * @returns {function} Express middleware
 */
function invalidateCache(operation) {
    return async (req, res, next) => {
        // Wait for response to complete before invalidating
        res.on('finish', async () => {
            // Only invalidate on successful operations
            if (res.statusCode >= 200 && res.statusCode < 300) {
                const patterns = INVALIDATION_RULES[operation] || [];
                
                for (const pattern of patterns) {
                    try {
                        const deleted = await cacheService.deletePattern(pattern);
                        if (deleted > 0) {
                            logger.debug('Cache invalidated', { operation, pattern, count: deleted });
                        }
                    } catch (error) {
                        logger.debug('Cache invalidation error', { error: error.message, pattern });
                    }
                }
            }
        });

        next();
    };
}

/**
 * Manual cache invalidation helper
 * @param {string|array} patterns - Cache pattern(s) to invalidate
 */
async function invalidate(patterns) {
    const patternArray = Array.isArray(patterns) ? patterns : [patterns];
    
    for (const pattern of patternArray) {
        try {
            const deleted = await cacheService.deletePattern(pattern);
            logger.info('Manual cache invalidation', { pattern, count: deleted });
        } catch (error) {
            logger.error('Manual cache invalidation error', { error: error.message, pattern });
        }
    }
}

module.exports = {
    cacheMiddleware,
    invalidateCache,
    invalidate,
    cacheService
};

