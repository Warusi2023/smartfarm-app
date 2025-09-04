package com.yourcompany.smartfarm.shared.models

data class InventoryItem(
    val id: String,
    val name: String,
    val farmId: String,
    val category: InventoryCategory,
    val quantity: Double,
    val unit: String,
    val cost: Double,
    val supplier: String,
    val notes: String = "",
    val createdAt: Long = 0L,
    val updatedAt: Long = 0L
)

enum class InventoryCategory {
    SEEDS,
    FERTILIZER,
    PESTICIDES,
    TOOLS,
    EQUIPMENT,
    FEED,
    MEDICINE,
    SUPPLIES,
    OTHER
}
