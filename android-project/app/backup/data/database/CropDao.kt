package com.yourcompany.smartfarm.data.database

import androidx.room.*
import com.yourcompany.smartfarm.data.model.Crop
import kotlinx.coroutines.flow.Flow

@Dao
interface CropDao {
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertCrop(crop: Crop)

    @Query("SELECT * FROM Crop")
    fun getAllCrops(): Flow<List<Crop>>
    
    @Query("SELECT * FROM Crop WHERE userId = :userId AND isActive = 1 ORDER BY name ASC")
    suspend fun getCropsByUserId(userId: Long): List<Crop>
    
    // Add missing method for utility classes
    @Query("SELECT * FROM Crop")
    suspend fun getAllRecords(): List<Crop>
}
