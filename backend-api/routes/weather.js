const express = require('express');
const router = express.Router();
const axios = require('axios');

// Get OpenWeather API key from environment
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

// Cache weather data to reduce API calls
const weatherCache = new Map();
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

/**
 * Get current weather by coordinates
 * GET /api/weather/current?lat={lat}&lng={lng}
 */
router.get('/current', async (req, res) => {
    try {
        const { lat, lng } = req.query;

        if (!lat || !lng) {
            return res.status(400).json({
                success: false,
                error: 'Latitude and longitude are required'
            });
        }

        if (!WEATHER_API_KEY) {
            return res.status(503).json({
                success: false,
                error: 'Weather API key not configured',
                useDemo: true
            });
        }

        // Check cache
        const cacheKey = `current_${lat}_${lng}`;
        const cached = weatherCache.get(cacheKey);
        if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
            return res.json({
                success: true,
                data: cached.data,
                cached: true
            });
        }

        // Fetch from OpenWeatherMap
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather`,
            {
                params: {
                    lat,
                    lon: lng,
                    appid: WEATHER_API_KEY,
                    units: 'metric'
                },
                timeout: 10000
            }
        );

        const weatherData = {
            temperature: Math.round(response.data.main.temp),
            humidity: response.data.main.humidity,
            rainfall: response.data.rain ? response.data.rain['1h'] || 0 : 0,
            windSpeed: response.data.wind.speed * 3.6, // m/s to km/h
            pressure: response.data.main.pressure,
            cloudCover: response.data.clouds.all,
            description: response.data.weather[0].description,
            icon: response.data.weather[0].icon,
            visibility: response.data.visibility / 1000, // meters to km
            feelsLike: Math.round(response.data.main.feels_like),
            sunrise: response.data.sys.sunrise,
            sunset: response.data.sys.sunset
        };

        // Cache the result
        weatherCache.set(cacheKey, {
            data: weatherData,
            timestamp: Date.now()
        });

        res.json({
            success: true,
            data: weatherData,
            cached: false
        });

    } catch (error) {
        console.error('Error fetching current weather:', error.message);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch weather data',
            message: error.message,
            useDemo: true
        });
    }
});

/**
 * Get weather forecast by coordinates
 * GET /api/weather/forecast?lat={lat}&lng={lng}&days={days}
 */
router.get('/forecast', async (req, res) => {
    try {
        const { lat, lng, days = 7 } = req.query;

        if (!lat || !lng) {
            return res.status(400).json({
                success: false,
                error: 'Latitude and longitude are required'
            });
        }

        if (!WEATHER_API_KEY) {
            return res.status(503).json({
                success: false,
                error: 'Weather API key not configured',
                useDemo: true
            });
        }

        // Check cache
        const cacheKey = `forecast_${lat}_${lng}_${days}`;
        const cached = weatherCache.get(cacheKey);
        if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
            return res.json({
                success: true,
                data: cached.data,
                cached: true
            });
        }

        // Fetch from OpenWeatherMap
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast`,
            {
                params: {
                    lat,
                    lon: lng,
                    appid: WEATHER_API_KEY,
                    units: 'metric'
                },
                timeout: 10000
            }
        );

        // Process forecast data
        const dailyData = {};
        response.data.list.forEach(item => {
            const date = new Date(item.dt * 1000);
            const dayKey = date.toDateString();

            if (!dailyData[dayKey]) {
                dailyData[dayKey] = {
                    date: date,
                    temps: [],
                    humidity: [],
                    rainfall: [],
                    windSpeed: [],
                    descriptions: []
                };
            }

            dailyData[dayKey].temps.push(item.main.temp);
            dailyData[dayKey].humidity.push(item.main.humidity);
            dailyData[dayKey].rainfall.push(item.rain ? item.rain['3h'] || 0 : 0);
            dailyData[dayKey].windSpeed.push(item.wind.speed * 3.6);
            dailyData[dayKey].descriptions.push(item.weather[0].description);
        });

        // Convert to array and calculate daily averages
        const forecastData = Object.values(dailyData).map(day => ({
            day: day.date.toLocaleDateString('en-US', { weekday: 'short' }),
            date: day.date.toLocaleDateString(),
            temp: Math.round(day.temps.reduce((a, b) => a + b, 0) / day.temps.length),
            humidity: Math.round(day.humidity.reduce((a, b) => a + b, 0) / day.humidity.length),
            rainfall: Math.round(day.rainfall.reduce((a, b) => a + b, 0)),
            windSpeed: Math.round(day.windSpeed.reduce((a, b) => a + b, 0) / day.windSpeed.length),
            description: day.descriptions[Math.floor(day.descriptions.length / 2)]
        })).slice(0, parseInt(days));

        // Cache the result
        weatherCache.set(cacheKey, {
            data: forecastData,
            timestamp: Date.now()
        });

        res.json({
            success: true,
            data: forecastData,
            cached: false
        });

    } catch (error) {
        console.error('Error fetching weather forecast:', error.message);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch weather forecast',
            message: error.message,
            useDemo: true
        });
    }
});

/**
 * Reverse geocode coordinates to location name
 * GET /api/weather/location?lat={lat}&lng={lng}
 */
router.get('/location', async (req, res) => {
    try {
        const { lat, lng } = req.query;

        if (!lat || !lng) {
            return res.status(400).json({
                success: false,
                error: 'Latitude and longitude are required'
            });
        }

        if (!WEATHER_API_KEY) {
            return res.status(503).json({
                success: false,
                error: 'Weather API key not configured',
                useDemo: true
            });
        }

        // Check cache
        const cacheKey = `location_${lat}_${lng}`;
        const cached = weatherCache.get(cacheKey);
        if (cached && Date.now() - cached.timestamp < CACHE_DURATION * 24) { // Cache for 12 hours
            return res.json({
                success: true,
                data: cached.data,
                cached: true
            });
        }

        // Fetch from OpenWeatherMap Geocoding API
        const response = await axios.get(
            `https://api.openweathermap.org/geo/1.0/reverse`,
            {
                params: {
                    lat,
                    lon: lng,
                    limit: 1,
                    appid: WEATHER_API_KEY
                },
                timeout: 10000
            }
        );

        if (response.data && response.data.length > 0) {
            const location = response.data[0];
            const locationData = {
                name: location.name,
                state: location.state || '',
                country: location.country,
                fullName: `${location.name}${location.state ? `, ${location.state}` : ''}, ${location.country}`
            };

            // Cache the result
            weatherCache.set(cacheKey, {
                data: locationData,
                timestamp: Date.now()
            });

            res.json({
                success: true,
                data: locationData,
                cached: false
            });
        } else {
            res.json({
                success: true,
                data: {
                    name: 'Unknown',
                    state: '',
                    country: '',
                    fullName: 'Unknown Location'
                }
            });
        }

    } catch (error) {
        console.error('Error reverse geocoding:', error.message);
        res.status(500).json({
            success: false,
            error: 'Failed to get location name',
            message: error.message
        });
    }
});

/**
 * Search for locations
 * GET /api/weather/search?q={query}
 */
router.get('/search', async (req, res) => {
    try {
        const { q } = req.query;

        if (!q || q.length < 3) {
            return res.status(400).json({
                success: false,
                error: 'Search query must be at least 3 characters'
            });
        }

        if (!WEATHER_API_KEY) {
            return res.status(503).json({
                success: false,
                error: 'Weather API key not configured',
                useDemo: true
            });
        }

        // Check cache
        const cacheKey = `search_${q.toLowerCase()}`;
        const cached = weatherCache.get(cacheKey);
        if (cached && Date.now() - cached.timestamp < CACHE_DURATION * 6) { // Cache for 3 hours
            return res.json({
                success: true,
                data: cached.data,
                cached: true
            });
        }

        // Fetch from OpenWeatherMap Geocoding API
        const response = await axios.get(
            `https://api.openweathermap.org/geo/1.0/direct`,
            {
                params: {
                    q,
                    limit: 5,
                    appid: WEATHER_API_KEY
                },
                timeout: 10000
            }
        );

        const locations = response.data.map(location => ({
            name: location.name,
            state: location.state || '',
            country: location.country,
            lat: location.lat,
            lng: location.lon,
            fullName: `${location.name}${location.state ? `, ${location.state}` : ''}, ${location.country}`
        }));

        // Cache the result
        weatherCache.set(cacheKey, {
            data: locations,
            timestamp: Date.now()
        });

        res.json({
            success: true,
            data: locations,
            cached: false
        });

    } catch (error) {
        console.error('Error searching locations:', error.message);
        res.status(500).json({
            success: false,
            error: 'Failed to search locations',
            message: error.message
        });
    }
});

/**
 * Get weather API status
 * GET /api/weather/status
 */
router.get('/status', (req, res) => {
    res.json({
        success: true,
        data: {
            apiConfigured: !!WEATHER_API_KEY,
            cacheSize: weatherCache.size,
            cacheDuration: CACHE_DURATION / 1000 / 60 + ' minutes'
        }
    });
});

/**
 * Clear weather cache (admin only)
 * POST /api/weather/clear-cache
 */
router.post('/clear-cache', (req, res) => {
    weatherCache.clear();
    res.json({
        success: true,
        message: 'Weather cache cleared successfully'
    });
});

module.exports = router;
