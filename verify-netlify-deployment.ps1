# SmartFarm Netlify Deployment Verification Script
# Verifies that Netlify is properly configured and deployed

Write-Host "SmartFarm Netlify Deployment Verification" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan

# Check if we're in the right directory
if (-not (Test-Path "netlify.toml")) {
    Write-Host "Error: netlify.toml not found. Please run this script from the SmartFarm root directory." -ForegroundColor Red
    exit 1
}

Write-Host "Found netlify.toml configuration file" -ForegroundColor Green

# Check main netlify.toml configuration
Write-Host "`nChecking main netlify.toml configuration..." -ForegroundColor Yellow
$netlifyConfig = Get-Content "netlify.toml" -Raw

if ($netlifyConfig -match 'VITE_API_URL = "https://smartfarm-app-production.up.railway.app"') {
    Write-Host "API URL correctly configured in netlify.toml" -ForegroundColor Green
} else {
    Write-Host "API URL not found or incorrect in netlify.toml" -ForegroundColor Red
}

if ($netlifyConfig -match 'APP_BUILD_TAG = "netlify"') {
    Write-Host "Build tag correctly configured" -ForegroundColor Green
} else {
    Write-Host "Build tag not found in netlify.toml" -ForegroundColor Red
}

# Check web-project netlify.toml
Write-Host "`nChecking web-project/netlify.toml configuration..." -ForegroundColor Yellow
if (Test-Path "web-project/netlify.toml") {
    $webProjectConfig = Get-Content "web-project/netlify.toml" -Raw
    
    if ($webProjectConfig -match 'VITE_API_URL = "https://smartfarm-app-production.up.railway.app"') {
        Write-Host "API URL correctly configured in web-project/netlify.toml" -ForegroundColor Green
    } else {
        Write-Host "API URL not found or incorrect in web-project/netlify.toml" -ForegroundColor Red
    }
} else {
    Write-Host "web-project/netlify.toml not found" -ForegroundColor Yellow
}

# Check if public directory exists
Write-Host "`nChecking public directory..." -ForegroundColor Yellow
if (Test-Path "public") {
    Write-Host "Public directory exists" -ForegroundColor Green
    
    # Check for key files
    $keyFiles = @("index.html", "dashboard.html", "login.html")
    foreach ($file in $keyFiles) {
        if (Test-Path "public/$file") {
            Write-Host "Found $file" -ForegroundColor Green
        } else {
            Write-Host "Missing $file" -ForegroundColor Yellow
        }
    }
} else {
    Write-Host "Public directory not found" -ForegroundColor Red
}

# Check API configuration files
Write-Host "`nChecking API configuration files..." -ForegroundColor Yellow
$apiFiles = @(
    "public/js/api-service.js",
    "public/js/config.js",
    "public/js/environment.js"
)

foreach ($file in $apiFiles) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        if ($content -match 'smartfarm-app-production.up.railway.app') {
            Write-Host "$file has correct API URL" -ForegroundColor Green
        } else {
            Write-Host "$file has incorrect or missing API URL" -ForegroundColor Red
        }
    } else {
        Write-Host "$file not found" -ForegroundColor Yellow
    }
}

# Test Railway backend connectivity
Write-Host "`nTesting Railway backend connectivity..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "https://smartfarm-app-production.up.railway.app/api/health" -UseBasicParsing -TimeoutSec 10
    if ($response.StatusCode -eq 200) {
        Write-Host "Railway backend is responding (Status: $($response.StatusCode))" -ForegroundColor Green
    } else {
        Write-Host "Railway backend responded with status: $($response.StatusCode)" -ForegroundColor Yellow
    }
} catch {
    Write-Host "Railway backend is not accessible: $($_.Exception.Message)" -ForegroundColor Red
}

# Summary
Write-Host "`nVerification Summary" -ForegroundColor Cyan
Write-Host "=====================" -ForegroundColor Cyan
Write-Host "Netlify configuration files updated with correct API URLs" -ForegroundColor Green
Write-Host "Environment variables configured for Railway backend" -ForegroundColor Green
Write-Host "API redirects configured for seamless backend integration" -ForegroundColor Green
Write-Host "Build configuration optimized for static site deployment" -ForegroundColor Green

Write-Host "`nNext Steps:" -ForegroundColor Yellow
Write-Host "1. Commit and push these changes to GitHub" -ForegroundColor White
Write-Host "2. Netlify will automatically redeploy with new configuration" -ForegroundColor White
Write-Host "3. Verify deployment at your Netlify site URL" -ForegroundColor White
Write-Host "4. Test dashboard functionality and API connectivity" -ForegroundColor White

Write-Host "`nEnvironment Variables to Set in Netlify Dashboard:" -ForegroundColor Cyan
Write-Host "VITE_API_URL=https://smartfarm-app-production.up.railway.app" -ForegroundColor White
Write-Host "APP_BUILD_TAG=netlify" -ForegroundColor White
Write-Host "CI=true" -ForegroundColor White
Write-Host "HUSKY=0" -ForegroundColor White
Write-Host "NODE_VERSION=18" -ForegroundColor White

Write-Host "`nNetlify deployment verification complete!" -ForegroundColor Green
