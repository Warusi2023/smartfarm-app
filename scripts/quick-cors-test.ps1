# Quick CORS Test Script for SmartFarm
# Tests if backend CORS is configured correctly

Write-Host "🧪 Testing SmartFarm Backend CORS Configuration" -ForegroundColor Cyan
Write-Host "=" * 60

$BACKEND_URL = "https://smartfarm-app-production.up.railway.app"
$ORIGIN = "https://www.smartfarm-app.com"

Write-Host ""
Write-Host "📡 Testing Health Endpoint..." -ForegroundColor Yellow
try {
    $healthResponse = Invoke-WebRequest -Uri "$BACKEND_URL/api/health" -Method GET -ErrorAction Stop
    Write-Host "✅ Status: $($healthResponse.StatusCode)" -ForegroundColor Green
    Write-Host "✅ Response: $($healthResponse.Content)" -ForegroundColor Green
} catch {
    Write-Host "❌ Health endpoint failed: $_" -ForegroundColor Red
    Write-Host ""
    Write-Host "Backend is not responding. Please:" -ForegroundColor Yellow
    Write-Host "1. Check Railway service is running" -ForegroundColor Yellow
    Write-Host "2. Check environment variables are set" -ForegroundColor Yellow
    Write-Host "3. Check Railway logs for errors" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "🌐 Testing CORS for origin: $ORIGIN" -ForegroundColor Yellow

# Test GET with Origin header
Write-Host "  Testing GET request with Origin header..." -ForegroundColor Cyan
try {
    $getResponse = Invoke-WebRequest -Uri "$BACKEND_URL/api/health" -Method GET -Headers @{"Origin"=$ORIGIN} -ErrorAction Stop
    $corsOrigin = $getResponse.Headers['Access-Control-Allow-Origin']
    
    Write-Host "  Status: $($getResponse.StatusCode)" -ForegroundColor White
    Write-Host "  CORS Origin: $corsOrigin" -ForegroundColor White
    
    if ($corsOrigin -eq $ORIGIN) {
        Write-Host "  ✅ GET CORS is working correctly!" -ForegroundColor Green
    } else {
        Write-Host "  ❌ GET CORS failed! Expected: $ORIGIN, Got: $corsOrigin" -ForegroundColor Red
    }
} catch {
    Write-Host "  ❌ GET request failed: $_" -ForegroundColor Red
}

Write-Host ""
Write-Host "  Testing OPTIONS preflight..." -ForegroundColor Cyan
try {
    $optionsResponse = Invoke-WebRequest -Uri "$BACKEND_URL/api/health" -Method OPTIONS -Headers @{
        "Origin"=$ORIGIN
        "Access-Control-Request-Method"="GET"
        "Access-Control-Request-Headers"="Content-Type"
    } -ErrorAction Stop
    
    $corsOrigin = $optionsResponse.Headers['Access-Control-Allow-Origin']
    $corsMethods = $optionsResponse.Headers['Access-Control-Allow-Methods']
    
    Write-Host "  Status: $($optionsResponse.StatusCode)" -ForegroundColor White
    Write-Host "  CORS Origin: $corsOrigin" -ForegroundColor White
    Write-Host "  CORS Methods: $corsMethods" -ForegroundColor White
    
    if ($optionsResponse.StatusCode -in @(200, 204) -and $corsOrigin -eq $ORIGIN) {
        Write-Host "  ✅ OPTIONS preflight is working correctly!" -ForegroundColor Green
    } else {
        Write-Host "  ❌ OPTIONS preflight failed!" -ForegroundColor Red
    }
} catch {
    Write-Host "  ❌ OPTIONS request failed: $_" -ForegroundColor Red
}

Write-Host ""
Write-Host "=" * 60
Write-Host "📊 Summary:" -ForegroundColor Cyan
Write-Host ""
Write-Host "If both tests passed (✅), your CORS is configured correctly!" -ForegroundColor Green
Write-Host "If tests failed (❌), check:" -ForegroundColor Yellow
Write-Host "  1. Railway backend is deployed" -ForegroundColor Yellow
Write-Host "  2. Environment variables are set (CORS_ORIGINS, NODE_ENV)" -ForegroundColor Yellow
Write-Host "  3. Railway logs show: 'SmartFarm API listening on...'" -ForegroundColor Yellow
Write-Host ""
