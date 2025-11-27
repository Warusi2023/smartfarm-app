package com.smartfarm.shared.data.model.dto

import kotlinx.serialization.Serializable

@Serializable
data class CropDto(
    val id: String,
    val name: String,
    val variety: String? = null,
    val farmId: String,
    val plantedDate: String? = null,
    val expectedHarvestDate: String? = null,
    val area: Double? = null,
    val status: String? = null,
    val notes: String? = null,
    val createdAt: String? = null,
    val updatedAt: String? = null
)

