package com.smartfarm.shared.data.repository

import com.smartfarm.shared.data.model.dto.TaskDto
import com.smartfarm.shared.data.util.Resource
import com.smartfarm.shared.database.FarmDatabase
import com.smartfarm.shared.network.SmartFarmApi
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow
import kotlinx.coroutines.flow.map

/**
 * Shared Task repository using SQLDelight and Ktor
 */
class TaskRepository(
    private val api: SmartFarmApi,
    private val database: FarmDatabase
) {
    
    fun getTasks(farmId: String? = null): Flow<Resource<List<TaskDto>>> = flow {
        emit(Resource.Loading)
        
        try {
            val networkResult = api.getTasks(farmId)
            when (networkResult) {
                is Resource.Success -> {
                    val tasks = networkResult.data
                    // Cache the data
                    tasks.forEach { task ->
                        database.taskDatabaseQueries.insertTask(
                            id = task.id,
                            farmId = task.farmId,
                            title = task.title,
                            description = task.description,
                            status = task.status,
                            priority = task.priority,
                            dueDate = task.dueDate,
                            assignedTo = task.assignedTo,
                            createdAt = task.createdAt,
                            updatedAt = task.updatedAt
                        )
                    }
                    emit(Resource.Success(tasks))
                }
                is Resource.Error -> {
                    val cached = getTasksFromCache(farmId)
                    if (cached.isNotEmpty()) {
                        emit(Resource.Error(networkResult.exception, cached))
                    } else {
                        emit(networkResult)
                    }
                }
                is Resource.Loading -> emit(Resource.Loading)
            }
        } catch (e: Exception) {
            val cached = getTasksFromCache(farmId)
            if (cached.isNotEmpty()) {
                emit(Resource.Error(e, cached))
            } else {
                emit(Resource.Error(e))
            }
        }
    }
    
    fun observeTasks(farmId: String? = null): Flow<List<TaskDto>> {
        val query = if (farmId != null) {
            database.taskDatabaseQueries.getTasksByFarmId(farmId)
        } else {
            database.taskDatabaseQueries.getAllTasks()
        }
        
        return query.asFlow().map { queryResult ->
            queryResult.executeAsList().map { row ->
                TaskDto(
                    id = row.id,
                    title = row.title,
                    description = row.description,
                    farmId = row.farmId,
                    status = row.status,
                    priority = row.priority,
                    dueDate = row.dueDate,
                    assignedTo = row.assignedTo,
                    createdAt = row.createdAt,
                    updatedAt = row.updatedAt
                )
            }
        }
    }
    
    suspend fun createTask(task: TaskDto): Resource<TaskDto> {
        return try {
            val result = api.createTask(task)
            when (result) {
                is Resource.Success -> {
                    val created = result.data
                    database.taskDatabaseQueries.insertTask(
                        id = created.id,
                        farmId = created.farmId,
                        title = created.title,
                        description = created.description,
                        status = created.status,
                        priority = created.priority,
                        dueDate = created.dueDate,
                        assignedTo = created.assignedTo,
                        createdAt = created.createdAt,
                        updatedAt = created.updatedAt
                    )
                    Resource.Success(created)
                }
                is Resource.Error -> result
                is Resource.Loading -> Resource.Error(Exception("Unexpected loading state"))
            }
        } catch (e: Exception) {
            Resource.Error(e)
        }
    }
    
    suspend fun updateTask(task: TaskDto): Resource<TaskDto> {
        return try {
            val result = api.updateTask(task.id, task)
            when (result) {
                is Resource.Success -> {
                    val updated = result.data
                    database.taskDatabaseQueries.updateTask(
                        farmId = updated.farmId,
                        title = updated.title,
                        description = updated.description,
                        status = updated.status,
                        priority = updated.priority,
                        dueDate = updated.dueDate,
                        assignedTo = updated.assignedTo,
                        updatedAt = updated.updatedAt,
                        id = updated.id
                    )
                    Resource.Success(updated)
                }
                is Resource.Error -> result
                is Resource.Loading -> Resource.Error(Exception("Unexpected loading state"))
            }
        } catch (e: Exception) {
            Resource.Error(e)
        }
    }
    
    suspend fun deleteTask(taskId: String): Resource<Unit> {
        return try {
            val result = api.deleteTask(taskId)
            when (result) {
                is Resource.Success -> {
                    database.taskDatabaseQueries.deleteTask(taskId)
                    Resource.Success(Unit)
                }
                is Resource.Error -> result
                is Resource.Loading -> Resource.Error(Exception("Unexpected loading state"))
            }
        } catch (e: Exception) {
            Resource.Error(e)
        }
    }
    
    private suspend fun getTasksFromCache(farmId: String?): List<TaskDto> {
        val query = if (farmId != null) {
            database.taskDatabaseQueries.getTasksByFarmId(farmId)
        } else {
            database.taskDatabaseQueries.getAllTasks()
        }
        
        return query.executeAsList().map { row ->
            TaskDto(
                id = row.id,
                title = row.title,
                description = row.description,
                farmId = row.farmId,
                status = row.status,
                priority = row.priority,
                dueDate = row.dueDate,
                assignedTo = row.assignedTo,
                createdAt = row.createdAt,
                updatedAt = row.updatedAt
            )
        }
    }
}

