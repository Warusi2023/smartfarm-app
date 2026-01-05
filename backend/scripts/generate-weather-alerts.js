/**
 * Weather Alerts Generation Cron Job
 * Run this script periodically (e.g., every 6 hours) to generate weather alerts
 * 
 * Usage:
 *   node scripts/generate-weather-alerts.js
 * 
 * Or set up as cron job:
 *   0 */6 * * * cd /path/to/backend && node scripts/generate-weather-alerts.js
 */

require('dotenv').config();
const { Pool } = require('pg');
const WeatherAlertService = require('../services/weatherAlertService');
const logger = require('../utils/logger');

async function main() {
    logger.info('Starting weather alerts generation', { time: new Date().toISOString() });

    // Initialize database connection
    if (!process.env.DATABASE_URL) {
        logger.error('DATABASE_URL not set');
        process.exit(1);
    }

    const { getPostgresSSLConfig } = require('../utils/ssl-config');
    
    const dbPool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: getPostgresSSLConfig(process.env.DATABASE_URL)
    });

    try {
        // Initialize weather alert service
        const weatherAlertService = new WeatherAlertService(
            dbPool,
            process.env.WEATHER_API_KEY
        );

        if (!process.env.WEATHER_API_KEY) {
            logger.warn('WEATHER_API_KEY not set. Alerts will not be generated.');
            process.exit(0);
        }

        // Process all farms
        const totalAlerts = await weatherAlertService.processAllFarms();

        logger.info('Weather alerts generation complete', { totalAlerts });
        process.exit(0);
    } catch (error) {
        logger.errorWithContext('Error generating weather alerts', { error });
        process.exit(1);
    } finally {
        await dbPool.end();
    }
}

// Run if called directly
if (require.main === module) {
    main();
}

module.exports = { main };

