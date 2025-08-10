package com.example.smartfarm.data.database

import androidx.room.*
import com.example.smartfarm.data.model.YieldRecord
import kotlinx.coroutines.flow.Flow

@Dao
interface YieldRecordDao {
    @Insert
    suspend fun insert(record: YieldRecord): Long

    @Query("SELECT * FROM yield_records WHERE animalId = :animalId ORDER BY date DESC")
    fun getForAnimal(animalId: Long): Flow<List<YieldRecord>>

    @Query("SELECT * FROM yield_records WHERE animalId = :animalId AND yieldType = :yieldType ORDER BY date DESC")
    fun getForAnimalByYieldType(animalId: Long, yieldType: String): Flow<List<YieldRecord>>

    @Query("SELECT * FROM yield_records WHERE animalId = :animalId AND date >= :startDate ORDER BY date DESC")
    fun getForAnimalFromDate(animalId: Long, startDate: String): Flow<List<YieldRecord>>

    @Query("SELECT * FROM yield_records WHERE animalId = :animalId AND date BETWEEN :startDate AND :endDate ORDER BY date DESC")
    fun getForAnimalInDateRange(animalId: Long, startDate: String, endDate: String): Flow<List<YieldRecord>>

    @Query("SELECT * FROM yield_records WHERE yieldType = :yieldType ORDER BY date DESC")
    fun getByYieldType(yieldType: String): Flow<List<YieldRecord>>

    @Query("SELECT * FROM yield_records ORDER BY date DESC")
    fun getAll(): Flow<List<YieldRecord>>

    @Query("SELECT SUM(quantity) FROM yield_records WHERE animalId = :animalId")
    suspend fun getTotalYieldForAnimal(animalId: Long): Double?

    @Query("SELECT SUM(quantity) FROM yield_records WHERE animalId = :animalId AND yieldType = :yieldType")
    suspend fun getTotalYieldForAnimalByType(animalId: Long, yieldType: String): Double?

    @Query("SELECT SUM(quantity) FROM yield_records WHERE animalId = :animalId AND date BETWEEN :startDate AND :endDate")
    suspend fun getTotalYieldForAnimalInDateRange(animalId: Long, startDate: String, endDate: String): Double?

    @Query("SELECT AVG(quantity) FROM yield_records WHERE animalId = :animalId AND yieldType = :yieldType")
    suspend fun getAverageYieldForAnimalByType(animalId: Long, yieldType: String): Double?

    @Query("SELECT COUNT(*) FROM yield_records WHERE animalId = :animalId")
    suspend fun getCountForAnimal(animalId: Long): Int

    @Query("SELECT COUNT(*) FROM yield_records WHERE animalId = :animalId AND yieldType = :yieldType")
    suspend fun getCountForAnimalByYieldType(animalId: Long, yieldType: String): Int

    @Query("SELECT * FROM yield_records WHERE animalId = :animalId ORDER BY date DESC LIMIT :limit")
    fun getRecentForAnimal(animalId: Long, limit: Int = 10): Flow<List<YieldRecord>>

    @Query("SELECT * FROM yield_records WHERE animalId = :animalId AND yieldType = :yieldType ORDER BY quantity DESC LIMIT 1")
    suspend fun getHighestYieldForAnimalByType(animalId: Long, yieldType: String): YieldRecord?

    @Update
    suspend fun update(record: YieldRecord)

    @Delete
    suspend fun delete(record: YieldRecord)

    @Query("DELETE FROM yield_records WHERE animalId = :animalId")
    suspend fun deleteAllForAnimal(animalId: Long)
} 