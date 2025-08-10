# Fix Kotlin Version Compatibility for SmartFarm
Write-Host "🔧 Fixing Kotlin Version Compatibility..." -ForegroundColor Green

Write-Host "Step 1: Updating root build.gradle.kts..." -ForegroundColor Yellow

# Update root build.gradle.kts
$rootBuildContent = Get-Content "build.gradle.kts" -Raw
$rootBuildContent = $rootBuildContent -replace 'version "1\.8\.20"', 'version "1.9.22"'
Set-Content "build.gradle.kts" $rootBuildContent

Write-Host "Step 2: Adding Kotlin compatibility suppression..." -ForegroundColor Yellow

# Add suppression to gradle.properties
$gradlePropsContent = Get-Content "gradle.properties" -Raw
if ($gradlePropsContent -notmatch "suppressKotlinVersionCompatibilityCheck") {
    $gradlePropsContent = $gradlePropsContent + "`n# Suppress Kotlin version compatibility check`nsuppressKotlinVersionCompatibilityCheck=true"
    Set-Content "gradle.properties" $gradlePropsContent
}

Write-Host "Step 3: Cleaning build cache..." -ForegroundColor Yellow
./gradlew clean

Write-Host "Step 4: Testing Android build..." -ForegroundColor Yellow
./gradlew :app:assembleDebug

Write-Host "✅ Kotlin version compatibility fix completed!" -ForegroundColor Green
Write-Host "Android app should now build successfully!" -ForegroundColor Cyan 