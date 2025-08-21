package com.yourcompany.smartfarm.shared.models

data class Crop(
    val id: Long = 0,
    val name: String,
    val variety: String,
    val farmId: Long,
    val plantedDate: String, // ISO date string
    val expectedHarvestDate: String, // ISO date string
    val area: Double, // in acres/hectares
    val status: CropStatus,
    val notes: String = ""
)

enum class CropStatus {
    PLANNED,
    PLANTED,
    GROWING,
    READY_FOR_HARVEST,
    HARVESTED,
    FAILED
}
