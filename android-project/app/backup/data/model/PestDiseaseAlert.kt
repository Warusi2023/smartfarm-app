package com.yourcompany.smartfarm.data.model

import androidx.room.Entity
import androidx.room.PrimaryKey

// AlertSeverity enum moved to Weather.kt to avoid redeclaration
enum class AlertStatus { ACTIVE, RESOLVED }

@Entity(tableName = "pest_disease_alert")
data class PestDiseaseAlertEntity(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    val type: String, // "Pest" or "Disease"
    val name: String,
    val affected: String, // plant/livestock/farm name
    val note: String,
    val severity: AlertSeverity = AlertSeverity.MODERATE,
    val status: AlertStatus = AlertStatus.ACTIVE,
    val timestamp: Long = System.currentTimeMillis()
) 