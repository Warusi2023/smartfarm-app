package com.yourcompany.smartfarm.data.model

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.yourcompany.smartfarm.data.repository.*
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import java.text.SimpleDateFormat
import java.util.*

data class SponsorshipUiState(
    val isLoading: Boolean = false,
    val sponsorships: List<Sponsorship> = emptyList(),
    val error: String? = null,
    val selectedRegion: String = "",
    val selectedSponsorType: SponsorType? = null
)

data class AffiliateProductUiState(
    val isLoading: Boolean = false,
    val products: List<AffiliateProduct> = emptyList(),
    val error: String? = null,
    val selectedCategory: ProductCategory? = null,
    val priceRange: Pair<Double, Double>? = null,
    val searchQuery: String = ""
)

data class SubscriptionUiState(
    val isLoading: Boolean = false,
    val currentSubscription: UserSubscription? = null,
    val subscriptionHistory: List<UserSubscription> = emptyList(),
    val error: String? = null,
    val availablePlans: List<SubscriptionPlan> = emptyList()
)

data class SubscriptionPlan(
    val type: SubscriptionType,
    val name: String,
    val monthlyPrice: Double,
    val yearlyPrice: Double,
    val yearlyDiscount: Double = 0.0, // Discount percentage for yearly subscriptions
    val features: List<SubscriptionFeature>,
    val description: String,
    val billingPeriod: SubscriptionBillingPeriod = SubscriptionBillingPeriod.MONTHLY
)

data class EarningsUiState(
    val isLoading: Boolean = false,
    val earnings: List<UserEarnings> = emptyList(),
    val totalEarnings: Double = 0.0,
    val error: String? = null,
    val selectedPeriod: String = "All Time"
)

data class CommunityProgramUiState(
    val isLoading: Boolean = false,
    val programs: List<CommunityProgram> = emptyList(),
    val error: String? = null,
    val selectedRegion: String = ""
)

class SponsorshipViewModel(
    private val sponsorshipRepository: SponsorshipRepository
) : ViewModel() {
    
    private val _uiState = MutableStateFlow(SponsorshipUiState())
    val uiState: StateFlow<SponsorshipUiState> = _uiState.asStateFlow()
    
    init {
        loadSponsorships()
    }
    
    fun loadSponsorships() {
        viewModelScope.launch {
            _uiState.value = _uiState.value.copy(isLoading = true, error = null)
            
            try {
                val sponsorships = sponsorshipRepository.getAllActiveSponsorships()
                sponsorships.collect { sponsorshipList ->
                    _uiState.value = _uiState.value.copy(
                        isLoading = false,
                        sponsorships = sponsorshipList
                    )
                }
            } catch (e: Exception) {
                _uiState.value = _uiState.value.copy(
                    isLoading = false,
                    error = e.message ?: "Failed to load sponsorships"
                )
            }
        }
    }
    
    fun filterByRegion(region: String) {
        _uiState.value = _uiState.value.copy(selectedRegion = region)
        viewModelScope.launch {
            try {
                val sponsorships = sponsorshipRepository.getSponsorshipsByRegion(region)
                sponsorships.collect { sponsorshipList ->
                    _uiState.value = _uiState.value.copy(sponsorships = sponsorshipList)
                }
            } catch (e: Exception) {
                _uiState.value = _uiState.value.copy(
                    error = e.message ?: "Failed to filter sponsorships"
                )
            }
        }
    }
    
    fun filterBySponsorType(sponsorType: SponsorType) {
        _uiState.value = _uiState.value.copy(selectedSponsorType = sponsorType)
        viewModelScope.launch {
            try {
                val sponsorships = sponsorshipRepository.getSponsorshipsByType(sponsorType)
                sponsorships.collect { sponsorshipList ->
                    _uiState.value = _uiState.value.copy(sponsorships = sponsorshipList)
                }
            } catch (e: Exception) {
                _uiState.value = _uiState.value.copy(
                    error = e.message ?: "Failed to filter sponsorships"
                )
            }
        }
    }
    
    fun clearError() {
        _uiState.value = _uiState.value.copy(error = null)
    }
}

class AffiliateProductViewModel(
    private val affiliateProductRepository: AffiliateProductRepository
) : ViewModel() {
    
    private val _uiState = MutableStateFlow(AffiliateProductUiState())
    val uiState: StateFlow<AffiliateProductUiState> = _uiState.asStateFlow()
    
    init {
        loadProducts()
    }
    
    fun loadProducts() {
        viewModelScope.launch {
            _uiState.value = _uiState.value.copy(isLoading = true, error = null)
            
            try {
                val products = affiliateProductRepository.getAllAvailableProducts()
                products.collect { productList ->
                    _uiState.value = _uiState.value.copy(
                        isLoading = false,
                        products = productList
                    )
                }
            } catch (e: Exception) {
                _uiState.value = _uiState.value.copy(
                    isLoading = false,
                    error = e.message ?: "Failed to load products"
                )
            }
        }
    }
    
    fun filterByCategory(category: ProductCategory) {
        _uiState.value = _uiState.value.copy(selectedCategory = category)
        viewModelScope.launch {
            try {
                val products = affiliateProductRepository.getProductsByCategory(category)
                products.collect { productList ->
                    _uiState.value = _uiState.value.copy(products = productList)
                }
            } catch (e: Exception) {
                _uiState.value = _uiState.value.copy(
                    error = e.message ?: "Failed to filter products"
                )
            }
        }
    }
    
    fun filterByPriceRange(minPrice: Double, maxPrice: Double) {
        _uiState.value = _uiState.value.copy(priceRange = Pair(minPrice, maxPrice))
        viewModelScope.launch {
            try {
                val products = affiliateProductRepository.getProductsByPriceRange(minPrice, maxPrice)
                products.collect { productList ->
                    _uiState.value = _uiState.value.copy(products = productList)
                }
            } catch (e: Exception) {
                _uiState.value = _uiState.value.copy(
                    error = e.message ?: "Failed to filter products"
                )
            }
        }
    }
    
    fun searchProducts(query: String) {
        _uiState.value = _uiState.value.copy(searchQuery = query)
        // Filter products based on search query
        val filteredProducts = _uiState.value.products.filter { product ->
            product.name.contains(query, ignoreCase = true) ||
            product.description.contains(query, ignoreCase = true) ||
            product.vendor.contains(query, ignoreCase = true)
        }
        _uiState.value = _uiState.value.copy(products = filteredProducts)
    }
    
    fun clearError() {
        _uiState.value = _uiState.value.copy(error = null)
    }
}

class SubscriptionViewModel(
    private val userSubscriptionRepository: UserSubscriptionRepository
) : ViewModel() {
    
    private val _uiState = MutableStateFlow(SubscriptionUiState())
    val uiState: StateFlow<SubscriptionUiState> = _uiState.asStateFlow()
    
    init {
        loadSubscriptionPlans()
    }
    
    private fun loadSubscriptionPlans() {
        val plans = listOf(
            SubscriptionPlan(
                type = SubscriptionType.FREE,
                name = "Free Plan",
                monthlyPrice = 0.0,
                yearlyPrice = 0.0,
                features = listOf(
                    SubscriptionFeature.AD_FREE
                ),
                description = "Basic features with ads"
            ),
            SubscriptionPlan(
                type = SubscriptionType.PREMIUM,
                name = "Premium Plan",
                monthlyPrice = 9.99,
                yearlyPrice = 99.99,
                yearlyDiscount = 16.7, // 2 months free (16.7% discount)
                features = listOf(
                    SubscriptionFeature.AD_FREE,
                    SubscriptionFeature.UNLIMITED_WEATHER_DATA,
                    SubscriptionFeature.ADVANCED_ANALYTICS,
                    SubscriptionFeature.PRIORITY_SUPPORT
                ),
                description = "Advanced features for serious farmers"
            ),
            SubscriptionPlan(
                type = SubscriptionType.ENTERPRISE,
                name = "Enterprise Plan",
                monthlyPrice = 29.99,
                yearlyPrice = 299.99,
                yearlyDiscount = 16.7, // 2 months free (16.7% discount)
                features = listOf(
                    SubscriptionFeature.AD_FREE,
                    SubscriptionFeature.UNLIMITED_WEATHER_DATA,
                    SubscriptionFeature.ADVANCED_ANALYTICS,
                    SubscriptionFeature.EXPERT_CONSULTATION,
                    SubscriptionFeature.PRIORITY_SUPPORT,
                    SubscriptionFeature.CUSTOM_REPORTS,
                    SubscriptionFeature.API_ACCESS
                ),
                description = "Complete solution for large farms"
            ),
            SubscriptionPlan(
                type = SubscriptionType.COMMUNITY,
                name = "Community Plan",
                monthlyPrice = 0.0,
                yearlyPrice = 0.0,
                features = listOf(
                    SubscriptionFeature.AD_FREE,
                    SubscriptionFeature.SPONSORSHIP_ACCESS,
                    SubscriptionFeature.AFFILIATE_COMMISSIONS
                ),
                description = "Sponsored by government/NGO programs"
            )
        )
        
        _uiState.value = _uiState.value.copy(availablePlans = plans)
    }
    
    fun loadUserSubscription(userId: Long) {
        viewModelScope.launch {
            _uiState.value = _uiState.value.copy(isLoading = true, error = null)
            
            try {
                val subscription = userSubscriptionRepository.getUserActiveSubscription(userId)
                subscription.collect { userSubscription ->
                    _uiState.value = _uiState.value.copy(
                        isLoading = false,
                        currentSubscription = userSubscription
                    )
                }
            } catch (e: Exception) {
                _uiState.value = _uiState.value.copy(
                    isLoading = false,
                    error = e.message ?: "Failed to load subscription"
                )
            }
        }
    }
    
    fun subscribeToPlan(userId: Long, plan: SubscriptionPlan, billingPeriod: SubscriptionBillingPeriod = SubscriptionBillingPeriod.MONTHLY) {
        viewModelScope.launch {
            try {
                val durationInMillis = when (billingPeriod) {
                    SubscriptionBillingPeriod.MONTHLY -> 30 * 24 * 60 * 60 * 1000L // 30 days
                    SubscriptionBillingPeriod.YEARLY -> 365 * 24 * 60 * 60 * 1000L // 365 days
                }
                
                val price = when (billingPeriod) {
                    SubscriptionBillingPeriod.MONTHLY -> plan.monthlyPrice
                    SubscriptionBillingPeriod.YEARLY -> plan.yearlyPrice
                }
                
                val originalYearlyPrice = plan.monthlyPrice * 12
                
                val subscription = UserSubscription(
                    userId = userId,
                    subscriptionType = plan.type,
                    billingPeriod = billingPeriod,
                    startDate = System.currentTimeMillis(),
                    endDate = System.currentTimeMillis() + durationInMillis,
                    amount = price,
                    paymentMethod = null, // TODO: Add payment method selection
                    features = plan.features,
                    yearlyDiscount = if (billingPeriod == SubscriptionBillingPeriod.YEARLY) plan.yearlyDiscount else 0.0,
                    originalYearlyPrice = originalYearlyPrice
                )
                
                userSubscriptionRepository.insertSubscription(subscription)
                loadUserSubscription(userId)
            } catch (e: Exception) {
                _uiState.value = _uiState.value.copy(
                    error = e.message ?: "Failed to subscribe to plan"
                )
            }
        }
    }
    
    fun cancelSubscription(userId: Long) {
        viewModelScope.launch {
            try {
                userSubscriptionRepository.cancelSubscription(userId)
                loadUserSubscription(userId)
            } catch (e: Exception) {
                _uiState.value = _uiState.value.copy(
                    error = e.message ?: "Failed to cancel subscription"
                )
            }
        }
    }
    
    fun clearError() {
        _uiState.value = _uiState.value.copy(error = null)
    }
}

class EarningsViewModel(
    private val userEarningsRepository: UserEarningsRepository
) : ViewModel() {
    
    private val _uiState = MutableStateFlow(EarningsUiState())
    val uiState: StateFlow<EarningsUiState> = _uiState.asStateFlow()
    
    fun loadUserEarnings(userId: Long) {
        viewModelScope.launch {
            _uiState.value = _uiState.value.copy(isLoading = true, error = null)
            
            try {
                val earnings = userEarningsRepository.getUserEarnings(userId)
                val totalEarnings = userEarningsRepository.getTotalEarnings(userId)
                
                earnings.collect { earningsList ->
                    totalEarnings.collect { total ->
                        _uiState.value = _uiState.value.copy(
                            isLoading = false,
                            earnings = earningsList,
                            totalEarnings = total ?: 0.0
                        )
                    }
                }
            } catch (e: Exception) {
                _uiState.value = _uiState.value.copy(
                    isLoading = false,
                    error = e.message ?: "Failed to load earnings"
                )
            }
        }
    }
    
    fun filterEarningsByPeriod(userId: Long, period: String) {
        _uiState.value = _uiState.value.copy(selectedPeriod = period)
        // Implement period filtering logic
        loadUserEarnings(userId)
    }
    
    fun clearError() {
        _uiState.value = _uiState.value.copy(error = null)
    }
}

class CommunityProgramViewModel(
    private val communityProgramRepository: CommunityProgramRepository
) : ViewModel() {
    
    private val _uiState = MutableStateFlow(CommunityProgramUiState())
    val uiState: StateFlow<CommunityProgramUiState> = _uiState.asStateFlow()
    
    init {
        loadPrograms()
    }
    
    fun loadPrograms() {
        viewModelScope.launch {
            _uiState.value = _uiState.value.copy(isLoading = true, error = null)
            
            try {
                val programs = communityProgramRepository.getAllActivePrograms()
                programs.collect { programList ->
                    _uiState.value = _uiState.value.copy(
                        isLoading = false,
                        programs = programList
                    )
                }
            } catch (e: Exception) {
                _uiState.value = _uiState.value.copy(
                    isLoading = false,
                    error = e.message ?: "Failed to load programs"
                )
            }
        }
    }
    
    fun filterByRegion(region: String) {
        _uiState.value = _uiState.value.copy(selectedRegion = region)
        viewModelScope.launch {
            try {
                val programs = communityProgramRepository.getProgramsByRegion(region)
                programs.collect { programList ->
                    _uiState.value = _uiState.value.copy(programs = programList)
                }
            } catch (e: Exception) {
                _uiState.value = _uiState.value.copy(
                    error = e.message ?: "Failed to filter programs"
                )
            }
        }
    }
    
    fun joinProgram(programId: Long) {
        viewModelScope.launch {
            try {
                communityProgramRepository.joinProgram(programId)
                loadPrograms() // Reload to update participant count
            } catch (e: Exception) {
                _uiState.value = _uiState.value.copy(
                    error = e.message ?: "Failed to join program"
                )
            }
        }
    }
    
    fun clearError() {
        _uiState.value = _uiState.value.copy(error = null)
    }
} 