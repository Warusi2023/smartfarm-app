# 🚀 Railway Deployment Steps for SmartFarm Backend

## Prerequisites
- [ ] GitHub account
- [ ] Railway account (sign up at [railway.app](https://railway.app))
- [ ] Your SmartFarm project pushed to GitHub

## Step 1: Push to GitHub

### 1.1 Initialize Git Repository (if not already done)
```bash
cd E:\Document\SmartFarm
git init
git add .
git commit -m "Initial commit: SmartFarm project with backend API"
```

### 1.2 Create GitHub Repository
1. Go to [GitHub.com](https://github.com)
2. Click "New repository"
3. Name: `smartfarm`
4. Description: `SmartFarm - AI-powered agricultural management platform`
5. Make it **Public** (required for Railway free tier)
6. Click "Create repository"

### 1.3 Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/smartfarm.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy to Railway

### 2.1 Connect Railway to GitHub
1. Go to [railway.app](https://railway.app)
2. Sign in with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your `smartfarm` repository
6. Click "Deploy Now"

### 2.2 Configure the Service
1. Railway will detect it's a Node.js project
2. Click on your service
3. Go to "Settings" tab
4. Set **Root Directory** to: `backend-api`
5. Click "Save"

### 2.3 Add PostgreSQL Database
1. In your Railway project dashboard
2. Click "New" → "Database" → "PostgreSQL"
3. Railway will automatically add the database
4. The database variables will be auto-provided

## Step 3: Configure Environment Variables

### 3.1 Essential Variables
Go to your service → "Variables" tab and add:

| Variable | Value |
|----------|-------|
| `NODE_ENV` | `production` |
| `PORT` | `3000` |
| `JWT_SECRET` | `smartfarm-super-secret-jwt-key-2024-production` |

### 3.2 Recommended Variables
Add these for better security and functionality:

| Variable | Value |
|----------|-------|
| `CORS_ORIGIN` | `https://your-frontend-domain.com` |
| `HELMET_ENABLED` | `true` |
| `RATE_LIMIT_ENABLED` | `true` |
| `RATE_LIMIT_WINDOW_MS` | `900000` |
| `RATE_LIMIT_MAX_REQUESTS` | `100` |
| `LOG_LEVEL` | `info` |

### 3.3 Optional Variables (for full features)
| Variable | Value |
|----------|-------|
| `SMTP_HOST` | `smtp.gmail.com` |
| `SMTP_PORT` | `587` |
| `SMTP_USER` | `your-email@gmail.com` |
| `SMTP_PASS` | `your-app-password` |
| `WEATHER_API_KEY` | `your_weather_api_key` |
| `MAPS_API_KEY` | `your_maps_api_key` |

## Step 4: Deploy and Test

### 4.1 Deploy
1. Click "Deploy" in Railway dashboard
2. Wait for deployment to complete (2-3 minutes)
3. Railway will provide your API URL (e.g., `https://smartfarm-production.railway.app`)

### 4.2 Test Your API
```bash
# Test health endpoint
curl https://your-app.railway.app/api/health

# Expected response:
{
  "status": "success",
  "message": "SmartFarm API is running",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "environment": "production",
  "database": "PostgreSQL",
  "features": ["authentication", "farms", "livestock", "crops", "tasks", "inventory", "financial"]
}
```

### 4.3 Test Authentication
```bash
# Test user registration
curl -X POST https://your-app.railway.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }'

# Test user login
curl -X POST https://your-app.railway.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

## Step 5: Update Frontend Projects

### 5.1 Update Web Project
Replace `http://localhost:3000` with your Railway URL in:
- `web-project/index.html`
- `web-project/login.html`
- `web-project/contact.html`
- `web-project/ai-dashboard.html`
- `web-project/blockchain-traceability.html`

### 5.2 Update Android Project
Replace `http://localhost:3000` with your Railway URL in:
- `android-project/app/src/main/java/com/smartfarm/auth/LoginActivity.kt`
- `android-project/app/src/main/java/com/smartfarm/contact/ContactActivity.kt`
- Any other API calls

## Step 6: Monitor and Maintain

### 6.1 Railway Dashboard
- Monitor logs in Railway dashboard
- Check resource usage
- View deployment history

### 6.2 Set up Alerts (Optional)
- Configure email notifications for deployment failures
- Set up uptime monitoring
- Monitor database performance

## 🎉 Success!

Your SmartFarm backend is now live on Railway! 

**Next Steps:**
1. ✅ Backend deployed to Railway
2. 🔄 Update frontend projects with Railway URL
3. 🔄 Test all endpoints
4. 🔄 Set up monitoring

**Your API URL:** `https://your-app.railway.app`
**Health Check:** `https://your-app.railway.app/api/health`
**API Docs:** `https://your-app.railway.app/api/docs`
