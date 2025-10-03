/**
 * Global Teardown for Playwright Tests
 * Cleans up test environment and resources
 */

async function globalTeardown(config) {
  console.log('🔧 Starting global test teardown...');
  
  try {
    // Clean up any test data
    await cleanupTestData();
    
    // Clean up any temporary files
    await cleanupTempFiles();
    
    console.log('✅ Global test teardown completed');
  } catch (error) {
    console.error('❌ Global teardown failed:', error);
    throw error;
  }
}

async function cleanupTestData() {
  try {
    // Clean up test data from localStorage/sessionStorage
    if (typeof window !== 'undefined') {
      window.localStorage.clear();
      window.sessionStorage.clear();
    }
    
    console.log('✅ Test data cleaned up');
  } catch (error) {
    console.warn('⚠️ Test data cleanup failed:', error);
  }
}

async function cleanupTempFiles() {
  try {
    // Clean up any temporary files created during tests
    const fs = require('fs');
    const path = require('path');
    
    const tempDirs = [
      'test-results',
      'playwright-report',
      'playwright/.cache'
    ];
    
    for (const dir of tempDirs) {
      if (fs.existsSync(dir)) {
        fs.rmSync(dir, { recursive: true, force: true });
      }
    }
    
    console.log('✅ Temporary files cleaned up');
  } catch (error) {
    console.warn('⚠️ Temporary files cleanup failed:', error);
  }
}

module.exports = globalTeardown;
