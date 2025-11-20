/**
 * Encryption Configuration for SmartFarm
 * Handles data encryption at rest and secure cookie configuration
 */

const crypto = require('crypto');

class EncryptionConfig {
    constructor() {
        this.algorithm = 'aes-256-gcm';
        this.keyLength = 32; // 256 bits
        this.ivLength = 16; // 128 bits
        this.saltLength = 64;
        this.tagLength = 16;
        
        // Get encryption key from environment (must be 32 bytes for AES-256)
        this.encryptionKey = this.getEncryptionKey();
    }

    /**
     * Get encryption key from environment or generate one
     */
    getEncryptionKey() {
        const envKey = process.env.ENCRYPTION_KEY;
        
        if (envKey) {
            // Ensure key is exactly 32 bytes
            const keyBuffer = Buffer.from(envKey, 'hex');
            if (keyBuffer.length === this.keyLength) {
                return keyBuffer;
            }
        }

        // Generate a key if not provided (for development only)
        if (process.env.NODE_ENV === 'production' && !envKey) {
            throw new Error('ENCRYPTION_KEY must be set in production');
        }

        console.warn('⚠️ Using generated encryption key (not secure for production)');
        return crypto.randomBytes(this.keyLength);
    }

    /**
     * Encrypt sensitive data
     */
    encrypt(text) {
        if (!text) return null;

        const iv = crypto.randomBytes(this.ivLength);
        const cipher = crypto.createCipheriv(this.algorithm, this.encryptionKey, iv);

        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');

        const tag = cipher.getAuthTag();

        // Return IV + Tag + Encrypted data (all hex encoded)
        return {
            iv: iv.toString('hex'),
            tag: tag.toString('hex'),
            encrypted: encrypted
        };
    }

    /**
     * Decrypt sensitive data
     */
    decrypt(encryptedData) {
        if (!encryptedData || !encryptedData.iv || !encryptedData.tag || !encryptedData.encrypted) {
            throw new Error('Invalid encrypted data format');
        }

        const iv = Buffer.from(encryptedData.iv, 'hex');
        const tag = Buffer.from(encryptedData.tag, 'hex');
        const encrypted = encryptedData.encrypted;

        const decipher = crypto.createDecipheriv(this.algorithm, this.encryptionKey, iv);
        decipher.setAuthTag(tag);

        let decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');

        return decrypted;
    }

    /**
     * Encrypt object (for database storage)
     */
    encryptObject(obj) {
        const jsonString = JSON.stringify(obj);
        const encrypted = this.encrypt(jsonString);
        return JSON.stringify(encrypted);
    }

    /**
     * Decrypt object (from database)
     */
    decryptObject(encryptedString) {
        const encryptedData = JSON.parse(encryptedString);
        const decrypted = this.decrypt(encryptedData);
        return JSON.parse(decrypted);
    }

    /**
     * Secure cookie configuration
     */
    getCookieConfig() {
        const isProduction = process.env.NODE_ENV === 'production';
        
        return {
            httpOnly: true, // Prevent XSS attacks
            secure: isProduction, // HTTPS only in production
            sameSite: 'strict', // CSRF protection
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            path: '/',
            // domain: process.env.COOKIE_DOMAIN, // Set if using subdomains
        };
    }

    /**
     * Generate secure random password
     */
    generateSecurePassword(length = 16) {
        const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
        const randomBytes = crypto.randomBytes(length);
        let password = '';
        
        for (let i = 0; i < length; i++) {
            password += charset[randomBytes[i] % charset.length];
        }
        
        return password;
    }

    /**
     * Hash sensitive data for storage (one-way)
     */
    async hashSensitiveData(data) {
        const crypto = require('crypto');
        return crypto.createHash('sha256').update(data).digest('hex');
    }

    /**
     * Generate encryption key (for initial setup)
     */
    static generateEncryptionKey() {
        return crypto.randomBytes(32).toString('hex');
    }
}

module.exports = EncryptionConfig;

