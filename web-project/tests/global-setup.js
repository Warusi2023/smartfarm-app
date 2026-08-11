/**
 * Global Setup for Playwright Tests
 * Confirms the webServer is reachable without launching a browser
 * (browser binaries are installed by the CI job / local `playwright install`).
 */

async function globalSetup() {
  console.log('🔧 Starting global test setup...');

  const base = 'http://localhost:8080/';
  const deadline = Date.now() + 90_000;
  let lastError;

  while (Date.now() < deadline) {
    try {
      const res = await fetch(base, { redirect: 'follow' });
      if (res.ok || res.status === 404) {
        console.log('✅ Test server is ready');
        console.log('✅ Global test setup completed');
        return;
      }
      lastError = new Error(`Unexpected status ${res.status}`);
    } catch (error) {
      lastError = error;
    }
    await new Promise((r) => setTimeout(r, 1000));
  }

  console.error('❌ Global setup failed:', lastError);
  throw lastError || new Error('webServer did not become ready');
}

module.exports = globalSetup;
