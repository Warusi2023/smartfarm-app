package com.example.smartfarm.data.database

import androidx.room.*
import com.example.smartfarm.data.model.Flower
import com.example.smartfarm.data.model.FlowerCategory
import kotlinx.coroutines.flow.Flow

@Dao
interface FlowerDao {
    
    @Query("SELECT * FROM flowers WHERE isActive = 1")
    fun getAllFlowers(): Flow<List<Flower>>
    
    @Query("SELECT * FROM flowers WHERE category = :category AND isActive = 1")
    fun getFlowersByCategory(category: FlowerCategory): Flow<List<Flower>>
    
    @Query("SELECT * FROM flowers WHERE id = :id")
    suspend fun getFlowerById(id: Long): Flower?
    
    @Query("SELECT * FROM flowers WHERE name LIKE '%' || :query || '%' OR scientificName LIKE '%' || :query || '%' AND isActive = 1")
    fun searchFlowers(query: String): Flow<List<Flower>>
    
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertFlower(flower: Flower): Long
    
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertFlowers(flowers: List<Flower>)
    
    @Update
    suspend fun updateFlower(flower: Flower)
    
    @Delete
    suspend fun deleteFlower(flower: Flower)
    
    @Query("SELECT DISTINCT category FROM flowers WHERE isActive = 1")
    fun getAllCategories(): Flow<List<FlowerCategory>>
} 