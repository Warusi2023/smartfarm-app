# SmartFarm Web - Deployment Fixes

## Issues Fixed

### 1. Netlify Configuration
- **Problem**: `netlify.toml` was pointing to `publish = "public"` but Vite builds to `dist/`
- **Fix**: Updated to `publish = "dist"`
- **Result**: Netlify now serves the correct built files

### 2. Environment Variables
- **Problem**: API URL was hardcoded in the built JavaScript
- **Fix**: 
  - Updated `vite.config.ts` to properly handle environment variables
  - Added `envPrefix` configuration
  - Created environment variable configuration for both Railway and Netlify

### 3. Railway Configuration
- **Problem**: Missing environment variable configuration
- **Fix**: Added environment variables to `railway.web.json`

### 4. Netlify Configuration
- **Problem**: Missing environment variable configuration
- **Fix**: Added environment variables to `netlify.toml`

## Environment Variables Required

### For Railway:
```json
{
  "VITE_API_URL": "https://your-railway-backend-url.railway.app/api",
  "APP_BUILD_TAG": "railway"
}
```

### For Netlify:
```toml
[build.environment]
  VITE_API_URL = "https://your-backend-url.com/api"
  APP_BUILD_TAG = "netlify"
```

## Deployment Steps

### Railway:
1. Set environment variables in Railway dashboard
2. Deploy using the updated `railway.web.json`

### Netlify:
1. Set environment variables in Netlify dashboard
2. Deploy using the updated `netlify.toml`

## Testing Locally

```bash
# Set environment variable and build
VITE_API_URL="https://your-api-url.com/api" npm run build

# Test the build
npm run preview
```

## Files Modified

- `vite.config.ts` - Added environment variable support
- `netlify.toml` - Fixed publish directory and added environment variables
- `railway.web.json` - Added environment variables
- `env.example` - Created example environment file
