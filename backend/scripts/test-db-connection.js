/**
 * Database Connection Test Script
 * Tests PostgreSQL connection and verifies database is accessible
 * 
 * Usage: node backend/scripts/test-db-connection.js
 */

require('dotenv').config();
const { Pool } = require('pg');
const logger = require('../utils/logger');

async function testDatabaseConnection() {
    logger.info('Testing PostgreSQL Database Connection');
    
    // Check if DATABASE_URL is set
    if (!process.env.DATABASE_URL) {
        logger.error('DATABASE_URL environment variable is not set');
        logger.info('To set it:', {
            step1: 'Railway Dashboard → Postgres service → Settings → Variables',
            step2: 'Copy the DATABASE_URL value',
            step3: 'Add to your .env file or Railway service variables'
        });
        process.exit(1);
    }
    
    logger.info('DATABASE_URL is set', { 
        connectionString: process.env.DATABASE_URL.replace(/:[^:@]+@/, ':****@') 
    });
    
    // Create connection pool
    const { getPostgresSSLConfig } = require('../utils/ssl-config');
    const pool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: getPostgresSSLConfig(process.env.DATABASE_URL),
        max: 5,
        min: 1,
        connectionTimeoutMillis: 10000,
        query_timeout: 10000
    });
    
    let client;
    
    try {
        logger.info('Attempting to connect...');
        
        // Test connection
        client = await pool.connect();
        logger.info('Successfully connected to database');
        
        // Test basic query
        logger.info('Running test queries...');
        
        const result1 = await client.query('SELECT NOW(), version()');
        const pgVersion = result1.rows[0].version.split(' ')[0] + ' ' + result1.rows[0].version.split(' ')[1];
        logger.info('Database information', {
            timestamp: result1.rows[0].now,
            postgresVersion: pgVersion
        });
        
        // Check current database
        const result2 = await client.query('SELECT current_database()');
        logger.info('Current database', { database: result2.rows[0].current_database });
        
        // Check if users table exists
        const result3 = await client.query(`
            SELECT EXISTS (
                SELECT FROM information_schema.tables 
                WHERE table_schema = 'public' 
                AND table_name = 'users'
            )
        `);
        
        if (result3.rows[0].exists) {
            logger.info('Users table exists');
            
            // Check table structure
            const result4 = await client.query(`
                SELECT column_name, data_type 
                FROM information_schema.columns 
                WHERE table_name = 'users'
                ORDER BY ordinal_position
            `);
            
            logger.info('Users table columns', { columns: result4.rows });
            
            // Check for email verification fields
            const columns = result4.rows.map(r => r.column_name);
            const hasVerificationToken = columns.includes('verification_token');
            const hasVerificationExpires = columns.includes('verification_expires');
            const hasIsVerified = columns.includes('is_verified');
            
            logger.info('Email Verification Fields', {
                verification_token: hasVerificationToken ? 'present' : 'MISSING',
                verification_expires: hasVerificationExpires ? 'present' : 'MISSING',
                is_verified: hasIsVerified ? 'present' : 'MISSING'
            });
            
            if (!hasVerificationToken || !hasVerificationExpires || !hasIsVerified) {
                logger.warn('Email verification fields are missing', {
                    migration: 'backend/database/migrations/add-email-verification.sql'
                });
            }
            
            // Count users
            const result5 = await client.query('SELECT COUNT(*) as count FROM users');
            logger.info('Total users', { count: result5.rows[0].count });
        } else {
            logger.warn('Users table does not exist', {
                action: 'You may need to run database migrations'
            });
        }
        
        // Check connection pool status
        logger.info('Connection Pool Status', {
            totalConnections: pool.totalCount,
            idleConnections: pool.idleCount,
            waitingClients: pool.waitingCount
        });
        
        logger.info('All database tests passed - Database is accessible and working correctly');
        
    } catch (error) {
        logger.errorWithContext('Database connection failed', { error, code: error.code });
        
        const troubleshooting = {};
        if (error.code === 'ECONNREFUSED') {
            troubleshooting.steps = [
                'Check if Postgres service is running in Railway',
                'Verify DATABASE_URL is correct',
                'Check network/firewall settings'
            ];
        } else if (error.code === 'ETIMEDOUT') {
            troubleshooting.steps = [
                'Connection timeout - check network',
                'Verify DATABASE_URL host and port',
                'Check Railway service status'
            ];
        } else if (error.code === '28P01') {
            troubleshooting.steps = [
                'Authentication failed - check username/password',
                'Verify DATABASE_URL credentials'
            ];
        } else if (error.code === '3D000') {
            troubleshooting.steps = [
                'Database does not exist',
                'Check database name in DATABASE_URL'
            ];
        }
        
        if (Object.keys(troubleshooting).length > 0) {
            logger.info('Troubleshooting', troubleshooting);
        }
        
        process.exit(1);
    } finally {
        if (client) {
            client.release();
        }
        await pool.end();
        logger.info('Connection closed');
    }
}

// Run the test
testDatabaseConnection().catch(error => {
    logger.errorWithContext('Fatal error', { error });
    process.exit(1);
});

