#!/usr/bin/env node

/**
 * Database Tables Verification Script
 * Verifies that all required tables exist in the database
 */

const { Pool } = require('pg');
const { getPostgresSSLConfig } = require('../backend/utils/ssl-config');

const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[36m',
    cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

// Expected tables from schema.sql
const EXPECTED_TABLES = [
    'users',
    'user_sessions',
    'farms',
    'crops',
    'livestock',
    'weather_alerts',
    'alert_preferences',
    'alert_metrics',
    'daily_tips',
    'crop_harvests',
    'livestock_sales',
    'expenses',
    'revenues',
    'financial_reports',
    'subscriptions',
    'subscription_plans',
    'ai_advisory_sessions',
    'ai_advisory_responses',
    'biological_farming_practices',
    'biological_farming_records',
    'pesticide_applications',
    'pesticide_inventory',
    'pesticide_types',
    'soil_tests',
    'irrigation_records',
    'equipment',
    'equipment_maintenance',
    'documents',
    'document_shares',
    'notifications'
];

async function verifyDatabaseTables() {
    log('\n🔍 Verifying Database Tables...', 'cyan');
    log('='.repeat(60), 'cyan');

    if (!process.env.DATABASE_URL) {
        log('❌ DATABASE_URL environment variable not set', 'red');
        log('   Set it in Railway → Variables → DATABASE_URL', 'yellow');
        process.exit(1);
    }

    let pool;
    try {
        pool = new Pool({
            connectionString: process.env.DATABASE_URL,
            ssl: getPostgresSSLConfig(process.env.DATABASE_URL),
            connectionTimeoutMillis: 10000
        });

        // Get all tables
        const result = await pool.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_type = 'BASE TABLE'
            ORDER BY table_name;
        `);

        const existingTables = result.rows.map(row => row.table_name);
        const totalTables = existingTables.length;

        log(`\n📊 Found ${totalTables} tables in database`, 'blue');
        log('='.repeat(60), 'cyan');

        // Check for expected tables
        log('\n✅ Expected Tables Status:', 'cyan');
        const foundTables = [];
        const missingTables = [];

        EXPECTED_TABLES.forEach(table => {
            if (existingTables.includes(table)) {
                log(`   ✅ ${table}`, 'green');
                foundTables.push(table);
            } else {
                log(`   ❌ ${table} (missing)`, 'red');
                missingTables.push(table);
            }
        });

        // Show additional tables (not in expected list)
        const additionalTables = existingTables.filter(t => !EXPECTED_TABLES.includes(t));
        if (additionalTables.length > 0) {
            log(`\n📋 Additional Tables Found (${additionalTables.length}):`, 'cyan');
            additionalTables.forEach(table => {
                log(`   ℹ️  ${table}`, 'blue');
            });
        }

        // Summary
        log('\n📊 Summary:', 'cyan');
        log('='.repeat(60), 'cyan');
        log(`Total Tables: ${totalTables}`, 'blue');
        log(`Expected Tables Found: ${foundTables.length}/${EXPECTED_TABLES.length}`, 
            foundTables.length === EXPECTED_TABLES.length ? 'green' : 'yellow');
        
        if (missingTables.length > 0) {
            log(`Missing Tables: ${missingTables.length}`, 'red');
            log('\n⚠️  Missing tables:', 'yellow');
            missingTables.forEach(table => {
                log(`   - ${table}`, 'yellow');
            });
        } else {
            log('✅ All expected tables exist!', 'green');
        }

        // Check for critical tables
        const criticalTables = ['users', 'farms', 'crops', 'livestock'];
        const criticalMissing = criticalTables.filter(t => !existingTables.includes(t));
        
        if (criticalMissing.length > 0) {
            log('\n❌ CRITICAL: Missing essential tables!', 'red');
            criticalMissing.forEach(table => {
                log(`   - ${table}`, 'red');
            });
            log('\n⚠️  You may need to run database migrations', 'yellow');
            log('   See: backend/database/schema.sql', 'yellow');
            await pool.end();
            process.exit(1);
        } else {
            log('\n✅ All critical tables exist!', 'green');
        }

        // Verify indexes
        log('\n🔍 Checking Indexes...', 'cyan');
        const indexResult = await pool.query(`
            SELECT tablename, indexname 
            FROM pg_indexes 
            WHERE schemaname = 'public'
            ORDER BY tablename, indexname;
        `);
        
        log(`   Found ${indexResult.rows.length} indexes`, 'blue');
        
        // Check for important indexes
        const importantIndexes = [
            'idx_weather_alerts_user_id',
            'idx_weather_alerts_farm_id',
            'idx_farms_user_id',
            'idx_crops_farm_id',
            'idx_livestock_farm_id'
        ];
        
        const existingIndexes = indexResult.rows.map(row => row.indexname);
        const foundIndexes = importantIndexes.filter(idx => existingIndexes.includes(idx));
        
        if (foundIndexes.length > 0) {
            log(`   ✅ Found ${foundIndexes.length} important indexes`, 'green');
        }

        await pool.end();
        
        if (missingTables.length === 0) {
            log('\n🎉 Database verification complete! All tables exist.', 'green');
            process.exit(0);
        } else {
            log('\n⚠️  Some tables are missing, but critical tables exist.', 'yellow');
            log('   Database is functional, but some features may not work.', 'yellow');
            process.exit(0);
        }

    } catch (error) {
        log(`\n❌ Database connection error: ${error.message}`, 'red');
        if (pool) {
            await pool.end();
        }
        process.exit(1);
    }
}

// Run if executed directly
if (require.main === module) {
    verifyDatabaseTables().catch(error => {
        log(`\n❌ Verification error: ${error.message}`, 'red');
        process.exit(1);
    });
}

module.exports = { verifyDatabaseTables };
