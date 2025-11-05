// SmartFarm Web Application Configuration
const config = {
    // Server Configuration
    port: process.env.PORT || 8080,
    nodeEnv: process.env.NODE_ENV || 'development',
    
    // API Configuration
    weatherApiKey: process.env.WEATHER_API_KEY || 'your_openweathermap_api_key_here',
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY || 'your_google_maps_api_key_here',
    
    // Database Configuration (if needed)
    databaseUrl: process.env.DATABASE_URL || 'your_database_url_here',
    
    // Security Configuration
    jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret_here',
    sessionSecret: process.env.SESSION_SECRET || 'your_session_secret_here',
    
    // Logging Configuration
    logLevel: process.env.LOG_LEVEL || 'info',
    
    // CORS Configuration
    corsOrigins: process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : ['http://localhost:3000', 'http://localhost:8080'],
    
    // Static file serving
    publicDir: './public',
    indexFile: 'index.html'
};

module.exports = config;







