package com.smartfarm.shared.data.model.dto

import kotlinx.serialization.Serializable

/**
 * Matches the backend farm payload from GET /api/farms:
 * { id, name, location (plain string), areaHectares, farmType,
 *   description, latitude, longitude, isActive, createdAt, updatedAt }
 */
@Serializable
data class FarmDto(
    val id: String,
    val name: String,
    val location: String? = null,
    val areaHectares: Double? = null,
    val farmType: String? = null,
    val description: String? = null,
    val latitude: Double? = null,
    val longitude: Double? = null,
    val isActive: Boolean = true,
    val createdAt: String? = null,
    val updatedAt: String? = null
)
