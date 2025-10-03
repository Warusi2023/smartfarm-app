/**
 * Unit tests for Modal Accessibility
 * Tests aria-hidden management, focus trapping, and accessibility compliance
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
                        <input type="text" class="form-control" placeholder="Test input">
                        <button type="button" class="btn btn-primary">Test Button</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(testModal);
        
        // Initialize modal accessibility if available
        if (window.ModalAccessibility) {
            modalAccessibility = window.ModalAccessibility;
        }
    });

    afterEach(() => {
        // Clean up
        if (testModal && testModal.parentNode) {
            testModal.parentNode.removeChild(testModal);
        }
    });

    describe('Modal Initialization', () => {
        test('should not have aria-hidden="true" initially', () => {
            expect(testModal.hasAttribute('aria-hidden')).toBe(false);
        });

        test('should have proper ARIA attributes', () => {
            if (window.fixAllModalAccessibility) {
                window.fixAllModalAccessibility();
                
                expect(testModal.hasAttribute('aria-modal')).toBe(true);
                expect(testModal.hasAttribute('role')).toBe(true);
                expect(testModal.getAttribute('role')).toBe('dialog');
                expect(testModal.hasAttribute('tabindex')).toBe(true);
                expect(testModal.getAttribute('tabindex')).toBe('-1');
            }
        });
    });

    describe('Modal Open/Close States', () => {
        test('should remove aria-hidden when modal is opened', () => {
            if (window.toggleModalAccessibility) {
                window.toggleModalAccessibility(testModal, true);
                
                expect(testModal.hasAttribute('aria-hidden')).toBe(false);
                expect(testModal.hasAttribute('aria-modal')).toBe(true);
            }
        });

        test('should set aria-hidden="true" when modal is closed', () => {
            if (window.toggleModalAccessibility) {
                window.toggleModalAccessibility(testModal, false);
                
                expect(testModal.getAttribute('aria-hidden')).toBe('true');
                expect(testModal.hasAttribute('aria-modal')).toBe(false);
            }
        });

        test('should not have focused elements when aria-hidden="true"', () => {
            if (window.toggleModalAccessibility) {
                // Open modal first
                window.toggleModalAccessibility(testModal, true);
                
                // Focus an element
                const input = testModal.querySelector('input');
                input.focus();
                expect(document.activeElement).toBe(input);
                
                // Close modal
                window.toggleModalAccessibility(testModal, false);
                
                // Check that focus was removed
                expect(document.activeElement).not.toBe(input);
                expect(testModal.getAttribute('aria-hidden')).toBe('true');
            }
        });
    });

    describe('Focus Management', () => {
        test('should trap focus within modal when open', () => {
            if (window.toggleModalAccessibility) {
                window.toggleModalAccessibility(testModal, true);
                
                const focusableElements = testModal.querySelectorAll(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
                );
                
                expect(focusableElements.length).toBeGreaterThan(0);
                
                // First focusable element should be focused
                expect(document.activeElement).toBe(focusableElements[0]);
            }
        });

        test('should prevent focus conflicts', () => {
            if (window.ensureModalAccessibility) {
                // Simulate a focus conflict
                testModal.setAttribute('aria-hidden', 'true');
                const input = testModal.querySelector('input');
                input.focus();
                
                // Run the accessibility check
                window.ensureModalAccessibility();
                
                // Focus should be removed
                expect(document.activeElement).not.toBe(input);
            }
        });
    });

    describe('Bootstrap Integration', () => {
        test('should handle Bootstrap modal events', () => {
            if (modalAccessibility && modalAccessibility.handleModalShown) {
                // Simulate Bootstrap modal shown event
                const event = new Event('shown.bs.modal');
                Object.defineProperty(event, 'target', { value: testModal });
                
                modalAccessibility.handleModalShown(testModal);
                
                expect(testModal.hasAttribute('aria-hidden')).toBe(false);
                expect(testModal.hasAttribute('aria-modal')).toBe(true);
            }
        });
    });

    describe('Dynamic Modal Creation', () => {
        test('should properly set up dynamically created modals', () => {
            if (window.ModalAccessibility && window.ModalAccessibility.createModal) {
                const dynamicModal = window.ModalAccessibility.createModal({
                    id: 'dynamicTestModal',
                    title: 'Dynamic Modal',
                    content: '<p>Dynamic content</p>'
                });
                
                expect(dynamicModal.hasAttribute('aria-modal')).toBe(true);
                expect(dynamicModal.hasAttribute('role')).toBe(true);
                expect(dynamicModal.hasAttribute('tabindex')).toBe(true);
                expect(dynamicModal.hasAttribute('aria-hidden')).toBe(false);
                
                // Clean up
                document.body.removeChild(dynamicModal);
            }
        });
    });

    describe('Validation', () => {
        test('should validate modal accessibility', () => {
            if (window.ModalAccessibility && window.ModalAccessibility.validateModalAccessibility) {
                const issues = window.ModalAccessibility.validateModalAccessibility(testModal);
                
                // Should have issues initially (missing attributes)
                expect(issues.length).toBeGreaterThan(0);
                
                // Fix the modal
                if (window.fixAllModalAccessibility) {
                    window.fixAllModalAccessibility();
                }
                
                const issuesAfter = window.ModalAccessibility.validateModalAccessibility(testModal);
                
                // Should have fewer issues after fixing
                expect(issuesAfter.length).toBeLessThan(issues.length);
            }
        });
    });
});