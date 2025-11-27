package com.smartfarm.shared.ui.viewmodel

import com.smartfarm.shared.data.model.dto.TaskDto
import com.smartfarm.shared.data.repository.TaskRepository
import com.smartfarm.shared.data.util.Resource
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch

class TaskViewModel(
    private val taskRepository: TaskRepository
) {
    private val viewModelScope = CoroutineScope(SupervisorJob() + Dispatchers.Main)
    
    private val _uiState = MutableStateFlow(TaskUiState(isLoading = true))
    val uiState: StateFlow<TaskUiState> = _uiState.asStateFlow()
    
    fun loadTasks(farmId: String? = null) {
        viewModelScope.launch {
            taskRepository.getTasks(farmId).collect { resource ->
                when (resource) {
                    is Resource.Loading -> {
                        _uiState.value = _uiState.value.copy(isLoading = true, error = null)
                    }
                    is Resource.Success -> {
                        _uiState.value = TaskUiState(
                            tasks = resource.data ?: emptyList(),
                            isLoading = false,
                            error = null
                        )
                    }
                    is Resource.Error -> {
                        _uiState.value = TaskUiState(
                            tasks = resource.data ?: emptyList(),
                            isLoading = false,
                            error = resource.exception?.message
                        )
                    }
                }
            }
        }
    }
    
    fun createTask(task: TaskDto) {
        viewModelScope.launch {
            _uiState.value = _uiState.value.copy(isLoading = true)
            when (val result = taskRepository.createTask(task)) {
                is Resource.Success -> loadTasks(task.farmId)
                is Resource.Error -> {
                    _uiState.value = _uiState.value.copy(
                        isLoading = false,
                        error = result.exception?.message
                    )
                }
                is Resource.Loading -> {}
            }
        }
    }
    
    fun updateTask(task: TaskDto) {
        viewModelScope.launch {
            _uiState.value = _uiState.value.copy(isLoading = true)
            when (val result = taskRepository.updateTask(task)) {
                is Resource.Success -> loadTasks(task.farmId)
                is Resource.Error -> {
                    _uiState.value = _uiState.value.copy(
                        isLoading = false,
                        error = result.exception?.message
                    )
                }
                is Resource.Loading -> {}
            }
        }
    }
    
    fun deleteTask(taskId: String, farmId: String?) {
        viewModelScope.launch {
            _uiState.value = _uiState.value.copy(isLoading = true)
            when (val result = taskRepository.deleteTask(taskId)) {
                is Resource.Success -> loadTasks(farmId)
                is Resource.Error -> {
                    _uiState.value = _uiState.value.copy(
                        isLoading = false,
                        error = result.exception?.message
                    )
                }
                is Resource.Loading -> {}
            }
        }
    }
    
    fun refresh(farmId: String? = null) {
        loadTasks(farmId)
    }
    
    fun clearError() {
        _uiState.value = _uiState.value.copy(error = null)
    }
}

data class TaskUiState(
    val tasks: List<TaskDto> = emptyList(),
    val isLoading: Boolean = false,
    val error: String? = null
)

