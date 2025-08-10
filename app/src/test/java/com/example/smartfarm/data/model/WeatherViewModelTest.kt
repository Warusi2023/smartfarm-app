package com.example.smartfarm.data.model

import androidx.arch.core.executor.testing.InstantTaskExecutorRule
import com.example.smartfarm.data.repository.WeatherRepository
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.flow.flowOf
import kotlinx.coroutines.test.*
import org.junit.After
import org.junit.Assert.*
import org.junit.Before
import org.junit.Rule
import org.junit.Test
import org.mockito.kotlin.*

@OptIn(ExperimentalCoroutinesApi::class)
class WeatherViewModelTest {
    @get:Rule
    val instantTaskExecutorRule = InstantTaskExecutorRule()

    private lateinit var viewModel: WeatherViewModel
    private lateinit var mockRepository: WeatherRepository
    private val testDispatcher = StandardTestDispatcher()

    @Before
    fun setup() {
        Dispatchers.setMain(testDispatcher)
        mockRepository = mock()
        viewModel = WeatherViewModel(mockRepository)
    }

    @After
    fun tearDown() {
        Dispatchers.resetMain()
    }

    @Test
    fun `initial state should be loading false with empty data`() = runTest {
        // When
        testDispatcher.scheduler.advanceUntilIdle()

        // Then
        val uiState = viewModel.uiState.value
        assertFalse(uiState.isLoading)
        assertNull(uiState.currentWeather)
        assertTrue(uiState.weatherAlerts.isEmpty())
        assertNull(uiState.error)
        assertEquals(0L, uiState.lastUpdated)
    }

    @Test
    fun `loadCurrentWeather should update state with weather data`() = runTest {
        // Given
        val weatherData = WeatherForecastEntity(
            id = 1,
            temperature = 25.0,
            humidity = 60.0,
            windSpeed = 10.0,
            description = "Sunny",
            icon = "01d",
            timestamp = System.currentTimeMillis()
        )
        whenever(mockRepository.getCurrentWeather()).thenReturn(weatherData)

        // When
        viewModel.loadCurrentWeather()
        testDispatcher.scheduler.advanceUntilIdle()

        // Then
        val uiState = viewModel.uiState.value
        assertFalse(uiState.isLoading)
        assertEquals(weatherData, uiState.currentWeather)
        assertNull(uiState.error)
        assertTrue(uiState.lastUpdated > 0)
    }

    @Test
    fun `loadWeatherAlerts should update state with alerts`() = runTest {
        // Given
        val alerts = listOf(
            WeatherAlert(
                id = 1,
                title = "Storm Warning",
                description = "Severe storm approaching",
                severity = AlertSeverity.HIGH,
                timestamp = System.currentTimeMillis()
            )
        )
        whenever(mockRepository.getWeatherAlerts()).thenReturn(alerts)

        // When
        viewModel.loadWeatherAlerts()
        testDispatcher.scheduler.advanceUntilIdle()

        // Then
        val uiState = viewModel.uiState.value
        assertEquals(alerts, uiState.weatherAlerts)
    }

    @Test
    fun `should handle weather loading errors`() = runTest {
        // Given
        val errorMessage = "Network error"
        whenever(mockRepository.getCurrentWeather()).thenThrow(RuntimeException(errorMessage))

        // When
        viewModel.loadCurrentWeather()
        testDispatcher.scheduler.advanceUntilIdle()

        // Then
        val uiState = viewModel.uiState.value
        assertFalse(uiState.isLoading)
        assertNotNull(uiState.error)
        assertTrue(uiState.error!!.contains(errorMessage))
    }

    @Test
    fun `refreshWeather should reload both current weather and alerts`() = runTest {
        // Given
        val weatherData = WeatherForecastEntity(
            id = 1,
            temperature = 20.0,
            humidity = 70.0,
            windSpeed = 5.0,
            description = "Cloudy",
            icon = "03d",
            timestamp = System.currentTimeMillis()
        )
        val alerts = listOf<WeatherAlert>()
        
        whenever(mockRepository.getCurrentWeather()).thenReturn(weatherData)
        whenever(mockRepository.getWeatherAlerts()).thenReturn(alerts)

        // When
        viewModel.refreshWeather()
        testDispatcher.scheduler.advanceUntilIdle()

        // Then
        val uiState = viewModel.uiState.value
        assertEquals(weatherData, uiState.currentWeather)
        assertEquals(alerts, uiState.weatherAlerts)
        assertNull(uiState.error)
        verify(mockRepository).getCurrentWeather()
        verify(mockRepository).getWeatherAlerts()
    }

    @Test
    fun `should show loading state during weather fetch`() = runTest {
        // Given
        whenever(mockRepository.getCurrentWeather()).thenAnswer {
            // Simulate delay
            kotlinx.coroutines.delay(100)
            WeatherForecastEntity(
                id = 1,
                temperature = 25.0,
                humidity = 60.0,
                windSpeed = 10.0,
                description = "Sunny",
                icon = "01d",
                timestamp = System.currentTimeMillis()
            )
        }

        // When
        viewModel.loadCurrentWeather()
        // Don't advance to idle yet to check loading state

        // Then
        val uiState = viewModel.uiState.value
        assertTrue(uiState.isLoading)
    }

    @Test
    fun `should clear error when successful weather fetch`() = runTest {
        // Given
        val weatherData = WeatherForecastEntity(
            id = 1,
            temperature = 25.0,
            humidity = 60.0,
            windSpeed = 10.0,
            description = "Sunny",
            icon = "01d",
            timestamp = System.currentTimeMillis()
        )
        whenever(mockRepository.getCurrentWeather()).thenReturn(weatherData)

        // When
        viewModel.loadCurrentWeather()
        testDispatcher.scheduler.advanceUntilIdle()

        // Then
        val uiState = viewModel.uiState.value
        assertNull(uiState.error)
    }

    @Test
    fun `should update lastUpdated timestamp on successful fetch`() = runTest {
        // Given
        val weatherData = WeatherForecastEntity(
            id = 1,
            temperature = 25.0,
            humidity = 60.0,
            windSpeed = 10.0,
            description = "Sunny",
            icon = "01d",
            timestamp = System.currentTimeMillis()
        )
        whenever(mockRepository.getCurrentWeather()).thenReturn(weatherData)
        val beforeFetch = System.currentTimeMillis()

        // When
        viewModel.loadCurrentWeather()
        testDispatcher.scheduler.advanceUntilIdle()

        // Then
        val uiState = viewModel.uiState.value
        assertTrue(uiState.lastUpdated >= beforeFetch)
    }
} 