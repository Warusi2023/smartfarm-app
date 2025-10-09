# 🚀 Railway Deployment Guide for SmartFarm Backend

## Overview
This guide will help you deploy your SmartFarm backend API to Railway, a modern cloud platform that makes deployment simple and efficient.

## Prerequisites
- [ ] Railway account (sign up at [railway.app](https://railway.app))
- [ ] GitHub repository with your SmartFarm backend code
- [ ] Node.js 18+ (for local development)

## Step 1: Prepare Your Repository

### 1.1 Commit All Changes
```bash
cd backend-api
git add .
git commit -m "Prepare for Railway deployment"
git push origin main
```

### 1.2 Verify Required Files
Ensure these files are in your `backend-api` directory:
- ✅ `package.json` (with start script)
- ✅ `server.js` (main entry point)
- ✅ `railway.json` (Railway configuration)
- ✅ `nixpacks.toml` (Build configuration)
- ✅ `railway.env.example` (Environment variables template)

## Step 2: Deploy to Railway

### 2.1 Connect GitHub Repository
1. Go to [Railway Dashboard](https://railway.app/dashboard)
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Choose your SmartFarm repository
5. Select the `backend-api` folder as the root directory

### 2.2 Configure Environment Variables
In your Railway project dashboard:

1. Go to **Variables** tab
2. Add these environment variables:

```env
# Required Variables
NODE_ENV=production
JWT_SECRET=your-super-secret-jwt-key-here-change-this
CORS_ORIGIN=https://your-frontend-domain.com

# Optional Variables (add as needed)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
WEATHER_API_KEY=your_weather_api_key
MAPS_API_KEY=your_maps_api_key
```

### 2.3 Add PostgreSQL Database
1. In your Railway project dashboard
2. Click **"New"** → **"Database"** → **"PostgreSQL"**
3. Railway will automatically provide these variables:
   - `DATABASE_URL`
   - `PGDATABASE`
   - `PGUSER`
   - `PGPASSWORD`
   - `PGHOST`
   - `PGPORT`

## Step 3: Database Setup

### 3.1 Run Database Migrations
After deployment, you'll need to set up your database schema. You can do this by:

1. **Option A: Using Railway CLI**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Connect to your project
railway link

# Run migrations
railway run npm run migrate
```

2. **Option B: Using Railway Dashboard**
- Go to your project's **Deployments** tab
- Click on the latest deployment
- Open the **Console** tab
- Run: `npm run migrate`

### 3.2 Seed Database (Optional)
```bash
railway run npm run seed
```

## Step 4: Verify Deployment

### 4.1 Check Health Endpoint
Visit your deployed API:
```
https://your-app-name.railway.app/api/health
```

You should see:
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "version": "1.0.0",
  "environment": "production",
  "database": "PostgreSQL",
  "features": [...]
}
```

### 4.2 Test API Endpoints
```bash
# Test authentication
curl -X POST https://your-app-name.railway.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@example.com","password":"password123"}'

# Test protected endpoint
curl -X GET https://your-app-name.railway.app/api/farms \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Step 5: Update Frontend Configuration

### 5.1 Update Web Project
In your `web-project` files, update API endpoints:

```javascript
// Update API base URL
const API_BASE_URL = 'https://your-app-name.railway.app/api';

// Example fetch
fetch(`${API_BASE_URL}/farms`, {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});
```

### 5.2 Update Android Project
In your Android project, update the API configuration:

```kotlin
// In your API service class
companion object {
    private const val BASE_URL = "https://your-app-name.railway.app/api/"
}
```

## Step 6: Custom Domain (Optional)

### 6.1 Add Custom Domain
1. In Railway dashboard, go to **Settings** → **Domains**
2. Click **"Custom Domain"**
3. Add your domain (e.g., `api.smartfarm-app.com`)
4. Update DNS records as instructed

### 6.2 Update CORS Configuration
Update your `CORS_ORIGIN` environment variable:
```env
CORS_ORIGIN=https://smartfarm-app.com,https://www.smartfarm-app.com
```

## Step 7: Monitoring and Maintenance

### 7.1 View Logs
- Go to your project dashboard
- Click on **Deployments**
- Select a deployment to view logs

### 7.2 Monitor Performance
- Railway provides built-in metrics
- Check **Metrics** tab for CPU, memory, and network usage

### 7.3 Automatic Deployments
- Railway automatically deploys on every push to your main branch
- You can configure branch-specific deployments in settings

## Troubleshooting

### Common Issues

#### 1. Database Connection Failed
```bash
# Check if DATABASE_URL is set
railway variables

# Test database connection
railway run node -e "console.log(process.env.DATABASE_URL)"
```

#### 2. CORS Errors
- Ensure `CORS_ORIGIN` includes your frontend domain
- Check that your frontend is making requests to the correct API URL

#### 3. Build Failures
- Check the **Deployments** tab for build logs
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

#### 4. Environment Variables Not Loading
- Check variable names (case-sensitive)
- Ensure variables are set in the correct environment
- Restart the deployment after adding new variables

### Debug Commands
```bash
# Check environment variables
railway run env

# Test database connection
railway run node database/test.js

# Run specific scripts
railway run npm run migrate
railway run npm run seed
```

## Production Checklist

- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] Health endpoint responding
- [ ] CORS configured for frontend domains
- [ ] JWT secret is secure and unique
- [ ] SSL certificate active (automatic with Railway)
- [ ] Monitoring set up
- [ ] Backup strategy in place
- [ ] Frontend updated with new API URL

## Cost Optimization

### Railway Pricing
- **Hobby Plan**: $5/month (includes PostgreSQL)
- **Pro Plan**: $20/month (includes more resources)

### Tips to Reduce Costs
1. Use Railway's built-in PostgreSQL (included in Hobby plan)
2. Monitor resource usage in the dashboard
3. Scale down during low-traffic periods
4. Use environment-specific configurations

## Security Best Practices

1. **Environment Variables**: Never commit secrets to git
2. **JWT Secrets**: Use strong, unique secrets
3. **CORS**: Restrict to specific domains
4. **Rate Limiting**: Enable rate limiting for API endpoints
5. **HTTPS**: Railway provides SSL automatically
6. **Database**: Use connection pooling and SSL

## Next Steps

After successful deployment:

1. **Update Documentation**: Update API documentation with production URLs
2. **Set Up Monitoring**: Configure alerts for downtime
3. **Backup Strategy**: Set up database backups
4. **Performance Testing**: Load test your API
5. **CI/CD**: Set up automated testing and deployment

## Support

- **Railway Documentation**: [docs.railway.app](https://docs.railway.app)
- **Railway Discord**: [discord.gg/railway](https://discord.gg/railway)
- **SmartFarm Support**: info@smartfarm-app.com

---

**Congratulations!** Your SmartFarm backend is now deployed on Railway and ready to serve your web and mobile applications! 🎉
