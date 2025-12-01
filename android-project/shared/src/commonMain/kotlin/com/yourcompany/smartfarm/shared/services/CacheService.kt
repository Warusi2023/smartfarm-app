package com.yourcompany.smartfarm.shared.services

import kotlinx.coroutines.delay
import kotlinx.serialization.Serializable
import kotlinx.serialization.encodeToString
import kotlinx.serialization.json.Json

/**
 * Cache service for storing and retrieving farm data
 * Improves performance by reducing API calls
 */
class CacheService {
    
    private val json = Json { 
        ignoreUnknownKeys = true 
        isLenient = true
    }
    
    // In-memory cache (in production, this could be SQLite, Room, or other storage)
    val cache = mutableMapOf<String, CacheEntry<*>>()
    
    // Cache configuration
    val defaultTtl = 5 * 60 * 1000L // 5 minutes default TTL
    
    /**
     * Get cached data if available and not expired
     */
    @Suppress("UNCHECKED_CAST")
    inline fun <reified T> get(key: String): T? {
        val entry = cache[key] as? CacheEntry<T> ?: return null
        
        if (isExpired(entry)) {
            cache.remove(key)
            return null
        }
        
        return entry.data
    }
    
    /**
     * Store data in cache with TTL
     */
    inline fun <reified T> set(key: String, data: T, ttl: Long = defaultTtl) {
        val entry = CacheEntry(
            data = data,
            timestamp = System.currentTimeMillis(),
            ttl = ttl
        )
        cache[key] = entry
        
        // Clean up expired entries periodically
        cleanupExpiredEntries()
    }
    
    /**
     * Check if data exists in cache and is not expired
     */
    fun exists(key: String): Boolean {
        val entry = cache[key] ?: return false
        return !isExpired(entry)
    }
    
    /**
     * Remove specific key from cache
     */
    fun remove(key: String) {
        cache.remove(key)
    }
    
    /**
     * Clear all cache
     */
    fun clear() {
        cache.clear()
    }
    
    /**
     * Get cache statistics
     */
    fun getStats(): CacheStats {
        val totalEntries = cache.size
        val expiredEntries = cache.values.count { isExpired(it) }
        val validEntries = totalEntries - expiredEntries
        
        return CacheStats(
            totalEntries = totalEntries,
            validEntries = validEntries,
            expiredEntries = expiredEntries,
            memoryUsage = estimateMemoryUsage()
        )
    }
    
    /**
     * Check if cache entry is expired
     */
    fun isExpired(entry: CacheEntry<*>): Boolean {
        val now = System.currentTimeMillis()
        return (now - entry.timestamp) > entry.ttl
    }
    
    /**
     * Clean up expired entries
     */
    fun cleanupExpiredEntries() {
        val expiredKeys = cache.entries
            .filter { isExpired(it.value) }
            .map { it.key }
        
        expiredKeys.forEach { cache.remove(it) }
    }
    
    /**
     * Estimate memory usage of cache
     */
    private fun estimateMemoryUsage(): Long {
        return try {
            val serialized = json.encodeToString(cache)
            serialized.length.toLong() * 2 // Rough estimate: 2 bytes per character
        } catch (e: Exception) {
            0L
        }
    }
    
    /**
     * Cache entry with timestamp and TTL
     */
    @Serializable
    data class CacheEntry<T>(
        val data: T,
        val timestamp: Long,
        val ttl: Long
    )
    
    /**
     * Cache statistics
     */
    data class CacheStats(
        val totalEntries: Int,
        val validEntries: Int,
        val expiredEntries: Int,
        val memoryUsage: Long
    )
    
    companion object {
        // Cache keys for different data types
        const val FARMS_CACHE_KEY = "farms"
        const val CROPS_CACHE_KEY = "crops"
        const val LIVESTOCK_CACHE_KEY = "livestock"
        const val TASKS_CACHE_KEY = "tasks"
        const val INVENTORY_CACHE_KEY = "inventory"
        const val FINANCIAL_CACHE_KEY = "financial"
        const val STATS_CACHE_KEY = "stats"
        
        // TTL values for different data types
        const val FARMS_TTL = 10 * 60 * 1000L // 10 minutes
        const val CROPS_TTL = 5 * 60 * 1000L // 5 minutes
        const val LIVESTOCK_TTL = 5 * 60 * 1000L // 5 minutes
        const val TASKS_TTL = 2 * 60 * 1000L // 2 minutes
        const val INVENTORY_TTL = 15 * 60 * 1000L // 15 minutes
        const val FINANCIAL_TTL = 30 * 60 * 1000L // 30 minutes
        const val STATS_TTL = 1 * 60 * 1000L // 1 minute
    }
}
