package com.yourcompany.smartfarm.shared.services

import kotlinx.browser.window

/**
 * JavaScript-specific WebSocket implementation
 */
actual fun WebSocketService.createWebSocket(url: String, authToken: String?): dynamic {
    val wsUrl = if (authToken != null) "$url?token=$authToken" else url
    return window.WebSocket(wsUrl)
}

actual fun WebSocketService.setupWebSocketHandlers() {
    webSocket?.let { ws ->
        // Connection opened
        ws.onopen = {
            println("🔌 WebSocket connection opened")
            isConnected = true
            reconnectAttempts = 0
            _events.value = WebSocketEvent(WebSocketEventType.CONNECTED, "WebSocket connected")
        }
        
        // Message received
        ws.onmessage = { event ->
            val message = event.data as String
            handleMessage(message)
        }
        
        // Connection closed
        ws.onclose = { event ->
            println("🔌 WebSocket connection closed: ${event.code} - ${event.reason}")
            isConnected = false
            _events.value = WebSocketEvent(WebSocketEventType.DISCONNECTED, "WebSocket disconnected")
            
            // Attempt to reconnect if not intentionally closed
            if (event.code != 1000) {
                scheduleReconnect(url, null)
            }
        }
        
        // Connection error
        ws.onerror = { error ->
            println("❌ WebSocket error: $error")
            isConnected = false
            _events.value = WebSocketEvent(WebSocketEventType.ERROR, "WebSocket error: $error")
        }
    }
}
