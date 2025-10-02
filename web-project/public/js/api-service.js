/**
 * SmartFarm API Service
 * Centralized API integration for all frontend operations
 */

class SmartFarmAPIService {
    constructor() {
        this.baseURL = window.SmartFarmConfig?.API_BASE_URL || 'https://smartfarm-app-production.up.railway.app';
        this.authToken = this.getAuthToken();
        this.setupInterceptors();
    }

    // Authentication token management
    getAuthToken() {
        return localStorage.getItem('smartfarm_token') || sessionStorage.getItem('smartfarm_token');
    }

    setAuthToken(token) {
        if (token) {
            localStorage.setItem('smartfarm_token', token);
            this.authToken = token;
        }
    }

    clearAuthToken() {
        localStorage.removeItem('smartfarm_token');
        sessionStorage.removeItem('smartfarm_token');
        this.authToken = null;
    }

    // Setup request/response interceptors
    setupInterceptors() {
        // This will be used for automatic token refresh, error handling, etc.
    }

    // Generic API request method
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}/api${endpoint}`;
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        };

        // Add authentication token if available
        if (this.authToken) {
            config.headers.Authorization = `Bearer ${this.authToken}`;
        }

        try {
            const response = await fetch(url, config);
            const data = await response.json();

            // Handle authentication errors
            if (response.status === 401) {
                this.clearAuthToken();
                window.location.href = '/login.html';
                return { success: false, error: 'Authentication required' };
            }

            // Handle other HTTP errors
            if (!response.ok) {
                throw new Error(data.error || `HTTP ${response.status}: ${response.statusText}`);
            }

            return data;
        } catch (error) {
            console.error('API Request failed:', error);
            return {
                success: false,
                error: error.message || 'Network error occurred'
            };
        }
    }

    // Authentication API
    async login(email, password, rememberMe = false) {
        const response = await this.request('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password, rememberMe })
        });

        if (response.success && response.data?.token) {
            this.setAuthToken(response.data.token);
            if (rememberMe) {
                localStorage.setItem('smartfarm_user', JSON.stringify(response.data.user));
            } else {
                sessionStorage.setItem('smartfarm_user', JSON.stringify(response.data.user));
            }
        }

        return response;
    }

    async register(userData) {
        return await this.request('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData)
        });
    }

    async logout() {
        const response = await this.request('/auth/logout', {
            method: 'POST'
        });
        this.clearAuthToken();
        localStorage.removeItem('smartfarm_user');
        sessionStorage.removeItem('smartfarm_user');
        return response;
    }

    // Farm Management API
    async getFarms(params = {}) {
        const queryString = new URLSearchParams(params).toString();
        return await this.request(`/farms${queryString ? '?' + queryString : ''}`);
    }

    async getFarm(id) {
        return await this.request(`/farms/${id}`);
    }

    async createFarm(farmData) {
        return await this.request('/farms', {
            method: 'POST',
            body: JSON.stringify(farmData)
        });
    }

    async updateFarm(id, farmData) {
        return await this.request(`/farms/${id}`, {
            method: 'PUT',
            body: JSON.stringify(farmData)
        });
    }

    async deleteFarm(id) {
        return await this.request(`/farms/${id}`, {
            method: 'DELETE'
        });
    }

    async getFarmAnalytics(id) {
        return await this.request(`/farms/${id}/analytics`);
    }

    async getFarmStats() {
        return await this.request('/farms/stats/overview');
    }

    // Crop Management API
    async getCrops(params = {}) {
        const queryString = new URLSearchParams(params).toString();
        return await this.request(`/crops${queryString ? '?' + queryString : ''}`);
    }

    async getCrop(id) {
        return await this.request(`/crops/${id}`);
    }

    async createCrop(cropData) {
        return await this.request('/crops', {
            method: 'POST',
            body: JSON.stringify(cropData)
        });
    }

    async updateCrop(id, cropData) {
        return await this.request(`/crops/${id}`, {
            method: 'PUT',
            body: JSON.stringify(cropData)
        });
    }

    async deleteCrop(id) {
        return await this.request(`/crops/${id}`, {
            method: 'DELETE'
        });
    }

    async updateCropStatus(id, status, notes = '') {
        return await this.request(`/crops/${id}/status`, {
            method: 'PATCH',
            body: JSON.stringify({ status, notes })
        });
    }

    async getCropAnalytics(id) {
        return await this.request(`/crops/${id}/analytics`);
    }

    async getCropStats() {
        return await this.request('/crops/stats/overview');
    }

    // Livestock Management API
    async getLivestock(params = {}) {
        const queryString = new URLSearchParams(params).toString();
        return await this.request(`/livestock${queryString ? '?' + queryString : ''}`);
    }

    async getLivestockItem(id) {
        return await this.request(`/livestock/${id}`);
    }

    async createLivestock(livestockData) {
        return await this.request('/livestock', {
            method: 'POST',
            body: JSON.stringify(livestockData)
        });
    }

    async updateLivestock(id, livestockData) {
        return await this.request(`/livestock/${id}`, {
            method: 'PUT',
            body: JSON.stringify(livestockData)
        });
    }

    async deleteLivestock(id) {
        return await this.request(`/livestock/${id}`, {
            method: 'DELETE'
        });
    }

    async updateLivestockStatus(id, status, notes = '') {
        return await this.request(`/livestock/${id}/status`, {
            method: 'PATCH',
            body: JSON.stringify({ status, notes })
        });
    }

    async getLivestockAnalytics(id) {
        return await this.request(`/livestock/${id}/analytics`);
    }

    async getLivestockStats() {
        return await this.request('/livestock/stats/overview');
    }

    // Inventory Management API
    async getInventory(params = {}) {
        const queryString = new URLSearchParams(params).toString();
        return await this.request(`/inventory${queryString ? '?' + queryString : ''}`);
    }

    async getInventoryItem(id) {
        return await this.request(`/inventory/${id}`);
    }

    async createInventoryItem(inventoryData) {
        return await this.request('/inventory', {
            method: 'POST',
            body: JSON.stringify(inventoryData)
        });
    }

    async updateInventoryItem(id, inventoryData) {
        return await this.request(`/inventory/${id}`, {
            method: 'PUT',
            body: JSON.stringify(inventoryData)
        });
    }

    async deleteInventoryItem(id) {
        return await this.request(`/inventory/${id}`, {
            method: 'DELETE'
        });
    }

    // Task Management API
    async getTasks(params = {}) {
        const queryString = new URLSearchParams(params).toString();
        return await this.request(`/tasks${queryString ? '?' + queryString : ''}`);
    }

    async getTask(id) {
        return await this.request(`/tasks/${id}`);
    }

    async createTask(taskData) {
        return await this.request('/tasks', {
            method: 'POST',
            body: JSON.stringify(taskData)
        });
    }

    async updateTask(id, taskData) {
        return await this.request(`/tasks/${id}`, {
            method: 'PUT',
            body: JSON.stringify(taskData)
        });
    }

    async deleteTask(id) {
        return await this.request(`/tasks/${id}`, {
            method: 'DELETE'
        });
    }

    async updateTaskStatus(id, status, notes = '') {
        return await this.request(`/tasks/${id}/status`, {
            method: 'PATCH',
            body: JSON.stringify({ status, notes })
        });
    }

    // Financial Records API
    async getFinancialRecords(params = {}) {
        const queryString = new URLSearchParams(params).toString();
        return await this.request(`/financial${queryString ? '?' + queryString : ''}`);
    }

    async getFinancialRecord(id) {
        return await this.request(`/financial/${id}`);
    }

    async createFinancialRecord(financialData) {
        return await this.request('/financial', {
            method: 'POST',
            body: JSON.stringify(financialData)
        });
    }

    async updateFinancialRecord(id, financialData) {
        return await this.request(`/financial/${id}`, {
            method: 'PUT',
            body: JSON.stringify(financialData)
        });
    }

    async deleteFinancialRecord(id) {
        return await this.request(`/financial/${id}`, {
            method: 'DELETE'
        });
    }

    // Weather API
    async getWeatherData(farmId) {
        return await this.request(`/weather/${farmId}`);
    }

    async getWeatherForecast(farmId, days = 7) {
        return await this.request(`/weather/${farmId}/forecast?days=${days}`);
    }

    // Analytics API
    async getAnalytics(params = {}) {
        const queryString = new URLSearchParams(params).toString();
        return await this.request(`/analytics${queryString ? '?' + queryString : ''}`);
    }

    async getDashboardData() {
        return await this.request('/analytics/dashboard');
    }

    // AI Advisory API
    async getAIRecommendations(farmId, type = 'general') {
        return await this.request(`/ai-advisory/recommendations?farmId=${farmId}&type=${type}`);
    }

    async getCropDiagnosis(cropData) {
        return await this.request('/ai-advisory/crop-diagnosis', {
            method: 'POST',
            body: JSON.stringify(cropData)
        });
    }

    async getLivestockDiagnosis(livestockData) {
        return await this.request('/ai-advisory/livestock-diagnosis', {
            method: 'POST',
            body: JSON.stringify(livestockData)
        });
    }

    // Geofencing API
    async getGeofences(farmId) {
        return await this.request(`/geofencing?farmId=${farmId}`);
    }

    async createGeofence(geofenceData) {
        return await this.request('/geofencing', {
            method: 'POST',
            body: JSON.stringify(geofenceData)
        });
    }

    async updateGeofence(id, geofenceData) {
        return await this.request(`/geofencing/${id}`, {
            method: 'PUT',
            body: JSON.stringify(geofenceData)
        });
    }

    async deleteGeofence(id) {
        return await this.request(`/geofencing/${id}`, {
            method: 'DELETE'
        });
    }

    // QR Code & Traceability API
    async generateQRCode(productData) {
        return await this.request('/byproducts/qr-generate', {
            method: 'POST',
            body: JSON.stringify(productData)
        });
    }

    async getTraceabilityData(qrCode) {
        return await this.request(`/byproducts/traceability/${qrCode}`);
    }

    // Watering System API
    async getWateringSchedules(farmId) {
        return await this.request(`/watering/schedules?farmId=${farmId}`);
    }

    async createWateringSchedule(scheduleData) {
        return await this.request('/watering/schedules', {
            method: 'POST',
            body: JSON.stringify(scheduleData)
        });
    }

    async updateWateringSchedule(id, scheduleData) {
        return await this.request(`/watering/schedules/${id}`, {
            method: 'PUT',
            body: JSON.stringify(scheduleData)
        });
    }

    async executeWatering(scheduleId) {
        return await this.request(`/watering/schedules/${scheduleId}/execute`, {
            method: 'POST'
        });
    }

    // Subscription Management API
    async getSubscription() {
        return await this.request('/subscriptions/current');
    }

    async updateSubscription(subscriptionData) {
        return await this.request('/subscriptions', {
            method: 'PUT',
            body: JSON.stringify(subscriptionData)
        });
    }

    async cancelSubscription() {
        return await this.request('/subscriptions/cancel', {
            method: 'POST'
        });
    }

    // Utility methods
    async healthCheck() {
        return await this.request('/health');
    }

    async getSystemStatus() {
        return await this.request('/health');
    }

    // Error handling helper
    handleError(error, context = '') {
        console.error(`API Error ${context}:`, error);
        
        if (window.SmartFarmLogger) {
            window.SmartFarmLogger.error(`API Error ${context}:`, error);
        }

        return {
            success: false,
            error: error.message || 'An unexpected error occurred',
            context
        };
    }

    // Loading state management
    showLoading(elementId) {
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = '<div class="text-center"><i class="fas fa-spinner fa-spin fa-2x"></i><br>Loading...</div>';
        }
    }

    hideLoading(elementId, content = '') {
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = content;
        }
    }

    // Success/Error message helpers
    showSuccessMessage(message) {
        if (window.showNotification) {
            window.showNotification(message, 'success');
        } else {
            alert(message);
        }
    }

    showErrorMessage(message) {
        if (window.showNotification) {
            window.showNotification(message, 'error');
        } else {
            alert(message);
        }
    }
}

// Initialize global API service
window.SmartFarmAPI = new SmartFarmAPIService();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SmartFarmAPIService;
}
