/**
 * SmartFarm UX Enhancement Module
 * Provides comprehensive user experience improvements
 */

class SmartFarmUXEnhancer {
    constructor() {
        this.notificationContainer = null;
        this.loadingOverlay = null;
        this.tooltipInstances = new Map();
        this.init();
    }

    init() {
        this.createNotificationContainer();
        this.createLoadingOverlay();
        this.initializeTooltips();
        this.setupFormValidation();
        this.setupKeyboardNavigation();
        this.setupAccessibilityFeatures();
    }

    createNotificationContainer() {
        if (this.notificationContainer) return;

        this.notificationContainer = document.createElement('div');
        this.notificationContainer.id = 'smartfarm-notifications';
        this.notificationContainer.className = 'position-fixed';
        this.notificationContainer.style.cssText = `
            top: 20px;
            right: 20px;
            z-index: 9999;
            max-width: 400px;
            pointer-events: none;
        `;
        document.body.appendChild(this.notificationContainer);
    }

    createLoadingOverlay() {
        if (this.loadingOverlay) return;

        this.loadingOverlay = document.createElement('div');
        this.loadingOverlay.id = 'smartfarm-loading-overlay';
        this.loadingOverlay.className = 'position-fixed d-none';
        this.loadingOverlay.style.cssText = `
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        this.loadingOverlay.innerHTML = `
            <div class="text-center text-white">
                <div class="spinner-border text-light mb-3" role="status" style="width: 3rem; height: 3rem;">
                    <span class="visually-hidden">Loading...</span>
                </div>
                <div class="h4">Processing...</div>
                <div class="small">Please wait while we process your request</div>
            </div>
        `;
        document.body.appendChild(this.loadingOverlay);
    }

    showSuccess(message, duration = 5000) {
        this.showNotification(message, 'success', duration);
    }

    showError(message, duration = 8000) {
        this.showNotification(message, 'danger', duration);
    }

    showInfo(message, duration = 5000) {
        this.showNotification(message, 'info', duration);
    }

    showWarning(message, duration = 6000) {
        this.showNotification(message, 'warning', duration);
    }

    showNotification(message, type = 'info', duration = 5000) {
        if (!this.notificationContainer) {
            this.createNotificationContainer();
        }

        const notification = document.createElement('div');
        notification.className = `alert alert-${type} alert-dismissible fade show mb-2`;
        notification.style.pointerEvents = 'auto';
        notification.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        
        const icon = this.getNotificationIcon(type);
        notification.innerHTML = `
            <div class="d-flex align-items-center">
                <i class="${icon} me-2"></i>
                <div class="flex-grow-1">${message}</div>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;

        this.notificationContainer.appendChild(notification);

        setTimeout(() => {
            if (notification.parentNode) {
                notification.classList.remove('show');
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 150);
            }
        }, duration);
    }

    getNotificationIcon(type) {
        const icons = {
            success: 'fas fa-check-circle',
            danger: 'fas fa-exclamation-circle',
            warning: 'fas fa-exclamation-triangle',
            info: 'fas fa-info-circle'
        };
        return icons[type] || icons.info;
    }

    showLoading(message = 'Processing...') {
        if (this.loadingOverlay) {
            const messageElement = this.loadingOverlay.querySelector('.h4');
            if (messageElement) {
                messageElement.textContent = message;
            }
            this.loadingOverlay.classList.remove('d-none');
            this.loadingOverlay.style.display = 'flex';
        }
    }

    hideLoading() {
        if (this.loadingOverlay) {
            this.loadingOverlay.classList.add('d-none');
            this.loadingOverlay.style.display = 'none';
        }
    }

    setButtonLoading(button, loading = true, originalText = null) {
        if (!button) return;

        if (loading) {
            button.dataset.originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-spinner fa-spin me-1"></i>Loading...';
            button.disabled = true;
        } else {
            button.innerHTML = originalText || button.dataset.originalText || 'Submit';
            button.disabled = false;
        }
    }

    initializeTooltips() {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.forEach(tooltipTriggerEl => {
            const tooltip = new bootstrap.Tooltip(tooltipTriggerEl);
            this.tooltipInstances.set(tooltipTriggerEl, tooltip);
        });
    }

    addTooltip(element, text, placement = 'top') {
        if (!element) return;

        element.setAttribute('data-bs-toggle', 'tooltip');
        element.setAttribute('data-bs-placement', placement);
        element.setAttribute('title', text);
        
        const tooltip = new bootstrap.Tooltip(element);
        this.tooltipInstances.set(element, tooltip);
    }

    setupFormValidation() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            const inputs = form.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                input.addEventListener('blur', () => this.validateField(input));
                input.addEventListener('input', () => this.clearFieldError(input));
            });
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const required = field.hasAttribute('required');
        const minLength = field.getAttribute('minlength');
        const maxLength = field.getAttribute('maxlength');
        const pattern = field.getAttribute('pattern');

        let isValid = true;
        let errorMessage = '';

        if (required && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        } else if (minLength && value.length < parseInt(minLength)) {
            isValid = false;
            errorMessage = `Minimum length is ${minLength} characters`;
        } else if (maxLength && value.length > parseInt(maxLength)) {
            isValid = false;
            errorMessage = `Maximum length is ${maxLength} characters`;
        } else if (pattern && value && !new RegExp(pattern).test(value)) {
            isValid = false;
            errorMessage = 'Invalid format';
        }

        this.setFieldValidation(field, isValid, errorMessage);
        return isValid;
    }

    setFieldValidation(field, isValid, errorMessage = '') {
        field.classList.remove('is-valid', 'is-invalid');
        
        if (isValid) {
            field.classList.add('is-valid');
        } else {
            field.classList.add('is-invalid');
        }

        const existingError = field.parentNode.querySelector('.invalid-feedback');
        if (existingError) {
            existingError.remove();
        }

        if (!isValid && errorMessage) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'invalid-feedback';
            errorDiv.textContent = errorMessage;
            field.parentNode.appendChild(errorDiv);
        }
    }

    clearFieldError(field) {
        field.classList.remove('is-invalid');
        const errorDiv = field.parentNode.querySelector('.invalid-feedback');
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    validateForm(form) {
        const inputs = form.querySelectorAll('input, select, textarea');
        let isValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        return isValid;
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const openModal = document.querySelector('.modal.show');
                if (openModal) {
                    const modal = bootstrap.Modal.getInstance(openModal);
                    if (modal) {
                        modal.hide();
                    }
                }
            }

            if (e.key === 'Enter' && e.target.tagName === 'INPUT') {
                const form = e.target.closest('form');
                if (form) {
                    const submitButton = form.querySelector('button[type="submit"]');
                    if (submitButton && !submitButton.disabled) {
                        submitButton.click();
                    }
                }
            }
        });
    }

    setupAccessibilityFeatures() {
        const buttons = document.querySelectorAll('button:not([aria-label]):not([aria-labelledby])');
        buttons.forEach(button => {
            if (!button.getAttribute('aria-label') && !button.textContent.trim()) {
                button.setAttribute('aria-label', 'Button');
            }
        });

        const style = document.createElement('style');
        style.textContent = `
            .btn:focus,
            .form-control:focus,
            .form-select:focus {
                box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
            }
            
            .btn:focus-visible,
            .form-control:focus-visible,
            .form-select:focus-visible {
                outline: 2px solid #0d6efd;
                outline-offset: 2px;
            }
        `;
        document.head.appendChild(style);
    }

    showConfirmation(message, title = 'Confirm Action') {
        return new Promise((resolve) => {
            const modal = document.createElement('div');
            modal.className = 'modal fade';
            modal.innerHTML = `
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">${title}</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <p>${message}</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-primary" id="confirm-btn">Confirm</button>
                        </div>
                    </div>
                </div>
            `;

            document.body.appendChild(modal);
            const bsModal = new bootstrap.Modal(modal);

            modal.querySelector('#confirm-btn').addEventListener('click', () => {
                bsModal.hide();
                resolve(true);
            });

            modal.addEventListener('hidden.bs.modal', () => {
                document.body.removeChild(modal);
                resolve(false);
            });

            bsModal.show();
        });
    }

    cleanup() {
        this.tooltipInstances.forEach(tooltip => {
            tooltip.dispose();
        });
        this.tooltipInstances.clear();
    }
}

// Initialize UX enhancer when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.SmartFarmUX = new SmartFarmUXEnhancer();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SmartFarmUXEnhancer;
}