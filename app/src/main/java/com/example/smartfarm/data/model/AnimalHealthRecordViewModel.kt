package com.example.smartfarm.data.model

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.viewModelScope
import com.example.smartfarm.data.repository.AnimalHealthRecordRepository
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.collect
import kotlinx.coroutines.launch

class AnimalHealthRecordViewModel(private val repository: AnimalHealthRecordRepository) : ViewModel() {
    private val _records = MutableStateFlow<List<AnimalHealthRecord>>(emptyList())
    val records: StateFlow<List<AnimalHealthRecord>> = _records

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
    fun insert(record: AnimalHealthRecord) {
        viewModelScope.launch { repository.insert(record); loadAll() }
    }
    fun update(record: AnimalHealthRecord) {
        viewModelScope.launch { repository.update(record); loadAll() }
    }
    fun delete(record: AnimalHealthRecord) {
        viewModelScope.launch { repository.delete(record); loadAll() }
    }
}

class AnimalHealthRecordViewModelFactory(private val repository: AnimalHealthRecordRepository) : ViewModelProvider.Factory {
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        if (modelClass.isAssignableFrom(AnimalHealthRecordViewModel::class.java)) {
            @Suppress("UNCHECKED_CAST")
            return AnimalHealthRecordViewModel(repository) as T
        }
        throw IllegalArgumentException("Unknown ViewModel class")
    }
} 