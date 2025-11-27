package com.smartfarm.shared

import com.russhwolf.settings.Settings
import com.russhwolf.settings.Settings.Companion.create
import com.smartfarm.shared.data.database.DatabaseDriverFactory

actual class AppInitializer {
    actual fun initialize() {
        val databaseDriverFactory = DatabaseDriverFactory()
        val settings = create() // Creates NSUserDefaults-based Settings
        
        initializeSharedApp(databaseDriverFactory, settings)
    }
}

