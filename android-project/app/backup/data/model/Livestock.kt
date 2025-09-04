package com.yourcompany.smartfarm.data.model

import androidx.room.Entity
import androidx.room.PrimaryKey
import androidx.room.ForeignKey
import androidx.room.Index

@Entity(
    tableName = "livestock",
    foreignKeys = [
        ForeignKey(
            entity = Farm::class,
            parentColumns = ["id"],
            childColumns = ["farmId"],
            onDelete = ForeignKey.CASCADE
        )
    ],
    indices = [
        Index(value = ["farmId"]),
        Index(value = ["category"]),
        Index(value = ["isActive"]),
        Index(value = ["name"]),
        Index(value = ["category", "isActive"]),
        Index(value = ["farmId", "category"]),
        Index(value = ["userId"]) // Added index for userId
    ]
)
data class Livestock(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val userId: Long = 0, // Added missing userId field
    val farmId: Long, // Foreign key to Farm
    val name: String,
    val scientificName: String,
    val category: LivestockCategory,
    val subCategory: String,
    val description: String,
    val imageUrl: String,
    val lifespan: String, // e.g., "15-20 years"
    val gestationPeriod: Int?, // in days, null for non-mammals
    val incubationPeriod: Int?, // in days, null for mammals
    val weaningAge: Int?, // in days
    val maturityAge: Int, // in days
    val breedingAge: Int, // in days
    val averageWeight: String,
    val diet: List<String>,
    val housingRequirements: String,
    val spaceRequirement: String, // e.g., "10 sq meters per animal"
    val temperatureRange: String,
    val commonDiseases: List<String>,
    val vaccinationSchedule: List<String>,
    val careInstructions: String,
    val products: List<String>, // e.g., ["Milk", "Meat", "Wool"]
    val marketValue: String,
    val breed: String = "", // Added missing field
    val healthStatus: String = "Healthy", // Added missing field
    val lastHealthCheck: Long = System.currentTimeMillis(), // Added missing field
    val breedingStatus: String = "Not Breeding", // Added missing field
    val nextBreedingDate: Long? = null, // Added missing field
    val lastVaccination: Long = System.currentTimeMillis(), // Added missing field
    val notes: String = "", // Added missing field
    val isActive: Boolean = true,
    val gpsLink: String? = null, // Generic GPS dashboard URL
    val gpsDeviceBrand: String? = null, // Device brand for future integrations
    val createdAt: Long = System.currentTimeMillis(),
    val updatedAt: Long = System.currentTimeMillis()
)

enum class LivestockCategory {
    CATTLE,
    WATER_BUFFALO,
    SHEEP,
    GOATS,
    PIGS,
    POULTRY,
    EQUINES,
    CAMELIDS,
    OTHER_REGIONAL_ANIMALS,
    BEES,
    OXEN
} 