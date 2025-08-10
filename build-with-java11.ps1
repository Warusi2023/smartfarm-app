# Build SmartFarm with Java 11 for KAPT compatibility
Write-Host "Building SmartFarm with Java 11..." -ForegroundColor Green

# Set Java 11 environment
$java11Path = "C:\Program Files\Android\Android Studio1\jbr"
if (Test-Path $java11Path) {
    $env:JAVA_HOME = $java11Path
    $env:PATH = "$java11Path\bin;$env:PATH"
    Write-Host "Using Java 11 from: $java11Path" -ForegroundColor Yellow
} else {
    Write-Host "Java 11 not found at: $java11Path" -ForegroundColor Red
    Write-Host "Please ensure Java 11 is installed or update the path in this script" -ForegroundColor Red
    exit 1
}

# Clean the project first
Write-Host "Cleaning project..." -ForegroundColor Yellow
.\gradlew.bat clean

if ($LASTEXITCODE -ne 0) {
    Write-Host "Clean failed!" -ForegroundColor Red
    exit 1
}

# Build the release bundle
Write-Host "Building release bundle..." -ForegroundColor Yellow
.\gradlew.bat bundleRelease

if ($LASTEXITCODE -eq 0) {
    Write-Host "Build successful! AAB file generated." -ForegroundColor Green
    Write-Host "AAB location: app\build\outputs\bundle\release\app-release.aab" -ForegroundColor Green
} else {
    Write-Host "Build failed!" -ForegroundColor Red
    exit 1
}
