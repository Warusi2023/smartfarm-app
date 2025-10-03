/**
 * Modal Accessibility Helper
 * Fixes aria-hidden focus issues in Bootstrap modals
 * Implements WAI-ARIA compliant modal behavior with focus trapping and inert background
 */

class ModalAccessibility {
    constructor() {
        this.activeModal = null;
        this.lastFocusedElement = null;
        this.backgroundElements = [];
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupModalHandlers());
        } else {
            this.setupModalHandlers();
        }
    }

    setupModalHandlers() {
        // Handle all modals with proper focus management
        document.addEventListener('show.bs.modal', (event) => {
            this.lastFocusedElement = document.activeElement;
        });

        document.addEventListener('shown.bs.modal', (event) => {
            const modal = event.target;
            this.handleModalShown(modal);
        });

        document.addEventListener('hide.bs.modal', (event) => {
            const modal = event.target;
            this.handleModalHide(modal);
        });

        document.addEventListener('hidden.bs.modal', (event) => {
            this.handleModalHidden(event.target);
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

    handleModalShown(modal) {
        console.log('🔧 ModalAccessibility: Modal shown:', modal.id || 'unnamed modal');
        
        // Set active modal reference
        this.activeModal = modal;
        
        // Remove aria-hidden when modal is shown (Bootstrap sets this incorrectly)
        const hadAriaHidden = modal.hasAttribute('aria-hidden');
        modal.removeAttribute('aria-hidden');
        console.log('🔧 ModalAccessibility: Removed aria-hidden:', hadAriaHidden);
        
        // Ensure proper ARIA attributes
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('role', 'dialog');
        console.log('🔧 ModalAccessibility: Set ARIA attributes');
        
        // Apply inert to background elements
        this.applyInertToBackground();
        
        // Focus management - focus on first focusable element
        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length > 0) {
            // Focus on first focusable element
            focusableElements[0].focus();
            console.log('🔧 ModalAccessibility: Focused first element:', focusableElements[0]);
        } else {
            console.warn('⚠️ ModalAccessibility: No focusable elements found in modal');
        }
        
        // Trap focus within modal
        this.trapFocus(modal);
        
        // Validate modal accessibility
        const issues = ModalAccessibility.validateModalAccessibility(modal);
        if (issues.length > 0) {
            console.error('❌ ModalAccessibility: Validation issues:', issues);
        } else {
            console.log('✅ ModalAccessibility: Modal passes validation');
        }
    }

    handleModalHide(modal) {
        console.log('🔧 ModalAccessibility: Modal hiding:', modal.id || 'unnamed modal');
        
        // Set aria-hidden when modal is being hidden
        modal.setAttribute('aria-hidden', 'true');
        console.log('🔧 ModalAccessibility: Set aria-hidden="true"');
        
        // Remove focus trap
        this.removeFocusTrap(modal);
    }

    handleModalHidden(modal) {
        console.log('🔧 ModalAccessibility: Modal hidden:', modal.id || 'unnamed modal');
        
        // Clear active modal reference
        this.activeModal = null;
        
        // Remove inert from background elements
        this.removeInertFromBackground();
        console.log('🔧 ModalAccessibility: Removed inert from background');
        
        // Restore focus to element that triggered the modal
        if (this.lastFocusedElement && this.lastFocusedElement !== document.body) {
            this.lastFocusedElement.focus();
            console.log('🔧 ModalAccessibility: Restored focus to:', this.lastFocusedElement);
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

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ModalAccessibility;
}
