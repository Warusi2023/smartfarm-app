package com.example.smartfarm.data.database

import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase
import androidx.room.TypeConverters
import android.content.Context
import androidx.sqlite.db.SupportSQLiteDatabase
import com.example.smartfarm.BuildConfig
import com.example.smartfarm.data.model.*
import com.example.smartfarm.data.model.LivestockReminder
import com.example.smartfarm.data.model.User
import com.example.smartfarm.data.model.PestDiseaseAlertEntity
import com.example.smartfarm.data.model.CalculationRecord
import com.example.smartfarm.data.model.AnimalHealthRecord
import com.example.smartfarm.data.model.YieldRecord
import com.example.smartfarm.data.model.OutlierAcknowledgment
import com.example.smartfarm.data.model.FarmActivity
import com.example.smartfarm.data.database.FarmActivityDao
import com.example.smartfarm.data.model.ChatMessageEntity
import com.example.smartfarm.data.database.ChatMessageDao
import com.example.smartfarm.data.model.FarmLocation
import com.example.smartfarm.data.database.FarmLocationDao
import com.example.smartfarm.data.database.MIGRATION_1_2

/**
 * Extension function to enable performance monitoring for the database
 */
fun SupportSQLiteDatabase.enablePerformanceMonitoring() {
    // This function enables performance monitoring for the database
    // The actual monitoring is handled by DatabasePerformanceMonitor class
    // This is a placeholder for future implementation if needed
}

@Database(
    entities = [
        Plant::class,
        Flower::class,
        Tree::class,
        Fish::class,
        Livestock::class,
        Farm::class,
        FarmLocation::class,
        Task::class,
        Pest::class,
        ChemicalControl::class,
        WeatherForecastEntity::class,
        WeatherAlert::class,
        Notification::class,
        LivestockReminder::class,
        User::class,
        PestDiseaseAlertEntity::class,
        CalculationRecord::class,
        AnimalHealthRecord::class,
        YieldRecord::class,
        OutlierAcknowledgment::class,
        FarmActivity::class,
        ChatMessageEntity::class
    ],
    version = 2,
    exportSchema = true
)
@TypeConverters(Converters::class)
abstract class FarmDatabase : RoomDatabase() {
    
    abstract fun plantDao(): PlantDao
    abstract fun flowerDao(): FlowerDao
    abstract fun treeDao(): TreeDao
    abstract fun fishDao(): FishDao
    abstract fun livestockDao(): LivestockDao
    abstract fun farmDao(): FarmDao
    abstract fun taskDao(): TaskDao
    abstract fun pestDao(): PestDao
    abstract fun weatherDao(): WeatherDao
    abstract fun notificationDao(): NotificationDao
    abstract fun livestockReminderDao(): LivestockReminderDao
    abstract fun userDao(): UserDao
    abstract fun pestDiseaseAlertDao(): PestDiseaseAlertDao
    abstract fun calculationDao(): CalculationDao
    abstract fun animalHealthRecordDao(): AnimalHealthRecordDao
    abstract fun yieldRecordDao(): YieldRecordDao
    abstract fun outlierAcknowledgmentDao(): OutlierAcknowledgmentDao
    abstract fun farmActivityDao(): FarmActivityDao
    abstract fun chatMessageDao(): ChatMessageDao
    abstract fun farmLocationDao(): FarmLocationDao

    companion object {
        @Volatile
        private var INSTANCE: FarmDatabase? = null

        fun getDatabase(context: Context): FarmDatabase {
            return INSTANCE ?: synchronized(this) {
                val instance = Room.databaseBuilder(
                    context.applicationContext,
                    FarmDatabase::class.java,
                    "farm_database"
                )
                .addMigrations(MIGRATION_1_2)
                .addCallback(object : RoomDatabase.Callback() {
                    override fun onCreate(db: SupportSQLiteDatabase) {
                        super.onCreate(db)
                        // Enable performance monitoring in debug builds
                        if (BuildConfig.DEBUG) {
                            db.enablePerformanceMonitoring()
                        }
                    }
                })
                .build()
                INSTANCE = instance
                instance
            }
        }
    }
} 