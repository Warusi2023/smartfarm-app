package com.smartfarm.data.model

import com.google.gson.annotations.SerializedName

data class InventoryItemDto(
    @SerializedName("id") val id: String,
    @SerializedName("name") val name: String,
    @SerializedName("category") val category: String,
    @SerializedName("quantity") val quantity: Double,
    @SerializedName("unit") val unit: String,
    @SerializedName("farmId") val farmId: String,
    @SerializedName("cost") val cost: Double? = null,
    @SerializedName("supplier") val supplier: String? = null,
    @SerializedName("expiryDate") val expiryDate: String? = null,
    @SerializedName("location") val location: String? = null,
    @SerializedName("notes") val notes: String? = null,
    @SerializedName("createdAt") val createdAt: String? = null,
    @SerializedName("updatedAt") val updatedAt: String? = null
)

