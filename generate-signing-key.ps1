# Generate Signing Key for Google Play
Write-Host "🔑 Generating signing key for Google Play..." -ForegroundColor Green

# Check if keytool is available
try {
    $keytoolVersion = keytool -version 2>&1
    Write-Host "✅ Keytool found: $keytoolVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Keytool not found. Please install Java JDK." -ForegroundColor Red
    exit 1
}

# Generate the signing key
Write-Host "🔧 Creating signing key..." -ForegroundColor Yellow
keytool -genkey -v -keystore smartfarm-upload-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias smartfarm-upload-key -storepass smartfarm123 -keypass smartfarm123 -dname "CN=SmartFarm, OU=Development, O=SmartFarm, L=City, S=State, C=US"

if (Test-Path "smartfarm-upload-key.jks") {
    Write-Host "✅ Signing key generated successfully!" -ForegroundColor Green
    Write-Host "📁 Key file: smartfarm-upload-key.jks" -ForegroundColor White
    Write-Host "🔐 Store password: smartfarm123" -ForegroundColor White
    Write-Host "🔑 Key alias: smartfarm-upload-key" -ForegroundColor White
    Write-Host "🔑 Key password: smartfarm123" -ForegroundColor White
} else {
    Write-Host "❌ Failed to generate signing key." -ForegroundColor Red
} 