package com.yourcompany.smartfarm.shared.models

data class Livestock(
    val id: Long = 0,
    val name: String,
    val type: LivestockType,
    val breed: String,
    val farmId: Long,
    val birthDate: String, // ISO date string
    val weight: Double, // in kg
    val status: LivestockStatus,
    val location: String,
    val notes: String = "",
    val lastVaccination: String? = null, // ISO date string
    val nextVaccination: String? = null // ISO date string
)

enum class LivestockType {
    CATTLE,
    SHEEP,
    GOATS,
    PIGS,
    POULTRY,
    HORSES,
    FISH,
    OTHER
}

enum class LivestockStatus {
    ACTIVE,
    INACTIVE,
    SOLD,
    DECEASED,
    UNDER_TREATMENT
}

enum class HealthStatus {
    EXCELLENT,
    GOOD,
    FAIR,
    POOR,
    SICK,
    UNDER_TREATMENT
}
