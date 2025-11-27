package com.smartfarm.data.database.dao

import androidx.room.*
import com.smartfarm.data.database.entity.LivestockEntity
import kotlinx.coroutines.flow.Flow

@Dao
interface LivestockDao {
    @Query("SELECT * FROM livestock")
    fun getAllLivestock(): Flow<List<LivestockEntity>>
    
    @Query("SELECT * FROM livestock WHERE farmId = :farmId")
    fun getLivestockByFarm(farmId: String): Flow<List<LivestockEntity>>
    
    @Query("SELECT * FROM livestock WHERE id = :id")
    suspend fun getLivestockById(id: String): LivestockEntity?
    
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertLivestock(livestock: LivestockEntity)
    
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertAll(livestock: List<LivestockEntity>)
    
    @Update
    suspend fun updateLivestock(livestock: LivestockEntity)
    
    @Delete
    suspend fun deleteLivestock(livestock: LivestockEntity)
    
    @Query("DELETE FROM livestock")
    suspend fun deleteAll()
}

