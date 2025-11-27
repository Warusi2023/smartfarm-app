package com.smartfarm.data.model

import com.google.gson.annotations.SerializedName

data class FarmDto(
    @SerializedName("id") val id: String,
    @SerializedName("name") val name: String,
    @SerializedName("location") val location: LocationDto,
    @SerializedName("size") val size: Double,
    @SerializedName("type") val type: String,
    @SerializedName("status") val status: String,
    @SerializedName("ownerId") val ownerId: String,
    @SerializedName("createdAt") val createdAt: String? = null,
    @SerializedName("updatedAt") val updatedAt: String? = null,
    @SerializedName("isActive") val isActive: Boolean = true
)

data class LocationDto(
    @SerializedName("latitude") val latitude: Double,
    @SerializedName("longitude") val longitude: Double,
    @SerializedName("address") val address: String
)

