package com.smartfarm.shared.data.repository

import com.smartfarm.shared.data.model.dto.*
import com.smartfarm.shared.data.util.Resource
import com.smartfarm.shared.network.SmartFarmApi
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow

/**
 * Weather Alerts Repository
 * Shared repository for managing weather alerts
 */
class WeatherAlertsRepository(
    private val api: SmartFarmApi
) {
    private val _alerts = MutableStateFlow<List<WeatherAlertDto>>(emptyList())
    val alerts: Flow<List<WeatherAlertDto>> = _alerts.asStateFlow()
    
    private val _stats = MutableStateFlow<WeatherAlertStatsDto?>(null)
    val stats: Flow<WeatherAlertStatsDto?> = _stats.asStateFlow()
    
    /**
     * Fetch weather alerts for the current user
     */
    suspend fun getAlerts(farmId: String? = null, unreadOnly: Boolean = false, limit: Int = 50): Resource<List<WeatherAlertDto>> {
        val result = api.getWeatherAlerts(farmId, unreadOnly, limit)
        return when (result) {
            is Resource.Success -> {
                _alerts.value = result.data
                result
            }
            else -> result
        }
    }
    
    /**
     * Fetch alert statistics
     */
    suspend fun getStats(): Resource<WeatherAlertStatsDto> {
        val result = api.getWeatherAlertStats()
        return when (result) {
            is Resource.Success -> {
                _stats.value = result.data
                result
            }
            else -> result
        }
    }
    
    /**
     * Get a specific alert by ID
     */
    suspend fun getAlert(alertId: String): Resource<WeatherAlertDto> {
        return api.getWeatherAlert(alertId)
    }
    
    /**
     * Mark alert as read
     */
    suspend fun markAsRead(alertId: String): Resource<WeatherAlertDto> {
        val result = api.markAlertAsRead(alertId)
        return when (result) {
            is Resource.Success -> {
                // Update local state
                _alerts.value = _alerts.value.map { alert ->
                    if (alert.id == alertId) {
                        alert.copy(is_read = true)
                    } else {
                        alert
                    }
                }
                // Refresh stats
                getStats()
                result
            }
            else -> result
        }
    }
    
    /**
     * Dismiss an alert
     */
    suspend fun dismiss(alertId: String): Resource<WeatherAlertDto> {
        val result = api.dismissAlert(alertId)
        return when (result) {
            is Resource.Success -> {
                // Update local state
                _alerts.value = _alerts.value.map { alert ->
                    if (alert.id == alertId) {
                        alert.copy(is_dismissed = true)
                    } else {
                        alert
                    }
                }
                // Refresh stats
                getStats()
                result
            }
            else -> result
        }
    }
    
    /**
     * Mark that action was taken on an alert
     */
    suspend fun markActionTaken(alertId: String, actionNotes: String? = null): Resource<WeatherAlertDto> {
        val result = api.markAlertActionTaken(alertId, actionNotes)
        return when (result) {
            is Resource.Success -> {
                // Update local state
                _alerts.value = _alerts.value.map { alert ->
                    if (alert.id == alertId) {
                        alert.copy(action_taken = true, action_notes = actionNotes)
                    } else {
                        alert
                    }
                }
                result
            }
            else -> result
        }
    }
    
    /**
     * Get alert preferences
     */
    suspend fun getPreferences(): Resource<AlertPreferencesDto> {
        return api.getAlertPreferences()
    }
    
    /**
     * Update alert preferences
     */
    suspend fun updatePreferences(preferences: AlertPreferencesDto): Resource<AlertPreferencesDto> {
        return api.updateAlertPreferences(preferences)
    }
    
    /**
     * Refresh alerts and stats
     */
    suspend fun refresh(farmId: String? = null) {
        getAlerts(farmId, unreadOnly = false)
        getStats()
    }
}

