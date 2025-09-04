package com.yourcompany.smartfarm.data.database

import androidx.room.Dao
import androidx.room.Insert
import androidx.room.Query
import androidx.room.Delete
import com.yourcompany.smartfarm.data.model.CalculationRecord

@Dao
interface CalculationDao {
    @Insert
    suspend fun insert(record: CalculationRecord): Long

    @Query("SELECT * FROM calculation_records ORDER BY timestamp DESC")
    suspend fun getAll(): List<CalculationRecord>

    @Delete
    suspend fun delete(record: CalculationRecord)

    @Query("DELETE FROM calculation_records")
    suspend fun deleteAll()
} 