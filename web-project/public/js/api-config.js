/**
 * SmartFarm API Configuration - Single Source of Truth
 * All API calls MUST use this configuration
 * 
 * ⚠️ IMPORTANT: This file is auto-generated from shared-api-config.json
 * To modify API endpoints, update shared-api-config.json and run:
 *   .\generate-api-code.ps1
 * 
 * For synchronization, see: WEB_ANDROID_SYNC_GUIDE.md
 */

(function() {
    'use strict';
    
    /**
     * Canonical Backend URL
     * IMPORTANT: Change this ONE place to update entire frontend
     */
    const PRODUCTION_API_BASE = 'https://web-production-86d39.up.railway.app';
    
    /**
     * Get API Base URL from environment or use production default
     */
    function getApiBaseUrl() {
        // BASE_API_ORIGIN only (no /api suffix). See js/api-origin.js and WEB_RELEASE_CHECKLIST.md.
        const envUrl = window.VITE_API_BASE_URL ||
                      window.VITE_API_URL ||
                      (window).__SMARTFARM_API_BASE__ ||
                      null;

        if (envUrl) {
            const origin = window.SmartFarmApiOrigin
                ? window.SmartFarmApiOrigin.normalizeApiOrigin(envUrl)
                : envUrl.replace(/\/+$/, '').replace(/\/api$/i, '');
            console.log('[API Config] Using environment URL (normalized origin):', origin || envUrl);
            return origin || PRODUCTION_API_BASE;
        }

        console.log('[API Config] Using production URL:', PRODUCTION_API_BASE);
        return window.SmartFarmApiOrigin
            ? window.SmartFarmApiOrigin.normalizeApiOrigin(PRODUCTION_API_BASE)
            : PRODUCTION_API_BASE;
    }

    /**
     * Build full API URL for endpoint path (e.g. /api/health or health).
     */
    function buildApiUrl(path) {
        const origin = getApiBaseUrl();
        if (window.SmartFarmApiOrigin) {
            return window.SmartFarmApiOrigin.joinApiPath(origin, path || '');
        }
        const cleanPath = (path || '').replace(/^\//, '');
        const cleanBase = origin.replace(/\/$/, '');
        if (cleanPath.startsWith('api/') || cleanPath === 'api') {
            return cleanBase + '/' + cleanPath;
        }
        return cleanBase + '/api/' + cleanPath;
    }
    
    /**
     * Global API Configuration Object
     */
    window.SmartFarmApiConfig = {
        // Base URL
        baseUrl: getApiBaseUrl(),
        
        // Build full URL for endpoint
        url: buildApiUrl,
        
        // Health check endpoint
        healthUrl: buildApiUrl('/api/health'),
        
        // Auth endpoints
        loginUrl: buildApiUrl('/api/auth/login'),
        registerUrl: buildApiUrl('/api/auth/register'),
        logoutUrl: buildApiUrl('/api/auth/logout'),
        
        // Resource endpoints
        farmsUrl: buildApiUrl('/api/farms'),
        cropsUrl: buildApiUrl('/api/crops'),
        livestockUrl: buildApiUrl('/api/livestock'),
        
        // Debug info
        debug() {
            console.log('=== SmartFarm API Configuration ===');
            console.log('Base URL:', this.baseUrl);
            console.log('Health URL:', this.healthUrl);
            console.log('Environment:', {
                VITE_API_BASE_URL: window.VITE_API_BASE_URL,
                VITE_API_URL: window.VITE_API_URL,
                __SMARTFARM_API_BASE__: (window).__SMARTFARM_API_BASE__,
            });
            console.log('===================================');
        },
        
        // Validate configuration
        isValid() {
            const url = this.baseUrl;
            if (!url) {
                console.error('[API Config] Base URL is not set!');
                return false;
            }
            if (!url.startsWith('http')) {
                console.error('[API Config] Base URL must start with http:// or https://');
                return false;
            }
            return true;
        }
    };
    
    // Auto-validate on load
    if (!window.SmartFarmApiConfig.isValid()) {
        console.error('[API Config] Configuration validation failed!');
    }
    
    // Auto-debug in development
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        window.SmartFarmApiConfig.debug();
    }
    
    // Make configuration read-only
    Object.freeze(window.SmartFarmApiConfig);
    
})();

