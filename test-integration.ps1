# SmartFarm Integration Test Script
Write-Host "Testing SmartFarm Frontend-Backend Integration..." -ForegroundColor Green

# Configuration
$frontendUrl = "https://your-app.netlify.app"
$backendUrl = "https://smartfarm-api.herokuapp.com"

Write-Host "Testing Configuration:" -ForegroundColor Yellow
Write-Host "  Frontend URL: $frontendUrl" -ForegroundColor White
Write-Host "  Backend URL: $backendUrl" -ForegroundColor White
Write-Host ""

# Test Backend Health
Write-Host "Testing Backend Health..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "$backendUrl/api/health" -UseBasicParsing -TimeoutSec 10
    if ($response.StatusCode -eq 200) {
        Write-Host "  PASS: Backend is healthy" -ForegroundColor Green
    } else {
        Write-Host "  FAIL: Backend health check failed" -ForegroundColor Red
    }
} catch {
    Write-Host "  FAIL: Backend not accessible" -ForegroundColor Red
}

Write-Host ""

# Test Frontend
Write-Host "Testing Frontend..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri $frontendUrl -UseBasicParsing -TimeoutSec 10
    if ($response.StatusCode -eq 200) {
        Write-Host "  PASS: Frontend is accessible" -ForegroundColor Green
    } else {
        Write-Host "  FAIL: Frontend not accessible" -ForegroundColor Red
    }
} catch {
    Write-Host "  FAIL: Frontend not accessible" -ForegroundColor Red
}

Write-Host ""
Write-Host "Integration testing completed!" -ForegroundColor Green
Write-Host "Next: Test all features manually on your deployed application" -ForegroundColor Yellow
