/**
 * Monitoring Configuration for SmartFarm
 * Sets up error tracking, analytics, and performance monitoring
 */

class MonitoringConfig {
    constructor() {
        this.sentry = null;
        this.analytics = null;
        this.initializeMonitoring();
    }

    /**
     * Initialize Sentry for error tracking
     */
    initializeSentry() {
        try {
            if (process.env.SENTRY_DSN) {
                const Sentry = require('@sentry/node');
                const { ProfilingIntegration } = require('@sentry/profiling-node');

                Sentry.init({
                    dsn: process.env.SENTRY_DSN,
                    environment: process.env.NODE_ENV || 'production',
                    tracesSampleRate: parseFloat(process.env.SENTRY_TRACES_SAMPLE_RATE || '0.1'),
                    profilesSampleRate: parseFloat(process.env.SENTRY_PROFILES_SAMPLE_RATE || '0.1'),
                    integrations: [
                        new ProfilingIntegration(),
                    ],
                    beforeSend(event, hint) {
                        // Filter out sensitive data
                        if (event.request) {
                            delete event.request.cookies;
                            if (event.request.headers) {
                                delete event.request.headers.authorization;
                            }
                        }
                        return event;
                    }
                });

                this.sentry = Sentry;
                console.log('✅ Sentry error tracking initialized');
            } else {
                console.log('⚠️ Sentry DSN not configured, error tracking disabled');
            }
        } catch (error) {
            console.warn('⚠️ Sentry initialization failed:', error.message);
        }
    }

    /**
     * Initialize analytics (Google Analytics or similar)
     */
    initializeAnalytics() {
        try {
            // Google Analytics 4 configuration
            if (process.env.GOOGLE_ANALYTICS_ID) {
                this.analytics = {
                    enabled: true,
                    trackingId: process.env.GOOGLE_ANALYTICS_ID,
                    type: 'ga4'
                };
                console.log('✅ Google Analytics configured');
            } else {
                console.log('⚠️ Analytics not configured');
            }
        } catch (error) {
            console.warn('⚠️ Analytics initialization failed:', error.message);
        }
    }

    /**
     * Initialize all monitoring services
     */
    initializeMonitoring() {
        this.initializeSentry();
        this.initializeAnalytics();
    }

    /**
     * Capture exception with Sentry
     */
    captureException(error, context = {}) {
        if (this.sentry) {
            this.sentry.captureException(error, {
                extra: context,
                tags: {
                    environment: process.env.NODE_ENV || 'production'
                }
            });
        }
    }

    /**
     * Capture message with Sentry
     */
    captureMessage(message, level = 'info', context = {}) {
        if (this.sentry) {
            this.sentry.captureMessage(message, {
                level,
                extra: context
            });
        }
    }

    /**
     * Track API request for analytics
     */
    trackRequest(req, res, responseTime) {
        if (this.analytics && this.analytics.enabled) {
            // Log request metrics
            const metrics = {
                method: req.method,
                path: req.path,
                statusCode: res.statusCode,
                responseTime: responseTime,
                userAgent: req.headers['user-agent'],
                ip: req.ip,
                userId: req.user?.id || 'anonymous'
            };

            // In production, send to analytics service
            // For now, just log (can be extended to send to GA4, Mixpanel, etc.)
            if (process.env.NODE_ENV === 'production') {
                // TODO: Send to analytics service
                console.log('[Analytics]', JSON.stringify(metrics));
            }
        }
    }

    /**
     * Middleware to track requests and errors
     */
    requestTracking() {
        return (req, res, next) => {
            const startTime = Date.now();

            // Track response finish
            res.on('finish', () => {
                const responseTime = Date.now() - startTime;
                this.trackRequest(req, res, responseTime);

                // Log slow requests
                if (responseTime > 2000) {
                    this.captureMessage('Slow API request detected', 'warning', {
                        path: req.path,
                        method: req.method,
                        responseTime: responseTime,
                        statusCode: res.statusCode
                    });
                }
            });

            next();
        };
    }

    /**
     * Error handler middleware
     */
    errorHandler() {
        return (err, req, res, next) => {
            // Capture error with Sentry
            this.captureException(err, {
                path: req.path,
                method: req.method,
                query: req.query,
                body: req.body,
                user: req.user?.id
            });

            // Call next error handler
            next(err);
        };
    }
}

module.exports = MonitoringConfig;

