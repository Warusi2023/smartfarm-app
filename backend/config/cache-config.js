/**
 * Cache Configuration
 * Defines TTLs (Time To Live) and invalidation rules for different data types
 */

/**
 * Cache TTLs in seconds
 */
const CACHE_TTL = {
    // Static/rarely changing data - Long TTL
    STATIC_DATA: 24 * 60 * 60, // 24 hours
    SUBSCRIPTION_PLANS: 24 * 60 * 60, // 24 hours
    BIOLOGICAL_FARMING: 24 * 60 * 60, // 24 hours (static data)
    
    // Daily data - Medium TTL
    DAILY_TIPS: 60 * 60, // 1 hour (changes daily)
    
    // Computed/aggregated data - Short TTL
    WEATHER_ALERTS_STATS: 5 * 60, // 5 minutes
    AI_ADVISORY: 30 * 60, // 30 minutes (computed recommendations)
    
    // Time-sensitive data - Very short TTL
    WEATHER_ALERTS: 5 * 60, // 5 minutes (weather changes frequently)
    WEATHER_DATA: 10 * 60, // 10 minutes
    
    // User-specific data - Medium TTL
    USER_PREFERENCES: 15 * 60, // 15 minutes
    FARM_LIST: 10 * 60, // 10 minutes
    CROP_LIST: 10 * 60, // 10 minutes
    LIVESTOCK_LIST: 10 * 60, // 10 minutes
    
    // Default TTL
    DEFAULT: 15 * 60 // 15 minutes
};

/**
 * Cache key patterns for invalidation
 */
const CACHE_PATTERNS = {
    WEATHER_ALERTS: 'weather-alerts:*',
    WEATHER_ALERTS_USER: 'weather-alerts:user:*',
    WEATHER_ALERTS_STATS: 'weather-alerts:stats:*',
    AI_ADVISORY: 'ai-advisory:*',
    DAILY_TIPS: 'daily-tips:*',
    BIOLOGICAL_FARMING: 'biological-farming:*',
    SUBSCRIPTIONS: 'subscriptions:*',
    FARMS: 'farms:*',
    CROPS: 'crops:*',
    LIVESTOCK: 'livestock:*',
    USER_PREFERENCES: 'user-preferences:*'
};

/**
 * Generate cache key for a request
 * @param {string} prefix - Cache key prefix
 * @param {object} req - Express request object
 * @returns {string} Cache key
 */
function generateCacheKey(prefix, req) {
    const userId = req.user?.id || 'anonymous';
    const queryString = JSON.stringify(req.query || {});
    const params = JSON.stringify(req.params || {});
    return `${prefix}:${userId}:${params}:${queryString}`;
}

/**
 * Cache invalidation rules
 * Defines what cache patterns to invalidate when data changes
 */
const INVALIDATION_RULES = {
    // Weather alerts
    'weather-alerts:create': [CACHE_PATTERNS.WEATHER_ALERTS, CACHE_PATTERNS.WEATHER_ALERTS_STATS],
    'weather-alerts:update': [CACHE_PATTERNS.WEATHER_ALERTS, CACHE_PATTERNS.WEATHER_ALERTS_STATS],
    'weather-alerts:delete': [CACHE_PATTERNS.WEATHER_ALERTS, CACHE_PATTERNS.WEATHER_ALERTS_STATS],
    
    // Farms
    'farms:create': [CACHE_PATTERNS.FARMS, CACHE_PATTERNS.WEATHER_ALERTS],
    'farms:update': [CACHE_PATTERNS.FARMS],
    'farms:delete': [CACHE_PATTERNS.FARMS, CACHE_PATTERNS.WEATHER_ALERTS],
    
    // Crops
    'crops:create': [CACHE_PATTERNS.CROPS, CACHE_PATTERNS.AI_ADVISORY],
    'crops:update': [CACHE_PATTERNS.CROPS, CACHE_PATTERNS.AI_ADVISORY],
    'crops:delete': [CACHE_PATTERNS.CROPS, CACHE_PATTERNS.AI_ADVISORY],
    
    // Livestock
    'livestock:create': [CACHE_PATTERNS.LIVESTOCK, CACHE_PATTERNS.AI_ADVISORY],
    'livestock:update': [CACHE_PATTERNS.LIVESTOCK, CACHE_PATTERNS.AI_ADVISORY],
    'livestock:delete': [CACHE_PATTERNS.LIVESTOCK, CACHE_PATTERNS.AI_ADVISORY],
    
    // User preferences
    'preferences:update': [CACHE_PATTERNS.USER_PREFERENCES, CACHE_PATTERNS.WEATHER_ALERTS],
    
    // Subscriptions
    'subscriptions:create': [CACHE_PATTERNS.SUBSCRIPTIONS],
    'subscriptions:update': [CACHE_PATTERNS.SUBSCRIPTIONS],
    'subscriptions:delete': [CACHE_PATTERNS.SUBSCRIPTIONS]
};

module.exports = {
    CACHE_TTL,
    CACHE_PATTERNS,
    INVALIDATION_RULES,
    generateCacheKey
};

