package com.yourcompany.smartfarm.shared.models

data class Task(
    val id: Long = 0,
    val title: String,
    val description: String,
    val farmId: Long,
    val assignedTo: Long?, // User ID
    val priority: TaskPriority,
    val status: TaskStatus,
    val dueDate: Long,
    val completedDate: Long? = null,
    val category: TaskCategory,
    val estimatedHours: Double? = null,
    val actualHours: Double? = null,
    val notes: String = ""
)

enum class TaskPriority {
    LOW,
    MEDIUM,
    HIGH,
    URGENT
}

enum class TaskStatus {
    PENDING,
    IN_PROGRESS,
    COMPLETED,
    CANCELLED,
    OVERDUE
}

enum class TaskCategory {
    PLANTING,
    HARVESTING,
    IRRIGATION,
    FERTILIZATION,
    PEST_CONTROL,
    LIVESTOCK_CARE,
    EQUIPMENT_MAINTENANCE,
    FINANCIAL,
    ADMINISTRATIVE,
    OTHER
}
