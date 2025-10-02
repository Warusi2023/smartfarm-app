/**
 * SmartFarm Performance Optimizer
 * Comprehensive performance optimization for frontend
 */

class PerformanceOptimizer {
    constructor() {
        this.imageCache = new Map();
        this.apiCache = new Map();
        this.lazyLoadObserver = null;
        this.debounceTimers = new Map();
        this.init();
    }

    init() {
        this.setupLazyLoading();
        this.setupImageOptimization();
        this.setupApiCaching();
        this.setupDebouncing();
        this.setupPreloading();
        this.setupServiceWorker();
    }

    // Lazy loading for images and components
    setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            this.lazyLoadObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const element = entry.target;
                        
                        if (element.dataset.src) {
                            // Lazy load image
                            element.src = element.dataset.src;
                            element.removeAttribute('data-src');
                        }
                        
                        if (element.dataset.component) {
                            // Lazy load component
                            this.loadComponent(element.dataset.component, element);
                        }
                        
                        this.lazyLoadObserver.unobserve(element);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.1
            });

            // Observe all lazy elements
            document.querySelectorAll('[data-src], [data-component]').forEach(el => {
                this.lazyLoadObserver.observe(el);
            });
        }
    }

    // Image optimization and caching
    setupImageOptimization() {
        // Optimize images on load
        document.addEventListener('DOMContentLoaded', () => {
            const images = document.querySelectorAll('img');
            images.forEach(img => {
                this.optimizeImage(img);
            });
        });

        // Handle dynamic images
        const imageObserver = new MutationObserver((mutations) => {
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        if (node.tagName === 'IMG') {
                            this.optimizeImage(node);
                        }
                        node.querySelectorAll('img').forEach(img => {
                            this.optimizeImage(img);
                        });
                    }
                });
            });
        });

        imageObserver.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    optimizeImage(img) {
        // Add loading optimization
        if (!img.loading) {
            img.loading = 'lazy';
        }

        // Add error handling
        img.addEventListener('error', () => {
            img.src = '/images/placeholder.png';
            img.alt = 'Image failed to load';
        });

        // Add loading state
        img.addEventListener('load', () => {
            img.classList.add('loaded');
        });

        // Cache successful loads
        img.addEventListener('load', () => {
            this.imageCache.set(img.src, true);
        });
    }

    // API response caching
    setupApiCaching() {
        // Cache successful API responses
        const originalFetch = window.fetch;
        window.fetch = async (url, options = {}) => {
            const cacheKey = `${url}_${JSON.stringify(options)}`;
            
            // Check cache for GET requests
            if (options.method === 'GET' || !options.method) {
                const cached = this.apiCache.get(cacheKey);
                if (cached && Date.now() - cached.timestamp < 300000) { // 5 minutes
                    return new Response(JSON.stringify(cached.data), {
                        status: 200,
                        headers: { 'Content-Type': 'application/json' }
                    });
                }
            }

            try {
                const response = await originalFetch(url, options);
                
                // Cache successful responses
                if (response.ok && (options.method === 'GET' || !options.method)) {
                    const data = await response.clone().json();
                    this.apiCache.set(cacheKey, {
                        data,
                        timestamp: Date.now()
                    });
                }
                
                return response;
            } catch (error) {
                console.error('API request failed:', error);
                throw error;
            }
        };
    }

    // Debouncing for performance
    setupDebouncing() {
        // Debounce function
        window.debounce = (func, wait, immediate = false) => {
            return (...args) => {
                const key = func.name || 'anonymous';
                const later = () => {
                    this.debounceTimers.delete(key);
                    if (!immediate) func(...args);
                };
                
                const callNow = immediate && !this.debounceTimers.has(key);
                
                if (this.debounceTimers.has(key)) {
                    clearTimeout(this.debounceTimers.get(key));
                }
                
                this.debounceTimers.set(key, setTimeout(later, wait));
                
                if (callNow) func(...args);
            };
        };

        // Throttle function
        window.throttle = (func, limit) => {
            let inThrottle;
            return (...args) => {
                if (!inThrottle) {
                    func.apply(this, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        };
    }

    // Preload critical resources
    setupPreloading() {
        // Preload critical CSS
        const criticalCSS = [
            'css/utilities.css',
            'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css'
        ];

        criticalCSS.forEach(href => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'style';
            link.href = href;
            document.head.appendChild(link);
        });

        // Preload critical JavaScript
        const criticalJS = [
            'js/api-service.js',
            'js/user-roles.js'
        ];

        criticalJS.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'script';
            link.href = src;
            document.head.appendChild(link);
        });

        // Preload critical images
        const criticalImages = [
            'images/logo/logo.png',
            'images/favicon/favicon.ico'
        ];

        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }

    // Service Worker for caching
    setupServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(registration => {
                        console.log('SW registered: ', registration);
                    })
                    .catch(registrationError => {
                        console.log('SW registration failed: ', registrationError);
                    });
            });
        }
    }

    // Load component dynamically
    async loadComponent(componentName, container) {
        try {
            const module = await import(`/js/components/${componentName}.js`);
            if (module.default) {
                const component = new module.default();
                container.innerHTML = component.render();
                if (component.init) {
                    component.init();
                }
            }
        } catch (error) {
            console.error(`Failed to load component ${componentName}:`, error);
            container.innerHTML = `<div class="error">Failed to load component</div>`;
        }
    }

    // Optimize charts
    optimizeCharts() {
        // Debounce chart updates
        const chartUpdate = debounce((chart, data) => {
            chart.data = data;
            chart.update('none'); // No animation for performance
        }, 100);

        // Throttle chart resize
        const chartResize = throttle(() => {
            Chart.helpers.each(Chart.instances, (chart) => {
                chart.resize();
            });
        }, 250);

        window.addEventListener('resize', chartResize);
    }

    // Optimize forms
    optimizeForms() {
        // Debounce form validation
        document.querySelectorAll('input, textarea, select').forEach(input => {
            input.addEventListener('input', debounce((e) => {
                this.validateField(e.target);
            }, 300));
        });

        // Optimize form submission
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', (e) => {
                this.optimizeFormSubmission(e);
            });
        });
    }

    validateField(field) {
        // Add visual feedback
        field.classList.remove('is-valid', 'is-invalid');
        
        if (field.checkValidity()) {
            field.classList.add('is-valid');
        } else {
            field.classList.add('is-invalid');
        }
    }

    optimizeFormSubmission(e) {
        const form = e.target;
        const submitButton = form.querySelector('button[type="submit"]');
        
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-1"></i>Processing...';
            
            // Re-enable after 5 seconds as fallback
            setTimeout(() => {
                submitButton.disabled = false;
                submitButton.innerHTML = submitButton.dataset.originalText || 'Submit';
            }, 5000);
        }
    }

    // Memory management
    cleanup() {
        // Clear old cache entries
        const now = Date.now();
        for (const [key, value] of this.apiCache.entries()) {
            if (now - value.timestamp > 600000) { // 10 minutes
                this.apiCache.delete(key);
            }
        }

        // Clear debounce timers
        for (const [key, timer] of this.debounceTimers.entries()) {
            clearTimeout(timer);
            this.debounceTimers.delete(key);
        }
    }

    // Performance monitoring
    measurePerformance(name, fn) {
        const start = performance.now();
        const result = fn();
        const end = performance.now();
        
        console.log(`${name} took ${end - start} milliseconds`);
        
        // Log slow operations
        if (end - start > 100) {
            console.warn(`Slow operation detected: ${name} (${end - start}ms)`);
        }
        
        return result;
    }

    // Bundle optimization
    optimizeBundle() {
        // Remove unused CSS
        this.removeUnusedCSS();
        
        // Minify inline styles
        this.minifyInlineStyles();
        
        // Optimize DOM queries
        this.optimizeDOMQueries();
    }

    removeUnusedCSS() {
        // This would integrate with a tool like PurgeCSS
        console.log('CSS optimization would be handled by build tools');
    }

    minifyInlineStyles() {
        document.querySelectorAll('[style]').forEach(element => {
            const style = element.getAttribute('style');
            const minified = style.replace(/\s+/g, ' ').trim();
            element.setAttribute('style', minified);
        });
    }

    optimizeDOMQueries() {
        // Cache frequently accessed elements
        this.cachedElements = {
            dashboard: document.getElementById('dashboard'),
            sidebar: document.querySelector('.sidebar'),
            mainContent: document.querySelector('.main-content')
        };
    }
}

// Initialize performance optimizer
window.performanceOptimizer = new PerformanceOptimizer();

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    window.performanceOptimizer.cleanup();
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PerformanceOptimizer;
}
