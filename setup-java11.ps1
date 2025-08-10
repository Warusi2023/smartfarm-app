# Setup Java 11 for SmartFarm Build
# This script helps set up Java 11 to resolve KAPT compatibility issues

Write-Host "Setting up Java 11 for SmartFarm build..." -ForegroundColor Green

# Check if Java 11 is already installed
$java11Paths = @(
    "C:\Program Files\Java\jdk-11",
    "C:\Program Files\Java\jdk-11.0.21",
    "C:\Program Files\Eclipse Adoptium\jdk-11.0.21.9-hotspot",
    "C:\Program Files\OpenJDK\jdk-11.0.21"
)

$java11Found = $false
$java11Path = ""

foreach ($path in $java11Paths) {
    if (Test-Path $path) {
        $java11Path = $path
        $java11Found = $true
        Write-Host "Found Java 11 at: $path" -ForegroundColor Yellow
        break
    }
}

if (-not $java11Found) {
    Write-Host "Java 11 not found in common locations." -ForegroundColor Red
    Write-Host "Please install Java 11 from one of these sources:" -ForegroundColor Yellow
    Write-Host "1. Oracle JDK 11: https://www.oracle.com/java/technologies/javase/jdk11-archive-downloads.html" -ForegroundColor Cyan
    Write-Host "2. OpenJDK 11: https://adoptium.net/temurin/releases/?version=11" -ForegroundColor Cyan
    Write-Host "3. Eclipse Temurin 11: https://adoptium.net/temurin/releases/?version=11" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "After installation, update the paths in this script or set JAVA_HOME manually." -ForegroundColor Yellow
    exit 1
}

# Set environment variables
$env:JAVA_HOME = $java11Path
$env:PATH = "$java11Path\bin;$env:PATH"

Write-Host "Set JAVA_HOME to: $java11Path" -ForegroundColor Green
Write-Host "Updated PATH to include Java 11" -ForegroundColor Green

# Verify Java version
Write-Host "Verifying Java version..." -ForegroundColor Yellow
try {
    $javaVersion = java -version 2>&1 | Select-String "version"
    Write-Host "Current Java version: $javaVersion" -ForegroundColor Green
    
    if ($javaVersion -match "11") {
        Write-Host "✅ Java 11 is active!" -ForegroundColor Green
    } else {
        Write-Host "⚠️ Warning: Java 11 may not be active. Current version: $javaVersion" -ForegroundColor Yellow
    }
} catch {
    Write-Host "❌ Error checking Java version: $_" -ForegroundColor Red
}

# Update gradle.properties
$gradlePropertiesPath = "gradle.properties"
if (Test-Path $gradlePropertiesPath) {
    $content = Get-Content $gradlePropertiesPath -Raw
    
    if ($content -notmatch "org\.gradle\.java\.home") {
        $newContent = $content + "`n# Java 11 for KAPT compatibility`norg.gradle.java.home=$java11Path"
        Set-Content $gradlePropertiesPath $newContent
        Write-Host "✅ Updated gradle.properties with Java 11 path" -ForegroundColor Green
    } else {
        Write-Host "ℹ️ gradle.properties already contains Java home setting" -ForegroundColor Yellow
    }
} else {
    Write-Host "⚠️ gradle.properties not found" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🎯 Java 11 setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Clean the project: .\gradlew.bat clean" -ForegroundColor White
Write-Host "2. Build the release: .\gradlew.bat bundleRelease" -ForegroundColor White
Write-Host ""
Write-Host "Or use Android Studio for the most reliable build experience." -ForegroundColor Yellow
