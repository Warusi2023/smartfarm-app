package com.yourcompany.smartfarm.shared.models

data class Farm(
    val id: Long = 0,
    val name: String,
    val location: Location,
    val size: Double, // in acres/hectares
    val type: FarmType,
    val status: FarmStatus,
    val ownerId: Long,
    val createdAt: Long = 0L,
    val updatedAt: Long = 0L,
    val isActive: Boolean = true
)

enum class FarmType {
    CROP,
    LIVESTOCK,
    MIXED,
    DAIRY,
    POULTRY,
    AQUACULTURE
}

enum class FarmStatus {
    ACTIVE,
    INACTIVE,
    MAINTENANCE,
    SEASONAL
}

data class Location(
    val latitude: Double,
    val longitude: Double,
    val address: String
)
