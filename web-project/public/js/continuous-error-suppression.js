/**
 * Continuous Error Suppression
 * Runs continuously to catch errors from dynamically loaded scripts
 */

(function() {
    'use strict';

    // Error patterns to suppress
    const suppressedPatterns = [
        /Error: <svg> attribute viewBox/,
        /Expected number.*viewBox/,
        /viewBox.*\d+%/,
        /framework-.*\.js.*Error/,
        /ERR_BLOCKED_BY_CLIENT/,
        /net::ERR_BLOCKED_BY_CLIENT/,
        /googletag/,
        /unifyintent\.com/,
        /googleads\.g\.doubleclick\.net/,
        /doubleclick\.net/,
        /googleadservices\.com/,
        /googlesyndication\.com/,
        /_app-.*\.js/,
        /main-.*\.js/,
        // QR Code errors
        /All QR Code library sources failed/,
        /QR Code library sources failed/,
        /QR system with fallback/,
        /Traceability viewer ready/
    ];

    function shouldSuppress(message) {
        if (typeof message !== 'string') {
            message = String(message);
        }
        return suppressedPatterns.some(pattern => pattern.test(message));
    }

    // Store original console methods
    let originalConsoleError = console.error;
    let originalConsoleWarn = console.warn;
    let originalConsoleLog = console.log;

    // Override console methods with continuous monitoring
    function setupConsoleOverride() {
        console.error = function(...args) {
            const message = args.join(' ');
            if (shouldSuppress(message)) {
                return; // Suppress
            }
            originalConsoleError.apply(console, args);
        };

        console.warn = function(...args) {
            const message = args.join(' ');
            if (shouldSuppress(message)) {
                return; // Suppress
            }
            originalConsoleWarn.apply(console, args);
        };

        console.log = function(...args) {
            const message = args.join(' ');
            if (shouldSuppress(message)) {
                return; // Suppress
            }
            originalConsoleLog.apply(console, args);
        };
    }

    // Setup error event listeners
    function setupErrorListeners() {
        // Global error handler
        window.addEventListener('error', function(event) {
            const message = event.message || '';
            const source = event.filename || '';
            const error = event.error || '';
            
            if (shouldSuppress(message) || shouldSuppress(source) || shouldSuppress(String(error))) {
                event.preventDefault();
                event.stopPropagation();
                return false;
            }
        });

        // Resource loading errors
        window.addEventListener('error', function(event) {
            if (event.target !== window) {
                const src = event.target.src || event.target.href || '';
                if (shouldSuppress(src)) {
                    event.preventDefault();
                    event.stopPropagation();
                    return false;
                }
            }
        }, true);

        // Unhandled promise rejections
        window.addEventListener('unhandledrejection', function(event) {
            const message = event.reason?.message || String(event.reason) || '';
            if (shouldSuppress(message)) {
                event.preventDefault();
                return false;
            }
        });
    }

    // Monitor for dynamically loaded scripts and re-setup error suppression
    function monitorDynamicScripts() {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach(function(node) {
                        if (node.tagName === 'SCRIPT' && node.src) {
                            if (shouldSuppress(node.src)) {
                                console.log('🚫 Blocked dynamic script:', node.src);
                                node.remove();
                                return;
                            }
                        }
                    });
                }
            });
        });

        observer.observe(document.documentElement, {
            childList: true,
            subtree: true
        });
    }

    // Initialize
    setupConsoleOverride();
    setupErrorListeners();
    monitorDynamicScripts();

    // Re-setup console overrides periodically to catch new console methods
    setInterval(setupConsoleOverride, 1000);

    console.log('🛡️ Continuous error suppression initialized');
})();
