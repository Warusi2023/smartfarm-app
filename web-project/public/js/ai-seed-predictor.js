// SmartFarm AI Seed Predictor
// Predicts optimal seeds to sow based on weather patterns for maximum harvest potential

class AISeedPredictor {
    constructor() {
        this.weatherData = null;
        this.seedDatabase = this.initializeSeedDatabase();
        this.currentRecommendations = [];
        this.harvestPredictions = [];
        
        this.initializeAISeedPredictor();
    }

    initializeSeedDatabase() {
        return {
            // Warm Weather Crops (25-35°C)
            warmWeather: [
                {
                    name: 'Tomatoes',
                    variety: 'Cherry Tomatoes',
                    optimalTemp: { min: 25, max: 30 },
                    optimalHumidity: { min: 60, max: 80 },
                    optimalRainfall: { min: 50, max: 100 }, // mm/month
                    growingDays: 75,
                    harvestSeason: 'Spring-Summer',
                    yield: 'High',
                    marketPrice: 8.50,
                    description: 'Excellent for warm, humid conditions. High yield potential.',
                    plantingDepth: '0.5-1cm',
                    spacing: '45cm apart',
                    waterNeeds: 'Daily watering, well-drained soil'
                },
                {
                    name: 'Peppers',
                    variety: 'Bell Peppers',
                    optimalTemp: { min: 26, max: 32 },
                    optimalHumidity: { min: 65, max: 85 },
                    optimalRainfall: { min: 60, max: 120 },
                    growingDays: 80,
                    harvestSeason: 'Summer',
                    yield: 'High',
                    marketPrice: 12.00,
                    description: 'Thrives in hot, humid tropical climates.',
                    plantingDepth: '1cm',
                    spacing: '50cm apart',
                    waterNeeds: 'Regular watering, avoid waterlogging'
                },
                {
                    name: 'Eggplant',
                    variety: 'Long Purple',
                    optimalTemp: { min: 24, max: 30 },
                    optimalHumidity: { min: 70, max: 85 },
                    optimalRainfall: { min: 70, max: 110 },
                    growingDays: 85,
                    harvestSeason: 'Summer-Fall',
                    yield: 'Medium-High',
                    marketPrice: 9.50,
                    description: 'Perfect for warm, moist conditions.',
                    plantingDepth: '1cm',
                    spacing: '60cm apart',
                    waterNeeds: 'Consistent moisture, good drainage'
                },
                {
                    name: 'Okra',
                    variety: 'Clemson Spineless',
                    optimalTemp: { min: 28, max: 35 },
                    optimalHumidity: { min: 65, max: 80 },
                    optimalRainfall: { min: 80, max: 150 },
                    growingDays: 60,
                    harvestSeason: 'Summer',
                    yield: 'Very High',
                    marketPrice: 6.75,
                    description: 'Heat-loving crop, excellent for tropical climates.',
                    plantingDepth: '2cm',
                    spacing: '40cm apart',
                    waterNeeds: 'Moderate watering, drought tolerant'
                },
                {
                    name: 'Kava',
                    variety: 'Noble Kava',
                    optimalTemp: { min: 24, max: 30 },
                    optimalHumidity: { min: 70, max: 90 },
                    optimalRainfall: { min: 100, max: 200 },
                    growingDays: 1095, // 3 years for root maturity
                    harvestSeason: 'Year-round',
                    yield: 'Medium',
                    marketPrice: 45.00,
                    description: 'Traditional Pacific Island medicinal plant, requires tropical climate and high humidity.',
                    plantingDepth: '5-10cm',
                    spacing: '2-3m apart',
                    waterNeeds: 'High humidity, well-drained soil, partial shade'
                }
            ],

            // Cool Weather Crops (15-25°C)
            coolWeather: [
                {
                    name: 'Lettuce',
                    variety: 'Butterhead',
                    optimalTemp: { min: 15, max: 22 },
                    optimalHumidity: { min: 70, max: 85 },
                    optimalRainfall: { min: 30, max: 60 },
                    growingDays: 45,
                    harvestSeason: 'Spring-Fall',
                    yield: 'High',
                    marketPrice: 5.25,
                    description: 'Fast-growing, perfect for cooler periods.',
                    plantingDepth: '0.5cm',
                    spacing: '25cm apart',
                    waterNeeds: 'Frequent light watering'
                },
                {
                    name: 'Carrots',
                    variety: 'Nantes',
                    optimalTemp: { min: 18, max: 24 },
                    optimalHumidity: { min: 60, max: 75 },
                    optimalRainfall: { min: 40, max: 80 },
                    growingDays: 70,
                    harvestSeason: 'Spring-Fall',
                    yield: 'Medium',
                    marketPrice: 4.50,
                    description: 'Root crop, good for moderate weather.',
                    plantingDepth: '1cm',
                    spacing: '10cm apart',
                    waterNeeds: 'Deep watering, loose soil'
                },
                {
                    name: 'Broccoli',
                    variety: 'Green Magic',
                    optimalTemp: { min: 16, max: 20 },
                    optimalHumidity: { min: 65, max: 80 },
                    optimalRainfall: { min: 50, max: 90 },
                    growingDays: 90,
                    harvestSeason: 'Fall-Winter',
                    yield: 'Medium',
                    marketPrice: 7.80,
                    description: 'Cool-season crop with high nutritional value.',
                    plantingDepth: '1.5cm',
                    spacing: '45cm apart',
                    waterNeeds: 'Consistent moisture'
                },
                {
                    name: 'Spinach',
                    variety: 'Bloomsdale',
                    optimalTemp: { min: 15, max: 20 },
                    optimalHumidity: { min: 70, max: 85 },
                    optimalRainfall: { min: 35, max: 65 },
                    growingDays: 40,
                    harvestSeason: 'Spring-Fall',
                    yield: 'High',
                    marketPrice: 6.25,
                    description: 'Quick harvest, excellent for cooler weather.',
                    plantingDepth: '1cm',
                    spacing: '15cm apart',
                    waterNeeds: 'Regular watering, rich soil'
                }
            ],

            // Moderate Weather Crops (20-28°C)
            moderateWeather: [
                {
                    name: 'Beans',
                    variety: 'Green Bush',
                    optimalTemp: { min: 20, max: 26 },
                    optimalHumidity: { min: 60, max: 75 },
                    optimalRainfall: { min: 50, max: 100 },
                    growingDays: 55,
                    harvestSeason: 'Spring-Summer',
                    yield: 'High',
                    marketPrice: 5.80,
                    description: 'Versatile crop for moderate climates.',
                    plantingDepth: '2cm',
                    spacing: '30cm apart',
                    waterNeeds: 'Regular watering, well-drained'
                },
                {
                    name: 'Cucumber',
                    variety: 'Marketmore',
                    optimalTemp: { min: 22, max: 28 },
                    optimalHumidity: { min: 65, max: 80 },
                    optimalRainfall: { min: 60, max: 120 },
                    growingDays: 60,
                    harvestSeason: 'Summer',
                    yield: 'Very High',
                    marketPrice: 4.20,
                    description: 'High-yield crop for warm, moist conditions.',
                    plantingDepth: '2cm',
                    spacing: '90cm apart',
                    waterNeeds: 'Frequent watering, climbing support'
                },
                {
                    name: 'Sweet Corn',
                    variety: 'Golden Bantam',
                    optimalTemp: { min: 21, max: 27 },
                    optimalHumidity: { min: 60, max: 70 },
                    optimalRainfall: { min: 70, max: 130 },
                    growingDays: 85,
                    harvestSeason: 'Summer',
                    yield: 'Medium',
                    marketPrice: 3.50,
                    description: 'Heat-loving grain crop.',
                    plantingDepth: '3cm',
                    spacing: '25cm apart',
                    waterNeeds: 'Deep watering, nitrogen-rich soil'
                },
                {
                    name: 'Zucchini',
                    variety: 'Black Beauty',
                    optimalTemp: { min: 20, max: 26 },
                    optimalHumidity: { min: 60, max: 75 },
                    optimalRainfall: { min: 50, max: 100 },
                    growingDays: 50,
                    harvestSeason: 'Summer',
                    yield: 'Very High',
                    marketPrice: 4.80,
                    description: 'Fast-growing summer squash.',
                    plantingDepth: '2cm',
                    spacing: '90cm apart',
                    waterNeeds: 'Regular watering, good drainage'
                }
            ]
        };
    }

    async initializeAISeedPredictor() {
        console.log('🌱 Initializing AI Seed Predictor...');
        await this.fetchCurrentWeather();
        this.createSeedPredictionWidget();
        this.generateSeedRecommendations();
    }

    async fetchCurrentWeather() {
        // Use the centralized weather service
        if (window.WeatherService) {
            // Subscribe to weather updates
            window.WeatherService.subscribe((weatherData) => {
                this.weatherData = this.convertWeatherServiceData(weatherData);
                this.updateWeatherDisplay();
                this.generateSeedRecommendations();
            });
            
            // Get current weather data immediately
            const weatherData = window.WeatherService.weatherData;
            if (weatherData) {
                this.weatherData = this.convertWeatherServiceData(weatherData);
            } else {
                // Fallback to demo data if weather service not ready
                this.useDemoWeatherData();
            }
        } else {
            // Fallback to demo data
            this.useDemoWeatherData();
        }
    }

    convertWeatherServiceData(weatherData) {
        return {
            temperature: weatherData.current.temperature,
            humidity: weatherData.current.humidity,
            rainfall: weatherData.current.rainfall,
            windSpeed: weatherData.current.windSpeed,
            pressure: weatherData.current.pressure,
            uvIndex: weatherData.current.uvIndex,
            cloudCover: weatherData.current.cloudCover,
            description: weatherData.current.description,
            forecast: {
                next7Days: weatherData.forecast.map(day => ({
                    day: day.day,
                    temp: day.temp,
                    humidity: day.humidity,
                    rain: day.rainfall,
                    wind: day.windSpeed,
                    description: day.description
                }))
            },
            season: weatherData.season,
            location: weatherData.location.name,
            isRealData: weatherData.source === 'OpenWeatherMap'
        };
    }

    useDemoWeatherData() {
        // Fallback demo data
        this.weatherData = {
            temperature: 28,
            humidity: 75,
            rainfall: 85,
            windSpeed: 12,
            pressure: 1013,
            uvIndex: 8,
            cloudCover: 30,
            description: 'Partly Cloudy',
            forecast: {
                next7Days: [
                    { day: 'Today', temp: 28, humidity: 75, rain: 15, wind: 12, description: 'Partly Cloudy' },
                    { day: 'Tomorrow', temp: 30, humidity: 80, rain: 5, wind: 8, description: 'Sunny' },
                    { day: 'Day 3', temp: 32, humidity: 70, rain: 0, wind: 15, description: 'Clear' },
                    { day: 'Day 4', temp: 29, humidity: 78, rain: 20, wind: 10, description: 'Light Rain' },
                    { day: 'Day 5', temp: 27, humidity: 82, rain: 25, wind: 6, description: 'Rain' },
                    { day: 'Day 6', temp: 26, humidity: 85, rain: 30, wind: 4, description: 'Heavy Rain' },
                    { day: 'Day 7', temp: 24, humidity: 88, rain: 35, wind: 2, description: 'Heavy Rain' }
                ]
            },
            season: this.getCurrentSeason(),
            location: 'Fiji',
            isRealData: false
        };
    }

    updateWeatherDisplay() {
        // Update the weather display in the UI
        const tempElement = document.getElementById('currentTemp');
        const humidityElement = document.getElementById('currentHumidity');
        const rainfallElement = document.getElementById('currentRainfall');
        const locationElement = document.getElementById('currentLocation');
        
        if (tempElement) tempElement.textContent = `${this.weatherData.temperature}°C`;
        if (humidityElement) humidityElement.textContent = `${this.weatherData.humidity}%`;
        if (rainfallElement) rainfallElement.textContent = `${this.weatherData.rainfall}mm`;
        if (locationElement) locationElement.textContent = this.weatherData.location;
        
        // Add indicator for real vs demo data
        const weatherIndicator = document.querySelector('.weather-indicator');
        if (weatherIndicator) {
            if (this.weatherData.isRealData) {
                weatherIndicator.innerHTML += '<span class="badge bg-success ms-2"><i class="fas fa-satellite me-1"></i>Live</span>';
            } else {
                weatherIndicator.innerHTML += '<span class="badge bg-warning ms-2"><i class="fas fa-flask me-1"></i>Demo</span>';
            }
        }
    }

    getCurrentSeason() {
        const month = new Date().getMonth() + 1;
        if (month >= 3 && month <= 5) return 'Autumn';
        if (month >= 6 && month <= 8) return 'Winter';
        if (month >= 9 && month <= 11) return 'Spring';
        return 'Summer';
    }

    createSeedPredictionWidget() {
        const dashboardContainer = document.getElementById('dashboardView');
        if (!dashboardContainer) return;

        const seedPredictionCard = document.createElement('div');
        seedPredictionCard.id = 'seedPredictionCard';
        seedPredictionCard.className = 'dashboard-card mt-4';
        seedPredictionCard.innerHTML = `
            <div class="d-flex justify-content-between align-items-center mb-3">
                <h5>🤖 AI Seed Prediction</h5>
                <div class="weather-indicator">
                    <span class="badge bg-info me-2">
                        <i class="fas fa-thermometer-half me-1"></i>
                        <span id="currentTemp">${this.weatherData.temperature}°C</span>
                    </span>
                    <span class="badge bg-primary me-2">
                        <i class="fas fa-tint me-1"></i>
                        <span id="currentHumidity">${this.weatherData.humidity}%</span>
                    </span>
                    <span class="badge bg-success">
                        <i class="fas fa-cloud-rain me-1"></i>
                        <span id="currentRainfall">${this.weatherData.rainfall}mm</span>
                    </span>
                </div>
            </div>
            
            <div class="row">
                <div class="col-md-8">
                    <div class="seed-recommendations" id="seedRecommendations">
                        <!-- AI recommendations will be populated here -->
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="weather-forecast">
                        <h6 class="mb-3">7-Day Forecast</h6>
                        <div id="weatherForecast">
                            <!-- Weather forecast will be populated here -->
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="mt-3">
                <button class="btn btn-primary me-2" onclick="aiSeedPredictor.regenerateRecommendations()">
                    <i class="fas fa-sync me-1"></i>Refresh Predictions
                </button>
                <button class="btn btn-outline-success" onclick="aiSeedPredictor.showDetailedAnalysis()">
                    <i class="fas fa-chart-line me-1"></i>Detailed Analysis
                </button>
            </div>
        `;

        dashboardContainer.appendChild(seedPredictionCard);
        this.populateWeatherForecast();
    }

    generateSeedRecommendations() {
        const recommendations = [];
        const allSeeds = [...this.seedDatabase.warmWeather, ...this.seedDatabase.coolWeather, ...this.seedDatabase.moderateWeather];

        // Score each seed based on current weather conditions
        allSeeds.forEach(seed => {
            const score = this.calculateSeedScore(seed);
            if (score > 70) { // Only recommend seeds with good scores
                recommendations.push({
                    ...seed,
                    score: score,
                    harvestDate: this.calculateHarvestDate(seed.growingDays),
                    profitPotential: this.calculateProfitPotential(seed),
                    riskLevel: this.assessRiskLevel(seed)
                });
            }
        });

        // Sort by score and take top recommendations
        this.currentRecommendations = recommendations
            .sort((a, b) => b.score - a.score)
            .slice(0, 6);

        this.displaySeedRecommendations();
    }

    calculateSeedScore(seed) {
        let score = 100;

        // Temperature scoring (40% weight)
        const tempDiff = Math.abs(this.weatherData.temperature - (seed.optimalTemp.min + seed.optimalTemp.max) / 2);
        const tempScore = Math.max(0, 100 - (tempDiff * 4));
        score = (score * 0.6) + (tempScore * 0.4);

        // Humidity scoring (30% weight)
        const humidityDiff = Math.abs(this.weatherData.humidity - (seed.optimalHumidity.min + seed.optimalHumidity.max) / 2);
        const humidityScore = Math.max(0, 100 - (humidityDiff * 2));
        score = (score * 0.7) + (humidityScore * 0.3);

        // Rainfall scoring (20% weight)
        const rainfallDiff = Math.abs(this.weatherData.rainfall - (seed.optimalRainfall.min + seed.optimalRainfall.max) / 2);
        const rainfallScore = Math.max(0, 100 - (rainfallDiff * 1.5));
        score = (score * 0.8) + (rainfallScore * 0.2);

        // Season bonus (10% weight)
        const seasonBonus = this.getSeasonBonus(seed);
        score = (score * 0.9) + (seasonBonus * 0.1);

        return Math.round(score);
    }

    getSeasonBonus(seed) {
        const currentSeason = this.weatherData.season;
        const seedSeason = seed.harvestSeason;

        if (seedSeason.includes(currentSeason) || seedSeason.includes('All')) {
            return 100;
        } else if (seedSeason.includes('Spring') && (currentSeason === 'Spring' || currentSeason === 'Summer')) {
            return 80;
        } else if (seedSeason.includes('Summer') && (currentSeason === 'Summer' || currentSeason === 'Spring')) {
            return 80;
        } else if (seedSeason.includes('Fall') && (currentSeason === 'Fall' || currentSeason === 'Winter')) {
            return 80;
        } else if (seedSeason.includes('Winter') && (currentSeason === 'Winter' || currentSeason === 'Fall')) {
            return 80;
        }
        return 50;
    }

    calculateHarvestDate(growingDays) {
        const plantingDate = new Date();
        const harvestDate = new Date(plantingDate.getTime() + (growingDays * 24 * 60 * 60 * 1000));
        return harvestDate.toLocaleDateString();
    }

    calculateProfitPotential(seed) {
        // Calculate potential profit based on yield, market price, and growing conditions
        const baseYield = this.getYieldMultiplier(seed.yield);
        const priceFactor = seed.marketPrice;
        const weatherFactor = this.calculateWeatherFactor(seed);
        
        return Math.round((baseYield * priceFactor * weatherFactor) * 100) / 100;
    }

    getYieldMultiplier(yieldLevel) {
        const multipliers = {
            'Very High': 120,
            'High': 100,
            'Medium-High': 85,
            'Medium': 70,
            'Low': 50
        };
        return multipliers[yieldLevel] || 70;
    }

    calculateWeatherFactor(seed) {
        const score = this.calculateSeedScore(seed);
        return score / 100;
    }

    assessRiskLevel(seed) {
        const score = this.calculateSeedScore(seed);
        if (score >= 85) return 'Low';
        if (score >= 75) return 'Medium';
        if (score >= 65) return 'Medium-High';
        return 'High';
    }

    displaySeedRecommendations() {
        const container = document.getElementById('seedRecommendations');
        if (!container) return;

        container.innerHTML = '';

        if (this.currentRecommendations.length === 0) {
            container.innerHTML = `
                <div class="alert alert-warning">
                    <i class="fas fa-exclamation-triangle me-2"></i>
                    No optimal seeds found for current weather conditions. Consider adjusting planting schedule.
                </div>
            `;
            return;
        }

        this.currentRecommendations.forEach((seed, index) => {
            const seedCard = document.createElement('div');
            seedCard.className = 'seed-recommendation-card mb-3';
            seedCard.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-8">
                                <div class="d-flex justify-content-between align-items-start mb-2">
                                    <h6 class="card-title mb-0">
                                        ${seed.name} - ${seed.variety}
                                        <span class="badge bg-${this.getRiskColor(seed.riskLevel)} ms-2">${seed.riskLevel} Risk</span>
                                    </h6>
                                    <div class="score-badge">
                                        <span class="badge bg-primary">${seed.score}% Match</span>
                                    </div>
                                </div>
                                <p class="card-text text-muted">${seed.description}</p>
                                <div class="seed-details">
                                    <div class="row">
                                        <div class="col-6">
                                            <small class="text-muted">
                                                <i class="fas fa-calendar-alt me-1"></i>
                                                <strong>Harvest:</strong> ${seed.harvestDate}
                                            </small>
                                        </div>
                                        <div class="col-6">
                                            <small class="text-muted">
                                                <i class="fas fa-dollar-sign me-1"></i>
                                                <strong>Profit Potential:</strong> $${seed.profitPotential}/kg
                                            </small>
                                        </div>
                                    </div>
                                    <div class="row mt-1">
                                        <div class="col-6">
                                            <small class="text-muted">
                                                <i class="fas fa-clock me-1"></i>
                                                <strong>Growing Days:</strong> ${seed.growingDays} days
                                            </small>
                                        </div>
                                        <div class="col-6">
                                            <small class="text-muted">
                                                <i class="fas fa-chart-bar me-1"></i>
                                                <strong>Yield:</strong> ${seed.yield}
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="seed-actions">
                                    <button class="btn btn-success btn-sm w-100 mb-2" onclick="aiSeedPredictor.selectSeed('${seed.name}', '${seed.variety}')">
                                        <i class="fas fa-seedling me-1"></i>Select This Seed
                                    </button>
                                    <button class="btn btn-outline-info btn-sm w-100 mb-2" onclick="aiSeedPredictor.viewSeedDetails('${seed.name}')">
                                        <i class="fas fa-info-circle me-1"></i>View Details
                                    </button>
                                    <button class="btn btn-outline-warning btn-sm w-100" onclick="aiSeedPredictor.getPlantingGuide('${seed.name}')">
                                        <i class="fas fa-book me-1"></i>Planting Guide
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            container.appendChild(seedCard);
        });
    }

    getRiskColor(riskLevel) {
        const colors = {
            'Low': 'success',
            'Medium': 'warning',
            'Medium-High': 'warning',
            'High': 'danger'
        };
        return colors[riskLevel] || 'secondary';
    }

    populateWeatherForecast() {
        const container = document.getElementById('weatherForecast');
        if (!container) return;

        container.innerHTML = '';
        this.weatherData.forecast.next7Days.forEach(day => {
            const forecastItem = document.createElement('div');
            forecastItem.className = 'forecast-item d-flex justify-content-between align-items-center mb-2';
            forecastItem.innerHTML = `
                <div>
                    <small class="fw-bold">${day.day}</small>
                </div>
                <div class="text-center">
                    <div class="temperature">${day.temp}°C</div>
                    <div class="humidity">${day.humidity}%</div>
                </div>
                <div class="text-end">
                    <i class="fas fa-cloud-rain text-primary"></i>
                    <div class="rainfall">${day.rain}mm</div>
                </div>
            `;
            container.appendChild(forecastItem);
        });
    }

    selectSeed(seedName, variety) {
        // Use the professional modal from the main page
        if (typeof showSeedSelectionModal === 'function') {
            showSeedSelectionModal(seedName, variety);
        } else {
            // Fallback to basic alert if modal function not available
            alert(`🌱 Selected: ${seedName} - ${variety}\n\nThis seed has been added to your planting schedule!\n\nNext steps:\n1. Prepare soil according to planting guide\n2. Schedule planting date\n3. Set up irrigation system\n4. Monitor growth progress\n\nCheck the Crop Management section for detailed tracking.`);
        }
        
        // Add to crop management system
        this.addToCropManagement(seedName, variety);
    }

    viewSeedDetails(seedName) {
        const seed = [...this.seedDatabase.warmWeather, ...this.seedDatabase.coolWeather, ...this.seedDatabase.moderateWeather]
            .find(s => s.name === seedName);
        
        if (!seed) return;

        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.innerHTML = `
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header bg-primary text-white">
                        <h5 class="modal-title">
                            <i class="fas fa-seedling me-2"></i>${seed.name} - ${seed.variety}
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-6">
                                <h6>Growing Requirements</h6>
                                <ul class="list-unstyled">
                                    <li><i class="fas fa-thermometer-half me-2"></i><strong>Temperature:</strong> ${seed.optimalTemp.min}-${seed.optimalTemp.max}°C</li>
                                    <li><i class="fas fa-tint me-2"></i><strong>Humidity:</strong> ${seed.optimalHumidity.min}-${seed.optimalHumidity.max}%</li>
                                    <li><i class="fas fa-cloud-rain me-2"></i><strong>Rainfall:</strong> ${seed.optimalRainfall.min}-${seed.optimalRainfall.max}mm/month</li>
                                    <li><i class="fas fa-calendar-alt me-2"></i><strong>Growing Days:</strong> ${seed.growingDays} days</li>
                                    <li><i class="fas fa-leaf me-2"></i><strong>Yield:</strong> ${seed.yield}</li>
                                    <li><i class="fas fa-dollar-sign me-2"></i><strong>Market Price:</strong> $${seed.marketPrice}/kg</li>
                                </ul>
                            </div>
                            <div class="col-md-6">
                                <h6>Planting Instructions</h6>
                                <ul class="list-unstyled">
                                    <li><i class="fas fa-arrow-down me-2"></i><strong>Planting Depth:</strong> ${seed.plantingDepth}</li>
                                    <li><i class="fas fa-expand-arrows-alt me-2"></i><strong>Spacing:</strong> ${seed.spacing}</li>
                                    <li><i class="fas fa-tint me-2"></i><strong>Water Needs:</strong> ${seed.waterNeeds}</li>
                                    <li><i class="fas fa-calendar me-2"></i><strong>Harvest Season:</strong> ${seed.harvestSeason}</li>
                                </ul>
                            </div>
                        </div>
                        <div class="mt-3">
                            <h6>Description</h6>
                            <p>${seed.description}</p>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" onclick="aiSeedPredictor.selectSeed('${seed.name}', '${seed.variety}')">
                            <i class="fas fa-seedling me-2"></i>Select This Seed
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        const bsModal = new bootstrap.Modal(modal);
        bsModal.show();
        
        modal.addEventListener('hidden.bs.modal', () => {
            document.body.removeChild(modal);
        });
    }

    getPlantingGuide(seedName) {
        // Use the professional modal from the main page
        if (typeof showSeedDetailsModal === 'function') {
            showSeedDetailsModal(seedName);
        } else {
            // Fallback to basic alert if modal function not available
            alert(`📖 Planting Guide for ${seedName}\n\n1. Soil Preparation:\n   • Loosen soil to 30cm depth\n   • Add compost and organic matter\n   • Ensure good drainage\n\n2. Planting:\n   • Follow recommended spacing\n   • Plant at correct depth\n   • Water immediately after planting\n\n3. Care:\n   • Water regularly\n   • Monitor for pests\n   • Fertilize as needed\n\n4. Harvest:\n   • Pick at optimal ripeness\n   • Handle carefully\n   • Store properly\n\nFor detailed instructions, check the Crop Management section!`);
        }
    }

    addToCropManagement(seedName, variety) {
        // This would integrate with the existing crop management system
        console.log(`Adding ${seedName} - ${variety} to crop management system`);
        
        // You could trigger the addNewCrop function here with pre-filled data
        if (typeof addNewCrop === 'function') {
            // Simulate adding to crop management
            setTimeout(() => {
                alert(`${seedName} has been added to your Crop Management section!`);
            }, 1000);
        }
    }

    regenerateRecommendations() {
        console.log('Regenerating seed recommendations...');
        this.generateSeedRecommendations();
    }

    showDetailedAnalysis() {
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.innerHTML = `
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header bg-info text-white">
                        <h5 class="modal-title">
                            <i class="fas fa-chart-line me-2"></i>Detailed Seed Analysis
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="analysis-section">
                            <h6>Current Weather Analysis</h6>
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="weather-metric">
                                        <strong>Temperature:</strong> ${this.weatherData.temperature}°C
                                        <div class="progress mt-1">
                                            <div class="progress-bar" style="width: ${(this.weatherData.temperature / 40) * 100}%"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="weather-metric">
                                        <strong>Humidity:</strong> ${this.weatherData.humidity}%
                                        <div class="progress mt-1">
                                            <div class="progress-bar bg-info" style="width: ${this.weatherData.humidity}%"></div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="weather-metric">
                                        <strong>Rainfall:</strong> ${this.weatherData.rainfall}mm
                                        <div class="progress mt-1">
                                            <div class="progress-bar bg-success" style="width: ${(this.weatherData.rainfall / 150) * 100}%"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="analysis-section mt-4">
                            <h6>Top Recommendations Analysis</h6>
                            <div class="table-responsive">
                                <table class="table table-sm">
                                    <thead>
                                        <tr>
                                            <th>Seed</th>
                                            <th>Score</th>
                                            <th>Harvest Date</th>
                                            <th>Profit Potential</th>
                                            <th>Risk Level</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${this.currentRecommendations.map(seed => `
                                            <tr>
                                                <td>${seed.name}</td>
                                                <td><span class="badge bg-primary">${seed.score}%</span></td>
                                                <td>${seed.harvestDate}</td>
                                                <td>$${seed.profitPotential}/kg</td>
                                                <td><span class="badge bg-${this.getRiskColor(seed.riskLevel)}">${seed.riskLevel}</span></td>
                                            </tr>
                                        `).join('')}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        
                        <div class="analysis-section mt-4">
                            <h6>AI Insights</h6>
                            <div class="alert alert-info">
                                <i class="fas fa-brain me-2"></i>
                                <strong>Recommendation:</strong> Based on current weather patterns, ${this.currentRecommendations[0]?.name || 'warm-weather crops'} are showing optimal conditions for maximum harvest potential. The current temperature and humidity levels favor fast-growing crops that can take advantage of the warm, moist conditions.
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" onclick="aiSeedPredictor.regenerateRecommendations()">
                            <i class="fas fa-sync me-2"></i>Refresh Analysis
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        const bsModal = new bootstrap.Modal(modal);
        bsModal.show();
        
        modal.addEventListener('hidden.bs.modal', () => {
            document.body.removeChild(modal);
        });
    }
}

// Add CSS styles for seed prediction
const seedPredictionStyles = `
    <style>
        .seed-recommendation-card .card {
            border-left: 4px solid #28a745;
            transition: transform 0.2s ease;
        }
        
        .seed-recommendation-card .card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }
        
        .weather-indicator .badge {
            font-size: 0.8rem;
        }
        
        .forecast-item {
            padding: 8px;
            background: #f8f9fa;
            border-radius: 6px;
            margin-bottom: 5px;
        }
        
        .temperature {
            font-weight: bold;
            color: #007bff;
        }
        
        .humidity {
            font-size: 0.8rem;
            color: #6c757d;
        }
        
        .rainfall {
            font-size: 0.8rem;
            color: #6c757d;
        }
        
        .weather-metric {
            margin-bottom: 15px;
        }
        
        .analysis-section {
            border-bottom: 1px solid #e9ecef;
            padding-bottom: 15px;
        }
        
        .analysis-section:last-child {
            border-bottom: none;
        }
    </style>
`;

// Inject styles
document.head.insertAdjacentHTML('beforeend', seedPredictionStyles);

// Initialize AI Seed Predictor
const aiSeedPredictor = new AISeedPredictor();
