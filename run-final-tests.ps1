# SmartFarm Final Testing Script
Write-Host "Starting SmartFarm Final Testing..." -ForegroundColor Green

# Test Configuration
$testUrl = "http://localhost:8080"
$passedTests = 0
$failedTests = 0
$totalTests = 0

Write-Host "Test Configuration:" -ForegroundColor Yellow
Write-Host "  Test URL: $testUrl" -ForegroundColor White
Write-Host ""

# Function to log test results
function Test-Result {
    param($TestName, $Success, $Message)
    
    $script:totalTests++
    
    if ($Success) {
        Write-Host "  PASS: $TestName - $Message" -ForegroundColor Green
        $script:passedTests++
    } else {
        Write-Host "  FAIL: $TestName - $Message" -ForegroundColor Red
        $script:failedTests++
    }
}

# Test 1: Check if application is running
Write-Host "Testing Application Availability..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri $testUrl -UseBasicParsing -TimeoutSec 10 -ErrorAction Stop
    Test-Result "Application Startup" $true "Application is running"
} catch {
    Test-Result "Application Startup" $false "Application not accessible: $($_.Exception.Message)"
}

Write-Host ""

# Test 2: Check static deployment files
Write-Host "Testing Static Deployment Files..." -ForegroundColor Yellow
$deployDir = "smartfarm-deployed"
if (Test-Path $deployDir) {
    $indexFile = Join-Path $deployDir "index.html"
    if (Test-Path $indexFile) {
        Test-Result "Static Files" $true "Deployment files found"
    } else {
        Test-Result "Static Files" $false "index.html not found"
    }
} else {
    Test-Result "Static Files" $false "Deployment directory not found"
}

Write-Host ""

# Test 3: Check build files
Write-Host "Testing Build Files..." -ForegroundColor Yellow
$buildDir = "web/build/distributions/web"
if (Test-Path $buildDir) {
    Test-Result "Build Output" $true "Build directory exists"
} else {
    Test-Result "Build Output" $false "Build directory not found"
}

Write-Host ""

# Test 4: Check documentation files
Write-Host "Testing Documentation..." -ForegroundColor Yellow
$docs = @(
    "PRODUCTION_DEPLOYMENT_GUIDE.md",
    "API_KEYS_SETUP_GUIDE.md",
    "FINAL_TESTING_REPORT.md",
    "PRODUCTION_READY_SUMMARY.md"
)

foreach ($doc in $docs) {
    if (Test-Path $doc) {
        Test-Result "Documentation: $doc" $true "Documentation file exists"
    } else {
        Test-Result "Documentation: $doc" $false "Documentation file missing"
    }
}

Write-Host ""

# Test 5: Check configuration files
Write-Host "Testing Configuration Files..." -ForegroundColor Yellow
$configs = @(
    "build.gradle.kts",
    "gradle.properties",
    "web/build.gradle.kts",
    "shared/build.gradle.kts"
)

foreach ($config in $configs) {
    if (Test-Path $config) {
        Test-Result "Config: $config" $true "Configuration file exists"
    } else {
        Test-Result "Config: $config" $false "Configuration file missing"
    }
}

Write-Host ""

# Test 6: Check GitHub Actions workflow
Write-Host "Testing GitHub Actions..." -ForegroundColor Yellow
$workflowFile = ".github/workflows/deploy.yml"
if (Test-Path $workflowFile) {
    Test-Result "GitHub Actions" $true "Deployment workflow exists"
} else {
    Test-Result "GitHub Actions" $false "Deployment workflow missing"
}

Write-Host ""

# Test 7: Check backend API files
Write-Host "Testing Backend API..." -ForegroundColor Yellow
$backendDir = "backend-api"
if (Test-Path $backendDir) {
    $backendFiles = @(
        "server.js",
        "package.json",
        "database/config.js",
        "database/models/index.js"
    )
    
    foreach ($file in $backendFiles) {
        $fullPath = Join-Path $backendDir $file
        if (Test-Path $fullPath) {
            Test-Result "Backend: $file" $true "Backend file exists"
        } else {
            Test-Result "Backend: $file" $false "Backend file missing"
        }
    }
} else {
    Test-Result "Backend Directory" $false "Backend directory not found"
}

Write-Host ""

# Calculate test results
$passRate = if ($totalTests -gt 0) { [math]::Round(($passedTests / $totalTests) * 100, 2) } else { 0 }

Write-Host "Final Testing Summary" -ForegroundColor Green
Write-Host "====================" -ForegroundColor Green
Write-Host "Total Tests: $totalTests" -ForegroundColor White
Write-Host "Passed: $passedTests" -ForegroundColor Green
Write-Host "Failed: $failedTests" -ForegroundColor Red
Write-Host "Pass Rate: $passRate%" -ForegroundColor White

Write-Host ""

if ($passRate -ge 90) {
    Write-Host "Status: EXCELLENT - Ready for Production!" -ForegroundColor Green
} elseif ($passRate -ge 80) {
    Write-Host "Status: GOOD - Minor issues to address" -ForegroundColor Yellow
} elseif ($passRate -ge 70) {
    Write-Host "Status: ACCEPTABLE - Some issues need fixing" -ForegroundColor Yellow
} else {
    Write-Host "Status: NEEDS IMPROVEMENT - Major issues found" -ForegroundColor Red
}

Write-Host ""

# Final recommendations
Write-Host "Next Steps:" -ForegroundColor Yellow
if ($passRate -ge 90) {
    Write-Host "1. Deploy to production platform (Netlify/Vercel/GitHub Pages)" -ForegroundColor White
    Write-Host "2. Configure API keys for full functionality" -ForegroundColor White
    Write-Host "3. Set up production database" -ForegroundColor White
    Write-Host "4. Monitor application performance" -ForegroundColor White
} else {
    Write-Host "1. Fix failed tests before deployment" -ForegroundColor White
    Write-Host "2. Review error messages above" -ForegroundColor White
    Write-Host "3. Re-run tests after fixes" -ForegroundColor White
    Write-Host "4. Deploy only after all tests pass" -ForegroundColor White
}

Write-Host ""
Write-Host "Testing completed!" -ForegroundColor Green 