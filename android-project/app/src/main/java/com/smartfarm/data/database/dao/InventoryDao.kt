package com.smartfarm.data.database.dao

import androidx.room.*
import com.smartfarm.data.database.entity.InventoryItemEntity
import kotlinx.coroutines.flow.Flow

@Dao
interface InventoryDao {
    @Query("SELECT * FROM inventory")
    fun getAllInventory(): Flow<List<InventoryItemEntity>>
    
    @Query("SELECT * FROM inventory WHERE farmId = :farmId")
    fun getInventoryByFarm(farmId: String): Flow<List<InventoryItemEntity>>
    
    @Query("SELECT * FROM inventory WHERE id = :id")
    suspend fun getInventoryById(id: String): InventoryItemEntity?
    
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertInventoryItem(item: InventoryItemEntity)
    
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertAll(items: List<InventoryItemEntity>)
    
    @Update
    suspend fun updateInventoryItem(item: InventoryItemEntity)
    
    @Delete
    suspend fun deleteInventoryItem(item: InventoryItemEntity)
    
    @Query("DELETE FROM inventory")
    suspend fun deleteAll()
}

