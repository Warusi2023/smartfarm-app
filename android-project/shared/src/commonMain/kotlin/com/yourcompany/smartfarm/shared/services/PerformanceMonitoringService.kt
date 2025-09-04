package com.yourcompany.smartfarm.shared.services

import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow

/**
 * Performance monitoring service for SmartFarm
 * Integrates real-time sensor data and performance metrics
 */
class PerformanceMonitoringService(
    private val webSocketService: WebSocketService,
    private val dataService: DataService
) {
    
    private val _sensorReadings = MutableStateFlow<Map<String, List<SensorData>>>(emptyMap())
    val sensorReadings: StateFlow<Map<String, List<SensorData>>> = _sensorReadings.asStateFlow()
    
    private val _performanceMetrics = MutableStateFlow<Map<String, Double>>(emptyMap())
    val performanceMetrics: StateFlow<Map<String, Double>> = _performanceMetrics.asStateFlow()
    
    /**
     * Get monitoring statistics
     */
    fun getMonitoringStats(): Map<String, Any> {
        return mapOf(
            "sensorTypes" to _sensorReadings.value.keys.size,
            "totalReadings" to _sensorReadings.value.values.sumOf { it.size },
            "performanceMetrics" to _performanceMetrics.value.size
        )
    }
}
