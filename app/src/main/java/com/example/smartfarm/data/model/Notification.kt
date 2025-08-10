package com.example.smartfarm.data.model

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "notifications")
data class Notification(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val title: String,
    val message: String,
    val type: NotificationType,
    val priority: Priority,
    val scheduledTime: Long,
    val sentTime: Long? = null,
    val isRead: Boolean = false,
    val isDismissed: Boolean = false,
    val actionRequired: Boolean = false,
    val actionUrl: String? = null,
    val relatedEntityId: Long? = null,
    val relatedEntityType: String? = null,
    val createdAt: Long = System.currentTimeMillis()
)

enum class NotificationType {
    TASK_REMINDER,
    WEATHER_ALERT,
    PEST_ALERT,
    DISEASE_ALERT,
    HARVEST_REMINDER,
    MAINTENANCE_REMINDER,
    MARKET_UPDATE,
    SYSTEM_UPDATE
} 