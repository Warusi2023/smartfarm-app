# SmartFarm Multiplatform Setup Guide

This guide covers the complete Kotlin Multiplatform setup for SmartFarm, including Android, iOS, Web, and Desktop platforms.

## 🏗️ Project Structure

```
SmartFarm/
├── build.gradle.kts              # Root project configuration
├── settings.gradle.kts           # Module inclusion
├── gradle.properties             # Global properties
├── shared/                       # Shared business logic
├── app/                          # Android application
├── web/                          # Web application
├── desktop/                      # Desktop application
└── ios/                          # iOS/macOS/watchOS framework
```

## 🚀 Available Build Tasks

### Root Level Tasks
- `./gradlew buildAll` - Build all platforms
- `./gradlew testAll` - Run tests across all platforms
- `./gradlew cleanAll` - Clean all projects
- `./gradlew buildWeb` - Build web version
- `./gradlew runWeb` - Run web development server

### Platform-Specific Tasks
- **Android**: `./gradlew :app:assembleDebug`
- **Web**: `./gradlew :web:buildWeb`
- **Desktop**: `./gradlew :desktop:runDesktop`
- **iOS**: `./gradlew :ios:buildIOS`

## 📱 Platform Support

### Android
- **Min SDK**: 24 (Android 7.0)
- **Target SDK**: 34 (Android 14)
- **Compile SDK**: 34
- **Features**: Full Compose support, SQLDelight, Koin DI

### iOS
- **iOS**: 14.1+
- **watchOS**: 7.0+
- **macOS**: 11.0+
- **Features**: SwiftUI integration, native frameworks

### Web
- **Browser**: Modern browsers with ES6 support
- **Features**: Compose Web, SQL.js, Ktor client

### Desktop
- **Windows**: x64
- **macOS**: x64, ARM64
- **Linux**: x64
- **Features**: Native desktop apps, SQLite

## 🛠️ Key Technologies

### Core Framework
- **Kotlin Multiplatform**: 1.9.20
- **Compose Multiplatform**: 1.5.11
- **Coroutines**: 1.7.3

### Database
- **SQLDelight**: 1.5.5
  - Android: SQLite via Android driver
  - iOS: SQLite via native driver
  - Web: SQL.js driver
  - Desktop: SQLite driver

### Dependency Injection
- **Koin**: 3.5.0
  - KSP code generation
  - Platform-specific modules

### Networking
- **Ktor**: 2.3.7
  - Platform-specific engines
  - JSON serialization
  - Content negotiation

### Testing
- **Kotest**: 5.7.2
  - Property-based testing
  - Coroutine testing with Turbine
  - Platform-specific test runners

## 🔧 Configuration

### SQLDelight Database
```kotlin
// In shared module
sqldelight {
    databases {
        create("SmartFarmDatabase") {
            packageName.set("com.smartfarm.db")
        }
    }
}
```

### Koin Dependency Injection
```kotlin
// KSP configuration
ksp {
    arg("koin.ksp.package", "com.smartfarm.di")
}
```

### Compose Multiplatform
```kotlin
// Enable experimental features
org.jetbrains.compose.experimental.uikit.enabled=true
org.jetbrains.compose.experimental.tooling.enabled=true
```

## 📦 Dependencies

### Common Dependencies (shared module)
```kotlin
// Core
implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core")
implementation("org.jetbrains.kotlinx:kotlinx-serialization-json")

// Compose
implementation(compose.runtime)
implementation(compose.foundation)
implementation(compose.material3)

// Database
implementation("app.cash.sqldelight:runtime")
implementation("app.cash.sqldelight:coroutines-extensions")

// DI
implementation("io.insert-koin:koin-core")

// Networking
implementation("io.ktor:ktor-client-core")
implementation("io.ktor:ktor-client-content-negotiation")
```

### Platform-Specific Dependencies
Each platform module includes appropriate drivers and implementations for:
- Database access
- Network clients
- UI components
- Platform-specific features

## 🧪 Testing

### Running Tests
```bash
# All tests
./gradlew testAll

# Platform-specific tests
./gradlew :shared:test
./gradlew :web:test
./gradlew :desktop:test
```

### Test Dependencies
- **Kotest**: Testing framework
- **Turbine**: Coroutine testing
- **MockK**: Mocking (Android)
- **JUnit**: Test runner

## 🚀 Development Workflow

### 1. Setup Development Environment
```bash
# Clone and setup
git clone <repository>
cd SmartFarm

# Install dependencies
./gradlew build
```

### 2. Shared Module Development
```bash
# Work on shared business logic
./gradlew :shared:build
./gradlew :shared:test
```

### 3. Platform-Specific Development
```bash
# Android
./gradlew :app:assembleDebug

# Web
./gradlew :web:runWebDev

# Desktop
./gradlew :desktop:runDesktop

# iOS
./gradlew :ios:buildIOS
```

### 4. Testing Across Platforms
```bash
# Run all tests
./gradlew testAll

# Build all platforms
./gradlew buildAll
```

## 🔍 Troubleshooting

### Common Issues

#### Build Failures
- Ensure Java 11+ is installed
- Check Gradle version compatibility
- Verify all dependencies are resolved

#### iOS Build Issues
- Install Xcode and CocoaPods
- Run `./gradlew :ios:podInstall`
- Check iOS deployment target compatibility

#### Web Build Issues
- Ensure Node.js is installed
- Check webpack configuration
- Verify browser compatibility

#### Desktop Build Issues
- Check JVM target compatibility
- Verify platform-specific dependencies
- Ensure proper JDK installation

### Performance Optimization
- Enable Gradle build cache
- Use parallel builds
- Configure appropriate memory settings
- Enable incremental compilation

## 📚 Additional Resources

- [Kotlin Multiplatform Documentation](https://kotlinlang.org/docs/multiplatform.html)
- [Compose Multiplatform Guide](https://www.jetbrains.com/lp/compose-multiplatform/)
- [SQLDelight Documentation](https://cashapp.github.io/sqldelight/)
- [Koin Documentation](https://insert-koin.io/)
- [Ktor Documentation](https://ktor.io/)

## 🤝 Contributing

When adding new features:
1. Implement in the shared module first
2. Add platform-specific implementations
3. Include comprehensive tests
4. Update this documentation
5. Verify builds across all platforms

## 📄 License

This project follows the same license as the main SmartFarm application.
