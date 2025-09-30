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
        console.log('🌤️ Initializing Weather Service...');
        
        // Get API key from environment or config
        this.apiKey = this.getWeatherApiKey();
        
        if (!this.apiKey) {
            console.warn('⚠️ Weather API key not found. Using demo data.');
            this.useDemoData();
            return;
        }

        // Try to get user's location and fetch weather
        await this.detectLocationAndFetchWeather();
        
        // Set up periodic updates
        this.setupPeriodicUpdates();
    }

    getWeatherApiKey() {
        // Try to get API key from various sources
        return window.VITE_OPENWEATHER_API_KEY || 
               window.OPENWEATHER_API_KEY || 
               process.env.VITE_OPENWEATHER_API_KEY ||
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
                    this.currentLocation = savedLocation;
                    await this.fetchWeatherData(savedLocation);
                } else {
                    // Default to Fiji
                    this.currentLocation = { lat: -18.1248, lng: 178.4501, name: 'Fiji' };
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
            const response = await fetch(
                `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lng}&limit=1&appid=${this.apiKey}`
            );
            const data = await response.json();
            
            if (data && data.length > 0) {
                const location = data[0];
                return `${location.name}, ${location.country}`;
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
            
            // Fetch current weather
            const currentWeatherResponse = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lng}&appid=${this.apiKey}&units=metric`
            );
            
            if (!currentWeatherResponse.ok) {
                throw new Error(`Weather API error: ${currentWeatherResponse.status}`);
            }
            
            const currentWeather = await currentWeatherResponse.json();
            
            // Fetch 7-day forecast
            const forecastResponse = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lng}&appid=${this.apiKey}&units=metric`
            );
            
            if (!forecastResponse.ok) {
                throw new Error(`Forecast API error: ${forecastResponse.status}`);
            }
            
            const forecast = await forecastResponse.json();
            
            // Process and store weather data
            this.weatherData = this.processWeatherData(currentWeather, forecast, location);
            this.lastUpdate = new Date();
            
            // Notify all subscribers
            this.notifySubscribers();
            
            console.log('✅ Weather data updated successfully');
            
        } catch (error) {
            console.error('Error fetching weather data:', error);
            this.useDemoData();
        }
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
        
        // For Southern Hemisphere (Fiji)
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
            forecast: [
                { day: 'Today', date: new Date().toLocaleDateString(), temp: 28, humidity: 75, rainfall: 15, windSpeed: 12, description: 'Partly Cloudy' },
                { day: 'Tomorrow', date: new Date(Date.now() + 86400000).toLocaleDateString(), temp: 30, humidity: 80, rainfall: 5, windSpeed: 8, description: 'Sunny' },
                { day: 'Wed', date: new Date(Date.now() + 172800000).toLocaleDateString(), temp: 32, humidity: 70, rainfall: 0, windSpeed: 15, description: 'Clear' },
                { day: 'Thu', date: new Date(Date.now() + 259200000).toLocaleDateString(), temp: 29, humidity: 78, rainfall: 20, windSpeed: 10, description: 'Light Rain' },
                { day: 'Fri', date: new Date(Date.now() + 345600000).toLocaleDateString(), temp: 27, humidity: 82, rainfall: 25, windSpeed: 6, description: 'Rain' },
                { day: 'Sat', date: new Date(Date.now() + 432000000).toLocaleDateString(), temp: 26, humidity: 85, rainfall: 30, windSpeed: 4, description: 'Heavy Rain' },
                { day: 'Sun', date: new Date(Date.now() + 518400000).toLocaleDateString(), temp: 24, humidity: 88, rainfall: 35, windSpeed: 2, description: 'Heavy Rain' }
            ],
            season: this.getSeason(-18.1248, new Date()),
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
