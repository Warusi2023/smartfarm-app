package com.yourcompany.smartfarm.data.model

import androidx.room.Entity
import androidx.room.PrimaryKey
import kotlinx.serialization.Serializable
import java.time.LocalDateTime

// Equipment Integration
@Entity(tableName = "farm_equipment")
data class FarmEquipment(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val farmId: Long,
    val equipmentType: EquipmentType,
    val manufacturer: String,
    val model: String,
    val serialNumber: String,
    val year: Int,
    val capacity: Double,
    val efficiency: Double, // 0.0 to 1.0
    val fuelType: FuelType,
    val fuelConsumption: Double, // liters/hour
    val maintenanceSchedule: MaintenanceSchedule,
    val location: GPSPoint,
    val status: EquipmentStatus,
    val lastMaintenance: LocalDateTime?,
    val nextMaintenance: LocalDateTime?,
    val operatingHours: Double,
    val totalCost: Double,
    val depreciationRate: Double,
    val isActive: Boolean = true,
    val createdAt: LocalDateTime = LocalDateTime.now()
)

@Entity(tableName = "tractor_data")
data class TractorData(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val tractorId: Long,
    val timestamp: LocalDateTime,
    val location: GPSPoint,
    val speed: Double, // km/h
    val engineRpm: Int,
    val fuelLevel: Double, // percentage
    val engineTemperature: Double, // °C
    val hydraulicPressure: Double, // bar
    val ptoSpeed: Int, // rpm
    val implementStatus: ImplementStatus,
    val fieldOperation: FieldOperation?,
    val fuelConsumption: Double, // liters/hour
    val efficiency: Double, // 0.0 to 1.0
    val isActive: Boolean = true
)

@Entity(tableName = "implement_data")
data class ImplementData(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val implementId: Long,
    val timestamp: LocalDateTime,
    val location: GPSPoint,
    val operationType: OperationType,
    val workingDepth: Double, // cm
    val workingWidth: Double, // meters
    val speed: Double, // km/h
    val efficiency: Double, // 0.0 to 1.0
    val materialApplied: Double, // kg or liters
    val applicationRate: Double, // kg/ha or liters/ha
    val quality: OperationQuality,
    val fieldOperation: FieldOperation?,
    val isActive: Boolean = true
)

@Entity(tableName = "field_operations")
data class FieldOperation(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val farmId: Long,
    val fieldId: Long,
    val operationType: OperationType,
    val startTime: LocalDateTime,
    val endTime: LocalDateTime?,
    val duration: Int, // minutes
    val area: Double, // hectares
    val equipment: List<FarmEquipment>,
    val operator: String,
    val weather: WeatherConditions,
    val fieldConditions: FieldConditions,
    val materials: List<MaterialApplication>,
    val quality: OperationQuality,
    val cost: Double,
    val efficiency: Double, // 0.0 to 1.0
    val recommendations: List<String>,
    val isActive: Boolean = true
)

@Entity(tableName = "material_applications")
data class MaterialApplication(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val materialType: MaterialType,
    val productName: String,
    val applicationRate: Double, // kg/ha or liters/ha
    val totalAmount: Double, // kg or liters
    val applicationMethod: ApplicationMethod,
    val applicationDate: LocalDateTime,
    val fieldConditions: FieldConditions,
    val effectiveness: Double, // 0.0 to 1.0
    val cost: Double,
    val isActive: Boolean = true
)

@Entity(tableName = "field_conditions")
data class FieldConditions(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val soilMoisture: Double, // percentage
    val soilTemperature: Double, // °C
    val soilCompaction: CompactionLevel,
    val surfaceRoughness: RoughnessLevel,
    val residueCover: Double, // percentage
    val slope: Double, // degrees
    val drainage: DrainageType,
    val isActive: Boolean = true
)

@Entity(table_name = "operation_quality")
data class OperationQuality(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val uniformity: Double, // 0.0 to 1.0
    val accuracy: Double, // 0.0 to 1.0
    val completeness: Double, // 0.0 to 1.0
    val efficiency: Double, // 0.0 to 1.0
    val overallScore: Double, // 0.0 to 1.0
    val issues: List<String>,
    val improvements: List<String>,
    val isActive: Boolean = true
)

@Entity(table_name = "equipment_telemetry")
data class EquipmentTelemetry(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val equipmentId: Long,
    val timestamp: LocalDateTime,
    val location: GPSPoint,
    val engineData: EngineData,
    val hydraulicData: HydraulicData,
    val implementData: ImplementData?,
    val fuelData: FuelData,
    val performanceData: PerformanceData,
    val alerts: List<EquipmentAlert>,
    val isActive: Boolean = true
)

@Entity(table_name = "engine_data")
data class EngineData(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val rpm: Int,
    val temperature: Double, // °C
    val oilPressure: Double, // bar
    val coolantLevel: Double, // percentage
    val airFilterStatus: FilterStatus,
    val fuelFilterStatus: FilterStatus,
    val oilLevel: Double, // percentage
    val isActive: Boolean = true
)

@Entity(table_name = "hydraulic_data")
data class HydraulicData(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val pressure: Double, // bar
    val temperature: Double, // °C
    val fluidLevel: Double, // percentage
    val filterStatus: FilterStatus,
    val pumpStatus: PumpStatus,
    val valveStatus: ValveStatus,
    val isActive: Boolean = true
)

@Entity(table_name = "fuel_data")
data class FuelData(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val level: Double, // percentage
    val consumption: Double, // liters/hour
    val efficiency: Double, // km/liter
    val quality: FuelQuality,
    val temperature: Double, // °C
    val isActive: Boolean = true
)

@Entity(table_name = "performance_data")
data class PerformanceData(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val speed: Double, // km/h
    val power: Double, // kW
    val torque: Double, // Nm
    val efficiency: Double, // 0.0 to 1.0
    val load: Double, // percentage
    val isActive: Boolean = true
)

@Entity(table_name = "equipment_alerts")
data class EquipmentAlert(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val alertType: AlertType,
    val severity: AlertSeverity,
    val message: String,
    val timestamp: LocalDateTime,
    val location: GPSPoint?,
    val parameters: Map<String, Double>,
    val recommendations: List<String>,
    val isResolved: Boolean = false,
    val resolvedAt: LocalDateTime?,
    val isActive: Boolean = true
)

@Entity(table_name = "maintenance_records")
data class MaintenanceRecord(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val equipmentId: Long,
    val maintenanceType: MaintenanceType,
    val maintenanceDate: LocalDateTime,
    val performedBy: String,
    val tasks: List<MaintenanceTask>,
    val partsUsed: List<PartUsed>,
    val cost: Double,
    val duration: Int, // minutes
    val notes: String,
    val nextMaintenance: LocalDateTime?,
    val isActive: Boolean = true
)

@Entity(table_name = "maintenance_tasks")
data class MaintenanceTask(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val taskName: String,
    val description: String,
    val frequency: Frequency,
    val estimatedDuration: Int, // minutes
    val difficulty: DifficultyLevel,
    val requiredTools: List<String>,
    val requiredParts: List<String>,
    val safetyPrecautions: List<String>,
    val isActive: Boolean = true
)

@Entity(table_name = "parts_used")
data class PartUsed(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val partNumber: String,
    val partName: String,
    val quantity: Int,
    val unitCost: Double,
    val totalCost: Double,
    val supplier: String,
    val warranty: String?,
    val isActive: Boolean = true
)

// Enums
enum class EquipmentType {
    TRACTOR,
    COMBINE_HARVESTER,
    PLANTER,
    SPRAYER,
    FERTILIZER_SPREADER,
    CULTIVATOR,
    PLOW,
    HARROW,
    MOWER,
    BALER,
    IRRIGATION_SYSTEM,
    DRONE,
    SENSOR_STATION
}

enum class FuelType {
    DIESEL,
    GASOLINE,
    ELECTRIC,
    HYBRID,
    PROPANE,
    BIODIESEL
}

enum class EquipmentStatus {
    OPERATIONAL,
    MAINTENANCE,
    REPAIR,
    IDLE,
    BROKEN,
    RETIRED
}

enum class ImplementStatus {
    ATTACHED,
    DETACHED,
    WORKING,
    IDLE,
    BROKEN
}

enum class OperationType {
    PLANTING,
    SPRAYING,
    FERTILIZING,
    HARVESTING,
    TILLING,
    CULTIVATING,
    MOWING,
    IRRIGATING,
    MONITORING,
    MAPPING
}

enum class MaterialType {
    SEED,
    FERTILIZER,
    PESTICIDE,
    HERBICIDE,
    FUNGICIDE,
    WATER,
    COMPOST,
    MANURE,
    LIME,
    GYPSUM
}

enum class ApplicationMethod {
    BROADCAST,
    BAND,
    IN_FURROW,
    FOLIAR,
    SOIL_INJECTION,
    DRIP,
    SPRINKLER,
    AERIAL
}

enum class CompactionLevel {
    NONE,
    LIGHT,
    MODERATE,
    SEVERE,
    EXTREME
}

enum class RoughnessLevel {
    SMOOTH,
    MODERATE,
    ROUGH,
    VERY_ROUGH
}

enum class FilterStatus {
    GOOD,
    FAIR,
    POOR,
    REPLACE
}

enum class PumpStatus {
    NORMAL,
    LOW_PRESSURE,
    HIGH_PRESSURE,
    FAILURE
}

enum class ValveStatus {
    OPEN,
    CLOSED,
    PARTIALLY_OPEN,
    STUCK,
    LEAKING
}

enum class FuelQuality {
    EXCELLENT,
    GOOD,
    FAIR,
    POOR,
    CONTAMINATED
}

enum class AlertType {
    MAINTENANCE_DUE,
    FUEL_LOW,
    OIL_PRESSURE_LOW,
    TEMPERATURE_HIGH,
    HYDRAULIC_PRESSURE_LOW,
    FILTER_CLOGGED,
    PERFORMANCE_DEGRADED,
    SAFETY_ISSUE,
    COMMUNICATION_LOST
}

enum class AlertSeverity {
    INFO,
    WARNING,
    CRITICAL,
    EMERGENCY
}

enum class MaintenanceType {
    PREVENTIVE,
    CORRECTIVE,
    EMERGENCY,
    ROUTINE,
    SEASONAL
}

enum class DifficultyLevel {
    EASY,
    MODERATE,
    DIFFICULT,
    EXPERT
}

// Equipment Integration Engine
object EquipmentIntegrationEngine {
    
    fun processTelemetryData(telemetry: EquipmentTelemetry): EquipmentStatus {
        val status = analyzeEquipmentHealth(telemetry)
        val alerts = generateAlerts(telemetry, status)
        
        return status
    }
    
    fun optimizeFieldOperation(
        fieldMap: FieldMap,
        equipment: List<FarmEquipment>,
        operationType: OperationType,
        weather: WeatherConditions
    ): FieldOperation {
        val optimalEquipment = selectOptimalEquipment(equipment, operationType, fieldMap)
        val optimalPath = calculateOptimalPath(fieldMap, operationType)
        val optimalTiming = determineOptimalTiming(weather, fieldMap)
        
        return FieldOperation(
            farmId = fieldMap.farmId,
            fieldId = fieldMap.id,
            operationType = operationType,
            startTime = optimalTiming,
            endTime = null,
            duration = calculateOperationDuration(fieldMap, optimalEquipment, operationType),
            area = fieldMap.area,
            equipment = optimalEquipment,
            operator = "System Recommended",
            weather = weather,
            fieldConditions = assessFieldConditions(fieldMap, weather),
            materials = listOf(),
            quality = OperationQuality(
                uniformity = 0.9,
                accuracy = 0.85,
                completeness = 0.95,
                efficiency = 0.8,
                overallScore = 0.875,
                issues = listOf(),
                improvements = listOf(),
                isActive = true
            ),
            cost = calculateOperationCost(optimalEquipment, fieldMap.area),
            efficiency = 0.8,
            recommendations = generateOperationRecommendations(operationType, fieldMap, weather),
            isActive = true
        )
    }
    
    fun generateMaintenanceSchedule(equipment: FarmEquipment): MaintenanceSchedule {
        val tasks = generateMaintenanceTasks(equipment)
        val schedule = calculateMaintenanceSchedule(tasks, equipment.operatingHours)
        
        return MaintenanceSchedule(
            scheduleType = MaintenanceType.PREVENTIVE,
            frequency = Frequency.MONTHLY,
            lastMaintenance = equipment.lastMaintenance,
            nextMaintenance = schedule.nextMaintenance,
            maintenanceTasks = tasks.map { it.taskName },
            cost = calculateMaintenanceCost(tasks),
            isActive = true
        )
    }
    
    fun analyzeEquipmentHealth(telemetry: EquipmentTelemetry): EquipmentStatus {
        val engineHealth = analyzeEngineHealth(telemetry.engineData)
        val hydraulicHealth = analyzeHydraulicHealth(telemetry.hydraulicData)
        val fuelHealth = analyzeFuelHealth(telemetry.fuelData)
        val performanceHealth = analyzePerformanceHealth(telemetry.performanceData)
        
        val overallHealth = (engineHealth + hydraulicHealth + fuelHealth + performanceHealth) / 4.0
        
        return when {
            overallHealth > 0.8 -> EquipmentStatus.OPERATIONAL
            overallHealth > 0.6 -> EquipmentStatus.IDLE
            overallHealth > 0.4 -> EquipmentStatus.MAINTENANCE
            overallHealth > 0.2 -> EquipmentStatus.REPAIR
            else -> EquipmentStatus.BROKEN
        }
    }
    
    fun generateAlerts(telemetry: EquipmentTelemetry, status: EquipmentStatus): List<EquipmentAlert> {
        val alerts = mutableListOf<EquipmentAlert>()
        
        // Engine alerts
        if (telemetry.engineData.temperature > 95) {
            alerts.add(EquipmentAlert(
                alertType = AlertType.TEMPERATURE_HIGH,
                severity = AlertSeverity.CRITICAL,
                message = "Engine temperature is critically high",
                timestamp = telemetry.timestamp,
                location = telemetry.location,
                parameters = mapOf("temperature" to telemetry.engineData.temperature),
                recommendations = listOf("Stop equipment immediately", "Check coolant level", "Allow engine to cool")
            ))
        }
        
        if (telemetry.engineData.oilPressure < 1.5) {
            alerts.add(EquipmentAlert(
                alertType = AlertType.OIL_PRESSURE_LOW,
                severity = AlertSeverity.WARNING,
                message = "Oil pressure is low",
                timestamp = telemetry.timestamp,
                location = telemetry.location,
                parameters = mapOf("oil_pressure" to telemetry.engineData.oilPressure),
                recommendations = listOf("Check oil level", "Schedule maintenance")
            ))
        }
        
        // Hydraulic alerts
        if (telemetry.hydraulicData.pressure < 50) {
            alerts.add(EquipmentAlert(
                alertType = AlertType.HYDRAULIC_PRESSURE_LOW,
                severity = AlertSeverity.WARNING,
                message = "Hydraulic pressure is low",
                timestamp = telemetry.timestamp,
                location = telemetry.location,
                parameters = mapOf("pressure" to telemetry.hydraulicData.pressure),
                recommendations = listOf("Check hydraulic fluid", "Inspect for leaks")
            ))
        }
        
        // Fuel alerts
        if (telemetry.fuelData.level < 20) {
            alerts.add(EquipmentAlert(
                alertType = AlertType.FUEL_LOW,
                severity = AlertSeverity.WARNING,
                message = "Fuel level is low",
                timestamp = telemetry.timestamp,
                location = telemetry.location,
                parameters = mapOf("fuel_level" to telemetry.fuelData.level),
                recommendations = listOf("Refuel soon", "Plan for fuel stop")
            ))
        }
        
        return alerts
    }
    
    private fun analyzeEngineHealth(engineData: EngineData): Double {
        var health = 1.0
        
        // Temperature scoring
        when {
            engineData.temperature > 95 -> health -= 0.4
            engineData.temperature > 85 -> health -= 0.2
            engineData.temperature < 60 -> health -= 0.1
        }
        
        // Oil pressure scoring
        when {
            engineData.oilPressure < 1.5 -> health -= 0.3
            engineData.oilPressure < 2.0 -> health -= 0.1
        }
        
        // Oil level scoring
        if (engineData.oilLevel < 20) health -= 0.2
        
        // Filter status scoring
        if (engineData.airFilterStatus == FilterStatus.POOR) health -= 0.1
        if (engineData.fuelFilterStatus == FilterStatus.POOR) health -= 0.1
        
        return maxOf(0.0, health)
    }
    
    private fun analyzeHydraulicHealth(hydraulicData: HydraulicData): Double {
        var health = 1.0
        
        // Pressure scoring
        when {
            hydraulicData.pressure < 50 -> health -= 0.3
            hydraulicData.pressure < 100 -> health -= 0.1
            hydraulicData.pressure > 200 -> health -= 0.2
        }
        
        // Temperature scoring
        if (hydraulicData.temperature > 80) health -= 0.2
        
        // Fluid level scoring
        if (hydraulicData.fluidLevel < 20) health -= 0.3
        
        // Filter status scoring
        if (hydraulicData.filterStatus == FilterStatus.POOR) health -= 0.1
        
        return maxOf(0.0, health)
    }
    
    private fun analyzeFuelHealth(fuelData: FuelData): Double {
        var health = 1.0
        
        // Fuel level scoring
        if (fuelData.level < 10) health -= 0.4
        else if (fuelData.level < 20) health -= 0.2
        
        // Efficiency scoring
        if (fuelData.efficiency < 0.5) health -= 0.2
        
        // Quality scoring
        when (fuelData.quality) {
            FuelQuality.CONTAMINATED -> health -= 0.5
            FuelQuality.POOR -> health -= 0.3
            FuelQuality.FAIR -> health -= 0.1
            else -> { /* No change */ }
        }
        
        return maxOf(0.0, health)
    }
    
    private fun analyzePerformanceHealth(performanceData: PerformanceData): Double {
        var health = 1.0
        
        // Efficiency scoring
        if (performanceData.efficiency < 0.6) health -= 0.3
        else if (performanceData.efficiency < 0.8) health -= 0.1
        
        // Load scoring
        if (performanceData.load > 95) health -= 0.2
        else if (performanceData.load > 90) health -= 0.1
        
        return maxOf(0.0, health)
    }
    
    private fun selectOptimalEquipment(
        equipment: List<FarmEquipment>,
        operationType: OperationType,
        fieldMap: FieldMap
    ): List<FarmEquipment> {
        return equipment.filter { eq ->
            when (operationType) {
                OperationType.PLANTING -> eq.equipmentType == EquipmentType.PLANTER
                OperationType.SPRAYING -> eq.equipmentType == EquipmentType.SPRAYER
                OperationType.FERTILIZING -> eq.equipmentType == EquipmentType.FERTILIZER_SPREADER
                OperationType.HARVESTING -> eq.equipmentType == EquipmentType.COMBINE_HARVESTER
                OperationType.TILLING -> eq.equipmentType == EquipmentType.CULTIVATOR
                else -> true
            }
        }.filter { eq ->
            eq.status == EquipmentStatus.OPERATIONAL &&
            eq.capacity >= fieldMap.area * 0.1 // Minimum capacity requirement
        }.sortedByDescending { it.efficiency }
    }
    
    private fun calculateOptimalPath(fieldMap: FieldMap, operationType: OperationType): List<GPSPoint> {
        // Simple path calculation - in reality, this would use advanced algorithms
        return fieldMap.boundaries
    }
    
    private fun determineOptimalTiming(weather: WeatherConditions, fieldMap: FieldMap): LocalDateTime {
        // Determine optimal timing based on weather and field conditions
        val now = LocalDateTime.now()
        
        // Check weather conditions
        if (weather.precipitation > 5.0) {
            return now.plusDays(1) // Wait for rain to stop
        }
        
        if (weather.windSpeed > 20.0) {
            return now.plusHours(2) // Wait for wind to calm
        }
        
        return now
    }
    
    private fun calculateOperationDuration(
        fieldMap: FieldMap,
        equipment: List<FarmEquipment>,
        operationType: OperationType
    ): Int {
        if (equipment.isEmpty()) return 0
        
        val totalCapacity = equipment.sumOf { it.capacity }
        val efficiency = equipment.map { it.efficiency }.average()
        
        val baseTime = fieldMap.area / totalCapacity * 60 // minutes
        return (baseTime / efficiency).toInt()
    }
    
    private fun assessFieldConditions(fieldMap: FieldMap, weather: WeatherConditions): FieldConditions {
        return FieldConditions(
            soilMoisture = calculateSoilMoisture(weather),
            soilTemperature = weather.temperature,
            soilCompaction = CompactionLevel.MODERATE,
            surfaceRoughness = RoughnessLevel.MODERATE,
            residueCover = 20.0,
            slope = fieldMap.elevationMap.map { it.slope }.average(),
            drainage = DrainageType.GOOD,
            isActive = true
        )
    }
    
    private fun calculateSoilMoisture(weather: WeatherConditions): Double {
        // Simple soil moisture calculation based on weather
        var moisture = 50.0 // Base moisture
        
        if (weather.precipitation > 0) {
            moisture += weather.precipitation * 5
        }
        
        if (weather.humidity > 80) {
            moisture += 10
        } else if (weather.humidity < 40) {
            moisture -= 10
        }
        
        if (weather.temperature > 30) {
            moisture -= 5
        }
        
        return maxOf(0.0, minOf(100.0, moisture))
    }
    
    private fun calculateOperationCost(equipment: List<FarmEquipment>, area: Double): Double {
        return equipment.sumOf { eq ->
            val fuelCost = eq.fuelConsumption * 1.5 * (area / eq.capacity) // $1.5 per liter
            val laborCost = 25.0 * (area / eq.capacity) // $25 per hour
            val maintenanceCost = eq.totalCost * 0.01 * (area / eq.capacity) // 1% of equipment cost
            
            fuelCost + laborCost + maintenanceCost
        }
    }
    
    private fun generateOperationRecommendations(
        operationType: OperationType,
        fieldMap: FieldMap,
        weather: WeatherConditions
    ): List<String> {
        val recommendations = mutableListOf<String>()
        
        when (operationType) {
            OperationType.PLANTING -> {
                recommendations.add("Ensure soil temperature is above 10°C")
                recommendations.add("Check soil moisture levels")
                recommendations.add("Calibrate planter for seed rate")
            }
            OperationType.SPRAYING -> {
                recommendations.add("Check wind speed (should be < 15 km/h)")
                recommendations.add("Ensure proper nozzle selection")
                recommendations.add("Check for temperature inversions")
            }
            OperationType.FERTILIZING -> {
                recommendations.add("Test soil nutrients before application")
                recommendations.add("Calibrate spreader for uniform application")
                recommendations.add("Avoid application on wet soil")
            }
            OperationType.HARVESTING -> {
                recommendations.add("Check crop moisture content")
                recommendations.add("Ensure combine is properly adjusted")
                recommendations.add("Monitor grain quality")
            }
            else -> {
                recommendations.add("Follow standard operating procedures")
                recommendations.add("Monitor equipment performance")
                recommendations.add("Record operation data")
            }
        }
        
        // Weather-based recommendations
        if (weather.precipitation > 5.0) {
            recommendations.add("Postpone operation due to rain")
        }
        
        if (weather.windSpeed > 20.0) {
            recommendations.add("High winds detected - consider postponing")
        }
        
        if (weather.temperature > 35.0) {
            recommendations.add("Extreme heat - ensure operator safety")
        }
        
        return recommendations
    }
    
    private fun generateMaintenanceTasks(equipment: FarmEquipment): List<MaintenanceTask> {
        val tasks = mutableListOf<MaintenanceTask>()
        
        // Common maintenance tasks
        tasks.add(MaintenanceTask(
            taskName = "Oil Change",
            description = "Change engine oil and filter",
            frequency = Frequency.MONTHLY,
            estimatedDuration = 60,
            difficulty = DifficultyLevel.EASY,
            requiredTools = listOf("Wrench set", "Oil drain pan", "Funnel"),
            requiredParts = listOf("Engine oil", "Oil filter"),
            safetyPrecautions = listOf("Allow engine to cool", "Use proper lifting equipment"),
            isActive = true
        ))
        
        tasks.add(MaintenanceTask(
            taskName = "Air Filter Replacement",
            description = "Replace air filter",
            frequency = Frequency.MONTHLY,
            estimatedDuration = 30,
            difficulty = DifficultyLevel.EASY,
            requiredTools = listOf("Screwdriver"),
            requiredParts = listOf("Air filter"),
            safetyPrecautions = listOf("Turn off engine", "Allow to cool"),
            isActive = true
        ))
        
        tasks.add(MaintenanceTask(
            taskName = "Hydraulic System Check",
            description = "Check hydraulic fluid and system",
            frequency = Frequency.WEEKLY,
            estimatedDuration = 45,
            difficulty = DifficultyLevel.MODERATE,
            requiredTools = listOf("Hydraulic pressure gauge", "Clean rags"),
            requiredParts = listOf("Hydraulic fluid"),
            safetyPrecautions = listOf("Relieve pressure", "Use proper PPE"),
            isActive = true
        ))
        
        return tasks
    }
    
    private fun calculateMaintenanceSchedule(
        tasks: List<MaintenanceTask>,
        operatingHours: Double
    ): MaintenanceSchedule {
        val nextMaintenance = LocalDateTime.now().plusDays(30) // Default to 30 days
        
        return MaintenanceSchedule(
            scheduleType = MaintenanceType.PREVENTIVE,
            frequency = Frequency.MONTHLY,
            lastMaintenance = null,
            nextMaintenance = nextMaintenance,
            maintenanceTasks = tasks.map { it.taskName },
            cost = calculateMaintenanceCost(tasks),
            isActive = true
        )
    }
    
    private fun calculateMaintenanceCost(tasks: List<MaintenanceTask>): Double {
        return tasks.sumOf { task ->
            val laborCost = 50.0 * (task.estimatedDuration / 60.0) // $50 per hour
            val partsCost = task.requiredParts.size * 25.0 // $25 per part
            laborCost + partsCost
        }
    }
}
