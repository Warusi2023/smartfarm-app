// data/dao/PetDao.kt
package com.example.smartfarm.data.dao

import androidx.room.*
import com.example.smartfarm.data.model.Pet
import kotlinx.coroutines.flow.Flow

@Dao
interface PetDao {
    @Query("SELECT * FROM Pet")
    fun getAll(): Flow<List<Pet>>

    @Query("SELECT * FROM Pet WHERE id = :id")
    suspend fun getById(id: Int): Pet?

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insert(pet: Pet)

    @Delete
    suspend fun delete(pet: Pet)
}