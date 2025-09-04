package com.yourcompany.smartfarm.data.model

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity
data class Crop(
    @PrimaryKey(autoGenerate = true) val id: Int = 0,
    val userId: Long = 0,
    val name: String,
    val cropType: String,
    val plantingDate: Long,
    val harvestDate: Long,
    val isActive: Boolean = true
)