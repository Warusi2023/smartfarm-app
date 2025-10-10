# SmartFarm Environment Variables Guide

## Backend URL Choice
**Chosen Backend URL:** `https://smartfarm-backend.railway.app`

## Netlify (Frontend) Environment Variables

Set these in your Netlify dashboard under Site Settings > Environment Variables:

```
VITE_API_URL=https://smartfarm-backend.railway.app
APP_BUILD_TAG=netlify
NODE_VERSION=18
CI=true
HUSKY=0
```

## Railway (Backend) Environment Variables

Set these in your Railway dashboard under your backend service Variables tab:

```
NODE_ENV=production
PORT=3000
API_NAME=SmartFarm
API_VERSION=v1
CORS_ORIGINS=https://www.smartfarm-app.com,https://smartfarm-app.netlify.app
CI=1
HUSKY=0
```

## Database Variables (if using PostgreSQL)

```
DATABASE_URL=postgresql://username:password@host:port/database
```

## API Keys (if needed)

```
GOOGLE_API_KEY=your_google_api_key
OPENWEATHER_API_KEY=your_weather_api_key
JWT_SECRET=your_jwt_secret
```

## Verification Commands

After deployment, verify with:

```bash
# Test backend health
curl -sS https://smartfarm-backend.railway.app/api/health

# Test from browser console at https://www.smartfarm-app.com
fetch('https://smartfarm-backend.railway.app/api/health', { mode: 'cors' })
  .then(r => r.json()).then(console.log).catch(console.error);
```

## Important Notes

1. **CORS is handled in code** - no need for CORS_ORIGIN env var unless you prefer dynamic config
2. **Use DATABASE_PRIVATE_URL** instead of DATABASE_PUBLIC_URL to avoid egress fees
3. **All origins must be HTTPS** in production
4. **Test locally first** with the same environment variables
