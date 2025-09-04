package com.yourcompany.smartfarm.data.model

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.viewModelScope
import com.yourcompany.smartfarm.data.repository.LivestockReminderRepository
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch

class LivestockReminderViewModel(private val repository: LivestockReminderRepository) : ViewModel() {
    fun getRemindersForLivestock(livestockId: Long): StateFlow<List<LivestockReminder>> =
        repository.getRemindersForLivestock(livestockId).stateIn(viewModelScope, SharingStarted.Lazily, emptyList())

    val allReminders: StateFlow<List<LivestockReminder>> =
        repository.getAllReminders().stateIn(viewModelScope, SharingStarted.Lazily, emptyList())

    fun insert(reminder: LivestockReminder) {
        viewModelScope.launch { repository.insert(reminder) }
    }

    fun delete(reminder: LivestockReminder) {
        viewModelScope.launch { repository.delete(reminder) }
    }
}

class LivestockReminderViewModelFactory(private val repository: LivestockReminderRepository) : ViewModelProvider.Factory {
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        if (modelClass.isAssignableFrom(LivestockReminderViewModel::class.java)) {
            @Suppress("UNCHECKED_CAST")
            return LivestockReminderViewModel(repository) as T
        }
        throw IllegalArgumentException("Unknown ViewModel class")
    }
} 