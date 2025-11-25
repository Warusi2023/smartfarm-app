# Android Studio Cache Fix Script
# Fixes "PersistentEnumerator storage corrupted" error

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "🔧 Android Studio Cache Fix" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Android Studio is running
$studioProcess = Get-Process -Name "studio64" -ErrorAction SilentlyContinue
if ($studioProcess) {
    Write-Host "⚠️  WARNING: Android Studio is still running!" -ForegroundColor Red
    Write-Host "Please close Android Studio first, then run this script again." -ForegroundColor Yellow
    Write-Host ""
    $response = Read-Host "Do you want to close Android Studio now? (y/n)"
    if ($response -eq "y" -or $response -eq "Y") {
        Stop-Process -Name "studio64" -Force
        Write-Host "✅ Android Studio closed" -ForegroundColor Green
        Start-Sleep -Seconds 2
    } else {
        Write-Host "❌ Please close Android Studio manually and run this script again." -ForegroundColor Red
        exit 1
    }
}

Write-Host "Step 1: Checking cache folder..." -ForegroundColor Yellow

$cachePath = "$env:LOCALAPPDATA\Google\AndroidStudio2022.3\caches"

if (Test-Path $cachePath) {
    Write-Host "✅ Found cache folder: $cachePath" -ForegroundColor Green
    Write-Host ""
    
    # Show folder size
    $folderSize = (Get-ChildItem -Path $cachePath -Recurse -ErrorAction SilentlyContinue | 
                   Measure-Object -Property Length -Sum).Sum / 1MB
    Write-Host "Cache folder size: $([math]::Round($folderSize, 2)) MB" -ForegroundColor Cyan
    Write-Host ""
    
    Write-Host "Step 2: Deleting corrupted cache files..." -ForegroundColor Yellow
    
    try {
        Remove-Item -Path $cachePath -Recurse -Force -ErrorAction Stop
        Write-Host "✅ Cache folder deleted successfully!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Step 3: Cache cleanup complete!" -ForegroundColor Green
        Write-Host ""
        Write-Host "==========================================" -ForegroundColor Cyan
        Write-Host "✅ Fix Complete!" -ForegroundColor Green
        Write-Host "==========================================" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "Next steps:" -ForegroundColor Yellow
        Write-Host "1. Launch Android Studio" -ForegroundColor White
        Write-Host "2. Open your project: E:\Document\SmartFarm\android-project" -ForegroundColor White
        Write-Host "3. Wait for Gradle sync (may take a few minutes)" -ForegroundColor White
        Write-Host "4. Cache files will be rebuilt automatically" -ForegroundColor White
        Write-Host ""
    } catch {
        Write-Host "❌ Error deleting cache folder: $($_.Exception.Message)" -ForegroundColor Red
        Write-Host ""
        Write-Host "Try manually deleting:" -ForegroundColor Yellow
        Write-Host "  $cachePath" -ForegroundColor White
        Write-Host ""
        Write-Host "Or run File Explorer and navigate to:" -ForegroundColor Yellow
        Write-Host "  %LOCALAPPDATA%\Google\AndroidStudio2022.3\caches" -ForegroundColor White
        exit 1
    }
} else {
    Write-Host "⚠️  Cache folder not found at: $cachePath" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "This might mean:" -ForegroundColor Cyan
    Write-Host "- Cache was already deleted" -ForegroundColor White
    Write-Host "- Android Studio version is different" -ForegroundColor White
    Write-Host "- Cache is in a different location" -ForegroundColor White
    Write-Host ""
    Write-Host "Try manually checking:" -ForegroundColor Yellow
    Write-Host "  %LOCALAPPDATA%\Google\AndroidStudio2022.3\" -ForegroundColor White
}

Write-Host ""
Write-Host "Script completed. You can close this window." -ForegroundColor Green

