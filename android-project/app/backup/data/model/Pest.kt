package com.yourcompany.smartfarm.data.model

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "pests")
data class Pest(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val name: String,
    val scientificName: String,
    val category: PestCategory,
    val description: String,
    val imageUrl: String,
    val affectedPlants: List<String>,
    val affectedAnimals: List<String>? = null,
    val symptoms: List<String>,
    val damageDescription: String,
    val lifecycle: String,
    val activeSeasons: List<Season>,
    val controlMethods: List<ControlMethod>,
    val biologicalControls: List<String>, // natural predators or deterrents
    val chemicalControls: List<ChemicalControl>,
    val culturalControls: List<String>,
    val preventionMethods: List<String>,
    val severity: Severity,
    val isActive: Boolean = true
)

enum class PestCategory {
    INSECTS,
    MITES,
    NEMATODES,
    RODENTS,
    BIRDS,
    FUNGI,
    BACTERIA,
    VIRUSES,
    WEEDS
}

enum class ControlMethod {
    BIOLOGICAL,
    CHEMICAL,
    CULTURAL,
    MECHANICAL,
    INTEGRATED
}

enum class Severity {
    LOW,
    MODERATE,
    HIGH,
    CRITICAL
}

@Entity(tableName = "chemical_controls")
data class ChemicalControl(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val name: String,
    val activeIngredient: String,
    val concentration: String, // e.g., "2ml per liter"
    val applicationMethod: String,
    val safetyPrecautions: List<String>,
    val waitingPeriod: Int, // in days before harvest
    val effectiveness: String,
    val environmentalImpact: String,
    val isOrganic: Boolean = false
) 