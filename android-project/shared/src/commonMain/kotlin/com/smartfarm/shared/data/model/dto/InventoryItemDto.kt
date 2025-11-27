package com.smartfarm.shared.data.model.dto

import kotlinx.serialization.Serializable

@Serializable
data class InventoryItemDto(
    val id: String,
    val name: String,
    val category: String,
    val quantity: Double,
    val unit: String,
    val farmId: String,
    val cost: Double? = null,
    val supplier: String? = null,
    val expiryDate: String? = null,
    val location: String? = null,
    val notes: String? = null,
    val createdAt: String? = null,
    val updatedAt: String? = null
)

