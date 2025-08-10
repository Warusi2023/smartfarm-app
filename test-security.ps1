# SmartFarm Security Validation Script
Write-Host "🔒 Starting SmartFarm Security Validation..." -ForegroundColor Green

# Test Configuration
$testUrl = "http://localhost:8080"
$securityScore = 0
$totalTests = 0

Write-Host "📊 Security Test Configuration:" -ForegroundColor Yellow
Write-Host "   Test URL: $testUrl" -ForegroundColor White
Write-Host ""

# Test 1: HTTPS/SSL Check
Write-Host "🔍 Testing HTTPS/SSL Configuration..." -ForegroundColor Yellow
$totalTests++
try {
    $httpsUrl = $testUrl -replace "http://", "https://"
    $response = Invoke-WebRequest -Uri $httpsUrl -UseBasicParsing -ErrorAction SilentlyContinue
    
    if ($response.StatusCode -eq 200) {
        Write-Host "   ✅ HTTPS is properly configured" -ForegroundColor Green
        $securityScore++
    } else {
        Write-Host "   ⚠️ HTTPS not available (expected for local development)" -ForegroundColor Yellow
    }
} catch {
    Write-Host "   ⚠️ HTTPS not available (expected for local development)" -ForegroundColor Yellow
}

Write-Host ""

# Test 2: Security Headers Check
Write-Host "🔍 Testing Security Headers..." -ForegroundColor Yellow
$totalTests++
try {
    $response = Invoke-WebRequest -Uri $testUrl -UseBasicParsing
    
    $securityHeaders = @{
        "X-Content-Type-Options" = "nosniff"
        "X-Frame-Options" = "DENY"
        "X-XSS-Protection" = "1; mode=block"
        "Referrer-Policy" = "strict-origin-when-cross-origin"
        "Content-Security-Policy" = "*"
    }
    
    $headersFound = 0
    foreach ($header in $securityHeaders.Keys) {
        if ($response.Headers[$header]) {
            Write-Host "   ✅ $header : $($response.Headers[$header])" -ForegroundColor Green
            $headersFound++
        } else {
            Write-Host "   ❌ $header : Missing" -ForegroundColor Red
        }
    }
    
    if ($headersFound -ge 3) {
        Write-Host "   🎯 Good security headers configuration" -ForegroundColor Green
        $securityScore++
    } else {
        Write-Host "   ⚠️ Security headers need improvement" -ForegroundColor Yellow
    }
} catch {
    Write-Host "   ❌ Failed to check security headers: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Test 3: CORS Configuration
Write-Host "🔍 Testing CORS Configuration..." -ForegroundColor Yellow
$totalTests++
try {
    $response = Invoke-WebRequest -Uri "$testUrl/api/health" -UseBasicParsing
    
    if ($response.Headers["Access-Control-Allow-Origin"]) {
        $corsOrigin = $response.Headers["Access-Control-Allow-Origin"]
        if ($corsOrigin -eq "*") {
            Write-Host "   ⚠️ CORS allows all origins (not recommended for production)" -ForegroundColor Yellow
        } else {
            Write-Host "   ✅ CORS properly configured: $corsOrigin" -ForegroundColor Green
            $securityScore++
        }
    } else {
        Write-Host "   ⚠️ CORS headers not found" -ForegroundColor Yellow
    }
} catch {
    Write-Host "   ❌ Failed to test CORS: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Test 4: API Authentication Check
Write-Host "🔍 Testing API Authentication..." -ForegroundColor Yellow
$totalTests++
try {
    # Test protected endpoint without authentication
    $response = Invoke-WebRequest -Uri "$testUrl/api/farms" -UseBasicParsing -ErrorAction SilentlyContinue
    
    if ($response.StatusCode -eq 401) {
        Write-Host "   ✅ API properly requires authentication" -ForegroundColor Green
        $securityScore++
    } elseif ($response.StatusCode -eq 200) {
        Write-Host "   ⚠️ API endpoint accessible without authentication" -ForegroundColor Yellow
    } else {
        Write-Host "   ⚠️ Unexpected response: $($response.StatusCode)" -ForegroundColor Yellow
    }
} catch {
    if ($_.Exception.Response.StatusCode -eq 401) {
        Write-Host "   ✅ API properly requires authentication" -ForegroundColor Green
        $securityScore++
    } else {
        Write-Host "   ❌ API authentication test failed: $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host ""

# Test 5: Input Validation Check
Write-Host "🔍 Testing Input Validation..." -ForegroundColor Yellow
$totalTests++
try {
    # Test SQL injection attempt
    $sqlInjectionTest = "$testUrl/api/farms?name=' OR '1'='1"
    $response = Invoke-WebRequest -Uri $sqlInjectionTest -UseBasicParsing -ErrorAction SilentlyContinue
    
    if ($response.StatusCode -eq 400 -or $response.StatusCode -eq 422) {
        Write-Host "   ✅ Input validation working (SQL injection blocked)" -ForegroundColor Green
        $securityScore++
    } else {
        Write-Host "   ⚠️ Input validation may need improvement" -ForegroundColor Yellow
    }
} catch {
    if ($_.Exception.Response.StatusCode -eq 400 -or $_.Exception.Response.StatusCode -eq 422) {
        Write-Host "   ✅ Input validation working (SQL injection blocked)" -ForegroundColor Green
        $securityScore++
    } else {
        Write-Host "   ❌ Input validation test failed: $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host ""

# Test 6: Rate Limiting Check
Write-Host "🔍 Testing Rate Limiting..." -ForegroundColor Yellow
$totalTests++
try {
    $requests = 0
    $rateLimited = $false
    
    # Send multiple rapid requests
    for ($i = 1; $i -le 10; $i++) {
        try {
            $response = Invoke-WebRequest -Uri "$testUrl/api/health" -UseBasicParsing
            $requests++
            Start-Sleep -Milliseconds 100
        } catch {
            if ($_.Exception.Response.StatusCode -eq 429) {
                $rateLimited = $true
                break
            }
        }
    }
    
    if ($rateLimited) {
        Write-Host "   ✅ Rate limiting is working" -ForegroundColor Green
        $securityScore++
    } else {
        Write-Host "   ⚠️ Rate limiting not detected (may need implementation)" -ForegroundColor Yellow
    }
} catch {
    Write-Host "   ❌ Rate limiting test failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Test 7: Environment Variables Security
Write-Host "🔍 Testing Environment Variables Security..." -ForegroundColor Yellow
$totalTests++
try {
    # Check if sensitive data is exposed in response headers
    $response = Invoke-WebRequest -Uri $testUrl -UseBasicParsing
    
    $sensitiveHeaders = @("X-Powered-By", "Server", "X-AspNet-Version", "X-AspNetMvc-Version")
    $exposedInfo = 0
    
    foreach ($header in $sensitiveHeaders) {
        if ($response.Headers[$header]) {
            Write-Host "   ⚠️ $header exposed: $($response.Headers[$header])" -ForegroundColor Yellow
            $exposedInfo++
        }
    }
    
    if ($exposedInfo -eq 0) {
        Write-Host "   ✅ No sensitive information exposed in headers" -ForegroundColor Green
        $securityScore++
    } else {
        Write-Host "   ⚠️ Some sensitive information is exposed" -ForegroundColor Yellow
    }
} catch {
    Write-Host "   ❌ Environment variables test failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Test 8: Content Security Policy
Write-Host "🔍 Testing Content Security Policy..." -ForegroundColor Yellow
$totalTests++
try {
    $response = Invoke-WebRequest -Uri $testUrl -UseBasicParsing
    
    if ($response.Headers["Content-Security-Policy"]) {
        $csp = $response.Headers["Content-Security-Policy"]
        Write-Host "   ✅ CSP configured: $csp" -ForegroundColor Green
        $securityScore++
    } else {
        Write-Host "   ⚠️ Content Security Policy not configured" -ForegroundColor Yellow
    }
} catch {
    Write-Host "   ❌ CSP test failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""

# Calculate Security Score
$securityPercentage = [math]::Round(($securityScore / $totalTests) * 100, 2)

Write-Host "📊 Security Validation Summary" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green
Write-Host "Security Score: $securityScore/$totalTests ($securityPercentage%)" -ForegroundColor White

if ($securityPercentage -ge 80) {
    Write-Host "🎯 Security Status: EXCELLENT" -ForegroundColor Green
} elseif ($securityPercentage -ge 60) {
    Write-Host "🎯 Security Status: GOOD" -ForegroundColor Yellow
} else {
    Write-Host "🎯 Security Status: NEEDS IMPROVEMENT" -ForegroundColor Red
}

Write-Host ""
Write-Host "🔒 Security Recommendations:" -ForegroundColor Yellow

if ($securityPercentage -lt 80) {
    Write-Host "   • Implement HTTPS in production" -ForegroundColor White
    Write-Host "   • Configure security headers" -ForegroundColor White
    Write-Host "   • Set up proper CORS policies" -ForegroundColor White
    Write-Host "   • Implement rate limiting" -ForegroundColor White
    Write-Host "   • Add Content Security Policy" -ForegroundColor White
    Write-Host "   • Review input validation" -ForegroundColor White
    Write-Host "   • Hide sensitive server information" -ForegroundColor White
}

Write-Host ""
Write-Host "✅ Security validation completed!" -ForegroundColor Green 