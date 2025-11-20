/**
 * Enhanced Authentication System
 * Implements MFA, refresh tokens, and strong password hashing
 */

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const speakeasy = require('speakeasy'); // For TOTP MFA
const QRCode = require('qrcode');

class EnhancedAuth {
    constructor() {
        this.jwtSecret = process.env.JWT_SECRET || 'change-me-in-production';
        this.jwtRefreshSecret = process.env.JWT_REFRESH_SECRET || this.jwtSecret + '-refresh';
        this.accessTokenExpiry = process.env.JWT_ACCESS_EXPIRY || '15m'; // Short-lived
        this.refreshTokenExpiry = process.env.JWT_REFRESH_EXPIRY || '7d'; // Long-lived
        this.bcryptRounds = parseInt(process.env.BCRYPT_ROUNDS || '12', 10); // Strong salt rounds
    }

    /**
     * Hash password using bcrypt with strong salt rounds
     */
    async hashPassword(password) {
        if (!password || password.length < 8) {
            throw new Error('Password must be at least 8 characters');
        }
        return await bcrypt.hash(password, this.bcryptRounds);
    }

    /**
     * Verify password against hash
     */
    async verifyPassword(password, hash) {
        return await bcrypt.compare(password, hash);
    }

    /**
     * Generate access token (short-lived)
     */
    generateAccessToken(user) {
        const payload = {
            userId: user.id,
            email: user.email,
            role: user.role,
            type: 'access'
        };

        return jwt.sign(payload, this.jwtSecret, {
            expiresIn: this.accessTokenExpiry,
            issuer: 'smartfarm',
            audience: 'smartfarm-api'
        });
    }

    /**
     * Generate refresh token (long-lived)
     */
    generateRefreshToken(user) {
        const payload = {
            userId: user.id,
            email: user.email,
            type: 'refresh',
            tokenId: crypto.randomBytes(16).toString('hex') // Unique token ID for revocation
        };

        return jwt.sign(payload, this.jwtRefreshSecret, {
            expiresIn: this.refreshTokenExpiry,
            issuer: 'smartfarm',
            audience: 'smartfarm-api'
        });
    }

    /**
     * Generate both access and refresh tokens
     */
    generateTokenPair(user) {
        return {
            accessToken: this.generateAccessToken(user),
            refreshToken: this.generateRefreshToken(user),
            tokenType: 'Bearer',
            expiresIn: this.parseExpiry(this.accessTokenExpiry)
        };
    }

    /**
     * Verify access token
     */
    verifyAccessToken(token) {
        try {
            return jwt.verify(token, this.jwtSecret, {
                issuer: 'smartfarm',
                audience: 'smartfarm-api'
            });
        } catch (error) {
            throw new Error('Invalid or expired access token');
        }
    }

    /**
     * Verify refresh token
     */
    verifyRefreshToken(token) {
        try {
            return jwt.verify(token, this.jwtRefreshSecret, {
                issuer: 'smartfarm',
                audience: 'smartfarm-api'
            });
        } catch (error) {
            throw new Error('Invalid or expired refresh token');
        }
    }

    /**
     * Refresh access token using refresh token
     */
    async refreshAccessToken(refreshToken, db) {
        const decoded = this.verifyRefreshToken(refreshToken);
        
        // Check if refresh token is revoked
        const revoked = await db.query(
            'SELECT * FROM revoked_tokens WHERE token_id = $1',
            [decoded.tokenId]
        );

        if (revoked.rows.length > 0) {
            throw new Error('Refresh token has been revoked');
        }

        // Get user from database
        const user = await db.query('SELECT * FROM users WHERE id = $1', [decoded.userId]);
        
        if (user.rows.length === 0) {
            throw new Error('User not found');
        }

        // Generate new access token
        return this.generateAccessToken(user.rows[0]);
    }

    /**
     * Revoke refresh token
     */
    async revokeRefreshToken(tokenId, db) {
        const decoded = this.verifyRefreshToken(tokenId);
        
        await db.query(
            'INSERT INTO revoked_tokens (token_id, user_id, revoked_at) VALUES ($1, $2, NOW())',
            [decoded.tokenId, decoded.userId]
        );
    }

    /**
     * Generate MFA secret for TOTP
     */
    generateMFASecret(user) {
        const secret = speakeasy.generateSecret({
            name: `SmartFarm (${user.email})`,
            issuer: 'SmartFarm'
        });

        return {
            secret: secret.base32,
            qrCodeUrl: secret.otpauth_url,
            manualEntryKey: secret.base32
        };
    }

    /**
     * Verify MFA token
     */
    verifyMFAToken(token, secret) {
        return speakeasy.totp.verify({
            secret: secret,
            encoding: 'base32',
            token: token,
            window: 2 // Allow 2 time steps (60 seconds) of tolerance
        });
    }

    /**
     * Generate QR code for MFA setup
     */
    async generateMFAQRCode(otpauthUrl) {
        try {
            return await QRCode.toDataURL(otpauthUrl);
        } catch (error) {
            throw new Error('Failed to generate QR code');
        }
    }

    /**
     * Parse expiry string to seconds
     */
    parseExpiry(expiry) {
        const match = expiry.match(/^(\d+)([smhd])$/);
        if (!match) return 900; // Default 15 minutes

        const value = parseInt(match[1]);
        const unit = match[2];

        const multipliers = {
            s: 1,
            m: 60,
            h: 3600,
            d: 86400
        };

        return value * (multipliers[unit] || 60);
    }

    /**
     * Generate secure random token
     */
    generateSecureToken(length = 32) {
        return crypto.randomBytes(length).toString('hex');
    }

    /**
     * Hash API key for storage
     */
    async hashAPIKey(apiKey) {
        return await bcrypt.hash(apiKey, this.bcryptRounds);
    }

    /**
     * Verify API key
     */
    async verifyAPIKey(apiKey, hash) {
        return await bcrypt.compare(apiKey, hash);
    }
}

module.exports = EnhancedAuth;

