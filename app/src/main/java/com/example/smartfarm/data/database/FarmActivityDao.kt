package com.example.smartfarm.data.database

import androidx.room.*
import com.example.smartfarm.data.model.FarmActivity
import kotlinx.coroutines.flow.Flow

@Dao
interface FarmActivityDao {
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insert(activity: FarmActivity): Long

    @Update
    suspend fun update(activity: FarmActivity)

    @Delete
    suspend fun delete(activity: FarmActivity)

    @Query("SELECT * FROM farm_activities WHERE id = :id")
    suspend fun getById(id: Long): FarmActivity?

    @Query("SELECT * FROM farm_activities ORDER BY date, time")
    fun getAll(): Flow<List<FarmActivity>>

    @Query("SELECT * FROM farm_activities WHERE date = :date ORDER BY time")
    fun getByDate(date: String): Flow<List<FarmActivity>>
    
    // Add missing method for utility classes
    @Query("SELECT * FROM farm_activities ORDER BY date, time")
    suspend fun getAllActivities(): List<FarmActivity>
} 