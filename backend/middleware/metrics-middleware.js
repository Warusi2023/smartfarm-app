/**
 * Metrics Middleware
 * Tracks request-level metrics, latency, and errors
 */

const metricsService = require('../utils/metrics');
const logger = require('../utils/logger');

/**
 * Middleware to track request metrics
 */
function metricsMiddleware(req, res, next) {
    const startTime = Date.now();
    const path = req.path;
    const method = req.method;
    
    // Track response finish
    res.on('finish', () => {
        const latency = Date.now() - startTime;
        const statusCode = res.statusCode;
        const isError = statusCode >= 400;
        
        // Record metrics
        metricsService.recordRequest(path, method, statusCode, latency, isError);
        
        // Log request with context
        logger.debug('Request completed', {
            method,
            path,
            statusCode,
            latency,
            isError
        });
    });
    
    next();
}

module.exports = metricsMiddleware;

