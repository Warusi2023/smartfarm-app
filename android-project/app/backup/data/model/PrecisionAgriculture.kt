package com.yourcompany.smartfarm.data.model

import androidx.room.Entity
import androidx.room.PrimaryKey
import kotlinx.serialization.Serializable
import java.time.LocalDateTime

// Precision Agriculture Tools
@Entity(tableName = "drone_flights")
data class DroneFlight(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val farmId: Long,
    val flightDate: LocalDateTime,
    val flightDuration: Int, // minutes
    val areaCovered: Double, // hectares
    val flightType: FlightType,
    val missionType: MissionType,
    val droneModel: String,
    val pilotId: Long,
    val weatherConditions: WeatherConditions,
    val flightPath: List<GPSPoint>,
    val imagesCaptured: Int,
    val dataCollected: List<SensorData>,
    val analysisResults: List<AnalysisResult>,
    val recommendations: List<String>,
    val cost: Double,
    val isActive: Boolean = true,
    val createdAt: LocalDateTime = LocalDateTime.now()
)

@Entity(tableName = "gps_points")
data class GPSPoint(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val latitude: Double,
    val longitude: Double,
    val altitude: Double,
    val accuracy: Double, // meters
    val timestamp: LocalDateTime,
    val pointType: PointType,
    val metadata: Map<String, String>,
    val isActive: Boolean = true
)

@Entity(tableName = "field_maps")
data class FieldMap(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val farmId: Long,
    val fieldName: String,
    val fieldType: FieldType,
    val area: Double, // hectares
    val boundaries: List<GPSPoint>,
    val soilZones: List<SoilZone>,
    val elevationMap: List<ElevationPoint>,
    val drainageMap: List<DrainagePoint>,
    val irrigationZones: List<IrrigationZone>,
    val cropHistory: List<CropHistory>,
    val productivityZones: List<ProductivityZone>,
    val isActive: Boolean = true,
    val createdAt: LocalDateTime = LocalDateTime.now()
)

@Entity(tableName = "soil_zones")
data class SoilZone(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val zoneName: String,
    val soilType: SoilType,
    val phLevel: Double,
    val organicMatter: Double,
    val nutrientLevels: NutrientLevels,
    val waterHoldingCapacity: Double,
    val drainage: DrainageType,
    val boundaries: List<GPSPoint>,
    val recommendations: List<String>,
    val isActive: Boolean = true
)

@Entity(tableName = "elevation_points")
data class ElevationPoint(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val latitude: Double,
    val longitude: Double,
    val elevation: Double, // meters above sea level
    val slope: Double, // degrees
    val aspect: Double, // degrees (0-360)
    val isActive: Boolean = true
)

@Entity(tableName = "drainage_points")
data class DrainagePoint(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val latitude: Double,
    val longitude: Double,
    val drainageType: DrainageType,
    val waterLevel: Double, // meters below surface
    val drainageRate: Double, // mm/hour
    val isActive: Boolean = true
)

@Entity(tableName = "irrigation_zones")
data class IrrigationZone(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val zoneName: String,
    val zoneType: IrrigationZoneType,
    val area: Double, // hectares
    val waterRequirement: Double, // mm/day
    val irrigationMethod: IrrigationMethod,
    val equipment: List<IrrigationEquipment>,
    val schedule: IrrigationSchedule,
    val efficiency: Double, // 0.0 to 1.0
    val boundaries: List<GPSPoint>,
    val isActive: Boolean = true
)

@Entity(tableName = "crop_history")
data class CropHistory(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val fieldId: Long,
    val cropType: String,
    val plantingDate: LocalDateTime,
    val harvestDate: LocalDateTime,
    val yield: Double, // tons/hectare
    val quality: QualityGrade,
    val inputs: List<InputRecord>,
    val weather: WeatherSummary,
    val pests: List<PestRecord>,
    val diseases: List<DiseaseRecord>,
    val isActive: Boolean = true
)

@Entity(tableName = "productivity_zones")
data class ProductivityZone(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val zoneName: String,
    val productivityLevel: ProductivityLevel,
    val averageYield: Double, // tons/hectare
    val yieldVariability: Double, // coefficient of variation
    val limitingFactors: List<String>,
    val improvementRecommendations: List<String>,
    val boundaries: List<GPSPoint>,
    val isActive: Boolean = true
)

@Entity(tableName = "sensor_data")
data class SensorData(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val sensorId: Long,
    val sensorType: SensorType,
    val location: GPSPoint,
    val timestamp: LocalDateTime,
    val measurements: Map<String, Double>,
    val quality: DataQuality,
    val calibration: CalibrationInfo,
    val isActive: Boolean = true
)

@Entity(tableName = "analysis_results")
data class AnalysisResult(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val analysisType: AnalysisType,
    val inputData: List<SensorData>,
    val algorithm: String,
    val parameters: Map<String, Double>,
    val results: Map<String, Double>,
    val confidence: Double, // 0.0 to 1.0
    val recommendations: List<String>,
    val isActive: Boolean = true
)

@Entity(tableName = "irrigation_equipment")
data class IrrigationEquipment(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val equipmentType: EquipmentType,
    val model: String,
    val manufacturer: String,
    val capacity: Double, // liters/minute
    val efficiency: Double, // 0.0 to 1.0
    val maintenanceSchedule: MaintenanceSchedule,
    val location: GPSPoint,
    val isActive: Boolean = true
)

@Entity(tableName = "irrigation_schedule")
data class IrrigationSchedule(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val scheduleType: ScheduleType,
    val startTime: LocalDateTime,
    val duration: Int, // minutes
    val frequency: Frequency,
    val waterAmount: Double, // mm
    val conditions: List<IrrigationCondition>,
    val isActive: Boolean = true
)

@Entity(tableName = "irrigation_condition")
data class IrrigationCondition(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val conditionType: ConditionType,
    val threshold: Double,
    val operator: Operator,
    val isActive: Boolean = true
)

@Entity(table_name = "nutrient_levels")
data class NutrientLevels(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val nitrogen: Double, // ppm
    val phosphorus: Double, // ppm
    val potassium: Double, // ppm
    val calcium: Double, // ppm
    val magnesium: Double, // ppm
    val sulfur: Double, // ppm
    val iron: Double, // ppm
    val zinc: Double, // ppm
    val manganese: Double, // ppm
    val copper: Double, // ppm
    val boron: Double, // ppm
    val molybdenum: Double, // ppm
    val isActive: Boolean = true
)

@Entity(table_name = "input_record")
data class InputRecord(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val inputType: InputType,
    val productName: String,
    val applicationDate: LocalDateTime,
    val applicationRate: Double,
    val applicationMethod: String,
    val cost: Double,
    val effectiveness: Double, // 0.0 to 1.0
    val isActive: Boolean = true
)

@Entity(table_name = "weather_summary")
data class WeatherSummary(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val averageTemperature: Double,
    val totalPrecipitation: Double,
    val averageHumidity: Double,
    val averageWindSpeed: Double,
    val extremeEvents: List<WeatherEvent>,
    val isActive: Boolean = true
)

@Entity(table_name = "pest_record")
data class PestRecord(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val pestType: String,
    val severity: Severity,
    val treatment: String,
    val effectiveness: Double, // 0.0 to 1.0
    val cost: Double,
    val isActive: Boolean = true
)

@Entity(table_name = "disease_record")
data class DiseaseRecord(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val diseaseType: String,
    val severity: Severity,
    val treatment: String,
    val effectiveness: Double, // 0.0 to 1.0
    val cost: Double,
    val isActive: Boolean = true
)

@Entity(table_name = "calibration_info")
data class CalibrationInfo(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val calibrationDate: LocalDateTime,
    val calibrationMethod: String,
    val accuracy: Double,
    val drift: Double,
    val nextCalibration: LocalDateTime,
    val isActive: Boolean = true
)

@Entity(table_name = "maintenance_schedule")
data class MaintenanceSchedule(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val scheduleType: MaintenanceType,
    val frequency: Frequency,
    val lastMaintenance: LocalDateTime,
    val nextMaintenance: LocalDateTime,
    val maintenanceTasks: List<String>,
    val cost: Double,
    val isActive: Boolean = true
)

// Enums
enum class FlightType {
    MAPPING,
    SPRAYING,
    SEEDING,
    MONITORING,
    INSPECTION
}

enum class MissionType {
    FIELD_MAPPING,
    CROP_MONITORING,
    PEST_DETECTION,
    DISEASE_DETECTION,
    NUTRIENT_ANALYSIS,
    YIELD_ESTIMATION,
    SPRAYING,
    SEEDING
}

enum class PointType {
    BOUNDARY,
    WAYPOINT,
    SAMPLING,
    EQUIPMENT,
    OBSTACLE,
    REFERENCE
}

enum class FieldType {
    CROP_FIELD,
    PASTURE,
    ORCHARD,
    VINEYARD,
    GREENHOUSE,
    NURSERY
}

enum class SoilType {
    CLAY,
    SAND,
    SILT,
    LOAM,
    PEAT,
    CHALK,
    CLAY_LOAM,
    SANDY_LOAM,
    SILTY_LOAM
}

enum class DrainageType {
    EXCELLENT,
    GOOD,
    MODERATE,
    POOR,
    VERY_POOR
}

enum class IrrigationZoneType {
    HIGH_WATER_NEED,
    MODERATE_WATER_NEED,
    LOW_WATER_NEED,
    DRY_ZONE,
    WET_ZONE
}

enum class IrrigationMethod {
    DRIP,
    SPRINKLER,
    FLOOD,
    FURROW,
    CENTER_PIVOT,
    LATERAL_MOVE,
    MICRO_SPRAY
}

enum class QualityGrade {
    PREMIUM,
    STANDARD,
    COMMERCIAL,
    FEED,
    REJECT
}

enum class ProductivityLevel {
    VERY_HIGH,
    HIGH,
    MODERATE,
    LOW,
    VERY_LOW
}

enum class SensorType {
    SOIL_MOISTURE,
    SOIL_TEMPERATURE,
    SOIL_PH,
    SOIL_NUTRIENTS,
    WEATHER_STATION,
    CROP_HEIGHT,
    CROP_HEALTH,
    PEST_DETECTION,
    DISEASE_DETECTION
}

enum class AnalysisType {
    NDVI,
    CROP_HEALTH,
    YIELD_ESTIMATION,
    NUTRIENT_ANALYSIS,
    PEST_DETECTION,
    DISEASE_DETECTION,
    SOIL_ANALYSIS,
    WATER_STRESS
}

enum class DataQuality {
    EXCELLENT,
    GOOD,
    FAIR,
    POOR,
    INVALID
}

enum class EquipmentType {
    PUMP,
    VALVE,
    FILTER,
    EMITTER,
    SPRINKLER,
    CONTROLLER,
    SENSOR
}

enum class ScheduleType {
    MANUAL,
    AUTOMATIC,
    WEATHER_BASED,
    SOIL_MOISTURE_BASED,
    TIME_BASED
}

enum class Frequency {
    DAILY,
    WEEKLY,
    MONTHLY,
    SEASONAL,
    AS_NEEDED
}

enum class ConditionType {
    SOIL_MOISTURE,
    WEATHER,
    CROP_STAGE,
    TIME,
    MANUAL
}

enum class Operator {
    GREATER_THAN,
    LESS_THAN,
    EQUALS,
    GREATER_THAN_OR_EQUAL,
    LESS_THAN_OR_EQUAL
}

enum class InputType {
    FERTILIZER,
    PESTICIDE,
    HERBICIDE,
    FUNGICIDE,
    SEED,
    WATER,
    LABOR,
    EQUIPMENT
}

enum class Severity {
    MINOR,
    MODERATE,
    SEVERE,
    CRITICAL
}

enum class MaintenanceType {
    PREVENTIVE,
    CORRECTIVE,
    EMERGENCY,
    ROUTINE
}

// Precision Agriculture Engine
object PrecisionAgricultureEngine {
    
    fun generateFieldMap(
        gpsPoints: List<GPSPoint>,
        soilData: List<SensorData>,
        elevationData: List<ElevationPoint>
    ): FieldMap {
        val boundaries = gpsPoints.filter { it.pointType == PointType.BOUNDARY }
        val soilZones = analyzeSoilZones(soilData)
        val productivityZones = analyzeProductivityZones(soilData, elevationData)
        val irrigationZones = generateIrrigationZones(soilData, elevationData)
        
        return FieldMap(
            farmId = 0L, // Will be set by caller
            fieldName = "Field ${System.currentTimeMillis()}",
            fieldType = FieldType.CROP_FIELD,
            area = calculateArea(boundaries),
            boundaries = boundaries,
            soilZones = soilZones,
            elevationMap = elevationData,
            drainageMap = analyzeDrainage(elevationData),
            irrigationZones = irrigationZones,
            cropHistory = listOf(),
            productivityZones = productivityZones
        )
    }
    
    fun generateIrrigationSchedule(
        fieldMap: FieldMap,
        weatherForecast: List<WeatherConditions>,
        cropType: String,
        growthStage: String
    ): IrrigationSchedule {
        val waterRequirement = calculateWaterRequirement(cropType, growthStage, weatherForecast)
        val soilMoisture = getCurrentSoilMoisture(fieldMap)
        val irrigationAmount = calculateIrrigationAmount(waterRequirement, soilMoisture)
        
        return IrrigationSchedule(
            scheduleType = ScheduleType.WEATHER_BASED,
            startTime = determineOptimalIrrigationTime(weatherForecast),
            duration = calculateIrrigationDuration(irrigationAmount, fieldMap.irrigationZones),
            frequency = determineIrrigationFrequency(cropType, growthStage),
            waterAmount = irrigationAmount,
            conditions = generateIrrigationConditions(soilMoisture, weatherForecast)
        )
    }
    
    fun analyzeCropHealth(
        droneImages: List<SensorData>,
        weatherData: List<WeatherConditions>,
        cropType: String
    ): List<AnalysisResult> {
        val results = mutableListOf<AnalysisResult>()
        
        // NDVI Analysis
        val ndviResult = calculateNDVI(droneImages)
        results.add(ndviResult)
        
        // Crop Health Analysis
        val healthResult = analyzeCropHealth(droneImages, weatherData, cropType)
        results.add(healthResult)
        
        // Yield Estimation
        val yieldResult = estimateYield(ndviResult, healthResult, cropType)
        results.add(yieldResult)
        
        return results
    }
    
    private fun analyzeSoilZones(soilData: List<SensorData>): List<SoilZone> {
        // Group soil data by location and analyze zones
        val zones = mutableListOf<SoilZone>()
        
        // Simple clustering based on soil properties
        val groupedData = soilData.groupBy { 
            "${it.location.latitude.toInt()}_${it.location.longitude.toInt()}"
        }
        
        groupedData.forEach { (key, data) ->
            val avgPh = data.mapNotNull { it.measurements["ph"] }.average()
            val avgMoisture = data.mapNotNull { it.measurements["moisture"] }.average()
            val avgNutrients = calculateAverageNutrients(data)
            
            zones.add(SoilZone(
                zoneName = "Zone $key",
                soilType = determineSoilType(avgPh, avgMoisture),
                phLevel = avgPh,
                organicMatter = data.mapNotNull { it.measurements["organic_matter"] }.average(),
                nutrientLevels = avgNutrients,
                waterHoldingCapacity = calculateWaterHoldingCapacity(avgPh, avgMoisture),
                drainage = determineDrainage(avgMoisture),
                boundaries = listOf(),
                recommendations = generateSoilRecommendations(avgPh, avgNutrients)
            ))
        }
        
        return zones
    }
    
    private fun analyzeProductivityZones(
        soilData: List<SensorData>,
        elevationData: List<ElevationPoint>
    ): List<ProductivityZone> {
        val zones = mutableListOf<ProductivityZone>()
        
        // Analyze productivity based on soil quality and elevation
        val productivityScores = calculateProductivityScores(soilData, elevationData)
        
        productivityScores.forEach { (location, score) ->
            val level = determineProductivityLevel(score)
            zones.add(ProductivityZone(
                zoneName = "Productivity Zone ${location}",
                productivityLevel = level,
                averageYield = estimateYieldFromScore(score),
                yieldVariability = calculateYieldVariability(score),
                limitingFactors = identifyLimitingFactors(score),
                improvementRecommendations = generateImprovementRecommendations(score),
                boundaries = listOf(),
                isActive = true
            ))
        }
        
        return zones
    }
    
    private fun generateIrrigationZones(
        soilData: List<SensorData>,
        elevationData: List<ElevationPoint>
    ): List<IrrigationZone> {
        val zones = mutableListOf<IrrigationZone>()
        
        // Create irrigation zones based on soil moisture and elevation
        val irrigationNeeds = calculateIrrigationNeeds(soilData, elevationData)
        
        irrigationNeeds.forEach { (location, need) ->
            zones.add(IrrigationZone(
                zoneName = "Irrigation Zone ${location}",
                zoneType = determineIrrigationZoneType(need),
                area = calculateZoneArea(location),
                waterRequirement = need,
                irrigationMethod = determineIrrigationMethod(need),
                equipment = listOf(),
                schedule = IrrigationSchedule(
                    scheduleType = ScheduleType.AUTOMATIC,
                    startTime = LocalDateTime.now(),
                    duration = 60,
                    frequency = Frequency.DAILY,
                    waterAmount = need,
                    conditions = listOf(),
                    isActive = true
                ),
                efficiency = 0.8,
                boundaries = listOf(),
                isActive = true
            ))
        }
        
        return zones
    }
    
    private fun calculateArea(boundaries: List<GPSPoint>): Double {
        // Simple area calculation using shoelace formula
        if (boundaries.size < 3) return 0.0
        
        var area = 0.0
        for (i in boundaries.indices) {
            val j = (i + 1) % boundaries.size
            area += boundaries[i].latitude * boundaries[j].longitude
            area -= boundaries[j].latitude * boundaries[i].longitude
        }
        
        return Math.abs(area) / 2.0 * 111000 * 111000 / 10000 // Convert to hectares
    }
    
    private fun calculateWaterRequirement(
        cropType: String,
        growthStage: String,
        weatherForecast: List<WeatherConditions>
    ): Double {
        val baseRequirement = getCropWaterRequirement(cropType, growthStage)
        val weatherAdjustment = calculateWeatherAdjustment(weatherForecast)
        return baseRequirement * weatherAdjustment
    }
    
    private fun getCropWaterRequirement(cropType: String, growthStage: String): Double {
        val requirements = mapOf(
            "Tomato" to mapOf(
                "Seedling" to 2.0,
                "Vegetative" to 4.0,
                "Flowering" to 6.0,
                "Fruiting" to 8.0,
                "Maturity" to 4.0
            ),
            "Corn" to mapOf(
                "Seedling" to 1.5,
                "Vegetative" to 3.0,
                "Tasseling" to 5.0,
                "Silking" to 7.0,
                "Maturity" to 3.0
            ),
            "Wheat" to mapOf(
                "Seedling" to 1.0,
                "Tillering" to 2.0,
                "Heading" to 3.0,
                "Grain Fill" to 4.0,
                "Maturity" to 1.0
            )
        )
        
        return requirements[cropType]?.get(growthStage) ?: 3.0
    }
    
    private fun calculateWeatherAdjustment(weatherForecast: List<WeatherConditions>): Double {
        val avgTemp = weatherForecast.map { it.temperature }.average()
        val avgHumidity = weatherForecast.map { it.humidity }.average()
        val totalPrecipitation = weatherForecast.map { it.precipitation }.sum()
        
        var adjustment = 1.0
        
        // Temperature adjustment
        if (avgTemp > 30) adjustment += 0.2
        if (avgTemp < 15) adjustment -= 0.1
        
        // Humidity adjustment
        if (avgHumidity < 40) adjustment += 0.1
        if (avgHumidity > 80) adjustment -= 0.1
        
        // Precipitation adjustment
        if (totalPrecipitation > 10) adjustment -= 0.3
        if (totalPrecipitation < 1) adjustment += 0.2
        
        return maxOf(0.1, minOf(2.0, adjustment))
    }
    
    private fun calculateNDVI(droneImages: List<SensorData>): AnalysisResult {
        // Simplified NDVI calculation
        val ndviValues = droneImages.mapNotNull { it.measurements["ndvi"] }
        val avgNDVI = ndviValues.average()
        
        return AnalysisResult(
            analysisType = AnalysisType.NDVI,
            inputData = droneImages,
            algorithm = "NDVI Calculation",
            parameters = mapOf("threshold" to 0.5),
            results = mapOf(
                "average_ndvi" to avgNDVI,
                "vegetation_health" to (avgNDVI * 100),
                "coverage_percentage" to (avgNDVI * 100)
            ),
            confidence = 0.85,
            recommendations = generateNDVIRecommendations(avgNDVI),
            isActive = true
        )
    }
    
    private fun generateNDVIRecommendations(ndvi: Double): List<String> {
        return when {
            ndvi > 0.7 -> listOf("Excellent crop health", "Continue current practices")
            ndvi > 0.5 -> listOf("Good crop health", "Monitor for any changes")
            ndvi > 0.3 -> listOf("Moderate crop health", "Check for nutrient deficiencies")
            else -> listOf("Poor crop health", "Immediate attention required", "Check for pests/diseases")
        }
    }
    
    private fun analyzeCropHealth(
        droneImages: List<SensorData>,
        weatherData: List<WeatherConditions>,
        cropType: String
    ): AnalysisResult {
        // Analyze crop health based on multiple factors
        val healthScore = calculateHealthScore(droneImages, weatherData, cropType)
        
        return AnalysisResult(
            analysisType = AnalysisType.CROP_HEALTH,
            inputData = droneImages,
            algorithm = "Multi-factor Health Analysis",
            parameters = mapOf("crop_type" to cropType.toDouble()),
            results = mapOf(
                "health_score" to healthScore,
                "stress_level" to (1.0 - healthScore),
                "recommended_action" to healthScore
            ),
            confidence = 0.8,
            recommendations = generateHealthRecommendations(healthScore),
            isActive = true
        )
    }
    
    private fun calculateHealthScore(
        droneImages: List<SensorData>,
        weatherData: List<WeatherConditions>,
        cropType: String
    ): Double {
        var score = 0.5 // Base score
        
        // NDVI contribution
        val avgNDVI = droneImages.mapNotNull { it.measurements["ndvi"] }.average()
        score += avgNDVI * 0.3
        
        // Weather contribution
        val weatherScore = calculateWeatherHealthScore(weatherData)
        score += weatherScore * 0.2
        
        return maxOf(0.0, minOf(1.0, score))
    }
    
    private fun calculateWeatherHealthScore(weatherData: List<WeatherConditions>): Double {
        val avgTemp = weatherData.map { it.temperature }.average()
        val avgHumidity = weatherData.map { it.humidity }.average()
        val totalPrecipitation = weatherData.map { it.precipitation }.sum()
        
        var score = 0.5
        
        // Temperature scoring (optimal range 20-25°C)
        when {
            avgTemp in 20.0..25.0 -> score += 0.3
            avgTemp in 15.0..30.0 -> score += 0.1
            else -> score -= 0.2
        }
        
        // Humidity scoring (optimal range 60-80%)
        when {
            avgHumidity in 60.0..80.0 -> score += 0.2
            avgHumidity in 40.0..90.0 -> score += 0.1
            else -> score -= 0.1
        }
        
        // Precipitation scoring
        when {
            totalPrecipitation in 5.0..15.0 -> score += 0.1
            totalPrecipitation > 20.0 -> score -= 0.2
            totalPrecipitation < 2.0 -> score -= 0.1
        }
        
        return maxOf(0.0, minOf(1.0, score))
    }
    
    private fun generateHealthRecommendations(healthScore: Double): List<String> {
        return when {
            healthScore > 0.8 -> listOf("Excellent crop health", "Continue current practices")
            healthScore > 0.6 -> listOf("Good crop health", "Monitor regularly")
            healthScore > 0.4 -> listOf("Moderate health concerns", "Check for issues")
            else -> listOf("Poor crop health", "Immediate attention required")
        }
    }
    
    private fun estimateYield(
        ndviResult: AnalysisResult,
        healthResult: AnalysisResult,
        cropType: String
    ): AnalysisResult {
        val ndvi = ndviResult.results["average_ndvi"] ?: 0.0
        val healthScore = healthResult.results["health_score"] ?: 0.0
        
        val estimatedYield = calculateYieldFromFactors(ndvi, healthScore, cropType)
        
        return AnalysisResult(
            analysisType = AnalysisType.YIELD_ESTIMATION,
            inputData = listOf(),
            algorithm = "Yield Estimation Model",
            parameters = mapOf(
                "ndvi" to ndvi,
                "health_score" to healthScore,
                "crop_type" to cropType.hashCode().toDouble()
            ),
            results = mapOf(
                "estimated_yield" to estimatedYield,
                "confidence_interval" to (estimatedYield * 0.2),
                "yield_potential" to (estimatedYield * 1.2)
            ),
            confidence = 0.75,
            recommendations = generateYieldRecommendations(estimatedYield, cropType),
            isActive = true
        )
    }
    
    private fun calculateYieldFromFactors(ndvi: Double, healthScore: Double, cropType: String): Double {
        val baseYield = getBaseYield(cropType)
        val ndviFactor = ndvi * 0.6
        val healthFactor = healthScore * 0.4
        
        return baseYield * (ndviFactor + healthFactor)
    }
    
    private fun getBaseYield(cropType: String): Double {
        return when (cropType) {
            "Tomato" -> 50.0 // tons/hectare
            "Corn" -> 8.0
            "Wheat" -> 3.0
            "Rice" -> 4.0
            "Soybean" -> 2.5
            else -> 3.0
        }
    }
    
    private fun generateYieldRecommendations(estimatedYield: Double, cropType: String): List<String> {
        val baseYield = getBaseYield(cropType)
        val yieldRatio = estimatedYield / baseYield
        
        return when {
            yieldRatio > 1.2 -> listOf("Excellent yield potential", "Consider increasing planting density")
            yieldRatio > 1.0 -> listOf("Good yield potential", "Continue current practices")
            yieldRatio > 0.8 -> listOf("Moderate yield potential", "Check for limiting factors")
            else -> listOf("Low yield potential", "Immediate intervention required")
        }
    }
}
