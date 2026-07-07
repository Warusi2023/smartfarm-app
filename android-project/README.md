# SmartFarm Android Application

## Overview
SmartFarm is a comprehensive Android application built with Kotlin Multiplatform that provides intelligent agriculture management capabilities. The app offers real-time monitoring, automated irrigation control, and comprehensive farm analytics.

## Project Structure
```
android-project/
├── android/                 # Android-specific code
├── app/                    # Canonical shippable Android application module
├── androidApp/             # Experimental KMM shell (not used for release)
├── ios/                    # iOS-specific code (Kotlin Multiplatform)
├── desktop/                # Desktop-specific code
├── shared/                 # Shared Kotlin code
├── gradle/                 # Gradle wrapper
├── .gradle/                # Gradle cache
├── .kotlin/                # Kotlin cache
├── .idea/                  # IntelliJ IDEA project files
├── build/                  # Build outputs
├── build.gradle.kts        # Root build configuration
├── settings.gradle.kts     # Project settings
├── gradle.properties       # Gradle properties
├── gradlew                 # Gradle wrapper script (Unix)
├── gradlew.bat            # Gradle wrapper script (Windows)
├── local.properties        # Local configuration
└── smartfarm-upload-key.jks # App signing key
```

## Features
- **Real-time Monitoring**: Track temperature, humidity, soil moisture
- **Smart Irrigation**: Automated water management based on sensor data
- **Crop Management**: Comprehensive crop tracking and optimization
- **Analytics Dashboard**: Data-driven insights and reporting
- **Cross-platform**: Works on Android, iOS, and Desktop
- **IoT Integration**: Connect with various farm sensors and devices

## Prerequisites
- Android Studio Arctic Fox or later
- JDK 11 or higher
- Kotlin 1.8.0 or higher
- Android SDK API 21+

## Setup Instructions

### 1. Clone and Open Project
```bash
# Open the android-project folder in Android Studio
cd android-project
```

### 2. Configure Local Properties
Ensure `local.properties` contains your Android SDK path:
```properties
sdk.dir=C\:\\Users\\YourUsername\\AppData\\Local\\Android\\Sdk
```

### 3. Sync Gradle
- Open project in Android Studio
- Click "Sync Project with Gradle Files"
- Wait for dependencies to download

### 4. Build Configuration
The project uses Kotlin Multiplatform with the following modules:
- `app`: **Canonical shippable Android application** (auth, navigation, Room, Retrofit)
- `shared`: Common business logic and data models
- `androidApp`: Experimental KMM shell (frozen; not used for release builds)
- `ios`: iOS-specific implementations
- `desktop`: Desktop application

## Building the App

### Local secret provisioning
Before the first local build:

```powershell
cd android-project
.\scripts\provision-android-secrets.ps1
```

Replace `app/google-services.json` with your Firebase download and set signing values in `app/local.properties` (see `app/local.properties.example`).

### Debug Build
```bash
./gradlew :app:assembleDebug
```

### Release Build
```bash
./gradlew :app:assembleRelease
```

### APK Generation
```bash
./gradlew :app:assembleRelease
# APK will be in: app/build/outputs/apk/release/
```

### Play Store AAB
```bash
./gradlew :app:bundleRelease
# AAB will be in: app/build/outputs/bundle/release/
```

### CI / release secrets (GitHub Actions)
Tag releases (`v*`) require these repository secrets:

| Secret | Purpose |
|--------|---------|
| `ANDROID_KEYSTORE_BASE64` | Base64-encoded upload keystore (`.jks`) |
| `ANDROID_KEYSTORE_PASSWORD` | Keystore password |
| `ANDROID_KEY_ALIAS` | Key alias |
| `ANDROID_KEY_PASSWORD` | Key password |
| `GOOGLE_SERVICES_JSON` | Full contents of `app/google-services.json` |

PR/push Android validation runs via `.github/workflows/android-ci.yml` (`:app:assembleDebug`).

## App Signing
The project includes a keystore file for app signing:
- File: `smartfarm-upload-key.jks`
- Used for Google Play Store uploads
- Configured in `app/build.gradle.kts` (see `app/local.properties` for keystore paths)

## Testing
- Unit tests: `./gradlew test`
- Instrumented tests: `./gradlew connectedAndroidTest`
- All tests: `./gradlew check`

## Dependencies
- **Kotlin Multiplatform**: Cross-platform development
- **Compose Multiplatform**: Modern UI framework
- **Ktor**: Network communication
- **SQLDelight**: Database management
- **Koin**: Dependency injection

## Troubleshooting

### Common Issues
1. **Gradle Sync Failed**: Check internet connection and try again
2. **Build Errors**: Ensure JDK 11+ is installed and configured
3. **Missing SDK**: Verify Android SDK installation in local.properties

### Performance Optimization
- Enable Gradle build cache
- Use parallel builds: `./gradlew --parallel`
- Enable daemon: `./gradlew --daemon`

## Deployment
1. Generate signed APK/Bundle
2. Test on multiple devices
3. Upload to Google Play Console
4. Monitor crash reports and analytics

## Support
For technical support or questions:
- Check the main project documentation
- Review build logs for specific errors
- Ensure all prerequisites are met

## License
SmartFarm Android Application - All rights reserved
