package com.yourcompany.smartfarm

import android.app.Application
import com.smartfarm.shared.AppInitializer

class SmartFarmApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        // Initialize shared KMM app with Koin
        AppInitializer(this).initialize()
    }
}
