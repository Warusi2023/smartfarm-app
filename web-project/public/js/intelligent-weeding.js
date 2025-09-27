// SmartFarm Intelligent Weeding Task Management
// Calculates weather effects on weed growth and provides smart alerts

class IntelligentWeedingSystem {
    constructor() {
        this.weatherData = null;
        this.cropData = [];
        this.weedGrowthFactors = this.initializeWeedGrowthFactors();
        this.weedingTasks = [];
        this.chemicalSuppressionOptions = this.initializeChemicalOptions();
        this.alertThresholds = this.initializeAlertThresholds();
        
        this.initializeIntelligentWeeding();
    }

    initializeWeedGrowthFactors() {
        return {
            // Weather factors that affect weed growth
            temperature: {
                optimal: { min: 20, max: 30 },
                growthRate: {
                    low: { temp: 5, rate: 0.2 },
                    moderate: { temp: 15, rate: 0.6 },
                    high: { temp: 25, rate: 1.0 },
                    veryHigh: { temp: 35, rate: 0.8 }
                }
            },
            humidity: {
                optimal: { min: 60, max: 80 },
                growthRate: {
                    low: { humidity: 30, rate: 0.3 },
                    moderate: { humidity: 50, rate: 0.7 },
                    high: { humidity: 70, rate: 1.0 },
                    veryHigh: { humidity: 90, rate: 1.2 }
                }
            },
            rainfall: {
                optimal: { min: 50, max: 100 }, // mm/month
                growthRate: {
                    low: { rainfall: 20, rate: 0.4 },
                    moderate: { rainfall: 60, rate: 0.8 },
                    high: { rainfall: 100, rate: 1.0 },
                    veryHigh: { rainfall: 150, rate: 1.3 }
                }
            },
            soilMoisture: {
                optimal: { min: 60, max: 80 }, // percentage
                growthRate: {
                    low: { moisture: 30, rate: 0.3 },
                    moderate: { moisture: 50, rate: 0.7 },
                    high: { moisture: 70, rate: 1.0 },
                    veryHigh: { moisture: 90, rate: 1.1 }
                }
            },
            sunlight: {
                optimal: { min: 6, max: 12 }, // hours/day
                growthRate: {
                    low: { sunlight: 4, rate: 0.5 },
                    moderate: { sunlight: 8, rate: 0.8 },
                    high: { sunlight: 10, rate: 1.0 },
                    veryHigh: { sunlight: 14, rate: 1.2 }
                }
            }
        };
    }

    initializeChemicalOptions() {
        return [
            {
                name: 'Glyphosate',
                type: 'Non-selective herbicide',
                effectiveness: 95,
                safetyLevel: 'Moderate',
                applicationRate: '2-4 L/ha',
                costPerLiter: 25.00,
                environmentalImpact: 'Medium',
                description: 'Effective against most weed types, requires careful application',
                preHarvestInterval: 7, // days
                weatherRestrictions: ['No rain for 6 hours', 'Temperature below 32°C']
            },
            {
                name: '2,4-D',
                type: 'Selective herbicide',
                effectiveness: 85,
                safetyLevel: 'Moderate',
                applicationRate: '1-2 L/ha',
                costPerLiter: 18.00,
                environmentalImpact: 'Low',
                description: 'Selective herbicide, safe for most crops',
                preHarvestInterval: 14,
                weatherRestrictions: ['No rain for 4 hours', 'Low wind conditions']
            },
            {
                name: 'Atrazine',
                type: 'Pre-emergence herbicide',
                effectiveness: 90,
                safetyLevel: 'Low',
                applicationRate: '2-3 L/ha',
                costPerLiter: 22.00,
                environmentalImpact: 'High',
                description: 'Pre-emergence application, long-lasting effect',
                preHarvestInterval: 21,
                weatherRestrictions: ['Applied before crop emergence', 'Moist soil conditions']
            },
            {
                name: 'Organic Vinegar Solution',
                type: 'Organic herbicide',
                effectiveness: 70,
                safetyLevel: 'High',
                applicationRate: '10-15 L/ha',
                costPerLiter: 8.00,
                environmentalImpact: 'Very Low',
                description: 'Eco-friendly option, requires frequent application',
                preHarvestInterval: 0,
                weatherRestrictions: ['Direct sunlight application', 'No rain for 2 hours']
            },
            {
                name: 'Manual Weeding',
                type: 'Physical removal',
                effectiveness: 100,
                safetyLevel: 'Very High',
                applicationRate: 'Labor intensive',
                costPerLiter: 15.00, // per hour
                environmentalImpact: 'None',
                description: 'Most environmentally friendly, requires more labor',
                preHarvestInterval: 0,
                weatherRestrictions: ['Dry soil conditions', 'Clear weather']
            }
        ];
    }

    initializeAlertThresholds() {
        return {
            weedGrowthRate: {
                low: 0.3,
                medium: 0.6,
                high: 0.8,
                critical: 1.0
            },
            timeSinceLastWeeding: {
                warning: 14, // days
                urgent: 21,
                critical: 28
            },
            cropCompetition: {
                low: 0.2,
                medium: 0.5,
                high: 0.7,
                critical: 0.8
            }
        };
    }

    async initializeIntelligentWeeding() {
        console.log('🌱 Initializing Intelligent Weeding System...');
        await this.fetchWeatherData();
        await this.loadCropData();
        this.createWeedingTaskWidget();
        this.generateWeedingTasks();
        this.setupWeedingAlerts();
    }

    async fetchWeatherData() {
        // Simulate weather data (in production, this would come from a real weather API)
        this.weatherData = {
            temperature: 28,
            humidity: 75,
            rainfall: 85,
            windSpeed: 12,
            pressure: 1013,
            uvIndex: 8,
            soilMoisture: 70,
            sunlightHours: 10,
            forecast: {
                next7Days: [
                    { day: 0, temp: 28, humidity: 75, rain: 15, wind: 12 },
                    { day: 1, temp: 30, humidity: 80, rain: 5, wind: 8 },
                    { day: 2, temp: 32, humidity: 70, rain: 0, wind: 15 },
                    { day: 3, temp: 29, humidity: 78, rain: 20, wind: 10 },
                    { day: 4, temp: 27, humidity: 82, rain: 25, wind: 6 },
                    { day: 5, temp: 26, humidity: 85, rain: 30, wind: 4 },
                    { day: 6, temp: 24, humidity: 88, rain: 35, wind: 2 }
                ]
            },
            lastUpdate: new Date().toISOString()
        };
    }

    async loadCropData() {
        // Load crop data from localStorage or global variables
        const savedCrops = localStorage.getItem('crops');
        if (savedCrops) {
            this.cropData = JSON.parse(savedCrops);
        } else {
            // Default crop data
            this.cropData = [
                {
                    id: 'crop1',
                    name: 'Tomatoes',
                    plantingDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
                    lastWeeding: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString(),
                    growthStage: 'Flowering',
                    area: 0.5, // hectares
                    weedPressure: 'Medium',
                    location: 'Field A'
                },
                {
                    id: 'crop2',
                    name: 'Peppers',
                    plantingDate: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
                    lastWeeding: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
                    growthStage: 'Vegetative',
                    area: 0.3,
                    weedPressure: 'High',
                    location: 'Field B'
                }
            ];
        }
    }

    createWeedingTaskWidget() {
        const dashboardContainer = document.getElementById('dashboardView');
        if (!dashboardContainer) return;

        const weedingCard = document.createElement('div');
        weedingCard.id = 'weedingTaskCard';
        weedingCard.className = 'dashboard-card mt-4';
        weedingCard.innerHTML = `
            <div class="d-flex justify-content-between align-items-center mb-3">
                <h5>🌱 Intelligent Weeding Management</h5>
                <div class="weed-growth-indicator">
                    <span class="badge bg-${this.getWeedGrowthBadgeColor()} me-2">
                        <i class="fas fa-seedling me-1"></i>
                        Weed Growth: ${this.getWeedGrowthLevel()}
                    </span>
                    <button class="btn btn-sm btn-outline-primary" onclick="intelligentWeeding.generateWeedingTasks()">
                        <i class="fas fa-sync me-1"></i>Refresh
                    </button>
                </div>
            </div>
            
            <div class="row">
                <div class="col-md-8">
                    <div class="weeding-tasks" id="weedingTasksContainer">
                        <!-- Weeding tasks will be populated here -->
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="weather-impact">
                        <h6 class="mb-3">Weather Impact on Weeds</h6>
                        <div id="weatherImpactContainer">
                            <!-- Weather impact analysis will be populated here -->
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="mt-3">
                <button class="btn btn-success me-2" onclick="intelligentWeeding.showWeedingSchedule()">
                    <i class="fas fa-calendar-alt me-1"></i>View Schedule
                </button>
                <button class="btn btn-warning me-2" onclick="intelligentWeeding.showChemicalOptions()">
                    <i class="fas fa-flask me-1"></i>Chemical Options
                </button>
                <button class="btn btn-info" onclick="intelligentWeeding.showWeedingAnalytics()">
                    <i class="fas fa-chart-line me-1"></i>Analytics
                </button>
            </div>
        `;

        dashboardContainer.appendChild(weedingCard);
        this.populateWeatherImpact();
    }

    generateWeedingTasks() {
        this.weedingTasks = [];
        
        this.cropData.forEach(crop => {
            const weedGrowthRate = this.calculateWeedGrowthRate(crop);
            const daysSinceLastWeeding = this.calculateDaysSinceLastWeeding(crop);
            const urgency = this.calculateWeedingUrgency(crop, weedGrowthRate, daysSinceLastWeeding);
            
            if (urgency.level !== 'none') {
                const task = {
                    id: `weeding_${crop.id}_${Date.now()}`,
                    cropId: crop.id,
                    cropName: crop.name,
                    location: crop.location,
                    urgency: urgency,
                    weedGrowthRate: weedGrowthRate,
                    daysSinceLastWeeding: daysSinceLastWeeding,
                    recommendedAction: this.getRecommendedAction(urgency, weedGrowthRate),
                    estimatedCost: this.estimateWeedingCost(crop, urgency.recommendedMethod),
                    weatherSuitability: this.checkWeatherSuitability(),
                    scheduledDate: this.getOptimalWeedingDate(),
                    status: 'pending'
                };
                
                this.weedingTasks.push(task);
            }
        });

        // Sort by urgency
        this.weedingTasks.sort((a, b) => {
            const urgencyOrder = { critical: 4, urgent: 3, medium: 2, low: 1, none: 0 };
            return urgencyOrder[b.urgency.level] - urgencyOrder[a.urgency.level];
        });

        this.displayWeedingTasks();
    }

    calculateWeedGrowthRate(crop) {
        const factors = this.weedGrowthFactors;
        let growthRate = 1.0;

        // Temperature factor
        const tempRate = this.getFactorRate(factors.temperature.growthRate, this.weatherData.temperature);
        growthRate *= tempRate;

        // Humidity factor
        const humidityRate = this.getFactorRate(factors.humidity.growthRate, this.weatherData.humidity);
        growthRate *= humidityRate;

        // Rainfall factor
        const rainfallRate = this.getFactorRate(factors.rainfall.growthRate, this.weatherData.rainfall);
        growthRate *= rainfallRate;

        // Soil moisture factor
        const soilMoistureRate = this.getFactorRate(factors.soilMoisture.growthRate, this.weatherData.soilMoisture);
        growthRate *= soilMoistureRate;

        // Sunlight factor
        const sunlightRate = this.getFactorRate(factors.sunlight.growthRate, this.weatherData.sunlightHours);
        growthRate *= sunlightRate;

        // Crop-specific weed pressure
        const weedPressureMultiplier = {
            'Low': 0.7,
            'Medium': 1.0,
            'High': 1.3,
            'Very High': 1.6
        };
        growthRate *= (weedPressureMultiplier[crop.weedPressure] || 1.0);

        return Math.round(growthRate * 100) / 100;
    }

    getFactorRate(factorRates, value) {
        if (value <= 10) return factorRates.low.rate;
        if (value <= 20) return factorRates.moderate.rate;
        if (value <= 30) return factorRates.high.rate;
        return factorRates.veryHigh.rate;
    }

    calculateDaysSinceLastWeeding(crop) {
        const lastWeeding = new Date(crop.lastWeeding);
        const now = new Date();
        return Math.floor((now - lastWeeding) / (1000 * 60 * 60 * 24));
    }

    calculateWeedingUrgency(crop, weedGrowthRate, daysSinceLastWeeding) {
        const thresholds = this.alertThresholds;
        
        let urgencyLevel = 'none';
        let recommendedMethod = 'manual';
        
        // High weed growth rate
        if (weedGrowthRate >= thresholds.weedGrowthRate.critical) {
            urgencyLevel = 'critical';
            recommendedMethod = 'chemical';
        } else if (weedGrowthRate >= thresholds.weedGrowthRate.high) {
            urgencyLevel = 'urgent';
            recommendedMethod = 'chemical';
        } else if (weedGrowthRate >= thresholds.weedGrowthRate.medium) {
            urgencyLevel = 'medium';
            recommendedMethod = 'manual';
        } else if (weedGrowthRate >= thresholds.weedGrowthRate.low) {
            urgencyLevel = 'low';
            recommendedMethod = 'manual';
        }
        
        // Days since last weeding
        if (daysSinceLastWeeding >= thresholds.timeSinceLastWeeding.critical) {
            urgencyLevel = 'critical';
        } else if (daysSinceLastWeeding >= thresholds.timeSinceLastWeeding.urgent && urgencyLevel !== 'critical') {
            urgencyLevel = 'urgent';
        } else if (daysSinceLastWeeding >= thresholds.timeSinceLastWeeding.warning && urgencyLevel === 'none') {
            urgencyLevel = 'medium';
        }
        
        return {
            level: urgencyLevel,
            recommendedMethod: recommendedMethod,
            score: this.calculateUrgencyScore(weedGrowthRate, daysSinceLastWeeding)
        };
    }

    calculateUrgencyScore(weedGrowthRate, daysSinceLastWeeding) {
        const growthScore = weedGrowthRate * 40;
        const timeScore = Math.min(daysSinceLastWeeding * 2, 40);
        const weatherScore = this.weatherData.rainfall > 100 ? 20 : 0;
        
        return Math.min(growthScore + timeScore + weatherScore, 100);
    }

    getRecommendedAction(urgency, weedGrowthRate) {
        if (urgency.level === 'critical') {
            return 'Immediate chemical application required';
        } else if (urgency.level === 'urgent') {
            return 'Chemical application recommended within 24 hours';
        } else if (urgency.level === 'medium') {
            return 'Manual weeding or light chemical treatment';
        } else if (urgency.level === 'low') {
            return 'Manual weeding when weather permits';
        }
        return 'No action required at this time';
    }

    estimateWeedingCost(crop, method) {
        const area = crop.area; // hectares
        let cost = 0;
        
        if (method === 'chemical') {
            const chemical = this.chemicalSuppressionOptions[0]; // Glyphosate
            const applicationRate = parseFloat(chemical.applicationRate.split('-')[1]); // L/ha
            cost = applicationRate * chemical.costPerLiter * area;
        } else {
            // Manual weeding cost (labor)
            cost = 15.00 * 8 * area; // $15/hour * 8 hours/ha
        }
        
        return Math.round(cost * 100) / 100;
    }

    checkWeatherSuitability() {
        const weather = this.weatherData;
        
        if (weather.rainfall > 20) {
            return { suitable: false, reason: 'Rain expected - wait for dry conditions' };
        } else if (weather.windSpeed > 15) {
            return { suitable: false, reason: 'High winds - unsafe for chemical application' };
        } else if (weather.temperature > 32) {
            return { suitable: false, reason: 'High temperature - chemical effectiveness reduced' };
        }
        
        return { suitable: true, reason: 'Weather conditions are optimal for weeding' };
    }

    getOptimalWeedingDate() {
        const forecast = this.weatherData.forecast.next7Days;
        
        for (let i = 0; i < forecast.length; i++) {
            const day = forecast[i];
            if (day.rain < 10 && day.wind < 15 && day.temp < 32) {
                const date = new Date();
                date.setDate(date.getDate() + i);
                return date.toLocaleDateString();
            }
        }
        
        // If no optimal day found, suggest today
        return new Date().toLocaleDateString();
    }

    displayWeedingTasks() {
        const container = document.getElementById('weedingTasksContainer');
        if (!container) return;

        container.innerHTML = '';

        if (this.weedingTasks.length === 0) {
            container.innerHTML = `
                <div class="alert alert-success">
                    <i class="fas fa-check-circle me-2"></i>
                    No urgent weeding tasks required. All crops are in good condition!
                </div>
            `;
            return;
        }

        this.weedingTasks.forEach(task => {
            const taskCard = document.createElement('div');
            taskCard.className = 'weeding-task-card mb-3';
            taskCard.innerHTML = `
                <div class="card border-${this.getUrgencyColor(task.urgency.level)}">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-8">
                                <div class="d-flex justify-content-between align-items-start mb-2">
                                    <h6 class="card-title mb-0">
                                        ${task.cropName} - ${task.location}
                                        <span class="badge bg-${this.getUrgencyColor(task.urgency.level)} ms-2">
                                            ${task.urgency.level.toUpperCase()}
                                        </span>
                                    </h6>
                                    <div class="urgency-score">
                                        <span class="badge bg-secondary">${task.urgency.score}% Urgent</span>
                                    </div>
                                </div>
                                <p class="card-text text-muted">${task.recommendedAction}</p>
                                <div class="task-details">
                                    <div class="row">
                                        <div class="col-6">
                                            <small class="text-muted">
                                                <i class="fas fa-chart-line me-1"></i>
                                                <strong>Weed Growth:</strong> ${task.weedGrowthRate}x
                                            </small>
                                        </div>
                                        <div class="col-6">
                                            <small class="text-muted">
                                                <i class="fas fa-calendar-alt me-1"></i>
                                                <strong>Days Since:</strong> ${task.daysSinceLastWeeding} days
                                            </small>
                                        </div>
                                    </div>
                                    <div class="row mt-1">
                                        <div class="col-6">
                                            <small class="text-muted">
                                                <i class="fas fa-dollar-sign me-1"></i>
                                                <strong>Est. Cost:</strong> $${task.estimatedCost}
                                            </small>
                                        </div>
                                        <div class="col-6">
                                            <small class="text-muted">
                                                <i class="fas fa-calendar me-1"></i>
                                                <strong>Schedule:</strong> ${task.scheduledDate}
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="weather-suitability mb-2">
                                    <small class="text-${task.weatherSuitability.suitable ? 'success' : 'warning'}">
                                        <i class="fas fa-cloud me-1"></i>
                                        ${task.weatherSuitability.suitable ? 'Weather OK' : 'Weather Issue'}
                                    </small>
                                    <br>
                                    <small class="text-muted">${task.weatherSuitability.reason}</small>
                                </div>
                                <div class="task-actions">
                                    <button class="btn btn-${this.getUrgencyColor(task.urgency.level)} btn-sm w-100 mb-1" 
                                            onclick="intelligentWeeding.executeWeedingTask('${task.id}')">
                                        <i class="fas fa-play me-1"></i>Execute Task
                                    </button>
                                    <button class="btn btn-outline-info btn-sm w-100 mb-1" 
                                            onclick="intelligentWeeding.viewTaskDetails('${task.id}')">
                                        <i class="fas fa-info-circle me-1"></i>Details
                                    </button>
                                    <button class="btn btn-outline-secondary btn-sm w-100" 
                                            onclick="intelligentWeeding.rescheduleTask('${task.id}')">
                                        <i class="fas fa-clock me-1"></i>Reschedule
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            container.appendChild(taskCard);
        });
    }

    getUrgencyColor(urgencyLevel) {
        const colors = {
            'critical': 'danger',
            'urgent': 'warning',
            'medium': 'info',
            'low': 'success',
            'none': 'secondary'
        };
        return colors[urgencyLevel] || 'secondary';
    }

    populateWeatherImpact() {
        const container = document.getElementById('weatherImpactContainer');
        if (!container) return;

        const weedGrowthRate = this.calculateOverallWeedGrowthRate();
        
        container.innerHTML = `
            <div class="weather-impact-item">
                <h6 class="text-${this.getWeedGrowthBadgeColor()}">
                    <i class="fas fa-seedling me-2"></i>Overall Weed Growth Rate
                </h6>
                <div class="progress mb-2">
                    <div class="progress-bar bg-${this.getWeedGrowthBadgeColor()}" 
                         style="width: ${Math.min(weedGrowthRate * 50, 100)}%">
                        ${weedGrowthRate.toFixed(2)}x
                    </div>
                </div>
            </div>
            
            <div class="weather-impact-item">
                <h6><i class="fas fa-thermometer-half me-2"></i>Temperature Impact</h6>
                <small class="text-muted">
                    ${this.weatherData.temperature}°C - 
                    ${this.weatherData.temperature >= 25 ? 'High' : 'Moderate'} weed growth
                </small>
            </div>
            
            <div class="weather-impact-item">
                <h6><i class="fas fa-tint me-2"></i>Moisture Impact</h6>
                <small class="text-muted">
                    Humidity: ${this.weatherData.humidity}%<br>
                    Rainfall: ${this.weatherData.rainfall}mm<br>
                    ${this.weatherData.humidity > 70 ? 'High' : 'Moderate'} moisture favors weeds
                </small>
            </div>
            
            <div class="weather-impact-item">
                <h6><i class="fas fa-sun me-2"></i>Sunlight Impact</h6>
                <small class="text-muted">
                    ${this.weatherData.sunlightHours} hours/day - 
                    ${this.weatherData.sunlightHours >= 8 ? 'Optimal' : 'Limited'} growth
                </small>
            </div>
            
            <div class="weather-impact-item">
                <h6><i class="fas fa-wind me-2"></i>Wind Conditions</h6>
                <small class="text-muted">
                    ${this.weatherData.windSpeed} km/h - 
                    ${this.weatherData.windSpeed > 15 ? 'Unsuitable' : 'Suitable'} for chemical application
                </small>
            </div>
        `;
    }

    calculateOverallWeedGrowthRate() {
        let totalGrowthRate = 0;
        let cropCount = 0;
        
        this.cropData.forEach(crop => {
            totalGrowthRate += this.calculateWeedGrowthRate(crop);
            cropCount++;
        });
        
        return cropCount > 0 ? totalGrowthRate / cropCount : 0;
    }

    getWeedGrowthLevel() {
        const rate = this.calculateOverallWeedGrowthRate();
        if (rate >= 1.2) return 'Very High';
        if (rate >= 1.0) return 'High';
        if (rate >= 0.8) return 'Medium';
        if (rate >= 0.5) return 'Low';
        return 'Very Low';
    }

    getWeedGrowthBadgeColor() {
        const level = this.getWeedGrowthLevel();
        const colors = {
            'Very High': 'danger',
            'High': 'warning',
            'Medium': 'info',
            'Low': 'success',
            'Very Low': 'secondary'
        };
        return colors[level] || 'secondary';
    }

    setupWeedingAlerts() {
        // Set up automatic alerts based on weed growth and weather conditions
        const alertInterval = setInterval(() => {
            this.checkForAlerts();
        }, 60000); // Check every minute
        
        // Initial alert check
        this.checkForAlerts();
    }

    checkForAlerts() {
        const urgentTasks = this.weedingTasks.filter(task => task.urgency.level === 'critical' || task.urgency.level === 'urgent');
        
        if (urgentTasks.length > 0) {
            this.showWeedingAlert(urgentTasks);
        }
    }

    showWeedingAlert(tasks) {
        // Create or update alert notification
        let alertElement = document.getElementById('weedingAlert');
        
        if (!alertElement) {
            alertElement = document.createElement('div');
            alertElement.id = 'weedingAlert';
            alertElement.className = 'alert alert-danger alert-dismissible fade show position-fixed';
            alertElement.style.cssText = 'top: 20px; right: 20px; z-index: 9999; max-width: 400px;';
            
            document.body.appendChild(alertElement);
        }
        
        alertElement.innerHTML = `
            <h6><i class="fas fa-exclamation-triangle me-2"></i>Urgent Weeding Required!</h6>
            <p class="mb-2">${tasks.length} crop${tasks.length > 1 ? 's' : ''} require immediate attention:</p>
            <ul class="mb-2">
                ${tasks.slice(0, 3).map(task => `<li>${task.cropName} - ${task.location}</li>`).join('')}
            </ul>
            <button type="button" class="btn btn-sm btn-danger" onclick="intelligentWeeding.viewUrgentTasks()">
                View Tasks
            </button>
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
    }

    // Task execution and management methods
    executeWeedingTask(taskId) {
        const task = this.weedingTasks.find(t => t.id === taskId);
        if (!task) return;

        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.innerHTML = `
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header bg-success text-white">
                        <h5 class="modal-title">
                            <i class="fas fa-play me-2"></i>Execute Weeding Task
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <h6>Task: ${task.cropName} - ${task.location}</h6>
                        <p><strong>Action:</strong> ${task.recommendedAction}</p>
                        <p><strong>Estimated Cost:</strong> $${task.estimatedCost}</p>
                        <p><strong>Weather:</strong> ${task.weatherSuitability.reason}</p>
                        
                        <div class="mt-3">
                            <label class="form-label">Select Method:</label>
                            <select class="form-select" id="weedingMethod">
                                <option value="manual">Manual Weeding</option>
                                <option value="chemical">Chemical Application</option>
                            </select>
                        </div>
                        
                        <div class="mt-3" id="chemicalOptions" style="display: none;">
                            <label class="form-label">Select Chemical:</label>
                            <select class="form-select" id="chemicalSelect">
                                ${this.chemicalSuppressionOptions.map(chemical => 
                                    `<option value="${chemical.name}">${chemical.name} - $${chemical.costPerLiter}/L</option>`
                                ).join('')}
                            </select>
                        </div>
                        
                        <div class="mt-3">
                            <label class="form-label">Notes:</label>
                            <textarea class="form-control" id="taskNotes" rows="3" placeholder="Add any notes about this weeding task..."></textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-success" onclick="intelligentWeeding.confirmTaskExecution('${taskId}')">
                            <i class="fas fa-check me-2"></i>Confirm Execution
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        const bsModal = new bootstrap.Modal(modal);
        bsModal.show();
        
        // Show chemical options when chemical method is selected
        modal.querySelector('#weedingMethod').addEventListener('change', function() {
            const chemicalOptions = modal.querySelector('#chemicalOptions');
            if (this.value === 'chemical') {
                chemicalOptions.style.display = 'block';
            } else {
                chemicalOptions.style.display = 'none';
            }
        });
        
        modal.addEventListener('hidden.bs.modal', () => {
            document.body.removeChild(modal);
        });
    }

    confirmTaskExecution(taskId) {
        const task = this.weedingTasks.find(t => t.id === taskId);
        const method = document.getElementById('weedingMethod').value;
        const chemical = document.getElementById('chemicalSelect')?.value;
        const notes = document.getElementById('notes').value;

        // Update task status
        task.status = 'completed';
        task.executionMethod = method;
        task.executionChemical = chemical;
        task.executionNotes = notes;
        task.completedDate = new Date().toISOString();

        // Update crop data
        const crop = this.cropData.find(c => c.id === task.cropId);
        if (crop) {
            crop.lastWeeding = new Date().toISOString();
            crop.weedPressure = method === 'chemical' ? 'Low' : 'Medium';
        }

        // Save data
        this.saveData();
        
        // Close modal
        const modal = document.querySelector('.modal');
        if (modal) {
            const bsModal = bootstrap.Modal.getInstance(modal);
            bsModal.hide();
        }

        // Refresh display
        this.generateWeedingTasks();
        
        alert(`✅ Weeding task completed successfully!\n\nTask: ${task.cropName} - ${task.location}\nMethod: ${method}\nCost: $${task.estimatedCost}\n\nTask has been marked as completed and crop data updated.`);
    }

    viewTaskDetails(taskId) {
        const task = this.weedingTasks.find(t => t.id === taskId);
        if (!task) return;

        alert(`📋 Weeding Task Details\n\nCrop: ${task.cropName}\nLocation: ${task.location}\nUrgency: ${task.urgency.level.toUpperCase()}\nWeed Growth Rate: ${task.weedGrowthRate}x\nDays Since Last Weeding: ${task.daysSinceLastWeeding}\nRecommended Action: ${task.recommendedAction}\nEstimated Cost: $${task.estimatedCost}\nWeather Suitability: ${task.weatherSuitability.reason}\nScheduled Date: ${task.scheduledDate}`);
    }

    rescheduleTask(taskId) {
        const task = this.weedingTasks.find(t => t.id === taskId);
        if (!task) return;

        const newDate = prompt('Enter new date for weeding task (MM/DD/YYYY):', task.scheduledDate);
        if (newDate && new Date(newDate) > new Date()) {
            task.scheduledDate = newDate;
            this.displayWeedingTasks();
            alert('Task rescheduled successfully!');
        }
    }

    viewUrgentTasks() {
        const urgentTasks = this.weedingTasks.filter(task => task.urgency.level === 'critical' || task.urgency.level === 'urgent');
        
        let message = `🚨 URGENT WEEDING TASKS\n\n`;
        urgentTasks.forEach((task, index) => {
            message += `${index + 1}. ${task.cropName} - ${task.location}\n`;
            message += `   Urgency: ${task.urgency.level.toUpperCase()}\n`;
            message += `   Action: ${task.recommendedAction}\n`;
            message += `   Cost: $${task.estimatedCost}\n\n`;
        });
        
        alert(message);
    }

    showWeedingSchedule() {
        alert('📅 Weeding Schedule\n\nThis would show a calendar view of all scheduled weeding tasks, weather forecasts, and optimal timing windows.\n\nFeatures:\n• Calendar view of tasks\n• Weather integration\n• Optimal timing suggestions\n• Cost tracking\n• Progress monitoring');
    }

    showChemicalOptions() {
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.innerHTML = `
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header bg-warning text-white">
                        <h5 class="modal-title">
                            <i class="fas fa-flask me-2"></i>Chemical Suppression Options
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            ${this.chemicalSuppressionOptions.map(chemical => `
                                <div class="col-md-6 mb-3">
                                    <div class="card">
                                        <div class="card-body">
                                            <h6 class="card-title">${chemical.name}</h6>
                                            <p class="card-text">${chemical.description}</p>
                                            <ul class="list-unstyled">
                                                <li><strong>Type:</strong> ${chemical.type}</li>
                                                <li><strong>Effectiveness:</strong> ${chemical.effectiveness}%</li>
                                                <li><strong>Safety:</strong> ${chemical.safetyLevel}</li>
                                                <li><strong>Cost:</strong> $${chemical.costPerLiter}/L</li>
                                                <li><strong>Rate:</strong> ${chemical.applicationRate}</li>
                                                <li><strong>Environmental:</strong> ${chemical.environmentalImpact}</li>
                                            </ul>
                                            <button class="btn btn-sm btn-outline-primary" onclick="intelligentWeeding.selectChemical('${chemical.name}')">
                                                Select This Chemical
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
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

    selectChemical(chemicalName) {
        const chemical = this.chemicalSuppressionOptions.find(c => c.name === chemicalName);
        if (!chemical) return;

        alert(`🧪 Selected: ${chemical.name}\n\nType: ${chemical.type}\nEffectiveness: ${chemical.effectiveness}%\nSafety Level: ${chemical.safetyLevel}\nApplication Rate: ${chemical.applicationRate}\nCost: $${chemical.costPerLiter}/L\nEnvironmental Impact: ${chemical.environmentalImpact}\n\nWeather Restrictions:\n${chemical.weatherRestrictions.join('\n')}\n\nPre-Harvest Interval: ${chemical.preHarvestInterval} days`);
    }

    showWeedingAnalytics() {
        alert('📊 Weeding Analytics\n\nThis would show comprehensive analytics including:\n\n• Weed growth trends over time\n• Cost analysis of weeding methods\n• Weather correlation with weed growth\n• Effectiveness of different chemicals\n• Labor cost tracking\n• Environmental impact metrics\n• ROI analysis of weeding investments');
    }

    saveData() {
        localStorage.setItem('crops', JSON.stringify(this.cropData));
        localStorage.setItem('weedingTasks', JSON.stringify(this.weedingTasks));
    }

    loadData() {
        const savedTasks = localStorage.getItem('weedingTasks');
        if (savedTasks) {
            this.weedingTasks = JSON.parse(savedTasks);
        }
    }
}

// Add CSS styles for intelligent weeding
const intelligentWeedingStyles = `
    <style>
        .weeding-task-card .card {
            transition: transform 0.2s ease;
        }
        
        .weeding-task-card .card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }
        
        .weather-impact-item {
            background: #f8f9fa;
            padding: 10px;
            border-radius: 6px;
            margin-bottom: 10px;
        }
        
        .weather-impact-item h6 {
            margin-bottom: 5px;
            font-size: 0.9rem;
        }
        
        .weed-growth-indicator .badge {
            font-size: 0.8rem;
        }
        
        .urgency-score .badge {
            font-size: 0.8rem;
        }
        
        .task-details small {
            font-size: 0.8rem;
        }
        
        .weather-suitability small {
            font-size: 0.8rem;
        }
        
        .task-actions .btn {
            font-size: 0.8rem;
        }
    </style>
`;

// Inject styles
document.head.insertAdjacentHTML('beforeend', intelligentWeedingStyles);

// Initialize Intelligent Weeding System
const intelligentWeeding = new IntelligentWeedingSystem();
