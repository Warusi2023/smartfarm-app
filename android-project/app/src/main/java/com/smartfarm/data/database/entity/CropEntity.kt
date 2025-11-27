package com.smartfarm.data.database.entity

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "crops")
data class CropEntity(
    @PrimaryKey val id: String,
    val name: String,
    val variety: String? = null,
    val farmId: String,
    val plantedDate: String? = null,
    val expectedHarvestDate: String? = null,
    val area: Double? = null,
    val status: String? = null,
    val notes: String? = null,
    val createdAt: String? = null,
    val updatedAt: String? = null
)

