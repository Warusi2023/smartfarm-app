# Git Push Diagnostic Script
# This script helps diagnose why git push might be failing

Write-Host "🔍 Git Push Diagnostic Tool" -ForegroundColor Cyan
Write-Host "============================" -ForegroundColor Cyan
Write-Host ""

# Check if we're in a git repository
if (-not (Test-Path .git)) {
    Write-Host "❌ Not a git repository!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Git repository found" -ForegroundColor Green
Write-Host ""

# Check current branch
$branch = git branch --show-current
Write-Host "📍 Current branch: $branch" -ForegroundColor Yellow
Write-Host ""

# Check for uncommitted changes
Write-Host "📋 Checking for uncommitted changes..." -ForegroundColor Cyan
$status = git status --short
if ($status) {
    Write-Host "⚠️  Uncommitted changes found:" -ForegroundColor Yellow
    git status --short
    Write-Host ""
} else {
    Write-Host "✅ No uncommitted changes" -ForegroundColor Green
    Write-Host ""
}

# Check remote configuration
Write-Host "🌐 Checking remote configuration..." -ForegroundColor Cyan
$remote = git remote get-url origin 2>$null
if ($remote) {
    Write-Host "✅ Remote URL: $remote" -ForegroundColor Green
} else {
    Write-Host "❌ No remote configured!" -ForegroundColor Red
    exit 1
}
Write-Host ""

# Check if we're ahead of remote
Write-Host "📊 Checking commit status..." -ForegroundColor Cyan
git fetch origin 2>&1 | Out-Null
$commitsAhead = git rev-list --count origin/$branch..HEAD 2>$null
if ($commitsAhead -gt 0) {
    Write-Host "⚠️  You have $commitsAhead commit(s) ahead of remote" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Recent commits to push:" -ForegroundColor Cyan
    git log origin/$branch..HEAD --oneline
    Write-Host ""
} else {
    Write-Host "✅ Everything is up to date" -ForegroundColor Green
    Write-Host ""
}

# Check authentication
Write-Host "🔐 Testing authentication..." -ForegroundColor Cyan
$testConnection = git ls-remote origin 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Can connect to remote repository" -ForegroundColor Green
} else {
    Write-Host "❌ Cannot connect to remote repository!" -ForegroundColor Red
    Write-Host "Error: $testConnection" -ForegroundColor Red
    Write-Host ""
    Write-Host "💡 Solutions:" -ForegroundColor Yellow
    Write-Host "   1. Check your internet connection" -ForegroundColor White
    Write-Host "   2. Verify GitHub credentials:" -ForegroundColor White
    Write-Host "      - For HTTPS: Use Personal Access Token (not password)" -ForegroundColor White
    Write-Host "      - Get token: https://github.com/settings/tokens" -ForegroundColor White
    Write-Host "   3. Or switch to SSH:" -ForegroundColor White
    Write-Host "      git remote set-url origin git@github.com:Warusi2023/smartfarm-app.git" -ForegroundColor White
    exit 1
}
Write-Host ""

# Attempt push with verbose output
Write-Host "🚀 Attempting to push..." -ForegroundColor Cyan
Write-Host ""
git push -v origin $branch 2>&1

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Push successful!" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "❌ Push failed!" -ForegroundColor Red
    Write-Host ""
    Write-Host "💡 Common solutions:" -ForegroundColor Yellow
    Write-Host "   1. Authentication failed:" -ForegroundColor White
    Write-Host "      - Use Personal Access Token instead of password" -ForegroundColor White
    Write-Host "      - Or configure SSH key" -ForegroundColor White
    Write-Host "   2. Branch protection:" -ForegroundColor White
    Write-Host "      - Check if branch has protection rules" -ForegroundColor White
    Write-Host "   3. Network issues:" -ForegroundColor White
    Write-Host "      - Check firewall/proxy settings" -ForegroundColor White
    Write-Host "   4. Large files:" -ForegroundColor White
    Write-Host "      - Check for files > 100MB" -ForegroundColor White
    Write-Host ""
}

