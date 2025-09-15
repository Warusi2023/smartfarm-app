package com.smartfarm.data.model

import java.util.Date

/**
 * Comprehensive farmer data model matching the enhanced web registration form
 */
data class FarmerData(
    // Personal Information
    val firstName: String = "",
    val lastName: String = "",
    val email: String = "",
    val phone: String = "",
    val username: String = "",
    
    // Location Information
    val country: String = "",
    val region: String = "",
    val district: String = "",
    val village: String = "",
    
    // Farm Information
    val farmName: String = "",
    val farmSize: Double = 0.0,
    val farmType: FarmType = FarmType.MIXED,
    val experience: ExperienceLevel = ExperienceLevel.BEGINNER,
    val crops: String = "",
    val irrigation: IrrigationMethod = IrrigationMethod.RAINFED,
    
    // Additional Information
    val education: EducationLevel = EducationLevel.SECONDARY,
    val income: IncomeRange = IncomeRange.UNDER_10K,
    val marketing: MarketingChannel = MarketingChannel.LOCAL_MARKET,
    val technology: TechnologyUsage = TechnologyUsage.BASIC,
    val challenges: String = "",
    val goals: String = "",
    val newsletter: Boolean = false,
    
    // Registration metadata
    val registrationDate: Date = Date(),
    val userAgent: String = ""
)

enum class FarmType {
    VEGETABLE, FRUIT, LIVESTOCK, MIXED, DAIRY, POULTRY, AQUACULTURE, HORTICULTURE, FLORICULTURE, OTHER
}

enum class ExperienceLevel {
    BEGINNER, INTERMEDIATE, EXPERIENCED, EXPERT
}

enum class IrrigationMethod {
    RAINFED, DRIP, SPRINKLER, FLOOD, MANUAL, MIXED
}

enum class EducationLevel {
    PRIMARY, SECONDARY, DIPLOMA, BACHELOR, MASTER, PHD
}

enum class IncomeRange {
    UNDER_10K, RANGE_10K_25K, RANGE_25K_50K, RANGE_50K_100K, RANGE_100K_250K, OVER_250K
}

enum class MarketingChannel {
    LOCAL_MARKET, SUPERMARKETS, RESTAURANTS, EXPORT, DIRECT_SALE, COOPERATIVE, ONLINE
}

enum class TechnologyUsage {
    BASIC, INTERMEDIATE, ADVANCED, EXPERT
}

/**
 * Country enum for Pacific Island countries and others
 */
enum class Country {
    FIJI, AUSTRALIA, NEW_ZEALAND, PAPUA_NEW_GUINEA, SOLOMON_ISLANDS, 
    VANUATU, SAMOA, TONGA, OTHER
}
