package com.smartfarm.shared.data.model.dto

import kotlinx.serialization.Serializable

/**
 * Beneficial Insect DTO
 * Represents a beneficial insect that can be used for biological pest control
 */
@Serializable
data class BeneficialInsectDto(
    val id: Int,
    val name: String,
    val icon: String,
    val description: String,
    val targets: List<String>,
    val breedingTips: List<String>,
    val releaseTiming: String,
    val effectiveness: String
)

/**
 * Harmful Pest DTO
 * Represents a harmful pest that attacks crops
 */
@Serializable
data class HarmfulPestDto(
    val id: Int,
    val name: String,
    val icon: String,
    val description: String,
    val damage: String,
    val cropsAffected: List<String>
)

/**
 * Crop Guide DTO
 * Represents pest and beneficial insect information for a specific crop
 */
@Serializable
data class CropGuideDto(
    val badInsects: List<String>,
    val goodInsects: List<String>,
    val releaseTiming: String,
    val notes: String
)

/**
 * API Response wrappers
 */
@Serializable
data class BeneficialInsectsResponse(
    val success: Boolean,
    val data: List<BeneficialInsectDto> = emptyList(),
    val count: Int = 0,
    val error: String? = null
)

@Serializable
data class BeneficialInsectResponse(
    val success: Boolean,
    val data: BeneficialInsectDto? = null,
    val error: String? = null
)

@Serializable
data class HarmfulPestsResponse(
    val success: Boolean,
    val data: List<HarmfulPestDto> = emptyList(),
    val count: Int = 0,
    val error: String? = null
)

@Serializable
data class HarmfulPestResponse(
    val success: Boolean,
    val data: HarmfulPestDto? = null,
    val error: String? = null
)

@Serializable
data class CropGuidesResponse(
    val success: Boolean,
    val data: Map<String, CropGuideDto> = emptyMap(),
    val crops: List<String> = emptyList(),
    val error: String? = null
)

@Serializable
data class CropGuideResponse(
    val success: Boolean,
    val crop: String? = null,
    val data: CropGuideDto? = null,
    val availableCrops: List<String>? = null,
    val error: String? = null
)

@Serializable
data class PestMatchResponse(
    val success: Boolean,
    val pest: String? = null,
    val matchingInsects: List<MatchingInsectDto> = emptyList(),
    val count: Int = 0,
    val error: String? = null
)

@Serializable
data class MatchingInsectDto(
    val id: Int,
    val name: String,
    val icon: String,
    val description: String,
    val effectiveness: String
)

@Serializable
data class CropRecommendationsResponse(
    val success: Boolean,
    val crop: String? = null,
    val pests: List<String> = emptyList(),
    val recommendedInsects: List<RecommendedInsectDto> = emptyList(),
    val releaseTiming: String? = null,
    val notes: String? = null,
    val error: String? = null
)

@Serializable
data class RecommendedInsectDto(
    val id: Int,
    val name: String,
    val icon: String,
    val description: String,
    val targets: List<String>,
    val releaseTiming: String,
    val effectiveness: String,
    val breedingTips: List<String>
)

