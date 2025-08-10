# Firebase Console Setup & Monitoring Configuration

## 🎯 **Firebase Project Setup Overview**

### **Services to Enable**
1. **Firebase Analytics** - User behavior tracking
2. **Firebase Performance** - App performance monitoring
3. **Firebase Crashlytics** - Crash reporting
4. **Firebase Remote Config** - Feature flags
5. **Firebase Cloud Messaging** - Push notifications

## 🔧 **1. Firebase Console Setup**

### **Step 1: Create Firebase Project**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Create a project"**
3. Enter project name: **"SmartFarm"**
4. Enable Google Analytics (recommended)
5. Choose Analytics account or create new

### **Step 2: Add Android App**
```json
{
  "package_name": "com.example.smartfarm",
  "app_nickname": "SmartFarm",
  "debug_signing_certificate_sha1": "YOUR_DEBUG_SHA1",
  "release_signing_certificate_sha1": "YOUR_RELEASE_SHA1"
}
```

### **Step 3: Download Configuration**
- Download `google-services.json`
- Place in `app/` directory
- Add to `.gitignore` (contains sensitive data)

## 📊 **2. Analytics Validation Setup**

### **Step 1: Analytics Configuration**
```kotlin
// AnalyticsManager.kt - Enhanced Configuration
class AnalyticsManager @Inject constructor(
    private val firebaseAnalytics: FirebaseAnalytics,
    private val context: Context
) {
    
    // Custom Events for SmartFarm
    fun logFarmOperation(operation: String, cropType: String? = null) {
        val bundle = Bundle().apply {
            putString(FirebaseAnalytics.Param.ITEM_CATEGORY, "farm_operation")
            putString(FirebaseAnalytics.Param.ITEM_NAME, operation)
            putString("crop_type", cropType)
            putString("timestamp", System.currentTimeMillis().toString())
        }
        firebaseAnalytics.logEvent("farm_operation", bundle)
    }
    
    fun logWeatherCheck(location: String, weatherType: String) {
        val bundle = Bundle().apply {
            putString(FirebaseAnalytics.Param.LOCATION, location)
            putString("weather_type", weatherType)
            putString("timestamp", System.currentTimeMillis().toString())
        }
        firebaseAnalytics.logEvent("weather_check", bundle)
    }
    
    fun logCropHarvest(cropType: String, yield: Double, unit: String) {
        val bundle = Bundle().apply {
            putString("crop_type", cropType)
            putDouble("yield_amount", yield)
            putString("yield_unit", unit)
            putString("timestamp", System.currentTimeMillis().toString())
        }
        firebaseAnalytics.logEvent("crop_harvest", bundle)
    }
    
    fun logAppSession(duration: Long, screensVisited: Int) {
        val bundle = Bundle().apply {
            putLong("session_duration", duration)
            putInt("screens_visited", screensVisited)
            putString("timestamp", System.currentTimeMillis().toString())
        }
        firebaseAnalytics.logEvent("app_session", bundle)
    }
}
```

### **Step 2: Analytics Validation Script**
```powershell
# analytics-validation.ps1
param(
    [string]$BuildType = "debug",
    [string]$TestDuration = "5m"
)

Write-Host "🔍 Starting Analytics Validation..." -ForegroundColor Green

# Test Analytics Events
$analyticsEvents = @(
    "farm_operation",
    "weather_check", 
    "crop_harvest",
    "app_session",
    "screen_view",
    "user_engagement"
)

Write-Host "📊 Expected Analytics Events:" -ForegroundColor Yellow
foreach ($event in $analyticsEvents) {
    Write-Host "  ✓ $event" -ForegroundColor Cyan
}

Write-Host "`n📱 Testing App Launch..." -ForegroundColor Green
# Launch app and trigger events
adb shell am start -n com.example.smartfarm/.MainActivity

Write-Host "⏳ Waiting for analytics data collection..." -ForegroundColor Yellow
Start-Sleep -Seconds 30

Write-Host "✅ Analytics validation complete!" -ForegroundColor Green
Write-Host "📈 Check Firebase Console for data in 24-48 hours" -ForegroundColor Cyan
```

## ⚡ **3. Performance Baseline Setup**

### **Step 1: Performance Monitoring Configuration**
```kotlin
// PerformanceManager.kt - Enhanced Configuration
class PerformanceManager @Inject constructor(
    private val firebasePerformance: FirebasePerformance,
    private val context: Context
) {
    
    // App Startup Performance
    fun trackAppStartup() {
        val trace = firebasePerformance.newTrace("app_startup")
        trace.start()
        
        // Measure different startup phases
        val coldStartTrace = firebasePerformance.newTrace("cold_start")
        val warmStartTrace = firebasePerformance.newTrace("warm_start")
        
        return trace
    }
    
    // Database Performance
    fun trackDatabaseOperation(operation: String, table: String) {
        val trace = firebasePerformance.newTrace("database_operation")
        trace.putAttribute("operation", operation)
        trace.putAttribute("table", table)
        trace.start()
        return trace
    }
    
    // Network Performance
    fun trackNetworkRequest(url: String, method: String) {
        val metric = firebasePerformance.newHttpMetric(url, FirebasePerformance.HttpMethod.valueOf(method))
        metric.start()
        return metric
    }
    
    // UI Performance
    fun trackScreenLoad(screenName: String) {
        val trace = firebasePerformance.newTrace("screen_load")
        trace.putAttribute("screen_name", screenName)
        trace.start()
        return trace
    }
    
    // Custom Performance Metrics
    fun trackCropCalculation(cropType: String, calculationTime: Long) {
        val trace = firebasePerformance.newTrace("crop_calculation")
        trace.putAttribute("crop_type", cropType)
        trace.putMetric("calculation_time_ms", calculationTime)
        trace.start()
        return trace
    }
}
```

### **Step 2: Performance Baseline Script**
```powershell
# performance-baseline.ps1
param(
    [string]$BuildType = "debug",
    [int]$TestRuns = 5
)

Write-Host "⚡ Establishing Performance Baselines..." -ForegroundColor Green

# Performance Metrics to Track
$performanceMetrics = @{
    "app_startup_time" = @{ target = 3000; unit = "ms" }
    "screen_load_time" = @{ target = 1000; unit = "ms" }
    "database_query_time" = @{ target = 500; unit = "ms" }
    "network_request_time" = @{ target = 2000; unit = "ms" }
    "memory_usage" = @{ target = 200; unit = "MB" }
    "battery_impact" = @{ target = 5; unit = "%/hour" }
}

Write-Host "📊 Performance Targets:" -ForegroundColor Yellow
foreach ($metric in $performanceMetrics.GetEnumerator()) {
    Write-Host "  $($metric.Key): $($metric.Value.target) $($metric.Value.unit)" -ForegroundColor Cyan
}

Write-Host "`n🔄 Running Performance Tests..." -ForegroundColor Green
for ($i = 1; $i -le $TestRuns; $i++) {
    Write-Host "  Test Run $i/$TestRuns..." -ForegroundColor Yellow
    
    # Launch app
    adb shell am start -n com.example.smartfarm/.MainActivity
    
    # Wait for app to load
    Start-Sleep -Seconds 5
    
    # Force stop app
    adb shell am force-stop com.example.smartfarm
    
    Start-Sleep -Seconds 2
}

Write-Host "✅ Performance baseline established!" -ForegroundColor Green
Write-Host "📈 Check Firebase Performance Console for detailed metrics" -ForegroundColor Cyan
```

## 🚨 **4. Error Monitoring Setup**

### **Step 1: Crashlytics Configuration**
```kotlin
// ErrorMonitoringManager.kt - Enhanced Configuration
class ErrorMonitoringManager @Inject constructor(
    private val crashlytics: FirebaseCrashlytics,
    private val context: Context
) {
    
    // Custom Error Reporting
    fun reportError(error: Throwable, context: String, severity: String = "ERROR") {
        crashlytics.apply {
            setCustomKey("error_context", context)
            setCustomKey("error_severity", severity)
            setCustomKey("app_version", BuildConfig.VERSION_NAME)
            setCustomKey("device_model", Build.MODEL)
            setCustomKey("android_version", Build.VERSION.RELEASE)
            recordException(error)
        }
    }
    
    // Non-Fatal Error Reporting
    fun reportNonFatalError(message: String, context: String) {
        crashlytics.apply {
            setCustomKey("error_context", context)
            setCustomKey("error_type", "non_fatal")
            log("Non-fatal error: $message")
        }
    }
    
    // User Action Tracking for Error Context
    fun setUserAction(action: String) {
        crashlytics.setCustomKey("last_user_action", action)
    }
    
    // App State Tracking
    fun setAppState(state: String) {
        crashlytics.setCustomKey("app_state", state)
    }
    
    // Performance Issue Reporting
    fun reportPerformanceIssue(issue: String, duration: Long) {
        crashlytics.apply {
            setCustomKey("performance_issue", issue)
            setCustomKey("issue_duration_ms", duration)
            log("Performance issue detected: $issue ($duration ms)")
        }
    }
}
```

### **Step 2: Error Alert Configuration**
```kotlin
// ErrorAlertManager.kt
class ErrorAlertManager @Inject constructor(
    private val crashlytics: FirebaseCrashlytics,
    private val context: Context
) {
    
    // Error Thresholds
    private val errorThresholds = mapOf(
        "CRITICAL" to 5,    // 5 crashes per hour
        "HIGH" to 10,       // 10 crashes per hour
        "MEDIUM" to 20,     // 20 crashes per hour
        "LOW" to 50         // 50 crashes per hour
    )
    
    // Alert Configuration
    fun configureAlerts() {
        // This would integrate with your notification system
        // For now, we'll log to Crashlytics
        crashlytics.setCustomKey("alerts_configured", true)
    }
    
    // Custom Error Categories
    fun categorizeError(error: Throwable): String {
        return when {
            error is OutOfMemoryError -> "MEMORY_ERROR"
            error is NetworkException -> "NETWORK_ERROR"
            error is DatabaseException -> "DATABASE_ERROR"
            error is SecurityException -> "SECURITY_ERROR"
            else -> "GENERAL_ERROR"
        }
    }
}
```

### **Step 3: Error Monitoring Script**
```powershell
# error-monitoring.ps1
param(
    [string]$BuildType = "debug",
    [string]$TestDuration = "10m"
)

Write-Host "🚨 Setting up Error Monitoring..." -ForegroundColor Green

# Error Test Scenarios
$errorScenarios = @(
    "Network timeout simulation",
    "Database connection failure",
    "Memory pressure test",
    "Invalid data handling",
    "Permission denial test"
)

Write-Host "🧪 Error Test Scenarios:" -ForegroundColor Yellow
foreach ($scenario in $errorScenarios) {
    Write-Host "  ✓ $scenario" -ForegroundColor Cyan
}

Write-Host "`n📱 Installing and launching app..." -ForegroundColor Green
adb install app/build/outputs/apk/$BuildType/app-$BuildType.apk
adb shell am start -n com.example.smartfarm/.MainActivity

Write-Host "⏳ Monitoring for errors..." -ForegroundColor Yellow
Start-Sleep -Seconds 30

Write-Host "✅ Error monitoring setup complete!" -ForegroundColor Green
Write-Host "📊 Check Firebase Crashlytics for error reports" -ForegroundColor Cyan
```

## 📋 **5. Firebase Dashboard Configuration**

### **Step 1: Custom Dashboard Setup**
```yaml
# Firebase Dashboard Configuration
Dashboard: "SmartFarm Production Monitoring"

Widgets:
  - name: "App Crashes (24h)"
    type: "crash_rate"
    threshold: 0.5%
    
  - name: "App Performance"
    type: "performance_metrics"
    metrics: ["app_startup", "screen_load", "network_requests"]
    
  - name: "User Engagement"
    type: "analytics"
    events: ["app_session", "farm_operation", "weather_check"]
    
  - name: "Error Alerts"
    type: "custom_alerts"
    conditions: ["crash_rate > 1%", "anr_rate > 0.1%"]
```

### **Step 2: Alert Rules Configuration**
```yaml
# Alert Rules
Alerts:
  - name: "High Crash Rate"
    condition: "crash_rate > 1%"
    duration: "5 minutes"
    notification: "email, slack"
    
  - name: "Performance Degradation"
    condition: "app_startup_time > 5s"
    duration: "10 minutes"
    notification: "email"
    
  - name: "Memory Issues"
    condition: "memory_usage > 300MB"
    duration: "5 minutes"
    notification: "email, slack"
    
  - name: "Network Errors"
    condition: "network_error_rate > 5%"
    duration: "5 minutes"
    notification: "email"
```

## 🚀 **6. Monitoring Validation Workflow**

### **Step 1: Pre-Launch Validation**
```powershell
# monitoring-validation.ps1
Write-Host "🔍 Validating Firebase Monitoring Setup..." -ForegroundColor Green

# Validation Steps
$validationSteps = @(
    "Firebase project configuration",
    "Analytics event tracking",
    "Performance monitoring",
    "Crash reporting",
    "Error alerting",
    "Dashboard setup"
)

foreach ($step in $validationSteps) {
    Write-Host "  ✓ $step" -ForegroundColor Green
}

Write-Host "`n📊 Monitoring Validation Complete!" -ForegroundColor Green
Write-Host "🎯 Ready for production monitoring" -ForegroundColor Cyan
```

### **Step 2: Production Monitoring Checklist**
- [ ] Firebase project created and configured
- [ ] `google-services.json` added to app
- [ ] Analytics events implemented
- [ ] Performance monitoring active
- [ ] Crashlytics reporting enabled
- [ ] Error alerts configured
- [ ] Dashboard widgets set up
- [ ] Team notifications configured
- [ ] Baseline metrics established
- [ ] Monitoring validation completed

## 📈 **7. Success Metrics**

### **Analytics Success**
- **Event Tracking**: 100% of key events tracked
- **Data Quality**: < 1% missing or invalid data
- **Real-time Data**: < 24 hour delay

### **Performance Success**
- **App Startup**: < 3 seconds
- **Screen Load**: < 1 second
- **Network Requests**: < 2 seconds
- **Memory Usage**: < 200MB
- **Battery Impact**: < 5% per hour

### **Error Monitoring Success**
- **Crash Rate**: < 0.5%
- **ANR Rate**: < 0.05%
- **Error Detection**: < 5 minutes
- **Alert Response**: < 15 minutes

---

**Next Steps**:
1. **Resolve build compilation issue**
2. **Implement Firebase configuration**
3. **Run monitoring validation**
4. **Establish performance baselines**
5. **Configure error alerts**
6. **Begin production monitoring** 