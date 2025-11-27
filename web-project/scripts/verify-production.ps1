# SmartFarm Production Deployment Verification Script
# This script helps verify that your production deployment is configured correctly

param(
    [string]$ProductionUrl = "",
    [string]$BackendUrl = "https://smartfarm-app-production.up.railway.app"
)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "SmartFarm Production Verification" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if production URL is provided
if ([string]::IsNullOrEmpty($ProductionUrl)) {
    Write-Host "Usage: .\scripts\verify-production.ps1 -ProductionUrl 'https://your-site.netlify.app'" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Please provide your production URL to verify deployment." -ForegroundColor Yellow
    exit 1
}

Write-Host "Production URL: $ProductionUrl" -ForegroundColor Green
Write-Host "Backend URL: $BackendUrl" -ForegroundColor Green
Write-Host ""

# Function to check HTTP status
function Test-Url {
    param([string]$Url, [string]$Description)
    
    try {
        $response = Invoke-WebRequest -Uri $Url -Method Get -UseBasicParsing -TimeoutSec 10 -ErrorAction Stop
        if ($response.StatusCode -eq 200) {
            Write-Host "  ✓ $Description" -ForegroundColor Green
            return $true
        } else {
            Write-Host "  ✗ $Description (Status: $($response.StatusCode))" -ForegroundColor Red
            return $false
        }
    } catch {
        Write-Host "  ✗ $Description (Error: $($_.Exception.Message))" -ForegroundColor Red
        return $false
    }
}

# Function to check HTTPS
function Test-Https {
    param([string]$Url)
    
    if ($Url -match "^https://") {
        Write-Host "  ✓ URL uses HTTPS" -ForegroundColor Green
        return $true
    } else {
        Write-Host "  ✗ URL does not use HTTPS" -ForegroundColor Red
        return $false
    }
}

# Function to check security headers
function Test-SecurityHeaders {
    param([string]$Url)
    
    try {
        $response = Invoke-WebRequest -Uri $Url -Method Head -UseBasicParsing -TimeoutSec 10 -ErrorAction Stop
        $headers = $response.Headers
        
        $securityHeaders = @{
            "X-Frame-Options" = "DENY"
            "X-XSS-Protection" = "1; mode=block"
            "X-Content-Type-Options" = "nosniff"
        }
        
        $allPresent = $true
        foreach ($header in $securityHeaders.Keys) {
            if ($headers.ContainsKey($header)) {
                Write-Host "  ✓ $header present" -ForegroundColor Green
            } else {
                Write-Host "  ✗ $header missing" -ForegroundColor Yellow
                $allPresent = $false
            }
        }
        
        return $allPresent
    } catch {
        Write-Host "  ⚠ Could not check security headers: $($_.Exception.Message)" -ForegroundColor Yellow
        return $false
    }
}

# Function to check API connectivity
function Test-ApiConnectivity {
    param([string]$BackendUrl)
    
    $healthUrl = "$BackendUrl/api/health"
    try {
        $response = Invoke-WebRequest -Uri $healthUrl -Method Get -UseBasicParsing -TimeoutSec 10 -ErrorAction Stop
        if ($response.StatusCode -eq 200) {
            Write-Host "  ✓ Backend API is accessible" -ForegroundColor Green
            return $true
        } else {
            Write-Host "  ✗ Backend API returned status: $($response.StatusCode)" -ForegroundColor Red
            return $false
        }
    } catch {
        Write-Host "  ✗ Backend API is not accessible: $($_.Exception.Message)" -ForegroundColor Red
        Write-Host "    Make sure your backend is running and CORS is configured." -ForegroundColor Yellow
        return $false
    }
}

# Verification Steps
Write-Host "Step 1: Testing Production URL..." -ForegroundColor Cyan
$urlWorks = Test-Url -Url $ProductionUrl -Description "Production site is accessible"

Write-Host ""
Write-Host "Step 2: Checking HTTPS..." -ForegroundColor Cyan
$httpsWorks = Test-Https -Url $ProductionUrl

Write-Host ""
Write-Host "Step 3: Checking Security Headers..." -ForegroundColor Cyan
$headersOk = Test-SecurityHeaders -Url $ProductionUrl

Write-Host ""
Write-Host "Step 4: Testing Backend Connectivity..." -ForegroundColor Cyan
$apiWorks = Test-ApiConnectivity -BackendUrl $BackendUrl

Write-Host ""
Write-Host "Step 5: Testing Static Assets..." -ForegroundColor Cyan
$assetsOk = $true
$assets = @("/favicon.ico", "/robots.txt", "/sitemap.xml")
foreach ($asset in $assets) {
    $assetUrl = "$ProductionUrl$asset"
    if (-not (Test-Url -Url $assetUrl -Description "Asset $asset")) {
        $assetsOk = $false
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Verification Summary" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$allChecks = @(
    @{Name="Production URL"; Status=$urlWorks},
    @{Name="HTTPS"; Status=$httpsWorks},
    @{Name="Security Headers"; Status=$headersOk},
    @{Name="Backend API"; Status=$apiWorks},
    @{Name="Static Assets"; Status=$assetsOk}
)

$passed = 0
$total = $allChecks.Count

foreach ($check in $allChecks) {
    if ($check.Status) {
        Write-Host "✓ $($check.Name)" -ForegroundColor Green
        $passed++
    } else {
        Write-Host "✗ $($check.Name)" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "Results: $passed/$total checks passed" -ForegroundColor $(if ($passed -eq $total) { "Green" } else { "Yellow" })

if ($passed -eq $total) {
    Write-Host ""
    Write-Host "✓ All checks passed! Your production deployment looks good." -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "  1. Run end-to-end tests manually" -ForegroundColor White
    Write-Host "  2. Check Lighthouse scores" -ForegroundColor White
    Write-Host "  3. Test all user flows" -ForegroundColor White
    Write-Host "  4. Set up monitoring" -ForegroundColor White
    exit 0
} else {
    Write-Host ""
    Write-Host "⚠ Some checks failed. Please review the issues above." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Common fixes:" -ForegroundColor Cyan
    Write-Host "  - Ensure environment variables are set in your hosting platform" -ForegroundColor White
    Write-Host "  - Verify backend is running and accessible" -ForegroundColor White
    Write-Host "  - Check CORS configuration on backend" -ForegroundColor White
    Write-Host "  - Review security headers configuration" -ForegroundColor White
    exit 1
}

