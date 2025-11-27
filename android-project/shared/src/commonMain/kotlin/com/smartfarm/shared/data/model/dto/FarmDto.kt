package com.smartfarm.shared.data.model.dto

import kotlinx.serialization.Serializable

@Serializable
data class FarmDto(
    val id: String,
    val name: String,
    val location: LocationDto,
    val size: Double,
    val type: String,
    val status: String,
    val ownerId: String,
    val createdAt: String? = null,
    val updatedAt: String? = null,
    val isActive: Boolean = true
)

@Serializable
data class LocationDto(
    val latitude: Double,
    val longitude: Double,
    val address: String
)

