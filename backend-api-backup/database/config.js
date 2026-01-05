const { Sequelize } = require('sequelize');
const path = require('path');

// Database configuration
const config = {
    development: {
        dialect: 'sqlite',
        storage: path.join(__dirname, 'smartfarm.db'),
        logging: false
    },
    production: {
        dialect: 'postgres',
        url: process.env.DATABASE_URL,
        host: process.env.DB_HOST || process.env.PGHOST || 'localhost',
        port: process.env.DB_PORT || process.env.PGPORT || 5432,
        database: process.env.DB_NAME || process.env.PGDATABASE || 'smartfarm',
        username: process.env.DB_USER || process.env.PGUSER || 'postgres',
        password: process.env.DB_PASSWORD || process.env.PGPASSWORD || '',
        logging: false,
        pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        dialectOptions: {
            ssl: (() => {
                // Use secure SSL configuration
                const { getSSLConfig } = require('../../utils/ssl-config');
                const sslConfig = getSSLConfig(process.env.DATABASE_URL);
                if (sslConfig === false) return false;
                return {
                    require: true,
                    ...sslConfig
                };
            })()
        }
    }
};

// Get current environment
const env = process.env.NODE_ENV || 'development';
const currentConfig = config[env];

// Create Sequelize instance
const sequelize = new Sequelize(currentConfig);

// Test database connection
async function testConnection() {
    try {
        await sequelize.authenticate();
        console.log('✅ Database connection successful');
        return 'Database connection successful';
    } catch (error) {
        console.error('❌ Database connection failed:', error);
        throw error;
    }
}

// Close database connection
async function closeConnection() {
    try {
        await sequelize.close();
        console.log('✅ Database connection closed');
    } catch (error) {
        console.error('❌ Error closing database:', error);
    }
}

module.exports = {
    sequelize,
    config: currentConfig,
    testConnection,
    closeConnection,
    isSQLite: currentConfig.dialect === 'sqlite',
    isPostgreSQL: currentConfig.dialect === 'postgres'
}; 