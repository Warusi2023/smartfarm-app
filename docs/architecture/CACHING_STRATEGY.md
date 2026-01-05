# Caching Strategy

## Overview

SmartFarm API implements a comprehensive caching strategy to improve performance for read-heavy endpoints. The caching system supports both Redis (production) and in-memory caching (development/fallback).

## Architecture

### Cache Layers

1. **Redis Cache** (Production)
   - Distributed caching across multiple instances
   - Persistent storage
   - Configured via `REDIS_URL` environment variable

2. **In-Memory Cache** (Development/Fallback)
   - Always enabled as fallback
   - Local to each instance
   - Automatically used if Redis is unavailable

### Cache Service

Located in `backend/utils/cache.js`:
- Singleton pattern for global cache instance
- Automatic fallback from Redis to memory
- Pattern-based invalidation
- TTL-based expiration

## Cache Configuration

### TTLs (Time To Live)

Defined in `backend/config/cache-config.js`:

| Data Type | TTL | Reason |
|-----------|-----|--------|
| Static Data | 24 hours | Rarely changes (biological farming, subscription plans) |
| Daily Tips | 1 hour | Changes daily |
| Weather Alerts | 5 minutes | Time-sensitive data |
| Weather Stats | 5 minutes | Aggregated data, changes frequently |
| AI Advisory | 30 minutes | Computed recommendations |
| User Preferences | 15 minutes | User-specific settings |
| Farm/Crop/Livestock Lists | 10 minutes | User-specific data |

### Cache Key Patterns

```javascript
weather-alerts:user:{userId}:farm:{farmId}:unread:{unreadOnly}:limit:{limit}
ai-advisory:crop-nutrition:{cropId}:stage:{growthStage}
daily-tips:personalized:{date}:crops:{crops}:livestock:{livestock}
biological-farming:good-insects
subscriptions:plans
```

## Cached Endpoints

### Weather Alerts
- ✅ `GET /api/weather-alerts` - 5 min TTL
- ✅ `GET /api/weather-alerts/stats` - 5 min TTL
- ✅ `GET /api/weather-alerts/preferences` - 15 min TTL
- ❌ `POST /api/weather-alerts/generate` - Invalidates cache
- ❌ `PATCH /api/weather-alerts/:id/*` - Invalidates cache

### AI Advisory
- ✅ `GET /api/ai-advisory/crop-nutrition/:cropId` - 30 min TTL
- ✅ `GET /api/ai-advisory/livestock-health/:animalId` - 30 min TTL

### Daily Tips
- ✅ `GET /api/daily-tips/personalized` - 1 hour TTL
- ✅ `GET /api/daily-tips/today` - 1 hour TTL
- ✅ `GET /api/daily-tips/date/:date` - 1 hour TTL
- ✅ `GET /api/daily-tips/category/:category` - 1 hour TTL
- ✅ `GET /api/daily-tips/all` - 1 hour TTL

### Biological Farming
- ✅ `GET /api/biological-farming/good-insects` - 24 hour TTL
- ✅ `GET /api/biological-farming/good-insects/:id` - 24 hour TTL
- ✅ `GET /api/biological-farming/bad-insects` - 24 hour TTL
- ✅ `GET /api/biological-farming/bad-insects/:id` - 24 hour TTL
- ✅ `GET /api/biological-farming/crop-guides` - 24 hour TTL
- ✅ `GET /api/biological-farming/crop-guides/:cropName` - 24 hour TTL
- ✅ `GET /api/biological-farming/match/:pestName` - 24 hour TTL
- ✅ `GET /api/biological-farming/recommendations/:cropName` - 24 hour TTL

### Subscriptions
- ✅ `GET /api/subscriptions/plans` - 24 hour TTL
- ❌ `POST /api/subscriptions/subscribe` - Invalidates cache
- ❌ `POST /api/subscriptions/cancel` - Invalidates cache
- ❌ `PUT /api/subscriptions/update` - Invalidates cache

### Farms/Crops/Livestock
- ✅ `GET /api/farms` - 10 min TTL
- ✅ `GET /api/crops` - 10 min TTL
- ✅ `GET /api/livestock` - 10 min TTL
- ❌ `POST /api/livestock` - Invalidates cache
- ❌ `PUT /api/livestock/:id` - Invalidates cache
- ❌ `DELETE /api/livestock/:id` - Invalidates cache

## Cache Invalidation

### Automatic Invalidation

Cache is automatically invalidated when data changes:

| Operation | Invalidated Patterns |
|-----------|---------------------|
| `weather-alerts:create` | `weather-alerts:*`, `weather-alerts:stats:*` |
| `weather-alerts:update` | `weather-alerts:*`, `weather-alerts:stats:*` |
| `farms:create` | `farms:*`, `weather-alerts:*` |
| `farms:update` | `farms:*` |
| `crops:create` | `crops:*`, `ai-advisory:*` |
| `livestock:create` | `livestock:*`, `ai-advisory:*` |
| `preferences:update` | `user-preferences:*`, `weather-alerts:*` |
| `subscriptions:create` | `subscriptions:*` |

### Manual Invalidation

```javascript
const { invalidate } = require('./middleware/cache-middleware');

// Invalidate specific pattern
await invalidate('weather-alerts:user:123:*');

// Invalidate multiple patterns
await invalidate(['weather-alerts:*', 'weather-alerts:stats:*']);
```

## Excluded Endpoints

**Authentication endpoints are NEVER cached:**
- `/api/auth/login`
- `/api/auth/register`
- `/api/auth/logout`
- `/api/auth/refresh`
- `/api/auth/me` (user profile)
- `/api/auth/profile` (user profile updates)

**Sensitive data is NEVER cached:**
- User passwords
- Authentication tokens
- Personal information
- Payment data

## Usage

### Applying Cache Middleware

```javascript
const { cacheMiddleware } = require('../middleware/cache-middleware');
const { CACHE_TTL } = require('../config/cache-config');

// Simple cache
router.get('/endpoint', 
  cacheMiddleware('endpoint-prefix', CACHE_TTL.DEFAULT),
  handler
);

// Custom cache key
router.get('/endpoint/:id', 
  cacheMiddleware('endpoint-prefix', CACHE_TTL.DEFAULT, (req) => 
    `endpoint-prefix:${req.params.id}:${req.query.filter}`
  ),
  handler
);
```

### Invalidating Cache

```javascript
const { invalidateCache } = require('../middleware/cache-middleware');

router.post('/endpoint', 
  invalidateCache('endpoint:create'),
  handler
);
```

## Monitoring

### Cache Statistics

```javascript
const cacheService = require('./utils/cache');
const stats = cacheService.getStats();

console.log(stats);
// {
//   redisEnabled: true,
//   memoryCacheSize: 42,
//   useMemoryCache: true
// }
```

### Cache Health Check

Cache service logs:
- Redis connection status
- Cache hits/misses (debug level)
- Invalidation events
- Errors (warning level)

## Configuration

### Environment Variables

```env
# Redis URL (optional - falls back to memory cache if not set)
REDIS_URL=redis://localhost:6379

# Or with authentication
REDIS_URL=redis://:password@host:6379
```

### Production Setup

1. **Redis Setup**
   - Use managed Redis service (AWS ElastiCache, Redis Cloud, etc.)
   - Set `REDIS_URL` environment variable
   - Configure connection pooling

2. **Memory Cache Fallback**
   - Always enabled
   - Automatically used if Redis unavailable
   - Per-instance (not shared)

## Best Practices

1. **TTL Selection**
   - Static data: Long TTL (24 hours)
   - Time-sensitive: Short TTL (5 minutes)
   - User-specific: Medium TTL (10-15 minutes)

2. **Cache Keys**
   - Include user ID for user-specific data
   - Include query parameters
   - Use consistent naming

3. **Invalidation**
   - Invalidate on all write operations
   - Use pattern-based invalidation
   - Invalidate related caches

4. **Monitoring**
   - Track cache hit rates
   - Monitor Redis memory usage
   - Alert on cache failures

## Performance Impact

### Expected Improvements

- **Weather Alerts**: 80-90% reduction in database queries
- **AI Advisory**: 70-80% reduction in computation time
- **Biological Farming**: 95%+ reduction (static data)
- **Daily Tips**: 90%+ reduction (daily updates)

### Cache Hit Rates

Target cache hit rates:
- Static data: >95%
- Daily data: >80%
- Time-sensitive: >60%

## Troubleshooting

### Cache Not Working

1. Check Redis connection (if using Redis)
2. Verify cache middleware is applied
3. Check cache key generation
4. Review logs for errors

### Stale Data

1. Verify TTL is appropriate
2. Check invalidation rules
3. Ensure invalidation is triggered
4. Review cache key patterns

### Memory Issues

1. Monitor memory cache size
2. Adjust TTLs if needed
3. Use Redis for production
4. Implement cache size limits

## Future Enhancements

- [ ] Cache warming on startup
- [ ] Cache compression for large responses
- [ ] Cache analytics dashboard
- [ ] Automatic TTL adjustment based on access patterns
- [ ] Cache versioning for breaking changes

