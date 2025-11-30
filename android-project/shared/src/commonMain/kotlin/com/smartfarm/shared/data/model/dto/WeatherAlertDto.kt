package com.smartfarm.shared.data.model.dto

import kotlinx.serialization.Serializable

/**
 * Weather Alert DTO
 * Represents a weather alert for a farm
 */
@Serializable
data class WeatherAlertDto(
    val id: String,
    val farm_id: String? = null,
    val user_id: String,
    val alert_type: String, // 'heavy_rain', 'frost', 'heat_stress', 'strong_wind', 'drought'
    val severity: String, // 'low', 'medium', 'high', 'critical'
    val title: String,
    val message: String,
    val expected_time: String, // ISO 8601 timestamp
    val location_lat: Double? = null,
    val location_lng: Double? = null,
    val location_name: String? = null,
    val weather_data: Map<String, String>? = null, // JSONB parsed as Map
    val is_read: Boolean = false,
    val is_dismissed: Boolean = false,
    val action_taken: Boolean = false,
    val action_notes: String? = null,
    val created_at: String? = null,
    val updated_at: String? = null,
    // Additional fields from JOIN queries
    val farm_name: String? = null,
    val farm_location: String? = null
)

/**
 * Weather Alert Statistics DTO
 */
@Serializable
data class WeatherAlertStatsDto(
    val total: Int,
    val unread: Int,
    val critical: Int,
    val high: Int,
    val upcoming: Int
)

/**
 * Alert Preferences DTO
 */
@Serializable
data class AlertPreferencesDto(
    val id: String? = null,
    val user_id: String,
    val enable_heavy_rain: Boolean = true,
    val enable_frost: Boolean = true,
    val enable_heat_stress: Boolean = true,
    val enable_strong_wind: Boolean = true,
    val enable_drought: Boolean = true,
    val min_severity: String = "medium",
    val notification_enabled: Boolean = true,
    val created_at: String? = null,
    val updated_at: String? = null
)

/**
 * Alert Action Request DTO
 */
@Serializable
data class AlertActionRequest(
    val actionNotes: String? = null
)

