package com.yourcompany.smartfarm.shared.services

import com.yourcompany.smartfarm.shared.models.*

/**
 * Temporary stub for first Android release.
 * Adjust or add functions here only if other code calls them.
 * For now, provide minimal no-op APIs.
 */
open class DataService {
    
    open suspend fun getFarms(): List<Farm> = emptyList()
    
    open suspend fun getCrops(): List<Crop> = emptyList()
    
    open suspend fun getLivestock(): List<Livestock> = emptyList()
    
    // Additional methods added as compiler/callers require them:
    suspend fun addCrop(crop: Any): Any = crop
    suspend fun deleteCrop(id: Long): Boolean = false
    suspend fun addLivestock(livestock: Livestock): Livestock = livestock
    suspend fun deleteLivestock(id: Long): Boolean = false
    suspend fun addHealthRecord(livestockId: Long, record: HealthRecord): HealthRecord = record
    open suspend fun getFarmStats(farmId: Long): Map<String, Any> = emptyMap()
    open suspend fun createFarm(farm: Farm): Farm = farm
    open suspend fun getTasks(): List<Task> = emptyList()
    suspend fun updateTaskStatus(taskId: Long, status: TaskStatus): Task? = null
    suspend fun createTask(task: Task): Task = task
}
