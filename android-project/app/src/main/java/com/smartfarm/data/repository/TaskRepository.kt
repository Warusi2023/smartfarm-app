package com.smartfarm.data.repository

import com.smartfarm.data.database.dao.TaskDao
import com.smartfarm.data.mapper.toDto
import com.smartfarm.data.mapper.toEntity
import com.smartfarm.data.model.TaskDto
import com.smartfarm.data.util.Resource
import com.smartfarm.network.SmartFarmApi
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.catch
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.flow.flow
import kotlinx.coroutines.flow.flowOn
import kotlinx.coroutines.flow.map
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class TaskRepository @Inject constructor(
    private val api: SmartFarmApi,
    private val taskDao: TaskDao
) {
    
    fun getTasks(farmId: String? = null): Flow<Resource<List<TaskDto>>> = flow {
        emit(Resource.Loading)
        
        val response = api.getTasks(farmId)
        if (response.isSuccessful && response.body() != null) {
            val tasks = response.body()!!
            taskDao.insertAll(tasks.map { it.toEntity() })
            emit(Resource.Success(tasks))
        } else {
            emit(Resource.Error(Exception("Network error: ${response.message()}")))
        }
    }.catch { e ->
        try {
            val cachedFlow = if (farmId != null) {
                taskDao.getTasksByFarm(farmId)
            } else {
                taskDao.getAllTasks()
            }
            val snapshot = cachedFlow.first()
            if (snapshot.isNotEmpty()) {
                emit(Resource.Error(e, snapshot.map { it.toDto() }))
            } else {
                emit(Resource.Error(e))
            }
        } catch (cacheError: Exception) {
            emit(Resource.Error(e))
        }
    }.flowOn(Dispatchers.IO)
    
    fun observeTasks(farmId: String? = null): Flow<List<TaskDto>> {
        val sourceFlow = if (farmId != null) {
            taskDao.getTasksByFarm(farmId)
        } else {
            taskDao.getAllTasks()
        }
        return sourceFlow.map { entities ->
            entities.map { it.toDto() }
        }
    }
    
    suspend fun createTask(task: TaskDto): Resource<TaskDto> {
        return try {
            val response = api.createTask(task)
            if (response.isSuccessful && response.body() != null) {
                val created = response.body()!!
                taskDao.insertTask(created.toEntity())
                Resource.Success(created)
            } else {
                Resource.Error(Exception("Failed to create task: ${response.message()}"))
            }
        } catch (e: Exception) {
            Resource.Error(e)
        }
    }
    
    suspend fun updateTask(task: TaskDto): Resource<TaskDto> {
        return try {
            val response = api.updateTask(task.id, task)
            if (response.isSuccessful && response.body() != null) {
                val updated = response.body()!!
                taskDao.updateTask(updated.toEntity())
                Resource.Success(updated)
            } else {
                Resource.Error(Exception("Failed to update task: ${response.message()}"))
            }
        } catch (e: Exception) {
            Resource.Error(e)
        }
    }
    
    suspend fun deleteTask(taskId: String): Resource<Unit> {
        return try {
            val response = api.deleteTask(taskId)
            if (response.isSuccessful) {
                val entity = taskDao.getTaskById(taskId)
                entity?.let { taskDao.deleteTask(it) }
                Resource.Success(Unit)
            } else {
                Resource.Error(Exception("Failed to delete task: ${response.message()}"))
            }
        } catch (e: Exception) {
            Resource.Error(e)
        }
    }
}

