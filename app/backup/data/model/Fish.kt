package com.yourcompany.smartfarm.data.model

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "fish")
data class Fish(
    @PrimaryKey(autoGenerate = true)
    val id: Long = 0,
    val name: String,
    val scientificName: String,
    val category: FishCategory,
    val subCategory: String,
    val description: String,
    val imageUrl: String,
    val waterType: WaterType,
    val temperatureRange: String, // e.g., "22-28°C"
    val phRange: String, // e.g., "6.5-7.5"
    val growthDuration: Int, // in days
    val maxSize: String,
    val feedingHabits: FeedingHabits,
    val diet: List<String>,
    val breedingSeason: List<Season>,
    val harvestTime: Int, // in days
    val yield: String, // e.g., "2-3kg per cubic meter"
    val commonDiseases: List<String>,
    val waterQualityRequirements: String,
    val tankSize: String, // e.g., "1000L minimum"
    val stockingDensity: String, // e.g., "10-15 fish per cubic meter"
    val careInstructions: String,
    val marketValue: String,
    val isActive: Boolean = true
)

enum class FishCategory {
    FRESHWATER_FISH,
    SALTWATER_MARINE_FISH,
    CLAMS_MUSSELS_OYSTERS,
    SHRIMPS_PRAWNS,
    CRABS
}

enum class WaterType {
    FRESHWATER,
    SALTWATER,
    BRACKISH
}

enum class FeedingHabits {
    HERBIVORE,
    CARNIVORE,
    OMNIVORE,
    FILTER_FEEDER
} 