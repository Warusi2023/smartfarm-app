# Environment Variables Guide

Complete reference for all environment variables used in SmartFarm.

## Backend Environment Variables

### Required Variables

```env
# Application
NODE_ENV=production
PORT=3000

# Database
DATABASE_URL=postgresql://user:password@host:5432/database

# Authentication
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRES_IN=7d
BCRYPT_ROUNDS=12

# Email Service
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-app-password
EMAIL_FROM=SmartFarm <noreply@smartfarm.com>

# Frontend URL
FRONTEND_URL=https://your-frontend.netlify.app
```

### Optional Variables

```env
# Database SSL
DB_ALLOW_INSECURE_SSL=false
DB_SSL_CA=/path/to/ca-certificate.crt
DB_SSL_CERT=/path/to/client-certificate.crt
DB_SSL_KEY=/path/to/client-key.key

# Logging
LOG_LEVEL=info
LOG_FILE=./logs/backend.log

# Weather API
WEATHER_API_KEY=your-weather-api-key

# Feature Flags
ENABLE_EMAIL_VERIFICATION=true
ENABLE_SUBSCRIPTIONS=true
```

## Frontend Environment Variables

### Required Variables

```env
VITE_API_BASE_URL=https://your-api.railway.app/api
```

### Optional Variables

```env
VITE_APP_NAME=SmartFarm
VITE_ENVIRONMENT=production
VITE_GOOGLE_MAPS_API_KEY=your-google-maps-key
```

## Development Setup

### Backend (.env)
```env
NODE_ENV=development
PORT=3000
DATABASE_URL=sqlite:./smartfarm.db
JWT_SECRET=dev-secret-key
JWT_EXPIRES_IN=7d
BCRYPT_ROUNDS=4
EMAIL_SERVICE=test
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_ENVIRONMENT=development
```

## Production Setup

### Backend (.env)
```env
NODE_ENV=production
PORT=3000
DATABASE_URL=postgresql://user:pass@host:5432/db
JWT_SECRET=<strong-random-secret>
JWT_EXPIRES_IN=7d
BCRYPT_ROUNDS=12
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@example.com
EMAIL_PASS=your-app-password
EMAIL_FROM=SmartFarm <noreply@smartfarm.com>
FRONTEND_URL=https://your-app.netlify.app
WEATHER_API_KEY=your-key
LOG_LEVEL=info
```

### Frontend (Netlify Environment Variables)
```env
VITE_API_BASE_URL=https://your-api.railway.app/api
VITE_ENVIRONMENT=production
```

## Security Notes

1. **Never commit .env files** - Add to `.gitignore`
2. **Use strong secrets** - Generate random strings for JWT_SECRET
3. **Rotate secrets regularly** - Change JWT_SECRET periodically
4. **Use app passwords** - For email, use app-specific passwords
5. **Limit access** - Only grant access to necessary variables

## Variable Descriptions

### NODE_ENV
- **Values:** `development`, `production`, `test`
- **Purpose:** Sets application environment
- **Default:** `development`

### DATABASE_URL
- **Format:** `postgresql://user:password@host:port/database`
- **Purpose:** Database connection string
- **Required:** Yes (production)

### JWT_SECRET
- **Purpose:** Secret key for JWT token signing
- **Required:** Yes
- **Security:** Must be strong and secret

### JWT_EXPIRES_IN
- **Format:** `7d`, `24h`, `60m`
- **Purpose:** JWT token expiration time
- **Default:** `7d`

### EMAIL_SERVICE
- **Values:** `gmail`, `sendgrid`, `smtp`, `test`
- **Purpose:** Email service provider
- **Default:** `gmail`

### FRONTEND_URL
- **Purpose:** Frontend URL for CORS and email links
- **Required:** Yes

## Testing Environment

For tests, use these minimal variables:
```env
NODE_ENV=test
JWT_SECRET=test-secret
DATABASE_URL=
EMAIL_SERVICE=test
```

