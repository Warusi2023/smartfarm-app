# PowerShell script to push changes to GitHub
Write-Host "Adding all changes to git..." -ForegroundColor Green
git add .

Write-Host "Committing changes..." -ForegroundColor Green
git commit -m "Enhanced registration form with comprehensive farmer data collection - Added detailed form sections for personal, location, farm, and additional information - Implemented comprehensive validation for all new fields - Enhanced user data collection for better business intelligence - Ready for production deployment"

Write-Host "Pushing to GitHub..." -ForegroundColor Green
git push origin main

Write-Host "Changes pushed successfully!" -ForegroundColor Green
