package com.yourcompany.smartfarm.data.model

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "flowers")
data class Flower(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val name: String,
    val scientificName: String,
    val category: FlowerCategory,
    val subCategory: String,
    val description: String,
    val imageUrl: String,
    val bloomDuration: Int, // in days
    val waterRequirement: WaterRequirement,
    val sunlightRequirement: SunlightRequirement,
    val soilType: SoilType,
    val climateZone: List<ClimateZone>,
    val plantingSeason: List<Season>,
    val bloomingSeason: List<Season>,
    val spacing: String,
    val depth: String,
    val height: String,
    val color: List<String>,
    val fragrance: Boolean,
    val isEdible: Boolean,
    val isMedicinal: Boolean,
    val commonPests: List<String>,
    val commonDiseases: List<String>,
    val careInstructions: String,
    val uses: List<String>, // e.g., ["Ornamental", "Cut flowers", "Medicinal"]
    val isActive: Boolean = true
)

enum class FlowerCategory {
    ORNAMENTAL_GARDEN_FLOWERS,
    FLORIST_BOUQUET_FLOWERS,
    WILDFLOWERS,
    TROPICAL_EXOTIC_FLOWERS,
    RELIGIOUS_CULTURAL_FLOWERS,
    EDIBLE_MEDICINAL_FLOWERS,
    CLIMBERS_CREEPERS
} 