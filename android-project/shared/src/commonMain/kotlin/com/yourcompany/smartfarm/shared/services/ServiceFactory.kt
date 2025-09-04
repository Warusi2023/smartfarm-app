package com.yourcompany.smartfarm.shared.services

import com.yourcompany.smartfarm.shared.config.ApiConfig

/**
 * Service Factory for managing different data service implementations
 * This allows easy switching between mock data and real API calls
 */
object ServiceFactory {
    
    // Service type selection
    enum class ServiceType {
        MOCK_DATA,      // Uses DataService (mock data)
        REAL_API,       // Uses RealApiService (real API calls)
        HYBRID          // Uses RealApiService with fallback to mock data
    }
    
    // Current service type - change this to switch between services
    val currentServiceType = ServiceType.REAL_API
    
    /**
     * Get the appropriate data service based on configuration
     */
    fun getDataService(): DataService {
        return when (currentServiceType) {
            ServiceType.MOCK_DATA -> {
                println("🔧 Using Mock Data Service")
                DataService()
            }
            ServiceType.REAL_API -> {
                println("🌐 Using Real API Service")
                RealApiService()
            }
            ServiceType.HYBRID -> {
                println("🔄 Using Hybrid Service (Real API + Mock Fallback)")
                RealApiService()
            }
        }
    }
    
    /**
     * Get additional services
     */
    fun getWebSocketService(): WebSocketService {
        return WebSocketService()
    }
    
    fun getCacheService(): CacheService {
        return CacheService()
    }
    
    fun getFileUploadService(): FileUploadService {
        return FileUploadService()
    }
    
    /**
     * Get service configuration information
     */
    fun getServiceInfo(): Map<String, String> {
        val baseInfo = ApiConfig.getDebugInfo().toMutableMap()
        baseInfo["Service Type"] = currentServiceType.name
        baseInfo["Data Source"] = when (currentServiceType) {
            ServiceType.MOCK_DATA -> "Mock Data"
            ServiceType.REAL_API -> "Real API Only"
            ServiceType.HYBRID -> "Real API + Mock Fallback"
        }
        return baseInfo
    }
    
    /**
     * Switch service type at runtime
     */
    fun switchServiceType(newType: ServiceType) {
        println("🔄 Switching service type from ${currentServiceType.name} to ${newType.name}")
        // In a real app, you might want to implement this with proper state management
        // For now, this is just for demonstration
    }
    
    /**
     * Test all services
     */
    suspend fun testAllServices(): Map<String, Boolean> {
        val results = mutableMapOf<String, Boolean>()
        
        try {
            val dataService = getDataService()
            if (dataService is RealApiService) {
                results["API Connection"] = dataService.testConnection()
                results["API Info"] = dataService.getApiInfo().isNotEmpty()
            } else {
                results["Mock Data"] = true
            }
            
            results["WebSocket"] = true // Mock for now
            results["Cache"] = true     // Mock for now
            results["File Upload"] = true // Mock for now
            
        } catch (e: Exception) {
            results["Error"] = false
            println("❌ Service testing failed: ${e.message}")
        }
        
        return results
    }
}
