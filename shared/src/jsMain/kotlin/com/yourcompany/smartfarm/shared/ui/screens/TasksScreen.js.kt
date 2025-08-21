package com.yourcompany.smartfarm.shared.ui.screens

actual fun getCurrentTimeMillis(): Long = kotlin.js.Date.now().toLong()
