/**
 * SmartFarm Accessibility Enhancer
 * Comprehensive accessibility improvements for better UX
 */

class AccessibilityEnhancer {
    constructor() {
        this.keyboardNavigation = true;
        this.screenReaderSupport = true;
        this.highContrastMode = false;
        this.fontSizeMultiplier = 1;
        this.init();
    }

    init() {
        this.setupKeyboardNavigation();
        this.setupScreenReaderSupport();
        this.setupHighContrastMode();
        this.setupFontSizeControl();
        this.setupFocusManagement();
        this.setupARIALabels();
        this.setupColorContrast();
        this.setupMotionReduction();
    }

    // Keyboard navigation support
    setupKeyboardNavigation() {
        // Add keyboard event listeners
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardNavigation(e);
        });

        // Make all interactive elements focusable
        this.makeElementsFocusable();

        // Add skip links
        this.addSkipLinks();
    }

    handleKeyboardNavigation(e) {
        // Tab navigation
        if (e.key === 'Tab') {
            this.handleTabNavigation(e);
        }

        // Enter and Space for buttons
        if (e.key === 'Enter' || e.key === ' ') {
            this.handleActivation(e);
        }

        // Arrow keys for menus
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
            this.handleArrowNavigation(e);
        }

        // Escape key
        if (e.key === 'Escape') {
            this.handleEscape(e);
        }
    }

    handleTabNavigation(e) {
        const focusableElements = this.getFocusableElements();
        const currentIndex = focusableElements.indexOf(document.activeElement);

        if (e.shiftKey) {
            // Shift + Tab (backward)
            if (currentIndex <= 0) {
                e.preventDefault();
                focusableElements[focusableElements.length - 1]?.focus();
            }
        } else {
            // Tab (forward)
            if (currentIndex >= focusableElements.length - 1) {
                e.preventDefault();
                focusableElements[0]?.focus();
            }
        }
    }

    handleActivation(e) {
        const target = e.target;
        
        if (target.tagName === 'BUTTON' || target.getAttribute('role') === 'button') {
            e.preventDefault();
            target.click();
        }
    }

    handleArrowNavigation(e) {
        const target = e.target;
        
        if (target.getAttribute('role') === 'menu' || target.closest('[role="menu"]')) {
            e.preventDefault();
            this.navigateMenu(e.key, target);
        }
    }

    handleEscape(e) {
        // Close modals, dropdowns, etc.
        const modals = document.querySelectorAll('.modal.show');
        modals.forEach(modal => {
            const bsModal = bootstrap.Modal.getInstance(modal);
            if (bsModal) {
                bsModal.hide();
            }
        });

        // Close dropdowns
        const dropdowns = document.querySelectorAll('.dropdown-menu.show');
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('show');
        });
    }

    makeElementsFocusable() {
        // Add tabindex to custom elements
        document.querySelectorAll('.btn, .nav-link, .dropdown-toggle').forEach(element => {
            if (!element.hasAttribute('tabindex')) {
                element.setAttribute('tabindex', '0');
            }
        });

        // Make cards focusable
        document.querySelectorAll('.dashboard-card').forEach(card => {
            card.setAttribute('tabindex', '0');
            card.setAttribute('role', 'button');
            card.addEventListener('click', () => {
                card.focus();
            });
        });
    }

    addSkipLinks() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main-content';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: #000;
            color: #fff;
            padding: 8px;
            text-decoration: none;
            z-index: 1000;
            border-radius: 4px;
        `;
        
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });

        document.body.insertBefore(skipLink, document.body.firstChild);
    }

    // Screen reader support
    setupScreenReaderSupport() {
        // Add ARIA live regions for dynamic content
        this.addLiveRegions();

        // Announce page changes
        this.announcePageChanges();

        // Add screen reader only text
        this.addScreenReaderText();
    }

    addLiveRegions() {
        // Status announcements
        const statusRegion = document.createElement('div');
        statusRegion.setAttribute('aria-live', 'polite');
        statusRegion.setAttribute('aria-atomic', 'true');
        statusRegion.className = 'sr-only';
        statusRegion.id = 'status-announcements';
        document.body.appendChild(statusRegion);

        // Alert announcements
        const alertRegion = document.createElement('div');
        alertRegion.setAttribute('aria-live', 'assertive');
        alertRegion.setAttribute('aria-atomic', 'true');
        alertRegion.className = 'sr-only';
        alertRegion.id = 'alert-announcements';
        document.body.appendChild(alertRegion);
    }

    announcePageChanges() {
        // Announce when content changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach(mutation => {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    this.announce('Content updated');
                }
            });
        });

        observer.observe(document.querySelector('.main-content'), {
            childList: true,
            subtree: true
        });
    }

    addScreenReaderText() {
        // Add screen reader only labels
        const elements = [
            { selector: '.fas.fa-download', text: 'Download' },
            { selector: '.fas.fa-print', text: 'Print' },
            { selector: '.fas.fa-plus', text: 'Add' },
            { selector: '.fas.fa-edit', text: 'Edit' },
            { selector: '.fas.fa-trash', text: 'Delete' },
            { selector: '.fas.fa-save', text: 'Save' },
            { selector: '.fas.fa-search', text: 'Search' }
        ];

        elements.forEach(({ selector, text }) => {
            document.querySelectorAll(selector).forEach(element => {
                if (!element.getAttribute('aria-label')) {
                    element.setAttribute('aria-label', text);
                }
            });
        });
    }

    // High contrast mode
    setupHighContrastMode() {
        // Check for system preference
        if (window.matchMedia('(prefers-contrast: high)').matches) {
            this.enableHighContrast();
        }

        // Add toggle button
        this.addHighContrastToggle();
    }

    enableHighContrast() {
        this.highContrastMode = true;
        document.body.classList.add('high-contrast');
        
        // Update CSS variables
        document.documentElement.style.setProperty('--primary-color', '#000000');
        document.documentElement.style.setProperty('--secondary-color', '#ffffff');
        document.documentElement.style.setProperty('--text-color', '#000000');
        document.documentElement.style.setProperty('--background-color', '#ffffff');
    }

    disableHighContrast() {
        this.highContrastMode = false;
        document.body.classList.remove('high-contrast');
        
        // Reset CSS variables
        document.documentElement.style.removeProperty('--primary-color');
        document.documentElement.style.removeProperty('--secondary-color');
        document.documentElement.style.removeProperty('--text-color');
        document.documentElement.style.removeProperty('--background-color');
    }

    addHighContrastToggle() {
        const toggle = document.createElement('button');
        toggle.textContent = 'High Contrast';
        toggle.className = 'btn btn-outline-secondary btn-sm';
        toggle.setAttribute('aria-label', 'Toggle high contrast mode');
        toggle.addEventListener('click', () => {
            if (this.highContrastMode) {
                this.disableHighContrast();
                toggle.textContent = 'High Contrast';
            } else {
                this.enableHighContrast();
                toggle.textContent = 'Normal Contrast';
            }
        });

        // Add to accessibility toolbar
        const toolbar = this.getAccessibilityToolbar();
        toolbar.appendChild(toggle);
    }

    // Font size control
    setupFontSizeControl() {
        this.addFontSizeControls();
        
        // Check for system preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.fontSizeMultiplier = 1.2;
            this.updateFontSize();
        }
    }

    addFontSizeControls() {
        const container = document.createElement('div');
        container.className = 'font-size-controls';
        container.innerHTML = `
            <button class="btn btn-sm btn-outline-secondary" aria-label="Decrease font size">A-</button>
            <span class="font-size-indicator">100%</span>
            <button class="btn btn-sm btn-outline-secondary" aria-label="Increase font size">A+</button>
        `;

        const decreaseBtn = container.querySelector('button:first-child');
        const increaseBtn = container.querySelector('button:last-child');
        const indicator = container.querySelector('.font-size-indicator');

        decreaseBtn.addEventListener('click', () => {
            this.fontSizeMultiplier = Math.max(0.8, this.fontSizeMultiplier - 0.1);
            this.updateFontSize();
            indicator.textContent = `${Math.round(this.fontSizeMultiplier * 100)}%`;
        });

        increaseBtn.addEventListener('click', () => {
            this.fontSizeMultiplier = Math.min(1.5, this.fontSizeMultiplier + 0.1);
            this.updateFontSize();
            indicator.textContent = `${Math.round(this.fontSizeMultiplier * 100)}%`;
        });

        const toolbar = this.getAccessibilityToolbar();
        toolbar.appendChild(container);
    }

    updateFontSize() {
        document.documentElement.style.setProperty('--font-size-multiplier', this.fontSizeMultiplier);
        document.body.style.fontSize = `${this.fontSizeMultiplier}rem`;
    }

    // Focus management
    setupFocusManagement() {
        // Trap focus in modals
        this.setupFocusTrap();

        // Restore focus after navigation
        this.setupFocusRestoration();

        // Visible focus indicators
        this.setupFocusIndicators();
    }

    setupFocusTrap() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                const modal = document.querySelector('.modal.show');
                if (modal) {
                    this.trapFocusInModal(e, modal);
                }
            }
        });
    }

    trapFocusInModal(e, modal) {
        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            }
        } else {
            if (document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    }

    setupFocusRestoration() {
        let lastFocusedElement = null;

        document.addEventListener('focusin', (e) => {
            lastFocusedElement = e.target;
        });

        // Restore focus after modal closes
        document.addEventListener('hidden.bs.modal', () => {
            if (lastFocusedElement) {
                lastFocusedElement.focus();
            }
        });
    }

    setupFocusIndicators() {
        // Add visible focus styles
        const style = document.createElement('style');
        style.textContent = `
            *:focus {
                outline: 2px solid #007bff !important;
                outline-offset: 2px !important;
            }
            
            .btn:focus,
            .nav-link:focus {
                box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25) !important;
            }
        `;
        document.head.appendChild(style);
    }

    // ARIA labels and roles
    setupARIALabels() {
        // Add ARIA labels to form elements
        document.querySelectorAll('input, textarea, select').forEach(element => {
            if (!element.getAttribute('aria-label') && !element.getAttribute('aria-labelledby')) {
                const label = document.querySelector(`label[for="${element.id}"]`);
                if (label) {
                    element.setAttribute('aria-labelledby', label.id || 'label-' + element.id);
                }
            }
        });

        // Add ARIA roles to custom components
        document.querySelectorAll('.dashboard-card').forEach(card => {
            card.setAttribute('role', 'region');
            card.setAttribute('aria-label', 'Dashboard section');
        });

        // Add ARIA live regions to dynamic content
        document.querySelectorAll('.alert').forEach(alert => {
            alert.setAttribute('role', 'alert');
            alert.setAttribute('aria-live', 'polite');
        });
    }

    // Color contrast
    setupColorContrast() {
        // Check color contrast ratios
        this.checkColorContrast();

        // Add color contrast warnings
        this.addColorContrastWarnings();
    }

    checkColorContrast() {
        // This would integrate with a color contrast checking library
        console.log('Color contrast checking would be implemented here');
    }

    addColorContrastWarnings() {
        // Add warnings for low contrast elements
        const lowContrastElements = document.querySelectorAll('.text-muted, .text-secondary');
        lowContrastElements.forEach(element => {
            element.setAttribute('aria-label', element.textContent + ' (low contrast text)');
        });
    }

    // Motion reduction
    setupMotionReduction() {
        // Check for reduced motion preference
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.reduceMotion();
        }

        // Add motion reduction toggle
        this.addMotionReductionToggle();
    }

    reduceMotion() {
        const style = document.createElement('style');
        style.textContent = `
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `;
        document.head.appendChild(style);
    }

    addMotionReductionToggle() {
        const toggle = document.createElement('button');
        toggle.textContent = 'Reduce Motion';
        toggle.className = 'btn btn-outline-secondary btn-sm';
        toggle.setAttribute('aria-label', 'Toggle reduced motion');
        toggle.addEventListener('click', () => {
            if (document.body.classList.contains('reduced-motion')) {
                document.body.classList.remove('reduced-motion');
                toggle.textContent = 'Reduce Motion';
            } else {
                document.body.classList.add('reduced-motion');
                toggle.textContent = 'Normal Motion';
            }
        });

        const toolbar = this.getAccessibilityToolbar();
        toolbar.appendChild(toggle);
    }

    // Utility methods
    getFocusableElements() {
        return Array.from(document.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )).filter(element => {
            return !element.disabled && 
                   !element.hidden && 
                   element.offsetParent !== null;
        });
    }

    getAccessibilityToolbar() {
        let toolbar = document.getElementById('accessibility-toolbar');
        if (!toolbar) {
            toolbar = document.createElement('div');
            toolbar.id = 'accessibility-toolbar';
            toolbar.className = 'accessibility-toolbar';
            toolbar.style.cssText = `
                position: fixed;
                top: 10px;
                right: 10px;
                z-index: 1000;
                background: white;
                padding: 10px;
                border-radius: 5px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                display: flex;
                gap: 10px;
                align-items: center;
            `;
            document.body.appendChild(toolbar);
        }
        return toolbar;
    }

    announce(message, priority = 'polite') {
        const region = document.getElementById(priority === 'assertive' ? 'alert-announcements' : 'status-announcements');
        if (region) {
            region.textContent = message;
            setTimeout(() => {
                region.textContent = '';
            }, 1000);
        }
    }

    navigateMenu(direction, element) {
        const menuItems = Array.from(element.querySelectorAll('[role="menuitem"]'));
        const currentIndex = menuItems.indexOf(element);
        let nextIndex;

        switch (direction) {
            case 'ArrowUp':
            case 'ArrowLeft':
                nextIndex = currentIndex > 0 ? currentIndex - 1 : menuItems.length - 1;
                break;
            case 'ArrowDown':
            case 'ArrowRight':
                nextIndex = currentIndex < menuItems.length - 1 ? currentIndex + 1 : 0;
                break;
        }

        if (nextIndex !== undefined) {
            menuItems[nextIndex].focus();
        }
    }
}

// Initialize accessibility enhancer
window.accessibilityEnhancer = new AccessibilityEnhancer();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AccessibilityEnhancer;
}
