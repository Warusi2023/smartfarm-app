package com.yourcompany.smartfarm.shared.models

data class FinancialRecord(
    val id: Long = 0,
    val farmId: Long,
    val type: FinancialType,
    val category: FinancialCategory,
    val amount: Double,
    val description: String,
    val date: Long,
    val relatedEntityId: Long? = null, // ID of related crop, livestock, or task
    val relatedEntityType: String? = null, // "crop", "livestock", "task", etc.
    val notes: String = "",
    val receiptUrl: String? = null
)

enum class FinancialType {
    INCOME,
    EXPENSE
}

enum class FinancialCategory {
    // Income categories
    CROP_SALES,
    LIVESTOCK_SALES,
    DAIRY_PRODUCTS,
    EQUIPMENT_RENTAL,
    GOVERNMENT_SUBSIDIES,
    OTHER_INCOME,
    
    // Expense categories
    SEEDS_AND_PLANTS,
    FERTILIZERS,
    PESTICIDES,
    ANIMAL_FEED,
    VETERINARY_CARE,
    EQUIPMENT_PURCHASE,
    EQUIPMENT_MAINTENANCE,
    FUEL,
    LABOR_COSTS,
    UTILITIES,
    INSURANCE,
    LOAN_PAYMENTS,
    OTHER_EXPENSES
}
