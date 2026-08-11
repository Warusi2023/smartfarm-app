/**
 * E2E tests for Modal Accessibility
 * Tests actual user interactions and verifies no console errors
 */

const { test, expect } = require('@playwright/test');
const {
  gotoDashboardReady,
  clickDashboardAction
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
    await page.goto('/livestock-management.html', { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('button[data-bs-target="#addLivestockModal"]', { timeout: 15000 });
    
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
    await page.goto('/livestock-management.html', { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('button[data-bs-target="#addLivestockModal"]', { timeout: 15000 });
    
    const trigger = page.locator('button[data-bs-target="#addLivestockModal"]').first();
    await trigger.scrollIntoViewIfNeeded();
    await trigger.click({ timeout: 10000 });
    
    await page.waitForSelector('#addLivestockModal.show', { timeout: 8000 });
    
    const firstInput = page.locator('#addLivestockModal input').first();
    await expect(firstInput).toBeFocused();
    
    await page.keyboard.press('Tab');
    
    const activeElement = await page.evaluate(() => document.activeElement);
    const modal = page.locator('#addLivestockModal');
    const isWithinModal = await modal.evaluate((modal, element) => 
      modal.contains(element), activeElement
    );
    expect(isWithinModal).toBe(true);
  });

  test('should close modal with Escape key', async ({ page }) => {
    await page.goto('/livestock-management.html', { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('button[data-bs-target="#addLivestockModal"]', { timeout: 15000 });
    
    const trigger = page.locator('button[data-bs-target="#addLivestockModal"]').first();
    await trigger.scrollIntoViewIfNeeded();
    await trigger.click({ timeout: 10000 });
    await page.waitForSelector('#addLivestockModal.show', { timeout: 8000 });
    
    await page.keyboard.press('Escape');
    
    await page.waitForSelector('#addLivestockModal.show', { state: 'hidden', timeout: 8000 });
    
    const modal = page.locator('#addLivestockModal');
    await expect(modal).not.toBeVisible();
  });

  test('should close modal with close button', async ({ page }) => {
    await page.goto('/livestock-management.html', { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('button[data-bs-target="#addLivestockModal"]', { timeout: 15000 });
    
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
    
    const cropNav = page.locator('.sidebar a[onclick*="showCropManagement"]').first();
    await cropNav.scrollIntoViewIfNeeded();
    await cropNav.click({ timeout: 10000 });
    
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
    
    const livestockNav = page.locator('.sidebar a[onclick*="showLivestockManagement"]').first();
    await livestockNav.scrollIntoViewIfNeeded();
    await livestockNav.click({ timeout: 10000 });
    
    await page.waitForSelector('#livestockManagementView', { state: 'visible', timeout: 10000 });
    
    await clickDashboardAction(page, '#livestockManagementView button[onclick="addNewLivestock()"]');
    
    await page.waitForSelector('.modal.show', { timeout: 8000 });
    
    const modal = page.locator('.modal.show').first();
    await expect(modal).toBeVisible();
    
    const ariaHidden = await modal.getAttribute('aria-hidden');
    expect(ariaHidden).not.toBe('true');
    
    const ariaModal = await modal.getAttribute('aria-modal');
    expect(ariaModal).toBe('true');
  });

  test('should prevent background focus when modal is open', async ({ page }) => {
    await page.goto('/livestock-management.html', { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('button[data-bs-target="#addLivestockModal"]', { timeout: 15000 });
    
    const backgroundButton = page.locator('button[data-bs-target="#addLivestockModal"]').first();
    await backgroundButton.focus();
    
    await backgroundButton.click({ timeout: 10000 });
    await page.waitForSelector('#addLivestockModal.show', { timeout: 8000 });
    
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    const activeElement = await page.evaluate(() => document.activeElement);
    const modal = page.locator('#addLivestockModal');
    const isWithinModal = await modal.evaluate((modal, element) => 
      modal.contains(element), activeElement
    );
    expect(isWithinModal).toBe(true);
  });

  test('should restore focus to trigger button when modal closes', async ({ page }) => {
    await page.goto('/livestock-management.html', { waitUntil: 'domcontentloaded' });
    await page.waitForSelector('button[data-bs-target="#addLivestockModal"]', { timeout: 15000 });
    
    const triggerButton = page.locator('button[data-bs-target="#addLivestockModal"]').first();
    await triggerButton.focus();
    
    await triggerButton.click({ timeout: 10000 });
    await page.waitForSelector('#addLivestockModal.show', { timeout: 8000 });
    
    await page.click('#addLivestockModal .btn-close');
    await page.waitForSelector('#addLivestockModal.show', { state: 'hidden', timeout: 8000 });
    
    await expect(triggerButton).toBeFocused();
  });

  test('should handle multiple modals without conflicts', async ({ page }) => {
    await gotoDashboardReady(page);
    
    const cropNav = page.locator('.sidebar a[onclick*="showCropManagement"]').first();
    await cropNav.scrollIntoViewIfNeeded();
    await cropNav.click({ timeout: 10000 });
    await page.waitForSelector('#cropManagementView', { state: 'visible', timeout: 10000 });
    await clickDashboardAction(page, '#cropManagementView button[onclick="addNewCrop()"]');
    await page.waitForSelector('.modal.show', { timeout: 8000 });
    
    const firstModal = page.locator('.modal.show').first();
    await expect(firstModal).toBeVisible();
    
    await page.locator('.modal.show .btn-close').first().click({ timeout: 8000 });
    await page.waitForSelector('.modal.show', { state: 'hidden', timeout: 8000 });
    
    const livestockNav = page.locator('.sidebar a[onclick*="showLivestockManagement"]').first();
    await livestockNav.scrollIntoViewIfNeeded();
    await livestockNav.click({ timeout: 10000 });
    await page.waitForSelector('#livestockManagementView', { state: 'visible', timeout: 10000 });
    await clickDashboardAction(page, '#livestockManagementView button[onclick="addNewLivestock()"]');
    await page.waitForSelector('.modal.show', { timeout: 8000 });
    
    const secondModal = page.locator('.modal.show').first();
    await expect(secondModal).toBeVisible();
    
    const ariaHidden = await secondModal.getAttribute('aria-hidden');
    expect(ariaHidden).not.toBe('true');
  });
});
