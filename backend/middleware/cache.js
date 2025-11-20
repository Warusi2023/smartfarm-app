/**
 * Caching Middleware for SmartFarm API
 * Provides Redis caching layer for improved performance
 * Falls back gracefully if Redis is not available
 */

class CacheMiddleware {
    constructor() {
        this.redisClient = null;
        this.cacheEnabled = false;
        this.initializeRedis();
    }

    /**
     * Initialize Redis client if available
     */
    async initializeRedis() {
        try {
            // Check if Redis URL is configured
            if (process.env.REDIS_URL) {
                const redis = require('redis');
                this.redisClient = redis.createClient({
                    url: process.env.REDIS_URL,
                    socket: {
                        reconnectStrategy: (retries) => {
                            if (retries > 10) {
                                console.log('Redis connection failed after 10 retries, continuing without cache');
                                return false; // Stop retrying
                            }
                            return Math.min(retries * 100, 3000); // Exponential backoff
                        }
                    }
                });

                this.redisClient.on('error', (err) => {
                    console.warn('Redis error:', err.message);
                    this.cacheEnabled = false;
                });

                this.redisClient.on('connect', () => {
                    console.log('✅ Redis cache connected');
                    this.cacheEnabled = true;
                });

                await this.redisClient.connect();
            } else {
                console.log('⚠️ Redis URL not configured, caching disabled');
            }
        } catch (error) {
            console.warn('⚠️ Redis initialization failed, continuing without cache:', error.message);
            this.cacheEnabled = false;
        }
    }

    /**
     * Get cached value
     * @param {String} key - Cache key
     * @returns {Promise<Object|null>} Cached value or null
     */
    async get(key) {
        if (!this.cacheEnabled || !this.redisClient) {
            return null;
        }

        try {
            const value = await this.redisClient.get(key);
            return value ? JSON.parse(value) : null;
        } catch (error) {
            console.warn('Cache get error:', error.message);
            return null;
        }
    }

    /**
     * Set cached value
     * @param {String} key - Cache key
     * @param {Object} value - Value to cache
     * @param {Number} ttl - Time to live in seconds (default: 3600 = 1 hour)
     */
    async set(key, value, ttl = 3600) {
        if (!this.cacheEnabled || !this.redisClient) {
            return;
        }

        try {
            await this.redisClient.setEx(key, ttl, JSON.stringify(value));
        } catch (error) {
            console.warn('Cache set error:', error.message);
        }
    }

    /**
     * Delete cached value
     * @param {String} key - Cache key
     */
    async delete(key) {
        if (!this.cacheEnabled || !this.redisClient) {
            return;
        }

        try {
            await this.redisClient.del(key);
        } catch (error) {
            console.warn('Cache delete error:', error.message);
        }
    }

    /**
     * Delete cached values by pattern
     * @param {String} pattern - Pattern to match (e.g., 'farms:*')
     */
    async deletePattern(pattern) {
        if (!this.cacheEnabled || !this.redisClient) {
            return;
        }

        try {
            const keys = await this.redisClient.keys(pattern);
            if (keys.length > 0) {
                await this.redisClient.del(keys);
            }
        } catch (error) {
            console.warn('Cache delete pattern error:', error.message);
        }
    }

    /**
     * Middleware to cache GET requests
     * @param {Number} ttl - Cache TTL in seconds
     * @param {Function} keyGenerator - Optional function to generate cache key
     */
    cache(ttl = 3600, keyGenerator = null) {
        return async (req, res, next) => {
            // Only cache GET requests
            if (req.method !== 'GET') {
                return next();
            }

            // Generate cache key
            const cacheKey = keyGenerator 
                ? keyGenerator(req)
                : `cache:${req.path}:${JSON.stringify(req.query)}:${req.user?.id || 'anonymous'}`;

            // Try to get from cache
            const cached = await this.get(cacheKey);
            if (cached) {
                return res.json(cached);
            }

            // Store original json method
            const originalJson = res.json.bind(res);

            // Override json method to cache response
            res.json = (data) => {
                // Cache successful responses
                if (res.statusCode === 200 && data.success !== false) {
                    this.set(cacheKey, data, ttl).catch(err => {
                        console.warn('Failed to cache response:', err.message);
                    });
                }
                return originalJson(data);
            };

            next();
        };
    }

    /**
     * Invalidate cache for a specific pattern
     * Useful after POST/PUT/DELETE operations
     */
    invalidate(pattern) {
        return async (req, res, next) => {
            // Wait for response to complete
            res.on('finish', async () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    await this.deletePattern(pattern);
                }
            });
            next();
        };
    }
}

module.exports = CacheMiddleware;

