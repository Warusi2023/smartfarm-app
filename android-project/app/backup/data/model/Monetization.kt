package com.yourcompany.smartfarm.data.model

import androidx.room.Entity
import androidx.room.PrimaryKey
import kotlinx.serialization.Serializable

@Serializable
@Entity(tableName = "monetization")
data class Monetization(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val userId: Long,
    val type: MonetizationType,
    val amount: Double,
    val currency: String = "USD",
    val description: String,
    val date: Long,
    val status: MonetizationStatus = MonetizationStatus.PENDING,
    val isActive: Boolean = true,
    val createdAt: Long = System.currentTimeMillis(),
    val updatedAt: Long = System.currentTimeMillis()
)

enum class MonetizationType {
    SUBSCRIPTION, AD_REVENUE, IN_APP_PURCHASE, DATA_LICENSING, PREMIUM_FEATURES
}

enum class MonetizationStatus {
    PENDING, COMPLETED, FAILED, CANCELLED
}

@Entity(tableName = "sponsorships")
data class Sponsorship(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val sponsorName: String,
    val sponsorType: SponsorType,
    val programName: String,
    val description: String,
    val eligibilityCriteria: List<String>,
    val benefits: List<String>,
    val applicationDeadline: Long,
    val fundingAmount: Double?,
    val isActive: Boolean = true,
    val applicationUrl: String?,
    val contactInfo: String,
    val region: String,
    val farmType: List<FarmType>,
    val createdAt: Long = System.currentTimeMillis()
)

enum class SponsorType {
    GOVERNMENT,
    NGO,
    CORPORATE,
    FOUNDATION
}

// FarmType enum moved to Farm.kt to avoid redeclaration

@Entity(tableName = "affiliate_products")
data class AffiliateProduct(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val name: String,
    val category: ProductCategory,
    val description: String,
    val price: Double,
    val originalPrice: Double?,
    val affiliateUrl: String,
    val imageUrl: String?,
    val rating: Double,
    val reviewCount: Int,
    val isAvailable: Boolean = true,
    val discountPercentage: Int?,
    val shippingInfo: String?,
    val returnPolicy: String?,
    val vendor: String,
    val tags: List<String>,
    val createdAt: Long = System.currentTimeMillis()
)

enum class ProductCategory {
    HERBICIDES,
    SEEDS,
    FEED,
    MACHINERY,
    TOOLS,
    FERTILIZERS,
    PESTICIDES,
    IRRIGATION,
    LIVESTOCK_SUPPLIES,
    PROTECTIVE_GEAR,
    STORAGE,
    MONITORING_EQUIPMENT
}

enum class ProgramType {
    GRANT,
    LOAN,
    SUBSIDY,
    TRAINING,
    TECHNICAL_SUPPORT,
    MARKET_ACCESS,
    RESEARCH,
    CONSERVATION,
    SUSTAINABILITY,
    INNOVATION
}

@Entity(tableName = "user_subscriptions")
data class UserSubscription(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val userId: Long,
    val subscriptionType: SubscriptionType,
    val billingPeriod: SubscriptionBillingPeriod = SubscriptionBillingPeriod.MONTHLY,
    val startDate: Long,
    val endDate: Long,
    val isActive: Boolean = true,
    val paymentMethod: String?,
    val amount: Double,
    val currency: String = "USD",
    val autoRenew: Boolean = false,
    val features: List<SubscriptionFeature>,
    val yearlyDiscount: Double = 0.0, // Discount percentage for yearly subscriptions
    val originalYearlyPrice: Double = 0.0 // Original yearly price before discount
)

enum class SubscriptionType {
    FREE,
    PREMIUM,
    ENTERPRISE,
    COMMUNITY
}

enum class SubscriptionBillingPeriod {
    MONTHLY,
    YEARLY
}

enum class SubscriptionFeature {
    AD_FREE,
    UNLIMITED_WEATHER_DATA,
    ADVANCED_ANALYTICS,
    EXPERT_CONSULTATION,
    PRIORITY_SUPPORT,
    CUSTOM_REPORTS,
    API_ACCESS,
    WHITE_LABEL,
    SPONSORSHIP_ACCESS,
    AFFILIATE_COMMISSIONS
}

@Entity(tableName = "ad_campaigns")
data class AdCampaign(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val advertiserName: String,
    val campaignName: String,
    val adType: AdType,
    val targetAudience: List<FarmType>,
    val bannerImageUrl: String?,
    val videoUrl: String?,
    val clickUrl: String,
    val cpc: Double, // Cost per click
    val cpm: Double, // Cost per thousand impressions
    val budget: Double,
    val startDate: Long,
    val endDate: Long,
    val isActive: Boolean = true,
    val impressions: Int = 0,
    val clicks: Int = 0,
    val revenue: Double = 0.0
)

enum class AdType {
    BANNER,
    INTERSTITIAL,
    NATIVE,
    VIDEO,
    REWARDED
}

@Entity(tableName = "user_earnings")
data class UserEarnings(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val userId: Long,
    val source: EarningSource,
    val amount: Double,
    val currency: String = "USD",
    val description: String,
    val date: Long = System.currentTimeMillis(),
    val status: EarningStatus = EarningStatus.PENDING,
    val transactionId: String?
)

enum class EarningSource {
    AFFILIATE_SALE,
    AD_REVENUE,
    SPONSORSHIP_REFERRAL,
    CONTENT_CREATION,
    SURVEY_COMPLETION
}

enum class EarningStatus {
    PENDING,
    APPROVED,
    PAID,
    CANCELLED
}

@Entity(tableName = "community_programs")
data class CommunityProgram(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val programName: String,
    val sponsorId: Long,
    val description: String,
    val targetRegion: String,
    val maxParticipants: Int,
    val currentParticipants: Int = 0,
    val benefits: List<String>,
    val requirements: List<String>,
    val startDate: Long,
    val endDate: Long,
    val isActive: Boolean = true,
    val applicationForm: String?,
    val contactPerson: String,
    val contactEmail: String,
    val contactPhone: String?
) 