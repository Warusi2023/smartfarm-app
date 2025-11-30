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

async function main() {
    console.log('🌤️ Starting weather alerts generation...');
    console.log(`Time: ${new Date().toISOString()}`);

    // Initialize database connection
    if (!process.env.DATABASE_URL) {
        console.error('❌ DATABASE_URL not set');
        process.exit(1);
    }

    const dbPool = new Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: process.env.DATABASE_URL.includes('localhost') ? false : {
            rejectUnauthorized: false
        }
    });

    try {
        // Initialize weather alert service
        const weatherAlertService = new WeatherAlertService(
            dbPool,
            process.env.WEATHER_API_KEY
        );

        if (!process.env.WEATHER_API_KEY) {
            console.warn('⚠️ WEATHER_API_KEY not set. Alerts will not be generated.');
            process.exit(0);
        }

        // Process all farms
        const totalAlerts = await weatherAlertService.processAllFarms();

        console.log(`✅ Weather alerts generation complete. Generated ${totalAlerts} alerts.`);
        process.exit(0);
    } catch (error) {
        console.error('❌ Error generating weather alerts:', error);
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

