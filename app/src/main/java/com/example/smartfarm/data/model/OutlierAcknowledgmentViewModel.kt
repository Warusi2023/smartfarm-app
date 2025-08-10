package com.example.smartfarm.data.model

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.viewModelScope
import com.example.smartfarm.data.repository.OutlierAcknowledgmentRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

class OutlierAcknowledgmentViewModel(private val repository: OutlierAcknowledgmentRepository) : ViewModel() {
    private val _acks = MutableStateFlow<List<OutlierAcknowledgment>>(emptyList())
    val acks: StateFlow<List<OutlierAcknowledgment>> = _acks

    fun loadAll() {
        viewModelScope.launch { _acks.value = repository.getAll() }
    }
    fun loadForAnimal(animalId: Long) {
        viewModelScope.launch { _acks.value = repository.getForAnimal(animalId) }
    }
    fun insert(ack: OutlierAcknowledgment) {
        viewModelScope.launch { repository.insert(ack); loadAll() }
    }
    fun delete(ack: OutlierAcknowledgment) {
        viewModelScope.launch { repository.delete(ack); loadAll() }
    }
}

class OutlierAcknowledgmentViewModelFactory(private val repository: OutlierAcknowledgmentRepository) : ViewModelProvider.Factory {
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        if (modelClass.isAssignableFrom(OutlierAcknowledgmentViewModel::class.java)) {
            @Suppress("UNCHECKED_CAST")
            return OutlierAcknowledgmentViewModel(repository) as T
        }
        throw IllegalArgumentException("Unknown ViewModel class")
    }
} 