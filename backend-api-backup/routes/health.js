const express = require('express');
const router = express.Router();
const db = require('../database/init');
const logger = require('../lib/logger');

// Health check endpoint
router.get('/', async (req, res) => {
    const startTime = Date.now();
    const healthCheck = {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development',
        version: process.env.npm_package_version || '1.0.0',
        checks: {}
    };

    try {
        // Database connectivity check
        const dbStartTime = Date.now();
        await db.get('SELECT 1');
        const dbDuration = Date.now() - dbStartTime;
        
        healthCheck.checks.database = {
            status: 'healthy',
            responseTime: `${dbDuration}ms`,
            connection: 'active'
        };

        // Memory usage check
        const memoryUsage = process.memoryUsage();
        healthCheck.checks.memory = {
            status: memoryUsage.heapUsed / memoryUsage.heapTotal < 0.9 ? 'healthy' : 'warning',
            heapUsed: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)}MB`,
            heapTotal: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)}MB`,
            external: `${Math.round(memoryUsage.external / 1024 / 1024)}MB`
        };

        // CPU usage check (simplified)
        const cpuUsage = process.cpuUsage();
        healthCheck.checks.cpu = {
            status: 'healthy',
            userTime: `${cpuUsage.user / 1000}ms`,
            systemTime: `${cpuUsage.system / 1000}ms`
        };

        // Disk space check (if available)
        try {
            const fs = require('fs');
            const stats = fs.statSync(process.cwd());
            healthCheck.checks.disk = {
                status: 'healthy',
                accessible: true
            };
        } catch (error) {
            healthCheck.checks.disk = {
                status: 'warning',
                accessible: false,
                error: error.message
            };
        }

        // Overall health status
        const allHealthy = Object.values(healthCheck.checks).every(check => check.status === 'healthy');
        healthCheck.status = allHealthy ? 'healthy' : 'degraded';

        const totalDuration = Date.now() - startTime;
        healthCheck.responseTime = `${totalDuration}ms`;

        // Log health check
        logger.healthCheck(healthCheck.status, {
            responseTime: totalDuration,
            checks: Object.keys(healthCheck.checks).length
        });

        const statusCode = allHealthy ? 200 : 503;
        res.status(statusCode).json({
            success: true,
            data: healthCheck
        });

    } catch (error) {
        logger.logError(error, { context: 'health-check' });
        
        healthCheck.status = 'unhealthy';
        healthCheck.checks.database = {
            status: 'unhealthy',
            error: error.message
        };

        res.status(503).json({
            success: false,
            error: 'Health check failed',
            data: healthCheck
        });
    }
});

// Detailed health check
router.get('/detailed', async (req, res) => {
    const startTime = Date.now();
    
    try {
        const detailedCheck = {
            status: 'healthy',
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            environment: process.env.NODE_ENV || 'development',
            version: process.env.npm_package_version || '1.0.0',
            nodeVersion: process.version,
            platform: process.platform,
            arch: process.arch,
            pid: process.pid,
            checks: {}
        };

        // Database detailed check
        const dbStartTime = Date.now();
        const dbResult = await db.get('SELECT COUNT(*) as count FROM users');
        const dbDuration = Date.now() - dbStartTime;
        
        detailedCheck.checks.database = {
            status: 'healthy',
            responseTime: `${dbDuration}ms`,
            connection: 'active',
            userCount: dbResult.count
        };

        // Memory detailed check
        const memoryUsage = process.memoryUsage();
        detailedCheck.checks.memory = {
            status: memoryUsage.heapUsed / memoryUsage.heapTotal < 0.9 ? 'healthy' : 'warning',
            heapUsed: memoryUsage.heapUsed,
            heapTotal: memoryUsage.heapTotal,
            external: memoryUsage.external,
            rss: memoryUsage.rss,
            arrayBuffers: memoryUsage.arrayBuffers
        };

        // System resources
        detailedCheck.checks.system = {
            loadAverage: require('os').loadavg(),
            freeMemory: require('os').freemem(),
            totalMemory: require('os').totalmem(),
            cpuCount: require('os').cpus().length
        };

        // Environment variables check
        const requiredEnvVars = ['JWT_SECRET', 'DATABASE_URL', 'NODE_ENV'];
        detailedCheck.checks.environment = {
            status: 'healthy',
            required: requiredEnvVars.map(varName => ({
                name: varName,
                set: !!process.env[varName]
            }))
        };

        const totalDuration = Date.now() - startTime;
        detailedCheck.responseTime = `${totalDuration}ms`;

        logger.healthCheck('detailed', {
            responseTime: totalDuration,
            checks: Object.keys(detailedCheck.checks).length
        });

        res.json({
            success: true,
            data: detailedCheck
        });

    } catch (error) {
        logger.logError(error, { context: 'detailed-health-check' });
        
        res.status(500).json({
            success: false,
            error: 'Detailed health check failed',
            details: error.message
        });
    }
});

// Readiness check (for Kubernetes)
router.get('/ready', async (req, res) => {
    try {
        // Check if database is accessible
        await db.get('SELECT 1');
        
        // Check if required environment variables are set
        const requiredVars = ['JWT_SECRET', 'DATABASE_URL'];
        const missingVars = requiredVars.filter(varName => !process.env[varName]);
        
        if (missingVars.length > 0) {
            return res.status(503).json({
                success: false,
                error: 'Service not ready',
                missingEnvironmentVariables: missingVars
            });
        }

        res.json({
            success: true,
            status: 'ready',
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        logger.logError(error, { context: 'readiness-check' });
        
        res.status(503).json({
            success: false,
            error: 'Service not ready',
            details: error.message
        });
    }
});

// Liveness check (for Kubernetes)
router.get('/live', (req, res) => {
    res.json({
        success: true,
        status: 'alive',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

module.exports = router;
