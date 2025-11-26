# Complete GitHub Fix Script
# This will fix your GitHub push issues

Write-Host "🔧 Complete GitHub Fix" -ForegroundColor Cyan
Write-Host "====================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Check current status
Write-Host "Step 1: Checking git status..." -ForegroundColor Yellow
$status = git status --short
if ($status) {
    Write-Host "📝 Uncommitted changes found:" -ForegroundColor Yellow
    git status --short
    Write-Host ""
} else {
    Write-Host "✅ No uncommitted changes" -ForegroundColor Green
    Write-Host ""
}

# Step 2: Check remote
Write-Host "Step 2: Checking remote configuration..." -ForegroundColor Yellow
$remote = git config --get remote.origin.url
Write-Host "Remote: $remote" -ForegroundColor White
Write-Host ""

# Step 3: Switch to HTTPS with credential helper
Write-Host "Step 3: Setting up HTTPS with credential helper..." -ForegroundColor Yellow

# Switch to HTTPS
git remote set-url origin https://github.com/Warusi2023/smartfarm-app.git
Write-Host "✅ Switched to HTTPS" -ForegroundColor Green

# Configure credential helper
git config --global credential.helper manager-core
Write-Host "✅ Configured credential helper" -ForegroundColor Green
Write-Host ""

# Step 4: Clear any cached credentials
Write-Host "Step 4: Clearing old credentials..." -ForegroundColor Yellow
try {
    cmdkey /list | Select-String "github.com" | ForEach-Object {
        $line = $_.Line
        if ($line -match "Target:\s+(.+)") {
            cmdkey /delete:$matches[1] 2>$null
        }
    }
    Write-Host "✅ Cleared cached credentials" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Could not clear credentials (may not exist)" -ForegroundColor Yellow
}
Write-Host ""

# Step 5: Instructions for Personal Access Token
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor DarkGray
Write-Host ""
Write-Host "📋 IMPORTANT: Get a Personal Access Token" -ForegroundColor Cyan
Write-Host ""
Write-Host "GitHub no longer accepts passwords. You need a token:" -ForegroundColor White
Write-Host ""
Write-Host "1. Go to: https://github.com/settings/tokens" -ForegroundColor Yellow
Write-Host "2. Click 'Generate new token' → 'Generate new token (classic)'" -ForegroundColor White
Write-Host "3. Name: 'SmartFarm Push'" -ForegroundColor White
Write-Host "4. Expiration: 90 days (or No expiration)" -ForegroundColor White
Write-Host "5. Select scope: 'repo' (check ALL repo permissions)" -ForegroundColor White
Write-Host "6. Click 'Generate token'" -ForegroundColor White
Write-Host "7. COPY THE TOKEN (you won't see it again!)" -ForegroundColor Red
Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor DarkGray
Write-Host ""

$hasToken = Read-Host "Do you have a Personal Access Token ready? (y/n)"

if ($hasToken -ne "y" -and $hasToken -ne "Y") {
    Write-Host ""
    Write-Host "Please get a token first:" -ForegroundColor Yellow
    Write-Host "https://github.com/settings/tokens" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Then run this script again." -ForegroundColor White
    exit
}

Write-Host ""
Write-Host "Step 5: Attempting to push..." -ForegroundColor Yellow
Write-Host ""
Write-Host "When prompted:" -ForegroundColor Cyan
Write-Host "  Username: Warusi2023" -ForegroundColor White
Write-Host "  Password: Paste your Personal Access Token (NOT your GitHub password)" -ForegroundColor White
Write-Host ""

# Stage any uncommitted changes
if ($status) {
    Write-Host "Staging changes..." -ForegroundColor Yellow
    git add .
    Write-Host "Committing changes..." -ForegroundColor Yellow
    git commit -m "Update: Fix GitHub push configuration"
}

# Attempt push
Write-Host ""
Write-Host "🚀 Pushing to GitHub..." -ForegroundColor Cyan
Write-Host ""

$pushResult = git push origin main 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ SUCCESS! Push completed!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Your changes are now on GitHub:" -ForegroundColor Cyan
    Write-Host "https://github.com/Warusi2023/smartfarm-app" -ForegroundColor Yellow
} else {
    Write-Host ""
    Write-Host "❌ Push failed. Error:" -ForegroundColor Red
    Write-Host $pushResult -ForegroundColor Red
    Write-Host ""
    Write-Host "Common issues:" -ForegroundColor Yellow
    Write-Host "1. Wrong token - make sure you copied the ENTIRE token" -ForegroundColor White
    Write-Host "2. Token expired - generate a new one" -ForegroundColor White
    Write-Host "3. Token doesn't have 'repo' scope - regenerate with repo permissions" -ForegroundColor White
    Write-Host "4. Network issue - check your internet connection" -ForegroundColor White
    Write-Host ""
    Write-Host "Try again:" -ForegroundColor Cyan
    Write-Host "git push origin main" -ForegroundColor White
}


