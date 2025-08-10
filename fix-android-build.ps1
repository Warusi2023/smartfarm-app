# Fix Android Build Issues for SmartFarm
Write-Host "🔧 Fixing Android Build Issues..." -ForegroundColor Green

Write-Host "Step 1: Cleaning build cache..." -ForegroundColor Yellow
./gradlew clean

Write-Host "Step 2: Updating Android SDK compatibility..." -ForegroundColor Yellow

# Update app/build.gradle.kts to use compatible SDK versions
$appBuildContent = Get-Content "app/build.gradle.kts" -Raw
$appBuildContent = $appBuildContent -replace "compileSdk = 36", "compileSdk = 34"
$appBuildContent = $appBuildContent -replace "targetSdk = 36", "targetSdk = 34"
Set-Content "app/build.gradle.kts" $appBuildContent

Write-Host "Step 3: Adding SDK suppression to gradle.properties..." -ForegroundColor Yellow
$gradlePropsContent = Get-Content "gradle.properties" -Raw
if ($gradlePropsContent -notmatch "android\.suppressUnsupportedCompileSdk") {
    $gradlePropsContent = $gradlePropsContent -replace "android\.nonTransitiveRClass=true", "android.nonTransitiveRClass=true`n`n# Suppress compileSdk compatibility warning`nandroid.suppressUnsupportedCompileSdk=36"
    Set-Content "gradle.properties" $gradlePropsContent
}

Write-Host "Step 4: Testing build..." -ForegroundColor Yellow
./gradlew :app:assembleDebug --stacktrace

Write-Host "✅ Android build fix completed!" -ForegroundColor Green
Write-Host "If build succeeds, you can proceed with deployment." -ForegroundColor Cyan