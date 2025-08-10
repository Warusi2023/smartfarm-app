package com.example.smartfarm.data.model

import androidx.room.Entity
import androidx.room.PrimaryKey
import androidx.room.ForeignKey
import androidx.room.Index

@Entity(
    tableName = "outlier_acknowledgments",
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
        Index(value = ["timestamp"]),
        Index(value = ["animalId", "timestamp"])
    ]
)
data class OutlierAcknowledgment(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    val animalId: Long,
    val timestamp: Long = System.currentTimeMillis(),
    val note: String = ""
) 