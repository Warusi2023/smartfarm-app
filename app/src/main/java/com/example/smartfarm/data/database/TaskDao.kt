package com.example.smartfarm.data.database

import androidx.room.*
import com.example.smartfarm.data.model.Task
import kotlinx.coroutines.flow.Flow

@Dao
interface TaskDao {
    @Query("SELECT * FROM tasks WHERE scheduledDate <= :now AND status = 'PENDING'")
    suspend fun getDueTasks(now: Long): List<Task>

    @Query("SELECT * FROM tasks")
    fun getAllTasks(): Flow<List<Task>>
    
    @Query("SELECT * FROM tasks WHERE userId = :userId ORDER BY scheduledDate ASC")
    suspend fun getTasksByUserId(userId: Long): List<Task>

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertTask(task: Task)

    @Update
    suspend fun updateTask(task: Task)

    @Delete
    suspend fun deleteTask(task: Task)
} 