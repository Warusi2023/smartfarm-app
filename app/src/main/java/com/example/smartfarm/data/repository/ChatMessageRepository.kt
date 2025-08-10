package com.example.smartfarm.data.repository

import com.example.smartfarm.data.database.ChatMessageDao
import com.example.smartfarm.data.model.ChatMessageEntity
import kotlinx.coroutines.flow.Flow

class ChatMessageRepository(private val dao: ChatMessageDao) {
    suspend fun insert(message: ChatMessageEntity) = dao.insert(message)
    fun getAll(): Flow<List<ChatMessageEntity>> = dao.getAll()
    suspend fun deleteAll() = dao.deleteAll()
} 