/**
 * Metrics Collection Service
 * Tracks request-level metrics, error rates, and latency
 */

const logger = require('./logger');

class MetricsService {
    constructor() {
        // Request metrics
        this.requestCounts = new Map(); // path -> count
        this.requestLatencies = new Map(); // path -> [latencies]
        this.errorCounts = new Map(); // path -> error count
        this.statusCodeCounts = new Map(); // statusCode -> count
        
        // System metrics
        this.startTime = Date.now();
        this.totalRequests = 0;
        this.totalErrors = 0;
        
        // Reset metrics periodically (every hour)
        this.resetInterval = setInterval(() => {
            this.resetMetrics();
        }, 60 * 60 * 1000);
    }

    /**
     * Record a request
     * @param {string} path - Request path
     * @param {string} method - HTTP method
     * @param {number} statusCode - Response status code
     * @param {number} latency - Response time in milliseconds
     * @param {boolean} isError - Whether this was an error response
     */
    recordRequest(path, method, statusCode, latency, isError = false) {
        const key = `${method} ${path}`;
        
        // Increment request count
        this.requestCounts.set(key, (this.requestCounts.get(key) || 0) + 1);
        this.totalRequests++;
        
        // Record latency
        if (!this.requestLatencies.has(key)) {
            this.requestLatencies.set(key, []);
        }
        const latencies = this.requestLatencies.get(key);
        latencies.push(latency);
        
        // Keep only last 1000 latencies per endpoint
        if (latencies.length > 1000) {
            latencies.shift();
        }
        
        // Record status code
        this.statusCodeCounts.set(
            statusCode, 
            (this.statusCodeCounts.get(statusCode) || 0) + 1
        );
        
        // Record errors
        if (isError || statusCode >= 400) {
            this.errorCounts.set(key, (this.errorCounts.get(key) || 0) + 1);
            this.totalErrors++;
        }
        
        // Log slow requests
        if (latency > 2000) {
            logger.warn('Slow request detected', {
                path,
                method,
                latency,
                statusCode
            });
        }
    }

    /**
     * Get request metrics for a specific path
     * @param {string} path - Request path (optional)
     * @returns {Object} Metrics for the path or all paths
     */
    getRequestMetrics(path = null) {
        const metrics = {};
        
        if (path) {
            const key = path;
            const count = this.requestCounts.get(key) || 0;
            const errors = this.errorCounts.get(key) || 0;
            const latencies = this.requestLatencies.get(key) || [];
            
            metrics[path] = {
                count,
                errors,
                errorRate: count > 0 ? (errors / count) * 100 : 0,
                latency: this.calculateLatencyStats(latencies)
            };
        } else {
            // Get all metrics
            for (const [key, count] of this.requestCounts.entries()) {
                const errors = this.errorCounts.get(key) || 0;
                const latencies = this.requestLatencies.get(key) || [];
                
                metrics[key] = {
                    count,
                    errors,
                    errorRate: count > 0 ? (errors / count) * 100 : 0,
                    latency: this.calculateLatencyStats(latencies)
                };
            }
        }
        
        return metrics;
    }

    /**
     * Calculate latency statistics
     * @param {Array<number>} latencies - Array of latency values
     * @returns {Object} Latency statistics
     */
    calculateLatencyStats(latencies) {
        if (latencies.length === 0) {
            return {
                min: 0,
                max: 0,
                avg: 0,
                p50: 0,
                p95: 0,
                p99: 0
            };
        }
        
        const sorted = [...latencies].sort((a, b) => a - b);
        const sum = sorted.reduce((a, b) => a + b, 0);
        
        return {
            min: sorted[0],
            max: sorted[sorted.length - 1],
            avg: sum / sorted.length,
            p50: this.percentile(sorted, 50),
            p95: this.percentile(sorted, 95),
            p99: this.percentile(sorted, 99)
        };
    }

    /**
     * Calculate percentile
     * @param {Array<number>} sorted - Sorted array
     * @param {number} p - Percentile (0-100)
     * @returns {number} Percentile value
     */
    percentile(sorted, p) {
        if (sorted.length === 0) return 0;
        const index = Math.ceil((p / 100) * sorted.length) - 1;
        return sorted[Math.max(0, index)];
    }

    /**
     * Get overall metrics
     * @returns {Object} Overall metrics
     */
    getOverallMetrics() {
        const uptime = Date.now() - this.startTime;
        const errorRate = this.totalRequests > 0 
            ? (this.totalErrors / this.totalRequests) * 100 
            : 0;
        
        // Calculate overall latency stats
        const allLatencies = [];
        for (const latencies of this.requestLatencies.values()) {
            allLatencies.push(...latencies);
        }
        
        return {
            uptime: {
                seconds: Math.floor(uptime / 1000),
                formatted: this.formatUptime(uptime)
            },
            requests: {
                total: this.totalRequests,
                errors: this.totalErrors,
                errorRate: errorRate.toFixed(2)
            },
            latency: this.calculateLatencyStats(allLatencies),
            statusCodes: Object.fromEntries(this.statusCodeCounts)
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

    /**
     * Reset metrics (keeps totals)
     */
    resetMetrics() {
        logger.info('Resetting metrics', {
            totalRequests: this.totalRequests,
            totalErrors: this.totalErrors
        });
        
        this.requestCounts.clear();
        this.requestLatencies.clear();
        this.errorCounts.clear();
        this.statusCodeCounts.clear();
    }

    /**
     * Get metrics in Prometheus format
     * @returns {string} Prometheus metrics format
     */
    getPrometheusMetrics() {
        const lines = [];
        
        // Overall metrics
        lines.push(`# HELP http_requests_total Total number of HTTP requests`);
        lines.push(`# TYPE http_requests_total counter`);
        lines.push(`http_requests_total ${this.totalRequests}`);
        
        lines.push(`# HELP http_errors_total Total number of HTTP errors`);
        lines.push(`# TYPE http_errors_total counter`);
        lines.push(`http_errors_total ${this.totalErrors}`);
        
        // Per-endpoint metrics
        for (const [endpoint, metrics] of Object.entries(this.getRequestMetrics())) {
            const [method, path] = endpoint.split(' ', 2);
            const safePath = path.replace(/[^a-zA-Z0-9_/]/g, '_');
            
            lines.push(`# HELP http_request_duration_seconds Request duration in seconds`);
            lines.push(`# TYPE http_request_duration_seconds histogram`);
            lines.push(`http_request_duration_seconds{method="${method}",path="${safePath}",quantile="0.5"} ${metrics.latency.p50 / 1000}`);
            lines.push(`http_request_duration_seconds{method="${method}",path="${safePath}",quantile="0.95"} ${metrics.latency.p95 / 1000}`);
            lines.push(`http_request_duration_seconds{method="${method}",path="${safePath}",quantile="0.99"} ${metrics.latency.p99 / 1000}`);
            
            lines.push(`# HELP http_requests_count Total requests per endpoint`);
            lines.push(`# TYPE http_requests_count counter`);
            lines.push(`http_requests_count{method="${method}",path="${safePath}"} ${metrics.count}`);
            
            lines.push(`# HELP http_errors_count Total errors per endpoint`);
            lines.push(`# TYPE http_errors_count counter`);
            lines.push(`http_errors_count{method="${method}",path="${safePath}"} ${metrics.errors}`);
        }
        
        return lines.join('\n');
    }

    /**
     * Cleanup
     */
    destroy() {
        if (this.resetInterval) {
            clearInterval(this.resetInterval);
        }
    }
}

// Singleton instance
const metricsService = new MetricsService();

module.exports = metricsService;

