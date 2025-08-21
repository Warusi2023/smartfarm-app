package com.yourcompany.smartfarm.data.model

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "chat_messages")
data class ChatMessageEntity(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    val text: String,
    val sender: String, // "user" or "ai"
    val timestamp: Long = System.currentTimeMillis()
) 