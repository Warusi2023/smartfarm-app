package com.example.smartfarm.data.model

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "tasks")
data class Task(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val userId: Long = 0, // Added missing userId field
    val farmId: Long,
    val title: String,
    val description: String,
    val taskType: TaskType,
    val category: TaskCategory,
    val scheduledDate: Long,
    val completedDate: Long? = null,
    val priority: Priority,
    val status: TaskStatus,
    val estimatedDuration: Int, // in minutes
    val actualDuration: Int? = null,
    val assignedTo: String? = null,
    val notes: String? = null,
    val weatherDependent: Boolean = false,
    val weatherConditions: List<WeatherCondition>? = null,
    val createdAt: Long = System.currentTimeMillis(),
    val isRecurring: Boolean = false,
    val recurrencePattern: RecurrencePattern? = null
)

enum class TaskType {
    PLANTING,
    WATERING,
    FERTILIZING,
    PEST_CONTROL,
    HARVESTING,
    PRUNING,
    WEEDING,
    SOIL_PREPARATION,
    FEEDING,
    VACCINATION,
    BREEDING,
    HEALTH_CHECK,
    CLEANING,
    MAINTENANCE
}

enum class TaskCategory {
    CROP_MANAGEMENT,
    LIVESTOCK_MANAGEMENT,
    AQUACULTURE_MANAGEMENT,
    INFRASTRUCTURE,
    MARKETING,
    FINANCIAL
}

enum class Priority {
    LOW,
    MEDIUM,
    HIGH,
    URGENT,
    CRITICAL
}

enum class TaskStatus {
    PENDING,
    IN_PROGRESS,
    COMPLETED,
    CANCELLED,
    OVERDUE
}

// WeatherCondition enum moved to Weather.kt to avoid redeclaration

enum class RecurrencePattern {
    DAILY,
    WEEKLY,
    MONTHLY,
    SEASONAL,
    YEARLY
} 