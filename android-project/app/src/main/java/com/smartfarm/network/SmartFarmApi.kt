package com.smartfarm.network

import com.smartfarm.data.model.*
import retrofit2.Response
import retrofit2.http.*

/**
 * Retrofit API interface for SmartFarm backend
 * Mirrors the endpoints used by the web app at smartfarm-app.com
 */
interface SmartFarmApi {
    
    // ========== Authentication ==========
    @POST("/api/auth/login")
    suspend fun login(@Body request: LoginRequest): Response<LoginResponse>
    
    @POST("/api/auth/register")
    suspend fun register(@Body request: RegisterRequest): Response<RegisterResponse>
    
    @GET("/api/auth/profile")
    suspend fun getProfile(): Response<UserDto>
    
    @POST("/api/auth/refresh")
    suspend fun refreshToken(@Body request: RefreshTokenRequest): Response<LoginResponse>
    
    // ========== Farms ==========
    @GET("/api/farms")
    suspend fun getFarms(): Response<List<FarmDto>>
    
    @POST("/api/farms")
    suspend fun createFarm(@Body farm: FarmDto): Response<FarmDto>
    
    @PUT("/api/farms/{id}")
    suspend fun updateFarm(@Path("id") id: String, @Body farm: FarmDto): Response<FarmDto>
    
    @DELETE("/api/farms/{id}")
    suspend fun deleteFarm(@Path("id") id: String): Response<Unit>
    
    // ========== Livestock ==========
    @GET("/api/livestock")
    suspend fun getLivestock(@Query("farmId") farmId: String? = null): Response<List<LivestockDto>>
    
    @POST("/api/livestock")
    suspend fun createLivestock(@Body livestock: LivestockDto): Response<LivestockDto>
    
    @PUT("/api/livestock/{id}")
    suspend fun updateLivestock(@Path("id") id: String, @Body livestock: LivestockDto): Response<LivestockDto>
    
    @DELETE("/api/livestock/{id}")
    suspend fun deleteLivestock(@Path("id") id: String): Response<Unit>
    
    // ========== Crops ==========
    @GET("/api/crops")
    suspend fun getCrops(@Query("farmId") farmId: String? = null): Response<List<CropDto>>
    
    @POST("/api/crops")
    suspend fun createCrop(@Body crop: CropDto): Response<CropDto>
    
    @PUT("/api/crops/{id}")
    suspend fun updateCrop(@Path("id") id: String, @Body crop: CropDto): Response<CropDto>
    
    @DELETE("/api/crops/{id}")
    suspend fun deleteCrop(@Path("id") id: String): Response<Unit>
    
    // ========== Tasks ==========
    @GET("/api/tasks")
    suspend fun getTasks(@Query("farmId") farmId: String? = null): Response<List<TaskDto>>
    
    @POST("/api/tasks")
    suspend fun createTask(@Body task: TaskDto): Response<TaskDto>
    
    @PUT("/api/tasks/{id}")
    suspend fun updateTask(@Path("id") id: String, @Body task: TaskDto): Response<TaskDto>
    
    @DELETE("/api/tasks/{id}")
    suspend fun deleteTask(@Path("id") id: String): Response<Unit>
    
    // ========== Inventory ==========
    @GET("/api/inventory")
    suspend fun getInventory(@Query("farmId") farmId: String? = null): Response<List<InventoryItemDto>>
    
    @POST("/api/inventory")
    suspend fun createInventoryItem(@Body item: InventoryItemDto): Response<InventoryItemDto>
    
    @PUT("/api/inventory/{id}")
    suspend fun updateInventoryItem(@Path("id") id: String, @Body item: InventoryItemDto): Response<InventoryItemDto>
    
    @DELETE("/api/inventory/{id}")
    suspend fun deleteInventoryItem(@Path("id") id: String): Response<Unit>
    
    // ========== Financial Records ==========
    @GET("/api/financial")
    suspend fun getFinancialRecords(@Query("farmId") farmId: String? = null): Response<List<FinancialRecordDto>>
    
    @POST("/api/financial")
    suspend fun createFinancialRecord(@Body record: FinancialRecordDto): Response<FinancialRecordDto>
    
    @PUT("/api/financial/{id}")
    suspend fun updateFinancialRecord(@Path("id") id: String, @Body record: FinancialRecordDto): Response<FinancialRecordDto>
    
    @DELETE("/api/financial/{id}")
    suspend fun deleteFinancialRecord(@Path("id") id: String): Response<Unit>
    
    // ========== Analytics ==========
    @GET("/api/analytics")
    suspend fun getAnalytics(@Query("farmId") farmId: String? = null): Response<AnalyticsDto>
    
    // ========== Health Check ==========
    @GET("/api/health")
    suspend fun healthCheck(): Response<HealthResponse>
}

