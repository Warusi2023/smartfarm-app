# SmartFarm Version Verification Script
# This script checks the current version configuration

Write-Host "📱 SmartFarm Version Verification" -ForegroundColor Green
Write-Host "=================================" -ForegroundColor Green
Write-Host ""

# Check build.gradle.kts
$buildGradlePath = "app\build.gradle.kts"

if (Test-Path $buildGradlePath) {
    $content = Get-Content $buildGradlePath -Raw
    
    # Check version code
    $versionCodeMatch = [regex]::Match($content, 'versionCode\s*=\s*(\d+)')
    if ($versionCodeMatch.Success) {
        $versionCode = $versionCodeMatch.Groups[1].Value
        Write-Host "✅ Version Code: $versionCode" -ForegroundColor Green
    } else {
        Write-Host "❌ Version Code: Not found" -ForegroundColor Red
    }
    
    # Check version name
    $versionNameMatch = [regex]::Match($content, 'versionName\s*=\s*"([^"]+)"')
    if ($versionNameMatch.Success) {
        $versionName = $versionNameMatch.Groups[1].Value
        Write-Host "✅ Version Name: $versionName" -ForegroundColor Green
    } else {
        Write-Host "❌ Version Name: Not found" -ForegroundColor Red
    }
    
    # Check package name
    $packageMatch = [regex]::Match($content, 'applicationId\s*=\s*"([^"]+)"')
    if ($packageMatch.Success) {
        $packageName = $packageMatch.Groups[1].Value
        Write-Host "✅ Package Name: $packageName" -ForegroundColor Green
    } else {
        Write-Host "❌ Package Name: Not found" -ForegroundColor Red
    }
    
    # Check namespace
    $namespaceMatch = [regex]::Match($content, 'namespace\s*=\s*"([^"]+)"')
    if ($namespaceMatch.Success) {
        $namespace = $namespaceMatch.Groups[1].Value
        Write-Host "✅ Namespace: $namespace" -ForegroundColor Green
    } else {
        Write-Host "❌ Namespace: Not found" -ForegroundColor Red
    }
    
} else {
    Write-Host "❌ build.gradle.kts not found" -ForegroundColor Red
}

Write-Host ""
Write-Host "🎯 Version Update Status:" -ForegroundColor Yellow
Write-Host "=========================" -ForegroundColor Yellow

if ($versionCode -eq "1" -and $versionName -eq "1.0.0" -and $packageName -eq "com.yourcompany.smartfarm") {
    Write-Host "✅ SUCCESS: Version updated correctly for Play Store debut!" -ForegroundColor Green
    Write-Host "   - Fresh start with version 1.0.0" -ForegroundColor Gray
    Write-Host "   - Package name updated to com.yourcompany.smartfarm" -ForegroundColor Gray
    Write-Host "   - Ready for initial Play Store release" -ForegroundColor Gray
} else {
    Write-Host "⚠️  Version configuration needs attention:" -ForegroundColor Yellow
    if ($versionCode -ne "1") {
        Write-Host "   - Version Code should be 1 (currently: $versionCode)" -ForegroundColor Red
    }
    if ($versionName -ne "1.0.0") {
        Write-Host "   - Version Name should be '1.0.0' (currently: $versionName)" -ForegroundColor Red
    }
    if ($packageName -ne "com.yourcompany.smartfarm") {
        Write-Host "   - Package Name should be 'com.yourcompany.smartfarm' (currently: $packageName)" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "📋 Next Steps:" -ForegroundColor Cyan
Write-Host "==============" -ForegroundColor Cyan
Write-Host "1. Fix any build issues (KAPT, package paths)" -ForegroundColor Blue
Write-Host "2. Test a successful build" -ForegroundColor Blue
Write-Host "3. Prepare Play Store release materials" -ForegroundColor Blue
Write-Host "4. Upload to Play Store" -ForegroundColor Blue

Write-Host ""
Write-Host "📚 See VERSION_MANAGEMENT_GUIDE.md for detailed information" -ForegroundColor Gray
