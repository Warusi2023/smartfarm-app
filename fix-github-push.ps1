# Comprehensive GitHub Push Fix Script
# This script addresses the most common push failures

Write-Host "🔧 GitHub Push Fix Script" -ForegroundColor Cyan
Write-Host "========================" -ForegroundColor Cyan
Write-Host ""

# Check if we're in a git repo
if (-not (Test-Path .git)) {
    Write-Host "❌ Not a git repository!" -ForegroundColor Red
    exit 1
}

# Get current remote URL
$remoteUrl = git config --get remote.origin.url
Write-Host "📍 Current remote: $remoteUrl" -ForegroundColor Yellow
Write-Host ""

# Check if using HTTPS
if ($remoteUrl -like "https://*") {
    Write-Host "⚠️  Using HTTPS - This requires a Personal Access Token" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "GitHub no longer accepts passwords for HTTPS pushes." -ForegroundColor White
    Write-Host "You need to use a Personal Access Token instead." -ForegroundColor White
    Write-Host ""
    
    Write-Host "🔑 Option 1: Switch to SSH (Recommended - No token needed)" -ForegroundColor Cyan
    Write-Host "   This is more secure and doesn't require tokens" -ForegroundColor White
    Write-Host ""
    
    $switchToSSH = Read-Host "Switch to SSH? (y/n)"
    if ($switchToSSH -eq "y" -or $switchToSSH -eq "Y") {
        $sshUrl = $remoteUrl -replace "https://github.com/", "git@github.com:" -replace "\.git$", ".git"
        git remote set-url origin $sshUrl
        Write-Host "✅ Switched to SSH: $sshUrl" -ForegroundColor Green
        Write-Host ""
        Write-Host "⚠️  Make sure you have SSH keys set up:" -ForegroundColor Yellow
        Write-Host "   1. Check: ssh -T git@github.com" -ForegroundColor White
        Write-Host "   2. If not set up: https://docs.github.com/en/authentication/connecting-to-github-with-ssh" -ForegroundColor White
        Write-Host ""
        
        Write-Host "🚀 Attempting push with SSH..." -ForegroundColor Cyan
        git push origin main
        exit $LASTEXITCODE
    }
    
    Write-Host ""
    Write-Host "🔑 Option 2: Use Personal Access Token" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Steps to get a token:" -ForegroundColor White
    Write-Host "1. Go to: https://github.com/settings/tokens" -ForegroundColor White
    Write-Host "2. Click 'Generate new token' → 'Generate new token (classic)'" -ForegroundColor White
    Write-Host "3. Name: 'SmartFarm Push'" -ForegroundColor White
    Write-Host "4. Select scope: 'repo' (check all repo permissions)" -ForegroundColor White
    Write-Host "5. Click 'Generate token'" -ForegroundColor White
    Write-Host "6. COPY THE TOKEN (you won't see it again!)" -ForegroundColor Yellow
    Write-Host ""
    
    $hasToken = Read-Host "Do you have a Personal Access Token ready? (y/n)"
    if ($hasToken -eq "y" -or $hasToken -eq "Y") {
        Write-Host ""
        Write-Host "When prompted:" -ForegroundColor Yellow
        Write-Host "  Username: Your GitHub username" -ForegroundColor White
        Write-Host "  Password: Paste your Personal Access Token (NOT your GitHub password)" -ForegroundColor White
        Write-Host ""
        
        # Clear any cached credentials first
        Write-Host "🧹 Clearing cached credentials..." -ForegroundColor Cyan
        git credential-manager-core erase 2>$null
        Write-Host "host=github.com`nprotocol=https`n" | git credential-manager-core erase 2>$null
        
        Write-Host "🚀 Attempting push (will prompt for credentials)..." -ForegroundColor Cyan
        git push origin main
        exit $LASTEXITCODE
    } else {
        Write-Host ""
        Write-Host "Please get a token first, then run this script again." -ForegroundColor Yellow
        Write-Host "Token URL: https://github.com/settings/tokens" -ForegroundColor Cyan
        exit 1
    }
} else {
    # Using SSH
    Write-Host "✅ Using SSH" -ForegroundColor Green
    Write-Host ""
    
    # Test SSH connection
    Write-Host "🔍 Testing SSH connection..." -ForegroundColor Cyan
    $sshTest = ssh -T git@github.com 2>&1
    if ($LASTEXITCODE -eq 0 -or $sshTest -like "*successfully authenticated*") {
        Write-Host "✅ SSH connection working" -ForegroundColor Green
        Write-Host ""
        Write-Host "🚀 Attempting push..." -ForegroundColor Cyan
        git push origin main
        exit $LASTEXITCODE
    } else {
        Write-Host "❌ SSH connection failed" -ForegroundColor Red
        Write-Host "Error: $sshTest" -ForegroundColor Red
        Write-Host ""
        Write-Host "💡 Set up SSH keys:" -ForegroundColor Yellow
        Write-Host "   https://docs.github.com/en/authentication/connecting-to-github-with-ssh" -ForegroundColor White
        exit 1
    }
}


