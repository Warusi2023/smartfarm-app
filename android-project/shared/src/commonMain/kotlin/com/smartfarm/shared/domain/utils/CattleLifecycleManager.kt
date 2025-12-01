package com.smartfarm.shared.domain.utils

import com.smartfarm.shared.domain.model.*
import kotlinx.serialization.Serializable
import java.time.LocalDate
import java.time.temporal.ChronoUnit

/**
 * Manages cattle lifecycle stages and transitions
 */
object CattleLifecycleManager {
    
    /**
     * Calculate the current lifecycle stage based on age, gender, and breeding history
     */
    fun calculateLifecycleStage(
        birthDate: Long,
        gender: Gender,
        firstCalvingDate: Long? = null,
        lastCalvingDate: Long? = null
    ): CattleLifecycleStage {
        val ageInMonths = ChronoUnit.MONTHS.between(
            LocalDate.ofEpochDay(birthDate / (24 * 60 * 60 * 1000)),
            LocalDate.now()
        )
        
        return when (gender) {
            Gender.FEMALE -> {
                when {
                    ageInMonths < 12 -> CattleLifecycleStage.CALF
                    ageInMonths < 24 && firstCalvingDate == null -> CattleLifecycleStage.HEIFER
                    firstCalvingDate != null -> CattleLifecycleStage.COW
                    else -> CattleLifecycleStage.HEIFER
                }
            }
            Gender.MALE -> {
                when {
                    ageInMonths < 12 -> CattleLifecycleStage.CALF
                    ageInMonths < 24 -> CattleLifecycleStage.BULLOCK
                    else -> CattleLifecycleStage.BULL
                }
            }
            Gender.NEUTERED -> {
                when {
                    ageInMonths < 12 -> CattleLifecycleStage.CALF
                    else -> CattleLifecycleStage.STEER
                }
            }
        }
    }
    
    /**
     * Get the next expected lifecycle stage and when it should occur
     */
    fun getNextLifecycleTransition(
        currentStage: CattleLifecycleStage,
        birthDate: Long,
        gender: Gender
    ): LifecycleTransition? {
        val ageInMonths = ChronoUnit.MONTHS.between(
            LocalDate.ofEpochDay(birthDate / (24 * 60 * 60 * 1000)),
            LocalDate.now()
        )
        
        return when (currentStage) {
            CattleLifecycleStage.CALF -> {
                val nextStage = when (gender) {
                    Gender.FEMALE -> CattleLifecycleStage.HEIFER
                    Gender.MALE -> CattleLifecycleStage.BULLOCK
                    Gender.NEUTERED -> CattleLifecycleStage.STEER
                }
                val targetAge = when (gender) {
                    Gender.FEMALE -> 12
                    Gender.MALE -> 12
                    Gender.NEUTERED -> 12
                }
                LifecycleTransition(
                    nextStage = nextStage,
                    expectedDate = birthDate + (targetAge * 30L * 24L * 60L * 60L * 1000L),
                    description = "Transition from calf to ${nextStage.name.lowercase()}"
                )
            }
            CattleLifecycleStage.HEIFER -> {
                LifecycleTransition(
                    nextStage = CattleLifecycleStage.COW,
                    expectedDate = null, // Depends on breeding
                    description = "Will become cow after first calving"
                )
            }
            CattleLifecycleStage.BULLOCK -> {
                LifecycleTransition(
                    nextStage = CattleLifecycleStage.BULL,
                    expectedDate = birthDate + (24L * 30L * 24L * 60L * 60L * 1000L),
                    description = "Will become bull at 24 months"
                )
            }
            else -> null // No further transitions
        }
    }
    
    /**
     * Get recommended production purpose based on breed and gender
     */
    fun getRecommendedProductionPurpose(
        breed: String,
        gender: Gender,
        lifecycleStage: CattleLifecycleStage
    ): ProductionPurpose {
        val breedLower = breed.lowercase()
        
        return when {
            // Dairy breeds
            breedLower.contains("holstein") || breedLower.contains("friesian") ||
            breedLower.contains("jersey") || breedLower.contains("guernsey") ||
            breedLower.contains("ayrshire") || breedLower.contains("brown swiss") -> {
                when (gender) {
                    Gender.FEMALE -> ProductionPurpose.DAIRY
                    Gender.MALE -> ProductionPurpose.BEEF
                    Gender.NEUTERED -> ProductionPurpose.BEEF
                }
            }
            // Beef breeds
            breedLower.contains("angus") || breedLower.contains("hereford") ||
            breedLower.contains("charolais") || breedLower.contains("limousin") ||
            breedLower.contains("simmental") || breedLower.contains("brahman") -> {
                ProductionPurpose.BEEF
            }
            // Dual purpose breeds
            breedLower.contains("shorthorn") || breedLower.contains("devon") ||
            breedLower.contains("south devon") || breedLower.contains("normande") -> {
                when (gender) {
                    Gender.FEMALE -> ProductionPurpose.DUAL_PURPOSE
                    Gender.MALE -> ProductionPurpose.BEEF
                    Gender.NEUTERED -> ProductionPurpose.BEEF
                }
            }
            else -> {
                when (gender) {
                    Gender.FEMALE -> ProductionPurpose.DUAL_PURPOSE
                    Gender.MALE -> ProductionPurpose.BEEF
                    Gender.NEUTERED -> ProductionPurpose.BEEF
                }
            }
        }
    }
    
    /**
     * Get weight milestones for different lifecycle stages
     */
    fun getWeightMilestones(stage: CattleLifecycleStage, breed: String): List<WeightMilestone> {
        val breedLower = breed.lowercase()
        
        return when (stage) {
            CattleLifecycleStage.CALF -> {
                listOf(
                    WeightMilestone("Birth", 30.0, 45.0),
                    WeightMilestone("3 months", 100.0, 150.0),
                    WeightMilestone("6 months", 150.0, 250.0),
                    WeightMilestone("12 months", 250.0, 400.0)
                )
            }
            CattleLifecycleStage.HEIFER -> {
                listOf(
                    WeightMilestone("15 months", 300.0, 450.0),
                    WeightMilestone("18 months", 350.0, 500.0),
                    WeightMilestone("24 months", 400.0, 600.0)
                )
            }
            CattleLifecycleStage.COW -> {
                listOf(
                    WeightMilestone("Mature weight", 500.0, 800.0),
                    WeightMilestone("Post-calving", 450.0, 750.0),
                    WeightMilestone("Peak lactation", 480.0, 780.0)
                )
            }
            CattleLifecycleStage.BULL -> {
                listOf(
                    WeightMilestone("18 months", 400.0, 600.0),
                    WeightMilestone("24 months", 500.0, 750.0),
                    WeightMilestone("Mature weight", 700.0, 1200.0)
                )
            }
            CattleLifecycleStage.STEER -> {
                listOf(
                    WeightMilestone("18 months", 400.0, 600.0),
                    WeightMilestone("24 months", 500.0, 750.0),
                    WeightMilestone("Slaughter weight", 600.0, 900.0)
                )
            }
            CattleLifecycleStage.BULLOCK -> {
                listOf(
                    WeightMilestone("15 months", 300.0, 450.0),
                    WeightMilestone("18 months", 350.0, 500.0),
                    WeightMilestone("24 months", 400.0, 600.0)
                )
            }
        }
    }
    
    /**
     * Calculate optimal breeding timeline for heifers
     */
    fun getBreedingTimeline(birthDate: Long): BreedingTimeline {
        val targetBreedingAge = 15 // months
        val gestationPeriod = 9.5 // months
        val targetCalvingAge = (targetBreedingAge + gestationPeriod).toInt()
        
        val targetBreedingDate = birthDate + (targetBreedingAge * 30L * 24L * 60L * 60L * 1000L)
        val targetCalvingDate = birthDate + (targetCalvingAge * 30L * 24L * 60L * 60L * 1000L)
        
        return BreedingTimeline(
            recommendedBreedingAge = targetBreedingAge,
            recommendedBreedingDate = targetBreedingDate,
            expectedCalvingDate = targetCalvingDate,
            gestationPeriod = gestationPeriod
        )
    }
}

@Serializable
data class LifecycleTransition(
    val nextStage: CattleLifecycleStage,
    val expectedDate: Long?,
    val description: String
)

@Serializable
data class WeightMilestone(
    val stage: String,
    val minWeight: Double,
    val maxWeight: Double
)

@Serializable
data class BreedingTimeline(
    val recommendedBreedingAge: Int, // months
    val recommendedBreedingDate: Long,
    val expectedCalvingDate: Long,
    val gestationPeriod: Double // months
)
