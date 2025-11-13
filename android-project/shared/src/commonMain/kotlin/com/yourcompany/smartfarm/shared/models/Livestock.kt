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
    val nextVaccination: String? = null, // ISO date string
    val healthRecords: List<HealthRecord> = emptyList() // Health record history
)

data class HealthRecord(
    val id: Long = 0,
    val livestockId: Long,
    val date: String, // ISO date string
    val type: HealthRecordType,
    val condition: String? = null, // Optional condition update
    val performedBy: String? = null,
    val cost: Double? = null,
    val followUpDate: String? = null, // ISO date string
    val notes: String = ""
)

enum class HealthRecordType {
    CHECK_UP,
    VACCINATION,
    TREATMENT,
    INJURY,
    OBSERVATION,
    OTHER
}

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
