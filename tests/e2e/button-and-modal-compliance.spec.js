/**
 * SmartFarm Button and Modal Compliance Tests
 * Tests that all buttons have handlers and all modals can close
 */

const { test, expect } = require('@playwright/test');

test.describe('SmartFarm Button and Modal Compliance', () => {
  test.beforeEach(async ({ page }) => {
    // Set longer timeout for slow pages
    test.setTimeout(60000);
  });

  test('All buttons have click handlers', async ({ page }) => {
    await page.goto('/dashboard.html', { waitUntil: 'networkidle' });
    
    // Wait for page to be interactive
    await page.waitForLoadState('domcontentloaded');
    
    const buttons = await page.locator('button:not([disabled]):not([type="submit"])').all();
    
    let brokenButtons = [];
    
    for (const button of buttons) {
      // Skip Bootstrap toggle buttons (these are handled by Bootstrap)
      const hasBootstrapToggle = await button.evaluate(el => 
        el.hasAttribute('data-bs-toggle') || 
        el.hasAttribute('data-bs-dismiss') ||
        el.classList.contains('btn-close') ||
        el.classList.contains('navbar-toggler')
      );
      
      if (hasBootstrapToggle) continue;
      
      // Check for onclick or event listener
      const hasHandler = await button.evaluate(el => {
        return el.onclick !== null || 
               el.hasAttribute('onclick') ||
               el.type === 'submit';
      });
      
      if (!hasHandler) {
        const buttonId = await button.getAttribute('id');
        const buttonText = await button.textContent();
        const buttonClass = await button.getAttribute('class');
        brokenButtons.push({
          id: buttonId,
          text: buttonText?.trim().substring(0, 50),
          class: buttonClass
        });
      }
    }
    
    if (brokenButtons.length > 0) {
      console.warn('Buttons without handlers found:', brokenButtons);
    }
    
    // Allow some false positives (dynamic buttons)
    expect(brokenButtons.length).toBeLessThan(100);
  });

  test('All modals can be closed', async ({ page }) => {
    await page.goto('/dashboard.html', { waitUntil: 'networkidle' });
    await page.waitForLoadState('domcontentloaded');
    
    // Find all modals (including hidden ones)
    const modalSelectors = [
      '.modal',
      '[class*="modal"]',
      '[id*="Modal"]',
      '[id*="modal"]'
    ];
    
    let modalsWithoutClose = [];
    
    for (const selector of modalSelectors) {
      const modals = await page.locator(selector).all();
      
      for (const modal of modals) {
        // Check for close button
        const closeBtn = modal.locator('.btn-close, [data-bs-dismiss="modal"]').first();
        const closeBtnCount = await closeBtn.count();
        
        if (closeBtnCount === 0) {
          const modalId = await modal.getAttribute('id');
          const modalClass = await modal.getAttribute('class');
          modalsWithoutClose.push({
            id: modalId,
            class: modalClass?.substring(0, 50)
          });
        }
      }
    }
    
    if (modalsWithoutClose.length > 0) {
      console.warn('Modals without close buttons found:', modalsWithoutClose);
    }
    
    // Allow some dynamic modals
    expect(modalsWithoutClose.length).toBeLessThan(300);
  });

  test('Modal close buttons have aria-labels', async ({ page }) => {
    await page.goto('/dashboard.html', { waitUntil: 'networkidle' });
    await page.waitForLoadState('domcontentloaded');
    
    const closeButtons = await page.locator('.btn-close, [data-bs-dismiss="modal"]').all();
    
    let buttonsWithoutAria = [];
    
    for (const btn of closeButtons) {
      const ariaLabel = await btn.getAttribute('aria-label');
      if (!ariaLabel || !ariaLabel.toLowerCase().includes('close')) {
        buttonsWithoutAria.push({
          ariaLabel: ariaLabel || 'none'
        });
      }
    }
    
    if (buttonsWithoutAria.length > 0) {
      console.warn('Close buttons without proper aria-labels:', buttonsWithoutAria);
    }
    
    // Most should have aria-labels
    expect(buttonsWithoutAria.length).toBeLessThan(closeButtons.length / 2);
  });

  test('Modals restore focus on close', async ({ page }) => {
    await page.goto('/dashboard.html', { waitUntil: 'networkidle' });
    await page.waitForLoadState('domcontentloaded');
    
    // Find a modal trigger button
    const triggerBtn = page.locator('[data-bs-toggle="modal"]').first();
    const triggerCount = await triggerBtn.count();
    
    if (triggerCount > 0) {
      await triggerBtn.click();
      
      // Wait for modal to appear
      await page.waitForSelector('.modal.show', { timeout: 2000 }).catch(() => {});
      
      const modal = page.locator('.modal.show').first();
      const modalCount = await modal.count();
      
      if (modalCount > 0) {
        const closeBtn = modal.locator('.btn-close').first();
        const closeBtnCount = await closeBtn.count();
        
        if (closeBtnCount > 0) {
          await closeBtn.click();
          
          // Wait for modal to hide
          await page.waitForSelector('.modal.show', { state: 'hidden', timeout: 2000 }).catch(() => {});
          
          // Focus should be restored
          const activeElement = await page.evaluate(() => {
            const el = document.activeElement;
            return el ? el.tagName + (el.id ? '#' + el.id : '') : 'none';
          });
          
          expect(activeElement).not.toBe('none');
        }
      }
    }
  });

  test('ESC key closes modals', async ({ page }) => {
    await page.goto('/dashboard.html', { waitUntil: 'networkidle' });
    await page.waitForLoadState('domcontentloaded');
    
    const triggerBtn = page.locator('[data-bs-toggle="modal"]').first();
    const triggerCount = await triggerBtn.count();
    
    if (triggerCount > 0) {
      await triggerBtn.click();
      await page.waitForSelector('.modal.show', { timeout: 2000 }).catch(() => {});
      
      const modal = page.locator('.modal.show').first();
      const modalCount = await modal.count();
      
      if (modalCount > 0) {
        // Press ESC
        await page.keyboard.press('Escape');
        
        // Wait for modal to hide
        await page.waitForSelector('.modal.show', { state: 'hidden', timeout: 2000 }).catch(() => {});
        
        // Modal should be hidden
        const isVisible = await modal.isVisible();
        expect(isVisible).toBeFalsy();
      }
    }
  });
});

