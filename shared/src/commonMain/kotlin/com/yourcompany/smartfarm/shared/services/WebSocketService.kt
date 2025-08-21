package com.yourcompany.smartfarm.shared.services

import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.Json
import kotlinx.serialization.encodeToString

/**
 * WebSocket service for real-time farm data streaming
 * Provides live updates for sensors, equipment, and farm status
 */
@Serializable
data class WebSocketMessage(
    val type: String,
    val data: String,
    val timestamp: Long = 0L,
    val farmId: String? = null
)

@Serializable
data class SensorData(
    val sensorId: String,
    val type: String,
    val value: Double,
    val unit: String,
    val location: String,
    val timestamp: Long
)

@Serializable
data class EquipmentStatus(
    val equipmentId: String,
    val name: String,
    val status: String,
    val efficiency: Double,
    val lastMaintenance: Long,
    val nextMaintenance: Long
)

@Serializable
data class FarmAlert(
    val alertId: String,
    val type: String,
    val severity: String,
    val message: String,
    val location: String,
    val timestamp: Long
)

enum class WebSocketEventType {
    CONNECTED, DISCONNECTED, MESSAGE, ERROR, RECONNECTING
}

data class WebSocketEvent(
    val type: WebSocketEventType,
    val message: String? = null,
    val data: Any? = null
)

class WebSocketService {
    
    private var webSocket: dynamic = null
    private var isConnected = false
    private var reconnectAttempts = 0
    private val maxReconnectAttempts = 5
    private val reconnectDelayMs = 1000L
    
    private val _events = MutableStateFlow<WebSocketEvent?>(null)
    val events: StateFlow<WebSocketEvent?> = _events.asStateFlow()
    
    private val _sensorData = MutableStateFlow<List<SensorData>>(emptyList())
    val sensorData: StateFlow<List<SensorData>> = _sensorData.asStateFlow()
    
    private val _equipmentStatus = MutableStateFlow<List<EquipmentStatus>>(emptyList())
    val equipmentStatus: StateFlow<List<EquipmentStatus>> = _equipmentStatus.asStateFlow()
    
    private val _farmAlerts = MutableStateFlow<List<FarmAlert>>(emptyList())
    val farmAlerts: StateFlow<List<FarmAlert>> = _farmAlerts.asStateFlow()
    
    private val json = Json { ignoreUnknownKeys = true }
    private var reconnectJob: Job? = null
    
    /**
     * Connect to WebSocket server
     */
    suspend fun connect(url: String, authToken: String? = null) {
        if (isConnected) return
        
        try {
            println("🔌 Connecting to WebSocket: $url")
            
            // Create WebSocket connection
            webSocket = createWebSocket(url, authToken)
            
            // Set up event handlers
            setupWebSocketHandlers()
            
            isConnected = true
            reconnectAttempts = 0
            _events.value = WebSocketEvent(WebSocketEventType.CONNECTED, "Connected to WebSocket server")
            
            println("✅ WebSocket connected successfully")
            
        } catch (e: Exception) {
            println("❌ WebSocket connection failed: ${e.message}")
            _events.value = WebSocketEvent(WebSocketEventType.ERROR, "Connection failed: ${e.message}")
            scheduleReconnect(url, authToken)
        }
    }
    
    /**
     * Disconnect from WebSocket server
     */
    suspend fun disconnect() {
        if (!isConnected) return
        
        try {
            reconnectJob?.cancel()
            webSocket?.close()
            isConnected = false
            _events.value = WebSocketEvent(WebSocketEventType.DISCONNECTED, "Disconnected from WebSocket server")
            println("🔌 WebSocket disconnected")
        } catch (e: Exception) {
            println("❌ Error disconnecting: ${e.message}")
        }
    }
    
    /**
     * Send message to WebSocket server
     */
    suspend fun sendMessage(message: WebSocketMessage) {
        if (!isConnected) {
            println("❌ WebSocket not connected")
            return
        }
        
        try {
            val messageJson = json.encodeToString(message)
            webSocket?.send(messageJson)
            println("📤 Sent message: $messageJson")
        } catch (e: Exception) {
            println("❌ Failed to send message: ${e.message}")
        }
    }
    
    /**
     * Subscribe to sensor data updates
     */
    suspend fun subscribeToSensorData(farmId: String) {
        val message = WebSocketMessage(
            type = "subscribe_sensors",
            data = farmId,
            farmId = farmId
        )
        sendMessage(message)
    }
    
    /**
     * Subscribe to equipment status updates
     */
    suspend fun subscribeToEquipmentStatus(farmId: String) {
        val message = WebSocketMessage(
            type = "subscribe_equipment",
            data = farmId,
            farmId = farmId
        )
        sendMessage(message)
    }
    
    /**
     * Subscribe to farm alerts
     */
    suspend fun subscribeToFarmAlerts(farmId: String) {
        val message = WebSocketMessage(
            type = "subscribe_alerts",
            data = farmId,
            farmId = farmId
        )
        sendMessage(message)
    }
    
    /**
     * Request real-time data update
     */
    suspend fun requestDataUpdate(farmId: String, dataType: String) {
        val message = WebSocketMessage(
            type = "request_update",
            data = dataType,
            farmId = farmId
        )
        sendMessage(message)
    }
    
    /**
     * Get current connection status
     */
    fun isConnected(): Boolean = isConnected
    
    /**
     * Get connection statistics
     */
    fun getConnectionStats(): Map<String, Any> {
        return mapOf(
            "connected" to isConnected,
            "reconnectAttempts" to reconnectAttempts,
            "sensorDataCount" to _sensorData.value.size,
            "equipmentStatusCount" to _equipmentStatus.value.size,
            "alertCount" to _farmAlerts.value.size
        )
    }
    
    /**
     * Create platform-specific WebSocket
     */
    private expect fun createWebSocket(url: String, authToken: String?): dynamic
    
    /**
     * Set up WebSocket event handlers
     */
    private expect fun setupWebSocketHandlers()
    
    /**
     * Schedule reconnection attempt
     */
    private fun scheduleReconnect(url: String, authToken: String?) {
        if (reconnectAttempts >= maxReconnectAttempts) {
            println("❌ Max reconnection attempts reached")
            _events.value = WebSocketEvent(WebSocketEventType.ERROR, "Max reconnection attempts reached")
            return
        }
        
        reconnectAttempts++
        val delay = reconnectDelayMs * reconnectAttempts
        
        println("🔄 Scheduling reconnection attempt $reconnectAttempts in ${delay}ms")
        _events.value = WebSocketEvent(WebSocketEventType.RECONNECTING, "Reconnecting in ${delay}ms")
        
        reconnectJob = CoroutineScope(Dispatchers.IO).launch {
            delay(delay)
            connect(url, authToken)
        }
    }
    
    /**
     * Handle incoming WebSocket message
     */
    private fun handleMessage(message: String) {
        try {
            val wsMessage = json.decodeFromString<WebSocketMessage>(message)
            println("📥 Received message: ${wsMessage.type}")
            
            when (wsMessage.type) {
                "sensor_data" -> handleSensorData(wsMessage.data)
                "equipment_status" -> handleEquipmentStatus(wsMessage.data)
                "farm_alert" -> handleFarmAlert(wsMessage.data)
                "heartbeat" -> handleHeartbeat()
                else -> println("⚠️ Unknown message type: ${wsMessage.type}")
            }
            
        } catch (e: Exception) {
            println("❌ Error parsing message: ${e.message}")
        }
    }
    
    /**
     * Handle sensor data updates
     */
    private fun handleSensorData(data: String) {
        try {
            val sensorData = json.decodeFromString<SensorData>(data)
            val currentData = _sensorData.value.toMutableList()
            
            // Update existing sensor data or add new
            val existingIndex = currentData.indexOfFirst { it.sensorId == sensorData.sensorId }
            if (existingIndex >= 0) {
                currentData[existingIndex] = sensorData
            } else {
                currentData.add(sensorData)
            }
            
            _sensorData.value = currentData
            println("📊 Sensor data updated: ${sensorData.sensorId}")
            
        } catch (e: Exception) {
            println("❌ Error handling sensor data: ${e.message}")
        }
    }
    
    /**
     * Handle equipment status updates
     */
    private fun handleEquipmentStatus(data: String) {
        try {
            val equipmentStatus = json.decodeFromString<EquipmentStatus>(data)
            val currentStatus = _equipmentStatus.value.toMutableList()
            
            // Update existing equipment status or add new
            val existingIndex = currentStatus.indexOfFirst { it.equipmentId == equipmentStatus.equipmentId }
            if (existingIndex >= 0) {
                currentStatus[existingIndex] = equipmentStatus
            } else {
                currentStatus.add(equipmentStatus)
            }
            
            _equipmentStatus.value = currentStatus
            println("🔧 Equipment status updated: ${equipmentStatus.name}")
            
        } catch (e: Exception) {
            println("❌ Error handling equipment status: ${e.message}")
        }
    }
    
    /**
     * Handle farm alerts
     */
    private fun handleFarmAlert(data: String) {
        try {
            val farmAlert = json.decodeFromString<FarmAlert>(data)
            val currentAlerts = _farmAlerts.value.toMutableList()
            
            // Add new alert
            currentAlerts.add(farmAlert)
            
            // Keep only recent alerts (last 100)
            if (currentAlerts.size > 100) {
                currentAlerts.removeAt(0)
            }
            
            _farmAlerts.value = currentAlerts
            println("🚨 Farm alert received: ${farmAlert.message}")
            
        } catch (e: Exception) {
            println("❌ Error handling farm alert: ${e.message}")
        }
    }
    
    /**
     * Handle heartbeat messages
     */
    private fun handleHeartbeat() {
        // Send heartbeat response
        CoroutineScope(Dispatchers.IO).launch {
            val heartbeat = WebSocketMessage(
                type = "heartbeat_response",
                data = "pong",
                timestamp = System.currentTimeMillis()
            )
            sendMessage(heartbeat)
        }
    }
}
