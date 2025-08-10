package com.example.smartfarm.util

import android.util.Patterns
import java.util.regex.Pattern

/**
 * Comprehensive validation utilities for the SmartFarm app
 */
object ValidationUtils {
    
    /**
     * Validation result sealed class
     */
    sealed class ValidationResult {
        object Success : ValidationResult()
        data class Error(val message: String) : ValidationResult()
    }
    
    /**
     * Validate email format
     */
    fun validateEmail(email: String): ValidationResult {
        return when {
            email.isEmpty() -> ValidationResult.Error("Email is required")
            !Patterns.EMAIL_ADDRESS.matcher(email).matches() -> 
                ValidationResult.Error("Please enter a valid email address")
            else -> ValidationResult.Success
        }
    }
    
    /**
     * Validate phone number
     */
    fun validatePhoneNumber(phone: String): ValidationResult {
        return when {
            phone.isEmpty() -> ValidationResult.Error("Phone number is required")
            !Patterns.PHONE.matcher(phone).matches() -> 
                ValidationResult.Error("Please enter a valid phone number")
            else -> ValidationResult.Success
        }
    }
    
    /**
     * Validate required field
     */
    fun validateRequired(value: String, fieldName: String): ValidationResult {
        return when {
            value.trim().isEmpty() -> ValidationResult.Error("$fieldName is required")
            else -> ValidationResult.Success
        }
    }
    
    /**
     * Validate minimum length
     */
    fun validateMinLength(value: String, minLength: Int, fieldName: String): ValidationResult {
        return when {
            value.length < minLength -> 
                ValidationResult.Error("$fieldName must be at least $minLength characters")
            else -> ValidationResult.Success
        }
    }
    
    /**
     * Validate maximum length
     */
    fun validateMaxLength(value: String, maxLength: Int, fieldName: String): ValidationResult {
        return when {
            value.length > maxLength -> 
                ValidationResult.Error("$fieldName must be no more than $maxLength characters")
            else -> ValidationResult.Success
        }
    }
    
    /**
     * Validate numeric value
     */
    fun validateNumeric(value: String, fieldName: String): ValidationResult {
        return when {
            value.isEmpty() -> ValidationResult.Error("$fieldName is required")
            !value.matches(Regex("-?\\d+(\\.\\d+)?")) -> 
                ValidationResult.Error("$fieldName must be a valid number")
            else -> ValidationResult.Success
        }
    }
    
    /**
     * Validate positive number
     */
    fun validatePositiveNumber(value: String, fieldName: String): ValidationResult {
        val numericResult = validateNumeric(value, fieldName)
        if (numericResult is ValidationResult.Error) return numericResult
        
        return when {
            value.toDoubleOrNull()?.let { it <= 0 } == true -> 
                ValidationResult.Error("$fieldName must be greater than 0")
            else -> ValidationResult.Success
        }
    }
    
    /**
     * Validate number range
     */
    fun validateNumberRange(
        value: String, 
        min: Double, 
        max: Double, 
        fieldName: String
    ): ValidationResult {
        val numericResult = validateNumeric(value, fieldName)
        if (numericResult is ValidationResult.Error) return numericResult
        
        val numValue = value.toDoubleOrNull() ?: return ValidationResult.Error("Invalid number")
        return when {
            numValue < min || numValue > max -> 
                ValidationResult.Error("$fieldName must be between $min and $max")
            else -> ValidationResult.Success
        }
    }
    
    /**
     * Validate date format
     */
    fun validateDateFormat(dateString: String, pattern: String = "yyyy-MM-dd"): ValidationResult {
        return try {
            val formatter = java.text.SimpleDateFormat(pattern, java.util.Locale.getDefault())
            formatter.isLenient = false
            formatter.parse(dateString)
            ValidationResult.Success
        } catch (e: Exception) {
            ValidationResult.Error("Please enter a valid date (YYYY-MM-DD)")
        }
    }
    
    /**
     * Validate future date
     */
    fun validateFutureDate(dateString: String): ValidationResult {
        val dateResult = validateDateFormat(dateString)
        if (dateResult is ValidationResult.Error) return dateResult
        
        val formatter = java.text.SimpleDateFormat("yyyy-MM-dd", java.util.Locale.getDefault())
        val inputDate = formatter.parse(dateString)
        val today = java.util.Date()
        
        return when {
            inputDate?.before(today) == true -> 
                ValidationResult.Error("Date must be in the future")
            else -> ValidationResult.Success
        }
    }
    
    /**
     * Validate past date
     */
    fun validatePastDate(dateString: String): ValidationResult {
        val dateResult = validateDateFormat(dateString)
        if (dateResult is ValidationResult.Error) return dateResult
        
        val formatter = java.text.SimpleDateFormat("yyyy-MM-dd", java.util.Locale.getDefault())
        val inputDate = formatter.parse(dateString)
        val today = java.util.Date()
        
        return when {
            inputDate?.after(today) == true -> 
                ValidationResult.Error("Date must be in the past")
            else -> ValidationResult.Success
        }
    }
    
    /**
     * Validate livestock name
     */
    fun validateLivestockName(name: String): ValidationResult {
        return when {
            name.trim().isEmpty() -> ValidationResult.Error("Livestock name is required")
            name.length < 2 -> ValidationResult.Error("Name must be at least 2 characters")
            name.length > 50 -> ValidationResult.Error("Name must be no more than 50 characters")
            !name.matches(Regex("^[a-zA-Z0-9\\s\\-']+$")) -> 
                ValidationResult.Error("Name contains invalid characters")
            else -> ValidationResult.Success
        }
    }
    
    /**
     * Validate livestock age
     */
    fun validateLivestockAge(age: String): ValidationResult {
        return validateNumberRange(age, 0.0, 50.0, "Age")
    }
    
    /**
     * Validate livestock weight
     */
    fun validateLivestockWeight(weight: String): ValidationResult {
        return validatePositiveNumber(weight, "Weight")
    }
    
    /**
     * Validate GPS coordinates
     */
    fun validateGpsCoordinates(latitude: String, longitude: String): ValidationResult {
        val latResult = validateNumberRange(latitude, -90.0, 90.0, "Latitude")
        if (latResult is ValidationResult.Error) return latResult
        
        val lonResult = validateNumberRange(longitude, -180.0, 180.0, "Longitude")
        if (lonResult is ValidationResult.Error) return lonResult
        
        return ValidationResult.Success
    }
    
    /**
     * Validate health status
     */
    fun validateHealthStatus(status: String): ValidationResult {
        val validStatuses = listOf("Excellent", "Good", "Fair", "Poor", "Critical")
        return when {
            status.isEmpty() -> ValidationResult.Error("Health status is required")
            !validStatuses.contains(status) -> 
                ValidationResult.Error("Please select a valid health status")
            else -> ValidationResult.Success
        }
    }
    
    /**
     * Validate breed
     */
    fun validateBreed(breed: String): ValidationResult {
        return when {
            breed.trim().isEmpty() -> ValidationResult.Error("Breed is required")
            breed.length < 2 -> ValidationResult.Error("Breed must be at least 2 characters")
            breed.length > 100 -> ValidationResult.Error("Breed must be no more than 100 characters")
            else -> ValidationResult.Success
        }
    }
    
    /**
     * Validate quantity
     */
    fun validateQuantity(quantity: String): ValidationResult {
        return validatePositiveNumber(quantity, "Quantity")
    }
    
    /**
     * Validate price
     */
    fun validatePrice(price: String): ValidationResult {
        return when {
            price.isEmpty() -> ValidationResult.Error("Price is required")
            !price.matches(Regex("^\\d+(\\.\\d{1,2})?$")) -> 
                ValidationResult.Error("Please enter a valid price")
            price.toDoubleOrNull()?.let { it < 0 } == true -> 
                ValidationResult.Error("Price cannot be negative")
            else -> ValidationResult.Success
        }
    }
    
    /**
     * Validate percentage
     */
    fun validatePercentage(percentage: String): ValidationResult {
        return validateNumberRange(percentage, 0.0, 100.0, "Percentage")
    }
    
    /**
     * Validate task title
     */
    fun validateTaskTitle(title: String): ValidationResult {
        return when {
            title.trim().isEmpty() -> ValidationResult.Error("Task title is required")
            title.length < 3 -> ValidationResult.Error("Title must be at least 3 characters")
            title.length > 200 -> ValidationResult.Error("Title must be no more than 200 characters")
            else -> ValidationResult.Success
        }
    }
    
    /**
     * Validate task description
     */
    fun validateTaskDescription(description: String): ValidationResult {
        return when {
            description.length > 1000 -> 
                ValidationResult.Error("Description must be no more than 1000 characters")
            else -> ValidationResult.Success
        }
    }
    
    /**
     * Validate user password
     */
    fun validatePassword(password: String): ValidationResult {
        return when {
            password.isEmpty() -> ValidationResult.Error("Password is required")
            password.length < 8 -> ValidationResult.Error("Password must be at least 8 characters")
            !password.matches(Regex(".*[A-Z].*")) -> 
                ValidationResult.Error("Password must contain at least one uppercase letter")
            !password.matches(Regex(".*[a-z].*")) -> 
                ValidationResult.Error("Password must contain at least one lowercase letter")
            !password.matches(Regex(".*\\d.*")) -> 
                ValidationResult.Error("Password must contain at least one number")
            !password.matches(Regex(".*[!@#\$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?].*")) -> 
                ValidationResult.Error("Password must contain at least one special character")
            else -> ValidationResult.Success
        }
    }
    
    /**
     * Validate password confirmation
     */
    fun validatePasswordConfirmation(password: String, confirmation: String): ValidationResult {
        return when {
            confirmation.isEmpty() -> ValidationResult.Error("Please confirm your password")
            password != confirmation -> ValidationResult.Error("Passwords do not match")
            else -> ValidationResult.Success
        }
    }
    
    /**
     * Validate username
     */
    fun validateUsername(username: String): ValidationResult {
        return when {
            username.isEmpty() -> ValidationResult.Error("Username is required")
            username.length < 3 -> ValidationResult.Error("Username must be at least 3 characters")
            username.length > 30 -> ValidationResult.Error("Username must be no more than 30 characters")
            !username.matches(Regex("^[a-zA-Z0-9_]+$")) -> 
                ValidationResult.Error("Username can only contain letters, numbers, and underscores")
            else -> ValidationResult.Success
        }
    }
    
    /**
     * Validate farm name
     */
    fun validateFarmName(name: String): ValidationResult {
        return when {
            name.trim().isEmpty() -> ValidationResult.Error("Farm name is required")
            name.length < 2 -> ValidationResult.Error("Farm name must be at least 2 characters")
            name.length > 100 -> ValidationResult.Error("Farm name must be no more than 100 characters")
            else -> ValidationResult.Success
        }
    }
    
    /**
     * Validate farm size
     */
    fun validateFarmSize(size: String): ValidationResult {
        return validatePositiveNumber(size, "Farm size")
    }
    
    /**
     * Validate crop name
     */
    fun validateCropName(name: String): ValidationResult {
        return when {
            name.trim().isEmpty() -> ValidationResult.Error("Crop name is required")
            name.length < 2 -> ValidationResult.Error("Crop name must be at least 2 characters")
            name.length > 100 -> ValidationResult.Error("Crop name must be no more than 100 characters")
            else -> ValidationResult.Success
        }
    }
    
    /**
     * Validate yield amount
     */
    fun validateYieldAmount(amount: String): ValidationResult {
        return validatePositiveNumber(amount, "Yield amount")
    }
    
    /**
     * Validate weather data
     */
    fun validateWeatherData(temperature: String, humidity: String): ValidationResult {
        val tempResult = validateNumberRange(temperature, -50.0, 60.0, "Temperature")
        if (tempResult is ValidationResult.Error) return tempResult
        
        val humResult = validateNumberRange(humidity, 0.0, 100.0, "Humidity")
        if (humResult is ValidationResult.Error) return humResult
        
        return ValidationResult.Success
    }
    
    /**
     * Validate multiple fields
     */
    fun validateMultiple(vararg validations: ValidationResult): ValidationResult {
        val errors = validations.filterIsInstance<ValidationResult.Error>()
        return if (errors.isEmpty()) {
            ValidationResult.Success
        } else {
            ValidationResult.Error(errors.first().message)
        }
    }
    
    /**
     * Validate all fields and return all errors
     */
    fun validateAll(vararg validations: ValidationResult): List<String> {
        return validations.filterIsInstance<ValidationResult.Error>().map { it.message }
    }
    
    /**
     * Check if validation result is success
     */
    fun isSuccess(result: ValidationResult): Boolean {
        return result is ValidationResult.Success
    }
    
    /**
     * Get error message from validation result
     */
    fun getErrorMessage(result: ValidationResult): String? {
        return if (result is ValidationResult.Error) result.message else null
    }
} 