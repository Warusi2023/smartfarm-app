/**
 * Global Teardown for Playwright Tests
 * Keeps report/artifact directories intact for CI upload and HTML reporter.
 */

async function globalTeardown() {
  console.log('🔧 Starting global test teardown...');

  try {
    await cleanupTestData();
    console.log('✅ Global test teardown completed');
    console.log('');
  } catch (error) {
    console.error('❌ Global teardown failed:', error);
    throw error;
  }
}

async function cleanupTestData() {
  try {
    // Node teardown has no window; this is intentionally a no-op safety check.
    if (typeof window !== 'undefined') {
      window.localStorage.clear();
      window.sessionStorage.clear();
    }
    console.log('✅ Test data cleaned up');
  } catch (error) {
    console.warn('⚠️ Test data cleanup failed:', error);
  }
}

module.exports = globalTeardown;
