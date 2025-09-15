package com.smartfarm.auth

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.smartfarm.data.model.*
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import java.util.*

data class RegisterUiState(
    // Personal Information
    val firstName: String = "",
    val lastName: String = "",
    val email: String = "",
    val phone: String = "",
    val username: String = "",
    val password: String = "",
    val confirmPassword: String = "",
    
    // Location Information
    val country: Country = Country.FIJI,
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
    
    // UI State
    val isLoading: Boolean = false,
    val error: String? = null,
    val isRegistered: Boolean = false,
    val showPassword: Boolean = false,
    val showConfirmPassword: Boolean = false,
    val acceptTerms: Boolean = false,
    val validationErrors: Set<String> = emptySet()
)

class RegisterViewModel(
    private val authenticationManager: AuthenticationManager
) : ViewModel() {
    
    private val _uiState = MutableStateFlow(RegisterUiState())
    val uiState: StateFlow<RegisterUiState> = _uiState.asStateFlow()
    
    // Personal Information Updates
    fun updateFirstName(firstName: String) {
        _uiState.value = _uiState.value.copy(
            firstName = firstName, 
            validationErrors = _uiState.value.validationErrors - "firstName"
        )
    }
    
    fun updateLastName(lastName: String) {
        _uiState.value = _uiState.value.copy(
            lastName = lastName, 
            validationErrors = _uiState.value.validationErrors - "lastName"
        )
    }
    
    fun updateEmail(email: String) {
        _uiState.value = _uiState.value.copy(
            email = email, 
            validationErrors = _uiState.value.validationErrors - "email"
        )
    }
    
    fun updatePhone(phone: String) {
        _uiState.value = _uiState.value.copy(
            phone = phone, 
            validationErrors = _uiState.value.validationErrors - "phone"
        )
    }
    
    fun updateUsername(username: String) {
        _uiState.value = _uiState.value.copy(
            username = username, 
            validationErrors = _uiState.value.validationErrors - "username"
        )
    }
    
    fun updatePassword(password: String) {
        _uiState.value = _uiState.value.copy(
            password = password, 
            validationErrors = _uiState.value.validationErrors - "password"
        )
    }
    
    fun updateConfirmPassword(confirmPassword: String) {
        _uiState.value = _uiState.value.copy(
            confirmPassword = confirmPassword, 
            validationErrors = _uiState.value.validationErrors - "confirmPassword"
        )
    }
    
    // Location Information Updates
    fun updateCountry(country: Country) {
        _uiState.value = _uiState.value.copy(country = country)
    }
    
    fun updateRegion(region: String) {
        _uiState.value = _uiState.value.copy(
            region = region, 
            validationErrors = _uiState.value.validationErrors - "region"
        )
    }
    
    fun updateDistrict(district: String) {
        _uiState.value = _uiState.value.copy(
            district = district, 
            validationErrors = _uiState.value.validationErrors - "district"
        )
    }
    
    fun updateVillage(village: String) {
        _uiState.value = _uiState.value.copy(village = village)
    }
    
    // Farm Information Updates
    fun updateFarmName(farmName: String) {
        _uiState.value = _uiState.value.copy(
            farmName = farmName, 
            validationErrors = _uiState.value.validationErrors - "farmName"
        )
    }
    
    fun updateFarmSize(farmSize: Double) {
        _uiState.value = _uiState.value.copy(
            farmSize = farmSize, 
            validationErrors = _uiState.value.validationErrors - "farmSize"
        )
    }
    
    fun updateFarmType(farmType: FarmType) {
        _uiState.value = _uiState.value.copy(farmType = farmType)
    }
    
    fun updateExperience(experience: ExperienceLevel) {
        _uiState.value = _uiState.value.copy(experience = experience)
    }
    
    fun updateCrops(crops: String) {
        _uiState.value = _uiState.value.copy(crops = crops)
    }
    
    fun updateIrrigation(irrigation: IrrigationMethod) {
        _uiState.value = _uiState.value.copy(irrigation = irrigation)
    }
    
    // Additional Information Updates
    fun updateEducation(education: EducationLevel) {
        _uiState.value = _uiState.value.copy(education = education)
    }
    
    fun updateIncome(income: IncomeRange) {
        _uiState.value = _uiState.value.copy(income = income)
    }
    
    fun updateMarketing(marketing: MarketingChannel) {
        _uiState.value = _uiState.value.copy(marketing = marketing)
    }
    
    fun updateTechnology(technology: TechnologyUsage) {
        _uiState.value = _uiState.value.copy(technology = technology)
    }
    
    fun updateChallenges(challenges: String) {
        _uiState.value = _uiState.value.copy(challenges = challenges)
    }
    
    fun updateGoals(goals: String) {
        _uiState.value = _uiState.value.copy(goals = goals)
    }
    
    fun updateNewsletter(newsletter: Boolean) {
        _uiState.value = _uiState.value.copy(newsletter = newsletter)
    }
    
    // UI State Updates
    fun togglePasswordVisibility() {
        _uiState.value = _uiState.value.copy(showPassword = !_uiState.value.showPassword)
    }
    
    fun toggleConfirmPasswordVisibility() {
        _uiState.value = _uiState.value.copy(showConfirmPassword = !_uiState.value.showConfirmPassword)
    }
    
    fun updateAcceptTerms(accept: Boolean) {
        _uiState.value = _uiState.value.copy(
            acceptTerms = accept, 
            validationErrors = _uiState.value.validationErrors - "acceptTerms"
        )
    }
    
    fun register() {
        val currentState = _uiState.value
        
        // Validate input
        val validationErrors = validateInput(currentState)
        if (validationErrors.isNotEmpty()) {
            _uiState.value = currentState.copy(validationErrors = validationErrors)
            return
        }
        
        viewModelScope.launch {
            _uiState.value = currentState.copy(isLoading = true, error = null, validationErrors = emptySet())
            
            // Create comprehensive farmer data
            val farmerData = FarmerData(
                firstName = currentState.firstName.trim(),
                lastName = currentState.lastName.trim(),
                email = currentState.email.trim(),
                phone = currentState.phone.trim(),
                username = currentState.username.trim(),
                country = currentState.country,
                region = currentState.region.trim(),
                district = currentState.district.trim(),
                village = currentState.village.trim(),
                farmName = currentState.farmName.trim(),
                farmSize = currentState.farmSize,
                farmType = currentState.farmType,
                experience = currentState.experience,
                crops = currentState.crops.trim(),
                irrigation = currentState.irrigation,
                education = currentState.education,
                income = currentState.income,
                marketing = currentState.marketing,
                technology = currentState.technology,
                challenges = currentState.challenges.trim(),
                goals = currentState.goals.trim(),
                newsletter = currentState.newsletter,
                registrationDate = Date(),
                userAgent = "Android App"
            )
            
            val result = authenticationManager.registerFarmer(
                farmerData = farmerData,
                password = currentState.password
            )
            
            when (result) {
                is AuthResult.Success -> {
                    _uiState.value = currentState.copy(
                        isLoading = false,
                        isRegistered = true,
                        error = null,
                        validationErrors = emptySet()
                    )
                }
                is AuthResult.Error -> {
                    _uiState.value = currentState.copy(
                        isLoading = false,
                        error = result.message,
                        validationErrors = emptySet()
                    )
                }
            }
        }
    }
    
    private fun validateInput(state: RegisterUiState): Set<String> {
        val errors = mutableSetOf<String>()
        
        // Personal Information Validation
        if (state.firstName.isBlank()) {
            errors.add("firstName")
        }
        
        if (state.lastName.isBlank()) {
            errors.add("lastName")
        }
        
        if (state.email.isBlank()) {
            errors.add("email")
        } else if (!android.util.Patterns.EMAIL_ADDRESS.matcher(state.email).matches()) {
            errors.add("email")
        }
        
        if (state.phone.isBlank()) {
            errors.add("phone")
        }
        
        if (state.username.isBlank()) {
            errors.add("username")
        } else if (state.username.length < 3) {
            errors.add("username")
        }
        
        if (state.password.isBlank()) {
            errors.add("password")
        } else if (state.password.length < 8) {
            errors.add("password")
        } else if (!state.password.any { it.isUpperCase() }) {
            errors.add("password")
        } else if (!state.password.any { it.isLowerCase() }) {
            errors.add("password")
        } else if (!state.password.any { it.isDigit() }) {
            errors.add("password")
        }
        
        if (state.password != state.confirmPassword) {
            errors.add("confirmPassword")
        }
        
        // Location Information Validation
        if (state.region.isBlank()) {
            errors.add("region")
        }
        
        if (state.district.isBlank()) {
            errors.add("district")
        }
        
        // Farm Information Validation
        if (state.farmName.isBlank()) {
            errors.add("farmName")
        }
        
        if (state.farmSize <= 0) {
            errors.add("farmSize")
        }
        
        // Terms and Conditions
        if (!state.acceptTerms) {
            errors.add("acceptTerms")
        }
        
        return errors
    }
    
    fun clearError() {
        _uiState.value = _uiState.value.copy(error = null)
    }
    
    fun resetState() {
        _uiState.value = RegisterUiState()
    }
}
