/**
 * Ad Error Handler
 * Handles and suppresses errors from third-party ad scripts
 */

(function() {
    'use strict';

    // Store original console methods
    const originalConsoleError = console.error;
    const originalConsoleWarn = console.warn;

    // Error patterns to suppress
    const suppressedPatterns = [
        /ERR_BLOCKED_BY_CLIENT/,
        /net::ERR_BLOCKED_BY_CLIENT/,
        /googletag/,
        /unifyintent\.com/,
        /googleads\.g\.doubleclick\.net/,
        /adsbygoogle/,
        /framework-.*\.js.*Error/,
        /viewBox.*Expected number/,
        /POST.*analytics.*net::ERR_BLOCKED_BY_CLIENT/,
        /doubleclick\.net/,
        /googleadservices\.com/,
        /googlesyndication\.com/,
        /_app-.*\.js/,
        /main-.*\.js/,
        /framework-.*\.js/
    ];

    // Check if error should be suppressed
    function shouldSuppress(message) {
        if (typeof message !== 'string') {
            message = String(message);
        }
        
        return suppressedPatterns.some(pattern => pattern.test(message));
    }

    // Override console.error
    console.error = function(...args) {
        const message = args.join(' ');
        
        if (shouldSuppress(message)) {
            // Suppress ad-related errors
            return;
        }
        
        // Log legitimate errors
        originalConsoleError.apply(console, args);
    };

    // Override console.warn
    console.warn = function(...args) {
        const message = args.join(' ');
        
        if (shouldSuppress(message)) {
            // Suppress ad-related warnings
            return;
        }
        
        // Log legitimate warnings
        originalConsoleWarn.apply(console, args);
    };

    // Handle uncaught errors
    window.addEventListener('error', function(event) {
        const message = event.message || '';
        const source = event.filename || '';
        
        if (shouldSuppress(message) || shouldSuppress(source)) {
            event.preventDefault();
            event.stopPropagation();
            return false;
        }
    });

    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', function(event) {
        const message = event.reason?.message || String(event.reason) || '';
        
        if (shouldSuppress(message)) {
            event.preventDefault();
            return false;
        }
    });

    // Handle fetch errors
    const originalFetch = window.fetch;
    window.fetch = function(...args) {
        return originalFetch.apply(this, args).catch(error => {
            const message = error.message || '';
            
            if (shouldSuppress(message)) {
                // Return a rejected promise that won't be logged
                return Promise.reject(new Error('Request blocked'));
            }
            
            throw error;
        });
    };

    console.log('🛡️ Ad error handler initialized - suppressing third-party ad errors');
})();
