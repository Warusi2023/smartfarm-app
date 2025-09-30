package com.smartfarm.shared.domain.model

import kotlinx.serialization.Serializable

@Serializable
data class Byproduct(
    val id: String,
    val name: String,
    val category: String,
    val description: String,
    val marketValue: Double,
    val processingMethod: String,
    val equipment: List<String>,
    val shelfLife: String,
    val targetMarket: String,
    val sourceType: SourceType,
    val sourceId: String,
    val createdAt: String,
    val updatedAt: String
)

@Serializable
enum class SourceType {
    CROP,
    LIVESTOCK
}

@Serializable
data class ProcessingPlan(
    val id: String,
    val userId: String,
    val sourceType: SourceType,
    val sourceId: String,
    val byproductName: String,
    val quantity: Double,
    val processingMethod: String,
    val equipment: List<String>,
    val targetMarket: String,
    val expectedRevenue: Double,
    val processingDate: String,
    val notes: String,
    val status: ProcessingStatus,
    val createdAt: String,
    val updatedAt: String
)

@Serializable
enum class ProcessingStatus {
    PLANNED,
    IN_PROGRESS,
    COMPLETED,
    CANCELLED
}

@Serializable
data class SalesRecord(
    val id: String,
    val userId: String,
    val processingPlanId: String,
    val byproductName: String,
    val quantity: Double,
    val unitPrice: Double,
    val totalAmount: Double,
    val buyerName: String,
    val buyerContact: String,
    val saleDate: String,
    val paymentStatus: PaymentStatus,
    val notes: String,
    val createdAt: String,
    val updatedAt: String
)

@Serializable
enum class PaymentStatus {
    PENDING,
    PAID,
    OVERDUE
}

@Serializable
data class MarketPrice(
    val id: String,
    val byproductName: String,
    val category: String,
    val marketType: MarketType,
    val price: Double,
    val currency: String,
    val location: String,
    val date: String,
    val source: String,
    val notes: String,
    val createdAt: String
)

@Serializable
enum class MarketType {
    LOCAL,
    REGIONAL,
    NATIONAL,
    EXPORT
}

@Serializable
data class ProcessingEquipment(
    val id: String,
    val userId: String,
    val equipmentName: String,
    val category: EquipmentCategory,
    val status: EquipmentStatus,
    val purchaseDate: String,
    val purchasePrice: Double,
    val maintenanceSchedule: List<String>,
    val location: String,
    val notes: String,
    val createdAt: String,
    val updatedAt: String
)

@Serializable
enum class EquipmentCategory {
    DRYING,
    GRINDING,
    PACKAGING,
    PRESERVATION,
    PROCESSING
}

@Serializable
enum class EquipmentStatus {
    AVAILABLE,
    IN_USE,
    MAINTENANCE,
    RETIRED
}
