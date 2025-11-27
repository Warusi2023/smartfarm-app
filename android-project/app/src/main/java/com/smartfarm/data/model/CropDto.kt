package com.smartfarm.data.model

import com.google.gson.annotations.SerializedName

data class CropDto(
    @SerializedName("id") val id: String,
    @SerializedName("name") val name: String,
    @SerializedName("variety") val variety: String? = null,
    @SerializedName("farmId") val farmId: String,
    @SerializedName("plantedDate") val plantedDate: String? = null,
    @SerializedName("expectedHarvestDate") val expectedHarvestDate: String? = null,
    @SerializedName("area") val area: Double? = null,
    @SerializedName("status") val status: String? = null,
    @SerializedName("notes") val notes: String? = null,
    @SerializedName("createdAt") val createdAt: String? = null,
    @SerializedName("updatedAt") val updatedAt: String? = null
)

