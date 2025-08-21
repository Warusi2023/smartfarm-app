package com.yourcompany.smartfarm.data.model

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity
data class Herbicide(
    @PrimaryKey val id: Int,
    val name: String,
    val activeIngredient: String,
    val recommendedCrops: List<String>,
    val targetWeeds: List<String>,
    val mixtureInstructions: String,
    val dosageRate: String // e.g., '2L per hectare'
) 