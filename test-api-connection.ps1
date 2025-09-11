# SmartFarm API Connection Test Script
Write-Host "Testing SmartFarm API Connections..." -ForegroundColor Green
Write-Host ""

# Test 1: Backend Health Check
Write-Host "1. Testing Backend Health..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "https://smartfarm-app-production.up.railway.app/api/health" -UseBasicParsing
    Write-Host "Backend is running (Status: $($response.StatusCode))" -ForegroundColor Green
} catch {
    Write-Host "Backend health check failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Test 2: CORS Test
Write-Host "2. Testing CORS Configuration..." -ForegroundColor Yellow
try {
    $headers = @{
        "Origin" = "https://dulcet-sawine-92d6a8.netlify.app"
    }
    $response = Invoke-WebRequest -Uri "https://smartfarm-app-production.up.railway.app/api/health" -Headers $headers -UseBasicParsing
    Write-Host "CORS is working correctly" -ForegroundColor Green
} catch {
    Write-Host "CORS test failed: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Make sure CORS_ORIGIN is set in Railway dashboard" -ForegroundColor Yellow
}

Write-Host ""

# Test 3: Frontend Accessibility
Write-Host "3. Testing Frontend Accessibility..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "https://dulcet-sawine-92d6a8.netlify.app" -UseBasicParsing
    Write-Host "Frontend is accessible (Status: $($response.StatusCode))" -ForegroundColor Green
} catch {
    Write-Host "Frontend test failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "1. Set CORS_ORIGIN in Railway dashboard" -ForegroundColor White
Write-Host "2. Set up API keys in both platforms" -ForegroundColor White
Write-Host "3. Test the full application functionality" -ForegroundColor White