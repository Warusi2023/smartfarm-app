# SmartFarm Railway Backend Verification Script

Write-Host "SmartFarm Railway Backend Verification" -ForegroundColor Cyan
Write-Host "=======================================" -ForegroundColor Cyan

$railwayUrl = "https://smartfarm-app-production.up.railway.app"

# Test 1: Check if Railway backend is accessible
Write-Host "`n[TEST 1] Checking Railway Backend Accessibility..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "$railwayUrl/api/health" -UseBasicParsing -TimeoutSec 10
    Write-Host "[PASS] Railway backend is accessible!" -ForegroundColor Green
    Write-Host "Status Code: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "Response: $($response.Content)" -ForegroundColor Green
} catch {
    $statusCode = $_.Exception.Response.StatusCode.value__
    Write-Host "[FAIL] Railway backend returned error: $statusCode" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    
    if ($statusCode -eq 502) {
        Write-Host "`nDiagnosis: 502 Bad Gateway - Backend not responding" -ForegroundColor Yellow
        Write-Host "Possible causes:" -ForegroundColor Yellow
        Write-Host "1. Railway deployment still in progress" -ForegroundColor White
        Write-Host "2. Backend build failed" -ForegroundColor White
        Write-Host "3. Health check failing" -ForegroundColor White
        Write-Host "4. Port binding issues" -ForegroundColor White
    } elseif ($statusCode -eq 503) {
        Write-Host "`nDiagnosis: 503 Service Unavailable - Backend down" -ForegroundColor Yellow
        Write-Host "Possible causes:" -ForegroundColor Yellow
        Write-Host "1. Railway service not started" -ForegroundColor White
        Write-Host "2. Health check timeout" -ForegroundColor White
        Write-Host "3. Application crashed" -ForegroundColor White
    }
}

# Test 2: Check Railway deployment status
Write-Host "`n[TEST 2] Railway Deployment Checklist..." -ForegroundColor Yellow
Write-Host "Please verify these in Railway dashboard:" -ForegroundColor White
Write-Host "1. Go to: https://railway.app/dashboard" -ForegroundColor Cyan
Write-Host "2. Select your SmartFarm project" -ForegroundColor Cyan
Write-Host "3. Check Deployments tab:" -ForegroundColor Cyan
Write-Host "   - Latest deployment should be 'Active' (green)" -ForegroundColor White
Write-Host "   - Build logs should show 'Using Nixpacks'" -ForegroundColor White
Write-Host "   - Should see: 'SmartFarm API server running on port XXX'" -ForegroundColor White
Write-Host "   - Health check should be passing" -ForegroundColor White

# Test 3: Check local backend
Write-Host "`n[TEST 3] Checking Local Backend..." -ForegroundColor Yellow
if (Test-Path "backend/server-simple.cjs") {
    Write-Host "[PASS] backend/server-simple.cjs exists" -ForegroundColor Green
} else {
    Write-Host "[FAIL] backend/server-simple.cjs not found" -ForegroundColor Red
}

if (Test-Path "backend/package.json") {
    Write-Host "[PASS] backend/package.json exists" -ForegroundColor Green
} else {
    Write-Host "[FAIL] backend/package.json not found" -ForegroundColor Red
}

# Test 4: Check configuration files
Write-Host "`n[TEST 4] Checking Configuration Files..." -ForegroundColor Yellow
if (Test-Path "railway.toml") {
    $railwayConfig = Get-Content "railway.toml" -Raw
    if ($railwayConfig -match 'builder = "NIXPACKS"') {
        Write-Host "[PASS] railway.toml configured for NIXPACKS" -ForegroundColor Green
    } else {
        Write-Host "[WARN] railway.toml not configured for NIXPACKS" -ForegroundColor Yellow
    }
    
    if ($railwayConfig -match 'root = "backend"') {
        Write-Host "[PASS] railway.toml root set to backend" -ForegroundColor Green
    } else {
        Write-Host "[WARN] railway.toml root not set to backend" -ForegroundColor Yellow
    }
} else {
    Write-Host "[FAIL] railway.toml not found" -ForegroundColor Red
}

# Test 5: Performance Optimizer Fix
Write-Host "`n[TEST 5] Checking Performance Optimizer Fix..." -ForegroundColor Yellow
if (Test-Path "public/js/performance-optimizer.js") {
    $perfOptimizer = Get-Content "public/js/performance-optimizer.js" -Raw
    if ($perfOptimizer -match 'suppressRailwayErrors') {
        Write-Host "[PASS] Railway error suppression implemented" -ForegroundColor Green
    } else {
        Write-Host "[FAIL] Railway error suppression not found" -ForegroundColor Red
    }
    
    if ($perfOptimizer -match 'isRailwayError') {
        Write-Host "[PASS] Railway error detection implemented" -ForegroundColor Green
    } else {
        Write-Host "[FAIL] Railway error detection not found" -ForegroundColor Red
    }
} else {
    Write-Host "[FAIL] performance-optimizer.js not found" -ForegroundColor Red
}

# Summary
Write-Host "`n=======================================" -ForegroundColor Cyan
Write-Host "Verification Summary" -ForegroundColor Cyan
Write-Host "`nExpected Behavior:" -ForegroundColor Yellow
Write-Host "1. Railway backend should respond with 200 OK" -ForegroundColor White
Write-Host "2. Health check should return: {ok:true,service:'SmartFarm',...}" -ForegroundColor White
Write-Host "3. Performance optimizer should suppress Railway errors" -ForegroundColor White
Write-Host "4. Dashboard should work even if backend is down (using cache)" -ForegroundColor White

Write-Host "`nIf Railway backend is not accessible:" -ForegroundColor Yellow
Write-Host "1. Check Railway dashboard for deployment status" -ForegroundColor White
Write-Host "2. Review build logs for errors" -ForegroundColor White
Write-Host "3. Verify environment variables are set" -ForegroundColor White
Write-Host "4. Try manual redeploy from Railway dashboard" -ForegroundColor White

Write-Host "`nPerformance Optimizer Fix:" -ForegroundColor Yellow
Write-Host "- Railway errors will be suppressed after 5 occurrences" -ForegroundColor White
Write-Host "- Cached data will be used when backend is unavailable" -ForegroundColor White
Write-Host "- Dashboard will not crash from backend errors" -ForegroundColor White
Write-Host "- Console will remain clean in production" -ForegroundColor White

Write-Host "`nVerification complete!" -ForegroundColor Green
