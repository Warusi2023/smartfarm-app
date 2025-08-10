package com.example.smartfarm.data.database

import androidx.room.*
import com.example.smartfarm.data.model.Pest
import kotlinx.coroutines.flow.Flow

@Dao
interface PestDao {
    @Query("SELECT * FROM pests")
    fun getAllPests(): Flow<List<Pest>>

    @Query("SELECT * FROM pests WHERE id = :id")
    suspend fun getPestById(id: Long): Pest?

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertPest(pest: Pest): Long

    @Update
    suspend fun updatePest(pest: Pest)

    @Delete
    suspend fun deletePest(pest: Pest)
} 