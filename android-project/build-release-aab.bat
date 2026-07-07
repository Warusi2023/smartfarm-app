@echo off
REM SmartFarm - Build Signed Release AAB Script (Windows)
REM This script generates a signed Android App Bundle (AAB) for Google Play Store upload

setlocal enabledelayedexpansion

echo ==========================================
echo 🚀 SmartFarm - Building Signed Release AAB
echo ==========================================
echo.

REM Check if we're in the right directory
if not exist "app\build.gradle.kts" (
    echo ❌ Error: This script must be run from the android-project directory
    echo    Current directory: %CD%
    exit /b 1
)

REM Check if local.properties exists
if not exist "app\local.properties" (
    echo ⚠️  Warning: app\local.properties not found
    echo    Creating template...
    (
        echo # Signing Configuration (REQUIRED for Play Store upload^)
        echo KEYSTORE_PATH=smartfarm-upload-key.jks
        echo KEYSTORE_PASSWORD=your_keystore_password
        echo KEY_ALIAS=smartfarm-upload-key
        echo KEY_PASSWORD=your_key_password
    ) > app\local.properties
    echo ❌ Please configure keystore passwords in app\local.properties
    exit /b 1
)

REM Check if keystore file exists
set KEYSTORE_PATH=smartfarm-upload-key.jks
for /f "tokens=2 delims==" %%a in ('findstr "^KEYSTORE_PATH=" app\local.properties') do set KEYSTORE_PATH=%%a

if not exist "%KEYSTORE_PATH%" (
    if not exist "app\%KEYSTORE_PATH%" (
        echo ⚠️  Warning: Keystore file not found: %KEYSTORE_PATH%
        echo.
        echo To create a keystore, run:
        echo   keytool -genkey -v -keystore %KEYSTORE_PATH% -keyalg RSA -keysize 2048 -validity 10000 -alias smartfarm-upload-key
        echo.
        set /p CREATE_KEYSTORE="Do you want to create a new keystore now? (y/n) "
        if /i "!CREATE_KEYSTORE!"=="y" (
            keytool -genkey -v -keystore "%KEYSTORE_PATH%" -keyalg RSA -keysize 2048 -validity 10000 -alias smartfarm-upload-key
            echo.
            echo ✅ Keystore created: %KEYSTORE_PATH%
            echo.
            echo ⚠️  IMPORTANT: Update app\local.properties with your keystore passwords!
            echo    KEYSTORE_PASSWORD=^<your_password^>
            echo    KEY_PASSWORD=^<your_password^>
            exit /b 0
        ) else (
            echo ❌ Cannot proceed without keystore
            exit /b 1
        )
    )
)

REM Check if passwords are configured
set KEYSTORE_PASSWORD=
set KEY_PASSWORD=
for /f "tokens=2 delims==" %%a in ('findstr "^KEYSTORE_PASSWORD=" app\local.properties') do set KEYSTORE_PASSWORD=%%a
for /f "tokens=2 delims==" %%a in ('findstr "^KEY_PASSWORD=" app\local.properties') do set KEY_PASSWORD=%%a

if "!KEYSTORE_PASSWORD!"=="" (
    echo ❌ Error: KEYSTORE_PASSWORD not configured in app\local.properties
    exit /b 1
)
if "!KEYSTORE_PASSWORD!"=="your_keystore_password" (
    echo ❌ Error: KEYSTORE_PASSWORD not configured in app\local.properties
    exit /b 1
)
if "!KEY_PASSWORD!"=="" (
    echo ❌ Error: KEY_PASSWORD not configured in app\local.properties
    exit /b 1
)
if "!KEY_PASSWORD!"=="your_key_password" (
    echo ❌ Error: KEY_PASSWORD not configured in app\local.properties
    exit /b 1
)

echo ✅ Keystore configuration found
echo.

REM Stop any running Gradle daemons to free memory
echo 🛑 Stopping Gradle daemons...
call gradlew.bat --stop 2>nul

REM Clean previous builds
echo 🧹 Cleaning previous builds...
call gradlew.bat clean --no-daemon
if errorlevel 1 (
    echo ❌ Clean failed
    exit /b 1
)

REM Build release AAB
echo.
echo 📦 Building release AAB...
echo.

call gradlew.bat :app:bundleRelease --no-daemon
if errorlevel 1 (
    echo.
    echo ==========================================
    echo ❌ Build Failed
    echo ==========================================
    echo.
    echo Check the error messages above for details.
    exit /b 1
)

echo.
echo ==========================================
echo ✅ Build Successful!
echo ==========================================
echo.

set AAB_PATH=app\build\outputs\bundle\release\app-release.aab

if exist "%AAB_PATH%" (
    echo 📱 AAB Location:
    echo    %AAB_PATH%
    echo.
    echo 📤 Next Steps:
    echo    1. Go to Google Play Console
    echo    2. Navigate to: Production → New Release
    echo    3. Upload: %AAB_PATH%
    echo    4. Add release notes
    echo    5. Submit for review
    echo.
) else (
    echo ❌ Error: AAB file not found at expected location
    exit /b 1
)

endlocal

