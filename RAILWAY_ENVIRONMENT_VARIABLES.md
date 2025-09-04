# 🚀 Railway Environment Variables for SmartFarm Backend

## Required Environment Variables

### 🔧 **Essential Variables (Must Set)**

| Variable | Description | Example Value | Required |
|----------|-------------|---------------|----------|
| `NODE_ENV` | Environment mode | `production` | ✅ Yes |
| `PORT` | Server port | `3000` | ✅ Yes |
| `JWT_SECRET` | JWT signing secret | `your-super-secret-jwt-key-2024` | ✅ Yes |

### 🗄️ **Database Variables (Auto-provided by Railway)**

| Variable | Description | Provided By | Required |
|----------|-------------|--------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Railway PostgreSQL | ✅ Auto |
| `PGHOST` | Database host | Railway PostgreSQL | ✅ Auto |
| `PGPORT` | Database port | Railway PostgreSQL | ✅ Auto |
| `PGDATABASE` | Database name | Railway PostgreSQL | ✅ Auto |
| `PGUSER` | Database username | Railway PostgreSQL | ✅ Auto |
| `PGPASSWORD` | Database password | Railway PostgreSQL | ✅ Auto |

### 🌐 **Optional Variables (Recommended)**

| Variable | Description | Example Value | Required |
|----------|-------------|---------------|----------|
| `CORS_ORIGIN` | Allowed frontend origins | `https://your-domain.com,https://your-app.vercel.app` | ⚠️ Recommended |
| `HELMET_ENABLED` | Security headers | `true` | ⚠️ Recommended |
| `RATE_LIMIT_ENABLED` | Rate limiting | `true` | ⚠️ Recommended |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window | `900000` | ⚠️ Recommended |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | `100` | ⚠️ Recommended |
| `LOG_LEVEL` | Logging level | `info` | ⚠️ Recommended |

### 📧 **Email Configuration (Optional)**

| Variable | Description | Example Value | Required |
|----------|-------------|---------------|----------|
| `SMTP_HOST` | SMTP server | `smtp.gmail.com` | ❌ Optional |
| `SMTP_PORT` | SMTP port | `587` | ❌ Optional |
| `SMTP_USER` | SMTP username | `your-email@gmail.com` | ❌ Optional |
| `SMTP_PASS` | SMTP password | `your-app-password` | ❌ Optional |

### 🔑 **External API Keys (Optional)**

| Variable | Description | Example Value | Required |
|----------|-------------|---------------|----------|
| `WEATHER_API_KEY` | Weather service API key | `your_weather_api_key` | ❌ Optional |
| `MAPS_API_KEY` | Maps service API key | `your_maps_api_key` | ❌ Optional |
| `OPENAI_API_KEY` | OpenAI API key | `your_openai_api_key` | ❌ Optional |

### 📊 **Monitoring (Optional)**

| Variable | Description | Example Value | Required |
|----------|-------------|---------------|----------|
| `ENABLE_METRICS` | Enable metrics collection | `true` | ❌ Optional |
| `METRICS_PORT` | Metrics port | `9090` | ❌ Optional |

## 🚀 **Quick Setup for Railway**

### 1. **Minimum Required Variables**
```bash
NODE_ENV=production
PORT=3000
JWT_SECRET=your-super-secret-jwt-key-2024
```

### 2. **Recommended Production Variables**
```bash
NODE_ENV=production
PORT=3000
JWT_SECRET=your-super-secret-jwt-key-2024
CORS_ORIGIN=https://your-frontend-domain.com
HELMET_ENABLED=true
RATE_LIMIT_ENABLED=true
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
LOG_LEVEL=info
```

### 3. **Full Configuration (All Features)**
```bash
NODE_ENV=production
PORT=3000
JWT_SECRET=your-super-secret-jwt-key-2024
CORS_ORIGIN=https://your-frontend-domain.com,https://your-web-app.vercel.app
HELMET_ENABLED=true
RATE_LIMIT_ENABLED=true
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
LOG_LEVEL=info
MAX_FILE_SIZE=10485760
UPLOAD_PATH=./uploads
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
WEATHER_API_KEY=your_weather_api_key_here
MAPS_API_KEY=your_maps_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
ENABLE_METRICS=true
METRICS_PORT=9090
```

## 🔐 **Security Notes**

1. **JWT_SECRET**: Generate a strong, random secret key (at least 32 characters)
2. **CORS_ORIGIN**: Only include your actual frontend domains
3. **Database**: Railway automatically provides secure database credentials
4. **API Keys**: Keep external API keys secure and rotate them regularly

## 📝 **How to Set Variables in Railway**

1. Go to your Railway project dashboard
2. Click on your backend service
3. Go to the "Variables" tab
4. Add each variable with its value
5. Click "Deploy" to apply changes

## ✅ **Verification**

After deployment, test your API:
```bash
curl https://your-railway-app.railway.app/api/health
```

Expected response:
```json
{
  "status": "success",
  "message": "SmartFarm API is running",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "environment": "production",
  "database": "PostgreSQL",
  "features": ["authentication", "farms", "livestock", "crops", "tasks", "inventory", "financial"]
}
```
