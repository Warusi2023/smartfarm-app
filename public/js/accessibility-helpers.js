// SmartFarm Accessibility Helpers
// Provides utilities for keyboard navigation, ARIA labels, and loading states

class AccessibilityHelper {
    constructor() {
        this.init();
    }

    init() {
        this.setupKeyboardNavigation();
        this.setupFocusManagement();
        this.setupAriaLiveRegions();
    }

    // Keyboard Navigation
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Skip if user is typing in an input
            if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) {
                return;
            }

            // Global keyboard shortcuts
            switch(e.key) {
                case '/':
                    e.preventDefault();
                    this.focusSearch();
                    break;
                case 'Escape':
                    this.closeModals();
                    break;
                case '?':
                    e.preventDefault();
                    this.showKeyboardShortcuts();
                    break;
            }
        });

        // Make all interactive elements keyboard accessible
        this.enhanceKeyboardAccess();
    }

    enhanceKeyboardAccess() {
        // Find all onclick elements without proper keyboard support
        document.querySelectorAll('[onclick]:not([tabindex])').forEach(el => {
            if (!el.hasAttribute('tabindex')) {
                el.setAttribute('tabindex', '0');
            }
            
            // Add keyboard event listener if not present
            if (!el.hasAttribute('data-keyboard-enhanced')) {
                el.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        el.click();
                    }
                });
                el.setAttribute('data-keyboard-enhanced', 'true');
            }
        });
    }

    // Focus Management
    setupFocusManagement() {
        // Track last focused element before modal opens
        this.lastFocusedElement = null;
        
        document.addEventListener('focusin', (e) => {
            if (!e.target.closest('.modal')) {
                this.lastFocusedElement = e.target;
            }
        });
    }

    focusSearch() {
        const searchInput = document.querySelector('input[type="search"], input[name="search"]');
        if (searchInput) {
            searchInput.focus();
        }
    }

    closeModals() {
        const modals = document.querySelectorAll('.modal.show');
        modals.forEach(modal => {
            const closeBtn = modal.querySelector('[data-bs-dismiss="modal"]');
            if (closeBtn) {
                closeBtn.click();
            }
        });
    }

    // ARIA Live Regions
    setupAriaLiveRegions() {
        // Create global announcement region if it doesn't exist
        if (!document.getElementById('aria-announcements')) {
            const announcer = document.createElement('div');
            announcer.id = 'aria-announcements';
            announcer.setAttribute('aria-live', 'polite');
            announcer.setAttribute('aria-atomic', 'true');
            announcer.className = 'sr-only';
            document.body.appendChild(announcer);
        }
    }

    announce(message, priority = 'polite') {
        const announcer = document.getElementById('aria-announcements');
        if (announcer) {
            announcer.setAttribute('aria-live', priority);
            announcer.textContent = message;
            
            // Clear after 1 second
            setTimeout(() => {
                announcer.textContent = '';
            }, 1000);
        }
    }

    // Loading States
    setLoading(element, isLoading, loadingText = 'Loading...') {
        if (!element) return;

        if (isLoading) {
            element.disabled = true;
            element.setAttribute('aria-busy', 'true');
            element.dataset.originalText = element.textContent;
            
            // Add spinner
            const spinner = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>';
            element.innerHTML = spinner + loadingText;
        } else {
            element.disabled = false;
            element.removeAttribute('aria-busy');
            element.innerHTML = element.dataset.originalText || element.textContent;
            delete element.dataset.originalText;
        }
    }

    // Tooltip for disabled buttons
    addDisabledTooltip(element, reason) {
        if (!element) return;

        element.setAttribute('data-bs-toggle', 'tooltip');
        element.setAttribute('data-bs-placement', 'top');
        element.setAttribute('title', `Disabled: ${reason}`);
        element.setAttribute('aria-label', `Disabled button: ${reason}`);

        // Initialize Bootstrap tooltip
        if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
            new bootstrap.Tooltip(element);
        }
    }

    // Error announcements
    announceError(message) {
        this.announce(`Error: ${message}`, 'assertive');
    }

    // Success announcements
    announceSuccess(message) {
        this.announce(`Success: ${message}`, 'polite');
    }

    // Keyboard shortcuts modal
    showKeyboardShortcuts() {
        const shortcuts = [
            { key: '/', description: 'Focus search' },
            { key: 'Esc', description: 'Close modals' },
            { key: '?', description: 'Show this help' },
            { key: 'Enter/Space', description: 'Activate button' },
            { key: 'Tab', description: 'Navigate forward' },
            { key: 'Shift + Tab', description: 'Navigate backward' }
        ];

        const modalHTML = `
            <div class="modal fade" id="keyboardShortcutsModal" tabindex="-1" aria-labelledby="keyboardShortcutsModalLabel" aria-modal="true" role="dialog">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="keyboardShortcutsModalLabel">
                                <i class="fas fa-keyboard me-2"></i>Keyboard Shortcuts
                            </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <div class="list-group">
                                ${shortcuts.map(s => `
                                    <div class="list-group-item d-flex justify-content-between align-items-center">
                                        <span>${s.description}</span>
                                        <kbd class="bg-dark text-white px-2 py-1 rounded">${s.key}</kbd>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Remove existing modal if present
        const existingModal = document.getElementById('keyboardShortcutsModal');
        if (existingModal) {
            existingModal.remove();
        }

        // Add modal to body
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // Show modal
        const modal = new bootstrap.Modal(document.getElementById('keyboardShortcutsModal'));
        modal.show();
    }

    // Add skip links
    addSkipLinks() {
        const skipLinksHTML = `
            <div class="skip-links">
                <a href="#main-content" class="skip-link">Skip to main content</a>
                <a href="#navigation" class="skip-link">Skip to navigation</a>
            </div>
        `;

        const skipLinksCSS = `
            <style>
                .skip-links {
                    position: absolute;
                    top: -100px;
                    left: 0;
                    z-index: 9999;
                }
                .skip-link {
                    position: absolute;
                    top: -100px;
                    left: 0;
                    background: #000;
                    color: #fff;
                    padding: 8px;
                    text-decoration: none;
                    border-radius: 0 0 8px 0;
                }
                .skip-link:focus {
                    top: 0;
                }
                .sr-only {
                    position: absolute;
                    width: 1px;
                    height: 1px;
                    padding: 0;
                    margin: -1px;
                    overflow: hidden;
                    clip: rect(0,0,0,0);
                    white-space: nowrap;
                    border-width: 0;
                }
            </style>
        `;

        // Add skip links at the beginning of body
        if (!document.querySelector('.skip-links')) {
            document.body.insertAdjacentHTML('afterbegin', skipLinksHTML);
            document.head.insertAdjacentHTML('beforeend', skipLinksCSS);
        }
    }

    // Debounce helper for search/input
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Throttle helper for scroll/resize events
    throttle(func, limit) {
        let inThrottle;
        return function executedFunction(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    window.a11y = new AccessibilityHelper();
    window.a11y.addSkipLinks();
    
    // Re-enhance keyboard access after dynamic content loads
    const observer = new MutationObserver(() => {
        window.a11y.enhanceKeyboardAccess();
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AccessibilityHelper;
}

