package com.smartfarm.shared.network

import com.smartfarm.shared.data.model.dto.*
import com.smartfarm.shared.data.util.Resource
import io.ktor.client.*
import io.ktor.client.call.*
import io.ktor.client.request.*
import io.ktor.http.*
import kotlinx.serialization.json.Json
import kotlinx.serialization.encodeToString
import kotlinx.serialization.builtins.ListSerializer
import kotlinx.serialization.builtins.MapSerializer
import kotlinx.serialization.builtins.serializer

/**
 * Ktor-based API client for SmartFarm backend
 */
class SmartFarmApi(
    private val client: HttpClient, 
    private val baseUrl: String,
    private val getAuthToken: () -> String?
) {
    
    // ========== Authentication ==========
    suspend fun login(request: LoginRequest): Resource<LoginResponse> {
        return try {
            val response: LoginResponse = client.post("$baseUrl/api/auth/login") {
                contentType(ContentType.Application.Json)
                setBody(request)
            }.body()
            Resource.Success(response)
        } catch (e: Exception) {
            Resource.Error(e.message ?: "Network error", e)
        }
    }
    
    private fun HttpRequestBuilder.addAuthHeader() {
        val token = getAuthToken()
        if (token != null) {
            header("Authorization", "Bearer $token")
        }
    }
    
    suspend fun register(request: RegisterRequest): Resource<RegisterResponse> {
        return try {
            val response: RegisterResponse = client.post("$baseUrl/api/auth/register") {
                contentType(ContentType.Application.Json)
                setBody(request)
            }.body()
            Resource.Success(response)
        } catch (e: Exception) {
            Resource.Error(e.message ?: "Network error", e)
        }
    }
    
    suspend fun getProfile(): Resource<UserDto> {
        return try {
            val response: UserDto = client.get("$baseUrl/api/auth/profile") {
                addAuthHeader()
            }.body()
            Resource.Success(response)
        } catch (e: Exception) {
            Resource.Error(e.message ?: "Network error", e)
        }
    }
    
    suspend fun refreshToken(request: RefreshTokenRequest): Resource<LoginResponse> {
        return try {
            val response: LoginResponse = client.post("$baseUrl/api/auth/refresh") {
                contentType(ContentType.Application.Json)
                setBody(request)
            }.body()
            Resource.Success(response)
        } catch (e: Exception) {
            Resource.Error(e.message ?: "Network error", e)
        }
    }
    
    // ========== Farms ==========
    suspend fun getFarms(): Resource<List<FarmDto>> {
        return try {
            val response: List<FarmDto> = client.get("$baseUrl/api/farms") {
                addAuthHeader()
            }.body()
            Resource.Success(response)
        } catch (e: Exception) {
            Resource.Error(e.message ?: "Network error", e)
        }
    }
    
    suspend fun createFarm(farm: FarmDto): Resource<FarmDto> {
        return try {
            val response: FarmDto = client.post("$baseUrl/api/farms") {
                contentType(ContentType.Application.Json)
                addAuthHeader()
                setBody(farm)
            }.body()
            Resource.Success(response)
        } catch (e: Exception) {
            Resource.Error(e.message ?: "Network error", e)
        }
    }
    
    suspend fun updateFarm(id: String, farm: FarmDto): Resource<FarmDto> {
        return try {
            val response: FarmDto = client.put("$baseUrl/api/farms/$id") {
                contentType(ContentType.Application.Json)
                addAuthHeader()
                setBody(farm)
            }.body()
            Resource.Success(response)
        } catch (e: Exception) {
            Resource.Error(e.message ?: "Network error", e)
        }
    }
    
    suspend fun deleteFarm(id: String): Resource<Unit> {
        return try {
            client.delete("$baseUrl/api/farms/$id") {
                addAuthHeader()
            }
            Resource.Success(Unit)
        } catch (e: Exception) {
            Resource.Error(e)
        }
    }
    
    // ========== Livestock ==========
    suspend fun getLivestock(farmId: String? = null): Resource<List<LivestockDto>> {
        return try {
            val url = if (farmId != null) {
                "$baseUrl/api/livestock?farmId=$farmId"
            } else {
                "$baseUrl/api/livestock"
            }
            val response: List<LivestockDto> = client.get(url) {
                addAuthHeader()
            }.body()
            Resource.Success(response)
        } catch (e: Exception) {
            Resource.Error(e.message ?: "Network error", e)
        }
    }
    
    suspend fun createLivestock(livestock: LivestockDto): Resource<LivestockDto> {
        return try {
            val response: LivestockDto = client.post("$baseUrl/api/livestock") {
                contentType(ContentType.Application.Json)
                addAuthHeader()
                setBody(livestock)
            }.body()
            Resource.Success(response)
        } catch (e: Exception) {
            Resource.Error(e.message ?: "Network error", e)
        }
    }
    
    suspend fun updateLivestock(id: String, livestock: LivestockDto): Resource<LivestockDto> {
        return try {
            val response: LivestockDto = client.put("$baseUrl/api/livestock/$id") {
                contentType(ContentType.Application.Json)
                addAuthHeader()
                setBody(livestock)
            }.body()
            Resource.Success(response)
        } catch (e: Exception) {
            Resource.Error(e.message ?: "Network error", e)
        }
    }
    
    suspend fun deleteLivestock(id: String): Resource<Unit> {
        return try {
            client.delete("$baseUrl/api/livestock/$id") {
                addAuthHeader()
            }
            Resource.Success(Unit)
        } catch (e: Exception) {
            Resource.Error(e)
        }
    }
    
    // ========== Crops ==========
    suspend fun getCrops(farmId: String? = null): Resource<List<CropDto>> {
        return try {
            val url = if (farmId != null) {
                "$baseUrl/api/crops?farmId=$farmId"
            } else {
                "$baseUrl/api/crops"
            }
            val response: List<CropDto> = client.get(url) {
                addAuthHeader()
            }.body()
            Resource.Success(response)
        } catch (e: Exception) {
            Resource.Error(e.message ?: "Network error", e)
        }
    }
    
    suspend fun createCrop(crop: CropDto): Resource<CropDto> {
        return try {
            val response: CropDto = client.post("$baseUrl/api/crops") {
                contentType(ContentType.Application.Json)
                addAuthHeader()
                setBody(crop)
            }.body()
            Resource.Success(response)
        } catch (e: Exception) {
            Resource.Error(e.message ?: "Network error", e)
        }
    }
    
    suspend fun updateCrop(id: String, crop: CropDto): Resource<CropDto> {
        return try {
            val response: CropDto = client.put("$baseUrl/api/crops/$id") {
                contentType(ContentType.Application.Json)
                addAuthHeader()
                setBody(crop)
            }.body()
            Resource.Success(response)
        } catch (e: Exception) {
            Resource.Error(e.message ?: "Network error", e)
        }
    }
    
    suspend fun deleteCrop(id: String): Resource<Unit> {
        return try {
            client.delete("$baseUrl/api/crops/$id") {
                addAuthHeader()
            }
            Resource.Success(Unit)
        } catch (e: Exception) {
            Resource.Error(e)
        }
    }
    
    // ========== Tasks ==========
    suspend fun getTasks(farmId: String? = null): Resource<List<TaskDto>> {
        return try {
            val url = if (farmId != null) {
                "$baseUrl/api/tasks?farmId=$farmId"
            } else {
                "$baseUrl/api/tasks"
            }
            val response: List<TaskDto> = client.get(url) {
                addAuthHeader()
            }.body()
            Resource.Success(response)
        } catch (e: Exception) {
            Resource.Error(e.message ?: "Network error", e)
        }
    }
    
    suspend fun createTask(task: TaskDto): Resource<TaskDto> {
        return try {
            val response: TaskDto = client.post("$baseUrl/api/tasks") {
                contentType(ContentType.Application.Json)
                addAuthHeader()
                setBody(task)
            }.body()
            Resource.Success(response)
        } catch (e: Exception) {
            Resource.Error(e.message ?: "Network error", e)
        }
    }
    
    suspend fun updateTask(id: String, task: TaskDto): Resource<TaskDto> {
        return try {
            val response: TaskDto = client.put("$baseUrl/api/tasks/$id") {
                contentType(ContentType.Application.Json)
                addAuthHeader()
                setBody(task)
            }.body()
            Resource.Success(response)
        } catch (e: Exception) {
            Resource.Error(e.message ?: "Network error", e)
        }
    }
    
    suspend fun deleteTask(id: String): Resource<Unit> {
        return try {
            client.delete("$baseUrl/api/tasks/$id") {
                addAuthHeader()
            }
            Resource.Success(Unit)
        } catch (e: Exception) {
            Resource.Error(e)
        }
    }
    
    // ========== Inventory ==========
    suspend fun getInventory(farmId: String? = null): Resource<List<InventoryItemDto>> {
        return try {
            val url = if (farmId != null) {
                "$baseUrl/api/inventory?farmId=$farmId"
            } else {
                "$baseUrl/api/inventory"
            }
            val response: List<InventoryItemDto> = client.get(url) {
                addAuthHeader()
            }.body()
            Resource.Success(response)
        } catch (e: Exception) {
            Resource.Error(e.message ?: "Network error", e)
        }
    }
    
    suspend fun createInventoryItem(item: InventoryItemDto): Resource<InventoryItemDto> {
        return try {
            val response: InventoryItemDto = client.post("$baseUrl/api/inventory") {
                contentType(ContentType.Application.Json)
                addAuthHeader()
                setBody(item)
            }.body()
            Resource.Success(response)
        } catch (e: Exception) {
            Resource.Error(e.message ?: "Network error", e)
        }
    }
    
    suspend fun updateInventoryItem(id: String, item: InventoryItemDto): Resource<InventoryItemDto> {
        return try {
            val response: InventoryItemDto = client.put("$baseUrl/api/inventory/$id") {
                contentType(ContentType.Application.Json)
                addAuthHeader()
                setBody(item)
            }.body()
            Resource.Success(response)
        } catch (e: Exception) {
            Resource.Error(e.message ?: "Network error", e)
        }
    }
    
    suspend fun deleteInventoryItem(id: String): Resource<Unit> {
        return try {
            client.delete("$baseUrl/api/inventory/$id") {
                addAuthHeader()
            }
            Resource.Success(Unit)
        } catch (e: Exception) {
            Resource.Error(e)
        }
    }
    
    // ========== Financial Records ==========
    suspend fun getFinancialRecords(farmId: String? = null): Resource<List<FinancialRecordDto>> {
        return try {
            val url = if (farmId != null) {
                "$baseUrl/api/financial?farmId=$farmId"
            } else {
                "$baseUrl/api/financial"
            }
            val response: List<FinancialRecordDto> = client.get(url) {
                addAuthHeader()
            }.body()
            Resource.Success(response)
        } catch (e: Exception) {
            Resource.Error(e.message ?: "Network error", e)
        }
    }
    
    suspend fun createFinancialRecord(record: FinancialRecordDto): Resource<FinancialRecordDto> {
        return try {
            val response: FinancialRecordDto = client.post("$baseUrl/api/financial") {
                contentType(ContentType.Application.Json)
                addAuthHeader()
                setBody(record)
            }.body()
            Resource.Success(response)
        } catch (e: Exception) {
            Resource.Error(e.message ?: "Network error", e)
        }
    }
    
    suspend fun updateFinancialRecord(id: String, record: FinancialRecordDto): Resource<FinancialRecordDto> {
        return try {
            val response: FinancialRecordDto = client.put("$baseUrl/api/financial/$id") {
                contentType(ContentType.Application.Json)
                addAuthHeader()
                setBody(record)
            }.body()
            Resource.Success(response)
        } catch (e: Exception) {
            Resource.Error(e.message ?: "Network error", e)
        }
    }
    
    suspend fun deleteFinancialRecord(id: String): Resource<Unit> {
        return try {
            client.delete("$baseUrl/api/financial/$id") {
                addAuthHeader()
            }
            Resource.Success(Unit)
        } catch (e: Exception) {
            Resource.Error(e)
        }
    }
    
    // ========== Analytics ==========
    suspend fun getAnalytics(farmId: String? = null): Resource<AnalyticsDto> {
        return try {
            val url = if (farmId != null) {
                "$baseUrl/api/analytics?farmId=$farmId"
            } else {
                "$baseUrl/api/analytics"
            }
            val response: AnalyticsDto = client.get(url) {
                addAuthHeader()
            }.body()
            Resource.Success(response)
        } catch (e: Exception) {
            Resource.Error(e.message ?: "Network error", e)
        }
    }
    
    // ========== Health Check ==========
    suspend fun healthCheck(): Resource<HealthResponse> {
        return try {
            val response: HealthResponse = client.get("$baseUrl/api/health").body()
            Resource.Success(response)
        } catch (e: Exception) {
            Resource.Error(e.message ?: "Network error", e)
        }
    }
    
    // ========== Daily Tips ==========
    suspend fun getDailyTip(): Resource<DailyTipDto> {
        return try {
            val response: DailyTipResponse = client.get("$baseUrl/api/daily-tips/today").body()
            if (response.success) {
                Resource.Success(response.tip)
            } else {
                Resource.Error(response.error ?: "Failed to fetch daily tip", null)
            }
        } catch (e: Exception) {
            Resource.Error(e.message ?: "Network error", e)
        }
    }
    
    suspend fun getPersonalizedTip(crops: List<CropDto>, livestock: List<LivestockDto>): Resource<DailyTipDto> {
        return try {
            // Build simplified data for backend
            val cropsData = crops.map { mapOf(
                "name" to it.name,
                "variety" to (it.variety ?: ""),
                "status" to (it.status ?: "")
            ) }
            val livestockData = livestock.map { mapOf(
                "type" to (it.type ?: ""),
                "breed" to (it.breed ?: "")
            ) }
            
            val cropsJson = Json.encodeToString(ListSerializer(MapSerializer(String.serializer(), String.serializer())), cropsData)
            val livestockJson = Json.encodeToString(ListSerializer(MapSerializer(String.serializer(), String.serializer())), livestockData)
            
            val url = "$baseUrl/api/daily-tips/personalized?crops=${java.net.URLEncoder.encode(cropsJson, "UTF-8")}&livestock=${java.net.URLEncoder.encode(livestockJson, "UTF-8")}"
            val response: DailyTipResponse = client.get(url) {
                addAuthHeader()
            }.body()
            if (response.success) {
                Resource.Success(response.tip)
            } else {
                Resource.Error(response.error ?: "Failed to fetch personalized tip", null)
            }
        } catch (e: Exception) {
            Resource.Error(e.message ?: "Network error", e)
        }
    }
}

