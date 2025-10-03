/**
 * Modal Accessibility Helper
 * Fixes aria-hidden focus issues in Bootstrap modals
 */

class ModalAccessibility {
    constructor() {
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
        document.addEventListener('shown.bs.modal', (event) => {
            const modal = event.target;
            this.handleModalShown(modal);
        });

        document.addEventListener('hide.bs.modal', (event) => {
            const modal = event.target;
            this.handleModalHide(modal);
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
    }

    handleModalShown(modal) {
        console.log('Modal shown:', modal.id || 'unnamed modal');
        
        // Remove aria-hidden when modal is shown
        modal.removeAttribute('aria-hidden');
        
        // Ensure proper ARIA attributes
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('role', 'dialog');
        
        // Focus management - focus on first focusable element
        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length > 0) {
            // Focus on first focusable element
            focusableElements[0].focus();
        }
        
        // Store reference to last focused element for restoration
        this.lastFocusedElement = document.activeElement;
        
        // Trap focus within modal
        this.trapFocus(modal);
    }

    handleModalHide(modal) {
        console.log('Modal hidden:', modal.id || 'unnamed modal');
        
        // Set aria-hidden when modal is being hidden
        modal.setAttribute('aria-hidden', 'true');
        
        // Remove focus trap
        this.removeFocusTrap(modal);
        
        // Restore focus to element that triggered the modal
        if (this.lastFocusedElement && this.lastFocusedElement !== document.body) {
            this.lastFocusedElement.focus();
        }
    }

    setupDynamicModal(modal) {
        console.log('Setting up dynamic modal:', modal.id || 'unnamed modal');
        
        // Ensure proper initial attributes
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('tabindex', '-1');
        
        // Remove any existing aria-hidden to let Bootstrap handle it
        modal.removeAttribute('aria-hidden');
    }

    trapFocus(modal) {
        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        const firstFocusableElement = focusableElements[0];
        const lastFocusableElement = focusableElements[focusableElements.length - 1];

        modal.addEventListener('keydown', (event) => {
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
            
            // Escape key to close modal
            if (event.key === 'Escape') {
                const bsModal = bootstrap.Modal.getInstance(modal);
                if (bsModal) {
                    bsModal.hide();
                }
            }
        });
    }

    removeFocusTrap(modal) {
        // Remove event listeners by cloning the modal
        const newModal = modal.cloneNode(true);
        modal.parentNode.replaceChild(newModal, modal);
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
}

// Initialize modal accessibility helper
window.ModalAccessibility = new ModalAccessibility();

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ModalAccessibility;
}
