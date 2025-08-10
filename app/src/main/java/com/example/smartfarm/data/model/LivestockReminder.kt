package com.example.smartfarm.data.model

import androidx.room.Entity
import androidx.room.PrimaryKey
import androidx.room.ForeignKey
import androidx.room.Index

@Entity(
    tableName = "livestock_reminder",
    foreignKeys = [
        ForeignKey(
            entity = Livestock::class,
            parentColumns = ["id"],
            childColumns = ["livestockId"],
            onDelete = ForeignKey.CASCADE
        )
    ],
    indices = [
        Index(value = ["livestockId"]),
        Index(value = ["date"]),
        Index(value = ["type"]),
        Index(value = ["livestockId", "date"]),
        Index(value = ["livestockId", "type"])
    ]
)
data class LivestockReminder(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    val livestockId: Long,
    val date: String, // ISO date string
    val type: String,
    val note: String,
    val createdAt: Long = System.currentTimeMillis(),
    val isCompleted: Boolean = false
) 