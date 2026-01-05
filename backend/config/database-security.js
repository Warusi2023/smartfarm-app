/**
 * Database Security Configuration
 * Implements database auditing, slow query monitoring, and connection security
 */

class DatabaseSecurity {
    constructor(dbPool) {
        this.dbPool = dbPool;
        this.slowQueryThreshold = parseInt(process.env.SLOW_QUERY_THRESHOLD || '1000', 10); // 1 second default
        this.suspiciousQueries = [];
        this.queryAuditLog = [];
    }

    /**
     * Enable PostgreSQL query logging
     */
    async enableQueryLogging() {
        try {
            // Enable pg_stat_statements extension for query statistics
            await this.dbPool.query(`
                CREATE EXTENSION IF NOT EXISTS pg_stat_statements;
            `);

            // Enable slow query logging
            await this.dbPool.query(`
                ALTER SYSTEM SET log_min_duration_statement = ${this.slowQueryThreshold};
                ALTER SYSTEM SET log_statement = 'all';
                ALTER SYSTEM SET log_line_prefix = '%t [%p]: [%l-1] user=%u,db=%d,app=%a,client=%h ';
            `);

            const logger = require('../utils/logger');
            logger.info('Database query logging enabled');
        } catch (error) {
            const logger = require('../utils/logger');
            logger.warn('Failed to enable query logging', { error: error.message });
        }
    }

    /**
     * Monitor slow queries
     */
    async getSlowQueries(limit = 10) {
        try {
            const result = await this.dbPool.query(`
                SELECT 
                    query,
                    calls,
                    total_exec_time,
                    mean_exec_time,
                    max_exec_time,
                    min_exec_time,
                    stddev_exec_time
                FROM pg_stat_statements
                WHERE mean_exec_time > $1
                ORDER BY mean_exec_time DESC
                LIMIT $2
            `, [this.slowQueryThreshold, limit]);

            return result.rows;
        } catch (error) {
            const logger = require('../utils/logger');
            logger.warn('Failed to get slow queries', { error: error.message });
            return [];
        }
    }

    /**
     * Detect suspicious queries
     */
    detectSuspiciousQuery(query, params) {
        const suspiciousPatterns = [
            /(\bOR\b|\bAND\b)\s+\d+\s*=\s*\d+/gi, // SQL injection pattern
            /(\bUNION\b|\bSELECT\b.*\bFROM\b)/gi, // Union-based injection
            /(\bDROP\b|\bDELETE\b|\bTRUNCATE\b)/gi, // Destructive operations
            /(\bEXEC\b|\bEXECUTE\b)/gi, // Command execution
            /(--|#|\/\*|\*\/)/g, // SQL comments
            /(\bWAITFOR\b|\bDELAY\b)/gi, // Time-based attacks
        ];

        const queryLower = query.toLowerCase();
        
        for (const pattern of suspiciousPatterns) {
            if (pattern.test(queryLower)) {
                this.logSuspiciousQuery(query, params, 'Pattern match: ' + pattern.toString());
                return true;
            }
        }

        // Check for unusual parameter values
        if (params) {
            for (const param of params) {
                if (typeof param === 'string' && param.length > 1000) {
                    this.logSuspiciousQuery(query, params, 'Unusually long parameter');
                    return true;
                }
            }
        }

        return false;
    }

    /**
     * Log suspicious query
     */
    logSuspiciousQuery(query, params, reason) {
        const logEntry = {
            timestamp: new Date().toISOString(),
            query: query.substring(0, 500), // Truncate for logging
            params: params ? JSON.stringify(params).substring(0, 500) : null,
            reason: reason
        };

        this.suspiciousQueries.push(logEntry);
        
        // Keep only last 1000 entries
        if (this.suspiciousQueries.length > 1000) {
            this.suspiciousQueries.shift();
        }

        const logger = require('../utils/logger');
        logger.warn('Suspicious query detected', { reason, query: query.substring(0, 100) });
        
        // In production, send alert to monitoring system
        if (process.env.NODE_ENV === 'production') {
            // TODO: Send to Sentry or monitoring service
        }
    }

    /**
     * Audit query execution
     */
    auditQuery(query, params, executionTime, userId = null) {
        const auditEntry = {
            timestamp: new Date().toISOString(),
            query: query.substring(0, 500),
            params: params ? JSON.stringify(params).substring(0, 500) : null,
            executionTime: executionTime,
            userId: userId,
            isSlow: executionTime > this.slowQueryThreshold,
            isSuspicious: this.detectSuspiciousQuery(query, params)
        };

        this.queryAuditLog.push(auditEntry);

        // Keep only last 5000 entries
        if (this.queryAuditLog.length > 5000) {
            this.queryAuditLog.shift();
        }

        // Log slow queries
        if (auditEntry.isSlow) {
            const logger = require('../utils/logger');
            logger.warn('Slow query detected', { executionTime, query: query.substring(0, 100) });
        }
    }

    /**
     * Secure query wrapper with auditing
     */
    async secureQuery(query, params = [], userId = null) {
        const startTime = Date.now();
        
        try {
            // Check for suspicious patterns before execution
            if (this.detectSuspiciousQuery(query, params)) {
                throw new Error('Suspicious query detected and blocked');
            }

            const result = await this.dbPool.query(query, params);
            const executionTime = Date.now() - startTime;

            // Audit query
            this.auditQuery(query, params, executionTime, userId);

            return result;
        } catch (error) {
            const executionTime = Date.now() - startTime;
            this.auditQuery(query, params, executionTime, userId);
            throw error;
        }
    }

    /**
     * Get audit statistics
     */
    getAuditStats() {
        const total = this.queryAuditLog.length;
        const slow = this.queryAuditLog.filter(q => q.isSlow).length;
        const suspicious = this.queryAuditLog.filter(q => q.isSuspicious).length;
        const avgExecutionTime = total > 0
            ? this.queryAuditLog.reduce((sum, q) => sum + q.executionTime, 0) / total
            : 0;

        return {
            totalQueries: total,
            slowQueries: slow,
            suspiciousQueries: suspicious,
            averageExecutionTime: Math.round(avgExecutionTime),
            slowQueryPercentage: total > 0 ? ((slow / total) * 100).toFixed(2) : 0
        };
    }

    /**
     * Setup database roles and permissions
     */
    async setupDatabaseRoles() {
        try {
            // Create application user with limited permissions
            await this.dbPool.query(`
                DO $$
                BEGIN
                    IF NOT EXISTS (SELECT FROM pg_user WHERE usename = 'smartfarm_app') THEN
                        CREATE USER smartfarm_app WITH PASSWORD '${process.env.DB_APP_PASSWORD || 'change-me'}';
                    END IF;
                END
                $$;
            `);

            // Grant necessary permissions
            await this.dbPool.query(`
                GRANT CONNECT ON DATABASE smartfarm TO smartfarm_app;
                GRANT USAGE ON SCHEMA public TO smartfarm_app;
                GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO smartfarm_app;
                GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO smartfarm_app;
            `);

            // Revoke dangerous permissions
            await this.dbPool.query(`
                REVOKE CREATE ON SCHEMA public FROM smartfarm_app;
                REVOKE DROP ON SCHEMA public FROM smartfarm_app;
                REVOKE ALTER ON SCHEMA public FROM smartfarm_app;
            `);

            const logger = require('../utils/logger');
            logger.info('Database roles configured');
        } catch (error) {
            const logger = require('../utils/logger');
            logger.warn('Failed to setup database roles', { error: error.message });
        }
    }

    /**
     * Enable connection encryption
     * Uses centralized SSL configuration utility for secure defaults
     */
    getConnectionConfig() {
        const { getSSLConfig } = require('../utils/ssl-config');
        return {
            ssl: getSSLConfig(process.env.DATABASE_URL)
        };
    }
}

module.exports = DatabaseSecurity;

