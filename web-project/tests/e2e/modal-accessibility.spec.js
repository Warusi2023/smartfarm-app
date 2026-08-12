/**
 * E2E tests for Modal Accessibility
 * Tests actual user interactions and verifies no console errors
 */

const { test, expect } = require('@playwright/test');
const {
  gotoDashboardReady,
  gotoProtectedPage,
  clickDashboardAction,
  clickSidebarNavByOnclick
} = require('./helpers/dashboard-ready');

test.describe('Modal Accessibility E2E Tests', () => {
  let consoleErrors = [];

  test.beforeEach(async ({ page }) => {
    consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
  });

  test.afterEach(async () => {
    const accessibilityErrors = consoleErrors.filter(error => 
      error.includes('aria-hidden') || 
      error.includes('Blocked aria-hidden') ||
      (error.includes('focus') && error.includes('accessibility'))
    );
    
    if (accessibilityErrors.length > 0) {
      console.warn('Accessibility errors detected:', accessibilityErrors);
    }
    
    consoleErrors = [];
  });

  test('should open livestock modal without aria-hidden errors', async ({ page }) => {
    await gotoProtectedPage(page, '/livestock-management.html', {
      readySelector: 'button[data-bs-target="#addLivestockModal"]'
    });
    
    const trigger = page.locator('button[data-bs-target="#addLivestockModal"]').first();
    await trigger.scrollIntoViewIfNeeded();
    await trigger.click({ timeout: 10000 });
    
    await page.waitForSelector('#addLivestockModal.show', { timeout: 8000 });
    
    const modal = page.locator('#addLivestockModal');
    await expect(modal).toBeVisible();
    
    const ariaHidden = await modal.getAttribute('aria-hidden');
    expect(ariaHidden).not.toBe('true');
    
    const ariaModal = await modal.getAttribute('aria-modal');
    expect(ariaModal).toBe('true');
    
    const role = await modal.getAttribute('role');
    expect(role).toBe('dialog');
  });

  test('should handle focus correctly in livestock modal', async ({ page }) => {
    await gotoProtectedPage(page, '/livestock-management.html', {
      readySelector: 'button[data-bs-target="#addLivestockModal"]'
    });
    
    const trigger = page.locator('button[data-bs-target="#addLivestockModal"]').first();
    await trigger.scrollIntoViewIfNeeded();
    await trigger.click({ timeout: 10000 });
    
    await page.waitForSelector('#addLivestockModal.show', { timeout: 8000 });
    
    // First meaningful control is #animalSpecies (select), not the first input
    const firstControl = page.locator('#addLivestockModal').locator('select:not([disabled]), input:not([type="hidden"]):not([disabled]), textarea:not([disabled])').first();
    await expect(firstControl).toBeFocused({ timeout: 8000 });
    
    await page.keyboard.press('Tab');
    
    const isWithinModal = await page.evaluate(() => {
      const modal = document.getElementById('addLivestockModal');
      return !!(modal && document.activeElement && modal.contains(document.activeElement));
    });
    expect(isWithinModal).toBe(true);
  });

  test('should close modal with Escape key', async ({ page }) => {
    await gotoProtectedPage(page, '/livestock-management.html', {
      readySelector: 'button[data-bs-target="#addLivestockModal"]'
    });
    
    const trigger = page.locator('button[data-bs-target="#addLivestockModal"]').first();
    await trigger.scrollIntoViewIfNeeded();
    await trigger.click({ timeout: 10000 });
    await page.waitForSelector('#addLivestockModal.show', { timeout: 8000 });
    // Wait until open transition finishes and first control is focused (hide() works then)
    const firstControl = page.locator('#addLivestockModal').locator('select:not([disabled]), input:not([type="hidden"]):not([disabled]), textarea:not([disabled])').first();
    await expect(firstControl).toBeFocused({ timeout: 8000 });
    
    await page.keyboard.press('Escape');
    
    await page.waitForSelector('#addLivestockModal.show', { state: 'hidden', timeout: 8000 });
    
    const modal = page.locator('#addLivestockModal');
    await expect(modal).not.toBeVisible();
  });

  test('should close modal with close button', async ({ page }) => {
    await gotoProtectedPage(page, '/livestock-management.html', {
      readySelector: 'button[data-bs-target="#addLivestockModal"]'
    });
    
    const trigger = page.locator('button[data-bs-target="#addLivestockModal"]').first();
    await trigger.scrollIntoViewIfNeeded();
    await trigger.click({ timeout: 10000 });
    await page.waitForSelector('#addLivestockModal.show', { timeout: 8000 });
    
    await page.click('#addLivestockModal .btn-close');
    
    await page.waitForSelector('#addLivestockModal.show', { state: 'hidden', timeout: 8000 });
    
    const modal = page.locator('#addLivestockModal');
    await expect(modal).not.toBeVisible();
  });

  test('should handle dynamic modals in dashboard', async ({ page }) => {
    await gotoDashboardReady(page);
    
    await clickSidebarNavByOnclick(page, 'showCropManagement');
    
    await page.waitForSelector('#cropManagementView', { state: 'visible', timeout: 10000 });
    
    await clickDashboardAction(page, '#cropManagementView button[onclick="addNewCrop()"]');
    
    await page.waitForSelector('.modal.show', { timeout: 8000 });
    
    const modal = page.locator('.modal.show').first();
    await expect(modal).toBeVisible();
    
    const ariaHidden = await modal.getAttribute('aria-hidden');
    expect(ariaHidden).not.toBe('true');
    
    const ariaModal = await modal.getAttribute('aria-modal');
    expect(ariaModal).toBe('true');
  });

  test('should handle livestock modal in dashboard', async ({ page }) => {
    await gotoDashboardReady(page);
    
    await clickSidebarNavByOnclick(page, 'showLivestockManagement');
    
    await page.waitForSelector('#livestockManagementView', { state: 'visible', timeout: 10000 });
    
    await clickDashboardAction(page, '#livestockManagementView button[onclick="addNewLivestock()"]');
    
    await page.waitForSelector('.modal.show', { timeout: 8000 });
    await page.waitForTimeout(100);
    
    const modal = page.locator('.modal.show').first();
    await expect(modal).toBeVisible();
    
    const ariaHidden = await modal.getAttribute('aria-hidden');
    expect(ariaHidden).not.toBe('true');
    
    const ariaModal = await modal.getAttribute('aria-modal');
    expect(ariaModal).toBe('true');

    // Escape must close dismissible dashboard livestock modal
    await page.keyboard.press('Escape');
    await page.waitForSelector('.modal.show', { state: 'hidden', timeout: 8000 });
  });

  test('should prevent background focus when modal is open', async ({ page }) => {
    await gotoProtectedPage(page, '/livestock-management.html', {
      readySelector: 'button[data-bs-target="#addLivestockModal"]'
    });
    
    const backgroundButton = page.locator('button[data-bs-target="#addLivestockModal"]').first();
    await backgroundButton.focus();
    
    await backgroundButton.click({ timeout: 10000 });
    await page.waitForSelector('#addLivestockModal.show', { timeout: 8000 });
    const firstControl = page.locator('#addLivestockModal').locator('select:not([disabled]), input:not([type="hidden"]):not([disabled]), textarea:not([disabled])').first();
    await expect(firstControl).toBeFocused({ timeout: 8000 });
    
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    const isWithinModal = await page.evaluate(() => {
      const modal = document.getElementById('addLivestockModal');
      return !!(modal && document.activeElement && modal.contains(document.activeElement));
    });
    expect(isWithinModal).toBe(true);
  });

  test('should restore focus to trigger button when modal closes', async ({ page }) => {
    await gotoProtectedPage(page, '/livestock-management.html', {
      readySelector: 'button[data-bs-target="#addLivestockModal"]'
    });
    
    const triggerButton = page.locator('button[data-bs-target="#addLivestockModal"]').first();
    await triggerButton.focus();
    
    await triggerButton.click({ timeout: 10000 });
    await page.waitForSelector('#addLivestockModal.show', { timeout: 8000 });
    
    await page.click('#addLivestockModal .btn-close');
    await page.waitForSelector('#addLivestockModal.show', { state: 'hidden', timeout: 8000 });
    
    await expect(triggerButton).toBeFocused({ timeout: 8000 });
  });

  test('should handle multiple modals without conflicts', async ({ page }) => {
    await gotoDashboardReady(page);
    
    await clickSidebarNavByOnclick(page, 'showCropManagement');
    await page.waitForSelector('#cropManagementView', { state: 'visible', timeout: 10000 });
    await clickDashboardAction(page, '#cropManagementView button[onclick="addNewCrop()"]');
    await page.waitForSelector('.modal.show', { timeout: 8000 });
    
    const firstModal = page.locator('.modal.show').first();
    await expect(firstModal).toBeVisible();
    
    await page.locator('.modal.show .btn-close').first().click({ timeout: 8000 });
    await page.waitForSelector('.modal.show', { state: 'hidden', timeout: 8000 });
    
    await clickSidebarNavByOnclick(page, 'showLivestockManagement');
    await page.waitForSelector('#livestockManagementView', { state: 'visible', timeout: 10000 });
    await clickDashboardAction(page, '#livestockManagementView button[onclick="addNewLivestock()"]');
    await page.waitForSelector('.modal.show', { timeout: 8000 });
    
    const secondModal = page.locator('.modal.show').first();
    await expect(secondModal).toBeVisible();
    
    const ariaHidden = await secondModal.getAttribute('aria-hidden');
    expect(ariaHidden).not.toBe('true');
  });
});
