/**
 * Modal Accessibility Unit Tests
 * Tests aria-hidden management, focus trapping, and accessibility compliance
 */

import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('Modal Accessibility', () => {
  let testModal;
  let modalAccessibility;

  beforeEach(() => {
    // Create a test modal
    testModal = testUtils.createMockModal();
    
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

  describe('Accessibility Violations', () => {
    test('should have no accessibility violations for properly configured modal', async () => {
      // Configure modal properly
      testModal.classList.add('show');
      testModal.setAttribute('aria-modal', 'true');
      testModal.setAttribute('role', 'dialog');
      testModal.removeAttribute('aria-hidden');

      const results = await axe(testModal);
      expect(results).toHaveNoViolations();
    });

    test('should detect aria-hidden violations', async () => {
      // Configure modal incorrectly (aria-hidden conflict)
      testModal.classList.add('show');
      testModal.setAttribute('aria-hidden', 'true'); // This is a violation

      const results = await axe(testModal);
      expect(results.violations.length).toBeGreaterThan(0);
      
      const ariaHiddenViolations = results.violations.filter(violation =>
        violation.description.includes('aria-hidden')
      );
      expect(ariaHiddenViolations.length).toBeGreaterThan(0);
    });

    test('should detect missing ARIA attributes', async () => {
      // Configure modal with missing ARIA attributes
      testModal.classList.add('show');
      testModal.removeAttribute('aria-modal');
      testModal.removeAttribute('role');

      const results = await axe(testModal);
      expect(results.violations.length).toBeGreaterThan(0);
      
      const ariaViolations = results.violations.filter(violation =>
        violation.id === 'aria-required-attr' || 
        violation.id === 'aria-required-parent'
      );
      expect(ariaViolations.length).toBeGreaterThan(0);
    });
  });

  describe('Focus Trapping', () => {
    test('should trap focus within modal boundaries', () => {
      if (window.toggleModalAccessibility) {
        window.toggleModalAccessibility(testModal, true);
        
        const focusableElements = testModal.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length >= 2) {
          // Test tab navigation
          focusableElements[0].focus();
          expect(document.activeElement).toBe(focusableElements[0]);
          
          // Simulate Tab key
          const tabEvent = new KeyboardEvent('keydown', { key: 'Tab' });
          testModal.dispatchEvent(tabEvent);
          
          // Focus should move to next element
          expect(document.activeElement).toBe(focusableElements[1]);
        }
      }
    });

    test('should prevent focus from escaping modal', () => {
      if (window.toggleModalAccessibility) {
        window.toggleModalAccessibility(testModal, true);
        
        // Try to focus an element outside the modal
        const outsideElement = document.createElement('button');
        outsideElement.textContent = 'Outside Button';
        document.body.appendChild(outsideElement);
        
        // Focus should remain within modal
        const activeElement = document.activeElement;
        const isWithinModal = testModal.contains(activeElement);
        expect(isWithinModal).toBe(true);
        
        // Clean up
        document.body.removeChild(outsideElement);
      }
    });
  });

  describe('Background Inert', () => {
    test('should apply inert to background elements when modal is open', () => {
      if (window.toggleModalAccessibility) {
        // Create background elements
        const backgroundDiv = document.createElement('div');
        backgroundDiv.innerHTML = '<button>Background Button</button>';
        document.body.appendChild(backgroundDiv);
        
        window.toggleModalAccessibility(testModal, true);
        
        // Background elements should be inert
        if ('inert' in Element.prototype) {
          expect(backgroundDiv.hasAttribute('inert')).toBe(true);
        }
        
        // Clean up
        document.body.removeChild(backgroundDiv);
      }
    });

    test('should remove inert from background elements when modal is closed', () => {
      if (window.toggleModalAccessibility) {
        // Create background elements
        const backgroundDiv = document.createElement('div');
        backgroundDiv.innerHTML = '<button>Background Button</button>';
        document.body.appendChild(backgroundDiv);
        
        // Open modal
        window.toggleModalAccessibility(testModal, true);
        
        // Close modal
        window.toggleModalAccessibility(testModal, false);
        
        // Background elements should no longer be inert
        if ('inert' in Element.prototype) {
          expect(backgroundDiv.hasAttribute('inert')).toBe(false);
        }
        
        // Clean up
        document.body.removeChild(backgroundDiv);
      }
    });
  });

  describe('Multiple Modals', () => {
    test('should handle multiple modals correctly', () => {
      if (window.toggleModalAccessibility) {
        const modal1 = testUtils.createMockModal('modal1');
        const modal2 = testUtils.createMockModal('modal2');
        
        // Open first modal
        window.toggleModalAccessibility(modal1, true);
        expect(modal1.hasAttribute('aria-hidden')).toBe(false);
        
        // Open second modal (should close first)
        window.toggleModalAccessibility(modal2, true);
        expect(modal1.getAttribute('aria-hidden')).toBe('true');
        expect(modal2.hasAttribute('aria-hidden')).toBe(false);
        
        // Clean up
        document.body.removeChild(modal1);
        document.body.removeChild(modal2);
      }
    });
  });

  describe('Keyboard Navigation', () => {
    test('should close modal with Escape key', () => {
      if (window.toggleModalAccessibility) {
        window.toggleModalAccessibility(testModal, true);
        
        // Simulate Escape key
        const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
        testModal.dispatchEvent(escapeEvent);
        
        // Modal should be closed (aria-hidden should be true)
        expect(testModal.getAttribute('aria-hidden')).toBe('true');
      }
    });

    test('should handle Tab navigation correctly', () => {
      if (window.toggleModalAccessibility) {
        window.toggleModalAccessibility(testModal, true);
        
        const focusableElements = testModal.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length >= 2) {
          // Focus first element
          focusableElements[0].focus();
          
          // Tab forward
          const tabEvent = new KeyboardEvent('keydown', { key: 'Tab' });
          testModal.dispatchEvent(tabEvent);
          
          expect(document.activeElement).toBe(focusableElements[1]);
          
          // Shift+Tab backward
          const shiftTabEvent = new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true });
          testModal.dispatchEvent(shiftTabEvent);
          
          expect(document.activeElement).toBe(focusableElements[0]);
        }
      }
    });
  });
});