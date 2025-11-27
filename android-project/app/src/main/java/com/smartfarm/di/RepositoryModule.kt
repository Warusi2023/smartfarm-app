package com.smartfarm.di

import com.smartfarm.data.repository.*
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
object RepositoryModule {
    
    @Provides
    @Singleton
    fun provideFarmRepository(
        farmRepository: FarmRepository
    ): FarmRepository = farmRepository
    
    @Provides
    @Singleton
    fun provideLivestockRepository(
        livestockRepository: LivestockRepository
    ): LivestockRepository = livestockRepository
    
    @Provides
    @Singleton
    fun provideCropRepository(
        cropRepository: CropRepository
    ): CropRepository = cropRepository
    
    @Provides
    @Singleton
    fun provideTaskRepository(
        taskRepository: TaskRepository
    ): TaskRepository = taskRepository
    
    @Provides
    @Singleton
    fun provideInventoryRepository(
        inventoryRepository: InventoryRepository
    ): InventoryRepository = inventoryRepository
    
    @Provides
    @Singleton
    fun provideAnalyticsRepository(
        analyticsRepository: AnalyticsRepository
    ): AnalyticsRepository = analyticsRepository
}

