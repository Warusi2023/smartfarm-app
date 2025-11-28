package com.smartfarm.shared.ui.viewmodel

import com.smartfarm.shared.data.model.dto.*
import com.smartfarm.shared.data.repository.*
import com.smartfarm.shared.data.util.Resource
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.flow.*
import kotlinx.coroutines.launch

/**
 * Shared Dashboard ViewModel/State Holder
 */
class DashboardViewModel(
    private val farmRepository: FarmRepository,
    private val livestockRepository: LivestockRepository,
    private val cropRepository: CropRepository,
    private val taskRepository: TaskRepository,
    private val analyticsRepository: AnalyticsRepository,
    private val api: com.smartfarm.shared.network.SmartFarmApi
) {
    private val viewModelScope = CoroutineScope(SupervisorJob() + Dispatchers.Main)
    
    private val _uiState = MutableStateFlow(DashboardUiState(isLoading = true))
    val uiState: StateFlow<DashboardUiState> = _uiState.asStateFlow()
    
    init {
        loadDashboardData()
    }
    
    fun loadDashboardData() {
        viewModelScope.launch {
            _uiState.value = _uiState.value.copy(isLoading = true, error = null)
            
            // Combine all data sources
            combine(
                farmRepository.getFarms(),
                livestockRepository.getLivestock(),
                cropRepository.getCrops(),
                taskRepository.getTasks(),
                analyticsRepository.getAnalytics()
            ) { farmsRes, livestockRes, cropsRes, tasksRes, analyticsRes ->
                val farms = when (farmsRes) {
                    is Resource.Success -> farmsRes.data
                    is Resource.Error -> farmsRes.data ?: emptyList()
                    else -> emptyList()
                }
                
                val livestock = when (livestockRes) {
                    is Resource.Success -> livestockRes.data
                    is Resource.Error -> livestockRes.data ?: emptyList()
                    else -> emptyList()
                }
                
                val crops = when (cropsRes) {
                    is Resource.Success -> cropsRes.data
                    is Resource.Error -> cropsRes.data ?: emptyList()
                    else -> emptyList()
                }
                
                val tasks = when (tasksRes) {
                    is Resource.Success -> tasksRes.data
                    is Resource.Error -> tasksRes.data ?: emptyList()
                    else -> emptyList()
                }
                
                val analytics = when (analyticsRes) {
                    is Resource.Success -> analyticsRes.data
                    is Resource.Error -> null
                    else -> null
                }
                
                // Load daily tip - try personalized first, fallback to generic
                val dailyTip = if (crops.isNotEmpty() || livestock.isNotEmpty()) {
                    when (val tipRes = api.getPersonalizedTip(crops, livestock)) {
                        is Resource.Success -> tipRes.data
                        else -> null
                    }
                } else {
                    when (val tipRes = api.getDailyTip()) {
                        is Resource.Success -> tipRes.data
                        else -> null
                    }
                }
                
                val error = when {
                    farmsRes is Resource.Error -> farmsRes.exception?.message
                    livestockRes is Resource.Error -> livestockRes.exception?.message
                    cropsRes is Resource.Error -> cropsRes.exception?.message
                    tasksRes is Resource.Error -> tasksRes.exception?.message
                    else -> null
                }
                
                DashboardUiState(
                    farms = farms,
                    livestock = livestock,
                    crops = crops,
                    tasks = tasks,
                    analytics = analytics,
                    dailyTip = dailyTip,
                    isLoading = false,
                    error = error
                )
            }.collect { state ->
                _uiState.value = state
            }
        }
    }
    
    fun refresh() {
        loadDashboardData()
    }
}

data class DashboardUiState(
    val farms: List<FarmDto> = emptyList(),
    val livestock: List<LivestockDto> = emptyList(),
    val crops: List<CropDto> = emptyList(),
    val tasks: List<TaskDto> = emptyList(),
    val analytics: AnalyticsDto? = null,
    val dailyTip: DailyTipDto? = null,
    val isLoading: Boolean = false,
    val error: String? = null
)

