package com.yourcompany.smartfarm.data.database

import androidx.room.*
import com.yourcompany.smartfarm.data.model.Fish
import com.yourcompany.smartfarm.data.model.FishCategory
import kotlinx.coroutines.flow.Flow

@Dao
interface FishDao {
    
    @Query("SELECT * FROM fish WHERE isActive = 1")
    fun getAllFish(): Flow<List<Fish>>
    
    @Query("SELECT * FROM fish WHERE category = :category AND isActive = 1")
    fun getFishByCategory(category: FishCategory): Flow<List<Fish>>
    
    @Query("SELECT * FROM fish WHERE id = :id")
    suspend fun getFishById(id: Long): Fish?
    
    @Query("SELECT * FROM fish WHERE (name LIKE '%' || :query || '%' OR scientificName LIKE '%' || :query || '%') AND isActive = 1")
    fun searchFish(query: String): Flow<List<Fish>>
    
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertFish(fish: Fish): Long
    
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertFishList(fishList: List<Fish>)
    
    @Update
    suspend fun updateFish(fish: Fish)
    
    @Delete
    suspend fun deleteFish(fish: Fish)
    
    @Query("SELECT DISTINCT category FROM fish WHERE isActive = 1")
    fun getAllCategories(): Flow<List<FishCategory>>
} 