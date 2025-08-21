# Simple SHA-1 Fingerprint Extractor
Write-Host "SmartFarm SHA-1 Fingerprint Extractor"
Write-Host "====================================="
Write-Host ""

$keystorePath = "smartfarm-upload-key.jks"
$keyAlias = "smartfarm-upload-key"
$storePassword = "smartfarm123"

Write-Host "Keystore: $keystorePath"
Write-Host "Alias: $keyAlias"
Write-Host ""

if (-not (Test-Path $keystorePath)) {
    Write-Host "ERROR: Keystore not found"
    exit 1
}

Write-Host "Keystore found successfully"
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
    Write-Host "Keytool found: $keytoolPath"
    Write-Host "Extracting SHA-1 fingerprint..."
    
    $output = & $keytoolPath -list -v -keystore $keystorePath -alias $keyAlias -storepass $storePassword 2>$null
    
    if ($LASTEXITCODE -eq 0) {
        $sha1Line = $output | Select-String "SHA1:"
        if ($sha1Line) {
            $sha1 = $sha1Line.ToString().Split(":")[1].Trim()
            Write-Host ""
            Write-Host "SUCCESS: SHA-1 Fingerprint found:"
            Write-Host "Package: com.yourcompany.smartfarm"
            Write-Host "SHA-1: $sha1"
            Write-Host ""
            Write-Host "Copy this SHA-1 for Google Maps API restrictions"
        } else {
            Write-Host "ERROR: SHA-1 not found in output"
        }
    } else {
        Write-Host "ERROR: Failed to extract fingerprint"
    }
} else {
    Write-Host "ERROR: Keytool not found"
    Write-Host ""
    Write-Host "Manual steps:"
    Write-Host "1. Open Command Prompt as Administrator"
    Write-Host "2. Navigate to Java JDK bin directory"
    Write-Host "3. Run: keytool -list -v -keystore smartfarm-upload-key.jks -alias smartfarm-upload-key -storepass smartfarm123"
}

Write-Host ""
Write-Host "Next steps:"
Write-Host "1. Use SHA-1 in Google Cloud Console"
Write-Host "2. Restrict Maps API key to package + SHA-1"
Write-Host "3. Update local.properties with real API key"
