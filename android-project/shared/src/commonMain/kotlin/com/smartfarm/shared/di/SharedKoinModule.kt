package com.smartfarm.shared.di

import com.russhwolf.settings.Settings
import com.smartfarm.shared.data.database.DatabaseDriverFactory
import com.smartfarm.shared.data.preferences.AppPreferences
import com.smartfarm.shared.data.preferences.PreferencesStorage
import com.smartfarm.shared.data.repository.*
import com.smartfarm.shared.network.SmartFarmApi
import com.smartfarm.shared.network.createConfiguredHttpClient
import com.smartfarm.shared.ui.viewmodel.*
import org.koin.core.module.Module
import org.koin.dsl.module

// Note: Database imports removed - FarmDatabase and SqlDriver not used in commonMain

/**
 * Base URL for the SmartFarm API
 */
const val API_BASE_URL = "https://web-production-86d39.up.railway.app"

/**
 * Shared Koin module for dependency injection
 */
fun createSharedKoinModule(
    databaseDriverFactory: DatabaseDriverFactory,
    settings: Settings
): Module = module {
    
    // Database - Commented out for now (no cross-platform database yet)
    // single {
    //     val driver = databaseDriverFactory.createDriver()
    //     FarmDatabase(driver)
    // }
    
    // Preferences
    single { PreferencesStorage(settings) }
    
    // HTTP Client
    single { createConfiguredHttpClient() }
    
    // API — token provider reads prefs directly to avoid circular dependency with AuthRepository
    single<SmartFarmApi> {
        val preferences = get<PreferencesStorage>()
        SmartFarmApi(
            client = get(),
            baseUrl = API_BASE_URL,
            getAuthToken = { preferences.getString(AppPreferences.ACCESS_TOKEN) }
        )
    }
    
    // Repositories
    single<AuthRepository> {
        AuthRepository(get(), get())
    }
    
    single<FarmRepository> {
        FarmRepository(get())
    }
    
    single<LivestockRepository> {
        LivestockRepository(get())
    }
    
    single<CropRepository> {
        CropRepository(get())
    }
    
    single<TaskRepository> {
        TaskRepository(get())
    }
    
    single<InventoryRepository> {
        InventoryRepository(get())
    }
    
    // single<FinancialRepository> {
    //     FinancialRepository(get(), get())
    // }
    
    single<AnalyticsRepository> {
        AnalyticsRepository(get())
    }
    
    single<WeatherAlertsRepository> {
        WeatherAlertsRepository(get())
    }
    
    single<BiologicalFarmingRepository> {
        BiologicalFarmingRepository(get())
    }
    
    // ViewModels
    factory<AuthViewModel> {
        AuthViewModel(get())
    }
    
    factory<DashboardViewModel> {
        DashboardViewModel(get(), get(), get(), get(), get(), get())
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
    
    factory<WeatherAlertsViewModel> {
        WeatherAlertsViewModel(get())
    }
    
    factory<BiologicalFarmingViewModel> {
        BiologicalFarmingViewModel(get())
    }
}

