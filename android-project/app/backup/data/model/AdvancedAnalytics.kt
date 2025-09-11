package com.yourcompany.smartfarm.data.model

import androidx.room.Entity
import androidx.room.PrimaryKey
import kotlinx.serialization.Serializable
import java.time.LocalDateTime

// Advanced Analytics & AI
@Entity(tableName = "yield_predictions")
data class YieldPrediction(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val farmId: Long,
    val fieldId: Long,
    val cropType: String,
    val predictionDate: LocalDateTime,
    val harvestDate: LocalDateTime,
    val predictedYield: Double, // tons/hectare
    val confidence: Double, // 0.0 to 1.0
    val factors: YieldFactors,
    val recommendations: List<String>,
    val isActive: Boolean = true
)

@Entity(tableName = "disease_predictions")
data class DiseasePrediction(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val farmId: Long,
    val fieldId: Long,
    val cropType: String,
    val diseaseType: String,
    val predictionDate: LocalDateTime,
    val riskLevel: RiskLevel,
    val probability: Double, // 0.0 to 1.0
    val factors: DiseaseFactors,
    val recommendations: List<String>,
    val isActive: Boolean = true
)

@Entity(tableName = "market_analysis")
data class MarketAnalysis(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val commodity: String,
    val analysisDate: LocalDateTime,
    val currentPrice: Double,
    val priceTrend: PriceTrend,
    val demandForecast: DemandForecast,
    val supplyForecast: SupplyForecast,
    val recommendations: List<String>,
    val isActive: Boolean = true
)

@Entity(tableName = "yield_factors")
data class YieldFactors(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val weatherScore: Double, // 0.0 to 1.0
    val soilScore: Double, // 0.0 to 1.0
    val managementScore: Double, // 0.0 to 1.0
    val pestScore: Double, // 0.0 to 1.0
    val diseaseScore: Double, // 0.0 to 1.0
    val nutrientScore: Double, // 0.0 to 1.0
    val irrigationScore: Double, // 0.0 to 1.0
    val overallScore: Double, // 0.0 to 1.0
    val isActive: Boolean = true
)

@Entity(tableName = "disease_factors")
data class DiseaseFactors(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val temperature: Double,
    val humidity: Double,
    val precipitation: Double,
    val windSpeed: Double,
    val cropStage: String,
    val fieldHistory: String,
    val nearbyInfestations: Boolean,
    val overallRisk: Double, // 0.0 to 1.0
    val isActive: Boolean = true
)

@Entity(tableName = "price_trend")
data class PriceTrend(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val trend: TrendDirection,
    val changePercent: Double,
    val volatility: Double,
    val supportLevel: Double,
    val resistanceLevel: Double,
    val isActive: Boolean = true
)

@Entity(tableName = "demand_forecast")
data class DemandForecast(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val shortTerm: Double, // 1-3 months
    val mediumTerm: Double, // 3-6 months
    val longTerm: Double, // 6-12 months
    val confidence: Double, // 0.0 to 1.0
    val factors: List<String>,
    val isActive: Boolean = true
)

@Entity(tableName = "supply_forecast")
data class SupplyForecast(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val shortTerm: Double, // 1-3 months
    val mediumTerm: Double, // 3-6 months
    val longTerm: Double, // 6-12 months
    val confidence: Double, // 0.0 to 1.0
    val factors: List<String>,
    val isActive: Boolean = true
)

// Enums
enum class TrendDirection {
    RISING,
    FALLING,
    STABLE,
    VOLATILE
}

// Advanced Analytics Engine
object AdvancedAnalyticsEngine {
    
    fun predictYield(
        fieldData: FieldMap,
        weatherHistory: List<WeatherConditions>,
        cropType: String,
        managementData: List<FieldOperation>
    ): YieldPrediction {
        val factors = analyzeYieldFactors(fieldData, weatherHistory, managementData)
        val predictedYield = calculateYield(factors, cropType)
        val confidence = calculateConfidence(factors)
        
        return YieldPrediction(
            farmId = fieldData.farmId,
            fieldId = fieldData.id,
            cropType = cropType,
            predictionDate = LocalDateTime.now(),
            harvestDate = calculateHarvestDate(cropType),
            predictedYield = predictedYield,
            confidence = confidence,
            factors = factors,
            recommendations = generateYieldRecommendations(factors, predictedYield),
            isActive = true
        )
    }
    
    fun predictDisease(
        fieldData: FieldMap,
        weatherForecast: List<WeatherConditions>,
        cropType: String,
        cropStage: String,
        fieldHistory: List<CropHistory>
    ): DiseasePrediction {
        val factors = analyzeDiseaseFactors(weatherForecast, cropStage, fieldHistory)
        val riskLevel = determineRiskLevel(factors.overallRisk)
        val probability = factors.overallRisk
        
        return DiseasePrediction(
            farmId = fieldData.farmId,
            fieldId = fieldData.id,
            cropType = cropType,
            diseaseType = "Common Diseases",
            predictionDate = LocalDateTime.now(),
            riskLevel = riskLevel,
            probability = probability,
            factors = factors,
            recommendations = generateDiseaseRecommendations(factors, riskLevel),
            isActive = true
        )
    }
    
    fun analyzeMarket(
        commodity: String,
        historicalPrices: List<Double>,
        demandFactors: List<String>,
        supplyFactors: List<String>
    ): MarketAnalysis {
        val currentPrice = historicalPrices.lastOrNull() ?: 0.0
        val priceTrend = analyzePriceTrend(historicalPrices)
        val demandForecast = forecastDemand(demandFactors)
        val supplyForecast = forecastSupply(supplyFactors)
        
        return MarketAnalysis(
            commodity = commodity,
            analysisDate = LocalDateTime.now(),
            currentPrice = currentPrice,
            priceTrend = priceTrend,
            demandForecast = demandForecast,
            supplyForecast = supplyForecast,
            recommendations = generateMarketRecommendations(priceTrend, demandForecast, supplyForecast),
            isActive = true
        )
    }
    
    private fun analyzeYieldFactors(
        fieldData: FieldMap,
        weatherHistory: List<WeatherConditions>,
        managementData: List<FieldOperation>
    ): YieldFactors {
        val weatherScore = calculateWeatherScore(weatherHistory)
        val soilScore = calculateSoilScore(fieldData.soilZones)
        val managementScore = calculateManagementScore(managementData)
        val pestScore = 0.8 // Default - would be calculated from pest data
        val diseaseScore = 0.8 // Default - would be calculated from disease data
        val nutrientScore = calculateNutrientScore(fieldData.soilZones)
        val irrigationScore = calculateIrrigationScore(fieldData.irrigationZones)
        
        val overallScore = (weatherScore + soilScore + managementScore + pestScore + 
                           diseaseScore + nutrientScore + irrigationScore) / 7.0
        
        return YieldFactors(
            weatherScore = weatherScore,
            soilScore = soilScore,
            managementScore = managementScore,
            pestScore = pestScore,
            diseaseScore = diseaseScore,
            nutrientScore = nutrientScore,
            irrigationScore = irrigationScore,
            overallScore = overallScore,
            isActive = true
        )
    }
    
    private fun calculateWeatherScore(weatherHistory: List<WeatherConditions>): Double {
        var score = 0.5 // Base score
        
        val avgTemp = weatherHistory.map { it.temperature }.average()
        val totalPrecipitation = weatherHistory.map { it.precipitation }.sum()
        val avgHumidity = weatherHistory.map { it.humidity }.average()
        
        // Temperature scoring (optimal range 20-25°C)
        when {
            avgTemp in 20.0..25.0 -> score += 0.3
            avgTemp in 15.0..30.0 -> score += 0.1
            else -> score -= 0.2
        }
        
        // Precipitation scoring
        when {
            totalPrecipitation in 100.0..300.0 -> score += 0.2
            totalPrecipitation > 400.0 -> score -= 0.1
            totalPrecipitation < 50.0 -> score -= 0.2
        }
        
        // Humidity scoring
        when {
            avgHumidity in 60.0..80.0 -> score += 0.1
            avgHumidity > 90.0 -> score -= 0.1
            avgHumidity < 40.0 -> score -= 0.1
        }
        
        return maxOf(0.0, minOf(1.0, score))
    }
    
    private fun calculateSoilScore(soilZones: List<SoilZone>): Double {
        if (soilZones.isEmpty()) return 0.5
        
        val avgPh = soilZones.map { it.phLevel }.average()
        val avgOrganicMatter = soilZones.map { it.organicMatter }.average()
        val avgNutrients = soilZones.map { 
            (it.nutrientLevels.nitrogen + it.nutrientLevels.phosphorus + it.nutrientLevels.potassium) / 3.0
        }.average()
        
        var score = 0.5
        
        // pH scoring (optimal range 6.0-7.0)
        when {
            avgPh in 6.0..7.0 -> score += 0.3
            avgPh in 5.5..7.5 -> score += 0.1
            else -> score -= 0.2
        }
        
        // Organic matter scoring
        when {
            avgOrganicMatter > 3.0 -> score += 0.2
            avgOrganicMatter > 2.0 -> score += 0.1
            avgOrganicMatter < 1.0 -> score -= 0.1
        }
        
        // Nutrient scoring
        when {
            avgNutrients > 100.0 -> score += 0.1
            avgNutrients < 50.0 -> score -= 0.1
        }
        
        return maxOf(0.0, minOf(1.0, score))
    }
    
    private fun calculateManagementScore(managementData: List<FieldOperation>): Double {
        if (managementData.isEmpty()) return 0.5
        
        val avgEfficiency = managementData.map { it.efficiency }.average()
        val avgQuality = managementData.map { it.quality.overallScore }.average()
        
        return (avgEfficiency + avgQuality) / 2.0
    }
    
    private fun calculateNutrientScore(soilZones: List<SoilZone>): Double {
        if (soilZones.isEmpty()) return 0.5
        
        val avgNutrients = soilZones.map { zone ->
            val nutrients = zone.nutrientLevels
            (nutrients.nitrogen + nutrients.phosphorus + nutrients.potassium) / 3.0
        }.average()
        
        return when {
            avgNutrients > 150.0 -> 1.0
            avgNutrients > 100.0 -> 0.8
            avgNutrients > 50.0 -> 0.6
            else -> 0.4
        }
    }
    
    private fun calculateIrrigationScore(irrigationZones: List<IrrigationZone>): Double {
        if (irrigationZones.isEmpty()) return 0.5
        
        val avgEfficiency = irrigationZones.map { it.efficiency }.average()
        return avgEfficiency
    }
    
    private fun calculateYield(factors: YieldFactors, cropType: String): Double {
        val baseYield = getBaseYield(cropType)
        return baseYield * factors.overallScore
    }
    
    private fun getBaseYield(cropType: String): Double {
        return when (cropType) {
            "Tomato" -> 50.0
            "Corn" -> 8.0
            "Wheat" -> 3.0
            "Rice" -> 4.0
            "Soybean" -> 2.5
            else -> 3.0
        }
    }
    
    private fun calculateConfidence(factors: YieldFactors): Double {
        // Higher confidence when factors are more consistent
        val variance = calculateVariance(listOf(
            factors.weatherScore,
            factors.soilScore,
            factors.managementScore,
            factors.pestScore,
            factors.diseaseScore,
            factors.nutrientScore,
            factors.irrigationScore
        ))
        
        return maxOf(0.5, 1.0 - variance)
    }
    
    private fun calculateVariance(values: List<Double>): Double {
        val mean = values.average()
        val variance = values.map { (it - mean) * (it - mean) }.average()
        return variance
    }
    
    private fun calculateHarvestDate(cropType: String): LocalDateTime {
        val now = LocalDateTime.now()
        return when (cropType) {
            "Tomato" -> now.plusDays(90)
            "Corn" -> now.plusDays(120)
            "Wheat" -> now.plusDays(150)
            "Rice" -> now.plusDays(120)
            "Soybean" -> now.plusDays(100)
            else -> now.plusDays(100)
        }
    }
    
    private fun generateYieldRecommendations(factors: YieldFactors, predictedYield: Double): List<String> {
        val recommendations = mutableListOf<String>()
        
        if (factors.weatherScore < 0.6) {
            recommendations.add("Monitor weather conditions closely")
        }
        
        if (factors.soilScore < 0.6) {
            recommendations.add("Improve soil health with organic matter")
        }
        
        if (factors.nutrientScore < 0.6) {
            recommendations.add("Apply balanced fertilizer")
        }
        
        if (factors.irrigationScore < 0.6) {
            recommendations.add("Optimize irrigation schedule")
        }
        
        if (predictedYield < getBaseYield("Tomato") * 0.8) {
            recommendations.add("Consider additional inputs to improve yield")
        }
        
        return recommendations
    }
    
    private fun analyzeDiseaseFactors(
        weatherForecast: List<WeatherConditions>,
        cropStage: String,
        fieldHistory: List<CropHistory>
    ): DiseaseFactors {
        val avgTemp = weatherForecast.map { it.temperature }.average()
        val avgHumidity = weatherForecast.map { it.humidity }.average()
        val totalPrecipitation = weatherForecast.map { it.precipitation }.sum()
        val avgWindSpeed = weatherForecast.map { it.windSpeed }.average()
        
        val overallRisk = calculateDiseaseRisk(avgTemp, avgHumidity, totalPrecipitation, avgWindSpeed, cropStage)
        
        return DiseaseFactors(
            temperature = avgTemp,
            humidity = avgHumidity,
            precipitation = totalPrecipitation,
            windSpeed = avgWindSpeed,
            cropStage = cropStage,
            fieldHistory = "Previous crops",
            nearbyInfestations = false,
            overallRisk = overallRisk,
            isActive = true
        )
    }
    
    private fun calculateDiseaseRisk(
        temperature: Double,
        humidity: Double,
        precipitation: Double,
        windSpeed: Double,
        cropStage: String
    ): Double {
        var risk = 0.0
        
        // Temperature risk
        when {
            temperature in 20.0..30.0 -> risk += 0.3
            temperature in 15.0..35.0 -> risk += 0.1
            else -> risk += 0.0
        }
        
        // Humidity risk
        when {
            humidity > 80.0 -> risk += 0.3
            humidity > 60.0 -> risk += 0.1
            else -> risk += 0.0
        }
        
        // Precipitation risk
        when {
            precipitation > 10.0 -> risk += 0.2
            precipitation > 5.0 -> risk += 0.1
            else -> risk += 0.0
        }
        
        // Wind risk (low wind increases risk)
        when {
            windSpeed < 5.0 -> risk += 0.1
            windSpeed < 10.0 -> risk += 0.05
            else -> risk += 0.0
        }
        
        // Crop stage risk
        when (cropStage) {
            "Flowering" -> risk += 0.1
            "Fruiting" -> risk += 0.1
            else -> risk += 0.0
        }
        
        return minOf(1.0, risk)
    }
    
    private fun determineRiskLevel(risk: Double): RiskLevel {
        return when {
            risk >= 0.8 -> RiskLevel.CRITICAL
            risk >= 0.6 -> RiskLevel.HIGH
            risk >= 0.4 -> RiskLevel.MODERATE
            else -> RiskLevel.LOW
        }
    }
    
    private fun generateDiseaseRecommendations(factors: DiseaseFactors, riskLevel: RiskLevel): List<String> {
        val recommendations = mutableListOf<String>()
        
        when (riskLevel) {
            RiskLevel.CRITICAL -> {
                recommendations.add("Immediate fungicide application required")
                recommendations.add("Increase field monitoring")
                recommendations.add("Consider crop protection measures")
            }
            RiskLevel.HIGH -> {
                recommendations.add("Prepare for fungicide application")
                recommendations.add("Monitor field conditions daily")
                recommendations.add("Check for disease symptoms")
            }
            RiskLevel.MODERATE -> {
                recommendations.add("Monitor field conditions")
                recommendations.add("Prepare prevention measures")
            }
            RiskLevel.LOW -> {
                recommendations.add("Continue regular monitoring")
                recommendations.add("Maintain good field hygiene")
            }
        }
        
        return recommendations
    }
    
    private fun analyzePriceTrend(historicalPrices: List<Double>): PriceTrend {
        if (historicalPrices.size < 2) {
            return PriceTrend(
                trend = TrendDirection.STABLE,
                changePercent = 0.0,
                volatility = 0.0,
                supportLevel = historicalPrices.firstOrNull() ?: 0.0,
                resistanceLevel = historicalPrices.firstOrNull() ?: 0.0,
                isActive = true
            )
        }
        
        val recentPrices = historicalPrices.takeLast(30)
        val olderPrices = historicalPrices.dropLast(30)
        
        val recentAvg = recentPrices.average()
        val olderAvg = olderPrices.average()
        
        val changePercent = ((recentAvg - olderAvg) / olderAvg) * 100
        val volatility = calculateVolatility(recentPrices)
        
        val trend = when {
            changePercent > 5.0 -> TrendDirection.RISING
            changePercent < -5.0 -> TrendDirection.FALLING
            volatility > 10.0 -> TrendDirection.VOLATILE
            else -> TrendDirection.STABLE
        }
        
        return PriceTrend(
            trend = trend,
            changePercent = changePercent,
            volatility = volatility,
            supportLevel = recentPrices.minOrNull() ?: 0.0,
            resistanceLevel = recentPrices.maxOrNull() ?: 0.0,
            isActive = true
        )
    }
    
    private fun calculateVolatility(prices: List<Double>): Double {
        if (prices.size < 2) return 0.0
        
        val returns = prices.zipWithNext { a, b -> (b - a) / a }
        val mean = returns.average()
        val variance = returns.map { (it - mean) * (it - mean) }.average()
        
        return Math.sqrt(variance) * 100
    }
    
    private fun forecastDemand(demandFactors: List<String>): DemandForecast {
        // Simplified demand forecasting
        val baseDemand = 100.0
        var multiplier = 1.0
        
        demandFactors.forEach { factor ->
            when (factor) {
                "Population Growth" -> multiplier += 0.1
                "Economic Growth" -> multiplier += 0.05
                "Health Trends" -> multiplier += 0.05
                "Seasonal Demand" -> multiplier += 0.1
                "Export Demand" -> multiplier += 0.05
            }
        }
        
        return DemandForecast(
            shortTerm = baseDemand * multiplier,
            mediumTerm = baseDemand * multiplier * 1.05,
            longTerm = baseDemand * multiplier * 1.1,
            confidence = 0.7,
            factors = demandFactors,
            isActive = true
        )
    }
    
    private fun forecastSupply(supplyFactors: List<String>): SupplyForecast {
        // Simplified supply forecasting
        val baseSupply = 100.0
        var multiplier = 1.0
        
        supplyFactors.forEach { factor ->
            when (factor) {
                "Weather Conditions" -> multiplier += 0.1
                "Technology Adoption" -> multiplier += 0.05
                "Input Costs" -> multiplier -= 0.05
                "Government Policies" -> multiplier += 0.05
                "Trade Policies" -> multiplier += 0.05
            }
        }
        
        return SupplyForecast(
            shortTerm = baseSupply * multiplier,
            mediumTerm = baseSupply * multiplier * 1.03,
            longTerm = baseSupply * multiplier * 1.05,
            confidence = 0.6,
            factors = supplyFactors,
            isActive = true
        )
    }
    
    private fun generateMarketRecommendations(
        priceTrend: PriceTrend,
        demandForecast: DemandForecast,
        supplyForecast: SupplyForecast
    ): List<String> {
        val recommendations = mutableListOf<String>()
        
        when (priceTrend.trend) {
            TrendDirection.RISING -> {
                recommendations.add("Consider selling at current prices")
                recommendations.add("Monitor for price peaks")
            }
            TrendDirection.FALLING -> {
                recommendations.add("Consider holding inventory")
                recommendations.add("Look for buying opportunities")
            }
            TrendDirection.VOLATILE -> {
                recommendations.add("Use hedging strategies")
                recommendations.add("Monitor market closely")
            }
            TrendDirection.STABLE -> {
                recommendations.add("Maintain current strategy")
                recommendations.add("Monitor for trend changes")
            }
        }
        
        if (demandForecast.shortTerm > supplyForecast.shortTerm) {
            recommendations.add("Demand exceeds supply - favorable pricing")
        } else {
            recommendations.add("Supply exceeds demand - competitive pricing")
        }
        
        return recommendations
    }
}
