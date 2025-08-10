package com.example.smartfarm.data.database

import androidx.room.migration.Migration
import androidx.sqlite.db.SupportSQLiteDatabase

val MIGRATION_1_2 = object : Migration(1, 2) {
    override fun migrate(database: SupportSQLiteDatabase) {
        // Add farmId column to livestock table
        database.execSQL("ALTER TABLE livestock ADD COLUMN farmId INTEGER NOT NULL DEFAULT 1")
        
        // Add farmId column to farm_activities table
        database.execSQL("ALTER TABLE farm_activities ADD COLUMN farmId INTEGER NOT NULL DEFAULT 1")
        
        // Add timestamp columns to various tables
        database.execSQL("ALTER TABLE livestock ADD COLUMN createdAt INTEGER NOT NULL DEFAULT ${System.currentTimeMillis()}")
        database.execSQL("ALTER TABLE livestock ADD COLUMN updatedAt INTEGER NOT NULL DEFAULT ${System.currentTimeMillis()}")
        
        database.execSQL("ALTER TABLE animal_health_records ADD COLUMN createdAt INTEGER NOT NULL DEFAULT ${System.currentTimeMillis()}")
        database.execSQL("ALTER TABLE yield_records ADD COLUMN createdAt INTEGER NOT NULL DEFAULT ${System.currentTimeMillis()}")
        database.execSQL("ALTER TABLE farm_locations ADD COLUMN createdAt INTEGER NOT NULL DEFAULT ${System.currentTimeMillis()}")
        database.execSQL("ALTER TABLE livestock_reminder ADD COLUMN createdAt INTEGER NOT NULL DEFAULT ${System.currentTimeMillis()}")
        database.execSQL("ALTER TABLE livestock_reminder ADD COLUMN isCompleted INTEGER NOT NULL DEFAULT 0")
        
        database.execSQL("ALTER TABLE farm_activities ADD COLUMN createdAt INTEGER NOT NULL DEFAULT ${System.currentTimeMillis()}")
        database.execSQL("ALTER TABLE farm_activities ADD COLUMN updatedAt INTEGER NOT NULL DEFAULT ${System.currentTimeMillis()}")
        database.execSQL("ALTER TABLE farm_activities ADD COLUMN isCompleted INTEGER NOT NULL DEFAULT 0")
        
        database.execSQL("ALTER TABLE farms ADD COLUMN updatedAt INTEGER NOT NULL DEFAULT ${System.currentTimeMillis()}")
        
        // Create indexes for better performance
        database.execSQL("CREATE INDEX IF NOT EXISTS index_livestock_farmId ON livestock (farmId)")
        database.execSQL("CREATE INDEX IF NOT EXISTS index_livestock_category ON livestock (category)")
        database.execSQL("CREATE INDEX IF NOT EXISTS index_livestock_isActive ON livestock (isActive)")
        database.execSQL("CREATE INDEX IF NOT EXISTS index_livestock_name ON livestock (name)")
        database.execSQL("CREATE INDEX IF NOT EXISTS index_livestock_category_isActive ON livestock (category, isActive)")
        database.execSQL("CREATE INDEX IF NOT EXISTS index_livestock_farmId_category ON livestock (farmId, category)")
        
        database.execSQL("CREATE INDEX IF NOT EXISTS index_animal_health_records_animalId ON animal_health_records (animalId)")
        database.execSQL("CREATE INDEX IF NOT EXISTS index_animal_health_records_date ON animal_health_records (date)")
        database.execSQL("CREATE INDEX IF NOT EXISTS index_animal_health_records_eventType ON animal_health_records (eventType)")
        database.execSQL("CREATE INDEX IF NOT EXISTS index_animal_health_records_animalId_date ON animal_health_records (animalId, date)")
        database.execSQL("CREATE INDEX IF NOT EXISTS index_animal_health_records_animalId_eventType ON animal_health_records (animalId, eventType)")
        
        database.execSQL("CREATE INDEX IF NOT EXISTS index_yield_records_animalId ON yield_records (animalId)")
        database.execSQL("CREATE INDEX IF NOT EXISTS index_yield_records_date ON yield_records (date)")
        database.execSQL("CREATE INDEX IF NOT EXISTS index_yield_records_yieldType ON yield_records (yieldType)")
        database.execSQL("CREATE INDEX IF NOT EXISTS index_yield_records_animalId_date ON yield_records (animalId, date)")
        database.execSQL("CREATE INDEX IF NOT EXISTS index_yield_records_animalId_yieldType ON yield_records (animalId, yieldType)")
        database.execSQL("CREATE INDEX IF NOT EXISTS index_yield_records_date_yieldType ON yield_records (date, yieldType)")
        
        database.execSQL("CREATE INDEX IF NOT EXISTS index_farm_locations_farmId ON farm_locations (farmId)")
        database.execSQL("CREATE INDEX IF NOT EXISTS index_farm_locations_latitude_longitude ON farm_locations (latitude, longitude)")
        database.execSQL("CREATE INDEX IF NOT EXISTS index_farm_locations_city_state ON farm_locations (city, state)")
        database.execSQL("CREATE INDEX IF NOT EXISTS index_farm_locations_country ON farm_locations (country)")
        
        database.execSQL("CREATE INDEX IF NOT EXISTS index_outlier_acknowledgments_animalId ON outlier_acknowledgments (animalId)")
        database.execSQL("CREATE INDEX IF NOT EXISTS index_outlier_acknowledgments_timestamp ON outlier_acknowledgments (timestamp)")
        database.execSQL("CREATE INDEX IF NOT EXISTS index_outlier_acknowledgments_animalId_timestamp ON outlier_acknowledgments (animalId, timestamp)")
        
        database.execSQL("CREATE INDEX IF NOT EXISTS index_livestock_reminder_livestockId ON livestock_reminder (livestockId)")
        database.execSQL("CREATE INDEX IF NOT EXISTS index_livestock_reminder_date ON livestock_reminder (date)")
        database.execSQL("CREATE INDEX IF NOT EXISTS index_livestock_reminder_type ON livestock_reminder (type)")
        database.execSQL("CREATE INDEX IF NOT EXISTS index_livestock_reminder_livestockId_date ON livestock_reminder (livestockId, date)")
        database.execSQL("CREATE INDEX IF NOT EXISTS index_livestock_reminder_livestockId_type ON livestock_reminder (livestockId, type)")
        
        database.execSQL("CREATE INDEX IF NOT EXISTS index_farm_activities_farmId ON farm_activities (farmId)")
        database.execSQL("CREATE INDEX IF NOT EXISTS index_farm_activities_type ON farm_activities (type)")
        database.execSQL("CREATE INDEX IF NOT EXISTS index_farm_activities_date ON farm_activities (date)")
        database.execSQL("CREATE INDEX IF NOT EXISTS index_farm_activities_livestockId ON farm_activities (livestockId)")
        database.execSQL("CREATE INDEX IF NOT EXISTS index_farm_activities_farmId_date ON farm_activities (farmId, date)")
        database.execSQL("CREATE INDEX IF NOT EXISTS index_farm_activities_farmId_type ON farm_activities (farmId, type)")
        database.execSQL("CREATE INDEX IF NOT EXISTS index_farm_activities_date_type ON farm_activities (date, type)")
        
        database.execSQL("CREATE INDEX IF NOT EXISTS index_farms_farmType ON farms (farmType)")
        database.execSQL("CREATE INDEX IF NOT EXISTS index_farms_isActive ON farms (isActive)")
        database.execSQL("CREATE INDEX IF NOT EXISTS index_farms_soilType ON farms (soilType)")
        database.execSQL("CREATE INDEX IF NOT EXISTS index_farms_climateZone ON farms (climateZone)")
        database.execSQL("CREATE INDEX IF NOT EXISTS index_farms_farmType_isActive ON farms (farmType, isActive)")
        
        // Create a default farm if none exists
        database.execSQL("""
            INSERT OR IGNORE INTO farms (id, name, description, size, soilType, climateZone, irrigationType, farmType, createdAt, updatedAt, isActive)
            VALUES (1, 'Default Farm', 'Default farm created during migration', 1.0, 'LOAM', 'TEMPERATE', 'NONE', 'MIXED_FARM', ${System.currentTimeMillis()}, ${System.currentTimeMillis()}, 1)
        """)
    }
} 