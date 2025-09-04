package com.yourcompany.smartfarm.data.model

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "plants")
data class Plant(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val name: String,
    val scientificName: String,
    val category: PlantCategory,
    val subCategory: String,
    val description: String,
    val imageUrl: String,
    val growthDuration: Int, // in days
    val waterRequirement: WaterRequirement,
    val sunlightRequirement: SunlightRequirement,
    val soilType: SoilType,
    val phRange: String, // e.g., "6.0-7.0" - OPTIMAL pH range for the plant
    val phTolerance: String, // e.g., "5.5-7.5" - TOLERABLE pH range
    val soilNutrients: List<SoilNutrient>,
    val climateZone: List<ClimateZone>,
    val plantingSeason: List<Season>,
    val harvestSeason: List<Season>,
    val spacing: String, // e.g., "30cm x 30cm"
    val depth: String, // e.g., "2-3cm"
    val yield: String, // e.g., "2-3kg per plant"
    val nutritionalValue: String,
    val commonPests: List<String>,
    val commonDiseases: List<String>,
    val companionPlants: List<String>,
    val deterrentPlants: List<String>,
    val careInstructions: String,
    val soilPreparationNotes: String, // Specific soil preparation requirements
    val isActive: Boolean = true
)

enum class PlantCategory {
    CEREAL_CROPS,
    LEGUMES,
    ROOT_TUBER_CROPS,
    VEGETABLES,
    FRUITS,
    HERBS_SPICES,
    OILSEED_CROPS,
    BEVERAGE_CROPS,
    INDUSTRIAL_FIBER_CROPS,
    MEDICINAL_AROMATIC_PLANTS,
    SPECIALTY_OTHER_CROPS
}

enum class WaterRequirement {
    LOW,
    MEDIUM,
    HIGH
}

enum class SunlightRequirement {
    FULL_SUN,
    PARTIAL_SUN,
    SHADE
}

enum class SoilType {
    SANDY,
    LOAMY,
    CLAY,
    SILTY,
    PEATY,
    CHALKY
}

enum class SoilNutrient {
    NITROGEN,
    PHOSPHORUS,
    POTASSIUM,
    CALCIUM,
    MAGNESIUM,
    SULFUR,
    IRON,
    ZINC,
    MANGANESE,
    COPPER,
    BORON,
    MOLYBDENUM
}

enum class ClimateZone {
    TROPICAL,
    SUBTROPICAL,
    TEMPERATE,
    COLD
}

enum class Season {
    SPRING,
    SUMMER,
    AUTUMN,
    WINTER
} 