# SmartFarm Dependencies Summary

This document provides a comprehensive overview of all dependencies included in the SmartFarm Android app, organized by category and purpose.

## Table of Contents

1. [Core Android Dependencies](#core-android-dependencies)
2. [Jetpack Compose Dependencies](#jetpack-compose-dependencies)
3. [Database Dependencies](#database-dependencies)
4. [Network Dependencies](#network-dependencies)
5. [UI and Navigation Dependencies](#ui-and-navigation-dependencies)
6. [Security Dependencies](#security-dependencies)
7. [Background Processing Dependencies](#background-processing-dependencies)
8. [Media and Camera Dependencies](#media-and-camera-dependencies)
9. [Maps and Location Dependencies](#maps-and-location-dependencies)
10. [Utility Dependencies](#utility-dependencies)
11. [Testing Dependencies](#testing-dependencies)
12. [Firebase Dependencies](#firebase-dependencies)
13. [Google Play Services Dependencies](#google-play-services-dependencies)

## Core Android Dependencies

### AndroidX Core
- `androidx.core:core-ktx:1.12.0` - Kotlin extensions for Android core
- `androidx.core:core-splashscreen:1.0.1` - Splash screen API
- `androidx.appcompat:appcompat:1.6.1` - AppCompat library
- `androidx.constraintlayout:constraintlayout:2.1.4` - ConstraintLayout

### Lifecycle Components
- `androidx.lifecycle:lifecycle-runtime-ktx:2.7.0` - Lifecycle runtime
- `androidx.lifecycle:lifecycle-viewmodel-ktx:2.7.0` - ViewModel
- `androidx.lifecycle:lifecycle-livedata-ktx:2.7.0` - LiveData
- `androidx.lifecycle:lifecycle-viewmodel-savedstate:2.7.0` - Saved state
- `androidx.lifecycle:lifecycle-viewmodel-compose:2.7.0` - Compose ViewModel
- `androidx.lifecycle:lifecycle-runtime-compose:2.7.0` - Compose runtime

### Activity and Fragment
- `androidx.activity:activity-compose:1.8.2` - Compose Activity

## Jetpack Compose Dependencies

### Core Compose
- `androidx.compose.ui:ui` - Compose UI core
- `androidx.compose.ui:ui-graphics` - Graphics support
- `androidx.compose.ui:ui-tooling-preview` - Tooling preview
- `androidx.compose.foundation:foundation` - Foundation components
- `androidx.compose.runtime:runtime` - Runtime
- `androidx.compose.runtime:runtime-livedata` - LiveData integration

### Material Design
- `androidx.compose.material3:material3` - Material Design 3
- `androidx.compose.material:material-icons-extended` - Extended icons

### Compose Testing
- `androidx.compose.ui:ui-test-junit4` - UI testing
- `androidx.compose.foundation:foundation-test` - Foundation testing
- `androidx.compose.material:material-test` - Material testing
- `androidx.compose.runtime:runtime-test` - Runtime testing

## Database Dependencies

### Room Database
- `androidx.room:room-runtime:2.6.1` - Room runtime
- `androidx.room:room-ktx:2.6.1` - Kotlin extensions
- `androidx.room:room-paging:2.6.1` - Paging support
- `androidx.room:room-compiler:2.6.1` - Annotation processor
- `androidx.room:room-testing:2.6.1` - Testing support

### DataStore
- `androidx.datastore:datastore-preferences:1.0.0` - Preferences
- `androidx.datastore:datastore-preferences-core:1.0.0` - Core preferences

## Network Dependencies

### Retrofit and OkHttp
- `com.squareup.retrofit2:retrofit:2.9.0` - HTTP client
- `com.squareup.retrofit2:converter-gson:2.9.0` - Gson converter
- `com.squareup.retrofit2:converter-scalars:2.9.0` - Scalar converter
- `com.squareup.okhttp3:okhttp:4.12.0` - HTTP client
- `com.squareup.okhttp3:logging-interceptor:4.12.0` - Logging
- `com.squareup.okhttp3:mockwebserver:4.12.0` - Mock server

### JSON Parsing
- `com.google.code.gson:gson:2.10.1` - Gson JSON parser
- `com.squareup.moshi:moshi:1.15.0` - Moshi JSON parser
- `com.squareup.moshi:moshi-kotlin:1.15.0` - Kotlin support
- `com.squareup.moshi:moshi-kotlin-codegen:1.15.0` - Code generation

## UI and Navigation Dependencies

### Navigation
- `androidx.navigation:navigation-compose:2.7.5` - Compose navigation
- `androidx.navigation:navigation-fragment-ktx:2.7.5` - Fragment navigation
- `androidx.navigation:navigation-ui-ktx:2.7.5` - UI navigation

### Paging
- `androidx.paging:paging-runtime-ktx:3.2.1` - Paging runtime
- `androidx.paging:paging-compose:3.2.1` - Compose paging

### Accompanist
- `com.google.accompanist:accompanist-permissions:0.32.0` - Permissions
- `com.google.accompanist:accompanist-systemuicontroller:0.32.0` - System UI
- `com.google.accompanist:accompanist-swiperefresh:0.32.0` - Swipe refresh
- `com.google.accompanist:accompanist-placeholder:0.32.0` - Placeholder
- `com.google.accompanist:accompanist-flowlayout:0.32.0` - Flow layout

### Material Design
- `com.google.android.material:material:1.11.0` - Material Design

## Security Dependencies

### Security Crypto
- `androidx.security:security-crypto:1.1.0-alpha06` - Security crypto
- `androidx.security:security-crypto-ktx:1.1.0-alpha06` - Kotlin extensions

### Biometric
- `androidx.biometric:biometric:1.1.0` - Biometric authentication

## Background Processing Dependencies

### WorkManager
- `androidx.work:work-runtime-ktx:2.9.0` - WorkManager runtime
- `androidx.work:work-multiprocess:2.9.0` - Multi-process support
- `androidx.work:work-testing:2.9.0` - Testing support

### Startup
- `androidx.startup:startup-runtime:1.1.1` - App startup

## Media and Camera Dependencies

### CameraX
- `androidx.camera:camera-core:1.3.1` - Camera core
- `androidx.camera:camera-camera2:1.3.1` - Camera2 implementation
- `androidx.camera:camera-lifecycle:1.3.1` - Lifecycle integration
- `androidx.camera:camera-view:1.3.1` - Camera view
- `androidx.camera:camera-extensions:1.3.1` - Camera extensions

### Media3
- `androidx.media3:media3-exoplayer:1.2.0` - ExoPlayer
- `androidx.media3:media3-ui:1.2.0` - Media UI
- `androidx.media3:media3-common:1.2.0` - Common components

### Image Loading
- `io.coil-kt:coil-compose:2.5.0` - Compose image loading
- `io.coil-kt:coil-base:2.5.0` - Base image loading
- `io.coil-kt:coil-gif:2.5.0` - GIF support
- `io.coil-kt:coil-svg:2.5.0` - SVG support

## Maps and Location Dependencies

### Google Maps
- `com.google.android.gms:play-services-maps:18.2.0` - Google Maps
- `com.google.android.gms:play-services-location:21.0.1` - Location services
- `com.google.android.gms:play-services-places:17.0.0` - Places API
- `com.google.maps.android:maps-compose:4.3.0` - Compose maps
- `com.google.maps.android:maps-ktx:5.0.0` - Kotlin extensions
- `com.google.maps.android:maps-utils-ktx:5.0.0` - Utility extensions

## Utility Dependencies

### Coroutines
- `org.jetbrains.kotlinx:kotlinx-coroutines-android:1.7.3` - Android coroutines
- `org.jetbrains.kotlinx:kotlinx-coroutines-core:1.7.3` - Core coroutines
- `org.jetbrains.kotlinx:kotlinx-coroutines-play-services:1.7.3` - Play services
- `org.jetbrains.kotlinx:kotlinx-coroutines-test:1.7.3` - Testing support
- `org.jetbrains.kotlinx:kotlinx-coroutines-debug:1.7.3` - Debug support

### MultiDex
- `androidx.multidex:multidex:2.0.1` - MultiDex support

### Window Manager
- `androidx.window:window:1.2.0` - Window management
- `androidx.window:window-java:1.2.0` - Java support

### WebView and Print
- `androidx.webkit:webkit:1.8.0` - WebView
- `androidx.print:print:1.0.0` - Print support

### PDF Generation
- `com.itextpdf:itext7-core:7.2.5` - iText7 core
- `com.itextpdf:kernel:7.2.5` - Kernel
- `com.itextpdf:io:7.2.5` - IO
- `com.itextpdf:layout:7.2.5` - Layout

### Charts and Graphs
- `com.github.PhilJay:MPAndroidChart:v3.1.0` - MPAndroidChart

### Calendar Integration
- `com.google.apis:google-api-services-calendar:v3-rev411-1.25.0` - Calendar API
- `com.google.api-client:google-api-client-android:2.2.0` - API client
- `com.google.oauth-client:google-oauth-client-jetty:1.34.1` - OAuth client

### QR Code and Barcode
- `com.google.zxing:core:3.5.2` - ZXing core
- `com.journeyapps:zxing-android-embedded:4.3.0` - Android embedded
- `com.google.mlkit:barcode-scanning:17.2.0` - ML Kit barcode

### Logging
- `com.jakewharton.timber:timber:5.0.1` - Timber logging

### Memory Leak Detection
- `com.squareup.leakcanary:leakcanary-android:2.12` - LeakCanary (debug)

## Testing Dependencies

### Unit Testing
- `junit:junit:4.13.2` - JUnit 4
- `org.mockito:mockito-core:5.7.0` - Mockito core
- `org.mockito.kotlin:mockito-kotlin:5.2.1` - Kotlin support
- `org.mockito:mockito-inline:5.2.0` - Inline mocking
- `io.mockk:mockk:1.13.8` - MockK
- `app.cash.turbine:turbine:1.0.0` - Flow testing
- `org.jetbrains.kotlin:kotlin-test:1.9.10` - Kotlin test
- `org.jetbrains.kotlin:kotlin-test-junit:1.9.10` - JUnit support
- `org.robolectric:robolectric:4.11.1` - Robolectric

### Android Testing
- `androidx.test:core:1.5.0` - Test core
- `androidx.test:runner:1.5.2` - Test runner
- `androidx.test:rules:1.5.0` - Test rules
- `androidx.test.ext:junit:1.1.5` - JUnit extensions
- `androidx.test.espresso:espresso-core:3.5.1` - Espresso
- `androidx.test.uiautomator:uiautomator:2.2.0` - UI Automator
- `androidx.test:core-ktx:1.5.0` - Kotlin extensions
- `androidx.test:monitor:1.6.1` - Test monitor
- `androidx.test:orchestrator:1.4.2` - Test orchestrator

### Architecture Testing
- `androidx.arch.core:core-testing:2.2.0` - Architecture testing
- `androidx.room:room-testing:2.6.1` - Room testing
- `androidx.work:work-testing:2.9.0` - WorkManager testing

### Benchmark Testing
- `androidx.benchmark:benchmark-junit4:1.2.2` - Benchmark JUnit4
- `androidx.benchmark:benchmark-macro-junit4:1.2.2` - Macro benchmarks
- `androidx.benchmark:benchmark-baseline-junit4:1.2.2` - Baseline benchmarks

### Debug Tools
- `androidx.compose.ui:ui-tooling` - Compose tooling
- `androidx.compose.ui:ui-tooling-data` - Tooling data
- `androidx.compose.ui:ui-tooling-preview` - Tooling preview
- `androidx.compose.ui:ui-test-manifest` - Test manifest

## Firebase Dependencies

### Firebase BOM
- `com.google.firebase:firebase-bom:32.7.0` - Firebase Bill of Materials

### Firebase Services
- `com.google.firebase:firebase-analytics-ktx` - Analytics
- `com.google.firebase:firebase-crashlytics-ktx` - Crashlytics
- `com.google.firebase:firebase-auth-ktx` - Authentication
- `com.google.firebase:firebase-firestore-ktx` - Firestore
- `com.google.firebase:firebase-storage-ktx` - Storage
- `com.google.firebase:firebase-messaging-ktx` - Cloud Messaging
- `com.google.firebase:firebase-config-ktx` - Remote Config
- `com.google.firebase:firebase-perf-ktx` - Performance
- `com.google.firebase:firebase-appcheck-ktx` - App Check

## Google Play Services Dependencies

### Authentication and Drive
- `com.google.android.gms:play-services-auth:20.7.0` - Google Sign-In
- `com.google.android.gms:play-services-drive:17.0.0` - Google Drive

### Fitness and Wearable
- `com.google.android.gms:play-services-fitness:21.1.0` - Fitness API
- `com.google.android.gms:play-services-wearable:18.1.0` - Wearable API

## Dependency Categories Summary

### Core Functionality
- **Database**: Room, DataStore, Paging
- **Network**: Retrofit, OkHttp, JSON parsing
- **UI**: Compose, Navigation, Material Design
- **Background**: WorkManager, Coroutines

### Advanced Features
- **Security**: Biometric, Encryption
- **Media**: CameraX, Media3, Image loading
- **Maps**: Google Maps, Location services
- **Utilities**: PDF generation, Charts, QR codes

### Testing and Quality
- **Unit Testing**: JUnit, Mockito, MockK, Turbine
- **UI Testing**: Espresso, UI Automator, Compose testing
- **Performance**: Benchmark testing, LeakCanary
- **Architecture**: Architecture testing, Room testing

### External Services
- **Firebase**: Analytics, Crashlytics, Auth, Firestore
- **Google Services**: Maps, Drive, Fitness, Wearable
- **Calendar**: Google Calendar API integration

## Version Management

All dependencies use the latest stable versions as of 2024. The Firebase BOM ensures consistent Firebase dependency versions.

## Build Configuration

- **Kotlin**: 1.9.10
- **Compose Compiler**: 1.5.1
- **Android Gradle Plugin**: 8.2.0
- **Target SDK**: 34 (Android 14)
- **Minimum SDK**: 24 (Android 7.0)

## Repository Sources

- **Google Maven**: Primary Android dependencies
- **Maven Central**: Standard Java/Kotlin libraries
- **JitPack**: Community libraries (MPAndroidChart)
- **Google APIs**: Google API client libraries

This comprehensive dependency setup ensures the SmartFarm app has all necessary libraries for a modern, feature-rich Android application with excellent testing coverage and performance monitoring. 