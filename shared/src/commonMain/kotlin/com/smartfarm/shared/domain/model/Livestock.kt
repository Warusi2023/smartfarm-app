package com.smartfarm.shared.domain.model

import kotlinx.serialization.Serializable

@Serializable
data class Livestock(
    val id: String,
    val farmId: String,
    val tagNumber: String,
    val name: String?,
    val type: LivestockType,
    val breed: String,
    val birthDate: Long,
    val gender: Gender,
    val weight: Double, // in kg
    val status: LivestockStatus,
    val health: LivestockHealth,
    val location: String? = null,
    val createdAt: Long,
    val updatedAt: Long
)

@Serializable
data class LivestockHealth(
    val overallHealth: HealthStatus,
    val vaccinations: List<Vaccination> = emptyList(),
    val treatments: List<Treatment> = emptyList(),
    val lastCheckup: Long? = null,
    val notes: String? = null
)

@Serializable
data class Vaccination(
    val id: String,
    val type: String,
    val date: Long,
    val nextDueDate: Long? = null,
    val administeredBy: String? = null
)

@Serializable
data class Treatment(
    val id: String,
    val type: String,
    val description: String,
    val startDate: Long,
    val endDate: Long? = null,
    val medication: String? = null,
    val dosage: String? = null,
    val administeredBy: String? = null
)

@Serializable
enum class LivestockType {
    CATTLE,
    SHEEP,
    GOATS,
    PIGS,
    CHICKENS,
    DUCKS,
    TURKEYS,
    HORSES,
    FISH,
    OTHER
}

@Serializable
enum class Gender {
    MALE,
    FEMALE,
    NEUTERED
}

@Serializable
enum class LivestockStatus {
    ACTIVE,
    SICK,
    PREGNANT,
    SOLD,
    DECEASED,
    QUARANTINED
}

@Serializable
enum class HealthStatus {
    EXCELLENT,
    GOOD,
    FAIR,
    POOR,
    CRITICAL
}
