package com.smartfarm.shared

import android.content.Context
import com.russhwolf.settings.SharedPreferencesSettings
import com.smartfarm.shared.data.database.DatabaseDriverFactory
import com.smartfarm.shared.di.createSharedKoinModule
import org.koin.android.ext.koin.androidContext
import org.koin.core.context.startKoin

fun initializeAndroidApp(context: Context) {
    val settings = SharedPreferencesSettings(
        context.getSharedPreferences("smartfarm_settings", Context.MODE_PRIVATE)
    )
    startKoin {
        androidContext(context.applicationContext)
        modules(createSharedKoinModule(DatabaseDriverFactory(), settings))
    }
}

actual class AppInitializer {
    actual fun initialize() {
        // Use initializeAndroidApp(context) from SmartFarmApplication.
    }
}
