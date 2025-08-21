package com.yourcompany.smartfarm.data.model

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.viewModelScope
import com.yourcompany.smartfarm.data.repository.FarmActivityRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.SharingStarted
import kotlinx.coroutines.flow.stateIn
import kotlinx.coroutines.launch

class FarmActivityViewModel(private val repository: FarmActivityRepository) : ViewModel() {
    val allActivities: StateFlow<List<FarmActivity>> =
        repository.getAll().stateIn(viewModelScope, SharingStarted.Lazily, emptyList())

    private val _activitiesByDate = MutableStateFlow<List<FarmActivity>>(emptyList())
    val activitiesByDate: StateFlow<List<FarmActivity>> = _activitiesByDate.asStateFlow()

    fun loadByDate(date: String) {
        viewModelScope.launch {
            repository.getByDate(date).stateIn(viewModelScope, SharingStarted.Lazily, emptyList()).collect {
                _activitiesByDate.value = it
            }
        }
    }

    fun insert(activity: FarmActivity) {
        viewModelScope.launch { repository.insert(activity) }
    }
    fun update(activity: FarmActivity) {
        viewModelScope.launch { repository.update(activity) }
    }
    fun delete(activity: FarmActivity) {
        viewModelScope.launch { repository.delete(activity) }
    }
}

class FarmActivityViewModelFactory(private val repository: FarmActivityRepository) : ViewModelProvider.Factory {
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        if (modelClass.isAssignableFrom(FarmActivityViewModel::class.java)) {
            @Suppress("UNCHECKED_CAST")
            return FarmActivityViewModel(repository) as T
        }
        throw IllegalArgumentException("Unknown ViewModel class")
    }
} 