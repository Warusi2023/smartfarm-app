package com.yourcompany.smartfarm.data.database

import androidx.room.*
import com.yourcompany.smartfarm.data.model.AnimalHealthRecord
import kotlinx.coroutines.flow.Flow

@Dao
interface AnimalHealthRecordDao {
    @Insert
    suspend fun insert(record: AnimalHealthRecord): Long

    @Query("SELECT * FROM animal_health_records WHERE animalId = :animalId ORDER BY date DESC")
    fun getForAnimal(animalId: Long): Flow<List<AnimalHealthRecord>>

    @Query("SELECT * FROM animal_health_records WHERE animalId = :animalId AND eventType = :eventType ORDER BY date DESC")
    fun getForAnimalByEventType(animalId: Long, eventType: String): Flow<List<AnimalHealthRecord>>

    @Query("SELECT * FROM animal_health_records WHERE animalId = :animalId AND date >= :startDate ORDER BY date DESC")
    fun getForAnimalFromDate(animalId: Long, startDate: String): Flow<List<AnimalHealthRecord>>

    @Query("SELECT * FROM animal_health_records WHERE animalId = :animalId AND date BETWEEN :startDate AND :endDate ORDER BY date DESC")
    fun getForAnimalInDateRange(animalId: Long, startDate: String, endDate: String): Flow<List<AnimalHealthRecord>>

    @Query("SELECT * FROM animal_health_records WHERE eventType = :eventType ORDER BY date DESC")
    fun getByEventType(eventType: String): Flow<List<AnimalHealthRecord>>

    @Query("SELECT * FROM animal_health_records ORDER BY date DESC")
    fun getAll(): Flow<List<AnimalHealthRecord>>

    @Query("SELECT COUNT(*) FROM animal_health_records WHERE animalId = :animalId")
    suspend fun getCountForAnimal(animalId: Long): Int

    @Query("SELECT COUNT(*) FROM animal_health_records WHERE animalId = :animalId AND eventType = :eventType")
    suspend fun getCountForAnimalByEventType(animalId: Long, eventType: String): Int

    @Query("SELECT * FROM animal_health_records WHERE animalId = :animalId ORDER BY date DESC LIMIT :limit")
    fun getRecentForAnimal(animalId: Long, limit: Int = 10): Flow<List<AnimalHealthRecord>>

    @Update
    suspend fun update(record: AnimalHealthRecord)

    @Delete
    suspend fun delete(record: AnimalHealthRecord)

    @Query("DELETE FROM animal_health_records WHERE animalId = :animalId")
    suspend fun deleteAllForAnimal(animalId: Long)
} 