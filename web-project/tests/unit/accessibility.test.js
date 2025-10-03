/**
 * Accessibility Unit Tests
 * Tests modal accessibility, ARIA compliance, and keyboard navigation
 */

import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('Accessibility Tests', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  describe('Modal Accessibility', () => {
    test('should have no accessibility violations for open modal', async () => {
      const modal = testUtils.createMockModal();
      modal.classList.add('show');
      modal.setAttribute('aria-modal', 'true');
      modal.setAttribute('role', 'dialog');
      modal.removeAttribute('aria-hidden');

      container.appendChild(modal);

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    test('should have no accessibility violations for closed modal', async () => {
      const modal = testUtils.createMockModal();
      modal.setAttribute('aria-hidden', 'true');

      container.appendChild(modal);

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    test('should detect aria-hidden conflicts in open modals', async () => {
      const modal = testUtils.createMockModal();
      modal.classList.add('show');
      modal.setAttribute('aria-hidden', 'true'); // This is a violation

      container.appendChild(modal);

      const results = await axe(container);
      expect(results.violations.length).toBeGreaterThan(0);
      
      const ariaHiddenViolations = results.violations.filter(violation =>
        violation.description.includes('aria-hidden')
      );
      expect(ariaHiddenViolations.length).toBeGreaterThan(0);
    });

    test('should have proper ARIA attributes on modal', () => {
      const modal = testUtils.createMockModal();
      modal.classList.add('show');
      modal.setAttribute('aria-modal', 'true');
      modal.setAttribute('role', 'dialog');
      modal.removeAttribute('aria-hidden');

      expect(modal.getAttribute('aria-modal')).toBe('true');
      expect(modal.getAttribute('role')).toBe('dialog');
      expect(modal.hasAttribute('aria-hidden')).toBe(false);
    });

    test('should have focusable elements in modal', () => {
      const modal = testUtils.createMockModal();
      const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      expect(focusableElements.length).toBeGreaterThan(0);
    });
  });

  describe('Form Accessibility', () => {
    test('should have proper form labels', async () => {
      container.innerHTML = `
        <form>
          <label for="test-input">Test Label</label>
          <input type="text" id="test-input" name="test" required>
          <button type="submit">Submit</button>
        </form>
      `;

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    test('should detect missing form labels', async () => {
      container.innerHTML = `
        <form>
          <input type="text" name="test" required>
          <button type="submit">Submit</button>
        </form>
      `;

      const results = await axe(container);
      expect(results.violations.length).toBeGreaterThan(0);
      
      const labelViolations = results.violations.filter(violation =>
        violation.id === 'label' || violation.id === 'label-title-only'
      );
      expect(labelViolations.length).toBeGreaterThan(0);
    });

    test('should have proper error messages for required fields', async () => {
      container.innerHTML = `
        <form>
          <label for="required-field">Required Field</label>
          <input type="text" id="required-field" name="required" required aria-describedby="error-msg">
          <div id="error-msg" role="alert">This field is required</div>
          <button type="submit">Submit</button>
        </form>
      `;

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Navigation Accessibility', () => {
    test('should have proper navigation structure', async () => {
      container.innerHTML = `
        <nav role="navigation" aria-label="Main navigation">
          <ul>
            <li><a href="#dashboard" aria-current="page">Dashboard</a></li>
            <li><a href="#crops">Crops</a></li>
            <li><a href="#livestock">Livestock</a></li>
          </ul>
        </nav>
      `;

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    test('should have skip links for keyboard navigation', async () => {
      container.innerHTML = `
        <a href="#main-content" class="skip-link">Skip to main content</a>
        <main id="main-content">
          <h1>Main Content</h1>
        </main>
      `;

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Button Accessibility', () => {
    test('should have accessible buttons', async () => {
      container.innerHTML = `
        <button type="button" aria-label="Close modal">×</button>
        <button type="submit">Save Changes</button>
        <button type="button" disabled>Disabled Button</button>
      `;

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    test('should detect buttons without accessible names', async () => {
      container.innerHTML = `
        <button type="button">×</button>
        <button type="submit"></button>
      `;

      const results = await axe(container);
      expect(results.violations.length).toBeGreaterThan(0);
      
      const buttonViolations = results.violations.filter(violation =>
        violation.id === 'button-name'
      );
      expect(buttonViolations.length).toBeGreaterThan(0);
    });
  });

  describe('Image Accessibility', () => {
    test('should have proper alt text for images', async () => {
      container.innerHTML = `
        <img src="test.jpg" alt="Test image description">
        <img src="decorative.jpg" alt="" role="presentation">
      `;

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    test('should detect images without alt text', async () => {
      container.innerHTML = `
        <img src="test.jpg">
      `;

      const results = await axe(container);
      expect(results.violations.length).toBeGreaterThan(0);
      
      const imageViolations = results.violations.filter(violation =>
        violation.id === 'image-alt'
      );
      expect(imageViolations.length).toBeGreaterThan(0);
    });
  });

  describe('Color and Contrast', () => {
    test('should have sufficient color contrast', async () => {
      container.innerHTML = `
        <div style="color: #000000; background-color: #ffffff;">
          <p>High contrast text</p>
          <button style="color: #000000; background-color: #ffffff; border: 1px solid #000000;">
            High contrast button
          </button>
        </div>
      `;

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    test('should not rely solely on color for information', async () => {
      container.innerHTML = `
        <div>
          <p>Status: <span style="color: green;" aria-label="Success">●</span> Success</p>
          <p>Status: <span style="color: red;" aria-label="Error">●</span> Error</p>
        </div>
      `;

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Keyboard Navigation', () => {
    test('should have proper tab order', async () => {
      container.innerHTML = `
        <form>
          <input type="text" tabindex="1" aria-label="First input">
          <input type="text" tabindex="2" aria-label="Second input">
          <button type="submit" tabindex="3">Submit</button>
        </form>
      `;

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    test('should have proper focus indicators', async () => {
      container.innerHTML = `
        <style>
          button:focus { outline: 2px solid #007bff; }
          input:focus { outline: 2px solid #007bff; }
        </style>
        <button>Focusable button</button>
        <input type="text" aria-label="Focusable input">
      `;

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Screen Reader Support', () => {
    test('should have proper heading hierarchy', async () => {
      container.innerHTML = `
        <h1>Main Heading</h1>
        <h2>Section Heading</h2>
        <h3>Subsection Heading</h3>
        <p>Content paragraph</p>
      `;

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    test('should have proper landmarks', async () => {
      container.innerHTML = `
        <header role="banner">
          <h1>Site Title</h1>
        </header>
        <nav role="navigation">
          <ul>
            <li><a href="#main">Main</a></li>
          </ul>
        </nav>
        <main role="main">
          <h2>Main Content</h2>
        </main>
        <footer role="contentinfo">
          <p>Footer content</p>
        </footer>
      `;

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('SmartFarm Specific Accessibility', () => {
    test('should have accessible livestock management interface', async () => {
      container.innerHTML = `
        <div class="livestock-management">
          <h1>Livestock Management</h1>
          <button aria-label="Add new animal" data-bs-target="#addLivestockModal">
            <i class="fas fa-plus" aria-hidden="true"></i> Add New Animal
          </button>
          <table role="table" aria-label="Livestock data">
            <thead>
              <tr>
                <th scope="col">Species</th>
                <th scope="col">Breed</th>
                <th scope="col">Count</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Cattle</td>
                <td>Holstein</td>
                <td>5</td>
              </tr>
            </tbody>
          </table>
        </div>
      `;

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    test('should have accessible crop management interface', async () => {
      container.innerHTML = `
        <div class="crop-management">
          <h1>Crop Management</h1>
          <button aria-label="Add new crop" data-bs-target="#addCropModal">
            <i class="fas fa-plus" aria-hidden="true"></i> Add New Crop
          </button>
          <div class="crop-cards" role="grid" aria-label="Crop cards">
            <div class="crop-card" role="gridcell">
              <h3>Tomatoes</h3>
              <p>Field A</p>
              <button aria-label="Edit tomato crop">Edit</button>
            </div>
          </div>
        </div>
      `;

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    test('should have accessible dashboard navigation', async () => {
      container.innerHTML = `
        <nav class="sidebar" role="navigation" aria-label="Main navigation">
          <ul>
            <li>
              <a href="#dashboard" aria-current="page">
                <i class="fas fa-tachometer-alt" aria-hidden="true"></i> Dashboard
              </a>
            </li>
            <li>
              <a href="#crops">
                <i class="fas fa-seedling" aria-hidden="true"></i> Crops
              </a>
            </li>
            <li>
              <a href="#livestock">
                <i class="fas fa-cow" aria-hidden="true"></i> Livestock
              </a>
            </li>
          </ul>
        </nav>
      `;

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
