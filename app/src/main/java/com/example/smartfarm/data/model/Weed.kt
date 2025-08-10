package com.example.smartfarm.data.model

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity
data class Weed(
    @PrimaryKey val id: Int,
    val name: String,
    val susceptibleHerbicides: List<String>,
    val description: String
) 