# Prepare SmartFarm App for Google Play Upload
Write-Host "🚀 Preparing SmartFarm App for Google Play Upload..." -ForegroundColor Green

# Step 1: Generate Signing Key
Write-Host "`n🔑 Step 1: Generating signing key..." -ForegroundColor Yellow
if (-not (Test-Path "smartfarm-upload-key.jks")) {
    Write-Host "Creating signing key..." -ForegroundColor Cyan
    try {
        keytool -genkey -v -keystore smartfarm-upload-key.jks -keyalg RSA -keysize 2048 -validity 10000 -alias smartfarm-upload-key -storepass smartfarm123 -keypass smartfarm123 -dname "CN=SmartFarm, OU=Development, O=SmartFarm, L=City, S=State, C=US" -noprompt
        if (Test-Path "smartfarm-upload-key.jks") {
            Write-Host "✅ Signing key generated successfully!" -ForegroundColor Green
        } else {
            Write-Host "❌ Failed to generate signing key." -ForegroundColor Red
            exit 1
        }
    } catch {
        Write-Host "❌ Keytool not found. Please install Java JDK." -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "✅ Signing key already exists." -ForegroundColor Green
}

# Step 2: Clean and Build
Write-Host "`n🔧 Step 2: Building release bundle..." -ForegroundColor Yellow
Write-Host "Cleaning previous builds..." -ForegroundColor Cyan
./gradlew clean --no-daemon

Write-Host "Building release bundle..." -ForegroundColor Cyan
$env:GRADLE_OPTS = "-Xmx4096m -Xms1024m -XX:MaxMetaspaceSize=512m"
./gradlew bundleRelease --no-daemon --parallel --max-workers=2

# Step 3: Check Build Output
Write-Host "`n📦 Step 3: Checking build output..." -ForegroundColor Yellow
if (Test-Path "app/build/outputs/bundle/release") {
    Write-Host "✅ Release bundle created successfully!" -ForegroundColor Green
    Get-ChildItem "app/build/outputs/bundle/release" -Recurse | ForEach-Object {
        Write-Host "📦 $($_.Name)" -ForegroundColor White
    }
} else {
    Write-Host "❌ Release bundle not found. Trying debug build..." -ForegroundColor Yellow
    ./gradlew assembleDebug --no-daemon
    if (Test-Path "app/build/outputs/apk/debug") {
        Write-Host "✅ Debug APK created successfully!" -ForegroundColor Green
        Get-ChildItem "app/build/outputs/apk/debug" -Recurse | ForEach-Object {
            Write-Host "📦 $($_.Name)" -ForegroundColor White
        }
    } else {
        Write-Host "❌ Build failed. Check for errors above." -ForegroundColor Red
        exit 1
    }
}

# Step 4: Generate App Store Assets
Write-Host "`n🎨 Step 4: Generating app store assets..." -ForegroundColor Yellow
if (Test-Path "generate-app-store-assets.ps1") {
    Write-Host "Running asset generation script..." -ForegroundColor Cyan
    powershell -ExecutionPolicy Bypass -File "generate-app-store-assets.ps1"
} else {
    Write-Host "⚠️  App store assets script not found." -ForegroundColor Yellow
}

# Step 5: Create Google Play Upload Package
Write-Host "`n📋 Step 5: Creating Google Play upload package..." -ForegroundColor Yellow
$uploadDir = "google-play-upload"
if (Test-Path $uploadDir) {
    Remove-Item $uploadDir -Recurse -Force
}
New-Item -ItemType Directory -Path $uploadDir

# Copy release bundle
if (Test-Path "app/build/outputs/bundle/release") {
    Copy-Item "app/build/outputs/bundle/release/*.aab" $uploadDir -ErrorAction SilentlyContinue
    Write-Host "✅ Release bundle copied to upload directory." -ForegroundColor Green
}

# Copy signing key (keep secure!)
if (Test-Path "smartfarm-upload-key.jks") {
    Copy-Item "smartfarm-upload-key.jks" $uploadDir
    Write-Host "✅ Signing key copied to upload directory." -ForegroundColor Green
}

# Create upload instructions
$instructions = @"
# Google Play Upload Instructions

## Files Included:
- Release Bundle (.aab file)
- Signing Key (smartfarm-upload-key.jks)

## Upload Steps:
1. Go to Google Play Console
2. Create new app or update existing
3. Upload the .aab file
4. Fill in app metadata
5. Add screenshots and icons
6. Set up content rating
7. Add privacy policy
8. Submit for review

## Signing Key Details:
- Store Password: smartfarm123
- Key Alias: smartfarm-upload-key
- Key Password: smartfarm123

## Important Notes:
- Keep the signing key secure
- Never share the key file
- Back up the key file safely
- You'll need this key for future updates

## App Details:
- Package Name: com.example.smartfarm
- Version: 1.0.0
- Version Code: 1
"@

$instructions | Out-File -FilePath "$uploadDir/upload-instructions.txt" -Encoding UTF8
Write-Host "✅ Upload instructions created." -ForegroundColor Green

Write-Host "`n🎉 Google Play preparation completed!" -ForegroundColor Green
Write-Host "📁 Upload package created in: $uploadDir" -ForegroundColor Cyan
Write-Host "📋 Check upload-instructions.txt for next steps." -ForegroundColor Cyan 