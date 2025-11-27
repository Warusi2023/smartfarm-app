package com.smartfarm.shared.data.database

import android.content.Context
import com.smartfarm.shared.database.FarmDatabase
import app.cash.sqldelight.driver.android.AndroidSqliteDriver
import app.cash.sqldelight.db.SqlDriver

actual class DatabaseDriverFactory(private val context: Context) {
    actual fun createDriver(): SqlDriver {
        return AndroidSqliteDriver(
            schema = FarmDatabase.Schema,
            context = context,
            name = "smartfarm.db"
        )
    }
}

