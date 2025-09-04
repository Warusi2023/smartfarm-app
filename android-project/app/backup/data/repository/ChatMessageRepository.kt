package com.yourcompany.smartfarm.data.repository

import com.yourcompany.smartfarm.data.database.ChatMessageDao
import com.yourcompany.smartfarm.data.model.ChatMessageEntity
import kotlinx.coroutines.flow.Flow

class ChatMessageRepository(private val dao: ChatMessageDao) {
    suspend fun insert(message: ChatMessageEntity) = dao.insert(message)
    fun getAll(): Flow<List<ChatMessageEntity>> = dao.getAll()
    suspend fun deleteAll() = dao.deleteAll()
} 