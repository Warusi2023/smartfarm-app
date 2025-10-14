/**
 * Error Boundary for Vanilla JavaScript
 * Provides React-style error boundary functionality for vanilla JS applications
 */

class ErrorBoundary {
    constructor(options = {}) {
        this.options = {
            onError: options.onError || this.defaultErrorHandler,
            onRecover: options.onRecover || this.defaultRecoverHandler,
            fallbackElement: options.fallbackElement || null,
            logErrors: options.logErrors !== false,
            recoverable: options.recoverable !== false,
            ...options
        };
        
        this.errorCount = 0;
        this.maxErrors = this.options.maxErrors || 5;
        this.isRecovering = false;
        
        this.setupGlobalErrorHandlers();
    }

    /**
     * Setup global error handlers
     */
    setupGlobalErrorHandlers() {
        // Handle uncaught JavaScript errors
        window.addEventListener('error', (event) => {
            this.handleError(event.error, {
                type: 'javascript',
                message: event.message,
                filename: event.filename,
                lineno: event.lineno,
                colno: event.colno
            });
        });

        // Handle unhandled promise rejections
        window.addEventListener('unhandledrejection', (event) => {
            this.handleError(event.reason, {
                type: 'promise',
                message: event.reason?.message || 'Unhandled promise rejection'
            });
        });

        // Handle resource loading errors
        window.addEventListener('error', (event) => {
            if (event.target !== window) {
                this.handleError(new Error(`Failed to load resource: ${event.target.src || event.target.href}`), {
                    type: 'resource',
                    element: event.target.tagName,
                    src: event.target.src || event.target.href
                });
            }
        }, true);
    }

    /**
     * Handle errors with recovery options
     */
    handleError(error, context = {}) {
        if (this.errorCount >= this.maxErrors) {
            this.showFatalError();
            return;
        }

        this.errorCount++;

        const errorInfo = {
            error: error,
            context: context,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href,
            errorCount: this.errorCount
        };

        // Log error if enabled
        if (this.options.logErrors) {
            this.logError(errorInfo);
        }

        // Call custom error handler
        try {
            this.options.onError(errorInfo);
        } catch (handlerError) {
            console.error('Error in error handler:', handlerError);
        }

        // Attempt recovery if enabled
        if (this.options.recoverable && !this.isRecovering) {
            this.attemptRecovery(errorInfo);
        }
    }

    /**
     * Attempt to recover from error
     */
    async attemptRecovery(errorInfo) {
        this.isRecovering = true;

        try {
            // Wait a bit before attempting recovery
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Clear any corrupted state
            this.clearCorruptedState();

            // Reload critical scripts
            await this.reloadCriticalScripts();

            // Call recovery handler
            this.options.onRecover(errorInfo);

            console.log('✅ Error recovery completed');
        } catch (recoveryError) {
            console.error('❌ Error recovery failed:', recoveryError);
            this.showFatalError();
        } finally {
            this.isRecovering = false;
        }
    }

    /**
     * Clear potentially corrupted state
     */
    clearCorruptedState() {
        try {
            // Clear any corrupted localStorage items
            const corruptedKeys = [];
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                try {
                    JSON.parse(localStorage.getItem(key));
                } catch {
                    corruptedKeys.push(key);
                }
            }
            corruptedKeys.forEach(key => localStorage.removeItem(key));

            // Clear any corrupted sessionStorage items
            const corruptedSessionKeys = [];
            for (let i = 0; i < sessionStorage.length; i++) {
                const key = sessionStorage.key(i);
                try {
                    JSON.parse(sessionStorage.getItem(key));
                } catch {
                    corruptedSessionKeys.push(key);
                }
            }
            corruptedSessionKeys.forEach(key => sessionStorage.removeItem(key));

            console.log(`🧹 Cleared ${corruptedKeys.length} corrupted localStorage items and ${corruptedSessionKeys.length} corrupted sessionStorage items`);
        } catch (error) {
            console.warn('⚠️ Error clearing corrupted state:', error.message);
        }
    }

    /**
     * Reload critical scripts
     */
    async reloadCriticalScripts() {
        try {
            // List of critical scripts that should be reloaded
            const criticalScripts = [
                'js/api-service.js',
                'js/error-boundary.js',
            ];

            for (const scriptSrc of criticalScripts) {
                try {
                    const existingScript = document.querySelector(`script[src*="${scriptSrc}"]`);
                    if (existingScript) {
                        const newScript = document.createElement('script');
                        newScript.src = existingScript.src + '?reload=' + Date.now();
                        newScript.onload = () => existingScript.remove();
                        document.head.appendChild(newScript);
                    }
                } catch (scriptError) {
                    console.warn(`⚠️ Failed to reload script ${scriptSrc}:`, scriptError.message);
                }
            }
        } catch (error) {
            console.warn('⚠️ Error reloading critical scripts:', error.message);
        }
    }

    /**
     * Show fatal error UI
     */
    showFatalError() {
        try {
            const errorContainer = document.createElement('div');
            errorContainer.id = 'fatal-error-container';
            errorContainer.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                color: white;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                z-index: 999999;
                font-family: Arial, sans-serif;
                padding: 20px;
                box-sizing: border-box;
            `;

            errorContainer.innerHTML = `
                <div style="text-align: center; max-width: 600px;">
                    <h1 style="color: #ff6b6b; margin-bottom: 20px;">⚠️ Application Error</h1>
                    <p style="margin-bottom: 20px; font-size: 16px;">
                        We're sorry, but the application has encountered multiple errors and cannot continue safely.
                    </p>
                    <div style="margin-bottom: 30px;">
                        <button onclick="window.location.reload()" style="
                            background: #4CAF50;
                            color: white;
                            border: none;
                            padding: 12px 24px;
                            border-radius: 6px;
                            font-size: 16px;
                            cursor: pointer;
                            margin-right: 10px;
                        ">Reload Page</button>
                        <button onclick="localStorage.clear(); sessionStorage.clear(); window.location.reload()" style="
                            background: #ff9800;
                            color: white;
                            border: none;
                            padding: 12px 24px;
                            border-radius: 6px;
                            font-size: 16px;
                            cursor: pointer;
                        ">Clear Data & Reload</button>
                    </div>
                    <p style="font-size: 14px; color: #ccc;">
                        If the problem persists, please contact support.
                    </p>
                </div>
            `;

            document.body.appendChild(errorContainer);
        } catch (error) {
            console.error('❌ Failed to show fatal error UI:', error);
        }
    }

    /**
     * Default error handler
     */
    defaultErrorHandler(errorInfo) {
        const { error, context } = errorInfo;
        
        console.group('🚨 Application Error');
        console.error('Error:', error);
        console.error('Context:', context);
        console.error('Error Count:', errorInfo.errorCount);
        console.groupEnd();

        // Show user-friendly error message for non-critical errors
        if (errorInfo.errorCount <= 2) {
            this.showErrorToast(`An error occurred (${errorInfo.errorCount}/${this.maxErrors}). The application is attempting to recover.`);
        }
    }

    /**
     * Default recovery handler
     */
    defaultRecoverHandler(errorInfo) {
        console.log('🔄 Application recovered from error');
        this.showErrorToast('Application has recovered from the error.');
    }

    /**
     * Show error toast notification
     */
    showErrorToast(message) {
        try {
            const toast = document.createElement('div');
            toast.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: #ff6b6b;
                color: white;
                padding: 12px 20px;
                border-radius: 6px;
                font-family: Arial, sans-serif;
                font-size: 14px;
                z-index: 10000;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
                max-width: 300px;
                word-wrap: break-word;
            `;
            toast.textContent = message;

            document.body.appendChild(toast);

            // Auto-remove after 5 seconds
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 5000);
        } catch (error) {
            console.warn('⚠️ Failed to show error toast:', error.message);
        }
    }

    /**
     * Log error to console with structured format
     */
    logError(errorInfo) {
        const logData = {
            timestamp: errorInfo.timestamp,
            error: {
                name: errorInfo.error.name,
                message: errorInfo.error.message,
                stack: errorInfo.error.stack
            },
            context: errorInfo.context,
            environment: {
                userAgent: errorInfo.userAgent,
                url: errorInfo.url,
                errorCount: errorInfo.errorCount
            }
        };

        console.group('📊 Error Log');
        console.table(logData);
        console.groupEnd();

        // Send to analytics if available
        if (typeof window.gtag === 'function') {
            try {
                window.gtag('event', 'exception', {
                    description: errorInfo.error.message,
                    fatal: errorInfo.errorCount >= this.maxErrors
                });
            } catch (analyticsError) {
                console.warn('⚠️ Failed to send error to analytics:', analyticsError.message);
            }
        }
    }

    /**
     * Reset error count (useful for testing)
     */
    reset() {
        this.errorCount = 0;
        this.isRecovering = false;
        console.log('🔄 Error boundary reset');
    }

    /**
     * Get current error statistics
     */
    getStats() {
        return {
            errorCount: this.errorCount,
            maxErrors: this.maxErrors,
            isRecovering: this.isRecovering,
            remainingErrors: this.maxErrors - this.errorCount
        };
    }
}

// DISABLED: Error boundary initialization
// This was causing the "Application Error" screen to appear
// window.SmartFarmErrorBoundary = new ErrorBoundary({
//     maxErrors: 5,
//     recoverable: true,
//     logErrors: true,
//     onError: (errorInfo) => {
//         // Custom error handling can be added here
//         console.log('Custom error handler called');
//     },
//     onRecover: (errorInfo) => {
//         // Custom recovery handling can be added here
//         console.log('Custom recovery handler called');
//     }
// });

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ErrorBoundary;
}

console.log('🛡️ Error boundary DISABLED for better UX');