package com.smartfarm.shared.domain.model

import kotlinx.serialization.Serializable

@Serializable
data class Crop(
    val id: String,
    val farmId: String,
    val name: String,
    val variety: String,
    val type: CropType,
    val plantingDate: Long,
    val expectedHarvestDate: Long,
    val area: Double, // in hectares
    val status: CropStatus,
    val health: CropHealth,
    val yield: Yield? = null,
    val createdAt: Long,
    val updatedAt: Long
)

@Serializable
data class Yield(
    val quantity: Double,
    val unit: YieldUnit,
    val quality: YieldQuality,
    val harvestDate: Long
)

@Serializable
enum class CropType {
    GRAIN,
    VEGETABLE,
    FRUIT,
    LEGUME,
    ROOT,
    HERB,
    SPICE
}

@Serializable
enum class CropStatus {
    PLANTED,
    GROWING,
    FLOWERING,
    FRUITING,
    READY_FOR_HARVEST,
    HARVESTED,
    FAILED
}

@Serializable
enum class CropHealth {
    EXCELLENT,
    GOOD,
    FAIR,
    POOR,
    CRITICAL
}

@Serializable
enum class YieldUnit {
    KILOGRAMS,
    TONS,
    BUSHELS,
    POUNDS
}

@Serializable
enum class YieldQuality {
    PREMIUM,
    STANDARD,
    BELOW_AVERAGE,
    POOR
}
