/**
 * SmartFarm Offline Mode
 * Provides fallback functionality when API is unavailable
 */

(function() {
    'use strict';
    
    console.log('📱 SmartFarm Offline Mode Active');
    
    // Check if we're online
    let isOnline = navigator.onLine;
    
    // Listen for online/offline events
    window.addEventListener('online', function() {
        isOnline = true;
        console.log('🌐 Back online - API calls will resume');
        hideOfflineBanner();
    });
    
    window.addEventListener('offline', function() {
        isOnline = false;
        console.log('📱 Gone offline - using cached data');
        showOfflineBanner();
    });
    
    // Show offline banner
    function showOfflineBanner() {
        const banner = document.createElement('div');
        banner.id = 'offline-banner';
        banner.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: #ff9800;
            color: white;
            padding: 10px;
            text-align: center;
            z-index: 9999;
            font-family: Arial, sans-serif;
            font-size: 14px;
        `;
        banner.innerHTML = `
            📱 You're offline - SmartFarm is using cached data
            <button onclick="hideOfflineBanner()" style="background: none; border: none; color: white; cursor: pointer; margin-left: 10px;">✕</button>
        `;
        
        document.body.appendChild(banner);
        document.body.style.paddingTop = '50px';
    }
    
    // Hide offline banner
    window.hideOfflineBanner = function() {
        const banner = document.getElementById('offline-banner');
        if (banner) {
            banner.remove();
            document.body.style.paddingTop = '0px';
        }
    };
    
    // Override SmartFarmAPI when offline
    if (typeof window.SmartFarmAPI !== 'undefined') {
        const originalRequest = window.SmartFarmAPI.request;
        
        window.SmartFarmAPI.request = function(endpoint, options = {}, retryCount = 0) {
            // If offline, return cached data
            if (!isOnline) {
                return getCachedData(endpoint);
            }
            
            // If online, make normal request
            return originalRequest.call(this, endpoint, options, retryCount);
        };
    }
    
    // Get cached data for offline mode
    function getCachedData(endpoint) {
        const cacheKey = 'smartfarm_cache_' + endpoint.replace(/[^a-zA-Z0-9]/g, '_');
        const cachedData = localStorage.getItem(cacheKey);
        
        if (cachedData) {
            try {
                const data = JSON.parse(cachedData);
                console.log('📦 Using cached data for offline mode:', endpoint);
                return Promise.resolve({
                    success: true,
                    data: data,
                    message: 'Offline mode - cached data',
                    offline: true
                });
            } catch (e) {
                console.warn('Failed to parse cached data:', e);
            }
        }
        
        // No cached data available
        return Promise.resolve({
            success: false,
            error: 'No cached data available for offline mode',
            offline: true
        });
    }
    
    // Cache data when API calls succeed
    if (typeof window.SmartFarmAPI !== 'undefined') {
        const originalRequest = window.SmartFarmAPI.request;
        
        window.SmartFarmAPI.request = function(endpoint, options = {}, retryCount = 0) {
            return originalRequest.call(this, endpoint, options, retryCount).then(response => {
                // Cache successful responses
                if (response.success && response.data) {
                    const cacheKey = 'smartfarm_cache_' + endpoint.replace(/[^a-zA-Z0-9]/g, '_');
                    try {
                        localStorage.setItem(cacheKey, JSON.stringify(response.data));
                    } catch (e) {
                        console.warn('Failed to cache data:', e);
                    }
                }
                return response;
            });
        };
    }
    
    // Provide sample data for common endpoints
    function getSampleData(endpoint) {
        const sampleData = {
            '/farms': [
                {
                    id: 1,
                    name: 'Green Valley Farm',
                    location: 'Sydney, Australia',
                    area: 25.5,
                    type: 'Mixed Agriculture'
                }
            ],
            '/crops': [
                {
                    id: 1,
                    name: 'Tomatoes',
                    variety: 'Cherry',
                    status: 'Growing',
                    plantedDate: '2024-01-15',
                    expectedHarvest: '2024-03-15'
                }
            ],
            '/livestock': [
                {
                    id: 1,
                    species: 'Cattle',
                    breed: 'Holstein',
                    status: 'Healthy',
                    age: 24,
                    weight: 450
                }
            ],
            '/analytics/dashboard': {
                totalCrops: 12,
                totalLivestock: 45,
                totalFields: 8,
                monthlyYield: 2.5
            }
        };
        
        return sampleData[endpoint] || null;
    }
    
    // Enhanced getCachedData with sample data fallback
    function getCachedData(endpoint) {
        const cacheKey = 'smartfarm_cache_' + endpoint.replace(/[^a-zA-Z0-9]/g, '_');
        const cachedData = localStorage.getItem(cacheKey);
        
        if (cachedData) {
            try {
                const data = JSON.parse(cachedData);
                return Promise.resolve({
                    success: true,
                    data: data,
                    message: 'Offline mode - cached data',
                    offline: true
                });
            } catch (e) {
                console.warn('Failed to parse cached data:', e);
            }
        }
        
        // Try sample data
        const sampleData = getSampleData(endpoint);
        if (sampleData) {
            return Promise.resolve({
                success: true,
                data: sampleData,
                message: 'Offline mode - sample data',
                offline: true,
                sample: true
            });
        }
        
        // No data available
        return Promise.resolve({
            success: false,
            error: 'No data available for offline mode',
            offline: true
        });
    }
    
    // Expose offline mode functions
    window.SmartFarmOfflineMode = {
        isOffline: () => !isOnline,
        getCachedData: getCachedData,
        clearCache: () => {
            const keys = Object.keys(localStorage);
            keys.forEach(key => {
                if (key.startsWith('smartfarm_cache_')) {
                    localStorage.removeItem(key);
                }
            });
            console.log('🧹 Offline cache cleared');
        }
    };
    
})();
