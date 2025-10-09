/**
 * SmartFarm Error Reduction System
 * Aggressively reduces console errors and API call frequency
 */

(function() {
    'use strict';
    
    console.log('🛡️ SmartFarm Error Reduction System Active');
    
    // Track error counts to prevent spam
    const errorCounts = new Map();
    const maxErrorsPerType = 3; // Max 3 errors of same type
    
    // Suppress repetitive errors
    const originalConsoleError = console.error;
    const originalConsoleWarn = console.warn;
    
    console.error = function(...args) {
        const message = args.join(' ');
        const errorType = getErrorType(message);
        
        // Count errors of this type
        const count = errorCounts.get(errorType) || 0;
        errorCounts.set(errorType, count + 1);
        
        // Only log if under limit
        if (count < maxErrorsPerType) {
            originalConsoleError.apply(console, args);
        } else if (count === maxErrorsPerType) {
            originalConsoleError.apply(console, ['🚫 Suppressing further errors of type:', errorType]);
        }
    };
    
    console.warn = function(...args) {
        const message = args.join(' ');
        const errorType = getErrorType(message);
        
        // Count warnings of this type
        const count = errorCounts.get(errorType) || 0;
        errorCounts.set(errorType, count + 1);
        
        // Only log if under limit
        if (count < maxErrorsPerType) {
            originalConsoleWarn.apply(console, args);
        }
    };
    
    function getErrorType(message) {
        if (message.includes('CORS')) return 'CORS_ERROR';
        if (message.includes('Failed to fetch')) return 'NETWORK_ERROR';
        if (message.includes('502')) return 'SERVER_ERROR';
        if (message.includes('ResizeObserver')) return 'RESIZE_OBSERVER';
        if (message.includes('viewBox')) return 'SVG_ERROR';
        if (message.includes('Script error')) return 'SCRIPT_ERROR';
        return 'OTHER_ERROR';
    }
    
    // Reduce API call frequency
    const apiCallCache = new Map();
    const cacheTimeout = 300000; // 5 minutes
    
    // Override fetch to add caching
    const originalFetch = window.fetch;
    window.fetch = function(url, options = {}) {
        // Only cache GET requests
        if (options.method && options.method !== 'GET') {
            return originalFetch(url, options);
        }
        
        // Check cache
        const cacheKey = url + JSON.stringify(options);
        const cached = apiCallCache.get(cacheKey);
        
        if (cached && (Date.now() - cached.timestamp) < cacheTimeout) {
            console.log('📦 Using cached API response for:', url);
            return Promise.resolve(new Response(JSON.stringify(cached.data), {
                status: 200,
                headers: { 'Content-Type': 'application/json' }
            }));
        }
        
        // Make actual request
        return originalFetch(url, options).then(response => {
            if (response.ok) {
                // Clone response to cache
                response.clone().json().then(data => {
                    apiCallCache.set(cacheKey, {
                        data: data,
                        timestamp: Date.now()
                    });
                }).catch(() => {
                    // Ignore cache errors
                });
            }
            return response;
        });
    };
    
    // Reduce DOM query frequency
    const domCache = new Map();
    const originalGetElementById = document.getElementById;
    const originalQuerySelector = document.querySelector;
    
    document.getElementById = function(id) {
        if (domCache.has(id)) {
            const cached = domCache.get(id);
            if (cached.timestamp && (Date.now() - cached.timestamp) < 10000) { // 10 second cache
                return cached.element;
            }
        }
        
        const element = originalGetElementById.call(document, id);
        if (element) {
            domCache.set(id, {
                element: element,
                timestamp: Date.now()
            });
        }
        return element;
    };
    
    document.querySelector = function(selector) {
        if (domCache.has(selector)) {
            const cached = domCache.get(selector);
            if (cached.timestamp && (Date.now() - cached.timestamp) < 10000) { // 10 second cache
                return cached.element;
            }
        }
        
        const element = originalQuerySelector.call(document, selector);
        if (element) {
            domCache.set(selector, {
                element: element,
                timestamp: Date.now()
            });
        }
        return element;
    };
    
    // Clear caches periodically
    setInterval(() => {
        const now = Date.now();
        
        // Clear expired API cache
        for (const [key, value] of apiCallCache.entries()) {
            if ((now - value.timestamp) > cacheTimeout) {
                apiCallCache.delete(key);
            }
        }
        
        // Clear expired DOM cache
        for (const [key, value] of domCache.entries()) {
            if ((now - value.timestamp) > 10000) {
                domCache.delete(key);
            }
        }
        
        // Clear error counts
        errorCounts.clear();
        
        console.log('🧹 Caches cleared, error counts reset');
    }, 60000); // Every minute
    
    // Suppress unhandled promise rejections
    window.addEventListener('unhandledrejection', function(event) {
        const error = event.reason;
        if (error && (
            error.message && (
                error.message.includes('Failed to fetch') ||
                error.message.includes('CORS') ||
                error.message.includes('NetworkError')
            )
        )) {
            event.preventDefault();
            console.log('🚫 Suppressed unhandled promise rejection:', error.message);
        }
    });
    
    // Suppress uncaught errors
    window.addEventListener('error', function(event) {
        const error = event.error;
        if (error && (
            error.message && (
                error.message.includes('CORS') ||
                error.message.includes('ResizeObserver') ||
                error.message.includes('viewBox') ||
                error.message.includes('Script error')
            )
        )) {
            event.preventDefault();
            console.log('🚫 Suppressed uncaught error:', error.message);
        }
    });
    
    // Expose cache clearing function
    window.SmartFarmErrorReducer = {
        clearCaches: function() {
            apiCallCache.clear();
            domCache.clear();
            errorCounts.clear();
            console.log('🧹 All caches manually cleared');
        },
        
        getStats: function() {
            return {
                apiCacheSize: apiCallCache.size,
                domCacheSize: domCache.size,
                errorTypes: Object.fromEntries(errorCounts)
            };
        }
    };
    
})();
