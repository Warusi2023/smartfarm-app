package com.smartfarm.shared.network

import com.smartfarm.shared.data.model.dto.*
import com.smartfarm.shared.data.util.Resource
import io.github.aakira.napier.Napier
import io.ktor.client.*
import io.ktor.client.call.*
import io.ktor.client.request.*
import io.ktor.client.statement.*
import io.ktor.http.*
import kotlinx.serialization.json.Json
import kotlinx.serialization.encodeToString
import kotlinx.serialization.builtins.ListSerializer
import kotlinx.serialization.builtins.MapSerializer
import kotlinx.serialization.builtins.serializer
import kotlinx.serialization.serializer
import kotlinx.serialization.Serializable

/**
 * Ktor-based API client for SmartFarm backend
 */
class SmartFarmApi(
    private val client: HttpClient, 
    private val baseUrl: String,
    private val getAuthToken: () -> String?
) {
    private val json = Json {
        ignoreUnknownKeys = true
        isLenient = true
        encodeDefaults = false
    }
    
    // ========== Authentication ==========
    suspend fun login(request: LoginRequest): Resource<LoginResponse> {
        val url = "$baseUrl/api/auth/login"
        return try {
            Napier.i("LOGIN request url=$url email=${request.email}")
            val httpResponse = client.post(url) {
                contentType(ContentType.Application.Json)
                setBody(request)
            }
            val status = httpResponse.status.value
            val bodyText = httpResponse.bodyAsText()
            Napier.i("LOGIN response url=$url status=$status body=$bodyText")

            val parsed = json.decodeFromString(LoginResponse.serializer(), bodyText)
            val token = parsed.resolvedToken()
            val user = parsed.resolvedUser()
            if (status in 200..299 && parsed.success && token != null && user != null) {
                Resource.Success(parsed)
            } else {
                val message = parsed.resolvedMessage()
                    ?: "Login failed (HTTP $status)"
                Resource.Error(message, Exception("LOGIN_FAILED status=$status code=${parsed.code} body=$bodyText"))
            }
        } catch (e: Exception) {
            Napier.e("LOGIN exception url=$url: ${e.message}", e)
            Resource.Error(e.message ?: "Network error", e)
        }
    }
    
    private fun HttpRequestBuilder.addAuthHeader() {
        val token = getAuthToken()
        if (token != null) {
            header("Authorization", "Bearer $token")
        }
    }

    private suspend inline fun <reified T> getEnvelopedList(
        url: String,
        logTag: String = "LIST"
    ): Resource<List<T>> {
        return try {
            Napier.i("$logTag request url=$url")
            val httpResponse = client.get(url) {
                addAuthHeader()
            }
            val status = httpResponse.status.value
            val bodyText = httpResponse.bodyAsText()
            Napier.i("$logTag response url=$url status=$status body=${bodyText.take(800)}")

            val parsed = json.decodeFromString(
                ApiListResponse.serializer(serializer<T>()),
                bodyText
            )
            if (status in 200..299 && parsed.success) {
                Resource.Success(parsed.data ?: emptyList())
            } else {
                val message = parsed.resolvedMessage() ?: "Request failed (HTTP $status)"
                Resource.Error(
                    message,
                    Exception("${logTag}_FAILED status=$status code=${parsed.code} body=${bodyText.take(400)}")
                )
            }
        } catch (e: Exception) {
            Napier.e("$logTag exception url=$url: ${e.message}", e)
            Resource.Error(e.message ?: "Network error", e)
        }
    }

    private suspend inline fun <reified T> getEnvelopedItem(
        url: String,
        logTag: String = "ITEM"
    ): Resource<T> {
        return try {
            Napier.i("$logTag request url=$url")
            val httpResponse = client.get(url) {
                addAuthHeader()
            }
            val status = httpResponse.status.value
            val bodyText = httpResponse.bodyAsText()
            Napier.i("$logTag response url=$url status=$status body=${bodyText.take(800)}")

            val parsed = json.decodeFromString(
                ApiItemResponse.serializer(serializer<T>()),
                bodyText
            )
            val item = parsed.data
            if (status in 200..299 && parsed.success && item != null) {
                Resource.Success(item)
            } else {
                val message = parsed.resolvedMessage()
                    ?: if (item == null) "No data in response (HTTP $status)" else "Request failed (HTTP $status)"
                Resource.Error(
                    message,
                    Exception("${logTag}_FAILED status=$status code=${parsed.code} body=${bodyText.take(400)}")
                )
            }
        } catch (e: Exception) {
            Napier.e("$logTag exception url=$url: ${e.message}", e)
            Resource.Error(e.message ?: "Network error", e)
        }
    }

    private suspend inline fun <reified TReq, reified TRes> postEnvelopedItem(
        url: String,
        body: TReq,
        logTag: String = "CREATE"
    ): Resource<TRes> = sendEnvelopedItem(HttpMethod.Post, url, body, logTag)

    private suspend inline fun <reified TReq, reified TRes> putEnvelopedItem(
        url: String,
        body: TReq,
        logTag: String = "UPDATE"
    ): Resource<TRes> = sendEnvelopedItem(HttpMethod.Put, url, body, logTag)

    private suspend inline fun <reified TReq, reified TRes> patchEnvelopedItem(
        url: String,
        body: TReq,
        logTag: String = "UPDATE"
    ): Resource<TRes> = sendEnvelopedItem(HttpMethod.Patch, url, body, logTag)

    private suspend inline fun <reified TReq, reified TRes> sendEnvelopedItem(
        method: HttpMethod,
        url: String,
        body: TReq,
        logTag: String
    ): Resource<TRes> {
        return try {
            val requestJson = json.encodeToString(serializer<TReq>(), body)
            Napier.i("$logTag request method=${method.value} url=$url body=$requestJson")
            val httpResponse = client.request(url) {
                this.method = method
                contentType(ContentType.Application.Json)
                addAuthHeader()
                setBody(body)
            }
            val status = httpResponse.status.value
            val bodyText = httpResponse.bodyAsText()
            Napier.i("$logTag response url=$url status=$status body=${bodyText.take(800)}")

            val parsed = json.decodeFromString(
                ApiItemResponse.serializer(serializer<TRes>()),
                bodyText
            )
            val item = parsed.data
            if (status in 200..299 && parsed.success && item != null) {
                Resource.Success(item)
            } else {
                val message = parsed.resolvedMessage()
                    ?: if (item == null) "No data in response (HTTP $status)" else "Request failed (HTTP $status)"
                Resource.Error(
                    message,
                    Exception("${logTag}_FAILED status=$status code=${parsed.code} body=${bodyText.take(400)}")
                )
            }
        } catch (e: Exception) {
            Napier.e("$logTag exception url=$url: ${e.message}", e)
            Resource.Error(e.message ?: "Network error", e)
        }
    }

    /**
     * DELETE helpers: crop returns `{ success, data: { id } }`, livestock returns `{ success, message }` (no data).
     * Only require HTTP success + envelope success flag.
     */
    private suspend fun deleteEnveloped(
        url: String,
        logTag: String = "DELETE"
    ): Resource<Unit> {
        return try {
            Napier.i("$logTag request method=DELETE url=$url")
            val httpResponse = client.delete(url) {
                addAuthHeader()
            }
            val status = httpResponse.status.value
            val bodyText = httpResponse.bodyAsText()
            Napier.i("$logTag response url=$url status=$status body=${bodyText.take(800)}")

            if (bodyText.isBlank() && status in 200..299) {
                return Resource.Success(Unit)
            }

            val parsed = json.decodeFromString(
                ApiItemResponse.serializer(kotlinx.serialization.json.JsonElement.serializer()),
                bodyText
            )
            if (status in 200..299 && parsed.success) {
                Resource.Success(Unit)
            } else {
                val message = parsed.resolvedMessage() ?: "Request failed (HTTP $status)"
                Resource.Error(
                    message,
                    Exception("${logTag}_FAILED status=$status code=${parsed.code} body=${bodyText.take(400)}")
                )
            }
        } catch (e: Exception) {
            Napier.e("$logTag exception url=$url: ${e.message}", e)
            Resource.Error(e.message ?: "Network error", e)
        }
    }
    
    suspend fun register(request: RegisterRequest): Resource<RegisterResponse> {
        val url = "$baseUrl/api/auth/register"
        return try {
            Napier.i("REGISTER request url=$url email=${request.email}")
            val httpResponse = client.post(url) {
                contentType(ContentType.Application.Json)
                setBody(request)
            }
            val status = httpResponse.status.value
            val bodyText = httpResponse.bodyAsText()
            Napier.i("REGISTER response url=$url status=$status body=$bodyText")

            val parsed = json.decodeFromString(RegisterResponse.serializer(), bodyText)
            // Registration may succeed without an immediate session token (email verification).
            if (status in 200..299 && parsed.success) {
                Resource.Success(parsed)
            } else {
                val message = parsed.resolvedMessage()
                    ?: "Registration failed (HTTP $status)"
                Resource.Error(message, Exception("REGISTER_FAILED status=$status code=${parsed.code} body=$bodyText"))
            }
        } catch (e: Exception) {
            Napier.e("REGISTER exception url=$url: ${e.message}", e)
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
        return getEnvelopedList("$baseUrl/api/farms", "FARMS")
    }
    
    suspend fun createFarm(farm: FarmDto): Resource<FarmDto> {
        val location = farm.location?.trim().orEmpty()
        val area = farm.areaHectares
        val farmType = farm.farmType?.trim().orEmpty()
        if (farm.name.isBlank() || location.isEmpty() || area == null || area <= 0.0 || farmType.isEmpty()) {
            return Resource.Error(
                "name, location, positive areaHectares, and farmType are required",
                Exception("CREATE_FARM_INVALID_BODY")
            )
        }
        // Backend farms.create / web createFarm — do not send id/isActive/timestamps.
        val request = CreateFarmRequest(
            name = farm.name.trim(),
            location = location,
            areaHectares = area,
            farmType = farmType,
            description = farm.description,
            latitude = farm.latitude,
            longitude = farm.longitude
        )
        return postEnvelopedItem(
            url = "$baseUrl/api/farms",
            body = request,
            logTag = "CREATE_FARM"
        )
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
            Resource.Error(e.message ?: "Network error", e)
        }
    }
    
    // ========== Livestock ==========
    suspend fun getLivestock(farmId: String? = null): Resource<List<LivestockDto>> {
        val url = if (farmId != null) {
            "$baseUrl/api/livestock?farmId=$farmId"
        } else {
            "$baseUrl/api/livestock"
        }
        return getEnvelopedList(url, "LIVESTOCK")
    }
    
    suspend fun createLivestock(livestock: LivestockDto): Resource<LivestockDto> {
        val request = CreateLivestockRequest(
            type = livestock.type,
            name = livestock.name,
            breed = livestock.breed,
            age = livestock.age,
            weight = livestock.weight,
            healthStatus = livestock.healthStatus,
            location = livestock.location,
            notes = livestock.notes ?: livestock.description,
            photo = livestock.photo ?: livestock.photoUrl,
            sex = livestock.sex,
            birthDate = livestock.birthDate,
            purpose = livestock.purpose,
            value = livestock.value,
            tag = livestock.tag
        )
        return postEnvelopedItem(
            url = "$baseUrl/api/livestock",
            body = request,
            logTag = "CREATE_LIVESTOCK"
        )
    }
    
    suspend fun updateLivestock(id: String, livestock: LivestockDto): Resource<LivestockDto> {
        // encodeDefaults=false omits nulls; send "" so an explicit clear reaches the store.
        val request = UpdateLivestockRequest(
            type = livestock.type.takeIf { it.isNotBlank() },
            name = livestock.name.takeIf { it.isNotBlank() },
            breed = livestock.breed,
            age = livestock.age,
            weight = livestock.weight,
            healthStatus = livestock.healthStatus,
            location = livestock.location,
            notes = livestock.notes ?: livestock.description,
            photo = livestock.photo ?: livestock.photoUrl ?: "",
            sex = livestock.sex,
            birthDate = livestock.birthDate,
            purpose = livestock.purpose,
            value = livestock.value,
            tag = livestock.tag
        )
        return putEnvelopedItem(
            url = "$baseUrl/api/livestock/$id",
            body = request,
            logTag = "UPDATE_LIVESTOCK"
        )
    }
    
    suspend fun deleteLivestock(id: String): Resource<Unit> {
        return deleteEnveloped("$baseUrl/api/livestock/$id", "DELETE_LIVESTOCK")
    }
    
    // ========== Crops ==========
    suspend fun getCrops(farmId: String? = null): Resource<List<CropDto>> {
        val url = if (farmId != null) {
            "$baseUrl/api/crops?farmId=$farmId"
        } else {
            "$baseUrl/api/crops"
        }
        return getEnvelopedList(url, "CROPS")
    }
    
    suspend fun createCrop(crop: CropDto): Resource<CropDto> {
        // Align with web-project createCrop / dashboard addNewCropWithData fields.
        val request = CreateCropRequest(
            name = crop.name,
            type = crop.type,
            farmId = crop.farmId?.takeIf { it.isNotBlank() },
            plantedDate = crop.plantedDate,
            expectedHarvestDate = crop.expectedHarvestDate,
            area = crop.area,
            description = crop.description ?: crop.notes,
            variety = crop.variety,
            status = crop.status,
            notes = crop.notes
        )
        return postEnvelopedItem(
            url = "$baseUrl/api/crops",
            body = request,
            logTag = "CREATE_CROP"
        )
    }
    
    suspend fun updateCrop(id: String, crop: CropDto): Resource<CropDto> {
        val request = UpdateCropRequest(
            name = crop.name.takeIf { it.isNotBlank() },
            type = crop.type,
            farmId = crop.farmId?.takeIf { it.isNotBlank() },
            plantedDate = crop.plantedDate,
            expectedHarvestDate = crop.expectedHarvestDate,
            area = crop.area,
            description = crop.description ?: crop.notes,
            variety = crop.variety,
            status = crop.status,
            notes = crop.notes
        )
        return putEnvelopedItem(
            url = "$baseUrl/api/crops/$id",
            body = request,
            logTag = "UPDATE_CROP"
        )
    }
    
    suspend fun deleteCrop(id: String): Resource<Unit> {
        return deleteEnveloped("$baseUrl/api/crops/$id", "DELETE_CROP")
    }
    
    // ========== Tasks ==========
    // Backend mounts tasks under farm team routes: GET /api/farms/:farmId/tasks
    // (see backend/routes/farmTeam.js — there is no top-level /api/tasks).
    suspend fun getTasks(farmId: String? = null): Resource<List<TaskDto>> {
        if (!farmId.isNullOrBlank()) {
            return getEnvelopedList("$baseUrl/api/farms/$farmId/tasks", "TASKS")
        }

        // Tasks tab / dashboard call without a farmId — resolve farms then aggregate.
        return when (val farmsResult = getFarms()) {
            is Resource.Success -> {
                if (farmsResult.data.isEmpty()) {
                    Resource.Success(emptyList())
                } else {
                    val allTasks = mutableListOf<TaskDto>()
                    var firstError: Resource.Error? = null
                    for (farm in farmsResult.data) {
                        when (val tasksResult =
                            getEnvelopedList<TaskDto>("$baseUrl/api/farms/${farm.id}/tasks", "TASKS")
                        ) {
                            is Resource.Success -> allTasks.addAll(tasksResult.data)
                            is Resource.Error -> if (firstError == null) firstError = tasksResult
                            is Resource.Loading -> {}
                        }
                    }
                    if (allTasks.isEmpty() && firstError != null) {
                        firstError
                    } else {
                        Resource.Success(allTasks)
                    }
                }
            }
            is Resource.Error -> Resource.Error(farmsResult.message, farmsResult.throwable)
            is Resource.Loading -> Resource.Error("Unexpected loading state", Exception("Unexpected loading state"))
        }
    }
    
    suspend fun createTask(task: TaskDto): Resource<TaskDto> {
        val farmId = task.farmId.trim()
        if (farmId.isEmpty()) {
            return Resource.Error(
                "farmId is required to create a task",
                Exception("CREATE_TASK_MISSING_FARM_ID")
            )
        }
        // Backend: POST /api/farms/:farmId/tasks — farmId is path-only; status is server-assigned.
        val request = CreateTaskRequest(
            title = task.title,
            description = task.description,
            priority = normalizeTaskPriority(task.priority),
            assignedToUserId = task.assignedToUserId,
            dueAt = task.dueAt
        )
        return postEnvelopedItem(
            url = "$baseUrl/api/farms/$farmId/tasks",
            body = request,
            logTag = "CREATE_TASK"
        )
    }

    private fun normalizeTaskPriority(priority: String?): String? {
        if (priority.isNullOrBlank()) return null
        return when (priority.trim().lowercase()) {
            "low" -> "low"
            "medium" -> "medium"
            "high" -> "high"
            "urgent" -> "urgent"
            else -> priority.trim().lowercase()
        }
    }

    private fun normalizeTaskStatus(status: String?): String? {
        if (status.isNullOrBlank()) return null
        return when (status.trim().lowercase().replace('-', '_')) {
            "open", "pending" -> "open"
            "in_progress", "inprogress" -> "in_progress"
            "done", "completed", "complete" -> "done"
            "cancelled", "canceled" -> "cancelled"
            else -> status.trim().lowercase()
        }
    }

    /**
     * Backend: PATCH /api/farms/:farmId/tasks/:taskId (not PUT /api/tasks/:id).
     */
    suspend fun updateTask(id: String, task: TaskDto): Resource<TaskDto> {
        val farmId = task.farmId.trim()
        if (farmId.isEmpty()) {
            return Resource.Error(
                "farmId is required to update a task",
                Exception("UPDATE_TASK_MISSING_FARM_ID")
            )
        }
        val request = UpdateTaskRequest(
            title = task.title.takeIf { it.isNotBlank() },
            description = task.description,
            status = normalizeTaskStatus(task.status),
            priority = normalizeTaskPriority(task.priority),
            assignedToUserId = task.assignedToUserId,
            dueAt = task.dueAt
        )
        return patchEnvelopedItem(
            url = "$baseUrl/api/farms/$farmId/tasks/$id",
            body = request,
            logTag = "UPDATE_TASK"
        )
    }

    /**
     * Backend: POST /api/farms/:farmId/tasks/:taskId/complete
     * Sets status=done and records completion metadata.
     */
    suspend fun completeTask(farmId: String, taskId: String): Resource<TaskDto> {
        val resolvedFarmId = farmId.trim()
        if (resolvedFarmId.isEmpty() || taskId.isBlank()) {
            return Resource.Error(
                "farmId and taskId are required to complete a task",
                Exception("COMPLETE_TASK_MISSING_IDS")
            )
        }
        return postEnvelopedItem(
            url = "$baseUrl/api/farms/$resolvedFarmId/tasks/$taskId/complete",
            body = EmptyRequest(),
            logTag = "COMPLETE_TASK"
        )
    }

    /**
     * Backend has no DELETE /api/farms/:farmId/tasks/:taskId.
     * Soft-cancel via PATCH status=cancelled (farm-scoped).
     */
    suspend fun cancelTask(id: String, farmId: String? = null): Resource<TaskDto> {
        val resolvedFarmId = farmId?.trim().orEmpty()
        if (resolvedFarmId.isEmpty()) {
            return Resource.Error(
                "farmId is required to cancel a task (backend has no hard delete)",
                Exception("CANCEL_TASK_MISSING_FARM_ID")
            )
        }
        return patchEnvelopedItem(
            url = "$baseUrl/api/farms/$resolvedFarmId/tasks/$id",
            body = UpdateTaskRequest(status = "cancelled"),
            logTag = "CANCEL_TASK"
        )
    }

    /** @deprecated Prefer [cancelTask]; kept for repository compatibility. */
    suspend fun deleteTask(id: String, farmId: String? = null): Resource<Unit> {
        return when (val result = cancelTask(id, farmId)) {
            is Resource.Success -> Resource.Success(Unit)
            is Resource.Error -> Resource.Error(result.message, result.throwable)
            is Resource.Loading -> Resource.Error("Unexpected loading state", Exception("Unexpected loading state"))
        }
    }
    
    // ========== Inventory ==========
    suspend fun getInventory(farmId: String? = null): Resource<List<InventoryItemDto>> {
        val url = if (farmId != null) {
            "$baseUrl/api/inventory?farmId=$farmId"
        } else {
            "$baseUrl/api/inventory"
        }
        return getEnvelopedList(url, "INVENTORY")
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
            Resource.Error(e.message ?: "Network error", e)
        }
    }
    
    // ========== Financial Records ==========
    suspend fun getFinancialRecords(farmId: String? = null): Resource<List<FinancialRecordDto>> {
        val url = if (farmId != null) {
            "$baseUrl/api/financial?farmId=$farmId"
        } else {
            "$baseUrl/api/financial"
        }
        return getEnvelopedList(url, "FINANCIAL")
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
            Resource.Error(e.message ?: "Network error", e)
        }
    }
    
    // ========== Analytics ==========
    suspend fun getAnalytics(farmId: String? = null): Resource<AnalyticsDto> {
        val url = if (farmId != null) {
            "$baseUrl/api/analytics?farmId=$farmId"
        } else {
            "$baseUrl/api/analytics"
        }
        return getEnvelopedItem(url, "ANALYTICS")
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
    
    // ========== Weather Alerts ==========
    suspend fun getWeatherAlerts(farmId: String? = null, unreadOnly: Boolean = false, limit: Int = 50): Resource<List<WeatherAlertDto>> {
        return try {
            val params = mutableListOf<String>()
            if (farmId != null) params.add("farmId=$farmId")
            if (unreadOnly) params.add("unreadOnly=true")
            params.add("limit=$limit")
            
            val url = if (params.isNotEmpty()) {
                "$baseUrl/api/weather-alerts?${params.joinToString("&")}"
            } else {
                "$baseUrl/api/weather-alerts"
            }
            
            val response: WeatherAlertsResponse = client.get(url) {
                addAuthHeader()
            }.body()
            if (response.success) {
                Resource.Success(response.data)
            } else {
                Resource.Error(response.error ?: "Failed to fetch weather alerts", null)
            }
        } catch (e: Exception) {
            Resource.Error(e.message ?: "Network error", e)
        }
    }
    
    suspend fun getWeatherAlertStats(): Resource<WeatherAlertStatsDto> {
        return try {
            val response: WeatherAlertStatsResponse = client.get("$baseUrl/api/weather-alerts/stats") {
                addAuthHeader()
            }.body()
            if (response.success && response.data != null) {
                Resource.Success(response.data)
            } else {
                Resource.Error(response.error ?: "Failed to fetch alert stats", null)
            }
        } catch (e: Exception) {
            Resource.Error(e.message ?: "Network error", e)
        }
    }
    
    suspend fun getWeatherAlert(alertId: String): Resource<WeatherAlertDto> {
        return try {
            val response: WeatherAlertResponse = client.get("$baseUrl/api/weather-alerts/$alertId") {
                addAuthHeader()
            }.body()
            if (response.success && response.data != null) {
                Resource.Success(response.data)
            } else {
                Resource.Error(response.error ?: "Failed to fetch alert", null)
            }
        } catch (e: Exception) {
            Resource.Error(e.message ?: "Network error", e)
        }
    }
    
    suspend fun markAlertAsRead(alertId: String): Resource<WeatherAlertDto> {
        return try {
            val response: WeatherAlertResponse = client.patch("$baseUrl/api/weather-alerts/$alertId/read") {
                addAuthHeader()
            }.body()
            if (response.success && response.data != null) {
                Resource.Success(response.data)
            } else {
                Resource.Error(response.error ?: "Failed to mark alert as read", null)
            }
        } catch (e: Exception) {
            Resource.Error(e.message ?: "Network error", e)
        }
    }
    
    suspend fun dismissAlert(alertId: String): Resource<WeatherAlertDto> {
        return try {
            val response: WeatherAlertResponse = client.patch("$baseUrl/api/weather-alerts/$alertId/dismiss") {
                addAuthHeader()
            }.body()
            if (response.success && response.data != null) {
                Resource.Success(response.data)
            } else {
                Resource.Error(response.error ?: "Failed to dismiss alert", null)
            }
        } catch (e: Exception) {
            Resource.Error(e.message ?: "Network error", e)
        }
    }
    
    suspend fun markAlertActionTaken(alertId: String, actionNotes: String? = null): Resource<WeatherAlertDto> {
        return try {
            val response: WeatherAlertResponse = client.patch("$baseUrl/api/weather-alerts/$alertId/action") {
                contentType(ContentType.Application.Json)
                addAuthHeader()
                setBody(AlertActionRequest(actionNotes))
            }.body()
            if (response.success && response.data != null) {
                Resource.Success(response.data)
            } else {
                Resource.Error(response.error ?: "Failed to mark action taken", null)
            }
        } catch (e: Exception) {
            Resource.Error(e.message ?: "Network error", e)
        }
    }
    
    suspend fun getAlertPreferences(): Resource<AlertPreferencesDto> {
        return try {
            val response: AlertPreferencesResponse = client.get("$baseUrl/api/weather-alerts/preferences") {
                addAuthHeader()
            }.body()
            if (response.success && response.data != null) {
                Resource.Success(response.data)
            } else {
                Resource.Error(response.error ?: "Failed to fetch preferences", null)
            }
        } catch (e: Exception) {
            Resource.Error(e.message ?: "Network error", e)
        }
    }
    
    suspend fun updateAlertPreferences(preferences: AlertPreferencesDto): Resource<AlertPreferencesDto> {
        return try {
            val response: AlertPreferencesResponse = client.put("$baseUrl/api/weather-alerts/preferences") {
                contentType(ContentType.Application.Json)
                addAuthHeader()
                setBody(preferences)
            }.body()
            if (response.success && response.data != null) {
                Resource.Success(response.data)
            } else {
                Resource.Error(response.error ?: "Failed to update preferences", null)
            }
        } catch (e: Exception) {
            Resource.Error(e.message ?: "Network error", e)
        }
    }
    
    // ========== Biological Farming ==========
    suspend fun getBeneficialInsects(): Resource<List<BeneficialInsectDto>> {
        return try {
            val response: BeneficialInsectsResponse = client.get("$baseUrl/api/biological-farming/good-insects").body()
            if (response.success) {
                Resource.Success(response.data)
            } else {
                Resource.Error(response.error ?: "Failed to fetch beneficial insects", null)
            }
        } catch (e: Exception) {
            Resource.Error(e.message ?: "Network error", e)
        }
    }
    
    suspend fun getBeneficialInsect(id: Int): Resource<BeneficialInsectDto> {
        return try {
            val response: BeneficialInsectResponse = client.get("$baseUrl/api/biological-farming/good-insects/$id").body()
            if (response.success && response.data != null) {
                Resource.Success(response.data)
            } else {
                Resource.Error(response.error ?: "Failed to fetch beneficial insect", null)
            }
        } catch (e: Exception) {
            Resource.Error(e.message ?: "Network error", e)
        }
    }
    
    suspend fun getHarmfulPests(): Resource<List<HarmfulPestDto>> {
        return try {
            val response: HarmfulPestsResponse = client.get("$baseUrl/api/biological-farming/bad-insects").body()
            if (response.success) {
                Resource.Success(response.data)
            } else {
                Resource.Error(response.error ?: "Failed to fetch harmful pests", null)
            }
        } catch (e: Exception) {
            Resource.Error(e.message ?: "Network error", e)
        }
    }
    
    suspend fun getHarmfulPest(id: Int): Resource<HarmfulPestDto> {
        return try {
            val response: HarmfulPestResponse = client.get("$baseUrl/api/biological-farming/bad-insects/$id").body()
            if (response.success && response.data != null) {
                Resource.Success(response.data)
            } else {
                Resource.Error(response.error ?: "Failed to fetch harmful pest", null)
            }
        } catch (e: Exception) {
            Resource.Error(e.message ?: "Network error", e)
        }
    }
    
    suspend fun getCropGuides(): Resource<Map<String, CropGuideDto>> {
        return try {
            val response: CropGuidesResponse = client.get("$baseUrl/api/biological-farming/crop-guides").body()
            if (response.success) {
                Resource.Success(response.data)
            } else {
                Resource.Error(response.error ?: "Failed to fetch crop guides", null)
            }
        } catch (e: Exception) {
            Resource.Error(e.message ?: "Network error", e)
        }
    }
    
    suspend fun getCropGuide(cropName: String): Resource<CropGuideDto> {
        return try {
            val response: CropGuideResponse = client.get("$baseUrl/api/biological-farming/crop-guides/$cropName").body()
            if (response.success && response.data != null) {
                Resource.Success(response.data)
            } else {
                Resource.Error(response.error ?: "Failed to fetch crop guide", null)
            }
        } catch (e: Exception) {
            Resource.Error(e.message ?: "Network error", e)
        }
    }
    
    suspend fun matchBeneficialInsectsForPest(pestName: String): Resource<List<MatchingInsectDto>> {
        return try {
            val response: PestMatchResponse = client.get("$baseUrl/api/biological-farming/match/$pestName").body()
            if (response.success) {
                Resource.Success(response.matchingInsects)
            } else {
                Resource.Error(response.error ?: "Failed to match beneficial insects", null)
            }
        } catch (e: Exception) {
            Resource.Error(e.message ?: "Network error", e)
        }
    }
    
    suspend fun getCropRecommendations(cropName: String): Resource<CropRecommendationsResponse> {
        return try {
            val response: CropRecommendationsResponse = client.get("$baseUrl/api/biological-farming/recommendations/$cropName").body()
            if (response.success) {
                Resource.Success(response)
            } else {
                Resource.Error(response.error ?: "Failed to get crop recommendations", null)
            }
        } catch (e: Exception) {
            Resource.Error(e.message ?: "Network error", e)
        }
    }
}

// Response wrappers for API responses
@Serializable
data class WeatherAlertsResponse(
    val success: Boolean,
    val data: List<WeatherAlertDto> = emptyList(),
    val count: Int = 0,
    val error: String? = null
)

@Serializable
data class WeatherAlertStatsResponse(
    val success: Boolean,
    val data: WeatherAlertStatsDto? = null,
    val error: String? = null
)

@Serializable
data class WeatherAlertResponse(
    val success: Boolean,
    val data: WeatherAlertDto? = null,
    val error: String? = null
)

@Serializable
data class AlertPreferencesResponse(
    val success: Boolean,
    val data: AlertPreferencesDto? = null,
    val error: String? = null
)

