# PowerShell script to commit and push changes to GitHub

Write-Host "🚀 Pushing SmartFarm changes to GitHub..." -ForegroundColor Green
Write-Host ""

# Check git status
Write-Host "📋 Checking git status..." -ForegroundColor Yellow
git status --short

Write-Host ""
Write-Host "📦 Adding all changes..." -ForegroundColor Yellow
git add .

Write-Host ""
Write-Host "💾 Committing changes..." -ForegroundColor Yellow
git commit -m "feat: Update registration flow to redirect to comprehensive form

- Updated app.html to redirect Register button to register.html
- Updated app.html to redirect Login button to login.html  
- Removed simple prompt-based registration
- Users now access full registration form with all fields
- Maintains connection to backend API at /api/auth/register"

Write-Host ""
Write-Host "📤 Pushing to GitHub..." -ForegroundColor Yellow
git push origin main

Write-Host ""
Write-Host "✅ Successfully pushed to GitHub!" -ForegroundColor Green
Write-Host "🔗 View your repository at: https://github.com/[your-username]/SmartFarm" -ForegroundColor Cyan
