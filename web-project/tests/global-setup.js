/**
 * Global Setup for Playwright Tests
 * Prepares test environment and starts necessary services
 */

const { chromium } = require('@playwright/test');

async function globalSetup(config) {
  console.log('🔧 Starting global test setup...');
  
  // Start browser for setup tasks
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  try {
    // Wait for the server to be ready
    await page.goto('http://localhost:8080');
    await page.waitForLoadState('networkidle');
    
    console.log('✅ Test server is ready');
    
    // Initialize test data if needed
    await initializeTestData(page);
    
  } catch (error) {
    console.error('❌ Global setup failed:', error);
    throw error;
  } finally {
    await browser.close();
  }
  
  console.log('✅ Global test setup completed');
}

async function initializeTestData(page) {
  try {
    // Create test farm if needed
    await page.evaluate(() => {
      if (window.SmartFarmAPI) {
        return window.SmartFarmAPI.createFarm({
          name: 'Test Farm',
          location: 'Test Location',
          area: 10,
          type: 'mixed'
        });
      }
    });
    
    console.log('✅ Test data initialized');
  } catch (error) {
    console.warn('⚠️ Test data initialization failed:', error);
  }
}

module.exports = globalSetup;
