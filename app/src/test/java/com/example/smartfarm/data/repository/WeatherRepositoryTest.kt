package com.example.smartfarm.data.repository

import androidx.arch.core.executor.testing.InstantTaskExecutorRule
import com.example.smartfarm.data.model.*
import com.example.smartfarm.data.service.WeatherService
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.ExperimentalCoroutinesApi
import kotlinx.coroutines.test.*
import org.junit.After
import org.junit.Assert.*
import org.junit.Before
import org.junit.Rule
import org.junit.Test
import org.mockito.kotlin.*
import retrofit2.Response

@OptIn(ExperimentalCoroutinesApi::class)
class WeatherRepositoryTest {
    @get:Rule
    val instantTaskExecutorRule = InstantTaskExecutorRule()

    private lateinit var repository: WeatherRepository
    private lateinit var mockWeatherService: WeatherService
    private val testDispatcher = StandardTestDispatcher()

    @Before
    fun setup() {
        Dispatchers.setMain(testDispatcher)
        mockWeatherService = mock()
        repository = WeatherRepository(mockWeatherService)
    }

    @After
    fun tearDown() {
        Dispatchers.resetMain()
    }

    @Test
    fun `getCurrentWeather should return weather data on successful API call`() = runTest {
        // Given
        val mockWeatherResponse = WeatherResponse(
            main = MainWeather(
                temp = 25.0,
                humidity = 60,
                pressure = 1013.0
            ),
            weather = listOf(
                Weather(
                    id = 800,
                    main = "Clear",
                    description = "clear sky",
                    icon = "01d"
                )
            ),
            wind = Wind(speed = 10.0),
            dt = System.currentTimeMillis() / 1000
        )
        whenever(mockWeatherService.getCurrentWeather(any(), any(), any()))
            .thenReturn(Response.success(mockWeatherResponse))

        // When
        val result = repository.getCurrentWeather()

        // Then
        assertNotNull(result)
        assertEquals(25.0, result.temperature, 0.01)
        assertEquals(60.0, result.humidity, 0.01)
        assertEquals(10.0, result.windSpeed, 0.01)
        assertEquals("Clear", result.description)
        assertEquals("01d", result.icon)
    }

    @Test
    fun `getCurrentWeather should throw exception on API error`() = runTest {
        // Given
        whenever(mockWeatherService.getCurrentWeather(any(), any(), any()))
            .thenReturn(Response.error(404, okhttp3.ResponseBody.create(null, "")))

        // When & Then
        assertThrows(Exception::class.java) {
            repository.getCurrentWeather()
        }
    }

    @Test
    fun `getCurrentWeather should throw exception on network failure`() = runTest {
        // Given
        whenever(mockWeatherService.getCurrentWeather(any(), any(), any()))
            .thenThrow(RuntimeException("Network error"))

        // When & Then
        assertThrows(RuntimeException::class.java) {
            repository.getCurrentWeather()
        }
    }

    @Test
    fun `getWeatherAlerts should return alerts on successful API call`() = runTest {
        // Given
        val mockAlertsResponse = WeatherAlertsResponse(
            alerts = listOf(
                Alert(
                    sender_name = "Weather Service",
                    event = "Storm Warning",
                    start = System.currentTimeMillis() / 1000,
                    end = (System.currentTimeMillis() / 1000) + 3600,
                    description = "Severe storm approaching",
                    tags = listOf("storm", "warning")
                )
            )
        )
        whenever(mockWeatherService.getWeatherAlerts(any(), any(), any()))
            .thenReturn(Response.success(mockAlertsResponse))

        // When
        val result = repository.getWeatherAlerts()

        // Then
        assertNotNull(result)
        assertEquals(1, result.size)
        assertEquals("Storm Warning", result[0].title)
        assertEquals("Severe storm approaching", result[0].description)
        assertEquals(AlertSeverity.HIGH, result[0].severity)
    }

    @Test
    fun `getWeatherAlerts should return empty list when no alerts`() = runTest {
        // Given
        val mockAlertsResponse = WeatherAlertsResponse(alerts = emptyList())
        whenever(mockWeatherService.getWeatherAlerts(any(), any(), any()))
            .thenReturn(Response.success(mockAlertsResponse))

        // When
        val result = repository.getWeatherAlerts()

        // Then
        assertNotNull(result)
        assertTrue(result.isEmpty())
    }

    @Test
    fun `getWeatherAlerts should throw exception on API error`() = runTest {
        // Given
        whenever(mockWeatherService.getWeatherAlerts(any(), any(), any()))
            .thenReturn(Response.error(500, okhttp3.ResponseBody.create(null, "")))

        // When & Then
        assertThrows(Exception::class.java) {
            repository.getWeatherAlerts()
        }
    }

    @Test
    fun `should handle null weather response gracefully`() = runTest {
        // Given
        whenever(mockWeatherService.getCurrentWeather(any(), any(), any()))
            .thenReturn(Response.success(null))

        // When & Then
        assertThrows(Exception::class.java) {
            repository.getCurrentWeather()
        }
    }

    @Test
    fun `should handle null alerts response gracefully`() = runTest {
        // Given
        whenever(mockWeatherService.getWeatherAlerts(any(), any(), any()))
            .thenReturn(Response.success(null))

        // When & Then
        assertThrows(Exception::class.java) {
            repository.getWeatherAlerts()
        }
    }

    @Test
    fun `should map weather conditions correctly`() = runTest {
        // Given
        val mockWeatherResponse = WeatherResponse(
            main = MainWeather(temp = 20.0, humidity = 70, pressure = 1013.0),
            weather = listOf(
                Weather(id = 200, main = "Thunderstorm", description = "thunderstorm", icon = "11d")
            ),
            wind = Wind(speed = 15.0),
            dt = System.currentTimeMillis() / 1000
        )
        whenever(mockWeatherService.getCurrentWeather(any(), any(), any()))
            .thenReturn(Response.success(mockWeatherResponse))

        // When
        val result = repository.getCurrentWeather()

        // Then
        assertEquals("Thunderstorm", result.description)
        assertEquals("11d", result.icon)
        assertEquals(20.0, result.temperature, 0.01)
        assertEquals(70.0, result.humidity, 0.01)
        assertEquals(15.0, result.windSpeed, 0.01)
    }

    @Test
    fun `should determine alert severity correctly`() = runTest {
        // Given
        val mockAlertsResponse = WeatherAlertsResponse(
            alerts = listOf(
                Alert(
                    sender_name = "Weather Service",
                    event = "Severe Weather Warning",
                    start = System.currentTimeMillis() / 1000,
                    end = (System.currentTimeMillis() / 1000) + 3600,
                    description = "Extremely dangerous weather conditions",
                    tags = listOf("severe", "dangerous")
                )
            )
        )
        whenever(mockWeatherService.getWeatherAlerts(any(), any(), any()))
            .thenReturn(Response.success(mockAlertsResponse))

        // When
        val result = repository.getWeatherAlerts()

        // Then
        assertEquals(AlertSeverity.HIGH, result[0].severity)
    }
}

// Mock data classes for testing
data class WeatherResponse(
    val main: MainWeather,
    val weather: List<Weather>,
    val wind: Wind,
    val dt: Long
)

data class MainWeather(
    val temp: Double,
    val humidity: Int,
    val pressure: Double
)

data class Weather(
    val id: Int,
    val main: String,
    val description: String,
    val icon: String
)

data class Wind(
    val speed: Double
)

data class WeatherAlertsResponse(
    val alerts: List<Alert>
)

data class Alert(
    val sender_name: String,
    val event: String,
    val start: Long,
    val end: Long,
    val description: String,
    val tags: List<String>
) 