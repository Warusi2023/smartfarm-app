# Git Push Script for Verification Tasks Documentation
# Run this script after freeing up disk space

Write-Host "🚀 Pushing Verification Tasks Documentation to GitHub..." -ForegroundColor Cyan

# Check if we're in a git repository
if (-not (Test-Path .git)) {
    Write-Host "❌ Not a git repository!" -ForegroundColor Red
    exit 1
}

# Check git status
Write-Host "`n📊 Checking git status..." -ForegroundColor Yellow
git status --short

# Add all changes
Write-Host "`n➕ Adding files..." -ForegroundColor Yellow
git add .

# Commit changes
Write-Host "`n💾 Committing changes..." -ForegroundColor Yellow
$commitMessage = @"
Complete verification tasks documentation and scripts

- Added environment variables verification guide and script
- Added Sentry and UptimeRobot monitoring setup guides
- Added browser compatibility and E2E testing guides
- Added API keys verification guide and script
- Added CORS verification checklist and test script
- Added legal documents verification guide
- Added database connection verification guide and script
- Added analytics setup guide (Google Analytics & Plausible)
- Added performance optimization guide and configurations
- Updated netlify.toml with caching headers
- Updated _headers file with caching configuration
- Added database indexes SQL script
- Updated package.json files with Sentry dependencies
- Created comprehensive test scripts and templates
- Updated completion status to 95%
"@

git commit -m $commitMessage

# Push to GitHub
Write-Host "`n📤 Pushing to GitHub..." -ForegroundColor Yellow
git push origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n✅ Successfully pushed to GitHub!" -ForegroundColor Green
} else {
    Write-Host "`n❌ Push failed. Check error messages above." -ForegroundColor Red
}
