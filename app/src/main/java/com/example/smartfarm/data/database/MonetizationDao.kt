package com.example.smartfarm.data.database

import androidx.room.*
import com.example.smartfarm.data.model.*
import kotlinx.coroutines.flow.Flow

@Dao
interface MonetizationDao {
    // Sponsorship methods
    @Query("SELECT * FROM sponsorships WHERE isActive = 1")
    fun getAllSponsorships(): Flow<List<Sponsorship>>
    
    @Query("SELECT * FROM sponsorships WHERE id = :id")
    suspend fun getSponsorshipById(id: Long): Sponsorship?
    
    @Query("SELECT * FROM sponsorships WHERE region = :region AND isActive = 1")
    fun getSponsorshipsByRegion(region: String): Flow<List<Sponsorship>>
    
    @Query("SELECT * FROM sponsorships WHERE sponsorType = :sponsorType AND isActive = 1")
    fun getSponsorshipsByType(sponsorType: SponsorType): Flow<List<Sponsorship>>
    
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertSponsorship(sponsorship: Sponsorship): Long
    
    @Update
    suspend fun updateSponsorship(sponsorship: Sponsorship)
    
    @Delete
    suspend fun deleteSponsorship(sponsorship: Sponsorship)
    
    @Query("SELECT * FROM sponsorships WHERE isActive = 1")
    fun getActiveSponsorships(): Flow<List<Sponsorship>>
    
    // Affiliate Product methods
    @Query("SELECT * FROM affiliate_products WHERE isAvailable = 1")
    fun getAllAffiliateProducts(): Flow<List<AffiliateProduct>>
    
    @Query("SELECT * FROM affiliate_products WHERE id = :id")
    suspend fun getAffiliateProductById(id: Long): AffiliateProduct?
    
    @Query("SELECT * FROM affiliate_products WHERE category = :category AND isAvailable = 1")
    fun getProductsByCategory(category: ProductCategory): Flow<List<AffiliateProduct>>
    
    @Query("SELECT * FROM affiliate_products WHERE price BETWEEN :minPrice AND :maxPrice AND isAvailable = 1")
    fun getProductsByPriceRange(minPrice: Double, maxPrice: Double): Flow<List<AffiliateProduct>>
    
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertAffiliateProduct(product: AffiliateProduct): Long
    
    @Update
    suspend fun updateAffiliateProduct(product: AffiliateProduct)
    
    @Delete
    suspend fun deleteAffiliateProduct(product: AffiliateProduct)
    
    @Query("SELECT * FROM affiliate_products WHERE isAvailable = 1")
    fun getActiveAffiliateProducts(): Flow<List<AffiliateProduct>>
    
    // User Subscription methods
    @Query("SELECT * FROM user_subscriptions")
    fun getAllUserSubscriptions(): Flow<List<UserSubscription>>
    
    @Query("SELECT * FROM user_subscriptions WHERE id = :id")
    suspend fun getUserSubscriptionById(id: Long): UserSubscription?
    
    @Query("SELECT * FROM user_subscriptions WHERE userId = :userId AND isActive = 1")
    fun getUserActiveSubscription(userId: Long): Flow<UserSubscription?>
    
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertUserSubscription(subscription: UserSubscription): Long
    
    @Update
    suspend fun updateUserSubscription(subscription: UserSubscription)
    
    @Delete
    suspend fun deleteUserSubscription(subscription: UserSubscription)
    
    @Query("SELECT * FROM user_subscriptions WHERE isActive = 1")
    fun getActiveUserSubscriptions(): Flow<List<UserSubscription>>
    
    // User Earnings methods
    @Query("SELECT * FROM user_earnings")
    fun getAllUserEarnings(): Flow<List<UserEarnings>>
    
    @Query("SELECT * FROM user_earnings WHERE id = :id")
    suspend fun getUserEarningsById(id: Long): UserEarnings?
    
    @Query("SELECT * FROM user_earnings WHERE userId = :userId ORDER BY date DESC")
    fun getUserEarnings(userId: Long): Flow<List<UserEarnings>>
    
    @Query("SELECT SUM(amount) FROM user_earnings WHERE userId = :userId")
    suspend fun getTotalEarnings(userId: Long): Double?
    
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertUserEarnings(earnings: UserEarnings): Long
    
    @Update
    suspend fun updateUserEarnings(earnings: UserEarnings)
    
    @Delete
    suspend fun deleteUserEarnings(earnings: UserEarnings)
    
    @Query("SELECT * FROM user_earnings WHERE userId = :userId")
    fun getEarningsByUserId(userId: Long): Flow<List<UserEarnings>>
    
    // Community Program methods
    @Query("SELECT * FROM community_programs")
    fun getAllCommunityPrograms(): Flow<List<CommunityProgram>>
    
    @Query("SELECT * FROM community_programs WHERE id = :id")
    suspend fun getCommunityProgramById(id: Long): CommunityProgram?
    
    @Query("SELECT * FROM community_programs WHERE isActive = 1")
    fun getActiveCommunityPrograms(): Flow<List<CommunityProgram>>
    
    @Query("SELECT * FROM community_programs WHERE region = :region AND isActive = 1")
    fun getProgramsByRegion(region: String): Flow<List<CommunityProgram>>
    
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertCommunityProgram(program: CommunityProgram): Long
    
    @Update
    suspend fun updateCommunityProgram(program: CommunityProgram)
    
    @Delete
    suspend fun deleteCommunityProgram(program: CommunityProgram)
    
    // Subscription management methods
    suspend fun insertSubscription(subscription: UserSubscription): Long {
        return insertUserSubscription(subscription)
    }
    
    suspend fun cancelSubscription(subscription: UserSubscription) {
        updateUserSubscription(subscription.copy(isActive = false))
    }
    
    suspend fun joinProgram(program: CommunityProgram) {
        // Implementation for joining a community program
    }
}

// Keep the original separate DAO interfaces for backward compatibility
@Dao
interface SponsorshipDao {
    @Query("SELECT * FROM sponsorships WHERE isActive = 1")
    fun getAllActiveSponsorships(): Flow<List<Sponsorship>>
    
    @Query("SELECT * FROM sponsorships WHERE region = :region AND isActive = 1")
    fun getSponsorshipsByRegion(region: String): Flow<List<Sponsorship>>
    
    @Query("SELECT * FROM sponsorships WHERE sponsorType = :sponsorType AND isActive = 1")
    fun getSponsorshipsByType(sponsorType: SponsorType): Flow<List<Sponsorship>>
    
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertSponsorship(sponsorship: Sponsorship): Long
    
    @Update
    suspend fun updateSponsorship(sponsorship: Sponsorship)
    
    @Delete
    suspend fun deleteSponsorship(sponsorship: Sponsorship)
}

@Dao
interface AffiliateProductDao {
    @Query("SELECT * FROM affiliate_products WHERE isAvailable = 1")
    fun getAllAvailableProducts(): Flow<List<AffiliateProduct>>
    
    @Query("SELECT * FROM affiliate_products WHERE category = :category AND isAvailable = 1")
    fun getProductsByCategory(category: ProductCategory): Flow<List<AffiliateProduct>>
    
    @Query("SELECT * FROM affiliate_products WHERE vendor = :vendor AND isAvailable = 1")
    fun getProductsByVendor(vendor: String): Flow<List<AffiliateProduct>>
    
    @Query("SELECT * FROM affiliate_products WHERE price BETWEEN :minPrice AND :maxPrice AND isAvailable = 1")
    fun getProductsByPriceRange(minPrice: Double, maxPrice: Double): Flow<List<AffiliateProduct>>
    
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertProduct(product: AffiliateProduct): Long
    
    @Update
    suspend fun updateProduct(product: AffiliateProduct)
    
    @Delete
    suspend fun deleteProduct(product: AffiliateProduct)
}

@Dao
interface UserSubscriptionDao {
    @Query("SELECT * FROM user_subscriptions WHERE userId = :userId AND isActive = 1")
    fun getUserActiveSubscription(userId: Long): Flow<UserSubscription?>
    
    @Query("SELECT * FROM user_subscriptions WHERE userId = :userId")
    fun getUserSubscriptionHistory(userId: Long): Flow<List<UserSubscription>>
    
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertSubscription(subscription: UserSubscription): Long
    
    @Update
    suspend fun updateSubscription(subscription: UserSubscription)
    
    @Delete
    suspend fun deleteSubscription(subscription: UserSubscription)
}

@Dao
interface AdCampaignDao {
    @Query("SELECT * FROM ad_campaigns WHERE isActive = 1 AND startDate <= :currentTime AND endDate >= :currentTime")
    fun getActiveAdCampaigns(currentTime: Long = System.currentTimeMillis()): Flow<List<AdCampaign>>
    
    @Query("SELECT * FROM ad_campaigns WHERE adType = :adType AND isActive = 1")
    fun getAdCampaignsByType(adType: AdType): Flow<List<AdCampaign>>
    
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertAdCampaign(campaign: AdCampaign): Long
    
    @Update
    suspend fun updateAdCampaign(campaign: AdCampaign)
    
    @Delete
    suspend fun deleteAdCampaign(campaign: AdCampaign)
    
    @Query("UPDATE ad_campaigns SET impressions = impressions + 1, revenue = revenue + :cpm WHERE id = :campaignId")
    suspend fun incrementImpression(campaignId: Long, cpm: Double)
    
    @Query("UPDATE ad_campaigns SET clicks = clicks + 1, revenue = revenue + :cpc WHERE id = :campaignId")
    suspend fun incrementClick(campaignId: Long, cpc: Double)
}

@Dao
interface UserEarningsDao {
    @Query("SELECT * FROM user_earnings WHERE userId = :userId ORDER BY date DESC")
    fun getUserEarnings(userId: Long): Flow<List<UserEarnings>>
    
    @Query("SELECT * FROM user_earnings WHERE userId = :userId AND status = :status")
    fun getUserEarningsByStatus(userId: Long, status: EarningStatus): Flow<List<UserEarnings>>
    
    @Query("SELECT SUM(amount) FROM user_earnings WHERE userId = :userId AND status = :status")
    suspend fun getTotalEarningsByStatus(userId: Long, status: EarningStatus): Double?
    
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertEarnings(earnings: UserEarnings): Long
    
    @Update
    suspend fun updateEarnings(earnings: UserEarnings)
    
    @Delete
    suspend fun deleteEarnings(earnings: UserEarnings)
}

@Dao
interface CommunityProgramDao {
    @Query("SELECT * FROM community_programs WHERE isActive = 1")
    fun getActivePrograms(): Flow<List<CommunityProgram>>
    
    @Query("SELECT * FROM community_programs WHERE region = :region AND isActive = 1")
    fun getProgramsByRegion(region: String): Flow<List<CommunityProgram>>
    
    @Query("SELECT * FROM community_programs WHERE programType = :programType AND isActive = 1")
    fun getProgramsByType(programType: ProgramType): Flow<List<CommunityProgram>>
    
    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertProgram(program: CommunityProgram): Long
    
    @Update
    suspend fun updateProgram(program: CommunityProgram)
    
    @Delete
    suspend fun deleteProgram(program: CommunityProgram)
} 