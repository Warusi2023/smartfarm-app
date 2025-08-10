package com.example.smartfarm

import android.app.Application
import com.example.smartfarm.monitoring.MonitoringConfig
import com.example.smartfarm.analytics.AnalyticsTracker
import com.example.smartfarm.error.CrashlyticsManager
// import dagger.hilt.android.HiltAndroidApp

// @HiltAndroidApp
class SmartFarmApplication : Application() {
    
    lateinit var monitoringConfig: MonitoringConfig
    lateinit var analyticsTracker: AnalyticsTracker
    lateinit var crashlyticsManager: CrashlyticsManager
    
    override fun onCreate() {
        super.onCreate()
        
        // Initialize dependencies manually since Hilt is disabled
        initializeDependencies()
        
        // Initialize monitoring
        monitoringConfig.initializeMonitoring()
        
        // Set up crash reporting
        setupCrashReporting()
        
        // Track app launch
        trackAppLaunch()
    }
    
    private fun initializeDependencies() {
        // Initialize dependencies manually
        monitoringConfig = MonitoringConfig(this)
        analyticsTracker = AnalyticsTracker(this)
        crashlyticsManager = CrashlyticsManager(this)
    }
    
    private fun setupCrashReporting() {
        // Set up crash reporting for the application
        crashlyticsManager.setCrashlyticsCollectionEnabled(true)
    }
    
    private fun trackAppLaunch() {
        // Track app launch event
        analyticsTracker.trackAppLaunch()
    }
} 