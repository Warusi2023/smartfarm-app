const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Database configuration
const config = {
    development: {
        type: 'sqlite',
        database: path.join(__dirname, 'smartfarm.db'),
        options: {
            verbose: console.log
        }
    },
    production: {
        type: 'postgresql',
        // Railway provides DATABASE_URL, parse it for individual components
        url: process.env.DATABASE_URL,
        host: process.env.DB_HOST || process.env.PGHOST || 'localhost',
        port: process.env.DB_PORT || process.env.PGPORT || 5432,
        database: process.env.DB_NAME || process.env.PGDATABASE || 'smartfarm',
        username: process.env.DB_USER || process.env.PGUSER || 'postgres',
        password: process.env.DB_PASSWORD || process.env.PGPASSWORD || '',
        options: {
            dialect: 'postgres',
            logging: false,
            pool: {
                max: 10,
                min: 0,
                acquire: 30000,
                idle: 10000
            },
            // Railway-specific SSL configuration
            dialectOptions: {
                ssl: process.env.NODE_ENV === 'production' ? {
                    require: true,
                    rejectUnauthorized: false
                } : false
            }
        }
    }
};

// Get current environment
const env = process.env.NODE_ENV || 'development';
const currentConfig = config[env];

// Create database connection
function createConnection() {
    if (currentConfig.type === 'sqlite') {
        return new sqlite3.Database(currentConfig.database, (err) => {
            if (err) {
                console.error('❌ SQLite connection error:', err.message);
            } else {
                console.log('✅ Connected to SQLite database');
            }
        });
    } else if (currentConfig.type === 'postgresql') {
        // PostgreSQL connection will be handled by Sequelize
        console.log('✅ PostgreSQL configuration loaded');
        return null;
    }
}

// Database connection instance
let db = null;

// Initialize database connection
function initializeDatabase() {
    if (currentConfig.type === 'sqlite') {
        db = createConnection();
        return db;
    } else if (currentConfig.type === 'postgresql') {
        // For PostgreSQL, we'll use Sequelize
        console.log('🔄 Initializing PostgreSQL connection...');
        return null;
    }
}

// Get database connection
function getConnection() {
    if (!db) {
        db = initializeDatabase();
    }
    return db;
}

// Close database connection
function closeConnection() {
    if (db && currentConfig.type === 'sqlite') {
        db.close((err) => {
            if (err) {
                console.error('❌ Error closing database:', err.message);
            } else {
                console.log('✅ Database connection closed');
            }
        });
    }
}

// Test database connection
function testConnection() {
    return new Promise((resolve, reject) => {
        if (currentConfig.type === 'sqlite') {
            const connection = getConnection();
            connection.get('SELECT 1', (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    resolve('SQLite connection successful');
                }
            });
        } else {
            // PostgreSQL connection test
            resolve('PostgreSQL configuration loaded');
        }
    });
}

module.exports = {
    config: currentConfig,
    createConnection,
    initializeDatabase,
    getConnection,
    closeConnection,
    testConnection,
    isSQLite: currentConfig.type === 'sqlite',
    isPostgreSQL: currentConfig.type === 'postgresql'
}; 