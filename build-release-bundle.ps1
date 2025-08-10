# Build Android Release Bundle
Write-Host "📱 Building Android Release Bundle..." -ForegroundColor Green

# Step 1: Check if signing key exists
$signingKeyPath = "smartfarm-upload-key.jks"
if (-not (Test-Path $signingKeyPath)) {
    Write-Host "⚠️  Signing key not found. Creating debug build instead..." -ForegroundColor Yellow
    
    # Build debug APK instead
    ./gradlew assembleDebug --no-daemon --parallel --max-workers=2
} else {
    Write-Host "✅ Signing key found. Building release bundle..." -ForegroundColor Green
    
    # Build release bundle
    ./gradlew bundleRelease --no-daemon --parallel --max-workers=2
}

# Step 2: Check build output
Write-Host "🔍 Checking build output..." -ForegroundColor Cyan

if (Test-Path "app/build/outputs/bundle/release") {
    Write-Host "✅ Release bundle created successfully!" -ForegroundColor Green
    Get-ChildItem "app/build/outputs/bundle/release" -Recurse | ForEach-Object {
        Write-Host "📦 $($_.Name)" -ForegroundColor White
    }
} elseif (Test-Path "app/build/outputs/apk/debug") {
    Write-Host "✅ Debug APK created successfully!" -ForegroundColor Green
    Get-ChildItem "app/build/outputs/apk/debug" -Recurse | ForEach-Object {
        Write-Host "📦 $($_.Name)" -ForegroundColor White
    }
} else {
    Write-Host "❌ Build output not found. Check for build errors." -ForegroundColor Red
}

Write-Host "🎉 Build process completed!" -ForegroundColor Green 