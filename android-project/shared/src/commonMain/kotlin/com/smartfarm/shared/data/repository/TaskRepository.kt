package com.smartfarm.shared.data.repository

import com.smartfarm.shared.data.model.dto.TaskDto
import com.smartfarm.shared.data.util.Resource
import com.smartfarm.shared.network.SmartFarmApi
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow

/**
 * Shared Task repository using Ktor (database caching removed for now)
 */
class TaskRepository(
    private val api: SmartFarmApi
) {
    
    fun getTasks(farmId: String? = null): Flow<Resource<List<TaskDto>>> = flow {
        emit(Resource.Loading)
        
        try {
            val networkResult = api.getTasks(farmId)
            when (networkResult) {
                is Resource.Success -> {
                    val tasks = networkResult.data
                    // Database caching removed - just return network data
                    emit(Resource.Success(tasks))
                }
                is Resource.Error -> {
                    // No cache fallback - just emit the error
                    emit(networkResult)
                }
                is Resource.Loading -> {
                    emit(Resource.Loading)
                }
            }
        } catch (e: Exception) {
            emit(Resource.Error(e.message ?: "Failed to fetch tasks", e))
        }
    }
    
    suspend fun createTask(task: TaskDto): Resource<TaskDto> {
        return try {
            val result = api.createTask(task)
            when (result) {
                is Resource.Success -> {
                    val created = result.data
                    // Database caching removed - just return network result
                    Resource.Success(created)
                }
                is Resource.Error -> result
                is Resource.Loading -> Resource.Error("Unexpected loading state", Exception("Unexpected loading state"))
            }
        } catch (e: Exception) {
            Resource.Error(e.message ?: "Failed to create task", e)
        }
    }
    
    suspend fun updateTask(task: TaskDto): Resource<TaskDto> {
        return try {
            val result = api.updateTask(task.id, task)
            when (result) {
                is Resource.Success -> {
                    val updated = result.data
                    // Database caching removed - just return network result
                    Resource.Success(updated)
                }
                is Resource.Error -> result
                is Resource.Loading -> Resource.Error("Unexpected loading state", Exception("Unexpected loading state"))
            }
        } catch (e: Exception) {
            Resource.Error(e.message ?: "Failed to update task", e)
        }
    }
    
    suspend fun deleteTask(taskId: String): Resource<Unit> {
        return try {
            val result = api.deleteTask(taskId)
            when (result) {
                is Resource.Success -> {
                    // Database caching removed - just return network result
                    Resource.Success(Unit)
                }
                is Resource.Error -> result
                is Resource.Loading -> Resource.Error("Unexpected loading state", Exception("Unexpected loading state"))
            }
        } catch (e: Exception) {
            Resource.Error(e.message ?: "Failed to delete task", e)
        }
    }
}
