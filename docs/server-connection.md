# Server Connection Guide

## Overview

This document provides comprehensive guidance for configuring and testing the connection between the Netlify frontend and Railway backend for the SmartFarm application.

## Configuration

### 1. Netlify Environment Variables

Add the following environment variables in your Netlify dashboard:

```env
VITE_API_BASE_URL=https://smartfarm-backend.railway.app
NEXT_PUBLIC_API_BASE_URL=https://smartfarm-backend.railway.app
VITE_WEATHER_API_KEY=your_openweather_api_key_here
```

**Steps to add in Netlify:**
1. Go to your Netlify dashboard
2. Select your site
3. Go to Site Settings → Environment Variables
4. Add each variable with the corresponding value

### 2. Netlify CSP Configuration

The Content Security Policy in `netlify.toml` allows connections to the Railway backend:

```toml
Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com https://unpkg.com; style-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://cdnjs.cloudflare.com https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com; img-src 'self' data: https:; connect-src 'self' https://api.openweathermap.org https://smartfarm-backend.railway.app https://smartfarm-app-production.up.railway.app https://cdn.jsdelivr.net https://cdnjs.cloudflare.com;"
```

### 3. Railway CORS Configuration

Ensure your Railway backend has proper CORS configuration in `server.js`:

```javascript
const cors = require('cors');

app.use(cors({
    origin: [
        'https://your-netlify-site.netlify.app',
        'https://smartfarm-app.netlify.app',
        'http://localhost:3000', // For development
        'http://localhost:8080'  // For local testing
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));
```

## Testing Steps

### 1. Health Check

Test backend connectivity:

```bash
curl https://smartfarm-backend.railway.app/api/health
```

Expected response:
```json
{
    "uptime": 123.45,
    "message": "OK",
    "timestamp": "2024-01-01T12:00:00.000Z",
    "database": "connected"
}
```

### 2. API Endpoint Testing

Test core endpoints:

```bash
# Test farms endpoint
curl https://smartfarm-backend.railway.app/api/farms

# Test crops endpoint
curl https://smartfarm-backend.railway.app/api/crops

# Test livestock endpoint
curl https://smartfarm-backend.railway.app/api/livestock
```

### 3. Frontend Integration Testing

1. **Open browser console** on your Netlify site
2. **Navigate to livestock management page**
3. **Check for console errors** - should be none
4. **Add a new animal** - should save successfully
5. **Refresh page** - animal should persist

### 4. CORS and CSP Testing

1. **Open browser dev tools**
2. **Go to Network tab**
3. **Navigate through the application**
4. **Check for failed requests** - should be none
5. **Check console for CORS/CSP errors** - should be none

## Error Handling

### Common Issues and Solutions

#### 1. CORS Errors

**Error:** `Access to fetch at 'https://smartfarm-backend.railway.app/api/farms' from origin 'https://your-site.netlify.app' has been blocked by CORS policy`

**Solution:** Update Railway backend CORS configuration to include your Netlify domain.

#### 2. CSP Violations

**Error:** `Refused to connect to 'https://smartfarm-backend.railway.app/api/farms' because it violates the following Content Security Policy directive`

**Solution:** Add the Railway backend URL to the `connect-src` directive in `netlify.toml`.

#### 3. Environment Variable Issues

**Error:** `WeatherService: API key not found`

**Solution:** Ensure `VITE_WEATHER_API_KEY` is set in Netlify environment variables.

#### 4. Network Timeouts

**Error:** `Failed to fetch` or timeout errors

**Solution:** Check Railway backend status and network connectivity.

## Monitoring and Debugging

### 1. API Service Logging

The API service provides comprehensive logging:

```javascript
// Enable debug logging
window.SmartFarmAPI.debug = true;

// Check API status
console.log('API Base URL:', window.SmartFarmAPI.baseURL);
console.log('Auth Token:', window.SmartFarmAPI.authToken ? 'Present' : 'Missing');
```

### 2. Weather Service Debugging

```javascript
// Check weather service status
console.log('Weather API Key:', window.weatherService?.getWeatherApiKey() ? 'Present' : 'Missing');
console.log('Current Weather:', window.weatherService?.weatherData);
```

### 3. Network Monitoring

Use browser dev tools to monitor:
- **Network tab:** API request/response status
- **Console tab:** Error messages and warnings
- **Application tab:** Local storage and session data

## Performance Optimization

### 1. API Caching

The API service implements intelligent caching:

```javascript
// Cache duration for different data types
const CACHE_DURATION = {
    farms: 5 * 60 * 1000,    // 5 minutes
    crops: 10 * 60 * 1000,   // 10 minutes
    livestock: 2 * 60 * 1000, // 2 minutes
    weather: 30 * 60 * 1000  // 30 minutes
};
```

### 2. Retry Logic

Automatic retry with exponential backoff:

```javascript
// Retry configuration
const RETRY_CONFIG = {
    maxRetries: 3,
    baseDelay: 1000,        // 1 second
    maxDelay: 10000,        // 10 seconds
    retryableErrors: ['Failed to fetch', 'NetworkError', 'HTTP 5']
};
```

### 3. Error Boundaries

Frontend error handling:

```javascript
// Global error handler
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    // Report to error tracking service
});

// Unhandled promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    // Report to error tracking service
});
```

## Security Considerations

### 1. API Key Management

- Store API keys in environment variables only
- Never commit API keys to version control
- Rotate API keys regularly
- Use different keys for development and production

### 2. CORS Configuration

- Only allow necessary origins
- Use specific domains instead of wildcards
- Enable credentials only when necessary

### 3. CSP Headers

- Use strict CSP policies
- Regularly audit CSP violations
- Update policies as new features are added

## Troubleshooting Checklist

- [ ] Railway backend is running and accessible
- [ ] Netlify environment variables are set correctly
- [ ] CORS configuration includes Netlify domain
- [ ] CSP allows connections to Railway backend
- [ ] API endpoints return expected responses
- [ ] No console errors in browser dev tools
- [ ] Network requests show successful status codes
- [ ] Data persists across page refreshes
- [ ] Weather service loads without errors
- [ ] Error handling works correctly

## Support

For additional support:

1. Check Railway backend logs
2. Check Netlify build logs
3. Review browser console errors
4. Test API endpoints directly
5. Verify environment variable configuration

## Version History

- **v1.0.0** - Initial server connection guide
- **v1.1.0** - Added retry logic and error handling
- **v1.2.0** - Enhanced CSP and CORS configuration
- **v1.3.0** - Added comprehensive testing procedures
