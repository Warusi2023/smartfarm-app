package com.example.smartfarm.data.model

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "calculation_records")
data class CalculationRecord(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    val type: String, // "Herbicide" or "Fertilizer"
    val plant: String,
    val chemical: String,
    val dosageRate: String,
    val area: String,
    val result: String,
    val timestamp: Long = System.currentTimeMillis()
) 