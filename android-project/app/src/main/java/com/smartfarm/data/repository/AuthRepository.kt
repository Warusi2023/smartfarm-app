package com.smartfarm.data.repository

import android.content.Context
import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.Preferences
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.stringPreferencesKey
import com.smartfarm.data.model.LoginRequest
import com.smartfarm.data.model.LoginResponse
import com.smartfarm.data.model.RegisterRequest
import com.smartfarm.data.model.RegisterResponse
import com.smartfarm.data.model.UserDto
import com.smartfarm.data.util.Resource
import com.smartfarm.network.SmartFarmApi
import dagger.hilt.android.qualifiers.ApplicationContext
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.flow.map
import javax.inject.Inject
import javax.inject.Singleton

private val AUTH_TOKEN_KEY = stringPreferencesKey("auth_token")
private val REFRESH_TOKEN_KEY = stringPreferencesKey("refresh_token")
private val USER_EMAIL_KEY = stringPreferencesKey("user_email")

@Singleton
class AuthRepository @Inject constructor(
    private val api: SmartFarmApi,
    private val dataStore: DataStore<Preferences>
) {
    
    suspend fun login(email: String, password: String): Resource<LoginResponse> {
        return try {
            val request = LoginRequest(email, password)
            val response = api.login(request)
            
            if (response.isSuccessful && response.body() != null) {
                val loginResponse = response.body()!!
                
                // Save tokens
                if (loginResponse.token != null) {
                    saveAuthToken(loginResponse.token)
                }
                if (loginResponse.user != null) {
                    saveUserEmail(loginResponse.user.email)
                }
                
                Resource.Success(loginResponse)
            } else {
                Resource.Error(Exception("Login failed: ${response.message()}"))
            }
        } catch (e: Exception) {
            Resource.Error(e)
        }
    }
    
    suspend fun register(request: RegisterRequest): Resource<RegisterResponse> {
        return try {
            val response = api.register(request)
            
            if (response.isSuccessful && response.body() != null) {
                val registerResponse = response.body()!!
                
                // Save tokens
                if (registerResponse.token != null) {
                    saveAuthToken(registerResponse.token)
                }
                if (registerResponse.user != null) {
                    saveUserEmail(registerResponse.user.email)
                }
                
                Resource.Success(registerResponse)
            } else {
                Resource.Error(Exception("Registration failed: ${response.message()}"))
            }
        } catch (e: Exception) {
            Resource.Error(e)
        }
    }
    
    suspend fun logout() {
        dataStore.edit { preferences ->
            preferences.remove(AUTH_TOKEN_KEY)
            preferences.remove(REFRESH_TOKEN_KEY)
            preferences.remove(USER_EMAIL_KEY)
        }
    }
    
    suspend fun getCurrentUser(): Resource<UserDto> {
        return try {
            val response = api.getProfile()
            if (response.isSuccessful && response.body() != null) {
                Resource.Success(response.body()!!)
            } else {
                // If unauthorized, clear tokens
                if (response.code() == 401) {
                    logout()
                }
                Resource.Error(Exception("Failed to get profile: ${response.message()}"))
            }
        } catch (e: Exception) {
            Resource.Error(e)
        }
    }
    
    fun isLoggedIn(): Flow<Boolean> {
        return dataStore.data.map { preferences ->
            preferences[AUTH_TOKEN_KEY] != null
        }
    }
    
    suspend fun getAuthToken(): String? {
        return dataStore.data.first()[AUTH_TOKEN_KEY]
    }
    
    private suspend fun saveAuthToken(token: String) {
        dataStore.edit { preferences ->
            preferences[AUTH_TOKEN_KEY] = token
        }
    }
    
    private suspend fun saveRefreshToken(token: String) {
        dataStore.edit { preferences ->
            preferences[REFRESH_TOKEN_KEY] = token
        }
    }
    
    private suspend fun saveUserEmail(email: String) {
        dataStore.edit { preferences ->
            preferences[USER_EMAIL_KEY] = email
        }
    }
    
    suspend fun refreshToken(): Resource<String> {
        return try {
            val refreshToken = dataStore.data.first()[REFRESH_TOKEN_KEY]
            if (refreshToken == null) {
                return Resource.Error(Exception("No refresh token available"))
            }
            
            val response = api.refreshToken(
                com.smartfarm.data.model.RefreshTokenRequest(refreshToken)
            )
            
            if (response.isSuccessful && response.body() != null) {
                val newToken = response.body()!!.token
                if (newToken != null) {
                    saveAuthToken(newToken)
                    Resource.Success(newToken)
                } else {
                    Resource.Error(Exception("No token in refresh response"))
                }
            } else {
                // If refresh fails, logout
                logout()
                Resource.Error(Exception("Token refresh failed: ${response.message()}"))
            }
        } catch (e: Exception) {
            logout()
            Resource.Error(e)
        }
    }
}

