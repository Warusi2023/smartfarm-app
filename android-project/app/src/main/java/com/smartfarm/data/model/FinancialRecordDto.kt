package com.smartfarm.data.model

import com.google.gson.annotations.SerializedName

data class FinancialRecordDto(
    @SerializedName("id") val id: String,
    @SerializedName("type") val type: String, // INCOME or EXPENSE
    @SerializedName("category") val category: String,
    @SerializedName("amount") val amount: Double,
    @SerializedName("farmId") val farmId: String,
    @SerializedName("description") val description: String? = null,
    @SerializedName("date") val date: String,
    @SerializedName("createdAt") val createdAt: String? = null,
    @SerializedName("updatedAt") val updatedAt: String? = null
)

data class AnalyticsDto(
    @SerializedName("revenue") val revenue: Double,
    @SerializedName("expenses") val expenses: Double,
    @SerializedName("profit") val profit: Double,
    @SerializedName("livestockCount") val livestockCount: Int,
    @SerializedName("cropCount") val cropCount: Int,
    @SerializedName("tasksCompleted") val tasksCompleted: Int,
    @SerializedName("tasksPending") val tasksPending: Int
)

data class UserDto(
    @SerializedName("id") val id: String,
    @SerializedName("email") val email: String,
    @SerializedName("firstName") val firstName: String? = null,
    @SerializedName("lastName") val lastName: String? = null,
    @SerializedName("role") val role: String? = null
)

