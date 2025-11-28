/**
 * Daily Farming Tips Widget
 * Displays daily gardening and animal rearing tips
 */

class DailyTipsWidget {
    constructor(containerId, apiBaseUrl = 'https://smartfarm-app-production.up.railway.app') {
        this.containerId = containerId;
        this.apiBaseUrl = apiBaseUrl;
        this.currentTip = null;
        this.init();
    }

    async init() {
        const container = document.getElementById(this.containerId);
        if (!container) {
            console.error(`Daily Tips: Container #${this.containerId} not found`);
            return;
        }

        try {
            await this.loadTodaysTip();
            this.render();
        } catch (error) {
            console.error('Daily Tips: Error loading tip', error);
            this.renderError();
        }
    }

    async loadTodaysTip() {
        try {
            // First, try to get personalized tip based on user's crops and livestock
            const personalizedTip = await this.loadPersonalizedTip();
            if (personalizedTip) {
                this.currentTip = personalizedTip;
                return;
            }

            // Fallback to generic tip
            const response = await fetch(`${this.apiBaseUrl}/api/daily-tips/today`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const data = await response.json();
            if (data.success && data.tip) {
                this.currentTip = data.tip;
            } else {
                throw new Error('Invalid response format');
            }
        } catch (error) {
            console.warn('Daily Tips: API unavailable, using fallback tip', error);
            // Fallback tip if API is unavailable
            this.currentTip = this.getFallbackTip();
        }
    }

    async loadPersonalizedTip() {
        try {
            // Fetch user's crops and livestock
            const crops = await this.fetchUserCrops();
            const livestock = await this.fetchUserLivestock();

            // If no crops or livestock, return null to use generic tip
            if ((!crops || crops.length === 0) && (!livestock || livestock.length === 0)) {
                return null;
            }

            // Build query parameters
            const params = new URLSearchParams();
            if (crops && crops.length > 0) {
                params.append('crops', JSON.stringify(crops));
            }
            if (livestock && livestock.length > 0) {
                params.append('livestock', JSON.stringify(livestock));
            }

            const response = await fetch(`${this.apiBaseUrl}/api/daily-tips/personalized?${params.toString()}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const data = await response.json();
            if (data.success && data.tip) {
                return data.tip;
            }
        } catch (error) {
            console.warn('Daily Tips: Failed to load personalized tip', error);
            // Return null to fall back to generic tip
        }
        return null;
    }

    async fetchUserCrops() {
        try {
            // Use SmartFarmAPI if available
            if (window.SmartFarmAPI && typeof window.SmartFarmAPI.getCrops === 'function') {
                const result = await window.SmartFarmAPI.getCrops();
                if (result && result.success && result.data) {
                    return Array.isArray(result.data) ? result.data : [];
                }
            }

            // Fallback: try direct API call
            const token = localStorage.getItem('smartfarm_token') || sessionStorage.getItem('smartfarm_token');
            const response = await fetch(`${this.apiBaseUrl}/api/crops`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
                }
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success && data.data) {
                    return Array.isArray(data.data) ? data.data : [];
                }
            }
        } catch (error) {
            console.warn('Daily Tips: Failed to fetch crops', error);
        }
        return [];
    }

    async fetchUserLivestock() {
        try {
            // Use SmartFarmAPI if available
            if (window.SmartFarmAPI && typeof window.SmartFarmAPI.getLivestock === 'function') {
                const result = await window.SmartFarmAPI.getLivestock();
                if (result && result.success && result.data) {
                    return Array.isArray(result.data) ? result.data : [];
                }
            }

            // Fallback: try direct API call
            const token = localStorage.getItem('smartfarm_token') || sessionStorage.getItem('smartfarm_token');
            const response = await fetch(`${this.apiBaseUrl}/api/livestock`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
                }
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success && data.data) {
                    return Array.isArray(data.data) ? data.data : [];
                }
            }
        } catch (error) {
            console.warn('Daily Tips: Failed to fetch livestock', error);
        }
        return [];
    }

    getFallbackTip() {
        const tips = [
            {
                category: 'gardening',
                title: 'Water Early Morning',
                content: 'Water your plants early in the morning (6-8 AM) to minimize evaporation and allow leaves to dry before evening.',
                icon: '💧'
            },
            {
                category: 'animal-rearing',
                title: 'Provide Clean Water Always',
                content: 'Ensure animals have access to clean, fresh water at all times. Change water daily to prevent disease.',
                icon: '💧'
            }
        ];
        const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
        return tips[dayOfYear % tips.length];
    }

    render() {
        const container = document.getElementById(this.containerId);
        if (!container || !this.currentTip) return;

        const categoryLabel = this.currentTip.category === 'gardening' ? 'Gardening' : 'Animal Rearing';
        const categoryColor = this.currentTip.category === 'gardening' ? 'success' : 'info';
        const categoryIcon = this.currentTip.category === 'gardening' ? '🌱' : '🐄';

        container.innerHTML = `
            <div class="card shadow-sm border-0 h-100">
                <div class="card-header bg-${categoryColor} bg-opacity-10 border-0 d-flex justify-content-between align-items-center">
                    <div>
                        <h5 class="card-title mb-0">
                            <i class="fas fa-lightbulb text-${categoryColor} me-2"></i>
                            Daily Farming Tip
                        </h5>
                        <small class="text-muted">${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</small>
                    </div>
                    <span class="badge bg-${categoryColor}">${categoryIcon} ${categoryLabel}</span>
                </div>
                <div class="card-body">
                    <div class="d-flex align-items-start mb-3">
                        <div class="display-4 me-3">${this.currentTip.icon || '💡'}</div>
                        <div class="flex-grow-1">
                            <h6 class="card-subtitle mb-2 text-muted">${this.currentTip.title}</h6>
                            <p class="card-text mb-0">${this.currentTip.content}</p>
                        </div>
                    </div>
                    ${this.currentTip.tags ? `
                        <div class="mt-3">
                            ${this.currentTip.tags.map(tag => `<span class="badge bg-secondary bg-opacity-25 me-1">#${tag}</span>`).join('')}
                        </div>
                    ` : ''}
                </div>
                    <div class="card-footer bg-transparent border-0 d-flex justify-content-between">
                    <button class="btn btn-sm btn-outline-primary" onclick="dailyTipsWidget.loadNewTip()">
                        <i class="fas fa-sync-alt me-1"></i> New Tip
                    </button>
                    <button class="btn btn-sm btn-outline-secondary" onclick="dailyTipsWidget.viewAllTips()">
                        <i class="fas fa-list me-1"></i> View All
                    </button>
                </div>
                ${this.currentTip.crops || this.currentTip.livestockTypes ? `
                <div class="card-footer bg-transparent border-top">
                    <small class="text-muted">
                        <i class="fas fa-info-circle me-1"></i>
                        Tip personalized based on your ${this.currentTip.crops ? 'crops' : 'livestock'}
                    </small>
                </div>
                ` : ''}
            </div>
        `;
    }

    async loadNewTip() {
        try {
            // Try to get a new personalized tip first
            const personalizedTip = await this.loadPersonalizedTip();
            if (personalizedTip) {
                this.currentTip = personalizedTip;
                this.render();
                return;
            }

            // Fallback: Get a random tip from all available tips
            const response = await fetch(`${this.apiBaseUrl}/api/daily-tips/all`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success && data.tips && data.tips.length > 0) {
                    const randomIndex = Math.floor(Math.random() * data.tips.length);
                    this.currentTip = data.tips[randomIndex];
                    this.render();
                }
            }
        } catch (error) {
            console.error('Daily Tips: Error loading new tip', error);
            // Use fallback
            this.currentTip = this.getFallbackTip();
            this.render();
        }
    }

    viewAllTips() {
        // Open tips modal or navigate to tips page
        alert('View all tips feature coming soon! You can browse tips by category: Gardening or Animal Rearing.');
    }

    renderError() {
        const container = document.getElementById(this.containerId);
        if (!container) return;

        container.innerHTML = `
            <div class="card shadow-sm border-0">
                <div class="card-body text-center py-4">
                    <i class="fas fa-exclamation-triangle text-warning fa-2x mb-3"></i>
                    <p class="text-muted mb-0">Unable to load daily tip. Please try again later.</p>
                </div>
            </div>
        `;
    }
}

// Initialize when DOM is ready
let dailyTipsWidget;
document.addEventListener('DOMContentLoaded', function() {
    const tipsContainer = document.getElementById('daily-tips-widget');
    if (tipsContainer) {
        dailyTipsWidget = new DailyTipsWidget('daily-tips-widget');
    }
});

