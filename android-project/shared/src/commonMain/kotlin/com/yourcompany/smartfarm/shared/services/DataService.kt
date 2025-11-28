package com.yourcompany.smartfarm.shared.services

/**
 * Temporary stub for first Android release.
 * Adjust or add functions here only if other code calls them.
 * For now, provide minimal no-op APIs.
 */
class DataService {
    
    suspend fun getFarms(): List<Any> = emptyList()
    
    suspend fun getCrops(): List<Any> = emptyList()
    
    suspend fun getLivestock(): List<Any> = emptyList()
    
    // Additional methods added as compiler/callers require them:
    suspend fun addCrop(crop: Any): Any = crop
    suspend fun deleteCrop(id: Long): Boolean = false
    suspend fun addLivestock(livestock: Any): Any = livestock
    suspend fun deleteLivestock(id: Long): Boolean = false
    suspend fun addHealthRecord(livestockId: Long, record: Any): Any = record
    suspend fun getFarmStats(farmId: Long): Map<String, Any> = emptyMap()
    suspend fun createFarm(farm: Any): Any = farm
    suspend fun getTasks(): List<Any> = emptyList()
    suspend fun updateTaskStatus(taskId: Long, status: Any): Any? = null
    suspend fun createTask(task: Any): Any = task
}
