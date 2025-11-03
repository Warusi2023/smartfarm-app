// SmartFarm Weather Service
// Centralized weather data management with automatic location detection

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
        if (window.SmartFarmLogger) {
            window.SmartFarmLogger.info('🌤️ Initializing Weather Service...');
        } else {
            console.log('🌤️ Initializing Weather Service...');
        }
        
        try {
            // Get API key from environment or config
            this.apiKey = this.getWeatherApiKey();
            
            if (!this.apiKey) {
                if (window.SmartFarmLogger) {
                    window.SmartFarmLogger.warn('⚠️ Weather API key not found. Using demo data.');
                } else {
                    console.warn('⚠️ Weather API key not found. Using demo data.');
                }
                this.useDemoData();
                return;
            }

            // Try to get user's location and fetch weather
            await this.detectLocationAndFetchWeather();
            
            // Set up periodic updates
            this.setupPeriodicUpdates();
        } catch (error) {
            if (window.SmartFarmLogger) {
                window.SmartFarmLogger.error('Error initializing weather service:', error);
            } else {
                console.error('Error initializing weather service:', error);
            }
            this.useDemoData();
        }
    }

    getWeatherApiKey() {
        // Try to get API key from various sources
        return window.VITE_OPENWEATHER_API_KEY || 
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
            } else {
                // Fallback to saved location or default
                const savedLocation = this.getSavedLocation();
                if (savedLocation) {
                    // Migrate old Fiji locations to Australia
                    if (savedLocation.name && (savedLocation.name.includes('Fiji') || savedLocation.name.includes('Suva'))) {
                        console.log('Migrating saved Fiji location to Australia');
                        this.currentLocation = { lat: -33.8688, lng: 151.2093, name: 'Sydney, NSW, Australia' };
                        this.saveLocationPreference(this.currentLocation);
                        await this.fetchWeatherData(this.currentLocation);
                    } else if (savedLocation.lat && savedLocation.lat === -18.1248 && savedLocation.lng === 178.4501) {
                        // Check coordinates for Fiji
                        console.log('Migrating saved Fiji coordinates to Australia');
                        this.currentLocation = { lat: -33.8688, lng: 151.2093, name: 'Sydney, NSW, Australia' };
                        this.saveLocationPreference(this.currentLocation);
                        await this.fetchWeatherData(this.currentLocation);
                    } else {
                        this.currentLocation = savedLocation;
                        await this.fetchWeatherData(savedLocation);
                    }
                } else {
                    // Default to Australia
                    this.currentLocation = { lat: -33.8688, lng: 151.2093, name: 'Sydney, NSW, Australia' };
                    await this.fetchWeatherData(this.currentLocation);
                }
            }
        } catch (error) {
            console.error('Error detecting location:', error);
            this.useDemoData();
        }
    }

    getCurrentLocation() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation not supported'));
                return;
            }

            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    
                    // Get location name using reverse geocoding
                    const locationName = await this.getLocationName(lat, lng);
                    
                    resolve({
                        lat: lat,
                        lng: lng,
                        name: locationName
                    });
                },
                (error) => {
                    console.warn('Geolocation error:', error);
                    reject(error);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 300000
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
            
            if (!response.ok) {
                return 'Unknown Location';
            }
            
            const result = await response.json();
            
            if (result.success && result.data) {
                return result.data.fullName || 'Unknown Location';
            }
            return 'Unknown Location';
        } catch (error) {
            console.warn('Error getting location name:', error);
            return 'Unknown Location';
        }
    }

    async fetchWeatherData(location) {
        try {
            console.log(`🌤️ Fetching weather for ${location.name}...`);
            
            // Get API base URL from config
            const apiBaseUrl = window.SmartFarmConfig?.getApiUrl('') || 'https://smartfarm-app-production.up.railway.app';
            
            // Fetch current weather from backend
            const currentWeatherResponse = await fetch(
                `${apiBaseUrl}/api/weather/current?lat=${location.lat}&lng=${location.lng}`
            );
            
            if (!currentWeatherResponse.ok) {
                const errorData = await currentWeatherResponse.json();
                if (errorData.useDemo) {
                    console.warn('⚠️ Backend weather API not configured, using demo data');
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
                    console.warn('⚠️ Backend weather API not configured, using demo data');
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
            
            console.log('✅ Weather data updated successfully from backend');
            
        } catch (error) {
            console.error('Error fetching weather data:', error);
            this.useDemoData();
        }
    }

    processBackendWeatherData(currentWeather, forecast, location) {
        // Backend already processes the data, just need to format it
        const current = {
            temperature: currentWeather.temperature,
            humidity: currentWeather.humidity,
            rainfall: currentWeather.rainfall,
            windSpeed: currentWeather.windSpeed,
            pressure: currentWeather.pressure,
            uvIndex: this.calculateUVIndex({ clouds: { all: currentWeather.cloudCover } }),
            cloudCover: currentWeather.cloudCover,
            description: currentWeather.description,
            icon: currentWeather.icon,
            visibility: currentWeather.visibility,
            feelsLike: currentWeather.feelsLike
        };

        // Determine season based on location and date
        const season = this.getSeason(location.lat, new Date());
        
        return {
            location: location,
            current: current,
            forecast: forecast,
            season: season,
            lastUpdate: this.lastUpdate,
            source: 'OpenWeatherMap'
        };
    }

    processWeatherData(currentWeather, forecast, location) {
        // Process current weather
        const current = {
            temperature: Math.round(currentWeather.main.temp),
            humidity: currentWeather.main.humidity,
            rainfall: currentWeather.rain ? currentWeather.rain['1h'] || 0 : 0,
            windSpeed: currentWeather.wind.speed * 3.6, // Convert m/s to km/h
            pressure: currentWeather.main.pressure,
            uvIndex: this.calculateUVIndex(currentWeather),
            cloudCover: currentWeather.clouds.all,
            description: currentWeather.weather[0].description,
            icon: currentWeather.weather[0].icon,
            visibility: currentWeather.visibility / 1000, // Convert to km
            feelsLike: Math.round(currentWeather.main.feels_like)
        };

        // Process 7-day forecast
        const dailyForecast = this.processForecastData(forecast);
        
        // Determine season based on location and date
        const season = this.getSeason(location.lat, new Date());
        
        return {
            location: location,
            current: current,
            forecast: dailyForecast,
            season: season,
            lastUpdate: this.lastUpdate,
            source: 'OpenWeatherMap'
        };
    }

    processForecastData(forecast) {
        const dailyData = {};
        
        forecast.list.forEach(item => {
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
        return Object.values(dailyData).map(day => ({
            day: day.date.toLocaleDateString('en-US', { weekday: 'short' }),
            date: day.date.toLocaleDateString(),
            temp: Math.round(day.temps.reduce((a, b) => a + b, 0) / day.temps.length),
            humidity: Math.round(day.humidity.reduce((a, b) => a + b, 0) / day.humidity.length),
            rainfall: Math.round(day.rainfall.reduce((a, b) => a + b, 0)),
            windSpeed: Math.round(day.windSpeed.reduce((a, b) => a + b, 0) / day.windSpeed.length),
            description: day.descriptions[Math.floor(day.descriptions.length / 2)] // Use middle forecast
        })).slice(0, 7); // Limit to 7 days
    }

    calculateUVIndex(weatherData) {
        // Simple UV index calculation based on time of day and cloud cover
        const hour = new Date().getHours();
        const cloudCover = weatherData.clouds.all;
        
        let baseUV = 0;
        if (hour >= 10 && hour <= 16) {
            baseUV = 8; // Peak UV hours
        } else if (hour >= 8 && hour <= 18) {
            baseUV = 5; // Daylight hours
        }
        
        // Reduce UV based on cloud cover
        const cloudFactor = (100 - cloudCover) / 100;
        return Math.round(baseUV * cloudFactor);
    }

    getSeason(lat, date) {
        const month = date.getMonth() + 1;
        
        // For Southern Hemisphere (Australia)
        if (lat < 0) {
            if (month >= 12 || month <= 2) return 'Summer';
            if (month >= 3 && month <= 5) return 'Autumn';
            if (month >= 6 && month <= 8) return 'Winter';
            return 'Spring';
        }
        
        // For Northern Hemisphere
        if (month >= 3 && month <= 5) return 'Spring';
        if (month >= 6 && month <= 8) return 'Summer';
        if (month >= 9 && month <= 11) return 'Autumn';
        return 'Winter';
    }

    useDemoData() {
        console.log('📊 Using demo weather data');
        
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
            location: { lat: -33.8688, lng: 151.2093, name: 'Australia' },
            current: {
                temperature: 22,
                humidity: 65,
                rainfall: 45,
                windSpeed: 15,
                pressure: 1015,
                uvIndex: 6,
                cloudCover: 40,
                description: 'Partly Cloudy',
                icon: '02d',
                visibility: 10,
                feelsLike: 24
            },
            forecast: generateDemoForecast(),
            season: this.getSeason(-33.8688, new Date()),
            lastUpdate: new Date(),
            source: 'Demo Data'
        };
        
        this.notifySubscribers();
    }

    setupPeriodicUpdates() {
        setInterval(() => {
            if (this.currentLocation && this.apiKey) {
                this.fetchWeatherData(this.currentLocation);
            }
        }, this.updateInterval);
    }

    // Location management
    saveLocationPreference(location) {
        localStorage.setItem('smartfarm_user_location', JSON.stringify(location));
    }

    getSavedLocation() {
        const saved = localStorage.getItem('smartfarm_user_location');
        return saved ? JSON.parse(saved) : null;
    }

    async setLocation(location) {
        this.currentLocation = location;
        this.saveLocationPreference(location);
        await this.fetchWeatherData(location);
    }

    // Subscription system for components that need weather updates
    subscribe(callback) {
        this.callbacks.push(callback);
        
        // If we already have weather data, call the callback immediately
        if (this.weatherData) {
            callback(this.weatherData);
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
                console.error('Error in weather subscriber callback:', error);
            }
        });
    }

    // Public API methods
    getCurrentWeather() {
        return this.weatherData?.current || null;
    }

    getForecast() {
        return this.weatherData?.forecast || [];
    }

    getLocation() {
        return this.weatherData?.location || null;
    }

    getSeason() {
        return this.weatherData?.season || 'Unknown';
    }

    isRealData() {
        return this.weatherData?.source === 'OpenWeatherMap';
    }

    getLastUpdate() {
        return this.weatherData?.lastUpdate || null;
    }

    // Force refresh
    async refresh() {
        if (this.currentLocation) {
            await this.fetchWeatherData(this.currentLocation);
        }
    }
}

// Create global weather service instance
window.WeatherService = new WeatherService();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WeatherService;
}
