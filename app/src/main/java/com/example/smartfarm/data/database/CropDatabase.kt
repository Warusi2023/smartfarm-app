package com.example.smartfarm.data.database

import androidx.room.Database
import androidx.room.RoomDatabase
import androidx.room.TypeConverters
import com.example.smartfarm.data.model.Crop
import com.example.smartfarm.data.model.Herbicide
import com.example.smartfarm.data.model.Weed
import com.example.smartfarm.data.database.HerbicideDao
import com.example.smartfarm.data.database.WeedDao

@Database(
    entities = [Crop::class, Herbicide::class, Weed::class],
    version = 1,
    exportSchema = false
)
@TypeConverters(Converters::class)
abstract class CropDatabase : RoomDatabase() {
    abstract fun cropDao(): CropDao
    abstract fun herbicideDao(): HerbicideDao
    abstract fun weedDao(): WeedDao
} 