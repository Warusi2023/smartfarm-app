/**
 * Shared weather payload adapter.
 * Converts WeatherService payloads into a stable shape for dashboard widgets.
 * Never throws on null/missing nested fields — returns an explicit unavailable state.
 */

(function (root, factory) {
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = factory();
    } else {
        root.SmartFarmWeatherDataAdapter = factory();
    }
})(typeof window !== 'undefined' ? window : globalThis, function () {
    'use strict';

    var UNAVAILABLE = 'unavailable';
    var LOADING = 'loading';
    var READY = 'ready';

    function createUnavailableWeatherState(reason) {
        return {
            status: UNAVAILABLE,
            temperature: null,
            humidity: null,
            rainfall: null,
            windSpeed: null,
            pressure: null,
            uvIndex: null,
            cloudCover: null,
            description: 'Weather unavailable',
            forecast: { next7Days: [] },
            season: 'Unknown',
            location: 'Unknown',
            isRealData: false,
            reason: reason || 'missing_weather_payload'
        };
    }

    function createLoadingWeatherState() {
        return {
            status: LOADING,
            temperature: null,
            humidity: null,
            rainfall: null,
            windSpeed: null,
            pressure: null,
            uvIndex: null,
            cloudCover: null,
            description: 'Loading weather…',
            forecast: { next7Days: [] },
            season: 'Unknown',
            location: 'Loading…',
            isRealData: false,
            reason: 'weather_loading'
        };
    }

    function mapForecastDays(forecast) {
        var days = [];
        if (Array.isArray(forecast)) {
            days = forecast;
        } else if (forecast && Array.isArray(forecast.next7Days)) {
            days = forecast.next7Days;
        }
        return days.map(function (day) {
            day = day || {};
            return {
                day: day.day != null ? day.day : 'Day',
                temp: day.temp != null ? day.temp : day.temperature,
                humidity: day.humidity,
                rain: day.rain != null ? day.rain : day.rainfall,
                wind: day.wind != null ? day.wind : day.windSpeed,
                description: day.description || ''
            };
        });
    }

    /**
     * @param {object|null|undefined} weatherData - WeatherService.weatherData shape
     * @returns {object} widget-ready weather state (always defined; never throws)
     */
    function convertWeatherServiceData(weatherData) {
        if (weatherData == null) {
            return createUnavailableWeatherState('null_weather_data');
        }

        var current = weatherData.current;
        if (current == null || typeof current !== 'object') {
            // Payload present but current observations not ready yet
            if (weatherData.status === LOADING) {
                return createLoadingWeatherState();
            }
            return createUnavailableWeatherState('missing_current');
        }

        var locationName = 'Unknown';
        if (typeof weatherData.location === 'string' && weatherData.location.trim()) {
            locationName = weatherData.location;
        } else if (weatherData.location && typeof weatherData.location === 'object') {
            if (weatherData.location.name) {
                locationName = weatherData.location.name;
            } else if (weatherData.location.city) {
                locationName = weatherData.location.city;
            }
        }

        return {
            status: READY,
            temperature: current.temperature != null ? current.temperature : null,
            humidity: current.humidity != null ? current.humidity : null,
            rainfall: current.rainfall != null ? current.rainfall : null,
            windSpeed: current.windSpeed != null ? current.windSpeed : null,
            pressure: current.pressure != null ? current.pressure : null,
            uvIndex: current.uvIndex != null ? current.uvIndex : null,
            cloudCover: current.cloudCover != null ? current.cloudCover : null,
            description: current.description || '',
            forecast: {
                next7Days: mapForecastDays(weatherData.forecast)
            },
            season: weatherData.season || 'Unknown',
            location: locationName,
            isRealData: weatherData.source === 'OpenWeatherMap',
            reason: null
        };
    }

    return {
        STATUS: { UNAVAILABLE: UNAVAILABLE, LOADING: LOADING, READY: READY },
        convertWeatherServiceData: convertWeatherServiceData,
        createUnavailableWeatherState: createUnavailableWeatherState,
        createLoadingWeatherState: createLoadingWeatherState
    };
});
