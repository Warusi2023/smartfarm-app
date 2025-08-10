package com.example.smartfarm.util

import android.content.Context
import android.content.pm.PackageManager
import android.util.Log
import java.io.IOException
import java.security.MessageDigest
import java.security.NoSuchAlgorithmException

/**
 * Utility class for managing API keys and configuration
 */
object ApiConfigManager {
    
    private const val TAG = "ApiConfigManager"
    
    /**
     * API key configuration status
     */
    enum class ConfigStatus {
        CONFIGURED,
        MISSING,
        INVALID,
        PLACEHOLDER
    }
    
    /**
     * Configuration validation result
     */
    data class ConfigValidation(
        val status: ConfigStatus,
        val message: String,
        val isReadyForProduction: Boolean
    )
    
    /**
     * Validates all API configurations
     */
    fun validateAllConfigurations(context: Context): Map<String, ConfigValidation> {
        return mapOf(
            "Google Maps" to validateGoogleMapsConfig(context),
            "Weather API" to validateWeatherApiConfig(context),
            "Google Services" to validateGoogleServicesConfig(context),
            "Google Calendar" to validateGoogleCalendarConfig(context)
        )
    }
    
    /**
     * Validates Google Maps API configuration
     */
    fun validateGoogleMapsConfig(context: Context): ConfigValidation {
        return try {
            val apiKey = getGoogleMapsApiKey(context)
            when {
                apiKey.isBlank() -> ConfigValidation(
                    ConfigStatus.MISSING,
                    "Google Maps API key is missing",
                    false
                )
                apiKey == "YOUR_MAPS_API_KEY" -> ConfigValidation(
                    ConfigStatus.PLACEHOLDER,
                    "Google Maps API key is still a placeholder",
                    false
                )
                apiKey.length < 20 -> ConfigValidation(
                    ConfigStatus.INVALID,
                    "Google Maps API key appears to be invalid (too short)",
                    false
                )
                else -> ConfigValidation(
                    ConfigStatus.CONFIGURED,
                    "Google Maps API key is configured",
                    true
                )
            }
        } catch (e: Exception) {
            ConfigValidation(
                ConfigStatus.INVALID,
                "Error validating Google Maps config: ${e.message}",
                false
            )
        }
    }
    
    /**
     * Validates Weather API configuration
     */
    fun validateWeatherApiConfig(context: Context): ConfigValidation {
        return try {
            val apiKey = getWeatherApiKey()
            when {
                apiKey.isBlank() -> ConfigValidation(
                    ConfigStatus.MISSING,
                    "Weather API key is missing from local.properties",
                    false
                )
                apiKey == "your_openweathermap_api_key_here" -> ConfigValidation(
                    ConfigStatus.PLACEHOLDER,
                    "Weather API key is still a placeholder",
                    false
                )
                apiKey.length < 20 -> ConfigValidation(
                    ConfigStatus.INVALID,
                    "Weather API key appears to be invalid (too short)",
                    false
                )
                else -> ConfigValidation(
                    ConfigStatus.CONFIGURED,
                    "Weather API key is configured",
                    true
                )
            }
        } catch (e: Exception) {
            ConfigValidation(
                ConfigStatus.INVALID,
                "Error validating Weather API config: ${e.message}",
                false
            )
        }
    }
    
    /**
     * Validates Google Services configuration
     */
    fun validateGoogleServicesConfig(context: Context): ConfigValidation {
        return try {
            if (!isGoogleServicesConfigured()) {
                ConfigValidation(
                    ConfigStatus.MISSING,
                    "google-services.json is missing or invalid",
                    false
                )
            } else {
                ConfigValidation(
                    ConfigStatus.CONFIGURED,
                    "Google Services configuration is valid",
                    true
                )
            }
        } catch (e: Exception) {
            ConfigValidation(
                ConfigStatus.INVALID,
                "Error validating Google Services config: ${e.message}",
                false
            )
        }
    }
    
    /**
     * Validates Google Calendar configuration
     */
    fun validateGoogleCalendarConfig(context: Context): ConfigValidation {
        return try {
            // Check if Google Calendar API is enabled in google-services.json
            if (isGoogleServicesConfigured()) {
                ConfigValidation(
                    ConfigStatus.CONFIGURED,
                    "Google Calendar configuration appears valid",
                    true
                )
            } else {
                ConfigValidation(
                    ConfigStatus.MISSING,
                    "Google Services not configured for Calendar integration",
                    false
                )
            }
        } catch (e: Exception) {
            ConfigValidation(
                ConfigStatus.INVALID,
                "Error validating Google Calendar config: ${e.message}",
                false
            )
        }
    }
    
    /**
     * Gets Google Maps API key from AndroidManifest.xml
     */
    private fun getGoogleMapsApiKey(context: Context): String {
        return try {
            val appInfo = context.packageManager.getApplicationInfo(
                context.packageName,
                PackageManager.GET_META_DATA
            )
            appInfo.metaData?.getString("com.google.android.geo.API_KEY") ?: ""
        } catch (e: Exception) {
            Log.e(TAG, "Error getting Google Maps API key", e)
            ""
        }
    }
    
    /**
     * Gets Weather API key from local.properties
     */
    private fun getWeatherApiKey(): String {
        return try {
            val properties = java.util.Properties()
            val localPropertiesFile = java.io.File("local.properties")
            if (localPropertiesFile.exists()) {
                properties.load(java.io.FileInputStream(localPropertiesFile))
                properties.getProperty("WEATHER_API_KEY", "")
            } else {
                ""
            }
        } catch (e: IOException) {
            Log.e(TAG, "Error reading local.properties", e)
            ""
        }
    }
    
    /**
     * Checks if Google Services is properly configured
     */
    private fun isGoogleServicesConfigured(): Boolean {
        return try {
            val googleServicesFile = java.io.File("app/google-services.json")
            if (!googleServicesFile.exists()) {
                return false
            }
            
            // Check if the file contains placeholder values
            val content = googleServicesFile.readText()
            !content.contains("YOUR_MAPS_API_KEY") && 
            !content.contains("123456789000") &&
            !content.contains("smartfarm-app")
        } catch (e: Exception) {
            Log.e(TAG, "Error checking Google Services configuration", e)
            false
        }
    }
    
    /**
     * Gets app's SHA-1 fingerprint for API key restrictions
     */
    fun getAppSha1Fingerprint(context: Context): String? {
        return try {
            val packageInfo = context.packageManager.getPackageInfo(
                context.packageName,
                PackageManager.GET_SIGNATURES
            )
            
            val signatures = packageInfo.signatures
            if (signatures.isNotEmpty()) {
                val signature = signatures[0]
                val md = MessageDigest.getInstance("SHA-1")
                md.update(signature.toByteArray())
                val digest = md.digest()
                
                // Convert to hex string
                digest.joinToString("") { "%02x".format(it) }
            } else {
                null
            }
        } catch (e: Exception) {
            Log.e(TAG, "Error getting SHA-1 fingerprint", e)
            null
        }
    }
    
    /**
     * Checks if the app is ready for production deployment
     */
    fun isReadyForProduction(context: Context): Boolean {
        val validations = validateAllConfigurations(context)
        return validations.values.all { it.isReadyForProduction }
    }
    
    /**
     * Gets a summary of configuration status
     */
    fun getConfigurationSummary(context: Context): String {
        val validations = validateAllConfigurations(context)
        val configured = validations.count { it.value.isReadyForProduction }
        val total = validations.size
        
        return "API Configuration Status: $configured/$total configured"
    }
    
    /**
     * Logs configuration status for debugging
     */
    fun logConfigurationStatus(context: Context) {
        val validations = validateAllConfigurations(context)
        
        Log.i(TAG, "=== API Configuration Status ===")
        validations.forEach { (service, validation) ->
            Log.i(TAG, "$service: ${validation.status} - ${validation.message}")
        }
        
        val ready = isReadyForProduction(context)
        Log.i(TAG, "Ready for production: $ready")
        Log.i(TAG, "=================================")
    }
} 