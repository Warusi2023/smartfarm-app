package com.example.smartfarm.data.model

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "trees")
data class Tree(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val name: String,
    val scientificName: String,
    val category: TreeCategory,
    val subCategory: String,
    val description: String,
    val imageUrl: String,
    val growthRate: GrowthRate,
    val matureHeight: String,
    val matureSpread: String,
    val waterRequirement: WaterRequirement,
    val sunlightRequirement: SunlightRequirement,
    val soilType: SoilType,
    val climateZone: List<ClimateZone>,
    val plantingSeason: List<Season>,
    val fruitingSeason: List<Season>,
    val lifespan: String, // e.g., "50-100 years"
    val isEvergreen: Boolean,
    val isDeciduous: Boolean,
    val isFruitBearing: Boolean,
    val isNitrogenFixing: Boolean,
    val isMedicinal: Boolean,
    val woodType: WoodType?,
    val commonPests: List<String>,
    val commonDiseases: List<String>,
    val careInstructions: String,
    val uses: List<String>, // e.g., ["Timber", "Fruit", "Shade", "Ornamental"]
    val isActive: Boolean = true
)

enum class TreeCategory {
    CONIFEROUS_TREES,
    TROPICAL_SUBTROPICAL_TREES,
    FRUIT_TREES,
    MEDICINAL_CULTURAL_TREES,
    HARDWOOD_TREES,
    SOFTWOOD_TREES,
    SHADE_ORNAMENTAL_TREES,
    NITROGEN_FIXING_TREES,
    AGRICULTURAL_PLANTATION_TREES
}

enum class GrowthRate {
    SLOW,
    MODERATE,
    FAST
}

enum class WoodType {
    HARDWOOD,
    SOFTWOOD
} 