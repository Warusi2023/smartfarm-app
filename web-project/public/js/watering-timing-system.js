// SmartFarm Watering Timing System
// Provides optimal watering schedules based on weather, crop type, and soil conditions

class WateringTimingSystem {
    constructor() {
        this.weatherData = null;
        this.cropDatabase = this.initializeCropDatabase();
        this.soilTypes = this.initializeSoilTypes();
        this.currentRecommendations = [];
        
        this.initializeWateringSystem();
    }

    initializeCropDatabase() {
        return {
            'tomato': {
                name: 'Tomato',
                waterNeeds: 'high',
                rootDepth: 60, // cm
                dailyWaterRequirement: 25, // mm/day
                criticalMoistureLevel: 0.3, // 30%
                optimalWateringTime: 'early_morning',
                droughtTolerance: 'medium',
                floweringWaterSensitivity: 'high'
            },
            'lettuce': {
                name: 'Lettuce',
                waterNeeds: 'very_high',
                rootDepth: 30,
                dailyWaterRequirement: 20,
                criticalMoistureLevel: 0.4,
                optimalWateringTime: 'early_morning',
                droughtTolerance: 'low',
                floweringWaterSensitivity: 'medium'
            },
            'corn': {
                name: 'Corn',
                waterNeeds: 'high',
                rootDepth: 120,
                dailyWaterRequirement: 30,
                criticalMoistureLevel: 0.25,
                optimalWateringTime: 'early_morning',
                droughtTolerance: 'medium',
                floweringWaterSensitivity: 'very_high'
            },
            'pepper': {
                name: 'Pepper',
                waterNeeds: 'medium',
                rootDepth: 45,
                dailyWaterRequirement: 18,
                criticalMoistureLevel: 0.35,
                optimalWateringTime: 'early_morning',
                droughtTolerance: 'high',
                floweringWaterSensitivity: 'medium'
            },
            'carrot': {
                name: 'Carrot',
                waterNeeds: 'medium',
                rootDepth: 40,
                dailyWaterRequirement: 15,
                criticalMoistureLevel: 0.3,
                optimalWateringTime: 'early_morning',
                droughtTolerance: 'medium',
                floweringWaterSensitivity: 'low'
            },
            'kava': {
                name: 'Kava',
                waterNeeds: 'high',
                rootDepth: 80,
                dailyWaterRequirement: 22,
                criticalMoistureLevel: 0.4,
                optimalWateringTime: 'early_morning',
                droughtTolerance: 'low',
                floweringWaterSensitivity: 'high'
            }
        };
    }

    initializeSoilTypes() {
        return {
            'clay': {
                name: 'Clay Soil',
                waterRetention: 'high',
                drainageRate: 'slow',
                wateringFrequency: 'less_frequent',
                wateringDuration: 'longer',
                moistureRetention: 0.8
            },
            'sandy': {
                name: 'Sandy Soil',
                waterRetention: 'low',
                drainageRate: 'fast',
                wateringFrequency: 'more_frequent',
                wateringDuration: 'shorter',
                moistureRetention: 0.3
            },
            'loam': {
                name: 'Loam Soil',
                waterRetention: 'medium',
                drainageRate: 'medium',
                wateringFrequency: 'moderate',
                wateringDuration: 'moderate',
                moistureRetention: 0.6
            },
            'silt': {
                name: 'Silt Soil',
                waterRetention: 'medium_high',
                drainageRate: 'medium_slow',
                wateringFrequency: 'moderate',
                wateringDuration: 'moderate_long',
                moistureRetention: 0.7
            }
        };
    }

    async initializeWateringSystem() {
        console.log('💧 Initializing Smart Watering Timing System...');
        await this.fetchCurrentWeather();
        this.createWateringWidget();
        this.generateWateringRecommendations();
    }

    async fetchCurrentWeather() {
        // Simulate weather data (in production, this would come from a real weather API)
        this.weatherData = {
            temperature: 28, // Celsius
            humidity: 75,    // Percentage
            rainfall: 0,     // mm in last 24 hours
            windSpeed: 12,   // km/h
            uvIndex: 8,      // UV index
            cloudCover: 30,  // Percentage
            forecast: {
                next7Days: [
                    { day: 'Today', temp: 28, humidity: 75, rain: 0, wind: 12 },
                    { day: 'Tomorrow', temp: 30, humidity: 70, rain: 5, wind: 15 },
                    { day: 'Day 3', temp: 32, humidity: 65, rain: 0, wind: 18 },
                    { day: 'Day 4', temp: 29, humidity: 80, rain: 20, wind: 10 },
                    { day: 'Day 5', temp: 27, humidity: 85, rain: 15, wind: 8 },
                    { day: 'Day 6', temp: 26, humidity: 88, rain: 25, wind: 6 },
                    { day: 'Day 7', temp: 24, humidity: 90, rain: 30, wind: 5 }
                ]
            },
            season: this.getCurrentSeason(),
            location: 'Fiji'
        };
    }

    getCurrentSeason() {
        const month = new Date().getMonth() + 1;
        if (month >= 3 && month <= 5) return 'Autumn';
        if (month >= 6 && month <= 8) return 'Winter';
        if (month >= 9 && month <= 11) return 'Spring';
        return 'Summer';
    }

    createWateringWidget() {
        const dashboardContainer = document.getElementById('dashboardView');
        if (!dashboardContainer) return;

        const wateringCard = document.createElement('div');
        wateringCard.id = 'wateringTimingCard';
        wateringCard.className = 'dashboard-card mt-4';
        wateringCard.innerHTML = `
            <div class="d-flex justify-content-between align-items-center mb-3">
                <h5>💧 Smart Watering Timing</h5>
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
                        <i class="fas fa-wind me-1"></i>
                        <span id="currentWind">${this.weatherData.windSpeed}km/h</span>
                    </span>
                </div>
            </div>
            
            <div class="row">
                <div class="col-md-8">
                    <div class="watering-recommendations" id="wateringRecommendations">
                        <!-- Watering recommendations will be populated here -->
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="watering-schedule">
                        <h6 class="mb-3">Today's Optimal Times</h6>
                        <div id="optimalWateringTimes">
                            <!-- Optimal watering times will be populated here -->
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="mt-3">
                <button class="btn btn-primary me-2" onclick="wateringSystem.regenerateRecommendations()">
                    <i class="fas fa-sync me-1"></i>Refresh Recommendations
                </button>
                <button class="btn btn-outline-success" onclick="wateringSystem.showDetailedWateringGuide()">
                    <i class="fas fa-book me-1"></i>Watering Guide
                </button>
            </div>
        `;

        dashboardContainer.appendChild(wateringCard);
        this.populateOptimalWateringTimes();
    }

    generateWateringRecommendations() {
        const recommendations = [];
        
        // Get current crops from the system (in a real app, this would come from the database)
        const currentCrops = this.getCurrentCrops();
        
        currentCrops.forEach(crop => {
            const cropData = this.cropDatabase[crop.type.toLowerCase()];
            if (!cropData) return;
            
            const recommendation = this.calculateWateringRecommendation(crop, cropData);
            recommendations.push(recommendation);
        });

        this.currentRecommendations = recommendations.sort((a, b) => b.priority - a.priority);
        this.displayWateringRecommendations();
    }

    getCurrentCrops() {
        // Sample crops - in a real app, this would come from the crop management system
        return [
            { id: 1, name: 'Tomatoes', type: 'tomato', area: 0.5, soilType: 'loam', plantingDate: '2024-01-10' },
            { id: 2, name: 'Lettuce', type: 'lettuce', area: 0.3, soilType: 'clay', plantingDate: '2024-01-15' },
            { id: 3, name: 'Kava', type: 'kava', area: 0.2, soilType: 'loam', plantingDate: '2022-01-15' }
        ];
    }

    calculateWateringRecommendation(crop, cropData) {
        const weather = this.weatherData;
        const soilData = this.soilTypes[crop.soilType];
        
        // Calculate watering need based on multiple factors
        let wateringNeed = this.calculateWateringNeed(cropData, weather, soilData);
        let optimalTime = this.calculateOptimalTime(weather, cropData);
        let duration = this.calculateWateringDuration(cropData, soilData, weather);
        let frequency = this.calculateWateringFrequency(cropData, soilData, weather);
        
        // Calculate priority based on urgency
        let priority = this.calculatePriority(cropData, weather, soilData);
        
        // Generate specific recommendations
        let recommendations = this.generateSpecificRecommendations(cropData, weather, soilData);
        
        return {
            cropId: crop.id,
            cropName: crop.name,
            wateringNeed: wateringNeed,
            optimalTime: optimalTime,
            duration: duration,
            frequency: frequency,
            priority: priority,
            recommendations: recommendations,
            weatherImpact: this.assessWeatherImpact(weather),
            soilMoisture: this.estimateSoilMoisture(cropData, soilData, weather)
        };
    }

    calculateWateringNeed(cropData, weather, soilData) {
        let need = 'moderate';
        
        // Temperature impact
        if (weather.temperature > 30) {
            need = 'high';
        } else if (weather.temperature < 20) {
            need = 'low';
        }
        
        // Humidity impact
        if (weather.humidity < 60) {
            need = need === 'low' ? 'moderate' : 'high';
        } else if (weather.humidity > 85) {
            need = 'low';
        }
        
        // Wind impact
        if (weather.windSpeed > 15) {
            need = need === 'low' ? 'moderate' : 'high';
        }
        
        // Rainfall impact
        if (weather.rainfall > 10) {
            need = 'low';
        }
        
        // Crop-specific needs
        if (cropData.waterNeeds === 'very_high') {
            need = need === 'low' ? 'moderate' : 'high';
        } else if (cropData.waterNeeds === 'low') {
            need = need === 'high' ? 'moderate' : 'low';
        }
        
        return need;
    }

    calculateOptimalTime(weather, cropData) {
        const currentHour = new Date().getHours();
        
        // Base optimal time from crop data
        let optimalTime = cropData.optimalWateringTime;
        
        // Adjust based on weather conditions
        if (weather.temperature > 30) {
            // Hot weather - water early morning or late evening
            optimalTime = currentHour < 10 ? 'early_morning' : 'late_evening';
        } else if (weather.temperature < 20) {
            // Cool weather - can water during day
            optimalTime = 'mid_morning';
        }
        
        // Wind considerations
        if (weather.windSpeed > 15) {
            optimalTime = 'early_morning'; // Less wind in early morning
        }
        
        return optimalTime;
    }

    calculateWateringDuration(cropData, soilData, weather) {
        let baseDuration = cropData.dailyWaterRequirement; // mm
        
        // Adjust for soil type
        if (soilData.drainageRate === 'fast') {
            baseDuration *= 1.5; // Sandy soil needs more frequent watering
        } else if (soilData.drainageRate === 'slow') {
            baseDuration *= 0.7; // Clay soil retains water longer
        }
        
        // Adjust for weather
        if (weather.temperature > 30) {
            baseDuration *= 1.3;
        } else if (weather.temperature < 20) {
            baseDuration *= 0.8;
        }
        
        if (weather.humidity < 60) {
            baseDuration *= 1.2;
        } else if (weather.humidity > 85) {
            baseDuration *= 0.7;
        }
        
        return Math.round(baseDuration);
    }

    calculateWateringFrequency(cropData, soilData, weather) {
        let frequency = 'daily';
        
        // Soil type impact
        if (soilData.waterRetention === 'high') {
            frequency = 'every_other_day';
        } else if (soilData.waterRetention === 'low') {
            frequency = 'twice_daily';
        }
        
        // Weather impact
        if (weather.temperature > 30 && weather.humidity < 60) {
            frequency = 'twice_daily';
        } else if (weather.temperature < 20 && weather.humidity > 80) {
            frequency = 'every_other_day';
        }
        
        // Rainfall impact
        if (weather.rainfall > 15) {
            frequency = 'skip_today';
        }
        
        return frequency;
    }

    calculatePriority(cropData, weather, soilData) {
        let priority = 5; // Medium priority
        
        // High priority for high water needs crops in hot, dry conditions
        if (cropData.waterNeeds === 'very_high' && weather.temperature > 30 && weather.humidity < 60) {
            priority = 9;
        }
        
        // High priority for flowering crops
        if (cropData.floweringWaterSensitivity === 'very_high') {
            priority = 8;
        }
        
        // Low priority if recent rainfall
        if (weather.rainfall > 10) {
            priority = 2;
        }
        
        // Low priority for drought tolerant crops
        if (cropData.droughtTolerance === 'high' && weather.temperature < 25) {
            priority = 3;
        }
        
        return priority;
    }

    generateSpecificRecommendations(cropData, weather, soilData) {
        const recommendations = [];
        
        // Time-based recommendations
        if (weather.temperature > 30) {
            recommendations.push('🌅 Water early morning (6-8 AM) to avoid evaporation');
        } else if (weather.temperature < 20) {
            recommendations.push('🌞 Water mid-morning (9-11 AM) for better absorption');
        }
        
        // Wind recommendations
        if (weather.windSpeed > 15) {
            recommendations.push('💨 Avoid watering during high winds to prevent uneven distribution');
        }
        
        // Humidity recommendations
        if (weather.humidity < 60) {
            recommendations.push('💧 Increase watering frequency due to low humidity');
        } else if (weather.humidity > 85) {
            recommendations.push('🌫️ Reduce watering frequency due to high humidity');
        }
        
        // Soil-specific recommendations
        if (soilData.drainageRate === 'fast') {
            recommendations.push('🏖️ Sandy soil: Water more frequently with shorter duration');
        } else if (soilData.drainageRate === 'slow') {
            recommendations.push('🏺 Clay soil: Water less frequently with longer duration');
        }
        
        // Crop-specific recommendations
        if (cropData.floweringWaterSensitivity === 'very_high') {
            recommendations.push('🌸 Critical watering period - maintain consistent moisture');
        }
        
        return recommendations;
    }

    assessWeatherImpact(weather) {
        let impact = 'moderate';
        
        if (weather.temperature > 32 || weather.humidity < 50 || weather.windSpeed > 20) {
            impact = 'high';
        } else if (weather.temperature < 18 || weather.humidity > 90 || weather.rainfall > 15) {
            impact = 'low';
        }
        
        return impact;
    }

    estimateSoilMoisture(cropData, soilData, weather) {
        let moisture = 0.6; // Default moderate moisture
        
        // Adjust based on rainfall
        if (weather.rainfall > 10) {
            moisture = 0.8;
        } else if (weather.rainfall === 0 && weather.temperature > 25) {
            moisture = 0.4;
        }
        
        // Adjust based on soil type
        if (soilData.moistureRetention > 0.7) {
            moisture *= 1.2;
        } else if (soilData.moistureRetention < 0.4) {
            moisture *= 0.8;
        }
        
        return Math.min(Math.max(moisture, 0.1), 1.0);
    }

    displayWateringRecommendations() {
        const container = document.getElementById('wateringRecommendations');
        if (!container) return;

        container.innerHTML = '';

        if (this.currentRecommendations.length === 0) {
            container.innerHTML = `
                <div class="alert alert-info">
                    <i class="fas fa-info-circle me-2"></i>
                    No crops found. Add crops to get watering recommendations.
                </div>
            `;
            return;
        }

        this.currentRecommendations.forEach((rec, index) => {
            const recCard = document.createElement('div');
            recCard.className = 'watering-recommendation-card mb-3';
            recCard.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-8">
                                <div class="d-flex justify-content-between align-items-start mb-2">
                                    <h6 class="card-title mb-0">
                                        ${rec.cropName}
                                        <span class="badge bg-${this.getPriorityColor(rec.priority)} ms-2">Priority ${rec.priority}</span>
                                    </h6>
                                    <div class="watering-status">
                                        <span class="badge bg-${this.getWateringNeedColor(rec.wateringNeed)}">${rec.wateringNeed.toUpperCase()}</span>
                                    </div>
                                </div>
                                <p class="card-text text-muted">${this.getWateringNeedDescription(rec.wateringNeed)}</p>
                                <div class="watering-details">
                                    <div class="row">
                                        <div class="col-6">
                                            <small class="text-muted">
                                                <i class="fas fa-clock me-1"></i>
                                                <strong>Best Time:</strong> ${this.getTimeDescription(rec.optimalTime)}
                                            </small>
                                        </div>
                                        <div class="col-6">
                                            <small class="text-muted">
                                                <i class="fas fa-tint me-1"></i>
                                                <strong>Duration:</strong> ${rec.duration}mm
                                            </small>
                                        </div>
                                    </div>
                                    <div class="row mt-1">
                                        <div class="col-6">
                                            <small class="text-muted">
                                                <i class="fas fa-calendar me-1"></i>
                                                <strong>Frequency:</strong> ${this.getFrequencyDescription(rec.frequency)}
                                            </small>
                                        </div>
                                        <div class="col-6">
                                            <small class="text-muted">
                                                <i class="fas fa-seedling me-1"></i>
                                                <strong>Soil Moisture:</strong> ${Math.round(rec.soilMoisture * 100)}%
                                            </small>
                                        </div>
                                    </div>
                                </div>
                                <div class="mt-2">
                                    ${rec.recommendations.map(rec => `<small class="d-block text-info">${rec}</small>`).join('')}
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="watering-actions">
                                    <button class="btn btn-success btn-sm w-100 mb-2" onclick="wateringSystem.scheduleWatering(${rec.cropId})">
                                        <i class="fas fa-calendar-plus me-1"></i>Schedule Watering
                                    </button>
                                    <button class="btn btn-outline-info btn-sm w-100 mb-2" onclick="wateringSystem.viewCropDetails(${rec.cropId})">
                                        <i class="fas fa-info-circle me-1"></i>View Details
                                    </button>
                                    <button class="btn btn-outline-warning btn-sm w-100" onclick="wateringSystem.getWateringGuide('${rec.cropName}')">
                                        <i class="fas fa-book me-1"></i>Watering Guide
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            container.appendChild(recCard);
        });
    }

    populateOptimalWateringTimes() {
        const container = document.getElementById('optimalWateringTimes');
        if (!container) return;

        const times = this.calculateOptimalTimesForToday();
        
        container.innerHTML = times.map(time => `
            <div class="optimal-time-item d-flex justify-content-between align-items-center mb-2">
                <div>
                    <small class="fw-bold">${time.time}</small>
                    <div class="text-muted small">${time.description}</div>
                </div>
                <span class="badge bg-${time.color}">${time.rating}</span>
            </div>
        `).join('');
    }

    calculateOptimalTimesForToday() {
        const weather = this.weatherData;
        const times = [];
        
        // Early morning (6-8 AM)
        times.push({
            time: '6:00 - 8:00 AM',
            description: 'Best for most crops',
            rating: weather.temperature > 30 ? 'Excellent' : 'Good',
            color: weather.temperature > 30 ? 'success' : 'primary'
        });
        
        // Mid morning (9-11 AM)
        times.push({
            time: '9:00 - 11:00 AM',
            description: 'Good for cool weather',
            rating: weather.temperature < 25 ? 'Good' : 'Fair',
            color: weather.temperature < 25 ? 'primary' : 'warning'
        });
        
        // Late afternoon (4-6 PM)
        times.push({
            time: '4:00 - 6:00 PM',
            description: 'Avoid if windy',
            rating: weather.windSpeed > 15 ? 'Poor' : 'Fair',
            color: weather.windSpeed > 15 ? 'danger' : 'warning'
        });
        
        return times;
    }

    getPriorityColor(priority) {
        if (priority >= 8) return 'danger';
        if (priority >= 6) return 'warning';
        if (priority >= 4) return 'primary';
        return 'secondary';
    }

    getWateringNeedColor(need) {
        const colors = {
            'high': 'danger',
            'moderate': 'warning',
            'low': 'success'
        };
        return colors[need] || 'secondary';
    }

    getWateringNeedDescription(need) {
        const descriptions = {
            'high': 'Immediate watering recommended',
            'moderate': 'Regular watering schedule',
            'low': 'Minimal watering needed'
        };
        return descriptions[need] || 'Watering assessment needed';
    }

    getTimeDescription(time) {
        const descriptions = {
            'early_morning': '6:00 - 8:00 AM',
            'mid_morning': '9:00 - 11:00 AM',
            'late_evening': '6:00 - 8:00 PM'
        };
        return descriptions[time] || 'Flexible timing';
    }

    getFrequencyDescription(frequency) {
        const descriptions = {
            'twice_daily': 'Twice daily',
            'daily': 'Daily',
            'every_other_day': 'Every other day',
            'skip_today': 'Skip today'
        };
        return descriptions[frequency] || 'As needed';
    }

    scheduleWatering(cropId) {
        const recommendation = this.currentRecommendations.find(r => r.cropId === cropId);
        if (!recommendation) return;

        alert(`🌧️ Watering scheduled for ${recommendation.cropName}!\n\n` +
              `⏰ Time: ${this.getTimeDescription(recommendation.optimalTime)}\n` +
              `💧 Amount: ${recommendation.duration}mm\n` +
              `📅 Frequency: ${this.getFrequencyDescription(recommendation.frequency)}\n\n` +
              `Recommendations:\n${recommendation.recommendations.join('\n')}`);
    }

    viewCropDetails(cropId) {
        const recommendation = this.currentRecommendations.find(r => r.cropId === cropId);
        if (!recommendation) return;

        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.innerHTML = `
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header bg-info text-white">
                        <h5 class="modal-title">
                            <i class="fas fa-seedling me-2"></i>Watering Details - ${recommendation.cropName}
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-md-6">
                                <h6>Current Conditions</h6>
                                <ul class="list-unstyled">
                                    <li><i class="fas fa-thermometer-half me-2"></i><strong>Temperature:</strong> ${this.weatherData.temperature}°C</li>
                                    <li><i class="fas fa-tint me-2"></i><strong>Humidity:</strong> ${this.weatherData.humidity}%</li>
                                    <li><i class="fas fa-wind me-2"></i><strong>Wind Speed:</strong> ${this.weatherData.windSpeed} km/h</li>
                                    <li><i class="fas fa-cloud-rain me-2"></i><strong>Recent Rain:</strong> ${this.weatherData.rainfall}mm</li>
                                </ul>
                            </div>
                            <div class="col-md-6">
                                <h6>Watering Plan</h6>
                                <ul class="list-unstyled">
                                    <li><i class="fas fa-clock me-2"></i><strong>Optimal Time:</strong> ${this.getTimeDescription(recommendation.optimalTime)}</li>
                                    <li><i class="fas fa-tint me-2"></i><strong>Amount:</strong> ${recommendation.duration}mm</li>
                                    <li><i class="fas fa-calendar me-2"></i><strong>Frequency:</strong> ${this.getFrequencyDescription(recommendation.frequency)}</li>
                                    <li><i class="fas fa-seedling me-2"></i><strong>Soil Moisture:</strong> ${Math.round(recommendation.soilMoisture * 100)}%</li>
                                </ul>
                            </div>
                        </div>
                        <div class="mt-3">
                            <h6>Recommendations</h6>
                            <div class="alert alert-info">
                                ${recommendation.recommendations.map(rec => `<div>${rec}</div>`).join('')}
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-success" onclick="wateringSystem.scheduleWatering(${cropId})">
                            <i class="fas fa-calendar-plus me-2"></i>Schedule Watering
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

    getWateringGuide(cropName) {
        const cropData = this.cropDatabase[cropName.toLowerCase()];
        if (!cropData) return;

        alert(`📖 Watering Guide for ${cropName}\n\n` +
              `💧 Daily Water Need: ${cropData.dailyWaterRequirement}mm\n` +
              `🌱 Root Depth: ${cropData.rootDepth}cm\n` +
              `⏰ Best Time: ${cropData.optimalWateringTime.replace('_', ' ')}\n` +
              `🌵 Drought Tolerance: ${cropData.droughtTolerance}\n` +
              `🌸 Flowering Sensitivity: ${cropData.floweringWaterSensitivity}\n\n` +
              `💡 Tips:\n` +
              `• Water deeply but less frequently\n` +
              `• Check soil moisture before watering\n` +
              `• Adjust based on weather conditions\n` +
              `• Monitor plant health for signs of over/under watering`);
    }

    regenerateRecommendations() {
        console.log('Regenerating watering recommendations...');
        this.generateWateringRecommendations();
    }

    showDetailedWateringGuide() {
        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.innerHTML = `
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header bg-success text-white">
                        <h5 class="modal-title">
                            <i class="fas fa-book me-2"></i>Complete Watering Guide
                        </h5>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="watering-guide-section">
                            <h6>🌅 Best Watering Times</h6>
                            <ul>
                                <li><strong>Early Morning (6-8 AM):</strong> Best time for most crops, minimal evaporation</li>
                                <li><strong>Late Evening (6-8 PM):</strong> Good alternative, avoid if humidity is high</li>
                                <li><strong>Avoid Midday:</strong> High evaporation, can burn leaves</li>
                            </ul>
                        </div>
                        
                        <div class="watering-guide-section mt-4">
                            <h6>🌡️ Weather Considerations</h6>
                            <ul>
                                <li><strong>Hot Weather (>30°C):</strong> Increase frequency, water early morning</li>
                                <li><strong>Cool Weather (<20°C):</strong> Reduce frequency, can water mid-morning</li>
                                <li><strong>High Humidity (>85%):</strong> Reduce watering frequency</li>
                                <li><strong>Low Humidity (<60%):</strong> Increase watering frequency</li>
                                <li><strong>Windy Conditions:</strong> Avoid watering, causes uneven distribution</li>
                            </ul>
                        </div>
                        
                        <div class="watering-guide-section mt-4">
                            <h6>🏺 Soil Type Guidelines</h6>
                            <ul>
                                <li><strong>Sandy Soil:</strong> Water frequently, shorter duration</li>
                                <li><strong>Clay Soil:</strong> Water less frequently, longer duration</li>
                                <li><strong>Loam Soil:</strong> Moderate frequency and duration</li>
                            </ul>
                        </div>
                        
                        <div class="watering-guide-section mt-4">
                            <h6>🌱 Crop-Specific Tips</h6>
                            <ul>
                                <li><strong>Leafy Vegetables:</strong> Consistent moisture, avoid wetting leaves</li>
                                <li><strong>Root Crops:</strong> Deep watering to encourage root growth</li>
                                <li><strong>Flowering Plants:</strong> Critical watering period during bloom</li>
                                <li><strong>Fruit Trees:</strong> Deep, infrequent watering</li>
                            </ul>
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
}

// Add CSS styles for watering system
const wateringStyles = `
    <style>
        .watering-recommendation-card .card {
            border-left: 4px solid #28a745;
            transition: transform 0.2s ease;
        }
        
        .watering-recommendation-card .card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }
        
        .weather-indicator .badge {
            font-size: 0.8rem;
        }
        
        .optimal-time-item {
            padding: 8px;
            background: #f8f9fa;
            border-radius: 6px;
            margin-bottom: 5px;
        }
        
        .watering-guide-section {
            border-bottom: 1px solid #e9ecef;
            padding-bottom: 15px;
        }
        
        .watering-guide-section:last-child {
            border-bottom: none;
        }
    </style>
`;

// Inject styles
document.head.insertAdjacentHTML('beforeend', wateringStyles);

// Initialize Watering Timing System
const wateringSystem = new WateringTimingSystem();
