package com.example.smartfarm.data.model

import androidx.room.Entity
import androidx.room.PrimaryKey
import java.time.LocalDateTime

@Entity(tableName = "soil_tests")
data class SoilTest(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val fieldId: Long,
    val testDate: LocalDateTime,
    val phLevel: Double, // pH value (0-14 scale)
    val nitrogenLevel: Double, // N content in ppm
    val phosphorusLevel: Double, // P content in ppm
    val potassiumLevel: Double, // K content in ppm
    val organicMatter: Double, // Percentage
    val soilMoisture: Double, // Percentage
    val soilTemperature: Double, // Celsius
    val salinity: Double, // EC in dS/m
    val calciumLevel: Double, // Ca content in ppm
    val magnesiumLevel: Double, // Mg content in ppm
    val sulfurLevel: Double, // S content in ppm
    val micronutrients: Map<String, Double>, // Iron, Zinc, Manganese, etc.
    val testMethod: String, // Lab test, field kit, etc.
    val notes: String,
    val recommendations: List<SoilRecommendation>,
    val isActive: Boolean = true
)

@Entity(tableName = "soil_recommendations")
data class SoilRecommendation(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val soilTestId: Long,
    val recommendationType: RecommendationType,
    val priority: Priority,
    val description: String,
    val actionRequired: String,
    val materials: List<String>, // Fertilizers, amendments, etc.
    val applicationRate: String, // e.g., "2kg per 100sqm"
    val applicationMethod: String,
    val timing: String, // When to apply
    val expectedOutcome: String,
    val cost: Double?, // Estimated cost
    val isImplemented: Boolean = false,
    val implementationDate: LocalDateTime? = null
)

@Entity(tableName = "ph_management")
data class PhManagement(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val fieldId: Long,
    val currentPh: Double,
    val targetPh: Double,
    val plantId: Long?, // If specific plant is being grown
    val amendmentType: PhAmendmentType,
    val amendmentAmount: String, // e.g., "5kg lime per 100sqm"
    val applicationDate: LocalDateTime,
    val expectedPhChange: Double, // Expected pH change
    val retestDate: LocalDateTime, // When to retest
    val notes: String,
    val isActive: Boolean = true
)

@Entity(tableName = "soil_amendments")
data class SoilAmendment(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val name: String,
    val type: AmendmentType,
    val description: String,
    val phEffect: PhEffect, // How it affects pH
    val phChange: String, // e.g., "Raises pH by 0.5-1.0"
    val applicationRate: String, // e.g., "2-5kg per 100sqm"
    val applicationMethod: String,
    val timing: String, // When to apply
    val cost: Double, // Cost per unit
    val availability: String, // Local availability
    val environmentalImpact: String,
    val isOrganic: Boolean,
    val isActive: Boolean = true
)

enum class RecommendationType {
    PH_ADJUSTMENT,
    FERTILIZATION,
    ORGANIC_MATTER_AMENDMENT,
    IRRIGATION_ADJUSTMENT,
    DRAINAGE_IMPROVEMENT,
    SOIL_STRUCTURE_IMPROVEMENT,
    MICRONUTRIENT_AMENDMENT,
    SALINITY_MANAGEMENT
}

// Priority enum is defined in Task.kt to avoid duplication

enum class PhAmendmentType {
    LIME, // Raises pH (alkaline)
    SULFUR, // Lowers pH (acidic)
    GYPSUM, // Neutral effect
    COMPOST, // Slightly acidic
    WOOD_ASH, // Raises pH
    PEAT_MOSS, // Lowers pH
    PINE_NEEDLES, // Lowers pH
    EGG_SHELLS, // Raises pH
    COFFEE_GROUNDS, // Slightly acidic
    VINEGAR, // Lowers pH (temporary)
    BAKING_SODA // Raises pH (temporary)
}

enum class AmendmentType {
    PH_ADJUSTER,
    FERTILIZER,
    ORGANIC_MATTER,
    MICRONUTRIENT,
    SOIL_CONDITIONER,
    COMPOST,
    MANURE,
    MULCH
}

enum class PhEffect {
    RAISES_PH, // Makes soil more alkaline
    LOWERS_PH, // Makes soil more acidic
    NEUTRAL, // No pH effect
    SLIGHTLY_ACIDIC, // Minor pH lowering
    SLIGHTLY_ALKALINE // Minor pH raising
}

// pH Level Categories for easy reference
object PhLevels {
    const val VERY_ACIDIC = 4.5 // Below 4.5
    const val ACIDIC = 5.5 // 4.5-5.5
    const val SLIGHTLY_ACIDIC = 6.5 // 5.5-6.5
    const val NEUTRAL = 7.0 // 6.5-7.5
    const val SLIGHTLY_ALKALINE = 7.5 // 7.5-8.5
    const val ALKALINE = 8.5 // Above 8.5
    
    fun getPhCategory(ph: Double): String {
        return when {
            ph < 4.5 -> "Very Acidic"
            ph < 5.5 -> "Acidic"
            ph < 6.5 -> "Slightly Acidic"
            ph < 7.5 -> "Neutral"
            ph < 8.5 -> "Slightly Alkaline"
            else -> "Alkaline"
        }
    }
    
    fun getPhDescription(ph: Double): String {
        return when {
            ph < 4.5 -> "Very acidic soil, most plants will struggle"
            ph < 5.5 -> "Acidic soil, good for acid-loving plants"
            ph < 6.5 -> "Slightly acidic, ideal for most vegetables"
            ph < 7.5 -> "Neutral soil, suitable for most plants"
            ph < 8.5 -> "Slightly alkaline, good for some crops"
            else -> "Alkaline soil, limited plant selection"
        }
    }
}

// Common pH requirements for popular crops
object CropPhRequirements {
    val PH_REQUIREMENTS = mapOf(
        "Tomato" to PhRequirement(6.0, 7.0, "Slightly acidic to neutral"),
        "Potato" to PhRequirement(5.0, 6.5, "Acidic to slightly acidic"),
        "Carrot" to PhRequirement(6.0, 7.0, "Slightly acidic to neutral"),
        "Lettuce" to PhRequirement(6.0, 7.0, "Slightly acidic to neutral"),
        "Cabbage" to PhRequirement(6.0, 7.5, "Slightly acidic to slightly alkaline"),
        "Corn" to PhRequirement(5.5, 7.5, "Acidic to slightly alkaline"),
        "Beans" to PhRequirement(6.0, 7.0, "Slightly acidic to neutral"),
        "Peas" to PhRequirement(6.0, 7.5, "Slightly acidic to slightly alkaline"),
        "Strawberry" to PhRequirement(5.5, 6.5, "Acidic to slightly acidic"),
        "Blueberry" to PhRequirement(4.5, 5.5, "Very acidic to acidic"),
        "Apple" to PhRequirement(6.0, 7.0, "Slightly acidic to neutral"),
        "Grape" to PhRequirement(5.5, 7.0, "Acidic to neutral"),
        "Wheat" to PhRequirement(6.0, 7.5, "Slightly acidic to slightly alkaline"),
        "Rice" to PhRequirement(5.5, 6.5, "Acidic to slightly acidic"),
        "Soybean" to PhRequirement(6.0, 7.0, "Slightly acidic to neutral")
    )
}

data class PhRequirement(
    val minPh: Double,
    val maxPh: Double,
    val description: String
) 