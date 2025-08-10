package com.example.smartfarm.data.database

import androidx.room.*
import com.example.smartfarm.data.model.Livestock
import com.example.smartfarm.data.model.LivestockCategory
import kotlinx.coroutines.flow.Flow

@Dao
interface LivestockDao {
    
    @Query("SELECT * FROM livestock WHERE isActive = 1 ORDER BY name ASC")
    fun getAllLivestock(): Flow<List<Livestock>>
    
    @Query("SELECT * FROM livestock WHERE farmId = :farmId AND isActive = 1 ORDER BY name ASC")
    fun getLivestockByFarm(farmId: Long): Flow<List<Livestock>>
    
    @Query("SELECT * FROM livestock WHERE userId = :userId AND isActive = 1 ORDER BY name ASC")
    suspend fun getLivestockByUserId(userId: Long): List<Livestock>
    
    @Query("SELECT * FROM livestock WHERE category = :category AND isActive = 1 ORDER BY name ASC")
    fun getLivestockByCategory(category: LivestockCategory): Flow<List<Livestock>>
    
    @Query("SELECT * FROM livestock WHERE farmId = :farmId AND category = :category AND isActive = 1 ORDER BY name ASC")
    fun getLivestockByFarmAndCategory(farmId: Long, category: LivestockCategory): Flow<List<Livestock>>
    
    @Query("SELECT * FROM livestock WHERE id = :id")
    suspend fun getLivestockById(id: Long): Livestock?
    
    @Query("SELECT * FROM livestock WHERE name LIKE '%' || :query || '%' OR scientificName LIKE '%' || :query || '%' AND isActive = 1 ORDER BY name ASC")
    fun searchLivestock(query: String): Flow<List<Livestock>>
    
    @Query("SELECT * FROM livestock WHERE farmId = :farmId AND (name LIKE '%' || :query || '%' OR scientificName LIKE '%' || :query || '%') AND isActive = 1 ORDER BY name ASC")
    fun searchLivestockByFarm(farmId: Long, query: String): Flow<List<Livestock>>
    
    @Query("SELECT COUNT(*) FROM livestock WHERE farmId = :farmId AND isActive = 1")
    suspend fun getLivestockCountByFarm(farmId: Long): Int
    
    @Query("SELECT COUNT(*) FROM livestock WHERE farmId = :farmId AND category = :category AND isActive = 1")
    suspend fun getLivestockCountByFarmAndCategory(farmId: Long, category: LivestockCategory): Int
    
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertLivestock(livestock: Livestock): Long
    
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertLivestockList(livestockList: List<Livestock>)
    
    @Update
    suspend fun updateLivestock(livestock: Livestock)
    
    @Delete
    suspend fun deleteLivestock(livestock: Livestock)
    
    @Query("UPDATE livestock SET isActive = 0 WHERE id = :id")
    suspend fun softDeleteLivestock(id: Long)
    
    @Query("SELECT DISTINCT category FROM livestock WHERE isActive = 1 ORDER BY category ASC")
    fun getAllCategories(): Flow<List<LivestockCategory>>
    
    @Query("SELECT DISTINCT category FROM livestock WHERE farmId = :farmId AND isActive = 1 ORDER BY category ASC")
    fun getCategoriesByFarm(farmId: Long): Flow<List<LivestockCategory>>
} 