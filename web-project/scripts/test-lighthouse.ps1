# SmartFarm Lighthouse Testing Script
# Requires Lighthouse CLI: npm install -g lighthouse
# Usage: .\scripts\test-lighthouse.ps1 -Url "https://your-site.netlify.app"

param(
    [Parameter(Mandatory=$true)]
    [string]$Url
)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "SmartFarm Lighthouse Performance Test" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Lighthouse is installed
$lighthouseInstalled = Get-Command lighthouse -ErrorAction SilentlyContinue

if (-not $lighthouseInstalled) {
    Write-Host "Lighthouse CLI is not installed." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Install it with:" -ForegroundColor Cyan
    Write-Host "  npm install -g lighthouse" -ForegroundColor White
    Write-Host ""
    Write-Host "Or run Lighthouse from Chrome DevTools:" -ForegroundColor Cyan
    Write-Host "  1. Open Chrome DevTools (F12)" -ForegroundColor White
    Write-Host "  2. Go to Lighthouse tab" -ForegroundColor White
    Write-Host "  3. Select categories and click 'Generate report'" -ForegroundColor White
    exit 1
}

Write-Host "Testing URL: $Url" -ForegroundColor Green
Write-Host ""

# Run Lighthouse for mobile
Write-Host "Running Lighthouse Mobile Test..." -ForegroundColor Cyan
$mobileReport = "lighthouse-mobile-$(Get-Date -Format 'yyyyMMdd-HHmmss').html"
lighthouse $Url --preset=desktop --output=html --output-path=$mobileReport --quiet

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Mobile report generated: $mobileReport" -ForegroundColor Green
} else {
    Write-Host "✗ Mobile test failed" -ForegroundColor Red
}

Write-Host ""

# Run Lighthouse for desktop
Write-Host "Running Lighthouse Desktop Test..." -ForegroundColor Cyan
$desktopReport = "lighthouse-desktop-$(Get-Date -Format 'yyyyMMdd-HHmmss').html"
lighthouse $Url --preset=desktop --output=html --output-path=$desktopReport --quiet

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Desktop report generated: $desktopReport" -ForegroundColor Green
} else {
    Write-Host "✗ Desktop test failed" -ForegroundColor Red
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Test Complete" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Reports saved:" -ForegroundColor Cyan
Write-Host "  - $mobileReport" -ForegroundColor White
Write-Host "  - $desktopReport" -ForegroundColor White
Write-Host ""
Write-Host "Open the reports in your browser to view detailed scores and recommendations." -ForegroundColor Yellow
Write-Host ""

# Target scores
Write-Host "Target Scores:" -ForegroundColor Cyan
Write-Host "  Performance: ≥ 80" -ForegroundColor White
Write-Host "  Accessibility: ≥ 90" -ForegroundColor White
Write-Host "  Best Practices: ≥ 80" -ForegroundColor White
Write-Host "  SEO: ≥ 80" -ForegroundColor White

