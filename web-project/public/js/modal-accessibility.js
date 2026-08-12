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
            const modal = event.target;
            this.lastFocusedElement = document.activeElement;
            // Set active early so Escape works before shown.bs.modal (WebKit timing)
            this.activeModal = modal;
            console.log('🔧 ModalAccessibility: Modal show event - stored focus:', this.lastFocusedElement);
            
            // CRITICAL: Prevent Bootstrap from setting aria-hidden="true" on show
            // We'll manage this attribute ourselves
            this.preventBootstrapAriaHidden(modal, false);
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

        // Capture phase so Escape closes even when ModalValidator / other
        // bubble listeners call stopPropagation (a11y dismissible modals).
        document.addEventListener('keydown', (event) => {
            if (event.key !== 'Escape') {
                return;
            }
            const openModal = this.activeModal
                || document.querySelector('.modal.show');
            if (!openModal) {
                return;
            }
            // Opt-out only via explicit data-allow-escape="false"
            if (openModal.getAttribute('data-allow-escape') === 'false') {
                return;
            }
            event.preventDefault();
            event.stopPropagation();
            if (typeof event.stopImmediatePropagation === 'function') {
                event.stopImmediatePropagation();
            }
            try {
                let instance = typeof bootstrap !== 'undefined'
                    ? bootstrap.Modal.getInstance(openModal)
                    : null;
                if (!instance && typeof bootstrap !== 'undefined' && bootstrap.Modal.getOrCreateInstance) {
                    instance = bootstrap.Modal.getOrCreateInstance(openModal);
                }
                    if (instance) {
                    // Bootstrap Modal.hide() is a no-op while _isTransitioning
                    // (e.g. Escape right after .show appears but before shown.bs.modal).
                    const hideNowOrWhenReady = () => {
                        const inst = bootstrap.Modal.getInstance(openModal) || instance;
                        if (!inst) {
                            return;
                        }
                        if (inst._isTransitioning) {
                            openModal._pendingEscapeClose = true;
                            const onReady = () => {
                                openModal.removeEventListener('shown.bs.modal', onReady);
                                openModal.removeEventListener('hidden.bs.modal', onReady);
                                openModal._pendingEscapeClose = false;
                                // If still open after transition, dismiss
                                if (openModal.classList.contains('show')) {
                                    inst.hide();
                                }
                            };
                            openModal.addEventListener('shown.bs.modal', onReady, { once: true });
                            openModal.addEventListener('hidden.bs.modal', onReady, { once: true });
                            return;
                        }
                        inst.hide();
                    };
                    hideNowOrWhenReady();
                } else {
                    openModal.classList.remove('show');
                    openModal.setAttribute('aria-hidden', 'true');
                    openModal.style.display = 'none';
                    document.body.classList.remove('modal-open');
                    document.querySelectorAll('.modal-backdrop').forEach((b) => b.remove());
                    this.toggleModalAccessibility(openModal, false);
                    this.handleModalHidden(openModal);
                }
            } catch (err) {
                console.warn('ModalAccessibility: Escape close failed', err);
            }
        }, true);

        // Ensure all modal close buttons actually close, even if attributes are missing
        document.addEventListener('click', (event) => {
            const closeBtn = event.target.closest('[data-bs-dismiss="modal"], .btn-close');
            if (!closeBtn) return;
            const modal = closeBtn.closest('.modal');
            if (!modal) return;

            // Proactively stop propagation to avoid other interceptors
            event.preventDefault();
            event.stopPropagation();

            // Clean up observers to avoid aria-hidden loops during hide
            if (modal._ariaHiddenObserver) {
                modal._ariaHiddenObserver.disconnect();
                delete modal._ariaHiddenObserver;
                delete modal._ariaHiddenExpected;
            }

            try {
                const instance = bootstrap?.Modal?.getInstance(modal);

                if (instance) {
                    instance.hide();
                } else {
                    // Fallback for non-Bootstrap or manually toggled dialogs
                    if (typeof bootstrap?.Modal?.getOrCreateInstance === 'function') {
                        const createdInstance = bootstrap.Modal.getOrCreateInstance(modal);
                        if (createdInstance) {
                            createdInstance.hide();
                            return;
                        }
                    }

                    // Manual hide fallback: remove visibility classes / restore scrolling
                    modal.classList.remove('show');
                    modal.setAttribute('aria-hidden', 'true');
                    modal.style.display = 'none';

                    // Clean up any leftover backdrop
                    const backdrop = document.querySelector('.modal-backdrop');
                    if (backdrop) {
                        backdrop.remove();
                    }

                    document.body.classList.remove('modal-open');
                    document.body.style.removeProperty('overflow');
                    document.body.style.removeProperty('paddingRight');

                    // Ensure accessibility state resets even if Bootstrap events don't fire
                    this.toggleModalAccessibility(modal, false);
                }
            } catch (error) {
                console.error('❌ ModalAccessibility: Failed to hide modal via close button:', error);
            }
        }, true);
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
            
            // CRITICAL: Do NOT set aria-hidden="true" initially
            // This will be managed dynamically by Bootstrap events
            // Static modals should start without aria-hidden to avoid conflicts
            if (modal.hasAttribute('aria-hidden')) {
                modal.removeAttribute('aria-hidden');
                console.log('🔧 ModalAccessibility: Removed initial aria-hidden from static modal');
            }
        });
    }

    // CRITICAL: Prevent Bootstrap from incorrectly setting aria-hidden
    preventBootstrapAriaHidden(modal, shouldBeHidden) {
        if (!modal) return;
        
        // If an observer already exists and is watching for the same expected value, reuse it
        if (modal._ariaHiddenObserver && modal._ariaHiddenExpected === shouldBeHidden) {
            return; // Already watching for this expected value, no need to create another observer
        }
        
        // Clean up any existing observer with different expected value
        if (modal._ariaHiddenObserver) {
            modal._ariaHiddenObserver.disconnect();
            delete modal._ariaHiddenObserver;
        }
        
        // Store expected value for this observer
        modal._ariaHiddenExpected = shouldBeHidden;
        
        // Track if we're making a change to prevent recursion
        let isCorrecting = false;
        let lastCorrectedValue = null;
        let correctionCount = 0;
        const MAX_CORRECTIONS = 3; // Prevent infinite loops
        
        // Use a MutationObserver to watch for aria-hidden changes
        const observer = new MutationObserver((mutations) => {
            // If we're already correcting, ignore to prevent recursion
            if (isCorrecting) {
                return;
            }
            
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'aria-hidden') {
                    const currentValue = modal.getAttribute('aria-hidden');
                    const expectedValue = shouldBeHidden ? 'true' : null;
                    
                    // Prevent correcting the same value repeatedly
                    if (currentValue === lastCorrectedValue) {
                        return;
                    }
                    
                    // Prevent infinite loops
                    if (correctionCount >= MAX_CORRECTIONS) {
                        console.warn('⚠️ ModalAccessibility: Max corrections reached, disconnecting observer');
                        observer.disconnect();
                        delete modal._ariaHiddenObserver;
                        return;
                    }
                    
                    // If Bootstrap set an incorrect value, fix it (but only if it's different)
                    if (currentValue !== expectedValue) {
                        // Only correct if we haven't already corrected this value (prevent rapid corrections)
                        if (currentValue !== lastCorrectedValue) {
                            isCorrecting = true;
                            correctionCount++;
                            
                            // Disconnect observer temporarily to prevent recursion
                            observer.disconnect();
                            
                            if (shouldBeHidden) {
                                modal.setAttribute('aria-hidden', 'true');
                                lastCorrectedValue = 'true';
                            } else {
                                modal.removeAttribute('aria-hidden');
                                lastCorrectedValue = null;
                            }
                            
                            // Reconnect observer after a delay to prevent immediate recursion
                            // Use a longer delay to ensure Bootstrap is done making changes
                            setTimeout(() => {
                                isCorrecting = false;
                                // Only reconnect if modal still exists and observer still exists and expected value hasn't changed
                                if (modal._ariaHiddenObserver && document.body.contains(modal) && modal._ariaHiddenExpected === shouldBeHidden) {
                                    observer.observe(modal, { attributes: true, attributeFilter: ['aria-hidden'] });
                                }
                            }, 200); // Longer delay to prevent recursion
                        } else {
                            // If we already corrected this value, something is wrong - disconnect to prevent infinite loop
                            if (correctionCount >= 2) {
                                console.warn('⚠️ ModalAccessibility: Multiple corrections detected, disconnecting observer to prevent loop');
                                observer.disconnect();
                                delete modal._ariaHiddenObserver;
                                delete modal._ariaHiddenExpected;
                            }
                        }
                    } else {
                        // Reset correction count if value is correct
                        correctionCount = 0;
                        lastCorrectedValue = null;
                    }
                }
            });
        });
        
        // Store observer for cleanup
        modal._ariaHiddenObserver = observer;
        observer.observe(modal, { attributes: true, attributeFilter: ['aria-hidden'] });
        
        // Clean up observer after modal is closed or 10 seconds
        const cleanupTimeout = setTimeout(() => {
            if (modal._ariaHiddenObserver) {
                modal._ariaHiddenObserver.disconnect();
                delete modal._ariaHiddenObserver;
            }
            clearTimeout(cleanupTimeout);
        }, 10000);
        
        // Also cleanup when modal is hidden
        modal.addEventListener('hidden.bs.modal', () => {
            if (modal._ariaHiddenObserver) {
                modal._ariaHiddenObserver.disconnect();
                delete modal._ariaHiddenObserver;
            }
        }, { once: true });
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

            // CRITICAL: Prevent Bootstrap from setting aria-hidden="true"
            this.preventBootstrapAriaHidden(modalEl, false);

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

            // Focus first meaningful interactive control after the modal has finished opening
            if (!modalEl._pendingEscapeClose) {
                this.focusFirstMeaningfulControl(modalEl);
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

            // CRITICAL: Clean up observer FIRST before setting aria-hidden to prevent conflicts
            if (modalEl._ariaHiddenObserver) {
                modalEl._ariaHiddenObserver.disconnect();
                delete modalEl._ariaHiddenObserver;
                delete modalEl._ariaHiddenExpected;
            }

            // Now it's safe to set aria-hidden - Bootstrap will set it correctly
            // We don't need to prevent Bootstrap anymore since modal is closing
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

    focusFirstMeaningfulControl(modalEl) {
        const catalogSelectsReady = () => {
            const pending = modalEl.querySelectorAll('select[data-catalog-group][disabled]');
            return pending.length === 0;
        };

        const pick = () => {
            if (!catalogSelectsReady()) {
                return null;
            }
            const preferred = modalEl.querySelectorAll(
                'select:not([disabled]), input:not([type="hidden"]):not([disabled]), textarea:not([disabled])'
            );
            for (const el of preferred) {
                // Visible check: getClientRects works inside Bootstrap modals (fixed positioning)
                if (el.getClientRects().length > 0) {
                    return el;
                }
            }
            const fallback = modalEl.querySelectorAll(
                'button:not(.btn-close):not([data-bs-dismiss="modal"]), [href], [tabindex]:not([tabindex="-1"])'
            );
            for (const el of fallback) {
                if (el.classList.contains('btn-close')) continue;
                if (el.getAttribute('data-bs-dismiss') === 'modal') continue;
                if (el.disabled) continue;
                if (el.getClientRects().length > 0) {
                    return el;
                }
            }
            return null;
        };

        const attemptFocus = (attempt) => {
            if (!modalEl.classList.contains('show') && attempt > 0) {
                return;
            }
            if (modalEl._pendingEscapeClose) {
                return;
            }
            const target = pick();
            if (!target) {
                // Catalog enhancers may temporarily disable the first select; keep waiting.
                if (attempt < 40) {
                    setTimeout(() => attemptFocus(attempt + 1), 50);
                } else {
                    console.warn('⚠️ ModalAccessibility: No focusable elements found in modal');
                }
                return;
            }
            try {
                target.focus({ preventScroll: false });
                if (document.activeElement !== target) {
                    target.focus();
                }
                // Confirm focus stuck for a beat (catalog/validation must not steal it)
                if (attempt < 40) {
                    setTimeout(() => {
                        if (!modalEl.classList.contains('show') || modalEl._pendingEscapeClose) {
                            return;
                        }
                        const preferred = pick();
                        if (preferred && document.activeElement !== preferred) {
                            attemptFocus(attempt + 1);
                        } else {
                            console.log('🔧 ModalAccessibility: Focused first meaningful control:', preferred || target);
                        }
                    }, 60);
                } else {
                    console.log('🔧 ModalAccessibility: Focused first meaningful control:', target);
                }
            } catch (err) {
                console.warn('ModalAccessibility: focus failed', err);
                if (attempt < 40) {
                    setTimeout(() => attemptFocus(attempt + 1), 50);
                }
            }
        };

        requestAnimationFrame(() => {
            setTimeout(() => attemptFocus(0), 40);
        });
    }

    handleModalHide(modal) {
        console.log('🔧 ModalAccessibility: Modal hiding:', modal.id || 'unnamed modal');
        
        // CRITICAL: Clean up observer immediately to prevent conflicts during hide
        if (modal._ariaHiddenObserver) {
            modal._ariaHiddenObserver.disconnect();
            delete modal._ariaHiddenObserver;
            delete modal._ariaHiddenExpected;
        }
        
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
        
        // CRITICAL: Do NOT set aria-hidden="true" initially for dynamic modals
        // This will be managed by Bootstrap events to prevent focus conflicts
        if (modal.hasAttribute('aria-hidden')) {
            modal.removeAttribute('aria-hidden');
            console.log('🔧 ModalAccessibility: Removed initial aria-hidden from dynamic modal');
        }
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
        // CRITICAL: Do NOT set aria-hidden="true" initially
        // Bootstrap will manage this attribute properly

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
                
                // Also remove aria-hidden if modal is actually visible
                if (modal.classList.contains('show') || getComputedStyle(modal).display !== 'none') {
                    console.log('🔧 ModalAccessibility: Removing aria-hidden from visible modal');
                    modal.removeAttribute('aria-hidden');
                }
            }
        }
    });
};

// Global function to fix all modal accessibility issues
window.fixAllModalAccessibility = () => {
    console.log('🔧 ModalAccessibility: Fixing all modal accessibility issues...');
    
    const allModals = document.querySelectorAll('.modal');
    allModals.forEach(modal => {
        // Ensure proper ARIA attributes
        if (!modal.hasAttribute('aria-modal')) {
            modal.setAttribute('aria-modal', 'true');
        }
        if (!modal.hasAttribute('role')) {
            modal.setAttribute('role', 'dialog');
        }
        if (!modal.hasAttribute('tabindex')) {
            modal.setAttribute('tabindex', '-1');
        }
        
        // Fix aria-hidden based on visibility
        const isVisible = modal.classList.contains('show') || 
                         getComputedStyle(modal).display !== 'none' ||
                         modal.style.display === 'block';
        
        if (isVisible && modal.hasAttribute('aria-hidden')) {
            console.log('🔧 ModalAccessibility: Removing aria-hidden from visible modal:', modal.id);
            modal.removeAttribute('aria-hidden');
        } else if (!isVisible && !modal.hasAttribute('aria-hidden')) {
            console.log('🔧 ModalAccessibility: Adding aria-hidden to hidden modal:', modal.id);
            modal.setAttribute('aria-hidden', 'true');
        }
    });
    
    console.log('✅ ModalAccessibility: All modal accessibility issues fixed');
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ModalAccessibility;
}
