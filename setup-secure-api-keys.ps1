# SmartFarm Secure API Key Setup Script
# This script helps you set up API keys securely

Write-Host "🔐 SmartFarm API Key Security Setup" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green
Write-Host ""

# Check if .env file exists
$envFile = ".env"
if (Test-Path $envFile) {
    Write-Host "⚠️  .env file already exists. Creating backup..." -ForegroundColor Yellow
    Copy-Item $envFile "$envFile.backup.$(Get-Date -Format 'yyyyMMdd-HHmmss')"
}

# Create .env file from template
Write-Host "📝 Creating .env file from template..." -ForegroundColor Cyan
Copy-Item "environment-template.env" $envFile

Write-Host ""
Write-Host "🚨 SECURITY ALERT: Your Google API Key has been compromised!" -ForegroundColor Red
Write-Host "Current key: AIzaSyCS_Q467Ub6ijh2MIGa-NC6PMCrbGfQqxM" -ForegroundColor Red
Write-Host ""
Write-Host "IMMEDIATE ACTION REQUIRED:" -ForegroundColor Yellow
Write-Host "1. Go to Google Cloud Console: https://console.cloud.google.com/" -ForegroundColor White
Write-Host "2. Navigate to APIs & Services > Credentials" -ForegroundColor White
Write-Host "3. DELETE the compromised API key" -ForegroundColor White
Write-Host "4. Create a NEW API key with restrictions" -ForegroundColor White
Write-Host "5. Update the .env file with your new key" -ForegroundColor White
Write-Host ""

# Get new API key from user
Write-Host "📝 Enter your NEW Google API Key (or press Enter to skip):" -ForegroundColor Cyan
$newApiKey = Read-Host

if ($newApiKey -and $newApiKey -ne "") {
    # Update .env file with new API key
    $envContent = Get-Content $envFile
    $envContent = $envContent -replace "GOOGLE_API_KEY=your_google_api_key_here", "GOOGLE_API_KEY=$newApiKey"
    $envContent | Set-Content $envFile
    
    Write-Host "✅ Google API Key updated in .env file" -ForegroundColor Green
} else {
    Write-Host "⚠️  Skipping API key update. Please update manually in .env file" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🔧 Setting up environment variables..." -ForegroundColor Cyan

# Set environment variables for current session
$envContent = Get-Content $envFile
foreach ($line in $envContent) {
    if ($line -match "^([^#][^=]+)=(.*)$") {
        $key = $matches[1].Trim()
        $value = $matches[2].Trim()
        
        if ($key -and $value -and $value -ne "your_google_api_key_here") {
            [Environment]::SetEnvironmentVariable($key, $value, "Process")
            Write-Host "  ✅ Set $key" -ForegroundColor Green
        }
    }
}

Write-Host ""
Write-Host "📋 Next Steps:" -ForegroundColor Yellow
Write-Host "1. Review the GOOGLE_API_KEY_SECURITY_GUIDE.md file" -ForegroundColor White
Write-Host "2. Set up API key restrictions in Google Cloud Console" -ForegroundColor White
Write-Host "3. Test your application with the new API key" -ForegroundColor White
Write-Host "4. Update Railway environment variables for production" -ForegroundColor White
Write-Host ""

Write-Host "🚀 Environment setup complete!" -ForegroundColor Green
Write-Host "You can now run: npm start" -ForegroundColor Cyan
