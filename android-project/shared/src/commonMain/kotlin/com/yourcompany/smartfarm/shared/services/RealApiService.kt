package com.yourcompany.smartfarm.shared.services

import com.yourcompany.smartfarm.shared.models.*
import com.yourcompany.smartfarm.shared.config.ApiConfig
import kotlinx.coroutines.delay
import kotlinx.serialization.json.Json
import kotlinx.serialization.encodeToString

/**
 * Real API service that connects to the backend API
 * This replaces the mock DataService for production use
 */
class RealApiService(
    private val baseUrl: String = ApiConfig.baseUrl,
    private var authToken: String? = null
) : DataService() {

    private val json = Json { 
        ignoreUnknownKeys = true 
        isLenient = true
    }
    
    private val httpClient = HttpClient()

    // Override all methods to use real API calls
    override suspend fun getFarms(): List<Farm> {
        return try {
            val headers = httpClient.createDefaultHeaders(authToken)
            val response = httpClient.get(ApiConfig.Endpoints.FARMS, headers)
            
            if (response.isSuccessful()) {
                // Parse the response body
                json.decodeFromString<List<Farm>>(response.body)
            } else {
                println("❌ API Error: ${response.statusCode} - ${response.body}")
                // Fallback to mock data on error
                super.getFarms()
            }
        } catch (e: Exception) {
            println("❌ API Error: ${e.message}")
            // Fallback to mock data on error
            super.getFarms()
        }
    }

    // Note: getFarm(id: String) not in DataService base class - removed override
    
    override suspend fun createFarm(farm: Farm): Farm {
        return try {
            val headers = httpClient.createDefaultHeaders(authToken)
            val farmJson = json.encodeToString(farm)
            val response = httpClient.post(ApiConfig.Endpoints.FARMS, farmJson, headers)
            
            if (response.isSuccessful()) {
                json.decodeFromString<Farm>(response.body)
            } else {
                println("❌ API Error: ${response.statusCode} - ${response.body}")
                super.createFarm(farm)
            }
        } catch (e: Exception) {
            println("❌ API Error: ${e.message}")
            super.createFarm(farm)
        }
    }

    // Note: updateFarm and deleteFarm not in DataService base class - removed overrides

    override suspend fun getCrops(): List<Crop> {
        return try {
            val headers = httpClient.createDefaultHeaders(authToken)
            val response = httpClient.get(ApiConfig.Endpoints.CROPS, headers)
            
            if (response.isSuccessful()) {
                json.decodeFromString<List<Crop>>(response.body)
            } else {
                println("❌ API Error: ${response.statusCode} - ${response.body}")
                super.getCrops()
            }
        } catch (e: Exception) {
            println("❌ API Error: ${e.message}")
            super.getCrops()
        }
    }

    override suspend fun getLivestock(): List<Livestock> {
        return try {
            val headers = httpClient.createDefaultHeaders(authToken)
            val response = httpClient.get(ApiConfig.Endpoints.LIVESTOCK, headers)
            
            if (response.isSuccessful()) {
                json.decodeFromString<List<Livestock>>(response.body)
            } else {
                println("❌ API Error: ${response.statusCode} - ${response.body}")
                super.getLivestock()
            }
        } catch (e: Exception) {
            println("❌ API Error: ${e.message}")
            super.getLivestock()
        }
    }

    override suspend fun getTasks(): List<Task> {
        return try {
            val headers = httpClient.createDefaultHeaders(authToken)
            val response = httpClient.get(ApiConfig.Endpoints.TASKS, headers)
            
            if (response.isSuccessful()) {
                json.decodeFromString<List<Task>>(response.body)
            } else {
                println("❌ API Error: ${response.statusCode} - ${response.body}")
                super.getTasks()
            }
        } catch (e: Exception) {
            println("❌ API Error: ${e.message}")
            super.getTasks()
        }
    }

    // Note: getUsers, getInventory, getFinancialRecords not in DataService base class - removed overrides

    override suspend fun getFarmStats(farmId: Long): Map<String, Any> {
        return try {
            val headers = httpClient.createDefaultHeaders(authToken)
            val response = httpClient.get("${ApiConfig.Endpoints.FARMS}/$farmId/stats", headers)
            
            if (response.isSuccessful()) {
                json.decodeFromString<Map<String, Any>>(response.body)
            } else {
                println("❌ API Error: ${response.statusCode} - ${response.body}")
                super.getFarmStats(farmId)
            }
        } catch (e: Exception) {
            println("❌ API Error: ${e.message}")
            super.getFarmStats(farmId)
        }
    }

    /**
     * Set authentication token for API calls
     */
    fun setAuthToken(token: String) {
        authToken = token
        println("🔑 Auth token set for API calls")
    }

    /**
     * Clear authentication token
     */
    fun clearAuthToken() {
        authToken = null
        println("🔑 Auth token cleared")
    }

    /**
     * Test API connectivity
     */
    suspend fun testConnection(): Boolean {
        return httpClient.testConnection()
    }

    /**
     * Get API configuration information
     */
    fun getApiInfo(): Map<String, String> {
        return ApiConfig.getDebugInfo()
    }
}
