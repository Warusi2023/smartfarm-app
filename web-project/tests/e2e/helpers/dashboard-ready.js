/**
 * Shared Playwright helpers for dashboard readiness and safe clicks.
 * Keeps E2E tests off networkidle (dashboard keeps sockets/polling alive).
 */

const DASHBOARD_READY_TIMEOUT_MS = 20000;

/** Minimal three-segment token accepted by dashboard isUsableBackendJwt(). */
function fakeJwt() {
  return 'eyJhbGciOiJub25lIn0.eyJzdWIiOiJwbGF5d3JpZ2h0LXRlc3QiLCJpYXQiOjE3MDAwMDAwMDB9.e2e';
}

/**
 * Seed localStorage so dashboard auth check does not redirect to login.
 * Does not change production auth logic — test harness only.
 */
async function seedDashboardSession(page) {
  await page.addInitScript(() => {
    const user = JSON.stringify({
      id: 'e2e-user',
      email: 'e2e@smartfarm.test',
      firstName: 'E2E',
      lastName: 'Tester',
      role: 'farmer'
    });
    const token =
      'eyJhbGciOiJub25lIn0.eyJzdWIiOiJwbGF5d3JpZ2h0LXRlc3QiLCJpYXQiOjE3MDAwMDAwMDB9.e2e';
    localStorage.setItem('smartfarm_user', user);
    localStorage.setItem('smartfarm_token', token);
    localStorage.setItem('smartfarm_remember', 'true');
    localStorage.setItem('smartfarm_loginTime', new Date().toISOString());
    sessionStorage.setItem('smartfarm_user', user);
    sessionStorage.setItem('smartfarm_token', token);
    sessionStorage.setItem('smartfarm_loginTime', new Date().toISOString());
  });
}

/**
 * Wait until landing-page overlays that intercept clicks are gone (or never present).
 */
async function waitForClickBlockingOverlaysClear(page) {
  const placeholder = page.locator('.preview-placeholder');
  if ((await placeholder.count()) > 0) {
    // On marketing index these stay visible — callers must not click through them.
    // For dashboard routes they should not exist; if a SPA fallback served index, fail fast.
    const onDashboard = await page.locator('#dashboardView, #mainContent').count();
    if (onDashboard === 0) {
      throw new Error(
        'Click-blocking .preview-placeholder present but dashboard shell missing — likely served index.html for a client route'
      );
    }
  }
}

/**
 * Navigate to dashboard and wait for a deterministic ready signal.
 */
async function gotoDashboardReady(page, options = {}) {
  const timeout = options.timeout || DASHBOARD_READY_TIMEOUT_MS;
  await seedDashboardSession(page);
  await page.goto('/dashboard.html', {
    waitUntil: 'domcontentloaded',
    timeout
  });
  await page.waitForSelector('#dashboardView', { state: 'visible', timeout });
  await page.waitForSelector('#mainContent', { state: 'visible', timeout });
  // Auth check runs on a 100ms timer; give it a beat then confirm we stayed on dashboard.
  await page.waitForTimeout(250);
  await expectNotRedirectedToLogin(page);
  await waitForClickBlockingOverlaysClear(page);
}

async function expectNotRedirectedToLogin(page) {
  const url = page.url();
  if (/login\.html/i.test(url) || /\/login\/?$/i.test(url)) {
    throw new Error(`Dashboard redirected to login (${url}); session seed failed`);
  }
}

/**
 * Click a sidebar nav control with exact locator + scroll, no force.
 */
async function clickSidebarNav(page, name) {
  const link = page.locator('.sidebar .nav-link', { hasText: new RegExp(`^\\s*${escapeRegExp(name)}\\s*$`) }).first();
  await link.waitFor({ state: 'visible', timeout: 10000 });
  await link.scrollIntoViewIfNeeded();
  await expectVisibleAndEnabled(link);
  await link.click({ timeout: 10000 });
}

function escapeRegExp(s) {
  return String(s).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function expectVisibleAndEnabled(locator) {
  await locator.waitFor({ state: 'visible', timeout: 10000 });
  const disabled = await locator.isDisabled().catch(() => false);
  if (disabled) {
    throw new Error('Target locator is disabled');
  }
}

/**
 * Click a dashboard action button that may sit below the fold / under sticky chrome.
 */
async function clickDashboardAction(page, selector) {
  const btn = page.locator(selector).first();
  await btn.waitFor({ state: 'visible', timeout: 15000 });
  await btn.scrollIntoViewIfNeeded();
  await expectVisibleAndEnabled(btn);
  await btn.click({ timeout: 10000 });
}

module.exports = {
  DASHBOARD_READY_TIMEOUT_MS,
  fakeJwt,
  seedDashboardSession,
  gotoDashboardReady,
  waitForClickBlockingOverlaysClear,
  clickSidebarNav,
  clickDashboardAction,
  expectNotRedirectedToLogin
};
