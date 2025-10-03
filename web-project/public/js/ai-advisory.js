// AI Advisory System JavaScript
// Handles AI-powered agricultural recommendations and advisory features

class AIAdvisorySystem {
    constructor() {
        this.recommendations = [];
        this.weatherData = null;
        this.crops = [];
        this.livestock = [];
        this.charts = {};
        
        this.init();
    }
    
    async init() {
        try {
            await this.loadWeatherData();
            await this.loadCrops();
            await this.loadLivestock();
            await this.loadRecommendations();
            this.setupEventListeners();
            this.updateUI();
        } catch (error) {
            console.error('Error initializing AI Advisory System:', error);
            this.showError('Failed to initialize AI Advisory System');
        }
    }
    
    async loadWeatherData() {
        try {
            // Simulate weather data - in production, this would come from a weather API
            this.weatherData = {
                temperature: 28,
                humidity: 65,
                rainfall: 5,
                windSpeed: 12,
                conditions: 'Partly cloudy',
                forecast: [
                    { date: '2024-01-21', temperature: 29, rainfall: 2, conditions: 'Sunny' },
                    { date: '2024-01-22', temperature: 27, rainfall: 8, conditions: 'Light rain' },
                    { date: '2024-01-23', temperature: 26, rainfall: 15, conditions: 'Heavy rain' },
                    { date: '2024-01-24', temperature: 30, rainfall: 0, conditions: 'Sunny' },
                    { date: '2024-01-25', temperature: 31, rainfall: 1, conditions: 'Partly cloudy' }
                ]
            };
            
            this.updateWeatherWidget();
        } catch (error) {
            console.error('Error loading weather data:', error);
        }
    }
    
    async loadCrops() {
        try {
            const response = await fetch(window.SmartFarmConfig.getApiUrl('/api/crops'));
            if (!response.ok) throw new Error('Failed to load crops');
            
            const data = await response.json();
            this.crops = data.data || [];
        } catch (error) {
            console.error('Error loading crops:', error);
            this.crops = [];
        }
    }
    
    async loadLivestock() {
        try {
            const response = await fetch(window.SmartFarmConfig.getApiUrl('/api/livestock'));
            if (!response.ok) throw new Error('Failed to load livestock');
            
            const data = await response.json();
            this.livestock = data.data || [];
        } catch (error) {
            console.error('Error loading livestock:', error);
            this.livestock = [];
        }
    }
    
    async loadRecommendations() {
        try {
            const response = await fetch(window.SmartFarmConfig.getApiUrl('/api/ai-advisory/recommendations'));
            if (!response.ok) throw new Error('Failed to load recommendations');
            
            const data = await response.json();
            this.recommendations = data.data || [];
        } catch (error) {
            console.error('Error loading recommendations:', error);
            this.recommendations = [];
        }
    }
    
    updateWeatherWidget() {
        if (!this.weatherData) return;
        
        document.getElementById('currentTemp').textContent = `${this.weatherData.temperature}°C`;
        document.getElementById('currentHumidity').textContent = `${this.weatherData.humidity}%`;
        document.getElementById('currentRainfall').textContent = `${this.weatherData.rainfall}mm`;
        document.getElementById('currentWind').textContent = `${this.weatherData.windSpeed} km/h`;
        
        // Generate weather advisory
        let advisory = 'Good conditions for most agricultural activities';
        if (this.weatherData.rainfall > 20) {
            advisory = 'Heavy rain expected - delay fertilizer application';
        } else if (this.weatherData.temperature > 35) {
            advisory = 'High temperature - avoid outdoor work during midday';
        } else if (this.weatherData.rainfall < 5 && this.weatherData.temperature > 25) {
            advisory = 'Dry conditions - consider irrigation';
        }
        
        document.getElementById('weatherAdvisory').textContent = advisory;
    }
    
    updateUI() {
        this.updateOverview();
        this.updateCropsTab();
        this.updateLivestockTab();
        this.updateTimelineTab();
        this.updateSoilTab();
    }
    
    updateOverview() {
        this.updateRecommendationsChart();
        this.updateUrgentActions();
        this.updateAIInsights();
    }
    
    updateRecommendationsChart() {
        const ctx = document.getElementById('recommendationsChart');
        if (!ctx) return;
        
        const recommendationsByType = this.recommendations.reduce((acc, rec) => {
            acc[rec.type] = (acc[rec.type] || 0) + 1;
            return acc;
        }, {});
        
        this.charts.recommendations = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: Object.keys(recommendationsByType).map(key => 
                    key.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())
                ),
                datasets: [{
                    data: Object.values(recommendationsByType),
                    backgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56',
                        '#4BC0C0',
                        '#9966FF'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                aspectRatio: 1.5,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }
    
    updateUrgentActions() {
        const urgentActions = this.recommendations.filter(rec => rec.priority === 'urgent' || rec.priority === 'high');
        const container = document.getElementById('urgentActions');
        
        if (urgentActions.length === 0) {
            container.innerHTML = '<p class="text-muted">No urgent actions required</p>';
            return;
        }
        
        container.innerHTML = urgentActions.map(rec => `
            <div class="recommendation-item priority-${rec.priority}">
                <div class="d-flex justify-content-between align-items-start">
                    <div>
                        <h6>${rec.type.replace('_', ' ').toUpperCase()}</h6>
                        <p class="mb-1">${rec.recommendations}</p>
                        <small class="text-muted">${new Date(rec.createdAt).toLocaleDateString()}</small>
                    </div>
                    <span class="badge bg-${rec.priority === 'urgent' ? 'danger' : 'warning'}">${rec.priority}</span>
                </div>
            </div>
        `).join('');
    }
    
    updateAIInsights() {
        const insights = this.generateAIInsights();
        const container = document.getElementById('aiInsights');
        
        container.innerHTML = insights.map(insight => `
            <div class="alert alert-info">
                <i class="fas fa-lightbulb me-2"></i>
                ${insight}
            </div>
        `).join('');
    }
    
    generateAIInsights() {
        const insights = [];
        
        // Weather-based insights
        if (this.weatherData) {
            if (this.weatherData.rainfall > 15) {
                insights.push('Heavy rainfall expected - consider delaying fertilizer applications and protect sensitive crops.');
            }
            if (this.weatherData.temperature > 30) {
                insights.push('High temperatures detected - ensure adequate irrigation and consider shade for livestock.');
            }
            if (this.weatherData.humidity > 80) {
                insights.push('High humidity conditions - monitor for fungal diseases and ensure proper ventilation.');
            }
        }
        
        // Crop-based insights
        const cropsNeedingAttention = this.crops.filter(crop => {
            const daysSincePlanting = Math.floor((new Date() - new Date(crop.plantingDate)) / (1000 * 60 * 60 * 24));
            return daysSincePlanting > 30 && daysSincePlanting < 90; // Vegetative stage
        });
        
        if (cropsNeedingAttention.length > 0) {
            insights.push(`${cropsNeedingAttention.length} crops are in vegetative stage - consider nitrogen application for optimal growth.`);
        }
        
        // Livestock-based insights
        const livestockNeedingVaccination = this.livestock.filter(animal => {
            const ageInMonths = animal.age || 0;
            return ageInMonths >= 6 && ageInMonths <= 12; // Vaccination age
        });
        
        if (livestockNeedingVaccination.length > 0) {
            insights.push(`${livestockNeedingVaccination.length} animals are due for vaccination - schedule health checkup.`);
        }
        
        if (insights.length === 0) {
            insights.push('All systems operating optimally - continue current management practices.');
        }
        
        return insights;
    }
    
    updateCropsTab() {
        this.updateActiveCrops();
        this.updateFertilizerRecommendations();
    }
    
    updateActiveCrops() {
        const container = document.getElementById('activeCrops');
        
        if (this.crops.length === 0) {
            container.innerHTML = '<p class="text-muted">No active crops found</p>';
            return;
        }
        
        container.innerHTML = this.crops.map(crop => {
            const growthStage = this.calculateGrowthStage(crop.name, crop.plantingDate);
            const daysSincePlanting = Math.floor((new Date() - new Date(crop.plantingDate)) / (1000 * 60 * 60 * 24));
            
            return `
                <div class="card mb-3">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-start">
                            <div>
                                <h6>${crop.name}</h6>
                                <p class="text-muted mb-1">${crop.variety || 'Standard variety'}</p>
                                <span class="growth-stage">${growthStage.replace('_', ' ').toUpperCase()}</span>
                            </div>
                            <div class="text-end">
                                <small class="text-muted">${daysSincePlanting} days old</small>
                                <br>
                                <button class="btn btn-sm btn-outline-primary" onclick="aiAdvisory.getCropRecommendations('${crop.id}')">
                                    <i class="fas fa-robot me-1"></i>Get AI Advice
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    updateFertilizerRecommendations() {
        const container = document.getElementById('fertilizerRecommendations');
        
        // Generate fertilizer recommendations for each crop
        const recommendations = this.crops.map(crop => {
            const growthStage = this.calculateGrowthStage(crop.name, crop.plantingDate);
            const rec = window.AIAdvisoryHelper.getCropNutritionRecommendations(
                crop.name.toLowerCase().replace(/\s+/g, '_'),
                growthStage,
                this.weatherData,
                null
            );
            
            return {
                crop: crop,
                recommendations: rec
            };
        }).filter(item => item.recommendations);
        
        if (recommendations.length === 0) {
            container.innerHTML = '<p class="text-muted">No fertilizer recommendations available</p>';
            return;
        }
        
        container.innerHTML = recommendations.map(rec => `
            <div class="fertilizer-timing">
                <h6>${rec.crop.name}</h6>
                <p class="text-muted">${rec.recommendations.stage.replace('_', ' ').toUpperCase()}</p>
                ${Object.entries(rec.recommendations.recommendations).map(([type, details]) => `
                    <div class="mb-2">
                        <strong>${type.toUpperCase()}:</strong>
                        <ul class="mb-0">
                            <li>Timing: ${details.timing}</li>
                            <li>Amount: ${details.amount}</li>
                            <li>Method: ${details.method}</li>
                            <li>Notes: ${details.notes}</li>
                        </ul>
                    </div>
                `).join('')}
            </div>
        `).join('');
    }
    
    updateLivestockTab() {
        this.updateLivestockHealthStatus();
        this.updateUpcomingTreatments();
    }
    
    updateLivestockHealthStatus() {
        const container = document.getElementById('livestockHealthStatus');
        
        if (this.livestock.length === 0) {
            container.innerHTML = '<p class="text-muted">No livestock found</p>';
            return;
        }
        
        container.innerHTML = this.livestock.map(animal => {
            const ageGroup = this.calculateAgeGroup(animal.animalType, animal.age);
            const healthStatus = animal.healthStatus || 'healthy';
            
            return `
                <div class="card mb-3">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-start">
                            <div>
                                <h6>${animal.animalType} - ${animal.breed || 'Mixed'}</h6>
                                <p class="text-muted mb-1">Age: ${animal.age || 0} months</p>
                                <span class="badge bg-${healthStatus === 'healthy' ? 'success' : 'warning'}">${healthStatus}</span>
                            </div>
                            <div class="text-end">
                                <button class="btn btn-sm btn-outline-primary" onclick="aiAdvisory.getLivestockRecommendations('${animal.id}')">
                                    <i class="fas fa-robot me-1"></i>Get AI Advice
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }
    
    updateUpcomingTreatments() {
        const container = document.getElementById('upcomingTreatments');
        
        // Generate upcoming treatments for each livestock
        const treatments = this.livestock.map(animal => {
            const ageGroup = this.calculateAgeGroup(animal.animalType, animal.age);
            const rec = window.AIAdvisoryHelper.getLivestockHealthRecommendations(
                animal.animalType.toLowerCase(),
                ageGroup,
                animal.healthStatus || 'healthy',
                this.weatherData
            );
            
            return {
                animal: animal,
                treatments: rec
            };
        }).filter(item => item.treatments);
        
        if (treatments.length === 0) {
            container.innerHTML = '<p class="text-muted">No upcoming treatments scheduled</p>';
            return;
        }
        
        container.innerHTML = treatments.map(treatment => `
            <div class="health-schedule">
                <h6>${treatment.animal.animalType} - ${treatment.animal.breed || 'Mixed'}</h6>
                <p class="text-muted">Age Group: ${treatment.treatments.ageGroup.toUpperCase()}</p>
                ${Object.entries(treatment.treatments.schedule).map(([type, items]) => `
                    <div class="mb-2">
                        <strong>${type.toUpperCase()}:</strong>
                        ${items.map(item => `
                            <div class="ms-3">
                                <strong>${item.vaccine || item.treatment}:</strong>
                                <ul class="mb-0">
                                    <li>Timing: ${item.timing}</li>
                                    <li>Method: ${item.method}</li>
                                    <li>Notes: ${item.notes}</li>
                                </ul>
                            </div>
                        `).join('')}
                    </div>
                `).join('')}
            </div>
        `).join('');
    }
    
    updateTimelineTab() {
        const container = document.getElementById('actionTimeline');
        
        // Generate action timeline based on recommendations and upcoming tasks
        const timeline = this.generateActionTimeline();
        
        if (timeline.length === 0) {
            container.innerHTML = '<p class="text-muted">No upcoming actions scheduled</p>';
            return;
        }
        
        container.innerHTML = timeline.map(item => `
            <div class="timeline-item">
                <div class="d-flex justify-content-between align-items-start">
                    <div>
                        <h6>${item.title}</h6>
                        <p class="text-muted mb-1">${item.description}</p>
                        <small class="text-muted">${item.date}</small>
                    </div>
                    <span class="badge bg-${item.priority === 'urgent' ? 'danger' : item.priority === 'high' ? 'warning' : 'info'}">${item.priority}</span>
                </div>
            </div>
        `).join('');
    }
    
    generateActionTimeline() {
        const timeline = [];
        const today = new Date();
        
        // Add fertilizer applications
        this.crops.forEach(crop => {
            const growthStage = this.calculateGrowthStage(crop.name, crop.plantingDate);
            const rec = window.AIAdvisoryHelper.getCropNutritionRecommendations(
                crop.name.toLowerCase().replace(/\s+/g, '_'),
                growthStage,
                this.weatherData,
                null
            );
            
            if (rec && rec.recommendations.urea) {
                timeline.push({
                    date: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
                    title: `Apply Urea to ${crop.name}`,
                    description: `${rec.recommendations.urea.amount} - ${rec.recommendations.urea.method}`,
                    priority: 'high'
                });
            }
        });
        
        // Add livestock treatments
        this.livestock.forEach(animal => {
            const ageGroup = this.calculateAgeGroup(animal.animalType, animal.age);
            if (ageGroup === 'calves' || ageGroup === 'kids' || ageGroup === 'chicks') {
                timeline.push({
                    date: new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString(),
                    title: `Vaccinate ${animal.animalType}`,
                    description: 'Annual vaccination due',
                    priority: 'medium'
                });
            }
        });
        
        return timeline.sort((a, b) => new Date(a.date) - new Date(b.date));
    }
    
    updateSoilTab() {
        this.updateSoilTestResults();
        this.updateTestingSchedule();
    }
    
    updateSoilTestResults() {
        const container = document.getElementById('soilTestResults');
        
        // Simulate soil test results
        const soilResults = {
            ph: 6.2,
            nitrogen: 45,
            phosphorus: 25,
            potassium: 180,
            organicMatter: 2.5,
            lastTest: '2024-01-01',
            recommendations: [
                'Add 50-75 kg/ha urea for nitrogen',
                'Apply 10-15 tons/ha compost for organic matter',
                'pH is optimal - no lime needed'
            ]
        };
        
        container.innerHTML = `
            <div class="row">
                <div class="col-md-6">
                    <h6>Latest Test Results (${soilResults.lastTest})</h6>
                    <div class="table-responsive">
                        <table class="table table-sm">
                            <tr><td>pH</td><td>${soilResults.ph}</td><td class="text-success">Optimal</td></tr>
                            <tr><td>Nitrogen (ppm)</td><td>${soilResults.nitrogen}</td><td class="text-warning">Low</td></tr>
                            <tr><td>Phosphorus (ppm)</td><td>${soilResults.phosphorus}</td><td class="text-success">Good</td></tr>
                            <tr><td>Potassium (ppm)</td><td>${soilResults.potassium}</td><td class="text-success">Good</td></tr>
                            <tr><td>Organic Matter (%)</td><td>${soilResults.organicMatter}</td><td class="text-warning">Low</td></tr>
                        </table>
                    </div>
                </div>
                <div class="col-md-6">
                    <h6>AI Recommendations</h6>
                    <ul class="list-unstyled">
                        ${soilResults.recommendations.map(rec => `<li><i class="fas fa-check text-success me-2"></i>${rec}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
    }
    
    updateTestingSchedule() {
        const container = document.getElementById('testingSchedule');
        
        container.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h6>Next Soil Test</h6>
                    <p class="text-muted">Due: March 1, 2024</p>
                    <p class="small">Last test: January 1, 2024</p>
                    <button class="btn btn-sm btn-primary">Schedule Test</button>
                </div>
            </div>
        `;
    }
    
    calculateGrowthStage(cropName, plantingDate) {
        const planting = new Date(plantingDate);
        const now = new Date();
        const daysSincePlanting = Math.floor((now - planting) / (1000 * 60 * 60 * 24));
        
        const cropStages = {
            cassava: { planting: 30, vegetative: 90, tuber_formation: 150, maturation: 300 },
            taro: { planting: 21, vegetative: 90, corm_development: 180 },
            sweet_potato: { planting: 14, vine_development: 60, tuber_formation: 120 },
            spinach: { germination: 7, vegetative: 35 },
            lettuce: { germination: 7, vegetative: 45 },
            banana: { establishment: 90, flowering: 150 }
        };
        
        const stages = cropStages[cropName.toLowerCase().replace(/\s+/g, '_')];
        if (!stages) return 'unknown';
        
        if (daysSincePlanting <= stages.planting) return 'planting';
        if (daysSincePlanting <= stages.vegetative) return 'vegetative';
        if (stages.tuber_formation && daysSincePlanting <= stages.tuber_formation) return 'tuber_formation';
        if (stages.corm_development && daysSincePlanting <= stages.corm_development) return 'corm_development';
        if (stages.flowering && daysSincePlanting <= stages.flowering) return 'flowering';
        if (stages.maturation && daysSincePlanting <= stages.maturation) return 'maturation';
        
        return 'mature';
    }
    
    calculateAgeGroup(animalType, ageInMonths) {
        const ageGroups = {
            cattle: { calves: 6, heifers: 24, cows: 999 },
            goats: { kids: 6, does: 999 },
            chickens: { chicks: 8, layers: 999 }
        };
        
        const groups = ageGroups[animalType.toLowerCase()];
        if (!groups) return 'adult';
        
        if (ageInMonths <= groups.calves || ageInMonths <= groups.kids || ageInMonths <= groups.chicks) {
            return animalType.toLowerCase() === 'cattle' ? 'calves' : 
                   animalType.toLowerCase() === 'goats' ? 'kids' : 'chicks';
        }
        
        if (animalType.toLowerCase() === 'cattle' && ageInMonths <= groups.heifers) {
            return 'heifers';
        }
        
        return animalType.toLowerCase() === 'cattle' ? 'cows' : 
               animalType.toLowerCase() === 'goats' ? 'does' : 'layers';
    }
    
    async getCropRecommendations(cropId) {
        try {
            const response = await fetch(window.SmartFarmConfig.getApiUrl(`/api/ai-advisory/crop-nutrition/${cropId}`));
            if (!response.ok) throw new Error('Failed to get crop recommendations');
            
            const data = await response.json();
            this.showRecommendationsModal('Crop Nutrition', data.data);
        } catch (error) {
            console.error('Error getting crop recommendations:', error);
            this.showError('Failed to get crop recommendations');
        }
    }
    
    async getLivestockRecommendations(livestockId) {
        try {
            const response = await fetch(window.SmartFarmConfig.getApiUrl(`/api/ai-advisory/livestock-health/${livestockId}`));
            if (!response.ok) throw new Error('Failed to get livestock recommendations');
            
            const data = await response.json();
            this.showRecommendationsModal('Livestock Health', data.data);
        } catch (error) {
            console.error('Error getting livestock recommendations:', error);
            this.showError('Failed to get livestock recommendations');
        }
    }
    
    showRecommendationsModal(title, data) {
        // Create and show recommendations modal
        const modalHtml = `
            <div class="modal fade" id="recommendationsModal" tabindex="-1">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">${title} Recommendations</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <div class="row">
                                <div class="col-md-6">
                                    <h6>Growth Stage: ${data.growthStage || data.ageGroup}</h6>
                                    <p class="text-muted">${data.crop?.name || data.livestock?.animalType}</p>
                                </div>
                                <div class="col-md-6">
                                    <h6>Recommendations</h6>
                                    <div class="recommendation-item">
                                        <pre>${JSON.stringify(data.recommendations, null, 2)}</pre>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Apply Recommendations</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Remove existing modal if any
        const existingModal = document.getElementById('recommendationsModal');
        if (existingModal) {
            existingModal.remove();
        }
        
        // Add new modal to body
        document.body.insertAdjacentHTML('beforeend', modalHtml);
        
        // Show modal
        const modal = new bootstrap.Modal(document.getElementById('recommendationsModal'));
        modal.show();
    }
    
    async refreshRecommendations() {
        try {
            await this.loadRecommendations();
            this.updateUI();
            this.showSuccess('Recommendations refreshed successfully');
        } catch (error) {
            console.error('Error refreshing recommendations:', error);
            this.showError('Failed to refresh recommendations');
        }
    }
    
    setupEventListeners() {
        // Add any event listeners here
    }
    
    showError(message) {
        // Show error message
        const alert = document.createElement('div');
        alert.className = 'alert alert-danger alert-dismissible fade show position-fixed';
        alert.style.top = '20px';
        alert.style.right = '20px';
        alert.style.zIndex = '9999';
        alert.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        document.body.appendChild(alert);
        
        setTimeout(() => {
            alert.remove();
        }, 5000);
    }
    
    showSuccess(message) {
        // Show success message
        const alert = document.createElement('div');
        alert.className = 'alert alert-success alert-dismissible fade show position-fixed';
        alert.style.top = '20px';
        alert.style.right = '20px';
        alert.style.zIndex = '9999';
        alert.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        document.body.appendChild(alert);
        
        setTimeout(() => {
            alert.remove();
        }, 3000);
    }
}

// Initialize AI Advisory System when page loads
let aiAdvisory;
document.addEventListener('DOMContentLoaded', function() {
    aiAdvisory = new AIAdvisorySystem();
});

// Global functions for onclick handlers
function refreshRecommendations() {
    if (aiAdvisory) {
        aiAdvisory.refreshRecommendations();
    }
}

function logout() {
    // Implement logout functionality
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = 'login.html';
}
