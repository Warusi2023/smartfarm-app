# SmartFarm SHA-1 Fingerprint Extractor
Write-Host "🔐 SmartFarm SHA-1 Fingerprint Extractor" -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Green
Write-Host ""

# Configuration
$keystorePath = "smartfarm-upload-key.jks"
$keyAlias = "smartfarm-upload-key"
$storePassword = "smartfarm123"

Write-Host "Configuration:" -ForegroundColor Yellow
Write-Host "   Keystore: $keystorePath" -ForegroundColor Gray
Write-Host "   Alias: $keyAlias" -ForegroundColor Gray
Write-Host ""

# Check if keystore exists
if (-not (Test-Path $keystorePath)) {
    Write-Host "❌ Keystore not found: $keystorePath" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Keystore found: $keystorePath" -ForegroundColor Green
Write-Host ""

# Try to find keytool
$keytoolPath = $null
$possiblePaths = @(
    "C:\Program Files\Java\jdk-17\bin\keytool.exe",
    "C:\Program Files\Eclipse Adoptium\jdk-17.0.12-hotspot\bin\keytool.exe",
    "C:\Program Files\Android\Android Studio1\jbr\bin\keytool.exe"
)

foreach ($path in $possiblePaths) {
    if (Test-Path $path) {
        $keytoolPath = $path
        break
    }
}

if ($keytoolPath) {
    Write-Host "✅ Keytool found: $keytoolPath" -ForegroundColor Green
    Write-Host ""
    Write-Host "🔍 Extracting SHA-1 fingerprint..." -ForegroundColor Blue
    
    # Extract fingerprint
    $output = & $keytoolPath -list -v -keystore $keystorePath -alias $keyAlias -storepass $storePassword 2>$null
    
    if ($LASTEXITCODE -eq 0) {
        $sha1Line = $output | Select-String "SHA1:"
        if ($sha1Line) {
            $sha1 = $sha1Line.ToString().Split(":")[1].Trim()
            Write-Host "✅ SHA-1 Fingerprint:" -ForegroundColor Green
            Write-Host "   $sha1" -ForegroundColor White
            Write-Host ""
            Write-Host "📋 Copy this for Google Maps API restrictions:" -ForegroundColor Yellow
            Write-Host "   Package: com.yourcompany.smartfarm" -ForegroundColor Gray
            Write-Host "   SHA-1: $sha1" -ForegroundColor Gray
        } else {
            Write-Host "❌ SHA-1 not found in output" -ForegroundColor Red
        }
    } else {
        Write-Host "❌ Failed to extract fingerprint" -ForegroundColor Red
    }
} else {
    Write-Host "❌ Keytool not found" -ForegroundColor Red
    Write-Host ""
    Write-Host "🔧 Manual Steps:" -ForegroundColor Yellow
    Write-Host "1. Open Command Prompt as Administrator" -ForegroundColor Blue
    Write-Host "2. Navigate to Java JDK bin directory" -ForegroundColor Gray
    Write-Host "3. Run: keytool -list -v -keystore smartfarm-upload-key.jks -alias smartfarm-upload-key -storepass smartfarm123" -ForegroundColor White
}

Write-Host ""
Write-Host "📚 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Use SHA-1 in Google Cloud Console" -ForegroundColor Blue
Write-Host "2. Restrict Maps API key to package + SHA-1" -ForegroundColor Blue
Write-Host "3. Update local.properties with real API key" -ForegroundColor Blue
