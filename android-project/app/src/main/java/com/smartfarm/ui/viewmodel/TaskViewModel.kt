package com.smartfarm.ui.viewmodel

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.smartfarm.data.model.TaskDto
import com.smartfarm.data.repository.TaskRepository
import com.smartfarm.data.util.Resource
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.*
import kotlinx.coroutines.launch
import javax.inject.Inject

data class TaskUiState(
    val tasks: List<TaskDto> = emptyList(),
    val isLoading: Boolean = false,
    val error: String? = null
)

@HiltViewModel
class TaskViewModel @Inject constructor(
    private val taskRepository: TaskRepository
) : ViewModel() {
    
    private val _uiState = MutableStateFlow(TaskUiState(isLoading = true))
    val uiState: StateFlow<TaskUiState> = _uiState.asStateFlow()
    
    fun loadTasks(farmId: String? = null) {
        viewModelScope.launch {
            taskRepository.getTasks(farmId).collect { resource ->
                when (resource) {
                    is Resource.Loading -> {
                        _uiState.update { it.copy(isLoading = true, error = null) }
                    }
                    is Resource.Success -> {
                        _uiState.update {
                            it.copy(
                                tasks = resource.data,
                                isLoading = false,
                                error = null
                            )
                        }
                    }
                    is Resource.Error -> {
                        _uiState.update {
                            it.copy(
                                tasks = resource.data ?: emptyList(),
                                isLoading = false,
                                error = resource.exception.message
                            )
                        }
                    }
                }
            }
        }
    }
    
    fun createTask(task: TaskDto) {
        viewModelScope.launch {
            when (val result = taskRepository.createTask(task)) {
                is Resource.Success -> loadTasks()
                is Resource.Error -> {
                    _uiState.update { it.copy(error = result.exception.message) }
                }
                else -> {}
            }
        }
    }
    
    fun refresh(farmId: String? = null) {
        loadTasks(farmId)
    }
}

