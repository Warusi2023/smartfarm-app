// data/model/Pet.kt
package com.example.smartfarm.data.model

import androidx.room.Entity
import androidx.room.PrimaryKey
import com.example.smartfarm.data.model.enums.PetType

@Entity
data class Pet(
    @PrimaryKey(autoGenerate = true) val id: Int = 0,
    val name: String,
    val type: PetType,
    val notes: String,      // Short description
    val advice: String,     // What to expect/owner knowledge
    val imageUrl: String? = null
)