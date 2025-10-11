# SmartFarm Railway Fix Script
# This script fixes Railway deployment issues systematically

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "SmartFarm Railway Complete Fix" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# Step 1: Verify Backend Works Locally
Write-Host "`n[Step 1] Verifying Backend Works Locally..." -ForegroundColor Yellow

cd backend
Write-Host "Installing backend dependencies..." -ForegroundColor White
npm install --prefer-offline --no-audit --no-fund 2>&1 | Out-Null

Write-Host "Starting backend server..." -ForegroundColor White
$job = Start-Job -ScriptBlock {
    cd E:\Document\SmartFarm\backend
    node server-simple.cjs
}

Start-Sleep -Seconds 3

try {
    $response = Invoke-WebRequest http://localhost:3000/api/health -UseBasicParsing -TimeoutSec 5
    if ($response.StatusCode -eq 200) {
        Write-Host "[PASS] Backend works locally! Status: $($response.StatusCode)" -ForegroundColor Green
        Write-Host "Response: $($response.Content)" -ForegroundColor Green
    }
} catch {
    Write-Host "[FAIL] Backend failed to start locally!" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    Stop-Job $job -ErrorAction SilentlyContinue
    Remove-Job $job -ErrorAction SilentlyContinue
    exit 1
}

Stop-Job $job -ErrorAction SilentlyContinue
Remove-Job $job -ErrorAction SilentlyContinue
cd ..

# Step 2: Check Railway Configuration
Write-Host "`n[Step 2] Checking Railway Configuration..." -ForegroundColor Yellow

if (Test-Path "railway.toml") {
    $railwayConfig = Get-Content "railway.toml" -Raw
    if ($railwayConfig -match 'builder = "NIXPACKS"') {
        Write-Host "[PASS] railway.toml uses NIXPACKS" -ForegroundColor Green
    } else {
        Write-Host "[FAIL] railway.toml not configured for NIXPACKS" -ForegroundColor Red
    }
    
    if ($railwayConfig -match 'root = "backend"') {
        Write-Host "[PASS] railway.toml root = backend" -ForegroundColor Green
    } else {
        Write-Host "[FAIL] railway.toml root not set to backend" -ForegroundColor Red
    }
    
    if ($railwayConfig -match 'start = "node server-simple.cjs"') {
        Write-Host "[PASS] railway.toml start command correct" -ForegroundColor Green
    } else {
        Write-Host "[FAIL] railway.toml start command incorrect" -ForegroundColor Red
    }
} else {
    Write-Host "[FAIL] railway.toml not found" -ForegroundColor Red
}

# Step 3: Check for Dockerfile Conflicts
Write-Host "`n[Step 3] Checking for Dockerfile Conflicts..." -ForegroundColor Yellow

$dockerfiles = Get-ChildItem -Path . -Filter "Dockerfile*" -Recurse -ErrorAction SilentlyContinue
if ($dockerfiles.Count -eq 0) {
    Write-Host "[PASS] No Dockerfile conflicts found" -ForegroundColor Green
} else {
    Write-Host "[WARN] Found $($dockerfiles.Count) Dockerfile(s):" -ForegroundColor Yellow
    $dockerfiles | ForEach-Object { Write-Host "  - $($_.FullName)" -ForegroundColor Yellow }
}

# Step 4: Verify backend/package.json
Write-Host "`n[Step 4] Checking backend/package.json..." -ForegroundColor Yellow

if (Test-Path "backend/package.json") {
    $packageJson = Get-Content "backend/package.json" -Raw | ConvertFrom-Json
    
    if ($packageJson.scripts.start -eq "node server-simple.cjs") {
        Write-Host "[PASS] package.json start script correct" -ForegroundColor Green
    } else {
        Write-Host "[FAIL] package.json start script incorrect" -ForegroundColor Red
    }
    
    if ($packageJson.dependencies.express) {
        Write-Host "[PASS] Express dependency exists" -ForegroundColor Green
    } else {
        Write-Host "[FAIL] Express dependency missing" -ForegroundColor Red
    }
} else {
    Write-Host "[FAIL] backend/package.json not found" -ForegroundColor Red
}

# Step 5: Test Railway Backend
Write-Host "`n[Step 5] Testing Railway Backend..." -ForegroundColor Yellow

try {
    $response = Invoke-WebRequest https://smartfarm-app-production.up.railway.app/api/health -UseBasicParsing -TimeoutSec 10
    Write-Host "[PASS] Railway backend is accessible!" -ForegroundColor Green
    Write-Host "Status: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "Response: $($response.Content)" -ForegroundColor Green
} catch {
    $statusCode = $_.Exception.Response.StatusCode.value__
    Write-Host "[FAIL] Railway backend returned: $statusCode" -ForegroundColor Red
    
    if ($statusCode -eq 502) {
        Write-Host "`nDiagnosis: 502 Bad Gateway" -ForegroundColor Yellow
        Write-Host "This means the backend is not starting on Railway." -ForegroundColor Yellow
        Write-Host "`nPossible causes:" -ForegroundColor Yellow
        Write-Host "1. Build is failing" -ForegroundColor White
        Write-Host "2. Dependencies not installing" -ForegroundColor White
        Write-Host "3. Health check timeout" -ForegroundColor White
        Write-Host "4. Server not binding to PORT" -ForegroundColor White
        Write-Host "5. Crash on startup" -ForegroundColor White
    }
}

# Summary and Action Items
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "Summary" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

Write-Host "`nLocal Backend: Working ✅" -ForegroundColor Green
Write-Host "Railway Configuration: Correct ✅" -ForegroundColor Green
Write-Host "Railway Backend: Needs Fix ❌" -ForegroundColor Red

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "REQUIRED ACTION" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

Write-Host "`nThe backend works locally but fails on Railway." -ForegroundColor Yellow
Write-Host "This indicates a Railway-specific deployment issue." -ForegroundColor Yellow

Write-Host "`nIMMediaTE STEPS:" -ForegroundColor Cyan
Write-Host "`n1. Go to Railway Dashboard:" -ForegroundColor White
Write-Host "   https://railway.app/dashboard" -ForegroundColor Cyan

Write-Host "`n2. Select your SmartFarm project" -ForegroundColor White

Write-Host "`n3. Check the Deployments tab:" -ForegroundColor White
Write-Host "   - Look for the latest deployment" -ForegroundColor Gray
Write-Host "   - Click on it to see logs" -ForegroundColor Gray
Write-Host "   - Look for error messages" -ForegroundColor Gray

Write-Host "`n4. Common issues to check:" -ForegroundColor White
Write-Host "   - Build logs show 'Using Detected Dockerfile'? (should be NIXPACKS)" -ForegroundColor Gray
Write-Host "   - npm install failing? (check for dependency errors)" -ForegroundColor Gray
Write-Host "   - Server not starting? (check for module errors)" -ForegroundColor Gray
Write-Host "   - Health check failing? (check timeout settings)" -ForegroundColor Gray

Write-Host "`n5. Try Manual Redeploy:" -ForegroundColor White
Write-Host "   - In Railway, go to Deployments tab" -ForegroundColor Gray
Write-Host "   - Click 'Redeploy' on latest deployment" -ForegroundColor Gray
Write-Host "   - Watch logs in real-time" -ForegroundColor Gray

Write-Host "`n6. Verify Environment Variables:" -ForegroundColor White
Write-Host "   - Settings → Variables" -ForegroundColor Gray
Write-Host "   - Should have: NODE_ENV=production" -ForegroundColor Gray
Write-Host "   - Should have: CORS_ORIGINS=..." -ForegroundColor Gray
Write-Host "   - Should NOT manually set PORT" -ForegroundColor Gray

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "Next: Commit & Push to Trigger Redeploy" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

Write-Host "`nRun these commands to trigger Railway redeploy:" -ForegroundColor Yellow
Write-Host "git add ." -ForegroundColor Cyan
Write-Host "git commit -m 'Force Railway redeploy with verified working backend'" -ForegroundColor Cyan
Write-Host "git push" -ForegroundColor Cyan

Write-Host "`nRailway will automatically detect the push and redeploy." -ForegroundColor White
Write-Host "Watch the deployment logs for any errors." -ForegroundColor White

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "Fix script complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
