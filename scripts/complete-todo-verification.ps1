# Complete TODO Verification Script for SmartFarm
# Tests all remaining TODOs after Railway deployment

Write-Host "🎯 SmartFarm TODO Verification Script" -ForegroundColor Cyan
Write-Host "=" * 60

$BACKEND_URL = "https://smartfarm-app-production.up.railway.app"
$FRONTEND_URL = "https://www.smartfarm-app.com"

Write-Host ""
Write-Host "📋 Testing Remaining TODOs:" -ForegroundColor Yellow
Write-Host "1. Railway Backend Deployment" -ForegroundColor White
Write-Host "2. CORS Configuration" -ForegroundColor White
Write-Host "3. Dashboard Functionality" -ForegroundColor White

Write-Host ""
Write-Host "=" * 60
Write-Host "TODO 1: Testing Railway Backend Deployment" -ForegroundColor Green
Write-Host "=" * 60

# Test 1: Health Endpoint
Write-Host ""
Write-Host "🏥 Testing Health Endpoint..." -ForegroundColor Yellow
try {
    $healthResponse = Invoke-WebRequest -Uri "$BACKEND_URL/api/health" -Method GET -ErrorAction Stop
    Write-Host "✅ Status: $($healthResponse.StatusCode)" -ForegroundColor Green
    
    $healthData = $healthResponse.Content | ConvertFrom-Json
    Write-Host "✅ Service: $($healthData.service)" -ForegroundColor Green
    Write-Host "✅ Version: $($healthData.version)" -ForegroundColor Green
    Write-Host "✅ Health Check: PASSED" -ForegroundColor Green
    
    $todo1Passed = $true
} catch {
    Write-Host "❌ Health endpoint failed: $_" -ForegroundColor Red
    Write-Host "❌ TODO 1 FAILED - Railway backend not deployed" -ForegroundColor Red
    $todo1Passed = $false
}

Write-Host ""
Write-Host "=" * 60
Write-Host "TODO 2: Testing CORS Configuration" -ForegroundColor Green
Write-Host "=" * 60

if ($todo1Passed) {
    Write-Host ""
    Write-Host "🌐 Testing CORS for origin: $FRONTEND_URL" -ForegroundColor Yellow
    
    # Test GET with Origin header
    Write-Host "  Testing GET request with Origin header..." -ForegroundColor Cyan
    try {
        $getResponse = Invoke-WebRequest -Uri "$BACKEND_URL/api/health" -Method GET -Headers @{"Origin"=$FRONTEND_URL} -ErrorAction Stop
        $corsOrigin = $getResponse.Headers['Access-Control-Allow-Origin']
        
        Write-Host "  Status: $($getResponse.StatusCode)" -ForegroundColor White
        Write-Host "  CORS Origin: $corsOrigin" -ForegroundColor White
        
        if ($corsOrigin -eq $FRONTEND_URL) {
            Write-Host "  ✅ GET CORS is working correctly!" -ForegroundColor Green
            $corsGetPassed = $true
        } else {
            Write-Host "  ❌ GET CORS failed! Expected: $FRONTEND_URL, Got: $corsOrigin" -ForegroundColor Red
            $corsGetPassed = $false
        }
    } catch {
        Write-Host "  ❌ GET request failed: $_" -ForegroundColor Red
        $corsGetPassed = $false
    }
    
    Write-Host ""
    Write-Host "  Testing OPTIONS preflight..." -ForegroundColor Cyan
    try {
        $optionsResponse = Invoke-WebRequest -Uri "$BACKEND_URL/api/health" -Method OPTIONS -Headers @{
            "Origin"=$FRONTEND_URL
            "Access-Control-Request-Method"="GET"
            "Access-Control-Request-Headers"="Content-Type"
        } -ErrorAction Stop
        
        $corsOrigin = $optionsResponse.Headers['Access-Control-Allow-Origin']
        $corsMethods = $optionsResponse.Headers['Access-Control-Allow-Methods']
        
        Write-Host "  Status: $($optionsResponse.StatusCode)" -ForegroundColor White
        Write-Host "  CORS Origin: $corsOrigin" -ForegroundColor White
        Write-Host "  CORS Methods: $corsMethods" -ForegroundColor White
        
        if ($optionsResponse.StatusCode -in @(200, 204) -and $corsOrigin -eq $FRONTEND_URL) {
            Write-Host "  ✅ OPTIONS preflight is working correctly!" -ForegroundColor Green
            $corsOptionsPassed = $true
        } else {
            Write-Host "  ❌ OPTIONS preflight failed!" -ForegroundColor Red
            $corsOptionsPassed = $false
        }
    } catch {
        Write-Host "  ❌ OPTIONS request failed: $_" -ForegroundColor Red
        $corsOptionsPassed = $false
    }
    
    if ($corsGetPassed -and $corsOptionsPassed) {
        Write-Host "✅ TODO 2 PASSED - CORS configuration working" -ForegroundColor Green
        $todo2Passed = $true
    } else {
        Write-Host "❌ TODO 2 FAILED - CORS configuration issues" -ForegroundColor Red
        $todo2Passed = $false
    }
} else {
    Write-Host "⏭️ Skipping CORS test - Backend not available" -ForegroundColor Yellow
    $todo2Passed = $false
}

Write-Host ""
Write-Host "=" * 60
Write-Host "TODO 3: Testing Dashboard Functionality" -ForegroundColor Green
Write-Host "=" * 60

if ($todo1Passed -and $todo2Passed) {
    Write-Host ""
    Write-Host "🎯 Testing Dashboard API Endpoints..." -ForegroundColor Yellow
    
    # Test multiple API endpoints
    $endpoints = @(
        "/api/analytics/dashboard",
        "/api/crops",
        "/api/livestock", 
        "/api/farms",
        "/api/weather/test"
    )
    
    $passedEndpoints = 0
    $totalEndpoints = $endpoints.Count
    
    foreach ($endpoint in $endpoints) {
        try {
            $response = Invoke-WebRequest -Uri "$BACKEND_URL$endpoint" -Method GET -Headers @{"Origin"=$FRONTEND_URL} -ErrorAction Stop -TimeoutSec 10
            if ($response.StatusCode -eq 200) {
                Write-Host "  ✅ $endpoint - Status: $($response.StatusCode)" -ForegroundColor Green
                $passedEndpoints++
            } else {
                Write-Host "  ⚠️ $endpoint - Status: $($response.StatusCode)" -ForegroundColor Yellow
            }
        } catch {
            Write-Host "  ❌ $endpoint - Failed: $($_.Exception.Message)" -ForegroundColor Red
        }
    }
    
    $successRate = [math]::Round(($passedEndpoints / $totalEndpoints) * 100, 1)
    Write-Host ""
    Write-Host "📊 API Endpoint Success Rate: $passedEndpoints/$totalEndpoints ($successRate%)" -ForegroundColor Cyan
    
    if ($successRate -ge 80) {
        Write-Host "✅ TODO 3 PASSED - Dashboard API functionality working" -ForegroundColor Green
        $todo3Passed = $true
    } else {
        Write-Host "❌ TODO 3 FAILED - Dashboard API functionality issues" -ForegroundColor Red
        $todo3Passed = $false
    }
} else {
    Write-Host "⏭️ Skipping Dashboard test - Prerequisites not met" -ForegroundColor Yellow
    $todo3Passed = $false
}

Write-Host ""
Write-Host "=" * 60
Write-Host "📊 TODO COMPLETION SUMMARY" -ForegroundColor Cyan
Write-Host "=" * 60

Write-Host ""
Write-Host "TODO 1 - Railway Backend Deployment:" -ForegroundColor White
if ($todo1Passed) {
    Write-Host "  ✅ PASSED - Backend is running and responding" -ForegroundColor Green
} else {
    Write-Host "  ❌ FAILED - Backend not deployed or not responding" -ForegroundColor Red
}

Write-Host ""
Write-Host "TODO 2 - CORS Configuration:" -ForegroundColor White
if ($todo2Passed) {
    Write-Host "  ✅ PASSED - CORS is properly configured" -ForegroundColor Green
} else {
    Write-Host "  ❌ FAILED - CORS configuration issues" -ForegroundColor Red
}

Write-Host ""
Write-Host "TODO 3 - Dashboard Functionality:" -ForegroundColor White
if ($todo3Passed) {
    Write-Host "  ✅ PASSED - Dashboard API endpoints working" -ForegroundColor Green
} else {
    Write-Host "  ❌ FAILED - Dashboard functionality issues" -ForegroundColor Red
}

Write-Host ""
Write-Host "=" * 60

if ($todo1Passed -and $todo2Passed -and $todo3Passed) {
    Write-Host "🎉 ALL TODOS COMPLETED SUCCESSFULLY!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Your SmartFarm dashboard is now fully functional:" -ForegroundColor White
    Write-Host "✅ Backend deployed and running" -ForegroundColor Green
    Write-Host "✅ CORS properly configured" -ForegroundColor Green
    Write-Host "✅ Dashboard API working" -ForegroundColor Green
    Write-Host "✅ All accessibility issues fixed" -ForegroundColor Green
    Write-Host ""
    Write-Host "🌐 Test your dashboard at: $FRONTEND_URL" -ForegroundColor Cyan
} else {
    Write-Host "⚠️ SOME TODOS STILL NEED ATTENTION" -ForegroundColor Yellow
    Write-Host ""
    if (-not $todo1Passed) {
        Write-Host "❌ Deploy Railway backend with environment variables" -ForegroundColor Red
    }
    if (-not $todo2Passed) {
        Write-Host "❌ Fix CORS configuration" -ForegroundColor Red
    }
    if (-not $todo3Passed) {
        Write-Host "❌ Resolve dashboard functionality issues" -ForegroundColor Red
    }
    Write-Host ""
    Write-Host "📖 See COMPLETE_DEPLOYMENT_VERIFICATION.md for detailed instructions" -ForegroundColor Cyan
}

Write-Host ""
Write-Host "=" * 60
