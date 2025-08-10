package com.example.smartfarm.data.model

import androidx.room.Entity
import androidx.room.PrimaryKey
import androidx.room.Index
import java.security.MessageDigest

@Entity(
    tableName = "users",
    indices = [
        Index(value = ["email"], unique = true),
        Index(value = ["username"], unique = true),
        Index(value = ["isActive"]),
        Index(value = ["role"]),
        Index(value = ["farmId"])
    ]
)
data class User(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val username: String,
    val email: String,
    val passwordHash: String, // SHA-256 hashed password
    val firstName: String,
    val lastName: String,
    val role: UserRole = UserRole.FARMER,
    val phoneNumber: String? = null,
    val profileImageUrl: String? = null,
    val isActive: Boolean = true,
    val isEmailVerified: Boolean = false,
    val lastLoginAt: Long? = null,
    val createdAt: Long = System.currentTimeMillis(),
    val updatedAt: Long = System.currentTimeMillis(),
    val passwordResetToken: String? = null,
    val passwordResetExpiresAt: Long? = null,
    val emailVerificationToken: String? = null,
    val emailVerificationExpiresAt: Long? = null,
    val failedLoginAttempts: Int = 0,
    val accountLockedUntil: Long? = null,
    val preferences: UserPreferences = UserPreferences(),
    
    // Farm-related fields
    val farmId: Long? = null,
    val farmName: String? = null,
    val farmSize: Double? = null, // in acres/hectares
    val farmLocation: String? = null,
    val farmAddress: String? = null,
    val farmLatitude: Double? = null,
    val farmLongitude: Double? = null,
            val farmType: FarmType = FarmType.MIXED_FARM,
    val farmDescription: String? = null,
    val farmEstablishedDate: Long? = null,
    val farmCertifications: List<String> = emptyList(),
    val farmContactPerson: String? = null,
    val farmContactPhone: String? = null,
    val farmContactEmail: String? = null,
    
    // Farm statistics
    val totalLivestock: Int = 0,
    val totalCrops: Int = 0,
    val totalActivities: Int = 0,
    val totalRevenue: Double = 0.0,
    val totalExpenses: Double = 0.0,
    val lastActivityDate: Long? = null,
    val lastBackupDate: Long? = null,
    val lastSyncDate: Long? = null
) {
    companion object {
        fun hashPassword(password: String): String {
            val bytes = MessageDigest.getInstance("SHA-256").digest(password.toByteArray())
            return bytes.joinToString("") { "%02x".format(it) }
        }
        
        fun validatePassword(password: String): Boolean {
            return password.length >= 8 && 
                   password.any { it.isUpperCase() } &&
                   password.any { it.isLowerCase() } &&
                   password.any { it.isDigit() }
        }
        
        fun validateEmail(email: String): Boolean {
            return android.util.Patterns.EMAIL_ADDRESS.matcher(email).matches()
        }
        
        fun validateFarmSize(size: Double?): Boolean {
            return size == null || size > 0
        }
        
        fun validateCoordinates(latitude: Double?, longitude: Double?): Boolean {
            if (latitude == null || longitude == null) return true
            return latitude in -90.0..90.0 && longitude in -180.0..180.0
        }
    }
}

enum class UserRole {
    ADMIN,      // Full system access
    MANAGER,    // Farm management access
    FARMER,     // Standard farmer access
    WORKER,     // Limited access for farm workers
    VIEWER      // Read-only access
}

// FarmType enum is defined in Farm.kt to avoid duplication

data class UserPreferences(
    val language: String = "en",
    val timezone: String = "UTC",
    val dateFormat: String = "yyyy-MM-dd",
    val timeFormat: String = "HH:mm",
    val measurementUnit: MeasurementUnit = MeasurementUnit.METRIC,
    val currency: String = "USD",
    val notifications: NotificationPreferences = NotificationPreferences(),
    val theme: ThemePreference = ThemePreference.SYSTEM,
    val autoBackup: Boolean = true,
    val backupFrequency: BackupFrequency = BackupFrequency.DAILY,
    val syncEnabled: Boolean = true,
    val syncFrequency: SyncFrequency = SyncFrequency.HOURLY,
    val dataRetentionDays: Int = 365,
    val exportFormat: ExportFormat = ExportFormat.CSV
)

enum class MeasurementUnit {
    METRIC,     // kg, liters, meters
    IMPERIAL    // lbs, gallons, feet
}

enum class ThemePreference {
    LIGHT, DARK, SYSTEM
}

enum class BackupFrequency {
    DAILY, WEEKLY, MONTHLY
}

enum class SyncFrequency {
    MANUAL,     // Manual sync only
    HOURLY,     // Every hour
    DAILY,      // Once per day
    WEEKLY      // Once per week
}

enum class ExportFormat {
    CSV, PDF, EXCEL, JSON
}

data class NotificationPreferences(
    val pushNotifications: Boolean = true,
    val emailNotifications: Boolean = true,
    val smsNotifications: Boolean = false,
    val livestockAlerts: Boolean = true,
    val weatherAlerts: Boolean = true,
    val taskReminders: Boolean = true,
    val healthAlerts: Boolean = true,
    val yieldAlerts: Boolean = true,
    val backupReminders: Boolean = true,
    val syncNotifications: Boolean = true
) 