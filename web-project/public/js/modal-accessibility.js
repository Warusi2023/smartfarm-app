/**
 * Modal Accessibility Helper
 * Fixes aria-hidden focus issues in Bootstrap modals
 * Implements WAI-ARIA compliant modal behavior with focus trapping and inert background
 * Ensures only one modal is accessible at a time
 */

class ModalAccessibility {
    constructor() {
        this.activeModal = null;
        this.lastFocusedElement = null;
        this.backgroundElements = [];
        this.modalStates = new Map(); // Track modal states
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
            this.setupModalHandlers();
            this.setupStaticModals();
        });
        } else {
            this.setupModalHandlers();
        }
    }

    setupModalHandlers() {
        // Handle all modals with proper focus management
        document.addEventListener('show.bs.modal', (event) => {
            this.lastFocusedElement = document.activeElement;
            console.log('🔧 ModalAccessibility: Modal show event - stored focus:', this.lastFocusedElement);
        });

        document.addEventListener('shown.bs.modal', (event) => {
            const modal = event.target;
            console.log('🔧 ModalAccessibility: Modal shown event for:', modal.id || 'unnamed modal');
            this.handleModalShown(modal);
        });

        document.addEventListener('hide.bs.modal', (event) => {
            const modal = event.target;
            console.log('🔧 ModalAccessibility: Modal hide event for:', modal.id || 'unnamed modal');
            this.handleModalHide(modal);
        });

        document.addEventListener('hidden.bs.modal', (event) => {
            const modal = event.target;
            console.log('🔧 ModalAccessibility: Modal hidden event for:', modal.id || 'unnamed modal');
            this.handleModalHidden(modal);
        });

        // Handle dynamically created modals
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE && node.classList?.contains('modal')) {
                        this.setupDynamicModal(node);
                    }
                });
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });

        // Handle Escape key globally for modals
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && this.activeModal) {
                const bsModal = bootstrap.Modal.getInstance(this.activeModal);
                if (bsModal) {
                    bsModal.hide();
                }
            }
        });
    }

    setupStaticModals() {
        // Find all existing static modals and set them up
        const staticModals = document.querySelectorAll('.modal');
        console.log(`🔧 ModalAccessibility: Found ${staticModals.length} static modals`);
        
        staticModals.forEach(modal => {
            console.log('🔧 ModalAccessibility: Setting up static modal:', modal.id || 'unnamed modal');
            
            // Ensure proper initial attributes
            modal.setAttribute('aria-modal', 'true');
            modal.setAttribute('role', 'dialog');
            if (!modal.hasAttribute('tabindex')) {
                modal.setAttribute('tabindex', '-1');
            }
            
            // Set aria-hidden initially (will be managed by event handlers)
            modal.setAttribute('aria-hidden', 'true');
        });
    }

    // Reusable function to toggle modal accessibility
    toggleModalAccessibility(modalEl, isOpen) {
        if (!modalEl) {
            console.warn('⚠️ ModalAccessibility: No modal element provided');
            return;
        }

        const modalId = modalEl.id || 'unnamed-modal';
        console.log(`🔧 ModalAccessibility: toggleModalAccessibility(${modalId}, ${isOpen})`);

        if (isOpen) {
            // Ensure only one modal is active at a time
            if (this.activeModal && this.activeModal !== modalEl) {
                console.log('🔧 ModalAccessibility: Hiding previous active modal');
                this.toggleModalAccessibility(this.activeModal, false);
            }

            // Set this modal as active
            this.activeModal = modalEl;
            this.modalStates.set(modalEl, 'open');

            // CRITICAL: Remove aria-hidden before any focus operations
            modalEl.removeAttribute('aria-hidden');
            
            // Ensure proper ARIA attributes
            modalEl.setAttribute('aria-modal', 'true');
            if (!modalEl.hasAttribute('role')) {
                modalEl.setAttribute('role', 'dialog');
            }
            if (!modalEl.hasAttribute('tabindex')) {
                modalEl.setAttribute('tabindex', '-1');
            }

            // Apply inert to background elements
            this.applyInertToBackground();

            // Focus management - focus on first focusable element
            const focusableElements = modalEl.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            
            if (focusableElements.length > 0) {
                // Small delay to ensure DOM is ready
                setTimeout(() => {
                    focusableElements[0].focus();
                    console.log('🔧 ModalAccessibility: Focused first element:', focusableElements[0]);
                }, 10);
            } else {
                console.warn('⚠️ ModalAccessibility: No focusable elements found in modal');
            }
            
            // Trap focus within modal
            this.trapFocus(modalEl);

        } else {
            // Modal is being closed
            this.modalStates.set(modalEl, 'closed');

            // CRITICAL: Remove focus BEFORE setting aria-hidden
            const focusedElement = modalEl.querySelector(':focus');
            if (focusedElement) {
                focusedElement.blur();
                console.log('🔧 ModalAccessibility: Removed focus from:', focusedElement);
            }

            // Set aria-hidden
            modalEl.setAttribute('aria-hidden', 'true');
            
            // Remove aria-modal
            modalEl.removeAttribute('aria-modal');

            // Remove focus trap
            this.removeFocusTrap(modalEl);

            // Clear active modal if this was it
            if (this.activeModal === modalEl) {
                this.activeModal = null;
                // Remove inert from background elements
                this.removeInertFromBackground();
            }
        }

        // Validate modal accessibility
        const issues = ModalAccessibility.validateModalAccessibility(modalEl);
        if (issues.length > 0) {
            console.error('❌ ModalAccessibility: Validation issues:', issues);
        } else {
            console.log('✅ ModalAccessibility: Modal passes validation');
        }
    }

    handleModalShown(modal) {
        console.log('🔧 ModalAccessibility: Modal shown:', modal.id || 'unnamed modal');
        this.toggleModalAccessibility(modal, true);
    }

    handleModalHide(modal) {
        console.log('🔧 ModalAccessibility: Modal hiding:', modal.id || 'unnamed modal');
        this.toggleModalAccessibility(modal, false);
    }

    handleModalHidden(modal) {
        console.log('🔧 ModalAccessibility: Modal hidden:', modal.id || 'unnamed modal');
        
        // Restore focus to element that triggered the modal
        if (this.lastFocusedElement && this.lastFocusedElement !== document.body) {
            setTimeout(() => {
                this.lastFocusedElement.focus();
                console.log('🔧 ModalAccessibility: Restored focus to:', this.lastFocusedElement);
            }, 10);
        }
    }

    setupDynamicModal(modal) {
        console.log('Setting up dynamic modal:', modal.id || 'unnamed modal');
        
        // Ensure proper initial attributes
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('tabindex', '-1');
        
        // Set aria-hidden initially (will be removed when shown)
        modal.setAttribute('aria-hidden', 'true');
    }

    applyInertToBackground() {
        // Apply inert to all body children except the modal
        const bodyChildren = Array.from(document.body.children);
        
        bodyChildren.forEach(element => {
            if (element !== this.activeModal && !element.contains(this.activeModal)) {
                // Check if inert is supported
                if ('inert' in Element.prototype) {
                    element.setAttribute('inert', 'true');
                } else {
                    // Fallback: disable focus and pointer events
                    element.style.pointerEvents = 'none';
                    element.setAttribute('tabindex', '-1');
                    element.setAttribute('aria-hidden', 'true');
                }
                this.backgroundElements.push(element);
            }
        });
    }

    removeInertFromBackground() {
        // Remove inert from all background elements
        this.backgroundElements.forEach(element => {
            element.removeAttribute('inert');
            // Remove fallback styles
            element.style.pointerEvents = '';
            element.removeAttribute('tabindex');
            element.removeAttribute('aria-hidden');
        });
        this.backgroundElements = [];
    }

    trapFocus(modal) {
        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length === 0) return;
        
        const firstFocusableElement = focusableElements[0];
        const lastFocusableElement = focusableElements[focusableElements.length - 1];

        const handleKeydown = (event) => {
            if (event.key === 'Tab') {
                if (event.shiftKey) {
                    // Shift + Tab
                    if (document.activeElement === firstFocusableElement) {
                        event.preventDefault();
                        lastFocusableElement.focus();
                    }
                } else {
                    // Tab
                    if (document.activeElement === lastFocusableElement) {
                        event.preventDefault();
                        firstFocusableElement.focus();
                    }
                }
            }
        };

        modal.addEventListener('keydown', handleKeydown);
        
        // Store the handler for cleanup
        modal._focusTrapHandler = handleKeydown;
    }

    removeFocusTrap(modal) {
        if (modal._focusTrapHandler) {
            modal.removeEventListener('keydown', modal._focusTrapHandler);
            delete modal._focusTrapHandler;
        }
    }

    // Utility method to create accessible modals
    static createModal(options = {}) {
        const {
            id = 'dynamicModal',
            title = 'Modal Title',
            content = '',
            size = 'modal-lg',
            showCloseButton = true
        } = options;

        const modal = document.createElement('div');
        modal.className = 'modal fade';
        modal.setAttribute('id', id);
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('tabindex', '-1');
        modal.setAttribute('aria-hidden', 'true'); // Initially hidden

        modal.innerHTML = `
            <div class="modal-dialog ${size}">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="${id}Label">${title}</h5>
                        ${showCloseButton ? '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>' : ''}
                    </div>
                    <div class="modal-body">
                        ${content}
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        return modal;
    }

    // Method to validate modal accessibility
    static validateModalAccessibility(modal) {
        const issues = [];
        
        // Check for aria-hidden conflict
        if (modal.hasAttribute('aria-hidden') && modal.getAttribute('aria-hidden') === 'true') {
            const focusedElement = modal.querySelector(':focus');
            if (focusedElement) {
                issues.push('Modal has aria-hidden="true" but contains focused element');
            }
        }
        
        // Check for proper ARIA attributes
        if (!modal.hasAttribute('aria-modal')) {
            issues.push('Modal missing aria-modal attribute');
        }
        
        if (!modal.hasAttribute('role')) {
            issues.push('Modal missing role attribute');
        }
        
        if (!modal.hasAttribute('tabindex')) {
            issues.push('Modal missing tabindex attribute');
        }
        
        return issues;
    }
}

// Initialize modal accessibility helper
window.ModalAccessibility = new ModalAccessibility();

// Global function for easy access
window.toggleModalAccessibility = (modalEl, isOpen) => {
    return window.ModalAccessibility.toggleModalAccessibility(modalEl, isOpen);
};

// Global function to ensure no aria-hidden conflicts
window.ensureModalAccessibility = () => {
    const allModals = document.querySelectorAll('.modal');
    allModals.forEach(modal => {
        // Check for aria-hidden conflicts
        if (modal.hasAttribute('aria-hidden') && modal.getAttribute('aria-hidden') === 'true') {
            const focusedElement = modal.querySelector(':focus');
            if (focusedElement) {
                console.warn('⚠️ ModalAccessibility: Found aria-hidden conflict, fixing...', modal);
                focusedElement.blur();
            }
        }
    });
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ModalAccessibility;
}
