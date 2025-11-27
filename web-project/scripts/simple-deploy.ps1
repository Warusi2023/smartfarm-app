# SmartFarm Simple Deployment Script
# Deploy to multiple platforms

param(
    [switch]$DeployGitHubPages,
    [switch]$SkipBuild
)

Write-Host "SmartFarm Simple Deployment" -ForegroundColor Green
Write-Host "===========================" -ForegroundColor Green

# Check if build exists
$buildDir = "web/build/distributions/web"
if (!(Test-Path $buildDir)) {
    Write-Host "❌ Build directory not found. Building first..." -ForegroundColor Red
    if (!$SkipBuild) {
        powershell -ExecutionPolicy Bypass -File "deploy-web.ps1" -Platform "local" -BuildOnly -SkipTests
    }
}

if (!(Test-Path $buildDir)) {
    Write-Host "❌ Build failed. Exiting." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build directory found" -ForegroundColor Green

# Deploy to GitHub Pages
if ($DeployGitHubPages) {
    Write-Host "Preparing GitHub Pages deployment..." -ForegroundColor Cyan
    
    $ghPagesDir = "gh-pages"
    if (Test-Path $ghPagesDir) {
        Remove-Item -Recurse -Force $ghPagesDir
    }
    
    # Copy build files to gh-pages directory
    Copy-Item -Recurse $buildDir $ghPagesDir
    
    # Create .nojekyll file for GitHub Pages
    "" | Out-File -FilePath "$ghPagesDir/.nojekyll" -Encoding UTF8
    
    Write-Host "✅ GitHub Pages files prepared in: $ghPagesDir" -ForegroundColor Green
    Write-Host "📝 To deploy to GitHub Pages:" -ForegroundColor Yellow
    Write-Host "   1. Push the gh-pages directory to your repository" -ForegroundColor White
    Write-Host "   2. Enable GitHub Pages in your repository settings" -ForegroundColor White
    Write-Host "   3. Set the source to gh-pages branch" -ForegroundColor White
}

# Generate simple report
$report = "SmartFarm Deployment Report`n"
$report += "Generated: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')`n`n"
$report += "Build Status: Success`n"
$report += "Build Directory: $buildDir`n"

if (Test-Path $buildDir) {
    $size = (Get-ChildItem $buildDir -Recurse | Measure-Object -Property Length -Sum).Sum
    $sizeMB = [math]::Round($size / 1MB, 2)
    $report += "Build Size: $sizeMB MB`n"
}

$report += "`nDeployment Status:`n"
if ($DeployGitHubPages) {
    $report += "- GitHub Pages: Prepared`n"
} else {
    $report += "- GitHub Pages: Skipped`n"
}

$report += "`nNext Steps:`n"
$report += "1. Test the application locally`n"
$report += "2. Deploy to your preferred platform`n"
$report += "3. Set up monitoring and analytics`n"
$report += "4. Configure custom domains`n"

$reportPath = "deployment-summary.txt"
$report | Out-File -FilePath $reportPath -Encoding UTF8

Write-Host "`nDeployment Summary:" -ForegroundColor Green
Write-Host $report -ForegroundColor White
Write-Host "Deployment completed successfully!" -ForegroundColor Green 