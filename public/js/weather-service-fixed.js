// SmartFarm Weather Service - Fixed Version
// Centralized weather data management with proper error handling and logging

class WeatherService {
    constructor() {
        this.apiKey = null;
        this.currentLocation = null;
        this.weatherData = null;
        this.lastUpdate = null;
        this.updateInterval = 30 * 60 * 1000; // 30 minutes
        this.callbacks = [];
        
        this.initializeWeatherService();
    }

    async initializeWeatherService() {
        this.log('info', '🌤️ Initializing Weather Service...');
        
        try {
            // Get API key from environment or config
            this.apiKey = this.getWeatherApiKey();
            
            if (!this.apiKey) {
                this.log('warn', '⚠️ Weather API key not found. Using demo data.');
                this.useDemoData();
                return;
            }

            // Try to get user's location and fetch weather
            await this.detectLocationAndFetchWeather();
            
            // Set up periodic updates
            this.setupPeriodicUpdates();
        } catch (error) {
            this.log('error', 'Error initializing weather service:', error);
            this.useDemoData();
        }
    }

    getWeatherApiKey() {
        // Try to get API key from various sources (frontend environment variables)
        return window.VITE_WEATHER_API_KEY || 
               window.VITE_OPENWEATHER_API_KEY || 
               window.NEXT_PUBLIC_WEATHER_API_KEY ||
               window.OPENWEATHER_API_KEY || 
               null;
    }

    async detectLocationAndFetchWeather() {
        try {
            // First, try to get user's current location
            const location = await this.getCurrentLocation();
            if (location) {
                this.currentLocation = location;
                await this.fetchWeatherData(location);
                this.saveLocationPreference(location);
                return;
            }
        } catch (error) {
            this.log('error', 'Error detecting location:', error);
            this.useDemoData();
        }
    }

    async getCurrentLocation() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation not supported'));
                return;
            }

            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    try {
                        const lat = position.coords.latitude;
                        const lng = position.coords.longitude;
                        const name = await this.getLocationName(lat, lng);
                        
                        resolve({ lat, lng, name });
                    } catch (error) {
                        reject(error);
                    }
                },
                (error) => {
                    this.log('warn', 'Geolocation error:', error);
                    reject(error);
                },
                {
                    timeout: 10000,
                    enableHighAccuracy: true,
                    maximumAge: 300000 // 5 minutes
                }
            );
        });
    }

    async getLocationName(lat, lng) {
        try {
            // Get API base URL from config
            const apiBaseUrl = window.SmartFarmConfig?.getApiUrl('') || 'https://smartfarm-app-production.up.railway.app';
            
            const response = await fetch(
                `${apiBaseUrl}/api/weather/location?lat=${lat}&lng=${lng}`
            );

            if (!response.ok) return 'Unknown Location';

            const result = await response.json();
            if (result.success && result.data) {
                return result.data.fullName || 'Unknown Location';
            }

            return 'Unknown Location';
        } catch (error) {
            this.log('warn', 'Error getting location name:', error);
            return 'Unknown Location';
        }
    }

    async fetchWeatherData(location) {
        try {
            this.log('info', `🌤️ Fetching weather for ${location.name}...`);
            
            // Get API base URL from config
            const apiBaseUrl = window.SmartFarmConfig?.getApiUrl('') || 'https://smartfarm-app-production.up.railway.app';
            
            // Fetch current weather from backend
            const currentWeatherResponse = await fetch(
                `${apiBaseUrl}/api/weather/current?lat=${location.lat}&lng=${location.lng}`
            );
            
            if (!currentWeatherResponse.ok) {
                const errorData = await currentWeatherResponse.json();
                if (errorData.useDemo) {
                    this.log('warn', '⚠️ Backend weather API not configured, using demo data');
                    this.useDemoData();
                    return;
                }
                throw new Error(`Weather API error: ${currentWeatherResponse.status}`);
            }
            
            const currentWeatherData = await currentWeatherResponse.json();
            if (!currentWeatherData.success) {
                throw new Error(currentWeatherData.error || 'Failed to fetch current weather');
            }
            
            const currentWeather = currentWeatherData.data;
            
            // Fetch 7-day forecast from backend
            const forecastResponse = await fetch(
                `${apiBaseUrl}/api/weather/forecast?lat=${location.lat}&lng=${location.lng}&days=7`
            );
            
            if (!forecastResponse.ok) {
                const errorData = await forecastResponse.json();
                if (errorData.useDemo) {
                    this.log('warn', '⚠️ Backend weather API not configured, using demo data');
                    this.useDemoData();
                    return;
                }
                throw new Error(`Forecast API error: ${forecastResponse.status}`);
            }
            
            const forecastData = await forecastResponse.json();
            if (!forecastData.success) {
                throw new Error(forecastData.error || 'Failed to fetch forecast');
            }
            
            const forecast = forecastData.data;
            
            // Process and store weather data
            this.weatherData = this.processBackendWeatherData(currentWeather, forecast, location);
            this.lastUpdate = new Date();
            
            // Notify all subscribers
            this.notifySubscribers();
            
            this.log('success', '✅ Weather data updated successfully from backend');
            
        } catch (error) {
            this.log('error', 'Error fetching weather data:', error);
            this.useDemoData();
        }
    }

    processBackendWeatherData(currentWeather, forecast, location) {
        return {
            location: { lat: location.lat, lng: location.lng, name: location.name },
            current: {
                temperature: currentWeather.temperature,
                humidity: currentWeather.humidity,
                rainfall: currentWeather.rainfall,
                windSpeed: currentWeather.windSpeed,
                pressure: currentWeather.pressure,
                uvIndex: currentWeather.uvIndex,
                cloudCover: currentWeather.cloudCover,
                description: currentWeather.description,
                icon: currentWeather.icon,
                visibility: currentWeather.visibility,
                feelsLike: currentWeather.feelsLike
            },
            forecast: forecast,
            season: this.getSeason(location.lat, new Date()),
            lastUpdate: new Date(),
            source: 'OpenWeatherMap'
        };
    }

    getSeason(lat, date) {
        const month = date.getMonth() + 1;
        if (lat < 0) { // Southern Hemisphere (Fiji)
            if (month >= 12 || month <= 2) return 'Summer';
            if (month >= 3 && month <= 5) return 'Autumn';
            if (month >= 6 && month <= 8) return 'Winter';
            if (month >= 9 && month <= 11) return 'Spring';
        } else { // Northern Hemisphere
            if (month >= 12 || month <= 2) return 'Winter';
            if (month >= 3 && month <= 5) return 'Spring';
            if (month >= 6 && month <= 8) return 'Summer';
            if (month >= 9 && month <= 11) return 'Autumn';
        }
        return 'Unknown';
    }

    useDemoData() {
        this.log('info', '📊 Using demo weather data');
        
        // Generate demo forecast with current dates
        const generateDemoForecast = () => {
            const forecast = [];
            const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            const today = new Date();
            
            for (let i = 0; i < 7; i++) {
                const date = new Date(Date.now() + (i * 86400000));
                const dayName = i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : days[date.getDay()];
                
                forecast.push({
                    day: dayName,
                    date: date.toLocaleDateString(),
                    temp: 28 - (i * 0.5), // Gradually decreasing temp
                    humidity: 75 + (i * 2),
                    rainfall: i * 5,
                    windSpeed: 12 - (i * 1.5),
                    description: i === 0 ? 'Partly Cloudy' : i <= 2 ? 'Sunny' : 'Light Rain'
                });
            }
            
            return forecast;
        };
        
        this.weatherData = {
            location: { lat: -18.1248, lng: 178.4501, name: 'Fiji' },
            current: {
                temperature: 28,
                humidity: 75,
                rainfall: 85,
                windSpeed: 12,
                pressure: 1013,
                uvIndex: 8,
                cloudCover: 30,
                description: 'Partly Cloudy',
                icon: '02d',
                visibility: 10,
                feelsLike: 30
            },
            forecast: generateDemoForecast(),
            season: this.getSeason(-18.1248, new Date()),
            lastUpdate: new Date(),
            source: 'Demo Data'
        };
        
        this.notifySubscribers();
    }

    setupPeriodicUpdates() {
        setInterval(() => {
            if (this.currentLocation) {
                this.fetchWeatherData(this.currentLocation);
            }
        }, this.updateInterval);
    }

    subscribe(callback) {
        this.callbacks.push(callback);
        
        // Immediately call with current data if available
        if (this.weatherData) {
            try {
                callback(this.weatherData);
            } catch (error) {
                this.log('error', 'Error in weather subscriber callback:', error);
            }
        }
    }

    unsubscribe(callback) {
        this.callbacks = this.callbacks.filter(cb => cb !== callback);
    }

    notifySubscribers() {
        this.callbacks.forEach(callback => {
            try {
                callback(this.weatherData);
            } catch (error) {
                this.log('error', 'Error in weather subscriber callback:', error);
            }
        });
    }

    saveLocationPreference(location) {
        try {
            localStorage.setItem('smartfarm_preferred_location', JSON.stringify(location));
        } catch (error) {
            this.log('warn', 'Failed to save location preference:', error);
        }
    }

    getLocationPreference() {
        try {
            const saved = localStorage.getItem('smartfarm_preferred_location');
            return saved ? JSON.parse(saved) : null;
        } catch (error) {
            this.log('warn', 'Failed to load location preference:', error);
            return null;
        }
    }

    // Unified logging method
    log(level, ...args) {
        if (window.SmartFarmLogger) {
            switch (level) {
                case 'error':
                    window.SmartFarmLogger.error(...args);
                    break;
                case 'warn':
                    window.SmartFarmLogger.warn(...args);
                    break;
                case 'info':
                    window.SmartFarmLogger.info(...args);
                    break;
                case 'success':
                    window.SmartFarmLogger.success(...args);
                    break;
                default:
                    window.SmartFarmLogger.debug(...args);
            }
        } else {
            // Fallback to console
            switch (level) {
                case 'error':
                    console.error('[SmartFarm]', ...args);
                    break;
                case 'warn':
                    console.warn('[SmartFarm]', ...args);
                    break;
                case 'info':
                    console.info('[SmartFarm]', ...args);
                    break;
                case 'success':
                    console.info('[SmartFarm] ✅', ...args);
                    break;
                default:
                    console.debug('[SmartFarm]', ...args);
            }
        }
    }
}

// Create global weather service instance
window.WeatherService = new WeatherService();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WeatherService;
}

// Initialize logging
if (window.SmartFarmLogger) {
    window.SmartFarmLogger.info('🌤️ SmartFarm Weather Service initialized');
} else {
    console.log('🌤️ SmartFarm Weather Service initialized');
}
