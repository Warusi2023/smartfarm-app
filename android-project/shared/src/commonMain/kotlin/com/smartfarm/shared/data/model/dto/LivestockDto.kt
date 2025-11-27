package com.smartfarm.shared.data.model.dto

import kotlinx.serialization.Serializable

@Serializable
data class LivestockDto(
    val id: String,
    val name: String,
    val type: String,
    val breed: String? = null,
    val farmId: String,
    val birthDate: String? = null,
    val weight: Double? = null,
    val status: String? = null,
    val location: String? = null,
    val description: String? = null,
    val tag: String? = null,
    val sex: String? = null,
    val purpose: String? = null,
    val value: Double? = null,
    val createdAt: String? = null,
    val updatedAt: String? = null
)

