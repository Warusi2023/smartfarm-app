package com.smartfarm.data

import java.util.*

/**
 * Core farm data structure for AI analytics
 */
data class FarmData(
    val farmId: String,
    val farmName: String,
    val location: FarmLocation,
    val soilProfile: SoilProfile,
    val cropHistory: List<CropRecord>,
    val historicalYields: List<YieldRecord>,
    val equipment: List<Equipment>,
    val irrigationSystem: IrrigationSystem,
    val lastUpdated: Date
)

/**
 * Farm location and geographic information
 */
data class FarmLocation(
    val latitude: Double,
    val longitude: Double,
    val elevation: Double,
    val timezone: String,
    val region: String,
    val country: String,
    val climateZone: String
)

/**
 * Soil profile and characteristics
 */
data class SoilProfile(
    val soilType: String,
    val ph: Double,
    val organicMatter: Double,
    val nitrogen: Double,
    val phosphorus: Double,
    val potassium: Double,
    val moisture: Double,
    val temperature: Double,
    val lastTested: Date
)

/**
 * Historical crop records
 */
data class CropRecord(
    val cropId: String,
    val cropType: String,
    val variety: String,
    val plantingDate: Date,
    val harvestDate: Date?,
    val yield: Double?,
    val quality: String?,
    val notes: String
)

/**
 * Yield records for historical analysis
 */
data class YieldRecord(
    val recordId: String,
    val cropType: String,
    val year: Int,
    val season: String,
    val yield: Double,
    val unit: String,
    val area: Double,
    val weatherConditions: WeatherSummary,
    val managementPractices: List<String>
)

/**
 * Equipment information
 */
data class Equipment(
    val equipmentId: String,
    val type: String,
    val model: String,
    val year: Int,
    val capabilities: List<String>,
    val maintenanceHistory: List<MaintenanceRecord>
)

/**
 * Irrigation system details
 */
data class IrrigationSystem(
    val systemId: String,
    val type: String,
    val coverage: Double,
    val efficiency: Double,
    val schedule: IrrigationSchedule,
    val sensors: List<Sensor>
)

/**
 * Weather data for analysis
 */
data class WeatherData(
    val location: String,
    val date: Date,
    val temperature: Double,
    val humidity: Double,
    val rainfall: Double,
    val windSpeed: Double,
    val windDirection: Double,
    val pressure: Double,
    val visibility: Double,
    val forecast: List<WeatherForecast>
)

/**
 * Weather forecast data
 */
data class WeatherForecast(
    val date: Date,
    val highTemp: Double,
    val lowTemp: Double,
    val precipitation: Double,
    val humidity: Double,
    val windSpeed: Double,
    val conditions: String
)

/**
 * Plant image for disease detection
 */
data class PlantImage(
    val imageId: String,
    val imageUrl: String,
    val plantType: String,
    val plantAge: Int,
    val imageDate: Date,
    val location: String,
    val metadata: ImageMetadata
)

/**
 * Image metadata for analysis
 */
data class ImageMetadata(
    val resolution: String,
    val fileSize: Long,
    val format: String,
    val gpsCoordinates: Pair<Double, Double>?,
    val cameraSettings: CameraSettings?
)

/**
 * Camera settings for image analysis
 */
data class CameraSettings(
    val iso: Int,
    val shutterSpeed: String,
    val aperture: Double,
    val focalLength: Double
)

/**
 * Weather summary for yield analysis
 */
data class WeatherSummary(
    val avgTemperature: Double,
    val totalRainfall: Double,
    val droughtDays: Int,
    val frostDays: Int,
    val extremeEvents: List<String>
)

/**
 * Maintenance records for equipment
 */
data class MaintenanceRecord(
    val recordId: String,
    val date: Date,
    val type: String,
    val description: String,
    val cost: Double,
    val technician: String
)

/**
 * Irrigation schedule
 */
data class IrrigationSchedule(
    val frequency: String,
    val duration: Int,
    val startTime: String,
    val endTime: String,
    val daysOfWeek: List<Int>
)

/**
 * Sensor data
 */
data class Sensor(
    val sensorId: String,
    val type: String,
    val location: String,
    val currentValue: Double,
    val unit: String,
    val lastReading: Date,
    val status: String
)

/**
 * Blockchain transaction for supply chain transparency
 */
data class BlockchainTransaction(
    val transactionId: String,
    val timestamp: Date,
    val farmId: String,
    val cropType: String,
    val action: String,
    val data: Map<String, Any>,
    val hash: String,
    val previousHash: String?
)

/**
 * Sustainability metrics
 */
data class SustainabilityMetrics(
    val farmId: String,
    val date: Date,
    val carbonFootprint: Double,
    val waterUsage: Double,
    val energyConsumption: Double,
    val wasteReduction: Double,
    val biodiversityScore: Double,
    val certificationStatus: List<String>
)

/**
 * Carbon credit information
 */
data class CarbonCredit(
    val creditId: String,
    val farmId: String,
    val amount: Double,
    val type: String,
    val verificationDate: Date,
    val price: Double,
    val marketplace: String,
    val status: String
)

/**
 * Community knowledge sharing
 */
data class KnowledgePost(
    val postId: String,
    val authorId: String,
    val title: String,
    val content: String,
    val category: String,
    val tags: List<String>,
    val createdAt: Date,
    val likes: Int,
    val comments: List<Comment>,
    val attachments: List<String>
)

/**
 * Comment on knowledge posts
 */
data class Comment(
    val commentId: String,
    val authorId: String,
    val content: String,
    val createdAt: Date,
    val likes: Int,
    val replies: List<Comment>
)

/**
 * Educational content
 */
data class EducationalContent(
    val contentId: String,
    val title: String,
    val description: String,
    val type: String,
    val difficulty: String,
    val duration: Int,
    val language: String,
    val tags: List<String>,
    val content: String,
    val attachments: List<String>,
    val quiz: Quiz?
)

/**
 * Quiz for educational content
 */
data class Quiz(
    val quizId: String,
    val questions: List<Question>,
    val passingScore: Int,
    val timeLimit: Int?
)

/**
 * Quiz question
 */
data class Question(
    val questionId: String,
    val question: String,
    val options: List<String>,
    val correctAnswer: Int,
    val explanation: String
)

/**
 * Financial data for farm management
 */
data class FinancialData(
    val farmId: String,
    val date: Date,
    val income: Double,
    val expenses: Double,
    val profit: Double,
    val cashFlow: Double,
    val assets: Double,
    val liabilities: Double,
    val equity: Double
)

/**
 * Crop insurance information
 */
data class CropInsurance(
    val policyId: String,
    val farmId: String,
    val cropType: String,
    val coverage: Double,
    val premium: Double,
    val deductible: Double,
    val startDate: Date,
    val endDate: Date,
    val status: String
)

/**
 * Market data for price forecasting
 */
data class MarketData(
    val marketId: String,
    val cropType: String,
    val region: String,
    val date: Date,
    val price: Double,
    val volume: Double,
    val demand: String,
    val supply: String,
    val trends: List<String>
)
