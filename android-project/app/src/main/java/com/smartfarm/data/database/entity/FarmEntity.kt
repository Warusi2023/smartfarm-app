package com.smartfarm.data.database.entity

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "farms")
data class FarmEntity(
    @PrimaryKey val id: String,
    val name: String,
    val latitude: Double,
    val longitude: Double,
    val address: String,
    val size: Double,
    val type: String,
    val status: String,
    val ownerId: String,
    val isActive: Boolean = true,
    val createdAt: String? = null,
    val updatedAt: String? = null
)

