/**
 * SmartFarm Error Boundary
 * Catches JavaScript errors and provides fallback UI
 */

class SmartFarmErrorBoundary {
    constructor() {
        this.errorCount = 0;
        this.maxErrors = 5;
        this.errorTimeout = 30000; // 30 seconds
        this.lastErrorTime = 0;
        
        this.init();
    }

    init() {
        // Global error handlers
        window.addEventListener('error', (event) => {
            this.handleError(event.error, 'Global Error', event);
        });

        window.addEventListener('unhandledrejection', (event) => {
            this.handleError(event.reason, 'Unhandled Promise Rejection', event);
        });

        // DOM error handler
        document.addEventListener('DOMContentLoaded', () => {
            this.setupDOMErrorHandling();
        });
    }

    /**
     * Handle JavaScript errors
     * @param {Error} error - The error object
     * @param {string} type - Error type
     * @param {Event} event - Original event
     */
    handleError(error, type, event) {
        const now = Date.now();
        
        // Rate limiting
        if (now - this.lastErrorTime < this.errorTimeout) {
            this.errorCount++;
        } else {
            this.errorCount = 1;
        }
        
        this.lastErrorTime = now;

        // Log error
        if (window.SmartFarmLogger) {
            window.SmartFarmLogger.error(`${type}:`, error);
        } else {
            console.error(`[SmartFarm] ${type}:`, error);
        }

        // Show error UI if too many errors
        if (this.errorCount >= this.maxErrors) {
            this.showErrorUI(error, type);
        }

        // Prevent default error handling
        if (event && event.preventDefault) {
            event.preventDefault();
        }

        return false;
    }

    /**
     * Setup DOM error handling
     */
    setupDOMErrorHandling() {
        // Monitor for failed image loads
        document.addEventListener('error', (event) => {
            if (event.target.tagName === 'IMG') {
                this.handleImageError(event.target);
            }
        }, true);

        // Monitor for failed script loads
        document.addEventListener('error', (event) => {
            if (event.target.tagName === 'SCRIPT') {
                this.handleScriptError(event.target);
            }
        }, true);
    }

    /**
     * Handle image load errors
     * @param {HTMLImageElement} img - Failed image element
     */
    handleImageError(img) {
        if (window.SmartFarmLogger) {
            window.SmartFarmLogger.warn('Image failed to load:', img.src);
        }
        
        // Set fallback image
        img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDQgOUwxMC45MSA4LjI2TDEyIDJaIiBmaWxsPSIjNjY2Ii8+Cjwvc3ZnPgo=';
        img.alt = 'Image failed to load';
    }

    /**
     * Handle script load errors
     * @param {HTMLScriptElement} script - Failed script element
     */
    handleScriptError(script) {
        if (window.SmartFarmLogger) {
            window.SmartFarmLogger.error('Script failed to load:', script.src);
        }
        
        // Try to load from alternative CDN
        this.loadScriptFromAlternativeCDN(script);
    }

    /**
     * Load script from alternative CDN
     * @param {HTMLScriptElement} originalScript - Original failed script
     */
    loadScriptFromAlternativeCDN(originalScript) {
        const script = document.createElement('script');
        script.src = originalScript.src;
        script.onerror = () => {
            if (window.SmartFarmLogger) {
                window.SmartFarmLogger.error('All CDN sources failed for script:', originalScript.src);
            }
        };
        script.onload = () => {
            if (window.SmartFarmLogger) {
                window.SmartFarmLogger.success('Script loaded from alternative CDN:', originalScript.src);
            }
        };
        document.head.appendChild(script);
    }

    /**
     * Show error UI
     * @param {Error} error - The error object
     * @param {string} type - Error type
     */
    showErrorUI(error, type) {
        // Remove existing error UI
        const existingError = document.getElementById('smartfarm-error-boundary');
        if (existingError) {
            existingError.remove();
        }

        // Create error UI
        const errorDiv = document.createElement('div');
        errorDiv.id = 'smartfarm-error-boundary';
        errorDiv.innerHTML = `
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                background: #dc3545;
                color: white;
                padding: 15px;
                z-index: 10000;
                font-family: Arial, sans-serif;
                box-shadow: 0 2px 10px rgba(0,0,0,0.3);
            ">
                <div style="display: flex; justify-content: space-between; align-items: center; max-width: 1200px; margin: 0 auto;">
                    <div>
                        <strong>⚠️ SmartFarm Error</strong>
                        <div style="font-size: 14px; margin-top: 5px;">
                            ${type}: ${error.message || 'Unknown error'}
                        </div>
                    </div>
                    <div>
                        <button onclick="this.parentElement.parentElement.parentElement.remove()" 
                                style="background: rgba(255,255,255,0.2); border: none; color: white; padding: 5px 10px; border-radius: 3px; cursor: pointer;">
                            ✕
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.insertBefore(errorDiv, document.body.firstChild);

        // Auto-remove after 10 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.remove();
            }
        }, 10000);
    }

    /**
     * Wrap function with error handling
     * @param {Function} fn - Function to wrap
     * @param {string} context - Context for error reporting
     * @returns {Function} Wrapped function
     */
    wrapFunction(fn, context) {
        return (...args) => {
            try {
                return fn.apply(this, args);
            } catch (error) {
                this.handleError(error, `Function Error (${context})`, null);
                return null;
            }
        };
    }

    /**
     * Wrap async function with error handling
     * @param {Function} fn - Async function to wrap
     * @param {string} context - Context for error reporting
     * @returns {Function} Wrapped async function
     */
    wrapAsyncFunction(fn, context) {
        return async (...args) => {
            try {
                return await fn.apply(this, args);
            } catch (error) {
                this.handleError(error, `Async Function Error (${context})`, null);
                return null;
            }
        };
    }

    /**
     * Get error statistics
     * @returns {Object} Error statistics
     */
    getErrorStats() {
        return {
            errorCount: this.errorCount,
            maxErrors: this.maxErrors,
            lastErrorTime: this.lastErrorTime,
            timeSinceLastError: Date.now() - this.lastErrorTime
        };
    }

    /**
     * Reset error count
     */
    resetErrorCount() {
        this.errorCount = 0;
        this.lastErrorTime = 0;
    }
}

// Initialize error boundary
window.SmartFarmErrorBoundary = new SmartFarmErrorBoundary();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SmartFarmErrorBoundary;
}

console.log('🛡️ SmartFarm Error Boundary initialized');
