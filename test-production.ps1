# SmartFarm Production Testing Script
# Comprehensive testing of production deployment

Write-Host "🧪 SmartFarm Production Testing Suite" -ForegroundColor Cyan
Write-Host "=" * 60

# Configuration
$API_BASE = "https://api.smartfarmfiji.com"
$FRONTEND_BASE = "https://smartfarmfiji.com"
$TEST_USER_EMAIL = "test@example.com"
$TEST_USER_PASSWORD = "SecurePass123!"

Write-Host ""
Write-Host "🔍 Testing Production Deployment" -ForegroundColor Yellow
Write-Host "API Base: $API_BASE" -ForegroundColor White
Write-Host "Frontend Base: $FRONTEND_BASE" -ForegroundColor White

# Test results tracking
$testResults = @()

function Test-Endpoint {
    param(
        [string]$Name,
        [string]$Url,
        [string]$Method = "GET",
        [hashtable]$Headers = @{},
        [string]$ExpectedContent = "",
        [int]$ExpectedStatus = 200
    )
    
    Write-Host ""
    Write-Host "Testing: $Name" -ForegroundColor Cyan
    Write-Host "URL: $Url" -ForegroundColor Gray
    
    try {
        $response = Invoke-WebRequest -Uri $Url -Method $Method -Headers $Headers -ErrorAction Stop -TimeoutSec 30
        
        if ($response.StatusCode -eq $ExpectedStatus) {
            Write-Host "✅ Status: $($response.StatusCode)" -ForegroundColor Green
            
            if ($ExpectedContent -and $response.Content -like "*$ExpectedContent*") {
                Write-Host "✅ Content: Contains expected content" -ForegroundColor Green
            } elseif ($ExpectedContent) {
                Write-Host "⚠️ Content: Expected content not found" -ForegroundColor Yellow
            }
            
            $testResults += @{
                Name = $Name
                Status = "PASS"
                Message = "Success"
            }
        } else {
            Write-Host "❌ Status: $($response.StatusCode) (Expected: $ExpectedStatus)" -ForegroundColor Red
            $testResults += @{
                Name = $Name
                Status = "FAIL"
                Message = "Wrong status code"
            }
        }
    } catch {
        Write-Host "❌ Error: $($_.Exception.Message)" -ForegroundColor Red
        $testResults += @{
            Name = $Name
            Status = "FAIL"
            Message = $_.Exception.Message
        }
    }
}

Write-Host ""
Write-Host "🏥 Testing Health Endpoints" -ForegroundColor Green
Write-Host "=" * 40

Test-Endpoint -Name "Backend Health" -Url "$API_BASE/api/health" -ExpectedContent "ok"

Write-Host ""
Write-Host "🔐 Testing Authentication Endpoints" -ForegroundColor Green
Write-Host "=" * 40

# Test user registration
$registerData = @{
    email = $TEST_USER_EMAIL
    password = $TEST_USER_PASSWORD
    firstName = "Test"
    lastName = "User"
    country = "Fiji"
} | ConvertTo-Json

Test-Endpoint -Name "User Registration" -Url "$API_BASE/api/auth/register" -Method "POST" -Headers @{"Content-Type"="application/json"} -ExpectedStatus 201

# Test user login
$loginData = @{
    email = $TEST_USER_EMAIL
    password = $TEST_USER_PASSWORD
} | ConvertTo-Json

Test-Endpoint -Name "User Login" -Url "$API_BASE/api/auth/login" -Method "POST" -Headers @{"Content-Type"="application/json"} -ExpectedStatus 200

Write-Host ""
Write-Host "🔒 Testing Protected Endpoints" -ForegroundColor Green
Write-Host "=" * 40

# Test protected routes without token (should fail)
Test-Endpoint -Name "Protected Route (No Token)" -Url "$API_BASE/api/farms" -ExpectedStatus 401

# Test protected routes with invalid token (should fail)
Test-Endpoint -Name "Protected Route (Invalid Token)" -Url "$API_BASE/api/farms" -Headers @{"Authorization"="Bearer invalid-token"} -ExpectedStatus 401

Write-Host ""
Write-Host "🌐 Testing Frontend" -ForegroundColor Green
Write-Host "=" * 40

Test-Endpoint -Name "Frontend Homepage" -Url $FRONTEND_BASE -ExpectedContent "SmartFarm"

Write-Host ""
Write-Host "🔗 Testing CORS Configuration" -ForegroundColor Green
Write-Host "=" * 40

# Test CORS preflight
try {
    $corsResponse = Invoke-WebRequest -Uri "$API_BASE/api/health" -Method "OPTIONS" -Headers @{
        "Origin" = $FRONTEND_BASE
        "Access-Control-Request-Method" = "GET"
        "Access-Control-Request-Headers" = "Content-Type"
    } -ErrorAction Stop
    
    $corsOrigin = $corsResponse.Headers["Access-Control-Allow-Origin"]
    if ($corsOrigin -eq $FRONTEND_BASE -or $corsOrigin -eq "*") {
        Write-Host "✅ CORS Origin: $corsOrigin" -ForegroundColor Green
        $testResults += @{
            Name = "CORS Configuration"
            Status = "PASS"
            Message = "CORS properly configured"
        }
    } else {
        Write-Host "❌ CORS Origin: $corsOrigin (Expected: $FRONTEND_BASE)" -ForegroundColor Red
        $testResults += @{
            Name = "CORS Configuration"
            Status = "FAIL"
            Message = "CORS not properly configured"
        }
    }
} catch {
    Write-Host "❌ CORS Test Failed: $($_.Exception.Message)" -ForegroundColor Red
    $testResults += @{
        Name = "CORS Configuration"
        Status = "FAIL"
        Message = $_.Exception.Message
    }
}

Write-Host ""
Write-Host "⚡ Testing Performance" -ForegroundColor Green
Write-Host "=" * 40

# Test response times
$endpoints = @(
    "$API_BASE/api/health",
    $FRONTEND_BASE
)

foreach ($endpoint in $endpoints) {
    $stopwatch = [System.Diagnostics.Stopwatch]::StartNew()
    
    try {
        $response = Invoke-WebRequest -Uri $endpoint -Method GET -ErrorAction Stop -TimeoutSec 10
        $stopwatch.Stop()
        $responseTime = $stopwatch.ElapsedMilliseconds
        
        if ($responseTime -lt 2000) {
            Write-Host "✅ $endpoint - Response time: ${responseTime}ms" -ForegroundColor Green
            $testResults += @{
                Name = "Performance: $endpoint"
                Status = "PASS"
                Message = "Response time: ${responseTime}ms"
            }
        } else {
            Write-Host "⚠️ $endpoint - Response time: ${responseTime}ms (Slow)" -ForegroundColor Yellow
            $testResults += @{
                Name = "Performance: $endpoint"
                Status = "WARN"
                Message = "Slow response time: ${responseTime}ms"
            }
        }
    } catch {
        Write-Host "❌ $endpoint - Failed: $($_.Exception.Message)" -ForegroundColor Red
        $testResults += @{
            Name = "Performance: $endpoint"
            Status = "FAIL"
            Message = $_.Exception.Message
        }
    }
}

Write-Host ""
Write-Host "📊 Test Results Summary" -ForegroundColor Cyan
Write-Host "=" * 60

$passed = ($testResults | Where-Object { $_.Status -eq "PASS" }).Count
$failed = ($testResults | Where-Object { $_.Status -eq "FAIL" }).Count
$warnings = ($testResults | Where-Object { $_.Status -eq "WARN" }).Count
$total = $testResults.Count

Write-Host "Total Tests: $total" -ForegroundColor White
Write-Host "✅ Passed: $passed" -ForegroundColor Green
Write-Host "⚠️ Warnings: $warnings" -ForegroundColor Yellow
Write-Host "❌ Failed: $failed" -ForegroundColor Red

Write-Host ""
Write-Host "Detailed Results:" -ForegroundColor Cyan
foreach ($result in $testResults) {
    $statusIcon = switch ($result.Status) {
        "PASS" { "✅" }
        "WARN" { "⚠️" }
        "FAIL" { "❌" }
        default { "❓" }
    }
    
    $color = switch ($result.Status) {
        "PASS" { "Green" }
        "WARN" { "Yellow" }
        "FAIL" { "Red" }
        default { "White" }
    }
    
    Write-Host "$statusIcon $($result.Name): $($result.Message)" -ForegroundColor $color
}

Write-Host ""
Write-Host "🎯 Production Readiness Assessment" -ForegroundColor Cyan
Write-Host "=" * 60

if ($failed -eq 0) {
    Write-Host "🎉 PRODUCTION READY!" -ForegroundColor Green
    Write-Host "All critical tests passed. Your SmartFarm deployment is ready for production use." -ForegroundColor Green
} elseif ($failed -le 2) {
    Write-Host "⚠️ MOSTLY READY" -ForegroundColor Yellow
    Write-Host "Most tests passed. Address the failed tests before going live." -ForegroundColor Yellow
} else {
    Write-Host "❌ NOT READY" -ForegroundColor Red
    Write-Host "Multiple tests failed. Fix the issues before deploying to production." -ForegroundColor Red
}

Write-Host ""
Write-Host "📋 Next Steps:" -ForegroundColor Yellow
if ($failed -gt 0) {
    Write-Host "1. Fix failed tests" -ForegroundColor White
    Write-Host "2. Re-run this test suite" -ForegroundColor White
    Write-Host "3. Set up monitoring and alerts" -ForegroundColor White
    Write-Host "4. Launch with beta users" -ForegroundColor White
} else {
    Write-Host "1. Set up monitoring (Sentry, UptimeRobot)" -ForegroundColor White
    Write-Host "2. Configure payment processing (Stripe)" -ForegroundColor White
    Write-Host "3. Set up analytics (PostHog, Google Analytics)" -ForegroundColor White
    Write-Host "4. Launch with beta users" -ForegroundColor White
    Write-Host "5. Tag production release: git tag v1.0.0" -ForegroundColor White
}

Write-Host ""
Write-Host "🚀 SmartFarm Production Testing Complete!" -ForegroundColor Green
