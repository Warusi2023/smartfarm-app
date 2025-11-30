package com.smartfarm.shared.ui.viewmodel

import com.smartfarm.shared.data.model.dto.*
import com.smartfarm.shared.data.repository.WeatherAlertsRepository
import com.smartfarm.shared.data.util.Resource
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow

// Note: Repository is private, use getAlert method instead

/**
 * Weather Alerts ViewModel
 * Shared ViewModel for managing weather alerts UI state
 */
class WeatherAlertsViewModel(
    private val repository: WeatherAlertsRepository
) {
    private val _uiState = MutableStateFlow<WeatherAlertsUiState>(WeatherAlertsUiState.Loading)
    val uiState: StateFlow<WeatherAlertsUiState> = _uiState.asStateFlow()
    
    private val _statsState = MutableStateFlow<WeatherAlertStatsDto?>(null)
    val statsState: StateFlow<WeatherAlertStatsDto?> = _statsState.asStateFlow()
    
    // Note: Don't call suspend functions in init block
    // UI components should call loadAlerts() and loadStats() explicitly
    
    /**
     * Load alerts
     */
    suspend fun loadAlerts(farmId: String? = null, unreadOnly: Boolean = false, limit: Int = 50) {
        _uiState.value = WeatherAlertsUiState.Loading
        val result = repository.getAlerts(farmId, unreadOnly, limit)
        _uiState.value = when (result) {
            is Resource.Success -> WeatherAlertsUiState.Success(result.data)
            is Resource.Error -> WeatherAlertsUiState.Error(result.message ?: "Failed to load alerts")
            is Resource.Loading -> WeatherAlertsUiState.Loading
        }
    }
    
    /**
     * Load statistics
     */
    suspend fun loadStats() {
        val result = repository.getStats()
        if (result is Resource.Success) {
            _statsState.value = result.data
        }
    }
    
    /**
     * Mark alert as read
     */
    suspend fun markAsRead(alertId: String) {
        val result = repository.markAsRead(alertId)
        if (result is Resource.Success) {
            // Refresh alerts and stats
            loadAlerts()
            loadStats()
        }
    }
    
    /**
     * Dismiss alert
     */
    suspend fun dismiss(alertId: String) {
        val result = repository.dismiss(alertId)
        if (result is Resource.Success) {
            // Refresh alerts and stats
            loadAlerts()
            loadStats()
        }
    }
    
    /**
     * Mark action taken
     */
    suspend fun markActionTaken(alertId: String, actionNotes: String? = null) {
        val result = repository.markActionTaken(alertId, actionNotes)
        if (result is Resource.Success) {
            // Refresh alerts
            loadAlerts()
        }
    }
    
    /**
     * Refresh all data
     */
    suspend fun refresh(farmId: String? = null) {
        repository.refresh(farmId)
        loadAlerts(farmId)
        loadStats()
    }
    
    /**
     * Get a specific alert
     */
    suspend fun getAlert(alertId: String) {
        val result = repository.getAlert(alertId)
        if (result is Resource.Success) {
            // Update UI state with single alert
            _uiState.value = WeatherAlertsUiState.Success(listOf(result.data))
        } else if (result is Resource.Error) {
            _uiState.value = WeatherAlertsUiState.Error(result.message ?: "Failed to load alert")
        }
    }
}

/**
 * UI State for Weather Alerts
 */
sealed class WeatherAlertsUiState {
    object Loading : WeatherAlertsUiState()
    data class Success(val alerts: List<WeatherAlertDto>) : WeatherAlertsUiState()
    data class Error(val message: String) : WeatherAlertsUiState()
}

