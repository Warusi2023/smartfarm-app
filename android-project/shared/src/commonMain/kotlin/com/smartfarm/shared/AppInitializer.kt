package com.smartfarm.shared

import com.russhwolf.settings.Settings
import com.smartfarm.shared.data.database.DatabaseDriverFactory
import com.smartfarm.shared.di.API_BASE_URL
import com.smartfarm.shared.di.createSharedKoinModule
import org.koin.core.context.startKoin
import org.koin.dsl.module

/**
 * Initialize the shared KMM app
 * Call this from Android Application.onCreate() or iOS app initialization
 */
expect class AppInitializer {
    fun initialize()
}

/**
 * Common initialization logic
 */
fun initializeSharedApp(
    databaseDriverFactory: DatabaseDriverFactory,
    settings: Settings
) {
    startKoin {
        modules(
            createSharedKoinModule(databaseDriverFactory, settings)
        )
    }
}

