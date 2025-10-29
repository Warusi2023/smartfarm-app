/**
 * Server Connectivity Fix
 * Resolves "Server temporarily unavailable" issues and ensures backend connectivity
 */

(function() {
    'use strict';
    
    console.log('🔗 Server Connectivity Fix initialized');
    
    let isServerAvailable = false;
    let connectivityCheckInterval = null;
    let retryCount = 0;
    const maxRetries = 10;
    
    // Remove any existing server unavailable banners
    function removeServerBanners() {
        const banners = document.querySelectorAll('#server-unavailable-banner, .server-unavailable, .alert-danger');
        banners.forEach(banner => {
            if (banner.textContent.includes('Server temporarily unavailable') || 
                banner.textContent.includes('Some features may not work')) {
                banner.remove();
                console.log('🗑️ Removed server unavailable banner');
            }
        });
        
        // Remove body padding that might have been added
        document.body.style.paddingTop = '0px';
    }
    
    // Check server connectivity
    async function checkServerConnectivity() {
        try {
            const apiBaseUrl = getApiBaseUrl();
            const healthUrl = `${apiBaseUrl}/api/health`;
            
            console.log('🔍 Checking server connectivity:', healthUrl);
            
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
            
            const response = await fetch(healthUrl, {
                method: 'GET',
                mode: 'cors',
                credentials: 'include',
                signal: controller.signal,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            
            clearTimeout(timeoutId);
            
            if (response.ok) {
                const data = await response.json();
                console.log('✅ Server is available:', data);
                isServerAvailable = true;
                removeServerBanners();
                return true;
            } else {
                console.warn('⚠️ Server responded with status:', response.status);
                return false;
            }
            
        } catch (error) {
            console.warn('⚠️ Server connectivity check failed:', error.message);
            return false;
        }
    }
    
    // Get API base URL
    function getApiBaseUrl() {
        // Try multiple sources for API URL
        const sources = [
            window.SmartFarmApiConfig?.baseUrl,
            window.VITE_API_BASE_URL,
            window.VITE_API_URL,
            window.__SMARTFARM_API_BASE__,
            'https://smartfarm-app-production.up.railway.app',
            'https://smartfarm-backend.railway.app',
            'http://localhost:3000' // Fallback to local
        ];
        
        for (const url of sources) {
            if (url && url.startsWith('http')) {
                console.log('🔗 Using API URL:', url);
                return url;
            }
        }
        
        console.warn('⚠️ No valid API URL found, using localhost fallback');
        return 'http://localhost:3000';
    }
    
    // Start connectivity monitoring
    function startConnectivityMonitoring() {
        // Check immediately
        checkServerConnectivity();
        
        // Check every 30 seconds
        connectivityCheckInterval = setInterval(async () => {
            const isAvailable = await checkServerConnectivity();
            
            if (isAvailable) {
                retryCount = 0; // Reset retry count on success
            } else {
                retryCount++;
                
                // Show banner only after multiple failures
                if (retryCount >= 3 && !document.querySelector('#server-unavailable-banner')) {
                    showServerUnavailableBanner();
                }
            }
        }, 30000);
        
        console.log('🔄 Started server connectivity monitoring');
    }
    
    // Show server unavailable banner (only when truly needed)
    function showServerUnavailableBanner() {
        // Don't show if already present
        if (document.querySelector('#server-unavailable-banner')) {
            return;
        }
        
        const banner = document.createElement('div');
        banner.id = 'server-unavailable-banner';
        banner.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: #ff6b6b;
            color: white;
            padding: 10px;
            text-align: center;
            z-index: 9999;
            font-family: Arial, sans-serif;
            font-size: 14px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.3);
        `;
        
        banner.innerHTML = `
            ⚠️ Server temporarily unavailable. Some features may not work.
            <button onclick="this.parentElement.remove(); document.body.style.paddingTop='0px';" 
                    style="background: none; border: none; color: white; cursor: pointer; margin-left: 10px; font-size: 16px;">
                ✕
            </button>
        `;
        
        document.body.style.paddingTop = '50px';
        document.body.insertBefore(banner, document.body.firstChild);
        
        // Auto-remove after 10 seconds
        setTimeout(() => {
            if (banner.parentElement) {
                banner.remove();
                document.body.style.paddingTop = '0px';
            }
        }, 10000);
    }
    
    // Enhanced API request with automatic retry
    function enhanceApiRequests() {
        // Override fetch to add automatic retry logic
        const originalFetch = window.fetch;
        
        window.fetch = async function(url, options = {}) {
            // Only enhance API requests
            if (typeof url === 'string' && url.includes('/api/')) {
                const maxRetries = 2;
                let lastError;
                
                for (let attempt = 0; attempt <= maxRetries; attempt++) {
                    try {
                        const response = await originalFetch(url, options);
                        
                        // If successful, mark server as available
                        if (response.ok) {
                            isServerAvailable = true;
                            removeServerBanners();
                        }
                        
                        return response;
                        
                    } catch (error) {
                        lastError = error;
                        
                        if (attempt < maxRetries) {
                            console.log(`🔄 API request failed, retrying (attempt ${attempt + 1}/${maxRetries + 1})`);
                            await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
                        }
                    }
                }
                
                // All retries failed
                console.error('❌ API request failed after all retries:', lastError);
                isServerAvailable = false;
                throw lastError;
            }
            
            // For non-API requests, use original fetch
            return originalFetch(url, options);
        };
    }
    
    // Fix livestock saving specifically
    function fixLivestockSaving() {
        // Don't intercept onclick handlers - let them work normally
        // Only monitor for actual form submissions
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', async function(e) {
                const button = e.submitter || form.querySelector('button[type="submit"]');
                if (button && (button.textContent.includes('Save Animal') || button.textContent.includes('Add Livestock'))) {
                    // Only prevent form submission, not onclick handlers
                    // Let onclick handlers work normally
                    console.log('🐄 Form submission detected - checking server connectivity');
                    
                    const isServerReady = await checkServerConnectivity();
                    
                    if (!isServerReady) {
                        console.log('⚠️ Server not ready, preventing form submission');
                        e.preventDefault();
                        showSaveError();
                        return false;
                    }
                    
                    console.log('✅ Server is ready, allowing form submission');
                }
            });
        });
        
        function showSaveError() {
            const alertContainer = document.querySelector('#alertContainer') || 
                                 document.querySelector('.alert-container') ||
                                 createAlertContainer();
            
            alertContainer.innerHTML = `
                <div class="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>Server Connection Issue:</strong> Unable to save livestock data. 
                    The server is currently unavailable. Please try again in a few moments.
                    <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
                </div>
            `;
        }
        
        function createAlertContainer() {
            const container = document.createElement('div');
            container.id = 'alertContainer';
            container.className = 'alert-container';
            container.style.cssText = `
                position: fixed;
                top: 60px;
                left: 20px;
                right: 20px;
                z-index: 1050;
            `;
            document.body.appendChild(container);
            return container;
        }
    }
    
    // Initialize all fixes
    function initialize() {
        console.log('🚀 Initializing server connectivity fixes...');
        
        // Remove any existing banners immediately
        removeServerBanners();
        
        // Enhance API requests
        enhanceApiRequests();
        
        // Fix livestock saving
        fixLivestockSaving();
        
        // Start monitoring
        startConnectivityMonitoring();
        
        console.log('✅ Server connectivity fixes initialized');
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
    
    // Export for global access
    window.SmartFarmServerFix = {
        checkConnectivity: checkServerConnectivity,
        removeBanners: removeServerBanners,
        isServerAvailable: () => isServerAvailable
    };
    
})();
