package com.smartfarm.shared

import android.content.Context

actual class AppInitializer {
    actual fun initialize() {
        // No shared DB or Koin setup for first release.
    }
}
