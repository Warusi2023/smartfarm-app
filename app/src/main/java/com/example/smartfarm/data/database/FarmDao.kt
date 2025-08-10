package com.example.smartfarm.data.database

import androidx.room.*
import com.example.smartfarm.data.model.Farm
import com.example.smartfarm.data.model.FarmLocation
import com.example.smartfarm.data.model.FarmType
import com.example.smartfarm.data.model.SoilType
import com.example.smartfarm.data.model.ClimateZone
import kotlinx.coroutines.flow.Flow

@Dao
interface FarmDao {
    
    @Query("SELECT * FROM farms WHERE isActive = 1 ORDER BY name ASC")
    fun getAllFarms(): Flow<List<Farm>>
    
    @Query("SELECT * FROM farms WHERE id = :id")
    suspend fun getFarmById(id: Long): Farm?
    
    @Query("SELECT * FROM farms WHERE farmType = :farmType AND isActive = 1 ORDER BY name ASC")
    fun getFarmsByType(farmType: FarmType): Flow<List<Farm>>
    
    @Query("SELECT * FROM farms WHERE userId = :userId AND isActive = 1 ORDER BY name ASC")
    suspend fun getFarmsByUserId(userId: Long): List<Farm>
    
    @Query("SELECT * FROM farms WHERE soilType = :soilType AND isActive = 1 ORDER BY name ASC")
    fun getFarmsBySoilType(soilType: SoilType): Flow<List<Farm>>
    
    @Query("SELECT * FROM farms WHERE climateZone = :climateZone AND isActive = 1 ORDER BY name ASC")
    fun getFarmsByClimateZone(climateZone: ClimateZone): Flow<List<Farm>>
    
    @Query("SELECT * FROM farms WHERE name LIKE '%' || :query || '%' AND isActive = 1 ORDER BY name ASC")
    fun searchFarms(query: String): Flow<List<Farm>>
    
    @Query("SELECT COUNT(*) FROM farms WHERE isActive = 1")
    suspend fun getActiveFarmCount(): Int
    
    @Query("SELECT COUNT(*) FROM farms WHERE farmType = :farmType AND isActive = 1")
    suspend fun getFarmCountByType(farmType: FarmType): Int
    
    @Query("SELECT SUM(size) FROM farms WHERE isActive = 1")
    suspend fun getTotalFarmSize(): Double?
    
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertFarm(farm: Farm): Long
    
    @Update
    suspend fun updateFarm(farm: Farm)
    
    @Delete
    suspend fun deleteFarm(farm: Farm)
    
    @Query("UPDATE farms SET isActive = 0 WHERE id = :id")
    suspend fun softDeleteFarm(id: Long)
    
    @Query("SELECT * FROM farm_locations WHERE farmId = :farmId")
    suspend fun getFarmLocation(farmId: Long): FarmLocation?
    
    @Query("SELECT * FROM farm_locations WHERE latitude BETWEEN :minLat AND :maxLat AND longitude BETWEEN :minLng AND :maxLng")
    fun getFarmsInRegion(minLat: Double, maxLat: Double, minLng: Double, maxLng: Double): Flow<List<FarmLocation>>
    
    @Query("SELECT * FROM farm_locations WHERE city = :city AND state = :state")
    fun getFarmsByLocation(city: String, state: String): Flow<List<FarmLocation>>
    
    @Query("SELECT * FROM farm_locations WHERE country = :country")
    fun getFarmsByCountry(country: String): Flow<List<FarmLocation>>
    
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertFarmLocation(location: FarmLocation)
    
    @Update
    suspend fun updateFarmLocation(location: FarmLocation)
    
    @Delete
    suspend fun deleteFarmLocation(location: FarmLocation)
} 