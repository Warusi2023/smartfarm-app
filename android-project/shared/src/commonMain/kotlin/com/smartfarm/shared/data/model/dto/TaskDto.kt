package com.smartfarm.shared.data.model.dto

import kotlinx.serialization.Serializable

@Serializable
data class TaskDto(
    val id: String,
    val title: String,
    val description: String? = null,
    val farmId: String,
    val status: String,
    val priority: String? = null,
    /** Backend field from farm_tasks (GET /api/farms/:farmId/tasks). */
    val dueAt: String? = null,
    val dueDate: String? = null,
    val assignedToUserId: String? = null,
    val assignedTo: String? = null,
    /** Joined assignee display fields from farm task service. */
    val assigneeName: String? = null,
    val assigneeEmail: String? = null,
    val createdAt: String? = null,
    val updatedAt: String? = null
)

