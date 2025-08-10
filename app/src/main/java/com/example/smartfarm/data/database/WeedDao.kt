package com.example.smartfarm.data.database

import androidx.room.*
import com.example.smartfarm.data.model.Weed

@Dao
interface WeedDao {
    @Query("SELECT * FROM Weed")
    fun getAllWeeds(): List<Weed>

    @Query("SELECT * FROM Weed WHERE id = :id")
    fun getWeedById(id: Int): Weed?

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    fun insertWeed(weed: Weed)

    @Delete
    fun deleteWeed(weed: Weed)
} 