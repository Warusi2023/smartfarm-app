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

enum class TaskListFilter {
    ALL,
    OPEN,
    IN_PROGRESS,
    DONE,
    CANCELLED,
    MINE
}

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
                        _uiState.value = _uiState.value.copy(
                            isLoading = _uiState.value.tasks.isEmpty(),
                            error = null
                        )
                    }
                    is Resource.Success -> {
                        _uiState.value = _uiState.value.copy(
                            tasks = resource.data,
                            isLoading = false,
                            error = null,
                            actionError = null
                        )
                    }
                    is Resource.Error -> {
                        _uiState.value = _uiState.value.copy(
                            tasks = if (_uiState.value.tasks.isEmpty()) emptyList() else _uiState.value.tasks,
                            isLoading = false,
                            error = resource.message
                        )
                    }
                }
            }
        }
    }

    fun setFilter(filter: TaskListFilter) {
        _uiState.value = _uiState.value.copy(filter = filter)
    }

    fun createTask(task: TaskDto) {
        viewModelScope.launch {
            val existing = _uiState.value.tasks
            _uiState.value = _uiState.value.copy(
                isLoading = existing.isEmpty(),
                error = null,
                actionError = null
            )
            when (val result = taskRepository.createTask(task)) {
                is Resource.Success -> loadTasks(null)
                is Resource.Error -> {
                    _uiState.value = _uiState.value.copy(
                        tasks = existing,
                        isLoading = false,
                        actionError = result.message
                    )
                }
                is Resource.Loading -> {}
            }
        }
    }

    fun completeTask(task: TaskDto) {
        viewModelScope.launch {
            _uiState.value = _uiState.value.copy(actionError = null)
            when (val result = taskRepository.completeTask(task.farmId, task.id)) {
                is Resource.Success -> loadTasks(null)
                is Resource.Error -> {
                    _uiState.value = _uiState.value.copy(actionError = result.message)
                }
                is Resource.Loading -> {}
            }
        }
    }

    fun cancelTask(task: TaskDto) {
        viewModelScope.launch {
            _uiState.value = _uiState.value.copy(actionError = null)
            when (val result = taskRepository.cancelTask(task.id, task.farmId)) {
                is Resource.Success -> loadTasks(null)
                is Resource.Error -> {
                    _uiState.value = _uiState.value.copy(actionError = result.message)
                }
                is Resource.Loading -> {}
            }
        }
    }

    fun updateTask(task: TaskDto) {
        viewModelScope.launch {
            _uiState.value = _uiState.value.copy(actionError = null)
            when (val result = taskRepository.updateTask(task)) {
                is Resource.Success -> loadTasks(null)
                is Resource.Error -> {
                    _uiState.value = _uiState.value.copy(actionError = result.message)
                }
                is Resource.Loading -> {}
            }
        }
    }

    fun deleteTask(taskId: String, farmId: String?) {
        viewModelScope.launch {
            _uiState.value = _uiState.value.copy(actionError = null)
            when (val result = taskRepository.deleteTask(taskId, farmId)) {
                is Resource.Success -> loadTasks(null)
                is Resource.Error -> {
                    _uiState.value = _uiState.value.copy(actionError = result.message)
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

    fun clearActionError() {
        _uiState.value = _uiState.value.copy(actionError = null)
    }
}

data class TaskUiState(
    val tasks: List<TaskDto> = emptyList(),
    val filter: TaskListFilter = TaskListFilter.ALL,
    val isLoading: Boolean = false,
    val error: String? = null,
    val actionError: String? = null
) {
    fun visibleTasks(currentUserId: String? = null): List<TaskDto> {
        return when (filter) {
            TaskListFilter.ALL -> tasks
            TaskListFilter.OPEN -> tasks.filter { it.status.equals("open", ignoreCase = true) }
            TaskListFilter.IN_PROGRESS -> tasks.filter {
                it.status.equals("in_progress", ignoreCase = true)
            }
            TaskListFilter.DONE -> tasks.filter { it.status.equals("done", ignoreCase = true) }
            TaskListFilter.CANCELLED -> tasks.filter {
                it.status.equals("cancelled", ignoreCase = true) ||
                    it.status.equals("canceled", ignoreCase = true)
            }
            TaskListFilter.MINE -> {
                if (currentUserId.isNullOrBlank()) emptyList()
                else tasks.filter { it.assignedToUserId == currentUserId }
            }
        }
    }
}
