package com.smartfarm.shared

import android.content.Context
import com.russhwolf.settings.Settings
import com.russhwolf.settings.Settings.Companion.create
import com.smartfarm.shared.data.database.DatabaseDriverFactory
import org.koin.android.ext.koin.androidContext

actual class AppInitializer(private val context: Context) {
    actual fun initialize() {
        val databaseDriverFactory = DatabaseDriverFactory(context)
        val settings = Settings(context.getSharedPreferences("smartfarm_prefs", Context.MODE_PRIVATE))
        
        initializeSharedApp(databaseDriverFactory, settings)
    }
}

