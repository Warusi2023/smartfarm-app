package com.smartfarm.di

import android.content.Context
import androidx.room.Room
import com.smartfarm.data.database.FarmDatabase
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.android.qualifiers.ApplicationContext
import dagger.hilt.components.SingletonComponent
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
object DatabaseModule {
    
    @Provides
    @Singleton
    fun provideFarmDatabase(@ApplicationContext context: Context): FarmDatabase {
        return Room.databaseBuilder(
            context,
            FarmDatabase::class.java,
            "smartfarm_database"
        )
        .fallbackToDestructiveMigration() // For development - remove in production
        .build()
    }
    
    @Provides
    fun provideFarmDao(database: FarmDatabase) = database.farmDao()
    
    @Provides
    fun provideLivestockDao(database: FarmDatabase) = database.livestockDao()
    
    @Provides
    fun provideCropDao(database: FarmDatabase) = database.cropDao()
    
    @Provides
    fun provideTaskDao(database: FarmDatabase) = database.taskDao()
    
    @Provides
    fun provideInventoryDao(database: FarmDatabase) = database.inventoryDao()
}

