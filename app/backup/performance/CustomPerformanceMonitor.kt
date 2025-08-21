package com.yourcompany.smartfarm.performance

import android.content.Context
import com.yourcompany.smartfarm.analytics.AnalyticsManager
import javax.inject.Inject
import javax.inject.Singleton

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
     * Monitor database operation performance
     */
    suspend fun <T> monitorDatabaseOperation(
        operationName: String,
        operation: suspend () -> T
    ): T {
        return monitorOperation("database_$operationName", operation)
    }
    
    /**
     * Monitor network operation performance
     */
    suspend fun <T> monitorNetworkOperation(
        operationName: String,
        operation: suspend () -> T
    ): T {
        return monitorOperation("network_$operationName", operation)
    }
    
    /**
     * Monitor file operation performance
     */
    suspend fun <T> monitorFileOperation(
        operationName: String,
        operation: suspend () -> T
    ): T {
        return monitorOperation("file_$operationName", operation)
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
        
        // Keep only last 1000 metrics per operation to prevent memory issues
        val metrics = performanceData[operationName]
        if (metrics != null && metrics.size > 1000) {
            metrics.removeAt(0)
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
            successRate = successful.toDouble() / metrics.size,
            recentAverageDuration = metrics.takeLast(10).map { it.duration }.average()
        )
    }
    
    /**
     * Get all performance statistics
     */
    fun getAllPerformanceStats(): List<PerformanceStats> {
        return performanceData.keys.mapNotNull { getPerformanceStats(it) }
    }
    
    /**
     * Get performance statistics for recent operations
     */
    fun getRecentPerformanceStats(operationName: String, count: Int = 10): List<PerformanceMetric> {
        return performanceData[operationName]?.takeLast(count) ?: emptyList()
    }
    
    /**
     * Clear performance data for an operation
     */
    fun clearPerformanceData(operationName: String) {
        performanceData.remove(operationName)
    }
    
    /**
     * Clear all performance data
     */
    fun clearAllPerformanceData() {
        performanceData.clear()
    }
    
    /**
     * Get slow operations (above threshold)
     */
    fun getSlowOperations(thresholdMs: Long = 1000): List<PerformanceStats> {
        return getAllPerformanceStats().filter { it.averageDuration > thresholdMs }
    }
    
    /**
     * Get failed operations
     */
    fun getFailedOperations(): List<PerformanceStats> {
        return getAllPerformanceStats().filter { it.failedOperations > 0 }
    }
    
    /**
     * Get performance summary
     */
    fun getPerformanceSummary(): PerformanceSummary {
        val allStats = getAllPerformanceStats()
        
        if (allStats.isEmpty()) {
            return PerformanceSummary()
        }
        
        val totalOperations = allStats.sumOf { it.totalOperations }
        val totalSuccessful = allStats.sumOf { it.successfulOperations }
        val totalFailed = allStats.sumOf { it.failedOperations }
        val averageDuration = allStats.map { it.averageDuration }.average()
        val overallSuccessRate = totalSuccessful.toDouble() / totalOperations
        
        return PerformanceSummary(
            totalOperations = totalOperations,
            successfulOperations = totalSuccessful,
            failedOperations = totalFailed,
            averageDuration = averageDuration,
            successRate = overallSuccessRate,
            slowOperations = getSlowOperations().size,
            monitoredOperations = allStats.size
        )
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
    val successRate: Double,
    val recentAverageDuration: Double = 0.0
)

data class PerformanceSummary(
    val totalOperations: Int = 0,
    val successfulOperations: Int = 0,
    val failedOperations: Int = 0,
    val averageDuration: Double = 0.0,
    val successRate: Double = 0.0,
    val slowOperations: Int = 0,
    val monitoredOperations: Int = 0
) 