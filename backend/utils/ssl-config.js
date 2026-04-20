/**
 * SSL/TLS Configuration Utility
 * 
 * Provides secure SSL configuration for database connections with environment-based settings.
 * 
 * Security:
 * - Production: Uses TLS for managed Postgres and supports explicit cert validation overrides
 * - Development: Can optionally allow insecure connections via DB_ALLOW_INSECURE_SSL env var
 * - Supports custom CA certificates via DB_SSL_CA environment variable
 * 
 * Environment Variables:
 * - NODE_ENV: 'production' | 'development' | 'test'
 * - DB_ALLOW_INSECURE_SSL: 'true' to allow insecure SSL in development (default: false)
 * - DB_SSL_REJECT_UNAUTHORIZED: 'true' | 'false' to override TLS certificate validation (optional)
 * - DB_SSL_CA: Path to CA certificate file or certificate content (optional)
 * - DB_SSL_CERT: Path to client certificate file or certificate content (optional)
 * - DB_SSL_KEY: Path to client key file or key content (optional)
 */

const fs = require('fs');
const path = require('path');

/**
 * Get SSL configuration for database connections
 * @param {string} databaseUrl - Database connection URL (optional, for detection)
 * @returns {Object|boolean} SSL configuration object or false
 */
function getSSLConfig(databaseUrl = '') {
    const nodeEnv = process.env.NODE_ENV || 'development';
    const isProduction = nodeEnv === 'production';
    const isLocalhost = databaseUrl.includes('localhost') || 
                       databaseUrl.includes('127.0.0.1') ||
                       databaseUrl.includes('::1');
    const explicitRejectUnauthorized = process.env.DB_SSL_REJECT_UNAUTHORIZED;

    // Localhost connections don't need SSL
    if (isLocalhost && !isProduction) {
        return false;
    }

    // For managed PostgreSQL, default to TLS with relaxed certificate validation
    // unless explicitly overridden or a CA is provided.
    if (isProduction || !isLocalhost) {
        const sslConfig = {
            rejectUnauthorized: false
        };

        // Explicit override from env (highest priority)
        if (explicitRejectUnauthorized === 'true') {
            sslConfig.rejectUnauthorized = true;
        } else if (explicitRejectUnauthorized === 'false') {
            sslConfig.rejectUnauthorized = false;
        }

        // Add CA certificate if provided
        if (process.env.DB_SSL_CA) {
            try {
                // Check if it's a file path or certificate content
                if (fs.existsSync(process.env.DB_SSL_CA)) {
                    sslConfig.ca = fs.readFileSync(process.env.DB_SSL_CA, 'utf8');
                } else {
                    // Assume it's certificate content
                    sslConfig.ca = process.env.DB_SSL_CA;
                }
                // If CA is provided and no explicit override, use strict validation
                if (explicitRejectUnauthorized === undefined) {
                    sslConfig.rejectUnauthorized = true;
                }
            } catch (error) {
                console.warn('⚠️  Warning: Could not read DB_SSL_CA certificate:', error.message);
                console.warn('   Continuing with default certificate validation');
            }
        }

        // Add client certificate if provided
        if (process.env.DB_SSL_CERT) {
            try {
                if (fs.existsSync(process.env.DB_SSL_CERT)) {
                    sslConfig.cert = fs.readFileSync(process.env.DB_SSL_CERT, 'utf8');
                } else {
                    sslConfig.cert = process.env.DB_SSL_CERT;
                }
            } catch (error) {
                console.warn('⚠️  Warning: Could not read DB_SSL_CERT:', error.message);
            }
        }

        // Add client key if provided
        if (process.env.DB_SSL_KEY) {
            try {
                if (fs.existsSync(process.env.DB_SSL_KEY)) {
                    sslConfig.key = fs.readFileSync(process.env.DB_SSL_KEY, 'utf8');
                } else {
                    sslConfig.key = process.env.DB_SSL_KEY;
                }
            } catch (error) {
                console.warn('⚠️  Warning: Could not read DB_SSL_KEY:', error.message);
            }
        }

        return sslConfig;
    }

    // Development: Check if insecure SSL is explicitly allowed
    const allowInsecure = process.env.DB_ALLOW_INSECURE_SSL === 'true';
    
    if (allowInsecure) {
        console.warn('⚠️  WARNING: Insecure SSL is enabled in development mode');
        console.warn('   This should NEVER be used in production');
        return {
            rejectUnauthorized: false
        };
    }

    // Development default for non-local DB: use TLS with relaxed validation
    return {
        rejectUnauthorized: false
    };
}

/**
 * Get SSL configuration for PostgreSQL Pool
 * This is a convenience wrapper for getSSLConfig
 * @param {string} databaseUrl - Database connection URL
 * @returns {Object|boolean} SSL configuration for pg.Pool
 */
function getPostgresSSLConfig(databaseUrl = process.env.DATABASE_URL || '') {
    return getSSLConfig(databaseUrl);
}

module.exports = {
    getSSLConfig,
    getPostgresSSLConfig
};

