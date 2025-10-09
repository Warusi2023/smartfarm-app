# Test Railway Backend CORS Configuration
# This script will help diagnose the CORS issue

Write-Host "🔍 Testing Railway Backend CORS Configuration" -ForegroundColor Cyan
Write-Host "=" * 60

$BACKEND_URL = "https://smartfarm-app-production.up.railway.app"
$TEST_ORIGIN = "https://www.smartfarm-app.com"

Write-Host ""
Write-Host "📡 Testing Backend Health Endpoint..." -ForegroundColor Yellow

try {
    $response = Invoke-WebRequest -Uri "$BACKEND_URL/api/health" -Method GET -ErrorAction Stop -TimeoutSec 10
    Write-Host "✅ Status Code: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "✅ Response Content: $($response.Content)" -ForegroundColor Green
    
    # Check CORS headers
    $corsOrigin = $response.Headers['Access-Control-Allow-Origin']
    if ($corsOrigin) {
        Write-Host "✅ CORS Origin Header: $corsOrigin" -ForegroundColor Green
        
        if ($corsOrigin -eq $TEST_ORIGIN) {
            Write-Host "✅ CORS is correctly configured!" -ForegroundColor Green
        } elseif ($corsOrigin -eq "*") {
            Write-Host "⚠️ CORS is set to wildcard (*) - may work but not ideal" -ForegroundColor Yellow
        } elseif ($corsOrigin -eq "https://railway.com") {
            Write-Host "❌ CORS is set to railway.com - this is the problem!" -ForegroundColor Red
            Write-Host "❌ Environment variables not set correctly in Railway" -ForegroundColor Red
        } else {
            Write-Host "⚠️ CORS is set to unexpected origin: $corsOrigin" -ForegroundColor Yellow
        }
    } else {
        Write-Host "❌ No CORS Origin header found" -ForegroundColor Red
    }
    
} catch {
    Write-Host "❌ Health endpoint failed: $($_.Exception.Message)" -ForegroundColor Red
    
    if ($_.Exception.Message -like "*502*") {
        Write-Host "❌ Backend is returning 502 - service not running" -ForegroundColor Red
    } elseif ($_.Exception.Message -like "*404*") {
        Write-Host "❌ Backend is returning 404 - endpoint not found" -ForegroundColor Red
    } elseif ($_.Exception.Message -like "*timeout*") {
        Write-Host "❌ Backend is timing out - service not responding" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "🌐 Testing CORS with Origin Header..." -ForegroundColor Yellow

try {
    $corsResponse = Invoke-WebRequest -Uri "$BACKEND_URL/api/health" -Method GET -Headers @{"Origin"=$TEST_ORIGIN} -ErrorAction Stop -TimeoutSec 10
    Write-Host "✅ CORS Test Status: $($corsResponse.StatusCode)" -ForegroundColor Green
    
    $corsOrigin = $corsResponse.Headers['Access-Control-Allow-Origin']
    $corsMethods = $corsResponse.Headers['Access-Control-Allow-Methods']
    $corsCredentials = $corsResponse.Headers['Access-Control-Allow-Credentials']
    
    Write-Host "✅ CORS Origin: $corsOrigin" -ForegroundColor White
    Write-Host "✅ CORS Methods: $corsMethods" -ForegroundColor White
    Write-Host "✅ CORS Credentials: $corsCredentials" -ForegroundColor White
    
    if ($corsOrigin -eq $TEST_ORIGIN) {
        Write-Host "✅ CORS is working correctly!" -ForegroundColor Green
    } else {
        Write-Host "❌ CORS is not configured correctly" -ForegroundColor Red
    }
    
} catch {
    Write-Host "❌ CORS test failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "🔧 Testing OPTIONS Preflight..." -ForegroundColor Yellow

try {
    $optionsResponse = Invoke-WebRequest -Uri "$BACKEND_URL/api/health" -Method OPTIONS -Headers @{
        "Origin"=$TEST_ORIGIN
        "Access-Control-Request-Method"="GET"
        "Access-Control-Request-Headers"="Content-Type"
    } -ErrorAction Stop -TimeoutSec 10
    
    Write-Host "✅ OPTIONS Status: $($optionsResponse.StatusCode)" -ForegroundColor Green
    
    $corsOrigin = $optionsResponse.Headers['Access-Control-Allow-Origin']
    $corsMethods = $optionsResponse.Headers['Access-Control-Allow-Methods']
    
    Write-Host "✅ Preflight CORS Origin: $corsOrigin" -ForegroundColor White
    Write-Host "✅ Preflight CORS Methods: $corsMethods" -ForegroundColor White
    
} catch {
    Write-Host "❌ OPTIONS preflight failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "=" * 60
Write-Host "📊 DIAGNOSIS SUMMARY" -ForegroundColor Cyan
Write-Host "=" * 60

Write-Host ""
Write-Host "Based on the test results:" -ForegroundColor White

if ($corsOrigin -eq "https://railway.com") {
    Write-Host "❌ PROBLEM IDENTIFIED: CORS is set to railway.com" -ForegroundColor Red
    Write-Host ""
    Write-Host "🔧 SOLUTION:" -ForegroundColor Yellow
    Write-Host "1. Go to Railway Dashboard: https://railway.app/dashboard" -ForegroundColor White
    Write-Host "2. Find your backend service" -ForegroundColor White
    Write-Host "3. Go to Variables tab" -ForegroundColor White
    Write-Host "4. Add/update this variable:" -ForegroundColor White
    Write-Host "   CORS_ORIGINS=https://www.smartfarm-app.com,https://smartfarm-app.netlify.app" -ForegroundColor White
    Write-Host "5. Wait for auto-deployment (2-3 minutes)" -ForegroundColor White
    Write-Host "6. Run this script again to verify" -ForegroundColor White
} elseif ($corsOrigin -eq $TEST_ORIGIN) {
    Write-Host "✅ CORS is configured correctly!" -ForegroundColor Green
    Write-Host "✅ Your backend should be working" -ForegroundColor Green
} else {
    Write-Host "⚠️ CORS configuration needs attention" -ForegroundColor Yellow
    Write-Host "Current origin: $corsOrigin" -ForegroundColor White
    Write-Host "Expected origin: $TEST_ORIGIN" -ForegroundColor White
}

Write-Host ""
Write-Host "=" * 60
