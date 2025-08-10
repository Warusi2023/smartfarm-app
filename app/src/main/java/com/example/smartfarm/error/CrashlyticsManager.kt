package com.example.smartfarm.error

import android.content.Context
import com.google.firebase.crashlytics.FirebaseCrashlytics
import com.google.firebase.analytics.FirebaseAnalytics
import javax.inject.Inject
import javax.inject.Singleton
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

@Singleton
class CrashlyticsManager @Inject constructor(
    private val context: Context
) {
    
    private val crashlytics = FirebaseCrashlytics.getInstance()
    private val analytics = FirebaseAnalytics.getInstance(context)
    private val scope = CoroutineScope(Dispatchers.IO)
    
    /**
     * Set user identifier for crash reporting
     */
    fun setUserIdentifier(userId: String) {
        crashlytics.setUserId(userId)
        analytics.setUserId(userId)
    }
    
    /**
     * Set custom user properties
     */
    fun setUserProperty(key: String, value: String) {
        crashlytics.setCustomKey(key, value)
        analytics.setUserProperty(key, value)
    }
    
    /**
     * Log exception to Crashlytics
     */
    fun logException(throwable: Throwable) {
        crashlytics.recordException(throwable)
    }
    
    /**
     * Log app error with custom keys
     */
    fun logAppError(appError: AppError) {
        crashlytics.setCustomKey("error_type", appError.type.name)
        crashlytics.setCustomKey("error_message", appError.message)
        crashlytics.setCustomKey("error_severity", appError.severity.name)
        crashlytics.setCustomKey("error_recoverable", appError.recoverable)
        crashlytics.setCustomKey("error_timestamp", appError.timestamp)
        
        appError.stackTrace?.let { 
            crashlytics.recordException(Exception(appError.message))
        }
        
        // Log to analytics as well
        scope.launch {
            logAnalyticsEvent("app_error", mapOf(
                "error_type" to appError.type.name,
                "error_message" to appError.message,
                "error_severity" to appError.severity.name,
                "error_recoverable" to appError.recoverable
            ))
        }
    }
    
    /**
     * Log performance issue
     */
    fun logPerformanceIssue(
        issue: String,
        duration: Long,
        threshold: Long,
        context: String = "Unknown"
    ) {
        crashlytics.setCustomKey("performance_issue", issue)
        crashlytics.setCustomKey("performance_duration", duration)
        crashlytics.setCustomKey("performance_threshold", threshold)
        crashlytics.setCustomKey("performance_context", context)
        
        if (duration > threshold) {
            crashlytics.recordException(
                Exception("Performance issue: $issue took ${duration}ms (threshold: ${threshold}ms)")
            )
        }
    }
    
    /**
     * Log network error
     */
    fun logNetworkError(
        endpoint: String,
        statusCode: Int?,
        errorMessage: String,
        throwable: Throwable? = null
    ) {
        crashlytics.setCustomKey("network_endpoint", endpoint)
        crashlytics.setCustomKey("network_status_code", statusCode ?: -1)
        crashlytics.setCustomKey("network_error_message", errorMessage)
        
        throwable?.let { crashlytics.recordException(it) }
        
        scope.launch {
            logAnalyticsEvent("network_error", mapOf(
                "endpoint" to endpoint,
                "status_code" to (statusCode ?: -1),
                "error_message" to errorMessage
            ))
        }
    }
    
    /**
     * Log database error
     */
    fun logDatabaseError(
        operation: String,
        table: String?,
        errorMessage: String,
        throwable: Throwable? = null
    ) {
        crashlytics.setCustomKey("database_operation", operation)
        crashlytics.setCustomKey("database_table", table ?: "unknown")
        crashlytics.setCustomKey("database_error_message", errorMessage)
        
        throwable?.let { crashlytics.recordException(it) }
        
        scope.launch {
            logAnalyticsEvent("database_error", mapOf(
                "operation" to operation,
                "table" to (table ?: "unknown"),
                "error_message" to errorMessage
            ))
        }
    }
    
    /**
     * Log authentication error
     */
    fun logAuthenticationError(
        method: String,
        errorMessage: String,
        throwable: Throwable? = null
    ) {
        crashlytics.setCustomKey("auth_method", method)
        crashlytics.setCustomKey("auth_error_message", errorMessage)
        
        throwable?.let { crashlytics.recordException(it) }
        
        scope.launch {
            logAnalyticsEvent("authentication_error", mapOf(
                "method" to method,
                "error_message" to errorMessage
            ))
        }
    }
    
    /**
     * Log UI error
     */
    fun logUIError(
        screen: String,
        action: String,
        errorMessage: String,
        throwable: Throwable? = null
    ) {
        crashlytics.setCustomKey("ui_screen", screen)
        crashlytics.setCustomKey("ui_action", action)
        crashlytics.setCustomKey("ui_error_message", errorMessage)
        
        throwable?.let { crashlytics.recordException(it) }
        
        scope.launch {
            logAnalyticsEvent("ui_error", mapOf(
                "screen" to screen,
                "action" to action,
                "error_message" to errorMessage
            ))
        }
    }
    
    /**
     * Log app startup time
     */
    fun logStartupTime(startupTime: Long) {
        crashlytics.setCustomKey("app_startup_time", startupTime)
        
        scope.launch {
            logAnalyticsEvent("app_startup", mapOf(
                "startup_time_ms" to startupTime
            ))
        }
    }
    
    /**
     * Log memory usage
     */
    fun logMemoryUsage(usedMemory: Long, maxMemory: Long) {
        val memoryUsagePercent = (usedMemory.toFloat() / maxMemory.toFloat()) * 100
        
        crashlytics.setCustomKey("memory_used_mb", usedMemory / (1024 * 1024))
        crashlytics.setCustomKey("memory_max_mb", maxMemory / (1024 * 1024))
        crashlytics.setCustomKey("memory_usage_percent", memoryUsagePercent)
        
        if (memoryUsagePercent > 80) {
            crashlytics.recordException(
                Exception("High memory usage: ${memoryUsagePercent}%")
            )
        }
    }
    
    /**
     * Log app version and build info
     */
    fun logAppInfo() {
        try {
            val packageInfo = context.packageManager.getPackageInfo(context.packageName, 0)
            crashlytics.setCustomKey("app_version_name", packageInfo.versionName)
            crashlytics.setCustomKey("app_version_code", packageInfo.longVersionCode)
        } catch (e: Exception) {
            crashlytics.recordException(e)
        }
    }
    
    /**
     * Log device info
     */
    fun logDeviceInfo() {
        crashlytics.setCustomKey("device_manufacturer", android.os.Build.MANUFACTURER)
        crashlytics.setCustomKey("device_model", android.os.Build.MODEL)
        crashlytics.setCustomKey("android_version", android.os.Build.VERSION.RELEASE)
        crashlytics.setCustomKey("sdk_version", android.os.Build.VERSION.SDK_INT.toString())
    }
    
    /**
     * Log custom message
     */
    fun logMessage(message: String) {
        crashlytics.log(message)
    }
    
    /**
     * Log analytics event
     */
    private suspend fun logAnalyticsEvent(eventName: String, parameters: Map<String, Any>) {
        withContext(Dispatchers.Main) {
            val bundle = android.os.Bundle().apply {
                parameters.forEach { (key, value) ->
                    when (value) {
                        is String -> putString(key, value)
                        is Int -> putInt(key, value)
                        is Long -> putLong(key, value)
                        is Float -> putFloat(key, value)
                        is Double -> putDouble(key, value)
                        is Boolean -> putBoolean(key, value)
                        else -> putString(key, value.toString())
                    }
                }
            }
            analytics.logEvent(eventName, bundle)
        }
    }
    
    /**
     * Enable/disable crash reporting
     */
    fun setCrashlyticsCollectionEnabled(enabled: Boolean) {
        crashlytics.setCrashlyticsCollectionEnabled(enabled)
    }
    
    /**
     * Get crashlytics instance for advanced usage
     */
    fun getCrashlyticsInstance(): FirebaseCrashlytics {
        return crashlytics
    }
    
    /**
     * Get analytics instance for advanced usage
     */
    fun getAnalyticsInstance(): FirebaseAnalytics {
        return analytics
    }
} 