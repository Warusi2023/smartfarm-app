# Quick Netlify Deployment for SmartFarm
Write-Host "Quick Netlify Deployment for SmartFarm" -ForegroundColor Green

# Create deployment directory
$deployDir = "netlify-deploy"
if (Test-Path $deployDir) {
    Remove-Item $deployDir -Recurse -Force
}
New-Item -ItemType Directory -Path $deployDir | Out-Null

# Copy static deployment files
Copy-Item "smartfarm-deployed/*" $deployDir -Recurse -Force

# Create netlify.toml
$netlifyConfig = "[build]`npublish = `.``n`n[[redirects]]`nfrom = `"/*`"`nto = `"/index.html`"`nstatus = 200"
Set-Content -Path "$deployDir/netlify.toml" -Value $netlifyConfig

# Create _redirects for SPA
Set-Content -Path "$deployDir/_redirects" -Value "/*    /index.html   200"

Write-Host "Deployment files prepared in: $deployDir" -ForegroundColor Green
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "1. Go to https://app.netlify.com" -ForegroundColor White
Write-Host "2. Drag and drop the '$deployDir' folder" -ForegroundColor White
Write-Host "3. Your app will be deployed automatically!" -ForegroundColor White
Write-Host ""
Write-Host "SmartFarm ready for Netlify! 🚀" -ForegroundColor Green 