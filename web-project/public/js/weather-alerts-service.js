/**
 * Weather Alerts Service
 * Client-side service for managing weather alerts
 * Shared logic that works for both web and can be adapted for Android
 */

class WeatherAlertsService {
    constructor() {
        this.baseURL = window.SmartFarmApiConfig?.baseUrl || 
                      window.SmartFarmConfig?.getApiUrl('') || 
                      'https://smartfarm-app-production.up.railway.app';
        this.alertsCache = null;
        this.cacheTimestamp = null;
        this.cacheDuration = 60000; // 1 minute cache
    }

    /**
     * Get API URL for weather alerts endpoints
     */
    getApiUrl(endpoint) {
        const base = this.baseURL.replace(/\/$/, '');
        const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
        return `${base}/api/weather-alerts${path}`;
    }

    /**
     * Get authentication token
     */
    getAuthToken() {
        return localStorage.getItem('auth_token') || 
               sessionStorage.getItem('auth_token') || 
               null;
    }

    /**
     * Make authenticated API request
     */
    async request(endpoint, options = {}) {
        const url = this.getApiUrl(endpoint);
        const token = this.getAuthToken();

        const config = {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...(token && { 'Authorization': `Bearer ${token}` }),
                ...options.headers
            }
        };

        try {
            const response = await fetch(url, config);
            
            if (response.status === 401) {
                // Token expired, redirect to login
                window.location.href = '/login.html';
                throw new Error('Authentication required');
            }

            if (!response.ok) {
                // Handle 404 gracefully (route might not be deployed yet)
                if (response.status === 404) {
                    console.warn('Weather alerts API endpoint not found (404) - route may not be deployed yet');
                    return {
                        success: false,
                        error: 'Weather alerts service is not available',
                        data: []
                    };
                }
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || `HTTP ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            console.error(`Weather alerts API error (${endpoint}):`, error);
            throw error;
        }
    }

    /**
     * Get all alerts for the current user
     */
    async getAlerts(options = {}) {
        const { farmId, unreadOnly, limit } = options;
        
        // Check cache
        if (this.alertsCache && this.cacheTimestamp) {
            const cacheAge = Date.now() - this.cacheTimestamp;
            if (cacheAge < this.cacheDuration && !unreadOnly) {
                return this.alertsCache;
            }
        }

        try {
            const params = new URLSearchParams();
            if (farmId) params.append('farmId', farmId);
            if (unreadOnly) params.append('unreadOnly', 'true');
            if (limit) params.append('limit', limit);

            const endpoint = params.toString() ? `?${params.toString()}` : '';
            const response = await this.request(endpoint);

            if (response.success) {
                // Cache the result
                if (!unreadOnly) {
                    this.alertsCache = response;
                    this.cacheTimestamp = Date.now();
                }
                return response;
            }

            throw new Error(response.error || 'Failed to fetch alerts');
        } catch (error) {
            console.error('Error fetching alerts:', error);
            return {
                success: false,
                error: error.message,
                data: []
            };
        }
    }

    /**
     * Get alert statistics
     */
    async getStats() {
        try {
            const response = await this.request('/stats');
            return response;
        } catch (error) {
            console.error('Error fetching alert stats:', error);
            return {
                success: false,
                error: error.message,
                data: {
                    total: 0,
                    unread: 0,
                    critical: 0,
                    high: 0,
                    upcoming: 0
                }
            };
        }
    }

    /**
     * Get a specific alert
     */
    async getAlert(alertId) {
        try {
            const response = await this.request(`/${alertId}`);
            return response;
        } catch (error) {
            console.error('Error fetching alert:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * Mark alert as read
     */
    async markAsRead(alertId) {
        try {
            const response = await this.request(`/${alertId}/read`, {
                method: 'PATCH'
            });
            
            // Invalidate cache
            this.alertsCache = null;
            this.cacheTimestamp = null;
            
            return response;
        } catch (error) {
            console.error('Error marking alert as read:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * Dismiss an alert
     */
    async dismissAlert(alertId) {
        try {
            const response = await this.request(`/${alertId}/dismiss`, {
                method: 'PATCH'
            });
            
            // Invalidate cache
            this.alertsCache = null;
            this.cacheTimestamp = null;
            
            return response;
        } catch (error) {
            console.error('Error dismissing alert:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * Mark that action was taken on an alert
     */
    async markActionTaken(alertId, actionNotes) {
        try {
            const response = await this.request(`/${alertId}/action`, {
                method: 'PATCH',
                body: JSON.stringify({ actionNotes })
            });
            
            // Invalidate cache
            this.alertsCache = null;
            this.cacheTimestamp = null;
            
            return response;
        } catch (error) {
            console.error('Error marking action taken:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * Get alert preferences
     */
    async getPreferences() {
        try {
            const response = await this.request('/preferences');
            return response;
        } catch (error) {
            console.error('Error fetching preferences:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * Update alert preferences
     */
    async updatePreferences(preferences) {
        try {
            const response = await this.request('/preferences', {
                method: 'PUT',
                body: JSON.stringify(preferences)
            });
            return response;
        } catch (error) {
            console.error('Error updating preferences:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * Manually trigger alert generation (for testing)
     */
    async generateAlerts() {
        try {
            const response = await this.request('/generate', {
                method: 'POST'
            });
            
            // Invalidate cache
            this.alertsCache = null;
            this.cacheTimestamp = null;
            
            return response;
        } catch (error) {
            console.error('Error generating alerts:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    /**
     * Format alert severity for display
     */
    getSeverityClass(severity) {
        const classes = {
            low: 'alert-low',
            medium: 'alert-medium',
            high: 'alert-high',
            critical: 'alert-critical'
        };
        return classes[severity] || 'alert-medium';
    }

    /**
     * Format alert type for display
     */
    getAlertTypeIcon(alertType) {
        const icons = {
            heavy_rain: '🌧️',
            frost: '❄️',
            heat_stress: '🌡️',
            strong_wind: '💨',
            drought: '☀️'
        };
        return icons[alertType] || '⚠️';
    }

    /**
     * Format expected time for display
     */
    formatExpectedTime(expectedTime) {
        const date = new Date(expectedTime);
        const now = new Date();
        const diffMs = date - now;
        const diffHours = Math.round(diffMs / (1000 * 60 * 60));

        if (diffHours < 0) {
            return 'Past';
        } else if (diffHours < 1) {
            return 'Within 1 hour';
        } else if (diffHours < 24) {
            return `In ${diffHours} hours`;
        } else {
            const diffDays = Math.round(diffHours / 24);
            return `In ${diffDays} days`;
        }
    }
}

// Create global instance
window.WeatherAlertsService = WeatherAlertsService;
window.weatherAlertsService = new WeatherAlertsService();

