package com.yourcompany.smartfarm.service

import com.yourcompany.smartfarm.data.model.*
import java.time.LocalDateTime

class WaterQualityManagementService {
    
    /**
     * Analyzes water pH and provides recommendations for specific fish
     */
    fun analyzePhForFish(
        currentPh: Double,
        fishName: String,
        tankVolume: Double // in liters
    ): FishPhAnalysisResult {
        val fishRequirement = FishPhRequirements.PH_REQUIREMENTS[fishName]
        
        return if (fishRequirement != null) {
            val isOptimal = currentPh in fishRequirement.minPh..fishRequirement.maxPh
            val recommendations = if (isOptimal) {
                listOf("pH is optimal for $fishName. No adjustments needed.")
            } else {
                generateFishPhAdjustmentRecommendations(currentPh, fishRequirement, tankVolume)
            }
            
            FishPhAnalysisResult(
                fishName = fishName,
                currentPh = currentPh,
                optimalPhRange = "${fishRequirement.minPh}-${fishRequirement.maxPh}",
                isOptimal = isOptimal,
                phCategory = AquariumPhLevels.getPhCategory(currentPh),
                recommendations = recommendations,
                urgency = calculateFishPhUrgency(currentPh, fishRequirement)
            )
        } else {
            FishPhAnalysisResult(
                fishName = fishName,
                currentPh = currentPh,
                optimalPhRange = "Unknown",
                isOptimal = false,
                phCategory = AquariumPhLevels.getPhCategory(currentPh),
                recommendations = listOf("pH requirements for $fishName not available in database."),
                urgency = Priority.MEDIUM
            )
        }
    }
    
    /**
     * Generates pH adjustment recommendations for fish
     */
    private fun generateFishPhAdjustmentRecommendations(
        currentPh: Double,
        requirement: FishPhRequirement,
        tankVolume: Double
    ): List<String> {
        val recommendations = mutableListOf<String>()
        
        when {
            currentPh < requirement.minPh -> {
                // Water is too acidic, need to raise pH
                recommendations.add("Water is too acidic for optimal fish health.")
                recommendations.add("Add pH Up at rate of ${calculatePhUpRate(currentPh, requirement.minPh, tankVolume)}ml per $tankVolume L")
                recommendations.add("Alternative: Add crushed coral at rate of ${calculateCrushedCoralRate(currentPh, requirement.minPh, tankVolume)}g per $tankVolume L")
                recommendations.add("Natural option: Add limestone rocks to tank")
                recommendations.add("Retest water pH after 24-48 hours")
            }
            currentPh > requirement.maxPh -> {
                // Water is too alkaline, need to lower pH
                recommendations.add("Water is too alkaline for optimal fish health.")
                recommendations.add("Add pH Down at rate of ${calculatePhDownRate(currentPh, requirement.maxPh, tankVolume)}ml per $tankVolume L")
                recommendations.add("Alternative: Add peat moss at rate of ${calculatePeatMossRate(currentPh, requirement.maxPh, tankVolume)}g per $tankVolume L")
                recommendations.add("Natural option: Add driftwood to tank")
                recommendations.add("Retest water pH after 24-48 hours")
            }
        }
        
        return recommendations
    }
    
    /**
     * Calculates pH Up application rate to raise pH
     */
    private fun calculatePhUpRate(currentPh: Double, targetPh: Double, tankVolume: Double): Double {
        val phDifference = targetPh - currentPh
        val phUpRate = when {
            phDifference <= 0.2 -> 1.0
            phDifference <= 0.5 -> 2.0
            phDifference <= 1.0 -> 4.0
            else -> 6.0
        }
        return phUpRate * (tankVolume / 100) // Rate per 100L
    }
    
    /**
     * Calculates pH Down application rate to lower pH
     */
    private fun calculatePhDownRate(currentPh: Double, targetPh: Double, tankVolume: Double): Double {
        val phDifference = currentPh - targetPh
        val phDownRate = when {
            phDifference <= 0.2 -> 1.0
            phDifference <= 0.5 -> 2.0
            phDifference <= 1.0 -> 4.0
            else -> 6.0
        }
        return phDownRate * (tankVolume / 100) // Rate per 100L
    }
    
    /**
     * Calculates crushed coral application rate
     */
    private fun calculateCrushedCoralRate(currentPh: Double, targetPh: Double, tankVolume: Double): Double {
        return calculatePhUpRate(currentPh, targetPh, tankVolume) * 10 // 10g per ml equivalent
    }
    
    /**
     * Calculates peat moss application rate
     */
    private fun calculatePeatMossRate(currentPh: Double, targetPh: Double, tankVolume: Double): Double {
        return calculatePhDownRate(currentPh, targetPh, tankVolume) * 5 // 5g per ml equivalent
    }
    
    /**
     * Calculates urgency level for fish pH adjustment
     */
    private fun calculateFishPhUrgency(currentPh: Double, requirement: FishPhRequirement): Priority {
        val minDiff = kotlin.math.abs(currentPh - requirement.minPh)
        val maxDiff = kotlin.math.abs(currentPh - requirement.maxPh)
        val worstDiff = kotlin.math.max(minDiff, maxDiff)
        
        return when {
            worstDiff > 1.5 -> Priority.CRITICAL
            worstDiff > 0.8 -> Priority.HIGH
            worstDiff > 0.4 -> Priority.MEDIUM
            else -> Priority.LOW
        }
    }
    
    /**
     * Gets recommended fish for current pH level
     */
    fun getRecommendedFishForPh(currentPh: Double): List<FishRecommendation> {
        return FishPhRequirements.PH_REQUIREMENTS.map { (fishName, requirement) ->
            val isOptimal = currentPh in requirement.minPh..requirement.maxPh
            val isTolerable = currentPh in (requirement.minPh - 0.3)..(requirement.maxPh + 0.3)
            
            FishRecommendation(
                fishName = fishName,
                phRequirement = requirement,
                suitability = when {
                    isOptimal -> FishSuitability.OPTIMAL
                    isTolerable -> FishSuitability.TOLERABLE
                    else -> FishSuitability.UNSUITABLE
                },
                notes = when {
                    isOptimal -> "Perfect pH match"
                    isTolerable -> "May need minor pH adjustments"
                    else -> "Requires significant pH modification"
                }
            )
        }.filter { it.suitability != FishSuitability.UNSUITABLE }
         .sortedBy { it.suitability.ordinal }
    }
    
    /**
     * Creates a water quality management plan for a tank
     */
    fun createWaterQualityPlan(
        tankId: Long,
        currentPh: Double,
        targetPh: Double,
        fishId: Long?,
        tankVolume: Double,
        waterType: WaterType
    ): WaterQualityPlan {
        val adjustmentType = if (targetPh > currentPh) {
            AquariumPhAdjustmentType.PH_UP
        } else {
            AquariumPhAdjustmentType.PH_DOWN
        }
        
        val adjustmentAmount = if (targetPh > currentPh) {
            "${calculatePhUpRate(currentPh, targetPh, tankVolume)}ml pH up per $tankVolume L"
        } else {
            "${calculatePhDownRate(currentPh, targetPh, tankVolume)}ml pH down per $tankVolume L"
        }
        
        val expectedPhChange = kotlin.math.abs(targetPh - currentPh) * 0.9 // 90% effectiveness
        
        return WaterQualityPlan(
            tankId = tankId,
            currentPh = currentPh,
            targetPh = targetPh,
            fishId = fishId,
            adjustmentType = adjustmentType,
            adjustmentAmount = adjustmentAmount,
            applicationDate = LocalDateTime.now(),
            expectedPhChange = expectedPhChange,
            retestDate = LocalDateTime.now().plusDays(1),
            notes = "Water quality plan created automatically",
            estimatedCost = calculateWaterAdjustmentCost(adjustmentType, tankVolume),
            timeline = generateWaterQualityTimeline(),
            waterType = waterType
        )
    }
    
    /**
     * Analyzes complete water quality for a tank
     */
    fun analyzeWaterQuality(
        ph: Double,
        temperature: Double,
        dissolvedOxygen: Double,
        ammonia: Double,
        nitrite: Double,
        nitrate: Double,
        waterType: WaterType
    ): WaterQualityAnalysis {
        val standards = when (waterType) {
            WaterType.FRESHWATER -> WaterQualityStandards.FRESHWATER_STANDARDS
            WaterType.SALTWATER -> WaterQualityStandards.SALTWATER_STANDARDS
            WaterType.BRACKISH -> WaterQualityStandards.BRACKISH_STANDARDS
        }
        
        val issues = mutableListOf<WaterQualityIssue>()
        
        // Check pH
        if (ph !in standards.phRange) {
            issues.add(WaterQualityIssue(
                parameter = "pH",
                currentValue = ph,
                optimalRange = "${standards.phRange.start}-${standards.phRange.endInclusive}",
                severity = if (kotlin.math.abs(ph - standards.phRange.start) > 1.0) Priority.CRITICAL else Priority.HIGH,
                recommendation = if (ph < standards.phRange.start) "Add pH Up" else "Add pH Down"
            ))
        }
        
        // Check temperature
        if (temperature !in standards.temperatureRange) {
            issues.add(WaterQualityIssue(
                parameter = "Temperature",
                currentValue = temperature,
                optimalRange = "${standards.temperatureRange.start}-${standards.temperatureRange.endInclusive}°C",
                severity = if (kotlin.math.abs(temperature - standards.temperatureRange.start) > 5.0) Priority.CRITICAL else Priority.HIGH,
                recommendation = if (temperature < standards.temperatureRange.start) "Increase heater setting" else "Decrease heater setting"
            ))
        }
        
        // Check dissolved oxygen
        if (dissolvedOxygen < standards.dissolvedOxygenMin) {
            issues.add(WaterQualityIssue(
                parameter = "Dissolved Oxygen",
                currentValue = dissolvedOxygen,
                optimalRange = ">${standards.dissolvedOxygenMin} mg/L",
                severity = Priority.CRITICAL,
                recommendation = "Add air stone or increase surface agitation"
            ))
        }
        
        // Check ammonia
        if (ammonia > standards.ammoniaMax) {
            issues.add(WaterQualityIssue(
                parameter = "Ammonia",
                currentValue = ammonia,
                optimalRange = "<${standards.ammoniaMax} mg/L",
                severity = Priority.CRITICAL,
                recommendation = "Perform water change and add ammonia detoxifier"
            ))
        }
        
        // Check nitrite
        if (nitrite > standards.nitriteMax) {
            issues.add(WaterQualityIssue(
                parameter = "Nitrite",
                currentValue = nitrite,
                optimalRange = "<${standards.nitriteMax} mg/L",
                severity = Priority.CRITICAL,
                recommendation = "Perform water change and add nitrite detoxifier"
            ))
        }
        
        // Check nitrate
        if (nitrate > standards.nitrateMax) {
            issues.add(WaterQualityIssue(
                parameter = "Nitrate",
                currentValue = nitrate,
                optimalRange = "<${standards.nitrateMax} mg/L",
                severity = Priority.MEDIUM,
                recommendation = "Perform water change or add nitrate reducer"
            ))
        }
        
        return WaterQualityAnalysis(
            waterType = waterType,
            overallHealth = if (issues.isEmpty()) "Excellent" else if (issues.any { it.severity == Priority.CRITICAL }) "Critical" else "Needs Attention",
            issues = issues,
            recommendations = generateWaterQualityRecommendations(issues)
        )
    }
    
    /**
     * Calculates estimated cost for water adjustment
     */
    private fun calculateWaterAdjustmentCost(adjustmentType: AquariumPhAdjustmentType, tankVolume: Double): Double {
        val ratePerLiter = when (adjustmentType) {
            AquariumPhAdjustmentType.PH_UP -> 0.02 // $0.02 per liter
            AquariumPhAdjustmentType.PH_DOWN -> 0.025 // $0.025 per liter
            AquariumPhAdjustmentType.PH_BUFFER -> 0.03 // $0.03 per liter
            else -> 0.02
        }
        return ratePerLiter * tankVolume
    }
    
    /**
     * Generates timeline for water quality adjustment
     */
    private fun generateWaterQualityTimeline(): List<WaterQualityTimelineStep> {
        return listOf(
            WaterQualityTimelineStep(1, "Test current water parameters", "Immediate"),
            WaterQualityTimelineStep(2, "Apply water conditioner if needed", "Same day"),
            WaterQualityTimelineStep(3, "Apply pH adjustment", "Same day"),
            WaterQualityTimelineStep(4, "Monitor fish behavior", "Next 24 hours"),
            WaterQualityTimelineStep(5, "Retest water parameters", "24-48 hours"),
            WaterQualityTimelineStep(6, "Adjust if needed", "As required")
        )
    }
    
    /**
     * Generates water quality recommendations
     */
    private fun generateWaterQualityRecommendations(issues: List<WaterQualityIssue>): List<String> {
        val recommendations = mutableListOf<String>()
        
        issues.forEach { issue ->
            recommendations.add("${issue.parameter}: ${issue.recommendation}")
        }
        
        if (issues.any { it.severity == Priority.CRITICAL }) {
            recommendations.add(0, "URGENT: Address critical issues immediately")
        }
        
        if (issues.isNotEmpty()) {
            recommendations.add("Perform 25-50% water change")
            recommendations.add("Test water parameters daily until stable")
        }
        
        return recommendations
    }
}

// Data classes for service responses
data class FishPhAnalysisResult(
    val fishName: String,
    val currentPh: Double,
    val optimalPhRange: String,
    val isOptimal: Boolean,
    val phCategory: String,
    val recommendations: List<String>,
    val urgency: Priority
)

data class FishRecommendation(
    val fishName: String,
    val phRequirement: FishPhRequirement,
    val suitability: FishSuitability,
    val notes: String
)

enum class FishSuitability {
    OPTIMAL,
    TOLERABLE,
    UNSUITABLE
}

data class WaterQualityPlan(
    val tankId: Long,
    val currentPh: Double,
    val targetPh: Double,
    val fishId: Long?,
    val adjustmentType: AquariumPhAdjustmentType,
    val adjustmentAmount: String,
    val applicationDate: LocalDateTime,
    val expectedPhChange: Double,
    val retestDate: LocalDateTime,
    val notes: String,
    val estimatedCost: Double,
    val timeline: List<WaterQualityTimelineStep>,
    val waterType: WaterType
)

data class WaterQualityTimelineStep(
    val step: Int,
    val action: String,
    val timing: String
)

data class WaterQualityAnalysis(
    val waterType: WaterType,
    val overallHealth: String,
    val issues: List<WaterQualityIssue>,
    val recommendations: List<String>
)

data class WaterQualityIssue(
    val parameter: String,
    val currentValue: Double,
    val optimalRange: String,
    val severity: Priority,
    val recommendation: String
) 