/**
 * Run backend SQL migrations in a canonical release order.
 * Usage:
 *   node scripts/run-migrations.js
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Client } = require('pg');
const logger = require('../utils/logger');
const { getPostgresSSLConfig } = require('../utils/ssl-config');

const MIGRATION_ORDER = [
    '001_complete_schema.sql',
    '002_add_missing_features.sql',
    '003_add_weather_alerts.sql',
    'add-email-verification.sql',
    '004_auth_users_columns.sql',
    '005_subscriptions_user_unique.sql',
    '006_soiltests_farmcosts.sql',
    '007_farmrevenue.sql',
    '008_stripe_billing.sql',
    '009_aquaculture_phase1.sql',
    '010_farm_team_tasks.sql',
    '013_ipm_reference_data.sql',
    '014_ipm_maturity_notes.sql',
    '015_ipm_regulatory_products.sql'
];

async function runMigrations() {
    if (!process.env.DATABASE_URL) {
        logger.error('DATABASE_URL is required to run migrations');
        process.exit(1);
    }

    const migrationsDir = path.join(__dirname, '../database/migrations');
    const client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: getPostgresSSLConfig(process.env.DATABASE_URL)
    });

    try {
        await client.connect();
        logger.info('Connected to database, running migrations');

        for (const migration of MIGRATION_ORDER) {
            const migrationPath = path.join(migrationsDir, migration);
            if (!fs.existsSync(migrationPath)) {
                throw new Error(`Missing migration file: ${migration}`);
            }

            const sql = fs.readFileSync(migrationPath, 'utf8');
            logger.info('Applying migration', { migration });
            await client.query(sql);
            logger.info('Migration applied', { migration });
        }

        logger.info('All migrations completed successfully');
    } catch (error) {
        logger.errorWithContext('Migration run failed', { error });
        process.exitCode = 1;
    } finally {
        await client.end().catch(() => undefined);
    }
}

runMigrations();
