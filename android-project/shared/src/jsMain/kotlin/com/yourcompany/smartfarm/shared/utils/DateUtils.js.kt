package com.yourcompany.smartfarm.shared.utils

actual fun getCurrentTimeMillis(): Long = kotlin.js.Date.now().toLong()
