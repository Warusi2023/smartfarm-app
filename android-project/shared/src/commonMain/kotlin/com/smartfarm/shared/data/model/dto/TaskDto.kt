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
    val dueDate: String? = null,
    val assignedTo: String? = null,
    val createdAt: String? = null,
    val updatedAt: String? = null
)

