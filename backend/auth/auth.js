/**
 * SmartFarm Authentication System
 * Production-ready JWT-based authentication with bcrypt password hashing
 */

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

class AuthService {
    constructor() {
        this.jwtSecret = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
        this.jwtExpiresIn = process.env.JWT_EXPIRES_IN || '7d';
        this.bcryptRounds = parseInt(process.env.BCRYPT_ROUNDS) || 12;
    }

    /**
     * Hash a password using bcrypt
     */
    async hashPassword(password) {
        try {
            return await bcrypt.hash(password, this.bcryptRounds);
        } catch (error) {
            throw new Error('Password hashing failed');
        }
    }

    /**
     * Verify a password against its hash
     */
    async verifyPassword(password, hash) {
        try {
            return await bcrypt.compare(password, hash);
        } catch (error) {
            throw new Error('Password verification failed');
        }
    }

    /**
     * Generate a JWT token for a user
     */
    generateToken(user) {
        const payload = {
            userId: user.id,
            email: user.email,
            role: user.role,
            iat: Math.floor(Date.now() / 1000)
        };

        return jwt.sign(payload, this.jwtSecret, {
            expiresIn: this.jwtExpiresIn,
            issuer: 'smartfarm',
            audience: 'smartfarm-users'
        });
    }

    /**
     * Verify and decode a JWT token
     */
    verifyToken(token) {
        try {
            return jwt.verify(token, this.jwtSecret, {
                issuer: 'smartfarm',
                audience: 'smartfarm-users'
            });
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                throw new Error('Token has expired');
            } else if (error.name === 'JsonWebTokenError') {
                throw new Error('Invalid token');
            } else {
                throw new Error('Token verification failed');
            }
        }
    }

    /**
     * Extract token from Authorization header
     */
    extractTokenFromHeader(authHeader) {
        if (!authHeader) {
            return null;
        }

        const parts = authHeader.split(' ');
        if (parts.length !== 2 || parts[0] !== 'Bearer') {
            return null;
        }

        return parts[1];
    }

    /**
     * Generate a secure random token for password reset
     */
    generateResetToken() {
        return crypto.randomBytes(32).toString('hex');
    }

    /**
     * Generate a secure random token for email verification
     */
    generateVerificationToken() {
        return crypto.randomBytes(32).toString('hex');
    }

    /**
     * Validate password strength
     */
    validatePassword(password) {
        const errors = [];

        if (!password) {
            errors.push('Password is required');
        }

        if (password.length < 8) {
            errors.push('Password must be at least 8 characters long');
        }

        if (!/[A-Z]/.test(password)) {
            errors.push('Password must contain at least one uppercase letter');
        }

        if (!/[a-z]/.test(password)) {
            errors.push('Password must contain at least one lowercase letter');
        }

        if (!/\d/.test(password)) {
            errors.push('Password must contain at least one number');
        }

        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            errors.push('Password must contain at least one special character');
        }

        return {
            isValid: errors.length === 0,
            errors
        };
    }

    /**
     * Validate email format
     */
    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Sanitize user input
     */
    sanitizeInput(input) {
        if (typeof input !== 'string') {
            return input;
        }

        return input
            .trim()
            .replace(/[<>]/g, '') // Remove potential HTML tags
            .substring(0, 255); // Limit length
    }

    /**
     * Create user session record
     */
    async createSession(userId, token) {
        // This would integrate with your database
        // For now, return a session object
        return {
            id: crypto.randomUUID(),
            userId,
            tokenHash: crypto.createHash('sha256').update(token).digest('hex'),
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
            createdAt: new Date()
        };
    }

    /**
     * Invalidate user session
     */
    async invalidateSession(sessionId) {
        // This would update your database
        // For now, just log the action
        console.log(`Session ${sessionId} invalidated`);
        return true;
    }

    /**
     * Get user from token (without verification)
     */
    getUserFromToken(token) {
        try {
            const decoded = jwt.decode(token);
            return {
                userId: decoded.userId,
                email: decoded.email,
                role: decoded.role
            };
        } catch (error) {
            return null;
        }
    }
}

module.exports = AuthService;
