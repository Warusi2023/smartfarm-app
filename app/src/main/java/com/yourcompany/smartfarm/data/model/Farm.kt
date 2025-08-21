package com.yourcompany.smartfarm.data.model

data class Farm(
    val id: Long = 0,
    val name: String,
    val location: String,
    val size: Double, // in acres/hectares
    val farmType: FarmType,
    val ownerId: Long,
    val createdAt: Long = System.currentTimeMillis(),
    val isActive: Boolean = true
)

enum class FarmType {
    CROP,
    LIVESTOCK,
    MIXED,
    DAIRY,
    POULTRY,
    AQUACULTURE
}
