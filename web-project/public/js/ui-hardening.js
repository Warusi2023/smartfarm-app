/**
 * SmartFarm UI Hardening Utilities
 * Prevents null textContent errors and improves robustness
 */

// Safe DOM manipulation utilities
window.SmartFarmUI = {
    /**
     * Safely set text content - prevents "Cannot set properties of null" errors
     */
    safeText: function(selector, value) {
        const element = typeof selector === 'string' ? document.querySelector(selector) : selector;
        if (element && typeof value !== 'undefined') {
            element.textContent = value;
            return true;
        }
        return false;
    },

    /**
     * Safely set HTML content
     */
    safeHTML: function(selector, value) {
        const element = typeof selector === 'string' ? document.querySelector(selector) : selector;
        if (element && typeof value !== 'undefined') {
            element.innerHTML = value;
            return true;
        }
        return false;
    },

    /**
     * Safely set input value
     */
    safeValue: function(selector, value) {
        const element = typeof selector === 'string' ? document.querySelector(selector) : selector;
        if (element && typeof value !== 'undefined') {
            element.value = value;
            return true;
        }
        return false;
    },

    /**
     * Safely add/remove CSS classes
     */
    safeClass: function(selector, action, className) {
        const element = typeof selector === 'string' ? document.querySelector(selector) : selector;
        if (element && className) {
            if (action === 'add') {
                element.classList.add(className);
            } else if (action === 'remove') {
                element.classList.remove(className);
            } else if (action === 'toggle') {
                element.classList.toggle(className);
            }
            return true;
        }
        return false;
    },

    /**
     * Safely set element visibility
     */
    safeShow: function(selector, show = true) {
        const element = typeof selector === 'string' ? document.querySelector(selector) : selector;
        if (element) {
            element.style.display = show ? '' : 'none';
            return true;
        }
        return false;
    },

    /**
     * Safely update multiple elements with count data
     */
    updateCounts: function(counts) {
        if (typeof counts !== 'object') return false;
        
        const updates = [
            { selector: '#livestock-count', value: counts.livestock },
            { selector: '#crops-count', value: counts.crops },
            { selector: '#farms-count', value: counts.farms },
            { selector: '#tasks-count', value: counts.tasks },
            { selector: '#inventory-count', value: counts.inventory },
            { selector: '#financial-count', value: counts.financial }
        ];

        let successCount = 0;
        updates.forEach(update => {
            if (update.value !== undefined && this.safeText(update.selector, update.value)) {
                successCount++;
            }
        });

        return successCount > 0;
    },

    /**
     * Safely update dashboard statistics
     */
    updateStats: function(stats) {
        if (typeof stats !== 'object') return false;
        
        const updates = [
            { selector: '#total-farms', value: stats.totalFarms },
            { selector: '#active-crops', value: stats.activeCrops },
            { selector: '#livestock-count', value: stats.livestockCount },
            { selector: '#pending-tasks', value: stats.pendingTasks },
            { selector: '#monthly-revenue', value: stats.monthlyRevenue },
            { selector: '#weather-status', value: stats.weatherStatus }
        ];

        let successCount = 0;
        updates.forEach(update => {
            if (update.value !== undefined && this.safeText(update.selector, update.value)) {
                successCount++;
            }
        });

        return successCount > 0;
    },

    /**
     * Safely update form fields
     */
    updateForm: function(formData) {
        if (typeof formData !== 'object') return false;
        
        let successCount = 0;
        Object.entries(formData).forEach(([selector, value]) => {
            if (this.safeValue(selector, value)) {
                successCount++;
            }
        });

        return successCount > 0;
    },

    /**
     * Safely show/hide loading states
     */
    setLoading: function(selector, isLoading = true) {
        const element = typeof selector === 'string' ? document.querySelector(selector) : selector;
        if (element) {
            if (isLoading) {
                element.innerHTML = '<div class="text-center"><i class="fas fa-spinner fa-spin fa-2x"></i><br>Loading...</div>';
                element.classList.add('loading');
            } else {
                element.classList.remove('loading');
            }
            return true;
        }
        return false;
    },

    /**
     * Safely show error messages
     */
    showError: function(selector, message) {
        const element = typeof selector === 'string' ? document.querySelector(selector) : selector;
        if (element) {
            element.innerHTML = `<div class="alert alert-danger"><i class="fas fa-exclamation-triangle"></i> ${message}</div>`;
            element.classList.add('error');
            return true;
        }
        return false;
    },

    /**
     * Safely show success messages
     */
    showSuccess: function(selector, message) {
        const element = typeof selector === 'string' ? document.querySelector(selector) : selector;
        if (element) {
            element.innerHTML = `<div class="alert alert-success"><i class="fas fa-check-circle"></i> ${message}</div>`;
            element.classList.add('success');
            return true;
        }
        return false;
    }
};

// Global helper functions for backward compatibility
window.safeText = window.SmartFarmUI.safeText.bind(window.SmartFarmUI);
window.safeHTML = window.SmartFarmUI.safeHTML.bind(window.SmartFarmUI);
window.safeValue = window.SmartFarmUI.safeValue.bind(window.SmartFarmUI);

// Example usage patterns:
// safeText('#livestock-count', total);
// safeText(document.querySelector('#crops-count'), activeCrops);
// SmartFarmUI.updateCounts({ livestock: 45, crops: 12, farms: 3 });
// SmartFarmUI.setLoading('#dashboard-content', true);

console.log('SmartFarm UI Hardening utilities loaded');
