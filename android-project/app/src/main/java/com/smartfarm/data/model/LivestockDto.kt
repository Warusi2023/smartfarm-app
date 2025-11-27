package com.smartfarm.data.model

import com.google.gson.annotations.SerializedName

data class LivestockDto(
    @SerializedName("id") val id: String,
    @SerializedName("name") val name: String,
    @SerializedName("type") val type: String,
    @SerializedName("breed") val breed: String? = null,
    @SerializedName("farmId") val farmId: String,
    @SerializedName("birthDate") val birthDate: String? = null,
    @SerializedName("weight") val weight: Double? = null,
    @SerializedName("status") val status: String? = null,
    @SerializedName("location") val location: String? = null,
    @SerializedName("description") val description: String? = null,
    @SerializedName("tag") val tag: String? = null,
    @SerializedName("sex") val sex: String? = null,
    @SerializedName("purpose") val purpose: String? = null,
    @SerializedName("value") val value: Double? = null,
    @SerializedName("createdAt") val createdAt: String? = null,
    @SerializedName("updatedAt") val updatedAt: String? = null
)

