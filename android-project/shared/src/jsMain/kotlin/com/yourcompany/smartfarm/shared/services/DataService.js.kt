package com.yourcompany.smartfarm.shared.services

actual fun getCurrentTimeMillis(): Long = kotlin.js.Date.now().toLong()
