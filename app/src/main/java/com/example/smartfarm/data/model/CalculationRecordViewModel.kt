package com.example.smartfarm.data.model

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.viewModelScope
import com.example.smartfarm.data.repository.CalculationRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

class CalculationRecordViewModel(private val repository: CalculationRepository) : ViewModel() {
    private val _records = MutableStateFlow<List<CalculationRecord>>(emptyList())
    val records: StateFlow<List<CalculationRecord>> = _records

    fun loadRecords() {
        viewModelScope.launch {
            _records.value = repository.getAll()
        }
    }

    fun insert(record: CalculationRecord) {
        viewModelScope.launch {
            repository.insert(record)
            loadRecords()
        }
    }

    fun delete(record: CalculationRecord) {
        viewModelScope.launch {
            repository.delete(record)
            loadRecords()
        }
    }

    fun deleteAll() {
        viewModelScope.launch {
            repository.deleteAll()
            loadRecords()
        }
    }
}

class CalculationRecordViewModelFactory(private val repository: CalculationRepository) : ViewModelProvider.Factory {
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        if (modelClass.isAssignableFrom(CalculationRecordViewModel::class.java)) {
            @Suppress("UNCHECKED_CAST")
            return CalculationRecordViewModel(repository) as T
        }
        throw IllegalArgumentException("Unknown ViewModel class")
    }
} 