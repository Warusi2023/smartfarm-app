package com.yourcompany.smartfarm.data.model

import androidx.room.Entity
import androidx.room.PrimaryKey
import androidx.room.TypeConverters
import androidx.room.ForeignKey
import androidx.room.Index
import com.yourcompany.smartfarm.data.database.Converters

@Entity(
    tableName = "farm_activities",
    foreignKeys = [
        ForeignKey(
            entity = Farm::class,
            parentColumns = ["id"],
            childColumns = ["farmId"],
            onDelete = ForeignKey.CASCADE
        ),
        ForeignKey(
            entity = Livestock::class,
            parentColumns = ["id"],
            childColumns = ["livestockId"],
            onDelete = ForeignKey.SET_NULL
        )
    ],
    indices = [
        Index(value = ["farmId"]),
        Index(value = ["type"]),
        Index(value = ["date"]),
        Index(value = ["livestockId"]),
        Index(value = ["farmId", "date"]),
        Index(value = ["farmId", "type"]),
        Index(value = ["date", "type"])
    ]
)
@TypeConverters(Converters::class)
data class FarmActivity(
    @PrimaryKey(autoGenerate = true) val id: Long = 0,
    val farmId: Long, // Foreign key to Farm
    val title: String,
    val type: ActivityType,
    val date: String, // yyyy-MM-dd
    val time: String?, // HH:mm, nullable
    val notes: String = "",
    val recurrence: Recurrence? = null,
    val reminderMinutesBefore: Int? = null, // e.g., 30 for 30min before
    val cropId: Long? = null,
    val livestockId: Long? = null,
    val fieldId: Long? = null,
    val createdAt: Long = System.currentTimeMillis(),
    val updatedAt: Long = System.currentTimeMillis(),
    val isCompleted: Boolean = false
)

enum class ActivityType {
    PLANTING, HARVESTING, IRRIGATION, FERTILIZING, SPRAYING, MAINTENANCE, OTHER
}

data class Recurrence(
    val frequency: RecurrenceFrequency,
    val interval: Int = 1 // every N days/weeks/months
)

enum class RecurrenceFrequency { NONE, DAILY, WEEKLY, MONTHLY } 