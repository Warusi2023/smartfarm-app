# SmartFarm Production Deployment Preparation Script
# This script verifies everything is ready for Netlify deployment

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "SmartFarm Deployment Preparation" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$allChecksPassed = $true

# Check 1: Verify we're in the right directory
Write-Host "Step 1: Checking directory structure..." -ForegroundColor Cyan
if (Test-Path "package.json") {
    Write-Host "  ✓ Found package.json" -ForegroundColor Green
} else {
    Write-Host "  ✗ package.json not found. Run this script from web-project/ directory" -ForegroundColor Red
    $allChecksPassed = $false
}

if (Test-Path "netlify.toml") {
    Write-Host "  ✓ Found netlify.toml" -ForegroundColor Green
} else {
    Write-Host "  ✗ netlify.toml not found" -ForegroundColor Red
    $allChecksPassed = $false
}

if (Test-Path "vite.config.ts") {
    Write-Host "  ✓ Found vite.config.ts" -ForegroundColor Green
} else {
    Write-Host "  ✗ vite.config.ts not found" -ForegroundColor Red
    $allChecksPassed = $false
}

Write-Host ""

# Check 2: Verify build output exists
Write-Host "Step 2: Checking build output..." -ForegroundColor Cyan
if (Test-Path "dist") {
    Write-Host "  ✓ dist/ folder exists" -ForegroundColor Green
    
    $distFiles = Get-ChildItem -Path "dist" -Recurse -File -ErrorAction SilentlyContinue
    if ($distFiles) {
        $distSize = ($distFiles | Measure-Object -Property Length -Sum).Sum / 1MB
        $distSizeRounded = [math]::Round($distSize, 2)
        Write-Host "  ✓ dist/ contains $($distFiles.Count) files ($distSizeRounded MB total)" -ForegroundColor Green
        
        if (Test-Path "dist/index.html") {
            Write-Host "  ✓ dist/index.html exists" -ForegroundColor Green
        } else {
            Write-Host "  ✗ dist/index.html not found" -ForegroundColor Red
            $allChecksPassed = $false
        }
    }
} else {
    Write-Host "  ⚠ dist/ folder not found" -ForegroundColor Yellow
    Write-Host "  ⚠ Run 'npm run build' to create build output" -ForegroundColor Yellow
    $allChecksPassed = $false
}

Write-Host ""

# Check 3: Verify netlify.toml configuration
Write-Host "Step 3: Verifying Netlify configuration..." -ForegroundColor Cyan
if (Test-Path "netlify.toml") {
    $netlifyConfig = Get-Content "netlify.toml" -Raw
    
    if ($netlifyConfig -match 'publish\s*=\s*"dist"') {
        Write-Host "  ✓ Publish directory set to 'dist'" -ForegroundColor Green
    } else {
        Write-Host "  ✗ Publish directory not set correctly in netlify.toml" -ForegroundColor Red
        $allChecksPassed = $false
    }
    
    if ($netlifyConfig -match 'command\s*=\s*"npm install') {
        Write-Host "  ✓ Build command configured correctly" -ForegroundColor Green
    } else {
        Write-Host "  ⚠ Build command may need verification" -ForegroundColor Yellow
    }
} else {
    Write-Host "  ✗ netlify.toml not found" -ForegroundColor Red
    $allChecksPassed = $false
}

Write-Host ""

# Check 4: Verify environment variables are documented
Write-Host "Step 4: Checking environment variables..." -ForegroundColor Cyan
if (Test-Path "frontend.env.example") {
    Write-Host "  ✓ Environment variables template found (frontend.env.example)" -ForegroundColor Green
} else {
    Write-Host "  ⚠ Environment variables template not found" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Required environment variables for Netlify:" -ForegroundColor Yellow
Write-Host "  VITE_API_BASE_URL=https://smartfarm-app-production.up.railway.app" -ForegroundColor White
Write-Host "  VITE_API_URL=https://smartfarm-app-production.up.railway.app" -ForegroundColor White
Write-Host "  VITE_APP_NAME=SmartFarm" -ForegroundColor White
Write-Host "  VITE_APP_VERSION=1.0.0" -ForegroundColor White
Write-Host "  NODE_ENV=production" -ForegroundColor White
Write-Host ""

# Check 5: Verify git status
Write-Host "Step 5: Checking git status..." -ForegroundColor Cyan
$gitCheck = git status --porcelain 2>&1
if ($?) {
    if ([string]::IsNullOrWhiteSpace($gitCheck)) {
        Write-Host "  ✓ Working directory is clean" -ForegroundColor Green
    } else {
        Write-Host "  ⚠ Uncommitted changes detected:" -ForegroundColor Yellow
        $gitCheck | ForEach-Object { Write-Host "    $_" -ForegroundColor Gray }
        Write-Host "  ⚠ Consider committing changes before deploying" -ForegroundColor Yellow
    }
} else {
    Write-Host "  ⚠ Could not check git status" -ForegroundColor Yellow
}

Write-Host ""

# Summary
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Preparation Summary" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

if ($allChecksPassed) {
    Write-Host "✓ All checks passed! Ready for deployment." -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "  1. Go to https://app.netlify.com" -ForegroundColor White
    Write-Host "  2. Click 'Add new site' → 'Import an existing project'" -ForegroundColor White
    Write-Host "  3. Connect your GitHub repository" -ForegroundColor White
    Write-Host "  4. Configure build settings:" -ForegroundColor White
    Write-Host "     - Base directory: web-project" -ForegroundColor Gray
    Write-Host "     - Build command: npm install and npm run build" -ForegroundColor Gray
    Write-Host "     - Publish directory: dist" -ForegroundColor Gray
    Write-Host "  5. Add environment variables (see list above)" -ForegroundColor White
    Write-Host "  6. Click 'Deploy site'" -ForegroundColor White
    Write-Host ""
    Write-Host "After deployment, run:" -ForegroundColor Cyan
    Write-Host "  .\scripts\verify-production.ps1 -ProductionUrl 'https://your-site.netlify.app'" -ForegroundColor White
    exit 0
} else {
    Write-Host "✗ Some checks failed. Please fix the issues above before deploying." -ForegroundColor Red
    exit 1
}
