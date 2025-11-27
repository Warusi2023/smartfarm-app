package com.smartfarm.data.database.dao

import androidx.room.*
import com.smartfarm.data.database.entity.FarmEntity
import kotlinx.coroutines.flow.Flow

@Dao
interface FarmDao {
    @Query("SELECT * FROM farms WHERE isActive = 1")
    fun getAllFarms(): Flow<List<FarmEntity>>
    
    @Query("SELECT * FROM farms WHERE id = :id")
    suspend fun getFarmById(id: String): FarmEntity?
    
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertFarm(farm: FarmEntity)
    
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertAll(farms: List<FarmEntity>)
    
    @Update
    suspend fun updateFarm(farm: FarmEntity)
    
    @Delete
    suspend fun deleteFarm(farm: FarmEntity)
    
    @Query("DELETE FROM farms")
    suspend fun deleteAll()
}

