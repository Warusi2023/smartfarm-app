package com.example.smartfarm.data.database

import androidx.room.*
import com.example.smartfarm.data.model.OutlierAcknowledgment

@Dao
interface OutlierAcknowledgmentDao {
    @Insert
    suspend fun insert(ack: OutlierAcknowledgment): Long

    @Query("SELECT * FROM outlier_acknowledgments WHERE animalId = :animalId ORDER BY timestamp DESC")
    suspend fun getForAnimal(animalId: Long): List<OutlierAcknowledgment>

    @Query("SELECT * FROM outlier_acknowledgments ORDER BY timestamp DESC")
    suspend fun getAll(): List<OutlierAcknowledgment>

    @Delete
    suspend fun delete(ack: OutlierAcknowledgment)
} 