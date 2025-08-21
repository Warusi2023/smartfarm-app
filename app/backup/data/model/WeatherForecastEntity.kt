package com.yourcompany.smartfarm.data.model

import androidx.room.Entity
import androidx.room.PrimaryKey
import kotlinx.serialization.Serializable

@Serializable
@Entity(tableName = "weather_forecasts")
data class WeatherForecastEntity(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val userId: Long,
    val farmId: Long,
    val date: Long,
    val temperature_min: Double,
    val temperature_max: Double,
    val humidity: Double,
    val precipitation: Double,
    val windSpeed: Double,
    val windDirection: String,
    val pressure: Double,
    val visibility: Double,
    val description: String,
    val icon: String,
    val farmingImpact: FarmingImpact = FarmingImpact.NEUTRAL,
    val isActive: Boolean = true,
    val createdAt: Long = System.currentTimeMillis(),
    val updatedAt: Long = System.currentTimeMillis()
)
