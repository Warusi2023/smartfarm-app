package com.smartfarm.shared.data.model.dto

import kotlinx.serialization.Serializable

@Serializable
data class CropDto(
    @Serializable(with = FlexibleStringSerializer::class)
    val id: String,
    val name: String,
    val variety: String? = null,
    val type: String? = null,
    val farmId: String? = null,
    val plantedDate: String? = null,
    val expectedHarvestDate: String? = null,
    val area: Double? = null,
    val status: String? = null,
    val notes: String? = null,
    val description: String? = null,
    val createdAt: String? = null,
    val updatedAt: String? = null
)
