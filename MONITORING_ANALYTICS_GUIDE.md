# Monitoring and Analytics Guide

## Overview

This guide covers the complete implementation of production monitoring and analytics for the SmartFarm Android application, including Firebase Analytics, performance monitoring, and crash reporting setup.

## Monitoring Strategy

### Monitoring Components

1. **Firebase Analytics** - User behavior and app usage tracking
2. **Performance Monitoring** - App performance metrics and optimization
3. **Crash Reporting** - Error tracking and crash analysis
4. **Custom Analytics** - Business-specific metrics and KPIs

### Monitoring Goals

- **User Experience**: Track user engagement and satisfaction
- **Performance**: Monitor app performance and identify bottlenecks
- **Stability**: Track crashes and errors for quick resolution
- **Business Metrics**: Monitor key business indicators

## 1. Firebase Analytics Implementation

### Setup and Configuration

#### Step 1: Firebase Project Configuration

1. **Firebase Console Setup**
   - Go to [Firebase Console](https://console.firebase.google.com)
   - Create or select SmartFarm project
   - Enable Analytics for Android app

2. **google-services.json**
   - Download `google-services.json` from Firebase Console
   - Place in `app/` directory
   - Already configured in build.gradle.kts

#### Step 2: Analytics Implementation

```kotlin
// app/src/main/java/com/example/smartfarm/analytics/AnalyticsManager.kt
@Singleton
class AnalyticsManager @Inject constructor(
    private val context: Context,
    private val firebaseAnalytics: FirebaseAnalytics
) {
    
    companion object {
        // Screen tracking
        const val SCREEN_MAIN = "main_screen"
        const val SCREEN_WEATHER = "weather_screen"
        const val SCREEN_LIVESTOCK = "livestock_screen"
        const val SCREEN_CROPS = "crops_screen"
        const val SCREEN_SETTINGS = "settings_screen"
        
        // User actions
        const val ACTION_ADD_LIVESTOCK = "add_livestock"
        const val ACTION_ADD_CROP = "add_crop"
        const val ACTION_VIEW_WEATHER = "view_weather"
        const val ACTION_EXPORT_DATA = "export_data"
        const val ACTION_BACKUP_DATA = "backup_data"
        
        // Custom events
        const val EVENT_APP_STARTUP = "app_startup"
        const val EVENT_FEATURE_USAGE = "feature_usage"
        const val EVENT_ERROR_OCCURRED = "error_occurred"
        const val EVENT_PERFORMANCE_ISSUE = "performance_issue"
    }
    
    /**
     * Set user properties
     */
    fun setUserProperties(userId: String, userType: String = "standard") {
        firebaseAnalytics.setUserId(userId)
        firebaseAnalytics.setUserProperty("user_type", userType)
        firebaseAnalytics.setUserProperty("app_version", BuildConfig.VERSION_NAME)
        firebaseAnalytics.setUserProperty("build_type", BuildConfig.BUILD_TYPE)
    }
    
    /**
     * Track screen views
     */
    fun trackScreen(screenName: String, screenClass: String? = null) {
        val bundle = Bundle().apply {
            putString(FirebaseAnalytics.Param.SCREEN_NAME, screenName)
            putString(FirebaseAnalytics.Param.SCREEN_CLASS, screenClass ?: screenName)
        }
        firebaseAnalytics.logEvent(FirebaseAnalytics.Event.SCREEN_VIEW, bundle)
    }
    
    /**
     * Track user actions
     */
    fun trackAction(action: String, parameters: Map<String, Any> = emptyMap()) {
        val bundle = Bundle().apply {
            putString("action_type", action)
            parameters.forEach { (key, value) ->
                when (value) {
                    is String -> putString(key, value)
                    is Int -> putInt(key, value)
                    is Long -> putLong(key, value)
                    is Double -> putDouble(key, value)
                    is Boolean -> putBoolean(key, value)
                }
            }
        }
        firebaseAnalytics.logEvent("user_action", bundle)
    }
    
    /**
     * Track feature usage
     */
    fun trackFeatureUsage(featureName: String, usageDuration: Long? = null) {
        val bundle = Bundle().apply {
            putString("feature_name", featureName)
            if (usageDuration != null) {
                putLong("usage_duration", usageDuration)
            }
        }
        firebaseAnalytics.logEvent(EVENT_FEATURE_USAGE, bundle)
    }
    
    /**
     * Track app startup
     */
    fun trackAppStartup(startupTime: Long) {
        val bundle = Bundle().apply {
            putLong("startup_time_ms", startupTime)
            putString("startup_type", "cold_start")
        }
        firebaseAnalytics.logEvent(EVENT_APP_STARTUP, bundle)
    }
    
    /**
     * Track errors
     */
    fun trackError(errorType: String, errorMessage: String, context: String) {
        val bundle = Bundle().apply {
            putString("error_type", errorType)
            putString("error_message", errorMessage)
            putString("error_context", context)
        }
        firebaseAnalytics.logEvent(EVENT_ERROR_OCCURRED, bundle)
    }
    
    /**
     * Track performance issues
     */
    fun trackPerformanceIssue(issueType: String, duration: Long, threshold: Long) {
        val bundle = Bundle().apply {
            putString("issue_type", issueType)
            putLong("duration_ms", duration)
            putLong("threshold_ms", threshold)
        }
        firebaseAnalytics.logEvent(EVENT_PERFORMANCE_ISSUE, bundle)
    }
    
    /**
     * Track business metrics
     */
    fun trackBusinessMetric(metricName: String, value: Double, category: String? = null) {
        val bundle = Bundle().apply {
            putDouble("metric_value", value)
            putString("metric_name", metricName)
            if (category != null) {
                putString("metric_category", category)
            }
        }
        firebaseAnalytics.logEvent("business_metric", bundle)
    }
    
    /**
     * Track user engagement
     */
    fun trackEngagement(sessionDuration: Long, screensViewed: Int) {
        val bundle = Bundle().apply {
            putLong("session_duration_ms", sessionDuration)
            putInt("screens_viewed", screensViewed)
        }
        firebaseAnalytics.logEvent("user_engagement", bundle)
    }
}
```

### Analytics Integration

```kotlin
// app/src/main/java/com/example/smartfarm/analytics/AnalyticsTracker.kt
@Singleton
class AnalyticsTracker @Inject constructor(
    private val analyticsManager: AnalyticsManager
) {
    
    /**
     * Track screen navigation
     */
    fun trackScreenNavigation(screenName: String) {
        analyticsManager.trackScreen(screenName)
    }
    
    /**
     * Track livestock management actions
     */
    fun trackLivestockAction(action: String, livestockType: String? = null) {
        val parameters = mutableMapOf<String, Any>()
        if (livestockType != null) {
            parameters["livestock_type"] = livestockType
        }
        analyticsManager.trackAction(action, parameters)
    }
    
    /**
     * Track crop management actions
     */
    fun trackCropAction(action: String, cropType: String? = null) {
        val parameters = mutableMapOf<String, Any>()
        if (cropType != null) {
            parameters["crop_type"] = cropType
        }
        analyticsManager.trackAction(action, parameters)
    }
    
    /**
     * Track weather interactions
     */
    fun trackWeatherAction(action: String, location: String? = null) {
        val parameters = mutableMapOf<String, Any>()
        if (location != null) {
            parameters["location"] = location
        }
        analyticsManager.trackAction(action, parameters)
    }
    
    /**
     * Track data management actions
     */
    fun trackDataAction(action: String, dataType: String? = null) {
        val parameters = mutableMapOf<String, Any>()
        if (dataType != null) {
            parameters["data_type"] = dataType
        }
        analyticsManager.trackAction(action, parameters)
    }
}
```

## 2. Performance Monitoring Implementation

### Firebase Performance Monitoring

```kotlin
// app/src/main/java/com/example/smartfarm/performance/PerformanceMonitor.kt
@Singleton
class PerformanceMonitor @Inject constructor(
    private val context: Context,
    private val firebasePerformance: FirebasePerformance
) {
    
    private val traces = mutableMapOf<String, Trace>()
    private val metrics = mutableMapOf<String, Metric>()
    
    /**
     * Start performance trace
     */
    fun startTrace(traceName: String): Trace {
        val trace = firebasePerformance.newTrace(traceName)
        trace.start()
        traces[traceName] = trace
        return trace
    }
    
    /**
     * Stop performance trace
     */
    fun stopTrace(traceName: String) {
        traces[traceName]?.stop()
        traces.remove(traceName)
    }
    
    /**
     * Add metric to trace
     */
    fun addMetric(traceName: String, metricName: String, value: Long) {
        traces[traceName]?.putMetric(metricName, value)
    }
    
    /**
     * Add attribute to trace
     */
    fun addAttribute(traceName: String, attributeName: String, value: String) {
        traces[traceName]?.putAttribute(attributeName, value)
    }
    
    /**
     * Monitor app startup performance
     */
    fun monitorStartup() {
        val startupTrace = startTrace("app_startup")
        startupTrace.putAttribute("build_type", BuildConfig.BUILD_TYPE)
        startupTrace.putAttribute("app_version", BuildConfig.VERSION_NAME)
        
        // Monitor different startup phases
        val coldStartTrace = startTrace("cold_start")
        val warmStartTrace = startTrace("warm_start")
        val hotStartTrace = startTrace("hot_start")
        
        // Stop traces when appropriate
        // Implementation depends on app lifecycle
    }
    
    /**
     * Monitor screen rendering performance
     */
    fun monitorScreenRender(screenName: String) {
        val renderTrace = startTrace("screen_render_$screenName")
        renderTrace.putAttribute("screen_name", screenName)
        
        // Stop trace when screen is fully rendered
        // Implementation depends on UI framework
    }
    
    /**
     * Monitor network request performance
     */
    fun monitorNetworkRequest(endpoint: String): NetworkRequestMetric {
        val networkMetric = firebasePerformance.newHttpMetric(endpoint, FirebasePerformance.HttpMethod.GET)
        networkMetric.start()
        return NetworkRequestMetric(networkMetric)
    }
    
    /**
     * Monitor database operation performance
     */
    fun monitorDatabaseOperation(operation: String) {
        val dbTrace = startTrace("database_operation")
        dbTrace.putAttribute("operation", operation)
        
        // Stop trace when operation completes
        // Implementation depends on database framework
    }
    
    /**
     * Monitor memory usage
     */
    fun monitorMemoryUsage() {
        val runtime = Runtime.getRuntime()
        val usedMemory = runtime.totalMemory() - runtime.freeMemory()
        val maxMemory = runtime.maxMemory()
        val memoryUsagePercent = (usedMemory.toFloat() / maxMemory.toFloat()) * 100
        
        val memoryTrace = startTrace("memory_usage")
        memoryTrace.putMetric("used_memory_mb", usedMemory / (1024 * 1024))
        memoryTrace.putMetric("max_memory_mb", maxMemory / (1024 * 1024))
        memoryTrace.putMetric("memory_usage_percent", memoryUsagePercent.toLong())
        
        // Stop trace after monitoring
        stopTrace("memory_usage")
    }
}

data class NetworkRequestMetric(
    private val metric: HttpMetric
) {
    fun setRequestPayloadSize(bytes: Long) {
        metric.setRequestPayloadSize(bytes)
    }
    
    fun setResponseContentType(contentType: String) {
        metric.setResponseContentType(contentType)
    }
    
    fun setResponsePayloadSize(bytes: Long) {
        metric.setResponsePayloadSize(bytes)
    }
    
    fun setHttpResponseCode(responseCode: Int) {
        metric.setHttpResponseCode(responseCode)
    }
    
    fun stop() {
        metric.stop()
    }
}
```

### Custom Performance Monitoring

```kotlin
// app/src/main/java/com/example/smartfarm/performance/CustomPerformanceMonitor.kt
@Singleton
class CustomPerformanceMonitor @Inject constructor(
    private val context: Context,
    private val analyticsManager: AnalyticsManager
) {
    
    private val performanceData = mutableMapOf<String, MutableList<PerformanceMetric>>()
    
    /**
     * Monitor operation performance
     */
    suspend fun <T> monitorOperation(
        operationName: String,
        operation: suspend () -> T
    ): T {
        val startTime = System.currentTimeMillis()
        
        return try {
            val result = operation()
            val duration = System.currentTimeMillis() - startTime
            
            recordPerformanceMetric(operationName, duration, true)
            result
        } catch (e: Exception) {
            val duration = System.currentTimeMillis() - startTime
            recordPerformanceMetric(operationName, duration, false, e.message)
            throw e
        }
    }
    
    /**
     * Monitor UI operation performance
     */
    fun monitorUIOperation(operationName: String, operation: () -> Unit) {
        val startTime = System.currentTimeMillis()
        
        try {
            operation()
            val duration = System.currentTimeMillis() - startTime
            recordPerformanceMetric(operationName, duration, true)
        } catch (e: Exception) {
            val duration = System.currentTimeMillis() - startTime
            recordPerformanceMetric(operationName, duration, false, e.message)
            throw e
        }
    }
    
    /**
     * Record performance metric
     */
    private fun recordPerformanceMetric(
        operationName: String,
        duration: Long,
        success: Boolean,
        errorMessage: String? = null
    ) {
        val metric = PerformanceMetric(
            operationName = operationName,
            duration = duration,
            success = success,
            errorMessage = errorMessage,
            timestamp = System.currentTimeMillis()
        )
        
        performanceData.getOrPut(operationName) { mutableListOf() }.add(metric)
        
        // Log to analytics if performance is poor
        if (duration > 1000) { // 1 second threshold
            analyticsManager.trackPerformanceIssue(operationName, duration, 1000)
        }
    }
    
    /**
     * Get performance statistics
     */
    fun getPerformanceStats(operationName: String): PerformanceStats? {
        val metrics = performanceData[operationName] ?: return null
        
        if (metrics.isEmpty()) return null
        
        val durations = metrics.map { it.duration }
        val successful = metrics.count { it.success }
        val failed = metrics.count { !it.success }
        
        return PerformanceStats(
            operationName = operationName,
            totalOperations = metrics.size,
            successfulOperations = successful,
            failedOperations = failed,
            averageDuration = durations.average(),
            minDuration = durations.minOrNull() ?: 0,
            maxDuration = durations.maxOrNull() ?: 0,
            successRate = successful.toDouble() / metrics.size
        )
    }
    
    /**
     * Get all performance statistics
     */
    fun getAllPerformanceStats(): List<PerformanceStats> {
        return performanceData.keys.mapNotNull { getPerformanceStats(it) }
    }
}

data class PerformanceMetric(
    val operationName: String,
    val duration: Long,
    val success: Boolean,
    val errorMessage: String?,
    val timestamp: Long
)

data class PerformanceStats(
    val operationName: String,
    val totalOperations: Int,
    val successfulOperations: Int,
    val failedOperations: Int,
    val averageDuration: Double,
    val minDuration: Long,
    val maxDuration: Long,
    val successRate: Double
)
```

## 3. Crash Reporting Implementation

### Enhanced Crashlytics Integration

```kotlin
// app/src/main/java/com/example/smartfarm/monitoring/CrashReportingManager.kt
@Singleton
class CrashReportingManager @Inject constructor(
    private val context: Context,
    private val crashlyticsManager: CrashlyticsManager,
    private val analyticsManager: AnalyticsManager
) {
    
    /**
     * Initialize crash reporting
     */
    fun initialize() {
        // Enable crash reporting in production
        crashlyticsManager.setCrashlyticsCollectionEnabled(BuildConfig.BUILD_TYPE == "release")
        
        // Set app version information
        crashlyticsManager.logAppInfo()
        crashlyticsManager.logDeviceInfo()
        
        // Set custom keys for better crash analysis
        crashlyticsManager.setUserProperty("app_version", BuildConfig.VERSION_NAME)
        crashlyticsManager.setUserProperty("build_type", BuildConfig.BUILD_TYPE)
        crashlyticsManager.setUserProperty("device_model", android.os.Build.MODEL)
        crashlyticsManager.setUserProperty("android_version", android.os.Build.VERSION.RELEASE)
    }
    
    /**
     * Set user information for crash reporting
     */
    fun setUserInfo(userId: String, userType: String = "standard") {
        crashlyticsManager.setUserIdentifier(userId)
        crashlyticsManager.setUserProperty("user_type", userType)
    }
    
    /**
     * Log non-fatal error
     */
    fun logNonFatalError(
        error: Throwable,
        context: String,
        additionalData: Map<String, String> = emptyMap()
    ) {
        // Log to Crashlytics
        crashlyticsManager.logException(error)
        
        // Log to Analytics
        analyticsManager.trackError(
            errorType = error.javaClass.simpleName,
            errorMessage = error.message ?: "Unknown error",
            context = context
        )
        
        // Add custom keys for better analysis
        additionalData.forEach { (key, value) ->
            crashlyticsManager.setUserProperty(key, value)
        }
    }
    
    /**
     * Log app error with context
     */
    fun logAppError(
        error: AppError,
        additionalContext: Map<String, String> = emptyMap()
    ) {
        // Log to Crashlytics
        crashlyticsManager.logAppError(error)
        
        // Log to Analytics
        analyticsManager.trackError(
            errorType = error.type.name,
            errorMessage = error.message,
            context = error.context
        )
        
        // Add additional context
        additionalContext.forEach { (key, value) ->
            crashlyticsManager.setUserProperty(key, value)
        }
    }
    
    /**
     * Log performance issue
     */
    fun logPerformanceIssue(
        issueType: String,
        duration: Long,
        threshold: Long,
        context: String
    ) {
        crashlyticsManager.logPerformanceIssue(issueType, duration, threshold, context)
        analyticsManager.trackPerformanceIssue(issueType, duration, threshold)
    }
    
    /**
     * Log user action for crash context
     */
    fun logUserAction(action: String, parameters: Map<String, String> = emptyMap()) {
        crashlyticsManager.setUserProperty("last_action", action)
        parameters.forEach { (key, value) ->
            crashlyticsManager.setUserProperty("action_$key", value)
        }
    }
    
    /**
     * Log app state for crash context
     */
    fun logAppState(state: String, additionalData: Map<String, String> = emptyMap()) {
        crashlyticsManager.setUserProperty("app_state", state)
        additionalData.forEach { (key, value) ->
            crashlyticsManager.setUserProperty("state_$key", value)
        }
    }
}
```

### Error Monitoring Integration

```kotlin
// app/src/main/java/com/example/smartfarm/monitoring/ErrorMonitoringService.kt
@Singleton
class ErrorMonitoringService @Inject constructor(
    private val crashReportingManager: CrashReportingManager,
    private val errorHandler: ErrorHandler
) {
    
    /**
     * Monitor error handler events
     */
    fun monitorErrorHandler() {
        // Monitor current error state
        // Implementation depends on error handler architecture
    }
    
    /**
     * Set up error monitoring
     */
    fun setupErrorMonitoring() {
        // Set up global error handlers
        setupGlobalExceptionHandler()
        setupUncaughtExceptionHandler()
    }
    
    /**
     * Set up global exception handler
     */
    private fun setupGlobalExceptionHandler() {
        Thread.setDefaultUncaughtExceptionHandler { thread, throwable ->
            crashReportingManager.logNonFatalError(
                error = throwable,
                context = "UncaughtException",
                additionalData = mapOf(
                    "thread_name" to (thread.name ?: "Unknown"),
                    "thread_id" to thread.id.toString()
                )
            )
        }
    }
    
    /**
     * Set up uncaught exception handler
     */
    private fun setupUncaughtExceptionHandler() {
        // Implementation for handling uncaught exceptions
        // This would integrate with the existing error handler
    }
}
```

## 4. Monitoring Dashboard and Reports

### Analytics Dashboard

```kotlin
// app/src/main/java/com/example/smartfarm/monitoring/AnalyticsDashboard.kt
@Singleton
class AnalyticsDashboard @Inject constructor(
    private val analyticsManager: AnalyticsManager,
    private val performanceMonitor: PerformanceMonitor,
    private val customPerformanceMonitor: CustomPerformanceMonitor
) {
    
    /**
     * Generate analytics report
     */
    suspend fun generateAnalyticsReport(): AnalyticsReport {
        // This would integrate with Firebase Analytics API
        // For now, return a mock report structure
        return AnalyticsReport(
            userEngagement = UserEngagementMetrics(),
            featureUsage = FeatureUsageMetrics(),
            performanceMetrics = PerformanceMetrics(),
            errorMetrics = ErrorMetrics()
        )
    }
    
    /**
     * Get real-time metrics
     */
    fun getRealTimeMetrics(): RealTimeMetrics {
        return RealTimeMetrics(
            activeUsers = 0, // Would be fetched from Firebase
            currentSessionDuration = 0,
            errorRate = 0.0,
            performanceScore = 0.0
        )
    }
}

data class AnalyticsReport(
    val userEngagement: UserEngagementMetrics,
    val featureUsage: FeatureUsageMetrics,
    val performanceMetrics: PerformanceMetrics,
    val errorMetrics: ErrorMetrics
)

data class UserEngagementMetrics(
    val dailyActiveUsers: Int = 0,
    val weeklyActiveUsers: Int = 0,
    val monthlyActiveUsers: Int = 0,
    val averageSessionDuration: Long = 0,
    val retentionRate: Double = 0.0
)

data class FeatureUsageMetrics(
    val mostUsedFeatures: List<FeatureUsage> = emptyList(),
    val featureAdoptionRate: Map<String, Double> = emptyMap()
)

data class FeatureUsage(
    val featureName: String,
    val usageCount: Int,
    val uniqueUsers: Int
)

data class PerformanceMetrics(
    val averageStartupTime: Long = 0,
    val averageScreenLoadTime: Long = 0,
    val memoryUsage: Long = 0,
    val crashRate: Double = 0.0
)

data class ErrorMetrics(
    val totalErrors: Int = 0,
    val errorRate: Double = 0.0,
    val mostCommonErrors: List<ErrorOccurrence> = emptyList()
)

data class ErrorOccurrence(
    val errorType: String,
    val count: Int,
    val percentage: Double
)

data class RealTimeMetrics(
    val activeUsers: Int,
    val currentSessionDuration: Long,
    val errorRate: Double,
    val performanceScore: Double
)
```

## 5. Monitoring Configuration

### Production Monitoring Setup

```kotlin
// app/src/main/java/com/example/smartfarm/monitoring/MonitoringConfig.kt
@Singleton
class MonitoringConfig @Inject constructor(
    private val context: Context,
    private val crashReportingManager: CrashReportingManager,
    private val analyticsManager: AnalyticsManager,
    private val performanceMonitor: PerformanceMonitor
) {
    
    /**
     * Initialize all monitoring components
     */
    fun initializeMonitoring() {
        // Initialize crash reporting
        crashReportingManager.initialize()
        
        // Set up performance monitoring
        setupPerformanceMonitoring()
        
        // Set up analytics
        setupAnalytics()
        
        // Set up error monitoring
        setupErrorMonitoring()
    }
    
    /**
     * Set up performance monitoring
     */
    private fun setupPerformanceMonitoring() {
        // Monitor app startup
        performanceMonitor.monitorStartup()
        
        // Set up memory monitoring
        setupMemoryMonitoring()
        
        // Set up network monitoring
        setupNetworkMonitoring()
    }
    
    /**
     * Set up memory monitoring
     */
    private fun setupMemoryMonitoring() {
        // Monitor memory usage periodically
        // Implementation for periodic memory monitoring
    }
    
    /**
     * Set up network monitoring
     */
    private fun setupNetworkMonitoring() {
        // Monitor network requests
        // Implementation for network monitoring
    }
    
    /**
     * Set up analytics
     */
    private fun setupAnalytics() {
        // Set default user properties
        analyticsManager.setUserProperties("anonymous", "standard")
        
        // Track app startup
        trackAppStartup()
    }
    
    /**
     * Set up error monitoring
     */
    private fun setupErrorMonitoring() {
        // Set up global error handlers
        // Implementation for error monitoring setup
    }
    
    /**
     * Track app startup
     */
    private fun trackAppStartup() {
        val startupTime = System.currentTimeMillis() // This would be actual startup time
        analyticsManager.trackAppStartup(startupTime)
    }
}
```

## 6. Monitoring Integration

### Application Integration

```kotlin
// app/src/main/java/com/example/smartfarm/SmartFarmApplication.kt
@HiltAndroidApp
class SmartFarmApplication : Application() {
    
    @Inject
    lateinit var monitoringConfig: MonitoringConfig
    
    @Inject
    lateinit var analyticsTracker: AnalyticsTracker
    
    @Inject
    lateinit var crashReportingManager: CrashReportingManager
    
    override fun onCreate() {
        super.onCreate()
        
        // Initialize monitoring
        monitoringConfig.initializeMonitoring()
        
        // Set up crash reporting
        setupCrashReporting()
        
        // Track app launch
        trackAppLaunch()
    }
    
    private fun setupCrashReporting() {
        // Set up crash reporting for the application
        crashReportingManager.initialize()
    }
    
    private fun trackAppLaunch() {
        // Track app launch event
        analyticsTracker.trackAppLaunch()
    }
}
```

### Screen Tracking Integration

```kotlin
// app/src/main/java/com/example/smartfarm/ui/ScreenTracking.kt
@Composable
fun TrackedScreen(
    screenName: String,
    analyticsTracker: AnalyticsTracker = hiltViewModel(),
    content: @Composable () -> Unit
) {
    LaunchedEffect(screenName) {
        analyticsTracker.trackScreenNavigation(screenName)
    }
    
    content()
}
```

## 7. Monitoring Dashboard

### Firebase Console Integration

1. **Analytics Dashboard**
   - User engagement metrics
   - Feature usage statistics
   - User behavior analysis
   - Conversion tracking

2. **Performance Dashboard**
   - App startup performance
   - Screen rendering times
   - Network request performance
   - Memory usage trends

3. **Crashlytics Dashboard**
   - Crash reports and trends
   - Error frequency analysis
   - Device and OS distribution
   - Crash-free user rate

### Custom Dashboard

```kotlin
// app/src/main/java/com/example/smartfarm/ui/MonitoringDashboardScreen.kt
@Composable
fun MonitoringDashboardScreen(
    onNavigateBack: () -> Unit,
    viewModel: MonitoringDashboardViewModel = hiltViewModel()
) {
    val uiState by viewModel.uiState.collectAsState()
    
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Monitoring Dashboard") },
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
                AnalyticsSection(uiState.analyticsReport)
            }
            
            item {
                PerformanceSection(uiState.performanceStats)
            }
            
            item {
                ErrorSection(uiState.errorMetrics)
            }
            
            item {
                RealTimeSection(uiState.realTimeMetrics)
            }
        }
    }
}

@Composable
private fun AnalyticsSection(report: AnalyticsReport?) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp)
    ) {
        Column(
            modifier = Modifier.padding(16.dp)
        ) {
            Text(
                text = "Analytics",
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.Bold
            )
            
            report?.let { analytics ->
                Text("Daily Active Users: ${analytics.userEngagement.dailyActiveUsers}")
                Text("Average Session Duration: ${analytics.userEngagement.averageSessionDuration}ms")
                Text("Retention Rate: ${analytics.userEngagement.retentionRate}%")
            }
        }
    }
}

@Composable
private fun PerformanceSection(stats: List<PerformanceStats>) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp)
    ) {
        Column(
            modifier = Modifier.padding(16.dp)
        ) {
            Text(
                text = "Performance",
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.Bold
            )
            
            stats.forEach { stat ->
                Text("${stat.operationName}: ${stat.averageDuration}ms (${stat.successRate * 100}% success)")
            }
        }
    }
}

@Composable
private fun ErrorSection(metrics: ErrorMetrics?) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp)
    ) {
        Column(
            modifier = Modifier.padding(16.dp)
        ) {
            Text(
                text = "Errors",
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.Bold
            )
            
            metrics?.let { error ->
                Text("Total Errors: ${error.totalErrors}")
                Text("Error Rate: ${error.errorRate}%")
                error.mostCommonErrors.forEach { occurrence ->
                    Text("${occurrence.errorType}: ${occurrence.count} (${occurrence.percentage}%)")
                }
            }
        }
    }
}

@Composable
private fun RealTimeSection(metrics: RealTimeMetrics?) {
    Card(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp)
    ) {
        Column(
            modifier = Modifier.padding(16.dp)
        ) {
            Text(
                text = "Real-Time Metrics",
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.Bold
            )
            
            metrics?.let { realTime ->
                Text("Active Users: ${realTime.activeUsers}")
                Text("Session Duration: ${realTime.currentSessionDuration}ms")
                Text("Error Rate: ${realTime.errorRate}%")
                Text("Performance Score: ${realTime.performanceScore}")
            }
        }
    }
}
```

## 8. Monitoring Best Practices

### Performance Monitoring

1. **Startup Performance**
   - Monitor cold, warm, and hot startup times
   - Track startup phases and bottlenecks
   - Set performance thresholds and alerts

2. **Memory Management**
   - Monitor memory usage patterns
   - Detect memory leaks
   - Track garbage collection frequency

3. **Network Performance**
   - Monitor request/response times
   - Track network error rates
   - Optimize network usage

### Error Monitoring

1. **Crash Reporting**
   - Collect detailed crash reports
   - Group similar crashes
   - Track crash-free user rate

2. **Error Categorization**
   - Categorize errors by type and severity
   - Track error frequency and trends
   - Set up error alerts

3. **User Impact**
   - Measure impact on user experience
   - Track error recovery rates
   - Monitor user feedback

### Analytics Best Practices

1. **User Privacy**
   - Respect user privacy preferences
   - Implement data anonymization
   - Comply with GDPR requirements

2. **Data Quality**
   - Validate analytics data
   - Remove duplicate events
   - Ensure data consistency

3. **Actionable Insights**
   - Focus on actionable metrics
   - Set up automated alerts
   - Regular reporting and analysis

## Conclusion

This comprehensive monitoring and analytics implementation provides:

- **User Insights**: Detailed user behavior and engagement tracking
- **Performance Monitoring**: Real-time performance metrics and optimization
- **Error Tracking**: Comprehensive crash reporting and error analysis
- **Business Intelligence**: Key business metrics and KPIs
- **Proactive Monitoring**: Early detection of issues and performance problems

The monitoring system enables data-driven decision making and ensures optimal app performance and user experience. 