# SmartFarm - Deploy Now Script
Write-Host "SmartFarm Deployment Ready!" -ForegroundColor Green
Write-Host "===============================" -ForegroundColor Green

# Check if deployment files exist
$deployDir = "netlify-deploy"
if (Test-Path $deployDir) {
    Write-Host "Deployment files found in: $deployDir" -ForegroundColor Green
    Write-Host ""
    Write-Host "Deployment files:" -ForegroundColor Yellow
    Get-ChildItem $deployDir | ForEach-Object {
        Write-Host "   - $($_.Name)" -ForegroundColor White
    }
    Write-Host ""
    Write-Host "Next Steps:" -ForegroundColor Cyan
    Write-Host "1. Go to https://app.netlify.com" -ForegroundColor White
    Write-Host "2. Sign up/Login to your account" -ForegroundColor White
    Write-Host "3. Drag and drop the '$deployDir' folder" -ForegroundColor White
    Write-Host "4. Wait 1-2 minutes for deployment" -ForegroundColor White
    Write-Host "5. Get your live URL!" -ForegroundColor White
    Write-Host ""
    Write-Host "Opening deployment folder..." -ForegroundColor Yellow
    
    # Open the deployment folder
    Start-Process explorer.exe -ArgumentList (Resolve-Path $deployDir).Path
    
    Write-Host "Deployment folder opened!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Your SmartFarm app is ready to deploy!" -ForegroundColor Green
    Write-Host "See NETLIFY_DEPLOYMENT_GUIDE.md for detailed instructions" -ForegroundColor Yellow
} else {
    Write-Host "Deployment files not found. Please run the build process first." -ForegroundColor Red
}

Write-Host ""
Write-Host "Press any key to continue..." -ForegroundColor Gray
Read-Host