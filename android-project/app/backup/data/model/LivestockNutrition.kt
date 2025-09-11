package com.yourcompany.smartfarm.data.model

import androidx.room.Entity
import androidx.room.PrimaryKey
import kotlinx.serialization.Serializable
import java.time.LocalDateTime

// Livestock Nutrition & Feed Management
@Entity(tableName = "livestock_nutrition")
data class LivestockNutrition(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val livestockId: Long,
    val nutritionId: String,
    val animalType: LivestockCategory,
    val ageGroup: AgeGroup,
    val weight: Double, // kg
    val nutritionalRequirements: NutritionalRequirements,
    val feedRation: FeedRation,
    val feedingSchedule: FeedingSchedule,
    val supplements: List<Supplement>,
    val isActive: Boolean = true,
    val createdAt: LocalDateTime = LocalDateTime.now()
)

@Entity(tableName = "nutritional_requirements")
data class NutritionalRequirements(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val animalType: LivestockCategory,
    val ageGroup: AgeGroup,
    val weight: Double,
    val protein: ProteinRequirement,
    val energy: EnergyRequirement,
    val fiber: FiberRequirement,
    val vitamins: VitaminRequirements,
    val minerals: MineralRequirements,
    val water: WaterRequirement,
    val isActive: Boolean = true
)

@Entity(tableName = "feed_ration")
data class FeedRation(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val rationId: String,
    val animalType: LivestockCategory,
    val ageGroup: AgeGroup,
    val ingredients: List<FeedIngredient>,
    val totalWeight: Double, // kg per day
    val costPerDay: Double,
    val nutritionalProfile: NutritionalProfile,
    val isActive: Boolean = true
)

@Entity(tableName = "feed_ingredient")
data class FeedIngredient(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val ingredientId: String,
    val name: String,
    val category: FeedCategory,
    val nutritionalContent: NutritionalContent,
    val costPerKg: Double,
    val availability: Availability,
    val quality: Quality,
    val isActive: Boolean = true
)

@Entity(tableName = "feeding_schedule")
data class FeedingSchedule(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val scheduleId: String,
    val animalType: LivestockCategory,
    val ageGroup: AgeGroup,
    val feedingTimes: List<FeedingTime>,
    val totalDailyAmount: Double, // kg
    val feedingMethod: FeedingMethod,
    val isActive: Boolean = true
)

@Entity(tableName = "supplement")
data class Supplement(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val supplementId: String,
    val name: String,
    val type: SupplementType,
    val purpose: String,
    val dosage: Dosage,
    val frequency: String,
    val cost: Double,
    val isActive: Boolean = true
)

@Entity(tableName = "nutritional_content")
data class NutritionalContent(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val protein: Double, // %
    val fat: Double, // %
    val fiber: Double, // %
    val ash: Double, // %
    val moisture: Double, // %
    val energy: Double, // kcal/kg
    val calcium: Double, // %
    val phosphorus: Double, // %
    val vitamins: Map<String, Double>, // vitamin name to amount
    val minerals: Map<String, Double>, // mineral name to amount
    val isActive: Boolean = true
)

@Entity(tableName = "nutritional_profile")
data class NutritionalProfile(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val totalProtein: Double, // %
    val totalEnergy: Double, // kcal/kg
    val totalFiber: Double, // %
    val totalFat: Double, // %
    val calcium: Double, // %
    val phosphorus: Double, // %
    val calciumPhosphorusRatio: Double,
    val digestibility: Double, // %
    val palatability: Double, // 0.0 to 1.0
    val isActive: Boolean = true
)

@Entity(tableName = "protein_requirement")
data class ProteinRequirement(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val crudeProtein: Double, // %
    val digestibleProtein: Double, // %
    val aminoAcids: AminoAcidRequirements,
    val isActive: Boolean = true
)

@Entity(tableName = "energy_requirement")
data class EnergyRequirement(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val metabolizableEnergy: Double, // kcal/kg
    val digestibleEnergy: Double, // kcal/kg
    val netEnergy: Double, // kcal/kg
    val isActive: Boolean = true
)

@Entity(tableName = "fiber_requirement")
data class FiberRequirement(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val crudeFiber: Double, // %
    val neutralDetergentFiber: Double, // %
    val acidDetergentFiber: Double, // %
    val isActive: Boolean = true
)

@Entity(tableName = "vitamin_requirements")
data class VitaminRequirements(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val vitaminA: Double, // IU/kg
    val vitaminD: Double, // IU/kg
    val vitaminE: Double, // IU/kg
    val vitaminK: Double, // mg/kg
    val thiamine: Double, // mg/kg
    val riboflavin: Double, // mg/kg
    val niacin: Double, // mg/kg
    val pantothenicAcid: Double, // mg/kg
    val pyridoxine: Double, // mg/kg
    val biotin: Double, // mg/kg
    val folicAcid: Double, // mg/kg
    val cobalamin: Double, // mg/kg
    val choline: Double, // mg/kg
    val ascorbicAcid: Double, // mg/kg
    val isActive: Boolean = true
)

@Entity(tableName = "mineral_requirements")
data class MineralRequirements(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val calcium: Double, // %
    val phosphorus: Double, // %
    val magnesium: Double, // %
    val potassium: Double, // %
    val sodium: Double, // %
    val chloride: Double, // %
    val sulfur: Double, // %
    val iron: Double, // mg/kg
    val zinc: Double, // mg/kg
    val copper: Double, // mg/kg
    val manganese: Double, // mg/kg
    val selenium: Double, // mg/kg
    val iodine: Double, // mg/kg
    val cobalt: Double, // mg/kg
    val isActive: Boolean = true
)

@Entity(tableName = "water_requirement")
data class WaterRequirement(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val dailyIntake: Double, // liters per day
    val waterQuality: WaterQuality,
    val temperature: Double, // °C
    val isActive: Boolean = true
)

@Entity(tableName = "amino_acid_requirements")
data class AminoAcidRequirements(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val lysine: Double, // %
    val methionine: Double, // %
    val threonine: Double, // %
    val tryptophan: Double, // %
    val isoleucine: Double, // %
    val leucine: Double, // %
    val valine: Double, // %
    val phenylalanine: Double, // %
    val histidine: Double, // %
    val arginine: Double, // %
    val isActive: Boolean = true
)

@Entity(tableName = "feeding_time")
data class FeedingTime(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val time: String, // HH:MM format
    val amount: Double, // kg
    val feedType: FeedType,
    val isActive: Boolean = true
)

@Entity(tableName = "dosage")
data class Dosage(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val amount: Double,
    val unit: String,
    val perAnimal: Boolean,
    val perKgBodyWeight: Boolean,
    val isActive: Boolean = true
)

@Entity(tableName = "water_quality")
data class WaterQuality(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val ph: Double,
    val totalDissolvedSolids: Double, // mg/L
    val hardness: Double, // mg/L
    val bacteria: Double, // CFU/mL
    val isActive: Boolean = true
)

@Entity(tableName = "availability")
data class Availability(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val season: String,
    val region: String,
    val supplier: String,
    val stockLevel: Double, // kg
    val leadTime: Int, // days
    val isActive: Boolean = true
)

@Entity(tableName = "quality")
data class Quality(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val grade: QualityGrade,
    val freshness: Double, // 0.0 to 1.0
    val contamination: Double, // 0.0 to 1.0
    val nutritionalValue: Double, // 0.0 to 1.0
    val isActive: Boolean = true
)

// Enums
enum class AgeGroup {
    NEWBORN,
    YOUNG,
    ADOLESCENT,
    ADULT,
    MATURE,
    SENIOR
}

enum class FeedCategory {
    CONCENTRATE,
    ROUGHAGE,
    FORAGE,
    GRAIN,
    LEGUME,
    OILSEED,
    BYPRODUCT,
    SUPPLEMENT,
    MINERAL,
    VITAMIN
}

enum class FeedingMethod {
    FREE_CHOICE,
    RESTRICTED,
    TIMED_FEEDING,
    AUTOMATIC_FEEDER,
    MANUAL_FEEDING,
    PASTURE_GRAZING,
    CONFINED_FEEDING
}

enum class FeedType {
    CONCENTRATE,
    ROUGHAGE,
    FORAGE,
    SUPPLEMENT,
    WATER
}

enum class SupplementType {
    VITAMIN,
    MINERAL,
    PROBIOTIC,
    PREBIOTIC,
    ENZYME,
    ANTIOXIDANT,
    ANTIBIOTIC,
    GROWTH_PROMOTER,
    DIGESTIVE_AID,
    IMMUNE_BOOSTER
}

enum class QualityGrade {
    PREMIUM,
    GRADE_A,
    GRADE_B,
    GRADE_C,
    STANDARD,
    ECONOMY
}

// Livestock Nutrition Engine
object LivestockNutritionEngine {
    
    fun calculateNutritionalRequirements(
        animalType: LivestockCategory,
        ageGroup: AgeGroup,
        weight: Double,
        productionStage: String
    ): NutritionalRequirements {
        val protein = calculateProteinRequirement(animalType, ageGroup, weight, productionStage)
        val energy = calculateEnergyRequirement(animalType, ageGroup, weight, productionStage)
        val fiber = calculateFiberRequirement(animalType, ageGroup, weight)
        val vitamins = calculateVitaminRequirements(animalType, ageGroup, weight)
        val minerals = calculateMineralRequirements(animalType, ageGroup, weight)
        val water = calculateWaterRequirement(animalType, ageGroup, weight)
        
        return NutritionalRequirements(
            animalType = animalType,
            ageGroup = ageGroup,
            weight = weight,
            protein = protein,
            energy = energy,
            fiber = fiber,
            vitamins = vitamins,
            minerals = minerals,
            water = water,
            isActive = true
        )
    }
    
    fun formulateFeedRation(
        requirements: NutritionalRequirements,
        availableIngredients: List<FeedIngredient>,
        budget: Double
    ): FeedRation {
        val optimizedIngredients = optimizeIngredientSelection(requirements, availableIngredients, budget)
        val totalWeight = calculateTotalFeedWeight(optimizedIngredients)
        val costPerDay = calculateDailyCost(optimizedIngredients)
        val nutritionalProfile = calculateNutritionalProfile(optimizedIngredients)
        
        return FeedRation(
            rationId = generateRationId(),
            animalType = requirements.animalType,
            ageGroup = requirements.ageGroup,
            ingredients = optimizedIngredients,
            totalWeight = totalWeight,
            costPerDay = costPerDay,
            nutritionalProfile = nutritionalProfile,
            isActive = true
        )
    }
    
    fun createFeedingSchedule(
        animalType: LivestockCategory,
        ageGroup: AgeGroup,
        totalDailyAmount: Double
    ): FeedingSchedule {
        val feedingTimes = calculateFeedingTimes(animalType, ageGroup, totalDailyAmount)
        val feedingMethod = determineFeedingMethod(animalType, ageGroup)
        
        return FeedingSchedule(
            scheduleId = generateScheduleId(),
            animalType = animalType,
            ageGroup = ageGroup,
            feedingTimes = feedingTimes,
            totalDailyAmount = totalDailyAmount,
            feedingMethod = feedingMethod,
            isActive = true
        )
    }
    
    fun recommendSupplements(
        animalType: LivestockCategory,
        ageGroup: AgeGroup,
        currentDiet: FeedRation,
        healthStatus: String
    ): List<Supplement> {
        val supplements = mutableListOf<Supplement>()
        
        // Vitamin supplements
        if (needsVitaminSupplement(currentDiet, animalType)) {
            supplements.add(createVitaminSupplement(animalType, ageGroup))
        }
        
        // Mineral supplements
        if (needsMineralSupplement(currentDiet, animalType)) {
            supplements.add(createMineralSupplement(animalType, ageGroup))
        }
        
        // Health-specific supplements
        if (healthStatus == "STRESSED" || healthStatus == "SICK") {
            supplements.add(createImmuneBoosterSupplement())
        }
        
        return supplements
    }
    
    fun optimizeFeedCost(
        currentRation: FeedRation,
        budget: Double,
        availableIngredients: List<FeedIngredient>
    ): FeedRation {
        val costOptimizedIngredients = optimizeForCost(currentRation, budget, availableIngredients)
        val totalWeight = calculateTotalFeedWeight(costOptimizedIngredients)
        val costPerDay = calculateDailyCost(costOptimizedIngredients)
        val nutritionalProfile = calculateNutritionalProfile(costOptimizedIngredients)
        
        return FeedRation(
            rationId = generateRationId(),
            animalType = currentRation.animalType,
            ageGroup = currentRation.ageGroup,
            ingredients = costOptimizedIngredients,
            totalWeight = totalWeight,
            costPerDay = costPerDay,
            nutritionalProfile = nutritionalProfile,
            isActive = true
        )
    }
    
    fun analyzeFeedEfficiency(
        feedRation: FeedRation,
        animalPerformance: AnimalPerformance
    ): FeedEfficiencyAnalysis {
        val feedConversionRatio = calculateFeedConversionRatio(feedRation, animalPerformance)
        val costEfficiency = calculateCostEfficiency(feedRation, animalPerformance)
        val nutritionalEfficiency = calculateNutritionalEfficiency(feedRation, animalPerformance)
        val recommendations = generateEfficiencyRecommendations(feedConversionRatio, costEfficiency)
        
        return FeedEfficiencyAnalysis(
            feedConversionRatio = feedConversionRatio,
            costEfficiency = costEfficiency,
            nutritionalEfficiency = nutritionalEfficiency,
            recommendations = recommendations,
            timestamp = LocalDateTime.now()
        )
    }
    
    fun predictFeedNeeds(
        animalType: LivestockCategory,
        ageGroup: AgeGroup,
        currentWeight: Double,
        targetWeight: Double,
        timeFrame: Int // days
    ): FeedPrediction {
        val dailyFeedNeeds = calculateDailyFeedNeeds(animalType, ageGroup, currentWeight, targetWeight)
        val totalFeedNeeds = dailyFeedNeeds * timeFrame
        val costEstimate = calculateFeedCostEstimate(totalFeedNeeds, animalType)
        val recommendations = generateFeedRecommendations(animalType, ageGroup, dailyFeedNeeds)
        
        return FeedPrediction(
            dailyFeedNeeds = dailyFeedNeeds,
            totalFeedNeeds = totalFeedNeeds,
            costEstimate = costEstimate,
            recommendations = recommendations,
            timestamp = LocalDateTime.now()
        )
    }
    
    private fun calculateProteinRequirement(
        animalType: LivestockCategory,
        ageGroup: AgeGroup,
        weight: Double,
        productionStage: String
    ): ProteinRequirement {
        val baseProtein = getBaseProteinRequirement(animalType, ageGroup)
        val weightMultiplier = weight / 100.0 // Normalize to 100kg
        val productionMultiplier = getProductionMultiplier(productionStage)
        
        val crudeProtein = baseProtein * weightMultiplier * productionMultiplier
        val digestibleProtein = crudeProtein * 0.8 // Assume 80% digestibility
        
        return ProteinRequirement(
            crudeProtein = crudeProtein,
            digestibleProtein = digestibleProtein,
            aminoAcids = AminoAcidRequirements(
                lysine = crudeProtein * 0.05,
                methionine = crudeProtein * 0.02,
                threonine = crudeProtein * 0.04,
                tryptophan = crudeProtein * 0.01,
                isoleucine = crudeProtein * 0.04,
                leucine = crudeProtein * 0.07,
                valine = crudeProtein * 0.05,
                phenylalanine = crudeProtein * 0.05,
                histidine = crudeProtein * 0.02,
                arginine = crudeProtein * 0.06,
                isActive = true
            ),
            isActive = true
        )
    }
    
    private fun calculateEnergyRequirement(
        animalType: LivestockCategory,
        ageGroup: AgeGroup,
        weight: Double,
        productionStage: String
    ): EnergyRequirement {
        val baseEnergy = getBaseEnergyRequirement(animalType, ageGroup)
        val weightMultiplier = weight / 100.0
        val productionMultiplier = getProductionMultiplier(productionStage)
        
        val metabolizableEnergy = baseEnergy * weightMultiplier * productionMultiplier
        val digestibleEnergy = metabolizableEnergy * 0.9
        val netEnergy = digestibleEnergy * 0.7
        
        return EnergyRequirement(
            metabolizableEnergy = metabolizableEnergy,
            digestibleEnergy = digestibleEnergy,
            netEnergy = netEnergy,
            isActive = true
        )
    }
    
    private fun calculateFiberRequirement(
        animalType: LivestockCategory,
        ageGroup: AgeGroup,
        weight: Double
    ): FiberRequirement {
        val baseFiber = getBaseFiberRequirement(animalType, ageGroup)
        val weightMultiplier = weight / 100.0
        
        val crudeFiber = baseFiber * weightMultiplier
        val neutralDetergentFiber = crudeFiber * 2.5
        val acidDetergentFiber = crudeFiber * 1.5
        
        return FiberRequirement(
            crudeFiber = crudeFiber,
            neutralDetergentFiber = neutralDetergentFiber,
            acidDetergentFiber = acidDetergentFiber,
            isActive = true
        )
    }
    
    private fun calculateVitaminRequirements(
        animalType: LivestockCategory,
        ageGroup: AgeGroup,
        weight: Double
    ): VitaminRequirements {
        val baseVitamins = getBaseVitaminRequirements(animalType, ageGroup)
        val weightMultiplier = weight / 100.0
        
        return VitaminRequirements(
            vitaminA = baseVitamins.vitaminA * weightMultiplier,
            vitaminD = baseVitamins.vitaminD * weightMultiplier,
            vitaminE = baseVitamins.vitaminE * weightMultiplier,
            vitaminK = baseVitamins.vitaminK * weightMultiplier,
            thiamine = baseVitamins.thiamine * weightMultiplier,
            riboflavin = baseVitamins.riboflavin * weightMultiplier,
            niacin = baseVitamins.niacin * weightMultiplier,
            pantothenicAcid = baseVitamins.pantothenicAcid * weightMultiplier,
            pyridoxine = baseVitamins.pyridoxine * weightMultiplier,
            biotin = baseVitamins.biotin * weightMultiplier,
            folicAcid = baseVitamins.folicAcid * weightMultiplier,
            cobalamin = baseVitamins.cobalamin * weightMultiplier,
            choline = baseVitamins.choline * weightMultiplier,
            ascorbicAcid = baseVitamins.ascorbicAcid * weightMultiplier,
            isActive = true
        )
    }
    
    private fun calculateMineralRequirements(
        animalType: LivestockCategory,
        ageGroup: AgeGroup,
        weight: Double
    ): MineralRequirements {
        val baseMinerals = getBaseMineralRequirements(animalType, ageGroup)
        val weightMultiplier = weight / 100.0
        
        return MineralRequirements(
            calcium = baseMinerals.calcium * weightMultiplier,
            phosphorus = baseMinerals.phosphorus * weightMultiplier,
            magnesium = baseMinerals.magnesium * weightMultiplier,
            potassium = baseMinerals.potassium * weightMultiplier,
            sodium = baseMinerals.sodium * weightMultiplier,
            chloride = baseMinerals.chloride * weightMultiplier,
            sulfur = baseMinerals.sulfur * weightMultiplier,
            iron = baseMinerals.iron * weightMultiplier,
            zinc = baseMinerals.zinc * weightMultiplier,
            copper = baseMinerals.copper * weightMultiplier,
            manganese = baseMinerals.manganese * weightMultiplier,
            selenium = baseMinerals.selenium * weightMultiplier,
            iodine = baseMinerals.iodine * weightMultiplier,
            cobalt = baseMinerals.cobalt * weightMultiplier,
            isActive = true
        )
    }
    
    private fun calculateWaterRequirement(
        animalType: LivestockCategory,
        ageGroup: AgeGroup,
        weight: Double
    ): WaterRequirement {
        val baseWater = getBaseWaterRequirement(animalType, ageGroup)
        val weightMultiplier = weight / 100.0
        
        val dailyIntake = baseWater * weightMultiplier
        
        return WaterRequirement(
            dailyIntake = dailyIntake,
            waterQuality = WaterQuality(
                ph = 7.0,
                totalDissolvedSolids = 500.0,
                hardness = 150.0,
                bacteria = 0.0,
                isActive = true
            ),
            temperature = 20.0,
            isActive = true
        )
    }
    
    private fun optimizeIngredientSelection(
        requirements: NutritionalRequirements,
        availableIngredients: List<FeedIngredient>,
        budget: Double
    ): List<FeedIngredient> {
        // Simplified optimization - in reality, this would use linear programming
        val selectedIngredients = mutableListOf<FeedIngredient>()
        var remainingBudget = budget
        
        // Prioritize ingredients by nutritional value and cost
        val sortedIngredients = availableIngredients.sortedBy { it.costPerKg }
        
        for (ingredient in sortedIngredients) {
            if (remainingBudget >= ingredient.costPerKg) {
                selectedIngredients.add(ingredient)
                remainingBudget -= ingredient.costPerKg
            }
        }
        
        return selectedIngredients
    }
    
    private fun calculateTotalFeedWeight(ingredients: List<FeedIngredient>): Double {
        return ingredients.sumOf { it.nutritionalContent.protein * 10.0 } // Simplified calculation
    }
    
    private fun calculateDailyCost(ingredients: List<FeedIngredient>): Double {
        return ingredients.sumOf { it.costPerKg }
    }
    
    private fun calculateNutritionalProfile(ingredients: List<FeedIngredient>): NutritionalProfile {
        val totalProtein = ingredients.map { it.nutritionalContent.protein }.average()
        val totalEnergy = ingredients.map { it.nutritionalContent.energy }.average()
        val totalFiber = ingredients.map { it.nutritionalContent.fiber }.average()
        val totalFat = ingredients.map { it.nutritionalContent.fat }.average()
        val calcium = ingredients.map { it.nutritionalContent.calcium }.average()
        val phosphorus = ingredients.map { it.nutritionalContent.phosphorus }.average()
        
        return NutritionalProfile(
            totalProtein = totalProtein,
            totalEnergy = totalEnergy,
            totalFiber = totalFiber,
            totalFat = totalFat,
            calcium = calcium,
            phosphorus = phosphorus,
            calciumPhosphorusRatio = if (phosphorus > 0) calcium / phosphorus else 0.0,
            digestibility = 0.85,
            palatability = 0.9,
            isActive = true
        )
    }
    
    private fun calculateFeedingTimes(
        animalType: LivestockCategory,
        ageGroup: AgeGroup,
        totalDailyAmount: Double
    ): List<FeedingTime> {
        val feedingFrequency = getFeedingFrequency(animalType, ageGroup)
        val amountPerFeeding = totalDailyAmount / feedingFrequency
        
        return (1..feedingFrequency).map { feeding ->
            FeedingTime(
                time = "${6 + (feeding - 1) * 6}:00", // 6:00, 12:00, 18:00, etc.
                amount = amountPerFeeding,
                feedType = FeedType.CONCENTRATE,
                isActive = true
            )
        }
    }
    
    private fun determineFeedingMethod(
        animalType: LivestockCategory,
        ageGroup: AgeGroup
    ): FeedingMethod {
        return when (animalType) {
            LivestockCategory.CATTLE -> FeedingMethod.PASTURE_GRAZING
            LivestockCategory.PIGS -> FeedingMethod.CONFINED_FEEDING
            LivestockCategory.POULTRY -> FeedingMethod.AUTOMATIC_FEEDER
            else -> FeedingMethod.MANUAL_FEEDING
        }
    }
    
    private fun needsVitaminSupplement(diet: FeedRation, animalType: LivestockCategory): Boolean {
        return diet.nutritionalProfile.totalProtein < 15.0 // Simplified check
    }
    
    private fun needsMineralSupplement(diet: FeedRation, animalType: LivestockCategory): Boolean {
        return diet.nutritionalProfile.calcium < 0.5 // Simplified check
    }
    
    private fun createVitaminSupplement(animalType: LivestockCategory, ageGroup: AgeGroup): Supplement {
        return Supplement(
            supplementId = generateSupplementId(),
            name = "Multi-Vitamin Supplement",
            type = SupplementType.VITAMIN,
            purpose = "Complete vitamin support",
            dosage = Dosage(
                amount = 10.0,
                unit = "g",
                perAnimal = true,
                perKgBodyWeight = false,
                isActive = true
            ),
            frequency = "Daily",
            cost = 5.0,
            isActive = true
        )
    }
    
    private fun createMineralSupplement(animalType: LivestockCategory, ageGroup: AgeGroup): Supplement {
        return Supplement(
            supplementId = generateSupplementId(),
            name = "Mineral Block",
            type = SupplementType.MINERAL,
            purpose = "Essential mineral support",
            dosage = Dosage(
                amount = 1.0,
                unit = "block",
                perAnimal = true,
                perKgBodyWeight = false,
                isActive = true
            ),
            frequency = "Weekly",
            cost = 15.0,
            isActive = true
        )
    }
    
    private fun createImmuneBoosterSupplement(): Supplement {
        return Supplement(
            supplementId = generateSupplementId(),
            name = "Immune Booster",
            type = SupplementType.IMMUNE_BOOSTER,
            purpose = "Support immune system",
            dosage = Dosage(
                amount = 5.0,
                unit = "ml",
                perAnimal = true,
                perKgBodyWeight = false,
                isActive = true
            ),
            frequency = "Daily",
            cost = 8.0,
            isActive = true
        )
    }
    
    private fun optimizeForCost(
        currentRation: FeedRation,
        budget: Double,
        availableIngredients: List<FeedIngredient>
    ): List<FeedIngredient> {
        // Simplified cost optimization
        return availableIngredients.filter { it.costPerKg <= budget / currentRation.totalWeight }
    }
    
    private fun calculateFeedConversionRatio(
        feedRation: FeedRation,
        animalPerformance: AnimalPerformance
    ): Double {
        return feedRation.totalWeight / animalPerformance.weightGain
    }
    
    private fun calculateCostEfficiency(
        feedRation: FeedRation,
        animalPerformance: AnimalPerformance
    ): Double {
        return animalPerformance.weightGain / feedRation.costPerDay
    }
    
    private fun calculateNutritionalEfficiency(
        feedRation: FeedRation,
        animalPerformance: AnimalPerformance
    ): Double {
        return animalPerformance.weightGain / feedRation.nutritionalProfile.totalProtein
    }
    
    private fun generateEfficiencyRecommendations(
        feedConversionRatio: Double,
        costEfficiency: Double
    ): List<String> {
        val recommendations = mutableListOf<String>()
        
        if (feedConversionRatio > 3.0) {
            recommendations.add("Improve feed quality to reduce conversion ratio")
        }
        
        if (costEfficiency < 0.5) {
            recommendations.add("Optimize feed costs for better efficiency")
        }
        
        return recommendations
    }
    
    private fun calculateDailyFeedNeeds(
        animalType: LivestockCategory,
        ageGroup: AgeGroup,
        currentWeight: Double,
        targetWeight: Double
    ): Double {
        val baseFeed = getBaseFeedRequirement(animalType, ageGroup)
        val weightMultiplier = (currentWeight + targetWeight) / 200.0
        return baseFeed * weightMultiplier
    }
    
    private fun calculateFeedCostEstimate(totalFeedNeeds: Double, animalType: LivestockCategory): Double {
        val costPerKg = getFeedCostPerKg(animalType)
        return totalFeedNeeds * costPerKg
    }
    
    private fun generateFeedRecommendations(
        animalType: LivestockCategory,
        ageGroup: AgeGroup,
        dailyFeedNeeds: Double
    ): List<String> {
        return listOf(
            "Feed ${dailyFeedNeeds}kg daily",
            "Provide fresh water at all times",
            "Monitor animal health regularly",
            "Adjust feed based on performance"
        )
    }
    
    private fun getBaseProteinRequirement(animalType: LivestockCategory, ageGroup: AgeGroup): Double {
        return when (animalType) {
            LivestockCategory.CATTLE -> when (ageGroup) {
                AgeGroup.YOUNG -> 18.0
                AgeGroup.ADULT -> 12.0
                else -> 15.0
            }
            LivestockCategory.PIGS -> when (ageGroup) {
                AgeGroup.YOUNG -> 20.0
                AgeGroup.ADULT -> 16.0
                else -> 18.0
            }
            LivestockCategory.POULTRY -> when (ageGroup) {
                AgeGroup.YOUNG -> 22.0
                AgeGroup.ADULT -> 18.0
                else -> 20.0
            }
            else -> 15.0
        }
    }
    
    private fun getBaseEnergyRequirement(animalType: LivestockCategory, ageGroup: AgeGroup): Double {
        return when (animalType) {
            LivestockCategory.CATTLE -> 3000.0
            LivestockCategory.PIGS -> 3500.0
            LivestockCategory.POULTRY -> 3200.0
            else -> 3000.0
        }
    }
    
    private fun getBaseFiberRequirement(animalType: LivestockCategory, ageGroup: AgeGroup): Double {
        return when (animalType) {
            LivestockCategory.CATTLE -> 25.0
            LivestockCategory.PIGS -> 8.0
            LivestockCategory.POULTRY -> 5.0
            else -> 15.0
        }
    }
    
    private fun getBaseVitaminRequirements(animalType: LivestockCategory, ageGroup: AgeGroup): VitaminRequirements {
        return VitaminRequirements(
            vitaminA = 5000.0,
            vitaminD = 1000.0,
            vitaminE = 50.0,
            vitaminK = 2.0,
            thiamine = 5.0,
            riboflavin = 10.0,
            niacin = 50.0,
            pantothenicAcid = 20.0,
            pyridoxine = 5.0,
            biotin = 0.2,
            folicAcid = 2.0,
            cobalamin = 0.02,
            choline = 1000.0,
            ascorbicAcid = 100.0,
            isActive = true
        )
    }
    
    private fun getBaseMineralRequirements(animalType: LivestockCategory, ageGroup: AgeGroup): MineralRequirements {
        return MineralRequirements(
            calcium = 0.6,
            phosphorus = 0.4,
            magnesium = 0.2,
            potassium = 0.8,
            sodium = 0.1,
            chloride = 0.1,
            sulfur = 0.2,
            iron = 100.0,
            zinc = 50.0,
            copper = 10.0,
            manganese = 40.0,
            selenium = 0.3,
            iodine = 0.5,
            cobalt = 0.1,
            isActive = true
        )
    }
    
    private fun getBaseWaterRequirement(animalType: LivestockCategory, ageGroup: AgeGroup): Double {
        return when (animalType) {
            LivestockCategory.CATTLE -> 50.0
            LivestockCategory.PIGS -> 15.0
            LivestockCategory.POULTRY -> 0.5
            else -> 20.0
        }
    }
    
    private fun getProductionMultiplier(productionStage: String): Double {
        return when (productionStage) {
            "LACTATING" -> 1.5
            "PREGNANT" -> 1.3
            "GROWING" -> 1.2
            "MAINTENANCE" -> 1.0
            else -> 1.0
        }
    }
    
    private fun getFeedingFrequency(animalType: LivestockCategory, ageGroup: AgeGroup): Int {
        return when (animalType) {
            LivestockCategory.CATTLE -> 2
            LivestockCategory.PIGS -> 3
            LivestockCategory.POULTRY -> 4
            else -> 2
        }
    }
    
    private fun getBaseFeedRequirement(animalType: LivestockCategory, ageGroup: AgeGroup): Double {
        return when (animalType) {
            LivestockCategory.CATTLE -> 25.0
            LivestockCategory.PIGS -> 3.0
            LivestockCategory.POULTRY -> 0.15
            else -> 5.0
        }
    }
    
    private fun getFeedCostPerKg(animalType: LivestockCategory): Double {
        return when (animalType) {
            LivestockCategory.CATTLE -> 0.5
            LivestockCategory.PIGS -> 0.8
            LivestockCategory.POULTRY -> 1.2
            else -> 0.6
        }
    }
    
    private fun generateRationId(): String {
        return "ration_${System.currentTimeMillis()}_${(1000..9999).random()}"
    }
    
    private fun generateScheduleId(): String {
        return "schedule_${System.currentTimeMillis()}_${(1000..9999).random()}"
    }
    
    private fun generateSupplementId(): String {
        return "supplement_${System.currentTimeMillis()}_${(1000..9999).random()}"
    }
}

// Data Classes
data class AnimalPerformance(
    val weightGain: Double,
    val feedIntake: Double,
    val healthStatus: String,
    val productionLevel: String
)

data class FeedEfficiencyAnalysis(
    val feedConversionRatio: Double,
    val costEfficiency: Double,
    val nutritionalEfficiency: Double,
    val recommendations: List<String>,
    val timestamp: LocalDateTime
)

data class FeedPrediction(
    val dailyFeedNeeds: Double,
    val totalFeedNeeds: Double,
    val costEstimate: Double,
    val recommendations: List<String>,
    val timestamp: LocalDateTime
)
