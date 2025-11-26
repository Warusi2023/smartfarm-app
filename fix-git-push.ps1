# Git Push Fix Script
# Provides solutions for common git push issues

Write-Host "🔧 Git Push Fix Tool" -ForegroundColor Cyan
Write-Host "====================" -ForegroundColor Cyan
Write-Host ""

# Check current remote URL
$currentRemote = git remote get-url origin
Write-Host "Current remote: $currentRemote" -ForegroundColor Yellow
Write-Host ""

# Check if using HTTPS
if ($currentRemote -like "https://*") {
    Write-Host "⚠️  Using HTTPS - may require authentication token" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Option 1: Use Personal Access Token (Recommended)" -ForegroundColor Cyan
    Write-Host "  1. Go to: https://github.com/settings/tokens" -ForegroundColor White
    Write-Host "  2. Generate new token (classic)" -ForegroundColor White
    Write-Host "  3. Select scopes: repo (all)" -ForegroundColor White
    Write-Host "  4. Copy token and use it as password when pushing" -ForegroundColor White
    Write-Host ""
    Write-Host "Option 2: Switch to SSH (More secure)" -ForegroundColor Cyan
    Write-Host "  Run: git remote set-url origin git@github.com:Warusi2023/smartfarm-app.git" -ForegroundColor White
    Write-Host ""
    
    $choice = Read-Host "Switch to SSH? (y/n)"
    if ($choice -eq "y" -or $choice -eq "Y") {
        git remote set-url origin git@github.com:Warusi2023/smartfarm-app.git
        Write-Host "✅ Switched to SSH" -ForegroundColor Green
        Write-Host "Make sure you have SSH key configured: https://docs.github.com/en/authentication/connecting-to-github-with-ssh" -ForegroundColor Yellow
    }
} else {
    Write-Host "✅ Using SSH" -ForegroundColor Green
}

Write-Host ""
Write-Host "🚀 Attempting push..." -ForegroundColor Cyan
git push origin main

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "❌ Push still failing. Try manual steps:" -ForegroundColor Red
    Write-Host ""
    Write-Host "1. Check authentication:" -ForegroundColor Yellow
    Write-Host "   git config --global credential.helper manager-core" -ForegroundColor White
    Write-Host ""
    Write-Host "2. Clear cached credentials:" -ForegroundColor Yellow
    Write-Host "   git credential-manager-core erase" -ForegroundColor White
    Write-Host "   host=github.com" -ForegroundColor White
    Write-Host "   protocol=https" -ForegroundColor White
    Write-Host ""
    Write-Host "3. Try pushing again - it will prompt for credentials" -ForegroundColor Yellow
}

