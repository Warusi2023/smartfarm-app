package com.smartfarm.shared.di

import com.russhwolf.settings.Settings
import com.smartfarm.shared.data.database.DatabaseDriverFactory
import com.smartfarm.shared.data.preferences.PreferencesStorage
import com.smartfarm.shared.data.repository.*
import com.smartfarm.shared.database.FarmDatabase
import com.smartfarm.shared.network.SmartFarmApi
import com.smartfarm.shared.network.createConfiguredHttpClient
import com.smartfarm.shared.ui.viewmodel.*
import org.koin.core.module.Module
import org.koin.dsl.module

/**
 * Base URL for the SmartFarm API
 */
const val API_BASE_URL = "https://smartfarm-app-production.up.railway.app"

/**
 * Shared Koin module for dependency injection
 */
fun createSharedKoinModule(
    databaseDriverFactory: DatabaseDriverFactory,
    settings: Settings
): Module = module {
    
    // Database
    single {
        val driver = databaseDriverFactory.createDriver()
        FarmDatabase(driver)
    }
    
    // Preferences
    single { PreferencesStorage(settings) }
    
    // HTTP Client
    single { createConfiguredHttpClient() }
    
    // API - AuthRepository will be injected to provide auth tokens
    single<SmartFarmApi> {
        SmartFarmApi(get(), API_BASE_URL, get())
    }
    
    // Repositories
    single<AuthRepository> {
        AuthRepository(get(), get())
    }
    
    single<FarmRepository> {
        FarmRepository(get(), get())
    }
    
    single<LivestockRepository> {
        LivestockRepository(get(), get())
    }
    
    single<CropRepository> {
        CropRepository(get(), get())
    }
    
    single<TaskRepository> {
        TaskRepository(get(), get())
    }
    
    single<InventoryRepository> {
        InventoryRepository(get(), get())
    }
    
    single<FinancialRepository> {
        FinancialRepository(get(), get())
    }
    
    single<AnalyticsRepository> {
        AnalyticsRepository(get())
    }
    
    // ViewModels
    factory<AuthViewModel> {
        AuthViewModel(get())
    }
    
    factory<DashboardViewModel> {
        DashboardViewModel(get(), get(), get(), get(), get())
    }
    
    factory<FarmViewModel> {
        FarmViewModel(get())
    }
    
    factory<LivestockViewModel> {
        LivestockViewModel(get())
    }
    
    factory<CropViewModel> {
        CropViewModel(get())
    }
    
    factory<TaskViewModel> {
        TaskViewModel(get())
    }
    
    factory<InventoryViewModel> {
        InventoryViewModel(get())
    }
}

