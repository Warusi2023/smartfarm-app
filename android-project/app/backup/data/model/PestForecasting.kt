package com.yourcompany.smartfarm.data.model

import androidx.room.Entity
import androidx.room.PrimaryKey
import kotlinx.serialization.Serializable
import java.time.LocalDateTime

@Entity(tableName = "pest_forecasts")
data class PestForecast(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val farmId: Long,
    val cropId: Long,
    val pestType: PestType,
    val riskLevel: RiskLevel,
    val forecastDate: LocalDateTime,
    val weatherConditions: WeatherConditions,
    val temperature: Double,
    val humidity: Double,
    val precipitation: Double,
    val windSpeed: Double,
    val predictedInfestationProbability: Double, // 0.0 to 1.0
    val predictedSeverity: InfestationSeverity,
    val recommendedActions: List<PestAction>,
    val preventionMeasures: List<String>,
    val treatmentOptions: List<TreatmentOption>,
    val economicImpact: EconomicImpact,
    val isActive: Boolean = true,
    val createdAt: LocalDateTime = LocalDateTime.now()
)

@Entity(tableName = "pest_types")
data class PestType(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val name: String,
    val scientificName: String,
    val category: PestCategory,
    val description: String,
    val lifecycle: String,
    val preferredConditions: PestConditions,
    val affectedCrops: List<String>,
    val damageSymptoms: List<String>,
    val controlMethods: List<String>,
    val economicThreshold: Double, // Economic threshold for treatment
    val isActive: Boolean = true
)

@Entity(tableName = "weather_conditions")
data class WeatherConditions(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val temperature: Double,
    val humidity: Double,
    val precipitation: Double,
    val windSpeed: Double,
    val windDirection: String,
    val pressure: Double,
    val visibility: Double,
    val cloudCover: Double,
    val dewPoint: Double,
    val heatIndex: Double,
    val uvIndex: Double,
    val conditions: String,
    val timestamp: LocalDateTime = LocalDateTime.now()
)

@Entity(tableName = "pest_conditions")
data class PestConditions(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val optimalTemperatureMin: Double,
    val optimalTemperatureMax: Double,
    val optimalHumidityMin: Double,
    val optimalHumidityMax: Double,
    val optimalPrecipitationMin: Double,
    val optimalPrecipitationMax: Double,
    val optimalWindSpeedMax: Double,
    val temperatureThreshold: Double, // Temperature below/above which pest activity changes
    val humidityThreshold: Double,
    val precipitationThreshold: Double,
    val windThreshold: Double,
    val seasonalPatterns: List<SeasonalPattern>,
    val lifecycleStages: List<LifecycleStage>
)

@Entity(tableName = "pest_actions")
data class PestAction(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val actionType: ActionType,
    val priority: Priority,
    val description: String,
    val timing: String, // When to apply
    val method: String, // How to apply
    val materials: List<String>, // What materials to use
    val cost: Double?, // Estimated cost
    val effectiveness: Double, // 0.0 to 1.0
    val environmentalImpact: EnvironmentalImpact,
    val safetyPrecautions: List<String>,
    val applicationRate: String,
    val reapplicationInterval: String?,
    val isOrganic: Boolean,
    val isActive: Boolean = true
)

@Entity(table_name = "treatment_options")
data class TreatmentOption(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val name: String,
    val type: TreatmentType,
    val activeIngredient: String,
    val concentration: String,
    val applicationMethod: String,
    val applicationRate: String,
    val timing: String,
    val effectiveness: Double, // 0.0 to 1.0
    val cost: Double,
    val environmentalImpact: EnvironmentalImpact,
    val safetyPrecautions: List<String>,
    val reapplicationInterval: String?,
    val isOrganic: Boolean,
    val isActive: Boolean = true
)

@Entity(table_name = "economic_impact")
data class EconomicImpact(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val potentialYieldLoss: Double, // Percentage of yield loss
    val potentialRevenueLoss: Double, // Estimated revenue loss
    val treatmentCost: Double, // Cost of treatment
    val preventionCost: Double, // Cost of prevention
    val netEconomicImpact: Double, // Net impact (positive = cost, negative = benefit)
    val breakEvenPoint: Double, // Economic threshold for treatment
    val roi: Double, // Return on investment for treatment
    val isActive: Boolean = true
)

@Entity(table_name = "seasonal_patterns")
data class SeasonalPattern(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val season: Season,
    val activityLevel: ActivityLevel,
    val peakMonths: List<Int>, // Month numbers (1-12)
    val dormantMonths: List<Int>,
    val migrationPatterns: List<String>,
    val breedingSeasons: List<String>,
    val isActive: Boolean = true
)

@Entity(table_name = "lifecycle_stages")
data class LifecycleStage(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val stage: LifecycleStageType,
    val duration: String, // Duration of this stage
    val temperatureRequirement: String,
    val humidityRequirement: String,
    val foodRequirement: String,
    val vulnerability: VulnerabilityLevel,
    val controlOpportunities: List<String>,
    val isActive: Boolean = true
)

// Enums
enum class PestCategory {
    INSECTS,
    MITES,
    NEMATODES,
    FUNGI,
    BACTERIA,
    VIRUSES,
    WEEDS,
    RODENTS,
    BIRDS,
    MAMMALS
}

enum class RiskLevel {
    LOW,
    MODERATE,
    HIGH,
    CRITICAL
}

enum class InfestationSeverity {
    MINOR,
    MODERATE,
    SEVERE,
    DEVASTATING
}

enum class ActionType {
    PREVENTION,
    MONITORING,
    TREATMENT,
    QUARANTINE,
    CROP_ROTATION,
    BIOLOGICAL_CONTROL,
    CHEMICAL_CONTROL,
    MECHANICAL_CONTROL,
    CULTURAL_CONTROL
}

enum class TreatmentType {
    BIOLOGICAL,
    CHEMICAL,
    MECHANICAL,
    CULTURAL,
    INTEGRATED_PEST_MANAGEMENT
}

enum class EnvironmentalImpact {
    LOW,
    MODERATE,
    HIGH,
    VERY_HIGH
}

enum class Season {
    SPRING,
    SUMMER,
    AUTUMN,
    WINTER
}

enum class ActivityLevel {
    DORMANT,
    LOW,
    MODERATE,
    HIGH,
    PEAK
}

enum class LifecycleStageType {
    EGG,
    LARVA,
    NYMPH,
    PUPA,
    ADULT,
    SPORE,
    HYPHAE,
    FRUITING_BODY
}

enum class VulnerabilityLevel {
    LOW,
    MODERATE,
    HIGH,
    VERY_HIGH
}

// Pest Forecasting Engine
object PestForecastingEngine {
    
    fun generateForecast(
        weatherForecast: List<WeatherConditions>,
        cropType: String,
        farmLocation: String,
        currentPestActivity: List<PestType>
    ): List<PestForecast> {
        val forecasts = mutableListOf<PestForecast>()
        
        for (weather in weatherForecast) {
            for (pest in currentPestActivity) {
                val forecast = calculatePestRisk(weather, pest, cropType)
                if (forecast != null) {
                    forecasts.add(forecast)
                }
            }
        }
        
        return forecasts
    }
    
    private fun calculatePestRisk(
        weather: WeatherConditions,
        pest: PestType,
        cropType: String
    ): PestForecast? {
        val conditions = pest.preferredConditions
        val riskScore = calculateRiskScore(weather, conditions)
        val probability = riskScore / 100.0
        
        if (probability < 0.1) return null // Skip low-risk forecasts
        
        return PestForecast(
            farmId = 0L, // Will be set by caller
            cropId = 0L, // Will be set by caller
            pestType = pest,
            riskLevel = determineRiskLevel(probability),
            forecastDate = weather.timestamp,
            weatherConditions = weather,
            temperature = weather.temperature,
            humidity = weather.humidity,
            precipitation = weather.precipitation,
            windSpeed = weather.windSpeed,
            predictedInfestationProbability = probability,
            predictedSeverity = determineSeverity(probability),
            recommendedActions = generateRecommendedActions(pest, probability),
            preventionMeasures = generatePreventionMeasures(pest),
            treatmentOptions = generateTreatmentOptions(pest),
            economicImpact = calculateEconomicImpact(pest, probability)
        )
    }
    
    private fun calculateRiskScore(
        weather: WeatherConditions,
        conditions: PestConditions
    ): Double {
        var score = 0.0
        
        // Temperature scoring
        when {
            weather.temperature in conditions.optimalTemperatureMin..conditions.optimalTemperatureMax -> score += 30
            weather.temperature < conditions.optimalTemperatureMin -> score += 10
            weather.temperature > conditions.optimalTemperatureMax -> score += 5
        }
        
        // Humidity scoring
        when {
            weather.humidity in conditions.optimalHumidityMin..conditions.optimalHumidityMax -> score += 25
            weather.humidity < conditions.optimalHumidityMin -> score += 5
            weather.humidity > conditions.optimalHumidityMax -> score += 15
        }
        
        // Precipitation scoring
        when {
            weather.precipitation in conditions.optimalPrecipitationMin..conditions.optimalPrecipitationMax -> score += 20
            weather.precipitation < conditions.optimalPrecipitationMin -> score += 5
            weather.precipitation > conditions.optimalPrecipitationMax -> score += 10
        }
        
        // Wind scoring
        if (weather.windSpeed <= conditions.optimalWindSpeedMax) {
            score += 15
        } else {
            score += 5
        }
        
        // Additional factors
        if (weather.dewPoint > weather.temperature - 5) score += 10 // High humidity
        if (weather.uvIndex > 8) score -= 5 // High UV reduces some pests
        if (weather.pressure < 1000) score += 5 // Low pressure favors some pests
        
        return minOf(score, 100.0)
    }
    
    private fun determineRiskLevel(probability: Double): RiskLevel {
        return when {
            probability >= 0.8 -> RiskLevel.CRITICAL
            probability >= 0.6 -> RiskLevel.HIGH
            probability >= 0.4 -> RiskLevel.MODERATE
            else -> RiskLevel.LOW
        }
    }
    
    private fun determineSeverity(probability: Double): InfestationSeverity {
        return when {
            probability >= 0.8 -> InfestationSeverity.DEVASTATING
            probability >= 0.6 -> InfestationSeverity.SEVERE
            probability >= 0.4 -> InfestationSeverity.MODERATE
            else -> InfestationSeverity.MINOR
        }
    }
    
    private fun generateRecommendedActions(pest: PestType, probability: Double): List<PestAction> {
        val actions = mutableListOf<PestAction>()
        
        when {
            probability >= 0.8 -> {
                // Critical risk - immediate action required
                actions.add(PestAction(
                    actionType = ActionType.TREATMENT,
                    priority = Priority.HIGH,
                    description = "Immediate treatment required",
                    timing = "Within 24 hours",
                    method = "Apply recommended treatment",
                    materials = pest.controlMethods,
                    cost = 100.0,
                    effectiveness = 0.9,
                    environmentalImpact = EnvironmentalImpact.MODERATE,
                    safetyPrecautions = listOf("Wear protective equipment", "Follow label instructions"),
                    applicationRate = "As per label",
                    reapplicationInterval = "7-14 days",
                    isOrganic = false
                ))
            }
            probability >= 0.6 -> {
                // High risk - prevention and monitoring
                actions.add(PestAction(
                    actionType = ActionType.MONITORING,
                    priority = Priority.HIGH,
                    description = "Increase monitoring frequency",
                    timing = "Daily",
                    method = "Visual inspection and traps",
                    materials = listOf("Sticky traps", "Pheromone traps"),
                    cost = 25.0,
                    effectiveness = 0.8,
                    environmentalImpact = EnvironmentalImpact.LOW,
                    safetyPrecautions = listOf("Check traps regularly"),
                    applicationRate = "As needed",
                    reapplicationInterval = null,
                    isOrganic = true
                ))
            }
            probability >= 0.4 -> {
                // Moderate risk - prevention
                actions.add(PestAction(
                    actionType = ActionType.PREVENTION,
                    priority = Priority.MODERATE,
                    description = "Implement prevention measures",
                    timing = "Within 3 days",
                    method = "Cultural and biological controls",
                    materials = listOf("Beneficial insects", "Barriers"),
                    cost = 50.0,
                    effectiveness = 0.7,
                    environmentalImpact = EnvironmentalImpact.LOW,
                    safetyPrecautions = listOf("Follow application guidelines"),
                    applicationRate = "As recommended",
                    reapplicationInterval = "As needed",
                    isOrganic = true
                ))
            }
            else -> {
                // Low risk - monitoring
                actions.add(PestAction(
                    actionType = ActionType.MONITORING,
                    priority = Priority.LOW,
                    description = "Regular monitoring",
                    timing = "Weekly",
                    method = "Visual inspection",
                    materials = listOf("Magnifying glass", "Field notebook"),
                    cost = 5.0,
                    effectiveness = 0.6,
                    environmentalImpact = EnvironmentalImpact.LOW,
                    safetyPrecautions = listOf("Record observations"),
                    applicationRate = "As needed",
                    reapplicationInterval = null,
                    isOrganic = true
                ))
            }
        }
        
        return actions
    }
    
    private fun generatePreventionMeasures(pest: PestType): List<String> {
        return listOf(
            "Maintain proper field hygiene",
            "Remove crop residues",
            "Implement crop rotation",
            "Use resistant varieties",
            "Monitor field borders",
            "Maintain proper plant spacing",
            "Ensure adequate drainage",
            "Use beneficial insects",
            "Apply organic mulches",
            "Regular field scouting"
        )
    }
    
    private fun generateTreatmentOptions(pest: PestType): List<TreatmentOption> {
        return listOf(
            TreatmentOption(
                name = "Biological Control",
                type = TreatmentType.BIOLOGICAL,
                activeIngredient = "Beneficial insects",
                concentration = "As recommended",
                applicationMethod = "Release",
                applicationRate = "Per label",
                timing = "Early season",
                effectiveness = 0.8,
                cost = 75.0,
                environmentalImpact = EnvironmentalImpact.LOW,
                safetyPrecautions = listOf("Handle carefully", "Release at optimal time"),
                reapplicationInterval = "As needed",
                isOrganic = true
            ),
            TreatmentOption(
                name = "Chemical Control",
                type = TreatmentType.CHEMICAL,
                activeIngredient = "Pesticide",
                concentration = "As per label",
                applicationMethod = "Spray",
                applicationRate = "Per label",
                timing = "When threshold reached",
                effectiveness = 0.9,
                cost = 120.0,
                environmentalImpact = EnvironmentalImpact.MODERATE,
                safetyPrecautions = listOf("Wear PPE", "Follow label", "Avoid drift"),
                reapplicationInterval = "7-14 days",
                isOrganic = false
            )
        )
    }
    
    private fun calculateEconomicImpact(pest: PestType, probability: Double): EconomicImpact {
        val potentialYieldLoss = probability * 0.3 // Up to 30% yield loss
        val potentialRevenueLoss = potentialYieldLoss * 10000.0 // Assuming $10k revenue
        val treatmentCost = if (probability >= 0.6) 150.0 else 50.0
        val preventionCost = 25.0
        val netEconomicImpact = treatmentCost - potentialRevenueLoss
        val breakEvenPoint = 0.05 // 5% probability threshold
        val roi = (potentialRevenueLoss - treatmentCost) / treatmentCost
        
        return EconomicImpact(
            potentialYieldLoss = potentialYieldLoss,
            potentialRevenueLoss = potentialRevenueLoss,
            treatmentCost = treatmentCost,
            preventionCost = preventionCost,
            netEconomicImpact = netEconomicImpact,
            breakEvenPoint = breakEvenPoint,
            roi = roi
        )
    }
}

// Common pest database
object CommonPests {
    val PEST_DATABASE = listOf(
        PestType(
            name = "Aphids",
            scientificName = "Aphidoidea",
            category = PestCategory.INSECTS,
            description = "Small sap-sucking insects that can cause significant crop damage",
            lifecycle = "Egg -> Nymph -> Adult (7-10 days)",
            preferredConditions = PestConditions(
                optimalTemperatureMin = 20.0,
                optimalTemperatureMax = 25.0,
                optimalHumidityMin = 60.0,
                optimalHumidityMax = 80.0,
                optimalPrecipitationMin = 0.0,
                optimalPrecipitationMax = 5.0,
                optimalWindSpeedMax = 10.0,
                temperatureThreshold = 15.0,
                humidityThreshold = 50.0,
                precipitationThreshold = 10.0,
                windThreshold = 15.0,
                seasonalPatterns = listOf(),
                lifecycleStages = listOf()
            ),
            affectedCrops = listOf("Tomato", "Pepper", "Cabbage", "Lettuce"),
            damageSymptoms = listOf("Curled leaves", "Stunted growth", "Honeydew", "Sooty mold"),
            controlMethods = listOf("Beneficial insects", "Insecticidal soap", "Neem oil"),
            economicThreshold = 10.0
        ),
        PestType(
            name = "Whiteflies",
            scientificName = "Aleyrodidae",
            category = PestCategory.INSECTS,
            description = "Small white insects that feed on plant sap",
            lifecycle = "Egg -> Nymph -> Pupa -> Adult (14-21 days)",
            preferredConditions = PestConditions(
                optimalTemperatureMin = 25.0,
                optimalTemperatureMax = 30.0,
                optimalHumidityMin = 70.0,
                optimalHumidityMax = 90.0,
                optimalPrecipitationMin = 0.0,
                optimalPrecipitationMax = 2.0,
                optimalWindSpeedMax = 5.0,
                temperatureThreshold = 20.0,
                humidityThreshold = 60.0,
                precipitationThreshold = 5.0,
                windThreshold = 10.0,
                seasonalPatterns = listOf(),
                lifecycleStages = listOf()
            ),
            affectedCrops = listOf("Tomato", "Pepper", "Cucumber", "Eggplant"),
            damageSymptoms = listOf("Yellowing leaves", "Sticky honeydew", "Sooty mold", "Virus transmission"),
            controlMethods = listOf("Yellow sticky traps", "Beneficial insects", "Insecticidal soap"),
            economicThreshold = 5.0
        ),
        PestType(
            name = "Spider Mites",
            scientificName = "Tetranychidae",
            category = PestCategory.MITES,
            description = "Tiny arachnids that cause stippling damage",
            lifecycle = "Egg -> Larva -> Nymph -> Adult (5-7 days)",
            preferredConditions = PestConditions(
                optimalTemperatureMin = 30.0,
                optimalTemperatureMax = 35.0,
                optimalHumidityMin = 30.0,
                optimalHumidityMax = 50.0,
                optimalPrecipitationMin = 0.0,
                optimalPrecipitationMax = 1.0,
                optimalWindSpeedMax = 15.0,
                temperatureThreshold = 25.0,
                humidityThreshold = 40.0,
                precipitationThreshold = 2.0,
                windThreshold = 20.0,
                seasonalPatterns = listOf(),
                lifecycleStages = listOf()
            ),
            affectedCrops = listOf("Tomato", "Pepper", "Cucumber", "Bean"),
            damageSymptoms = listOf("Stippling", "Webbing", "Leaf drop", "Bronzing"),
            controlMethods = listOf("Predatory mites", "Insecticidal soap", "Water spray"),
            economicThreshold = 2.0
        )
    )
}
