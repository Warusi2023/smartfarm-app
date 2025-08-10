package com.example.smartfarm.data.model

import androidx.room.Entity
import androidx.room.PrimaryKey
import kotlinx.serialization.Serializable

@Serializable
@Entity(tableName = "consent")
data class Consent(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val userId: Long,
    val consentType: ConsentType,
    val granted: Boolean,
    val timestamp: Long,
    val version: String,
    val description: String,
    val isActive: Boolean = true,
    val createdAt: Long = System.currentTimeMillis(),
    val updatedAt: Long = System.currentTimeMillis()
)

enum class ConsentType {
    DATA_COLLECTION, 
    DATA_PROCESSING, 
    ANALYTICS, 
    MARKETING, 
    THIRD_PARTY_SHARING, 
    LOCATION_TRACKING, 
    LOCATION_SERVICES,
    PUSH_NOTIFICATIONS,
    NOTIFICATIONS,
    THIRD_PARTY_SERVICES,
    DATA_SHARING,
    PERSONALIZATION
}

fun ConsentType.getDescription(): String {
    return when (this) {
        ConsentType.DATA_COLLECTION -> "Collect your data for app functionality"
        ConsentType.DATA_PROCESSING -> "Required for basic app functionality and farm management"
        ConsentType.LOCATION_SERVICES -> "For GPS tracking, field mapping, and location-based features"
        ConsentType.NOTIFICATIONS -> "For task reminders, weather alerts, and important updates"
        ConsentType.ANALYTICS -> "To improve app performance and user experience"
        ConsentType.MARKETING -> "For promotional communications and updates"
        ConsentType.THIRD_PARTY_SHARING -> "Share data with third-party services"
        ConsentType.LOCATION_TRACKING -> "Track your location for farm management"
        ConsentType.PUSH_NOTIFICATIONS -> "Send push notifications"
        ConsentType.THIRD_PARTY_SERVICES -> "For weather APIs, mapping services, and external integrations"
        ConsentType.DATA_SHARING -> "For research, development, and service improvements"
        ConsentType.PERSONALIZATION -> "For customized recommendations and features"
    }
}

fun ConsentType.isRequired(): Boolean {
    return when (this) {
        ConsentType.DATA_COLLECTION -> true
        ConsentType.DATA_PROCESSING -> true
        ConsentType.LOCATION_SERVICES -> false
        ConsentType.NOTIFICATIONS -> false
        ConsentType.ANALYTICS -> false
        ConsentType.MARKETING -> false
        ConsentType.THIRD_PARTY_SHARING -> false
        ConsentType.LOCATION_TRACKING -> false
        ConsentType.PUSH_NOTIFICATIONS -> false
        ConsentType.THIRD_PARTY_SERVICES -> false
        ConsentType.DATA_SHARING -> false
        ConsentType.PERSONALIZATION -> false
    }
}

fun ConsentType.getDisplayName(): String {
    return when (this) {
        ConsentType.DATA_COLLECTION -> "Data Collection"
        ConsentType.DATA_PROCESSING -> "Data Processing"
        ConsentType.LOCATION_SERVICES -> "Location Services"
        ConsentType.NOTIFICATIONS -> "Notifications"
        ConsentType.ANALYTICS -> "Analytics"
        ConsentType.MARKETING -> "Marketing"
        ConsentType.THIRD_PARTY_SHARING -> "Third-party Sharing"
        ConsentType.LOCATION_TRACKING -> "Location Tracking"
        ConsentType.PUSH_NOTIFICATIONS -> "Push Notifications"
        ConsentType.THIRD_PARTY_SERVICES -> "Third-party Services"
        ConsentType.DATA_SHARING -> "Data Sharing"
        ConsentType.PERSONALIZATION -> "Personalization"
    }
} 