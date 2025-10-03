/**
 * Comprehensive Modal Accessibility Unit Tests
 * Tests all aspects of modal accessibility including aria-hidden, aria-modal, focus management
 */

describe('ModalAccessibility', () => {
    let modalAccessibility;
    let testModal;
    let testButton;

    beforeEach(() => {
        // Create test modal
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

        // Create trigger button
        testButton = document.createElement('button');
        testButton.id = 'testButton';
        testButton.textContent = 'Open Modal';
        testButton.type = 'button';

        document.body.appendChild(testModal);
        document.body.appendChild(testButton);

        // Initialize modal accessibility
        modalAccessibility = new ModalAccessibility();
    });

    afterEach(() => {
        document.body.removeChild(testModal);
        document.body.removeChild(testButton);
    });

    describe('toggleModalAccessibility', () => {
        it('should remove aria-hidden when modal is opened', () => {
            // Set initial state
            testModal.setAttribute('aria-hidden', 'true');
            
            // Open modal
            modalAccessibility.toggleModalAccessibility(testModal, true);
            
            // Check aria-hidden is removed
            expect(testModal.hasAttribute('aria-hidden')).toBe(false);
        });

        it('should set aria-modal="true" when modal is opened', () => {
            // Open modal
            modalAccessibility.toggleModalAccessibility(testModal, true);
            
            // Check aria-modal is set
            expect(testModal.getAttribute('aria-modal')).toBe('true');
        });

        it('should set aria-hidden="true" when modal is closed', () => {
            // Open modal first
            modalAccessibility.toggleModalAccessibility(testModal, true);
            
            // Close modal
            modalAccessibility.toggleModalAccessibility(testModal, false);
            
            // Check aria-hidden is set
            expect(testModal.getAttribute('aria-hidden')).toBe('true');
        });

        it('should remove aria-modal when modal is closed', () => {
            // Open modal first
            modalAccessibility.toggleModalAccessibility(testModal, true);
            
            // Close modal
            modalAccessibility.toggleModalAccessibility(testModal, false);
            
            // Check aria-modal is removed
            expect(testModal.hasAttribute('aria-modal')).toBe(false);
        });

        it('should ensure only one modal is active at a time', () => {
            // Create second modal
            const secondModal = document.createElement('div');
            secondModal.className = 'modal fade';
            secondModal.id = 'secondModal';
            secondModal.innerHTML = `
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Second Modal</h5>
                        </div>
                    </div>
                </div>
            `;
            document.body.appendChild(secondModal);

            try {
                // Open first modal
                modalAccessibility.toggleModalAccessibility(testModal, true);
                expect(modalAccessibility.activeModal).toBe(testModal);

                // Open second modal
                modalAccessibility.toggleModalAccessibility(secondModal, true);
                expect(modalAccessibility.activeModal).toBe(secondModal);

                // First modal should be closed
                expect(testModal.getAttribute('aria-hidden')).toBe('true');
            } finally {
                document.body.removeChild(secondModal);
            }
        });

        it('should remove focus from modal elements before setting aria-hidden', () => {
            // Open modal
            modalAccessibility.toggleModalAccessibility(testModal, true);
            
            // Focus on an element inside modal
            const input = testModal.querySelector('input');
            input.focus();
            expect(document.activeElement).toBe(input);
            
            // Close modal
            modalAccessibility.toggleModalAccessibility(testModal, false);
            
            // Focus should be removed
            expect(document.activeElement).not.toBe(input);
            expect(testModal.getAttribute('aria-hidden')).toBe('true');
        });
    });

    describe('Focus Management', () => {
        it('should focus first focusable element when modal opens', () => {
            // Open modal
            modalAccessibility.toggleModalAccessibility(testModal, true);
            
            // Wait for focus to be set
            setTimeout(() => {
                const firstFocusable = testModal.querySelector('input');
                expect(document.activeElement).toBe(firstFocusable);
            }, 20);
        });

        it('should restore focus to trigger element when modal closes', () => {
            // Focus trigger button
            testButton.focus();
            expect(document.activeElement).toBe(testButton);
            
            // Store as last focused element
            modalAccessibility.lastFocusedElement = testButton;
            
            // Open and close modal
            modalAccessibility.toggleModalAccessibility(testModal, true);
            modalAccessibility.toggleModalAccessibility(testModal, false);
            
            // Wait for focus restoration
            setTimeout(() => {
                expect(document.activeElement).toBe(testButton);
            }, 20);
        });
    });

    describe('Background Inert Management', () => {
        it('should apply inert to background elements when modal is open', () => {
            // Add some background elements
            const backgroundDiv = document.createElement('div');
            backgroundDiv.id = 'backgroundDiv';
            document.body.appendChild(backgroundDiv);

            try {
                // Open modal
                modalAccessibility.toggleModalAccessibility(testModal, true);
                
                // Background should have inert
                expect(backgroundDiv.hasAttribute('inert')).toBe(true);
            } finally {
                document.body.removeChild(backgroundDiv);
            }
        });

        it('should remove inert from background elements when modal is closed', () => {
            // Add some background elements
            const backgroundDiv = document.createElement('div');
            backgroundDiv.id = 'backgroundDiv';
            document.body.appendChild(backgroundDiv);

            try {
                // Open and close modal
                modalAccessibility.toggleModalAccessibility(testModal, true);
                modalAccessibility.toggleModalAccessibility(testModal, false);
                
                // Background should not have inert
                expect(backgroundDiv.hasAttribute('inert')).toBe(false);
            } finally {
                document.body.removeChild(backgroundDiv);
            }
        });
    });

    describe('Validation', () => {
        it('should validate modal accessibility correctly', () => {
            // Open modal
            modalAccessibility.toggleModalAccessibility(testModal, true);
            
            // Get validation results
            const issues = ModalAccessibility.validateModalAccessibility(testModal);
            
            // Should have no issues
            expect(issues.length).toBe(0);
        });

        it('should detect aria-hidden conflicts', () => {
            // Create modal with aria-hidden conflict
            const conflictModal = document.createElement('div');
            conflictModal.className = 'modal fade';
            conflictModal.setAttribute('aria-hidden', 'true');
            
            const input = document.createElement('input');
            input.focus();
            conflictModal.appendChild(input);
            
            // Validate should detect conflict
            const issues = ModalAccessibility.validateModalAccessibility(conflictModal);
            expect(issues.some(issue => issue.includes('aria-hidden'))).toBe(true);
        });
    });

    describe('Error Handling', () => {
        it('should handle null modal element gracefully', () => {
            expect(() => {
                modalAccessibility.toggleModalAccessibility(null, true);
            }).not.toThrow();
        });

        it('should handle undefined modal element gracefully', () => {
            expect(() => {
                modalAccessibility.toggleModalAccessibility(undefined, true);
            }).not.toThrow();
        });
    });
});
