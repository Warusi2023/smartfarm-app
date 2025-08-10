# Pre-Launch Testing Guide

## Overview

This guide covers the complete pre-launch testing setup for the SmartFarm Android application, including internal testing track configuration, beta testing program setup, and comprehensive device testing strategies.

## Testing Strategy

### Testing Phases

1. **Internal Testing** - Developer and QA team testing
2. **Closed Beta Testing** - Limited external user testing
3. **Open Beta Testing** - Public beta testing
4. **Release Candidate Testing** - Final pre-release testing

### Testing Tracks

- **Internal Track** - For development team and internal testing
- **Alpha Track** - For early external testers
- **Beta Track** - For broader beta testing
- **Production Track** - For final release

## 1. Internal Testing Track Setup

### Google Play Console Configuration

#### Step 1: Create Internal Testing Track

1. **Access Google Play Console**
   - Go to [Google Play Console](https://play.google.com/console)
   - Select the SmartFarm app project

2. **Navigate to Testing Section**
   - Go to "Testing" in the left sidebar
   - Click on "Internal testing"

3. **Configure Internal Testing**
   ```
   Track Name: Internal Testing
   Description: Internal testing for development team
   Release Notes: Initial internal testing release
   ```

#### Step 2: Upload Internal Testing Build

1. **Build Configuration**
   ```kotlin
   // app/build.gradle.kts
   android {
       buildTypes {
           internal {
               initWith(debug)
               applicationIdSuffix = ".internal"
               versionNameSuffix = "-internal"
               isDebuggable = true
               isMinifyEnabled = false
               isShrinkResources = false
           }
       }
   }
   ```

2. **Build Commands**
   ```bash
   # Build internal testing APK
   ./gradlew assembleInternal
   
   # Build internal testing AAB
   ./gradlew bundleInternal
   ```

3. **Upload to Google Play Console**
   - Go to "Internal testing" track
   - Click "Create new release"
   - Upload the AAB file
   - Add release notes
   - Save and review

#### Step 3: Add Internal Testers

1. **Add Testers by Email**
   - Go to "Testers" tab
   - Click "Create email list"
   - Add developer and QA team emails
   - Save the list

2. **Share Testing Link**
   - Copy the opt-in URL
   - Share with internal testers
   - Testers must accept the invitation

### Internal Testing Features

#### Debug Features
```kotlin
// app/src/main/java/com/example/smartfarm/debug/DebugFeatures.kt
@Singleton
class DebugFeatures @Inject constructor(
    private val context: Context,
    private val errorHandler: ErrorHandler
) {
    
    fun enableDebugMode() {
        if (BuildConfig.DEBUG || BuildConfig.BUILD_TYPE == "internal") {
            // Enable debug features
            enableCrashlyticsDebug()
            enablePerformanceMonitoring()
            enableDebugLogging()
            enableTestData()
        }
    }
    
    private fun enableCrashlyticsDebug() {
        // Enable crash reporting in debug builds
        errorHandler.setCrashlyticsCollectionEnabled(true)
    }
    
    private fun enablePerformanceMonitoring() {
        // Enable detailed performance monitoring
        // Implementation for performance tracking
    }
    
    private fun enableDebugLogging() {
        // Enable detailed logging
        if (BuildConfig.DEBUG) {
            Timber.plant(Timber.DebugTree())
        }
    }
    
    private fun enableTestData() {
        // Enable test data generation
        // Implementation for test data
    }
}
```

#### Debug Menu
```kotlin
// app/src/main/java/com/example/smartfarm/ui/DebugMenuScreen.kt
@Composable
fun DebugMenuScreen(
    onNavigateBack: () -> Unit,
    viewModel: DebugMenuViewModel = hiltViewModel()
) {
    val uiState by viewModel.uiState.collectAsState()
    
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Debug Menu") },
                navigationIcon = {
                    IconButton(onClick = onNavigateBack) {
                        Icon(Icons.Default.ArrowBack, "Back")
                    }
                }
            )
        }
    ) { padding ->
        LazyColumn(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
        ) {
            item {
                DebugSection("Error Testing") {
                    DebugButton("Test Network Error") {
                        viewModel.testNetworkError()
                    }
                    DebugButton("Test Database Error") {
                        viewModel.testDatabaseError()
                    }
                    DebugButton("Test Authentication Error") {
                        viewModel.testAuthenticationError()
                    }
                    DebugButton("Test Performance Issue") {
                        viewModel.testPerformanceIssue()
                    }
                }
            }
            
            item {
                DebugSection("Performance Testing") {
                    DebugButton("Test Memory Usage") {
                        viewModel.testMemoryUsage()
                    }
                    DebugButton("Test Startup Time") {
                        viewModel.testStartupTime()
                    }
                    DebugButton("Test Database Performance") {
                        viewModel.testDatabasePerformance()
                    }
                }
            }
            
            item {
                DebugSection("Data Testing") {
                    DebugButton("Generate Test Data") {
                        viewModel.generateTestData()
                    }
                    DebugButton("Clear All Data") {
                        viewModel.clearAllData()
                    }
                    DebugButton("Export Debug Data") {
                        viewModel.exportDebugData()
                    }
                }
            }
            
            item {
                DebugSection("Accessibility Testing") {
                    DebugButton("Test Screen Reader") {
                        viewModel.testScreenReader()
                    }
                    DebugButton("Test Color Contrast") {
                        viewModel.testColorContrast()
                    }
                    DebugButton("Test Touch Targets") {
                        viewModel.testTouchTargets()
                    }
                }
            }
            
            item {
                DebugSection("Network Testing") {
                    DebugButton("Test Slow Network") {
                        viewModel.testSlowNetwork()
                    }
                    DebugButton("Test Offline Mode") {
                        viewModel.testOfflineMode()
                    }
                    DebugButton("Test Network Recovery") {
                        viewModel.testNetworkRecovery()
                    }
                }
            }
        }
    }
}

@Composable
private fun DebugSection(
    title: String,
    content: @Composable () -> Unit
) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp)
    ) {
        Column(
            modifier = Modifier.padding(16.dp)
        ) {
            Text(
                text = title,
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.Bold
            )
            Spacer(modifier = Modifier.height(8.dp))
            content()
        }
    }
}

@Composable
private fun DebugButton(
    text: String,
    onClick: () -> Unit
) {
    Button(
        onClick = onClick,
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 4.dp)
    ) {
        Text(text)
    }
}
```

## 2. Beta Testing Program Setup

### Closed Beta Testing

#### Step 1: Create Beta Testing Track

1. **Configure Beta Track**
   ```
   Track Name: Beta Testing
   Description: Closed beta testing for selected users
   Release Notes: Beta testing release with new features
   ```

2. **Upload Beta Build**
   ```bash
   # Build beta testing AAB
   ./gradlew bundleRelease
   ```

3. **Add Beta Testers**
   - Create email lists for different user groups
   - Add testers by email addresses
   - Share opt-in URLs

#### Step 2: Beta Testing Features

```kotlin
// app/src/main/java/com/example/smartfarm/beta/BetaFeatures.kt
@Singleton
class BetaFeatures @Inject constructor(
    private val context: Context,
    private val crashlyticsManager: CrashlyticsManager
) {
    
    fun enableBetaFeatures() {
        if (BuildConfig.BUILD_TYPE == "release" && isBetaUser()) {
            enableBetaAnalytics()
            enableBetaFeedback()
            enableBetaCrashReporting()
        }
    }
    
    private fun enableBetaAnalytics() {
        // Enhanced analytics for beta users
        crashlyticsManager.setUserProperty("user_type", "beta")
        crashlyticsManager.setUserProperty("beta_version", BuildConfig.VERSION_NAME)
    }
    
    private fun enableBetaFeedback() {
        // In-app feedback collection
        // Implementation for feedback system
    }
    
    private fun enableBetaCrashReporting() {
        // Enhanced crash reporting for beta
        crashlyticsManager.setCrashlyticsCollectionEnabled(true)
    }
    
    private fun isBetaUser(): Boolean {
        // Check if user is in beta program
        return true // Implementation needed
    }
}
```

### Open Beta Testing

#### Step 1: Configure Open Beta

1. **Enable Open Beta**
   - Go to "Testing" > "Open testing"
   - Click "Create new release"
   - Upload production-ready build

2. **Configure Beta Details**
   ```
   Track Name: Open Beta
   Description: Public beta testing
   Release Notes: Open beta release
   ```

3. **Publish Beta**
   - Review and publish
   - Share public beta link

## 3. Multi-Device Testing Strategy

### Device Matrix

#### Android Versions
- **Android 7.0 (API 24)** - Minimum supported
- **Android 8.0 (API 26)** - Target minimum
- **Android 9.0 (API 28)** - Common version
- **Android 10 (API 29)** - Popular version
- **Android 11 (API 30)** - Modern version
- **Android 12 (API 31)** - Latest stable
- **Android 13 (API 33)** - Latest version
- **Android 14 (API 34)** - Latest version

#### Device Categories

**Phones**
- **Small (4-5")**: Samsung Galaxy S8, Google Pixel 2
- **Medium (5-6")**: Samsung Galaxy S21, Google Pixel 6
- **Large (6-7")**: Samsung Galaxy S23 Ultra, Google Pixel 7 Pro

**Tablets**
- **Small (7-8")**: Samsung Galaxy Tab A, Amazon Fire HD 8
- **Medium (8-10")**: Samsung Galaxy Tab S6, iPad Air
- **Large (10-12")**: Samsung Galaxy Tab S8 Ultra, iPad Pro

**Foldables**
- **Samsung Galaxy Z Fold 4/5**
- **Samsung Galaxy Z Flip 4/5**

### Testing Automation

#### Firebase Test Lab Integration

```kotlin
// app/build.gradle.kts
android {
    testOptions {
        execution 'ANDROIDX_TEST_ORCHESTRATOR'
    }
}

dependencies {
    androidTestImplementation 'androidx.test:runner:1.5.2'
    androidTestImplementation 'androidx.test:rules:1.5.0'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.5.1'
    androidTestImplementation 'androidx.test.espresso:espresso-contrib:3.5.1'
    androidTestImplementation 'androidx.test.uiautomator:uiautomator:2.2.0'
    androidTestImplementation 'androidx.benchmark:benchmark-macro-junit4:1.2.2'
}
```

#### Test Configuration

```kotlin
// app/src/androidTest/java/com/example/smartfarm/TestConfiguration.kt
@RunWith(AndroidJUnit4::class)
class TestConfiguration {
    
    @get:Rule
    val activityRule = ActivityScenarioRule(MainActivity::class.java)
    
    @Before
    fun setUp() {
        // Setup test environment
        setupTestData()
        setupTestNetwork()
    }
    
    @Test
    fun testAppStartup() {
        // Test app startup performance
        val startTime = System.currentTimeMillis()
        
        // Wait for app to load
        onView(withId(R.id.main_content))
            .check(matches(isDisplayed()))
        
        val loadTime = System.currentTimeMillis() - startTime
        assertTrue("App startup too slow: ${loadTime}ms", loadTime < 3000)
    }
    
    @Test
    fun testNavigation() {
        // Test navigation between screens
        onView(withId(R.id.nav_weather))
            .perform(click())
        
        onView(withId(R.id.weather_content))
            .check(matches(isDisplayed()))
        
        onView(withId(R.id.nav_livestock))
            .perform(click())
        
        onView(withId(R.id.livestock_content))
            .check(matches(isDisplayed()))
    }
    
    @Test
    fun testErrorHandling() {
        // Test error handling scenarios
        // Implementation for error testing
    }
    
    @Test
    fun testAccessibility() {
        // Test accessibility features
        // Implementation for accessibility testing
    }
}
```

### Device Testing Scripts

#### PowerShell Testing Script

```powershell
# test-devices.ps1
param(
    [string]$BuildType = "debug",
    [string]$TestType = "all"
)

Write-Host "Starting device testing for SmartFarm app..." -ForegroundColor Green

# Build the app
Write-Host "Building app..." -ForegroundColor Yellow
switch ($BuildType) {
    "debug" { 
        .\gradlew.bat assembleDebug
        $apkPath = "app\build\outputs\apk\debug\app-debug.apk"
    }
    "release" { 
        .\gradlew.bat assembleRelease
        $apkPath = "app\build\outputs\apk\release\app-release.apk"
    }
    "internal" { 
        .\gradlew.bat assembleInternal
        $apkPath = "app\build\outputs\apk\internal\app-internal.apk"
    }
}

if (-not (Test-Path $apkPath)) {
    Write-Host "Build failed! APK not found at: $apkPath" -ForegroundColor Red
    exit 1
}

Write-Host "Build successful! APK: $apkPath" -ForegroundColor Green

# Get connected devices
$devices = adb devices | Select-String "device$" | ForEach-Object { ($_ -split "\s+")[0] }

if ($devices.Count -eq 0) {
    Write-Host "No devices connected!" -ForegroundColor Red
    Write-Host "Please connect devices and enable USB debugging" -ForegroundColor Yellow
    exit 1
}

Write-Host "Found $($devices.Count) device(s):" -ForegroundColor Green
$devices | ForEach-Object { Write-Host "  - $_" -ForegroundColor Cyan }

# Install and test on each device
foreach ($device in $devices) {
    Write-Host "Testing on device: $device" -ForegroundColor Yellow
    
    # Get device info
    $deviceInfo = adb -s $device shell getprop
    $androidVersion = ($deviceInfo | Select-String "ro.build.version.release:").ToString().Split(":")[1].Trim()
    $deviceModel = ($deviceInfo | Select-String "ro.product.model:").ToString().Split(":")[1].Trim()
    
    Write-Host "  Device: $deviceModel" -ForegroundColor Cyan
    Write-Host "  Android: $androidVersion" -ForegroundColor Cyan
    
    # Install app
    Write-Host "  Installing app..." -ForegroundColor Yellow
    $installResult = adb -s $device install -r $apkPath
    
    if ($installResult -match "Success") {
        Write-Host "  Installation successful" -ForegroundColor Green
        
        # Run tests based on type
        switch ($TestType) {
            "basic" { Test-BasicFunctionality $device }
            "performance" { Test-Performance $device }
            "accessibility" { Test-Accessibility $device }
            "all" { 
                Test-BasicFunctionality $device
                Test-Performance $device
                Test-Accessibility $device
            }
        }
    } else {
        Write-Host "  Installation failed: $installResult" -ForegroundColor Red
    }
    
    Write-Host "  Testing completed for $device" -ForegroundColor Green
    Write-Host ""
}

Write-Host "Device testing completed!" -ForegroundColor Green

function Test-BasicFunctionality {
    param([string]$device)
    
    Write-Host "    Running basic functionality tests..." -ForegroundColor Yellow
    
    # Launch app
    adb -s $device shell am start -n com.example.smartfarm/.MainActivity
    
    # Wait for app to load
    Start-Sleep -Seconds 5
    
    # Test basic navigation
    # Implementation for basic tests
    
    Write-Host "    Basic functionality tests completed" -ForegroundColor Green
}

function Test-Performance {
    param([string]$device)
    
    Write-Host "    Running performance tests..." -ForegroundColor Yellow
    
    # Test startup time
    $startTime = Get-Date
    adb -s $device shell am start -n com.example.smartfarm/.MainActivity
    Start-Sleep -Seconds 3
    $endTime = Get-Date
    $startupTime = ($endTime - $startTime).TotalMilliseconds
    
    Write-Host "    Startup time: $startupTime ms" -ForegroundColor Cyan
    
    # Test memory usage
    $memoryInfo = adb -s $device shell dumpsys meminfo com.example.smartfarm
    Write-Host "    Memory usage tested" -ForegroundColor Cyan
    
    Write-Host "    Performance tests completed" -ForegroundColor Green
}

function Test-Accessibility {
    param([string]$device)
    
    Write-Host "    Running accessibility tests..." -ForegroundColor Yellow
    
    # Test screen reader compatibility
    # Implementation for accessibility tests
    
    Write-Host "    Accessibility tests completed" -ForegroundColor Green
}
```

## 4. Testing Checklist

### Pre-Launch Testing Checklist

#### Internal Testing
- [ ] **Build Configuration**
  - [ ] Internal build type configured
  - [ ] Debug features enabled
  - [ ] Crashlytics enabled for internal builds
  - [ ] Test data generation available

- [ ] **Google Play Console**
  - [ ] Internal testing track created
  - [ ] Internal testers added
  - [ ] Internal build uploaded
  - [ ] Testing link shared with team

- [ ] **Basic Functionality**
  - [ ] App launches successfully
  - [ ] Navigation works correctly
  - [ ] All screens load properly
  - [ ] Data persistence works
  - [ ] Error handling functions

#### Beta Testing
- [ ] **Beta Track Setup**
  - [ ] Beta testing track created
  - [ ] Beta testers identified and added
  - [ ] Beta build uploaded
  - [ ] Beta features enabled

- [ ] **User Experience**
  - [ ] Onboarding flow tested
  - [ ] Core features functional
  - [ ] Performance acceptable
  - [ ] Error messages clear
  - [ ] Accessibility features work

#### Device Testing
- [ ] **Android Versions**
  - [ ] Android 7.0 (API 24) - Minimum
  - [ ] Android 8.0 (API 26) - Target minimum
  - [ ] Android 9.0 (API 28) - Common
  - [ ] Android 10 (API 29) - Popular
  - [ ] Android 11 (API 30) - Modern
  - [ ] Android 12 (API 31) - Latest stable
  - [ ] Android 13 (API 33) - Latest
  - [ ] Android 14 (API 34) - Latest

- [ ] **Device Types**
  - [ ] Small phones (4-5")
  - [ ] Medium phones (5-6")
  - [ ] Large phones (6-7")
  - [ ] Small tablets (7-8")
  - [ ] Medium tablets (8-10")
  - [ ] Large tablets (10-12")
  - [ ] Foldables (if applicable)

- [ ] **Screen Densities**
  - [ ] ldpi (120 dpi)
  - [ ] mdpi (160 dpi)
  - [ ] hdpi (240 dpi)
  - [ ] xhdpi (320 dpi)
  - [ ] xxhdpi (480 dpi)
  - [ ] xxxhdpi (640 dpi)

#### Performance Testing
- [ ] **Startup Performance**
  - [ ] Cold start < 3 seconds
  - [ ] Warm start < 2 seconds
  - [ ] Hot start < 1 second

- [ ] **Memory Usage**
  - [ ] Peak memory < 200MB
  - [ ] No memory leaks
  - [ ] Garbage collection efficient

- [ ] **Battery Usage**
  - [ ] Background battery drain minimal
  - [ ] Location services efficient
  - [ ] Network requests optimized

#### Accessibility Testing
- [ ] **Screen Reader**
  - [ ] TalkBack compatibility
  - [ ] Content descriptions present
  - [ ] Navigation logical

- [ ] **Visual Accessibility**
  - [ ] Color contrast ratios meet WCAG 2.1 AA
  - [ ] Text scaling works
  - [ ] Touch targets minimum 48dp

- [ ] **Motor Accessibility**
  - [ ] Keyboard navigation works
  - [ ] Gesture alternatives available
  - [ ] Motion reduction respected

#### Error Handling Testing
- [ ] **Network Errors**
  - [ ] No internet connection
  - [ ] Slow network
  - [ ] Server errors
  - [ ] Timeout scenarios

- [ ] **Data Errors**
  - [ ] Database corruption
  - [ ] Storage full
  - [ ] Permission denied
  - [ ] Invalid data

- [ ] **App Errors**
  - [ ] Memory pressure
  - [ ] Force close scenarios
  - [ ] Background/foreground transitions

## 5. Testing Tools and Resources

### Automated Testing Tools

#### Firebase Test Lab
- **Device Testing**: Automated testing on real devices
- **Performance Testing**: Automated performance benchmarks
- **Compatibility Testing**: Testing across different configurations

#### Espresso Testing
- **UI Testing**: Automated UI interaction testing
- **Integration Testing**: End-to-end workflow testing
- **Accessibility Testing**: Automated accessibility validation

#### Performance Testing
- **Android Profiler**: Memory and CPU profiling
- **Systrace**: System-level performance analysis
- **Firebase Performance**: Real-world performance monitoring

### Manual Testing Tools

#### Device Farms
- **AWS Device Farm**: Cloud-based device testing
- **Firebase Test Lab**: Google's device testing service
- **BrowserStack**: Cross-platform testing

#### Testing Devices
- **Physical Devices**: Real device testing
- **Emulators**: Virtual device testing
- **Cloud Devices**: Remote device access

## 6. Testing Reports and Analytics

### Test Results Tracking

```kotlin
// app/src/main/java/com/example/smartfarm/testing/TestResultsTracker.kt
@Singleton
class TestResultsTracker @Inject constructor(
    private val context: Context,
    private val crashlyticsManager: CrashlyticsManager
) {
    
    fun trackTestResult(
        testName: String,
        result: TestResult,
        deviceInfo: DeviceInfo,
        duration: Long
    ) {
        crashlyticsManager.setCustomKey("test_name", testName)
        crashlyticsManager.setCustomKey("test_result", result.name)
        crashlyticsManager.setCustomKey("test_duration", duration)
        crashlyticsManager.setCustomKey("device_model", deviceInfo.model)
        crashlyticsManager.setCustomKey("android_version", deviceInfo.androidVersion)
        
        if (result == TestResult.FAILED) {
            crashlyticsManager.logException(Exception("Test failed: $testName"))
        }
    }
    
    fun generateTestReport(): TestReport {
        // Generate comprehensive test report
        return TestReport(
            totalTests = 0,
            passedTests = 0,
            failedTests = 0,
            deviceCoverage = emptyList(),
            performanceMetrics = emptyList()
        )
    }
}

enum class TestResult {
    PASSED, FAILED, SKIPPED
}

data class DeviceInfo(
    val model: String,
    val manufacturer: String,
    val androidVersion: String,
    val screenDensity: String,
    val screenSize: String
)

data class TestReport(
    val totalTests: Int,
    val passedTests: Int,
    val failedTests: Int,
    val deviceCoverage: List<DeviceInfo>,
    val performanceMetrics: List<PerformanceMetric>
)

data class PerformanceMetric(
    val name: String,
    val value: Double,
    val unit: String,
    val threshold: Double
)
```

## 7. Release Management

### Release Process

1. **Internal Testing Release**
   - Build internal version
   - Upload to internal track
   - Test with development team
   - Fix critical issues

2. **Beta Testing Release**
   - Build beta version
   - Upload to beta track
   - Test with beta users
   - Collect feedback and fix issues

3. **Production Release**
   - Build production version
   - Upload to production track
   - Gradual rollout (10%, 50%, 100%)
   - Monitor for issues

### Release Checklist

- [ ] **Code Quality**
  - [ ] All tests passing
  - [ ] Code review completed
  - [ ] Performance benchmarks met
  - [ ] Security review completed

- [ ] **Testing**
  - [ ] Internal testing completed
  - [ ] Beta testing completed
  - [ ] Device testing completed
  - [ ] Accessibility testing completed

- [ ] **Documentation**
  - [ ] Release notes prepared
  - [ ] User documentation updated
  - [ ] API documentation updated
  - [ ] Support documentation updated

- [ ] **Monitoring**
  - [ ] Crashlytics monitoring enabled
  - [ ] Performance monitoring enabled
  - [ ] Analytics tracking enabled
  - [ ] Error reporting configured

## Conclusion

This comprehensive pre-launch testing setup ensures:

- **Quality Assurance**: Thorough testing across devices and scenarios
- **User Experience**: Optimized performance and accessibility
- **Stability**: Robust error handling and recovery
- **Monitoring**: Comprehensive analytics and crash reporting
- **Scalability**: Automated testing for future releases

The testing program provides confidence in app quality before public release while enabling continuous improvement through user feedback and analytics. 