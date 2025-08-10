package com.example.smartfarm.data.database

import androidx.room.*
import com.example.smartfarm.data.model.LivestockReminder
import kotlinx.coroutines.flow.Flow

@Dao
interface LivestockReminderDao {
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insert(reminder: LivestockReminder): Long

    @Delete
    suspend fun delete(reminder: LivestockReminder)

    @Query("SELECT * FROM livestock_reminder WHERE livestockId = :livestockId")
    fun getRemindersForLivestock(livestockId: Long): Flow<List<LivestockReminder>>

    @Query("SELECT * FROM livestock_reminder")
    fun getAllReminders(): Flow<List<LivestockReminder>>
} 