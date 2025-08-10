// viewmodel/PetViewModel.kt
package com.example.smartfarm.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.viewModelScope
import com.example.smartfarm.data.dao.PetDao
import com.example.smartfarm.data.model.Pet
import kotlinx.coroutines.flow.*
import kotlinx.coroutines.launch

class PetViewModel(private val petDao: PetDao) : ViewModel() {
    val pets: StateFlow<List<Pet>> = petDao.getAll()
        .stateIn(viewModelScope, SharingStarted.Lazily, emptyList())

    private val _selectedPet = MutableStateFlow<Pet?>(null)
    val selectedPet: StateFlow<Pet?> = _selectedPet

    fun addPet(pet: Pet) {
        viewModelScope.launch { petDao.insert(pet) }
    }

    fun loadPetById(id: Int) {
        viewModelScope.launch {
            _selectedPet.value = petDao.getById(id)
        }
    }
}

class PetViewModelFactory(private val petDao: PetDao) : ViewModelProvider.Factory {
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        if (modelClass.isAssignableFrom(PetViewModel::class.java)) {
            @Suppress("UNCHECKED_CAST")
            return PetViewModel(petDao) as T
        }
        throw IllegalArgumentException("Unknown ViewModel class")
    }
}