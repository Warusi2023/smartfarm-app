package com.smartfarm.shared.data.farm

import com.smartfarm.shared.data.preferences.AppPreferences
import com.smartfarm.shared.data.preferences.PreferencesStorage
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow

data class SelectedFarm(
    val id: String,
    val name: String
)

/**
 * Lightweight persisted current-farm context for mobile workflows.
 * Defaults create dialogs; does not hard-restrict list screens.
 */
class SelectedFarmStore(
    private val preferences: PreferencesStorage
) {
    private val _selectedFarm = MutableStateFlow(readFromPrefs())
    val selectedFarm: StateFlow<SelectedFarm?> = _selectedFarm.asStateFlow()

    fun select(id: String, name: String) {
        val trimmedId = id.trim()
        if (trimmedId.isEmpty()) return
        val trimmedName = name.trim().ifBlank { "Farm" }
        preferences.putString(AppPreferences.SELECTED_FARM_ID, trimmedId)
        preferences.putString(AppPreferences.SELECTED_FARM_NAME, trimmedName)
        _selectedFarm.value = SelectedFarm(trimmedId, trimmedName)
    }

    fun clear() {
        preferences.remove(AppPreferences.SELECTED_FARM_ID)
        preferences.remove(AppPreferences.SELECTED_FARM_NAME)
        _selectedFarm.value = null
    }

    /**
     * Keep selection valid against [available] farms (id → name).
     * Auto-selects the first farm when none is set or the selection is gone.
     */
    fun syncWithAvailableFarms(available: List<Pair<String, String>>) {
        if (available.isEmpty()) {
            if (_selectedFarm.value != null) clear()
            return
        }
        val byId = available.associate { it.first to it.second }
        val current = _selectedFarm.value
        val matchedName = current?.id?.let { byId[it] }
        when {
            current != null && matchedName != null -> {
                if (matchedName != current.name) select(current.id, matchedName)
            }
            else -> {
                val (id, name) = available.first()
                select(id, name)
            }
        }
    }

    private fun readFromPrefs(): SelectedFarm? {
        val id = preferences.getString(AppPreferences.SELECTED_FARM_ID)?.trim().orEmpty()
        if (id.isEmpty()) return null
        val name = preferences.getString(AppPreferences.SELECTED_FARM_NAME)?.trim().orEmpty()
            .ifBlank { "Farm" }
        return SelectedFarm(id, name)
    }
}
