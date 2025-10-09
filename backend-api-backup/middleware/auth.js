const jwt = require('jsonwebtoken');
const { User } = require('../database/models');
const logger = require('../lib/logger');

const JWT_SECRET = process.env.JWT_SECRET || 'smartfarm-secret-key-2024';

/**
 * Authentication Middleware
 * Handles JWT token verification and role-based access control
 */

// Verify JWT token
const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

        if (!token) {
            return res.status(401).json({
                success: false,
                error: 'Access token required'
            });
        }

        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET);
        
        // Get user from database
        const user = await User.findByPk(decoded.userId, {
            attributes: { exclude: ['password'] }
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                error: 'User not found'
            });
        }

        if (user.status !== 'active') {
            return res.status(401).json({
                success: false,
                error: 'Account is inactive'
            });
        }

        // Add user to request object
        req.user = user;
        req.requestId = req.headers['x-request-id'] || `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        logger.auth('Token verified', user.id, { 
            requestId: req.requestId,
            method: req.method,
            path: req.path 
        });

        next();
    } catch (error) {
        logger.auth('Token verification failed', null, { 
            error: error.message,
            requestId: req.requestId,
            method: req.method,
            path: req.path 
        });

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                error: 'Token expired'
            });
        }

        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                error: 'Invalid token'
            });
        }

        return res.status(500).json({
            success: false,
            error: 'Authentication error'
        });
    }
};

// Require specific roles
const requireRole = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                error: 'Authentication required'
            });
        }

        if (!allowedRoles.includes(req.user.role)) {
            logger.auth('Access denied - insufficient role', req.user.id, { 
                userRole: req.user.role,
                requiredRoles: allowedRoles,
                requestId: req.requestId,
                method: req.method,
                path: req.path 
            });

            return res.status(403).json({
                success: false,
                error: 'Insufficient permissions'
            });
        }

        next();
    };
};

// Require specific permissions
const requirePermission = (permission) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                error: 'Authentication required'
            });
        }

        const userPermissions = req.user.permissions || [];
        
        if (!userPermissions.includes(permission)) {
            logger.auth('Access denied - insufficient permission', req.user.id, { 
                userPermissions: userPermissions,
                requiredPermission: permission,
                requestId: req.requestId,
                method: req.method,
                path: req.path 
            });

            return res.status(403).json({
                success: false,
                error: 'Insufficient permissions'
            });
        }

        next();
    };
};

// Check if user owns or manages farm
const requireFarmAccess = (farmIdParam = 'farmId') => {
    return async (req, res, next) => {
        try {
            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    error: 'Authentication required'
                });
            }

            const farmId = req.params[farmIdParam];
            
            if (!farmId) {
                return res.status(400).json({
                    success: false,
                    error: 'Farm ID required'
                });
            }

            // Admin has access to all farms
            if (req.user.role === 'admin') {
                return next();
            }

            // Check if user owns or manages the farm
            const { Farm } = require('../database/models');
            const farm = await Farm.findByPk(farmId);

            if (!farm) {
                return res.status(404).json({
                    success: false,
                    error: 'Farm not found'
                });
            }

            const hasAccess = farm.ownerId === req.user.id || farm.managerId === req.user.id;

            if (!hasAccess) {
                logger.auth('Access denied - no farm access', req.user.id, { 
                    farmId: farmId,
                    requestId: req.requestId,
                    method: req.method,
                    path: req.path 
                });

                return res.status(403).json({
                    success: false,
                    error: 'Access denied to this farm'
                });
            }

            req.farm = farm;
            next();
        } catch (error) {
            logger.error('Error checking farm access', { 
                error: error.message, 
                requestId: req.requestId 
            });
            res.status(500).json({
                success: false,
                error: 'Error checking farm access'
            });
        }
    };
};

// Optional authentication (doesn't fail if no token)
const optionalAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            req.user = null;
            return next();
        }

        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findByPk(decoded.userId, {
            attributes: { exclude: ['password'] }
        });

        if (user && user.status === 'active') {
            req.user = user;
        } else {
            req.user = null;
        }

        req.requestId = req.headers['x-request-id'] || `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        next();
    } catch (error) {
        // If token is invalid, just continue without user
        req.user = null;
        req.requestId = req.headers['x-request-id'] || `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        next();
    }
};

module.exports = {
    authenticateToken,
    requireRole,
    requirePermission,
    requireFarmAccess,
    optionalAuth
};
