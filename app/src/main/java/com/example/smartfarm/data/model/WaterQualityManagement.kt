package com.example.smartfarm.data.model

import androidx.room.Entity
import androidx.room.PrimaryKey
import java.time.LocalDateTime

@Entity(tableName = "water_tests")
data class WaterTest(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val tankId: Long,
    val testDate: LocalDateTime,
    val phLevel: Double, // pH value (0-14 scale)
    val temperature: Double, // Celsius
    val dissolvedOxygen: Double, // mg/L
    val ammonia: Double, // mg/L
    val nitrite: Double, // mg/L
    val nitrate: Double, // mg/L
    val salinity: Double, // ppt for saltwater
    val alkalinity: Double, // mg/L CaCO3
    val hardness: Double, // mg/L CaCO3
    val turbidity: Double, // NTU
    val chlorine: Double, // mg/L
    val testMethod: String, // Lab test, field kit, etc.
    val notes: String,
    val recommendations: List<WaterQualityRecommendation>,
    val isActive: Boolean = true
)

@Entity(tableName = "water_quality_recommendations")
data class WaterQualityRecommendation(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val waterTestId: Long,
    val recommendationType: WaterRecommendationType,
    val priority: Priority,
    val description: String,
    val actionRequired: String,
    val materials: List<String>, // pH adjusters, filters, etc.
    val applicationRate: String, // e.g., "2ml per 100L"
    val applicationMethod: String,
    val timing: String, // When to apply
    val expectedOutcome: String,
    val cost: Double?, // Estimated cost
    val isImplemented: Boolean = false,
    val implementationDate: LocalDateTime? = null
)

@Entity(tableName = "aquarium_ph_management")
data class AquariumPhManagement(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val tankId: Long,
    val currentPh: Double,
    val targetPh: Double,
    val fishId: Long?, // If specific fish is being kept
    val adjustmentType: AquariumPhAdjustmentType,
    val adjustmentAmount: String, // e.g., "5ml pH down per 100L"
    val applicationDate: LocalDateTime,
    val expectedPhChange: Double, // Expected pH change
    val retestDate: LocalDateTime, // When to retest
    val notes: String,
    val isActive: Boolean = true
)

@Entity(tableName = "water_conditioners")
data class WaterConditioner(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val name: String,
    val type: ConditionerType,
    val description: String,
    val phEffect: AquariumPhEffect, // How it affects pH
    val phChange: String, // e.g., "Raises pH by 0.2-0.5"
    val applicationRate: String, // e.g., "2-5ml per 100L"
    val applicationMethod: String,
    val timing: String, // When to apply
    val cost: Double, // Cost per unit
    val availability: String, // Local availability
    val safetyNotes: String,
    val isOrganic: Boolean,
    val isActive: Boolean = true
)

enum class WaterRecommendationType {
    PH_ADJUSTMENT,
    TEMPERATURE_CONTROL,
    OXYGEN_ENHANCEMENT,
    AMMONIA_REDUCTION,
    NITRITE_REDUCTION,
    NITRATE_REDUCTION,
    SALINITY_ADJUSTMENT,
    ALKALINITY_ADJUSTMENT,
    HARDNESS_ADJUSTMENT,
    TURBIDITY_REDUCTION,
    CHLORINE_REMOVAL,
    WATER_CHANGE,
    FILTER_MAINTENANCE
}

enum class AquariumPhAdjustmentType {
    PH_UP, // Raises pH (alkaline)
    PH_DOWN, // Lowers pH (acidic)
    PH_BUFFER, // Stabilizes pH
    PEAT_MOSS, // Natural pH lowering
    CRUSHED_CORAL, // Natural pH raising
    DRIFTWOOD, // Natural pH lowering
    LIMESTONE, // Natural pH raising
    BAKING_SODA, // Raises pH (temporary)
    VINEGAR, // Lowers pH (temporary)
    PHOSPHORIC_ACID, // Lowers pH
    SODIUM_BICARBONATE // Raises pH
}

enum class ConditionerType {
    PH_ADJUSTER,
    CHLORINE_REMOVER,
    AMMONIA_DETOXIFIER,
    NITRITE_DETOXIFIER,
    NITRATE_REDUCER,
    WATER_CLARIFIER,
    STRESS_REDUCER,
    IMMUNE_BOOSTER,
    VITAMIN_SUPPLEMENT,
    MINERAL_SUPPLEMENT
}

enum class AquariumPhEffect {
    RAISES_PH, // Makes water more alkaline
    LOWERS_PH, // Makes water more acidic
    STABILIZES_PH, // Buffers pH
    NEUTRAL, // No pH effect
    SLIGHTLY_ACIDIC, // Minor pH lowering
    SLIGHTLY_ALKALINE // Minor pH raising
}

// Water pH Level Categories for aquaculture
object AquariumPhLevels {
    const val VERY_ACIDIC = 5.0 // Below 5.0
    const val ACIDIC = 6.0 // 5.0-6.0
    const val SLIGHTLY_ACIDIC = 6.5 // 6.0-6.5
    const val NEUTRAL = 7.0 // 6.5-7.5
    const val SLIGHTLY_ALKALINE = 7.5 // 7.5-8.0
    const val ALKALINE = 8.0 // Above 8.0
    
    fun getPhCategory(ph: Double): String {
        return when {
            ph < 5.0 -> "Very Acidic"
            ph < 6.0 -> "Acidic"
            ph < 6.5 -> "Slightly Acidic"
            ph < 7.5 -> "Neutral"
            ph < 8.0 -> "Slightly Alkaline"
            else -> "Alkaline"
        }
    }
    
    fun getPhDescription(ph: Double): String {
        return when {
            ph < 5.0 -> "Very acidic water, most fish will struggle"
            ph < 6.0 -> "Acidic water, good for acid-loving fish"
            ph < 6.5 -> "Slightly acidic, ideal for many tropical fish"
            ph < 7.5 -> "Neutral water, suitable for most fish"
            ph < 8.0 -> "Slightly alkaline, good for African cichlids"
            else -> "Alkaline water, limited fish selection"
        }
    }
}

// Common pH requirements for popular aquarium fish
object FishPhRequirements {
    val PH_REQUIREMENTS = mapOf(
        "Goldfish" to FishPhRequirement(6.5, 8.0, "Neutral to slightly alkaline"),
        "Betta" to FishPhRequirement(6.0, 7.5, "Slightly acidic to neutral"),
        "Neon Tetra" to FishPhRequirement(5.5, 7.0, "Acidic to neutral"),
        "Guppy" to FishPhRequirement(6.8, 8.0, "Neutral to alkaline"),
        "Platy" to FishPhRequirement(7.0, 8.2, "Neutral to alkaline"),
        "Swordtail" to FishPhRequirement(7.0, 8.2, "Neutral to alkaline"),
        "Molly" to FishPhRequirement(7.5, 8.5, "Alkaline"),
        "Angelfish" to FishPhRequirement(6.0, 7.5, "Slightly acidic to neutral"),
        "Discus" to FishPhRequirement(5.5, 7.0, "Acidic to neutral"),
        "African Cichlid" to FishPhRequirement(7.8, 8.5, "Alkaline"),
        "South American Cichlid" to FishPhRequirement(6.0, 7.5, "Slightly acidic to neutral"),
        "Corydoras" to FishPhRequirement(6.0, 7.5, "Slightly acidic to neutral"),
        "Plecostomus" to FishPhRequirement(6.5, 7.5, "Neutral"),
        "Shrimp" to FishPhRequirement(6.5, 7.5, "Neutral"),
        "Snail" to FishPhRequirement(7.0, 8.0, "Neutral to slightly alkaline")
    )
}

data class FishPhRequirement(
    val minPh: Double,
    val maxPh: Double,
    val description: String
)

// Water quality parameters for different fish types
object WaterQualityStandards {
    val FRESHWATER_STANDARDS = WaterQualityStandard(
        phRange = 6.5..7.5,
        temperatureRange = 22.0..28.0,
        dissolvedOxygenMin = 5.0,
        ammoniaMax = 0.02,
        nitriteMax = 0.02,
        nitrateMax = 40.0,
        alkalinityRange = 80.0..120.0,
        hardnessRange = 100.0..200.0
    )
    
    val SALTWATER_STANDARDS = WaterQualityStandard(
        phRange = 8.0..8.4,
        temperatureRange = 24.0..28.0,
        dissolvedOxygenMin = 6.0,
        ammoniaMax = 0.01,
        nitriteMax = 0.01,
        nitrateMax = 20.0,
        alkalinityRange = 180.0..220.0,
        hardnessRange = 350.0..450.0
    )
    
    val BRACKISH_STANDARDS = WaterQualityStandard(
        phRange = 7.5..8.0,
        temperatureRange = 24.0..28.0,
        dissolvedOxygenMin = 5.5,
        ammoniaMax = 0.015,
        nitriteMax = 0.015,
        nitrateMax = 30.0,
        alkalinityRange = 120.0..180.0,
        hardnessRange = 200.0..350.0
    )
}

data class WaterQualityStandard(
    val phRange: ClosedFloatingPointRange<Double>,
    val temperatureRange: ClosedFloatingPointRange<Double>,
    val dissolvedOxygenMin: Double,
    val ammoniaMax: Double,
    val nitriteMax: Double,
    val nitrateMax: Double,
    val alkalinityRange: ClosedFloatingPointRange<Double>,
    val hardnessRange: ClosedFloatingPointRange<Double>
) 