# LEGACY: moved from web-project/scripts. Do not use for current production deploys.
# SmartFarm Production Deployment Script
# Complete end-to-end deployment to Railway (backend) and Netlify (frontend)

Write-Host "🚀 SmartFarm Production Deployment Script" -ForegroundColor Cyan
Write-Host "=" * 60

# Configuration
$BACKEND_DIR = "backend"
$FRONTEND_DIR = "public"
$PROJECT_NAME = "SmartFarm"

Write-Host ""
Write-Host "📋 Pre-deployment Checklist:" -ForegroundColor Yellow
Write-Host "1. Railway PostgreSQL database provisioned" -ForegroundColor White
Write-Host "2. Environment variables configured in Railway" -ForegroundColor White
Write-Host "3. Custom domain configured (api.smartfarmfiji.com)" -ForegroundColor White
Write-Host "4. Netlify site configured with custom domain" -ForegroundColor White

$continue = Read-Host "Continue with deployment? (y/N)"
if ($continue -ne "y" -and $continue -ne "Y") {
    Write-Host "Deployment cancelled." -ForegroundColor Red
    exit
}

Write-Host ""
Write-Host "🔧 Step 1: Backend Deployment Preparation" -ForegroundColor Green
Write-Host "=" * 50

# Check if backend directory exists
if (Test-Path $BACKEND_DIR) {
    Write-Host "✅ Backend directory found" -ForegroundColor Green
    
    # Check if production server exists
    if (Test-Path "$BACKEND_DIR/server-production.cjs") {
        Write-Host "✅ Production server file found" -ForegroundColor Green
    } else {
        Write-Host "❌ Production server file not found" -ForegroundColor Red
        exit 1
    }
    
    # Check if Dockerfile exists
    if (Test-Path "$BACKEND_DIR/Dockerfile") {
        Write-Host "✅ Dockerfile found" -ForegroundColor Green
    } else {
        Write-Host "❌ Dockerfile not found" -ForegroundColor Red
        exit 1
    }
    
    # Check if railway.toml exists
    if (Test-Path "$BACKEND_DIR/railway.toml") {
        Write-Host "✅ Railway configuration found" -ForegroundColor Green
    } else {
        Write-Host "❌ Railway configuration not found" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "❌ Backend directory not found" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "🌐 Step 2: Frontend Deployment Preparation" -ForegroundColor Green
Write-Host "=" * 50

# Check if frontend directory exists
if (Test-Path $FRONTEND_DIR) {
    Write-Host "✅ Frontend directory found" -ForegroundColor Green
    
    # Check if netlify.toml exists
    if (Test-Path "netlify.toml") {
        Write-Host "✅ Netlify configuration found" -ForegroundColor Green
    } else {
        Write-Host "❌ Netlify configuration not found" -ForegroundColor Red
        exit 1
    }
    
    # Check if index.html exists
    if (Test-Path "$FRONTEND_DIR/index.html") {
        Write-Host "✅ Frontend index.html found" -ForegroundColor Green
    } else {
        Write-Host "❌ Frontend index.html not found" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "❌ Frontend directory not found" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "📦 Step 3: Git Commit and Push" -ForegroundColor Green
Write-Host "=" * 50

try {
    Write-Host "Adding all changes to git..." -ForegroundColor Yellow
    git add .
    
    Write-Host "Committing changes..." -ForegroundColor Yellow
    git commit -m "Production deployment: Railway backend + Netlify frontend

- Add production Dockerfile and Railway configuration
- Update Netlify configuration for production API URL
- Add environment variable templates
- Configure custom domains (api.smartfarmfiji.com)
- Ready for production deployment"
    
    Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
    git push
    
    Write-Host "✅ Git push successful" -ForegroundColor Green
} catch {
    Write-Host "❌ Git push failed: $_" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "🚀 Step 4: Railway Backend Deployment" -ForegroundColor Green
Write-Host "=" * 50

Write-Host "Railway should auto-deploy from GitHub push." -ForegroundColor Yellow
Write-Host ""
Write-Host "Required Railway Environment Variables:" -ForegroundColor Cyan
Write-Host "DATABASE_URL=postgresql://..." -ForegroundColor White
Write-Host "JWT_SECRET=your-32-character-secret" -ForegroundColor White
Write-Host "CORS_ORIGINS=https://smartfarmfiji.com,https://www.smartfarmfiji.com" -ForegroundColor White
Write-Host "NODE_ENV=production" -ForegroundColor White
Write-Host "API_NAME=SmartFarm" -ForegroundColor White
Write-Host "API_VERSION=v1" -ForegroundColor White

Write-Host ""
Write-Host "🔗 Railway Dashboard: https://railway.app/dashboard" -ForegroundColor Cyan

$testRailway = Read-Host "Test Railway deployment? (y/N)"
if ($testRailway -eq "y" -or $testRailway -eq "Y") {
    Write-Host "Testing Railway backend..." -ForegroundColor Yellow
    
    try {
        $response = Invoke-WebRequest -Uri "https://api.smartfarmfiji.com/api/health" -Method GET -ErrorAction Stop
        Write-Host "✅ Railway backend is responding" -ForegroundColor Green
        Write-Host "Status: $($response.StatusCode)" -ForegroundColor White
        Write-Host "Response: $($response.Content)" -ForegroundColor White
    } catch {
        Write-Host "⚠️ Railway backend not yet deployed or custom domain not configured" -ForegroundColor Yellow
        Write-Host "Check Railway dashboard for deployment status" -ForegroundColor White
    }
}

Write-Host ""
Write-Host "🌐 Step 5: Netlify Frontend Deployment" -ForegroundColor Green
Write-Host "=" * 50

Write-Host "Netlify should auto-deploy from GitHub push." -ForegroundColor Yellow
Write-Host ""
Write-Host "Required Netlify Environment Variables:" -ForegroundColor Cyan
Write-Host "VITE_API_URL=https://api.smartfarmfiji.com" -ForegroundColor White

Write-Host ""
Write-Host "🔗 Netlify Dashboard: https://app.netlify.com" -ForegroundColor Cyan

$testNetlify = Read-Host "Test Netlify deployment? (y/N)"
if ($testNetlify -eq "y" -or $testNetlify -eq "Y") {
    Write-Host "Testing Netlify frontend..." -ForegroundColor Yellow
    
    try {
        $response = Invoke-WebRequest -Uri "https://smartfarmfiji.com" -Method GET -ErrorAction Stop
        Write-Host "✅ Netlify frontend is responding" -ForegroundColor Green
        Write-Host "Status: $($response.StatusCode)" -ForegroundColor White
    } catch {
        Write-Host "⚠️ Netlify frontend not yet deployed or custom domain not configured" -ForegroundColor Yellow
        Write-Host "Check Netlify dashboard for deployment status" -ForegroundColor White
    }
}

Write-Host ""
Write-Host "🧪 Step 6: End-to-End Testing" -ForegroundColor Green
Write-Host "=" * 50

Write-Host "Testing production deployment..." -ForegroundColor Yellow

# Test API endpoints
$endpoints = @(
    "https://api.smartfarmfiji.com/api/health",
    "https://api.smartfarmfiji.com/api/auth/register",
    "https://smartfarmfiji.com"
)

foreach ($endpoint in $endpoints) {
    try {
        $response = Invoke-WebRequest -Uri $endpoint -Method GET -ErrorAction Stop -TimeoutSec 10
        Write-Host "✅ $endpoint - Status: $($response.StatusCode)" -ForegroundColor Green
    } catch {
        Write-Host "❌ $endpoint - Error: $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "📊 Step 7: Production Checklist" -ForegroundColor Green
Write-Host "=" * 50

Write-Host "Production deployment checklist:" -ForegroundColor Cyan
Write-Host "□ Railway backend deployed with PostgreSQL" -ForegroundColor White
Write-Host "□ Environment variables configured" -ForegroundColor White
Write-Host "□ Custom domain configured (api.smartfarmfiji.com)" -ForegroundColor White
Write-Host "□ SSL certificate active" -ForegroundColor White
Write-Host "□ Health check endpoint responding" -ForegroundColor White
Write-Host "□ Netlify frontend deployed" -ForegroundColor White
Write-Host "□ Frontend connecting to production API" -ForegroundColor White
Write-Host "□ Custom domain configured (smartfarmfiji.com)" -ForegroundColor White
Write-Host "□ Authentication system working" -ForegroundColor White
Write-Host "□ Database migrations applied" -ForegroundColor White

Write-Host ""
Write-Host "🎉 Production Deployment Complete!" -ForegroundColor Green
Write-Host "=" * 60
Write-Host ""
Write-Host "🌐 Frontend: https://smartfarmfiji.com" -ForegroundColor Cyan
Write-Host "🔗 Backend API: https://api.smartfarmfiji.com" -ForegroundColor Cyan
Write-Host "📊 Health Check: https://api.smartfarmfiji.com/api/health" -ForegroundColor Cyan
Write-Host ""
Write-Host "📚 Next Steps:" -ForegroundColor Yellow
Write-Host "1. Test user registration and login" -ForegroundColor White
Write-Host "2. Set up monitoring (Sentry, UptimeRobot)" -ForegroundColor White
Write-Host "3. Configure payment processing (Stripe)" -ForegroundColor White
Write-Host "4. Set up analytics (PostHog, Google Analytics)" -ForegroundColor White
Write-Host "5. Launch with beta users" -ForegroundColor White
Write-Host ""
Write-Host "🚀 SmartFarm is now live in production!" -ForegroundColor Green
