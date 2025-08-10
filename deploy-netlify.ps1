# SmartFarm Netlify Deployment Script
Write-Host "Starting SmartFarm Netlify Deployment..." -ForegroundColor Green

# Configuration
$projectName = "smartfarm-app"
$buildDir = "web/build/distributions/web"
$deployDir = "netlify-deploy"

Write-Host "Deployment Configuration:" -ForegroundColor Yellow
Write-Host "  Project Name: $projectName" -ForegroundColor White
Write-Host "  Build Directory: $buildDir" -ForegroundColor White
Write-Host "  Deploy Directory: $deployDir" -ForegroundColor White
Write-Host ""

# Step 1: Check if build exists
Write-Host "Step 1: Checking Build Files..." -ForegroundColor Yellow
if (Test-Path $buildDir) {
    Write-Host "  PASS: Build directory found" -ForegroundColor Green
} else {
    Write-Host "  FAIL: Build directory not found. Building application..." -ForegroundColor Red
    try {
        Write-Host "  Building with Gradle..." -ForegroundColor Cyan
        ./gradlew :web:build --no-daemon --quiet
        if ($LASTEXITCODE -eq 0) {
            Write-Host "  PASS: Build completed successfully" -ForegroundColor Green
        } else {
            Write-Host "  FAIL: Build failed" -ForegroundColor Red
            exit 1
        }
    } catch {
        Write-Host "  FAIL: Build error: $($_.Exception.Message)" -ForegroundColor Red
        exit 1
    }
}

Write-Host ""

# Step 2: Create deployment directory
Write-Host "Step 2: Preparing Deployment Files..." -ForegroundColor Yellow
if (Test-Path $deployDir) {
    Remove-Item $deployDir -Recurse -Force
}
New-Item -ItemType Directory -Path $deployDir | Out-Null

# Copy build files
Copy-Item "$buildDir/*" $deployDir -Recurse -Force
Write-Host "  PASS: Build files copied to deployment directory" -ForegroundColor Green

Write-Host ""

# Step 3: Create Netlify configuration
Write-Host "Step 3: Creating Netlify Configuration..." -ForegroundColor Yellow

# Create netlify.toml
$netlifyConfig = @"
[build]
  publish = "."
  command = "echo 'Build completed'"

[build.environment]
  NODE_VERSION = "18"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
"@

Set-Content -Path "$deployDir/netlify.toml" -Value $netlifyConfig
Write-Host "  PASS: Netlify configuration created" -ForegroundColor Green

# Create _redirects file for SPA routing
$redirects = "/*    /index.html   200"
Set-Content -Path "$deployDir/_redirects" -Value $redirects
Write-Host "  PASS: SPA redirects configured" -ForegroundColor Green

Write-Host ""

# Step 4: Create deployment instructions
Write-Host "Step 4: Creating Deployment Instructions..." -ForegroundColor Yellow

$instructions = @"
# SmartFarm Netlify Deployment Instructions

## Quick Deploy Steps:

1. **Go to Netlify Dashboard**
   - Visit: https://app.netlify.com
   - Sign up/Login with GitHub, GitLab, or email

2. **Deploy from Files**
   - Click "Sites" in the top menu
   - Drag and drop the entire '$deployDir' folder to the deploy area
   - Wait for deployment to complete

3. **Configure Environment Variables**
   - Go to Site Settings > Environment Variables
   - Add the following variables:
     - GOOGLE_MAPS_API_KEY = your_google_maps_api_key
     - OPENWEATHER_API_KEY = your_openweather_api_key
     - OPENAI_API_KEY = your_openai_api_key

4. **Custom Domain (Optional)**
   - Go to Site Settings > Domain Management
   - Add your custom domain
   - SSL certificate will be provided automatically

## Build Settings (if deploying from Git):
- Build Command: ./gradlew :web:build
- Publish Directory: web/build/distributions/web

## Post-Deployment:
1. Test all features on the deployed site
2. Configure API keys for full functionality
3. Set up monitoring and analytics

Your SmartFarm application will be live at: https://your-site-name.netlify.app
"@

Set-Content -Path "NETLIFY_DEPLOYMENT_INSTRUCTIONS.md" -Value $instructions
Write-Host "  PASS: Deployment instructions created" -ForegroundColor Green

Write-Host ""

# Step 5: Create API keys setup reminder
Write-Host "Step 5: Creating API Keys Setup Guide..." -ForegroundColor Yellow

$apiSetup = @"
# API Keys Setup for SmartFarm

## Required API Keys:

### 1. Google Maps API
- Go to: https://console.cloud.google.com
- Create new project or select existing
- Enable Maps JavaScript API
- Create API key and restrict to your domain

### 2. OpenWeather API
- Go to: https://openweathermap.org/api
- Sign up for free account
- Get API key (1,000 calls/day free)

### 3. OpenAI API
- Go to: https://platform.openai.com
- Create account and add payment method
- Get API key and set usage limits

## Environment Variables to Set in Netlify:
- GOOGLE_MAPS_API_KEY = your_google_maps_api_key
- OPENWEATHER_API_KEY = your_openweather_api_key
- OPENAI_API_KEY = your_openai_api_key

## Security Notes:
- Never commit API keys to version control
- Use environment variables in production
- Set appropriate usage limits and restrictions
"@

Set-Content -Path "API_KEYS_SETUP_NETLIFY.md" -Value $apiSetup
Write-Host "  PASS: API keys setup guide created" -ForegroundColor Green

Write-Host ""

# Step 6: Create deployment summary
Write-Host "Step 6: Creating Deployment Summary..." -ForegroundColor Yellow

$summary = @"
# SmartFarm Netlify Deployment Summary

## Deployment Status: READY
- Build Files: ✅ Prepared
- Configuration: ✅ Created
- Instructions: ✅ Generated
- API Setup: ✅ Documented

## Files Created:
- $deployDir/ - Deployment files
- NETLIFY_DEPLOYMENT_INSTRUCTIONS.md - Step-by-step guide
- API_KEYS_SETUP_NETLIFY.md - API configuration guide

## Next Steps:
1. Follow NETLIFY_DEPLOYMENT_INSTRUCTIONS.md
2. Deploy to Netlify dashboard
3. Configure API keys
4. Test deployed application

## Deployment Time: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')
"@

Set-Content -Path "NETLIFY_DEPLOYMENT_SUMMARY.md" -Value $summary
Write-Host "  PASS: Deployment summary created" -ForegroundColor Green

Write-Host ""

# Final summary
Write-Host "Netlify Deployment Preparation Complete!" -ForegroundColor Green
Write-Host "=======================================" -ForegroundColor Green
Write-Host "Deployment Directory: $deployDir" -ForegroundColor Cyan
Write-Host "Instructions: NETLIFY_DEPLOYMENT_INSTRUCTIONS.md" -ForegroundColor Cyan
Write-Host "API Setup: API_KEYS_SETUP_NETLIFY.md" -ForegroundColor Cyan
Write-Host "Summary: NETLIFY_DEPLOYMENT_SUMMARY.md" -ForegroundColor Cyan

Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "1. Go to https://app.netlify.com" -ForegroundColor White
Write-Host "2. Drag and drop the '$deployDir' folder to deploy" -ForegroundColor White
Write-Host "3. Configure environment variables for API keys" -ForegroundColor White
Write-Host "4. Test your deployed SmartFarm application!" -ForegroundColor White

Write-Host ""
Write-Host "SmartFarm is ready for Netlify deployment! 🚀" -ForegroundColor Green 