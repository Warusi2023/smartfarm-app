/**
 * Health Check Service
 * Provides comprehensive health check functionality
 */

const logger = require('./logger');

class HealthCheckService {
    constructor(dbPool = null) {
        this.dbPool = dbPool;
        this.startTime = Date.now();
        this.checks = {
            database: null,
            cache: null,
            memory: null
        };
    }

    /**
     * Check database connectivity
     * @returns {Promise<Object>} Database health status
     */
    async checkDatabase() {
        if (!this.dbPool) {
            return {
                status: 'unknown',
                message: 'Database pool not configured'
            };
        }

        try {
            const startTime = Date.now();
            const result = await this.dbPool.query('SELECT NOW() as current_time, version() as version');
            const latency = Date.now() - startTime;

            return {
                status: 'healthy',
                latency: `${latency}ms`,
                version: result.rows[0]?.version?.split(' ')[0] || 'unknown',
                pool: {
                    total: this.dbPool.totalCount || 0,
                    idle: this.dbPool.idleCount || 0,
                    waiting: this.dbPool.waitingCount || 0
                }
            };
        } catch (error) {
            logger.errorWithContext('Database health check failed', { error });
            return {
                status: 'unhealthy',
                error: error.message
            };
        }
    }

    /**
     * Check cache status
     * @returns {Promise<Object>} Cache health status
     */
    async checkCache() {
        try {
            const cacheService = require('./cache');
            const stats = cacheService.getStats();

            return {
                status: stats.redisEnabled || stats.useMemoryCache ? 'healthy' : 'disabled',
                redis: stats.redisEnabled,
                memoryCache: stats.useMemoryCache,
                memoryCacheSize: stats.memoryCacheSize
            };
        } catch (error) {
            logger.errorWithContext('Cache health check failed', { error });
            return {
                status: 'unhealthy',
                error: error.message
            };
        }
    }

    /**
     * Check memory usage
     * @returns {Object} Memory health status
     */
    checkMemory() {
        const usage = process.memoryUsage();
        const totalMemory = usage.heapTotal;
        const usedMemory = usage.heapUsed;
        const freeMemory = totalMemory - usedMemory;
        const memoryUsagePercent = (usedMemory / totalMemory) * 100;

        return {
            status: memoryUsagePercent > 90 ? 'warning' : 'healthy',
            heapTotal: `${(totalMemory / 1024 / 1024).toFixed(2)} MB`,
            heapUsed: `${(usedMemory / 1024 / 1024).toFixed(2)} MB`,
            heapFree: `${(freeMemory / 1024 / 1024).toFixed(2)} MB`,
            usagePercent: memoryUsagePercent.toFixed(2)
        };
    }

    /**
     * Get basic health status
     * @returns {Object} Basic health status
     */
    getBasicHealth() {
        return {
            status: 'ok',
            timestamp: new Date().toISOString(),
            environment: process.env.NODE_ENV || 'development',
            version: '1.0.0',
            uptime: {
                seconds: Math.floor((Date.now() - this.startTime) / 1000),
                formatted: this.formatUptime(Date.now() - this.startTime)
            }
        };
    }

    /**
     * Get detailed health status
     * @returns {Promise<Object>} Detailed health status
     */
    async getDetailedHealth() {
        const [database, cache, memory] = await Promise.all([
            this.checkDatabase(),
            this.checkCache(),
            Promise.resolve(this.checkMemory())
        ]);

        const allHealthy = 
            database.status === 'healthy' || database.status === 'unknown' &&
            cache.status === 'healthy' || cache.status === 'disabled' &&
            memory.status === 'healthy' || memory.status === 'warning';

        return {
            status: allHealthy ? 'healthy' : 'degraded',
            timestamp: new Date().toISOString(),
            environment: process.env.NODE_ENV || 'development',
            version: '1.0.0',
            uptime: {
                seconds: Math.floor((Date.now() - this.startTime) / 1000),
                formatted: this.formatUptime(Date.now() - this.startTime)
            },
            checks: {
                database,
                cache,
                memory
            }
        };
    }

    /**
     * Check if service is ready (liveness probe)
     * @returns {Object} Readiness status
     */
    async getReadiness() {
        const database = await this.checkDatabase();
        const isReady = database.status === 'healthy' || database.status === 'unknown';

        return {
            ready: isReady,
            timestamp: new Date().toISOString(),
            checks: {
                database: database.status
            }
        };
    }

    /**
     * Check if service is alive (liveness probe)
     * @returns {Object} Liveness status
     */
    getLiveness() {
        return {
            alive: true,
            timestamp: new Date().toISOString()
        };
    }

    /**
     * Format uptime
     * @param {number} ms - Milliseconds
     * @returns {string} Formatted uptime
     */
    formatUptime(ms) {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        
        if (days > 0) return `${days}d ${hours % 24}h ${minutes % 60}m`;
        if (hours > 0) return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
        if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
        return `${seconds}s`;
    }
}

module.exports = HealthCheckService;

