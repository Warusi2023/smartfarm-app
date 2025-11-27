package com.smartfarm.data.database

import androidx.room.Database
import androidx.room.RoomDatabase
import com.smartfarm.data.database.dao.*
import com.smartfarm.data.database.entity.*

@Database(
    entities = [
        FarmEntity::class,
        LivestockEntity::class,
        CropEntity::class,
        TaskEntity::class,
        InventoryItemEntity::class
    ],
    version = 1,
    exportSchema = false
)
abstract class FarmDatabase : RoomDatabase() {
    abstract fun farmDao(): FarmDao
    abstract fun livestockDao(): LivestockDao
    abstract fun cropDao(): CropDao
    abstract fun taskDao(): TaskDao
    abstract fun inventoryDao(): InventoryDao
}

