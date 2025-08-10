package com.example.smartfarm.data.model

import android.app.Application
import androidx.room.Entity
import androidx.room.PrimaryKey
import androidx.room.ForeignKey
import androidx.room.Index

@Entity(
    tableName = "farms",
    indices = [
        Index(value = ["farmType"]),
        Index(value = ["isActive"]),
        Index(value = ["soilType"]),
        Index(value = ["climateZone"]),
        Index(value = ["farmType", "isActive"]),
        Index(value = ["userId"]) // Added index for userId
    ]
)
data class Farm(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val userId: Long = 0, // Added missing userId field
    val name: String,
    val description: String,
    val size: Double, // in hectares
    val soilType: SoilType,
    val climateZone: ClimateZone,
    val irrigationType: IrrigationType,
    val farmType: FarmType,
    val createdAt: Long = System.currentTimeMillis(),
    val updatedAt: Long = System.currentTimeMillis(),
    val isActive: Boolean = true
)

@Entity(
    tableName = "farm_locations",
    foreignKeys = [
        ForeignKey(
            entity = Farm::class,
            parentColumns = ["id"],
            childColumns = ["farmId"],
            onDelete = ForeignKey.CASCADE
        )
    ],
    indices = [
        Index(value = ["farmId"]),
        Index(value = ["latitude", "longitude"]),
        Index(value = ["city", "state"]),
        Index(value = ["country"])
    ]
)
data class FarmLocation(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val farmId: Long,
    val latitude: Double,
    val longitude: Double,
    val address: String,
    val city: String,
    val state: String,
    val country: String,
    val postalCode: String,
    val createdAt: Long = System.currentTimeMillis()
)

enum class IrrigationType {
    DRIP,
    SPRINKLER,
    FLOOD,
    FURROW,
    NONE
}

enum class FarmType {
    CROP_FARM,
    LIVESTOCK_FARM,
    MIXED_FARM,
    AQUACULTURE,
    ORCHARD,
    GREENHOUSE,
    VERTICAL_FARM
}