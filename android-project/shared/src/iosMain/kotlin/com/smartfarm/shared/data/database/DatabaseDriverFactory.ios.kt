package com.smartfarm.shared.data.database

import com.smartfarm.shared.database.FarmDatabase
import app.cash.sqldelight.db.SqlDriver
import app.cash.sqldelight.driver.native.NativeSqliteDriver

actual class DatabaseDriverFactory {
    actual fun createDriver(): SqlDriver {
        return NativeSqliteDriver(
            schema = FarmDatabase.Schema,
            name = "smartfarm.db"
        )
    }
}

