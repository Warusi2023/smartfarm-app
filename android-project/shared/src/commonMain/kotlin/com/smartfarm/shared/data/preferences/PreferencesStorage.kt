package com.smartfarm.shared.data.preferences

import com.russhwolf.settings.Settings
import com.russhwolf.settings.get
import com.russhwolf.settings.set

/**
 * Shared preferences storage using Multiplatform Settings
 */
class PreferencesStorage(private val settings: Settings) {
    
    fun getString(key: String, defaultValue: String? = null): String? {
        return settings.getStringOrNull(key) ?: defaultValue
    }
    
    fun putString(key: String, value: String?) {
        if (value == null) {
            settings.remove(key)
        } else {
            settings[key] = value
        }
    }
    
    fun getBoolean(key: String, defaultValue: Boolean = false): Boolean {
        return settings.getBoolean(key, defaultValue)
    }
    
    fun putBoolean(key: String, value: Boolean) {
        settings[key] = value
    }
    
    fun getInt(key: String, defaultValue: Int = 0): Int {
        return settings.getInt(key, defaultValue)
    }
    
    fun putInt(key: String, value: Int) {
        settings[key] = value
    }
    
    fun getLong(key: String, defaultValue: Long = 0L): Long {
        return settings.getLong(key, defaultValue)
    }
    
    fun putLong(key: String, value: Long) {
        settings[key] = value
    }
    
    fun remove(key: String) {
        settings.remove(key)
    }
    
    fun clear() {
        settings.clear()
    }
    
    fun contains(key: String): Boolean {
        return settings.hasKey(key)
    }
}

