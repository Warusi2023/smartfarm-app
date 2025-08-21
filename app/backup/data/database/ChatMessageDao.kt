package com.yourcompany.smartfarm.data.database

import androidx.room.*
import com.yourcompany.smartfarm.data.model.ChatMessageEntity
import kotlinx.coroutines.flow.Flow

@Dao
interface ChatMessageDao {
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insert(message: ChatMessageEntity): Long

    @Query("SELECT * FROM chat_messages ORDER BY timestamp ASC")
    fun getAll(): Flow<List<ChatMessageEntity>>

    @Query("DELETE FROM chat_messages")
    suspend fun deleteAll()
} 