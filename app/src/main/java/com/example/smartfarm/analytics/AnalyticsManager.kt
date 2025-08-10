package com.example.smartfarm.analytics

import android.content.Context
import android.os.Bundle
import com.example.smartfarm.BuildConfig
import com.google.firebase.analytics.FirebaseAnalytics
import javax.inject.Inject
import javax.inject.Singleton

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
        const val SCREEN_PROFILE = "profile_screen"
        const val SCREEN_REPORTS = "reports_screen"
        const val SCREEN_MONETIZATION = "monetization_screen"
        
        // User actions
        const val ACTION_ADD_LIVESTOCK = "add_livestock"
        const val ACTION_ADD_CROP = "add_crop"
        const val ACTION_VIEW_WEATHER = "view_weather"
        const val ACTION_EXPORT_DATA = "export_data"
        const val ACTION_BACKUP_DATA = "backup_data"
        const val ACTION_GENERATE_REPORT = "generate_report"
        const val ACTION_VIEW_MONETIZATION = "view_monetization"
        
        // Custom events
        const val EVENT_APP_STARTUP = "app_startup"
        const val EVENT_FEATURE_USAGE = "feature_usage"
        const val EVENT_ERROR_OCCURRED = "error_occurred"
        const val EVENT_PERFORMANCE_ISSUE = "performance_issue"
        const val EVENT_DATA_EXPORT = "data_export"
        const val EVENT_DATA_BACKUP = "data_backup"
        const val EVENT_REPORT_GENERATION = "report_generation"
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
    
    /**
     * Track data export
     */
    fun trackDataExport(dataType: String, recordCount: Int) {
        val bundle = Bundle().apply {
            putString("data_type", dataType)
            putInt("record_count", recordCount)
        }
        firebaseAnalytics.logEvent(EVENT_DATA_EXPORT, bundle)
    }
    
    /**
     * Track data backup
     */
    fun trackDataBackup(backupSize: Long, backupType: String) {
        val bundle = Bundle().apply {
            putLong("backup_size_bytes", backupSize)
            putString("backup_type", backupType)
        }
        firebaseAnalytics.logEvent(EVENT_DATA_BACKUP, bundle)
    }
    
    /**
     * Track report generation
     */
    fun trackReportGeneration(reportType: String, reportFormat: String) {
        val bundle = Bundle().apply {
            putString("report_type", reportType)
            putString("report_format", reportFormat)
        }
        firebaseAnalytics.logEvent(EVENT_REPORT_GENERATION, bundle)
    }
    
    /**
     * Track livestock management
     */
    fun trackLivestockManagement(action: String, livestockType: String, count: Int = 1) {
        val bundle = Bundle().apply {
            putString("action", action)
            putString("livestock_type", livestockType)
            putInt("count", count)
        }
        firebaseAnalytics.logEvent("livestock_management", bundle)
    }
    
    /**
     * Track crop management
     */
    fun trackCropManagement(action: String, cropType: String, area: Double? = null) {
        val bundle = Bundle().apply {
            putString("action", action)
            putString("crop_type", cropType)
            if (area != null) {
                putDouble("area_hectares", area)
            }
        }
        firebaseAnalytics.logEvent("crop_management", bundle)
    }
    
    /**
     * Track weather interactions
     */
    fun trackWeatherInteraction(action: String, location: String, weatherType: String? = null) {
        val bundle = Bundle().apply {
            putString("action", action)
            putString("location", location)
            if (weatherType != null) {
                putString("weather_type", weatherType)
            }
        }
        firebaseAnalytics.logEvent("weather_interaction", bundle)
    }
    
    /**
     * Track monetization events
     */
    fun trackMonetizationEvent(eventType: String, amount: Double? = null, currency: String = "USD") {
        val bundle = Bundle().apply {
            putString("event_type", eventType)
            if (amount != null) {
                putDouble("amount", amount)
                putString("currency", currency)
            }
        }
        firebaseAnalytics.logEvent("monetization_event", bundle)
    }
} 