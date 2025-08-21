package com.yourcompany.smartfarm.analytics

import javax.inject.Inject
import javax.inject.Singleton

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
     * Track app launch
     */
    fun trackAppLaunch() {
        analyticsManager.trackAction("app_launch")
    }
    
    /**
     * Track livestock management actions
     */
    fun trackLivestockAction(action: String, livestockType: String? = null, count: Int = 1) {
        val parameters = mutableMapOf<String, Any>()
        if (livestockType != null) {
            parameters["livestock_type"] = livestockType
        }
        parameters["count"] = count
        analyticsManager.trackAction(action, parameters)
        
        // Also track specific livestock management event
        if (livestockType != null) {
            analyticsManager.trackLivestockManagement(action, livestockType, count)
        }
    }
    
    /**
     * Track crop management actions
     */
    fun trackCropAction(action: String, cropType: String? = null, area: Double? = null) {
        val parameters = mutableMapOf<String, Any>()
        if (cropType != null) {
            parameters["crop_type"] = cropType
        }
        if (area != null) {
            parameters["area_hectares"] = area
        }
        analyticsManager.trackAction(action, parameters)
        
        // Also track specific crop management event
        if (cropType != null) {
            analyticsManager.trackCropManagement(action, cropType, area)
        }
    }
    
    /**
     * Track weather interactions
     */
    fun trackWeatherAction(action: String, location: String? = null, weatherType: String? = null) {
        val parameters = mutableMapOf<String, Any>()
        if (location != null) {
            parameters["location"] = location
        }
        if (weatherType != null) {
            parameters["weather_type"] = weatherType
        }
        analyticsManager.trackAction(action, parameters)
        
        // Also track specific weather interaction event
        if (location != null) {
            analyticsManager.trackWeatherInteraction(action, location, weatherType)
        }
    }
    
    /**
     * Track data management actions
     */
    fun trackDataAction(action: String, dataType: String? = null, recordCount: Int? = null) {
        val parameters = mutableMapOf<String, Any>()
        if (dataType != null) {
            parameters["data_type"] = dataType
        }
        if (recordCount != null) {
            parameters["record_count"] = recordCount
        }
        analyticsManager.trackAction(action, parameters)
        
        // Track specific data events
        when (action) {
            AnalyticsManager.ACTION_EXPORT_DATA -> {
                if (dataType != null && recordCount != null) {
                    analyticsManager.trackDataExport(dataType, recordCount)
                }
            }
            AnalyticsManager.ACTION_BACKUP_DATA -> {
                // Track backup event
                analyticsManager.trackDataBackup(0L, dataType ?: "unknown")
            }
        }
    }
    
    /**
     * Track report generation
     */
    fun trackReportGeneration(reportType: String, reportFormat: String = "PDF") {
        analyticsManager.trackAction(AnalyticsManager.ACTION_GENERATE_REPORT, mapOf(
            "report_type" to reportType,
            "report_format" to reportFormat
        ))
        
        // Track specific report generation event
        analyticsManager.trackReportGeneration(reportType, reportFormat)
    }
    
    /**
     * Track monetization events
     */
    fun trackMonetizationEvent(eventType: String, amount: Double? = null, currency: String = "USD") {
        val parameters = mutableMapOf<String, Any>()
        if (amount != null) {
            parameters["amount"] = amount
            parameters["currency"] = currency
        }
        analyticsManager.trackAction("monetization_$eventType", parameters)
        
        // Track specific monetization event
        analyticsManager.trackMonetizationEvent(eventType, amount, currency)
    }
    
    /**
     * Track feature usage
     */
    fun trackFeatureUsage(featureName: String, usageDuration: Long? = null) {
        analyticsManager.trackFeatureUsage(featureName, usageDuration)
    }
    
    /**
     * Track error occurrence
     */
    fun trackError(errorType: String, errorMessage: String, context: String) {
        analyticsManager.trackError(errorType, errorMessage, context)
    }
    
    /**
     * Track performance issue
     */
    fun trackPerformanceIssue(issueType: String, duration: Long, threshold: Long) {
        analyticsManager.trackPerformanceIssue(issueType, duration, threshold)
    }
    
    /**
     * Track business metric
     */
    fun trackBusinessMetric(metricName: String, value: Double, category: String? = null) {
        analyticsManager.trackBusinessMetric(metricName, value, category)
    }
    
    /**
     * Track user engagement
     */
    fun trackEngagement(sessionDuration: Long, screensViewed: Int) {
        analyticsManager.trackEngagement(sessionDuration, screensViewed)
    }
    
    /**
     * Track app startup performance
     */
    fun trackAppStartup(startupTime: Long) {
        analyticsManager.trackAppStartup(startupTime)
    }
} 