package com.example.smartfarm.data.database

import androidx.room.*
import com.example.smartfarm.data.model.FarmLocation
import kotlinx.coroutines.flow.Flow

@Dao
interface FarmLocationDao {
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun upsert(location: FarmLocation)

    @Query("SELECT * FROM farm_locations WHERE id = 1")
    fun getFarmLocation(): Flow<FarmLocation?>

    @Query("DELETE FROM farm_locations")
    suspend fun deleteAll()
} 