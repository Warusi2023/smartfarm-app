package com.example.smartfarm.data.model

import androidx.room.Entity
import androidx.room.PrimaryKey
import kotlinx.serialization.Serializable

@Serializable
@Entity(tableName = "weather")
data class Weather(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val userId: Long,
    val farmId: Long,
    val date: Long,
    val temperature: Double,
    val humidity: Double,
    val precipitation: Double,
    val windSpeed: Double,
    val windDirection: String,
    val pressure: Double,
    val visibility: Double,
    val description: String,
    val icon: String,
    val isActive: Boolean = true,
    val createdAt: Long = System.currentTimeMillis(),
    val updatedAt: Long = System.currentTimeMillis()
)

data class Temperature(
    val min: Double,
    val max: Double,
    val feelsLike: Double
)

enum class FarmingImpact {
    POSITIVE,
    NEUTRAL,
    NEGATIVE,
    CRITICAL
}

@Entity(tableName = "weather_alerts")
data class WeatherAlert(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val farmId: Long,
    val alertType: AlertType,
    val severity: AlertSeverity,
    val title: String,
    val description: String,
    val startTime: Long,
    val endTime: Long,
    val mitigationSteps: List<String>,
    val isActive: Boolean = true
)

enum class AlertType {
    FROST_WARNING,
    DROUGHT_WARNING,
    FLOOD_WARNING,
    HEAT_WAVE,
    STORM_WARNING,
    WIND_WARNING,
    HAIL_WARNING
}

enum class AlertSeverity {
    MINOR,
    MODERATE,
    SEVERE,
    EXTREME
}

enum class WeatherCondition {
    CLEAR,
    CLOUDS,
    RAIN,
    SNOW,
    THUNDERSTORM,
    DRIZZLE,
    ATMOSPHERE
} 