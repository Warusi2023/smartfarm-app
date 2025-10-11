# SmartFarm CORS Testing Script
# Tests CORS configuration on Railway backend

Write-Host "SmartFarm CORS Configuration Test" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan

$railwayUrl = "https://smartfarm-app-production.up.railway.app"
$origin = "https://www.smartfarm-app.com"

Write-Host "`nTesting Railway backend at: $railwayUrl" -ForegroundColor Yellow
Write-Host "From origin: $origin" -ForegroundColor Yellow

# Test 1: Preflight OPTIONS request
Write-Host "`n[TEST 1] Testing Preflight OPTIONS Request..." -ForegroundColor Cyan
try {
    $headers = @{
        "Origin" = $origin
        "Access-Control-Request-Method" = "GET"
        "Access-Control-Request-Headers" = "Content-Type"
    }
    
    $response = Invoke-WebRequest -Uri "$railwayUrl/api/health" `
        -Method OPTIONS `
        -Headers $headers `
        -UseBasicParsing `
        -TimeoutSec 10
    
    Write-Host "Status Code: $($response.StatusCode)" -ForegroundColor Green
    
    $corsOrigin = $response.Headers['Access-Control-Allow-Origin']
    $corsMethods = $response.Headers['Access-Control-Allow-Methods']
    $corsHeaders = $response.Headers['Access-Control-Allow-Headers']
    $corsCredentials = $response.Headers['Access-Control-Allow-Credentials']
    
    Write-Host "Access-Control-Allow-Origin: $corsOrigin" -ForegroundColor $(if ($corsOrigin -eq $origin) { "Green" } else { "Red" })
    Write-Host "Access-Control-Allow-Methods: $corsMethods" -ForegroundColor Green
    Write-Host "Access-Control-Allow-Headers: $corsHeaders" -ForegroundColor Green
    Write-Host "Access-Control-Allow-Credentials: $corsCredentials" -ForegroundColor Green
    
    if ($corsOrigin -eq $origin) {
        Write-Host "[PASS] Preflight request successful!" -ForegroundColor Green
    } else {
        Write-Host "[FAIL] CORS Origin mismatch!" -ForegroundColor Red
    }
} catch {
    Write-Host "[FAIL] Preflight request failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 2: Actual GET request
Write-Host "`n[TEST 2] Testing Actual GET Request..." -ForegroundColor Cyan
try {
    $headers = @{
        "Origin" = $origin
    }
    
    $response = Invoke-WebRequest -Uri "$railwayUrl/api/health" `
        -Method GET `
        -Headers $headers `
        -UseBasicParsing `
        -TimeoutSec 10
    
    Write-Host "Status Code: $($response.StatusCode)" -ForegroundColor Green
    
    $corsOrigin = $response.Headers['Access-Control-Allow-Origin']
    $corsCredentials = $response.Headers['Access-Control-Allow-Credentials']
    
    Write-Host "Access-Control-Allow-Origin: $corsOrigin" -ForegroundColor $(if ($corsOrigin -eq $origin) { "Green" } else { "Red" })
    Write-Host "Access-Control-Allow-Credentials: $corsCredentials" -ForegroundColor Green
    
    $content = $response.Content | ConvertFrom-Json
    Write-Host "Response: $($content | ConvertTo-Json -Compress)" -ForegroundColor Green
    
    if ($corsOrigin -eq $origin -and $content.ok -eq $true) {
        Write-Host "[PASS] GET request successful!" -ForegroundColor Green
    } else {
        Write-Host "[FAIL] CORS Origin mismatch or invalid response!" -ForegroundColor Red
    }
} catch {
    Write-Host "[FAIL] GET request failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 3: Check without origin header
Write-Host "`n[TEST 3] Testing Request Without Origin Header..." -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest -Uri "$railwayUrl/api/health" `
        -Method GET `
        -UseBasicParsing `
        -TimeoutSec 10
    
    Write-Host "Status Code: $($response.StatusCode)" -ForegroundColor Green
    
    $corsOrigin = $response.Headers['Access-Control-Allow-Origin']
    Write-Host "Access-Control-Allow-Origin: $corsOrigin" -ForegroundColor Green
    
    $content = $response.Content | ConvertFrom-Json
    Write-Host "Response: $($content | ConvertTo-Json -Compress)" -ForegroundColor Green
    
    if ($corsOrigin) {
        Write-Host "[PASS] Default CORS origin set: $corsOrigin" -ForegroundColor Green
    } else {
        Write-Host "[WARN] No CORS origin header (might be OK)" -ForegroundColor Yellow
    }
} catch {
    Write-Host "[FAIL] Request without origin failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Test 4: Test with Netlify domain (alternative)
Write-Host "`n[TEST 4] Testing with Netlify Domain..." -ForegroundColor Cyan
try {
    $netlifyOrigin = "https://smartfarm-app.netlify.app"
    $headers = @{
        "Origin" = $netlifyOrigin
    }
    
    $response = Invoke-WebRequest -Uri "$railwayUrl/api/health" `
        -Method GET `
        -Headers $headers `
        -UseBasicParsing `
        -TimeoutSec 10
    
    Write-Host "Status Code: $($response.StatusCode)" -ForegroundColor Green
    
    $corsOrigin = $response.Headers['Access-Control-Allow-Origin']
    Write-Host "Access-Control-Allow-Origin: $corsOrigin" -ForegroundColor $(if ($corsOrigin -eq $netlifyOrigin) { "Green" } else { "Yellow" })
    
    if ($corsOrigin -eq $netlifyOrigin) {
        Write-Host "[PASS] Netlify domain allowed!" -ForegroundColor Green
    } else {
        Write-Host "[WARN] Netlify domain not matched, got: $corsOrigin" -ForegroundColor Yellow
    }
} catch {
    Write-Host "[FAIL] Netlify domain test failed: $($_.Exception.Message)" -ForegroundColor Red
}

# Summary
Write-Host "`n=====================================" -ForegroundColor Cyan
Write-Host "CORS Configuration Test Complete" -ForegroundColor Cyan
Write-Host "`nExpected Behavior:" -ForegroundColor Yellow
Write-Host "- Preflight OPTIONS requests should return 204 with CORS headers" -ForegroundColor White
Write-Host "- GET requests should return 200 with CORS headers" -ForegroundColor White
Write-Host "- Access-Control-Allow-Origin should match the request origin" -ForegroundColor White
Write-Host "- Access-Control-Allow-Credentials should be 'true'" -ForegroundColor White

Write-Host "`nIf all tests pass, CORS is properly configured!" -ForegroundColor Green
Write-Host "If tests fail, check Railway logs and deployment status." -ForegroundColor Yellow
