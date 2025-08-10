package com.example.smartfarm.data.database

import androidx.room.*
import com.example.smartfarm.data.model.Plant
import com.example.smartfarm.data.model.PlantCategory
import kotlinx.coroutines.flow.Flow

@Dao
interface PlantDao {
    
    @Query("SELECT * FROM plants WHERE isActive = 1")
    fun getAllPlants(): Flow<List<Plant>>
    
    @Query("SELECT * FROM plants WHERE category = :category AND isActive = 1")
    fun getPlantsByCategory(category: PlantCategory): Flow<List<Plant>>
    
    @Query("SELECT * FROM plants WHERE id = :id")
    suspend fun getPlantById(id: Long): Plant?
    
    @Query("SELECT * FROM plants WHERE name LIKE '%' || :query || '%' OR scientificName LIKE '%' || :query || '%' AND isActive = 1")
    fun searchPlants(query: String): Flow<List<Plant>>
    
    @Query("SELECT * FROM plants WHERE climateZone LIKE '%' || :climate || '%' AND isActive = 1")
    fun getPlantsByClimate(climate: String): Flow<List<Plant>>
    
    @Query("SELECT * FROM plants WHERE soilType = :soilType AND isActive = 1")
    fun getPlantsBySoilType(soilType: String): Flow<List<Plant>>
    
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertPlant(plant: Plant): Long
    
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertPlants(plants: List<Plant>)
    
    @Update
    suspend fun updatePlant(plant: Plant)
    
    @Delete
    suspend fun deletePlant(plant: Plant)
    
    @Query("UPDATE plants SET isActive = 0 WHERE id = :id")
    suspend fun softDeletePlant(id: Long)
    
    @Query("SELECT DISTINCT category FROM plants WHERE isActive = 1")
    fun getAllCategories(): Flow<List<PlantCategory>>
    
    @Query("SELECT * FROM plants WHERE commonPests LIKE '%' || :pestName || '%' AND isActive = 1")
    fun getPlantsAffectedByPest(pestName: String): Flow<List<Plant>>
} 