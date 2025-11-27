package com.smartfarm.data.database.dao

import androidx.room.*
import com.smartfarm.data.database.entity.CropEntity
import kotlinx.coroutines.flow.Flow

@Dao
interface CropDao {
    @Query("SELECT * FROM crops")
    fun getAllCrops(): Flow<List<CropEntity>>
    
    @Query("SELECT * FROM crops WHERE farmId = :farmId")
    fun getCropsByFarm(farmId: String): Flow<List<CropEntity>>
    
    @Query("SELECT * FROM crops WHERE id = :id")
    suspend fun getCropById(id: String): CropEntity?
    
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertCrop(crop: CropEntity)
    
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertAll(crops: List<CropEntity>)
    
    @Update
    suspend fun updateCrop(crop: CropEntity)
    
    @Delete
    suspend fun deleteCrop(crop: CropEntity)
    
    @Query("DELETE FROM crops")
    suspend fun deleteAll()
}

