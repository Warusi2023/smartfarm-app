package com.example.smartfarm.data.model

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.viewModelScope
import com.example.smartfarm.data.repository.YieldRecordRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.collect
import kotlinx.coroutines.launch

class YieldRecordViewModel(private val repository: YieldRecordRepository) : ViewModel() {
    private val _records = MutableStateFlow<List<YieldRecord>>(emptyList())
    val records: StateFlow<List<YieldRecord>> = _records

    fun loadAll() {
        viewModelScope.launch { 
            repository.getAll().collect { records ->
                _records.value = records
            }
        }
    }
    fun loadForAnimal(animalId: Long) {
        viewModelScope.launch { 
            repository.getForAnimal(animalId).collect { records ->
                _records.value = records
            }
        }
    }
    fun insert(record: YieldRecord) {
        viewModelScope.launch { repository.insert(record); loadAll() }
    }
    fun update(record: YieldRecord) {
        viewModelScope.launch { repository.update(record); loadAll() }
    }
    fun delete(record: YieldRecord) {
        viewModelScope.launch { repository.delete(record); loadAll() }
    }
}

class YieldRecordViewModelFactory(private val repository: YieldRecordRepository) : ViewModelProvider.Factory {
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        if (modelClass.isAssignableFrom(YieldRecordViewModel::class.java)) {
            @Suppress("UNCHECKED_CAST")
            return YieldRecordViewModel(repository) as T
        }
        throw IllegalArgumentException("Unknown ViewModel class")
    }
} 