/**
 * Error Tracking Integration for SmartFarm
 * Captures and reports runtime errors, unhandled promise rejections, and accessibility violations
 */

class ErrorTracker {
  constructor() {
    this.isInitialized = false;
    this.errorCount = 0;
    this.maxErrors = 100; // Prevent spam
    this.errorBuffer = [];
    this.config = {
      dsn: window.SENTRY_DSN || null,
      environment: window.NODE_ENV || 'development',
      release: window.APP_VERSION || '1.0.0',
      sampleRate: window.NODE_ENV === 'production' ? 0.1 : 1.0,
      beforeSend: this.beforeSend.bind(this),
      beforeBreadcrumb: this.beforeBreadcrumb.bind(this),
    };
    
    this.init();
  }

  init() {
    if (this.isInitialized) return;
    
    try {
      // Initialize Sentry if available
      if (window.Sentry) {
        window.Sentry.init(this.config);
        console.log('✅ Sentry error tracking initialized');
      } else {
        console.warn('⚠️ Sentry not available, using fallback error tracking');
      }
      
      // Set up global error handlers
      this.setupGlobalErrorHandlers();
      
      // Set up accessibility error monitoring
      this.setupAccessibilityMonitoring();
      
      // Set up API error monitoring
      this.setupApiErrorMonitoring();
      
      this.isInitialized = true;
      console.log('✅ Error tracking system initialized');
    } catch (error) {
      console.error('❌ Failed to initialize error tracking:', error);
    }
  }

  setupGlobalErrorHandlers() {
    // Capture unhandled JavaScript errors
    window.addEventListener('error', (event) => {
      this.captureError({
        type: 'javascript_error',
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error,
        stack: event.error?.stack,
        userAgent: navigator.userAgent,
        url: window.location.href,
        timestamp: new Date().toISOString(),
      });
    });

    // Capture unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.captureError({
        type: 'unhandled_promise_rejection',
        reason: event.reason,
        promise: event.promise,
        stack: event.reason?.stack,
        userAgent: navigator.userAgent,
        url: window.location.href,
        timestamp: new Date().toISOString(),
      });
    });

    // Capture console errors
    const originalConsoleError = console.error;
    console.error = (...args) => {
      this.captureError({
        type: 'console_error',
        message: args.join(' '),
        arguments: args,
        stack: new Error().stack,
        userAgent: navigator.userAgent,
        url: window.location.href,
        timestamp: new Date().toISOString(),
      });
      originalConsoleError.apply(console, args);
    };
  }

  setupAccessibilityMonitoring() {
    // Monitor for accessibility violations
    const originalConsoleWarn = console.warn;
    console.warn = (...args) => {
      const message = args.join(' ');
      
      // Check for accessibility-related warnings
      if (message.includes('aria-hidden') || 
          message.includes('accessibility') ||
          message.includes('focus') ||
          message.includes('ARIA')) {
        this.captureError({
          type: 'accessibility_violation',
          message: message,
          arguments: args,
          stack: new Error().stack,
          userAgent: navigator.userAgent,
          url: window.location.href,
          timestamp: new Date().toISOString(),
        });
      }
      
      originalConsoleWarn.apply(console, args);
    };

    // Monitor for modal accessibility issues
    document.addEventListener('DOMContentLoaded', () => {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'attributes' && mutation.attributeName === 'aria-hidden') {
            const element = mutation.target;
            if (element.classList.contains('modal')) {
              const ariaHidden = element.getAttribute('aria-hidden');
              const isVisible = element.classList.contains('show') || 
                               getComputedStyle(element).display !== 'none';
              
              // Check for aria-hidden conflicts
              if (ariaHidden === 'true' && isVisible) {
                this.captureError({
                  type: 'modal_accessibility_conflict',
                  message: 'Modal has aria-hidden="true" but is visible',
                  element: element.outerHTML,
                  ariaHidden: ariaHidden,
                  isVisible: isVisible,
                  userAgent: navigator.userAgent,
                  url: window.location.href,
                  timestamp: new Date().toISOString(),
                });
              }
            }
          }
        });
      });

      observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['aria-hidden', 'aria-modal'],
        subtree: true
      });
    });
  }

  setupApiErrorMonitoring() {
    // Monitor API calls for errors
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      try {
        const response = await originalFetch(...args);
        
        // Log API errors
        if (!response.ok) {
          this.captureError({
            type: 'api_error',
            message: `API request failed: ${response.status} ${response.statusText}`,
            url: args[0],
            method: args[1]?.method || 'GET',
            status: response.status,
            statusText: response.statusText,
            userAgent: navigator.userAgent,
            timestamp: new Date().toISOString(),
          });
        }
        
        return response;
      } catch (error) {
        this.captureError({
          type: 'api_network_error',
          message: `API network error: ${error.message}`,
          url: args[0],
          method: args[1]?.method || 'GET',
          error: error.message,
          stack: error.stack,
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString(),
        });
        throw error;
      }
    };
  }

  captureError(errorData) {
    // Prevent spam
    if (this.errorCount >= this.maxErrors) {
      return;
    }

    this.errorCount++;
    
    // Add to buffer
    this.errorBuffer.push(errorData);
    
    // Send to Sentry if available
    if (window.Sentry) {
      try {
        window.Sentry.captureException(new Error(errorData.message), {
          tags: {
            type: errorData.type,
            environment: this.config.environment,
          },
          extra: errorData,
          level: 'error',
        });
      } catch (sentryError) {
        console.error('Failed to send error to Sentry:', sentryError);
      }
    }
    
    // Log to console in development
    if (this.config.environment === 'development') {
      console.error('🚨 Error captured:', errorData);
    }
    
    // Store in localStorage for debugging
    this.storeErrorLocally(errorData);
  }

  storeErrorLocally(errorData) {
    try {
      const errors = JSON.parse(localStorage.getItem('smartfarm_errors') || '[]');
      errors.push(errorData);
      
      // Keep only last 50 errors
      if (errors.length > 50) {
        errors.splice(0, errors.length - 50);
      }
      
      localStorage.setItem('smartfarm_errors', JSON.stringify(errors));
    } catch (error) {
      console.error('Failed to store error locally:', error);
    }
  }

  beforeSend(event, hint) {
    // Filter out sensitive data
    if (event.exception) {
      const error = event.exception.values[0];
      if (error.value && error.value.includes('password')) {
        return null; // Don't send password-related errors
      }
    }
    
    // Add custom context
    event.tags = {
      ...event.tags,
      component: 'smartfarm-frontend',
      version: this.config.release,
    };
    
    event.extra = {
      ...event.extra,
      userAgent: navigator.userAgent,
      url: window.location.href,
      timestamp: new Date().toISOString(),
    };
    
    return event;
  }

  beforeBreadcrumb(breadcrumb) {
    // Filter out sensitive breadcrumbs
    if (breadcrumb.category === 'xhr' && breadcrumb.data?.url?.includes('password')) {
      return null;
    }
    
    return breadcrumb;
  }

  // Public methods for manual error reporting
  captureException(error, context = {}) {
    this.captureError({
      type: 'manual_exception',
      message: error.message,
      error: error.message,
      stack: error.stack,
      context: context,
      userAgent: navigator.userAgent,
      url: window.location.href,
      timestamp: new Date().toISOString(),
    });
  }

  captureMessage(message, level = 'info', context = {}) {
    this.captureError({
      type: 'manual_message',
      message: message,
      level: level,
      context: context,
      userAgent: navigator.userAgent,
      url: window.location.href,
      timestamp: new Date().toISOString(),
    });
  }

  getErrorCount() {
    return this.errorCount;
  }

  getErrorBuffer() {
    return [...this.errorBuffer];
  }

  clearErrors() {
    this.errorCount = 0;
    this.errorBuffer = [];
    localStorage.removeItem('smartfarm_errors');
  }

  // Test method to verify error tracking is working
  testErrorTracking() {
    console.log('🧪 Testing error tracking...');
    
    try {
      throw new Error('Test error for error tracking verification');
    } catch (error) {
      this.captureException(error, { test: true });
    }
    
    console.log('✅ Error tracking test completed');
  }
}

// Initialize error tracking
window.ErrorTracker = new ErrorTracker();

// Global error tracking functions
window.captureError = (error, context) => window.ErrorTracker.captureException(error, context);
window.captureMessage = (message, level, context) => window.ErrorTracker.captureMessage(message, level, context);

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ErrorTracker;
}
