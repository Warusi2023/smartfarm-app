/**
 * Caching Utility for SmartFarm API
 * Supports both Redis (production) and in-memory (development/fallback)
 * Provides TTL-based caching with explicit invalidation rules
 */

const logger = require('./logger');

class CacheService {
    constructor() {
        this.redisClient = null;
        this.memoryCache = new Map(); // In-memory fallback
        this.cacheEnabled = false;
        this.useMemoryCache = true; // Always enable memory cache as fallback
        this.initializeRedis();
    }

    /**
     * Initialize Redis client if available
     */
    async initializeRedis() {
        try {
            if (process.env.REDIS_URL) {
                const redis = require('redis');
                this.redisClient = redis.createClient({
                    url: process.env.REDIS_URL,
                    socket: {
                        reconnectStrategy: (retries) => {
                            if (retries > 10) {
                                logger.warn('Redis connection failed after 10 retries, using memory cache');
                                return false;
                            }
                            return Math.min(retries * 100, 3000);
                        }
                    }
                });

                this.redisClient.on('error', (err) => {
                    logger.warn('Redis error, falling back to memory cache', { error: err.message });
                    this.cacheEnabled = false;
                });

                this.redisClient.on('connect', () => {
                    logger.info('Redis cache connected');
                    this.cacheEnabled = true;
                });

                await this.redisClient.connect();
            } else {
                logger.info('Redis URL not configured, using in-memory cache');
            }
        } catch (error) {
            logger.warn('Redis initialization failed, using memory cache', { error: error.message });
            this.cacheEnabled = false;
        }
    }

    /**
     * Get cached value
     * @param {string} key - Cache key
     * @returns {Promise<Object|null>} Cached value or null
     */
    async get(key) {
        // Try Redis first if available
        if (this.cacheEnabled && this.redisClient) {
            try {
                const value = await this.redisClient.get(key);
                if (value) {
                    return JSON.parse(value);
                }
            } catch (error) {
                logger.debug('Redis get error, trying memory cache', { error: error.message });
            }
        }

        // Fallback to memory cache
        if (this.useMemoryCache && this.memoryCache.has(key)) {
            const cached = this.memoryCache.get(key);
            // Check if expired
            if (cached.expiresAt > Date.now()) {
                return cached.value;
            } else {
                // Remove expired entry
                this.memoryCache.delete(key);
            }
        }

        return null;
    }

    /**
     * Set cached value
     * @param {string} key - Cache key
     * @param {Object} value - Value to cache
     * @param {number} ttl - Time to live in seconds
     */
    async set(key, value, ttl = 3600) {
        // Set in Redis if available
        if (this.cacheEnabled && this.redisClient) {
            try {
                await this.redisClient.setEx(key, ttl, JSON.stringify(value));
            } catch (error) {
                logger.debug('Redis set error, using memory cache', { error: error.message });
            }
        }

        // Always set in memory cache as fallback
        if (this.useMemoryCache) {
            this.memoryCache.set(key, {
                value: value,
                expiresAt: Date.now() + (ttl * 1000)
            });
        }
    }

    /**
     * Delete cached value
     * @param {string} key - Cache key
     */
    async delete(key) {
        // Delete from Redis
        if (this.cacheEnabled && this.redisClient) {
            try {
                await this.redisClient.del(key);
            } catch (error) {
                logger.debug('Redis delete error', { error: error.message });
            }
        }

        // Delete from memory cache
        if (this.useMemoryCache) {
            this.memoryCache.delete(key);
        }
    }

    /**
     * Delete cached values by pattern
     * @param {string} pattern - Pattern to match (e.g., 'weather-alerts:*')
     */
    async deletePattern(pattern) {
        const deleted = [];

        // Delete from Redis
        if (this.cacheEnabled && this.redisClient) {
            try {
                const keys = await this.redisClient.keys(pattern);
                if (keys.length > 0) {
                    await this.redisClient.del(keys);
                    deleted.push(...keys);
                }
            } catch (error) {
                logger.debug('Redis delete pattern error', { error: error.message });
            }
        }

        // Delete from memory cache
        if (this.useMemoryCache) {
            const regex = new RegExp('^' + pattern.replace(/\*/g, '.*') + '$');
            for (const key of this.memoryCache.keys()) {
                if (regex.test(key)) {
                    this.memoryCache.delete(key);
                    deleted.push(key);
                }
            }
        }

        if (deleted.length > 0) {
            logger.debug('Cache invalidated', { pattern, count: deleted.length });
        }

        return deleted.length;
    }

    /**
     * Clear all cache
     */
    async clear() {
        // Clear Redis
        if (this.cacheEnabled && this.redisClient) {
            try {
                await this.redisClient.flushAll();
            } catch (error) {
                logger.debug('Redis clear error', { error: error.message });
            }
        }

        // Clear memory cache
        if (this.useMemoryCache) {
            this.memoryCache.clear();
        }

        logger.info('Cache cleared');
    }

    /**
     * Get cache statistics
     */
    getStats() {
        return {
            redisEnabled: this.cacheEnabled && this.redisClient !== null,
            memoryCacheSize: this.useMemoryCache ? this.memoryCache.size : 0,
            useMemoryCache: this.useMemoryCache
        };
    }
}

// Singleton instance
const cacheService = new CacheService();

module.exports = cacheService;

