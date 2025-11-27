package com.smartfarm.shared.data.repository

import com.smartfarm.shared.data.model.dto.*
import com.smartfarm.shared.data.preferences.AppPreferences
import com.smartfarm.shared.data.preferences.PreferencesStorage
import com.smartfarm.shared.data.util.Resource
import com.smartfarm.shared.network.SmartFarmApi
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.asStateFlow

/**
 * Shared authentication repository
 */
class AuthRepository(
    private val api: SmartFarmApi,
    private val preferences: PreferencesStorage
) {
    private val _isLoggedIn = MutableStateFlow(preferences.getString(AppPreferences.ACCESS_TOKEN) != null)
    val isLoggedIn: Flow<Boolean> = _isLoggedIn.asStateFlow()
    
    suspend fun login(email: String, password: String): Resource<LoginResponse> {
        val result = api.login(LoginRequest(email, password))
        return when (result) {
            is Resource.Success -> {
                val response = result.data
                if (response.success && response.token != null && response.user != null) {
                    saveAuthData(response.token, response.user)
                    _isLoggedIn.value = true
                }
                result
            }
            is Resource.Error -> result
            is Resource.Loading -> result
        }
    }
    
    suspend fun register(request: RegisterRequest): Resource<RegisterResponse> {
        val result = api.register(request)
        return when (result) {
            is Resource.Success -> {
                val response = result.data
                if (response.success && response.token != null && response.user != null) {
                    saveAuthData(response.token, response.user)
                    _isLoggedIn.value = true
                }
                result
            }
            is Resource.Error -> result
            is Resource.Loading -> result
        }
    }
    
    suspend fun logout() {
        preferences.remove(AppPreferences.ACCESS_TOKEN)
        preferences.remove(AppPreferences.REFRESH_TOKEN)
        preferences.remove(AppPreferences.USER_ID)
        preferences.remove(AppPreferences.USER_EMAIL)
        preferences.remove(AppPreferences.USER_FIRST_NAME)
        preferences.remove(AppPreferences.USER_LAST_NAME)
        preferences.remove(AppPreferences.USER_ROLE)
        preferences.remove(AppPreferences.USER_FARM_ID)
        _isLoggedIn.value = false
    }
    
    fun getAccessToken(): String? {
        return preferences.getString(AppPreferences.ACCESS_TOKEN)
    }
    
    fun getRefreshToken(): String? {
        return preferences.getString(AppPreferences.REFRESH_TOKEN) ?: ""
    }
    
    suspend fun refreshToken(): Resource<String> {
        val refreshToken = getRefreshToken()
        if (refreshToken.isEmpty()) {
            return Resource.Error(Exception("No refresh token available"))
        }
        
        val result = api.refreshToken(RefreshTokenRequest(refreshToken))
        return when (result) {
            is Resource.Success -> {
                val newToken = result.data.token
                if (newToken != null) {
                    preferences.putString(AppPreferences.ACCESS_TOKEN, newToken)
                    Resource.Success(newToken)
                } else {
                    Resource.Error(Exception("No token in refresh response"))
                }
            }
            is Resource.Error -> Resource.Error(result.exception)
            is Resource.Loading -> Resource.Error(Exception("Unexpected loading state"))
        }
    }
    
    suspend fun getCurrentUser(): Resource<UserDto> {
        val userId = preferences.getString(AppPreferences.USER_ID)
        val email = preferences.getString(AppPreferences.USER_EMAIL)
        val firstName = preferences.getString(AppPreferences.USER_FIRST_NAME)
        val lastName = preferences.getString(AppPreferences.USER_LAST_NAME)
        val role = preferences.getString(AppPreferences.USER_ROLE)
        val farmId = preferences.getString(AppPreferences.USER_FARM_ID)
        
        if (userId != null && email != null && firstName != null && lastName != null && role != null) {
            return Resource.Success(UserDto(userId, email, firstName, lastName, role, farmId))
        }
        
        // Try to fetch from API
        val result = api.getProfile()
        return when (result) {
            is Resource.Success -> {
                saveUserProfile(result.data)
                result
            }
            is Resource.Error -> result
            is Resource.Loading -> result
        }
    }
    
    private fun saveAuthData(token: String, user: UserDto) {
        preferences.putString(AppPreferences.ACCESS_TOKEN, token)
        preferences.putString(AppPreferences.USER_ID, user.id)
        preferences.putString(AppPreferences.USER_EMAIL, user.email)
        preferences.putString(AppPreferences.USER_FIRST_NAME, user.firstName)
        preferences.putString(AppPreferences.USER_LAST_NAME, user.lastName)
        preferences.putString(AppPreferences.USER_ROLE, user.role)
        user.farmId?.let { preferences.putString(AppPreferences.USER_FARM_ID, it) }
    }
    
    private fun saveUserProfile(user: UserDto) {
        preferences.putString(AppPreferences.USER_ID, user.id)
        preferences.putString(AppPreferences.USER_EMAIL, user.email)
        preferences.putString(AppPreferences.USER_FIRST_NAME, user.firstName)
        preferences.putString(AppPreferences.USER_LAST_NAME, user.lastName)
        preferences.putString(AppPreferences.USER_ROLE, user.role)
        user.farmId?.let { preferences.putString(AppPreferences.USER_FARM_ID, it) }
    }
}

