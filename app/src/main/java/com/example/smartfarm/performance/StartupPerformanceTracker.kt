package com.example.smartfarm.performance

import com.example.smartfarm.performance.StartupPerformanceReport
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class StartupPerformanceTracker @Inject constructor() {
    
    companion object {
        private var coldStartTime: Long = 0L
        private var warmStartTime: Long = 0L
        private var hotStartTime: Long = 0L
        private var startupStartTime: Long = 0L
        private var startupEndTime: Long = 0L
        
        fun startStartupTimer() {
            startupStartTime = System.currentTimeMillis()
        }
        
        fun endStartupTimer() {
            if (startupStartTime > 0) {
                startupEndTime = System.currentTimeMillis()
            }
        }
        
        fun getStartupPerformanceReport(): StartupPerformanceReport {
            val totalStartupTime = if (startupEndTime > startupStartTime) startupEndTime - startupStartTime else 0L
            
            return StartupPerformanceReport(
                id = "startup_tracker_001",
                totalStartupTime = totalStartupTime,
                coldStartTime = coldStartTime,
                warmStartTime = warmStartTime,
                hotStartTime = hotStartTime,
                initializationSteps = emptyList(),
                bottlenecks = if (totalStartupTime > 3000) listOf("Slow startup time") else emptyList(),
                recommendations = generateRecommendations(totalStartupTime)
            )
        }
        
        private fun generateRecommendations(startupTime: Long): List<String> {
            val recommendations = mutableListOf<String>()
            
            if (startupTime > 5000) {
                recommendations.add("Startup time is very slow (>5s). Consider implementing lazy initialization.")
            } else if (startupTime > 3000) {
                recommendations.add("Startup time is slow (>3s). Optimize dependency injection and reduce initialization work.")
            }
            
            if (coldStartTime > 2000) {
                recommendations.add("Cold start time is high. Consider using App Startup library.")
            }
            
            return recommendations
        }
    }
} 