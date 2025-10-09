# SmartFarm Deployment Status Checker
# Quick script to check if Railway deployment is complete

Write-Host "🔍 SmartFarm Deployment Status Check" -ForegroundColor Cyan
Write-Host "=" * 50

$BACKEND_URL = "https://smartfarm-app-production.up.railway.app"
$FRONTEND_URL = "https://www.smartfarm-app.com"

Write-Host ""
Write-Host "📡 Checking Railway Backend..." -ForegroundColor Yellow

try {
    $response = Invoke-WebRequest -Uri "$BACKEND_URL/api/health" -Method GET -ErrorAction Stop -TimeoutSec 10
    
    if ($response.StatusCode -eq 200) {
        $data = $response.Content | ConvertFrom-Json
        Write-Host "✅ Backend Status: ONLINE" -ForegroundColor Green
        Write-Host "✅ Service: $($data.service)" -ForegroundColor Green
        Write-Host "✅ Version: $($data.version)" -ForegroundColor Green
        
        Write-Host ""
        Write-Host "🌐 Testing CORS..." -ForegroundColor Yellow
        
        $corsResponse = Invoke-WebRequest -Uri "$BACKEND_URL/api/health" -Method GET -Headers @{"Origin"=$FRONTEND_URL} -ErrorAction Stop
        $corsOrigin = $corsResponse.Headers['Access-Control-Allow-Origin']
        
        if ($corsOrigin -eq $FRONTEND_URL) {
            Write-Host "✅ CORS Status: WORKING" -ForegroundColor Green
            Write-Host "✅ Allowed Origin: $corsOrigin" -ForegroundColor Green
            
            Write-Host ""
            Write-Host "🎉 DEPLOYMENT COMPLETE!" -ForegroundColor Green
            Write-Host "Your SmartFarm dashboard should now be fully functional." -ForegroundColor White
            Write-Host ""
            Write-Host "🌐 Test your dashboard: $FRONTEND_URL" -ForegroundColor Cyan
            Write-Host "🧪 Run full verification: .\scripts\complete-todo-verification.ps1" -ForegroundColor Cyan
            
        } else {
            Write-Host "⚠️ CORS Status: CONFIGURED BUT ORIGIN MISMATCH" -ForegroundColor Yellow
            Write-Host "Expected: $FRONTEND_URL" -ForegroundColor White
            Write-Host "Got: $corsOrigin" -ForegroundColor White
        }
        
    } else {
        Write-Host "⚠️ Backend Status: RESPONDING BUT UNEXPECTED STATUS" -ForegroundColor Yellow
        Write-Host "Status Code: $($response.StatusCode)" -ForegroundColor White
    }
    
} catch {
    Write-Host "❌ Backend Status: OFFLINE OR NOT DEPLOYED" -ForegroundColor Red
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor White
    
    Write-Host ""
    Write-Host "🚨 ACTION REQUIRED:" -ForegroundColor Red
    Write-Host "1. Go to Railway Dashboard: https://railway.app/dashboard" -ForegroundColor White
    Write-Host "2. Add environment variables to your backend service:" -ForegroundColor White
    Write-Host "   - CORS_ORIGINS=https://www.smartfarm-app.com,https://smartfarm-app.netlify.app" -ForegroundColor White
    Write-Host "   - NODE_ENV=production" -ForegroundColor White
    Write-Host "   - API_NAME=SmartFarm" -ForegroundColor White
    Write-Host "   - API_VERSION=v1" -ForegroundColor White
    Write-Host "3. Wait for deployment to complete (2-3 minutes)" -ForegroundColor White
    Write-Host "4. Run this script again to verify" -ForegroundColor White
}

Write-Host ""
Write-Host "=" * 50
