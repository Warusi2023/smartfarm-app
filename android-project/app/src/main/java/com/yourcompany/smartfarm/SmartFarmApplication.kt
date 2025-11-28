package com.yourcompany.smartfarm

import android.app.Application
import com.smartfarm.shared.initializeAndroidApp

class SmartFarmApplication : Application() {
    override fun onCreate() {
        super.onCreate()
        // Initialize shared KMM app
        initializeAndroidApp(this)
    }
}
