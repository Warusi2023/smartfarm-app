/**
 * SmartFarm Authentication Middleware
 * JWT-based authentication middleware for securing API routes
 */

const AuthService = require('../auth/auth');

class AuthMiddleware {
    constructor() {
        this.authService = new AuthService();
    }

    /**
     * Middleware to authenticate JWT tokens
     */
    authenticate() {
        return (req, res, next) => {
            try {
                // Extract token from Authorization header
                const authHeader = req.headers.authorization;
                const token = this.authService.extractTokenFromHeader(authHeader);

                if (!token) {
                    return res.status(401).json({
                        success: false,
                        error: 'Access token required',
                        code: 'MISSING_TOKEN'
                    });
                }

                // Verify token
                const decoded = this.authService.verifyToken(token);

                // Add user info to request object
                req.user = {
                    id: decoded.userId,
                    email: decoded.email,
                    role: decoded.role
                };

                next();
            } catch (error) {
                return res.status(401).json({
                    success: false,
                    error: error.message,
                    code: 'INVALID_TOKEN'
                });
            }
        };
    }

    /**
     * Middleware to check user roles
     */
    requireRole(roles) {
        const allowedRoles = Array.isArray(roles) ? roles : [roles];

        return (req, res, next) => {
            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    error: 'Authentication required',
                    code: 'AUTH_REQUIRED'
                });
            }

            if (!allowedRoles.includes(req.user.role)) {
                return res.status(403).json({
                    success: false,
                    error: 'Insufficient permissions',
                    code: 'INSUFFICIENT_PERMISSIONS'
                });
            }

            next();
        };
    }

    /**
     * Middleware to check if user owns the resource
     */
    requireOwnership(resourceUserIdField = 'userId') {
        return (req, res, next) => {
            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    error: 'Authentication required',
                    code: 'AUTH_REQUIRED'
                });
            }

            // Admin users can access any resource
            if (req.user.role === 'admin') {
                return next();
            }

            // Check if user owns the resource
            const resourceUserId = req.params[resourceUserIdField] || req.body[resourceUserIdField];
            
            if (!resourceUserId || resourceUserId !== req.user.id) {
                return res.status(403).json({
                    success: false,
                    error: 'Access denied - resource ownership required',
                    code: 'OWNERSHIP_REQUIRED'
                });
            }

            next();
        };
    }

    /**
     * Optional authentication middleware
     * Sets req.user if token is valid, but doesn't fail if missing
     */
    optionalAuth() {
        return (req, res, next) => {
            try {
                const authHeader = req.headers.authorization;
                const token = this.authService.extractTokenFromHeader(authHeader);

                if (token) {
                    const decoded = this.authService.verifyToken(token);
                    req.user = {
                        id: decoded.userId,
                        email: decoded.email,
                        role: decoded.role
                    };
                }
            } catch (error) {
                // Ignore token errors for optional auth
                req.user = null;
            }

            next();
        };
    }

    /**
     * Rate limiting middleware
     */
    rateLimit(windowMs = 15 * 60 * 1000, maxRequests = 100) {
        const requests = new Map();

        return (req, res, next) => {
            const clientId = req.ip || req.connection.remoteAddress;
            const now = Date.now();
            const windowStart = now - windowMs;

            // Clean up old entries
            for (const [key, data] of requests.entries()) {
                if (data.firstRequest < windowStart) {
                    requests.delete(key);
                }
            }

            // Check current client
            const clientData = requests.get(clientId);

            if (!clientData) {
                requests.set(clientId, {
                    firstRequest: now,
                    count: 1
                });
                return next();
            }

            if (clientData.count >= maxRequests) {
                return res.status(429).json({
                    success: false,
                    error: 'Too many requests',
                    code: 'RATE_LIMIT_EXCEEDED',
                    retryAfter: Math.ceil((clientData.firstRequest + windowMs - now) / 1000)
                });
            }

            clientData.count++;
            next();
        };
    }

    /**
     * API key authentication middleware
     */
    requireApiKey() {
        return (req, res, next) => {
            const apiKey = req.headers['x-api-key'] || req.query.api_key;

            if (!apiKey) {
                return res.status(401).json({
                    success: false,
                    error: 'API key required',
                    code: 'MISSING_API_KEY'
                });
            }

            // Validate API key (implement your validation logic)
            const validApiKey = process.env.API_KEY || 'your-api-key';
            
            if (apiKey !== validApiKey) {
                return res.status(401).json({
                    success: false,
                    error: 'Invalid API key',
                    code: 'INVALID_API_KEY'
                });
            }

            next();
        };
    }

    /**
     * CORS middleware for production
     */
    cors() {
        const allowedOrigins = (process.env.CORS_ORIGINS || '').split(',');

        return (req, res, next) => {
            const origin = req.headers.origin;

            if (allowedOrigins.includes(origin)) {
                res.setHeader('Access-Control-Allow-Origin', origin);
            } else if (process.env.NODE_ENV === 'development') {
                res.setHeader('Access-Control-Allow-Origin', origin || '*');
            }

            res.setHeader('Access-Control-Allow-Credentials', 'true');
            res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
            res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization,X-API-Key');

            if (req.method === 'OPTIONS') {
                return res.status(204).end();
            }

            next();
        };
    }

    /**
     * Security headers middleware
     */
    securityHeaders() {
        return (req, res, next) => {
            // Prevent clickjacking
            res.setHeader('X-Frame-Options', 'DENY');
            
            // Prevent MIME type sniffing
            res.setHeader('X-Content-Type-Options', 'nosniff');
            
            // Enable XSS protection
            res.setHeader('X-XSS-Protection', '1; mode=block');
            
            // Strict transport security (HTTPS only)
            if (req.secure || req.headers['x-forwarded-proto'] === 'https') {
                res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
            }
            
            // Content security policy
            res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'");
            
            next();
        };
    }
}

module.exports = AuthMiddleware;
