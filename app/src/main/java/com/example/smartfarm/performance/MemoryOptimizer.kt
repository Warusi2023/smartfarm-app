package com.example.smartfarm.performance

import android.app.ActivityManager
import android.content.Context
import android.graphics.Bitmap
import android.util.Log
import androidx.collection.LruCache
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import java.lang.ref.WeakReference
import java.util.concurrent.ConcurrentHashMap
import javax.inject.Inject
import javax.inject.Singleton

/**
 * Memory optimizer for SmartFarm app
 * Implements memory monitoring, caching optimization, and memory leak detection
 */
@Singleton
class MemoryOptimizer @Inject constructor(
    private val context: Context
) {
    
    companion object {
        private const val TAG = "MemoryOptimizer"
        private const val MEMORY_MONITORING_INTERVAL_MS = 30000L // 30 seconds
        private const val IMAGE_CACHE_SIZE_MB = 50 // 50MB image cache
        private const val DATA_CACHE_SIZE_MB = 100 // 100MB data cache
        private const val MEMORY_WARNING_THRESHOLD_PERCENT = 80.0
        private const val MEMORY_CRITICAL_THRESHOLD_PERCENT = 90.0
    }
    
    private val _memoryState = MutableStateFlow(MemoryState())
    val memoryState: StateFlow<MemoryState> = _memoryState.asStateFlow()
    
    private val activityManager = context.getSystemService(Context.ACTIVITY_SERVICE) as ActivityManager
    private val memoryScope = CoroutineScope(SupervisorJob() + Dispatchers.IO)
    
    // Caches
    private val imageCache: LruCache<String, Bitmap>
    private val dataCache: LruCache<String, Any>
    private val weakReferences = ConcurrentHashMap<String, WeakReference<Any>>()
    
    // Memory monitoring
    private var isMemoryMonitoringActive = false
    
    init {
        // Initialize caches with size limits
        val maxMemory = (Runtime.getRuntime().maxMemory() / 1024).toInt()
        val imageCacheSize = (maxMemory / 8).coerceAtMost(IMAGE_CACHE_SIZE_MB * 1024)
        val dataCacheSize = (maxMemory / 4).coerceAtMost(DATA_CACHE_SIZE_MB * 1024)
        
        imageCache = object : LruCache<String, Bitmap>(imageCacheSize) {
            override fun sizeOf(key: String, bitmap: Bitmap): Int {
                return bitmap.byteCount / 1024
            }
            
            override fun entryRemoved(
                evicted: Boolean,
                key: String,
                oldValue: Bitmap,
                newValue: Bitmap?
            ) {
                Log.d(TAG, "Image cache entry removed: $key")
                if (evicted) {
                    oldValue.recycle()
                }
            }
        }
        
        dataCache = object : LruCache<String, Any>(dataCacheSize) {
            override fun sizeOf(key: String, value: Any): Int {
                return estimateObjectSize(value)
            }
            
            override fun entryRemoved(
                evicted: Boolean,
                key: String,
                oldValue: Any,
                newValue: Any?
            ) {
                Log.d(TAG, "Data cache entry removed: $key")
            }
        }
        
        startMemoryMonitoring()
    }
    
    /**
     * Start memory monitoring
     */
    private fun startMemoryMonitoring() {
        if (isMemoryMonitoringActive) return
        
        isMemoryMonitoringActive = true
        memoryScope.launch {
            while (isMemoryMonitoringActive) {
                updateMemoryState()
                delay(MEMORY_MONITORING_INTERVAL_MS)
            }
        }
    }
    
    /**
     * Update memory state
     */
    private fun updateMemoryState() {
        val memoryInfo = ActivityManager.MemoryInfo()
        activityManager.getMemoryInfo(memoryInfo)
        
        val usedMemory = memoryInfo.totalMem - memoryInfo.availMem
        val memoryUsagePercent = (usedMemory * 100.0 / memoryInfo.totalMem)
        val isLowMemory = memoryInfo.lowMemory
        
        val newState = MemoryState(
            usedMemory = usedMemory,
            totalMemory = memoryInfo.totalMem,
            availableMemory = memoryInfo.availMem,
            memoryUsagePercent = memoryUsagePercent,
            isLowMemory = isLowMemory,
            imageCacheSize = imageCache.size(),
            dataCacheSize = dataCache.size(),
            weakReferenceCount = weakReferences.size
        )
        
        _memoryState.value = newState
        
        // Check for memory warnings
        when {
            memoryUsagePercent > MEMORY_CRITICAL_THRESHOLD_PERCENT -> {
                Log.w(TAG, "Critical memory usage: ${String.format("%.1f", memoryUsagePercent)}%")
                handleCriticalMemoryUsage()
            }
            memoryUsagePercent > MEMORY_WARNING_THRESHOLD_PERCENT -> {
                Log.w(TAG, "High memory usage: ${String.format("%.1f", memoryUsagePercent)}%")
                handleHighMemoryUsage()
            }
        }
        
        // Log memory state periodically
        Log.d(TAG, "Memory state: ${String.format("%.1f", memoryUsagePercent)}% used, " +
                "Image cache: ${imageCache.size()}/${imageCache.maxSize()}, " +
                "Data cache: ${dataCache.size()}/${dataCache.maxSize()}")
    }
    
    /**
     * Handle critical memory usage
     */
    private fun handleCriticalMemoryUsage() {
        Log.w(TAG, "Handling critical memory usage")
        
        // Clear all caches
        clearAllCaches()
        
        // Force garbage collection
        System.gc()
        
        // Clear weak references
        clearWeakReferences()
        
        // Notify memory optimization listeners
        notifyMemoryOptimization(MemoryOptimizationLevel.CRITICAL)
    }
    
    /**
     * Handle high memory usage
     */
    private fun handleHighMemoryUsage() {
        Log.w(TAG, "Handling high memory usage")
        
        // Clear least recently used cache entries
        imageCache.trimToSize(imageCache.maxSize() / 2)
        dataCache.trimToSize(dataCache.maxSize() / 2)
        
        // Clear expired weak references
        clearExpiredWeakReferences()
        
        // Notify memory optimization listeners
        notifyMemoryOptimization(MemoryOptimizationLevel.HIGH)
    }
    
    /**
     * Clear all caches
     */
    fun clearAllCaches() {
        Log.d(TAG, "Clearing all caches")
        imageCache.evictAll()
        dataCache.evictAll()
    }
    
    /**
     * Clear image cache
     */
    fun clearImageCache() {
        Log.d(TAG, "Clearing image cache")
        imageCache.evictAll()
    }
    
    /**
     * Clear data cache
     */
    fun clearDataCache() {
        Log.d(TAG, "Clearing data cache")
        dataCache.evictAll()
    }
    
    /**
     * Add image to cache
     */
    fun cacheImage(key: String, bitmap: Bitmap) {
        imageCache.put(key, bitmap)
        Log.d(TAG, "Cached image: $key")
    }
    
    /**
     * Get image from cache
     */
    fun getCachedImage(key: String): Bitmap? {
        return imageCache.get(key)
    }
    
    /**
     * Add data to cache
     */
    fun cacheData(key: String, data: Any) {
        dataCache.put(key, data)
        Log.d(TAG, "Cached data: $key")
    }
    
    /**
     * Get data from cache
     */
    fun getCachedData(key: String): Any? {
        return dataCache.get(key)
    }
    
    /**
     * Add weak reference
     */
    fun addWeakReference(key: String, obj: Any) {
        weakReferences[key] = WeakReference(obj)
        Log.d(TAG, "Added weak reference: $key")
    }
    
    /**
     * Get weak reference
     */
    fun getWeakReference(key: String): Any? {
        return weakReferences[key]?.get()
    }
    
    /**
     * Clear weak references
     */
    private fun clearWeakReferences() {
        weakReferences.clear()
        Log.d(TAG, "Cleared all weak references")
    }
    
    /**
     * Clear expired weak references
     */
    private fun clearExpiredWeakReferences() {
        val expiredKeys = weakReferences.filter { it.value.get() == null }.keys
        expiredKeys.forEach { weakReferences.remove(it) }
        
        if (expiredKeys.isNotEmpty()) {
            Log.d(TAG, "Cleared ${expiredKeys.size} expired weak references")
        }
    }
    
    /**
     * Estimate object size
     */
    private fun estimateObjectSize(obj: Any): Int {
        return when (obj) {
            is String -> obj.length * 2 // Rough estimate for UTF-16
            is ByteArray -> obj.size
            is IntArray -> obj.size * 4
            is LongArray -> obj.size * 8
            is FloatArray -> obj.size * 4
            is DoubleArray -> obj.size * 8
            is BooleanArray -> obj.size
            is CharArray -> obj.size * 2
            is Array<*> -> obj.size * 8 // Rough estimate for object references
            else -> 64 // Default size for unknown objects
        }
    }
    
    /**
     * Get memory optimization recommendations
     */
    fun getMemoryOptimizationRecommendations(): List<MemoryOptimizationRecommendation> {
        val recommendations = mutableListOf<MemoryOptimizationRecommendation>()
        val state = _memoryState.value
        
        // High memory usage recommendations
        if (state.memoryUsagePercent > MEMORY_WARNING_THRESHOLD_PERCENT) {
            recommendations.add(
                MemoryOptimizationRecommendation(
                    type = MemoryIssueType.HIGH_MEMORY_USAGE,
                    severity = if (state.memoryUsagePercent > MEMORY_CRITICAL_THRESHOLD_PERCENT) 
                        MemorySeverity.CRITICAL else MemorySeverity.HIGH,
                    title = "High Memory Usage",
                    description = "Memory usage is ${String.format("%.1f", state.memoryUsagePercent)}%",
                    suggestions = listOf(
                        "Implement image compression and resizing",
                        "Use lazy loading for large datasets",
                        "Optimize bitmap usage and recycling",
                        "Implement proper cache eviction policies",
                        "Use WeakReference for temporary objects",
                        "Consider using RecyclerView with view recycling"
                    )
                )
            )
        }
        
        // Cache optimization recommendations
        if (state.imageCacheSize > imageCache.maxSize() * 0.8) {
            recommendations.add(
                MemoryOptimizationRecommendation(
                    type = MemoryIssueType.LARGE_IMAGE_CACHE,
                    severity = MemorySeverity.MEDIUM,
                    title = "Large Image Cache",
                    description = "Image cache is ${state.imageCacheSize}/${imageCache.maxSize()} entries",
                    suggestions = listOf(
                        "Reduce image quality for thumbnails",
                        "Implement image compression",
                        "Use smaller cache size",
                        "Implement cache eviction based on access patterns"
                    )
                )
            )
        }
        
        if (state.dataCacheSize > dataCache.maxSize() * 0.8) {
            recommendations.add(
                MemoryOptimizationRecommendation(
                    type = MemoryIssueType.LARGE_DATA_CACHE,
                    severity = MemorySeverity.MEDIUM,
                    title = "Large Data Cache",
                    description = "Data cache is ${state.dataCacheSize}/${dataCache.maxSize()} entries",
                    suggestions = listOf(
                        "Implement cache size limits",
                        "Use TTL (Time To Live) for cache entries",
                        "Implement LRU eviction policy",
                        "Consider using disk caching for large data"
                    )
                )
            )
        }
        
        // Weak reference recommendations
        if (state.weakReferenceCount > 100) {
            recommendations.add(
                MemoryOptimizationRecommendation(
                    type = MemoryIssueType.MANY_WEAK_REFERENCES,
                    severity = MemorySeverity.LOW,
                    title = "Many Weak References",
                    description = "There are ${state.weakReferenceCount} weak references",
                    suggestions = listOf(
                        "Review weak reference usage",
                        "Clear unused weak references",
                        "Consider using SoftReference for caches",
                        "Implement reference cleanup"
                    )
                )
            )
        }
        
        return recommendations
    }
    
    /**
     * Notify memory optimization listeners
     */
    private fun notifyMemoryOptimization(level: MemoryOptimizationLevel) {
        // This would notify listeners about memory optimization events
        Log.d(TAG, "Memory optimization level: $level")
    }
    
    /**
     * Get memory statistics
     */
    fun getMemoryStatistics(): MemoryStatistics {
        val state = _memoryState.value
        return MemoryStatistics(
            usedMemory = state.usedMemory,
            totalMemory = state.totalMemory,
            availableMemory = state.availableMemory,
            memoryUsagePercent = state.memoryUsagePercent,
            imageCacheSize = state.imageCacheSize,
            dataCacheSize = state.dataCacheSize,
            weakReferenceCount = state.weakReferenceCount,
            isLowMemory = state.isLowMemory
        )
    }
    
    /**
     * Stop memory monitoring
     */
    fun stopMemoryMonitoring() {
        isMemoryMonitoringActive = false
    }
}

/**
 * Memory state data class
 */
data class MemoryState(
    val usedMemory: Long = 0L,
    val totalMemory: Long = 0L,
    val availableMemory: Long = 0L,
    val memoryUsagePercent: Double = 0.0,
    val isLowMemory: Boolean = false,
    val imageCacheSize: Int = 0,
    val dataCacheSize: Int = 0,
    val weakReferenceCount: Int = 0
)

/**
 * Memory statistics data class
 */
data class MemoryStatistics(
    val usedMemory: Long,
    val totalMemory: Long,
    val availableMemory: Long,
    val memoryUsagePercent: Double,
    val imageCacheSize: Int,
    val dataCacheSize: Int,
    val weakReferenceCount: Int,
    val isLowMemory: Boolean
)

/**
 * Memory optimization recommendation data class
 */
data class MemoryOptimizationRecommendation(
    val type: MemoryIssueType,
    val severity: MemorySeverity,
    val title: String,
    val description: String,
    val suggestions: List<String>
)

/**
 * Memory issue types
 */
enum class MemoryIssueType {
    HIGH_MEMORY_USAGE,
    LARGE_IMAGE_CACHE,
    LARGE_DATA_CACHE,
    MANY_WEAK_REFERENCES,
    MEMORY_LEAK,
    INEFFICIENT_CACHING
}

/**
 * Memory severity levels
 */
enum class MemorySeverity {
    LOW,
    MEDIUM,
    HIGH,
    CRITICAL
}

/**
 * Memory optimization levels
 */
enum class MemoryOptimizationLevel {
    NORMAL,
    HIGH,
    CRITICAL
}

/**
 * Memory leak detector
 */
object MemoryLeakDetector {
    
    private val objectReferences = ConcurrentHashMap<String, MutableList<WeakReference<Any>>>()
    
    /**
     * Track object reference
     */
    fun trackObject(key: String, obj: Any) {
        objectReferences.getOrPut(key) { mutableListOf() }.add(WeakReference(obj))
    }
    
    /**
     * Check for potential memory leaks
     */
    fun checkForMemoryLeaks(): List<String> {
        val potentialLeaks = mutableListOf<String>()
        
        objectReferences.forEach { (key, references) ->
            val activeReferences = references.count { it.get() != null }
            val totalReferences = references.size
            
            if (activeReferences > 10 && activeReferences.toDouble() / totalReferences > 0.8) {
                potentialLeaks.add("Potential memory leak detected for $key: $activeReferences/$totalReferences references active")
            }
        }
        
        return potentialLeaks
    }
    
    /**
     * Clear expired references
     */
    fun clearExpiredReferences() {
        objectReferences.forEach { (key, references) ->
            references.removeAll { it.get() == null }
            if (references.isEmpty()) {
                objectReferences.remove(key)
            }
        }
    }
} 