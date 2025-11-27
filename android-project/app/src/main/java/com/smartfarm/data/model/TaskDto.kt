package com.smartfarm.data.model

import com.google.gson.annotations.SerializedName

data class TaskDto(
    @SerializedName("id") val id: String,
    @SerializedName("title") val title: String,
    @SerializedName("description") val description: String? = null,
    @SerializedName("farmId") val farmId: String,
    @SerializedName("status") val status: String,
    @SerializedName("priority") val priority: String? = null,
    @SerializedName("dueDate") val dueDate: String? = null,
    @SerializedName("assignedTo") val assignedTo: String? = null,
    @SerializedName("createdAt") val createdAt: String? = null,
    @SerializedName("updatedAt") val updatedAt: String? = null
)

