package com.example.smartfarm.util

import android.content.Context
import android.content.pm.ApplicationInfo
import android.content.pm.PackageManager
import io.mockk.every
import io.mockk.mockk
import org.junit.Assert.*
import org.junit.Before
import org.junit.Test
import java.io.File
import java.io.FileInputStream
import java.io.FileOutputStream
import java.util.Properties

class ApiConfigManagerTest {
    
    private lateinit var mockContext: Context
    private lateinit var mockPackageManager: PackageManager
    private lateinit var mockApplicationInfo: ApplicationInfo
    
    @Before
    fun setUp() {
        mockPackageManager = mockk()
        mockApplicationInfo = mockk()
        mockContext = mockk {
            every { packageManager } returns mockPackageManager
            every { packageName } returns "com.example.smartfarm"
        }
    }
    
    @Test
    fun `validateGoogleMapsConfig should return CONFIGURED for valid API key`() {
        // Given
        val validApiKey = "AIzaSyValidApiKey12345678901234567890"
        mockApplicationInfo.metaData = android.os.Bundle().apply {
            putString("com.google.android.geo.API_KEY", validApiKey)
        }
        every { mockPackageManager.getApplicationInfo(any(), any()) } returns mockApplicationInfo
        
        // When
        val result = ApiConfigManager.validateGoogleMapsConfig(mockContext)
        
        // Then
        assertEquals(ApiConfigManager.ConfigStatus.CONFIGURED, result.status)
        assertTrue(result.isReadyForProduction)
    }
    
    @Test
    fun `validateGoogleMapsConfig should return PLACEHOLDER for placeholder API key`() {
        // Given
        val placeholderApiKey = "YOUR_MAPS_API_KEY"
        mockApplicationInfo.metaData = android.os.Bundle().apply {
            putString("com.google.android.geo.API_KEY", placeholderApiKey)
        }
        every { mockPackageManager.getApplicationInfo(any(), any()) } returns mockApplicationInfo
        
        // When
        val result = ApiConfigManager.validateGoogleMapsConfig(mockContext)
        
        // Then
        assertEquals(ApiConfigManager.ConfigStatus.PLACEHOLDER, result.status)
        assertFalse(result.isReadyForProduction)
    }
    
    @Test
    fun `validateGoogleMapsConfig should return MISSING for empty API key`() {
        // Given
        mockApplicationInfo.metaData = android.os.Bundle().apply {
            putString("com.google.android.geo.API_KEY", "")
        }
        every { mockPackageManager.getApplicationInfo(any(), any()) } returns mockApplicationInfo
        
        // When
        val result = ApiConfigManager.validateGoogleMapsConfig(mockContext)
        
        // Then
        assertEquals(ApiConfigManager.ConfigStatus.MISSING, result.status)
        assertFalse(result.isReadyForProduction)
    }
    
    @Test
    fun `validateGoogleMapsConfig should return INVALID for short API key`() {
        // Given
        val shortApiKey = "short"
        mockApplicationInfo.metaData = android.os.Bundle().apply {
            putString("com.google.android.geo.API_KEY", shortApiKey)
        }
        every { mockPackageManager.getApplicationInfo(any(), any()) } returns mockApplicationInfo
        
        // When
        val result = ApiConfigManager.validateGoogleMapsConfig(mockContext)
        
        // Then
        assertEquals(ApiConfigManager.ConfigStatus.INVALID, result.status)
        assertFalse(result.isReadyForProduction)
    }
    
    @Test
    fun `validateWeatherApiConfig should return CONFIGURED for valid API key`() {
        // Given
        val validApiKey = "valid_openweathermap_api_key_12345"
        createLocalPropertiesWithApiKey(validApiKey)
        
        // When
        val result = ApiConfigManager.validateWeatherApiConfig(mockContext)
        
        // Then
        assertEquals(ApiConfigManager.ConfigStatus.CONFIGURED, result.status)
        assertTrue(result.isReadyForProduction)
        
        // Cleanup
        cleanupLocalProperties()
    }
    
    @Test
    fun `validateWeatherApiConfig should return PLACEHOLDER for placeholder API key`() {
        // Given
        val placeholderApiKey = "your_openweathermap_api_key_here"
        createLocalPropertiesWithApiKey(placeholderApiKey)
        
        // When
        val result = ApiConfigManager.validateWeatherApiConfig(mockContext)
        
        // Then
        assertEquals(ApiConfigManager.ConfigStatus.PLACEHOLDER, result.status)
        assertFalse(result.isReadyForProduction)
        
        // Cleanup
        cleanupLocalProperties()
    }
    
    @Test
    fun `validateWeatherApiConfig should return MISSING for missing API key`() {
        // Given
        createLocalPropertiesWithoutApiKey()
        
        // When
        val result = ApiConfigManager.validateWeatherApiConfig(mockContext)
        
        // Then
        assertEquals(ApiConfigManager.ConfigStatus.MISSING, result.status)
        assertFalse(result.isReadyForProduction)
        
        // Cleanup
        cleanupLocalProperties()
    }
    
    @Test
    fun `validateGoogleServicesConfig should return CONFIGURED for valid configuration`() {
        // Given
        createValidGoogleServicesJson()
        
        // When
        val result = ApiConfigManager.validateGoogleServicesConfig(mockContext)
        
        // Then
        assertEquals(ApiConfigManager.ConfigStatus.CONFIGURED, result.status)
        assertTrue(result.isReadyForProduction)
        
        // Cleanup
        cleanupGoogleServicesJson()
    }
    
    @Test
    fun `validateGoogleServicesConfig should return MISSING for placeholder configuration`() {
        // Given
        createPlaceholderGoogleServicesJson()
        
        // When
        val result = ApiConfigManager.validateGoogleServicesConfig(mockContext)
        
        // Then
        assertEquals(ApiConfigManager.ConfigStatus.MISSING, result.status)
        assertFalse(result.isReadyForProduction)
        
        // Cleanup
        cleanupGoogleServicesJson()
    }
    
    @Test
    fun `isReadyForProduction should return true when all configurations are valid`() {
        // Given
        val validApiKey = "AIzaSyValidApiKey12345678901234567890"
        mockApplicationInfo.metaData = android.os.Bundle().apply {
            putString("com.google.android.geo.API_KEY", validApiKey)
        }
        every { mockPackageManager.getApplicationInfo(any(), any()) } returns mockApplicationInfo
        
        createLocalPropertiesWithApiKey("valid_weather_api_key")
        createValidGoogleServicesJson()
        
        // When
        val result = ApiConfigManager.isReadyForProduction(mockContext)
        
        // Then
        assertTrue(result)
        
        // Cleanup
        cleanupLocalProperties()
        cleanupGoogleServicesJson()
    }
    
    @Test
    fun `isReadyForProduction should return false when any configuration is invalid`() {
        // Given
        val placeholderApiKey = "YOUR_MAPS_API_KEY"
        mockApplicationInfo.metaData = android.os.Bundle().apply {
            putString("com.google.android.geo.API_KEY", placeholderApiKey)
        }
        every { mockPackageManager.getApplicationInfo(any(), any()) } returns mockApplicationInfo
        
        // When
        val result = ApiConfigManager.isReadyForProduction(mockContext)
        
        // Then
        assertFalse(result)
    }
    
    @Test
    fun `getConfigurationSummary should return correct summary`() {
        // Given
        val validApiKey = "AIzaSyValidApiKey12345678901234567890"
        mockApplicationInfo.metaData = android.os.Bundle().apply {
            putString("com.google.android.geo.API_KEY", validApiKey)
        }
        every { mockPackageManager.getApplicationInfo(any(), any()) } returns mockApplicationInfo
        
        // When
        val result = ApiConfigManager.getConfigurationSummary(mockContext)
        
        // Then
        assertTrue(result.contains("API Configuration Status"))
    }
    
    // Helper methods for creating test files
    private fun createLocalPropertiesWithApiKey(apiKey: String) {
        val properties = Properties()
        properties.setProperty("sdk.dir", "test_sdk_path")
        properties.setProperty("WEATHER_API_KEY", apiKey)
        
        val file = File("local.properties")
        properties.store(FileOutputStream(file), "Test properties")
    }
    
    private fun createLocalPropertiesWithoutApiKey() {
        val properties = Properties()
        properties.setProperty("sdk.dir", "test_sdk_path")
        
        val file = File("local.properties")
        properties.store(FileOutputStream(file), "Test properties")
    }
    
    private fun cleanupLocalProperties() {
        val file = File("local.properties")
        if (file.exists()) {
            file.delete()
        }
    }
    
    private fun createValidGoogleServicesJson() {
        val content = """
            {
              "project_info": {
                "project_number": "123456789012",
                "project_id": "smartfarm-production",
                "storage_bucket": "smartfarm-production.appspot.com"
              },
              "client": [
                {
                  "client_info": {
                    "mobilesdk_app_id": "1:123456789012:android:abcdef1234567890",
                    "android_client_info": {
                      "package_name": "com.example.smartfarm"
                    }
                  },
                  "oauth_client": [
                    {
                      "client_id": "123456789012-abcdefghijklmnop.apps.googleusercontent.com",
                      "client_type": 3
                    }
                  ],
                  "api_key": [
                    {
                      "current_key": "AIzaSyValidApiKey12345678901234567890"
                    }
                  ]
                }
              ]
            }
        """.trimIndent()
        
        val appDir = File("app")
        if (!appDir.exists()) {
            appDir.mkdirs()
        }
        
        val file = File("app/google-services.json")
        file.writeText(content)
    }
    
    private fun createPlaceholderGoogleServicesJson() {
        val content = """
            {
              "project_info": {
                "project_number": "123456789000",
                "project_id": "smartfarm-app",
                "storage_bucket": "smartfarm-app.appspot.com"
              },
              "client": [
                {
                  "client_info": {
                    "mobilesdk_app_id": "1:123456789000:android:abcdef1234567890",
                    "android_client_info": {
                      "package_name": "com.example.smartfarm"
                    }
                  },
                  "oauth_client": [
                    {
                      "client_id": "123456789000-abcdefghijklmnop.apps.googleusercontent.com",
                      "client_type": 3
                    }
                  ],
                  "api_key": [
                    {
                      "current_key": "AIzaSyYourApiKeyHere"
                    }
                  ]
                }
              ]
            }
        """.trimIndent()
        
        val appDir = File("app")
        if (!appDir.exists()) {
            appDir.mkdirs()
        }
        
        val file = File("app/google-services.json")
        file.writeText(content)
    }
    
    private fun cleanupGoogleServicesJson() {
        val file = File("app/google-services.json")
        if (file.exists()) {
            file.delete()
        }
    }
} 