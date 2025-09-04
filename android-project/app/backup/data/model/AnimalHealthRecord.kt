package com.yourcompany.smartfarm.data.model

import androidx.room.Entity
import androidx.room.PrimaryKey
import androidx.room.ForeignKey
import androidx.room.Index

@Entity(
    tableName = "animal_health_records",
    foreignKeys = [
        ForeignKey(
            entity = Livestock::class,
            parentColumns = ["id"],
            childColumns = ["animalId"],
            onDelete = ForeignKey.CASCADE
        )
    ],
    indices = [
        Index(value = ["animalId"]),
        Index(value = ["date"]),
        Index(value = ["eventType"]),
        Index(value = ["animalId", "date"]),
        Index(value = ["animalId", "eventType"])
    ]
)
data class AnimalHealthRecord(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    val animalId: Long,
    val date: String, // ISO format
    val eventType: String, // e.g., Illness, Vaccination, Checkup
    val notes: String = "",
    val vet: String = "",
    val medication: String = "",
    val createdAt: Long = System.currentTimeMillis()
) 