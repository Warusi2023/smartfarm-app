package com.smartfarm.shared.data.model.dto

import kotlinx.serialization.Serializable

@Serializable
data class FinancialRecordDto(
    val id: String,
    val type: String, // INCOME or EXPENSE
    val category: String,
    val amount: Double,
    val farmId: String,
    val description: String? = null,
    val date: String,
    val createdAt: String? = null,
    val updatedAt: String? = null
)

@Serializable
data class AnalyticsDto(
    val revenue: Double,
    val expenses: Double,
    val profit: Double,
    val livestockCount: Int,
    val cropCount: Int,
    val tasksCompleted: Int,
    val tasksPending: Int
)

