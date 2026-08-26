/**
 * Global Setup for Playwright Tests
 * Confirms frontend static server and local mock API are ready,
 * then resets mock state so each suite starts from seed data.
 */

const fs = require('fs');
const path = require('path');
const { getE2EApiBase } = require('./e2e/helpers/api-base');

async function waitForUrl(url, { okStatuses = [200], deadlineMs = 90_000 } = {}) {
  const deadline = Date.now() + deadlineMs;
  let lastError;

  while (Date.now() < deadline) {
    try {
      const res = await fetch(url, { redirect: 'follow' });
      if (okStatuses.includes(res.status) || res.status === 404) {
        return res;
      }
      lastError = new Error(`Unexpected status ${res.status} for ${url}`);
    } catch (error) {
      lastError = error;
    }
    await new Promise((r) => setTimeout(r, 1000));
  }

  throw lastError || new Error(`Timed out waiting for ${url}`);
}

async function globalSetup() {
  console.log('🔧 Starting global test setup...');

  const logDir = path.join(__dirname, '..', 'test-results', 'e2e-server-logs');
  try {
    fs.mkdirSync(logDir, { recursive: true });
  } catch (_) {
    /* best-effort */
  }

  const apiBase = getE2EApiBase();
  const healthUrl = `${apiBase}/api/health`;

  // Railway-smoke-only runs still start webServers; readiness stays the same.
  console.log(`⏳ Waiting for mock API health: ${healthUrl}`);
  const healthRes = await waitForUrl(healthUrl, { okStatuses: [200] });
  const healthBody = await healthRes.json();
  if (!healthBody.ok || healthBody.service !== 'SmartFarm') {
    throw new Error(`Mock API health payload unexpected: ${JSON.stringify(healthBody)}`);
  }
  console.log('✅ Mock API is ready');

  const resetRes = await fetch(`${apiBase}/__e2e__/reset`, { method: 'POST' });
  if (!resetRes.ok) {
    throw new Error(`Mock API reset failed with HTTP ${resetRes.status}`);
  }
  console.log('✅ Mock API state reset to seed data');

  console.log('⏳ Waiting for frontend static server: http://localhost:8080/');
  await waitForUrl('http://localhost:8080/', { okStatuses: [200] });
  console.log('✅ Test frontend server is ready');
  console.log('✅ Global test setup completed');
}

module.exports = globalSetup;
