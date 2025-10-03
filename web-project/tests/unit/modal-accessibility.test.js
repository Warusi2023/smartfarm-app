/**
 * Modal Accessibility Unit Tests
 * Tests for aria-hidden focus issues and modal accessibility compliance
 */

describe('Modal Accessibility', () => {
    let testModal;
    let modalAccessibility;

    beforeEach(() => {
        // Create a test modal
        testModal = document.createElement('div');
        testModal.className = 'modal fade';
        testModal.id = 'testModal';
        testModal.innerHTML = `
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Test Modal</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <input type="text" placeholder="Test input">
                        <button type="button">Test Button</button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(testModal);

        // Initialize modal accessibility
        modalAccessibility = new ModalAccessibility();
    });

    afterEach(() => {
        if (testModal.parentNode) {
            testModal.remove();
        }
    });

    describe('ARIA Attribute Management', () => {
        test('should set aria-hidden="true" initially', () => {
            expect(testModal.getAttribute('aria-hidden')).toBe('true');
        });

        test('should remove aria-hidden when modal is shown', () => {
            // Simulate modal shown event
            const event = new CustomEvent('shown.bs.modal', { target: testModal });
            document.dispatchEvent(event);

            expect(testModal.hasAttribute('aria-hidden')).toBe(false);
        });

        test('should set aria-modal="true" when modal is shown', () => {
            const event = new CustomEvent('shown.bs.modal', { target: testModal });
            document.dispatchEvent(event);

            expect(testModal.getAttribute('aria-modal')).toBe('true');
        });

        test('should set role="dialog" when modal is shown', () => {
            const event = new CustomEvent('shown.bs.modal', { target: testModal });
            document.dispatchEvent(event);

            expect(testModal.getAttribute('role')).toBe('dialog');
        });

        test('should restore aria-hidden="true" when modal is hidden', () => {
            // First show the modal
            const showEvent = new CustomEvent('shown.bs.modal', { target: testModal });
            document.dispatchEvent(showEvent);

            // Then hide it
            const hideEvent = new CustomEvent('hide.bs.modal', { target: testModal });
            document.dispatchEvent(hideEvent);

            expect(testModal.getAttribute('aria-hidden')).toBe('true');
        });
    });

    describe('Focus Management', () => {
        test('should focus first input when modal is shown', () => {
            const firstInput = testModal.querySelector('input');
            
            const event = new CustomEvent('shown.bs.modal', { target: testModal });
            document.dispatchEvent(event);

            expect(document.activeElement).toBe(firstInput);
        });

        test('should trap focus within modal', () => {
            const firstInput = testModal.querySelector('input');
            const button = testModal.querySelector('button');
            
            // Show modal and focus first input
            const showEvent = new CustomEvent('shown.bs.modal', { target: testModal });
            document.dispatchEvent(showEvent);
            firstInput.focus();

            // Simulate Tab key
            const tabEvent = new KeyboardEvent('keydown', { key: 'Tab' });
            testModal.dispatchEvent(tabEvent);

            // Focus should move to button (next focusable element)
            expect(document.activeElement).toBe(button);
        });

        test('should return focus to trigger element when modal is hidden', () => {
            const triggerButton = document.createElement('button');
            triggerButton.textContent = 'Open Modal';
            document.body.appendChild(triggerButton);
            triggerButton.focus();

            // Show modal
            const showEvent = new CustomEvent('shown.bs.modal', { target: testModal });
            document.dispatchEvent(showEvent);

            // Hide modal
            const hideEvent = new CustomEvent('hidden.bs.modal', { target: testModal });
            document.dispatchEvent(hideEvent);

            expect(document.activeElement).toBe(triggerButton);
            
            triggerButton.remove();
        });
    });

    describe('Inert Attribute', () => {
        test('should apply inert to background elements when modal is shown', () => {
            const backgroundDiv = document.createElement('div');
            backgroundDiv.id = 'background-element';
            document.body.appendChild(backgroundDiv);

            const event = new CustomEvent('shown.bs.modal', { target: testModal });
            document.dispatchEvent(event);

            expect(backgroundDiv.hasAttribute('inert')).toBe(true);
            
            backgroundDiv.remove();
        });

        test('should remove inert from background elements when modal is hidden', () => {
            const backgroundDiv = document.createElement('div');
            backgroundDiv.id = 'background-element';
            document.body.appendChild(backgroundDiv);

            // Show modal (applies inert)
            const showEvent = new CustomEvent('shown.bs.modal', { target: testModal });
            document.dispatchEvent(showEvent);

            // Hide modal (removes inert)
            const hideEvent = new CustomEvent('hidden.bs.modal', { target: testModal });
            document.dispatchEvent(hideEvent);

            expect(backgroundDiv.hasAttribute('inert')).toBe(false);
            
            backgroundDiv.remove();
        });
    });

    describe('Accessibility Validation', () => {
        test('should detect aria-hidden focus conflicts', () => {
            testModal.setAttribute('aria-hidden', 'true');
            const input = testModal.querySelector('input');
            input.focus();

            const issues = ModalAccessibility.validateModalAccessibility(testModal);
            expect(issues).toContain('Modal has aria-hidden="true" but contains focused element');
        });

        test('should detect missing ARIA attributes', () => {
            testModal.removeAttribute('aria-modal');
            testModal.removeAttribute('role');
            testModal.removeAttribute('tabindex');

            const issues = ModalAccessibility.validateModalAccessibility(testModal);
            expect(issues).toContain('Modal missing aria-modal attribute');
            expect(issues).toContain('Modal missing role attribute');
            expect(issues).toContain('Modal missing tabindex attribute');
        });

        test('should pass validation for properly configured modal', () => {
            testModal.setAttribute('aria-modal', 'true');
            testModal.setAttribute('role', 'dialog');
            testModal.setAttribute('tabindex', '-1');

            const issues = ModalAccessibility.validateModalAccessibility(testModal);
            expect(issues.length).toBe(0);
        });
    });

    describe('Keyboard Navigation', () => {
        test('should handle Escape key to close modal', () => {
            const mockHide = jest.fn();
            
            // Mock Bootstrap Modal instance
            const mockModal = { hide: mockHide };
            jest.spyOn(bootstrap.Modal, 'getInstance').mockReturnValue(mockModal);

            // Show modal
            const showEvent = new CustomEvent('shown.bs.modal', { target: testModal });
            document.dispatchEvent(showEvent);

            // Simulate Escape key
            const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
            document.dispatchEvent(escapeEvent);

            expect(mockHide).toHaveBeenCalled();
        });

        test('should trap focus with Tab key', () => {
            const firstInput = testModal.querySelector('input');
            const button = testModal.querySelector('button');
            const closeButton = testModal.querySelector('.btn-close');
            
            // Show modal
            const showEvent = new CustomEvent('shown.bs.modal', { target: testModal });
            document.dispatchEvent(showEvent);
            firstInput.focus();

            // Tab from first input to button
            const tabEvent = new KeyboardEvent('keydown', { key: 'Tab' });
            testModal.dispatchEvent(tabEvent);
            expect(document.activeElement).toBe(button);

            // Tab from button to close button
            testModal.dispatchEvent(tabEvent);
            expect(document.activeElement).toBe(closeButton);

            // Tab from last element should wrap to first
            testModal.dispatchEvent(tabEvent);
            expect(document.activeElement).toBe(firstInput);
        });

        test('should handle Shift+Tab for reverse focus', () => {
            const firstInput = testModal.querySelector('input');
            const closeButton = testModal.querySelector('.btn-close');
            
            // Show modal and focus close button
            const showEvent = new CustomEvent('shown.bs.modal', { target: testModal });
            document.dispatchEvent(showEvent);
            closeButton.focus();

            // Shift+Tab from close button should go to first input
            const shiftTabEvent = new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true });
            testModal.dispatchEvent(shiftTabEvent);
            expect(document.activeElement).toBe(firstInput);
        });
    });

    describe('Dynamic Modal Creation', () => {
        test('should create accessible modal with proper attributes', () => {
            const dynamicModal = ModalAccessibility.createModal({
                id: 'dynamicTestModal',
                title: 'Dynamic Modal',
                content: '<p>Dynamic content</p>'
            });

            expect(dynamicModal.getAttribute('id')).toBe('dynamicTestModal');
            expect(dynamicModal.getAttribute('aria-modal')).toBe('true');
            expect(dynamicModal.getAttribute('role')).toBe('dialog');
            expect(dynamicModal.getAttribute('tabindex')).toBe('-1');
            expect(dynamicModal.getAttribute('aria-hidden')).toBe('true');

            dynamicModal.remove();
        });

        test('should setup dynamic modal for accessibility', () => {
            const dynamicModal = ModalAccessibility.createModal({
                id: 'dynamicTestModal2',
                title: 'Dynamic Modal 2'
            });

            modalAccessibility.setupDynamicModal(dynamicModal);

            expect(dynamicModal.getAttribute('aria-modal')).toBe('true');
            expect(dynamicModal.getAttribute('role')).toBe('dialog');
            expect(dynamicModal.getAttribute('tabindex')).toBe('-1');

            dynamicModal.remove();
        });
    });

    describe('Error Handling', () => {
        test('should handle missing modal gracefully', () => {
            const invalidModal = document.createElement('div');
            invalidModal.className = 'not-a-modal';

            const showEvent = new CustomEvent('shown.bs.modal', { target: invalidModal });
            expect(() => document.dispatchEvent(showEvent)).not.toThrow();
        });

        test('should handle modal without focusable elements', () => {
            const noFocusModal = document.createElement('div');
            noFocusModal.className = 'modal fade';
            noFocusModal.innerHTML = '<div class="modal-dialog"><div class="modal-content"><p>No focusable elements</p></div></div>';
            document.body.appendChild(noFocusModal);

            const showEvent = new CustomEvent('shown.bs.modal', { target: noFocusModal });
            expect(() => document.dispatchEvent(showEvent)).not.toThrow();

            noFocusModal.remove();
        });
    });
});
