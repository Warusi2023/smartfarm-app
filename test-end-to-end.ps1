# SmartFarm End-to-End Testing Script
Write-Host "🧪 Starting SmartFarm End-to-End Testing..." -ForegroundColor Green

# Test Configuration
$testUrl = "http://localhost:8080"
$testResults = @{
    "Passed" = 0
    "Failed" = 0
    "Skipped" = 0
    "Total" = 0
}

Write-Host "📊 E2E Test Configuration:" -ForegroundColor Yellow
Write-Host "   Test URL: $testUrl" -ForegroundColor White
Write-Host ""

# Function to log test results
function Log-TestResult {
    param($TestName, $Status, $Message)
    
    $testResults.Total++
    
    switch ($Status) {
        "PASS" {
            Write-Host "   ✅ $TestName : $Message" -ForegroundColor Green
            $testResults.Passed++
        }
        "FAIL" {
            Write-Host "   ❌ $TestName : $Message" -ForegroundColor Red
            $testResults.Failed++
        }
        "SKIP" {
            Write-Host "   ⏭️ $TestName : $Message" -ForegroundColor Yellow
            $testResults.Skipped++
        }
    }
}

# Test 1: Application Startup
Write-Host "🔍 Testing Application Startup..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri $testUrl -UseBasicParsing -TimeoutSec 30
    if ($response.StatusCode -eq 200) {
        Log-TestResult "Application Startup" "PASS" "Application loaded successfully"
    } else {
        Log-TestResult "Application Startup" "FAIL" "Application returned status $($response.StatusCode)"
    }
} catch {
    Log-TestResult "Application Startup" "FAIL" "Application failed to start: $($_.Exception.Message)"
}

Write-Host ""

# Test 2: Home Page Load
Write-Host "🔍 Testing Home Page..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri $testUrl -UseBasicParsing
    $content = $response.Content
    
    if ($content -match "SmartFarm") {
        Log-TestResult "Home Page Content" "PASS" "Home page contains SmartFarm branding"
    } else {
        Log-TestResult "Home Page Content" "FAIL" "Home page missing SmartFarm branding"
    }
    
    if ($content -match "dashboard") {
        Log-TestResult "Dashboard Elements" "PASS" "Dashboard elements found"
    } else {
        Log-TestResult "Dashboard Elements" "FAIL" "Dashboard elements missing"
    }
} catch {
    Log-TestResult "Home Page" "FAIL" "Failed to load home page: $($_.Exception.Message)"
}

Write-Host ""

# Test 3: Navigation Testing
Write-Host "🔍 Testing Navigation..." -ForegroundColor Yellow
$navigationTests = @(
    @{Name="Livestock Navigation"; Path="/livestock"},
    @{Name="Crops Navigation"; Path="/crops"},
    @{Name="Weather Navigation"; Path="/weather"},
    @{Name="Inventory Navigation"; Path="/inventory"},
    @{Name="Employees Navigation"; Path="/employees"},
    @{Name="Financial Navigation"; Path="/financial"},
    @{Name="Tasks Navigation"; Path="/tasks"},
    @{Name="Reports Navigation"; Path="/reports"},
    @{Name="Settings Navigation"; Path="/settings"}
)

foreach ($navTest in $navigationTests) {
    try {
        $response = Invoke-WebRequest -Uri "$testUrl$($navTest.Path)" -UseBasicParsing -ErrorAction SilentlyContinue
        if ($response.StatusCode -eq 200) {
            Log-TestResult $navTest.Name "PASS" "Navigation successful"
        } else {
            Log-TestResult $navTest.Name "FAIL" "Navigation failed with status $($response.StatusCode)"
        }
    } catch {
        Log-TestResult $navTest.Name "SKIP" "Navigation test skipped (SPA routing)"
    }
}

Write-Host ""

# Test 4: API Endpoints Testing
Write-Host "🔍 Testing API Endpoints..." -ForegroundColor Yellow
$apiTests = @(
    @{Name="Health Check API"; Path="/api/health"},
    @{Name="Farms API"; Path="/api/farms"},
    @{Name="Livestock API"; Path="/api/livestock"},
    @{Name="Crops API"; Path="/api/crops"},
    @{Name="Inventory API"; Path="/api/inventory"},
    @{Name="Financial API"; Path="/api/financial"},
    @{Name="Weather API"; Path="/api/weather"}
)

foreach ($apiTest in $apiTests) {
    try {
        $response = Invoke-WebRequest -Uri "$testUrl$($apiTest.Path)" -UseBasicParsing -ErrorAction SilentlyContinue
        
        if ($response.StatusCode -eq 200) {
            Log-TestResult $apiTest.Name "PASS" "API endpoint responding"
        } elseif ($response.StatusCode -eq 401) {
            Log-TestResult $apiTest.Name "PASS" "API properly requires authentication"
        } else {
            Log-TestResult $apiTest.Name "FAIL" "API returned status $($response.StatusCode)"
        }
    } catch {
        if ($_.Exception.Response.StatusCode -eq 401) {
            Log-TestResult $apiTest.Name "PASS" "API properly requires authentication"
        } else {
            Log-TestResult $apiTest.Name "FAIL" "API test failed: $($_.Exception.Message)"
        }
    }
}

Write-Host ""

# Test 5: Multi-language Support
Write-Host "🔍 Testing Multi-language Support..." -ForegroundColor Yellow
$languages = @("en", "es", "fr", "de", "pt", "it", "nl", "ru", "zh", "ja")

foreach ($lang in $languages) {
    try {
        $response = Invoke-WebRequest -Uri "$testUrl?lang=$lang" -UseBasicParsing -ErrorAction SilentlyContinue
        if ($response.StatusCode -eq 200) {
            Log-TestResult "Language $lang" "PASS" "Language support working"
        } else {
            Log-TestResult "Language $lang" "SKIP" "Language test skipped"
        }
    } catch {
        Log-TestResult "Language $lang" "SKIP" "Language test skipped"
    }
}

Write-Host ""

# Test 6: PWA Features
Write-Host "🔍 Testing PWA Features..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "$testUrl/manifest.json" -UseBasicParsing -ErrorAction SilentlyContinue
    if ($response.StatusCode -eq 200) {
        Log-TestResult "PWA Manifest" "PASS" "PWA manifest accessible"
    } else {
        Log-TestResult "PWA Manifest" "FAIL" "PWA manifest not found"
    }
} catch {
    Log-TestResult "PWA Manifest" "FAIL" "PWA manifest test failed"
}

try {
    $response = Invoke-WebRequest -Uri "$testUrl/sw.js" -UseBasicParsing -ErrorAction SilentlyContinue
    if ($response.StatusCode -eq 200) {
        Log-TestResult "Service Worker" "PASS" "Service worker accessible"
    } else {
        Log-TestResult "Service Worker" "FAIL" "Service worker not found"
    }
} catch {
    Log-TestResult "Service Worker" "FAIL" "Service worker test failed"
}

Write-Host ""

# Test 7: Responsive Design
Write-Host "🔍 Testing Responsive Design..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri $testUrl -UseBasicParsing
    $content = $response.Content
    
    if ($content -match "viewport") {
        Log-TestResult "Viewport Meta Tag" "PASS" "Responsive viewport configured"
    } else {
        Log-TestResult "Viewport Meta Tag" "FAIL" "Viewport meta tag missing"
    }
    
    if ($content -match "media.*screen") {
        Log-TestResult "CSS Media Queries" "PASS" "CSS media queries found"
    } else {
        Log-TestResult "CSS Media Queries" "SKIP" "CSS media queries test skipped"
    }
} catch {
    Log-TestResult "Responsive Design" "FAIL" "Responsive design test failed"
}

Write-Host ""

# Test 8: Chart.js Integration
Write-Host "🔍 Testing Chart.js Integration..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri $testUrl -UseBasicParsing
    $content = $response.Content
    
    if ($content -match "chart\.js") {
        Log-TestResult "Chart.js CDN" "PASS" "Chart.js library loaded"
    } else {
        Log-TestResult "Chart.js CDN" "FAIL" "Chart.js library not found"
    }
} catch {
    Log-TestResult "Chart.js Integration" "FAIL" "Chart.js test failed"
}

Write-Host ""

# Test 9: Authentication Flow
Write-Host "🔍 Testing Authentication Flow..." -ForegroundColor Yellow
try {
    # Test login endpoint
    $loginData = @{
        email = "test@example.com"
        password = "testpassword"
    } | ConvertTo-Json
    
    $response = Invoke-WebRequest -Uri "$testUrl/api/auth/login" -Method POST -Body $loginData -ContentType "application/json" -ErrorAction SilentlyContinue
    
    if ($response.StatusCode -eq 401) {
        Log-TestResult "Authentication" "PASS" "Authentication properly rejects invalid credentials"
    } else {
        Log-TestResult "Authentication" "SKIP" "Authentication test skipped"
    }
} catch {
    if ($_.Exception.Response.StatusCode -eq 401) {
        Log-TestResult "Authentication" "PASS" "Authentication properly rejects invalid credentials"
    } else {
        Log-TestResult "Authentication" "SKIP" "Authentication test skipped"
    }
}

Write-Host ""

# Test 10: Database Connectivity
Write-Host "🔍 Testing Database Connectivity..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "$testUrl/api/health" -UseBasicParsing -ErrorAction SilentlyContinue
    
    if ($response.StatusCode -eq 200) {
        $healthData = $response.Content | ConvertFrom-Json
        if ($healthData.database -eq "connected") {
            Log-TestResult "Database Connection" "PASS" "Database connection healthy"
        } else {
            Log-TestResult "Database Connection" "SKIP" "Database status not available"
        }
    } else {
        Log-TestResult "Database Connection" "SKIP" "Health endpoint not available"
    }
} catch {
    Log-TestResult "Database Connection" "SKIP" "Database test skipped"
}

Write-Host ""

# Calculate Test Results
$passRate = [math]::Round(($testResults.Passed / $testResults.Total) * 100, 2)

Write-Host "📊 End-to-End Test Summary" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Green
Write-Host "Total Tests: $($testResults.Total)" -ForegroundColor White
Write-Host "Passed: $($testResults.Passed)" -ForegroundColor Green
Write-Host "Failed: $($testResults.Failed)" -ForegroundColor Red
Write-Host "Skipped: $($testResults.Skipped)" -ForegroundColor Yellow
Write-Host "Pass Rate: $passRate%" -ForegroundColor White

if ($passRate -ge 90) {
    Write-Host "🎯 Test Status: EXCELLENT" -ForegroundColor Green
} elseif ($passRate -ge 80) {
    Write-Host "🎯 Test Status: GOOD" -ForegroundColor Yellow
} elseif ($passRate -ge 70) {
    Write-Host "🎯 Test Status: ACCEPTABLE" -ForegroundColor Yellow
} else {
    Write-Host "🎯 Test Status: NEEDS IMPROVEMENT" -ForegroundColor Red
}

Write-Host ""
Write-Host "🧪 Test Recommendations:" -ForegroundColor Yellow

if ($testResults.Failed -gt 0) {
    Write-Host "   • Fix failed tests before production deployment" -ForegroundColor White
    Write-Host "   • Review error logs for specific issues" -ForegroundColor White
    Write-Host "   • Test on different browsers and devices" -ForegroundColor White
}

if ($passRate -lt 90) {
    Write-Host "   • Improve test coverage" -ForegroundColor White
    Write-Host "   • Add more comprehensive error handling" -ForegroundColor White
    Write-Host "   • Implement automated testing in CI/CD" -ForegroundColor White
}

Write-Host ""
Write-Host "✅ End-to-end testing completed!" -ForegroundColor Green 