#!/bin/bash

# SmartFarm - Build Signed Release AAB Script
# This script generates a signed Android App Bundle (AAB) for Google Play Store upload

set -e  # Exit on error

echo "=========================================="
echo "🚀 SmartFarm - Building Signed Release AAB"
echo "=========================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "app/build.gradle.kts" ]; then
    echo -e "${RED}❌ Error: This script must be run from the android-project directory${NC}"
    echo "   Current directory: $(pwd)"
    exit 1
fi

# Check if local.properties exists
if [ ! -f "app/local.properties" ]; then
    echo -e "${YELLOW}⚠️  Warning: app/local.properties not found${NC}"
    echo "   Creating template..."
    cat > app/local.properties << EOF
# Signing Configuration (REQUIRED for Play Store upload)
KEYSTORE_PATH=smartfarm-upload-key.jks
KEYSTORE_PASSWORD=your_keystore_password
KEY_ALIAS=smartfarm-upload-key
KEY_PASSWORD=your_key_password
EOF
    echo -e "${RED}❌ Please configure keystore passwords in app/local.properties${NC}"
    exit 1
fi

# Check if keystore file exists
KEYSTORE_PATH=$(grep "^KEYSTORE_PATH=" app/local.properties | cut -d'=' -f2)
if [ -z "$KEYSTORE_PATH" ]; then
    KEYSTORE_PATH="smartfarm-upload-key.jks"
fi

if [ ! -f "$KEYSTORE_PATH" ] && [ ! -f "app/$KEYSTORE_PATH" ]; then
    echo -e "${YELLOW}⚠️  Warning: Keystore file not found: $KEYSTORE_PATH${NC}"
    echo ""
    echo "To create a keystore, run:"
    echo "  keytool -genkey -v -keystore $KEYSTORE_PATH -keyalg RSA -keysize 2048 -validity 10000 -alias smartfarm-upload-key"
    echo ""
    read -p "Do you want to create a new keystore now? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        keytool -genkey -v -keystore "$KEYSTORE_PATH" -keyalg RSA -keysize 2048 -validity 10000 -alias smartfarm-upload-key
        echo ""
        echo -e "${GREEN}✅ Keystore created: $KEYSTORE_PATH${NC}"
        echo ""
        echo "⚠️  IMPORTANT: Update app/local.properties with your keystore passwords!"
        echo "   KEYSTORE_PASSWORD=<your_password>"
        echo "   KEY_PASSWORD=<your_password>"
        exit 0
    else
        echo -e "${RED}❌ Cannot proceed without keystore${NC}"
        exit 1
    fi
fi

# Check if passwords are configured
KEYSTORE_PASSWORD=$(grep "^KEYSTORE_PASSWORD=" app/local.properties | cut -d'=' -f2)
KEY_PASSWORD=$(grep "^KEY_PASSWORD=" app/local.properties | cut -d'=' -f2)

if [ -z "$KEYSTORE_PASSWORD" ] || [ "$KEYSTORE_PASSWORD" = "your_keystore_password" ] || \
   [ -z "$KEY_PASSWORD" ] || [ "$KEY_PASSWORD" = "your_key_password" ]; then
    echo -e "${RED}❌ Error: Keystore passwords not configured in app/local.properties${NC}"
    echo ""
    echo "Please set:"
    echo "   KEYSTORE_PASSWORD=your_actual_password"
    echo "   KEY_PASSWORD=your_actual_password"
    exit 1
fi

echo -e "${GREEN}✅ Keystore configuration found${NC}"
echo ""

# Stop any running Gradle daemons to free memory
echo "🛑 Stopping Gradle daemons..."
./gradlew --stop 2>/dev/null || true

# Clean previous builds
echo "🧹 Cleaning previous builds..."
./gradlew clean --no-daemon

# Build release AAB
echo ""
echo "📦 Building release AAB..."
echo ""

if ./gradlew bundleRelease --no-daemon; then
    echo ""
    echo -e "${GREEN}=========================================="
    echo "✅ Build Successful!"
    echo "==========================================${NC}"
    echo ""
    
    AAB_PATH="app/build/outputs/bundle/release/app-release.aab"
    
    if [ -f "$AAB_PATH" ]; then
        AAB_SIZE=$(du -h "$AAB_PATH" | cut -f1)
        echo -e "${GREEN}📱 AAB Location:${NC}"
        echo "   $AAB_PATH"
        echo ""
        echo -e "${GREEN}📊 AAB Size:${NC} $AAB_SIZE"
        echo ""
        echo "📤 Next Steps:"
        echo "   1. Go to Google Play Console"
        echo "   2. Navigate to: Production → New Release"
        echo "   3. Upload: $AAB_PATH"
        echo "   4. Add release notes"
        echo "   5. Submit for review"
        echo ""
    else
        echo -e "${RED}❌ Error: AAB file not found at expected location${NC}"
        exit 1
    fi
else
    echo ""
    echo -e "${RED}=========================================="
    echo "❌ Build Failed"
    echo "==========================================${NC}"
    echo ""
    echo "Check the error messages above for details."
    exit 1
fi

