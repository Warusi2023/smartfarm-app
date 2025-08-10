package com.example.smartfarm.web.api

import kotlinx.serialization.Serializable

@Serializable
data class ApiConfig(
    val baseUrl: String = getApiBaseUrl(),
    val timeout: Long = 30000,
    val retryAttempts: Int = 3
)

object ApiEndpoints {
    // Base API URL
    const val BASE_URL = "https://smartfarm-api.herokuapp.com" // Production
    const val LOCAL_URL = "http://localhost:3000" // Development
    
    // Authentication
    const val LOGIN = "/api/auth/login"
    const val REGISTER = "/api/auth/register"
    const val LOGOUT = "/api/auth/logout"
    
    // Livestock Management
    const val LIVESTOCK = "/api/livestock"
    const val LIVESTOCK_BY_ID = "/api/livestock/{id}"
    
    // Crop Management
    const val CROPS = "/api/crops"
    const val CROPS_BY_ID = "/api/crops/{id}"
    
    // Weather
    const val WEATHER = "/api/weather"
    const val WEATHER_FORECAST = "/api/weather/forecast"
    
    // Inventory
    const val INVENTORY = "/api/inventory"
    const val INVENTORY_BY_ID = "/api/inventory/{id}"
    
    // Employees
    const val EMPLOYEES = "/api/employees"
    const val EMPLOYEES_BY_ID = "/api/employees/{id}"
    
    // Market Prices
    const val MARKET_PRICES = "/api/market-prices"
    
    // Documents
    const val DOCUMENTS = "/api/documents"
    const val DOCUMENTS_BY_ID = "/api/documents/{id}"
    
    // Financial
    const val FINANCIAL = "/api/financial"
    const val FINANCIAL_REPORTS = "/api/financial/reports"
    
    // Tasks
    const val TASKS = "/api/tasks"
    const val TASKS_BY_ID = "/api/tasks/{id}"
    
    // Reports
    const val REPORTS = "/api/reports"
    const val REPORTS_ANALYTICS = "/api/reports/analytics"
    
    // Expert Chat
    const val CHAT = "/api/chat"
    const val CHAT_HISTORY = "/api/chat/history"
    
    // Settings
    const val SETTINGS = "/api/settings"
    const val SETTINGS_PROFILE = "/api/settings/profile"
    
    // Health Check
    const val HEALTH = "/api/health"
}

fun getApiBaseUrl(): String {
    // Check if we're in production or development
    return when {
        js("typeof window !== 'undefined' && window.location.hostname !== 'localhost'") -> {
            ApiEndpoints.BASE_URL
        }
        else -> {
            ApiEndpoints.LOCAL_URL
        }
    }
}

object ApiHeaders {
    const val CONTENT_TYPE = "Content-Type"
    const val AUTHORIZATION = "Authorization"
    const val ACCEPT = "Accept"
    
    const val APPLICATION_JSON = "application/json"
    const val BEARER_PREFIX = "Bearer "
}

object ApiErrorCodes {
    const val UNAUTHORIZED = 401
    const val FORBIDDEN = 403
    const val NOT_FOUND = 404
    const val INTERNAL_SERVER_ERROR = 500
    const val BAD_REQUEST = 400
}

@Serializable
data class ApiResponse<T>(
    val success: Boolean,
    val data: T? = null,
    val message: String? = null,
    val error: String? = null,
    val timestamp: String? = null
)

@Serializable
data class PaginatedResponse<T>(
    val data: List<T>,
    val total: Int,
    val page: Int,
    val limit: Int,
    val totalPages: Int
) 