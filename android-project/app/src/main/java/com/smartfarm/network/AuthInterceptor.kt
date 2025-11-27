package com.smartfarm.network

import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.Preferences
import androidx.datastore.preferences.core.stringPreferencesKey
import dagger.hilt.android.qualifiers.ApplicationContext
import kotlinx.coroutines.flow.first
import kotlinx.coroutines.runBlocking
import okhttp3.Interceptor
import okhttp3.Response
import javax.inject.Inject
import javax.inject.Singleton

private val AUTH_TOKEN_KEY = stringPreferencesKey("auth_token")

@Singleton
class AuthInterceptor @Inject constructor(
    private val dataStore: DataStore<Preferences>
) : Interceptor {
    
    override fun intercept(chain: Interceptor.Chain): Response {
        val requestBuilder = chain.request().newBuilder()
        
        // Add auth token if available (using runBlocking for synchronous access)
        val token = runBlocking {
            dataStore.data.first()[AUTH_TOKEN_KEY]
        }
        token?.let {
            requestBuilder.addHeader("Authorization", "Bearer $it")
        }
        
        // Add common headers
        requestBuilder.addHeader("Content-Type", "application/json")
        requestBuilder.addHeader("Accept", "application/json")
        requestBuilder.addHeader("User-Agent", "SmartFarm-Mobile/1.0.0")
        
        val response = chain.proceed(requestBuilder.build())
        
        // Handle 401 Unauthorized - token expired
        if (response.code == 401) {
            // Token expired - the AuthRepository will handle refresh/logout
            // We just pass through the response
        }
        
        return response
    }
}

