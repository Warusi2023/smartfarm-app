package com.yourcompany.smartfarm.data.database

import androidx.room.*
import com.yourcompany.smartfarm.data.model.Herbicide

@Dao
interface HerbicideDao {
    @Query("SELECT * FROM Herbicide")
    fun getAllHerbicides(): List<Herbicide>

    @Query("SELECT * FROM Herbicide WHERE id = :id")
    fun getHerbicideById(id: Int): Herbicide?

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    fun insertHerbicide(herbicide: Herbicide)

    @Delete
    fun deleteHerbicide(herbicide: Herbicide)
} 