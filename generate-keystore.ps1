# SmartFarm Keystore Generation Script
# This script generates a keystore for Google Play Store app signing

Write-Host "Generating SmartFarm Upload Keystore..." -ForegroundColor Green

# Keystore configuration
$keystorePath = "smartfarm-upload-key.jks"
$alias = "smartfarm-upload-key"
$storePass = "smartfarm123"
$keyPass = "smartfarm123"
$validity = "10000"

# Try to find keytool in common locations
$keytoolPaths = @(
    "C:\Program Files\Java\jdk*\bin\keytool.exe",
    "C:\Program Files\Android\Android Studio\jbr\bin\keytool.exe",
    "C:\Users\$env:USERNAME\AppData\Local\Android\Sdk\build-tools\*\keytool.exe",
    "C:\Program Files\Android\Android Studio\jre\bin\keytool.exe"
)

$keytool = $null
foreach ($path in $keytoolPaths) {
    $found = Get-ChildItem -Path $path -ErrorAction SilentlyContinue | Select-Object -First 1
    if ($found) {
        $keytool = $found.FullName
        Write-Host "Found keytool at: $keytool" -ForegroundColor Yellow
        break
    }
}

if (-not $keytool) {
    Write-Host "Error: keytool not found. Please ensure Java JDK or Android SDK is installed." -ForegroundColor Red
    Write-Host "You can manually generate the keystore using one of these methods:" -ForegroundColor Yellow
    Write-Host "1. Install Java JDK and use: keytool -genkey -v -keystore $keystorePath -keyalg RSA -keysize 2048 -validity $validity -alias $alias" -ForegroundColor Cyan
    Write-Host "2. Use Android Studio: Build > Generate Signed Bundle/APK" -ForegroundColor Cyan
    Write-Host "3. Use the keystore generation tool in Android Studio" -ForegroundColor Cyan
    exit 1
}

# Generate the keystore
try {
    $dname = "CN=SmartFarm, OU=Development, O=SmartFarm Inc, L=City, S=State, C=US"
    
    $arguments = @(
        "-genkey",
        "-v",
        "-keystore", $keystorePath,
        "-keyalg", "RSA",
        "-keysize", "2048",
        "-validity", $validity,
        "-alias", $alias,
        "-storepass", $storePass,
        "-keypass", $keyPass,
        "-dname", $dname
    )
    
    Write-Host "Generating keystore with the following parameters:" -ForegroundColor Yellow
    Write-Host "Keystore: $keystorePath" -ForegroundColor Cyan
    Write-Host "Alias: $alias" -ForegroundColor Cyan
    Write-Host "Validity: $validity days" -ForegroundColor Cyan
    Write-Host "Key Algorithm: RSA 2048" -ForegroundColor Cyan
    
    & $keytool $arguments
    
    if (Test-Path $keystorePath) {
        Write-Host "`nKeystore generated successfully!" -ForegroundColor Green
        Write-Host "Keystore location: $(Resolve-Path $keystorePath)" -ForegroundColor Green
        Write-Host "`nIMPORTANT: Keep this keystore safe and secure!" -ForegroundColor Red
        Write-Host "Store password: $storePass" -ForegroundColor Yellow
        Write-Host "Key password: $keyPass" -ForegroundColor Yellow
        Write-Host "Alias: $alias" -ForegroundColor Yellow
    } else {
        Write-Host "Error: Keystore generation failed." -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "Error generating keystore: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

Write-Host "`nNext steps:" -ForegroundColor Green
Write-Host "1. Update your build.gradle.kts with the keystore configuration" -ForegroundColor Cyan
Write-Host "2. Set up Google Play App Signing in the Google Play Console" -ForegroundColor Cyan
Write-Host "3. Upload your app bundle to Google Play Store" -ForegroundColor Cyan 