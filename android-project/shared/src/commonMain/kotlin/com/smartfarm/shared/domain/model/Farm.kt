package com.smartfarm.shared.domain.model

import kotlinx.serialization.Serializable

@Serializable
data class Farm(
    val id: String,
    val name: String,
    val location: Location,
    val size: Double, // in hectares
    val type: FarmType,
    val status: FarmStatus,
    val createdAt: Long,
    val updatedAt: Long
)

@Serializable
data class Location(
    val latitude: Double,
    val longitude: Double,
    val address: String? = null
)

@Serializable
enum class FarmType {
    CROP,
    LIVESTOCK,
    MIXED,
    AQUACULTURE,
    DAIRY,
    POULTRY
}

@Serializable
enum class FarmStatus {
    ACTIVE,
    INACTIVE,
    MAINTENANCE,
    HARVESTING,
    PLANTING
}
