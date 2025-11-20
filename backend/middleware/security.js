/**
 * Security Middleware for SmartFarm
 * Comprehensive security hardening including brute-force protection, IP throttling, and anomaly detection
 */

const rateLimit = require('express-rate-limit');
const { RateLimiterMemory } = require('rate-limiter-flexible');

class SecurityMiddleware {
    constructor() {
        this.bruteForceAttempts = new Map(); // Track failed login attempts
        this.suspiciousIPs = new Map(); // Track suspicious IPs
        this.requestPatterns = new Map(); // Track request patterns for anomaly detection
        
        // Brute-force protection: 5 failed attempts = 15 min lockout
        this.bruteForceLimiter = new RateLimiterMemory({
            points: 5, // 5 attempts
            duration: 900, // 15 minutes
            blockDuration: 900, // Block for 15 minutes
        });

        // IP throttling for suspicious activity
        this.ipThrottler = new RateLimiterMemory({
            points: 100, // 100 requests
            duration: 60, // per minute
            blockDuration: 3600, // Block for 1 hour if exceeded
        });

        // Anomaly detection: Track unusual request patterns
        this.anomalyThreshold = {
            requestsPerMinute: 200,
            errorRate: 0.5, // 50% error rate triggers alert
            suspiciousPaths: ['/api/auth/login', '/api/auth/register', '/api/admin'],
        };
    }

    /**
     * Brute-force protection middleware
     * Incremental lockout with CAPTCHA requirement after 3 failed attempts
     */
    bruteForceProtection() {
        return async (req, res, next) => {
            const identifier = req.body.email || req.body.username || req.ip;
            const key = `bruteforce:${identifier}`;

            try {
                await this.bruteForceLimiter.consume(key);
                next();
            } catch (rejRes) {
                const remainingAttempts = rejRes.remainingPoints;
                const retryAfter = Math.ceil(rejRes.msBeforeNext / 1000);

                // After 3 failed attempts, require CAPTCHA
                if (remainingAttempts <= 2) {
                    return res.status(429).json({
                        success: false,
                        error: 'Too many failed login attempts',
                        code: 'BRUTE_FORCE_PROTECTION',
                        captchaRequired: true,
                        retryAfter: retryAfter,
                        message: 'Please complete CAPTCHA to continue'
                    });
                }

                return res.status(429).json({
                    success: false,
                    error: 'Too many failed login attempts',
                    code: 'BRUTE_FORCE_PROTECTION',
                    retryAfter: retryAfter,
                    remainingAttempts: remainingAttempts
                });
            }
        };
    }

    /**
     * Reset brute-force counter on successful login
     */
    resetBruteForceCounter(identifier) {
        const key = `bruteforce:${identifier}`;
        this.bruteForceLimiter.delete(key);
    }

    /**
     * IP-based throttling for suspicious activity
     */
    ipThrottling() {
        return async (req, res, next) => {
            const ip = req.ip || req.connection.remoteAddress;
            const key = `ip:${ip}`;

            try {
                await this.ipThrottler.consume(key);
                next();
            } catch (rejRes) {
                // Mark IP as suspicious
                this.markSuspiciousIP(ip);

                return res.status(429).json({
                    success: false,
                    error: 'Too many requests from this IP',
                    code: 'IP_THROTTLED',
                    retryAfter: Math.ceil(rejRes.msBeforeNext / 1000)
                });
            }
        };
    }

    /**
     * Mark IP as suspicious
     */
    markSuspiciousIP(ip) {
        const current = this.suspiciousIPs.get(ip) || { count: 0, firstSeen: Date.now() };
        current.count++;
        current.lastSeen = Date.now();
        this.suspiciousIPs.set(ip, current);

        // Alert if IP is highly suspicious
        if (current.count > 10) {
            console.warn(`⚠️ Suspicious IP detected: ${ip} (${current.count} violations)`);
            // In production, send alert to monitoring system
        }
    }

    /**
     * Check if IP is suspicious
     */
    isSuspiciousIP(ip) {
        const record = this.suspiciousIPs.get(ip);
        if (!record) return false;

        // Reset if older than 24 hours
        if (Date.now() - record.firstSeen > 24 * 60 * 60 * 1000) {
            this.suspiciousIPs.delete(ip);
            return false;
        }

        return record.count > 5;
    }

    /**
     * Anomaly detection middleware
     * Detects unusual request patterns
     */
    anomalyDetection() {
        return (req, res, next) => {
            const ip = req.ip || req.connection.remoteAddress;
            const path = req.path;
            const now = Date.now();

            // Track request patterns
            const patternKey = `pattern:${ip}:${path}`;
            const pattern = this.requestPatterns.get(patternKey) || {
                count: 0,
                errors: 0,
                startTime: now,
                requests: []
            };

            pattern.count++;
            pattern.requests.push({ time: now, status: null });

            // Clean old requests (older than 1 minute)
            pattern.requests = pattern.requests.filter(r => now - r.time < 60000);

            // Calculate requests per minute
            const requestsPerMinute = pattern.requests.length;

            // Store pattern
            this.requestPatterns.set(patternKey, pattern);

            // Track response status
            res.on('finish', () => {
                if (res.statusCode >= 400) {
                    pattern.errors++;
                }

                // Calculate error rate
                const errorRate = pattern.requests.length > 0 
                    ? pattern.errors / pattern.requests.length 
                    : 0;

                // Detect anomalies
                if (requestsPerMinute > this.anomalyThreshold.requestsPerMinute) {
                    console.warn(`⚠️ Anomaly detected: High request rate from ${ip} to ${path} (${requestsPerMinute} req/min)`);
                    this.markSuspiciousIP(ip);
                }

                if (errorRate > this.anomalyThreshold.errorRate && pattern.requests.length > 10) {
                    console.warn(`⚠️ Anomaly detected: High error rate from ${ip} to ${path} (${(errorRate * 100).toFixed(1)}%)`);
                    this.markSuspiciousIP(ip);
                }
            });

            next();
        };
    }

    /**
     * Geo-blocking middleware (optional)
     * Block requests from known malicious regions
     */
    geoBlocking(allowedCountries = []) {
        return async (req, res, next) => {
            // In production, use a geo-IP service like MaxMind GeoIP2
            // For now, this is a placeholder
            const ip = req.ip || req.connection.remoteAddress;
            
            // Example: Block if IP is in suspicious list
            if (this.isSuspiciousIP(ip)) {
                return res.status(403).json({
                    success: false,
                    error: 'Access denied',
                    code: 'GEO_BLOCKED'
                });
            }

            next();
        };
    }

    /**
     * Request signature validation for sensitive endpoints
     */
    signatureValidation() {
        return (req, res, next) => {
            // For sensitive operations, require request signature
            const signature = req.headers['x-request-signature'];
            const timestamp = req.headers['x-request-timestamp'];
            const apiKey = req.headers['x-api-key'];

            if (!signature || !timestamp || !apiKey) {
                return res.status(401).json({
                    success: false,
                    error: 'Request signature required',
                    code: 'SIGNATURE_REQUIRED'
                });
            }

            // Validate timestamp (prevent replay attacks)
            const requestTime = parseInt(timestamp);
            const now = Date.now();
            const timeDiff = Math.abs(now - requestTime);

            if (timeDiff > 300000) { // 5 minutes
                return res.status(401).json({
                    success: false,
                    error: 'Request timestamp expired',
                    code: 'TIMESTAMP_EXPIRED'
                });
            }

            // Validate signature (implement HMAC validation)
            // This is a placeholder - implement actual signature validation
            const expectedSignature = this.generateSignature(req, apiKey, timestamp);
            
            if (signature !== expectedSignature) {
                return res.status(401).json({
                    success: false,
                    error: 'Invalid request signature',
                    code: 'INVALID_SIGNATURE'
                });
            }

            next();
        };
    }

    /**
     * Generate request signature (HMAC-SHA256)
     */
    generateSignature(req, apiKey, timestamp) {
        const crypto = require('crypto');
        const secret = process.env.API_SECRET || 'default-secret';
        const data = `${req.method}${req.path}${JSON.stringify(req.body)}${timestamp}`;
        return crypto.createHmac('sha256', secret).update(data).digest('hex');
    }

    /**
     * Security headers middleware
     */
    securityHeaders() {
        return (req, res, next) => {
            // HSTS (HTTP Strict Transport Security)
            res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
            
            // X-Content-Type-Options
            res.setHeader('X-Content-Type-Options', 'nosniff');
            
            // X-Frame-Options
            res.setHeader('X-Frame-Options', 'DENY');
            
            // X-XSS-Protection
            res.setHeader('X-XSS-Protection', '1; mode=block');
            
            // Referrer-Policy
            res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
            
            // Permissions-Policy
            res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
            
            // Remove server header
            res.removeHeader('X-Powered-By');
            
            next();
        };
    }

    /**
     * Get security statistics
     */
    getSecurityStats() {
        return {
            suspiciousIPs: this.suspiciousIPs.size,
            trackedPatterns: this.requestPatterns.size,
            bruteForceBlocks: this.bruteForceLimiter.getKeys().length
        };
    }
}

module.exports = SecurityMiddleware;

