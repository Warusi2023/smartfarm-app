package com.example.smartfarm.data.model

// Simplified WeatherForecast for dashboard display
data class WeatherForecast(
    val temperature: Double, // °C
    val condition: String, // e.g., "Sunny", "Cloudy", "Rainy"
    val humidity: Int, // percentage
    val windSpeed: Double // km/h
) 