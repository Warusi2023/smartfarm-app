package com.example.smartfarm.data.model

import androidx.room.Entity
import androidx.room.PrimaryKey
import androidx.room.ForeignKey
import androidx.room.Index

@Entity(
    tableName = "yield_records",
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
        Index(value = ["yieldType"]),
        Index(value = ["animalId", "date"]),
        Index(value = ["animalId", "yieldType"]),
        Index(value = ["date", "yieldType"])
    ]
)
data class YieldRecord(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    val animalId: Long,
    val date: String, // ISO format
    val yieldType: String, // e.g., Milk, Eggs, Wool
    val quantity: Double,
    val unit: String, // e.g., L, kg, pieces
    val notes: String = "",
    val createdAt: Long = System.currentTimeMillis()
) 