package com.example.smartfarm.service

import com.example.smartfarm.data.model.*
import java.time.LocalDateTime

class PhManagementService {
    
    /**
     * Analyzes soil pH and provides recommendations for specific crops
     */
    fun analyzePhForCrop(
        currentPh: Double,
        cropName: String,
        fieldSize: Double // in square meters
    ): PhAnalysisResult {
        val cropRequirement = CropPhRequirements.PH_REQUIREMENTS[cropName]
        
        return if (cropRequirement != null) {
            val isOptimal = currentPh in cropRequirement.minPh..cropRequirement.maxPh
            val recommendations = if (isOptimal) {
                listOf("pH is optimal for $cropName. No adjustments needed.")
            } else {
                generatePhAdjustmentRecommendations(currentPh, cropRequirement, fieldSize)
            }
            
            PhAnalysisResult(
                cropName = cropName,
                currentPh = currentPh,
                optimalPhRange = "${cropRequirement.minPh}-${cropRequirement.maxPh}",
                isOptimal = isOptimal,
                phCategory = PhLevels.getPhCategory(currentPh),
                recommendations = recommendations,
                urgency = calculateUrgency(currentPh, cropRequirement)
            )
        } else {
            PhAnalysisResult(
                cropName = cropName,
                currentPh = currentPh,
                optimalPhRange = "Unknown",
                isOptimal = false,
                phCategory = PhLevels.getPhCategory(currentPh),
                recommendations = listOf("pH requirements for $cropName not available in database."),
                urgency = Priority.MEDIUM
            )
        }
    }
    
    /**
     * Generates pH adjustment recommendations
     */
    private fun generatePhAdjustmentRecommendations(
        currentPh: Double,
        requirement: PhRequirement,
        fieldSize: Double
    ): List<String> {
        val recommendations = mutableListOf<String>()
        
        when {
            currentPh < requirement.minPh -> {
                // Soil is too acidic, need to raise pH
                recommendations.add("Soil is too acidic for optimal growth.")
                recommendations.add("Apply agricultural lime at rate of ${calculateLimeRate(currentPh, requirement.minPh, fieldSize)}kg per $fieldSize sqm")
                recommendations.add("Alternative: Apply wood ash at rate of ${calculateWoodAshRate(currentPh, requirement.minPh, fieldSize)}kg per $fieldSize sqm")
                recommendations.add("Retest soil pH after 3-6 months")
            }
            currentPh > requirement.maxPh -> {
                // Soil is too alkaline, need to lower pH
                recommendations.add("Soil is too alkaline for optimal growth.")
                recommendations.add("Apply elemental sulfur at rate of ${calculateSulfurRate(currentPh, requirement.maxPh, fieldSize)}kg per $fieldSize sqm")
                recommendations.add("Alternative: Apply peat moss at rate of ${calculatePeatMossRate(currentPh, requirement.maxPh, fieldSize)}kg per $fieldSize sqm")
                recommendations.add("Retest soil pH after 3-6 months")
            }
        }
        
        return recommendations
    }
    
    /**
     * Calculates lime application rate to raise pH
     */
    private fun calculateLimeRate(currentPh: Double, targetPh: Double, fieldSize: Double): Double {
        val phDifference = targetPh - currentPh
        val limeRate = when {
            phDifference <= 0.5 -> 2.0
            phDifference <= 1.0 -> 4.0
            phDifference <= 1.5 -> 6.0
            else -> 8.0
        }
        return limeRate * (fieldSize / 100) // Rate per 100 sqm
    }
    
    /**
     * Calculates sulfur application rate to lower pH
     */
    private fun calculateSulfurRate(currentPh: Double, targetPh: Double, fieldSize: Double): Double {
        val phDifference = currentPh - targetPh
        val sulfurRate = when {
            phDifference <= 0.5 -> 1.0
            phDifference <= 1.0 -> 2.0
            phDifference <= 1.5 -> 3.0
            else -> 4.0
        }
        return sulfurRate * (fieldSize / 100) // Rate per 100 sqm
    }
    
    /**
     * Calculates wood ash application rate
     */
    private fun calculateWoodAshRate(currentPh: Double, targetPh: Double, fieldSize: Double): Double {
        return calculateLimeRate(currentPh, targetPh, fieldSize) * 1.5 // Wood ash is less effective than lime
    }
    
    /**
     * Calculates peat moss application rate
     */
    private fun calculatePeatMossRate(currentPh: Double, targetPh: Double, fieldSize: Double): Double {
        return calculateSulfurRate(currentPh, targetPh, fieldSize) * 10 // Peat moss is less effective than sulfur
    }
    
    /**
     * Calculates urgency level for pH adjustment
     */
    private fun calculateUrgency(currentPh: Double, requirement: PhRequirement): Priority {
        val minDiff = kotlin.math.abs(currentPh - requirement.minPh)
        val maxDiff = kotlin.math.abs(currentPh - requirement.maxPh)
        val worstDiff = kotlin.math.max(minDiff, maxDiff)
        
        return when {
            worstDiff > 2.0 -> Priority.CRITICAL
            worstDiff > 1.0 -> Priority.HIGH
            worstDiff > 0.5 -> Priority.MEDIUM
            else -> Priority.LOW
        }
    }
    
    /**
     * Gets recommended crops for current pH level
     */
    fun getRecommendedCropsForPh(currentPh: Double): List<CropRecommendation> {
        return CropPhRequirements.PH_REQUIREMENTS.map { (cropName, requirement) ->
            val isOptimal = currentPh in requirement.minPh..requirement.maxPh
            val isTolerable = currentPh in (requirement.minPh - 0.5)..(requirement.maxPh + 0.5)
            
            CropRecommendation(
                cropName = cropName,
                phRequirement = requirement,
                suitability = when {
                    isOptimal -> CropSuitability.OPTIMAL
                    isTolerable -> CropSuitability.TOLERABLE
                    else -> CropSuitability.UNSUITABLE
                },
                notes = when {
                    isOptimal -> "Perfect pH match"
                    isTolerable -> "May need minor pH adjustments"
                    else -> "Requires significant pH modification"
                }
            )
        }.filter { it.suitability != CropSuitability.UNSUITABLE }
         .sortedBy { it.suitability.ordinal }
    }
    
    /**
     * Creates a pH management plan for a field
     */
    fun createPhManagementPlan(
        fieldId: Long,
        currentPh: Double,
        targetPh: Double,
        plantId: Long?,
        fieldSize: Double
    ): PhManagementPlan {
        val amendmentType = if (targetPh > currentPh) {
            PhAmendmentType.LIME
        } else {
            PhAmendmentType.SULFUR
        }
        
        val amendmentAmount = if (targetPh > currentPh) {
            "${calculateLimeRate(currentPh, targetPh, fieldSize)}kg lime per $fieldSize sqm"
        } else {
            "${calculateSulfurRate(currentPh, targetPh, fieldSize)}kg sulfur per $fieldSize sqm"
        }
        
        val expectedPhChange = kotlin.math.abs(targetPh - currentPh) * 0.8 // 80% effectiveness
        
        return PhManagementPlan(
            fieldId = fieldId,
            currentPh = currentPh,
            targetPh = targetPh,
            plantId = plantId,
            amendmentType = amendmentType,
            amendmentAmount = amendmentAmount,
            applicationDate = LocalDateTime.now(),
            expectedPhChange = expectedPhChange,
            retestDate = LocalDateTime.now().plusMonths(3),
            notes = "pH adjustment plan created automatically",
            estimatedCost = calculateAmendmentCost(amendmentType, fieldSize),
            timeline = generateTimeline()
        )
    }
    
    /**
     * Calculates estimated cost for pH amendment
     */
    private fun calculateAmendmentCost(amendmentType: PhAmendmentType, fieldSize: Double): Double {
        val ratePerSqm = when (amendmentType) {
            PhAmendmentType.LIME -> 0.05 // $0.05 per sqm
            PhAmendmentType.SULFUR -> 0.08 // $0.08 per sqm
            PhAmendmentType.WOOD_ASH -> 0.02 // $0.02 per sqm
            PhAmendmentType.PEAT_MOSS -> 0.15 // $0.15 per sqm
            else -> 0.05
        }
        return ratePerSqm * fieldSize
    }
    
    /**
     * Generates timeline for pH adjustment
     */
    private fun generateTimeline(): List<TimelineStep> {
        return listOf(
            TimelineStep(1, "Apply soil amendment", "Immediate"),
            TimelineStep(2, "Water thoroughly", "Same day"),
            TimelineStep(3, "Monitor soil moisture", "Weekly"),
            TimelineStep(4, "Retest pH", "3 months"),
            TimelineStep(5, "Adjust if needed", "As required")
        )
    }
}

// Data classes for service responses
data class PhAnalysisResult(
    val cropName: String,
    val currentPh: Double,
    val optimalPhRange: String,
    val isOptimal: Boolean,
    val phCategory: String,
    val recommendations: List<String>,
    val urgency: Priority
)

data class CropRecommendation(
    val cropName: String,
    val phRequirement: PhRequirement,
    val suitability: CropSuitability,
    val notes: String
)

enum class CropSuitability {
    OPTIMAL,
    TOLERABLE,
    UNSUITABLE
}

data class PhManagementPlan(
    val fieldId: Long,
    val currentPh: Double,
    val targetPh: Double,
    val plantId: Long?,
    val amendmentType: PhAmendmentType,
    val amendmentAmount: String,
    val applicationDate: LocalDateTime,
    val expectedPhChange: Double,
    val retestDate: LocalDateTime,
    val notes: String,
    val estimatedCost: Double,
    val timeline: List<TimelineStep>
)

data class TimelineStep(
    val step: Int,
    val action: String,
    val timing: String
) 