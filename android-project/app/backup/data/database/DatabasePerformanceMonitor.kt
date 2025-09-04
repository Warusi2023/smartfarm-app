package com.yourcompany.smartfarm.data.database

import android.util.Log
import androidx.sqlite.db.SupportSQLiteDatabase
import java.util.concurrent.ConcurrentHashMap
import java.util.concurrent.atomic.AtomicLong

/**
 * Database performance monitoring utility for tracking query performance
 * and identifying potential bottlenecks in the SmartFarm database.
 */
class DatabasePerformanceMonitor {
    
    companion object {
        private const val TAG = "DBPerformance"
        private const val SLOW_QUERY_THRESHOLD_MS = 100L // Queries taking longer than 100ms are considered slow
        
        private val queryTimes = ConcurrentHashMap<String, MutableList<Long>>()
        private val totalQueries = AtomicLong(0)
        private val slowQueries = AtomicLong(0)
        
        /**
         * Track query execution time manually
         */
        fun trackQuery(sql: String, bindArgs: Array<out Any>? = null, executionTime: Long) {
            val queryKey = generateQueryKey(sql, bindArgs)
            
            // Store query execution time
            queryTimes.getOrPut(queryKey) { mutableListOf() }.add(executionTime)
            totalQueries.incrementAndGet()
            
            // Log slow queries
            if (executionTime > SLOW_QUERY_THRESHOLD_MS) {
                slowQueries.incrementAndGet()
                Log.w(TAG, "Slow query detected: $queryKey took ${executionTime}ms")
            }
        }
        
        /**
         * Start query timing - returns start time
         */
        fun startQueryTiming(): Long {
            return System.currentTimeMillis()
        }
        
        /**
         * End query timing and track the query
         */
        fun endQueryTiming(startTime: Long, sql: String, bindArgs: Array<out Any>? = null) {
            val executionTime = System.currentTimeMillis() - startTime
            trackQuery(sql, bindArgs, executionTime)
        }
        
        /**
         * Generate a unique key for a query based on SQL and bind arguments
         */
        private fun generateQueryKey(sql: String, bindArgs: Array<out Any>?): String {
            return if (bindArgs != null) {
                "$sql [${bindArgs.joinToString(", ")}]"
            } else {
                sql
            }
        }
        
        /**
         * Get performance statistics
         */
        fun getPerformanceStats(): PerformanceStats {
            val totalQueryCount = totalQueries.get()
            val slowQueryCount = slowQueries.get()
            
            val averageQueryTimes = queryTimes.mapValues { (_, times) ->
                if (times.isNotEmpty()) times.average() else 0.0
            }
            
            val slowestQueries = averageQueryTimes.entries
                .sortedByDescending { it.value }
                .take(10)
                .map { "${it.key}: ${it.value}ms average" }
            
            return PerformanceStats(
                totalQueries = totalQueryCount,
                slowQueries = slowQueryCount,
                slowQueryPercentage = if (totalQueryCount > 0) (slowQueryCount * 100.0 / totalQueryCount) else 0.0,
                averageQueryTimes = averageQueryTimes,
                slowestQueries = slowestQueries
            )
        }
        
        /**
         * Log performance report
         */
        fun logPerformanceReport() {
            val stats = getPerformanceStats()
            Log.i(TAG, "=== Database Performance Report ===")
            Log.i(TAG, "Total queries: ${stats.totalQueries}")
            Log.i(TAG, "Slow queries: ${stats.slowQueries}")
            Log.i(TAG, "Slow query percentage: ${String.format("%.2f", stats.slowQueryPercentage)}%")
            Log.i(TAG, "Slowest queries:")
            stats.slowestQueries.forEach { Log.i(TAG, "  $it") }
            Log.i(TAG, "================================")
        }
        
        /**
         * Reset performance counters
         */
        fun resetCounters() {
            queryTimes.clear()
            totalQueries.set(0)
            slowQueries.set(0)
        }
        
        /**
         * Check if database needs optimization
         */
        fun needsOptimization(): Boolean {
            val stats = getPerformanceStats()
            return stats.slowQueryPercentage > 5.0 || stats.slowestQueries.any { 
                it.contains("> 500ms") 
            }
        }
        
        /**
         * Get optimization recommendations
         */
        fun getOptimizationRecommendations(): List<String> {
            val recommendations = mutableListOf<String>()
            val stats = getPerformanceStats()
            
            if (stats.slowQueryPercentage > 5.0) {
                recommendations.add("High percentage of slow queries detected. Consider adding indexes.")
            }
            
            stats.slowestQueries.forEach { query ->
                when {
                    query.contains("SELECT") && query.contains("ORDER BY") && !query.contains("LIMIT") -> {
                        recommendations.add("Add LIMIT clause to queries with ORDER BY")
                    }
                    query.contains("LIKE") && query.contains("%") -> {
                        recommendations.add("Consider using full-text search for LIKE queries")
                    }
                    query.contains("JOIN") -> {
                        recommendations.add("Optimize JOIN queries by adding proper indexes")
                    }
                }
            }
            
            return recommendations
        }
    }
    
    data class PerformanceStats(
        val totalQueries: Long,
        val slowQueries: Long,
        val slowQueryPercentage: Double,
        val averageQueryTimes: Map<String, Double>,
        val slowestQueries: List<String>
    )
}

/**
 * Extension function to get database performance stats
 */
fun SupportSQLiteDatabase.getPerformanceStats(): DatabasePerformanceMonitor.PerformanceStats {
    return DatabasePerformanceMonitor.getPerformanceStats()
}

/**
 * Utility function to monitor database operations
 */
object DatabaseMonitoringUtils {
    /**
     * Execute a database operation with performance monitoring
     */
    inline fun <T> monitorDatabaseOperation(
        operation: String,
        bindArgs: Array<out Any>? = null,
        crossinline block: () -> T
    ): T {
        val startTime = DatabasePerformanceMonitor.startQueryTiming()
        return try {
            block()
        } finally {
            DatabasePerformanceMonitor.endQueryTiming(startTime, operation, bindArgs)
        }
    }
} 