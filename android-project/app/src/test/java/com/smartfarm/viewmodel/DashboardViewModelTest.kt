package com.smartfarm.viewmodel

import com.smartfarm.data.model.*
import com.smartfarm.data.repository.*
import com.smartfarm.data.util.Resource
import com.smartfarm.ui.viewmodel.DashboardViewModel
import com.smartfarm.ui.viewmodel.DashboardUiState
import kotlinx.coroutines.flow.flowOf
import kotlinx.coroutines.test.runTest
import org.junit.Assert.*
import org.junit.Before
import org.junit.Test
import org.mockito.kotlin.mock
import org.mockito.kotlin.whenever

class DashboardViewModelTest {
    
    private lateinit var farmRepository: FarmRepository
    private lateinit var livestockRepository: LivestockRepository
    private lateinit var cropRepository: CropRepository
    private lateinit var taskRepository: TaskRepository
    private lateinit var analyticsRepository: AnalyticsRepository
    private lateinit var viewModel: DashboardViewModel
    
    @Before
    fun setup() {
        farmRepository = mock()
        livestockRepository = mock()
        cropRepository = mock()
        taskRepository = mock()
        analyticsRepository = mock()
        
        viewModel = DashboardViewModel(
            farmRepository,
            livestockRepository,
            cropRepository,
            taskRepository,
            analyticsRepository
        )
    }
    
    @Test
    fun `initial state is loading`() = runTest {
        // Given
        whenever(farmRepository.getFarms()).thenReturn(flowOf(Resource.Loading))
        whenever(livestockRepository.getLivestock()).thenReturn(flowOf(Resource.Loading))
        whenever(cropRepository.getCrops()).thenReturn(flowOf(Resource.Loading))
        whenever(taskRepository.getTasks()).thenReturn(flowOf(Resource.Loading))
        whenever(analyticsRepository.getAnalytics()).thenReturn(flowOf(Resource.Loading))
        
        // When
        val state = viewModel.uiState.value
        
        // Then
        assertTrue(state.isLoading)
    }
    
    @Test
    fun `loadDashboardData updates state with success data`() = runTest {
        // Given
        val farms = listOf(
            FarmDto("1", "Farm 1", LocationDto(0.0, 0.0, "Address"), 10.0, "MIXED", "ACTIVE", "1")
        )
        val livestock = listOf(
            LivestockDto("1", "Cow 1", "CATTLE", "Holstein", "1")
        )
        val crops = listOf(
            CropDto("1", "Corn", "Sweet", "1")
        )
        val tasks = listOf(
            TaskDto("1", "Task 1", "Description", "1", "PENDING")
        )
        val analytics = AnalyticsDto(1000.0, 500.0, 500.0, 10, 5, 3, 2)
        
        whenever(farmRepository.getFarms()).thenReturn(flowOf(Resource.Success(farms)))
        whenever(livestockRepository.getLivestock()).thenReturn(flowOf(Resource.Success(livestock)))
        whenever(cropRepository.getCrops()).thenReturn(flowOf(Resource.Success(crops)))
        whenever(taskRepository.getTasks()).thenReturn(flowOf(Resource.Success(tasks)))
        whenever(analyticsRepository.getAnalytics()).thenReturn(flowOf(Resource.Success(analytics)))
        
        // When
        viewModel.loadDashboardData()
        
        // Wait for state update
        kotlinx.coroutines.delay(100)
        
        // Then
        val state = viewModel.uiState.value
        assertFalse(state.isLoading)
        assertEquals(farms, state.farms)
        assertEquals(livestock, state.livestock)
        assertEquals(crops, state.crops)
        assertEquals(tasks, state.tasks)
        assertEquals(analytics, state.analytics)
        assertNull(state.error)
    }
    
    @Test
    fun `loadDashboardData handles error state`() = runTest {
        // Given
        val error = Exception("Network error")
        whenever(farmRepository.getFarms()).thenReturn(flowOf(Resource.Error(error)))
        whenever(livestockRepository.getLivestock()).thenReturn(flowOf(Resource.Error(error)))
        whenever(cropRepository.getCrops()).thenReturn(flowOf(Resource.Error(error)))
        whenever(taskRepository.getTasks()).thenReturn(flowOf(Resource.Error(error)))
        whenever(analyticsRepository.getAnalytics()).thenReturn(flowOf(Resource.Error(error)))
        
        // When
        viewModel.loadDashboardData()
        
        // Wait for state update
        kotlinx.coroutines.delay(100)
        
        // Then
        val state = viewModel.uiState.value
        assertFalse(state.isLoading)
        assertNotNull(state.error)
    }
}

