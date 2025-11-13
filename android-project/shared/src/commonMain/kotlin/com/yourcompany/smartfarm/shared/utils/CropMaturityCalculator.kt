package com.yourcompany.smartfarm.shared.utils

import java.time.LocalDate
import java.time.format.DateTimeFormatter
import java.time.temporal.ChronoUnit

object CropMaturityCalculator {
    // Catalog fallback database for maturity calculations
    private val cropMaturityDatabase = mapOf(
        // Vegetables
        "tomatoes" to 75,
        "cherry tomatoes" to 65,
        "beefsteak tomatoes" to 85,
        "peppers" to 70,
        "bell peppers" to 75,
        "chili peppers" to 80,
        "lettuce" to 45,
        "romaine lettuce" to 50,
        "spinach" to 40,
        "cucumbers" to 55,
        "carrots" to 75,
        "onions" to 130,
        "potatoes" to 90,
        "cabbage" to 90,
        "broccoli" to 60,
        "cauliflower" to 70,
        "eggplant" to 85,
        "okra" to 55,
        "zucchini" to 50,
        "kale" to 55,
        "celery" to 120,
        "asparagus" to 730, // 2-3 years first harvest
        
        // Fruits
        "strawberries" to 30,
        "watermelons" to 85,
        "cantaloupes" to 80,
        "pumpkins" to 100,
        "squash" to 60,
        "winter squash" to 100,
        "bananas" to 300,
        "pineapple" to 540,
        "papaya" to 240,
        "mango" to 120,
        
        // Grains
        "corn" to 90,
        "wheat" to 120,
        "rice" to 120,
        "barley" to 100,
        "oats" to 90,
        "sorghum" to 100,
        "millet" to 70,
        
        // Legumes
        "beans" to 60,
        "green beans" to 55,
        "peas" to 60,
        "lentils" to 100,
        "chickpeas" to 100,
        "soybeans" to 100,
        "peanuts" to 120,
        "black beans" to 90,
        "lima beans" to 75,
        
        // Herbs and Spices
        "basil" to 30,
        "cilantro" to 25,
        "parsley" to 70,
        "oregano" to 40,
        "thyme" to 45,
        "mint" to 30,
        "rosemary" to 90,
        "sage" to 75,
        "dill" to 40,
        "chives" to 30,
        "vanilla" to 1095, // 3 years - matches web project fallback
        
        // Medicinal Plants
        "kava" to 1095, // 3-4 years
        "aloe vera" to 365,
        "ginger" to 240,
        "turmeric" to 270,
        "lavender" to 180,
        "ginseng" to 2190, // 6+ years
        
        // Root Vegetables
        "radishes" to 30,
        "beets" to 60,
        "turnips" to 50,
        "sweet potatoes" to 120,
        "cassava" to 365,
        "taro" to 270,
        "yam" to 240,
        "garlic" to 240,
        "shallots" to 100
    )
    
    /**
     * Calculate maturity date for a crop based on planting date and crop name
     * Uses catalog data if available, otherwise falls back to database
     */
    fun calculateMaturityDate(
        cropName: String,
        plantedDate: String,
        catalogGrowthDays: Int? = null
    ): String {
        val normalizedName = cropName.lowercase().trim()
        
        // Use catalog data if provided
        val maturityDays = catalogGrowthDays ?: cropMaturityDatabase[normalizedName] ?: 60
        
        try {
            val planted = LocalDate.parse(plantedDate, DateTimeFormatter.ISO_DATE)
            val maturity = planted.plusDays(maturityDays.toLong())
            return maturity.format(DateTimeFormatter.ISO_DATE)
        } catch (e: Exception) {
            // Fallback to current date + maturity days if parsing fails
            val planted = LocalDate.now()
            val maturity = planted.plusDays(maturityDays.toLong())
            return maturity.format(DateTimeFormatter.ISO_DATE)
        }
    }
    
    /**
     * Get maturity days for a crop from the fallback database
     */
    fun getMaturityDays(cropName: String): Int {
        val normalizedName = cropName.lowercase().trim()
        return cropMaturityDatabase[normalizedName] ?: 60
    }
}

