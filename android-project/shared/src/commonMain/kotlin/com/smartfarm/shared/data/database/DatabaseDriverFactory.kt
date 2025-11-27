package com.smartfarm.shared.data.database

import app.cash.sqldelight.db.SqlDriver

/**
 * Factory for creating SQLDelight database drivers
 */
expect class DatabaseDriverFactory {
    fun createDriver(): SqlDriver
}

