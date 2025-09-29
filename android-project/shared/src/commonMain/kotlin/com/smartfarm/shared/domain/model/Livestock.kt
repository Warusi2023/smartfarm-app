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
    val lifecycleStage: CattleLifecycleStage? = null, // For cattle lifecycle tracking
    val productionPurpose: ProductionPurpose? = null, // Dairy, beef, breeding, etc.
    val parentMaleId: String? = null, // Sire
    val parentFemaleId: String? = null, // Dam
    val firstCalvingDate: Long? = null, // For cows
    val lastCalvingDate: Long? = null, // For cows
    val breedingStatus: BreedingStatus? = null,
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
enum class CattleLifecycleStage {
    CALF,           // 0-12 months
    HEIFER,         // 12-24 months (female, not yet calved)
    COW,            // 24+ months (female, has calved)
    BULL,           // 12+ months (male, intact)
    STEER,          // 12+ months (male, castrated)
    BULLOCK         // 12-24 months (young male)
}

@Serializable
enum class ProductionPurpose {
    DAIRY,          // For milk production
    BEEF,           // For meat production
    BREEDING,       // For reproduction
    DUAL_PURPOSE,   // Both dairy and beef
    WORKING,        // For farm work
    PET             // Companion animal
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

@Serializable
enum class BreedingStatus {
    OPEN,           // Not pregnant, available for breeding
    BRED,           // Recently bred, pregnancy not confirmed
    PREGNANT,       // Confirmed pregnant
    DRY,            // Not lactating (between lactations)
    LACTATING,      // Currently producing milk
    INFERTILE,      // Cannot reproduce
    RETIRED         // No longer used for breeding
}
