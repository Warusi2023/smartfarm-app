/**
 * SmartFarm Modal Validator
 * Prevents modal closing until all required fields are validated
 */

class ModalValidator {
    constructor() {
        this.activeModals = new Map();
        this.init();
    }

    init() {
        console.log('🔒 Modal Validator initialized');
        // Listen for Bootstrap modal events
        document.addEventListener('show.bs.modal', (event) => {
            this.onModalShow(event);
        });
    }

    /**
     * Register a modal for validation
     * @param {string} modalId - The ID of the modal element
     * @param {object} options - Validation options
     */
    registerModal(modalId, options = {}) {
        const modalElement = document.getElementById(modalId);
        if (!modalElement) {
            console.error(`Modal ${modalId} not found`);
            return;
        }

        const config = {
            requireValidation: options.requireValidation !== false, // default true
            requiredFields: options.requiredFields || [],
            onValidate: options.onValidate || null,
            onSaveSuccess: options.onSaveSuccess || null,
            allowEscapeKey: options.allowEscapeKey === true, // default false
            allowBackdropClick: options.allowBackdropClick === true // default false
        };

        this.activeModals.set(modalId, {
            element: modalElement,
            config: config,
            isValidated: false,
            isSaving: false,
            originalBackdrop: null,
            originalKeyboard: null
        });

        // Disable default closing mechanisms
        this.preventClosing(modalId);
        
        console.log(`🔒 Modal registered: ${modalId}`, config);
    }

    /**
     * Prevent modal from closing by default mechanisms
     */
    preventClosing(modalId) {
        const modalData = this.activeModals.get(modalId);
        if (!modalData) return;

        const modalElement = modalData.element;
        
        // Get or create Bootstrap modal instance
        let bsModal = bootstrap.Modal.getInstance(modalElement);
        if (!bsModal) {
            bsModal = new bootstrap.Modal(modalElement, {
                backdrop: 'static',
                keyboard: false
            });
        }

        // Store original settings
        modalData.originalBackdrop = bsModal._config.backdrop;
        modalData.originalKeyboard = bsModal._config.keyboard;

        // Override settings to prevent closing
        bsModal._config.backdrop = 'static';
        bsModal._config.keyboard = false;

        // Disable close button
        const closeButtons = modalElement.querySelectorAll('[data-bs-dismiss="modal"]');
        closeButtons.forEach(btn => {
            btn.setAttribute('data-original-dismiss', 'modal');
            btn.removeAttribute('data-bs-dismiss');
            btn.style.opacity = '0.5';
            btn.style.cursor = 'not-allowed';
            btn.title = 'Please fill in all required fields first';
        });

        // Prevent ESC key
        modalElement.addEventListener('keydown', this.handleKeyDown.bind(this, modalId));

        // Prevent backdrop click
        modalElement.addEventListener('click', this.handleBackdropClick.bind(this, modalId));
    }

    /**
     * Handle keydown events
     */
    handleKeyDown(modalId, event) {
        const modalData = this.activeModals.get(modalId);
        if (!modalData) return;

        if (event.key === 'Escape' && !modalData.config.allowEscapeKey && !modalData.isValidated) {
            event.preventDefault();
            event.stopPropagation();
            this.showValidationWarning(modalId);
        }
    }

    /**
     * Handle backdrop clicks
     */
    handleBackdropClick(modalId, event) {
        const modalData = this.activeModals.get(modalId);
        if (!modalData) return;

        if (event.target === modalData.element && !modalData.config.allowBackdropClick && !modalData.isValidated) {
            event.preventDefault();
            event.stopPropagation();
            this.showValidationWarning(modalId);
        }
    }

    /**
     * Show validation warning
     */
    showValidationWarning(modalId) {
        const modalData = this.activeModals.get(modalId);
        if (!modalData) return;

        // Find or create warning element
        let warning = modalData.element.querySelector('.modal-validation-warning');
        if (!warning) {
            warning = document.createElement('div');
            warning.className = 'modal-validation-warning alert alert-warning alert-dismissible fade show position-absolute';
            warning.style.cssText = 'top: 10px; left: 50%; transform: translateX(-50%); z-index: 1060; max-width: 400px;';
            warning.innerHTML = `
                <i class="fas fa-exclamation-triangle me-2"></i>
                <strong>Required Fields Missing</strong><br>
                <small>Please fill in all required fields before closing this form.</small>
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            `;
            modalData.element.querySelector('.modal-content').style.position = 'relative';
            modalData.element.querySelector('.modal-content').appendChild(warning);

            // Auto-remove after 5 seconds
            setTimeout(() => {
                warning.classList.remove('show');
                setTimeout(() => warning.remove(), 300);
            }, 5000);
        }
    }

    /**
     * Validate modal fields
     */
    async validateModal(modalId) {
        const modalData = this.activeModals.get(modalId);
        if (!modalData) {
            console.error(`Modal ${modalId} not registered`);
            return false;
        }

        const errors = [];
        
        // Check required fields
        modalData.config.requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (!field) {
                errors.push(`Field ${fieldId} not found`);
                return;
            }

            const value = field.value ? field.value.trim() : '';
            if (!value || value === '') {
                errors.push(`${field.labels[0]?.textContent || fieldId} is required`);
                field.classList.add('is-invalid');
            } else {
                field.classList.remove('is-invalid');
            }
        });

        // Custom validation
        if (modalData.config.onValidate) {
            const customValidation = await modalData.config.onValidate(modalId);
            if (customValidation !== true) {
                if (Array.isArray(customValidation)) {
                    errors.push(...customValidation);
                } else if (typeof customValidation === 'string') {
                    errors.push(customValidation);
                }
            }
        }

        if (errors.length > 0) {
            this.showValidationErrors(modalId, errors);
            return false;
        }

        modalData.isValidated = true;
        return true;
    }

    /**
     * Show validation errors
     */
    showValidationErrors(modalId, errors) {
        const modalData = this.activeModals.get(modalId);
        if (!modalData) return;

        const errorHtml = errors.map(err => `<li>${err}</li>`).join('');
        
        let errorDiv = modalData.element.querySelector('.modal-validation-errors');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'modal-validation-errors alert alert-danger';
            const modalBody = modalData.element.querySelector('.modal-body');
            modalBody.insertBefore(errorDiv, modalBody.firstChild);
        }

        errorDiv.innerHTML = `
            <i class="fas fa-exclamation-circle me-2"></i>
            <strong>Please fix the following errors:</strong>
            <ul class="mb-0 mt-2">${errorHtml}</ul>
        `;

        // Scroll to errors
        errorDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    /**
     * Mark modal as successfully saved
     */
    markSaveSuccess(modalId) {
        const modalData = this.activeModals.get(modalId);
        if (!modalData) return;

        modalData.isValidated = true;
        modalData.isSaving = false;

        // Re-enable closing mechanisms
        this.enableClosing(modalId);

        // Show success message
        this.showSuccessMessage(modalId);

        // Auto-close after success (optional)
        setTimeout(() => {
            this.closeModal(modalId);
        }, 1500);
    }

    /**
     * Enable modal closing after successful save
     */
    enableClosing(modalId) {
        const modalData = this.activeModals.get(modalId);
        if (!modalData) return;

        const modalElement = modalData.element;
        
        // Re-enable close buttons
        const closeButtons = modalElement.querySelectorAll('[data-original-dismiss="modal"]');
        closeButtons.forEach(btn => {
            btn.setAttribute('data-bs-dismiss', 'modal');
            btn.removeAttribute('data-original-dismiss');
            btn.style.opacity = '1';
            btn.style.cursor = 'pointer';
            btn.title = '';
        });

        // Get Bootstrap modal instance
        const bsModal = bootstrap.Modal.getInstance(modalElement);
        if (bsModal) {
            bsModal._config.backdrop = modalData.originalBackdrop || true;
            bsModal._config.keyboard = modalData.originalKeyboard || true;
        }
    }

    /**
     * Show success message
     */
    showSuccessMessage(modalId) {
        const modalData = this.activeModals.get(modalId);
        if (!modalData) return;

        const successDiv = document.createElement('div');
        successDiv.className = 'alert alert-success alert-dismissible fade show position-absolute';
        successDiv.style.cssText = 'top: 10px; left: 50%; transform: translateX(-50%); z-index: 1060; max-width: 400px;';
        successDiv.innerHTML = `
            <i class="fas fa-check-circle me-2"></i>
            <strong>Success!</strong> Data saved successfully.
        `;
        modalData.element.querySelector('.modal-content').appendChild(successDiv);

        setTimeout(() => {
            successDiv.classList.remove('show');
            setTimeout(() => successDiv.remove(), 300);
        }, 1500);
    }

    /**
     * Close modal programmatically
     */
    closeModal(modalId) {
        const modalData = this.activeModals.get(modalId);
        if (!modalData) return;

        const bsModal = bootstrap.Modal.getInstance(modalData.element);
        if (bsModal) {
            bsModal.hide();
        }

        // Cleanup
        this.unregisterModal(modalId);
    }

    /**
     * Unregister modal
     */
    unregisterModal(modalId) {
        this.activeModals.delete(modalId);
    }

    /**
     * Handle modal show event
     */
    onModalShow(event) {
        const modalElement = event.target;
        const modalId = modalElement.id;

        // If modal is registered, ensure prevention is active
        if (this.activeModals.has(modalId)) {
            this.preventClosing(modalId);
        }
    }

    /**
     * Set modal as saving state
     */
    setSaving(modalId, isSaving = true) {
        const modalData = this.activeModals.get(modalId);
        if (!modalData) return;

        modalData.isSaving = isSaving;

        // Disable form inputs during save
        const form = modalData.element.querySelector('form');
        if (form) {
            const inputs = form.querySelectorAll('input, select, textarea, button');
            inputs.forEach(input => {
                if (isSaving) {
                    input.setAttribute('disabled', 'disabled');
                } else {
                    input.removeAttribute('disabled');
                }
            });
        }
    }
}

// Create global instance
window.ModalValidator = new ModalValidator();

console.log('🔒 Modal Validator loaded');





