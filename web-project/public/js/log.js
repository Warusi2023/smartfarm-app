/**
 * SmartFarm Unified Logging Utility
 * Provides consistent logging across the application with proper error handling
 */

class SmartFarmLogger {
    constructor() {
        this.isDevelopment = window.location.hostname === 'localhost' || 
                           window.location.hostname === '127.0.0.1' ||
                           window.location.hostname.includes('netlify.app');
        
        this.logLevel = this.isDevelopment ? 'debug' : 'error';
        this.logHistory = [];
        this.maxHistorySize = 100;
    }

    /**
     * Log error messages
     * @param {...any} args - Error arguments
     */
    error(...args) {
        const message = this.formatMessage('ERROR', args);
        console.error('[SmartFarm]', ...args);
        this.addToHistory('error', message);
        
        // Send to error tracking service in production
        if (!this.isDevelopment) {
            this.sendToErrorTracking('error', args);
        }
    }

    /**
     * Log warning messages
     * @param {...any} args - Warning arguments
     */
    warn(...args) {
        const message = this.formatMessage('WARN', args);
        console.warn('[SmartFarm]', ...args);
        this.addToHistory('warn', message);
    }

    /**
     * Log info messages
     * @param {...any} args - Info arguments
     */
    info(...args) {
        if (this.shouldLog('info')) {
            const message = this.formatMessage('INFO', args);
            console.info('[SmartFarm]', ...args);
            this.addToHistory('info', message);
        }
    }

    /**
     * Log debug messages (development only)
     * @param {...any} args - Debug arguments
     */
    debug(...args) {
        if (this.isDevelopment) {
            const message = this.formatMessage('DEBUG', args);
            console.debug('[SmartFarm]', ...args);
            this.addToHistory('debug', message);
        }
    }

    /**
     * Log success messages
     * @param {...any} args - Success arguments
     */
    success(...args) {
        if (this.shouldLog('info')) {
            const message = this.formatMessage('SUCCESS', args);
            console.info('[SmartFarm] ✅', ...args);
            this.addToHistory('success', message);
        }
    }

    /**
     * Check if message should be logged based on log level
     * @param {string} level - Log level
     * @returns {boolean}
     */
    shouldLog(level) {
        const levels = { error: 0, warn: 1, info: 2, debug: 3 };
        return levels[level] <= levels[this.logLevel];
    }

    /**
     * Format log message with timestamp
     * @param {string} level - Log level
     * @param {Array} args - Log arguments
     * @returns {string}
     */
    formatMessage(level, args) {
        const timestamp = new Date().toISOString();
        const message = args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
        ).join(' ');
        
        return `[${timestamp}] [${level}] ${message}`;
    }

    /**
     * Add message to log history
     * @param {string} level - Log level
     * @param {string} message - Formatted message
     */
    addToHistory(level, message) {
        this.logHistory.push({ level, message, timestamp: Date.now() });
        
        // Keep only recent logs
        if (this.logHistory.length > this.maxHistorySize) {
            this.logHistory = this.logHistory.slice(-this.maxHistorySize);
        }
    }

    /**
     * Send error to tracking service
     * @param {string} level - Log level
     * @param {Array} args - Error arguments
     */
    async sendToErrorTracking(level, args) {
        try {
            // Only send errors in production and if API is available
            if (!this.isDevelopment && window.SmartFarmConfig) {
                const errorData = {
                    level,
                    message: args.join(' '),
                    url: window.location.href,
                    userAgent: navigator.userAgent,
                    timestamp: new Date().toISOString(),
                    stack: args.find(arg => arg instanceof Error)?.stack
                };

                // Send to backend error tracking endpoint (with error handling)
                try {
                    const response = await fetch(window.SmartFarmConfig.getApiUrl('/errors'), {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(errorData)
                    });
                    
                    if (!response.ok) {
                        console.warn('Error tracking endpoint not available:', response.status);
                    }
                } catch (error) {
                    // Silently handle error tracking failures to avoid infinite loops
                    console.warn('Error tracking failed:', error.message);
                }
            }
        } catch (error) {
            // Silently fail - don't log error tracking failures
            return;
        }
    }

    /**
     * Get log history
     * @returns {Array} Log history
     */
    getHistory() {
        return [...this.logHistory];
    }

    /**
     * Clear log history
     */
    clearHistory() {
        this.logHistory = [];
    }

    /**
     * Set log level
     * @param {string} level - New log level
     */
    setLogLevel(level) {
        this.logLevel = level;
    }

    /**
     * Get current log level
     * @returns {string} Current log level
     */
    getLogLevel() {
        return this.logLevel;
    }
}

// Create global logger instance
window.SmartFarmLogger = new SmartFarmLogger();

// Export convenience functions
window.logError = (...args) => window.SmartFarmLogger.error(...args);
window.logWarn = (...args) => window.SmartFarmLogger.warn(...args);
window.logInfo = (...args) => window.SmartFarmLogger.info(...args);
window.logDebug = (...args) => window.SmartFarmLogger.debug(...args);
window.logSuccess = (...args) => window.SmartFarmLogger.success(...args);

// Global error handler
window.addEventListener('error', (event) => {
    window.SmartFarmLogger.error('Global error:', event.error);
});

// Global unhandled promise rejection handler
window.addEventListener('unhandledrejection', (event) => {
    window.SmartFarmLogger.error('Unhandled promise rejection:', event.reason);
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SmartFarmLogger;
}

console.log('🔧 SmartFarm Logger initialized');
